import { describe, expect, it } from 'vitest';
import {
  assertExactVariantIds,
  median,
  nearestRankPercentile,
  ORB_PROFILE_VARIANTS,
  summarizeCadence,
} from './orb-profile-core.mjs';

describe('Orb profile statistics', () => {
  it('calculates odd/even medians and nearest-rank p95', () => {
    expect(median([9, 1, 5])).toBe(5);
    expect(median([9, 1, 5, 3])).toBe(4);
    expect(nearestRankPercentile(Array.from({ length: 20 }, (_, index) => index + 1), 0.95)).toBe(19);
  });

  it('summarizes raw rAF intervals without averaging reciprocal FPS', () => {
    expect(summarizeCadence([10, 20, 30, 40])).toEqual({
      intervalCount: 4,
      frameCount: 5,
      elapsedMs: 100,
      fps: 40,
      medianFrameTimeMs: 25,
      p95FrameTimeMs: 40,
    });
  });

  it('fails fast for empty, non-finite, or non-positive samples', () => {
    expect(() => median([])).toThrow('non-empty');
    expect(() => summarizeCadence([16, 0])).toThrow('finite positive');
    expect(() => nearestRankPercentile([16], Number.NaN)).toThrow('percentile');
  });

  it('requires the exact one-variable variant matrix', () => {
    const records = ORB_PROFILE_VARIANTS.map(({ id }) => ({ variant: id }));
    expect(() => assertExactVariantIds(records)).not.toThrow();
    expect(() => assertExactVariantIds(records.slice(1))).toThrow('exactly');
  });
});
