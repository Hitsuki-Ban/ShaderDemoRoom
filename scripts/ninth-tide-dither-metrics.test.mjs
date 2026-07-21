import { describe, expect, it } from 'vitest';
import {
  analyzeNearBlackRgba8,
  compareNearBlackDitherMetrics,
  NINTH_TIDE_MAX_MEAN_LUMA_SHIFT,
  NINTH_TIDE_NEAR_BLACK_LIMIT,
} from './ninth-tide-dither-metrics.mjs';

function rgbaFromLumaRows(rows) {
  return Uint8Array.from(rows.flatMap((row) => row.flatMap((code) => [code, code, code, 255])));
}

function analyzeLumaRows(rows, nearBlackMaxCode = NINTH_TIDE_NEAR_BLACK_LIMIT) {
  return analyzeNearBlackRgba8({
    rgba: rgbaFromLumaRows(rows),
    width: rows[0].length,
    height: rows.length,
    roi: { x: 0, y: 0, width: rows[0].length, height: rows.length },
    nearBlackMaxCode,
  });
}

describe('Ninth Tide near-black dither metrics', () => {
  it('uses integer luma codes and measures only the explicit ROI exactly', () => {
    const rgba = Uint8Array.from([
      200, 200, 200, 255, 10, 20, 30, 255, 1, 2, 3, 255,
      200, 200, 200, 255, 4, 4, 4, 255, 33, 0, 0, 255,
    ]);
    const metrics = analyzeNearBlackRgba8({
      rgba,
      width: 3,
      height: 2,
      roi: { x: 1, y: 0, width: 2, height: 2 },
      nearBlackMaxCode: 32,
    });

    expect(metrics.meanLumaCode).toBe(8);
    expect(metrics.roiPixels).toBe(4);
    expect(metrics.redHistogram).toHaveLength(256);
    expect(metrics.greenHistogram).toHaveLength(256);
    expect(metrics.blueHistogram).toHaveLength(256);
    expect(metrics.redHistogram[33]).toBe(1);
    expect(metrics.redHistogram[200]).toBe(0);
    expect(metrics.greenHistogram[0]).toBe(1);
    expect(metrics.blueHistogram[30]).toBe(1);
    expect(metrics.lumaNearBlackHistogram).toHaveLength(33);
    expect(metrics.lumaNearBlackHistogram[2]).toBe(1);
    expect(metrics.lumaNearBlackHistogram[4]).toBe(1);
    expect(metrics.lumaNearBlackHistogram[7]).toBe(1);
    expect(metrics.lumaNearBlackHistogram[19]).toBe(1);
    expect(metrics.occupiedNonzeroBins).toBe(4);
    expect(metrics.interiorEmptyBins).toBe(14);
    expect(metrics.maxInteriorZeroRun).toBe(11);
    expect(metrics.dominantNonzeroBinRatio).toBe(0.25);
    expect(metrics.equalHorizontalNearPairRatio).toBe(0);
    expect(metrics.longestHorizontalNearRun).toBe(1);
    expect(metrics.nonzeroNearPixels).toBe(4);
  });

  it('keeps bins above a lower explicit threshold empty and excludes zero from plateaus', () => {
    const metrics = analyzeLumaRows([[0, 2, 2, 9, 2]], 8);

    expect(metrics.meanLumaCode).toBe(3);
    expect(metrics.lumaNearBlackHistogram[0]).toBe(1);
    expect(metrics.lumaNearBlackHistogram[2]).toBe(3);
    expect(metrics.lumaNearBlackHistogram[9]).toBe(0);
    expect(metrics.nonzeroNearPixels).toBe(3);
    expect(metrics.dominantNonzeroBinRatio).toBe(1);
    expect(metrics.equalHorizontalNearPairRatio).toBe(1);
    expect(metrics.longestHorizontalNearRun).toBe(2);
  });

  it('fails fast on invalid dimensions, RGBA8 buffers, ROI values, and thresholds', () => {
    const valid = {
      rgba: new Uint8Array(16),
      width: 2,
      height: 2,
      roi: { x: 0, y: 0, width: 2, height: 2 },
      nearBlackMaxCode: 32,
    };

    expect(() => analyzeNearBlackRgba8({ ...valid, width: 0 })).toThrow(/width/);
    expect(() => analyzeNearBlackRgba8({ ...valid, rgba: new Uint8Array(15) })).toThrow(
      /exactly 16 bytes/,
    );
    expect(() => analyzeNearBlackRgba8({ ...valid, rgba: new Uint16Array(16) })).toThrow(
      /Uint8Array/,
    );
    expect(() => analyzeNearBlackRgba8({
      ...valid,
      roi: { x: 1, y: 0, width: 2, height: 2 },
    })).toThrow(/fully contained/);
    expect(() => analyzeNearBlackRgba8({
      ...valid,
      roi: { x: 0, y: 0, width: 2, height: 2, right: 2 },
    })).toThrow(/exactly x, y, width, and height/);
    expect(() => analyzeNearBlackRgba8({ ...valid, nearBlackMaxCode: undefined })).toThrow(
      /nearBlackMaxCode/,
    );
    expect(() => analyzeNearBlackRgba8({ ...valid, nearBlackMaxCode: 0 })).toThrow(
      /nearBlackMaxCode/,
    );
    expect(() => analyzeNearBlackRgba8({ ...valid, nearBlackMaxCode: 32.5 })).toThrow(
      /nearBlackMaxCode/,
    );
    expect(() => analyzeNearBlackRgba8({ ...valid, nearBlackMaxCode: 33 })).toThrow(
      /nearBlackMaxCode/,
    );
  });

  it('expresses histogram, plateau, and adjacent-equality improvements for dither', () => {
    const before = analyzeLumaRows([
      [4, 4, 4, 4, 8, 8, 8, 8],
      [4, 4, 4, 4, 8, 8, 8, 8],
    ]);
    const candidate = analyzeLumaRows([
      [2, 3, 4, 5, 7, 8, 9, 10],
      [10, 9, 8, 7, 5, 4, 3, 2],
    ]);
    const comparison = compareNearBlackDitherMetrics(before, candidate);

    expect(before.meanLumaCode).toBe(6);
    expect(before.occupiedNonzeroBins).toBe(2);
    expect(before.interiorEmptyBins).toBe(3);
    expect(before.maxInteriorZeroRun).toBe(3);
    expect(before.dominantNonzeroBinRatio).toBe(0.5);
    expect(before.equalHorizontalNearPairRatio).toBe(12 / 14);
    expect(before.longestHorizontalNearRun).toBe(4);

    expect(candidate.meanLumaCode).toBe(6);
    expect(candidate.occupiedNonzeroBins).toBe(8);
    expect(candidate.interiorEmptyBins).toBe(1);
    expect(candidate.maxInteriorZeroRun).toBe(1);
    expect(candidate.dominantNonzeroBinRatio).toBe(0.125);
    expect(candidate.equalHorizontalNearPairRatio).toBe(0);
    expect(candidate.longestHorizontalNearRun).toBe(1);

    expect(comparison).toMatchObject({
      meanLumaCodeShift: 0,
      absoluteMeanLumaCodeShift: 0,
      occupiedNonzeroBinsDelta: 6,
      interiorEmptyBinsDelta: -2,
      maxInteriorZeroRunDelta: -2,
      dominantNonzeroBinRatioDelta: -0.375,
      equalHorizontalNearPairRatioDelta: -(12 / 14),
      longestHorizontalNearRunDelta: -3,
      histogramCoverageImproved: true,
      plateauImproved: true,
      adjacentEqualsImproved: true,
      longestHorizontalRunImproved: true,
    });
  });

  it('allows exactly 0.5 code mean shift and rejects larger candidate drift', () => {
    const before = analyzeLumaRows([[4, 4]]);
    const atLimit = analyzeLumaRows([[4, 5]]);
    const beyondLimit = analyzeLumaRows([[5, 5]]);

    expect(compareNearBlackDitherMetrics(before, atLimit).absoluteMeanLumaCodeShift).toBe(
      NINTH_TIDE_MAX_MEAN_LUMA_SHIFT,
    );
    expect(() => compareNearBlackDitherMetrics(before, beyondLimit)).toThrow(
      /maximum is 0.5/,
    );
  });
});
