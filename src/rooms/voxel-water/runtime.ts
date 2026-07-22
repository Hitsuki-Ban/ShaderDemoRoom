import {
  AmbientLight,
  BackSide,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Fog,
  Group,
  InstancedBufferAttribute,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
  Vector4,
  type Material,
} from 'three';
import type {
  DeepReadonly,
  RoomFrame,
  RoomRuntime,
  RoomRuntimeContext,
  RoomSize,
  VoxelWaterSettings,
} from '../types';
import fragmentShaderTemplate from './water.frag.glsl?raw';
import skyFragmentShader from './sky.frag.glsl?raw';
import skyVertexShader from './sky.vert.glsl?raw';
import vertexShaderTemplate from './water.vert.glsl?raw';
import {
  HEADLAND_SEGMENTS_WORLD_OCEAN,
  LANDMARK_MODEL,
  landmarkCoversVoxelColumnWorldOcean,
} from './landmarkModel';
import {
  rainParticleFragmentShader,
  rainParticleVertexShader,
  sprayParticleFragmentShader,
  sprayParticleVertexShader,
} from './particleShaders';
import {
  buildColumnVertexShader,
  buildColumnFragmentShader,
  buildWaterFragmentShader,
  buildWaterVertexShader,
  COLUMN_WAVE_PROGRAM_KEY,
  quantizeColumnColorTime,
  quantizeWave,
  OCEAN_SNAP_CELL_MULTIPLE,
  sampleWave,
  STORM_GRID_CELL_MULTIPLE,
  VOXEL_FIELD_OFFSET,
  VOXEL_FIELD_YAW,
  VOXEL_SPACING,
  WATER_GRID_CELL_MULTIPLE,
  writeSunDirection,
} from './waveModel';

export const voxelWaterVertexShader = buildWaterVertexShader(vertexShaderTemplate);
export const voxelWaterFragmentShader = buildWaterFragmentShader(fragmentShaderTemplate);

export type WeatherLook = {
  strength: number;
  waterTint: Color;
  fogColor: Color;
  ambientColor: Color;
  sunColor: Color;
  rimColor: Color;
  lightningTint: Color;
  cloudColor: Color;
  backgroundColor: Color;
  columnTint: Color;
  columnTopTint: Color;
  columnEmissive: Color;
  fogDensity: number;
  fogNear: number;
  fogFar: number;
  rainCurtain: number;
  precipitationBase: number;
  precipitationResponse: number;
  rainStreakLength: number;
  rainStreakColor: Color;
  rippleStrength: number;
  waveHeightScale: number;
  waveHeightFloor: number;
  chopFloor: number;
  foamFloor: number;
  sunVisibility: number;
  lightningIntensity: number;
  ambientBase: number;
  sunBase: number;
  columnTintMix: number;
  columnBrightness: number;
  columnLightFloor: number;
  cloudContrast: number;
  cloudCoverage: number;
  cloudBaseHeight: number;
  cloudHeightScale: number;
  cloudJaggedness: number;
  landmarkEmissive: Color;
  landmarkEmissiveIntensity: number;
  landmarkEmissiveLift: number;
  landmarkRoughness: number;
  beaconColor: Color;
  beaconEmissiveStrength: number;
  beaconPulseAmplitude: number;
};

export const WEATHER_LOOKS = {
  clear: {
    strength: 0,
    waterTint: new Color(0x2b727b),
    fogColor: new Color(0xedf2d9),
    ambientColor: new Color(0x86cdb0),
    sunColor: new Color(0xffd89b),
    rimColor: new Color(0x86cdb0),
    lightningTint: new Color(0xedf2d9),
    cloudColor: new Color(0xb4d3bd),
    backgroundColor: new Color(0x86cdb0),
    columnTint: new Color(0x123a52),
    columnTopTint: new Color(0x86cdb0),
    columnEmissive: new Color(0x123a52),
    fogDensity: 0.22,
    fogNear: 34,
    fogFar: 70,
    rainCurtain: 0.02,
    precipitationBase: 0,
    precipitationResponse: 0.12,
    rainStreakLength: 12,
    rainStreakColor: new Color(0xe5f8ff),
    rippleStrength: 0,
    waveHeightScale: 0.72,
    waveHeightFloor: 0.1,
    chopFloor: 0,
    foamFloor: 0,
    sunVisibility: 1,
    lightningIntensity: 0,
    ambientBase: 0.56,
    sunBase: 7,
    columnTintMix: 0.18,
    columnBrightness: 0.84,
    columnLightFloor: 0.02,
    cloudContrast: 0.22,
    cloudCoverage: 0.25,
    cloudBaseHeight: 5,
    cloudHeightScale: 0.58,
    cloudJaggedness: 0.08,
    landmarkEmissive: new Color(0x050c12),
    landmarkEmissiveIntensity: 0.08,
    landmarkEmissiveLift: 0.55,
    landmarkRoughness: 0.86,
    beaconColor: new Color(0xffd89b),
    beaconEmissiveStrength: 0.96,
    beaconPulseAmplitude: 0.16,
  },
  rain: {
    strength: 0.48,
    waterTint: new Color(0x27515f),
    fogColor: new Color(0x9bb8b0),
    ambientColor: new Color(0x6b9296),
    sunColor: new Color(0xd4d9c5),
    rimColor: new Color(0x78b7a8),
    lightningTint: new Color(0xe8f1dc),
    cloudColor: new Color(0x607b83),
    backgroundColor: new Color(0x58777d),
    columnTint: new Color(0x102f45),
    columnTopTint: new Color(0x639b91),
    columnEmissive: new Color(0x102f45),
    fogDensity: 0.48,
    fogNear: 24,
    fogFar: 64,
    rainCurtain: 0.38,
    precipitationBase: 0.42,
    precipitationResponse: 0.38,
    rainStreakLength: 90,
    rainStreakColor: new Color(0x527b8d),
    rippleStrength: 0.72,
    waveHeightScale: 1,
    waveHeightFloor: 0.62,
    chopFloor: 0.44,
    foamFloor: 0.42,
    sunVisibility: 0.46,
    lightningIntensity: 0.06,
    ambientBase: 0.44,
    sunBase: 5.5,
    columnTintMix: 0.28,
    columnBrightness: 0.18,
    columnLightFloor: 0.01,
    cloudContrast: 0.68,
    cloudCoverage: 0.78,
    cloudBaseHeight: 4,
    cloudHeightScale: 0.9,
    cloudJaggedness: 0.24,
    landmarkEmissive: new Color(0x050b12),
    landmarkEmissiveIntensity: 0.1,
    landmarkEmissiveLift: 0.75,
    landmarkRoughness: 0.78,
    beaconColor: new Color(0xffd093),
    beaconEmissiveStrength: 0.72,
    beaconPulseAmplitude: 0.24,
  },
  storm: {
    strength: 0.88,
    waterTint: new Color(0x173b4e),
    fogColor: new Color(0x718487),
    ambientColor: new Color(0x416570),
    sunColor: new Color(0xa8b4a5),
    rimColor: new Color(0x639b91),
    lightningTint: new Color(0xe8f1dc),
    cloudColor: new Color(0x354e5e),
    backgroundColor: new Color(0x294657),
    columnTint: new Color(0x071b34),
    columnTopTint: new Color(0x426f70),
    columnEmissive: new Color(0x071b34),
    fogDensity: 0.62,
    fogNear: 20,
    fogFar: 58,
    rainCurtain: 0.6,
    precipitationBase: 0.68,
    precipitationResponse: 0.32,
    rainStreakLength: 98,
    rainStreakColor: new Color(0xe5f8ff),
    rippleStrength: 0.94,
    waveHeightScale: 1,
    waveHeightFloor: 0.95,
    chopFloor: 0.78,
    foamFloor: 0.72,
    sunVisibility: 0,
    lightningIntensity: 0.42,
    ambientBase: 0.18,
    sunBase: 3,
    columnTintMix: 0.34,
    columnBrightness: 0.08,
    columnLightFloor: 0,
    cloudContrast: 1,
    cloudCoverage: 0.82,
    cloudBaseHeight: 3.8,
    cloudHeightScale: 1.16,
    cloudJaggedness: 0.86,
    landmarkEmissive: new Color(0x040a10),
    landmarkEmissiveIntensity: 0.12,
    landmarkEmissiveLift: 1,
    landmarkRoughness: 0.72,
    beaconColor: new Color(0xffc878),
    beaconEmissiveStrength: 0.9,
    beaconPulseAmplitude: 0.34,
  },
} satisfies Record<VoxelWaterSettings['weather'], WeatherLook>;

function resolveWeatherSettings(
  settings: DeepReadonly<VoxelWaterSettings>,
  weatherLook: WeatherLook,
): VoxelWaterSettings {
  return {
    ...settings,
    rain: Math.min(1, weatherLook.precipitationBase + settings.rain * weatherLook.precipitationResponse),
    waveHeight: Math.max(
      settings.waveHeight * weatherLook.waveHeightScale,
      weatherLook.waveHeightFloor,
    ),
    chop: Math.max(settings.chop, weatherLook.chopFloor),
    foam: Math.max(settings.foam, weatherLook.foamFloor),
  };
}

const PRESENTATION_DRIFT_AMPLITUDE = 0.003;
const PRESENTATION_DRIFT_SPEED = 0.035;
const RAIN_DROP_COUNT = 200;
const SPRAY_DROP_COUNT = 96;
const CLOUD_CLUSTER_COUNT = 12;
const CLOUD_VOXELS_PER_CLUSTER = 5;
const CLOUD_VOXEL_COUNT = CLOUD_CLUSTER_COUNT * CLOUD_VOXELS_PER_CLUSTER;
const WATER_PLANE_SIZE = 156;
const WATER_PLANE_SEGMENTS = 72;
const VOXEL_GRID_SIDE = 64;
const VOXEL_SIZE = VOXEL_SPACING;
const SKY_RADIUS = 62;
const OCEAN_SNAP_SIZE = VOXEL_SPACING * OCEAN_SNAP_CELL_MULTIPLE;
const INFINITE_OCEAN_STRATEGY = 'hybrid-near-voxel-field-camera-relative-far-plane';
const HEADLAND_SEGMENT_COUNT = 4;
const LANDMARK_EMISSIVE_PROGRAM_KEY = 'voxel-water-landmark-emissive-v3';
const LANDMARK_EMISSIVE_MARKER = '#include <emissivemap_fragment>';
const LANDMARK_VERTEX_MARKER = '#include <begin_vertex>';

function createSeededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function hashCell(x: number, z: number) {
  const value = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function disposeSceneResources(scene: Scene) {
  const instancedMeshes = new Set<InstancedMesh>();
  const geometries = new Set<BufferGeometry>();
  const materials = new Set<Material>();

  scene.traverse((object) => {
    if (object instanceof InstancedMesh) instancedMeshes.add(object);
    if (!(object instanceof Mesh || object instanceof LineSegments)) return;
    geometries.add(object.geometry);
    const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
    objectMaterials.forEach((material) => materials.add(material));
  });

  instancedMeshes.forEach((mesh) => mesh.dispose());
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
}

export function createRoomRuntime(
  { renderer, motionScale: initialMotionScale }: RoomRuntimeContext,
  initialSettings: DeepReadonly<VoxelWaterSettings>,
): RoomRuntime<VoxelWaterSettings> {
  let settings: DeepReadonly<VoxelWaterSettings> = initialSettings;
  let motionScale = initialMotionScale;
  let motionElapsed = 0;
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.3, 72);
  const root = new Group();
  const matrix = new Matrix4();
  const columnColor = new Color();
  const lowColumnColor = new Color(0x3a7f84);
  const troughColumnColor = new Color(0x071b34);
  const highColumnColor = new Color(0x86cdb0);
  const foamColumnColor = new Color(0xedf2d9);
  const warmColumnColor = new Color(0x516f68);
  const coolColumnColor = new Color(0x315a69);
  const edgeMistColumnColor = new Color(0x244d5b);
  const stormShadowColumnColor = new Color(0x071b34);
  const clockColor = new Color();
  const cloudDeckColor = new Color();
  const weatherColumnColor = new Color();
  const cameraRelativeOceanOffset = new Vector3();
  const oceanUniformOrigin = new Vector2();
  const sunDirection = new Vector3();
  const random = createSeededRandom(0x5ea9f1);
  const initialWeatherLook = WEATHER_LOOKS[settings.weather];
  let effectiveSettings = resolveWeatherSettings(settings, initialWeatherLook);
  let colorRefreshRequested = true;
  let lastColumnColorStep = -1;

  writeSunDirection(settings.skyTime, sunDirection);
  const waveUniforms = {
    uTime: { value: 0 },
    uWaveHeight: { value: effectiveSettings.waveHeight },
    uWind: { value: settings.wind },
    uSwell: { value: settings.swell },
    uChop: { value: effectiveSettings.chop },
    uSurfaceDetail: { value: settings.surfaceDetail },
    uFoam: { value: effectiveSettings.foam },
  };
  if (HEADLAND_SEGMENTS_WORLD_OCEAN.length !== HEADLAND_SEGMENT_COUNT) {
    throw new Error(`Water shader requires exactly ${HEADLAND_SEGMENT_COUNT} headland capsule segments.`);
  }
  const headlandCapsuleUniforms = HEADLAND_SEGMENTS_WORLD_OCEAN.map(({ start, end }) => (
    new Vector4(start.worldX, start.worldZ, end.worldX, end.worldZ)
  ));
  const headlandRadiusUniforms = HEADLAND_SEGMENTS_WORLD_OCEAN.map(({ radius }) => radius);
  const sunDirectionUniform = { value: sunDirection };
  const columnWeatherStrengthUniform = { value: initialWeatherLook.strength };
  const currentDirectionUniform = { value: new Vector2() };
  const currentDirectionRadians = settings.currentDirection * Math.PI / 180;
  currentDirectionUniform.value.set(
    Math.cos(currentDirectionRadians),
    Math.sin(currentDirectionRadians),
  );

  scene.add(root);
  scene.fog = new Fog(initialWeatherLook.fogColor, initialWeatherLook.fogNear, initialWeatherLook.fogFar);
  camera.position.set(5.8, 7.2, 13.8);
  camera.lookAt(0, -0.08, -5);

  const ambient = new AmbientLight(initialWeatherLook.ambientColor, initialWeatherLook.ambientBase);
  const sun = new DirectionalLight(initialWeatherLook.sunColor, initialWeatherLook.sunBase);
  sun.position.copy(sunDirection).multiplyScalar(10);
  scene.add(ambient, sun);

  const skyMaterial = new ShaderMaterial({
    vertexShader: skyVertexShader,
    fragmentShader: skyFragmentShader,
    side: BackSide,
    depthWrite: false,
    depthTest: false,
    uniforms: {
      uTime: { value: 0 },
      uStorm: { value: initialWeatherLook.strength },
      uCloudCover: { value: settings.cloudCover },
      uSkyTime: { value: settings.skyTime },
      uColorTemperature: { value: settings.colorTemperature },
      uWeatherSkyTint: { value: initialWeatherLook.backgroundColor.clone() },
      uWeatherHorizonTint: { value: initialWeatherLook.fogColor.clone() },
      uWeatherCloudTint: { value: initialWeatherLook.cloudColor.clone() },
      uWeatherLightningTint: { value: initialWeatherLook.lightningTint.clone() },
      uLightningPulse: { value: 0 },
      uSunVisibility: { value: initialWeatherLook.sunVisibility },
      uSunDirection: sunDirectionUniform,
    },
  });
  const sky = new Mesh(new SphereGeometry(SKY_RADIUS, 36, 18), skyMaterial);
  sky.renderOrder = 0;
  scene.add(sky);

  const waterMaterial = new ShaderMaterial({
    vertexShader: voxelWaterVertexShader,
    fragmentShader: voxelWaterFragmentShader,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    uniforms: {
      ...waveUniforms,
      uRain: { value: effectiveSettings.rain },
      uStorm: { value: initialWeatherLook.strength },
      uCloudCover: { value: settings.cloudCover },
      uToonSteps: { value: settings.toonSteps },
      uClarity: { value: settings.clarity },
      uCurrentDirectionXZ: currentDirectionUniform,
      uCurrentStrength: { value: settings.currentStrength },
      uSkyTime: { value: settings.skyTime },
      uColorTemperature: { value: settings.colorTemperature },
      uVoxelColorVariance: { value: settings.voxelColorVariance },
      uOceanOriginXZ: { value: oceanUniformOrigin },
      uWeatherWaterTint: { value: initialWeatherLook.waterTint.clone() },
      uWeatherFogColor: { value: initialWeatherLook.fogColor.clone() },
      uWeatherRimColor: { value: initialWeatherLook.rimColor.clone() },
      uWeatherLightningTint: { value: initialWeatherLook.lightningTint.clone() },
      uWeatherFogDensity: { value: initialWeatherLook.fogDensity },
      uRainCurtain: { value: initialWeatherLook.rainCurtain },
      uWeatherRippleStrength: { value: initialWeatherLook.rippleStrength },
      uLightningPulse: { value: 0 },
      uVoxelSpacing: { value: VOXEL_SPACING },
      uWaterGridCellMultiple: { value: WATER_GRID_CELL_MULTIPLE },
      uStormGridCellMultiple: { value: STORM_GRID_CELL_MULTIPLE },
      uVoxelFieldOffset: { value: new Vector2(VOXEL_FIELD_OFFSET.x, VOXEL_FIELD_OFFSET.z) },
      uVoxelFieldBasis: {
        value: new Vector2(Math.cos(VOXEL_FIELD_YAW), Math.sin(VOXEL_FIELD_YAW)),
      },
      uSunDirection: sunDirectionUniform,
      uHeadlandCapsules: { value: headlandCapsuleUniforms },
      uHeadlandRadii: { value: headlandRadiusUniforms },
    },
  });

  const planeGeometry = new PlaneGeometry(
    WATER_PLANE_SIZE,
    WATER_PLANE_SIZE,
    WATER_PLANE_SEGMENTS,
    WATER_PLANE_SEGMENTS,
  );
  planeGeometry.rotateX(-Math.PI / 2);
  const plane = new Mesh(
    planeGeometry,
    waterMaterial,
  );
  plane.name = 'voxel-water-surface';
  plane.renderOrder = 2;
  plane.userData.oceanStrategy = INFINITE_OCEAN_STRATEGY;
  root.add(plane);

  const landmarkGeometry = new BoxGeometry(1, 1, 1);
  const landmarkMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: initialWeatherLook.landmarkRoughness,
    metalness: 0.02,
    emissive: initialWeatherLook.landmarkEmissive,
    emissiveIntensity: initialWeatherLook.landmarkEmissiveIntensity,
    vertexColors: true,
    toneMapped: false,
    transparent: false,
    depthTest: true,
    depthWrite: true,
  });
  const landmarkEmissiveLiftUniform = { value: initialWeatherLook.landmarkEmissiveLift };
  const landmarkBeaconColorUniform = { value: initialWeatherLook.beaconColor.clone() };
  const landmarkBeaconEmissiveStrengthUniform = {
    value: initialWeatherLook.beaconEmissiveStrength,
  };
  const landmarkBeaconPulseAmplitudeUniform = {
    value: initialWeatherLook.beaconPulseAmplitude,
  };
  landmarkMaterial.onBeforeCompile = (shader) => {
    if (!shader.vertexShader.includes(LANDMARK_VERTEX_MARKER)
      || !shader.fragmentShader.includes(LANDMARK_EMISSIVE_MARKER)) {
      throw new Error('Landmark standard shader is missing its role-emissive injection markers.');
    }
    shader.uniforms.uLandmarkEmissiveLift = landmarkEmissiveLiftUniform;
    shader.uniforms.uTime = waveUniforms.uTime;
    shader.uniforms.uBeaconColor = landmarkBeaconColorUniform;
    shader.uniforms.uBeaconEmissiveStrength = landmarkBeaconEmissiveStrengthUniform;
    shader.uniforms.uBeaconPulseAmplitude = landmarkBeaconPulseAmplitudeUniform;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      '#include <common>\nattribute vec3 aLandmarkEmissiveColor;\nattribute float aLandmarkBeaconMask;\nvarying vec3 vLandmarkEmissiveColor;\nvarying float vLandmarkBeaconMask;',
    ).replace(
      LANDMARK_VERTEX_MARKER,
      `${LANDMARK_VERTEX_MARKER}\n      vLandmarkEmissiveColor = aLandmarkEmissiveColor;\n      vLandmarkBeaconMask = aLandmarkBeaconMask;`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      LANDMARK_EMISSIVE_MARKER,
      `${LANDMARK_EMISSIVE_MARKER}
      float landmarkBeaconPulse = 1.0
        + sin(uTime * 1.35) * uBeaconPulseAmplitude * vLandmarkBeaconMask;
      vec3 landmarkRoleEmissive = mix(
        vLandmarkEmissiveColor,
        uBeaconColor,
        vLandmarkBeaconMask
      );
      float landmarkRoleStrength = mix(
        1.0,
        uBeaconEmissiveStrength * landmarkBeaconPulse,
        vLandmarkBeaconMask
      );
      totalEmissiveRadiance += landmarkRoleEmissive
        * uLandmarkEmissiveLift
        * landmarkRoleStrength;`,
    ).replace(
      '#include <common>',
      '#include <common>\nuniform float uTime;\nuniform float uLandmarkEmissiveLift;\nuniform vec3 uBeaconColor;\nuniform float uBeaconEmissiveStrength;\nuniform float uBeaconPulseAmplitude;\nvarying vec3 vLandmarkEmissiveColor;\nvarying float vLandmarkBeaconMask;',
    );
  };
  landmarkMaterial.customProgramCacheKey = () => LANDMARK_EMISSIVE_PROGRAM_KEY;
  const landmark = new InstancedMesh(
    landmarkGeometry,
    landmarkMaterial,
    LANDMARK_MODEL.instances.length,
  );
  const landmarkColors = {
    'headland-dark': new Color(0x172b37),
    'tower-light': new Color(0xb7b9ab),
    'roof-dark': new Color(0x38464b),
    'beacon-warm': new Color(0xffd89b),
  } as const;
  const landmarkEmissiveColors = {
    'headland-dark': new Color(0x07131b),
    'tower-light': new Color(0xb8b1a0),
    'roof-dark': new Color(0x1d2b32),
    'beacon-warm': new Color(0xffb568),
  } as const;
  const landmarkEmissiveColorAttribute = new InstancedBufferAttribute(
    new Float32Array(LANDMARK_MODEL.instances.length * 3),
    3,
  );
  const landmarkBeaconMaskAttribute = new InstancedBufferAttribute(
    new Float32Array(LANDMARK_MODEL.instances.length),
    1,
  );
  for (let index = 0; index < LANDMARK_MODEL.instances.length; index += 1) {
    const instance = LANDMARK_MODEL.instances[index];
    matrix.makeScale(...instance.scale);
    matrix.setPosition(...instance.worldPosition);
    landmark.setMatrixAt(index, matrix);
    landmark.setColorAt(index, landmarkColors[instance.colorRole]);
    const emissiveColor = landmarkEmissiveColors[instance.colorRole];
    landmarkEmissiveColorAttribute.setXYZ(
      index,
      emissiveColor.r,
      emissiveColor.g,
      emissiveColor.b,
    );
    landmarkBeaconMaskAttribute.setX(index, instance.role === 'beacon' ? 1 : 0);
  }
  landmarkGeometry.setAttribute('aLandmarkEmissiveColor', landmarkEmissiveColorAttribute);
  landmarkGeometry.setAttribute('aLandmarkBeaconMask', landmarkBeaconMaskAttribute);
  landmarkEmissiveColorAttribute.needsUpdate = true;
  landmarkBeaconMaskAttribute.needsUpdate = true;
  landmark.instanceMatrix.needsUpdate = true;
  if (landmark.instanceColor) landmark.instanceColor.needsUpdate = true;
  landmark.frustumCulled = false;
  landmark.name = 'voxel-water-landmark';
  landmark.renderOrder = 1;
  root.add(landmark);

  const columnMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.58,
    metalness: 0.03,
    emissive: 0x54d8d3,
    emissiveIntensity: 0.68,
    vertexColors: true,
    toneMapped: false,
    transparent: false,
    depthTest: true,
    depthWrite: true,
  });
  columnMaterial.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, waveUniforms, {
      uColumnWeatherStrength: columnWeatherStrengthUniform,
      uColumnFoam: waveUniforms.uFoam,
    });
    shader.vertexShader = buildColumnVertexShader(shader.vertexShader);
    shader.fragmentShader = buildColumnFragmentShader(shader.fragmentShader);
  };
  columnMaterial.customProgramCacheKey = () => COLUMN_WAVE_PROGRAM_KEY;
  const columnsPerSide = VOXEL_GRID_SIDE;
  const gridOffset = ((columnsPerSide - 1) * VOXEL_SPACING) / 2;
  const fieldYawCosine = Math.cos(VOXEL_FIELD_YAW);
  const fieldYawSine = Math.sin(VOXEL_FIELD_YAW);
  const columnCells = [];
  for (let z = 0; z < columnsPerSide; z += 1) {
    for (let x = 0; x < columnsPerSide; x += 1) {
      const px = x * VOXEL_SPACING - gridOffset + VOXEL_FIELD_OFFSET.x;
      const pz = z * VOXEL_SPACING - gridOffset + VOXEL_FIELD_OFFSET.z;
      const oceanX = px * fieldYawCosine + pz * fieldYawSine;
      const oceanZ = -px * fieldYawSine + pz * fieldYawCosine;
      if (landmarkCoversVoxelColumnWorldOcean({ worldX: oceanX, worldZ: oceanZ })) continue;
      columnCells.push({ x, z, px, pz, oceanX, oceanZ });
    }
  }
  const columnCount = columnCells.length;
  const columnGeometry = new BoxGeometry(VOXEL_SIZE, 1, VOXEL_SIZE);
  const columnNormals = columnGeometry.getAttribute('normal');
  const columnFaceColors = new Float32Array(columnNormals.count * 3);
  for (let index = 0; index < columnNormals.count; index += 1) {
    const normalY = columnNormals.getY(index);
    const faceValue = normalY < -0.5 ? 0.08 : 1;
    columnFaceColors[index * 3] = faceValue;
    columnFaceColors[index * 3 + 1] = faceValue;
    columnFaceColors[index * 3 + 2] = faceValue;
  }
  columnGeometry.setAttribute('color', new BufferAttribute(columnFaceColors, 3));
  const columns = new InstancedMesh(
    columnGeometry,
    columnMaterial,
    columnCount,
  );
  columns.instanceColor = new InstancedBufferAttribute(new Float32Array(columnCount * 3).fill(1), 3);
  columns.rotation.y = VOXEL_FIELD_YAW;
  columns.frustumCulled = false;
  columns.name = 'voxel-water-columns';
  columns.renderOrder = 1;
  columns.userData.landmarkExcludedCount = columnsPerSide * columnsPerSide - columnCount;
  root.add(columns);

  const oceanCoordinates = new Float32Array(columnCount * 2);
  const cellEdgeFade = new Float32Array(columnCount);
  const cellDepthFade = new Float32Array(columnCount);
  const cellNoise = new Float32Array(columnCount);
  for (let index = 0; index < columnCells.length; index += 1) {
    const { x, z, px, pz, oceanX, oceanZ } = columnCells[index];
    const edgeDistance = Math.min(x, z, columnsPerSide - 1 - x, columnsPerSide - 1 - z) / (columnsPerSide * 0.18);
    oceanCoordinates[index * 2] = oceanX;
    oceanCoordinates[index * 2 + 1] = oceanZ;
    cellEdgeFade[index] = Math.min(1, Math.max(0, edgeDistance));
    cellDepthFade[index] = Math.min(1, Math.max(0, (oceanZ + gridOffset) / (gridOffset * 2)));
    cellNoise[index] = hashCell(x, z) - 0.5;
    matrix.makeTranslation(px, 0, pz);
    columns.setMatrixAt(index, matrix);
  }
  columnGeometry.setAttribute('aOceanXZ', new InstancedBufferAttribute(oceanCoordinates, 2));
  columns.instanceMatrix.needsUpdate = true;

  const gridExtent = gridOffset + VOXEL_SPACING * 0.5;
  const gridLinePadding = 28;
  const gridLinePositions = new Float32Array((columnsPerSide - 1) * 2 * 3);
  let gridLineIndex = 0;
  for (let i = 1; i < columnsPerSide; i += 1) {
    const position = -gridExtent + i * VOXEL_SPACING + VOXEL_FIELD_OFFSET.z;
    gridLinePositions[gridLineIndex++] = -gridExtent + VOXEL_FIELD_OFFSET.x - gridLinePadding;
    gridLinePositions[gridLineIndex++] = 0.03;
    gridLinePositions[gridLineIndex++] = position;
    gridLinePositions[gridLineIndex++] = gridExtent + VOXEL_FIELD_OFFSET.x + gridLinePadding;
    gridLinePositions[gridLineIndex++] = 0.03;
    gridLinePositions[gridLineIndex++] = position;
  }
  const gridLineGeometry = new BufferGeometry();
  gridLineGeometry.setAttribute('position', new BufferAttribute(gridLinePositions, 3));
  const gridLineMaterial = new LineBasicMaterial({
    color: 0x1599a0,
    transparent: true,
    opacity: 0.14,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const gridOverlay = new LineSegments(gridLineGeometry, gridLineMaterial);
  gridOverlay.rotation.y = VOXEL_FIELD_YAW;
  gridOverlay.name = 'voxel-water-grid';
  gridOverlay.renderOrder = 5;
  root.add(gridOverlay);

  const rainRandom = createSeededRandom(0x71a5eed);
  const rainGeometry = new PlaneGeometry(1, 1);
  const rainSeeds = new Float32Array(RAIN_DROP_COUNT);
  const rainSpeeds = new Float32Array(RAIN_DROP_COUNT);
  const rainScales = new Float32Array(RAIN_DROP_COUNT);
  const rainMatrices: Matrix4[] = [];
  for (let index = 0; index < RAIN_DROP_COUNT; index += 1) {
    matrix.makeTranslation(
      (rainRandom() - 0.5) * (WATER_PLANE_SIZE * 0.84),
      0,
      (rainRandom() - 0.5) * (WATER_PLANE_SIZE * 0.72),
    );
    rainMatrices.push(matrix.clone());
    rainSeeds[index] = rainRandom();
    rainSpeeds[index] = 0.7 + rainRandom();
    rainScales[index] = 0.68 + rainRandom() * 0.64;
  }
  rainGeometry.setAttribute('aSeed', new InstancedBufferAttribute(rainSeeds, 1));
  rainGeometry.setAttribute('aSpeed', new InstancedBufferAttribute(rainSpeeds, 1));
  rainGeometry.setAttribute('aScale', new InstancedBufferAttribute(rainScales, 1));
  const rainResolutionUniform = { value: new Vector2(1, 1) };
  const rainMaterial = new ShaderMaterial({
    vertexShader: rainParticleVertexShader,
    fragmentShader: rainParticleFragmentShader,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    fog: true,
    toneMapped: true,
    uniforms: {
      uTime: waveUniforms.uTime,
      uResolution: rainResolutionUniform,
      uColor: { value: new Color(0xe5f8ff) },
      uOpacity: { value: 0.36 },
      uLength: { value: 18 },
      uWind: { value: settings.wind },
      fogDensity: { value: initialWeatherLook.fogDensity },
      fogNear: { value: initialWeatherLook.fogNear },
      fogFar: { value: initialWeatherLook.fogFar },
      fogColor: { value: initialWeatherLook.fogColor.clone() },
    },
  });
  const rain = new InstancedMesh(rainGeometry, rainMaterial, RAIN_DROP_COUNT);
  for (let index = 0; index < RAIN_DROP_COUNT; index += 1) {
    rain.setMatrixAt(index, rainMatrices[index]);
  }
  rain.instanceMatrix.needsUpdate = true;
  rain.frustumCulled = false;
  rain.name = 'voxel-water-rain';
  rain.renderOrder = 4;
  root.add(rain);

  const sprayRandom = createSeededRandom(0x5f2a91);
  const sprayGeometry = new PlaneGeometry(1, 1);
  const spraySeeds = new Float32Array(SPRAY_DROP_COUNT);
  const spraySpeeds = new Float32Array(SPRAY_DROP_COUNT);
  const sprayScales = new Float32Array(SPRAY_DROP_COUNT);
  const sprayLaunches = new Float32Array(SPRAY_DROP_COUNT * 3);
  const sprayVelocities = new Float32Array(SPRAY_DROP_COUNT * 3);
  const sprayMatrices: Matrix4[] = [];
  for (let index = 0; index < SPRAY_DROP_COUNT; index += 1) {
    const angle = sprayRandom() * Math.PI * 2;
    const radialSpeed = 0.28 + sprayRandom() * 0.82;
    matrix.makeTranslation(
      (sprayRandom() - 0.5) * 13.5,
      0,
      (sprayRandom() - 0.5) * 13.5,
    );
    sprayMatrices.push(matrix.clone());
    sprayLaunches[index * 3] = (sprayRandom() - 0.5) * 0.65;
    sprayLaunches[index * 3 + 1] = 0.06 + sprayRandom() * 0.32;
    sprayLaunches[index * 3 + 2] = (sprayRandom() - 0.5) * 0.65;
    sprayVelocities[index * 3] = Math.cos(angle) * radialSpeed;
    sprayVelocities[index * 3 + 1] = 1.2 + sprayRandom() * 1.65;
    sprayVelocities[index * 3 + 2] = Math.sin(angle) * radialSpeed;
    spraySeeds[index] = sprayRandom();
    spraySpeeds[index] = 0.7 + sprayRandom();
    sprayScales[index] = 0.64 + sprayRandom() * 0.72;
  }
  sprayGeometry.setAttribute('aSeed', new InstancedBufferAttribute(spraySeeds, 1));
  sprayGeometry.setAttribute('aSpeed', new InstancedBufferAttribute(spraySpeeds, 1));
  sprayGeometry.setAttribute('aScale', new InstancedBufferAttribute(sprayScales, 1));
  sprayGeometry.setAttribute('aLaunch', new InstancedBufferAttribute(sprayLaunches, 3));
  sprayGeometry.setAttribute('aVelocity', new InstancedBufferAttribute(sprayVelocities, 3));
  const sprayResolutionUniform = { value: new Vector2(1, 1) };
  const sprayMaterial = new ShaderMaterial({
    vertexShader: sprayParticleVertexShader,
    fragmentShader: sprayParticleFragmentShader,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    fog: true,
    toneMapped: true,
    uniforms: {
      uTime: waveUniforms.uTime,
      uResolution: sprayResolutionUniform,
      uColor: { value: new Color(0xd6fbff) },
      uOpacity: { value: 0.28 },
      uLength: { value: 5.5 },
      uWind: { value: settings.wind },
      uFoam: waveUniforms.uFoam,
      fogDensity: { value: initialWeatherLook.fogDensity },
      fogNear: { value: initialWeatherLook.fogNear },
      fogFar: { value: initialWeatherLook.fogFar },
      fogColor: { value: initialWeatherLook.fogColor.clone() },
    },
  });
  const spray = new InstancedMesh(sprayGeometry, sprayMaterial, SPRAY_DROP_COUNT);
  for (let index = 0; index < SPRAY_DROP_COUNT; index += 1) {
    spray.setMatrixAt(index, sprayMatrices[index]);
  }
  spray.instanceMatrix.needsUpdate = true;
  spray.frustumCulled = false;
  spray.name = 'voxel-water-spray';
  spray.renderOrder = 3;
  root.add(spray);

  const cloudMaterial = new MeshBasicMaterial({
    color: cloudDeckColor
      .copy(initialWeatherLook.backgroundColor)
      .lerp(initialWeatherLook.cloudColor, initialWeatherLook.cloudContrast),
  });
  const cloudGeometry = new BoxGeometry(1, 1, 1);
  const cloudDeck = new InstancedMesh(cloudGeometry, cloudMaterial, CLOUD_VOXEL_COUNT);
  const cloudVoxel = new Object3D();
  const cloudVoxels: Array<{
    position: [number, number, number];
    rotationY: number;
    scale: [number, number, number];
    jaggedOffset: number;
  }> = [];
  const cloudShade = new Color();
  const cloudBlockOffsets = [
    [-0.95, 0.02, -0.04, 1.28, 0.46, 0.62, 0.82],
    [0, 0.08, 0, 1.9, 0.58, 0.78, 0.92],
    [1.08, -0.03, 0.04, 1.16, 0.43, 0.58, 0.76],
    [0.18, 0.42, -0.03, 0.92, 0.48, 0.52, 1.04],
    [-0.22, -0.38, 0.06, 1.18, 0.36, 0.5, 0.48],
  ] as const;
  for (let cluster = 0; cluster < CLOUD_CLUSTER_COUNT; cluster += 1) {
    const baseX = (random() - 0.5) * 22;
    const baseZ = -5.2 - random() * 8.6;
    const yaw = (random() - 0.5) * 0.52;
    const clusterScale = 0.78 + random() * 0.52;
    const cosine = Math.cos(yaw);
    const sine = Math.sin(yaw);
    for (let block = 0; block < cloudBlockOffsets.length; block += 1) {
      const [offsetX, offsetY, offsetZ, scaleX, scaleY, scaleZ, shade]
        = cloudBlockOffsets[block];
      const localX = offsetX * clusterScale;
      const localZ = offsetZ * clusterScale;
      const position: [number, number, number] = [
        baseX + localX * cosine - localZ * sine,
        offsetY * (0.84 + random() * 0.32),
        baseZ + localX * sine + localZ * cosine,
      ];
      const rotationY = yaw + (random() - 0.5) * 0.08;
      const scale: [number, number, number] = [
        scaleX * clusterScale * (0.88 + random() * 0.24),
        scaleY * (0.86 + random() * 0.28),
        scaleZ * clusterScale * (0.88 + random() * 0.24),
      ];
      const clusterStep = ((cluster * 5) % 7 - 3) * 0.24;
      const blockStep = [-0.05, 0.12, -0.18, 0.22, -0.4][block];
      cloudVoxels.push({
        position,
        rotationY,
        scale,
        jaggedOffset: clusterStep + blockStep,
      });
      cloudShade.setRGB(shade, shade, shade);
      cloudDeck.setColorAt(cloudVoxels.length - 1, cloudShade);
    }
  }
  const applyCloudShape = (weatherLook: WeatherLook) => {
    for (let index = 0; index < cloudVoxels.length; index += 1) {
      const cloud = cloudVoxels[index];
      cloudVoxel.position.set(
        cloud.position[0],
        cloud.position[1] + cloud.jaggedOffset * weatherLook.cloudJaggedness,
        cloud.position[2],
      );
      cloudVoxel.rotation.set(0, cloud.rotationY, 0);
      cloudVoxel.scale.set(...cloud.scale);
      cloudVoxel.updateMatrix();
      cloudDeck.setMatrixAt(index, cloudVoxel.matrix);
    }
    cloudDeck.instanceMatrix.needsUpdate = true;
  };
  applyCloudShape(initialWeatherLook);
  if (cloudDeck.instanceColor) cloudDeck.instanceColor.needsUpdate = true;
  cloudDeck.position.y = initialWeatherLook.cloudBaseHeight;
  cloudDeck.scale.y = initialWeatherLook.cloudHeightScale;
  cloudDeck.frustumCulled = false;
  cloudDeck.name = 'voxel-water-clouds';
  root.add(cloudDeck);

  const updateUniforms = () => {
    const weatherLook = WEATHER_LOOKS[settings.weather];
    effectiveSettings = resolveWeatherSettings(settings, weatherLook);
    waterMaterial.uniforms.uWaveHeight.value = effectiveSettings.waveHeight;
    waterMaterial.uniforms.uWind.value = settings.wind;
    waterMaterial.uniforms.uRain.value = effectiveSettings.rain;
    waterMaterial.uniforms.uStorm.value = weatherLook.strength;
    waterMaterial.uniforms.uCloudCover.value = settings.cloudCover;
    waterMaterial.uniforms.uToonSteps.value = settings.toonSteps;
    waterMaterial.uniforms.uSwell.value = settings.swell;
    waterMaterial.uniforms.uChop.value = effectiveSettings.chop;
    waterMaterial.uniforms.uFoam.value = effectiveSettings.foam;
    waterMaterial.uniforms.uClarity.value = settings.clarity;
    waterMaterial.uniforms.uSurfaceDetail.value = settings.surfaceDetail;
    const currentRadians = settings.currentDirection * Math.PI / 180;
    currentDirectionUniform.value.set(Math.cos(currentRadians), Math.sin(currentRadians));
    waterMaterial.uniforms.uCurrentStrength.value = settings.currentStrength;
    waterMaterial.uniforms.uSkyTime.value = settings.skyTime;
    waterMaterial.uniforms.uColorTemperature.value = settings.colorTemperature;
    waterMaterial.uniforms.uVoxelColorVariance.value = settings.voxelColorVariance;
    waterMaterial.uniforms.uWeatherWaterTint.value.copy(weatherLook.waterTint);
    waterMaterial.uniforms.uWeatherFogColor.value.copy(weatherLook.fogColor);
    waterMaterial.uniforms.uWeatherRimColor.value.copy(weatherLook.rimColor);
    waterMaterial.uniforms.uWeatherLightningTint.value.copy(weatherLook.lightningTint);
    waterMaterial.uniforms.uWeatherFogDensity.value = weatherLook.fogDensity;
    waterMaterial.uniforms.uRainCurtain.value = Math.max(effectiveSettings.rain * 0.42, weatherLook.rainCurtain);
    waterMaterial.uniforms.uWeatherRippleStrength.value = weatherLook.rippleStrength;
    skyMaterial.uniforms.uStorm.value = weatherLook.strength;
    skyMaterial.uniforms.uCloudCover.value = settings.cloudCover;
    skyMaterial.uniforms.uSkyTime.value = settings.skyTime;
    skyMaterial.uniforms.uColorTemperature.value = settings.colorTemperature;
    skyMaterial.uniforms.uWeatherSkyTint.value.copy(weatherLook.backgroundColor);
    skyMaterial.uniforms.uWeatherHorizonTint.value.copy(weatherLook.fogColor);
    skyMaterial.uniforms.uWeatherCloudTint.value.copy(weatherLook.cloudColor);
    skyMaterial.uniforms.uWeatherLightningTint.value.copy(weatherLook.lightningTint);
    skyMaterial.uniforms.uSunVisibility.value = weatherLook.sunVisibility;
    columnWeatherStrengthUniform.value = weatherLook.strength;

    rainMaterial.uniforms.uOpacity.value = Math.min(0.78, effectiveSettings.rain * 1.5 + weatherLook.strength * 0.18);
    rainMaterial.uniforms.uColor.value.copy(weatherLook.rainStreakColor);
    rain.visible = effectiveSettings.rain > 0.04;
    rainMaterial.uniforms.uLength.value = Math.max(
      weatherLook.rainStreakLength,
      12 + effectiveSettings.rain * 9 + settings.surfaceDetail * 2,
    );
    rainMaterial.uniforms.uWind.value = settings.wind;
    spray.visible = effectiveSettings.foam > 0.52 || settings.weather === 'storm';
    sprayMaterial.uniforms.uOpacity.value = Math.min(0.36, effectiveSettings.foam * 0.24 + effectiveSettings.rain * 0.12 + weatherLook.strength * 0.16);
    sprayMaterial.uniforms.uLength.value = 3.4 + effectiveSettings.foam * 3.6;
    sprayMaterial.uniforms.uWind.value = settings.wind;
    sprayMaterial.uniforms.uFoam.value = effectiveSettings.foam;
    for (const material of [rainMaterial, sprayMaterial]) {
      material.uniforms.fogDensity.value = weatherLook.fogDensity;
      material.uniforms.fogNear.value = weatherLook.fogNear;
      material.uniforms.fogFar.value = weatherLook.fogFar;
      material.uniforms.fogColor.value.copy(weatherLook.fogColor);
    }
    cloudDeck.position.y = weatherLook.cloudBaseHeight;
    cloudDeck.scale.y = weatherLook.cloudHeightScale;
    cloudDeck.count = Math.round(CLOUD_VOXEL_COUNT * weatherLook.cloudCoverage);
    applyCloudShape(weatherLook);
    cloudMaterial.color.copy(cloudDeckColor
      .copy(weatherLook.backgroundColor)
      .lerp(weatherLook.cloudColor, weatherLook.cloudContrast));
    const lightingCompression = Math.min(1, Math.max(0, (weatherLook.strength - 0.65) / 0.23));
    ambient.color.copy(weatherLook.ambientColor);
    sun.color.copy(weatherLook.sunColor);
    ambient.intensity = (weatherLook.ambientBase + settings.clarity * 0.08 + settings.skyTime * 0.04)
      * (1 - lightingCompression * 0.96);
    sun.intensity = (weatherLook.sunBase + settings.clarity * 0.34 + settings.skyTime * 0.18 - settings.cloudCover * 0.26)
      * (1 - lightingCompression * 0.96)
      * weatherLook.sunVisibility;
    writeSunDirection(settings.skyTime, sunDirection);
    sun.position.copy(sunDirection).multiplyScalar(10);
    scene.background = clockColor
      .copy(weatherLook.backgroundColor)
      .lerp(weatherLook.fogColor, settings.cloudCover * 0.16);
    if (scene.fog) {
      const fog = scene.fog as Fog;
      fog.color.copy(weatherLook.fogColor);
      fog.near = weatherLook.fogNear;
      fog.far = weatherLook.fogFar;
    }
    columnMaterial.color.set(0xffffff);
    columnMaterial.emissive.copy(weatherLook.columnEmissive);
    columnMaterial.roughness = 0.7 - settings.clarity * 0.12 + effectiveSettings.rain * 0.08;
    columnMaterial.emissiveIntensity =
      1.12 + settings.clarity * 0.05 + weatherLook.strength * 0.18;
    landmarkMaterial.emissive.copy(weatherLook.landmarkEmissive);
    landmarkMaterial.emissiveIntensity = weatherLook.landmarkEmissiveIntensity;
    landmarkMaterial.roughness = weatherLook.landmarkRoughness;
    landmarkEmissiveLiftUniform.value = weatherLook.landmarkEmissiveLift;
    landmarkBeaconColorUniform.value.copy(weatherLook.beaconColor);
    landmarkBeaconEmissiveStrengthUniform.value = weatherLook.beaconEmissiveStrength;
    landmarkBeaconPulseAmplitudeUniform.value = weatherLook.beaconPulseAmplitude;
    gridLineMaterial.color.copy(weatherLook.columnTint).lerp(weatherLook.columnTopTint, 0.28 + weatherLook.strength * 0.18);
    gridLineMaterial.opacity = 0.002 + settings.surfaceDetail * 0.003 + weatherLook.strength * 0.003;
  };

  updateUniforms();

  const updateColumnColors = (elapsed: number) => {
    const weatherLook = WEATHER_LOOKS[settings.weather];
    const storm = weatherLook.strength;

    for (let index = 0; index < columnCount; index += 1) {
      const oceanX = oceanCoordinates[index * 2];
      const oceanZ = oceanCoordinates[index * 2 + 1];
      const normalized = sampleWave(oceanX, oceanZ, elapsed, effectiveSettings).height;
      const edgeFade = cellEdgeFade[index];
      const depthFade = cellDepthFade[index];
      const cellNoiseValue = cellNoise[index];
      const crestAmount = Math.max(0, (normalized - 0.35) / 0.35) * effectiveSettings.foam;
      const columnColorBand = quantizeWave(normalized, settings.toonSteps);
      const anchorDistance = Math.hypot(oceanX - 1.4, oceanZ - 4.8);
      const compositionAnchor = Math.max(0, 1 - anchorDistance / 7.5) ** 2;

      columnColor.copy(lowColumnColor).lerp(highColumnColor, Math.min(1, columnColorBand * 0.92));
      columnColor.lerp(troughColumnColor, Math.max(0, 0.64 - normalized) * 0.38);
      columnColor.lerp(foamColumnColor, Math.min(0.9, crestAmount));
      weatherColumnColor.copy(weatherLook.columnTint);
      columnColor.lerp(weatherColumnColor, weatherLook.columnTintMix + settings.cloudCover * 0.02);
      columnColor.lerp(stormShadowColumnColor, Math.max(0, 0.68 - columnColorBand) * (0.2 + storm * 0.46));
      columnColor.lerp(weatherLook.columnEmissive, 0.015 + storm * 0.025);
      const columnValueLift =
        weatherLook.columnLightFloor + Math.max(0, columnColorBand - 0.52) * 0.28 + crestAmount * 0.2;
      columnColor.lerp(weatherLook.columnTopTint, Math.min(0.28, columnValueLift));
      columnColor.lerp(settings.colorTemperature >= 0 ? warmColumnColor : coolColumnColor, Math.abs(settings.colorTemperature) * 0.12);
      columnColor.lerp(edgeMistColumnColor, (1 - edgeFade) * 0.1);
      columnColor.lerp(stormShadowColumnColor, compositionAnchor * 0.95);
      columnColor.offsetHSL(
        cellNoiseValue * settings.voxelColorVariance * (0.045 + storm * 0.02),
        settings.voxelColorVariance * (0.08 + storm * 0.04),
        cellNoiseValue * settings.voxelColorVariance * 0.08 + storm * (columnColorBand - 0.42) * 0.16,
      );
      const stormValueCompression = Math.min(1, Math.max(0, (storm - 0.65) / 0.23));
      columnColor.lerp(stormShadowColumnColor, stormValueCompression);
      columnColor.multiplyScalar(weatherLook.columnBrightness + depthFade * 0.06 + edgeFade * 0.04);
      columns.setColorAt(index, columnColor);
    }

    if (columns.instanceColor) columns.instanceColor.needsUpdate = true;
  };

  return {
    updateSettings(nextSettings) {
      settings = nextSettings;
      colorRefreshRequested = true;
      updateUniforms();
    },
    setMotionScale(scale) {
      motionScale = scale;
    },
    resize({ width, height, pixelRatio }: RoomSize) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rainResolutionUniform.value.set(width * pixelRatio, height * pixelRatio);
      sprayResolutionUniform.value.set(width * pixelRatio, height * pixelRatio);
    },
    render({ delta }: RoomFrame) {
      motionElapsed += delta * motionScale;
      const animatedSkyTime = Math.min(1, Math.max(0, settings.skyTime + Math.sin(motionElapsed * 0.035) * 0.003));
      const weatherLook = WEATHER_LOOKS[settings.weather];
      const fogBreath = Math.sin(motionElapsed * 0.18 + weatherLook.rainCurtain * 2.0) * weatherLook.rainCurtain * 0.035;
      const lightningPulse = weatherLook.lightningIntensity * Math.pow(
        Math.max(0, Math.sin(motionElapsed * 0.72 + Math.sin(motionElapsed * 0.19) * 3.2)),
        10,
      );
      waveUniforms.uTime.value = motionElapsed;
      waterMaterial.uniforms.uSkyTime.value = animatedSkyTime;
      waterMaterial.uniforms.uWeatherFogDensity.value = Math.max(0.12, weatherLook.fogDensity + fogBreath);
      waterMaterial.uniforms.uRainCurtain.value = Math.max(effectiveSettings.rain * 0.42, weatherLook.rainCurtain);
      waterMaterial.uniforms.uLightningPulse.value = lightningPulse;
      skyMaterial.uniforms.uTime.value = motionElapsed;
      skyMaterial.uniforms.uSkyTime.value = animatedSkyTime;
      skyMaterial.uniforms.uLightningPulse.value = lightningPulse;
      cameraRelativeOceanOffset.set(
        Math.round(camera.position.x / OCEAN_SNAP_SIZE) * OCEAN_SNAP_SIZE,
        0,
        Math.round(camera.position.z / OCEAN_SNAP_SIZE) * OCEAN_SNAP_SIZE,
      );
      plane.position.x = cameraRelativeOceanOffset.x;
      plane.position.z = cameraRelativeOceanOffset.z;
      waterMaterial.uniforms.uOceanOriginXZ.value.copy(
        oceanUniformOrigin.set(cameraRelativeOceanOffset.x, cameraRelativeOceanOffset.z),
      );
      writeSunDirection(animatedSkyTime, sunDirection);
      sun.position.copy(sunDirection).multiplyScalar(10);
      sky.position.copy(camera.position);
      const columnColorSample = quantizeColumnColorTime(motionElapsed);
      const shouldUpdateColumnColors = colorRefreshRequested
        || columnColorSample.step !== lastColumnColorStep;
      if (shouldUpdateColumnColors) {
        updateColumnColors(columnColorSample.time);
        lastColumnColorStep = columnColorSample.step;
        colorRefreshRequested = false;
      }
      cloudDeck.position.x = Math.sin(motionElapsed * 0.08) * 0.6;
      gridOverlay.position.y = Math.sin(motionElapsed * 0.28) * 0.012;
      root.rotation.y = Math.sin(motionElapsed * PRESENTATION_DRIFT_SPEED) * PRESENTATION_DRIFT_AMPLITUDE;
      renderer.render(scene, camera);
    },
    dispose() {
      disposeSceneResources(scene);
    },
  };
}
