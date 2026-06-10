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
  InstancedMesh,
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

const weatherStrength = {
  clear: 0,
  rain: 0.45,
  storm: 1,
} satisfies Record<VoxelWaterSettings['weather'], number>;

const PRESENTATION_DRIFT_AMPLITUDE = 0.018;
const PRESENTATION_DRIFT_SPEED = 0.035;
const RAIN_DROP_COUNT = 420;
const WATER_PLANE_SIZE = 68;
const WATER_PLANE_SEGMENTS = 192;
const VOXEL_GRID_SIDE = 72;
const VOXEL_SPACING = 0.26;
const VOXEL_SIZE = 0.2;
const SKY_RADIUS = 40;

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
  const camera = new PerspectiveCamera(45, 1, 0.3, 48);
  const root = new Group();
  const matrix = new Matrix4();
  const columnPosition = new Vector3();
  const columnScale = new Vector3();
  const columnColor = new Color();
  const lowColumnColor = new Color(0x23b8ce);
  const highColumnColor = new Color(0x42e1ef);
  const foamColumnColor = new Color(0xc2fbf4);
  const stormColumnColor = new Color(0x35889a);
  const warmColumnColor = new Color(0x48d4c3);
  const coolColumnColor = new Color(0x35b8f0);
  const clockColor = new Color();
  const random = createSeededRandom(0x5ea9f1);

  scene.add(root);
  scene.fog = new Fog(0x07101a, 20, 44);
  camera.position.set(8.7, 6.4, 10.4);
  camera.lookAt(0, -0.24, 0);

  const ambient = new AmbientLight(0x7ecfff, 1.3);
  const sun = new DirectionalLight(0xd8f7ff, 2.6);
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
      uStorm: { value: weatherStrength[settings.weather] },
      uCloudCover: { value: settings.cloudCover },
      uSkyTime: { value: settings.skyTime },
      uColorTemperature: { value: settings.colorTemperature },
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
      uStorm: { value: weatherStrength[settings.weather] },
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
    },
  });

  const plane = new Mesh(
    new PlaneGeometry(WATER_PLANE_SIZE, WATER_PLANE_SIZE, WATER_PLANE_SEGMENTS, WATER_PLANE_SEGMENTS),
    waterMaterial,
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.08;
  plane.renderOrder = 1;
  root.add(plane);

  const columnMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.68,
    metalness: 0.03,
    emissive: 0x0a5364,
    emissiveIntensity: 0.42,
    vertexColors: true,
  });
  const columnsPerSide = VOXEL_GRID_SIDE;
  const columnCount = columnsPerSide * columnsPerSide;
  const columns = new InstancedMesh(
    new BoxGeometry(VOXEL_SIZE, 1, VOXEL_SIZE),
    columnMaterial,
    columnCount,
  );
  columns.instanceMatrix.setUsage(DynamicDrawUsage);
  columns.renderOrder = 2;
  root.add(columns);

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
    waterMaterial.uniforms.uWaveHeight.value = settings.waveHeight;
    waterMaterial.uniforms.uWind.value = settings.wind;
    waterMaterial.uniforms.uRain.value = settings.rain;
    waterMaterial.uniforms.uStorm.value = weatherStrength[settings.weather];
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
    skyMaterial.uniforms.uStorm.value = weatherStrength[settings.weather];
    skyMaterial.uniforms.uCloudCover.value = settings.cloudCover;
    skyMaterial.uniforms.uSkyTime.value = settings.skyTime;
    skyMaterial.uniforms.uColorTemperature.value = settings.colorTemperature;

    rainMaterial.opacity = Math.min(0.64, settings.rain * 0.62 + weatherStrength[settings.weather] * 0.2);
    rain.visible = settings.rain > 0.02 || settings.weather !== 'clear';
    rainMaterial.size = 0.024 + settings.rain * 0.022 + settings.surfaceDetail * 0.006;
    spray.visible = settings.foam > 0.52 || settings.weather === 'storm';
    sprayMaterial.opacity = Math.min(0.36, settings.foam * 0.24 + settings.rain * 0.12 + weatherStrength[settings.weather] * 0.16);
    sprayMaterial.size = 0.03 + settings.foam * 0.05;
    cloudMaterial.opacity = 0.18 + settings.cloudCover * 0.54 + weatherStrength[settings.weather] * 0.14;
    ambient.intensity = 1.18 + settings.clarity * 0.34 - weatherStrength[settings.weather] * 0.38 + settings.skyTime * 0.16;
    sun.intensity = 1.92 + settings.clarity * 0.76 - weatherStrength[settings.weather] * 1.08 + settings.skyTime * 0.5;
    sun.position.set(
      Math.cos(settings.skyTime * Math.PI * 2) * 5,
      3.2 + Math.sin(settings.skyTime * Math.PI) * 5.8,
      Math.sin(settings.skyTime * Math.PI * 2) * 5,
    );
    scene.background = clockColor
      .set(0x07111b)
      .lerp(new Color(0x131924), weatherStrength[settings.weather] * 0.64 + settings.cloudCover * 0.18);
    cloudMaterial.color.set(settings.weather === 'storm' ? 0x2b3440 : 0x385d69);
    columnMaterial.color.set(0xffffff);
    columnMaterial.roughness = 0.72 - settings.clarity * 0.14 + settings.rain * 0.08;
    columnMaterial.emissiveIntensity = 0.34 + settings.clarity * 0.16 + settings.foam * 0.05;
  };

  updateUniforms();

  const updateColumns = (elapsed: number) => {
    let index = 0;
    const spacing = VOXEL_SPACING;
    const offset = ((columnsPerSide - 1) * spacing) / 2;
    const currentAngle = (settings.currentDirection * Math.PI) / 180;
    const currentX = Math.cos(currentAngle);
    const currentZ = Math.sin(currentAngle);
    const storm = weatherStrength[settings.weather];

    for (let z = 0; z < columnsPerSide; z += 1) {
      for (let x = 0; x < columnsPerSide; x += 1) {
        const px = x * spacing - offset;
        const pz = z * spacing - offset;
        const timeScale = 0.44 + settings.wind * 0.15;
        const chopShape = 1.2 + settings.chop * 2.6;
        const currentPhase = (px * currentX + pz * currentZ) * (0.9 + settings.currentStrength * 0.8) - elapsed * (0.24 + settings.currentStrength * 0.54);
        const layerA = Math.pow(Math.max(0.0001, Math.sin((px * 0.92 + pz * 0.34) * 1.35 + elapsed * timeScale * 1.05) * 0.5 + 0.5), chopShape) * (0.42 + settings.swell * 0.2);
        const layerB = Math.pow(Math.max(0.0001, Math.sin((px * -0.38 + pz * 0.93) * 2.15 - elapsed * timeScale * 1.42) * 0.5 + 0.5), 1.6 + settings.chop * 2.1) * (0.24 + settings.chop * 0.12);
        const layerC = Math.pow(Math.max(0.0001, Math.sin((px * 0.55 + pz * -0.83) * 3.7 + elapsed * timeScale * 2.15) * 0.5 + 0.5), 1.2 + settings.surfaceDetail * 2.0) * (0.12 + settings.surfaceDetail * 0.1);
        const layerD = Math.pow(Math.max(0.0001, Math.sin((px * -0.98 + pz * -0.18) * 0.72 - elapsed * timeScale * 0.68) * 0.5 + 0.5), 1.4) * (0.3 * settings.swell);
        const currentLayer = Math.pow(Math.max(0.0001, Math.sin(currentPhase) * 0.5 + 0.5), 1.55) * settings.currentStrength * 0.14;
        const normalized = Math.min(1, Math.max(0, (layerA + layerB + layerC + layerD + currentLayer) / Math.max(1, 1.12 + settings.swell * 0.64)));
        const crestLift = normalized > 0.76 ? settings.foam * 0.12 : 0;
        const columnHeightValue = normalized;
        const height = 0.22 + Math.max(0.06, columnHeightValue * settings.waveHeight * (0.96 + settings.swell * 0.34) + crestLift);
        const edgeDistance = Math.min(x, z, columnsPerSide - 1 - x, columnsPerSide - 1 - z) / (columnsPerSide * 0.18);
        const edgeFade = Math.min(1, Math.max(0, edgeDistance));
        const depthFade = Math.min(1, Math.max(0, (pz + offset) / (offset * 2)));
        const cellNoise = hashCell(x, z) - 0.5;
        const crestAmount = Math.max(0, normalized - 0.72) * settings.foam;

        columnPosition.set(px, -0.38 + height * 0.5, pz);
        columnScale.set(1, height * (0.8 + edgeFade * 0.2), 1);
        matrix.compose(columnPosition, columns.quaternion, columnScale);
        columns.setMatrixAt(index, matrix);
        columnColor.copy(lowColumnColor).lerp(highColumnColor, Math.min(1, normalized * 1.18));
        columnColor.lerp(foamColumnColor, Math.min(0.36, crestAmount));
        columnColor.lerp(stormColumnColor, storm * 0.28 + settings.cloudCover * 0.05);
        columnColor.lerp(settings.colorTemperature >= 0 ? warmColumnColor : coolColumnColor, Math.abs(settings.colorTemperature) * 0.24);
        columnColor.offsetHSL(cellNoise * settings.voxelColorVariance * 0.045, settings.voxelColorVariance * 0.08, cellNoise * settings.voxelColorVariance * 0.08);
        columnColor.multiplyScalar(1.06 + depthFade * 0.18 + edgeFade * 0.12 + storm * 0.1);
        columns.setColorAt(index, columnColor);
        index += 1;
      }
    }

    columns.instanceMatrix.needsUpdate = true;
    if (columns.instanceColor) {
      columns.instanceColor.needsUpdate = true;
    }
  };

  return {
    updateSettings(nextSettings) {
      settings = nextSettings;
      updateUniforms();
    },
    resize({ width, height }: RoomSize) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
    render({ elapsed, delta }: RoomFrame) {
      const animatedSkyTime = Math.min(1, Math.max(0, settings.skyTime + Math.sin(elapsed * 0.035) * 0.025));
      waterMaterial.uniforms.uTime.value = elapsed;
      waterMaterial.uniforms.uSkyTime.value = animatedSkyTime;
      skyMaterial.uniforms.uTime.value = elapsed;
      skyMaterial.uniforms.uSkyTime.value = animatedSkyTime;
      sun.position.set(
        Math.cos(animatedSkyTime * Math.PI * 2) * 5,
        3.2 + Math.sin(animatedSkyTime * Math.PI) * 5.8,
        Math.sin(animatedSkyTime * Math.PI * 2) * 5,
      );
      sky.position.copy(camera.position);
      updateColumns(elapsed);
      rain.position.y -= delta * (5 + settings.wind * 1.8);
      if (rain.position.y < -4) {
        rain.position.y = 1.5;
      }
      spray.rotation.y += delta * (0.18 + settings.wind * 0.04);
      spray.position.y = Math.sin(elapsed * 0.45) * 0.05;
      cloudDeck.position.x = Math.sin(elapsed * 0.08) * 0.6;
      root.rotation.y = Math.sin(elapsed * PRESENTATION_DRIFT_SPEED) * PRESENTATION_DRIFT_AMPLITUDE;
      renderer.render(scene, camera);
    },
    dispose() {
      disposeObject(root);
      sky.geometry.dispose();
      [waterMaterial, skyMaterial, columnMaterial, rainMaterial, sprayMaterial, cloudMaterial].forEach((material: Material) =>
        material.dispose(),
      );
      rainGeometry.dispose();
      sprayGeometry.dispose();
      renderer.info.reset();
    },
  };
}
