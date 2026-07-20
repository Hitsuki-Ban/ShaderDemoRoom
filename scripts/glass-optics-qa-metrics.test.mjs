import { describe, expect, it } from 'vitest';
import {
  downsampleFrame,
  measureCausticsDifference,
  srgbByteToLinear,
} from './glass-optics-qa-metrics.mjs';

function frame(width, height, paint = () => [0, 0, 0, 255]) {
  const pixels = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const values = paint(x, y);
      const index = (y * width + x) * 4;
      pixels.set(values, index);
    }
  }
  return { width, height, bytesPerPixel: 4, pixels };
}

describe('glass optics QA metrics', () => {
  it('downsampleFrame performs an exact box average', () => {
    const source = frame(2, 2, (x, y) => [x * 100, y * 100, (x + y) * 50, 255]);
    const result = downsampleFrame(source, 2);
    expect(
      { width: result.width, height: result.height, bytesPerPixel: result.bytesPerPixel },
    ).toEqual({ width: 1, height: 1, bytesPerPixel: 4 });
    expect([...result.pixels]).toEqual([50, 50, 50, 255]);
  });

  it('downsampleFrame includes incomplete edge blocks', () => {
    const source = frame(3, 2, (x) => [x * 100, 0, 0, 255]);
    const result = downsampleFrame(source, 2);
    expect({ width: result.width, height: result.height }).toEqual({ width: 2, height: 1 });
    expect([...result.pixels]).toEqual([50, 0, 0, 255, 200, 0, 0, 255]);
  });

  it('srgbByteToLinear follows the sRGB transfer endpoints', () => {
    expect(srgbByteToLinear(0)).toBe(0);
    expect(srgbByteToLinear(255)).toBe(1);
    expect(Math.abs(srgbByteToLinear(128) - 0.21586)).toBeLessThan(0.00001);
  });

  it('measureCausticsDifference finds a focused, unclipped hotspot', () => {
    const off = frame(12, 12, () => [10, 10, 10, 255]);
    const on = frame(12, 12, (x, y) => {
      const distance = Math.hypot(x - 6, y - 5);
      const gain = Math.max(0, 120 - distance * 32);
      return [10 + gain, 10 + gain * 0.8, 10 + gain * 0.4, 255].map(Math.round);
    });
    const metrics = measureCausticsDifference(on, off);
    expect(metrics.activePixels).toBeGreaterThan(5);
    expect(metrics.peakByteP999).toBeGreaterThan(50);
    expect(metrics.halfMaxEquivalentRadius).toBeGreaterThan(0);
    expect(metrics.activeMeanLinear).toBeGreaterThan(0);
    expect(metrics.focusCoreSamples).toBe(32);
    expect(metrics.focusCoreLinearMean).toBeGreaterThan(0);
    expect(metrics.plateauCoverage).toBeLessThanOrEqual(metrics.plateauRatio);
    expect(Math.abs(metrics.centroid.x - 0.5)).toBeLessThan(0.05);
    expect(Math.abs(metrics.centroid.y - 5 / 12)).toBeLessThan(0.05);
    expect(metrics.allChannelClipRatio).toBe(0);
  });

  it('uses a fixed-size focus core independent of footprint cardinality', () => {
    const off = frame(20, 20);
    const on = frame(20, 20, (x, y) => (
      y < 2 && x < 16 ? [200, 200, 200, 255] : [20, 20, 20, 255]
    ));
    const metrics = measureCausticsDifference(on, off);

    expect(metrics.positivePixels).toBe(400);
    expect(metrics.focusCoreSamples).toBe(32);
    expect(metrics.focusCoreLinearMean).toBeCloseTo(srgbByteToLinear(200), 12);
  });

  it('rejects a flat peak even when a dim tail makes the active footprint large', () => {
    const off = frame(100, 100);
    const on = frame(100, 100, (x, y) => (
      x >= 45 && x < 55 && y >= 45 && y < 55
        ? [200, 200, 200, 255]
        : [80, 80, 80, 255]
    ));
    const metrics = measureCausticsDifference(on, off);
    expect(metrics.plateauPixels).toBe(100);
    expect(metrics.plateauRatio).toBe(1);
    expect(metrics.plateauCoverage).toBe(0.01);
    expect(metrics.plateauRatio < 0.15).toBe(false);
  });

  it('rejects a flat peak even when one brighter pixel is an outlier', () => {
    const off = frame(400, 400);
    const on = frame(400, 400, (x, y) => {
      if (x === 200 && y === 200) return [255, 255, 255, 255];
      return x >= 190 && x < 210 && y >= 190 && y < 210
        ? [200, 200, 200, 255]
        : [80, 80, 80, 255];
    });
    const metrics = measureCausticsDifference(on, off);
    expect(metrics.plateauPixels).toBe(400);
    expect(metrics.plateauRatio).toBe(1);
    expect(metrics.plateauRatio < 0.15).toBe(false);
  });

  it('measureCausticsDifference rejects mismatched or empty pairs', () => {
    expect(
      () => measureCausticsDifference(frame(2, 2), frame(3, 2)),
    ).toThrow(/identical dimensions/);
    expect(
      () => measureCausticsDifference(frame(2, 2), frame(2, 2)),
    ).toThrow(/no positive luminance delta/);
  });
});
