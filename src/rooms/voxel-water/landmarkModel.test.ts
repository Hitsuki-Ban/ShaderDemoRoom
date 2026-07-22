import { describe, expect, it } from 'vitest';
import { VOXEL_FIELD_YAW } from './waveModel';
import {
  HEADLAND_SEGMENTS_WORLD_OCEAN,
  HEADLAND_WORLD_OCEAN_ANCHOR,
  headlandContainsVoxelFieldLocal,
  headlandContainsWorldOcean,
  LANDMARK_BEACON_WORLD_POSITION,
  LANDMARK_INSTANCE_BUDGET,
  LANDMARK_MODEL,
  LANDMARK_WORLD_BOUNDS,
  landmarkCoversVoxelColumnWorldOcean,
  LIGHTHOUSE_BASE_WORLD_OCEAN,
  signedDistanceToHeadlandWorldOcean,
  voxelFieldLocalToWorldOcean,
  WATER_MID_WORLD_OCEAN,
  worldOceanToVoxelFieldLocal,
} from './landmarkModel';

describe('voxel water landmark model', () => {
  it('exports one stable, serializable pure-data model', () => {
    expect(Object.isFrozen(LANDMARK_MODEL)).toBe(true);
    expect(Object.isFrozen(LANDMARK_MODEL.instances)).toBe(true);
    expect(JSON.parse(JSON.stringify(LANDMARK_MODEL))).toEqual(LANDMARK_MODEL);
    expect(LANDMARK_MODEL.instances).toHaveLength(50);
  });

  it('keeps one connected footprint covering the world anchor and lighthouse base', () => {
    expect(HEADLAND_SEGMENTS_WORLD_OCEAN).toHaveLength(4);
    expect(Object.isFrozen(HEADLAND_SEGMENTS_WORLD_OCEAN)).toBe(true);
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
    expect(LANDMARK_MODEL.instances.length).toBeLessThanOrEqual(LANDMARK_INSTANCE_BUDGET);
    expect(new Set(LANDMARK_MODEL.instances.map((instance) => instance.role))).toEqual(
      new Set(['rock', 'tower', 'roof', 'beacon']),
    );
    expect(new Set(LANDMARK_MODEL.instances.map((instance) => instance.colorRole))).toEqual(
      new Set(['headland-dark', 'tower-light', 'roof-dark', 'beacon-warm']),
    );

    for (const instance of LANDMARK_MODEL.instances) {
      instance.worldPosition.forEach((position, axis) => {
        const halfScale = instance.scale[axis] * 0.5;
        expect(instance.scale[axis]).toBeGreaterThan(0);
        expect(position - halfScale).toBeGreaterThanOrEqual(LANDMARK_WORLD_BOUNDS.min[axis]);
        expect(position + halfScale).toBeLessThanOrEqual(LANDMARK_WORLD_BOUNDS.max[axis]);
      });
    }
  });

  it('places the beacon at the lighthouse top and exports that exact world position', () => {
    const beacon = LANDMARK_MODEL.instances.find((instance) => instance.role === 'beacon');
    expect(beacon).toBeDefined();
    expect(beacon?.worldPosition).toBe(LANDMARK_BEACON_WORLD_POSITION);
    expect(beacon?.colorRole).toBe('beacon-warm');

    const beaconTop = LANDMARK_BEACON_WORLD_POSITION[1] + (beacon?.scale[1] ?? 0) * 0.5;
    const highestInstanceTop = Math.max(...LANDMARK_MODEL.instances.map(
      (instance) => instance.worldPosition[1] + instance.scale[1] * 0.5,
    ));
    expect(beaconTop).toBe(highestInstanceTop);
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
