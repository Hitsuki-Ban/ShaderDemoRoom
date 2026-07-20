import { describe, expect, it, vi } from 'vitest';
import {
  Camera,
  CylinderGeometry,
  DataTexture,
  Group,
  GridHelper,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Texture,
  Vector3,
  type Object3D,
} from 'three';
import type { GlassOpticsSettings, RoomRuntimeContext } from '../types';
import {
  createGlassMaterial,
  createRoomRuntime,
  glassEnvironmentIntensity,
} from './runtime';
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

function isInstanceZeroScaled(mesh: InstancedMesh, index: number) {
  const offset = index * 16;
  return [0, 1, 2, 4, 5, 6, 8, 9, 10]
    .every((element) => mesh.instanceMatrix.array[offset + element] === 0);
}

describe('glass optics runtime contracts', () => {
  it('builds a transmissive physical material from room settings', () => {
    const material = createGlassMaterial(glassOpticsDefaults);

    expect(material).toBeInstanceOf(MeshPhysicalMaterial);
    expect(material.transmission).toBe(1);
    expect(material.ior).toBe(glassOpticsDefaults.ior);
    expect(material.thickness).toBe(glassOpticsDefaults.thickness);
    expect(material.roughness).toBe(glassOpticsDefaults.roughness);
    expect(material.opacity).toBe(1);
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

  it('builds one transparent radial backdrop over a subdued reflective floor', () => {
    const { objects, runtime } = createRuntimeHarness();
    const background = objects.find((object) =>
      object.name === 'glass-optics-radial-background');
    const floor = objects.find((object) =>
      object.name === 'glass-optics-reflective-floor');
    const grid = objects.find((object) =>
      object.name === 'glass-optics-subdued-grid');

    expect(background).toBeInstanceOf(Mesh);
    expect((background as Mesh).material).toBeInstanceOf(MeshBasicMaterial);
    const backgroundMaterial = (background as Mesh).material as MeshBasicMaterial;
    expect(backgroundMaterial.transparent).toBe(true);
    expect(backgroundMaterial.opacity).toBe(1);
    expect(backgroundMaterial.depthWrite).toBe(false);
    expect(backgroundMaterial.depthTest).toBe(true);
    expect(backgroundMaterial.map).toBeInstanceOf(DataTexture);

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
    expect(animatedMaterials).toHaveLength(2);
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

  it('uses exactly two permanent four-slot instanced beam batches', () => {
    const { objects, runtime } = createRuntimeHarness();
    const batches = findBeamBatches(objects);

    for (const batch of batches) {
      expect(batch.count).toBe(4);
      expect(batch.geometry).toBeInstanceOf(CylinderGeometry);
      expect(batch.material).toBeInstanceOf(MeshBasicMaterial);
      expect(batch.material.vertexColors).toBe(false);
      expect(batch.frustumCulled).toBe(false);
      expect(batch.visible).toBe(true);
      expect(batch.instanceColor).not.toBeNull();
      for (let index = 0; index < batch.count; index += 1) {
        expect(readInstanceScale(batch, index).y).toBeGreaterThan(0);
      }
    }

    runtime.dispose();
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
      expect(batch.count).toBe(4);
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
