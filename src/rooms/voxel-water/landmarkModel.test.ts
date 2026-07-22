import { describe, expect, it } from 'vitest';
import { VOXEL_FIELD_YAW } from './waveModel';
import {
  ACTIVE_LANDMARK_CANDIDATE,
  ACTIVE_LANDMARK_CANDIDATE_ID,
  createLandmarkCandidate,
  HEADLAND_WORLD_OCEAN_ANCHOR,
  headlandContainsVoxelFieldLocal,
  headlandContainsWorldOcean,
  LANDMARK_CANDIDATE_IDS,
  LANDMARK_CANDIDATES,
  LANDMARK_INSTANCE_BUDGET,
  LANDMARK_WORLD_BOUNDS,
  landmarkCoversVoxelColumnWorldOcean,
  LIGHTHOUSE_BASE_WORLD_OCEAN,
  signedDistanceToHeadlandWorldOcean,
  voxelFieldLocalToWorldOcean,
  WATER_MID_WORLD_OCEAN,
  worldOceanToVoxelFieldLocal,
} from './landmarkModel';

describe('voxel water landmark candidate model', () => {
  it('builds exactly three deterministic pure-data candidates', () => {
    expect(LANDMARK_CANDIDATE_IDS).toHaveLength(3);
    expect(LANDMARK_CANDIDATES.map((candidate) => candidate.id)).toEqual(
      LANDMARK_CANDIDATE_IDS,
    );
    expect(ACTIVE_LANDMARK_CANDIDATE_ID).toBe('balanced');
    expect(ACTIVE_LANDMARK_CANDIDATE).toEqual(createLandmarkCandidate('balanced'));
    for (const id of LANDMARK_CANDIDATE_IDS) {
      expect(createLandmarkCandidate(id)).toEqual(createLandmarkCandidate(id));
    }
    expect(() => createLandmarkCandidate('unknown')).toThrow(
      'Unknown landmark candidate "unknown".',
    );
  });

  it('keeps one connected footprint covering the world anchor and lighthouse base', () => {
    expect(headlandContainsWorldOcean(HEADLAND_WORLD_OCEAN_ANCHOR)).toBe(true);
    expect(headlandContainsWorldOcean(LIGHTHOUSE_BASE_WORLD_OCEAN)).toBe(true);

    for (let index = 0; index <= 100; index += 1) {
      const progress = index / 100;
      expect(headlandContainsWorldOcean({
        worldX: HEADLAND_WORLD_OCEAN_ANCHOR.worldX
          + (LIGHTHOUSE_BASE_WORLD_OCEAN.worldX - HEADLAND_WORLD_OCEAN_ANCHOR.worldX)
            * progress,
        worldZ: HEADLAND_WORLD_OCEAN_ANCHOR.worldZ
          + (LIGHTHOUSE_BASE_WORLD_OCEAN.worldZ - HEADLAND_WORLD_OCEAN_ANCHOR.worldZ)
            * progress,
      })).toBe(true);
    }
  });

  it('preserves the right-side water-mid as negative space', () => {
    expect(headlandContainsWorldOcean(WATER_MID_WORLD_OCEAN)).toBe(false);
    expect(signedDistanceToHeadlandWorldOcean(WATER_MID_WORLD_OCEAN)).toBeGreaterThan(5);
  });

  it('covers rotated voxel columns whose square overlaps a boundary rock', () => {
    const boundaryColumn = { worldX: -0.82919, worldZ: -1.07585 };
    expect(signedDistanceToHeadlandWorldOcean(boundaryColumn)).toBeGreaterThan(0);
    expect(landmarkCoversVoxelColumnWorldOcean(boundaryColumn)).toBe(true);
    expect(landmarkCoversVoxelColumnWorldOcean(WATER_MID_WORLD_OCEAN)).toBe(false);
  });

  it('stays within the single-mesh box budget and declared role/bounds contract', () => {
    for (const id of LANDMARK_CANDIDATE_IDS) {
      const candidate = createLandmarkCandidate(id);
      expect(candidate.instances.length).toBeLessThanOrEqual(LANDMARK_INSTANCE_BUDGET);
      expect(new Set(candidate.instances.map((instance) => instance.role))).toEqual(
        new Set(['rock', 'tower', 'roof']),
      );

      for (const instance of candidate.instances) {
        expect(['headland-dark', 'tower-light', 'roof-dark']).toContain(instance.colorRole);
        instance.worldPosition.forEach((position, axis) => {
          const halfScale = instance.scale[axis] * 0.5;
          expect(instance.scale[axis]).toBeGreaterThan(0);
          expect(position - halfScale).toBeGreaterThanOrEqual(LANDMARK_WORLD_BOUNDS.min[axis]);
          expect(position + halfScale).toBeLessThanOrEqual(LANDMARK_WORLD_BOUNDS.max[axis]);
        });
      }
    }
  });

  it('varies only headland screen share, tower taper, and roof silhouette', () => {
    const candidates = LANDMARK_CANDIDATE_IDS.map(createLandmarkCandidate);
    expect(new Set(candidates.map((candidate) => candidate.headlandScreenShare)).size).toBe(3);
    expect(new Set(candidates.map((candidate) => candidate.towerTaper)).size).toBe(3);
    expect(new Set(candidates.map((candidate) => candidate.roofSilhouette)).size).toBe(3);

    const rockPlans = candidates.map((candidate) => candidate.instances
      .filter((instance) => instance.role === 'rock')
      .map((instance) => [
        instance.worldPosition[0],
        instance.worldPosition[2],
        instance.scale[0],
        instance.scale[2],
      ]));
    expect(rockPlans[1]).toEqual(rockPlans[0]);
    expect(rockPlans[2]).toEqual(rockPlans[0]);
  });

  it('names and round-trips voxel-field-local versus world/ocean coordinates', () => {
    expect(VOXEL_FIELD_YAW).toBe(-0.16);
    const worldAnchorFromLocal = voxelFieldLocalToWorldOcean({
      localX: 2.15,
      localZ: 4.52,
    });
    expect(worldAnchorFromLocal.worldX).toBeCloseTo(HEADLAND_WORLD_OCEAN_ANCHOR.worldX, 2);
    expect(worldAnchorFromLocal.worldZ).toBeCloseTo(HEADLAND_WORLD_OCEAN_ANCHOR.worldZ, 2);
    expect(worldAnchorFromLocal).not.toEqual({ worldX: 2.15, worldZ: 4.52 });
    expect(headlandContainsVoxelFieldLocal({ localX: 2.15, localZ: 4.52 })).toBe(true);

    const localAnchor = worldOceanToVoxelFieldLocal(HEADLAND_WORLD_OCEAN_ANCHOR);
    const roundTrip = voxelFieldLocalToWorldOcean(localAnchor);
    expect(roundTrip.worldX).toBeCloseTo(HEADLAND_WORLD_OCEAN_ANCHOR.worldX, 12);
    expect(roundTrip.worldZ).toBeCloseTo(HEADLAND_WORLD_OCEAN_ANCHOR.worldZ, 12);
  });
});
