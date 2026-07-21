import { describe, expect, it } from 'vitest';
import { mapMediaTimeToVisualScore } from './visual-score-clock.js';

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

  it.each([
    [-1, 600, 354.504],
    [Number.NaN, 600, 354.504],
    [0, 0, 354.504],
    [0, Number.POSITIVE_INFINITY, 354.504],
    [0, 600, 0],
  ])('fails fast for invalid clock input %#', (mediaTime, mediaDuration, scoreDuration) => {
    expect(() => mapMediaTimeToVisualScore(mediaTime, mediaDuration, scoreDuration)).toThrow(RangeError);
  });
});
