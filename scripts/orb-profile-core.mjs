export const ORB_PROFILE_VARIANTS = Object.freeze([
  Object.freeze({ id: 'baseline', treatment: 'none' }),
  Object.freeze({ id: 'smaa-off', treatment: 'disable SMAA' }),
  Object.freeze({ id: 'bloom-off', treatment: 'disable bloom' }),
  Object.freeze({ id: 'preserve-buffer-off', treatment: 'set preserveDrawingBuffer=false' }),
  Object.freeze({ id: 'refraction-scale-0.5', treatment: 'set high-quality refraction RT scale to 0.5' }),
  Object.freeze({ id: 'pixel-ratio-1.0', treatment: 'cap high-quality pixel ratio at 1.0' }),
]);

function assertFinitePositive(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    throw new TypeError(`${label} must be a finite positive number.`);
  }
}

export function median(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new TypeError('median requires a non-empty array.');
  }
  values.forEach((value, index) => assertFinitePositive(value, `median[${index}]`));
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

export function nearestRankPercentile(values, percentile) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new TypeError('nearestRankPercentile requires a non-empty array.');
  }
  values.forEach((value, index) => assertFinitePositive(value, `percentile[${index}]`));
  if (typeof percentile !== 'number' || !Number.isFinite(percentile) || percentile <= 0 || percentile > 1) {
    throw new TypeError('percentile must be a finite number in (0, 1].');
  }
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.ceil(percentile * sorted.length) - 1];
}

export function summarizeCadence(intervals) {
  if (!Array.isArray(intervals) || intervals.length === 0) {
    throw new TypeError('Cadence intervals must be a non-empty array.');
  }
  intervals.forEach((value, index) => assertFinitePositive(value, `intervals[${index}]`));
  const elapsedMs = intervals.reduce((sum, value) => sum + value, 0);
  return Object.freeze({
    intervalCount: intervals.length,
    frameCount: intervals.length + 1,
    elapsedMs,
    fps: intervals.length * 1000 / elapsedMs,
    medianFrameTimeMs: median(intervals),
    p95FrameTimeMs: nearestRankPercentile(intervals, 0.95),
  });
}

export function assertExactVariantIds(records) {
  if (!Array.isArray(records)) throw new TypeError('Variant records must be an array.');
  const expected = ORB_PROFILE_VARIANTS.map(({ id }) => id).sort();
  const actual = records.map(({ variant }) => variant).sort();
  if (actual.length !== expected.length || actual.some((value, index) => value !== expected[index])) {
    throw new Error(`Variant records must contain exactly: ${expected.join(', ')}.`);
  }
}
