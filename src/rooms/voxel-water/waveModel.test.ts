import { describe, expect, it } from 'vitest';
import { voxelWaterDefaults } from './state';
import {
  buildColumnVertexShader,
  buildWaterFragmentShader,
  buildWaterVertexShader,
  quantizeWave,
  sampleWave,
  WAVE_LAYERS,
  WAVE_MODEL_GLSL,
  writeSunDirection,
} from './waveModel';

const WAVE_MODEL_MARKER = '/*__VOXEL_WAVE_MODEL__*/';
const TOON_QUANTIZATION_MARKER = '/*__VOXEL_TOON_QUANTIZATION__*/';

function countOccurrences(source: string, value: string) {
  return source.split(value).length - 1;
}

describe('voxel water wave model', () => {
  it('defines four unique wave layers with non-zero directions', () => {
    expect(WAVE_LAYERS).toHaveLength(4);
    expect(new Set(WAVE_LAYERS.map((layer) => JSON.stringify(layer))).size).toBe(4);

    for (const layer of WAVE_LAYERS) {
      expect(Math.hypot(...layer.direction)).toBeGreaterThan(0);
    }
  });

  it('samples deterministically while responding to position and time', () => {
    const sample = sampleWave(1.25, -0.8, 3.4, voxelWaterDefaults);
    const variants = [
      sampleWave(1.75, -0.8, 3.4, voxelWaterDefaults),
      sampleWave(1.25, -0.3, 3.4, voxelWaterDefaults),
      sampleWave(1.25, -0.8, 4.1, voxelWaterDefaults),
    ];

    expect(sampleWave(1.25, -0.8, 3.4, voxelWaterDefaults)).toEqual(sample);
    for (const variant of variants) {
      expect(variant).not.toEqual(sample);
    }
    for (const result of [sample, ...variants]) {
      expect(Number.isFinite(result.surfaceY)).toBe(true);
    }
  });

  it.each([2, 3, 4])(
    'quantizes dense normalized input into exactly %i endpoint-inclusive bins',
    (steps) => {
      const bins = new Set(
        Array.from({ length: 1001 }, (_, index) => quantizeWave(index / 1000, steps)),
      );

      expect(bins.size).toBe(steps);
      expect(bins.has(0)).toBe(true);
      expect(bins.has(1)).toBe(true);
    },
  );

  it('writes unit sun directions that change with sky time', () => {
    const morning = writeSunDirection(0.1, { x: 0, y: 0, z: 0 });
    const evening = writeSunDirection(0.65, { x: 0, y: 0, z: 0 });

    expect(Math.hypot(morning.x, morning.y, morning.z)).toBeCloseTo(1, 12);
    expect(Math.hypot(evening.x, evening.y, evening.z)).toBeCloseTo(1, 12);
    expect(evening).not.toEqual(morning);
  });
});

describe('voxel water shader builders', () => {
  it.each([
    {
      build: buildWaterVertexShader,
      marker: WAVE_MODEL_MARKER,
      injectedSignature: 'struct WaveSample {',
    },
    {
      build: buildWaterFragmentShader,
      marker: TOON_QUANTIZATION_MARKER,
      injectedSignature: 'float quantizeWave(float value, float steps)',
    },
  ])('replaces the $marker marker exactly once', ({ build, marker, injectedSignature }) => {
    const result = build(`${marker}\nvoid main() {}`);

    expect(countOccurrences(result, marker)).toBe(0);
    expect(countOccurrences(result, injectedSignature)).toBe(1);
  });

  it.each([
    { build: buildWaterVertexShader, marker: WAVE_MODEL_MARKER },
    { build: buildWaterFragmentShader, marker: TOON_QUANTIZATION_MARKER },
  ])('fails fast when the $marker marker is missing or repeated', ({ build, marker }) => {
    expect(() => build('void main() {}')).toThrow(`exactly one ${marker} marker`);
    expect(() => build(`${marker}\n${marker}`)).toThrow(`exactly one ${marker} marker`);
  });

  it('injects ocean coordinates and the shared wave chunk into stock column includes', () => {
    const result = buildColumnVertexShader(`
#include <common>
void main() {
  #include <begin_vertex>
}
`);

    expect(countOccurrences(result, '#include <common>')).toBe(1);
    expect(countOccurrences(result, '#include <begin_vertex>')).toBe(1);
    expect(countOccurrences(result, 'attribute vec2 aOceanXZ;')).toBe(1);
    expect(countOccurrences(result, 'struct WaveSample {')).toBe(1);
    expect(result).toContain(WAVE_MODEL_GLSL);
  });
});
