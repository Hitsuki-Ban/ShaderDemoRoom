import { describe, expect, it } from 'vitest';
import fragmentShader from './water.frag.glsl?raw';
import runtimeSource from './runtime.ts?raw';
import vertexShader from './water.vert.glsl?raw';

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

  it('uses an explicit high-opacity water volume alpha instead of a near-opaque magic expression', () => {
    expect(fragmentShader).toContain('surfaceAlpha');
    expect(fragmentShader).toContain('mix(0.9, 0.97, uClarity)');
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
    expect(runtimeSource).toContain('new PerspectiveCamera(45, 1, 0.3, 48)');
  });

  it('keeps rain particles sparse enough for a refined default view', () => {
    expect(runtimeSource).toContain('RAIN_DROP_COUNT = 420');
    expect(runtimeSource).not.toContain('new Float32Array(640 * 3)');
  });

  it('uses less emissive voxel column material for a refined water read', () => {
    expect(runtimeSource).toContain('0x23b8ce');
    expect(runtimeSource).toContain('0x328fa2');
    expect(runtimeSource).toContain('0.16 + settings.clarity * 0.1 + settings.foam * 0.05');
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
});
