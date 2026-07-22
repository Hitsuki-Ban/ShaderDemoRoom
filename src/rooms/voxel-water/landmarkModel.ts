import { VOXEL_FIELD_YAW, VOXEL_SPACING } from './waveModel';

export const LANDMARK_INSTANCE_BUDGET = 512;

export type LandmarkRole = 'rock' | 'tower' | 'roof' | 'beacon';
export type LandmarkColorRole =
  | 'headland-dark'
  | 'tower-light'
  | 'roof-dark'
  | 'beacon-warm';

export type WorldOceanXZ = Readonly<{
  worldX: number;
  worldZ: number;
}>;

export type VoxelFieldLocalXZ = Readonly<{
  localX: number;
  localZ: number;
}>;

export type LandmarkBoxInstance = Readonly<{
  role: LandmarkRole;
  worldPosition: readonly [worldX: number, y: number, worldZ: number];
  scale: readonly [x: number, y: number, z: number];
  colorRole: LandmarkColorRole;
}>;

export type LandmarkModel = Readonly<{
  instances: readonly LandmarkBoxInstance[];
}>;

export const HEADLAND_WORLD_OCEAN_ANCHOR = {
  worldX: 1.4,
  worldZ: 4.8,
} as const satisfies WorldOceanXZ;

export const LIGHTHOUSE_BASE_WORLD_OCEAN = {
  worldX: -0.8,
  worldZ: 0,
} as const satisfies WorldOceanXZ;

export const WATER_MID_WORLD_OCEAN = {
  worldX: 4.7,
  worldZ: -6.6,
} as const satisfies WorldOceanXZ;

export const LANDMARK_WORLD_BOUNDS = {
  min: [-2.25, -0.301, -1.35],
  max: [2.8, 6.1, 6.25],
} as const;

export type HeadlandSegmentWorldOcean = Readonly<{
  start: WorldOceanXZ;
  end: WorldOceanXZ;
  radius: number;
}>;

const HEADLAND_SPINE_WORLD_OCEAN = [
  HEADLAND_WORLD_OCEAN_ANCHOR,
  { worldX: 0.9, worldZ: 3.65 },
  { worldX: 0.15, worldZ: 2.5 },
  { worldX: -0.48, worldZ: 1.25 },
  LIGHTHOUSE_BASE_WORLD_OCEAN,
] as const satisfies readonly WorldOceanXZ[];

const HEADLAND_SEGMENT_RADII = [1.15, 1.12, 1.08, 1.02] as const;

export const HEADLAND_SEGMENTS_WORLD_OCEAN: readonly HeadlandSegmentWorldOcean[] = Object.freeze(
  HEADLAND_SEGMENT_RADII.map((radius, index) => Object.freeze({
    start: HEADLAND_SPINE_WORLD_OCEAN[index],
    end: HEADLAND_SPINE_WORLD_OCEAN[index + 1],
    radius,
  })),
);

const ROCK_CELL_SIZE = 0.5;
const ROCK_GRID_STEP = 0.5;
const ROCK_BOTTOM_Y = -0.3;
const ROCK_FOOTPRINT_INSET = Math.SQRT2 * ROCK_CELL_SIZE * 0.5;
const TOWER_LAYER_HEIGHT = 0.4;
const TOWER_LAYER_COUNT = 7;

function assertFiniteWorldOcean(position: WorldOceanXZ) {
  if (!Number.isFinite(position.worldX) || !Number.isFinite(position.worldZ)) {
    throw new Error('World/ocean coordinates must be finite.');
  }
}

function assertFiniteVoxelFieldLocal(position: VoxelFieldLocalXZ) {
  if (!Number.isFinite(position.localX) || !Number.isFinite(position.localZ)) {
    throw new Error('Voxel-field-local coordinates must be finite.');
  }
}

export function voxelFieldLocalToWorldOcean(
  position: VoxelFieldLocalXZ,
): WorldOceanXZ {
  assertFiniteVoxelFieldLocal(position);
  const cosine = Math.cos(VOXEL_FIELD_YAW);
  const sine = Math.sin(VOXEL_FIELD_YAW);
  return {
    worldX: position.localX * cosine + position.localZ * sine,
    worldZ: -position.localX * sine + position.localZ * cosine,
  };
}

export function worldOceanToVoxelFieldLocal(
  position: WorldOceanXZ,
): VoxelFieldLocalXZ {
  assertFiniteWorldOcean(position);
  const cosine = Math.cos(VOXEL_FIELD_YAW);
  const sine = Math.sin(VOXEL_FIELD_YAW);
  return {
    localX: position.worldX * cosine - position.worldZ * sine,
    localZ: position.worldX * sine + position.worldZ * cosine,
  };
}

function signedDistanceToCapsule(
  position: WorldOceanXZ,
  segment: HeadlandSegmentWorldOcean,
) {
  const segmentX = segment.end.worldX - segment.start.worldX;
  const segmentZ = segment.end.worldZ - segment.start.worldZ;
  const offsetX = position.worldX - segment.start.worldX;
  const offsetZ = position.worldZ - segment.start.worldZ;
  const segmentLengthSquared = segmentX * segmentX + segmentZ * segmentZ;
  const projection = Math.min(
    1,
    Math.max(0, (offsetX * segmentX + offsetZ * segmentZ) / segmentLengthSquared),
  );
  return Math.hypot(
    offsetX - segmentX * projection,
    offsetZ - segmentZ * projection,
  ) - segment.radius;
}

export function signedDistanceToHeadlandWorldOcean(position: WorldOceanXZ) {
  assertFiniteWorldOcean(position);
  let distance = Number.POSITIVE_INFINITY;
  for (const segment of HEADLAND_SEGMENTS_WORLD_OCEAN) {
    distance = Math.min(distance, signedDistanceToCapsule(position, segment));
  }
  return distance;
}

export function headlandContainsWorldOcean(position: WorldOceanXZ) {
  return signedDistanceToHeadlandWorldOcean(position) <= 0;
}

export function signedDistanceToHeadlandVoxelFieldLocal(
  position: VoxelFieldLocalXZ,
) {
  return signedDistanceToHeadlandWorldOcean(voxelFieldLocalToWorldOcean(position));
}

export function headlandContainsVoxelFieldLocal(position: VoxelFieldLocalXZ) {
  return signedDistanceToHeadlandVoxelFieldLocal(position) <= 0;
}

function unscaledHeadlandHeight(worldX: number, worldZ: number) {
  const depth = -signedDistanceToHeadlandWorldOcean({ worldX, worldZ });
  const blockContour = 0.12 * Math.sin(worldX * 2.1 + worldZ * 1.4);
  return 1.4 + Math.max(0, depth) * 0.7 + blockContour;
}

const ROCK_FOOTPRINT_CENTERS = (() => {
  const centers: WorldOceanXZ[] = [];
  for (let worldZ = -1; worldZ <= 5.9; worldZ += ROCK_GRID_STEP) {
    for (let worldX = -1.9; worldX <= 2.4; worldX += ROCK_GRID_STEP) {
      if (signedDistanceToHeadlandWorldOcean({ worldX, worldZ }) <= -ROCK_FOOTPRINT_INSET) {
        centers.push({ worldX, worldZ });
      }
    }
  }
  return centers;
})();

function squaresOverlap(
  firstCenter: WorldOceanXZ,
  firstHalfExtent: number,
  firstYaw: number,
  secondCenter: WorldOceanXZ,
  secondHalfExtent: number,
) {
  const cosine = Math.cos(firstYaw);
  const sine = Math.sin(firstYaw);
  const firstAxes = [
    { worldX: cosine, worldZ: -sine },
    { worldX: sine, worldZ: cosine },
  ] as const;
  const secondAxes = [
    { worldX: 1, worldZ: 0 },
    { worldX: 0, worldZ: 1 },
  ] as const;
  const offsetX = secondCenter.worldX - firstCenter.worldX;
  const offsetZ = secondCenter.worldZ - firstCenter.worldZ;
  for (const axis of [...firstAxes, ...secondAxes]) {
    const centerDistance = Math.abs(offsetX * axis.worldX + offsetZ * axis.worldZ);
    const firstRadius = firstHalfExtent * (
      Math.abs(firstAxes[0].worldX * axis.worldX + firstAxes[0].worldZ * axis.worldZ)
      + Math.abs(firstAxes[1].worldX * axis.worldX + firstAxes[1].worldZ * axis.worldZ)
    );
    const secondRadius = secondHalfExtent * (Math.abs(axis.worldX) + Math.abs(axis.worldZ));
    if (centerDistance > firstRadius + secondRadius) return false;
  }
  return true;
}

export function landmarkCoversVoxelColumnWorldOcean(position: WorldOceanXZ) {
  assertFiniteWorldOcean(position);
  if (headlandContainsWorldOcean(position)) return true;
  return ROCK_FOOTPRINT_CENTERS.some((rockCenter) => squaresOverlap(
    position,
    VOXEL_SPACING * 0.5,
    VOXEL_FIELD_YAW,
    rockCenter,
    ROCK_CELL_SIZE * 0.5,
  ));
}

function createRockInstances() {
  return ROCK_FOOTPRINT_CENTERS.map(({ worldX, worldZ }): LandmarkBoxInstance => {
    const height = unscaledHeadlandHeight(worldX, worldZ);
    return {
      role: 'rock',
      worldPosition: [worldX, ROCK_BOTTOM_Y + height * 0.5, worldZ],
      scale: [ROCK_CELL_SIZE, height, ROCK_CELL_SIZE],
      colorRole: 'headland-dark',
    };
  });
}

function lighthouseBaseY() {
  return ROCK_BOTTOM_Y + unscaledHeadlandHeight(
    LIGHTHOUSE_BASE_WORLD_OCEAN.worldX,
    LIGHTHOUSE_BASE_WORLD_OCEAN.worldZ,
  );
}

function createTowerInstances(baseY: number) {
  return Array.from({ length: TOWER_LAYER_COUNT }, (_, index): LandmarkBoxInstance => {
    const progress = index / (TOWER_LAYER_COUNT - 1);
    const width = 0.84 * (1 - 0.25 * progress);
    return {
      role: 'tower',
      worldPosition: [
        LIGHTHOUSE_BASE_WORLD_OCEAN.worldX,
        baseY + TOWER_LAYER_HEIGHT * (index + 0.5),
        LIGHTHOUSE_BASE_WORLD_OCEAN.worldZ,
      ],
      scale: [width, TOWER_LAYER_HEIGHT, width],
      colorRole: 'tower-light',
    };
  });
}

function createRoofAndBeaconInstances(towerTopY: number): LandmarkBoxInstance[] {
  const centerX = LIGHTHOUSE_BASE_WORLD_OCEAN.worldX;
  const centerZ = LIGHTHOUSE_BASE_WORLD_OCEAN.worldZ;
  return [
    {
      role: 'roof',
      worldPosition: [centerX, towerTopY + 0.1, centerZ],
      scale: [1.3, 0.18, 1.3],
      colorRole: 'roof-dark',
    },
    {
      role: 'roof',
      worldPosition: [centerX, towerTopY + 0.27, centerZ],
      scale: [0.84, 0.16, 0.84],
      colorRole: 'roof-dark',
    },
    {
      role: 'beacon',
      worldPosition: LANDMARK_BEACON_WORLD_POSITION,
      scale: [0.52, 0.2, 0.52],
      colorRole: 'beacon-warm',
    },
  ];
}

function assertInstanceContract(instances: readonly LandmarkBoxInstance[]) {
  if (instances.length > LANDMARK_INSTANCE_BUDGET) {
    throw new Error(`Landmark layout exceeds ${LANDMARK_INSTANCE_BUDGET} box instances.`);
  }
  for (const instance of instances) {
    for (let axis = 0; axis < 3; axis += 1) {
      const position = instance.worldPosition[axis];
      const scale = instance.scale[axis];
      const minimum = position - scale * 0.5;
      const maximum = position + scale * 0.5;
      if (!Number.isFinite(position) || !Number.isFinite(scale) || scale <= 0) {
        throw new Error('Landmark instance transforms must be finite with positive scale.');
      }
      if (minimum < LANDMARK_WORLD_BOUNDS.min[axis]
        || maximum > LANDMARK_WORLD_BOUNDS.max[axis]) {
        throw new Error('Landmark instance exceeds the declared world bounds.');
      }
    }
  }
}

const LIGHTHOUSE_BASE_Y = lighthouseBaseY();
const TOWER_TOP_Y = LIGHTHOUSE_BASE_Y + TOWER_LAYER_COUNT * TOWER_LAYER_HEIGHT;

export const LANDMARK_BEACON_WORLD_POSITION = [
  LIGHTHOUSE_BASE_WORLD_OCEAN.worldX,
  TOWER_TOP_Y + 0.42,
  LIGHTHOUSE_BASE_WORLD_OCEAN.worldZ,
] as const;

const LANDMARK_INSTANCES = [
  ...createRockInstances(),
  ...createTowerInstances(LIGHTHOUSE_BASE_Y),
  ...createRoofAndBeaconInstances(TOWER_TOP_Y),
] as const;

assertInstanceContract(LANDMARK_INSTANCES);

export const LANDMARK_MODEL: LandmarkModel = Object.freeze({
  instances: Object.freeze(LANDMARK_INSTANCES),
});
