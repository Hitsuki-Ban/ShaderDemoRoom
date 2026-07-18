import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import {
  calculateGlassLightPath,
  createGlassMaterial,
  createTubeGeometry,
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

describe('glass optics runtime contracts', () => {
  it('builds a transmissive physical material from room settings', () => {
    const material = createGlassMaterial(glassOpticsDefaults);

    expect(material.transmission).toBe(1);
    expect(material.ior).toBe(glassOpticsDefaults.ior);
    expect(material.thickness).toBe(glassOpticsDefaults.thickness);
    expect(material.roughness).toBe(glassOpticsDefaults.roughness);
    expect(material.opacity).toBe(1);
    expect(material.clearcoat).toBe(1);
    expect(material.attenuationDistance).toBeGreaterThan(0);

    material.dispose();
  });

  it('derives beam and caustics geometry from the selected optical settings', () => {
    const path = calculateGlassLightPath(glassOpticsDefaults);
    const expectedCausticsX = (path.refractedA.x + path.refractedB.x) * 0.5;
    const expectedCausticsZ = (path.refractedA.z + path.refractedB.z) * 0.5;

    expect(path.lightPosition.toArray()).toEqual([
      glassOpticsDefaults.lightX,
      glassOpticsDefaults.lightY,
      glassOpticsDefaults.lightZ,
    ]);
    expect(path.causticsPosition.x).toBeCloseTo(expectedCausticsX);
    expect(path.causticsPosition.z).toBeCloseTo(expectedCausticsZ);
    expect(path.refractedB.y).toBeCloseTo(0.04);
  });

  it('keeps defaults and every preset field inside the controller domains', () => {
    expectPresetWithinDomains(glassOpticsDefaults);
    expectPresetWithinDomains(glassOpticsFocusPreset);
    expectPresetWithinDomains(glassOpticsCrystalPreset);
  });

  it('creates actual tube geometry for multi-point light paths', () => {
    const geometry = createTubeGeometry(
      [new Vector3(0, 0, 0), new Vector3(0.5, 0.4, 0), new Vector3(1, 0, 0)],
      0.02,
    );

    expect(geometry.type).toBe('TubeGeometry');
    expect(geometry.getAttribute('position').count).toBeGreaterThan(0);
    expect(geometry.index?.count).toBeGreaterThan(0);

    geometry.dispose();
  });
});
