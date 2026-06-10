import {
  AmbientLight,
  BackSide,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
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
  RoomFrame,
  RoomRuntime,
  RoomRuntimeContext,
  RoomSize,
  VoxelWaterSettings,
} from '../types';
import fragmentShader from './water.frag.glsl?raw';
import skyFragmentShader from './sky.frag.glsl?raw';
import skyVertexShader from './sky.vert.glsl?raw';
import vertexShader from './water.vert.glsl?raw';

type WeatherLook = {
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
  columnOpacity: number;
  cloudOpacityBase: number;
};

const WEATHER_LOOKS = {
  clear: {
    strength: 0,
    waterTint: new Color(0x6dffdd),
    fogColor: new Color(0xb2f4e7),
    ambientColor: new Color(0xc0fff4),
    sunColor: new Color(0xf4fff5),
    rimColor: new Color(0xc8ffe8),
    lightningTint: new Color(0xc8ffe8),
    cloudColor: new Color(0x91c8bf),
    backgroundColor: new Color(0x9ee8dc),
    columnTint: new Color(0xc8fff0),
    columnTopTint: new Color(0xf4ffd9),
    columnEmissive: new Color(0x54d8d3),
    fogDensity: 0.28,
    fogNear: 34,
    fogFar: 70,
    rainCurtain: 0.02,
    lightningIntensity: 0,
    ambientBase: 1.58,
    sunBase: 3.08,
    columnTintMix: 0.04,
    columnBrightness: 1.16,
    columnLightFloor: 0.12,
    columnOpacity: 1,
    cloudOpacityBase: 0.06,
  },
  rain: {
    strength: 0.48,
    waterTint: new Color(0x2c9fe2),
    fogColor: new Color(0x90a8be),
    ambientColor: new Color(0xb0d8ef),
    sunColor: new Color(0xc4d7e9),
    rimColor: new Color(0xa8ecff),
    lightningTint: new Color(0xd6f8ff),
    cloudColor: new Color(0x6d8395),
    backgroundColor: new Color(0x7598b0),
    columnTint: new Color(0x2e8dce),
    columnTopTint: new Color(0xc6ecff),
    columnEmissive: new Color(0x2a8fbd),
    fogDensity: 0.48,
    fogNear: 24,
    fogFar: 64,
    rainCurtain: 0.38,
    lightningIntensity: 0.06,
    ambientBase: 1.46,
    sunBase: 2.18,
    columnTintMix: 0.6,
    columnBrightness: 0.98,
    columnLightFloor: 0.02,
    columnOpacity: 1,
    cloudOpacityBase: 0.16,
  },
  storm: {
    strength: 0.88,
    waterTint: new Color(0x127f92),
    fogColor: new Color(0x607784),
    ambientColor: new Color(0x94c7d3),
    sunColor: new Color(0xa2bdc6),
    rimColor: new Color(0x8dfcff),
    lightningTint: new Color(0xd8ffff),
    cloudColor: new Color(0x465766),
    backgroundColor: new Color(0x546c78),
    columnTint: new Color(0x156f7b),
    columnTopTint: new Color(0xa3efd9),
    columnEmissive: new Color(0x238d98),
    fogDensity: 0.62,
    fogNear: 20,
    fogFar: 58,
    rainCurtain: 0.6,
    lightningIntensity: 0.42,
    ambientBase: 1.28,
    sunBase: 1.18,
    columnTintMix: 0.5,
    columnBrightness: 0.96,
    columnLightFloor: 0.12,
    columnOpacity: 1,
    cloudOpacityBase: 0.28,
  },
} satisfies Record<VoxelWaterSettings['weather'], WeatherLook>;

const PRESENTATION_DRIFT_AMPLITUDE = 0.018;
const PRESENTATION_DRIFT_SPEED = 0.035;
const RAIN_DROP_COUNT = 420;
const WATER_PLANE_SIZE = 156;
const WATER_PLANE_SEGMENTS = 72;
const VOXEL_GRID_SIDE = 64;
const VOXEL_SPACING = 0.62;
const VOXEL_SIZE = 0.6;
const VOXEL_FIELD_OFFSET_X = 8;
const VOXEL_FIELD_OFFSET_Z = 0;
const VOXEL_FIELD_YAW = -0.045;
const COLUMN_GEOMETRY_FPS = 8;
const COLUMN_COLOR_REFRESH_INTERVAL = 3;
const SKY_RADIUS = 62;
const OCEAN_SNAP_SIZE = VOXEL_SPACING * 8;
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
  { renderer }: RoomRuntimeContext,
  initialSettings: VoxelWaterSettings,
): RoomRuntime<VoxelWaterSettings> {
  let settings = initialSettings;
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.3, 72);
  const root = new Group();
  const matrix = new Matrix4();
  const columnPosition = new Vector3();
  const columnScale = new Vector3();
  const columnColor = new Color();
  const lowColumnColor = new Color(0x8efff0);
  const troughColumnColor = new Color(0x60e4e4);
  const highColumnColor = new Color(0xdffff1);
  const foamColumnColor = new Color(0xfffff6);
  const warmColumnColor = new Color(0xc8ffd6);
  const coolColumnColor = new Color(0x91e4ff);
  const edgeMistColumnColor = new Color(0xc8f5ee);
  const stormShadowColumnColor = new Color(0x073f49);
  const clockColor = new Color();
  const weatherColumnColor = new Color();
  const cameraRelativeOceanOffset = new Vector3();
  const oceanUniformOrigin = new Vector2();
  const random = createSeededRandom(0x5ea9f1);
  const initialWeatherLook = WEATHER_LOOKS[settings.weather];
  let columnFrame = 0;
  let colorRefreshRequested = true;
  let lastColumnUpdateElapsed = Number.NEGATIVE_INFINITY;

  scene.add(root);
  scene.fog = new Fog(initialWeatherLook.fogColor, initialWeatherLook.fogNear, initialWeatherLook.fogFar);
  camera.position.set(5.8, 7.2, 13.8);
  camera.lookAt(0, -0.08, -5);

  const ambient = new AmbientLight(initialWeatherLook.ambientColor, initialWeatherLook.ambientBase);
  const sun = new DirectionalLight(initialWeatherLook.sunColor, initialWeatherLook.sunBase);
  sun.position.set(-4, 7, 3);
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
    },
  });
  const sky = new Mesh(new SphereGeometry(SKY_RADIUS, 36, 18), skyMaterial);
  sky.renderOrder = 0;
  scene.add(sky);

  const waterMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uWaveHeight: { value: settings.waveHeight },
      uWind: { value: settings.wind },
      uRain: { value: settings.rain },
      uStorm: { value: initialWeatherLook.strength },
      uCloudCover: { value: settings.cloudCover },
      uToonSteps: { value: settings.toonSteps },
      uSwell: { value: settings.swell },
      uChop: { value: settings.chop },
      uFoam: { value: settings.foam },
      uClarity: { value: settings.clarity },
      uSurfaceDetail: { value: settings.surfaceDetail },
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
    },
  });

  const plane = new Mesh(
    new PlaneGeometry(WATER_PLANE_SIZE, WATER_PLANE_SIZE, WATER_PLANE_SEGMENTS, WATER_PLANE_SEGMENTS),
    waterMaterial,
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.08;
  plane.renderOrder = 1;
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
    transparent: true,
    opacity: 1,
  });
  const columnsPerSide = VOXEL_GRID_SIDE;
  const columnCount = columnsPerSide * columnsPerSide;
  const columns = new InstancedMesh(
    new BoxGeometry(VOXEL_SIZE, 1, VOXEL_SIZE),
    columnMaterial,
    columnCount,
  );
  columns.instanceColor = new InstancedBufferAttribute(new Float32Array(columnCount * 3).fill(1), 3);
  columns.instanceMatrix.setUsage(DynamicDrawUsage);
  columns.rotation.y = VOXEL_FIELD_YAW;
  columns.renderOrder = 2;
  root.add(columns);

  const cellPositionsX = new Float32Array(columnCount);
  const cellPositionsZ = new Float32Array(columnCount);
  const cellEdgeFade = new Float32Array(columnCount);
  const cellDepthFade = new Float32Array(columnCount);
  const cellNoise = new Float32Array(columnCount);
  const gridOffset = ((columnsPerSide - 1) * VOXEL_SPACING) / 2;
  for (let z = 0; z < columnsPerSide; z += 1) {
    for (let x = 0; x < columnsPerSide; x += 1) {
      const index = z * columnsPerSide + x;
      const px = x * VOXEL_SPACING - gridOffset + VOXEL_FIELD_OFFSET_X;
      const pz = z * VOXEL_SPACING - gridOffset + VOXEL_FIELD_OFFSET_Z;
      const edgeDistance = Math.min(x, z, columnsPerSide - 1 - x, columnsPerSide - 1 - z) / (columnsPerSide * 0.18);
      cellPositionsX[index] = px;
      cellPositionsZ[index] = pz;
      cellEdgeFade[index] = Math.min(1, Math.max(0, edgeDistance));
      cellDepthFade[index] = Math.min(1, Math.max(0, (pz + gridOffset) / (gridOffset * 2)));
      cellNoise[index] = hashCell(x, z) - 0.5;
    }
  }

  const gridExtent = gridOffset + VOXEL_SPACING * 0.5;
  const gridLinePadding = 28;
  const gridLinePositions = new Float32Array((columnsPerSide - 1) * 2 * 3);
  let gridLineIndex = 0;
  for (let i = 1; i < columnsPerSide; i += 1) {
    const position = -gridExtent + i * VOXEL_SPACING + VOXEL_FIELD_OFFSET_Z;
    gridLinePositions[gridLineIndex++] = -gridExtent + VOXEL_FIELD_OFFSET_X - gridLinePadding;
    gridLinePositions[gridLineIndex++] = 0.03;
    gridLinePositions[gridLineIndex++] = position;
    gridLinePositions[gridLineIndex++] = gridExtent + VOXEL_FIELD_OFFSET_X + gridLinePadding;
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

    rainMaterial.opacity = Math.min(0.64, settings.rain * 0.62 + weatherLook.strength * 0.2);
    rain.visible = settings.rain > 0.02 || settings.weather !== 'clear';
    rainMaterial.size = 0.024 + settings.rain * 0.022 + settings.surfaceDetail * 0.006;
    spray.visible = settings.foam > 0.52 || settings.weather === 'storm';
    sprayMaterial.opacity = Math.min(0.36, settings.foam * 0.24 + settings.rain * 0.12 + weatherLook.strength * 0.16);
    sprayMaterial.size = 0.03 + settings.foam * 0.05;
    cloudMaterial.opacity = weatherLook.cloudOpacityBase + settings.cloudCover * 0.44 + weatherLook.strength * 0.12;
    ambient.color.copy(weatherLook.ambientColor);
    sun.color.copy(weatherLook.sunColor);
    ambient.intensity = weatherLook.ambientBase + settings.clarity * 0.28 + settings.skyTime * 0.14;
    sun.intensity = weatherLook.sunBase + settings.clarity * 0.44 + settings.skyTime * 0.34 - settings.cloudCover * 0.3;
    sun.position.set(
      Math.cos(settings.skyTime * Math.PI * 2) * 5,
      3.2 + Math.sin(settings.skyTime * Math.PI) * 5.8,
      Math.sin(settings.skyTime * Math.PI * 2) * 5,
    );
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
    columnMaterial.opacity = weatherLook.columnOpacity;
    columnMaterial.roughness = 0.7 - settings.clarity * 0.12 + settings.rain * 0.08;
    columnMaterial.emissiveIntensity =
      0.46 + settings.clarity * 0.2 + settings.foam * 0.05 + weatherLook.rainCurtain * 0.07 + weatherLook.strength * 0.16;
    gridLineMaterial.color.copy(weatherLook.columnTint).lerp(weatherLook.columnTopTint, 0.28 + weatherLook.strength * 0.18);
    gridLineMaterial.opacity = 0.05 + settings.surfaceDetail * 0.04 + weatherLook.strength * 0.12;
  };

  updateUniforms();

  const updateColumns = (elapsed: number, updateColors: boolean) => {
    let index = 0;
    const currentAngle = (settings.currentDirection * Math.PI) / 180;
    const currentX = Math.cos(currentAngle);
    const currentZ = Math.sin(currentAngle);
    const weatherLook = WEATHER_LOOKS[settings.weather];
    const storm = weatherLook.strength;

    for (let z = 0; z < columnsPerSide; z += 1) {
      for (let x = 0; x < columnsPerSide; x += 1) {
        const px = cellPositionsX[index];
        const pz = cellPositionsZ[index];
        const timeScale = 0.44 + settings.wind * 0.15;
        const chopShape = 1.2 + settings.chop * 2.6;
        const currentPhase = (px * currentX + pz * currentZ) * (0.9 + settings.currentStrength * 0.8) - elapsed * (0.24 + settings.currentStrength * 0.54);
        const layerA = Math.pow(Math.max(0.0001, Math.sin((px * 0.78 + pz * 0.62) * 1.12 + elapsed * timeScale * 0.92) * 0.5 + 0.5), chopShape) * (0.32 + settings.swell * 0.15);
        const layerB = Math.pow(Math.max(0.0001, Math.sin((px * -0.64 + pz * 0.77) * 2.45 - elapsed * timeScale * 1.36) * 0.5 + 0.5), 1.6 + settings.chop * 2.1) * (0.28 + settings.chop * 0.12);
        const layerC = Math.pow(Math.max(0.0001, Math.sin((px * 0.18 + pz * -0.98) * 4.2 + elapsed * timeScale * 1.9) * 0.5 + 0.5), 1.2 + settings.surfaceDetail * 2.0) * (0.16 + settings.surfaceDetail * 0.08);
        const layerD = Math.pow(Math.max(0.0001, Math.sin((px * -0.95 + pz * 0.31) * 0.86 - elapsed * timeScale * 0.72) * 0.5 + 0.5), 1.4) * (0.18 * settings.swell);
        const currentLayer = Math.pow(Math.max(0.0001, Math.sin(currentPhase) * 0.5 + 0.5), 1.55) * settings.currentStrength * 0.14;
        const normalized = Math.min(1, Math.max(0, (layerA + layerB + layerC + layerD + currentLayer) / Math.max(1, 1.04 + settings.swell * 0.56)));
        const crestLift = normalized > 0.76 ? settings.foam * 0.12 : 0;
        const columnHeightValue = normalized;
        const height = 0.2 + Math.max(0.08, columnHeightValue * settings.waveHeight * (0.7 + settings.swell * 0.22) + crestLift * 0.75);
        const edgeFade = cellEdgeFade[index];
        const depthFade = cellDepthFade[index];
        const cellNoiseValue = cellNoise[index];
        const crestAmount = Math.max(0, normalized - 0.72) * settings.foam;
        const columnColorBand = Math.round(normalized * Math.max(1, settings.toonSteps - 1)) / Math.max(1, settings.toonSteps - 1);

        columnPosition.set(px, -0.24 + height * 0.5, pz);
        columnScale.set(1, height * (0.8 + edgeFade * 0.2), 1);
        matrix.compose(columnPosition, columns.quaternion, columnScale);
        columns.setMatrixAt(index, matrix);
        if (updateColors) {
          columnColor.copy(lowColumnColor).lerp(highColumnColor, Math.min(1, columnColorBand * 1.18));
          columnColor.lerp(troughColumnColor, Math.max(0, 0.6 - normalized) * 0.26);
          columnColor.lerp(foamColumnColor, Math.min(0.5, crestAmount * 1.4));
          weatherColumnColor.copy(weatherLook.columnTint);
          columnColor.lerp(weatherColumnColor, weatherLook.columnTintMix + settings.cloudCover * 0.02);
          columnColor.lerp(stormShadowColumnColor, Math.max(0, 0.68 - columnColorBand) * storm * 0.42);
          columnColor.lerp(weatherLook.columnEmissive, (0.04 + settings.foam * 0.03) * (0.4 + storm));
          const foregroundColumnGlow = depthFade * (0.12 + settings.clarity * 0.08) * (1 - storm * 0.36);
          const columnValueLift =
            weatherLook.columnLightFloor + Math.max(0, columnColorBand - 0.25) * (0.36 + storm * 0.12) + crestAmount * 0.26 + foregroundColumnGlow;
          columnColor.lerp(weatherLook.columnTopTint, Math.min(0.52 + storm * 0.16, columnValueLift));
          columnColor.lerp(settings.colorTemperature >= 0 ? warmColumnColor : coolColumnColor, Math.abs(settings.colorTemperature) * 0.24);
          columnColor.lerp(edgeMistColumnColor, (1 - edgeFade) * 0.32);
          columnColor.offsetHSL(
            cellNoiseValue * settings.voxelColorVariance * (0.045 + storm * 0.02),
            settings.voxelColorVariance * (0.08 + storm * 0.04),
            cellNoiseValue * settings.voxelColorVariance * 0.08 + storm * (columnColorBand - 0.42) * 0.16,
          );
          columnColor.multiplyScalar(weatherLook.columnBrightness + depthFade * 0.3 + edgeFade * 0.14 + storm * 0.12);
          columns.setColorAt(index, columnColor);
        }
        index += 1;
      }
    }

    columns.instanceMatrix.needsUpdate = true;
    if (updateColors && columns.instanceColor) {
      columns.instanceColor.needsUpdate = true;
    }
  };

  return {
    updateSettings(nextSettings) {
      settings = nextSettings;
      colorRefreshRequested = true;
      updateUniforms();
    },
    resize({ width, height }: RoomSize) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
    render({ elapsed, delta }: RoomFrame) {
      const animatedSkyTime = Math.min(1, Math.max(0, settings.skyTime + Math.sin(elapsed * 0.035) * 0.025));
      const weatherLook = WEATHER_LOOKS[settings.weather];
      const fogBreath = Math.sin(elapsed * 0.18 + weatherLook.rainCurtain * 2.0) * weatherLook.rainCurtain * 0.035;
      const lightningPulse = weatherLook.lightningIntensity * Math.pow(
        Math.max(0, Math.sin(elapsed * 0.72 + Math.sin(elapsed * 0.19) * 3.2)),
        10,
      );
      waterMaterial.uniforms.uTime.value = elapsed;
      waterMaterial.uniforms.uSkyTime.value = animatedSkyTime;
      waterMaterial.uniforms.uWeatherFogDensity.value = Math.max(0.12, weatherLook.fogDensity + fogBreath);
      waterMaterial.uniforms.uRainCurtain.value = Math.max(settings.rain * 0.42, weatherLook.rainCurtain);
      waterMaterial.uniforms.uLightningPulse.value = lightningPulse;
      skyMaterial.uniforms.uTime.value = elapsed;
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
      sun.position.set(
        Math.cos(animatedSkyTime * Math.PI * 2) * 5,
        3.2 + Math.sin(animatedSkyTime * Math.PI) * 5.8,
        Math.sin(animatedSkyTime * Math.PI * 2) * 5,
      );
      sky.position.copy(camera.position);
      const shouldUpdateColumns =
        colorRefreshRequested || columnFrame === 0 || elapsed - lastColumnUpdateElapsed >= 1 / COLUMN_GEOMETRY_FPS;
      if (shouldUpdateColumns) {
        const updateColumnColors = colorRefreshRequested || columnFrame % COLUMN_COLOR_REFRESH_INTERVAL === 0;
        updateColumns(elapsed, updateColumnColors);
        lastColumnUpdateElapsed = elapsed;
        colorRefreshRequested = false;
        columnFrame += 1;
      }
      rain.position.y -= delta * (5 + settings.wind * 1.8);
      if (rain.position.y < -4) {
        rain.position.y = 1.5;
      }
      spray.rotation.y += delta * (0.18 + settings.wind * 0.04);
      spray.position.y = Math.sin(elapsed * 0.45) * 0.05;
      cloudDeck.position.x = Math.sin(elapsed * 0.08) * 0.6;
      gridOverlay.position.y = Math.sin(elapsed * 0.28) * 0.012;
      root.rotation.y = Math.sin(elapsed * PRESENTATION_DRIFT_SPEED) * PRESENTATION_DRIFT_AMPLITUDE;
      renderer.render(scene, camera);
    },
    dispose() {
      disposeObject(root);
      sky.geometry.dispose();
      [waterMaterial, skyMaterial, columnMaterial, rainMaterial, sprayMaterial, cloudMaterial, gridLineMaterial].forEach((material: Material) =>
        material.dispose(),
      );
      rainGeometry.dispose();
      sprayGeometry.dispose();
      gridLineGeometry.dispose();
      renderer.info.reset();
    },
  };
}
