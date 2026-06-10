import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  AdditiveBlending,
  AmbientLight,
  CatmullRomCurve3,
  Color,
  DirectionalLight,
  DoubleSide,
  Fog,
  GridHelper,
  Group,
  IcosahedronGeometry,
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
  TubeGeometry,
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

type BeamTube = {
  core: Mesh<TubeGeometry, MeshBasicMaterial>;
  glow: Mesh<TubeGeometry, MeshBasicMaterial>;
};

function createTubeGeometry(points: Vector3[], radius: number) {
  const curve = new CatmullRomCurve3(
    points.map((point) => point.clone()),
    false,
    'centripetal',
    0.2,
  );
  return new TubeGeometry(curve, Math.max(16, points.length * 12), radius, 8, false);
}

function updateBeamGeometry(beam: BeamTube, points: Vector3[], coreRadius: number, glowRadius: number) {
  beam.core.geometry.dispose();
  beam.core.geometry = createTubeGeometry(points, coreRadius);
  beam.glow.geometry.dispose();
  beam.glow.geometry = createTubeGeometry(points, glowRadius);
}

export function createRoomRuntime(
  { renderer }: RoomRuntimeContext,
  initialSettings: GlassOpticsSettings,
): RoomRuntime<GlassOpticsSettings> {
  let settings = initialSettings;
  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  const root = new Group();
  const lightPosition = new Vector3();
  const target = new Vector3(0, 1.18, 0);
  const refractedA = new Vector3();
  const refractedB = new Vector3();
  const reflected = new Vector3();

  scene.background = new Color(0x071018);
  scene.fog = new Fog(0x071018, 16, 34);
  camera.position.set(5.9, 3.35, 6.4);
  camera.lookAt(0, 1.05, 0);
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
      color: 0x121c26,
      metalness: 0.1,
      roughness: 0.5,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.05;
  root.add(floor);

  const grid = new GridHelper(16, 32, 0x42e9ff, 0x163949);
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMaterials.forEach((material) => {
    material.transparent = true;
    material.opacity = 0.28;
    material.depthWrite = false;
  });
  grid.position.y = 0.005;
  root.add(grid);

  const referenceMaterial = new ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        float scan = fract((vUv.x + uTime * 0.018) * 7.0);
        float stripe = smoothstep(0.18, 0.0, abs(scan - 0.5));
        float centerX = smoothstep(0.018, 0.0, abs(vUv.x - 0.5));
        float centerY = smoothstep(0.014, 0.0, abs(vUv.y - 0.48));
        float edge = 1.0 - smoothstep(0.0, 0.08, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
        vec3 cyan = vec3(0.24, 0.92, 1.0);
        vec3 amber = vec3(1.0, 0.72, 0.28);
        vec3 color = mix(cyan, amber, smoothstep(0.12, 0.9, vUv.x));
        float mask = 0.1 + stripe * 0.42 + max(centerX, centerY) * 0.64 + edge * 0.24;
        gl_FragColor = vec4(color * mask, mask * 0.58);
      }
    `,
    uniforms: {
      uTime: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
  });
  referenceMaterial.toneMapped = false;
  const referencePanel = new Mesh(new PlaneGeometry(3.3, 2.35), referenceMaterial);
  referencePanel.position.set(0, 1.35, -1.85);
  referencePanel.renderOrder = 1;
  root.add(referencePanel);

  const glassGroup = new Group();
  glassGroup.position.y = 1.25;
  root.add(glassGroup);

  const glassMaterial = new MeshPhysicalMaterial({
    color: 0xe8fdff,
    roughness: settings.roughness,
    metalness: 0,
    transmission: 1,
    thickness: settings.thickness,
    ior: settings.ior,
    transparent: true,
    opacity: 1,
    reflectivity: 0.92,
    envMapIntensity: 2.15,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    attenuationColor: 0x9ff4ff,
    attenuationDistance: 4.2,
    specularIntensity: 1,
    specularColor: 0xffffff,
  });
  const glass = new Mesh(new IcosahedronGeometry(1.35, 8), glassMaterial);
  glass.renderOrder = 3;
  glassGroup.add(glass);

  const glassShellMaterial = new MeshBasicMaterial({
    color: 0xb9fbff,
    transparent: true,
    opacity: 0.08,
    wireframe: true,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const glassShell = new Mesh(new IcosahedronGeometry(1.365, 3), glassShellMaterial);
  glassShell.renderOrder = 4;
  glassGroup.add(glassShell);

  const sourceMaterial = new MeshBasicMaterial({ color: 0xffd48b });
  sourceMaterial.toneMapped = false;
  const source = new Mesh(new SphereGeometry(0.16, 28, 18), sourceMaterial);
  const sourceHaloMaterial = new MeshBasicMaterial({
    color: 0xffd48b,
    transparent: true,
    opacity: 0.08,
    blending: AdditiveBlending,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
  const sourceHalo = new Mesh(new SphereGeometry(0.28, 28, 18), sourceHaloMaterial);
  source.renderOrder = 10;
  sourceHalo.renderOrder = 9;
  root.add(sourceHalo, source);

  const createBeam = (color: number, coreOpacity: number, glowOpacity: number): BeamTube => {
    const coreMaterial = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity: coreOpacity,
      blending: AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const glowMaterial = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity: glowOpacity,
      blending: AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
    });
    const placeholder = [new Vector3(0, 0, 0), new Vector3(0.01, 0, 0)];
    const glow = new Mesh(createTubeGeometry(placeholder, 0.052), glowMaterial);
    const core = new Mesh(createTubeGeometry(placeholder, 0.014), coreMaterial);
    glow.renderOrder = 6;
    core.renderOrder = 7;
    root.add(glow, core);
    return { core, glow };
  };

  const incoming = createBeam(0x8deeff, 0.95, 0.24);
  const reflection = createBeam(0xffc067, 0.82, 0.18);
  const refraction = createBeam(0xf8ffff, 0.9, 0.22);

  const markerMaterial = new MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.86,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const reflectionMarkerMaterial = new MeshBasicMaterial({
    color: 0xffbd66,
    transparent: true,
    opacity: 0.74,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const refractionMarkerMaterial = new MeshBasicMaterial({
    color: 0x9ff8ff,
    transparent: true,
    opacity: 0.8,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const targetMarker = new Mesh(new SphereGeometry(0.055, 16, 10), markerMaterial);
  const reflectionMarker = new Mesh(new SphereGeometry(0.07, 16, 10), reflectionMarkerMaterial);
  const refractionMarker = new Mesh(new SphereGeometry(0.085, 16, 10), refractionMarkerMaterial);
  targetMarker.renderOrder = 8;
  reflectionMarker.renderOrder = 8;
  refractionMarker.renderOrder = 8;
  root.add(targetMarker, reflectionMarker, refractionMarker);

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
    blending: AdditiveBlending,
  });
  causticsMaterial.toneMapped = false;
  const caustics = new Mesh(new PlaneGeometry(5.6, 5.6), causticsMaterial);
  caustics.rotation.x = -Math.PI / 2;
  caustics.position.set(0.8, 0.02, 0.4);
  caustics.renderOrder = 5;
  root.add(caustics);

  const updateLightPath = () => {
    lightPosition.set(settings.lightX, settings.lightY, settings.lightZ);
    source.position.copy(lightPosition);
    sourceHalo.position.copy(lightPosition);
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

    updateBeamGeometry(incoming, [lightPosition, incomingEnd], 0.017, 0.064);
    updateBeamGeometry(reflection, [incomingEnd, reflected], 0.014, 0.052);
    updateBeamGeometry(refraction, [incomingEnd, refractedA, refractedB], 0.018, 0.07);
    targetMarker.position.copy(incomingEnd);
    reflectionMarker.position.copy(reflected);
    refractionMarker.position.copy(refractedB);
    caustics.position.set(
      (refractedA.x + refractedB.x) * 0.5,
      0.022,
      (refractedA.z + refractedB.z) * 0.5,
    );
    caustics.scale.setScalar(0.78 + settings.beamSpread * 0.58 + (settings.ior - 1) * 0.16);
  };

  const updateMaterial = () => {
    glassMaterial.ior = settings.ior;
    glassMaterial.roughness = settings.roughness;
    glassMaterial.thickness = settings.thickness;
    glassMaterial.envMapIntensity = 1.55 + settings.thickness * 0.42;
    glassShellMaterial.opacity = Math.min(0.14, 0.05 + (settings.ior - 1) * 0.05);
    caustics.visible = settings.showCaustics;
    causticsMaterial.uniforms.uIntensity.value = settings.showCaustics ? 1.25 : 0;
    causticsMaterial.uniforms.uSpread.value = settings.beamSpread;
    incoming.core.material.opacity = 0.86 + settings.beamSpread * 0.12;
    incoming.glow.material.opacity = 0.18 + settings.beamSpread * 0.18;
    reflection.core.material.opacity = 0.5 + (1 - settings.roughness) * 0.32;
    reflection.glow.material.opacity = 0.12 + (1 - settings.roughness) * 0.08;
    refraction.core.material.opacity = 0.72 + Math.min(0.18, settings.thickness * 0.05);
    refraction.glow.material.opacity = 0.16 + Math.min(0.18, settings.ior * 0.05);
    source.scale.setScalar(0.92 + settings.beamSpread * 0.35);
    sourceHalo.scale.setScalar(0.72 + settings.beamSpread * 0.58);
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
      referenceMaterial.uniforms.uTime.value = elapsed;
      sourceMaterial.color.setHSL(0.1, 0.95, 0.64 + Math.sin(elapsed * 2.4) * 0.08);
      sourceHaloMaterial.color.copy(sourceMaterial.color);
      if (settings.autoRotate) {
        glassGroup.rotation.y += delta * 0.34;
        glassGroup.rotation.x = Math.sin(elapsed * 0.42) * 0.08;
      }
      root.rotation.y = Math.sin(elapsed * 0.05) * 0.04;
      renderer.render(scene, camera);
    },
    dispose() {
      disposeObject(root);
      [
        referenceMaterial,
        glassMaterial,
        glassShellMaterial,
        sourceMaterial,
        sourceHaloMaterial,
        markerMaterial,
        reflectionMarkerMaterial,
        refractionMarkerMaterial,
        incoming.core.material,
        incoming.glow.material,
        reflection.core.material,
        reflection.glow.material,
        refraction.core.material,
        refraction.glow.material,
        causticsMaterial,
      ].forEach((material: Material) => material.dispose());
      environment.texture.dispose();
      pmrem.dispose();
      renderer.info.reset();
    },
  };
}
