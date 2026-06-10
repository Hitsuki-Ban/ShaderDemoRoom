import { describe, expect, it } from 'vitest';
import causticsFragmentShader from './caustics.frag.glsl?raw';
import controlsSource from './Controls.tsx?raw';
import runtimeSource from './runtime.ts?raw';
import stateSource from './state.ts?raw';

describe('glass optics exhibit readability', () => {
  it('renders light paths as glowing tube geometry instead of single-pixel lines', () => {
    expect(runtimeSource).toContain('TubeGeometry');
    expect(runtimeSource).toContain('AdditiveBlending');
    expect(runtimeSource).toContain('updateBeamGeometry');
    expect(runtimeSource).not.toContain('LineBasicMaterial');
  });

  it('keeps the source halo attached to the movable light', () => {
    expect(runtimeSource).toContain('source.position.copy(lightPosition)');
    expect(runtimeSource).toContain('sourceHalo.position.copy(lightPosition)');
    expect(runtimeSource).toContain('sourceHaloMaterial.color.copy(sourceMaterial.color)');
  });

  it('keeps the default and focus light positions in the framed exhibit area', () => {
    expect(stateSource).toContain('lightX: -0.05');
    expect(stateSource).toContain('lightY: 2.42');
    expect(stateSource).toContain('lightZ: 2.05');
    expect(controlsSource).toContain('lightX: -0.28');
    expect(controlsSource).toContain('lightY: 2.85');
    expect(controlsSource).toContain('lightZ: 1.45');
  });

  it('adds a refractive reference panel and reduces grid dominance', () => {
    expect(runtimeSource).toContain('referenceMaterial');
    expect(runtimeSource).toContain('uTime * 0.018');
    expect(runtimeSource).toContain('material.opacity = 0.28');
    expect(runtimeSource).toContain('metalness: 0.1');
    expect(runtimeSource).toContain('roughness: 0.5');
  });

  it('uses physical glass volume cues instead of smoky opacity', () => {
    expect(runtimeSource).toContain('attenuationColor');
    expect(runtimeSource).toContain('attenuationDistance');
    expect(runtimeSource).toContain('clearcoat: 1');
    expect(runtimeSource).toContain('opacity: 1');
    expect(runtimeSource).toContain('specularIntensity');
  });

  it('keeps caustics connected to the refracted beam endpoint', () => {
    expect(runtimeSource).toContain('caustics.position.set');
    expect(runtimeSource).toContain('(refractedA.x + refractedB.x) * 0.5');
    expect(runtimeSource).toContain('caustics.scale.setScalar');
    expect(causticsFragmentShader).toContain('streaks');
    expect(causticsFragmentShader).toContain('caustic * 0.82 * uIntensity');
  });
});
