import { describe, expect, it } from 'vitest';
import { voxelWaterDefaults, voxelWaterStormPreset } from './state';

describe('voxel water art-directable settings', () => {
  it('exposes multi-scale water controls for refined wave shading', () => {
    expect(voxelWaterDefaults).toMatchObject({
      swell: expect.any(Number),
      chop: expect.any(Number),
      foam: expect.any(Number),
      clarity: expect.any(Number),
      surfaceDetail: expect.any(Number),
      currentDirection: expect.any(Number),
      currentStrength: expect.any(Number),
      skyTime: expect.any(Number),
      colorTemperature: expect.any(Number),
      voxelColorVariance: expect.any(Number),
    });
  });

  it('keeps storm presets rougher, foamier, and less clear than the default state', () => {
    expect(voxelWaterStormPreset.swell).toBeGreaterThan(voxelWaterDefaults.swell);
    expect(voxelWaterStormPreset.chop).toBeGreaterThan(voxelWaterDefaults.chop);
    expect(voxelWaterStormPreset.foam).toBeGreaterThan(voxelWaterDefaults.foam);
    expect(voxelWaterStormPreset.clarity).toBeLessThan(voxelWaterDefaults.clarity);
  });

  it('keeps the default room stable enough for first-view visual QA', () => {
    expect(voxelWaterDefaults.rain).toBeLessThanOrEqual(0.24);
    expect(voxelWaterDefaults.cloudCover).toBeLessThanOrEqual(0.28);
    expect(voxelWaterDefaults.clarity).toBeGreaterThanOrEqual(0.82);
    expect(voxelWaterDefaults.chop).toBeLessThanOrEqual(0.32);
    expect(voxelWaterDefaults.foam).toBeLessThanOrEqual(0.34);
    expect(voxelWaterDefaults.surfaceDetail).toBeLessThanOrEqual(0.45);
    expect(voxelWaterDefaults.currentStrength).toBeLessThanOrEqual(0.55);
    expect(voxelWaterDefaults.voxelColorVariance).toBeLessThanOrEqual(0.5);
  });
});
