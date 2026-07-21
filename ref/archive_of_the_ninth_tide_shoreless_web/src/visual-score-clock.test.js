import { describe, expect, it } from 'vitest';
import {
  advanceEndingState,
  mapMediaTimeToVisualScore,
  mapSilentElapsedToVisualScore,
  mapVisualScoreTimeToEndingShutdown,
} from './visual-score-clock.js';

const scoreDuration = 354.504;
const silentDuration = 118;
const initialEndingState = Object.freeze({
  shutdown: 0,
  started: false,
  cueCursor: 0,
  finished: false,
});

function scoreTimeAtWithdrawalFraction(fraction) {
  return scoreDuration - 13.6 + 13.6 * fraction;
}

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

  it('anchors silent elapsed time at entry and clamps monotonically at 118 seconds', () => {
    expect(mapSilentElapsedToVisualScore(0, silentDuration, scoreDuration)).toBe(0);
    expect(mapSilentElapsedToVisualScore(59, silentDuration, scoreDuration)).toBeCloseTo(
      scoreDuration / 2,
      12,
    );
    expect(mapSilentElapsedToVisualScore(118, silentDuration, scoreDuration)).toBe(scoreDuration);
    expect(mapSilentElapsedToVisualScore(119, silentDuration, scoreDuration)).toBe(scoreDuration);
    expect(mapSilentElapsedToVisualScore(236, silentDuration, scoreDuration)).toBe(scoreDuration);
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
    [-1, silentDuration, scoreDuration],
    [Number.NaN, silentDuration, scoreDuration],
    [0, 0, scoreDuration],
    [0, Number.POSITIVE_INFINITY, scoreDuration],
    [0, silentDuration, 0],
    [0, silentDuration, Number.NaN],
  ])('fails fast for invalid silent clock input %#', (elapsed, duration, visualDuration) => {
    expect(() => mapSilentElapsedToVisualScore(elapsed, duration, visualDuration)).toThrow(RangeError);
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

  it('produces identical ending state for equivalent audio and silent positions', () => {
    let audioState = initialEndingState;
    let silentState = initialEndingState;

    for (const fraction of [0, 0.5, 0.97, 0.99, 1]) {
      const audioScoreTime = mapMediaTimeToVisualScore(fraction * 120, 120, scoreDuration);
      const silentScoreTime = mapSilentElapsedToVisualScore(
        fraction * silentDuration,
        silentDuration,
        scoreDuration,
      );
      const audioResult = advanceEndingState(audioState, audioScoreTime, scoreDuration);
      const silentResult = advanceEndingState(silentState, silentScoreTime, scoreDuration);

      expect(audioScoreTime).toBeCloseTo(silentScoreTime, 12);
      expect(audioResult).toStrictEqual(silentResult);
      audioState = audioResult.state;
      silentState = silentResult.state;
    }
  });

  it('emits the complete ending sequence in the same order for steps and a large jump', () => {
    const samples = [0.03, 0.08, 0.55, 0.85, 1].map(scoreTimeAtWithdrawalFraction);
    let state = initialEndingState;
    const steppedTransitions = [];

    for (const visualScoreTime of samples) {
      const result = advanceEndingState(state, visualScoreTime, scoreDuration);
      state = result.state;
      steppedTransitions.push(...result.transitions);
    }

    const jumped = advanceEndingState(initialEndingState, scoreDuration, scoreDuration);
    expect(steppedTransitions).toStrictEqual([
      'shutdown-start',
      'outer-silence',
      'echo-reverses',
      'last-light',
      'finish',
    ]);
    expect(jumped.transitions).toStrictEqual(steppedTransitions);
    expect(jumped.state).toStrictEqual(state);
    expect(jumped.state).toStrictEqual({
      shutdown: 1,
      started: true,
      cueCursor: 3,
      finished: true,
    });
  });

  it('makes competing finish signals idempotent and freezes every output collection', () => {
    const first = advanceEndingState(initialEndingState, scoreDuration, scoreDuration);
    const competing = advanceEndingState(first.state, scoreDuration, scoreDuration);
    const trailingMediaSample = advanceEndingState(
      first.state,
      scoreDuration - 0.25,
      scoreDuration,
    );

    expect(first.transitions.filter((transition) => transition === 'finish')).toHaveLength(1);
    expect(competing.transitions).toStrictEqual([]);
    expect(competing.state).toStrictEqual(first.state);
    expect(competing.state).not.toBe(first.state);
    expect(trailingMediaSample).toStrictEqual(competing);
    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.state)).toBe(true);
    expect(Object.isFrozen(first.transitions)).toBe(true);
    expect(Object.isFrozen(competing)).toBe(true);
    expect(Object.isFrozen(competing.transitions)).toBe(true);
  });

  it.each([
    [null, 0, scoreDuration],
    [{ shutdown: 0, started: false, cueCursor: 0 }, 0, scoreDuration],
    [{ ...initialEndingState, legacy: false }, 0, scoreDuration],
    [{ ...initialEndingState, shutdown: -0.1 }, 0, scoreDuration],
    [{ ...initialEndingState, started: 'false' }, 0, scoreDuration],
    [{ ...initialEndingState, cueCursor: 4 }, 0, scoreDuration],
    [{ shutdown: 0.2, started: false, cueCursor: 0, finished: false }, scoreDuration, scoreDuration],
    [{ shutdown: 1, started: true, cueCursor: 3, finished: false }, scoreDuration, scoreDuration],
    [{ shutdown: 0.5, started: true, cueCursor: 2, finished: false }, 0, scoreDuration],
    [initialEndingState, -1, scoreDuration],
    [initialEndingState, 0, 0],
  ])('fails fast for invalid or inconsistent ending reducer input %#', (
    previous,
    visualScoreTime,
    duration,
  ) => {
    expect(() => advanceEndingState(previous, visualScoreTime, duration)).toThrow();
  });
});
