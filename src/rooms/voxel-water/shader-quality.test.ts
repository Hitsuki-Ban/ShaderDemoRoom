import { describe, expect, it, vi } from 'vitest';
import {
  AmbientLight,
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
  PointLight,
  Scene,
  ShaderMaterial,
  SpotLight,
  StaticDrawUsage,
  Vector3,
  Vector4,
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
import { voxelWaterDefaults, voxelWaterDomains } from './state';
import {
  HEADLAND_SEGMENTS_WORLD_OCEAN,
  LANDMARK_MODEL,
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
  return [...source.matchAll(/\buniform\s+\w+\s+(\w+)(?:\s*\[\s*\d+\s*\])?\s*;/g)]
    .map((match) => match[1]);
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
      expect(look.precipitationBase).toBeGreaterThanOrEqual(0);
      expect(look.precipitationResponse).toBeGreaterThanOrEqual(0);
      expect(look.rainStreakLength).toBeGreaterThan(0);
      expect(look.rainStreakColor).toBeInstanceOf(Color);
      expect(look.rippleStrength).toBeGreaterThanOrEqual(0);
      expect(look.waveHeightScale).toBeGreaterThan(0);
      expect(look.waveHeightFloor).toBeGreaterThanOrEqual(voxelWaterDomains.waveHeight.min);
      expect(look.chopFloor).toBeGreaterThanOrEqual(voxelWaterDomains.chop.min);
      expect(look.foamFloor).toBeGreaterThanOrEqual(voxelWaterDomains.foam.min);
      expect(look.sunVisibility).toBeGreaterThanOrEqual(0);
      expect(look.sunVisibility).toBeLessThanOrEqual(1);
      expect(look.cloudContrast).toBeGreaterThanOrEqual(0);
      expect(look.cloudContrast).toBeLessThanOrEqual(1);
      expect(look.cloudCoverage).toBeGreaterThan(0);
      expect(look.cloudCoverage).toBeLessThanOrEqual(1);
      expect(look.cloudBaseHeight).toBeGreaterThan(0);
      expect(look.cloudHeightScale).toBeGreaterThan(0);
      expect(look.cloudJaggedness).toBeGreaterThanOrEqual(0);
      expect(look).not.toHaveProperty('columnOpacity');
      expect(look.waterTint).toBeInstanceOf(Color);
      expect(look.fogColor).toBeInstanceOf(Color);
      expect(look.landmarkEmissive).toBeInstanceOf(Color);
      expect(look.landmarkEmissiveIntensity).toBeGreaterThanOrEqual(0);
      expect(look.landmarkEmissiveLift).toBeGreaterThanOrEqual(0);
      expect(look.landmarkRoughness).toBeGreaterThan(0);
      expect(look.landmarkRoughness).toBeLessThanOrEqual(1);
      expect(look.beaconColor).toBeInstanceOf(Color);
      expect(look.beaconEmissiveStrength).toBeGreaterThan(0);
      expect(look.beaconEmissiveStrength).toBeLessThanOrEqual(1);
      expect(look.beaconPulseAmplitude).toBeGreaterThanOrEqual(0);
    }

    expect(WEATHER_LOOKS.clear.strength).toBeLessThan(WEATHER_LOOKS.rain.strength);
    expect(WEATHER_LOOKS.rain.strength).toBeLessThan(WEATHER_LOOKS.storm.strength);
    expect(WEATHER_LOOKS.clear.precipitationBase).toBeLessThan(WEATHER_LOOKS.rain.precipitationBase);
    expect(WEATHER_LOOKS.rain.precipitationBase).toBeLessThan(WEATHER_LOOKS.storm.precipitationBase);
    expect(WEATHER_LOOKS.clear.sunVisibility).toBeGreaterThan(WEATHER_LOOKS.rain.sunVisibility);
    expect(WEATHER_LOOKS.rain.sunVisibility).toBeGreaterThan(WEATHER_LOOKS.storm.sunVisibility);
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
    });
    expect(plane.material.uniforms.uVoxelFieldBasis.value.toArray()).toEqual([
      Math.cos(VOXEL_FIELD_YAW),
      Math.sin(VOXEL_FIELD_YAW),
    ]);
    runtime.updateSettings({ ...voxelWaterDefaults, currentDirection: 90 });
    const [currentX, currentZ] = plane.material.uniforms.uCurrentDirectionXZ.value.toArray();
    expect(currentX).toBeCloseTo(0, 12);
    expect(currentZ).toBeCloseTo(1, 12);
    expect(plane.material.uniforms.uVoxelFieldOffset.value.toArray()).toEqual([
      VOXEL_FIELD_OFFSET.x,
      VOXEL_FIELD_OFFSET.z,
    ]);
    runtime.dispose();
  });

  it('binds the model-owned headland capsules to the water contact-foam SDF', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const capsuleValues = plane.material.uniforms.uHeadlandCapsules.value as Vector4[];
    const radiusValues = plane.material.uniforms.uHeadlandRadii.value as number[];

    expect(capsuleValues).toHaveLength(HEADLAND_SEGMENTS_WORLD_OCEAN.length);
    expect(radiusValues).toEqual(HEADLAND_SEGMENTS_WORLD_OCEAN.map(({ radius }) => radius));
    for (let index = 0; index < HEADLAND_SEGMENTS_WORLD_OCEAN.length; index += 1) {
      const segment = HEADLAND_SEGMENTS_WORLD_OCEAN[index];
      expect(capsuleValues[index].toArray()).toEqual([
        segment.start.worldX,
        segment.start.worldZ,
        segment.end.worldX,
        segment.end.worldZ,
      ]);
    }
    expect(voxelWaterFragmentShader).toContain('float signedDistanceToHeadland(vec2 position)');
    expect(voxelWaterFragmentShader).toContain('signedDistanceToCapsule(position, uHeadlandCapsules[index], uHeadlandRadii[index])');
    expect(voxelWaterFragmentShader).toContain(
      'float contactFoam = contactBand * contactAgitation * contactBreakup * uFoam;',
    );
    expect(voxelWaterFragmentShader.indexOf('float contactFoam ='))
      .toBeLessThan(voxelWaterFragmentShader.lastIndexOf('color = mix(color, valueFoamColor'));
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
      'vec3 valueFoamColor = mix(foamColor, vec3(8.0, 8.3, 6.1), stormValuePhase);',
    );
    expect(voxelWaterFragmentShader).toContain('step(0.55, foamMask)');
    expect(voxelWaterFragmentShader).toContain('smoothstep(0.1, 0.7, visibleFoamMask)');
    expect(peakStage).toBeGreaterThan(0);
    expect(valueFoamStage).toBeGreaterThan(peakStage);
    expect(nearSuppressionStage).toBeGreaterThan(valueFoamStage);
    expect(weatherSuppressionStage).toBeGreaterThan(nearSuppressionStage);
    expect(foamStage).toBeGreaterThan(weatherSuppressionStage);
    expect(foamStage).toBeGreaterThan(fogStage);
    expect(foamStage).toBeGreaterThan(peakStage);
  });

  it('renders one feathered three-dimensional sun disc from the shared direction', () => {
    expect(skyFragmentShader).toContain('dot(direction, uSunDirection)');
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
      (object): object is InstancedMesh<BufferGeometry, MeshStandardMaterial> =>
        object.name === 'voxel-water-landmark'
        && object instanceof InstancedMesh
        && object.material instanceof MeshStandardMaterial,
    );
    const spray = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-spray'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );
    const rain = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-rain'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
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
    expect(landmark.material.vertexColors).toBe(true);
    expect(landmark.instanceColor).not.toBeNull();
    expect(Math.max(...(landmark.instanceColor?.array ?? []))).toBeGreaterThan(0.4);
    expect(landmark.count).toBe(LANDMARK_MODEL.instances.length);
    expect(landmark.count).toBeLessThanOrEqual(LANDMARK_INSTANCE_BUDGET);
    const landmarkRoleEmissive = landmark.geometry.getAttribute('aLandmarkEmissiveColor');
    const landmarkBeaconMask = landmark.geometry.getAttribute('aLandmarkBeaconMask');
    const expectedRoleEmissive = {
      'headland-dark': new Color(0x07131b),
      'tower-light': new Color(0xb8b1a0),
      'roof-dark': new Color(0x1d2b32),
      'beacon-warm': new Color(0xffb568),
    } as const;
    expect(landmarkRoleEmissive.count).toBe(landmark.count);
    expect(landmarkBeaconMask.count).toBe(landmark.count);
    expect(new Set(LANDMARK_MODEL.instances.map(({ colorRole }) => colorRole))).toEqual(
      new Set(Object.keys(expectedRoleEmissive)),
    );
    for (let index = 0; index < LANDMARK_MODEL.instances.length; index += 1) {
      const expectedColor = expectedRoleEmissive[LANDMARK_MODEL.instances[index].colorRole];
      expect(landmarkRoleEmissive.getX(index)).toBeCloseTo(expectedColor.r, 6);
      expect(landmarkRoleEmissive.getY(index)).toBeCloseTo(expectedColor.g, 6);
      expect(landmarkRoleEmissive.getZ(index)).toBeCloseTo(expectedColor.b, 6);
      expect(landmarkBeaconMask.getX(index)).toBe(
        LANDMARK_MODEL.instances[index].role === 'beacon' ? 1 : 0,
      );
    }
    expect(landmark.material.roughness).toBe(WEATHER_LOOKS.clear.landmarkRoughness);
    expect(landmark.material.emissiveIntensity).toBe(WEATHER_LOOKS.clear.landmarkEmissiveIntensity);
    expect(objects.filter(({ name }) => name === 'voxel-water-landmark')).toHaveLength(1);
    expect(objects.some(({ name }) => name === 'voxel-water-landmark-glow')).toBe(false);
    expect(objects.some((object) => object instanceof PointLight || object instanceof SpotLight)).toBe(false);
    expect(objects.filter((object) => object instanceof AmbientLight || object instanceof DirectionalLight))
      .toHaveLength(2);
    expect(plane.material.transparent).toBe(true);
    expect(plane.material.depthTest).toBe(true);
    expect(plane.material.depthWrite).toBe(false);
    expect(plane.material.polygonOffset).toBe(false);
    expect(spray.renderOrder).toBe(3);
    expect(rain.renderOrder).toBe(4);
    expect(objects.filter(({ name }) => name === 'voxel-water-spray')).toHaveLength(1);
    expect(objects.filter(({ name }) => name === 'voxel-water-rain')).toHaveLength(1);
    for (const object of [spray, rain, grid]) {
      const material = Array.isArray(object.material) ? object.material[0] : object.material;
      expect(material.transparent).toBe(true);
      expect(material.depthWrite).toBe(false);
    }
    for (const particles of [spray, rain]) {
      expect(particles.frustumCulled).toBe(false);
      expect(particles.material.depthTest).toBe(true);
      expect(particles.material.fog).toBe(true);
      expect(particles.material.toneMapped).toBe(true);
      expect(particles.material.uniforms).not.toHaveProperty('map');
    }
    expect(rain.count).toBe(200);
    expect(spray.count).toBe(96);

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
    const landmark = findObject(
      objects,
      (object): object is InstancedMesh<never, MeshStandardMaterial> =>
        object.name === 'voxel-water-landmark'
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
    expect(plane.material.uniforms.uRain.value).toBeCloseTo(
      WEATHER_LOOKS.storm.precipitationBase
        + nextSettings.rain * WEATHER_LOOKS.storm.precipitationResponse,
    );
    expect(plane.material.uniforms.uWaveHeight.value).toBe(nextSettings.waveHeight);
    expect(plane.material.uniforms.uChop.value).toBe(WEATHER_LOOKS.storm.chopFloor);
    expect(plane.material.uniforms.uFoam.value).toBe(WEATHER_LOOKS.storm.foamFloor);
    expect(plane.material.uniforms.uStorm.value).toBe(WEATHER_LOOKS.storm.strength);
    expect(columns.material.transparent).toBe(false);
    expect(columns.material.opacity).toBe(1);
    expect(landmark.material.emissive.equals(WEATHER_LOOKS.storm.landmarkEmissive)).toBe(true);
    expect(landmark.material.emissiveIntensity).toBe(WEATHER_LOOKS.storm.landmarkEmissiveIntensity);
    expect(landmark.material.roughness).toBe(WEATHER_LOOKS.storm.landmarkRoughness);
    const landmarkShader = {
      vertexShader: '#include <common>\nvoid main() {\n#include <begin_vertex>\n}',
      fragmentShader: '#include <common>\nvoid main() {\n#include <emissivemap_fragment>\n}',
      uniforms: {} as Record<string, { value: unknown }>,
    };
    landmark.material.onBeforeCompile(landmarkShader as never, {} as never);
    expect(landmarkShader.vertexShader).toContain('attribute vec3 aLandmarkEmissiveColor;');
    expect(landmarkShader.vertexShader).toContain('attribute float aLandmarkBeaconMask;');
    expect(landmarkShader.vertexShader).toContain(
      'vLandmarkEmissiveColor = aLandmarkEmissiveColor;',
    );
    expect(landmarkShader.fragmentShader).toContain(
      'float landmarkBeaconPulse = 1.0',
    );
    expect(landmarkShader.uniforms).toMatchObject({
      uLandmarkEmissiveLift: { value: WEATHER_LOOKS.storm.landmarkEmissiveLift },
      uBeaconEmissiveStrength: {
        value: WEATHER_LOOKS.storm.beaconEmissiveStrength,
      },
      uBeaconPulseAmplitude: { value: WEATHER_LOOKS.storm.beaconPulseAmplitude },
    });
    expect(
      (landmarkShader.uniforms.uBeaconColor.value as Color).equals(
        WEATHER_LOOKS.storm.beaconColor,
      ),
    ).toBe(true);
    expect(landmark.material.customProgramCacheKey()).toBe('voxel-water-landmark-emissive-v3');
    expect(() => landmark.material.onBeforeCompile({
      vertexShader: '',
      fragmentShader: '#include <common>\nvoid main() {}',
      uniforms: {} as Record<string, { value: unknown }>,
    } as never, {} as never)).toThrow(/role-emissive injection markers/);
    runtime.dispose();
  });

  it('resolves distinct weather-only endpoints without changing non-weather controls', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<BufferGeometry, ShaderMaterial> => (
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial
      ),
    );
    const rain = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> => (
        object.name === 'voxel-water-rain'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial
      ),
    );
    const clouds = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, MeshBasicMaterial> => (
        object.name === 'voxel-water-clouds'
        && object instanceof InstancedMesh
        && object.material instanceof MeshBasicMaterial
      ),
    );
    const sky = findObject(
      objects,
      (object): object is Mesh<BufferGeometry, ShaderMaterial> => (
        object instanceof Mesh
        && object.material instanceof ShaderMaterial
        && 'uSunVisibility' in object.material.uniforms
      ),
    );
    const endpoints = (['clear', 'rain', 'storm'] as const).map((weather) => {
      runtime.updateSettings({ ...voxelWaterDefaults, weather });
      return {
        weather,
        rain: plane.material.uniforms.uRain.value as number,
        waveHeight: plane.material.uniforms.uWaveHeight.value as number,
        chop: plane.material.uniforms.uChop.value as number,
        foam: plane.material.uniforms.uFoam.value as number,
        ripple: plane.material.uniforms.uWeatherRippleStrength.value as number,
        sun: sky.material.uniforms.uSunVisibility.value as number,
        cloudBase: clouds.position.y,
        cloudHeightScale: clouds.scale.y,
        cloudCount: clouds.count,
        rainVisible: rain.visible,
      };
    });

    expect(endpoints.map(({ rainVisible }) => rainVisible)).toEqual([false, true, true]);
    expect(endpoints[0].rain).toBeLessThan(0.04);
    expect(endpoints[1].rain).toBeGreaterThan(0.4);
    expect(endpoints[2].rain).toBeGreaterThan(endpoints[1].rain);
    expect(endpoints.map(({ waveHeight }) => waveHeight)).toEqual([
      voxelWaterDefaults.waveHeight * WEATHER_LOOKS.clear.waveHeightScale,
      WEATHER_LOOKS.rain.waveHeightFloor,
      WEATHER_LOOKS.storm.waveHeightFloor,
    ]);
    expect(endpoints.map(({ chop }) => chop)).toEqual([
      voxelWaterDefaults.chop,
      WEATHER_LOOKS.rain.chopFloor,
      WEATHER_LOOKS.storm.chopFloor,
    ]);
    expect(endpoints.map(({ foam }) => foam)).toEqual([
      voxelWaterDefaults.foam,
      WEATHER_LOOKS.rain.foamFloor,
      WEATHER_LOOKS.storm.foamFloor,
    ]);
    expect(endpoints.map(({ ripple }) => ripple)).toEqual([
      WEATHER_LOOKS.clear.rippleStrength,
      WEATHER_LOOKS.rain.rippleStrength,
      WEATHER_LOOKS.storm.rippleStrength,
    ]);
    expect(endpoints.map(({ sun }) => sun)).toEqual([1, 0.46, 0]);
    expect(endpoints.map(({ cloudBase }) => cloudBase)).toEqual([5, 4, 3.8]);
    expect(endpoints.map(({ cloudHeightScale }) => cloudHeightScale)).toEqual([0.58, 0.9, 1.16]);
    expect(endpoints.map(({ cloudCount }) => cloudCount)).toEqual([15, 47, 49]);
    expect(clouds.material.transparent).toBe(false);
    expect(clouds.instanceColor).not.toBeNull();
    runtime.dispose();
  });

  it('uses local rain-impact rings and an explicit weather sun endpoint', () => {
    expect(voxelWaterFragmentShader).toContain('float rainRipple(vec2 uv, vec2 center, float phaseOffset)');
    expect(voxelWaterFragmentShader.match(/rainRipple\(vUv, vec2\(/g)).toHaveLength(5);
    expect(voxelWaterFragmentShader).toContain('uRain * uWeatherRippleStrength * 1.8');
    expect(skyFragmentShader).toContain('uniform float uSunVisibility;');
    expect(skyFragmentShader).not.toContain('normalize(uSunDirection)');
    expect(voxelWaterFragmentShader).not.toContain('normalize(uSunDirection)');
    expect(voxelWaterFragmentShader).toContain('uniform vec2 uCurrentDirectionXZ;');
    expect(voxelWaterFragmentShader).toContain('uniform vec2 uVoxelFieldBasis;');
    expect(voxelWaterFragmentShader).not.toContain('radians(uCurrentDirection)');
    expect(voxelWaterFragmentShader).not.toContain('cos(uVoxelFieldYaw)');
    expect(skyFragmentShader).toContain('sunDisc * uSunVisibility');
    expect(skyFragmentShader).not.toContain('1.0 - uStorm * 0.78');
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
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-rain'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );
    const secondRain = findObject(
      second.objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-rain'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );
    const firstSpray = findObject(
      first.objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-spray'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );
    const secondSpray = findObject(
      second.objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-spray'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
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
    for (const attributeName of ['aSeed', 'aSpeed', 'aScale']) {
      const firstAttribute = firstRain.geometry.getAttribute(attributeName);
      const secondAttribute = secondRain.geometry.getAttribute(attributeName);
      expect(firstAttribute.count).toBe(firstRain.count);
      expect(secondAttribute.array).toEqual(firstAttribute.array);
    }
    for (const attributeName of ['aSeed', 'aSpeed', 'aScale', 'aLaunch', 'aVelocity']) {
      const firstAttribute = firstSpray.geometry.getAttribute(attributeName);
      const secondAttribute = secondSpray.geometry.getAttribute(attributeName);
      expect(firstAttribute.count).toBe(firstSpray.count);
      expect(secondAttribute.array).toEqual(firstAttribute.array);
    }
    expect(secondRain.instanceMatrix.array).toEqual(firstRain.instanceMatrix.array);
    expect(secondSpray.instanceMatrix.array).toEqual(firstSpray.instanceMatrix.array);

    first.runtime.dispose();
    second.runtime.dispose();
  });

  it('gives each rain and spray instance deterministic independent lifecycle data', () => {
    const { objects, runtime } = createRuntimeHarness();
    const rain = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-rain'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );
    const spray = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-spray'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );

    for (const particles of [rain, spray]) {
      const phases = [...particles.geometry.getAttribute('aSeed').array] as number[];
      const speeds = [...particles.geometry.getAttribute('aSpeed').array] as number[];
      const scales = [...particles.geometry.getAttribute('aScale').array] as number[];
      expect(new Set(phases).size).toBeGreaterThan(particles.count * 0.95);
      expect(new Set(speeds).size).toBeGreaterThan(particles.count * 0.95);
      expect(Math.min(...phases)).toBeGreaterThanOrEqual(0);
      expect(Math.max(...phases)).toBeLessThan(1);
      expect(Math.min(...speeds)).toBeGreaterThanOrEqual(0.7);
      expect(Math.max(...speeds)).toBeLessThanOrEqual(1.7);
      expect(Math.min(...scales)).toBeGreaterThan(0);
    }
    expect(spray.geometry.getAttribute('aLaunch').count).toBe(spray.count);
    expect(spray.geometry.getAttribute('aVelocity').count).toBe(spray.count);
    runtime.dispose();
  });

  it('runs tapered rain and ballistic spray lifecycles entirely in shaders', () => {
    const { objects, runtime } = createRuntimeHarness();
    const rain = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-rain'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );
    const spray = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-spray'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );

    expect(rain.material.vertexShader).toContain('fract(uTime * 0.17 * aSpeed + aSeed)');
    expect(rain.material.vertexShader).toContain('mix(11.0, -1.8, age)');
    expect(rain.material.vertexShader).toContain('(age - 0.5) * uWind');
    expect(rain.material.vertexShader).toContain('birthFade * deathFade');
    expect(rain.material.fragmentShader).toContain('taperedHalfWidth');
    expect(rain.material.fragmentShader).toContain('capsuleDistance');
    expect(rain.material.fragmentShader).toContain('if (shapeAlpha <= 0.001) discard;');
    expect(spray.material.vertexShader).toContain('fract(uTime * 0.23 * aSpeed + aSeed)');
    expect(spray.material.vertexShader).toContain('0.5 * gravity * flightTime * flightTime');
    expect(spray.material.vertexShader).toContain('aLaunch');
    expect(spray.material.vertexShader).toContain('aVelocity');
    expect(spray.material.fragmentShader).toContain('teardropDistance');
    expect(spray.material.fragmentShader).toContain('if (shapeAlpha <= 0.001) discard;');
    for (const particles of [rain, spray]) {
      expect(particles.material.vertexShader).toContain('#include <fog_pars_vertex>');
      expect(particles.material.vertexShader).toContain('#include <fog_vertex>');
      expect(particles.material.fragmentShader).toContain('#include <tonemapping_fragment>');
      expect(particles.material.fragmentShader).toContain('#include <colorspace_fragment>');
      expect(particles.material.fragmentShader).toContain('#include <fog_fragment>');
    }
    runtime.dispose();
  });

  it('updates particle drawing-buffer resolution and settings uniforms', () => {
    const { objects, runtime } = createRuntimeHarness();
    const rain = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-rain'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );
    const spray = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-spray'
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    );
    const nextSettings: VoxelWaterSettings = {
      ...voxelWaterDefaults,
      weather: 'storm',
      rain: 0.82,
      wind: 2.35,
      foam: 0.91,
      surfaceDetail: 0.77,
    };

    runtime.resize({ width: 1600, height: 900, pixelRatio: 0.55 });
    runtime.updateSettings(nextSettings);

    expect(rain.material.uniforms.uResolution.value.x).toBeCloseTo(880);
    expect(rain.material.uniforms.uResolution.value.y).toBeCloseTo(495);
    expect(spray.material.uniforms.uResolution.value.x).toBeCloseTo(880);
    expect(spray.material.uniforms.uResolution.value.y).toBeCloseTo(495);
    expect(rain.material.vertexShader).toContain('3.6 + aScale');
    expect(rain.material.uniforms.uOpacity.value).toBeCloseTo(0.78);
    expect(rain.material.uniforms.uLength.value).toBe(WEATHER_LOOKS.storm.rainStreakLength);
    expect(rain.material.uniforms.uWind.value).toBe(nextSettings.wind);
    expect(spray.material.uniforms.uOpacity.value).toBeCloseTo(0.36);
    expect(spray.material.uniforms.uLength.value).toBeCloseTo(3.4 + 0.91 * 3.6);
    expect(spray.material.uniforms.uWind.value).toBe(nextSettings.wind);
    expect(spray.material.uniforms.uFoam.value).toBe(nextSettings.foam);
    runtime.dispose();
  });

  it('keeps particle transforms static and freezes shared particle time at motionScale zero', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<BufferGeometry, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const particles = ['voxel-water-rain', 'voxel-water-spray'].map((name) => findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === name
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    ));
    const snapshots = particles.map((object) => ({
      matrix: object.matrix.toArray(),
      position: object.position.toArray(),
      quaternion: object.quaternion.toArray(),
      instanceMatrix: object.instanceMatrix.array.slice(),
      instanceMatrixVersion: object.instanceMatrix.version,
    }));

    runtime.render({ elapsed: 1, delta: 1 });
    const advancedTime = plane.material.uniforms.uTime.value as number;
    expect(advancedTime).toBeGreaterThan(0);
    for (let index = 0; index < particles.length; index += 1) {
      const object = particles[index];
      expect(object.material.uniforms.uTime).toBe(plane.material.uniforms.uTime);
      expect(object.matrix.toArray()).toEqual(snapshots[index].matrix);
      expect(object.position.toArray()).toEqual(snapshots[index].position);
      expect(object.quaternion.toArray()).toEqual(snapshots[index].quaternion);
      expect(object.instanceMatrix.array).toEqual(snapshots[index].instanceMatrix);
      expect(object.instanceMatrix.version).toBe(snapshots[index].instanceMatrixVersion);
    }
    runtime.setMotionScale(0);
    runtime.render({ elapsed: 11, delta: 10 });
    expect(plane.material.uniforms.uTime.value).toBe(advancedTime);
    runtime.dispose();
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

  it('drives the in-material beacon pulse from shared motion time and freezes it at motionScale zero', () => {
    const { objects, runtime } = createRuntimeHarness();
    const plane = findObject(
      objects,
      (object): object is Mesh<never, ShaderMaterial> =>
        object.name === 'voxel-water-surface'
        && object instanceof Mesh
        && object.material instanceof ShaderMaterial,
    );
    const landmark = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, MeshStandardMaterial> =>
        object.name === 'voxel-water-landmark'
        && object instanceof InstancedMesh
        && object.material instanceof MeshStandardMaterial,
    );
    const landmarkShader = {
      vertexShader: '#include <common>\nvoid main() {\n#include <begin_vertex>\n}',
      fragmentShader: '#include <common>\nvoid main() {\n#include <emissivemap_fragment>\n}',
      uniforms: {} as Record<string, { value: unknown }>,
    };
    landmark.material.onBeforeCompile(landmarkShader as never, {} as never);
    expect(landmarkShader.uniforms.uTime).toBe(plane.material.uniforms.uTime);
    runtime.render({ elapsed: 1, delta: 1 });
    const advancedTime = landmarkShader.uniforms.uTime.value as number;
    expect(advancedTime).toBeGreaterThan(0);
    runtime.setMotionScale(0);
    runtime.render({ elapsed: 11, delta: 10 });
    expect(landmarkShader.uniforms.uTime.value).toBe(advancedTime);
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

  it('disposes each particle batch and its unique resources exactly once', () => {
    const { objects, runtime } = createRuntimeHarness();
    const particles = ['voxel-water-rain', 'voxel-water-spray'].map((name) => findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, ShaderMaterial> =>
        object.name === name
        && object instanceof InstancedMesh
        && object.material instanceof ShaderMaterial,
    ));
    const spies = particles.flatMap((object) => [
      vi.spyOn(object, 'dispose'),
      vi.spyOn(object.geometry, 'dispose'),
      vi.spyOn(object.material, 'dispose'),
    ]);

    runtime.dispose();

    for (const disposeSpy of spies) expect(disposeSpy).toHaveBeenCalledTimes(1);
  });

  it('disposes every unique landmark and instanced cloud resource exactly once', () => {
    const { objects, runtime } = createRuntimeHarness();
    const landmark = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, MeshStandardMaterial> =>
        object.name === 'voxel-water-landmark'
        && object instanceof InstancedMesh
        && object.material instanceof MeshStandardMaterial,
    );
    const clouds = findObject(
      objects,
      (object): object is InstancedMesh<BufferGeometry, MeshBasicMaterial> => (
        object.name === 'voxel-water-clouds'
        && object instanceof InstancedMesh
        && object.material instanceof MeshBasicMaterial
      ),
    );

    const spies = [
      vi.spyOn(landmark.geometry, 'dispose'),
      vi.spyOn(landmark.material, 'dispose'),
      vi.spyOn(clouds, 'dispose'),
      vi.spyOn(clouds.geometry, 'dispose'),
      vi.spyOn(clouds.material, 'dispose'),
    ];
    runtime.dispose();

    for (const disposeSpy of spies) expect(disposeSpy).toHaveBeenCalledTimes(1);
  });

});
