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

function foamFrame(bands, background, crest) {
  const frame = makeFrame(160, 136, background);
  for (const baseY of bands) {
    for (let x = 4; x < 156; x += 1) {
      const y = baseY + Math.round(Math.sin(x * 0.22) * 5);
      for (let thickness = 0; thickness < 2; thickness += 1) {
        setPixel(frame, x, y + thickness, crest);
      }
    }
  }
  return frame;
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

  it('requires impact-local annular support so connected splashes cannot pass as rings', () => {
    const water = [70, 90, 90, 255];
    const ripple = [70, 115, 145, 255];
    const splashes = makeFrame(160, 136, water);
    let value = 17;
    for (let point = 0; point < 90; point += 1) {
      value = (value * 73 + 19) % 997;
      const x = 8 + (value % 144);
      value = (value * 73 + 19) % 997;
      const y = 72 + (value % 55);
      setPixel(splashes, x, y, ripple);
    }
    expect(measureRadialRings(splashes).qualifyingCount).toBe(0);

    const connectedSplashes = makeFrame(160, 136, water);
    value = 46;
    for (let point = 0; point < 90; point += 1) {
      value = (value * 73 + 19) % 997;
      const x = 7 + (value % 37);
      value = (value * 73 + 19) % 997;
      const y = 65 + (value % 44);
      setPixel(connectedSplashes, x, y, ripple);
      setPixel(connectedSplashes, x + 1, y, ripple);
    }
    expect(measureRadialRings(connectedSplashes).qualifyingCount).toBe(0);

    const ordinaryWaves = makeFrame(160, 136, water);
    paint(ordinaryWaves, (_x, y) => y >= 72 && y % 9 < 2, ripple);
    expect(measureRadialRings(ordinaryWaves).qualifyingCount).toBe(0);

    // Abstract the final-v9 Clear ring-like crest that appeared away from the shader impact.
    const clearLikeRing = makeFrame(160, 136, water);
    const clearCrest = [70, 115, 145, 255];
    for (let angle = 0; angle < Math.PI * 2; angle += 0.035) {
      if (angle % 0.8 > 0.45) continue;
      setPixel(
        clearLikeRing,
        Math.round(84 + Math.cos(angle) * 8),
        Math.round(99 + Math.sin(angle) * 4),
        clearCrest,
      );
    }
    expect(measureRadialRings(clearLikeRing).qualifyingCount).toBe(0);

    const impactRing = makeFrame(160, 136, water);
    for (let angle = 0; angle < Math.PI * 2; angle += 0.035) {
      if (angle % 0.8 > 0.45) continue;
      setPixel(
        impactRing,
        Math.round(14 + Math.cos(angle) * 8),
        Math.round(78 + Math.sin(angle) * 4),
        ripple,
      );
    }
    const impactResult = measureRadialRings(impactRing);
    expect(impactResult.qualifyingCount).toBeGreaterThanOrEqual(1);
    expect(impactResult.candidates.every((candidate) => candidate.kind === 'impact-ring')).toBe(true);

    const strongerImpactRing = makeFrame(160, 136, water);
    for (let angle = 0; angle < Math.PI * 2; angle += 0.035) {
      if (angle % 0.8 > 0.45) continue;
      for (const widthOffset of [-1, 0, 1]) {
        setPixel(
          strongerImpactRing,
          Math.round(14 + Math.cos(angle) * (8 + widthOffset)),
          Math.round(78 + Math.sin(angle) * (4 + widthOffset * 0.4)),
          ripple,
        );
      }
    }
    expect(measureRadialRings(strongerImpactRing).supportPixels)
      .toBeGreaterThan(impactResult.supportPixels);

    const quietFrames = Array.from({ length: 8 }, () => makeFrame());
    const series = evaluateWeatherIdentitySeries({
      clear: quietFrames,
      rain: [impactRing, ...quietFrames.slice(1)],
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

  it('measures whitecaps above the frame water median so uniform brightness shifts cancel', () => {
    const dark = makeFrame(160, 136, [14, 30, 40, 255]);
    const bright = makeFrame(160, 136, [210, 220, 225, 255]);
    expect(measureFoamSupport(dark).passesArea).toBe(false);
    expect(measureFoamSupport(bright).passesArea).toBe(false);

    const darkFoam = foamFrame([82], [30, 30, 30, 255], [110, 110, 110, 255]);
    const brightFoam = foamFrame([82], [150, 150, 150, 255], [230, 230, 230, 255]);
    const darkResult = measureFoamSupport(darkFoam);
    const brightResult = measureFoamSupport(brightFoam);
    expect(darkResult.passesArea).toBe(true);
    expect(brightResult.supportPixels).toBe(darkResult.supportPixels);
    expect(brightResult.waterMedianLuma - darkResult.waterMedianLuma).toBeCloseTo(120);
  });

  it('requires Storm foam support to increase over aligned Clear support', () => {
    const background = [25, 65, 80, 255];
    const crest = [220, 245, 235, 255];
    const noWhitecaps = makeFrame(160, 136, background);
    const clear = foamFrame([82], background, crest);
    const strongerStorm = foamFrame([82, 105], background, crest);
    const sampleTimesMs = [1600, 2400, 3200];
    const repeated = (frame) => [frame, frame, frame];

    const absent = evaluateWeatherIdentity({
      clear: noWhitecaps,
      rain: noWhitecaps,
      storm: noWhitecaps,
    });
    expect(absent.cues.storm.foam.passesArea).toBe(false);
    expect(absent.gates.stormFoam).toBe(false);

    const noGain = evaluateWeatherIdentitySeries({
      clear: repeated(clear),
      rain: repeated(clear),
      storm: repeated(clear),
    }, sampleTimesMs);
    expect(noGain.cues.storm.foam.passRate).toBe(1);
    expect(noGain.comparisons.stormFoamSupportRatioMinusClear.p25).toBe(0);
    expect(noGain.gates.stormFoam).toBe(false);

    const gain = evaluateWeatherIdentitySeries({
      clear: repeated(clear),
      rain: repeated(clear),
      storm: repeated(strongerStorm),
    }, sampleTimesMs);
    expect(gain.comparisons.stormFoamSupportRatioMinusClear.p25).toBeGreaterThan(0);
    expect(gain.gates.stormFoam).toBe(true);
  }, 10_000);

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
