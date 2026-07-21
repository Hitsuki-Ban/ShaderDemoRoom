import { describe, expect, it } from 'vitest';

import { qualityProfilesEqual, resolveQualityProfile } from './quality-profile.js';

describe('quality profile resolution', () => {
  it.each([
    [{ width: 819, height: 900, dpr: 1, coarse: false }, 'mobile'],
    [{ width: 820, height: 900, dpr: 1, coarse: false }, 'desktop'],
    [{ width: 821, height: 900, dpr: 1, coarse: false }, 'desktop'],
    [{ width: 1920, height: 1080, dpr: 1, coarse: true }, 'mobile'],
  ])('resolves the unique tier for %o', (input, tier) => {
    expect(resolveQualityProfile(input).tier).toBe(tier);
  });

  it('caps effective DPR without creating another tier', () => {
    expect(resolveQualityProfile({ width: 820, height: 900, dpr: 3, coarse: false }))
      .toMatchObject({
        width: 820,
        height: 900,
        devicePixelRatio: 3,
        coarse: false,
        tier: 'desktop',
        pixelRatioCap: 1.6,
        effectivePixelRatio: 1.6,
        antialias: true,
      });
    expect(resolveQualityProfile({ width: 819, height: 900, dpr: 3, coarse: false }))
      .toMatchObject({ tier: 'mobile', pixelRatioCap: 1.15, effectivePixelRatio: 1.15, antialias: false });
    expect(resolveQualityProfile({ width: 820, height: 900, dpr: 1.25, coarse: false }).effectivePixelRatio)
      .toBe(1.25);
  });

  it('exposes the complete immutable desktop budget', () => {
    const profile = resolveQualityProfile({ width: 1280, height: 720, dpr: 1, coarse: false });
    expect(profile.pulse).toEqual({ systemCapacity: 5, userCapacity: 3, maxPulses: 8 });
    expect(profile.assets).toEqual({
      archiveCellCount: 81,
      archivePointsPerCell: 156,
      beamRadialSegments: 40,
      sonarShellWidthSegments: 64,
      sonarShellHeightSegments: 36,
      sonarCurtainRadialSegments: 96,
      sonarSpokeCount: 96,
      sonarPillarCount: 48,
      sonarLatticeSide: 13,
      helixSegments: 240,
      sonarConvergenceWidthSegments: 64,
      sonarConvergenceHeightSegments: 36,
      nullRingTubularSegments: 192,
      coreDetail: 5,
      coreRingTubularSegments: 192,
      forecastDustCount: 2600,
      energyBodyCount: 10500,
      mistCount: 3300,
      nearSnowCount: 720,
      abyssalSpineCount: 46,
      pressureStrataTubularSegments: 256,
    });
    expect(Object.isFrozen(profile)).toBe(true);
    expect(Object.isFrozen(profile.pulse)).toBe(true);
    expect(Object.isFrozen(profile.assets)).toBe(true);
  });

  it('exposes the complete immutable mobile budget', () => {
    const profile = resolveQualityProfile({ width: 390, height: 844, dpr: 3, coarse: true });
    expect(profile.pulse).toEqual({ systemCapacity: 2, userCapacity: 2, maxPulses: 4 });
    expect(profile.assets).toEqual({
      archiveCellCount: 45,
      archivePointsPerCell: 72,
      beamRadialSegments: 20,
      sonarShellWidthSegments: 36,
      sonarShellHeightSegments: 20,
      sonarCurtainRadialSegments: 48,
      sonarSpokeCount: 48,
      sonarPillarCount: 28,
      sonarLatticeSide: 9,
      helixSegments: 120,
      sonarConvergenceWidthSegments: 36,
      sonarConvergenceHeightSegments: 20,
      nullRingTubularSegments: 96,
      coreDetail: 4,
      coreRingTubularSegments: 96,
      forecastDustCount: 1200,
      energyBodyCount: 4200,
      mistCount: 1200,
      nearSnowCount: 260,
      abyssalSpineCount: 22,
      pressureStrataTubularSegments: 128,
    });
  });

  it('compares the complete current viewport, input, and derived profile', () => {
    const first = resolveQualityProfile({ width: 1280, height: 720, dpr: 2, coarse: false });
    const same = resolveQualityProfile({ width: 1280, height: 720, dpr: 2, coarse: false });
    const cappedDprChange = resolveQualityProfile({ width: 1280, height: 720, dpr: 3, coarse: false });
    const resized = resolveQualityProfile({ width: 1920, height: 1080, dpr: 2, coarse: false });
    const mobile = resolveQualityProfile({ width: 390, height: 844, dpr: 3, coarse: false });
    expect(qualityProfilesEqual(first, same)).toBe(true);
    expect(qualityProfilesEqual(first, cappedDprChange)).toBe(false);
    expect(qualityProfilesEqual(first, resized)).toBe(false);
    expect(qualityProfilesEqual(first, mobile)).toBe(false);
    expect(() => qualityProfilesEqual(first, { ...first })).toThrow(/resolveQualityProfile/);
  });

  it.each([
    [{ height: 1, dpr: 1, coarse: false }, /width/],
    [{ width: 1, height: 0, dpr: 1, coarse: false }, /height/],
    [{ width: 1, height: 1, dpr: Number.NaN, coarse: false }, /dpr/],
    [{ width: 1, height: 1, dpr: Number.POSITIVE_INFINITY, coarse: false }, /dpr/],
    [{ width: 1, height: 1, dpr: 1, coarse: 0 }, /coarse/],
  ])('fails fast for invalid input %o', (input, message) => {
    expect(() => resolveQualityProfile(input)).toThrow(message);
  });
});
