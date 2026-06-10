import {
  AmbientLight,
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
import vertexShader from './water.vert.glsl?raw';

const weatherStrength = {
  clear: 0,
  rain: 0.45,
  storm: 1,
} satisfies Record<VoxelWaterSettings['weather'], number>;

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
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  const root = new Group();
  const matrix = new Matrix4();
  const columnPosition = new Vector3();
  const columnScale = new Vector3();
  const clockColor = new Color();

  scene.add(root);
  scene.fog = new Fog(0x07101a, 18, 42);
  camera.position.set(9, 7.2, 11);
  camera.lookAt(0, 0, 0);

  const ambient = new AmbientLight(0x7ecfff, 1.3);
  const sun = new DirectionalLight(0xd8f7ff, 2.6);
  sun.position.set(-4, 7, 3);
  scene.add(ambient, sun);

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
    },
  });

  const plane = new Mesh(new PlaneGeometry(18, 18, 104, 104), waterMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.08;
  root.add(plane);

  const columnMaterial = new MeshStandardMaterial({
    color: 0x2ac9e8,
    roughness: 0.62,
    metalness: 0.03,
    emissive: 0x043444,
    emissiveIntensity: 0.28,
  });
  const columnsPerSide = 24;
  const columnCount = columnsPerSide * columnsPerSide;
  const columns = new InstancedMesh(
    new BoxGeometry(0.22, 1, 0.22),
    columnMaterial,
    columnCount,
  );
  columns.instanceMatrix.setUsage(DynamicDrawUsage);
  root.add(columns);

  const rainGeometry = new BufferGeometry();
  const rainPositions = new Float32Array(640 * 3);
  for (let i = 0; i < rainPositions.length; i += 3) {
    rainPositions[i] = (Math.random() - 0.5) * 22;
    rainPositions[i + 1] = Math.random() * 9 + 2;
    rainPositions[i + 2] = (Math.random() - 0.5) * 18;
  }
  rainGeometry.setAttribute('position', new BufferAttribute(rainPositions, 3));
  const rainMaterial = new PointsMaterial({
    color: 0xb9e9ff,
    size: 0.034,
    transparent: true,
    opacity: 0.46,
    depthWrite: false,
  });
  const rain = new Points(rainGeometry, rainMaterial);
  root.add(rain);

  const sprayGeometry = new BufferGeometry();
  const sprayPositions = new Float32Array(220 * 3);
  for (let i = 0; i < sprayPositions.length; i += 3) {
    sprayPositions[i] = (Math.random() - 0.5) * 8.5;
    sprayPositions[i + 1] = Math.random() * 1.4 + 0.05;
    sprayPositions[i + 2] = (Math.random() - 0.5) * 8.5;
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
  root.add(spray);

  const cloudMaterial = new MeshBasicMaterial({
    color: 0x385062,
    transparent: true,
    opacity: 0.42,
  });
  const cloudDeck = new Group();
  for (let i = 0; i < 14; i += 1) {
    const cloud = new Mesh(new BoxGeometry(1.2 + Math.random(), 0.16, 0.38), cloudMaterial);
    cloud.position.set((Math.random() - 0.5) * 18, 4.2 + Math.random() * 1.1, -5 - Math.random() * 6);
    cloud.rotation.y = Math.random() * 0.4;
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

    rainMaterial.opacity = Math.min(0.82, settings.rain * 0.9 + weatherStrength[settings.weather] * 0.28);
    rain.visible = settings.rain > 0.02 || settings.weather !== 'clear';
    rainMaterial.size = 0.026 + settings.rain * 0.028 + settings.surfaceDetail * 0.008;
    spray.visible = settings.foam > 0.28 || settings.weather !== 'clear';
    sprayMaterial.opacity = Math.min(0.52, settings.foam * 0.34 + settings.rain * 0.18 + weatherStrength[settings.weather] * 0.18);
    sprayMaterial.size = 0.03 + settings.foam * 0.05;
    cloudMaterial.opacity = 0.18 + settings.cloudCover * 0.54 + weatherStrength[settings.weather] * 0.14;
    ambient.intensity = 1.35 + settings.clarity * 0.34 - weatherStrength[settings.weather] * 0.46;
    sun.intensity = 2.35 + settings.clarity * 0.75 - weatherStrength[settings.weather] * 1.24;
    scene.background = clockColor
      .set(0x07111b)
      .lerp(new Color(0x131924), weatherStrength[settings.weather] * 0.72 + settings.cloudCover * 0.18);
    columnMaterial.color.set(settings.weather === 'storm' ? 0x3aa9bb : 0x25c2dd);
    columnMaterial.roughness = 0.66 - settings.clarity * 0.18 + settings.rain * 0.1;
    columnMaterial.emissiveIntensity = 0.2 + settings.clarity * 0.14 + settings.foam * 0.08;
  };

  updateUniforms();

  const updateColumns = (elapsed: number) => {
    let index = 0;
    const spacing = 0.32;
    const offset = ((columnsPerSide - 1) * spacing) / 2;

    for (let z = 0; z < columnsPerSide; z += 1) {
      for (let x = 0; x < columnsPerSide; x += 1) {
        const px = x * spacing - offset;
        const pz = z * spacing - offset;
        const timeScale = 0.55 + settings.wind * 0.2;
        const chopShape = 1.2 + settings.chop * 2.6;
        const layerA = Math.pow(Math.max(0.0001, Math.sin((px * 0.92 + pz * 0.34) * 1.35 + elapsed * timeScale * 1.05) * 0.5 + 0.5), chopShape) * (0.42 + settings.swell * 0.2);
        const layerB = Math.pow(Math.max(0.0001, Math.sin((px * -0.38 + pz * 0.93) * 2.15 - elapsed * timeScale * 1.42) * 0.5 + 0.5), 1.6 + settings.chop * 2.1) * (0.24 + settings.chop * 0.12);
        const layerC = Math.pow(Math.max(0.0001, Math.sin((px * 0.55 + pz * -0.83) * 3.7 + elapsed * timeScale * 2.15) * 0.5 + 0.5), 1.2 + settings.surfaceDetail * 2.0) * (0.12 + settings.surfaceDetail * 0.1);
        const layerD = Math.pow(Math.max(0.0001, Math.sin((px * -0.98 + pz * -0.18) * 0.72 - elapsed * timeScale * 0.68) * 0.5 + 0.5), 1.4) * (0.3 * settings.swell);
        const normalized = Math.min(1, Math.max(0, (layerA + layerB + layerC + layerD) / Math.max(1, 1.08 + settings.swell * 0.62)));
        const stepped = Math.floor(normalized * settings.toonSteps) / settings.toonSteps;
        const crestLift = normalized > 0.76 ? settings.foam * 0.12 : 0;
        const height = 0.22 + Math.max(0.06, stepped * settings.waveHeight * (0.96 + settings.swell * 0.34) + crestLift);

        columnPosition.set(px, -0.36 + height * 0.5, pz);
        columnScale.set(1, height, 1);
        matrix.compose(columnPosition, columns.quaternion, columnScale);
        columns.setMatrixAt(index, matrix);
        index += 1;
      }
    }

    columns.instanceMatrix.needsUpdate = true;
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
      waterMaterial.uniforms.uTime.value = elapsed;
      updateColumns(elapsed);
      rain.position.y -= delta * (5 + settings.wind * 1.8);
      if (rain.position.y < -4) {
        rain.position.y = 1.5;
      }
      spray.rotation.y += delta * (0.18 + settings.wind * 0.04);
      spray.position.y = Math.sin(elapsed * 0.45) * 0.05;
      cloudDeck.position.x = Math.sin(elapsed * 0.08) * 0.6;
      root.rotation.y = Math.sin(elapsed * 0.08) * 0.05;
      renderer.render(scene, camera);
    },
    dispose() {
      disposeObject(root);
      [waterMaterial, columnMaterial, rainMaterial, sprayMaterial, cloudMaterial].forEach((material: Material) =>
        material.dispose(),
      );
      rainGeometry.dispose();
      sprayGeometry.dispose();
      renderer.info.reset();
    },
  };
}
