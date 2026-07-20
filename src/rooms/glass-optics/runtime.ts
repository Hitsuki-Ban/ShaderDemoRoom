import {
  AdditiveBlending,
  AmbientLight,
  BoxGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  DynamicDrawUsage,
  Fog,
  GridHelper,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Quaternion,
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
  GlassOpticsSettings,
  RoomFrame,
  RoomRuntime,
  RoomRuntimeContext,
  RoomSize,
} from '../types';
import causticsFragmentShader from './caustics.frag.glsl?raw';
import causticsVertexShader from './caustics.vert.glsl?raw';
import {
  GLASS_SEGMENT_INCOMING,
  GLASS_SEGMENT_INTERNAL,
  GLASS_SEGMENT_OUTGOING,
  GLASS_SEGMENT_REFLECTED,
  calculateGlassAimDirectionInto,
  createGlassLightPathResult,
  createGlassLightPathWorkspace,
  traceGlassRayInto,
} from './light-path';
import { glassOpticsDefaults, glassOpticsDomains } from './state';

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

const BEAM_INSTANCE_COUNT = 8;
const BEAM_INCOMING_INDEX = 0;
const BEAM_REFLECTED_INDEX = 1;
const BEAM_INTERNAL_RED_INDEX = 2;
const BEAM_INTERNAL_GREEN_INDEX = 3;
const BEAM_INTERNAL_BLUE_INDEX = 4;
const BEAM_OUTGOING_RED_INDEX = 5;
const BEAM_OUTGOING_GREEN_INDEX = 6;
const BEAM_OUTGOING_BLUE_INDEX = 7;

const SPECTRAL_GREEN_INDEX = 1;
const SPECTRAL_PATH_COUNT = 3;
const SPECTRAL_CORE_RADIUS = 0.02;
const SPECTRAL_GLOW_RADIUS = 0.065;
// The RGB centerlines and endpoints stay on the exact r184 IOR paths. Rotating
// the triangular cross-section only gives overlapping rays a readable teaching
// cue; it cannot amplify, offset, or otherwise alter the traced path.
// At the adopted default, the blades land at -40/0/+40 degrees: evenly spaced
// within the triangle's 120-degree rotational symmetry. The teaching cue caps
// there while the exact physical centerlines continue to separate with IOR.
const SPECTRAL_ADOPTED_CROSS_SECTION_ROLL = Math.PI * 40 / 180;
const SPECTRAL_ADOPTED_IOR_OFFSET = (
  glassOpticsDefaults.ior - 1
) * 0.025 * glassOpticsDefaults.dispersion;

const GLASS_STAGE_BACKGROUND = 0x03070b;
const GLASS_STAGE_FOG = 0x03070b;

export const CAUSTICS_ENABLED_INTENSITY = 1;
export const CAUSTICS_ALPHA_BUDGET = 0.7;

const CAUSTICS_SPREAD_MIN = glassOpticsDomains.beamSpread.min;
const CAUSTICS_SPREAD_RANGE = (
  glassOpticsDomains.beamSpread.max - glassOpticsDomains.beamSpread.min
);
const CAUSTICS_IOR_MIN = glassOpticsDomains.ior.min;
const CAUSTICS_IOR_RANGE = glassOpticsDomains.ior.max - glassOpticsDomains.ior.min;
const CAUSTICS_DIRECTION_EPSILON_SQUARED = 1e-10;

export interface CausticsProfile {
  focus: number;
  intensityScale: number;
  hotspotRadius: number;
  planeScale: number;
  cuspLength: number;
  cuspWidth: number;
  ringRadius: number;
  ringWidth: number;
}

export function causticsIntensity(showCaustics: boolean, intensityScale: number) {
  return showCaustics ? CAUSTICS_ENABLED_INTENSITY * intensityScale : 0;
}

export function calculateCausticsProfileInto(
  beamSpread: number,
  ior: number,
  output: CausticsProfile,
) {
  if (
    !Number.isFinite(beamSpread)
    || beamSpread < CAUSTICS_SPREAD_MIN
    || beamSpread > CAUSTICS_SPREAD_MIN + CAUSTICS_SPREAD_RANGE
  ) {
    throw new RangeError('Glass caustics beamSpread is outside its declared domain.');
  }
  if (
    !Number.isFinite(ior)
    || ior < CAUSTICS_IOR_MIN
    || ior > CAUSTICS_IOR_MIN + CAUSTICS_IOR_RANGE
  ) {
    throw new RangeError('Glass caustics ior is outside its declared domain.');
  }

  const spread = (beamSpread - CAUSTICS_SPREAD_MIN) / CAUSTICS_SPREAD_RANGE;
  output.focus = (ior - CAUSTICS_IOR_MIN) / CAUSTICS_IOR_RANGE;
  output.hotspotRadius = 0.155 + spread * 0.04 - output.focus * 0.07;
  output.planeScale = 0.78 + beamSpread * 0.58 + (ior - 1) * 0.16;
  const defaultSpread = (
    glassOpticsDefaults.beamSpread - CAUSTICS_SPREAD_MIN
  ) / CAUSTICS_SPREAD_RANGE;
  const referenceHotspotRadius = 0.155 + defaultSpread * 0.04 - output.focus * 0.07;
  const referencePlaneScale = 0.78
    + glassOpticsDefaults.beamSpread * 0.58
    + (ior - 1) * 0.16;
  const referenceFootprintRadius = referenceHotspotRadius * referencePlaneScale;
  const footprintRadius = output.hotspotRadius * output.planeScale;
  output.intensityScale = Math.min(
    1,
    (referenceFootprintRadius / footprintRadius) ** 2,
  );
  output.cuspLength = 0.25 + output.focus * 0.08 + spread * 0.03;
  output.cuspWidth = 0.07 + spread * 0.018 - output.focus * 0.01;
  output.ringRadius = 0.21 + spread * 0.02 - output.focus * 0.02;
  output.ringWidth = 0.018 + spread * 0.003;
  return output;
}

export function setCausticsDirectionFromOutgoing(
  outgoingDirection: Vector3,
  output: Vector2,
) {
  const localX = outgoingDirection.x;
  const localY = -outgoingDirection.z;
  const lengthSquared = localX * localX + localY * localY;
  if (lengthSquared <= CAUSTICS_DIRECTION_EPSILON_SQUARED) {
    output.set(1, 0);
    return 'canonical' as const;
  }
  const inverseLength = 1 / Math.sqrt(lengthSquared);
  output.set(localX * inverseLength, localY * inverseLength);
  return 'projected' as const;
}

export function glassEnvironmentIntensity(thickness: number) {
  return 1.05 + thickness * 0.28;
}

export function glassSpectralIorOffset(ior: number, dispersion: number) {
  return (ior - 1) * 0.025 * dispersion;
}

function createDarkFieldEnvironment() {
  const environmentScene = new Scene();
  environmentScene.name = 'glass-optics-darkfield-environment';
  environmentScene.background = new Color(0x000000);

  const createStrip = (
    name: string,
    color: number,
    intensity: number,
    position: [number, number, number],
    scale: [number, number, number],
    rotationY: number,
  ) => {
    const strip = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshLambertMaterial({
        color: 0x000000,
        emissive: color,
        emissiveIntensity: intensity,
      }),
    );
    strip.name = name;
    strip.position.set(...position);
    strip.scale.set(...scale);
    strip.rotation.y = rotationY;
    environmentScene.add(strip);
  };

  createStrip(
    'glass-optics-env-strip-cool',
    0x9ef4ff,
    24,
    [1.8, 2.4, -5.4],
    [0.09, 4.6, 0.26],
    -0.16,
  );
  createStrip(
    'glass-optics-env-strip-warm',
    0xffd08a,
    18,
    [5.2, 2.8, -3.7],
    [0.09, 4.2, 0.24],
    0.2,
  );
  createStrip(
    'glass-optics-env-strip-top',
    0xe8fdff,
    10,
    [0, 5.1, 0.4],
    [2.3, 0.08, 0.38],
    0,
  );
  return environmentScene;
}

export function createGlassMaterial(settings: DeepReadonly<GlassOpticsSettings>) {
  const material = new MeshPhysicalMaterial({
    color: 0xe8fdff,
    roughness: settings.roughness,
    metalness: 0,
    transmission: 1,
    thickness: settings.thickness,
    ior: settings.ior,
    dispersion: settings.dispersion,
    transparent: false,
    opacity: 1,
    reflectivity: 0.92,
    envMapIntensity: glassEnvironmentIntensity(settings.thickness),
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    attenuationColor: 0xffffff,
    attenuationDistance: 4.2,
    specularIntensity: 1,
    specularColor: 0xffffff,
  });

  material.ior = settings.ior;
  material.dispersion = settings.dispersion;
  return material;
}

export function createRoomRuntime(
  {
    renderer,
    createPmremGenerator,
    motionScale: initialMotionScale,
  }: RoomRuntimeContext,
  initialSettings: DeepReadonly<GlassOpticsSettings>,
): RoomRuntime<GlassOpticsSettings> {
  let settings: DeepReadonly<GlassOpticsSettings> = initialSettings;
  let motionScale = initialMotionScale;
  let motionElapsed = 0;
  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  const root = new Group();
  const sourcePosition = new Vector3();
  const aimCenterDirection = new Vector3();
  const aimOffsetAxis = new Vector3();
  const aimPoint = new Vector3();
  const aimDirection = new Vector3();
  const reflectedEnd = new Vector3();
  const spectralLightPaths = [
    createGlassLightPathResult(),
    createGlassLightPathResult(),
    createGlassLightPathResult(),
  ];
  const spectralLightPathWorkspaces = [
    createGlassLightPathWorkspace(),
    createGlassLightPathWorkspace(),
    createGlassLightPathWorkspace(),
  ];
  const lightPath = spectralLightPaths[SPECTRAL_GREEN_INDEX];
  const beamMidpoint = new Vector3();
  const beamDirection = new Vector3();
  const beamScale = new Vector3();
  const beamQuaternion = new Quaternion();
  const beamRollQuaternion = new Quaternion();
  const beamMatrix = new Matrix4();
  const beamYAxis = new Vector3(0, 1, 0);
  const incomingColor = new Color(0xffffff);
  const reflectedColor = new Color(0xffc067);
  const spectralRed = new Color(1, 0, 0);
  const spectralGreen = new Color(0, 1, 0);
  const spectralBlue = new Color(0, 0, 1);
  const workingBeamColor = new Color();
  const causticsDirection = new Vector2(1, 0);
  const causticsProfile: CausticsProfile = {
    focus: 0,
    intensityScale: 0,
    hotspotRadius: 0,
    planeScale: 0,
    cuspLength: 0,
    cuspWidth: 0,
    ringRadius: 0,
    ringWidth: 0,
  };
  calculateCausticsProfileInto(settings.beamSpread, settings.ior, causticsProfile);

  scene.background = new Color(GLASS_STAGE_BACKGROUND);
  scene.fog = new Fog(GLASS_STAGE_FOG, 16, 34);
  camera.position.set(-5.9, 3.55, 6.45);
  camera.lookAt(0.15, 1.05, -0.15);
  root.name = 'glass-optics-stage-root';
  scene.add(root);

  const pmrem = createPmremGenerator();
  const darkFieldEnvironment = createDarkFieldEnvironment();
  const environment = pmrem.fromScene(
    darkFieldEnvironment,
    0.025,
    0.1,
    20,
    { size: 128 },
  );
  disposeObject(darkFieldEnvironment);
  scene.environment = environment.texture;

  const ambient = new AmbientLight(0x8fb8ff, 0.62);
  const keyLight = new DirectionalLight(0xffffff, 1.55);
  keyLight.position.set(5, 7, 4);
  const pointLight = new PointLight(0xbdeeff, 1.5, 18);
  root.add(ambient, keyLight, pointLight);

  const floorMaterial = new MeshStandardMaterial({
    color: 0x101820,
    metalness: 0.6,
    roughness: 0.11,
    envMap: environment.texture,
    envMapIntensity: 0.1,
  });
  const floor = new Mesh(new PlaneGeometry(16, 16), floorMaterial);
  floor.name = 'glass-optics-reflective-floor';
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.05;
  root.add(floor);

  const grid = new GridHelper(16, 32, 0x19333b, 0x13262d);
  grid.name = 'glass-optics-subdued-grid';
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMaterials.forEach((material) => {
    material.transparent = true;
    material.opacity = 0.075;
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
      varying vec2 vUv;

      void main() {
        float phase = abs(fract(vUv.x * 12.0) - 0.5);
        float antialiasWidth = max(fwidth(phase) * 0.5, 0.001);
        float stripe = 1.0 - smoothstep(
          0.025 - antialiasWidth,
          0.025 + antialiasWidth,
          phase
        );
        stripe *= smoothstep(0.16, 0.22, vUv.y);
        float edgeDistance = min(
          min(vUv.x, 1.0 - vUv.x),
          min(vUv.y, 1.0 - vUv.y)
        );
        float edge = 1.0 - smoothstep(0.0, 0.025, edgeDistance);
        vec3 dark = vec3(0.0);
        vec3 neutral = vec3(1.0);
        vec3 color = mix(dark, neutral, stripe);
        color += vec3(0.05, 0.14, 0.16) * edge;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    transparent: false,
    depthWrite: false,
    side: DoubleSide,
  });
  referenceMaterial.toneMapped = false;
  const referencePanel = new Mesh(new PlaneGeometry(3.8, 2.7), referenceMaterial);
  referencePanel.name = 'glass-optics-dispersion-reference';
  referencePanel.position.set(1.55, 1.0, -1.85);
  referencePanel.renderOrder = 1;
  root.add(referencePanel);

  const glassGroup = new Group();
  glassGroup.name = 'glass-optics-glass-group';
  glassGroup.position.y = 1.25;
  root.add(glassGroup);

  const glassMaterial = createGlassMaterial(settings);
  glassMaterial.envMap = environment.texture;
  const glass = new Mesh(new IcosahedronGeometry(1.35, 8), glassMaterial);
  glass.renderOrder = 3;
  glassGroup.add(glass);

  const glassShellMaterial = new MeshBasicMaterial({
    color: 0xb9fbff,
    transparent: true,
    opacity: Math.min(0.08, 0.03 + (settings.ior - 1) * 0.03),
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
  source.name = 'glass-optics-light-source';
  sourceHalo.name = 'glass-optics-light-source-halo';
  source.scale.setScalar(0.92 + settings.beamSpread * 0.35);
  sourceHalo.scale.setScalar(0.72 + settings.beamSpread * 0.58);
  source.frustumCulled = false;
  sourceHalo.frustumCulled = false;
  source.renderOrder = 10;
  sourceHalo.renderOrder = 9;
  root.add(sourceHalo, source);

  const coreBeamMaterial = new MeshBasicMaterial({
    color: 0xffffff,
    // InstancedMesh.instanceColor is independent; vertexColors would also
    // require a geometry color attribute and multiply these colors to black.
    vertexColors: false,
    transparent: true,
    opacity: 0.95,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const glowBeamMaterial = new MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: false,
    transparent: true,
    opacity: 0.24,
    blending: AdditiveBlending,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
  const coreBeams = new InstancedMesh(
    new CylinderGeometry(1, 1, 1, 3, 1, false),
    coreBeamMaterial,
    BEAM_INSTANCE_COUNT,
  );
  const glowBeams = new InstancedMesh(
    new CylinderGeometry(1, 1, 1, 3, 1, false),
    glowBeamMaterial,
    BEAM_INSTANCE_COUNT,
  );
  coreBeams.name = 'glass-optics-beam-core';
  glowBeams.name = 'glass-optics-beam-glow';
  coreBeams.instanceMatrix.setUsage(DynamicDrawUsage);
  glowBeams.instanceMatrix.setUsage(DynamicDrawUsage);
  coreBeams.frustumCulled = false;
  glowBeams.frustumCulled = false;
  coreBeams.renderOrder = 7;
  glowBeams.renderOrder = 6;
  beamMatrix.makeScale(0, 0, 0);
  for (let index = 0; index < BEAM_INSTANCE_COUNT; index += 1) {
    coreBeams.setMatrixAt(index, beamMatrix);
    glowBeams.setMatrixAt(index, beamMatrix);
  }
  coreBeams.setColorAt(BEAM_INCOMING_INDEX, incomingColor);
  coreBeams.setColorAt(BEAM_REFLECTED_INDEX, reflectedColor);
  coreBeams.setColorAt(BEAM_INTERNAL_RED_INDEX, spectralRed);
  coreBeams.setColorAt(BEAM_INTERNAL_GREEN_INDEX, spectralGreen);
  coreBeams.setColorAt(BEAM_INTERNAL_BLUE_INDEX, spectralBlue);
  coreBeams.setColorAt(BEAM_OUTGOING_RED_INDEX, spectralRed);
  coreBeams.setColorAt(BEAM_OUTGOING_GREEN_INDEX, spectralGreen);
  coreBeams.setColorAt(BEAM_OUTGOING_BLUE_INDEX, spectralBlue);
  glowBeams.setColorAt(BEAM_INCOMING_INDEX, incomingColor);
  glowBeams.setColorAt(BEAM_REFLECTED_INDEX, reflectedColor);
  glowBeams.setColorAt(BEAM_INTERNAL_RED_INDEX, spectralRed);
  glowBeams.setColorAt(BEAM_INTERNAL_GREEN_INDEX, spectralGreen);
  glowBeams.setColorAt(BEAM_INTERNAL_BLUE_INDEX, spectralBlue);
  glowBeams.setColorAt(BEAM_OUTGOING_RED_INDEX, spectralRed);
  glowBeams.setColorAt(BEAM_OUTGOING_GREEN_INDEX, spectralGreen);
  glowBeams.setColorAt(BEAM_OUTGOING_BLUE_INDEX, spectralBlue);
  root.add(glowBeams, coreBeams);

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
    opacity: 0.12,
    blending: AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  const targetMarker = new Mesh(new SphereGeometry(0.055, 16, 10), markerMaterial);
  const reflectionMarker = new Mesh(new SphereGeometry(0.07, 16, 10), reflectionMarkerMaterial);
  const refractionMarker = new Mesh(new SphereGeometry(0.07, 16, 10), refractionMarkerMaterial);
  targetMarker.name = 'glass-optics-entry-marker';
  reflectionMarker.name = 'glass-optics-exit-marker';
  refractionMarker.name = 'glass-optics-floor-marker';
  targetMarker.frustumCulled = false;
  reflectionMarker.frustumCulled = false;
  targetMarker.renderOrder = 8;
  reflectionMarker.renderOrder = 8;
  refractionMarker.renderOrder = 8;
  refractionMarker.frustumCulled = false;
  root.add(targetMarker, reflectionMarker, refractionMarker);

  const causticsMaterial = new ShaderMaterial({
    vertexShader: causticsVertexShader,
    fragmentShader: causticsFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uIntensity: {
        value: causticsIntensity(settings.showCaustics, causticsProfile.intensityScale),
      },
      uFocus: { value: causticsProfile.focus },
      uFocusRadius: { value: causticsProfile.hotspotRadius },
      uCuspLength: { value: causticsProfile.cuspLength },
      uCuspWidth: { value: causticsProfile.cuspWidth },
      uRingRadius: { value: causticsProfile.ringRadius },
      uRingWidth: { value: causticsProfile.ringWidth },
      uDirection: { value: causticsDirection },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  causticsMaterial.toneMapped = false;
  const caustics = new Mesh(new PlaneGeometry(5.6, 5.6), causticsMaterial);
  caustics.name = 'glass-optics-caustics';
  caustics.frustumCulled = false;
  caustics.rotation.x = -Math.PI / 2;
  caustics.position.set(0.8, 0.02, 0.4);
  caustics.renderOrder = 5;
  root.add(caustics);

  const hideBeamSegment = (index: number) => {
    beamMatrix.makeScale(0, 0, 0);
    coreBeams.setMatrixAt(index, beamMatrix);
    glowBeams.setMatrixAt(index, beamMatrix);
  };

  const updateBeamSegment = (
    index: number,
    start: Vector3,
    end: Vector3,
    coreRadius: number,
    glowRadius: number,
    crossSectionRoll = 0,
    crossSectionAspect = 1,
  ) => {
    beamDirection.copy(end).sub(start);
    const length = beamDirection.length();
    if (!Number.isFinite(length) || length <= 1e-7) {
      hideBeamSegment(index);
      return;
    }
    beamDirection.multiplyScalar(1 / length);
    beamMidpoint.copy(start).add(end).multiplyScalar(0.5);
    beamQuaternion.setFromUnitVectors(beamYAxis, beamDirection);
    if (crossSectionRoll !== 0) {
      beamRollQuaternion.setFromAxisAngle(beamYAxis, crossSectionRoll);
      beamQuaternion.multiply(beamRollQuaternion);
    }

    beamScale.set(coreRadius, length, coreRadius * crossSectionAspect);
    beamMatrix.compose(beamMidpoint, beamQuaternion, beamScale);
    coreBeams.setMatrixAt(index, beamMatrix);

    beamScale.set(glowRadius, length, glowRadius * crossSectionAspect);
    beamMatrix.compose(beamMidpoint, beamQuaternion, beamScale);
    glowBeams.setMatrixAt(index, beamMatrix);
  };

  const updateCausticsVisibility = () => {
    caustics.visible = settings.showCaustics && lightPath.hasFloorHit;
  };

  const updateLightPath = () => {
    sourcePosition.set(settings.lightX, settings.lightY, settings.lightZ);
    calculateGlassAimDirectionInto(
      sourcePosition,
      aimDirection,
      aimCenterDirection,
      aimOffsetAxis,
      aimPoint,
    );
    const spectralIorOffset = glassSpectralIorOffset(
      settings.ior,
      settings.dispersion,
    );
    const spectralCrossSectionRoll = Math.min(
      spectralIorOffset / SPECTRAL_ADOPTED_IOR_OFFSET,
      1,
    ) * SPECTRAL_ADOPTED_CROSS_SECTION_ROLL;
    for (let index = 0; index < SPECTRAL_PATH_COUNT; index += 1) {
      traceGlassRayInto(
        sourcePosition,
        aimDirection,
        settings.ior + (index - SPECTRAL_GREEN_INDEX) * spectralIorOffset,
        spectralLightPaths[index],
        spectralLightPathWorkspaces[index],
      );
    }

    source.position.copy(sourcePosition);
    sourceHalo.position.copy(sourcePosition);
    pointLight.position.copy(sourcePosition);

    const radiusScale = 0.82 + settings.beamSpread * 0.52;
    reflectedEnd
      .copy(lightPath.entryPoint)
      .addScaledVector(lightPath.reflectedDirection, 3.6);

    if ((lightPath.segmentMask & GLASS_SEGMENT_INCOMING) !== 0) {
      updateBeamSegment(
        BEAM_INCOMING_INDEX,
        sourcePosition,
        lightPath.entryPoint,
        0.017 * radiusScale,
        0.064 * radiusScale,
      );
    } else {
      hideBeamSegment(BEAM_INCOMING_INDEX);
    }
    if ((lightPath.segmentMask & GLASS_SEGMENT_REFLECTED) !== 0) {
      updateBeamSegment(
        BEAM_REFLECTED_INDEX,
        lightPath.entryPoint,
        reflectedEnd,
        0.014 * radiusScale,
        0.052 * radiusScale,
      );
    } else {
      hideBeamSegment(BEAM_REFLECTED_INDEX);
    }
    for (let index = 0; index < SPECTRAL_PATH_COUNT; index += 1) {
      const spectralPath = spectralLightPaths[index];
      const internalIndex = BEAM_INTERNAL_RED_INDEX + index;
      const outgoingIndex = BEAM_OUTGOING_RED_INDEX + index;
      if ((spectralPath.segmentMask & GLASS_SEGMENT_INTERNAL) !== 0) {
        updateBeamSegment(
          internalIndex,
          spectralPath.entryPoint,
          spectralPath.exitPoint,
          SPECTRAL_CORE_RADIUS * radiusScale,
          SPECTRAL_GLOW_RADIUS * radiusScale,
          (index - SPECTRAL_GREEN_INDEX) * spectralCrossSectionRoll,
          0.35,
        );
      } else {
        hideBeamSegment(internalIndex);
      }
      if ((spectralPath.segmentMask & GLASS_SEGMENT_OUTGOING) !== 0) {
        updateBeamSegment(
          outgoingIndex,
          spectralPath.exitPoint,
          spectralPath.floorHit,
          SPECTRAL_CORE_RADIUS * radiusScale,
          SPECTRAL_GLOW_RADIUS * radiusScale,
          (index - SPECTRAL_GREEN_INDEX) * spectralCrossSectionRoll,
          0.35,
        );
      } else {
        hideBeamSegment(outgoingIndex);
      }
    }
    coreBeams.instanceMatrix.needsUpdate = true;
    glowBeams.instanceMatrix.needsUpdate = true;

    workingBeamColor.copy(reflectedColor).multiplyScalar(lightPath.reflectance * 8);
    coreBeams.setColorAt(BEAM_REFLECTED_INDEX, workingBeamColor);
    glowBeams.setColorAt(BEAM_REFLECTED_INDEX, workingBeamColor);
    if (coreBeams.instanceColor) coreBeams.instanceColor.needsUpdate = true;
    if (glowBeams.instanceColor) glowBeams.instanceColor.needsUpdate = true;

    targetMarker.visible = lightPath.hasEntry;
    reflectionMarker.visible = lightPath.hasExit;
    refractionMarker.visible = lightPath.hasFloorHit;
    if (lightPath.hasEntry) targetMarker.position.copy(lightPath.entryPoint);
    if (lightPath.hasExit) reflectionMarker.position.copy(lightPath.exitPoint);
    if (lightPath.hasFloorHit) {
      refractionMarker.position.copy(lightPath.floorHit);
      caustics.position.copy(lightPath.floorHit);
      caustics.position.y = 0.022;
      setCausticsDirectionFromOutgoing(
        lightPath.outgoingDirection,
        causticsDirection,
      );
    }
    caustics.scale.setScalar(causticsProfile.planeScale);
    updateCausticsVisibility();
  };

  const updateMaterial = () => {
    glassMaterial.ior = settings.ior;
    glassMaterial.dispersion = settings.dispersion;
    glassMaterial.roughness = settings.roughness;
    glassMaterial.thickness = settings.thickness;
    glassMaterial.envMapIntensity = glassEnvironmentIntensity(settings.thickness);
    glassShellMaterial.opacity = Math.min(0.14, 0.05 + (settings.ior - 1) * 0.05);
    calculateCausticsProfileInto(settings.beamSpread, settings.ior, causticsProfile);
    causticsMaterial.uniforms.uIntensity.value = causticsIntensity(
      settings.showCaustics,
      causticsProfile.intensityScale,
    );
    causticsMaterial.uniforms.uFocus.value = causticsProfile.focus;
    causticsMaterial.uniforms.uFocusRadius.value = causticsProfile.hotspotRadius;
    causticsMaterial.uniforms.uCuspLength.value = causticsProfile.cuspLength;
    causticsMaterial.uniforms.uCuspWidth.value = causticsProfile.cuspWidth;
    causticsMaterial.uniforms.uRingRadius.value = causticsProfile.ringRadius;
    causticsMaterial.uniforms.uRingWidth.value = causticsProfile.ringWidth;
    source.scale.setScalar(0.92 + settings.beamSpread * 0.35);
    sourceHalo.scale.setScalar(0.72 + settings.beamSpread * 0.58);
    updateCausticsVisibility();
  };

  const applyMotionPhase = () => {
    causticsMaterial.uniforms.uTime.value = motionElapsed;
    sourceMaterial.color.setHSL(
      0.1,
      0.95,
      0.64 + Math.sin(motionElapsed * 2.4) * 0.08,
    );
    sourceHaloMaterial.color.copy(sourceMaterial.color);
  };

  const applyCanonicalPose = () => {
    motionElapsed = 0;
    applyMotionPhase();
    glassGroup.rotation.set(0, 0, 0);
    root.rotation.y = 0;
  };

  updateLightPath();

  return {
    updateSettings(nextSettings) {
      const pathChanged = nextSettings.lightX !== settings.lightX
        || nextSettings.lightY !== settings.lightY
        || nextSettings.lightZ !== settings.lightZ
        || nextSettings.ior !== settings.ior
        || nextSettings.dispersion !== settings.dispersion
        || nextSettings.beamSpread !== settings.beamSpread;
      settings = nextSettings;
      if (!settings.autoRotate) applyCanonicalPose();
      updateMaterial();
      if (pathChanged) updateLightPath();
    },
    setMotionScale(scale) {
      motionScale = scale;
    },
    resize({ width, height }: RoomSize) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },
    render({ delta }: RoomFrame) {
      if (settings.autoRotate) {
        motionElapsed += delta * motionScale;
        applyMotionPhase();
        glassGroup.rotation.y += delta * motionScale * 0.34;
        glassGroup.rotation.x = Math.sin(motionElapsed * 0.42) * 0.08;
        root.rotation.y = Math.sin(motionElapsed * 0.05) * 0.04;
      } else {
        applyCanonicalPose();
      }
      renderer.render(scene, camera);
    },
    dispose() {
      disposeObject(root);
      [
        glassMaterial,
        glassShellMaterial,
        sourceMaterial,
        sourceHaloMaterial,
        markerMaterial,
        reflectionMarkerMaterial,
        refractionMarkerMaterial,
        coreBeamMaterial,
        glowBeamMaterial,
        causticsMaterial,
      ].forEach((material: Material) => material.dispose());
      environment.dispose();
      pmrem.dispose();
    },
  };
}
