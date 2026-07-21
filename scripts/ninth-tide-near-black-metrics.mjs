export const NINTH_TIDE_VISIBLE_CONTRAST_THRESHOLD = 1.05;

const REQUIRED_INPUT_KEYS = Object.freeze([
  'background',
  'height',
  'rect',
  'rgba',
  'width',
]);
const REQUIRED_RECT_KEYS = Object.freeze(['height', 'width', 'x', 'y']);
const REQUIRED_BACKGROUND_KEYS = Object.freeze(['blue', 'green', 'red']);

function assertExactObject(value, name, requiredKeys) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object`);
  }

  const keys = Object.keys(value).sort();
  if (
    keys.length !== requiredKeys.length
    || !requiredKeys.every((key, index) => keys[index] === key)
  ) {
    throw new TypeError(`${name} must contain exactly ${requiredKeys.join(', ')}`);
  }
}

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

function assertRect(rect, frameWidth, frameHeight) {
  assertExactObject(rect, 'rect', REQUIRED_RECT_KEYS);
  if (!Number.isSafeInteger(rect.x) || rect.x < 0 || !Number.isSafeInteger(rect.y) || rect.y < 0) {
    throw new TypeError('rect x and y must be non-negative safe integers');
  }
  assertPositiveInteger(rect.width, 'rect.width');
  assertPositiveInteger(rect.height, 'rect.height');

  const right = rect.x + rect.width;
  const bottom = rect.y + rect.height;
  if (!Number.isSafeInteger(right) || !Number.isSafeInteger(bottom)) {
    throw new RangeError('rect bounds must be safe integers');
  }
  if (right > frameWidth || bottom > frameHeight) {
    throw new RangeError('rect must be fully contained within the frame');
  }
}

function assertBackground(background) {
  assertExactObject(background, 'background', REQUIRED_BACKGROUND_KEYS);
  for (const channel of REQUIRED_BACKGROUND_KEYS) {
    if (!Number.isSafeInteger(background[channel]) || background[channel] < 0 || background[channel] > 255) {
      throw new RangeError(`background.${channel} must be an integer from 0 to 255`);
    }
  }
}

function srgbCodeToLinear(value) {
  const encoded = value / 255;
  return encoded <= 0.04045
    ? encoded / 12.92
    : ((encoded + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(red, green, blue) {
  return srgbCodeToLinear(red) * 0.2126
    + srgbCodeToLinear(green) * 0.7152
    + srgbCodeToLinear(blue) * 0.0722;
}

function contrastRatio(firstLuminance, secondLuminance) {
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

function percentile(sortedValues, ratio) {
  return sortedValues[Math.min(
    sortedValues.length - 1,
    Math.floor(sortedValues.length * ratio),
  )] ?? 0;
}

export function measureNearBlackContrastRgba8(input) {
  assertExactObject(input, 'input', REQUIRED_INPUT_KEYS);
  const { rgba, width, height, rect, background } = input;

  assertPositiveInteger(width, 'width');
  assertPositiveInteger(height, 'height');
  assertRgba8(rgba, width, height);
  assertRect(rect, width, height);
  assertBackground(background);

  const backgroundLuminance = relativeLuminance(
    background.red,
    background.green,
    background.blue,
  );
  const visibleContrasts = [];
  let atLeast3PixelCount = 0;
  let atLeast4_5PixelCount = 0;

  for (let y = rect.y; y < rect.y + rect.height; y += 1) {
    for (let x = rect.x; x < rect.x + rect.width; x += 1) {
      const offset = (y * width + x) * 4;
      const alpha = rgba[offset + 3] / 255;
      const inverseAlpha = 1 - alpha;
      const red = rgba[offset] * alpha + background.red * inverseAlpha;
      const green = rgba[offset + 1] * alpha + background.green * inverseAlpha;
      const blue = rgba[offset + 2] * alpha + background.blue * inverseAlpha;
      const contrast = contrastRatio(
        relativeLuminance(red, green, blue),
        backgroundLuminance,
      );

      if (contrast > NINTH_TIDE_VISIBLE_CONTRAST_THRESHOLD) {
        visibleContrasts.push(contrast);
      }
      if (contrast >= 3) {
        atLeast3PixelCount += 1;
      }
      if (contrast >= 4.5) {
        atLeast4_5PixelCount += 1;
      }
    }
  }

  visibleContrasts.sort((left, right) => left - right);
  const pixelCount = rect.width * rect.height;
  const visiblePixelCount = visibleContrasts.length;

  return {
    width,
    height,
    rect: { ...rect },
    background: { ...background },
    pixelCount,
    visibleContrastThreshold: NINTH_TIDE_VISIBLE_CONTRAST_THRESHOLD,
    visiblePixelCount,
    visiblePixelRatio: visiblePixelCount / pixelCount,
    atLeast3PixelCount,
    atLeast3Ratio: atLeast3PixelCount / pixelCount,
    atLeast4_5PixelCount,
    atLeast4_5Ratio: atLeast4_5PixelCount / pixelCount,
    contrastP90: percentile(visibleContrasts, 0.9),
    contrastP99: percentile(visibleContrasts, 0.99),
    contrastMax: visibleContrasts.at(-1) ?? 0,
  };
}
