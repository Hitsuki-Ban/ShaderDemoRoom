import type { DeepReadonly, VoxelWaterSettings } from '../types';

export const VOXEL_SPACING = 0.62;
export const WATER_GRID_CELL_MULTIPLE = 9;
export const STORM_GRID_CELL_MULTIPLE = 22;
export const VOXEL_FIELD_OFFSET = { x: 8, z: 0 } as const;
export const VOXEL_FIELD_YAW = -0.16;
export const COLUMN_COLOR_FPS = 8 / 3;
export const OCEAN_SNAP_CELL_MULTIPLE = 8;

const WAVE_NORMALIZATION = { base: 1.02, swell: 0.54 } as const;
const WAVE_ELEVATION_SCALE = { base: 0.72, swell: 0.34 } as const;
const COLUMN_BOTTOM_Y = -0.24;
const SUN_ORBIT = {
  radius: 5,
  baseHeight: -3.25,
  heightAmplitude: 5.8,
  azimuthPhase: 0.51,
} as const;

type WaveInfluence = Partial<Record<'swell' | 'chop' | 'surfaceDetail', number>>;

type WaveLayer = {
  direction: readonly [number, number];
  frequency: number;
  amplitude: { base: number; influence?: WaveInfluence };
  phaseSpeed: number;
  sharpness: { base: number; influence?: WaveInfluence };
};

export const WAVE_LAYERS = [
  {
    direction: [0.78, 0.62],
    frequency: 1.12,
    amplitude: { base: 0.32, influence: { swell: 0.15 } },
    phaseSpeed: 0.92,
    sharpness: { base: 1.2, influence: { chop: 2.6 } },
  },
  {
    direction: [-0.64, 0.77],
    frequency: 2.45,
    amplitude: { base: 0.28, influence: { chop: 0.12 } },
    phaseSpeed: -1.36,
    sharpness: { base: 1.6, influence: { chop: 2.1 } },
  },
  {
    direction: [0.18, -0.98],
    frequency: 4.2,
    amplitude: { base: 0.16, influence: { surfaceDetail: 0.08 } },
    phaseSpeed: 1.9,
    sharpness: { base: 1.2, influence: { surfaceDetail: 2 } },
  },
  {
    direction: [-0.95, 0.31],
    frequency: 0.86,
    amplitude: { base: 0, influence: { swell: 0.18 } },
    phaseSpeed: -0.72,
    sharpness: { base: 1.4 },
  },
] as const satisfies readonly WaveLayer[];

type WaveSettings = Pick<
  DeepReadonly<VoxelWaterSettings>,
  'wind' | 'swell' | 'chop' | 'surfaceDetail' | 'waveHeight' | 'foam'
>;

type MutableVector3 = { x: number; y: number; z: number };

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function normalizeDirection([x, y]: readonly [number, number]) {
  const length = Math.hypot(x, y);
  if (length === 0) throw new Error('Wave layer direction must be non-zero.');
  return [x / length, y / length] as const;
}

function evaluateInfluence(
  definition: { base: number; influence?: WaveInfluence },
  settings: WaveSettings,
) {
  return definition.base
    + settings.swell * (definition.influence?.swell ?? 0)
    + settings.chop * (definition.influence?.chop ?? 0)
    + settings.surfaceDetail * (definition.influence?.surfaceDetail ?? 0);
}

function glslFloat(value: number) {
  if (!Number.isFinite(value)) throw new Error(`Cannot encode non-finite GLSL number: ${value}.`);
  return Number.isInteger(value) ? `${value}.0` : String(value);
}

function glslInfluence(definition: { base: number; influence?: WaveInfluence }) {
  const terms = [glslFloat(definition.base)];
  const uniforms = {
    swell: 'uSwell',
    chop: 'uChop',
    surfaceDetail: 'uSurfaceDetail',
  } as const;
  for (const [setting, coefficient] of Object.entries(definition.influence ?? {})) {
    terms.push(`${uniforms[setting as keyof WaveInfluence]} * ${glslFloat(coefficient)}`);
  }
  return terms.join(' + ');
}

const NORMALIZED_WAVE_LAYERS = WAVE_LAYERS.map((layer) => ({
  ...layer,
  direction: normalizeDirection(layer.direction),
}));

export function sampleWave(
  x: number,
  z: number,
  time: number,
  settings: WaveSettings,
) {
  const timeScale = 0.44 + settings.wind * 0.15;
  let height = 0;
  let gradientX = 0;
  let gradientZ = 0;

  for (const layer of NORMALIZED_WAVE_LAYERS) {
    const [directionX, directionZ] = layer.direction;
    const amplitude = evaluateInfluence(layer.amplitude, settings);
    const sharpness = evaluateInfluence(layer.sharpness, settings);
    const theta = (x * directionX + z * directionZ) * layer.frequency
      + time * timeScale * layer.phaseSpeed;
    const sine = Math.max(Math.sin(theta) * 0.5 + 0.5, 0.0001);
    const shaped = Math.pow(sine, sharpness);
    const derivative = 0.5 * layer.frequency * Math.cos(theta) * sharpness
      * Math.pow(sine, sharpness - 1) * amplitude;
    height += shaped * amplitude;
    gradientX += directionX * derivative;
    gradientZ += directionZ * derivative;
  }

  const normalization = Math.max(
    1,
    WAVE_NORMALIZATION.base + settings.swell * WAVE_NORMALIZATION.swell,
  );
  const normalizedHeight = clamp01(height / normalization);
  const crestLift = normalizedHeight >= 0.76 ? settings.foam * 0.12 : 0;
  const columnHeight = 0.2 + Math.max(
    0.08,
    normalizedHeight
      * settings.waveHeight
      * (WAVE_ELEVATION_SCALE.base + settings.swell * WAVE_ELEVATION_SCALE.swell)
      + crestLift * 0.75,
  );
  return {
    height: normalizedHeight,
    gradient: [gradientX / normalization, gradientZ / normalization] as const,
    surfaceY: COLUMN_BOTTOM_Y + columnHeight,
  };
}

export function quantizeWave(value: number, steps: number) {
  const intervals = Math.max(Math.round(steps) - 1, 1);
  return Math.floor(clamp01(value) * intervals + 0.5) / intervals;
}

export function quantizeColumnColorTime(elapsed: number) {
  const step = Math.floor(Math.max(0, elapsed) * COLUMN_COLOR_FPS + 1e-6);
  return {
    step,
    time: step / COLUMN_COLOR_FPS,
  };
}

export function writeSunDirection(skyTime: number, target: MutableVector3) {
  const azimuth = (skyTime + SUN_ORBIT.azimuthPhase) * Math.PI * 2;
  const x = Math.cos(azimuth) * SUN_ORBIT.radius;
  const y = SUN_ORBIT.baseHeight + Math.sin(skyTime * Math.PI) * SUN_ORBIT.heightAmplitude;
  const z = Math.sin(azimuth) * SUN_ORBIT.radius;
  const length = Math.hypot(x, y, z);
  if (length === 0) throw new Error('Sun orbit produced a zero direction.');
  target.x = x / length;
  target.y = y / length;
  target.z = z / length;
  return target;
}

const waveLayerCalls = NORMALIZED_WAVE_LAYERS.map((layer, index) => {
  const [directionX, directionZ] = layer.direction;
  return `  WaveSample layer${index} = sampleWaveLayer(
    p,
    vec2(${glslFloat(directionX)}, ${glslFloat(directionZ)}),
    ${glslFloat(layer.frequency)},
    ${glslInfluence(layer.amplitude)},
    uTime * timeScale * ${glslFloat(layer.phaseSpeed)},
    ${glslInfluence(layer.sharpness)}
  );`;
}).join('\n');

const waveHeightSum = NORMALIZED_WAVE_LAYERS.map((_, index) => `layer${index}.height`).join(' + ');
const waveGradientSum = NORMALIZED_WAVE_LAYERS.map((_, index) => `layer${index}.gradient`).join(' + ');

export const WAVE_MODEL_GLSL = `
uniform float uTime;
uniform float uWaveHeight;
uniform float uWind;
uniform float uSwell;
uniform float uChop;
uniform float uSurfaceDetail;
uniform float uFoam;

struct WaveSample {
  float height;
  vec2 gradient;
};

WaveSample sampleWaveLayer(
  vec2 p,
  vec2 direction,
  float frequency,
  float amplitude,
  float phase,
  float sharpness
) {
  float theta = dot(p, direction) * frequency + phase;
  float sine = max(sin(theta) * 0.5 + 0.5, 0.0001);
  float shaped = pow(sine, sharpness);
  float derivative = 0.5 * frequency * cos(theta) * sharpness * pow(sine, sharpness - 1.0) * amplitude;
  return WaveSample(shaped * amplitude, direction * derivative);
}

WaveSample sampleWaveField(vec2 p) {
  float timeScale = 0.44 + uWind * 0.15;
${waveLayerCalls}
  float normalization = max(
    1.0,
    ${glslFloat(WAVE_NORMALIZATION.base)} + uSwell * ${glslFloat(WAVE_NORMALIZATION.swell)}
  );
  WaveSample result;
  result.height = ${waveHeightSum};
  result.gradient = ${waveGradientSum};
  result.height /= normalization;
  result.gradient /= normalization;
  return result;
}

float waveElevationScale() {
  return uWaveHeight
    * (${glslFloat(WAVE_ELEVATION_SCALE.base)} + uSwell * ${glslFloat(WAVE_ELEVATION_SCALE.swell)});
}

float waveSurfaceY(float normalizedWave) {
  float crestLift = step(0.76, normalizedWave) * uFoam * 0.12;
  float columnHeight = 0.2 + max(
    0.08,
    normalizedWave
      * waveElevationScale()
      + crestLift * 0.75
  );
  return ${glslFloat(COLUMN_BOTTOM_Y)} + columnHeight;
}
`.trim();

export const TOON_QUANTIZATION_GLSL = `
float quantizeWave(float value, float steps) {
  float intervals = max(floor(steps + 0.5) - 1.0, 1.0);
  return floor(clamp(value, 0.0, 1.0) * intervals + 0.5) / intervals;
}
`.trim();

const WAVE_MODEL_MARKER = '/*__VOXEL_WAVE_MODEL__*/';
const TOON_QUANTIZATION_MARKER = '/*__VOXEL_TOON_QUANTIZATION__*/';

function replaceExactlyOnce(source: string, marker: string, replacement: string) {
  const first = source.indexOf(marker);
  if (first < 0 || source.indexOf(marker, first + marker.length) >= 0) {
    throw new Error(`Shader source must contain exactly one ${marker} marker.`);
  }
  return source.replace(marker, replacement);
}

export function buildWaterVertexShader(template: string) {
  return replaceExactlyOnce(template, WAVE_MODEL_MARKER, WAVE_MODEL_GLSL);
}

export function buildWaterFragmentShader(template: string) {
  return replaceExactlyOnce(template, TOON_QUANTIZATION_MARKER, TOON_QUANTIZATION_GLSL);
}

export function buildColumnVertexShader(source: string) {
  const declarations = `#include <common>
attribute vec2 aOceanXZ;
varying float vColumnWave;
varying vec2 vColumnOceanXZ;
${WAVE_MODEL_GLSL}`;
  const displacement = `#include <begin_vertex>
WaveSample columnWave = sampleWaveField(aOceanXZ);
float normalizedColumnWave = clamp(columnWave.height, 0.0, 1.0);
vColumnWave = normalizedColumnWave;
vColumnOceanXZ = aOceanXZ;
float columnSurfaceY = waveSurfaceY(normalizedColumnWave);
float columnHeight = columnSurfaceY - ${glslFloat(COLUMN_BOTTOM_Y)};
transformed.y = ${glslFloat(COLUMN_BOTTOM_Y)} + (position.y + 0.5) * columnHeight;`;
  return replaceExactlyOnce(
    replaceExactlyOnce(source, '#include <common>', declarations),
    '#include <begin_vertex>',
    displacement,
  );
}

export function buildColumnFragmentShader(source: string) {
  const declarations = `#include <common>
uniform float uColumnWeatherStrength;
uniform float uColumnFoam;
varying float vColumnWave;
varying vec2 vColumnOceanXZ;`;
  const crestEmission = `#include <emissivemap_fragment>
float voxelTopFace = step(0.72, normal.y);
float columnRainFoamPhase = smoothstep(0.28, 0.46, uColumnWeatherStrength)
  * (1.0 - smoothstep(0.58, 0.72, uColumnWeatherStrength));
float columnStormFoamPhase = smoothstep(0.65, 0.9, uColumnWeatherStrength);
float columnCrestMinimum = mix(0.42, 0.1, uColumnWeatherStrength);
float columnCrestMaximum = mix(0.62, 0.3, uColumnWeatherStrength);
columnCrestMinimum = mix(columnCrestMinimum, -0.08, columnStormFoamPhase);
columnCrestMaximum = mix(columnCrestMaximum, 0.18, columnStormFoamPhase);
float voxelCrestValue = smoothstep(columnCrestMinimum, columnCrestMaximum, vColumnWave);
float columnFoamMinimum = mix(0.8, 0.61, columnRainFoamPhase);
float columnFoamMaximum = mix(0.94, 0.78, columnRainFoamPhase);
columnFoamMinimum = mix(columnFoamMinimum, 0.08, columnStormFoamPhase);
columnFoamMaximum = mix(columnFoamMaximum, 0.28, columnStormFoamPhase);
float voxelFoamValue = smoothstep(
  columnFoamMinimum,
  columnFoamMaximum,
  vColumnWave
) * smoothstep(0.0, 0.35, uColumnFoam);
float columnFoamDistanceRelease = mix(
  1.0,
  smoothstep(22.0, 32.0, length(vViewPosition)),
  columnStormFoamPhase
);
float stormDistanceRelease = mix(
  1.0,
  smoothstep(20.0, 32.0, length(vViewPosition)),
  smoothstep(0.65, 0.85, uColumnWeatherStrength)
);
float stormCompositionProtection = smoothstep(0.65, 0.85, uColumnWeatherStrength);
float columnCompositionRelease = mix(
  mix(0.12, 0.6, stormCompositionProtection),
  1.0,
  smoothstep(2.0, 7.0, length(vColumnOceanXZ - vec2(4.7, -6.6)))
);
float rainColumnPhase = smoothstep(0.18, 0.45, uColumnWeatherStrength)
  * (1.0 - smoothstep(0.55, 0.82, uColumnWeatherStrength));
float rainColumnEmissionCompression = mix(1.0, 0.7, rainColumnPhase);
totalEmissiveRadiance += rainColumnEmissionCompression * stormDistanceRelease
  * columnCompositionRelease * voxelTopFace * (
  mix(
    mix(vec3(0.05, 0.1, 0.06), vec3(0.4, 0.5, 0.34), columnRainFoamPhase),
    vec3(0.35, 0.45, 0.3),
    columnStormFoamPhase
  )
    * voxelCrestValue
  + mix(
    mix(vec3(0.4, 0.5, 0.35), vec3(2.9, 3.1, 2.3), columnRainFoamPhase),
    vec3(18.0, 18.5, 13.5),
    columnStormFoamPhase
  ) * voxelFoamValue * columnFoamDistanceRelease
);`;
  return replaceExactlyOnce(
    replaceExactlyOnce(source, '#include <common>', declarations),
    '#include <emissivemap_fragment>',
    crestEmission,
  );
}

function hashProgramSignature(source: string) {
  let first = 0xdeadbeef ^ source.length;
  let second = 0x41c6ce57 ^ source.length;
  for (let index = 0; index < source.length; index += 1) {
    const code = source.charCodeAt(index);
    first = Math.imul(first ^ code, 2654435761);
    second = Math.imul(second ^ code, 1597334677);
  }
  first = Math.imul(first ^ (first >>> 16), 2246822507)
    ^ Math.imul(second ^ (second >>> 13), 3266489909);
  second = Math.imul(second ^ (second >>> 16), 2246822507)
    ^ Math.imul(first ^ (first >>> 13), 3266489909);
  return `${(first >>> 0).toString(16).padStart(8, '0')}${(second >>> 0).toString(16).padStart(8, '0')}`;
}

export function buildColumnWaveProgramKey(vertexTemplate: string, fragmentTemplate: string) {
  return [
    'voxel-water-column-wave',
    hashProgramSignature(buildColumnVertexShader(vertexTemplate)),
    hashProgramSignature(buildColumnFragmentShader(fragmentTemplate)),
  ].join(':');
}

export const COLUMN_WAVE_PROGRAM_KEY = buildColumnWaveProgramKey(
  '#include <common>\n#include <begin_vertex>',
  '#include <common>\n#include <emissivemap_fragment>',
);
