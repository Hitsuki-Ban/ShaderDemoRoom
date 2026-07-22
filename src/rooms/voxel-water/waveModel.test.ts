import { describe, expect, it } from 'vitest';
import { voxelWaterDefaults } from './state';
import {
  buildColumnVertexShader,
  buildColumnFragmentShader,
  buildColumnWaveProgramKey,
  buildWaterFragmentShader,
  buildWaterVertexShader,
  COLUMN_COLOR_FPS,
  quantizeWave,
  quantizeColumnColorTime,
  sampleWave,
  WAVE_LAYERS,
  COLUMN_WAVE_PROGRAM_KEY,
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

  it('samples throttled column color animation on stable time buckets', () => {
    expect(quantizeColumnColorTime(0)).toEqual({ step: 0, time: 0 });
    expect(quantizeColumnColorTime(0.374)).toEqual({ step: 0, time: 0 });
    expect(quantizeColumnColorTime(0.375)).toEqual({
      step: 1,
      time: 1 / COLUMN_COLOR_FPS,
    });
    expect(quantizeColumnColorTime(0.5)).toEqual({
      step: 1,
      time: 1 / COLUMN_COLOR_FPS,
    });
  });

  it('writes unit sun directions that change with sky time', () => {
    const morning = writeSunDirection(0.1, { x: 0, y: 0, z: 0 });
    const evening = writeSunDirection(0.65, { x: 0, y: 0, z: 0 });

    expect(Math.hypot(morning.x, morning.y, morning.z)).toBeCloseTo(1, 12);
    expect(Math.hypot(evening.x, evening.y, evening.z)).toBeCloseTo(1, 12);
    expect(evening).not.toEqual(morning);
  });

  it('places the 0.18 solar fixture on the visible low horizon from the shared orbit', () => {
    const solarFixture = writeSunDirection(0.18, { x: 0, y: 0, z: 0 });
    const midnight = writeSunDirection(0, { x: 0, y: 0, z: 0 });
    const noon = writeSunDirection(0.5, { x: 0, y: 0, z: 0 });

    expect(solarFixture.x).toBeCloseTo(-0.368, 3);
    expect(solarFixture.y).toBeCloseTo(-0.0284, 3);
    expect(solarFixture.z).toBeCloseTo(-0.9294, 3);
    expect(midnight.y).toBeLessThan(0);
    expect(noon.y).toBeGreaterThan(0);
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
    expect(countOccurrences(result, 'varying float vColumnWave;')).toBe(1);
    expect(countOccurrences(result, 'varying vec2 vColumnOceanXZ;')).toBe(1);
    expect(countOccurrences(result, 'vColumnWave = normalizedColumnWave;')).toBe(1);
    expect(countOccurrences(result, 'vColumnOceanXZ = aOceanXZ;')).toBe(1);
    expect(result).toContain('float columnSurfaceY = waveSurfaceY(normalizedColumnWave);');
    expect(countOccurrences(result, 'struct WaveSample {')).toBe(1);
    expect(result).toContain(WAVE_MODEL_GLSL);
  });

  it('adds crest emission to high-value column tops exactly once', () => {
    const result = buildColumnFragmentShader(`
#include <common>
void main() {
#include <emissivemap_fragment>
}`);

    expect(result).toContain('float voxelTopFace = step(0.72, normal.y);');
    expect(result).toContain('uniform float uColumnWeatherStrength;');
    expect(result).toContain('float voxelCrestValue = smoothstep(');
    expect(result).toContain('float voxelFoamValue = smoothstep(');
    expect(result).toContain('* columnCompositionRelease * voxelTopFace * (');
    expect(result).not.toContain('mix(0.18, 1.0, voxelTopFace)');
    expect(countOccurrences(result, 'varying float vColumnWave;')).toBe(1);
    expect(countOccurrences(result, 'varying vec2 vColumnOceanXZ;')).toBe(1);
    expect(countOccurrences(result, '#include <emissivemap_fragment>')).toBe(1);
    expect(() => buildColumnFragmentShader('void main() {}')).toThrow('exactly one');
  });

  it('keys the column program from the actual injected shader behavior', () => {
    const vertexTemplate = '#include <common>\n#include <begin_vertex>';
    const fragmentTemplate = '#include <common>\n#include <emissivemap_fragment>';

    expect(COLUMN_WAVE_PROGRAM_KEY).toBe(
      buildColumnWaveProgramKey(vertexTemplate, fragmentTemplate),
    );
    expect(COLUMN_WAVE_PROGRAM_KEY).toMatch(/^voxel-water-column-wave:[\da-f]{16}:[\da-f]{16}$/);
    expect(buildColumnWaveProgramKey(
      `${vertexTemplate}\n#define COLUMN_BEHAVIOR_CHANGED`,
      fragmentTemplate,
    )).not.toBe(COLUMN_WAVE_PROGRAM_KEY);
  });
});
