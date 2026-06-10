import { describe, expect, it } from 'vitest';
import fragmentShader from './water.frag.glsl?raw';
import runtimeSource from './runtime.ts?raw';
import vertexShader from './water.vert.glsl?raw';
import qaSource from '../../../scripts/water-qa.mjs?raw';

describe('voxel water shader stability', () => {
  it('avoids hard fragment thresholds that create temporal sparkle popping', () => {
    expect(fragmentShader).not.toMatch(/\bstep\s*\(/);
    expect(fragmentShader).not.toContain('floor(uTime');
  });

  it('filters the water grid by screen footprint and view distance', () => {
    expect(fragmentShader).toContain('gridFootprint');
    expect(fragmentShader).toContain('gridDistanceFade');
  });

  it('keeps rain surface sparkle density below the main grid frequency', () => {
    expect(fragmentShader).not.toContain('vec2(120.0, 80.0)');
    expect(fragmentShader).toContain('rainSurfaceCells');
  });

  it('keeps transparent atmospheric layers in an explicit render order', () => {
    expect(runtimeSource).toContain('transparent: true');
    expect(runtimeSource).toContain('depthWrite: false');
    expect(runtimeSource).toContain('plane.renderOrder');
    expect(runtimeSource).toContain('columns.renderOrder');
    expect(runtimeSource).toContain('rain.renderOrder');
    expect(runtimeSource).toContain('spray.renderOrder');
  });

  it('keeps presentation drift subtle so grid lines do not sweep across pixels', () => {
    expect(runtimeSource).toContain('PRESENTATION_DRIFT_AMPLITUDE = 0.018');
    expect(runtimeSource).toContain('PRESENTATION_DRIFT_SPEED = 0.035');
  });

  it('keeps voxel column geometry continuous while shader color remains toon-banded', () => {
    expect(runtimeSource).not.toContain('const stepped = Math.floor(normalized * settings.toonSteps)');
    expect(runtimeSource).toContain('columnHeightValue');
  });

  it('attenuates high-frequency normal detail with view distance', () => {
    expect(fragmentShader).toContain('normalDetailFade');
    expect(fragmentShader).not.toContain('fbm(vUv * 24.0');
    expect(fragmentShader).not.toContain('fbm(vUv * 21.0');
  });

  it('keeps glitter highlights filtered instead of using very high-frequency masks', () => {
    expect(fragmentShader).toContain('glitterDetailFade');
    expect(fragmentShader).not.toContain('vUv * 55.0');
  });

  it('keeps the surface grid as a subtle contour overlay instead of a dominant texture', () => {
    expect(fragmentShader).toContain('gridIntensity');
    expect(fragmentShader).toContain('vec3(0.5, 0.86, 0.88)');
  });

  it('keeps crest foam gated to actual wave peaks instead of broad surface noise', () => {
    expect(fragmentShader).toContain('crestGate');
    expect(fragmentShader).toContain('crestNoise * 0.1');
    expect(fragmentShader).not.toContain('crestNoise * 0.18');
  });

  it('uses an explicit weather-responsive water volume alpha instead of an opaque magic expression', () => {
    expect(fragmentShader).toContain('surfaceAlpha');
    expect(fragmentShader).toContain('weatherTransparency');
    expect(fragmentShader).toContain('foregroundStormWindow');
    expect(fragmentShader).toContain('mix(0.82, 0.94, uClarity)');
  });

  it('uses seeded layout randomness for repeatable visual QA', () => {
    expect(runtimeSource).toContain('createSeededRandom');
    expect(runtimeSource).not.toContain('Math.random()');
  });

  it('softens the rectangular water-plane boundary with an edge fade', () => {
    expect(fragmentShader).toContain('edgeFade');
    expect(fragmentShader).toContain('edgeDistance');
  });

  it('uses a tight camera clip range for better depth precision', () => {
    expect(runtimeSource).toContain('new PerspectiveCamera(45, 1, 0.3, 72)');
  });

  it('keeps rain particles sparse enough for a refined default view', () => {
    expect(runtimeSource).toContain('RAIN_DROP_COUNT = 420');
    expect(runtimeSource).not.toContain('new Float32Array(640 * 3)');
  });

  it('uses less emissive voxel column material for a refined water read', () => {
    expect(runtimeSource).toContain('0x32cddd');
    expect(runtimeSource).toContain('columnTint');
    expect(runtimeSource).toContain(
      '0.36 + settings.clarity * 0.18 + settings.foam * 0.04 + weatherLook.rainCurtain * 0.04',
    );
  });

  it('reserves spray particles for high-foam or storm conditions', () => {
    expect(runtimeSource).toContain('settings.foam > 0.52');
    expect(runtimeSource).toContain('sprayMaterial.opacity = Math.min(0.36');
  });

  it('uses calmer base wave advection in both shader and column simulation', () => {
    expect(vertexShader).not.toContain('0.55 + uWind * 0.2');
    expect(runtimeSource).not.toContain('0.55 + settings.wind * 0.2');
    expect(vertexShader).toContain('0.44 + uWind * 0.15');
    expect(runtimeSource).toContain('0.44 + settings.wind * 0.15');
  });

  it('defines a fine viewport-scale voxel ocean budget instead of a small center island', () => {
    expect(runtimeSource).toContain('VOXEL_GRID_SIDE = 96');
    expect(runtimeSource).toContain('WATER_PLANE_SIZE = 104');
    expect(runtimeSource).toContain('VOXEL_SPACING = 0.26');
  });

  it('uses instanced voxel colors for per-cell art direction', () => {
    expect(runtimeSource).toContain('vertexColors: true');
    expect(runtimeSource).toContain('columns.setColorAt');
    expect(runtimeSource).toContain('columns.instanceColor.needsUpdate = true');
  });

  it('adds dynamic sky uniforms without requiring volumetric cloud rendering', () => {
    expect(runtimeSource).toContain('skyMaterial');
    expect(runtimeSource).toContain('uSkyTime');
    expect(runtimeSource).toContain('uColorTemperature');
    expect(runtimeSource).not.toContain('PMREMGenerator');
  });

  it('visualizes ocean current through flow ribbons rather than dense arrows', () => {
    expect(fragmentShader).toContain('uCurrentDirection');
    expect(fragmentShader).toContain('uCurrentStrength');
    expect(fragmentShader).toContain('flowRibbon');
    expect(runtimeSource).not.toContain('ArrowHelper');
  });

  it('records region-aware ocean QA metrics for the new visual baseline', () => {
    expect(qaSource).toContain('regionMetrics');
    expect(qaSource).toContain('waterCoverage');
    expect(qaSource).toContain('skyLuma');
    expect(qaSource).toContain('voxelLocalContrast');
  });

  it('uses a brighter translucent toon seawater palette instead of a storm-muted default', () => {
    expect(fragmentShader).toContain('toonRamp');
    expect(fragmentShader).toContain('toonEdgeAccent');
    expect(fragmentShader).toContain('translucentGlow');
    expect(fragmentShader).toContain('vec3(0.34, 0.92, 0.96)');
    expect(fragmentShader).not.toContain('uStorm * 0.34 + uCloudCover * 0.17');
  });

  it('documents an infinite-ocean-ready hybrid strategy without adding heavy FFT runtime', () => {
    expect(runtimeSource).toContain('INFINITE_OCEAN_STRATEGY');
    expect(runtimeSource).toContain('cameraRelativeOceanOffset');
    expect(runtimeSource).not.toContain('FFT');
  });

  it('tracks brightness and toon band metrics during water QA', () => {
    expect(qaSource).toContain('toonBandSeparation');
    expect(qaSource).toContain('waterLuma');
    expect(qaSource).toContain('waterSaturationRange');
  });

  it('centralizes weather art direction in distinct look definitions', () => {
    expect(runtimeSource).toContain('WEATHER_LOOKS');
    expect(runtimeSource).toContain('waterTint');
    expect(runtimeSource).toContain('fogColor');
    expect(runtimeSource).toContain('ambientColor');
    expect(runtimeSource).toContain('sunColor');
    expect(runtimeSource).toContain('rimColor');
    expect(runtimeSource).toContain('fogDensity');
    expect(runtimeSource).toContain('lightningTint');
    expect(runtimeSource).toMatch(/clear:\s*{/);
    expect(runtimeSource).toMatch(/rain:\s*{/);
    expect(runtimeSource).toMatch(/storm:\s*{/);
  });

  it('passes stylized weather fog and lighting uniforms to the water shader', () => {
    expect(runtimeSource).toContain('uWeatherWaterTint');
    expect(runtimeSource).toContain('uWeatherFogColor');
    expect(runtimeSource).toContain('uWeatherRimColor');
    expect(runtimeSource).toContain('uWeatherLightningTint');
    expect(runtimeSource).toContain('uWeatherFogDensity');
    expect(runtimeSource).toContain('uRainCurtain');
    expect(runtimeSource).toContain('uLightningPulse');
    expect(fragmentShader).toContain('stylizedFogBand');
    expect(fragmentShader).toContain('weatherFog');
    expect(fragmentShader).toContain('nearFogRelease');
    expect(fragmentShader).toContain('stormToonContrast');
    expect(fragmentShader).toContain('stormSurfaceContour');
    expect(fragmentShader).toContain('stormRainSheet');
    expect(fragmentShader).toContain('stormGridInk');
    expect(fragmentShader).toContain('rainCurtain');
    expect(fragmentShader).toContain('lightningRim');
  });

  it('tracks weather color signatures during visual QA', () => {
    expect(qaSource).toContain('colorSignature');
    expect(qaSource).toContain('hueMean');
    expect(qaSource).toContain('weatherSeparation');
  });
});
