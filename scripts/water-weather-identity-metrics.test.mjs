import { describe, expect, it } from 'vitest';
import {
  evaluateWeatherIdentity,
  evaluateWeatherIdentitySeries,
  measureCloudLowerEdge,
  measureFoamSupport,
  measureRadialRings,
  measureSkyStreaks,
  toRec709Grayscale,
} from './water-weather-identity-metrics.mjs';

function makeFrame(width = 160, height = 136, color = [70, 105, 125, 255]) {
  const pixels = Buffer.alloc(width * height * 4);
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    pixels.set(color, pixel * 4);
  }
  return { width, height, bytesPerPixel: 4, pixels };
}

function setPixel(frame, x, y, color) {
  if (x < 0 || x >= frame.width || y < 0 || y >= frame.height) return;
  frame.pixels.set(color, (y * frame.width + x) * 4);
}

function paint(frame, predicate, color) {
  for (let y = 0; y < frame.height; y += 1) {
    for (let x = 0; x < frame.width; x += 1) {
      if (predicate(x, y)) setPixel(frame, x, y, color);
    }
  }
}

function structuredFrame() {
  const frame = makeFrame();
  paint(frame, (x, y) => y > 70 && ((x + Math.floor(y / 5)) % 23) < 9, [35, 80, 105, 255]);
  paint(frame, (x, y) => y < 65 && ((x * 3 + y * 5) % 37) < 4, [150, 175, 180, 255]);
  return frame;
}

function recolor(frame, transform) {
  const next = makeFrame(frame.width, frame.height);
  for (let pixel = 0; pixel < frame.width * frame.height; pixel += 1) {
    const offset = pixel * 4;
    const color = transform(
      frame.pixels[offset], frame.pixels[offset + 1], frame.pixels[offset + 2],
    );
    next.pixels.set([...color, 255], offset);
  }
  return next;
}

describe('weather identity metrics', () => {
  it('uses BT.709 luma for the grayscale evidence row', () => {
    const frame = makeFrame(1, 1, [255, 0, 0, 255]);
    expect([...toRec709Grayscale(frame).pixels]).toEqual([54, 54, 54, 255]);
  });

  it('requires long streak geometry so a short dot matrix cannot pass', () => {
    const dots = makeFrame();
    for (let y = 10; y < 66; y += 8) {
      for (let x = 8; x < 152; x += 9) setPixel(dots, x, y, [240, 245, 250, 255]);
    }
    expect(measureSkyStreaks(dots).qualifyingCount).toBe(0);

    const streaks = makeFrame();
    for (let origin = 8; origin < 150; origin += 18) {
      for (let step = 0; step < 12; step += 1) {
        setPixel(streaks, origin + Math.floor(step / 4), 10 + step, [240, 245, 250, 255]);
      }
    }
    expect(measureSkyStreaks(streaks).qualifyingCount).toBeGreaterThanOrEqual(6);

    const darkStreaks = makeFrame(160, 136, [205, 220, 225, 255]);
    for (let origin = 8; origin < 150; origin += 18) {
      for (let step = 0; step < 12; step += 1) {
        setPixel(darkStreaks, origin + Math.floor(step / 4), 10 + step, [45, 80, 95, 255]);
      }
    }
    expect(measureSkyStreaks(darkStreaks).qualifyingCount).toBeGreaterThanOrEqual(6);
  });

  it('requires annular angular support so random water splashes cannot pass as rings', () => {
    const splashes = makeFrame();
    let value = 17;
    for (let point = 0; point < 90; point += 1) {
      value = (value * 73 + 19) % 997;
      const x = 8 + (value % 144);
      value = (value * 73 + 19) % 997;
      const y = 72 + (value % 55);
      setPixel(splashes, x, y, [235, 245, 245, 255]);
    }
    expect(measureRadialRings(splashes).qualifyingCount).toBe(0);

    const rings = makeFrame();
    for (let angle = 0; angle < Math.PI * 2; angle += 0.055) {
      setPixel(
        rings,
        Math.round(82 + Math.cos(angle) * 18),
        Math.round(98 + Math.sin(angle) * 8),
        [235, 245, 245, 255],
      );
    }
    expect(measureRadialRings(rings).qualifyingCount).toBeGreaterThanOrEqual(1);

    const brokenRing = makeFrame();
    for (let angle = 0; angle < Math.PI * 2; angle += 0.035) {
      if (angle % 0.9 > 0.5) continue;
      setPixel(
        brokenRing,
        Math.round(84 + Math.cos(angle) * 14),
        Math.round(99 + Math.sin(angle) * 5),
        [235, 245, 245, 255],
      );
    }
    const brokenResult = measureRadialRings(brokenRing);
    expect(brokenResult.qualifyingCount).toBeGreaterThanOrEqual(1);
    expect(brokenResult.candidates.some((candidate) => candidate.kind === 'broken-ellipse')).toBe(true);

    const quietFrames = Array.from({ length: 8 }, () => makeFrame());
    const series = evaluateWeatherIdentitySeries({
      clear: quietFrames,
      rain: [brokenRing, ...quietFrames.slice(1)],
      storm: quietFrames,
    }, [1600, 2400, 3200, 4000, 4800, 5600, 6400, 7200]);
    expect(series.aggregation.medoids.rain.index).not.toBe(0);
    expect(series.gates.rainWaterRings).toBe(false);
  }, 10_000);

  it('requires a varying cloud lower edge so one rectangle cannot pass roughness', () => {
    const rectangle = makeFrame(160, 136, [165, 185, 195, 255]);
    paint(rectangle, (x, y) => x >= 10 && x <= 150 && y >= 15 && y <= 45,
      [55, 70, 80, 255]);
    expect(measureCloudLowerEdge(rectangle).passesShape).toBe(false);

    const clustered = makeFrame(160, 136, [165, 185, 195, 255]);
    paint(clustered, (x, y) => x >= 8 && x <= 152 && y >= 12
      && y <= 35 + Math.floor((Math.sin(x * 0.23) + Math.sin(x * 0.51)) * 5),
    [55, 70, 80, 255]);
    expect(measureCloudLowerEdge(clustered).passesShape).toBe(true);
  });

  it('requires spatially distributed bright foam support so uniform dark water fails', () => {
    const dark = makeFrame(160, 136, [14, 30, 40, 255]);
    expect(measureFoamSupport(dark).passesShape).toBe(false);

    const foam = makeFrame(160, 136, [25, 65, 80, 255]);
    for (let x = 4; x < 156; x += 1) {
      const y = 82 + Math.round(Math.sin(x * 0.22) * 5);
      for (let thickness = 0; thickness < 2; thickness += 1) {
        setPixel(foam, x, y + thickness, [220, 245, 235, 255]);
      }
    }
    expect(measureFoamSupport(foam).passesShape).toBe(true);
  });

  it('fails the overall structure gate for global hue-only and luma-only variants', () => {
    const clear = structuredFrame();
    const hueOnly = recolor(clear, (red, green, blue) => [blue, red, green]);
    const lumaOnly = recolor(clear, (red, green, blue) => [
      Math.min(255, red * 0.72 + 24),
      Math.min(255, green * 0.72 + 24),
      Math.min(255, blue * 0.72 + 24),
    ]);
    const result = evaluateWeatherIdentity({ clear, rain: hueOnly, storm: lumaOnly });
    expect(result.structure.pass).toBe(false);
    expect(result.pass).toBe(false);
  });

  it('recognizes spatial and orientation changes as structure rather than palette', () => {
    const clear = makeFrame();
    const rain = makeFrame();
    const storm = makeFrame();
    paint(clear, (x) => x % 20 < 5, [220, 225, 230, 255]);
    paint(rain, (_x, y) => y % 18 < 5, [220, 225, 230, 255]);
    paint(storm, (x, y) => (x + y) % 22 < 5, [220, 225, 230, 255]);
    expect(evaluateWeatherIdentity({ clear, rain, storm }).structure.pass).toBe(true);
  });
});
