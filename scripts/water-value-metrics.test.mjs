import { describe, expect, it } from 'vitest';
import {
  aggregateCoverage,
  areaAverageResize,
  connectedComponents,
  encodedRec709Luma,
  fourBinCoverage,
  measureLandmarkSilhouette,
  measureRidgeMasks,
  measureSun,
  measureWaterMetrics,
  percentile,
  posterizeFrame,
} from './water-value-metrics.mjs';
import {
  LANDMARK_EXCLUSION_ROI,
  LANDMARK_TOWER_ROI,
  WATER_REGION_ROI,
} from './water-roi-contract.mjs';

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

  it('excludes landmark pixels from water measurements', () => {
    const baseline = makeFrame(100, 100, [120, 120, 120, 255]);
    const contaminated = makeFrame(100, 100, [120, 120, 120, 255]);
    paint(contaminated, (x, y) => (
      x >= 22 && x < 49 && y >= 16 && y < 97
    ), [0, 0, 0, 255]);
    const options = {
      inclusion: WATER_REGION_ROI,
      exclusion: LANDMARK_EXCLUSION_ROI,
      sampleScale: 1,
    };

    expect(measureWaterMetrics(contaminated, options)).toEqual(measureWaterMetrics(baseline, options));
  });

  it('does not detect a ridge inside the landmark exclusion', () => {
    const frame = makeFrame(100, 100, [20, 20, 20, 255]);
    paint(frame, (x, y) => y === 50 && x >= 25 && x <= 45, [120, 120, 120, 255]);
    const [ridge] = measureRidgeMasks(
      frame,
      { x0: 0, y0: 0, x1: 1, y1: 1 },
      [{ threshold: 10, area: 3, width: 3, aspect: 1 }],
      LANDMARK_EXCLUSION_ROI,
    );

    expect(ridge.pixelCount).toBe(0);
  });

  it('skips ridge samples whose vertical neighbors cross the exclusion boundary', () => {
    const frame = makeFrame(100, 100, [20, 20, 20, 255]);
    paint(frame, (x, y) => y === 15 && x >= 25 && x <= 45, [120, 120, 120, 255]);
    const [ridge] = measureRidgeMasks(
      frame,
      { x0: 0, y0: 0, x1: 1, y1: 1 },
      [{ threshold: 10, area: 3, width: 3, aspect: 1 }],
      LANDMARK_EXCLUSION_ROI,
    );

    expect(ridge.pixelCount).toBe(0);
  });

  it('still detects a ridge outside the landmark exclusion', () => {
    const frame = makeFrame(100, 100, [20, 20, 20, 255]);
    paint(frame, (x, y) => y === 50 && x >= 65 && x <= 85, [120, 120, 120, 255]);
    const [ridge] = measureRidgeMasks(
      frame,
      { x0: 0, y0: 0, x1: 1, y1: 1 },
      [{ threshold: 10, area: 3, width: 3, aspect: 1 }],
      LANDMARK_EXCLUSION_ROI,
    );

    expect(ridge.pixelCount).toBe(21);
  });

  it('measures a mutually exclusive weak transition beside a stronger foam core', () => {
    const frame = makeFrame(120, 100, [20, 20, 20, 255]);
    paint(frame, (x, y) => y === 40 && x >= 65 && x <= 94, [30, 30, 30, 255]);
    paint(frame, (x, y) => y === 40 && x >= 72 && x <= 87, [60, 60, 60, 255]);
    const [crest, foam] = measureRidgeMasks(
      frame,
      { x0: 0, y0: 0, x1: 1, y1: 1 },
      [
        {
          threshold: 5,
          area: 3,
          width: 3,
          aspect: 1,
          strongerBoundaryRadius: 1,
          strongerBoundaryMinimumNeighbors: 1,
        },
        { threshold: 15, area: 3, width: 3, aspect: 1 },
      ],
      LANDMARK_EXCLUSION_ROI,
    );

    expect(crest.pixelCount).toBe(2);
    expect(crest.mask[40 * frame.width + 71]).toBe(1);
    expect(crest.mask[40 * frame.width + 72]).toBe(0);
    expect(crest.mask[40 * frame.width + 87]).toBe(0);
    expect(crest.mask[40 * frame.width + 88]).toBe(1);
    expect(crest.median).toBeCloseTo(30, 10);
    expect(foam.pixelCount).toBe(16);
    expect(foam.median).toBeCloseTo(60, 10);
  });

  it('keeps the crest transition exclusive when a fully strong foam component is also present', () => {
    const frame = makeFrame(120, 100, [20, 20, 20, 255]);
    paint(frame, (x, y) => y === 40 && x >= 65 && x <= 94, [30, 30, 30, 255]);
    paint(frame, (x, y) => y === 40 && x >= 72 && x <= 87, [60, 60, 60, 255]);
    paint(frame, (x, y) => y === 60 && x >= 65 && x <= 94, [60, 60, 60, 255]);
    const [crest, foam] = measureRidgeMasks(
      frame,
      { x0: 0, y0: 0, x1: 1, y1: 1 },
      [
        {
          threshold: 5,
          area: 3,
          width: 3,
          aspect: 1,
          strongerBoundaryRadius: 1,
          strongerBoundaryMinimumNeighbors: 1,
        },
        { threshold: 15, area: 3, width: 3, aspect: 1 },
      ],
      LANDMARK_EXCLUSION_ROI,
    );

    expect(crest.pixelCount).toBe(2);
    expect(crest.mask[40 * frame.width + 71]).toBe(1);
    expect(crest.mask[40 * frame.width + 80]).toBe(0);
    expect(crest.median).toBeCloseTo(30, 10);
    expect(foam.pixelCount).toBe(46);
    expect(foam.median).toBeCloseTo(60, 10);
    for (let pixel = 0; pixel < crest.mask.length; pixel += 1) {
      expect(crest.mask[pixel] && foam.mask[pixel]).toBeFalsy();
    }
  });

  it('measures a tower component with deep roof and beacon core while excluding halo', () => {
    const frame = makeFrame(400, 300, [190, 190, 190, 255]);
    paint(frame, (x, y) => x >= 125 && x <= 155 && y >= 60 && y <= 145,
      [205, 205, 205, 255]);
    paint(frame, (x, y) => x >= 120 && x <= 160 && y >= 60 && y <= 68,
      [35, 58, 82, 255]);
    paint(frame, (x, y) => (x - 140) ** 2 + (y - 70) ** 2 <= 5 ** 2,
      [210, 120, 40, 255]);
    paint(frame, (x, y) => x >= 146
      && (x - 140) ** 2 + (y - 70) ** 2 <= 9 ** 2
      && (x - 140) ** 2 + (y - 70) ** 2 > 5 ** 2, [245, 235, 220, 255]);
    paint(frame, (x, y) => x >= 114 && x <= 165 && y >= 150 && y <= 157,
      [45, 45, 45, 255]);

    const landmark = measureLandmarkSilhouette(frame, LANDMARK_TOWER_ROI);
    expect(landmark.bbox).not.toBeNull();
    expect(landmark.bbox.y).toBe(60);
    expect(landmark.bbox.height).toBe(86);
    expect(landmark.towerHeightRatio).toBeCloseTo(0.287, 2);
    expect(landmark.widthRatio).toBeLessThanOrEqual(0.14);
    expect(landmark.supportAt160).toBeGreaterThanOrEqual(64);
    expect(landmark.localContrastP10).toBeGreaterThanOrEqual(12);
    expect(landmark.mask[60 * frame.width + 120]).toBe(1);
    expect(landmark.mask[100 * frame.width + 140]).toBe(1);
    expect(landmark.mask[70 * frame.width + 140]).toBe(1);
    expect(landmark.mask[70 * frame.width + 148]).toBe(0);
  });

  it('measures a tower whose center has drifted within the landmark ROI', () => {
    const frame = makeFrame(400, 300, [190, 190, 190, 255]);
    paint(frame, (x, y) => x >= 143 && x <= 167 && y >= 60 && y <= 145,
      [205, 205, 205, 255]);
    paint(frame, (x, y) => x >= 137 && x <= 170 && y >= 60 && y <= 68,
      [35, 58, 82, 255]);
    paint(frame, (x, y) => (x - 155) ** 2 + (y - 70) ** 2 <= 5 ** 2,
      [210, 120, 40, 255]);

    const landmark = measureLandmarkSilhouette(frame, LANDMARK_TOWER_ROI);
    expect(landmark.bbox).not.toBeNull();
    expect(landmark.bbox.y).toBe(60);
    expect(landmark.bbox.height).toBe(86);
    expect(landmark.mask[100 * frame.width + 155]).toBe(1);
    expect(landmark.mask[100 * frame.width + 140]).toBe(0);
  });

  it('does not combine spatially separate body, beacon, and roof features', () => {
    const frame = makeFrame(400, 300, [190, 190, 190, 255]);
    paint(frame, (x, y) => x >= 145 && x <= 165 && y >= 76 && y <= 145,
      [205, 205, 205, 255]);
    paint(frame, (x, y) => x >= 125 && x <= 141 && y >= 60 && y <= 68,
      [35, 58, 82, 255]);
    paint(frame, (x, y) => (x - 133) ** 2 + (y - 70) ** 2 <= 5 ** 2,
      [210, 120, 40, 255]);

    const landmark = measureLandmarkSilhouette(frame, LANDMARK_TOWER_ROI);
    expect(landmark.area).toBe(0);
    expect(landmark.bbox).toBeNull();
    expect(landmark.supportAt160).toBe(0);
  });

  it('rejects a stable gray tower and warm beacon when the dark roof cap is absent', () => {
    const frame = makeFrame(400, 300, [190, 190, 190, 255]);
    paint(frame, (x, y) => x >= 125 && x <= 155 && y >= 76 && y <= 145,
      [205, 205, 205, 255]);
    paint(frame, (x, y) => (x - 140) ** 2 + (y - 70) ** 2 <= 5 ** 2,
      [210, 120, 40, 255]);

    const landmark = measureLandmarkSilhouette(frame, LANDMARK_TOWER_ROI);
    expect(landmark.area).toBe(0);
    expect(landmark.bbox).toBeNull();
    expect(landmark.supportAt160).toBe(0);
  });

  it('rejects rows where a qualifying background fills the entire tower ROI', () => {
    const frame = makeFrame(400, 300, [190, 190, 190, 255]);
    paint(frame, (x, y) => x >= 112 && x < 172 && y >= 54 && y < 159,
      [205, 205, 205, 255]);

    const landmark = measureLandmarkSilhouette(frame, LANDMARK_TOWER_ROI);
    expect(landmark.area).toBe(0);
    expect(landmark.bbox).toBeNull();
    expect(landmark.widthRatio).toBe(0);
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
