import { describe, expect, it, vi } from 'vitest';
import {
  Color,
  Camera,
  InstancedMesh,
  LineSegments,
  Matrix4,
  Mesh,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  type Object3D,
} from 'three';
import type { RoomRuntimeContext, VoxelWaterSettings } from '../types';
import fragmentShader from './water.frag.glsl?raw';
import { createRoomRuntime, WEATHER_LOOKS } from './runtime';
import { voxelWaterDefaults } from './state';
import vertexShader from './water.vert.glsl?raw';

function createRuntimeHarness(settings: VoxelWaterSettings = voxelWaterDefaults) {
  let scene: Scene | undefined;
  let camera: PerspectiveCamera | undefined;
  const renderer = {
    render(nextScene: Object3D, nextCamera: Camera) {
      if (!(nextScene instanceof Scene) || !(nextCamera instanceof PerspectiveCamera)) {
        throw new Error('Voxel water runtime rendered an unexpected scene or camera type.');
      }
      scene = nextScene;
      camera = nextCamera;
    },
  };
  const context: RoomRuntimeContext = {
    canvas: document.createElement('canvas'),
    renderer,
    createPmremGenerator: vi.fn(() => null as never),
    motionScale: 1,
  };
  const runtime = createRoomRuntime(context, { ...settings });
  runtime.render({ elapsed: 0, delta: 0 });

  if (!scene || !camera) {
    throw new Error('Voxel water runtime did not render a scene.');
  }

  const objects: Object3D[] = [];
  scene.traverse((object) => objects.push(object));

  return { camera, objects, runtime, scene };
}

function findObject<TObject extends Object3D>(
  objects: Object3D[],
  guard: (object: Object3D) => object is TObject,
) {
  const object = objects.find(guard);
  if (!object) {
    throw new Error('Expected voxel water scene object was not found.');
  }
  return object;
}

function extractUniformNames(source: string) {
  return [...source.matchAll(/\buniform\s+\w+\s+(\w+)\s*;/g)].map((match) => match[1]);
}

describe('voxel water runtime contracts', () => {
  it('keeps weather looks structurally complete and ordered by storm intensity', () => {
    const looks = Object.values(WEATHER_LOOKS);
    const expectedKeys = Object.keys(WEATHER_LOOKS.clear).sort();

    for (const look of looks) {
      expect(Object.keys(look).sort()).toEqual(expectedKeys);
      expect(look.fogNear).toBeLessThan(look.fogFar);
      expect(look.fogDensity).toBeGreaterThanOrEqual(0);
      expect(look.rainCurtain).toBeGreaterThanOrEqual(0);
      expect(look.rainCurtain).toBeLessThanOrEqual(1);
      expect(look.columnOpacity).toBeGreaterThan(0);
      expect(look.columnOpacity).toBeLessThanOrEqual(1);
      expect(look.waterTint).toBeInstanceOf(Color);
      expect(look.fogColor).toBeInstanceOf(Color);
    }

    expect(WEATHER_LOOKS.clear.strength).toBeLessThan(WEATHER_LOOKS.rain.strength);
    expect(WEATHER_LOOKS.rain.strength).toBeLessThan(WEATHER_LOOKS.storm.strength);
  });

  it('binds every declared water shader uniform at runtime', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<never, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const declaredUniforms = new Set([
      ...extractUniformNames(vertexShader),
      ...extractUniformNames(fragmentShader),
    ]);

    expect(new Set(Object.keys(plane.material.uniforms))).toEqual(declaredUniforms);
    runtime.dispose();
  });

  it('enforces the transparent scene ordering and depth-write contract on real objects', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<never, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const columns = findObject(
      objects,
      (object): object is InstancedMesh => object.name === 'voxel-water-columns' && object instanceof InstancedMesh,
    );
    const spray = findObject(
      objects,
      (object): object is Points => object.name === 'voxel-water-spray' && object instanceof Points,
    );
    const rain = findObject(
      objects,
      (object): object is Points => object.name === 'voxel-water-rain' && object instanceof Points,
    );
    const grid = findObject(
      objects,
      (object): object is LineSegments => object.name === 'voxel-water-grid' && object instanceof LineSegments,
    );

    expect(plane.renderOrder).toBeLessThan(columns.renderOrder);
    expect(columns.renderOrder).toBeLessThan(spray.renderOrder);
    expect(spray.renderOrder).toBeLessThan(rain.renderOrder);
    expect(rain.renderOrder).toBeLessThan(grid.renderOrder);
    for (const object of [plane, columns, spray, rain, grid]) {
      const material = Array.isArray(object.material) ? object.material[0] : object.material;
      expect(material.transparent).toBe(true);
    }
    for (const object of [plane, spray, rain, grid]) {
      const material = Array.isArray(object.material) ? object.material[0] : object.material;
      expect(material.depthWrite).toBe(false);
    }

    runtime.dispose();
  });

  it('updates shader uniforms from room settings instead of implementation literals', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<never, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const nextSettings: VoxelWaterSettings = {
      ...voxelWaterDefaults,
      weather: 'storm',
      wind: 2.1,
      rain: 0.83,
      waveHeight: 1.2,
    };

    runtime.updateSettings(nextSettings);

    expect(plane.material.uniforms.uWind.value).toBe(nextSettings.wind);
    expect(plane.material.uniforms.uRain.value).toBe(nextSettings.rain);
    expect(plane.material.uniforms.uWaveHeight.value).toBe(nextSettings.waveHeight);
    expect(plane.material.uniforms.uStorm.value).toBe(WEATHER_LOOKS.storm.strength);
    runtime.dispose();
  });

  it('builds a seamless square instanced field and deterministic seeded rain layout', () => {
    const first = createRuntimeHarness();
    const second = createRuntimeHarness();
    const firstColumns = findObject(
      first.objects,
      (object): object is InstancedMesh => object.name === 'voxel-water-columns' && object instanceof InstancedMesh,
    );
    const secondColumns = findObject(
      second.objects,
      (object): object is InstancedMesh => object.name === 'voxel-water-columns' && object instanceof InstancedMesh,
    );
    const firstRain = findObject(
      first.objects,
      (object): object is Points => object.name === 'voxel-water-rain' && object instanceof Points,
    );
    const secondRain = findObject(
      second.objects,
      (object): object is Points => object.name === 'voxel-water-rain' && object instanceof Points,
    );

    expect(firstColumns.count).toBeGreaterThan(0);
    expect(Number.isInteger(Math.sqrt(firstColumns.count))).toBe(true);
    expect(secondColumns.count).toBe(firstColumns.count);
    const firstColumnMatrix = new Matrix4();
    const adjacentColumnMatrix = new Matrix4();
    const nextRowColumnMatrix = new Matrix4();
    firstColumns.getMatrixAt(0, firstColumnMatrix);
    firstColumns.getMatrixAt(1, adjacentColumnMatrix);
    firstColumns.getMatrixAt(Math.sqrt(firstColumns.count), nextRowColumnMatrix);
    const firstColumnPosition = new Vector3().setFromMatrixPosition(firstColumnMatrix);
    const adjacentColumnPosition = new Vector3().setFromMatrixPosition(adjacentColumnMatrix);
    const nextRowColumnPosition = new Vector3().setFromMatrixPosition(nextRowColumnMatrix);
    const gridAxisX = adjacentColumnPosition.clone().sub(firstColumnPosition);
    const gridAxisZ = nextRowColumnPosition.clone().sub(firstColumnPosition);
    gridAxisX.y = 0;
    gridAxisZ.y = 0;
    const columnAxisX = new Vector3().setFromMatrixColumn(firstColumnMatrix, 0).normalize();
    const columnAxisZ = new Vector3().setFromMatrixColumn(firstColumnMatrix, 2).normalize();
    const columnGeometry = firstColumns.geometry as typeof firstColumns.geometry & {
      parameters: { depth: number; width: number };
    };
    expect(Math.abs(columnAxisX.dot(gridAxisX.clone().normalize()))).toBeCloseTo(1, 6);
    expect(Math.abs(columnAxisZ.dot(gridAxisZ.clone().normalize()))).toBeCloseTo(1, 6);
    expect(gridAxisX.length() - columnGeometry.parameters.width).toBeLessThan(0.00001);
    expect(gridAxisZ.length() - columnGeometry.parameters.depth).toBeLessThan(0.00001);
    expect(firstRain.geometry.getAttribute('position').count).toBeGreaterThan(0);
    expect(secondRain.geometry.getAttribute('position').count)
      .toBe(firstRain.geometry.getAttribute('position').count);
    expect(firstRain.geometry.getAttribute('position').array)
      .toEqual(secondRain.geometry.getAttribute('position').array);

    first.runtime.dispose();
    second.runtime.dispose();
  });

  it('keeps camera resizing and clipping within a stable showroom range', () => {
    const { camera, runtime } = createRuntimeHarness();

    runtime.resize({ width: 1600, height: 900, pixelRatio: 1 });

    expect(camera.aspect).toBeCloseTo(1600 / 900);
    expect(camera.near).toBeGreaterThan(0);
    expect(camera.far / camera.near).toBeLessThan(300);
    expect(camera.position.y).toBeGreaterThan(0);
    runtime.dispose();
  });

});
