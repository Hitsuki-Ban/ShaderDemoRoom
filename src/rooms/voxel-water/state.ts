import type { VoxelWaterSettings } from '../types';

export const voxelWaterDefaults: VoxelWaterSettings = {
  weather: 'rain',
  wind: 1.15,
  rain: 0.48,
  waveHeight: 0.72,
  toonSteps: 5,
  cloudCover: 0.5,
  swell: 0.62,
  chop: 0.44,
  foam: 0.48,
  clarity: 0.68,
  surfaceDetail: 0.56,
};

export const voxelWaterStormPreset: VoxelWaterSettings = {
  ...voxelWaterDefaults,
  weather: 'storm',
  wind: 2.1,
  rain: 0.82,
  waveHeight: 1.08,
  cloudCover: 0.92,
  swell: 0.9,
  chop: 0.82,
  foam: 0.84,
  clarity: 0.34,
  surfaceDetail: 0.86,
};

export const voxelWaterCalmPreset: VoxelWaterSettings = {
  ...voxelWaterDefaults,
  weather: 'clear',
  wind: 0.62,
  rain: 0.05,
  waveHeight: 0.42,
  cloudCover: 0.16,
  swell: 0.36,
  chop: 0.18,
  foam: 0.22,
  clarity: 0.86,
  surfaceDetail: 0.35,
};
