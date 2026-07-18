import { describe, expect, it } from 'vitest';
import {
  compareFrames,
  hue,
  luma,
  measureRegion,
} from './water-qa-metrics.mjs';

function makeFrame(width, height, colors) {
  const pixels = Buffer.alloc(width * height * 4);

  for (let index = 0; index < width * height; index += 1) {
    const [r, g, b, a = 255] = colors[index];
    const offset = index * 4;
    pixels[offset] = r;
    pixels[offset + 1] = g;
    pixels[offset + 2] = b;
    pixels[offset + 3] = a;
  }

  return { width, height, bytesPerPixel: 4, pixels };
}

describe('water QA pixel metrics', () => {
  it('computes weighted luma from RGB channels', () => {
    expect(luma(0, 0, 0)).toBe(0);
    expect(luma(255, 255, 255)).toBeCloseTo(255, 10);
    expect(luma(255, 0, 0)).toBeCloseTo(54.213, 10);
    expect(luma(0, 255, 0)).toBeCloseTo(182.376, 10);
  });

  it('computes hue and a cyan color signature for a synthetic region', () => {
    expect(hue(255, 0, 0)).toBe(0);
    expect(hue(0, 255, 0)).toBe(120);
    expect(hue(0, 0, 255)).toBe(240);

    const cyan = [0, 128, 255];
    const frame = makeFrame(4, 4, Array.from({ length: 16 }, () => cyan));
    const metrics = measureRegion(frame, { x0: 0, x1: 1, y0: 0, y1: 1 }, 1);

    expect(metrics.hueMean).toBeCloseTo(hue(...cyan), 10);
    expect(metrics.colorSignature).toEqual({
      rMean: 0,
      gMean: 128,
      bMean: 255,
      hueMean: 209.88,
      saturationMean: 1,
      cyanBias: 0.751,
      warmCoolBias: -1,
    });
    expect(metrics.waterCoverage).toBe(1);
  });

  it('measures toon-band separation from synthetic luminance bands', () => {
    const colors = Array.from({ length: 100 }, (_, index) => {
      const value = index < 50 ? 20 : 220;
      return [value, value, value];
    });
    const frame = makeFrame(10, 10, colors);
    const metrics = measureRegion(frame, { x0: 0, x1: 1, y0: 0, y1: 1 }, 1);

    expect(metrics.lumaMean).toBeCloseTo(120, 10);
    expect(metrics.toonBandSeparation).toBeCloseTo(200, 10);
  });

  it('compares sampled RGB frame deltas', () => {
    const previous = makeFrame(2, 2, Array.from({ length: 4 }, () => [0, 0, 0]));
    const next = makeFrame(2, 2, [
      [30, 30, 30],
      [3, 6, 9],
      [0, 0, 0],
      [0, 0, 0],
    ]);

    expect(compareFrames(previous, next, 1)).toEqual({
      meanDelta: 9,
      strongRatio: 0.25,
      maxDelta: 30,
    });
  });
});
