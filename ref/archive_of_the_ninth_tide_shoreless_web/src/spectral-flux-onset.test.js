import { describe, expect, it } from 'vitest';

import {
  createMediaTimeDeltaTracker,
  createSpectralFluxOnsetDetector,
} from './spectral-flux-onset.js';

const config = {
  historySeconds: 0.5,
  warmupSeconds: 0.3,
  thresholdStdDeviations: 1.5,
  lowpassLambda: 120,
  minFlux: 0.002,
  minSamples: 6,
};

function createDetector(overrides = {}) {
  return createSpectralFluxOnsetDetector({ ...config, ...overrides });
}

function update(detector, spectrum, dt = 0.05, selectedPath = 'full', bandStartIndex = 2) {
  return detector.update(Uint8Array.from(spectrum), dt, { selectedPath, bandStartIndex });
}

function warm(detector, spectrum = [20, 20, 20, 20]) {
  for (let index = 0; index < 14; index++) update(detector, spectrum);
}

describe('spectral flux onset detector', () => {
  it('stays quiet for a steady spectrum', () => {
    const detector = createDetector();
    const results = [];
    for (let index = 0; index < 30; index++) results.push(update(detector, [24, 24, 24, 24]));
    expect(results.every((result) => !result.onset)).toBe(true);
    expect(results.at(-1).full.warmed).toBe(true);
  });

  it('confirms a broadband local maximum one frame later', () => {
    const detector = createDetector();
    warm(detector);
    expect(update(detector, [90, 90, 90, 90]).onset).toBe(false);
    const confirmed = update(detector, [30, 30, 30, 30]);
    expect(confirmed.onset).toBe(true);
    expect(confirmed.selectedPath).toBe('full');
    expect(confirmed.strength).toBeGreaterThan(0);
  });

  it('lets chapter selection use the independently-thresholded high-pass path', () => {
    const detector = createDetector({ minFlux: 0.2 });
    warm(detector);
    update(detector, [20, 20, 100, 100], 0.05, 'full');
    const full = update(detector, [20, 20, 20, 20], 0.05, 'full');
    expect(full.onset).toBe(false);

    detector.reset();
    warm(detector);
    update(detector, [20, 20, 100, 100], 0.05, 'band');
    const band = update(detector, [20, 20, 20, 20], 0.05, 'band');
    expect(band.onset).toBe(true);
    expect(band.band.flux).toBeGreaterThan(band.full.flux);
  });

  it('selects only the first sample of a flat-topped peak', () => {
    const detector = createDetector({ lowpassLambda: 1e9 });
    warm(detector);
    const first = update(detector, [100, 100, 100, 100]);
    const plateau = update(detector, [180, 180, 180, 180]);
    const falling = update(detector, [180, 180, 180, 180]);
    expect([first.onset, plateau.onset, falling.onset]).toEqual([false, true, false]);
  });

  it('re-primes after reset or a spectrum length change', () => {
    const detector = createDetector();
    warm(detector);
    update(detector, [100, 100, 100, 100]);
    detector.reset();
    expect(update(detector, [20, 20, 20, 20]).primed).toBe(false);
    expect(update(detector, [20, 20, 20, 20, 20], 0.05, 'full', 2).primed).toBe(false);
  });

  it('uses elapsed time rather than a fixed frame count for warmup', () => {
    const fast = createDetector({ minSamples: 4 });
    const slow = createDetector({ minSamples: 4 });
    for (let index = 0; index < 9; index++) update(fast, [20, 20, 20, 20], 0.05);
    for (let index = 0; index < 5; index++) update(slow, [20, 20, 20, 20], 0.1);
    expect(fast.update(Uint8Array.from([20, 20, 20, 20]), 0.05, {
      selectedPath: 'full', bandStartIndex: 2,
    }).full.warmed).toBe(true);
    expect(slow.update(Uint8Array.from([20, 20, 20, 20]), 0.1, {
      selectedPath: 'full', bandStartIndex: 2,
    }).full.warmed).toBe(true);
  });

  it('warms when the history and warmup durations are equal', () => {
    const detector = createDetector({ historySeconds: 0.3, warmupSeconds: 0.3, minSamples: 4 });
    let result;
    for (let index = 0; index < 8; index++) result = update(detector, [20, 20, 20, 20], 0.05);
    expect(result.full.warmed).toBe(true);
  });

  it('fails fast for invalid configuration and update semantics', () => {
    expect(() => createSpectralFluxOnsetDetector({ ...config, minFlux: 0 })).toThrow(/minFlux/);
    const detector = createDetector();
    expect(() => detector.update([1, 2, 3], 0.05, {
      bandStartIndex: 1, selectedPath: 'full',
    })).toThrow(/Uint8Array/);
    expect(() => update(detector, [1, 2, 3], 0.05, 'legacy', 1)).toThrow(/selectedPath/);
    expect(() => update(detector, [1, 2, 3], 0.05, 'full', 3)).toThrow(/bandStartIndex/);
  });
});

describe('media time delta tracker', () => {
  it('does not advance while a quantized or buffering media clock is stationary', () => {
    const tracker = createMediaTimeDeltaTracker();
    expect([0, 0, 0, 0.1].map((time) => tracker.advance(time))).toEqual([0, 0, 0, 0.1]);
  });

  it('re-anchors without emitting elapsed time after reset or a backward jump', () => {
    const tracker = createMediaTimeDeltaTracker();
    expect(tracker.advance(2)).toBe(0);
    expect(tracker.advance(2.25)).toBe(0.25);
    expect(tracker.advance(1)).toBe(0);
    expect(tracker.advance(1.1)).toBeCloseTo(0.1);
    tracker.reset();
    expect(tracker.advance(4)).toBe(0);
    expect(() => tracker.advance(Number.NaN)).toThrow(/currentTime/);
  });
});
