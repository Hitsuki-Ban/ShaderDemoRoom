import { describe, expect, it } from 'vitest';
import {
  aggregateCoverage,
  areaAverageResize,
  connectedComponents,
  encodedRec709Luma,
  fourBinCoverage,
  measureSun,
  percentile,
  posterizeFrame,
} from './water-value-metrics.mjs';

function makeFrame(width, height, color = [30, 80, 100, 255]) {
  const pixels = Buffer.alloc(width * height * 4);
  for (let pixel = 0; pixel < width * height; pixel += 1) pixels.set(color, pixel * 4);
  return { width, height, bytesPerPixel: 4, pixels };
}

function paint(frame, predicate, color) {
  for (let y = 0; y < frame.height; y += 1) {
    for (let x = 0; x < frame.width; x += 1) {
      if (predicate(x, y)) frame.pixels.set(color, (y * frame.width + x) * 4);
    }
  }
  return frame;
}

function sunFixture(predicate, background = [185, 195, 205, 255]) {
  return paint(makeFrame(160, 120, background), predicate, [255, 216, 155, 255]);
}

describe('water value metrics', () => {
  it('uses encoded Rec.709 Y prime without linearizing byte channels', () => {
    expect(encodedRec709Luma(255, 0, 0)).toBeCloseTo(54.213, 10);
    expect(encodedRec709Luma(0, 255, 0)).toBeCloseTo(182.376, 10);
    expect(encodedRec709Luma(0x2b, 0x72, 0x7b)).toBeCloseTo(99.6, 1);
  });

  it('interpolates percentiles and aggregates the tenth percentile per bin', () => {
    expect(percentile([0, 10, 20, 30], 0.1)).toBeCloseTo(3, 10);
    expect(percentile([30, 0, 20, 10], 0.5)).toBe(15);
    const coverage = aggregateCoverage([
      [0.05, 0.1, 0.2, 0.65],
      [0.1, 0.2, 0.3, 0.4],
    ]);
    expect(coverage[0]).toBeCloseTo(0.055, 10);
    expect(coverage[1]).toBeCloseTo(0.11, 10);
    expect(coverage[2]).toBeCloseTo(0.21, 10);
    expect(coverage[3]).toBeCloseTo(0.425, 10);
  });

  it('classifies all four fixed luma bins', () => {
    const frame = makeFrame(4, 1);
    [0, 64, 128, 192].forEach((value, index) => {
      frame.pixels.set([value, value, value, 255], index * 4);
    });
    expect(fourBinCoverage(frame)).toEqual([0.25, 0.25, 0.25, 0.25]);
  });

  it('finds diagonally connected pixels as one component', () => {
    const mask = new Uint8Array([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ]);
    expect(connectedComponents(mask, 3, 3)).toHaveLength(1);
    expect(connectedComponents(mask, 3, 3)[0].area).toBe(3);
  });

  it('accepts a synthetic warm circle with stable hull circularity', () => {
    const frame = sunFixture((x, y) => (x - 55) ** 2 + (y - 22) ** 2 <= 14 ** 2);
    const sun = measureSun(frame);
    expect(sun.area).toBeGreaterThanOrEqual(100);
    expect(sun.aspectRatio).toBeGreaterThanOrEqual(0.8);
    expect(sun.aspectRatio).toBeLessThanOrEqual(1.25);
    expect(sun.circularity).toBeGreaterThanOrEqual(0.75);
    expect(sun.solidity).toBeGreaterThanOrEqual(0.78);
    expect(sun.verticalRunRatio).toBeLessThanOrEqual(1.5);
  });

  it('rejects a synthetic ellipse by aspect ratio', () => {
    const sun = measureSun(sunFixture(
      (x, y) => ((x - 55) / 24) ** 2 + ((y - 22) / 10) ** 2 <= 1,
    ));
    expect(sun.aspectRatio).toBeGreaterThan(1.25);
  });

  it('rejects a synthetic vertical light bar by aspect and vertical run', () => {
    const sun = measureSun(sunFixture((x, y) => x >= 50 && x <= 59 && y >= 3 && y <= 50));
    expect(sun.aspectRatio).toBeLessThan(0.8);
    expect(sun.verticalRunRatio).toBeGreaterThan(1.5);
  });

  it('separates a warm disk from a broad low-contrast halo', () => {
    const frame = sunFixture(() => false);
    paint(frame, (x, y) => (x - 55) ** 2 + (y - 22) ** 2 <= 25 ** 2, [195, 199, 195, 255]);
    paint(frame, (x, y) => (x - 55) ** 2 + (y - 22) ** 2 <= 13 ** 2, [255, 216, 155, 255]);
    const sun = measureSun(frame);
    expect(sun.bbox.width).toBe(27);
    expect(sun.bbox.height).toBe(27);
  });

  it('rejects a broken disk through convex-hull solidity', () => {
    const sun = measureSun(sunFixture((x, y) => {
      const distance = Math.hypot(x - 55, y - 22);
      return distance <= 18 && !(x >= 55 && y <= 22) && distance >= 7;
    }));
    expect(sun.solidity).toBeLessThan(0.78);
  });

  it('area-averages before applying the four thumbnail levels', () => {
    const frame = makeFrame(2, 2);
    frame.pixels.set([0, 0, 0, 255], 0);
    frame.pixels.set([64, 64, 64, 255], 4);
    frame.pixels.set([128, 128, 128, 255], 8);
    frame.pixels.set([192, 192, 192, 255], 12);
    const resized = areaAverageResize(frame, 1, 1);
    expect([...resized.pixels]).toEqual([96, 96, 96, 255]);
    expect([...posterizeFrame(resized).frame.pixels]).toEqual([85, 85, 85, 255]);
  });
});
