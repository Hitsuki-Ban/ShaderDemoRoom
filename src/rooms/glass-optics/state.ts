import type { DeepReadonly, GlassOpticsSettings } from '../types';

export const glassOpticsDomains = {
  lightX: { min: -6, max: 6 },
  lightY: { min: 0.8, max: 6 },
  lightZ: { min: -6, max: 6 },
  beamSpread: { min: 0.05, max: 0.9 },
  ior: { min: 1, max: 2.4 },
  roughness: { min: 0, max: 0.55 },
  thickness: { min: 0.2, max: 2.4 },
} as const;

export const glassOpticsDefaults: DeepReadonly<GlassOpticsSettings> = {
  lightX: -0.05,
  lightY: 2.42,
  lightZ: 2.05,
  beamSpread: 0.34,
  ior: 1.48,
  roughness: 0.04,
  thickness: 1.25,
  autoRotate: true,
  showCaustics: true,
};

export const glassOpticsFocusPreset: DeepReadonly<Partial<GlassOpticsSettings>> = {
  lightX: -0.28,
  lightY: 2.85,
  lightZ: 1.45,
  beamSpread: 0.18,
};

export const glassOpticsCrystalPreset: DeepReadonly<Partial<GlassOpticsSettings>> = {
  ior: 1.72,
  thickness: 1.8,
  roughness: 0.01,
  showCaustics: true,
};
