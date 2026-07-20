import { describe, expect, it, vi } from 'vitest';
import {
  Camera,
  CylinderGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Scene,
  Texture,
  Vector3,
  type Object3D,
} from 'three';
import type { GlassOpticsSettings, RoomRuntimeContext } from '../types';
import { createGlassMaterial, createRoomRuntime } from './runtime';
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
      fromScene: vi.fn(() => ({ texture: environmentTexture })),
      dispose: vi.fn(),
    }) as never),
    motionScale: 1,
  };
  const runtime = createRoomRuntime(context, settings);
  runtime.render({ elapsed: 0, delta: 0 });

  if (!scene || !camera) throw new Error('Glass optics runtime did not render a scene.');
  const objects: Object3D[] = [];
  scene.traverse((object) => objects.push(object));
  return { camera, objects, runtime, scene };
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

    material.dispose();
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
