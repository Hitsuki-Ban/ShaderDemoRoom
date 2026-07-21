export const NINTH_TIDE_NEAR_BLACK_LIMIT = 32;
export const NINTH_TIDE_MAX_MEAN_LUMA_SHIFT = 0.5;

const REQUIRED_ROI_KEYS = Object.freeze(['x', 'y', 'width', 'height']);
const COMPARABLE_METRIC_KEYS = Object.freeze([
  'occupiedNonzeroBins',
  'interiorEmptyBins',
  'maxInteriorZeroRun',
  'dominantNonzeroBinRatio',
  'equalHorizontalNearPairRatio',
  'longestHorizontalNearRun',
  'nonzeroNearPixels',
]);

function assertPositiveInteger(value, name) {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer`);
  }
}

function assertRgba8(rgba, width, height) {
  if (!(rgba instanceof Uint8Array) && !(rgba instanceof Uint8ClampedArray)) {
    throw new TypeError('rgba must be a Uint8Array or Uint8ClampedArray');
  }

  const pixelCount = width * height;
  if (!Number.isSafeInteger(pixelCount) || !Number.isSafeInteger(pixelCount * 4)) {
    throw new RangeError('width and height produce an unsafe RGBA8 buffer size');
  }

  const expectedLength = pixelCount * 4;
  if (rgba.length !== expectedLength) {
    throw new RangeError(`rgba length must be exactly ${expectedLength} bytes`);
  }
}

function assertRoi(roi, frameWidth, frameHeight) {
  if (roi === null || typeof roi !== 'object' || Array.isArray(roi)) {
    throw new TypeError('roi must be an object');
  }

  const keys = Object.keys(roi).sort();
  if (
    keys.length !== REQUIRED_ROI_KEYS.length
    || !REQUIRED_ROI_KEYS.every((key) => keys.includes(key))
  ) {
    throw new TypeError('roi must contain exactly x, y, width, and height');
  }

  if (!Number.isSafeInteger(roi.x) || roi.x < 0 || !Number.isSafeInteger(roi.y) || roi.y < 0) {
    throw new TypeError('roi x and y must be non-negative safe integers');
  }
  assertPositiveInteger(roi.width, 'roi.width');
  assertPositiveInteger(roi.height, 'roi.height');

  if (roi.x + roi.width > frameWidth || roi.y + roi.height > frameHeight) {
    throw new RangeError('roi must be fully contained within the frame');
  }
}

function assertNearBlackMaxCode(nearBlackMaxCode) {
  if (
    !Number.isSafeInteger(nearBlackMaxCode)
    || nearBlackMaxCode < 1
    || nearBlackMaxCode > NINTH_TIDE_NEAR_BLACK_LIMIT
  ) {
    throw new RangeError(
      `nearBlackMaxCode must be an integer from 1 to ${NINTH_TIDE_NEAR_BLACK_LIMIT}`,
    );
  }
}

function lumaCode(red, green, blue) {
  return Math.round((2126 * red + 7152 * green + 722 * blue) / 10_000);
}

function measureInteriorGaps(histogram, nearBlackMaxCode) {
  let firstOccupied = -1;
  let lastOccupied = -1;

  for (let code = 1; code <= nearBlackMaxCode; code += 1) {
    if (histogram[code] > 0) {
      firstOccupied = firstOccupied === -1 ? code : firstOccupied;
      lastOccupied = code;
    }
  }

  if (firstOccupied === -1 || firstOccupied === lastOccupied) {
    return { interiorEmptyBins: 0, maxInteriorZeroRun: 0 };
  }

  let interiorEmptyBins = 0;
  let currentZeroRun = 0;
  let maxInteriorZeroRun = 0;

  for (let code = firstOccupied + 1; code < lastOccupied; code += 1) {
    if (histogram[code] === 0) {
      interiorEmptyBins += 1;
      currentZeroRun += 1;
      maxInteriorZeroRun = Math.max(maxInteriorZeroRun, currentZeroRun);
    } else {
      currentZeroRun = 0;
    }
  }

  return { interiorEmptyBins, maxInteriorZeroRun };
}

export function analyzeNearBlackRgba8({ rgba, width, height, roi, nearBlackMaxCode }) {
  assertPositiveInteger(width, 'width');
  assertPositiveInteger(height, 'height');
  assertRgba8(rgba, width, height);
  assertRoi(roi, width, height);
  assertNearBlackMaxCode(nearBlackMaxCode);

  const redHistogram = Array(256).fill(0);
  const greenHistogram = Array(256).fill(0);
  const blueHistogram = Array(256).fill(0);
  const lumaNearBlackHistogram = Array(NINTH_TIDE_NEAR_BLACK_LIMIT + 1).fill(0);
  let lumaCodeSum = 0;
  let nonzeroNearPixels = 0;
  let horizontalNearPairs = 0;
  let equalHorizontalNearPairs = 0;
  let longestHorizontalNearRun = 0;

  for (let y = roi.y; y < roi.y + roi.height; y += 1) {
    let previousNearLuma = -1;
    let horizontalNearRun = 0;

    for (let x = roi.x; x < roi.x + roi.width; x += 1) {
      const offset = (y * width + x) * 4;
      const red = rgba[offset];
      const green = rgba[offset + 1];
      const blue = rgba[offset + 2];
      const luma = lumaCode(red, green, blue);

      redHistogram[red] += 1;
      greenHistogram[green] += 1;
      blueHistogram[blue] += 1;
      lumaCodeSum += luma;

      if (luma <= nearBlackMaxCode) {
        lumaNearBlackHistogram[luma] += 1;
      }

      if (luma >= 1 && luma <= nearBlackMaxCode) {
        nonzeroNearPixels += 1;

        if (previousNearLuma !== -1) {
          horizontalNearPairs += 1;
          if (luma === previousNearLuma) {
            equalHorizontalNearPairs += 1;
            horizontalNearRun += 1;
          } else {
            horizontalNearRun = 1;
          }
        } else {
          horizontalNearRun = 1;
        }

        longestHorizontalNearRun = Math.max(longestHorizontalNearRun, horizontalNearRun);
        previousNearLuma = luma;
      } else {
        previousNearLuma = -1;
        horizontalNearRun = 0;
      }
    }
  }

  let occupiedNonzeroBins = 0;
  let dominantNonzeroBinCount = 0;
  for (let code = 1; code <= nearBlackMaxCode; code += 1) {
    const count = lumaNearBlackHistogram[code];
    if (count > 0) {
      occupiedNonzeroBins += 1;
      dominantNonzeroBinCount = Math.max(dominantNonzeroBinCount, count);
    }
  }

  const { interiorEmptyBins, maxInteriorZeroRun } = measureInteriorGaps(
    lumaNearBlackHistogram,
    nearBlackMaxCode,
  );
  const roiPixels = roi.width * roi.height;

  return {
    width,
    height,
    roi: { ...roi },
    roiPixels,
    nearBlackMaxCode,
    meanLumaCode: lumaCodeSum / roiPixels,
    redHistogram,
    greenHistogram,
    blueHistogram,
    lumaNearBlackHistogram,
    occupiedNonzeroBins,
    interiorEmptyBins,
    maxInteriorZeroRun,
    dominantNonzeroBinRatio:
      nonzeroNearPixels === 0 ? 0 : dominantNonzeroBinCount / nonzeroNearPixels,
    equalHorizontalNearPairRatio:
      horizontalNearPairs === 0 ? 0 : equalHorizontalNearPairs / horizontalNearPairs,
    longestHorizontalNearRun,
    nonzeroNearPixels,
  };
}

function assertComparableMetrics(metrics, name) {
  if (metrics === null || typeof metrics !== 'object' || Array.isArray(metrics)) {
    throw new TypeError(`${name} metrics must be an object`);
  }
  if (!Number.isFinite(metrics.meanLumaCode)) {
    throw new TypeError(`${name}.meanLumaCode must be finite`);
  }
  assertPositiveInteger(metrics.width, `${name}.width`);
  assertPositiveInteger(metrics.height, `${name}.height`);
  assertNearBlackMaxCode(metrics.nearBlackMaxCode);
  assertPositiveInteger(metrics.roiPixels, `${name}.roiPixels`);
  assertRoi(metrics.roi, metrics.width, metrics.height);
  if (metrics.roiPixels !== metrics.roi.width * metrics.roi.height) {
    throw new RangeError(`${name}.roiPixels must equal the roi area`);
  }

  for (const key of COMPARABLE_METRIC_KEYS) {
    if (!Number.isFinite(metrics[key]) || metrics[key] < 0) {
      throw new TypeError(`${name}.${key} must be a finite non-negative number`);
    }
  }

  for (const key of [
    'occupiedNonzeroBins',
    'interiorEmptyBins',
    'maxInteriorZeroRun',
    'longestHorizontalNearRun',
    'nonzeroNearPixels',
  ]) {
    if (!Number.isSafeInteger(metrics[key])) {
      throw new TypeError(`${name}.${key} must be a safe integer`);
    }
  }

  for (const key of ['dominantNonzeroBinRatio', 'equalHorizontalNearPairRatio']) {
    if (metrics[key] > 1) {
      throw new RangeError(`${name}.${key} must not exceed 1`);
    }
  }
}

function sameRoi(first, second) {
  return REQUIRED_ROI_KEYS.every((key) => first[key] === second[key]);
}

export function compareNearBlackDitherMetrics(before, candidate) {
  assertComparableMetrics(before, 'before');
  assertComparableMetrics(candidate, 'candidate');

  if (
    before.width !== candidate.width
    || before.height !== candidate.height
    || before.roiPixels !== candidate.roiPixels
    || !sameRoi(before.roi, candidate.roi)
  ) {
    throw new RangeError('before and candidate must use the same frame dimensions and roi');
  }
  if (before.nearBlackMaxCode !== candidate.nearBlackMaxCode) {
    throw new RangeError('before and candidate must use the same nearBlackMaxCode');
  }

  const meanLumaCodeShift = candidate.meanLumaCode - before.meanLumaCode;
  const absoluteMeanLumaCodeShift = Math.abs(meanLumaCodeShift);
  if (absoluteMeanLumaCodeShift > NINTH_TIDE_MAX_MEAN_LUMA_SHIFT) {
    throw new RangeError(
      `candidate mean luma shifted by ${absoluteMeanLumaCodeShift} code; maximum is ${NINTH_TIDE_MAX_MEAN_LUMA_SHIFT}`,
    );
  }

  const deltas = Object.fromEntries(
    COMPARABLE_METRIC_KEYS.map((key) => [`${key}Delta`, candidate[key] - before[key]]),
  );

  return {
    meanLumaCodeShift,
    absoluteMeanLumaCodeShift,
    ...deltas,
    histogramCoverageImproved:
      deltas.occupiedNonzeroBinsDelta >= 0
      && deltas.interiorEmptyBinsDelta <= 0
      && deltas.maxInteriorZeroRunDelta <= 0
      && (
        deltas.occupiedNonzeroBinsDelta > 0
        || deltas.interiorEmptyBinsDelta < 0
        || deltas.maxInteriorZeroRunDelta < 0
      ),
    plateauImproved: deltas.dominantNonzeroBinRatioDelta < 0,
    adjacentEqualsImproved: deltas.equalHorizontalNearPairRatioDelta < 0,
    longestHorizontalRunImproved: deltas.longestHorizontalNearRunDelta < 0,
  };
}
