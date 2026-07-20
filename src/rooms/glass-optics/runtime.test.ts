import { describe, expect, it, vi } from 'vitest';
import {
  AdditiveBlending,
  Camera,
  Color,
  CylinderGeometry,
  Group,
  GridHelper,
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
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Texture,
  Vector2,
  Vector3,
  type Object3D,
} from 'three';
import type { GlassOpticsSettings, RoomRuntimeContext } from '../types';
import {
  CAUSTICS_ALPHA_BUDGET,
  CAUSTICS_ENABLED_INTENSITY,
  type CausticsProfile,
  calculateCausticsProfileInto,
  causticsIntensity,
  createGlassMaterial,
  createRoomRuntime,
  glassEnvironmentIntensity,
  glassShellOpacity,
  glassSpectralIorOffset,
  setCausticsDirectionFromOutgoing,
} from './runtime';
import causticsFragmentShader from './caustics.frag.glsl?raw';
import {
  calculateGlassAimDirectionInto,
  createGlassLightPathResult,
  createGlassLightPathWorkspace,
  traceGlassRayInto,
} from './light-path';
import {
  glassOpticsCrystalPreset,
  glassOpticsDefaults,
  glassOpticsDomains,
  glassOpticsFocusPreset,
} from './state';

function expectPresetWithinDomains(preset: Partial<typeof glassOpticsDefaults>) {
  for (const [key, domain] of Object.entries(glassOpticsDomains)) {
    const value = preset[key as keyof typeof glassOpticsDomains];
    if (value !== undefined) {
      expect(value).toBeGreaterThanOrEqual(domain.min);
      expect(value).toBeLessThanOrEqual(domain.max);
    }
  }
}

function createRuntimeHarness(settings: GlassOpticsSettings = { ...glassOpticsDefaults }) {
  let scene: Scene | undefined;
  let camera: PerspectiveCamera | undefined;
  const environmentTexture = new Texture();
  const environmentTarget = {
    texture: environmentTexture,
    dispose: vi.fn(),
  };
  const fromScene = vi.fn((
    environmentScene: Scene,
    sigma?: number,
    near?: number,
    far?: number,
    options?: { size?: number },
  ) => {
    void [environmentScene, sigma, near, far, options];
    return environmentTarget;
  });
  const pmremDispose = vi.fn();
  const renderer = {
    render(nextScene: Object3D, nextCamera: Camera) {
      if (!(nextScene instanceof Scene) || !(nextCamera instanceof PerspectiveCamera)) {
        throw new Error('Glass optics runtime rendered an unexpected scene or camera type.');
      }
      scene = nextScene;
      camera = nextCamera;
    },
  };
  const context: RoomRuntimeContext = {
    canvas: document.createElement('canvas'),
    renderer,
    createPmremGenerator: vi.fn(() => ({
      fromScene,
      dispose: pmremDispose,
    }) as never),
    motionScale: 1,
  };
  const runtime = createRoomRuntime(context, settings);
  runtime.render({ elapsed: 0, delta: 0 });

  if (!scene || !camera) throw new Error('Glass optics runtime did not render a scene.');
  const objects: Object3D[] = [];
  scene.traverse((object) => objects.push(object));
  return {
    camera,
    environmentTarget,
    fromScene,
    objects,
    pmremDispose,
    runtime,
    scene,
  };
}

function findBeamBatches(objects: Object3D[]) {
  const batches = objects.filter(
    (object): object is InstancedMesh<CylinderGeometry, MeshBasicMaterial> =>
      object instanceof InstancedMesh
      && (object.name === 'glass-optics-beam-core'
        || object.name === 'glass-optics-beam-glow'),
  );
  expect(batches).toHaveLength(2);
  return batches;
}

function readInstanceScale(mesh: InstancedMesh, index: number) {
  const matrix = new Matrix4();
  const position = new Vector3();
  const scale = new Vector3();
  matrix.fromArray(mesh.instanceMatrix.array, index * 16);
  matrix.decompose(position, mesh.quaternion.clone(), scale);
  return scale;
}

function readInstanceMatrix(mesh: InstancedMesh, index: number) {
  return Array.from(mesh.instanceMatrix.array.slice(index * 16, index * 16 + 16));
}

function readInstanceCenterline(mesh: InstancedMesh, index: number) {
  const matrix = readInstanceMatrix(mesh, index);
  return [
    matrix[4],
    matrix[5],
    matrix[6],
    matrix[12],
    matrix[13],
    matrix[14],
  ];
}

function readInstanceColor(mesh: InstancedMesh, index: number) {
  const color = new Color();
  mesh.getColorAt(index, color);
  return color.toArray();
}

function isInstanceZeroScaled(mesh: InstancedMesh, index: number) {
  const offset = index * 16;
  return [0, 1, 2, 4, 5, 6, 8, 9, 10]
    .every((element) => mesh.instanceMatrix.array[offset + element] === 0);
}

function createCausticsProfile(beamSpread: number, ior: number) {
  const output: CausticsProfile = {
    focus: 0,
    intensityScale: 0,
    hotspotRadius: 0,
    planeScale: 0,
    cuspLength: 0,
    cuspWidth: 0,
    ringRadius: 0,
    ringWidth: 0,
  };
  return calculateCausticsProfileInto(beamSpread, ior, output);
}

function findCaustics(objects: Object3D[]) {
  const caustics = objects.find((object): object is Mesh<PlaneGeometry, ShaderMaterial> =>
    object instanceof Mesh
    && object.name === 'glass-optics-caustics'
    && object.material instanceof ShaderMaterial);
  expect(caustics).toBeDefined();
  return caustics!;
}

describe('glass optics runtime contracts', () => {
  it('uses one bounded caustics intensity for creation and updates', () => {
    const { objects, runtime } = createRuntimeHarness();
    const caustics = findCaustics(objects);
    const marker = objects.find((object) =>
      object.name === 'glass-optics-floor-marker') as Mesh<SphereGeometry, MeshBasicMaterial>;
    const markerColor = marker.material.color.getHex();
    const pointLight = objects.find((object): object is PointLight =>
      object instanceof PointLight);
    const defaultProfile = createCausticsProfile(
      glassOpticsDefaults.beamSpread,
      glassOpticsDefaults.ior,
    );

    expect(caustics.material.uniforms.uIntensity.value).toBe(
      causticsIntensity(true, defaultProfile.intensityScale),
    );
    expect(CAUSTICS_ENABLED_INTENSITY * CAUSTICS_ALPHA_BUDGET)
      .toBeLessThanOrEqual(0.9);
    expect(caustics.material.blending).toBe(AdditiveBlending);
    expect(caustics.material.premultipliedAlpha).toBe(false);
    expect(caustics.material.depthWrite).toBe(false);
    expect(caustics.renderOrder).toBe(5);
    expect(marker.material.depthTest).toBe(true);
    expect(marker.material.blending).toBe(AdditiveBlending);
    expect(marker.material.opacity).toBe(0.12);
    expect(pointLight?.intensity).toBe(1.5);

    runtime.updateSettings({ ...glassOpticsDefaults, showCaustics: false });
    expect(caustics.material.uniforms.uIntensity.value).toBe(
      causticsIntensity(false, defaultProfile.intensityScale),
    );
    expect(caustics.material.uniforms.uIntensity.value).toBe(0);
    expect(caustics.visible).toBe(false);
    expect(marker.visible).toBe(true);
    expect(marker.material.color.getHex()).toBe(markerColor);

    runtime.updateSettings({ ...glassOpticsDefaults, showCaustics: true });
    expect(caustics.material.uniforms.uIntensity.value).toBe(
      causticsIntensity(true, defaultProfile.intensityScale),
    );
    expect(caustics.visible).toBe(true);
    expect(marker.material.color.getHex()).toBe(markerColor);

    const profile = createCausticsProfile(0.9, 2.4);
    runtime.updateSettings({
      ...glassOpticsDefaults,
      beamSpread: 0.9,
      ior: 2.4,
    });
    expect(caustics.material.uniforms.uFocus.value).toBe(profile.focus);
    expect(caustics.material.uniforms.uFocusRadius.value).toBe(profile.hotspotRadius);
    expect(caustics.material.uniforms.uCuspLength.value).toBe(profile.cuspLength);
    expect(caustics.material.uniforms.uCuspWidth.value).toBe(profile.cuspWidth);
    expect(caustics.material.uniforms.uRingRadius.value).toBe(profile.ringRadius);
    expect(caustics.material.uniforms.uRingWidth.value).toBe(profile.ringWidth);
    expect(caustics.material.uniforms.uIntensity.value).toBe(
      causticsIntensity(true, profile.intensityScale),
    );
    expect(caustics.scale.x).toBe(profile.planeScale);
    runtime.dispose();
  });

  it('keeps caustics profiles finite and monotonic across declared domains', () => {
    const beamSpreads = [
      glassOpticsDomains.beamSpread.min,
      glassOpticsDefaults.beamSpread,
      glassOpticsDomains.beamSpread.max,
    ];
    const iorValues = [
      glassOpticsDomains.ior.min,
      glassOpticsDefaults.ior,
      glassOpticsDomains.ior.max,
    ];
    const profiles = beamSpreads.flatMap((beamSpread) =>
      iorValues.map((ior) => createCausticsProfile(beamSpread, ior)));

    for (const profile of profiles) {
      expect(Object.values(profile).every(Number.isFinite)).toBe(true);
      expect(profile.focus).toBeGreaterThanOrEqual(0);
      expect(profile.focus).toBeLessThanOrEqual(1);
      expect(profile.intensityScale).toBeGreaterThan(0);
      expect(profile.intensityScale).toBeLessThanOrEqual(1);
      expect(profile.hotspotRadius).toBeGreaterThan(0);
      expect(profile.hotspotRadius * profile.planeScale).toBeGreaterThan(0);
    }

    for (const ior of iorValues) {
      const spreads = beamSpreads.map((beamSpread) =>
        createCausticsProfile(beamSpread, ior));
      expect(spreads[1]!.hotspotRadius).toBeGreaterThan(spreads[0]!.hotspotRadius);
      expect(spreads[2]!.hotspotRadius).toBeGreaterThan(spreads[1]!.hotspotRadius);
      expect(spreads[1]!.hotspotRadius * spreads[1]!.planeScale)
        .toBeGreaterThan(spreads[0]!.hotspotRadius * spreads[0]!.planeScale);
      expect(spreads[2]!.hotspotRadius * spreads[2]!.planeScale)
        .toBeGreaterThan(spreads[1]!.hotspotRadius * spreads[1]!.planeScale);
      expect(spreads[1]!.intensityScale).toBe(spreads[0]!.intensityScale);
      expect(spreads[2]!.intensityScale).toBeLessThan(spreads[1]!.intensityScale);
      const defaultHotspotEnergy = spreads[1]!.intensityScale
        * (spreads[1]!.hotspotRadius * spreads[1]!.planeScale) ** 2;
      const wideHotspotEnergy = spreads[2]!.intensityScale
        * (spreads[2]!.hotspotRadius * spreads[2]!.planeScale) ** 2;
      expect(wideHotspotEnergy).toBeCloseTo(defaultHotspotEnergy, 12);
    }
    for (const beamSpread of beamSpreads) {
      const iors = iorValues.map((ior) =>
        createCausticsProfile(beamSpread, ior));
      expect(iors[1]!.focus).toBeGreaterThan(iors[0]!.focus);
      expect(iors[2]!.focus).toBeGreaterThan(iors[1]!.focus);
      expect(iors[1]!.hotspotRadius).toBeLessThan(iors[0]!.hotspotRadius);
      expect(iors[2]!.hotspotRadius).toBeLessThan(iors[1]!.hotspotRadius);
      expect(iors[1]!.hotspotRadius * iors[1]!.planeScale)
        .toBeLessThan(iors[0]!.hotspotRadius * iors[0]!.planeScale);
      expect(iors[2]!.hotspotRadius * iors[2]!.planeScale)
        .toBeLessThan(iors[1]!.hotspotRadius * iors[1]!.planeScale);
    }
  });

  it('maps outgoing floor projection into plane-local direction', () => {
    const direction = new Vector2();

    expect(setCausticsDirectionFromOutgoing(
      new Vector3(3, -2, 4),
      direction,
    )).toBe('projected');
    expect(direction.x).toBeCloseTo(0.6);
    expect(direction.y).toBeCloseTo(-0.8);

    expect(setCausticsDirectionFromOutgoing(
      new Vector3(0, -1, 0),
      direction,
    )).toBe('canonical');
    expect(direction.toArray()).toEqual([1, 0]);
  });

  it('drives the caustics direction from the traced outgoing ray', () => {
    const { objects, runtime } = createRuntimeHarness();
    const material = findCaustics(objects).material;
    const source = new Vector3(
      glassOpticsDefaults.lightX,
      glassOpticsDefaults.lightY,
      glassOpticsDefaults.lightZ,
    );
    const aimDirection = new Vector3();
    calculateGlassAimDirectionInto(
      source,
      aimDirection,
      new Vector3(),
      new Vector3(),
      new Vector3(),
    );
    const lightPath = createGlassLightPathResult();
    expect(traceGlassRayInto(
      source,
      aimDirection,
      glassOpticsDefaults.ior,
      lightPath,
      createGlassLightPathWorkspace(),
    )).toBe('complete');
    const expectedDirection = new Vector2();
    setCausticsDirectionFromOutgoing(
      lightPath.outgoingDirection,
      expectedDirection,
    );
    const runtimeDirection = material.uniforms.uDirection.value as Vector2;
    expect(runtimeDirection.x).toBeCloseTo(expectedDirection.x);
    expect(runtimeDirection.y).toBeCloseTo(expectedDirection.y);
    runtime.dispose();
  });

  it('keeps the caustics center and floor marker on the same physical hit', () => {
    const { objects, runtime } = createRuntimeHarness();
    const caustics = findCaustics(objects);
    const marker = objects.find((object) =>
      object.name === 'glass-optics-floor-marker') as Mesh;

    const expectSharedFloorHit = () => {
      expect(caustics.visible).toBe(true);
      expect(marker.visible).toBe(true);
      expect(caustics.position.x).toBeCloseTo(marker.position.x);
      expect(caustics.position.z).toBeCloseTo(marker.position.z);
    };
    expectSharedFloorHit();

    runtime.updateSettings({
      ...glassOpticsDefaults,
      lightX: glassOpticsDefaults.lightX + 0.6,
    });
    expectSharedFloorHit();
    runtime.dispose();
  });

  it('drives markers, reflected intensity, and caustics exclusively from the G path', () => {
    const { objects, runtime } = createRuntimeHarness();
    const batches = findBeamBatches(objects);
    const source = new Vector3(
      glassOpticsDefaults.lightX,
      glassOpticsDefaults.lightY,
      glassOpticsDefaults.lightZ,
    );
    const aimDirection = new Vector3();
    calculateGlassAimDirectionInto(
      source,
      aimDirection,
      new Vector3(),
      new Vector3(),
      new Vector3(),
    );
    const greenPath = createGlassLightPathResult();
    traceGlassRayInto(
      source,
      aimDirection,
      glassOpticsDefaults.ior,
      greenPath,
      createGlassLightPathWorkspace(),
    );
    const redPath = createGlassLightPathResult();
    traceGlassRayInto(
      source,
      aimDirection,
      glassOpticsDefaults.ior - glassSpectralIorOffset(
        glassOpticsDefaults.ior,
        glassOpticsDefaults.dispersion,
      ),
      redPath,
      createGlassLightPathWorkspace(),
    );
    expect(redPath.reflectance).not.toBe(greenPath.reflectance);

    const entryMarker = objects.find((object) =>
      object.name === 'glass-optics-entry-marker')!;
    const exitMarker = objects.find((object) =>
      object.name === 'glass-optics-exit-marker')!;
    const floorMarker = objects.find((object) =>
      object.name === 'glass-optics-floor-marker')!;
    const caustics = findCaustics(objects);
    expect(entryMarker.position.toArray()).toEqual(greenPath.entryPoint.toArray());
    expect(exitMarker.position.toArray()).toEqual(greenPath.exitPoint.toArray());
    expect(floorMarker.position.toArray()).toEqual(greenPath.floorHit.toArray());
    expect([caustics.position.x, caustics.position.z])
      .toEqual([greenPath.floorHit.x, greenPath.floorHit.z]);

    const expectedReflectionColor = new Color(0xffc067)
      .multiplyScalar(greenPath.reflectance * 8)
      .toArray();
    for (const batch of batches) {
      readInstanceColor(batch, 1).forEach((channel, index) => {
        expect(channel).toBeCloseTo(expectedReflectionColor[index]!, 7);
      });
    }
    runtime.dispose();
  });

  it('stops caustics time when motion scale is zero', () => {
    const { objects, runtime } = createRuntimeHarness();
    const material = findCaustics(objects).material;

    runtime.setMotionScale(0);
    runtime.render({ elapsed: 4, delta: 4 });
    runtime.render({ elapsed: 12, delta: 8 });
    expect(material.uniforms.uTime.value).toBe(0);
    runtime.dispose();
  });

  it('uses the bounded focus-cusp shader without the retired noise formula', () => {
    expect(causticsFragmentShader).toContain('boundedUnion');
    expect(causticsFragmentShader).toContain('uniform float uFocus;');
    expect(causticsFragmentShader).toContain('uniform float uFocusRadius;');
    expect(causticsFragmentShader).toContain('uniform vec2 uDirection;');
    expect(causticsFragmentShader).toContain(
      `gl_FragColor = vec4(color, shape * ${CAUSTICS_ALPHA_BUDGET.toFixed(2)} * uIntensity);`,
    );
    expect(causticsFragmentShader).toContain('#include <colorspace_fragment>');
    expect(causticsFragmentShader).not.toMatch(/\brings\b|\bspokes\b|\bstreaks\b/);
    expect(causticsFragmentShader).not.toContain('color * shape');
    expect(causticsFragmentShader).not.toContain('color * uIntensity');
  });

  it('builds a transmissive physical material from room settings', () => {
    const material = createGlassMaterial(glassOpticsDefaults);

    expect(material).toBeInstanceOf(MeshPhysicalMaterial);
    expect(material.transmission).toBe(1);
    expect(material.ior).toBe(glassOpticsDefaults.ior);
    expect(material.dispersion).toBe(glassOpticsDefaults.dispersion);
    expect(material.thickness).toBe(glassOpticsDefaults.thickness);
    expect(material.roughness).toBe(glassOpticsDefaults.roughness);
    expect(material.transparent).toBe(false);
    expect(material.opacity).toBe(1);
    expect(material.attenuationColor.getHex()).toBe(0xffffff);
    expect(material.clearcoat).toBe(1);
    expect(material.attenuationDistance).toBeGreaterThan(0);
    expect(material.envMapIntensity).toBe(
      glassEnvironmentIntensity(glassOpticsDefaults.thickness),
    );

    material.dispose();
  });

  it('bakes a three-strip dark-field environment exactly once', () => {
    const { environmentTarget, fromScene, runtime } = createRuntimeHarness();

    expect(fromScene).toHaveBeenCalledTimes(1);
    const [environmentScene, sigma, near, far, options] = fromScene.mock.calls[0]!;
    expect(environmentScene).toBeInstanceOf(Scene);
    expect(environmentScene.name).toBe('glass-optics-darkfield-environment');
    expect(sigma).toBe(0.025);
    expect(near).toBe(0.1);
    expect(far).toBe(20);
    expect(options).toEqual({ size: 128 });
    const strips = environmentScene.children.filter((object: Object3D) =>
      object.name.startsWith('glass-optics-env-strip-'));
    expect(strips.map((strip: Object3D) => strip.name)).toEqual([
      'glass-optics-env-strip-cool',
      'glass-optics-env-strip-warm',
      'glass-optics-env-strip-top',
    ]);
    expect(strips.every((strip: Object3D) =>
      strip instanceof Mesh && strip.material instanceof MeshLambertMaterial)).toBe(true);

    runtime.dispose();
    expect(environmentTarget.dispose).toHaveBeenCalledTimes(1);
  });

  it('builds one sparse opaque dispersion reference over a subdued reflective floor', () => {
    const { objects, runtime } = createRuntimeHarness();
    const reference = objects.find((object) =>
      object.name === 'glass-optics-dispersion-reference');
    const floor = objects.find((object) =>
      object.name === 'glass-optics-reflective-floor');
    const grid = objects.find((object) =>
      object.name === 'glass-optics-subdued-grid');

    expect(reference).toBeInstanceOf(Mesh);
    expect((reference as Mesh).material).toBeInstanceOf(ShaderMaterial);
    const referenceMaterial = (reference as Mesh).material as ShaderMaterial;
    expect(referenceMaterial.transparent).toBe(false);
    expect(referenceMaterial.depthWrite).toBe(false);
    expect(referenceMaterial.fragmentShader).toContain('vUv.x * 12.0');
    expect(referenceMaterial.fragmentShader).toContain('vec3 neutral');
    expect(objects.some((object) =>
      object.name === 'glass-optics-radial-background')).toBe(false);

    expect(floor).toBeInstanceOf(Mesh);
    expect((floor as Mesh).material).toBeInstanceOf(MeshStandardMaterial);
    const floorMaterial = (floor as Mesh).material as MeshStandardMaterial;
    expect(floorMaterial.metalness).toBeGreaterThan(0.5);
    expect(floorMaterial.roughness).toBeLessThan(0.25);
    expect(floorMaterial.envMap).not.toBeNull();

    expect(grid).toBeInstanceOf(GridHelper);
    const gridMaterial = (grid as GridHelper).material;
    const gridMaterials: Array<{ opacity: number }> = Array.isArray(gridMaterial)
      ? gridMaterial
      : [gridMaterial];
    expect(gridMaterials.every((material) => material.opacity < 0.1)).toBe(true);
    runtime.dispose();
  });

  it('uses one glass environment-intensity function across the thickness range', () => {
    const { objects, runtime } = createRuntimeHarness();
    const material = objects
      .filter((object): object is Mesh => object instanceof Mesh)
      .map((mesh) => mesh.material)
      .find((candidate): candidate is MeshPhysicalMaterial =>
        candidate instanceof MeshPhysicalMaterial);
    expect(material).toBeDefined();

    for (const thickness of [0.2, 2.4]) {
      runtime.updateSettings({ ...glassOpticsDefaults, thickness });
      expect(material?.envMapIntensity).toBe(glassEnvironmentIntensity(thickness));
    }
    runtime.dispose();
  });

  it('keeps shell opacity on one IOR-only curve across unrelated updates', () => {
    const { objects, runtime } = createRuntimeHarness();
    const shell = objects.find((object): object is Mesh<IcosahedronGeometry, MeshBasicMaterial> =>
      object instanceof Mesh
      && object.name === 'glass-optics-glass-shell'
      && object.material instanceof MeshBasicMaterial);
    expect(shell).toBeDefined();
    expect(shell?.material.opacity).toBe(glassShellOpacity(glassOpticsDefaults.ior));

    runtime.updateSettings({
      ...glassOpticsDefaults,
      dispersion: 0.82,
      roughness: 0.31,
      thickness: 2.1,
    });
    expect(shell?.material.opacity).toBe(glassShellOpacity(glassOpticsDefaults.ior));

    runtime.updateSettings({
      ...glassOpticsDefaults,
      ior: 2.4,
    });
    expect(shell?.material.opacity).toBe(glassShellOpacity(2.4));
    runtime.dispose();
  });

  it('updates the physical material dispersion directly from settings', () => {
    const { objects, runtime } = createRuntimeHarness();
    const material = objects
      .filter((object): object is Mesh => object instanceof Mesh)
      .map((mesh) => mesh.material)
      .find((candidate): candidate is MeshPhysicalMaterial =>
        candidate instanceof MeshPhysicalMaterial)!;

    expect(material.dispersion).toBe(glassOpticsDefaults.dispersion);
    runtime.updateSettings({
      ...glassOpticsDefaults,
      dispersion: 0.82,
    });
    expect(material.dispersion).toBe(0.82);
    runtime.dispose();
  });

  it('holds every animated stage element at zero phase when auto rotate is off', () => {
    const { objects, runtime } = createRuntimeHarness({
      ...glassOpticsDefaults,
      autoRotate: false,
    });
    const root = objects.find((object) => object.name === 'glass-optics-stage-root') as Group;
    const glassGroup = objects.find((object) =>
      object.name === 'glass-optics-glass-group') as Group;
    const animatedMaterials = objects
      .filter((object): object is Mesh => object instanceof Mesh)
      .map((mesh) => mesh.material)
      .filter((material): material is ShaderMaterial =>
        material instanceof ShaderMaterial && 'uTime' in material.uniforms);

    runtime.render({ elapsed: 5, delta: 5 });
    runtime.render({ elapsed: 15, delta: 10 });
    expect(root.rotation.y).toBe(0);
    expect(glassGroup.rotation.toArray()).toEqual([0, 0, 0, 'XYZ']);
    expect(animatedMaterials).toHaveLength(1);
    expect(animatedMaterials.every((material) => material.uniforms.uTime.value === 0)).toBe(true);
    runtime.dispose();
  });

  it('animates when enabled and resets to the canonical pose when disabled', () => {
    const { objects, runtime } = createRuntimeHarness();
    const root = objects.find((object) => object.name === 'glass-optics-stage-root') as Group;
    const glassGroup = objects.find((object) =>
      object.name === 'glass-optics-glass-group') as Group;

    runtime.render({ elapsed: 1, delta: 1 });
    expect(root.rotation.y).not.toBe(0);
    expect(glassGroup.rotation.y).not.toBe(0);

    runtime.updateSettings({ ...glassOpticsDefaults, autoRotate: false });
    expect(root.rotation.y).toBe(0);
    expect(glassGroup.rotation.toArray()).toEqual([0, 0, 0, 'XYZ']);

    runtime.render({ elapsed: 2, delta: 1 });
    expect(root.rotation.y).toBe(0);
    expect(glassGroup.rotation.toArray()).toEqual([0, 0, 0, 'XYZ']);
    runtime.dispose();
  });

  it('keeps the revised light domain, defaults, and presets legal', () => {
    expect(glassOpticsDomains.lightY).toEqual({ min: 2.61, max: 6, step: 0.01 });
    expectPresetWithinDomains(glassOpticsDefaults);
    expectPresetWithinDomains(glassOpticsFocusPreset);
    expectPresetWithinDomains(glassOpticsCrystalPreset);
  });

  it('uses exactly two permanent eight-slot spectral beam batches', () => {
    const { objects, runtime } = createRuntimeHarness();
    const batches = findBeamBatches(objects);

    for (const batch of batches) {
      expect(batch.count).toBe(8);
      expect(batch.geometry).toBeInstanceOf(CylinderGeometry);
      expect((batch.geometry as CylinderGeometry).parameters.radialSegments).toBe(3);
      expect((batch.geometry as CylinderGeometry).parameters.heightSegments).toBe(1);
      expect(batch.material).toBeInstanceOf(MeshBasicMaterial);
      expect(batch.material.vertexColors).toBe(false);
      expect(batch.frustumCulled).toBe(false);
      expect(batch.visible).toBe(true);
      expect(batch.instanceColor).not.toBeNull();
      for (let index = 0; index < batch.count; index += 1) {
        expect(readInstanceScale(batch, index).y).toBeGreaterThan(0);
      }
      expect(readInstanceColor(batch, 0)).toEqual([1, 1, 1]);
      expect(readInstanceColor(batch, 2)).toEqual([1, 0, 0]);
      expect(readInstanceColor(batch, 3)).toEqual([0, 1, 0]);
      expect(readInstanceColor(batch, 4)).toEqual([0, 0, 1]);
      expect(readInstanceColor(batch, 5)).toEqual([1, 0, 0]);
      expect(readInstanceColor(batch, 6)).toEqual([0, 1, 0]);
      expect(readInstanceColor(batch, 7)).toEqual([0, 0, 1]);
      expect(readInstanceScale(batch, 2).z)
        .toBeCloseTo(readInstanceScale(batch, 2).x * 0.35, 7);
    }

    runtime.dispose();
  });

  it('uses the exact three r184 spectral IOR offset without beam-spread coupling', () => {
    expect(glassSpectralIorOffset(1.48, 0.45))
      .toBe((1.48 - 1) * 0.025 * 0.45);
    expect(glassSpectralIorOffset(2.4, 0.55))
      .toBe((2.4 - 1) * 0.025 * 0.55);
    expect(glassSpectralIorOffset(1, 1)).toBe(0);
    expect(glassSpectralIorOffset(2.4, 0)).toBe(0);
  });

  it.each([
    { ior: glassOpticsDefaults.ior, dispersion: 0 },
    { ior: 1, dispersion: glassOpticsDefaults.dispersion },
  ])('collapses all RGB path matrices exactly at ior=$ior dispersion=$dispersion', ({
    ior,
    dispersion,
  }) => {
    const { objects, runtime } = createRuntimeHarness({
      ...glassOpticsDefaults,
      ior,
      dispersion,
    });

    for (const batch of findBeamBatches(objects)) {
      expect(readInstanceMatrix(batch, 2)).toEqual(readInstanceMatrix(batch, 3));
      expect(readInstanceMatrix(batch, 4)).toEqual(readInstanceMatrix(batch, 3));
      expect(readInstanceMatrix(batch, 5)).toEqual(readInstanceMatrix(batch, 6));
      expect(readInstanceMatrix(batch, 7)).toEqual(readInstanceMatrix(batch, 6));
    }
    runtime.dispose();
  });

  it('separates adopted RGB paths while keeping beamSpread out of their centerlines', () => {
    const narrow = createRuntimeHarness({
      ...glassOpticsDefaults,
      beamSpread: glassOpticsDomains.beamSpread.min,
    });
    const wide = createRuntimeHarness({
      ...glassOpticsDefaults,
      beamSpread: glassOpticsDomains.beamSpread.max,
    });
    const narrowBatches = findBeamBatches(narrow.objects);
    const wideBatches = findBeamBatches(wide.objects);

    for (let batchIndex = 0; batchIndex < narrowBatches.length; batchIndex += 1) {
      const narrowBatch = narrowBatches[batchIndex]!;
      const wideBatch = wideBatches[batchIndex]!;
      expect(readInstanceMatrix(narrowBatch, 2)).not.toEqual(readInstanceMatrix(narrowBatch, 3));
      expect(readInstanceMatrix(narrowBatch, 4)).not.toEqual(readInstanceMatrix(narrowBatch, 3));
      expect(readInstanceMatrix(narrowBatch, 5)).not.toEqual(readInstanceMatrix(narrowBatch, 6));
      expect(readInstanceMatrix(narrowBatch, 7)).not.toEqual(readInstanceMatrix(narrowBatch, 6));
      for (let index = 2; index < 8; index += 1) {
        expect(readInstanceCenterline(wideBatch, index))
          .toEqual(readInstanceCenterline(narrowBatch, index));
      }
    }

    narrow.runtime.dispose();
    wide.runtime.dispose();
  });

  it('keeps dynamic draw topology independent of slider-driven positions', () => {
    const { objects, runtime } = createRuntimeHarness();

    for (const name of [
      'glass-optics-light-source',
      'glass-optics-light-source-halo',
      'glass-optics-entry-marker',
      'glass-optics-exit-marker',
      'glass-optics-floor-marker',
      'glass-optics-caustics',
    ]) {
      const object = objects.find((candidate) => candidate.name === name);
      expect(object, `${name} should exist`).toBeDefined();
      expect(object?.frustumCulled, `${name} should not be frustum culled`).toBe(false);
    }

    runtime.dispose();
  });

  it('updates path buffers only for path-affecting settings and never replaces geometry', () => {
    const { objects, runtime } = createRuntimeHarness();
    const batches = findBeamBatches(objects);
    const geometryIds = batches.map((batch) => batch.geometry.uuid);
    const initialVersions = batches.map((batch) => batch.instanceMatrix.version);

    runtime.updateSettings({
      ...glassOpticsDefaults,
      roughness: glassOpticsDefaults.roughness + 0.01,
      thickness: glassOpticsDefaults.thickness + 0.01,
      showCaustics: false,
    });
    expect(batches.map((batch) => batch.instanceMatrix.version)).toEqual(initialVersions);

    runtime.updateSettings({
      ...glassOpticsDefaults,
      lightX: glassOpticsDefaults.lightX + 0.01,
    });
    expect(batches.map((batch) => batch.instanceMatrix.version)).toEqual(
      initialVersions.map((version) => version + 1),
    );
    expect(batches.map((batch) => batch.geometry.uuid)).toEqual(geometryIds);

    runtime.updateSettings({
      ...glassOpticsDefaults,
      lightX: glassOpticsDefaults.lightX + 0.01,
      dispersion: glassOpticsDefaults.dispersion + 0.01,
    });
    expect(batches.map((batch) => batch.instanceMatrix.version)).toEqual(
      initialVersions.map((version) => version + 2),
    );
    expect(batches.map((batch) => batch.geometry.uuid)).toEqual(geometryIds);

    runtime.dispose();
  });

  it('zero-scales invalid paths without changing batch topology', () => {
    const { objects, runtime } = createRuntimeHarness();
    const batches = findBeamBatches(objects);
    const invalidSettings: GlassOpticsSettings = {
      ...glassOpticsDefaults,
      lightX: 0,
      lightY: 1.25,
      lightZ: 0,
    };

    runtime.updateSettings(invalidSettings);

    for (const batch of batches) {
      expect(batch.count).toBe(8);
      expect(batch.visible).toBe(true);
      for (let index = 0; index < batch.count; index += 1) {
        expect(isInstanceZeroScaled(batch, index)).toBe(true);
      }
    }
    for (const name of [
      'glass-optics-entry-marker',
      'glass-optics-exit-marker',
      'glass-optics-floor-marker',
      'glass-optics-caustics',
    ]) {
      expect(objects.find((object) => object.name === name)?.visible).toBe(false);
    }

    runtime.dispose();
  });

  it('keeps beam geometry stable through a continuous light drag', () => {
    const { objects, runtime } = createRuntimeHarness();
    const batches = findBeamBatches(objects);
    const geometries = batches.map((batch) => batch.geometry);

    for (let index = 0; index < 300; index += 1) {
      runtime.updateSettings({
        ...glassOpticsDefaults,
        lightX: -1.5 + index * 0.01,
      });
    }

    expect(batches.map((batch) => batch.geometry)).toEqual(geometries);
    expect(batches.map((batch) => batch.instanceMatrix.version)).toEqual([301, 301]);
    runtime.dispose();
  });

  it('reuses the existing marker meshes for entry, exit, and floor semantics', () => {
    const { objects, runtime } = createRuntimeHarness();
    const markers = [
      'glass-optics-entry-marker',
      'glass-optics-exit-marker',
      'glass-optics-floor-marker',
    ].map((name) => objects.find((object) => object.name === name));

    expect(markers.every((marker) => marker instanceof Mesh && marker.visible)).toBe(true);
    runtime.dispose();
  });
});
