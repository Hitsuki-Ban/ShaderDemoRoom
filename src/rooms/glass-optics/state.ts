import type { DeepReadonly, GlassOpticsSettings } from '../types';

type GlassOpticsNumericSetting = Exclude<
  keyof GlassOpticsSettings,
  'autoRotate' | 'showCaustics'
>;

export const glassOpticsDomains = {
  lightX: { min: -6, max: 6, step: 0.01 },
  lightY: { min: 2.61, max: 6, step: 0.01 },
  lightZ: { min: -6, max: 6, step: 0.01 },
  beamSpread: { min: 0.05, max: 0.9, step: 0.01 },
  ior: { min: 1, max: 2.4, step: 0.01 },
  roughness: { min: 0, max: 0.55, step: 0.01 },
  thickness: { min: 0.2, max: 2.4, step: 0.01 },
} as const satisfies Record<
  GlassOpticsNumericSetting,
  { readonly min: number; readonly max: number; readonly step: number }
>;

export const glassOpticsDefaults: DeepReadonly<GlassOpticsSettings> = {
  lightX: -0.05,
  lightY: 3.2,
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
  lightY: 3.45,
  lightZ: 1.45,
  beamSpread: 0.18,
};

export const glassOpticsCrystalPreset: DeepReadonly<Partial<GlassOpticsSettings>> = {
  ior: 1.72,
  thickness: 1.8,
  roughness: 0.01,
  showCaustics: true,
};
