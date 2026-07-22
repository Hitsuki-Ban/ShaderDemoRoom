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
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
  type Material,
  type Object3D,
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
  lightningIntensity: number;
  ambientBase: number;
  sunBase: number;
  columnTintMix: number;
  columnBrightness: number;
  columnLightFloor: number;
  cloudOpacityBase: number;
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
    lightningIntensity: 0,
    ambientBase: 0.56,
    sunBase: 7,
    columnTintMix: 0.18,
    columnBrightness: 0.84,
    columnLightFloor: 0.02,
    cloudOpacityBase: 0.06,
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
    lightningIntensity: 0.06,
    ambientBase: 0.44,
    sunBase: 5.5,
    columnTintMix: 0.28,
    columnBrightness: 0.18,
    columnLightFloor: 0.01,
    cloudOpacityBase: 0.16,
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
    lightningIntensity: 0.42,
    ambientBase: 0.18,
    sunBase: 3,
    columnTintMix: 0.34,
    columnBrightness: 0.08,
    columnLightFloor: 0,
    cloudOpacityBase: 0.28,
  },
} satisfies Record<VoxelWaterSettings['weather'], WeatherLook>;

const PRESENTATION_DRIFT_AMPLITUDE = 0.003;
const PRESENTATION_DRIFT_SPEED = 0.035;
const RAIN_DROP_COUNT = 420;
const WATER_PLANE_SIZE = 156;
const WATER_PLANE_SEGMENTS = 72;
const VOXEL_GRID_SIDE = 64;
const VOXEL_SIZE = VOXEL_SPACING;
const SKY_RADIUS = 62;
const OCEAN_SNAP_SIZE = VOXEL_SPACING * OCEAN_SNAP_CELL_MULTIPLE;
const INFINITE_OCEAN_STRATEGY = 'hybrid-near-voxel-field-camera-relative-far-plane';

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

function disposeObject(object: Object3D) {
  object.traverse((child) => {
    const mesh = child as Mesh;
    if ('geometry' in mesh && mesh.geometry) {
      mesh.geometry.dispose();
    }
    if ('material' in mesh && mesh.material) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => material.dispose());
    }
  });
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
  const weatherColumnColor = new Color();
  const cameraRelativeOceanOffset = new Vector3();
  const oceanUniformOrigin = new Vector2();
  const sunDirection = new Vector3();
  const random = createSeededRandom(0x5ea9f1);
  const initialWeatherLook = WEATHER_LOOKS[settings.weather];
  let colorRefreshRequested = true;
  let lastColumnColorStep = -1;

  writeSunDirection(settings.skyTime, sunDirection);
  const waveUniforms = {
    uTime: { value: 0 },
    uWaveHeight: { value: settings.waveHeight },
    uWind: { value: settings.wind },
    uSwell: { value: settings.swell },
    uChop: { value: settings.chop },
    uSurfaceDetail: { value: settings.surfaceDetail },
    uFoam: { value: settings.foam },
  };
  const sunDirectionUniform = { value: sunDirection };
  const columnWeatherStrengthUniform = { value: initialWeatherLook.strength };

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
      uRain: { value: settings.rain },
      uStorm: { value: initialWeatherLook.strength },
      uCloudCover: { value: settings.cloudCover },
      uToonSteps: { value: settings.toonSteps },
      uClarity: { value: settings.clarity },
      uCurrentDirection: { value: settings.currentDirection },
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
      uLightningPulse: { value: 0 },
      uVoxelSpacing: { value: VOXEL_SPACING },
      uWaterGridCellMultiple: { value: WATER_GRID_CELL_MULTIPLE },
      uStormGridCellMultiple: { value: STORM_GRID_CELL_MULTIPLE },
      uVoxelFieldOffset: { value: new Vector2(VOXEL_FIELD_OFFSET.x, VOXEL_FIELD_OFFSET.z) },
      uVoxelFieldYaw: { value: VOXEL_FIELD_YAW },
      uSunDirection: sunDirectionUniform,
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
  const columnCount = columnsPerSide * columnsPerSide;
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
  root.add(columns);

  const oceanCoordinates = new Float32Array(columnCount * 2);
  const cellEdgeFade = new Float32Array(columnCount);
  const cellDepthFade = new Float32Array(columnCount);
  const cellNoise = new Float32Array(columnCount);
  const gridOffset = ((columnsPerSide - 1) * VOXEL_SPACING) / 2;
  const fieldYawCosine = Math.cos(VOXEL_FIELD_YAW);
  const fieldYawSine = Math.sin(VOXEL_FIELD_YAW);
  for (let z = 0; z < columnsPerSide; z += 1) {
    for (let x = 0; x < columnsPerSide; x += 1) {
      const index = z * columnsPerSide + x;
      const px = x * VOXEL_SPACING - gridOffset + VOXEL_FIELD_OFFSET.x;
      const pz = z * VOXEL_SPACING - gridOffset + VOXEL_FIELD_OFFSET.z;
      const edgeDistance = Math.min(x, z, columnsPerSide - 1 - x, columnsPerSide - 1 - z) / (columnsPerSide * 0.18);
      const oceanX = px * fieldYawCosine + pz * fieldYawSine;
      const oceanZ = -px * fieldYawSine + pz * fieldYawCosine;
      oceanCoordinates[index * 2] = oceanX;
      oceanCoordinates[index * 2 + 1] = oceanZ;
      cellEdgeFade[index] = Math.min(1, Math.max(0, edgeDistance));
      cellDepthFade[index] = Math.min(1, Math.max(0, (oceanZ + gridOffset) / (gridOffset * 2)));
      cellNoise[index] = hashCell(x, z) - 0.5;
      matrix.makeTranslation(px, 0, pz);
      columns.setMatrixAt(index, matrix);
    }
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

  const rainGeometry = new BufferGeometry();
  const rainPositions = new Float32Array(RAIN_DROP_COUNT * 3);
  for (let i = 0; i < rainPositions.length; i += 3) {
    rainPositions[i] = (random() - 0.5) * (WATER_PLANE_SIZE * 0.84);
    rainPositions[i + 1] = random() * 9 + 2;
    rainPositions[i + 2] = (random() - 0.5) * (WATER_PLANE_SIZE * 0.72);
  }
  rainGeometry.setAttribute('position', new BufferAttribute(rainPositions, 3));
  const rainMaterial = new PointsMaterial({
    color: 0xa8ddf5,
    size: 0.03,
    transparent: true,
    opacity: 0.36,
    depthWrite: false,
  });
  const rain = new Points(rainGeometry, rainMaterial);
  rain.name = 'voxel-water-rain';
  rain.renderOrder = 4;
  root.add(rain);

  const sprayGeometry = new BufferGeometry();
  const sprayPositions = new Float32Array(220 * 3);
  for (let i = 0; i < sprayPositions.length; i += 3) {
    sprayPositions[i] = (random() - 0.5) * 14;
    sprayPositions[i + 1] = random() * 1.4 + 0.05;
    sprayPositions[i + 2] = (random() - 0.5) * 14;
  }
  sprayGeometry.setAttribute('position', new BufferAttribute(sprayPositions, 3));
  const sprayMaterial = new PointsMaterial({
    color: 0xd6fbff,
    size: 0.05,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });
  const spray = new Points(sprayGeometry, sprayMaterial);
  spray.name = 'voxel-water-spray';
  spray.renderOrder = 3;
  root.add(spray);

  const cloudMaterial = new MeshBasicMaterial({
    color: 0x385062,
    transparent: true,
    opacity: 0.42,
  });
  const cloudDeck = new Group();
  for (let i = 0; i < 14; i += 1) {
    const cloud = new Mesh(new BoxGeometry(1.2 + random(), 0.16, 0.38), cloudMaterial);
    cloud.position.set((random() - 0.5) * 18, 4.2 + random() * 1.1, -5 - random() * 6);
    cloud.rotation.y = random() * 0.4;
    cloudDeck.add(cloud);
  }
  root.add(cloudDeck);

  const updateUniforms = () => {
    const weatherLook = WEATHER_LOOKS[settings.weather];
    waterMaterial.uniforms.uWaveHeight.value = settings.waveHeight;
    waterMaterial.uniforms.uWind.value = settings.wind;
    waterMaterial.uniforms.uRain.value = settings.rain;
    waterMaterial.uniforms.uStorm.value = weatherLook.strength;
    waterMaterial.uniforms.uCloudCover.value = settings.cloudCover;
    waterMaterial.uniforms.uToonSteps.value = settings.toonSteps;
    waterMaterial.uniforms.uSwell.value = settings.swell;
    waterMaterial.uniforms.uChop.value = settings.chop;
    waterMaterial.uniforms.uFoam.value = settings.foam;
    waterMaterial.uniforms.uClarity.value = settings.clarity;
    waterMaterial.uniforms.uSurfaceDetail.value = settings.surfaceDetail;
    waterMaterial.uniforms.uCurrentDirection.value = settings.currentDirection;
    waterMaterial.uniforms.uCurrentStrength.value = settings.currentStrength;
    waterMaterial.uniforms.uSkyTime.value = settings.skyTime;
    waterMaterial.uniforms.uColorTemperature.value = settings.colorTemperature;
    waterMaterial.uniforms.uVoxelColorVariance.value = settings.voxelColorVariance;
    waterMaterial.uniforms.uWeatherWaterTint.value.copy(weatherLook.waterTint);
    waterMaterial.uniforms.uWeatherFogColor.value.copy(weatherLook.fogColor);
    waterMaterial.uniforms.uWeatherRimColor.value.copy(weatherLook.rimColor);
    waterMaterial.uniforms.uWeatherLightningTint.value.copy(weatherLook.lightningTint);
    waterMaterial.uniforms.uWeatherFogDensity.value = weatherLook.fogDensity;
    waterMaterial.uniforms.uRainCurtain.value = Math.max(settings.rain * 0.42, weatherLook.rainCurtain);
    skyMaterial.uniforms.uStorm.value = weatherLook.strength;
    skyMaterial.uniforms.uCloudCover.value = settings.cloudCover;
    skyMaterial.uniforms.uSkyTime.value = settings.skyTime;
    skyMaterial.uniforms.uColorTemperature.value = settings.colorTemperature;
    skyMaterial.uniforms.uWeatherSkyTint.value.copy(weatherLook.backgroundColor);
    skyMaterial.uniforms.uWeatherHorizonTint.value.copy(weatherLook.fogColor);
    skyMaterial.uniforms.uWeatherCloudTint.value.copy(weatherLook.cloudColor);
    skyMaterial.uniforms.uWeatherLightningTint.value.copy(weatherLook.lightningTint);
    columnWeatherStrengthUniform.value = weatherLook.strength;

    rainMaterial.opacity = Math.min(0.64, settings.rain * 0.62 + weatherLook.strength * 0.2);
    rain.visible = settings.rain > 0.02 || settings.weather !== 'clear';
    rainMaterial.size = 0.024 + settings.rain * 0.022 + settings.surfaceDetail * 0.006;
    spray.visible = settings.foam > 0.52 || settings.weather === 'storm';
    sprayMaterial.opacity = Math.min(0.36, settings.foam * 0.24 + settings.rain * 0.12 + weatherLook.strength * 0.16);
    sprayMaterial.size = 0.03 + settings.foam * 0.05;
    cloudMaterial.opacity = weatherLook.cloudOpacityBase + settings.cloudCover * 0.44 + weatherLook.strength * 0.12;
    const lightingCompression = Math.min(1, Math.max(0, (weatherLook.strength - 0.65) / 0.23));
    ambient.color.copy(weatherLook.ambientColor);
    sun.color.copy(weatherLook.sunColor);
    ambient.intensity = (weatherLook.ambientBase + settings.clarity * 0.08 + settings.skyTime * 0.04)
      * (1 - lightingCompression * 0.96);
    sun.intensity = (weatherLook.sunBase + settings.clarity * 0.34 + settings.skyTime * 0.18 - settings.cloudCover * 0.26)
      * (1 - lightingCompression * 0.96);
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
    cloudMaterial.color.copy(weatherLook.cloudColor);
    columnMaterial.color.set(0xffffff);
    columnMaterial.emissive.copy(weatherLook.columnEmissive);
    columnMaterial.roughness = 0.7 - settings.clarity * 0.12 + settings.rain * 0.08;
    columnMaterial.emissiveIntensity =
      1.12 + settings.clarity * 0.05 + weatherLook.strength * 0.18;
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
      const normalized = sampleWave(oceanX, oceanZ, elapsed, settings).height;
      const edgeFade = cellEdgeFade[index];
      const depthFade = cellDepthFade[index];
      const cellNoiseValue = cellNoise[index];
      const crestAmount = Math.max(0, (normalized - 0.35) / 0.35) * settings.foam;
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
    resize({ width, height }: RoomSize) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
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
      waterMaterial.uniforms.uRainCurtain.value = Math.max(settings.rain * 0.42, weatherLook.rainCurtain);
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
      rain.position.y -= delta * motionScale * (5 + settings.wind * 1.8);
      if (rain.position.y < -4) {
        rain.position.y = 1.5;
      }
      spray.rotation.y += delta * motionScale * (0.18 + settings.wind * 0.04);
      spray.position.y = Math.sin(motionElapsed * 0.45) * 0.05;
      cloudDeck.position.x = Math.sin(motionElapsed * 0.08) * 0.6;
      gridOverlay.position.y = Math.sin(motionElapsed * 0.28) * 0.012;
      root.rotation.y = Math.sin(motionElapsed * PRESENTATION_DRIFT_SPEED) * PRESENTATION_DRIFT_AMPLITUDE;
      renderer.render(scene, camera);
    },
    dispose() {
      columns.dispose();
      disposeObject(root);
      sky.geometry.dispose();
      [waterMaterial, skyMaterial, columnMaterial, rainMaterial, sprayMaterial, cloudMaterial, gridLineMaterial].forEach((material: Material) =>
        material.dispose(),
      );
      rainGeometry.dispose();
      sprayGeometry.dispose();
      gridLineGeometry.dispose();
    },
  };
}
