import { describe, expect, it } from 'vitest';
import {
  measureNearBlackContrastRgba8,
  NINTH_TIDE_VISIBLE_CONTRAST_THRESHOLD,
} from './ninth-tide-near-black-metrics.mjs';

function rgbaFrame(width, height, paint) {
  const rgba = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      rgba.set(paint(x, y), (y * width + x) * 4);
    }
  }
  return rgba;
}

function measure(rgba, width, height, rect, background = { red: 0, green: 0, blue: 0 }) {
  return measureNearBlackContrastRgba8({ rgba, width, height, rect, background });
}

function grayContrastOnBlack(code) {
  const encoded = code / 255;
  const linear = encoded <= 0.04045
    ? encoded / 12.92
    : ((encoded + 0.055) / 1.055) ** 2.4;
  return (linear + 0.05) / 0.05;
}

describe('Ninth Tide near-black contrast metrics', () => {
  it('measures only the explicit rectangle against the sampled background', () => {
    const rgba = rgbaFrame(4, 2, (x, y) => {
      const codes = [255, 0, 255, 255, 255, 90, 32, 255];
      const code = codes[y * 4 + x];
      return [code, code, code, 255];
    });
    const metrics = measure(rgba, 4, 2, { x: 1, y: 0, width: 2, height: 2 });

    expect(metrics.rect).toEqual({ x: 1, y: 0, width: 2, height: 2 });
    expect(metrics.background).toEqual({ red: 0, green: 0, blue: 0 });
    expect(metrics.pixelCount).toBe(4);
    expect(metrics.visibleContrastThreshold).toBe(NINTH_TIDE_VISIBLE_CONTRAST_THRESHOLD);
    expect(metrics.visiblePixelCount).toBe(3);
    expect(metrics.visiblePixelRatio).toBe(3 / 4);
    expect(metrics.atLeast3PixelCount).toBe(2);
    expect(metrics.atLeast3Ratio).toBe(1 / 2);
    expect(metrics.atLeast4_5PixelCount).toBe(1);
    expect(metrics.atLeast4_5Ratio).toBe(1 / 4);
    expect(metrics.contrastP90).toBe(21);
    expect(metrics.contrastP99).toBe(21);
    expect(metrics.contrastMax).toBe(21);
  });

  it('composites alpha over the background before measuring contrast', () => {
    const rgba = Uint8Array.from([
      255, 255, 255, 0,
      255, 255, 255, 64,
      255, 255, 255, 128,
    ]);
    const metrics = measure(rgba, 3, 1, { x: 0, y: 0, width: 3, height: 1 });

    expect(metrics.visiblePixelCount).toBe(2);
    expect(metrics.visiblePixelRatio).toBe(2 / 3);
    expect(metrics.atLeast3PixelCount).toBe(1);
    expect(metrics.atLeast4_5PixelCount).toBe(1);
    expect(metrics.contrastMax).toBeCloseTo(5.317210002277984, 12);
    expect(metrics.contrastP90).toBe(metrics.contrastMax);
    expect(metrics.contrastP99).toBe(metrics.contrastMax);
  });

  it('reports P90, P99, and maximum from sorted visible contrasts', () => {
    const rgba = rgbaFrame(200, 1, (x) => {
      const code = x + 32;
      return [code, code, code, 255];
    });
    const metrics = measure(rgba, 200, 1, { x: 0, y: 0, width: 200, height: 1 });

    expect(metrics.visiblePixelCount).toBe(200);
    expect(metrics.contrastP90).toBe(grayContrastOnBlack(212));
    expect(metrics.contrastP99).toBe(grayContrastOnBlack(230));
    expect(metrics.contrastMax).toBe(grayContrastOnBlack(231));
    expect(metrics.contrastP90).toBeLessThan(metrics.contrastP99);
    expect(metrics.contrastP99).toBeLessThan(metrics.contrastMax);
  });

  it('uses visible contrasts for percentiles and returns explicit zeroes when none are visible', () => {
    const background = { red: 8, green: 12, blue: 16 };
    const invisible = Uint8Array.from([
      8, 12, 16, 255,
      255, 255, 255, 0,
    ]);
    const metrics = measure(
      invisible,
      2,
      1,
      { x: 0, y: 0, width: 2, height: 1 },
      background,
    );

    expect(metrics.visiblePixelCount).toBe(0);
    expect(metrics.visiblePixelRatio).toBe(0);
    expect(metrics.atLeast3PixelCount).toBe(0);
    expect(metrics.atLeast3Ratio).toBe(0);
    expect(metrics.atLeast4_5PixelCount).toBe(0);
    expect(metrics.atLeast4_5Ratio).toBe(0);
    expect(metrics.contrastP90).toBe(0);
    expect(metrics.contrastP99).toBe(0);
    expect(metrics.contrastMax).toBe(0);
  });

  it('fails fast on invalid input shape, dimensions, RGBA8 data, and rectangles', () => {
    const valid = {
      rgba: new Uint8Array(16),
      width: 2,
      height: 2,
      rect: { x: 0, y: 0, width: 2, height: 2 },
      background: { red: 0, green: 0, blue: 0 },
    };

    expect(() => measureNearBlackContrastRgba8(null)).toThrow(/input must be an object/);
    expect(
      () => measureNearBlackContrastRgba8({ ...valid, threshold: 1.05 }),
    ).toThrow(/input must contain exactly/);
    expect(() => measureNearBlackContrastRgba8({ ...valid, width: 0 })).toThrow(/width/);
    expect(
      () => measureNearBlackContrastRgba8({ ...valid, rgba: new Uint16Array(16) }),
    ).toThrow(/Uint8Array/);
    expect(
      () => measureNearBlackContrastRgba8({ ...valid, rgba: new Uint8Array(15) }),
    ).toThrow(/exactly 16 bytes/);
    expect(
      () => measureNearBlackContrastRgba8({
        ...valid,
        rect: { x: 1, y: 0, width: 2, height: 2 },
      }),
    ).toThrow(/fully contained/);
    expect(
      () => measureNearBlackContrastRgba8({
        ...valid,
        rect: { x: 0, y: 0, width: 2, height: 2, right: 2 },
      }),
    ).toThrow(/rect must contain exactly/);
  });

  it('fails fast on invalid background samples', () => {
    const valid = {
      rgba: new Uint8Array(4),
      width: 1,
      height: 1,
      rect: { x: 0, y: 0, width: 1, height: 1 },
      background: { red: 0, green: 0, blue: 0 },
    };

    expect(
      () => measureNearBlackContrastRgba8({ ...valid, background: [0, 0, 0] }),
    ).toThrow(/background must be an object/);
    expect(
      () => measureNearBlackContrastRgba8({
        ...valid,
        background: { red: 0, green: 0, blue: 0, alpha: 255 },
      }),
    ).toThrow(/background must contain exactly/);
    expect(
      () => measureNearBlackContrastRgba8({
        ...valid,
        background: { red: 0, green: 0, blue: 255.5 },
      }),
    ).toThrow(/background.blue/);
    expect(
      () => measureNearBlackContrastRgba8({
        ...valid,
        background: { red: -1, green: 0, blue: 0 },
      }),
    ).toThrow(/background.red/);
  });
});
