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
