import { VOXEL_FIELD_YAW, VOXEL_SPACING } from './waveModel';

export const LANDMARK_INSTANCE_BUDGET = 512;

export const LANDMARK_CANDIDATE_IDS = [
  'sheltered',
  'balanced',
  'monumental',
] as const;

export type LandmarkCandidateId = typeof LANDMARK_CANDIDATE_IDS[number];
export type LandmarkRole = 'rock' | 'tower' | 'roof';
export type LandmarkColorRole = 'headland-dark' | 'tower-light' | 'roof-dark';

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

export type LandmarkCandidate = Readonly<{
  id: LandmarkCandidateId;
  headlandScreenShare: number;
  towerTaper: number;
  roofSilhouette: 'slab' | 'stepped' | 'spire';
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

type HeadlandSegment = Readonly<{
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

const HEADLAND_SEGMENTS: readonly HeadlandSegment[] = HEADLAND_SEGMENT_RADII.map(
  (radius, index) => ({
    start: HEADLAND_SPINE_WORLD_OCEAN[index],
    end: HEADLAND_SPINE_WORLD_OCEAN[index + 1],
    radius,
  }),
);

const ROCK_CELL_SIZE = 0.5;
const ROCK_GRID_STEP = 0.5;
const ROCK_BOTTOM_Y = -0.3;
const ROCK_FOOTPRINT_INSET = Math.SQRT2 * ROCK_CELL_SIZE * 0.5;
const TOWER_LAYER_HEIGHT = 0.4;
const TOWER_LAYER_COUNT = 7;

type CandidateSpec = Readonly<{
  headlandScreenShare: number;
  towerTaper: number;
  roofSilhouette: LandmarkCandidate['roofSilhouette'];
}>;

const CANDIDATE_SPECS: Record<LandmarkCandidateId, CandidateSpec> = {
  sheltered: {
    headlandScreenShare: 0.82,
    towerTaper: 0.05,
    roofSilhouette: 'slab',
  },
  balanced: {
    headlandScreenShare: 1,
    towerTaper: 0.25,
    roofSilhouette: 'stepped',
  },
  monumental: {
    headlandScreenShare: 1.18,
    towerTaper: 0.45,
    roofSilhouette: 'spire',
  },
};

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
  segment: HeadlandSegment,
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
  for (const segment of HEADLAND_SEGMENTS) {
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

function createRockInstances(headlandScreenShare: number) {
  return ROCK_FOOTPRINT_CENTERS.map(({ worldX, worldZ }): LandmarkBoxInstance => {
    const height = unscaledHeadlandHeight(worldX, worldZ) * headlandScreenShare;
    return {
      role: 'rock',
      worldPosition: [worldX, ROCK_BOTTOM_Y + height * 0.5, worldZ],
      scale: [ROCK_CELL_SIZE, height, ROCK_CELL_SIZE],
      colorRole: 'headland-dark',
    };
  });
}

function lighthouseBaseY(headlandScreenShare: number) {
  return ROCK_BOTTOM_Y + unscaledHeadlandHeight(
    LIGHTHOUSE_BASE_WORLD_OCEAN.worldX,
    LIGHTHOUSE_BASE_WORLD_OCEAN.worldZ,
  ) * headlandScreenShare;
}

function createTowerInstances(baseY: number, towerTaper: number) {
  return Array.from({ length: TOWER_LAYER_COUNT }, (_, index): LandmarkBoxInstance => {
    const progress = index / (TOWER_LAYER_COUNT - 1);
    const width = 0.84 * (1 - towerTaper * progress);
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

function createRoofInstances(
  towerTopY: number,
  silhouette: LandmarkCandidate['roofSilhouette'],
): LandmarkBoxInstance[] {
  const centerX = LIGHTHOUSE_BASE_WORLD_OCEAN.worldX;
  const centerZ = LIGHTHOUSE_BASE_WORLD_OCEAN.worldZ;
  if (silhouette === 'slab') {
    return [
      {
        role: 'roof',
        worldPosition: [centerX, towerTopY + 0.14, centerZ],
        scale: [1.34, 0.24, 1.34],
        colorRole: 'roof-dark',
      },
      {
        role: 'roof',
        worldPosition: [centerX, towerTopY + 0.36, centerZ],
        scale: [0.74, 0.2, 0.74],
        colorRole: 'roof-dark',
      },
    ];
  }
  if (silhouette === 'stepped') {
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
        role: 'roof',
        worldPosition: [centerX, towerTopY + 0.42, centerZ],
        scale: [0.52, 0.2, 0.52],
        colorRole: 'roof-dark',
      },
    ];
  }
  return [
    {
      role: 'roof',
      worldPosition: [centerX, towerTopY + 0.09, centerZ],
      scale: [1.24, 0.16, 1.24],
      colorRole: 'roof-dark',
    },
    {
      role: 'roof',
      worldPosition: [centerX, towerTopY + 0.24, centerZ],
      scale: [0.76, 0.14, 0.76],
      colorRole: 'roof-dark',
    },
    {
      role: 'roof',
      worldPosition: [centerX, towerTopY + 0.39, centerZ],
      scale: [0.42, 0.18, 0.42],
      colorRole: 'roof-dark',
    },
    {
      role: 'roof',
      worldPosition: [centerX, towerTopY + 0.55, centerZ],
      scale: [0.2, 0.14, 0.2],
      colorRole: 'roof-dark',
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

export function createLandmarkCandidate(candidateId: string): LandmarkCandidate {
  if (!LANDMARK_CANDIDATE_IDS.includes(candidateId as LandmarkCandidateId)) {
    throw new Error(`Unknown landmark candidate "${candidateId}".`);
  }
  const id = candidateId as LandmarkCandidateId;
  const spec = CANDIDATE_SPECS[id];
  const baseY = lighthouseBaseY(spec.headlandScreenShare);
  const towerTopY = baseY + TOWER_LAYER_COUNT * TOWER_LAYER_HEIGHT;
  const instances = [
    ...createRockInstances(spec.headlandScreenShare),
    ...createTowerInstances(baseY, spec.towerTaper),
    ...createRoofInstances(towerTopY, spec.roofSilhouette),
  ];
  assertInstanceContract(instances);
  return {
    id,
    headlandScreenShare: spec.headlandScreenShare,
    towerTaper: spec.towerTaper,
    roofSilhouette: spec.roofSilhouette,
    instances,
  };
}

export const LANDMARK_CANDIDATES = LANDMARK_CANDIDATE_IDS.map(createLandmarkCandidate);
export const ACTIVE_LANDMARK_CANDIDATE_ID = 'balanced' as const satisfies LandmarkCandidateId;
export const ACTIVE_LANDMARK_CANDIDATE = createLandmarkCandidate(
  ACTIVE_LANDMARK_CANDIDATE_ID,
);
