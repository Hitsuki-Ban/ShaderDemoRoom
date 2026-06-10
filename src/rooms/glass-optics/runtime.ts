import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  AmbientLight,
  BufferGeometry,
  Color,
  DirectionalLight,
  Fog,
  GridHelper,
  Group,
  IcosahedronGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  type Material,
  type Object3D,
} from 'three';
import type {
  GlassOpticsSettings,
  RoomFrame,
  RoomRuntime,
  RoomRuntimeContext,
  RoomSize,
} from '../types';
import causticsFragmentShader from './caustics.frag.glsl?raw';
import causticsVertexShader from './caustics.vert.glsl?raw';

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
  initialSettings: GlassOpticsSettings,
): RoomRuntime<GlassOpticsSettings> {
  let settings = initialSettings;
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  const root = new Group();
  const lightPosition = new Vector3();
  const target = new Vector3(0, 0.78, 0);
  const refractedA = new Vector3();
  const refractedB = new Vector3();
  const reflected = new Vector3();

  scene.background = new Color(0x070b10);
  scene.fog = new Fog(0x070b10, 18, 36);
  camera.position.set(7.5, 4.6, 8.2);
  camera.lookAt(0, 0.75, 0);
  scene.add(root);

  const pmrem = new PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = environment.texture;

  const ambient = new AmbientLight(0x8fb8ff, 0.62);
  const keyLight = new DirectionalLight(0xffffff, 1.55);
  keyLight.position.set(5, 7, 4);
  const pointLight = new PointLight(0xbdeeff, 6.5, 18);
  root.add(ambient, keyLight, pointLight);

  const floor = new Mesh(
    new PlaneGeometry(16, 16),
    new MeshStandardMaterial({
      color: 0x111922,
      metalness: 0.28,
      roughness: 0.34,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.05;
  root.add(floor);

  const grid = new GridHelper(16, 32, 0x3dd6ff, 0x1d3542);
  grid.position.y = 0.005;
  root.add(grid);

  const glassMaterial = new MeshPhysicalMaterial({
    color: 0xcff9ff,
    roughness: settings.roughness,
    metalness: 0,
    transmission: 1,
    thickness: settings.thickness,
    ior: settings.ior,
    transparent: true,
    opacity: 0.72,
    reflectivity: 0.75,
    envMapIntensity: 1.55,
  });
  const glass = new Mesh(new IcosahedronGeometry(1.35, 8), glassMaterial);
  glass.position.y = 1.25;
  root.add(glass);

  const sourceMaterial = new MeshBasicMaterial({ color: 0xffd48b });
  const source = new Mesh(new SphereGeometry(0.12, 24, 16), sourceMaterial);
  root.add(source);

  const beamMaterial = new LineBasicMaterial({ color: 0x9be7ff, transparent: true, opacity: 0.86 });
  const reflectMaterial = new LineBasicMaterial({ color: 0xffc66e, transparent: true, opacity: 0.72 });
  const refractMaterial = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 });

  const incoming = new Line(new BufferGeometry(), beamMaterial);
  const reflection = new Line(new BufferGeometry(), reflectMaterial);
  const refraction = new Line(new BufferGeometry(), refractMaterial);
  root.add(incoming, reflection, refraction);

  const causticsMaterial = new ShaderMaterial({
    vertexShader: causticsVertexShader,
    fragmentShader: causticsFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: settings.showCaustics ? 1 : 0 },
      uSpread: { value: settings.beamSpread },
    },
    transparent: true,
    depthWrite: false,
  });
  const caustics = new Mesh(new PlaneGeometry(5.6, 5.6), causticsMaterial);
  caustics.rotation.x = -Math.PI / 2;
  caustics.position.set(0.8, 0.015, 0.4);
  root.add(caustics);

  const updateLightPath = () => {
    lightPosition.set(settings.lightX, settings.lightY, settings.lightZ);
    source.position.copy(lightPosition);
    pointLight.position.copy(lightPosition);

    const incomingEnd = target.clone();
    const direction = incomingEnd.clone().sub(lightPosition).normalize();
    reflected.copy(incomingEnd).add(new Vector3(-direction.x, Math.abs(direction.y), -direction.z).multiplyScalar(3.6));
    refractedA.copy(incomingEnd).add(direction.multiplyScalar(1.4 / settings.ior));
    refractedB.set(
      refractedA.x + settings.beamSpread * 2.4,
      0.04,
      refractedA.z - settings.beamSpread * 3.2,
    );

    incoming.geometry.dispose();
    incoming.geometry = new BufferGeometry().setFromPoints([lightPosition, incomingEnd]);
    reflection.geometry.dispose();
    reflection.geometry = new BufferGeometry().setFromPoints([incomingEnd, reflected]);
    refraction.geometry.dispose();
    refraction.geometry = new BufferGeometry().setFromPoints([incomingEnd, refractedA, refractedB]);
  };

  const updateMaterial = () => {
    glassMaterial.ior = settings.ior;
    glassMaterial.roughness = settings.roughness;
    glassMaterial.thickness = settings.thickness;
    glassMaterial.envMapIntensity = 1.15 + settings.thickness * 0.35;
    caustics.visible = settings.showCaustics;
    causticsMaterial.uniforms.uIntensity.value = settings.showCaustics ? 1 : 0;
    causticsMaterial.uniforms.uSpread.value = settings.beamSpread;
    reflectMaterial.opacity = 0.42 + (1 - settings.roughness) * 0.38;
    beamMaterial.opacity = 0.55 + settings.beamSpread * 0.7;
    updateLightPath();
  };

  updateMaterial();

  return {
    updateSettings(nextSettings) {
      settings = nextSettings;
      updateMaterial();
    },
    resize({ width, height }: RoomSize) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
    render({ elapsed, delta }: RoomFrame) {
      causticsMaterial.uniforms.uTime.value = elapsed;
      sourceMaterial.color.setHSL(0.1, 0.95, 0.64 + Math.sin(elapsed * 2.4) * 0.08);
      if (settings.autoRotate) {
        glass.rotation.y += delta * 0.34;
        glass.rotation.x = Math.sin(elapsed * 0.42) * 0.12;
      }
      root.rotation.y = Math.sin(elapsed * 0.05) * 0.04;
      renderer.render(scene, camera);
    },
    dispose() {
      disposeObject(root);
      [glassMaterial, sourceMaterial, beamMaterial, reflectMaterial, refractMaterial, causticsMaterial].forEach(
        (material: Material) => material.dispose(),
      );
      environment.texture.dispose();
      pmrem.dispose();
      renderer.info.reset();
    },
  };
}
