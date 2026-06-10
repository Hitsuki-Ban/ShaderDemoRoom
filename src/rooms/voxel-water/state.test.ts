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
    });
  });

  it('keeps storm presets rougher, foamier, and less clear than the default state', () => {
    expect(voxelWaterStormPreset.swell).toBeGreaterThan(voxelWaterDefaults.swell);
    expect(voxelWaterStormPreset.chop).toBeGreaterThan(voxelWaterDefaults.chop);
    expect(voxelWaterStormPreset.foam).toBeGreaterThan(voxelWaterDefaults.foam);
    expect(voxelWaterStormPreset.clarity).toBeLessThan(voxelWaterDefaults.clarity);
  });

  it('keeps the default room stable enough for first-view visual QA', () => {
    expect(voxelWaterDefaults.rain).toBeLessThanOrEqual(0.36);
    expect(voxelWaterDefaults.chop).toBeLessThanOrEqual(0.36);
    expect(voxelWaterDefaults.foam).toBeLessThanOrEqual(0.4);
    expect(voxelWaterDefaults.surfaceDetail).toBeLessThanOrEqual(0.45);
  });
});
