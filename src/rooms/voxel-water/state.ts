import type { DeepReadonly, VoxelWaterSettings } from '../types';

type VoxelWaterNumericSetting = Exclude<keyof VoxelWaterSettings, 'weather'>;

export const voxelWaterDomains = {
  wind: { min: 0.2, max: 3, step: 0.01 },
  rain: { min: 0, max: 1, step: 0.01 },
  waveHeight: { min: 0.1, max: 1.6, step: 0.01 },
  toonSteps: { min: 2, max: 9, step: 1 },
  cloudCover: { min: 0, max: 1, step: 0.01 },
  swell: { min: 0, max: 1.2, step: 0.01 },
  chop: { min: 0, max: 1, step: 0.01 },
  foam: { min: 0, max: 1, step: 0.01 },
  clarity: { min: 0, max: 1, step: 0.01 },
  surfaceDetail: { min: 0, max: 1, step: 0.01 },
  currentDirection: { min: 0, max: 360, step: 1 },
  currentStrength: { min: 0, max: 1, step: 0.01 },
  skyTime: { min: 0, max: 1, step: 0.01 },
  colorTemperature: { min: -1, max: 1, step: 0.01 },
  voxelColorVariance: { min: 0, max: 1, step: 0.01 },
} as const satisfies Record<
  VoxelWaterNumericSetting,
  { readonly min: number; readonly max: number; readonly step: number }
>;

export const voxelWaterDefaults: DeepReadonly<VoxelWaterSettings> = {
  weather: 'clear',
  wind: 0.82,
  rain: 0.12,
  waveHeight: 0.48,
  toonSteps: 5,
  cloudCover: 0.18,
  swell: 0.42,
  chop: 0.26,
  foam: 0.28,
  clarity: 0.9,
  surfaceDetail: 0.36,
  currentDirection: 34,
  currentStrength: 0.28,
  skyTime: 0.56,
  colorTemperature: 0.06,
  voxelColorVariance: 0.26,
};

export const voxelWaterStormPreset: DeepReadonly<VoxelWaterSettings> = {
  ...voxelWaterDefaults,
  weather: 'storm',
  wind: 2.1,
  rain: 0.74,
  waveHeight: 1.08,
  cloudCover: 0.78,
  swell: 0.9,
  chop: 0.82,
  foam: 0.78,
  clarity: 0.52,
  surfaceDetail: 0.86,
  currentDirection: 58,
  currentStrength: 0.78,
  skyTime: 0.24,
  colorTemperature: -0.22,
  voxelColorVariance: 0.46,
};

export const voxelWaterCalmPreset: DeepReadonly<VoxelWaterSettings> = {
  ...voxelWaterDefaults,
  weather: 'clear',
  wind: 0.46,
  rain: 0.05,
  waveHeight: 0.3,
  toonSteps: 4,
  cloudCover: 0.16,
  swell: 0.24,
  chop: 0.12,
  foam: 0.2,
  clarity: 0.84,
  surfaceDetail: 0.28,
  currentDirection: 18,
  currentStrength: 0.18,
  skyTime: 0.58,
  colorTemperature: 0.08,
  voxelColorVariance: 0.18,
};
