export function mapMediaTimeToVisualScore(mediaTime, mediaDuration, scoreDuration) {
  if (!Number.isFinite(mediaTime) || mediaTime < 0) {
    throw new RangeError('Ninth Tide media time must be a non-negative finite number.');
  }
  if (!Number.isFinite(mediaDuration) || mediaDuration <= 0) {
    throw new RangeError('Ninth Tide media duration must be a positive finite number.');
  }
  if (!Number.isFinite(scoreDuration) || scoreDuration <= 0) {
    throw new RangeError('Ninth Tide score duration must be a positive finite number.');
  }
  return Math.min(mediaTime, mediaDuration) / mediaDuration * scoreDuration;
}

export function mapSilentElapsedToVisualScore(
  elapsedSinceEntry,
  silentDuration,
  scoreDuration,
) {
  if (!Number.isFinite(elapsedSinceEntry) || elapsedSinceEntry < 0) {
    throw new RangeError('Ninth Tide silent elapsed time must be a non-negative finite number.');
  }
  if (!Number.isFinite(silentDuration) || silentDuration <= 0) {
    throw new RangeError('Ninth Tide silent duration must be a positive finite number.');
  }
  if (!Number.isFinite(scoreDuration) || scoreDuration <= 0) {
    throw new RangeError('Ninth Tide score duration must be a positive finite number.');
  }
  return Math.min(elapsedSinceEntry, silentDuration) / silentDuration * scoreDuration;
}

export function mapVisualScoreTimeToEndingShutdown(
  visualScoreTime,
  scoreDuration,
  withdrawalSpan = 13.6,
) {
  if (!Number.isFinite(visualScoreTime) || visualScoreTime < 0) {
    throw new RangeError('Ninth Tide visual score time must be a non-negative finite number.');
  }
  if (!Number.isFinite(scoreDuration) || scoreDuration <= 0) {
    throw new RangeError('Ninth Tide score duration must be a positive finite number.');
  }
  if (!Number.isFinite(withdrawalSpan) || withdrawalSpan <= 0 || withdrawalSpan > scoreDuration) {
    throw new RangeError('Ninth Tide withdrawal span must be positive and no longer than the score.');
  }

  const start = scoreDuration - withdrawalSpan;
  const raw = Math.min(Math.max((visualScoreTime - start) / withdrawalSpan, 0), 1);
  return raw < 0.58
    ? raw * 0.78
    : 0.4524 + (1 - 0.4524) * smootherstep01((raw - 0.58) / (1 - 0.58));
}

const endingThresholds = Object.freeze({
  started: 0.018,
  outerSilence: 0.05,
  echoReverses: 0.41,
  lastLight: 0.76,
  finished: 0.995,
});

const endingStateKeys = Object.freeze(['cueCursor', 'finished', 'shutdown', 'started']);

export function advanceEndingState(previous, visualScoreTime, scoreDuration) {
  assertEndingState(previous);

  const target = mapVisualScoreTimeToEndingShutdown(visualScoreTime, scoreDuration);
  if (previous.finished) {
    return freezeEndingResult(previous, []);
  }
  if (target < previous.shutdown) {
    throw new RangeError('Ninth Tide ending visual score time must not move backwards.');
  }

  const transitions = [];
  let started = previous.started;
  let cueCursor = previous.cueCursor;
  let finished = false;

  if (!started && target > endingThresholds.started) {
    started = true;
    transitions.push('shutdown-start');
  }
  if (cueCursor === 0 && target > endingThresholds.outerSilence) {
    cueCursor = 1;
    transitions.push('outer-silence');
  }
  if (cueCursor === 1 && target > endingThresholds.echoReverses) {
    cueCursor = 2;
    transitions.push('echo-reverses');
  }
  if (cueCursor === 2 && target > endingThresholds.lastLight) {
    cueCursor = 3;
    transitions.push('last-light');
  }
  if (target >= endingThresholds.finished) {
    finished = true;
    transitions.push('finish');
  }

  return freezeEndingResult({
    shutdown: finished ? 1 : target,
    started,
    cueCursor,
    finished,
  }, transitions);
}

function assertEndingState(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError('Ninth Tide ending state must be an object.');
  }
  const keys = Object.keys(value).sort();
  if (keys.length !== endingStateKeys.length
    || keys.some((key, index) => key !== endingStateKeys[index])) {
    throw new TypeError('Ninth Tide ending state must contain exactly shutdown, started, cueCursor, and finished.');
  }
  if (!Number.isFinite(value.shutdown) || value.shutdown < 0 || value.shutdown > 1) {
    throw new RangeError('Ninth Tide ending shutdown must be a finite number from 0 to 1.');
  }
  if (typeof value.started !== 'boolean' || typeof value.finished !== 'boolean') {
    throw new TypeError('Ninth Tide ending started and finished flags must be booleans.');
  }
  if (!Number.isInteger(value.cueCursor) || value.cueCursor < 0 || value.cueCursor > 3) {
    throw new RangeError('Ninth Tide ending cue cursor must be an integer from 0 to 3.');
  }

  const expectedStarted = value.shutdown > endingThresholds.started;
  const expectedCueCursor = value.shutdown > endingThresholds.lastLight
    ? 3
    : value.shutdown > endingThresholds.echoReverses
      ? 2
      : value.shutdown > endingThresholds.outerSilence
        ? 1
        : 0;
  const validFinished = value.finished
    ? value.shutdown === 1
    : value.shutdown < endingThresholds.finished;

  if (value.started !== expectedStarted
    || value.cueCursor !== expectedCueCursor
    || !validFinished
    || (value.finished && (!value.started || value.cueCursor !== 3))) {
    throw new RangeError('Ninth Tide ending state is inconsistent with its shutdown progress.');
  }
}

function freezeEndingResult(state, transitions) {
  const frozenState = Object.freeze({ ...state });
  return Object.freeze({
    state: frozenState,
    transitions: Object.freeze(transitions),
  });
}

function smootherstep01(value) {
  const clamped = Math.min(Math.max(value, 0), 1);
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}
