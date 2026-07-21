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

function smootherstep01(value) {
  const clamped = Math.min(Math.max(value, 0), 1);
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}
