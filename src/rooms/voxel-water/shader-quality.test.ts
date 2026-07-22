import { describe, expect, it, vi } from 'vitest';
import {
  Color,
  Camera,
  BufferGeometry,
  DirectionalLight,
  InstancedMesh,
  LineSegments,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  StaticDrawUsage,
  Vector3,
  type Object3D,
} from 'three';
import type { RoomRuntimeContext, VoxelWaterSettings } from '../types';
import skyFragmentShader from './sky.frag.glsl?raw';
import {
  createRoomRuntime,
  voxelWaterFragmentShader,
  voxelWaterVertexShader,
  WEATHER_LOOKS,
} from './runtime';
import { voxelWaterDefaults } from './state';
import {
  ACTIVE_LANDMARK_CANDIDATE,
  landmarkCoversVoxelColumnWorldOcean,
  LANDMARK_INSTANCE_BUDGET,
} from './landmarkModel';
import {
  COLUMN_WAVE_PROGRAM_KEY,
  STORM_GRID_CELL_MULTIPLE,
  VOXEL_FIELD_OFFSET,
  VOXEL_FIELD_YAW,
  VOXEL_SPACING,
  WATER_GRID_CELL_MULTIPLE,
} from './waveModel';

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
      expect(look).not.toHaveProperty('columnOpacity');
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
      (object): object is Mesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const declaredUniforms = new Set([
      ...extractUniformNames(voxelWaterVertexShader),
      ...extractUniformNames(voxelWaterFragmentShader),
    ]);

    expect(new Set(Object.keys(plane.material.uniforms))).toEqual(declaredUniforms);
    runtime.dispose();
  });

  it('uses the generated surface model, world-space normals, and one voxel grid scale', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );

    expect(voxelWaterVertexShader).toContain('displaced.y = waveSurfaceY(normalizedWave);');
    expect(voxelWaterVertexShader).toContain('mat3(modelMatrix) * localWaterNormal');
    expect(voxelWaterFragmentShader).toContain('gridLine(voxelPosition, uWaterGridCellMultiple)');
    expect(voxelWaterFragmentShader).toContain('gridLine(voxelPosition, uStormGridCellMultiple)');
    expect(voxelWaterFragmentShader).not.toMatch(/\/\s*0\.3\b|0\.075\b|vUv\s*\*\s*28/);
    expect(plane.material.uniforms).toMatchObject({
      uVoxelSpacing: { value: VOXEL_SPACING },
      uWaterGridCellMultiple: { value: WATER_GRID_CELL_MULTIPLE },
      uStormGridCellMultiple: { value: STORM_GRID_CELL_MULTIPLE },
      uVoxelFieldYaw: { value: VOXEL_FIELD_YAW },
    });
    expect(plane.material.uniforms.uVoxelFieldOffset.value.toArray()).toEqual([
      VOXEL_FIELD_OFFSET.x,
      VOXEL_FIELD_OFFSET.z,
    ]);
    runtime.dispose();
  });

  it('keeps the four-value water roles, peak subsurface, and foam as separate stages', () => {
    const peakStage = voxelWaterFragmentShader.indexOf('float peakMask =');
    const valueFoamStage = voxelWaterFragmentShader.indexOf('float valueFoamRidge =');
    const nearSuppressionStage = voxelWaterFragmentShader.indexOf(
      'foamMask *= 1.0 - nearClearFoamSuppression;',
    );
    const weatherSuppressionStage = voxelWaterFragmentShader.indexOf(
      'foamMask *= 1.0 - foregroundStormWindow * 0.9;',
    );
    const foamStage = voxelWaterFragmentShader.lastIndexOf('color = mix(color, valueFoamColor');
    const fogStage = voxelWaterFragmentShader.indexOf('vec3 horizonWaterColor =');

    expect(voxelWaterFragmentShader).toContain('float valueBand = quantizeWave(toonColorRamp, 4.0);');
    expect(voxelWaterFragmentShader).toContain('float sunwardSlope =');
    expect(voxelWaterFragmentShader).toContain('* mix(1.0, 0.32, distanceConvergence);');
    expect(voxelWaterFragmentShader).toContain('* smoothstep(0.0, 0.35, uFoam);');
    expect(voxelWaterFragmentShader).toContain(
      'vec3 valueFoamColor = mix(foamColor, vec3(2.7, 2.9, 2.2), stormValuePhase);',
    );
    expect(peakStage).toBeGreaterThan(0);
    expect(valueFoamStage).toBeGreaterThan(peakStage);
    expect(nearSuppressionStage).toBeGreaterThan(valueFoamStage);
    expect(weatherSuppressionStage).toBeGreaterThan(nearSuppressionStage);
    expect(foamStage).toBeGreaterThan(weatherSuppressionStage);
    expect(foamStage).toBeGreaterThan(fogStage);
    expect(foamStage).toBeGreaterThan(peakStage);
  });

  it('renders one feathered three-dimensional sun disc from the shared direction', () => {
    expect(skyFragmentShader).toContain('dot(direction, normalize(uSunDirection))');
    expect(skyFragmentShader).toContain('smoothstep(0.032, 0.04, sunAngle)');
    expect(skyFragmentShader).not.toContain('uSunDirection.xz');
  });

  it('uses directional light to separate dark column sides across weather states', () => {
    expect(WEATHER_LOOKS.clear.ambientBase).toBeLessThan(0.7);
    expect(WEATHER_LOOKS.clear.sunBase).toBeGreaterThan(WEATHER_LOOKS.clear.ambientBase * 4);
    expect(WEATHER_LOOKS.clear.columnBrightness).toBeGreaterThan(WEATHER_LOOKS.rain.columnBrightness);
    expect(WEATHER_LOOKS.rain.columnBrightness).toBeGreaterThan(WEATHER_LOOKS.storm.columnBrightness);
  });

  it('separates opaque occluders from the ordered transparent water composition', () => {
    const { objects, runtime } = createRuntimeHarness();
    const sky = findObject(
      objects,
      (object): object is Mesh<never, ShaderMaterial> =>
        object instanceof Mesh
        && object.material instanceof ShaderMaterial
        && 'uWeatherSkyTint' in object.material.uniforms,
    );
    const plane = findObject(
      objects,
      (object): object is Mesh<never, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const columns = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, MeshStandardMaterial> =>
        object.name === 'voxel-water-columns'
        && object instanceof InstancedMesh
        && object.material instanceof MeshStandardMaterial,
    );
    const landmark = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, MeshBasicMaterial> =>
        object.name === 'voxel-water-landmark'
        && object instanceof InstancedMesh
        && object.material instanceof MeshBasicMaterial,
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

    expect(sky.renderOrder).toBe(0);
    expect(columns.renderOrder).toBe(1);
    expect(landmark.renderOrder).toBe(1);
    expect(plane.renderOrder).toBe(2);
    expect(plane.renderOrder).toBeLessThan(spray.renderOrder);
    expect(spray.renderOrder).toBeLessThan(rain.renderOrder);
    expect(rain.renderOrder).toBeLessThan(grid.renderOrder);

    expect(sky.material.transparent).toBe(false);
    expect(sky.material.depthTest).toBe(false);
    expect(sky.material.depthWrite).toBe(false);
    expect(columns.material.transparent).toBe(false);
    expect(columns.material.depthTest).toBe(true);
    expect(columns.material.depthWrite).toBe(true);
    expect(columns.material.opacity).toBe(1);
    expect(columns.material.vertexColors).toBe(true);
    expect(landmark.material.transparent).toBe(false);
    expect(landmark.material.depthTest).toBe(true);
    expect(landmark.material.depthWrite).toBe(true);
    expect(landmark.material.vertexColors).toBe(false);
    expect(landmark.instanceColor).not.toBeNull();
    expect(Math.max(...(landmark.instanceColor?.array ?? []))).toBeGreaterThan(0.4);
    expect(landmark.count).toBe(ACTIVE_LANDMARK_CANDIDATE.instances.length);
    expect(landmark.count).toBeLessThanOrEqual(LANDMARK_INSTANCE_BUDGET);
    expect(landmark.userData.candidateId).toBe(ACTIVE_LANDMARK_CANDIDATE.id);
    expect(plane.material.transparent).toBe(true);
    expect(plane.material.depthTest).toBe(true);
    expect(plane.material.depthWrite).toBe(false);
    expect(plane.material.polygonOffset).toBe(false);
    for (const object of [spray, rain, grid]) {
      const material = Array.isArray(object.material) ? object.material[0] : object.material;
      expect(material.transparent).toBe(true);
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
    const columns = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, MeshStandardMaterial> =>
        object.name === 'voxel-water-columns'
        && object instanceof InstancedMesh
        && object.material instanceof MeshStandardMaterial,
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
    expect(columns.material.transparent).toBe(false);
    expect(columns.material.opacity).toBe(1);
    runtime.dispose();
  });

  it('builds a deterministic seamless field with landmark-covered columns removed', () => {
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
    expect(firstColumns.count).toBe(4050);
    expect(firstColumns.userData.landmarkExcludedCount).toBe(46);
    expect(secondColumns.count).toBe(firstColumns.count);
    expect(firstColumns.instanceMatrix.array).toEqual(secondColumns.instanceMatrix.array);
    const oceanCoordinates = firstColumns.geometry.getAttribute('aOceanXZ');
    expect(oceanCoordinates.count).toBe(firstColumns.count);
    for (let index = 0; index < oceanCoordinates.count; index += 1) {
      expect(landmarkCoversVoxelColumnWorldOcean({
        worldX: oceanCoordinates.getX(index),
        worldZ: oceanCoordinates.getY(index),
      })).toBe(false);
    }

    const localPositions: Vector3[] = [];
    const positionIndex = new Map<string, number>();
    const keyFor = (position: Vector3) => `${position.x.toFixed(5)},${position.z.toFixed(5)}`;
    for (let index = 0; index < firstColumns.count; index += 1) {
      const instanceMatrix = new Matrix4();
      firstColumns.getMatrixAt(index, instanceMatrix);
      const position = new Vector3().setFromMatrixPosition(instanceMatrix);
      localPositions.push(position);
      positionIndex.set(keyFor(position), index);
    }
    const firstIndex = localPositions.findIndex((position) => (
      positionIndex.has(keyFor(position.clone().add(new Vector3(VOXEL_SPACING, 0, 0))))
      && positionIndex.has(keyFor(position.clone().add(new Vector3(0, 0, VOXEL_SPACING))))
    ));
    expect(firstIndex).toBeGreaterThanOrEqual(0);
    const firstPosition = localPositions[firstIndex];
    const adjacentIndex = positionIndex.get(keyFor(
      firstPosition.clone().add(new Vector3(VOXEL_SPACING, 0, 0)),
    ));
    const nextRowIndex = positionIndex.get(keyFor(
      firstPosition.clone().add(new Vector3(0, 0, VOXEL_SPACING)),
    ));
    if (adjacentIndex === undefined || nextRowIndex === undefined) {
      throw new Error('Expected two surviving adjacent voxel-water columns.');
    }
    const firstColumnMatrix = new Matrix4();
    const adjacentColumnMatrix = new Matrix4();
    const nextRowColumnMatrix = new Matrix4();
    firstColumns.getMatrixAt(firstIndex, firstColumnMatrix);
    firstColumns.getMatrixAt(adjacentIndex, adjacentColumnMatrix);
    firstColumns.getMatrixAt(nextRowIndex, nextRowColumnMatrix);
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

  it('keeps column transforms static while GPU wave uniforms advance continuously', () => {
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
      (object): object is InstancedMesh<BufferGeometry, MeshStandardMaterial> =>
        object.name === 'voxel-water-columns'
        && object instanceof InstancedMesh
        && object.material instanceof MeshStandardMaterial,
    );
    const matrixVersion = columns.instanceMatrix.version;
    const matrixBefore = columns.instanceMatrix.array.slice();
    const timeBefore = plane.material.uniforms.uTime.value as number;

    for (let frame = 1; frame <= 30; frame += 1) {
      runtime.render({ elapsed: frame / 60, delta: 1 / 60 });
    }

    expect(columns.instanceMatrix.usage).toBe(StaticDrawUsage);
    expect(columns.instanceMatrix.version).toBe(matrixVersion);
    expect(columns.instanceMatrix.array).toEqual(matrixBefore);
    expect(plane.material.uniforms.uTime.value).toBeGreaterThan(timeBefore);
    runtime.dispose();
  });

  it('bakes the water plane into XZ and binds each column to its real ocean coordinate', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const columns = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, MeshStandardMaterial> =>
        object.name === 'voxel-water-columns'
        && object instanceof InstancedMesh
        && object.material instanceof MeshStandardMaterial,
    );
    const planePositions = plane.geometry.getAttribute('position');
    let maxAbsY = 0;
    let maxAbsZ = 0;
    for (let index = 0; index < planePositions.count; index += 1) {
      maxAbsY = Math.max(maxAbsY, Math.abs(planePositions.getY(index)));
      maxAbsZ = Math.max(maxAbsZ, Math.abs(planePositions.getZ(index)));
    }
    expect(plane.rotation.x).toBe(0);
    expect(maxAbsY).toBeLessThan(0.00001);
    expect(maxAbsZ).toBeGreaterThan(1);

    const oceanCoordinates = columns.geometry.getAttribute('aOceanXZ');
    expect(oceanCoordinates.count).toBe(columns.count);
    const firstMatrix = new Matrix4();
    columns.getMatrixAt(0, firstMatrix);
    const localPosition = new Vector3().setFromMatrixPosition(firstMatrix);
    const rotatedPosition = localPosition.applyAxisAngle(new Vector3(0, 1, 0), columns.rotation.y);
    expect(oceanCoordinates.getX(0)).toBeCloseTo(rotatedPosition.x, 5);
    expect(oceanCoordinates.getY(0)).toBeCloseTo(rotatedPosition.z, 5);
    runtime.dispose();
  });

  it('injects the shared wave model into columns with the same uniform records', () => {
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
      (object): object is InstancedMesh<never, MeshStandardMaterial> =>
        object.name === 'voxel-water-columns'
        && object instanceof InstancedMesh
        && object.material instanceof MeshStandardMaterial,
    );
    const shader = {
      vertexShader: '#include <common>\nvoid main() {\n#include <begin_vertex>\n}',
      fragmentShader: '#include <common>\nvoid main() {\n#include <emissivemap_fragment>\n}',
      uniforms: {},
    };
    columns.material.onBeforeCompile(shader as never, {} as never);

    expect(shader.vertexShader).toContain('attribute vec2 aOceanXZ;');
    expect(shader.vertexShader).toContain('WaveSample sampleWaveField');
    expect(shader.vertexShader).toContain('float columnSurfaceY = waveSurfaceY');
    expect(shader.fragmentShader).toContain('float voxelTopFace = step(0.72, normal.y);');
    expect(shader.fragmentShader).toContain('varying float vColumnWave;');
    expect(shader.fragmentShader).toContain('* smoothstep(0.0, 0.35, uColumnFoam);');
    expect(shader.uniforms).toMatchObject({
      uTime: plane.material.uniforms.uTime,
      uWaveHeight: plane.material.uniforms.uWaveHeight,
      uWind: plane.material.uniforms.uWind,
      uColumnWeatherStrength: { value: 0 },
      uColumnFoam: plane.material.uniforms.uFoam,
    });
    expect(columns.material.customProgramCacheKey()).toBe(COLUMN_WAVE_PROGRAM_KEY);
    runtime.dispose();
  });

  it('shares one world-space sun direction across sky, water, and the directional light', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<never, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const sky = findObject(
      objects,
      (object): object is Mesh<never, ShaderMaterial> =>
        object instanceof Mesh
        && object.material instanceof ShaderMaterial
        && 'uWeatherSkyTint' in object.material.uniforms,
    );
    const sun = findObject(
      objects,
      (object): object is DirectionalLight => object instanceof DirectionalLight,
    );
    const waterSun = plane.material.uniforms.uSunDirection;
    const skySun = sky.material.uniforms.uSunDirection;
    const before = (waterSun.value as Vector3).clone();

    expect(skySun).toBe(waterSun);
    expect(sun.position.clone().normalize().distanceTo(before)).toBeLessThan(0.000001);
    runtime.render({ elapsed: 10, delta: 10 });
    const after = waterSun.value as Vector3;
    expect(after.distanceTo(before)).toBeGreaterThan(0.001);
    expect(sun.position.clone().normalize().distanceTo(after)).toBeLessThan(0.000001);
    runtime.dispose();
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

  it('disposes the instanced columns object exactly once', () => {
    const { objects, runtime } = createRuntimeHarness();
    const columns = findObject(
      objects,
      (object): object is InstancedMesh =>
        object.name === 'voxel-water-columns' && object instanceof InstancedMesh,
    );
    const disposeSpy = vi.spyOn(columns, 'dispose');

    runtime.dispose();

    expect(disposeSpy).toHaveBeenCalledTimes(1);
  });

  it('disposes the instanced landmark object exactly once', () => {
    const { objects, runtime } = createRuntimeHarness();
    const landmark = findObject(
      objects,
      (object): object is InstancedMesh =>
        object.name === 'voxel-water-landmark' && object instanceof InstancedMesh,
    );
    const disposeSpy = vi.spyOn(landmark, 'dispose');

    runtime.dispose();

    expect(disposeSpy).toHaveBeenCalledTimes(1);
  });

});
