import { describe, expect, it } from 'vitest';
import {
  getFrameTiming,
  getRendererAntialias,
  getRenderPixelRatio,
} from './renderPolicy';

describe('shader render policy', () => {
  it('fixes the persistent context antialias attribute for every room', () => {
    expect(getRendererAntialias()).toBe(true);
  });

  it('caps the fill-rate-heavy voxel room below the other shader room', () => {
    expect(getRenderPixelRatio('voxel-water', 1)).toBe(0.55);
    expect(getRenderPixelRatio('voxel-water', 2)).toBe(0.55);
    expect(getRenderPixelRatio('voxel-water', 3)).toBe(0.55);
    expect(getRenderPixelRatio('glass-optics', 1)).toBe(1);
    expect(getRenderPixelRatio('glass-optics', 2)).toBe(2);
    expect(getRenderPixelRatio('glass-optics', 3)).toBe(2);
    expect(getRenderPixelRatio('voxel-water', 0.5)).toBe(0.5);
  });

  it('caps simulation time without understating FPS elapsed time', () => {
    expect(getFrameTiming(0.12)).toEqual({
      simulationDelta: 0.05,
      statsDelta: 0.12,
    });
    expect(getFrameTiming(0.016)).toEqual({
      simulationDelta: 0.016,
      statsDelta: 0.016,
    });
    expect(getFrameTiming(-0.01)).toEqual({
      simulationDelta: 0,
      statsDelta: 0,
    });
  });

  it('fails fast for invalid browser timing inputs', () => {
    expect(() => getRenderPixelRatio('voxel-water', 0)).toThrow('Invalid device pixel ratio');
    expect(() => getFrameTiming(Number.NaN)).toThrow('Invalid frame delta');
  });
});
