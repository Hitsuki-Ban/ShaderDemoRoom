import { describe, expect, it } from 'vitest';
import {
  mapMediaTimeToVisualScore,
  mapVisualScoreTimeToEndingShutdown,
} from './visual-score-clock.js';

describe('Ninth Tide visual score clock', () => {
  it('normalizes long media across the complete visual score', () => {
    expect(mapMediaTimeToVisualScore(300, 600, 354.504)).toBeCloseTo(177.252, 12);
    expect(mapMediaTimeToVisualScore(600, 600, 354.504)).toBeCloseTo(354.504, 12);
  });

  it('normalizes short media across the complete visual score', () => {
    expect(mapMediaTimeToVisualScore(60, 120, 354.504)).toBeCloseTo(177.252, 12);
    expect(mapMediaTimeToVisualScore(120, 120, 354.504)).toBeCloseTo(354.504, 12);
  });

  it('bounds browser media-time overshoot at the score ending', () => {
    expect(mapMediaTimeToVisualScore(600.001, 600, 354.504)).toBeCloseTo(354.504, 12);
  });

  it('keeps a 120 second custom track out of withdrawal until the score ending window', () => {
    const mediaDuration = 120;
    const scoreDuration = 354.504;
    const shutdownAt = (mediaTime) => mapVisualScoreTimeToEndingShutdown(
      mapMediaTimeToVisualScore(mediaTime, mediaDuration, scoreDuration),
      scoreDuration,
    );

    expect(shutdownAt(106.4)).toBe(0);
    expect(shutdownAt(330.0484 / scoreDuration * mediaDuration)).toBe(0);
    expect(shutdownAt((scoreDuration - 13.6) / scoreDuration * mediaDuration)).toBeCloseTo(0, 12);
    expect(shutdownAt(116)).toBeGreaterThan(0.018);
    expect(shutdownAt(mediaDuration)).toBe(1);
  });

  it.each([
    [-1, 600, 354.504],
    [Number.NaN, 600, 354.504],
    [0, 0, 354.504],
    [0, Number.POSITIVE_INFINITY, 354.504],
    [0, 600, 0],
  ])('fails fast for invalid clock input %#', (mediaTime, mediaDuration, scoreDuration) => {
    expect(() => mapMediaTimeToVisualScore(mediaTime, mediaDuration, scoreDuration)).toThrow(RangeError);
  });

  it.each([
    [-1, 354.504, 13.6],
    [Number.NaN, 354.504, 13.6],
    [0, 0, 13.6],
    [0, 354.504, 0],
    [0, 354.504, 354.505],
  ])('fails fast for invalid withdrawal input %#', (visualScoreTime, scoreDuration, withdrawalSpan) => {
    expect(() => mapVisualScoreTimeToEndingShutdown(
      visualScoreTime,
      scoreDuration,
      withdrawalSpan,
    )).toThrow(RangeError);
  });
});
