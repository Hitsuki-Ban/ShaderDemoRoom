const MOBILE_MAX_WIDTH = 819;
const resolvedProfiles = new WeakSet();

function deepFreeze(value) {
  for (const nested of Object.values(value)) {
    if (nested !== null && typeof nested === 'object' && !Object.isFrozen(nested)) {
      deepFreeze(nested);
    }
  }
  return Object.freeze(value);
}

const TIER_PROFILES = deepFreeze({
  desktop: {
    tier: 'desktop',
    antialias: true,
    pixelRatioCap: 1.6,
    bloomInitialStrength: 0.94,
    pulse: {
      systemCapacity: 5,
      userCapacity: 3,
      maxPulses: 8,
    },
    assets: {
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
    },
  },
  mobile: {
    tier: 'mobile',
    antialias: false,
    pixelRatioCap: 1.15,
    bloomInitialStrength: 0.72,
    pulse: {
      systemCapacity: 2,
      userCapacity: 2,
      maxPulses: 4,
    },
    assets: {
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
    },
  },
});

function assertPositiveFinite(value, name) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive finite number.`);
  }
}

export function resolveQualityProfile({ width, height, dpr, coarse }) {
  assertPositiveFinite(width, 'width');
  assertPositiveFinite(height, 'height');
  assertPositiveFinite(dpr, 'dpr');
  if (typeof coarse !== 'boolean') {
    throw new TypeError('coarse must be a boolean.');
  }

  const tierProfile = TIER_PROFILES[coarse || width <= MOBILE_MAX_WIDTH ? 'mobile' : 'desktop'];
  const profile = Object.freeze({
    ...tierProfile,
    width,
    height,
    devicePixelRatio: dpr,
    coarse,
    effectivePixelRatio: Math.min(dpr, tierProfile.pixelRatioCap),
  });
  resolvedProfiles.add(profile);
  return profile;
}

export function qualityProfilesEqual(left, right) {
  if (!resolvedProfiles.has(left) || !resolvedProfiles.has(right)) {
    throw new TypeError('Two profiles returned by resolveQualityProfile are required.');
  }
  return left.width === right.width
    && left.height === right.height
    && left.devicePixelRatio === right.devicePixelRatio
    && left.coarse === right.coarse
    && left.tier === right.tier
    && left.effectivePixelRatio === right.effectivePixelRatio;
}
