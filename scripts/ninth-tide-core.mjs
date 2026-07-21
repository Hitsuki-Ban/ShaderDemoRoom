import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { NINTH_TIDE_VIEWPORT, NINTH_TIDE_WARM_DOMINANCE } from './ninth-tide-policy.mjs';

export const NINTH_TIDE_OUTPUT_DIR = 'output/playwright/ninth-tide';
export const NINTH_TIDE_HIT_FIXTURE_PATH = 'docs/direction/hit-targets-v2.json';
export const NINTH_TIDE_BUILD_PATH = 'exhibits/ninth-tide-archive/index.html';
export const NINTH_TIDE_PLAYWRIGHT_VERSION = '1.60.0';

export const NINTH_TIDE_BROWSER_LAUNCH_OPTIONS = Object.freeze({
  headless: true,
  args: Object.freeze([
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ]),
});

export const NINTH_TIDE_CONTEXT_OPTIONS = Object.freeze({
  viewport: Object.freeze({ width: 1440, height: 900 }),
  screen: Object.freeze({ width: 1440, height: 900 }),
  deviceScaleFactor: 1,
  locale: 'en-US',
  timezoneId: 'UTC',
  colorScheme: 'dark',
  reducedMotion: 'no-preference',
  forcedColors: 'none',
  contrast: 'no-preference',
  hasTouch: false,
  isMobile: false,
  javaScriptEnabled: true,
  serviceWorkers: 'block',
  acceptDownloads: false,
});

function assertExactKeys(value, expectedKeys, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${label} must be an object.`);
  }
  const actual = Object.keys(value).sort();
  const expected = [...expectedKeys].sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new TypeError(`${label} must have exactly: ${expected.join(', ')}.`);
  }
}

function assertFiniteNumber(value, label) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${label} must be a finite number.`);
  }
}

export function parseNinthTideConfig(environment) {
  const rawUrl = environment.SHOWROOM_URL;
  if (typeof rawUrl !== 'string' || rawUrl.length === 0) {
    throw new Error('SHOWROOM_URL is required for qa:ninth-tide.');
  }

  let showroomUrl;
  try {
    showroomUrl = new URL(rawUrl);
  } catch {
    throw new Error('SHOWROOM_URL must be an absolute HTTP(S) URL.');
  }
  if (showroomUrl.protocol !== 'http:' && showroomUrl.protocol !== 'https:') {
    throw new Error('SHOWROOM_URL must be an absolute HTTP(S) URL.');
  }

  const baseUrl = showroomUrl.href.replace(/\/+$/, '');
  return Object.freeze({
    baseUrl,
    buildUrl: `${baseUrl}/${NINTH_TIDE_BUILD_PATH}`,
    fixturePath: NINTH_TIDE_HIT_FIXTURE_PATH,
    outputDir: NINTH_TIDE_OUTPUT_DIR,
  });
}

export function assertBundledPlaywrightVersion(actualVersion) {
  if (actualVersion !== NINTH_TIDE_PLAYWRIGHT_VERSION) {
    throw new Error(
      `qa:ninth-tide requires Playwright ${NINTH_TIDE_PLAYWRIGHT_VERSION}; received ${actualVersion}.`,
    );
  }
}

export function canonicalRgba8Bytes(width, height, rgba) {
  if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
    throw new RangeError('Canonical RGBA8 dimensions must be positive integers.');
  }
  const pixels = Buffer.from(rgba);
  if (pixels.length !== width * height * 4) {
    throw new RangeError('Canonical RGBA8 byte length does not match its dimensions.');
  }
  const header = Buffer.alloc(14);
  header.write('rgba8\0', 0, 'ascii');
  header.writeUInt32BE(width, 6);
  header.writeUInt32BE(height, 10);
  return Buffer.concat([header, pixels]);
}

export function sha256Hex(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function fixedRound(numerator, denominator, digits) {
  const scale = 10 ** digits;
  return Math.round((numerator * scale) / denominator) / scale;
}

export function measureRgba8(width, height, rgba, roi) {
  const pixels = Buffer.from(rgba);
  if (pixels.length !== width * height * 4) {
    throw new RangeError('RGBA8 metric byte length does not match its dimensions.');
  }
  assertExactKeys(roi, ['x', 'y', 'width', 'height'], 'ROI');
  for (const key of ['x', 'y', 'width', 'height']) {
    if (!Number.isInteger(roi[key])) throw new TypeError(`ROI ${key} must be an integer.`);
  }
  if (
    roi.x < 0 || roi.y < 0 || roi.width <= 0 || roi.height <= 0
    || roi.x + roi.width > width || roi.y + roi.height > height
  ) {
    throw new RangeError('ROI must fit within the RGBA8 frame.');
  }

  let nonBlackPixels = 0;
  let roiLumaWeightedTotal = 0;
  let roiRedTotal = 0;
  let roiGreenTotal = 0;
  let roiBlueTotal = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const red = pixels[offset];
      const green = pixels[offset + 1];
      const blue = pixels[offset + 2];
      if (red !== 0 || green !== 0 || blue !== 0) nonBlackPixels += 1;
      if (x < roi.x || x >= roi.x + roi.width || y < roi.y || y >= roi.y + roi.height) {
        continue;
      }
      roiLumaWeightedTotal += 2126 * red + 7152 * green + 722 * blue;
      roiRedTotal += red;
      roiGreenTotal += green;
      roiBlueTotal += blue;
    }
  }

  const roiPixels = roi.width * roi.height;
  const warmBalanceNumerator = roiRedTotal - roiBlueTotal;
  return Object.freeze({
    nonBlackPixels,
    roiLuma: fixedRound(roiLumaWeightedTotal, roiPixels * 10_000, 4),
    roiRgbMean: Object.freeze({
      red: fixedRound(roiRedTotal, roiPixels, 4),
      green: fixedRound(roiGreenTotal, roiPixels, 4),
      blue: fixedRound(roiBlueTotal, roiPixels, 4),
    }),
    warmBalance: fixedRound(warmBalanceNumerator, roiPixels, 4),
    warmDominant: roiRedTotal * 100 > roiGreenTotal * NINTH_TIDE_WARM_DOMINANCE.redToGreenPercent
      && roiRedTotal * 100 > roiBlueTotal * NINTH_TIDE_WARM_DOMINANCE.redToBluePercent,
  });
}

export function assertCapturePolicy(metrics, policy) {
  if (metrics.nonBlackPixels === 0) throw new Error(`${policy.id} capture is entirely black.`);
  if (metrics.roiLuma < policy.roiLuma.min || metrics.roiLuma > policy.roiLuma.max) {
    throw new Error(
      `${policy.id} ROI luma ${metrics.roiLuma} is outside ${policy.roiLuma.min}..${policy.roiLuma.max}.`,
    );
  }
  if (metrics.warmDominant !== policy.warmDominant) {
    throw new Error(
      `${policy.id} warmDominant was ${metrics.warmDominant}; expected ${policy.warmDominant}.`,
    );
  }
}

export function installNinthTideRafAudit() {
  const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window);
  const nativeCancelAnimationFrame = window.cancelAnimationFrame.bind(window);
  const pending = new Set();
  let callbackCount = 0;
  let renderActivityCount = 0;

  const instrumentDrawMethods = (prototype, methodNames) => {
    if (!prototype) return;
    for (const methodName of methodNames) {
      const original = prototype[methodName];
      if (typeof original !== 'function') continue;
      Object.defineProperty(prototype, methodName, {
        configurable: true,
        writable: true,
        value(...args) {
          renderActivityCount += 1;
          return Reflect.apply(original, this, args);
        },
      });
    }
  };
  instrumentDrawMethods(window.WebGLRenderingContext?.prototype, ['drawArrays', 'drawElements']);
  instrumentDrawMethods(window.WebGL2RenderingContext?.prototype, [
    'drawArrays',
    'drawElements',
    'drawArraysInstanced',
    'drawElementsInstanced',
  ]);

  window.requestAnimationFrame = (callback) => {
    const handle = nativeRequestAnimationFrame((timestamp) => {
      pending.delete(handle);
      callbackCount += 1;
      callback(timestamp);
    });
    pending.add(handle);
    return handle;
  };
  window.cancelAnimationFrame = (handle) => {
    pending.delete(handle);
    nativeCancelAnimationFrame(handle);
  };
  Object.defineProperty(window, '__NINTH_TIDE_QA_RAF_AUDIT__', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: Object.freeze({
      callbackCount: () => callbackCount,
      pendingCount: () => pending.size,
      renderActivityCount: () => renderActivityCount,
    }),
  });
}

export async function analyzePngInBrowser({ base64, roi, warmDominance }) {
  const response = await fetch(`data:image/png;base64,${base64}`);
  const bitmap = await createImageBitmap(await response.blob(), {
    colorSpaceConversion: 'none',
    premultiplyAlpha: 'none',
  });
  if (typeof OffscreenCanvas !== 'function') {
    bitmap.close();
    throw new Error('Ninth Tide PNG analysis requires OffscreenCanvas.');
  }
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const context = canvas.getContext('2d', {
    alpha: true,
    colorSpace: 'srgb',
    willReadFrequently: true,
  });
  if (!context) throw new Error('Browser could not create a 2D PNG decode context.');
  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);

  const header = new Uint8Array(14);
  header.set(new TextEncoder().encode('rgba8\0'), 0);
  const headerView = new DataView(header.buffer);
  headerView.setUint32(6, canvas.width, false);
  headerView.setUint32(10, canvas.height, false);
  const canonical = new Uint8Array(header.length + data.length);
  canonical.set(header, 0);
  canonical.set(data, header.length);
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', canonical));
  const captureHash = [...digest].map((byte) => byte.toString(16).padStart(2, '0')).join('');

  let nonBlackPixels = 0;
  let roiLumaWeightedTotal = 0;
  let roiRedTotal = 0;
  let roiGreenTotal = 0;
  let roiBlueTotal = 0;
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const offset = (y * canvas.width + x) * 4;
      const red = data[offset];
      const green = data[offset + 1];
      const blue = data[offset + 2];
      if (red !== 0 || green !== 0 || blue !== 0) nonBlackPixels += 1;
      if (x < roi.x || x >= roi.x + roi.width || y < roi.y || y >= roi.y + roi.height) {
        continue;
      }
      roiLumaWeightedTotal += 2126 * red + 7152 * green + 722 * blue;
      roiRedTotal += red;
      roiGreenTotal += green;
      roiBlueTotal += blue;
    }
  }
  const fixedRound = (numerator, denominator, digits) => {
    const scale = 10 ** digits;
    return Math.round((numerator * scale) / denominator) / scale;
  };
  const roiPixels = roi.width * roi.height;
  const warmBalanceNumerator = roiRedTotal - roiBlueTotal;
  return {
    captureHash,
    width: canvas.width,
    height: canvas.height,
    metrics: {
      nonBlackPixels,
      roiLuma: fixedRound(roiLumaWeightedTotal, roiPixels * 10_000, 4),
      roiRgbMean: {
        red: fixedRound(roiRedTotal, roiPixels, 4),
        green: fixedRound(roiGreenTotal, roiPixels, 4),
        blue: fixedRound(roiBlueTotal, roiPixels, 4),
      },
      warmBalance: fixedRound(warmBalanceNumerator, roiPixels, 4),
      warmDominant: roiRedTotal * 100 > roiGreenTotal * warmDominance.redToGreenPercent
        && roiRedTotal * 100 > roiBlueTotal * warmDominance.redToBluePercent,
    },
  };
}

export function validateStepResult(result, policy) {
  assertExactKeys(
    result,
    [
      'mode',
      'section',
      'timestampMs',
      'frameRenders',
      'queuedAnimationFrames',
      'stateDigest',
      'framebuffer',
      'renderer',
      'chapter',
      'chapterNumber',
    ],
    `${policy.id} step result`,
  );
  if (
    result.mode !== policy.mode
    || result.section !== policy.section
    || result.timestampMs !== policy.timestampMs
    || result.chapterNumber !== policy.section + 1
  ) {
    throw new Error(`${policy.id} step result does not match the exact request.`);
  }
  if (!/^[a-f0-9]{64}$/.test(result.stateDigest)) {
    throw new Error(`${policy.id} stateDigest must be lowercase SHA-256.`);
  }
  if (result.frameRenders !== 1) throw new Error(`${policy.id} must render exactly one frame.`);
  if (result.queuedAnimationFrames !== 0) {
    throw new Error(`${policy.id} hook left queued animation frames.`);
  }
  assertExactKeys(result.framebuffer, ['hash', 'width', 'height'], `${policy.id} framebuffer`);
  if (!/^[a-f0-9]{64}$/.test(result.framebuffer.hash)) {
    throw new Error(`${policy.id} framebuffer hash must be lowercase SHA-256.`);
  }
  if (
    result.framebuffer.width !== NINTH_TIDE_VIEWPORT.width
    || result.framebuffer.height !== NINTH_TIDE_VIEWPORT.height
  ) {
    throw new Error(`${policy.id} framebuffer dimensions do not match the fixed viewport.`);
  }
  assertExactKeys(
    result.renderer,
    ['raw', 'debugInfoAvailable', 'contextAttributes'],
    `${policy.id} renderer`,
  );
  if (
    typeof result.renderer.raw !== 'string'
    || !result.renderer.raw.toLowerCase().includes('swiftshader')
  ) {
    throw new Error(`${policy.id} did not use SwiftShader: ${String(result.renderer.raw)}.`);
  }
  if (result.renderer.debugInfoAvailable !== true) {
    throw new Error(`${policy.id} WEBGL_debug_renderer_info is unavailable.`);
  }
  if (
    !result.renderer.contextAttributes
    || typeof result.renderer.contextAttributes !== 'object'
    || Array.isArray(result.renderer.contextAttributes)
    || Object.keys(result.renderer.contextAttributes).length === 0
  ) {
    throw new Error(`${policy.id} WebGL context attributes are unavailable.`);
  }
  assertExactKeys(result.chapter, ['mode', 'section', 'phase'], `${policy.id} chapter`);
  if (
    result.chapter.mode !== policy.mode
    || result.chapter.section !== policy.section
    || result.chapter.phase !== policy.expectedPhase
  ) {
    throw new Error(`${policy.id} hook chapter does not match the requested state.`);
  }
  return result;
}

export function validateHitFixture(fixture) {
  assertExactKeys(
    fixture,
    ['schemaVersion', 'viewport', 'canvasBox', 'sections'],
    'Ninth Tide hit fixture',
  );
  if (fixture.schemaVersion !== 2) throw new Error('Ninth Tide hit fixture schemaVersion must be 2.');
  assertExactKeys(fixture.viewport, ['width', 'height', 'deviceScaleFactor'], 'fixture viewport');
  if (
    fixture.viewport.width !== NINTH_TIDE_VIEWPORT.width
    || fixture.viewport.height !== NINTH_TIDE_VIEWPORT.height
    || fixture.viewport.deviceScaleFactor !== NINTH_TIDE_VIEWPORT.deviceScaleFactor
  ) {
    throw new Error('Ninth Tide hit fixture viewport/DPR does not match the fixed QA viewport.');
  }
  assertExactKeys(fixture.canvasBox, ['x', 'y', 'width', 'height'], 'fixture canvasBox');
  const expectedBox = { x: 0, y: 0, width: 1440, height: 900 };
  if (Object.keys(expectedBox).some((key) => fixture.canvasBox[key] !== expectedBox[key])) {
    throw new Error('Ninth Tide hit fixture canvasBox must be 0,0,1440,900.');
  }
  if (!Array.isArray(fixture.sections) || fixture.sections.length !== 9) {
    throw new Error('Ninth Tide hit fixture must contain exactly nine sections.');
  }

  const expectedPointShapes = new Set([
    'center:center',
    'edge-positive:top',
    'edge-positive:right',
    'edge-positive:bottom',
    'edge-positive:left',
    'negative:top',
    'negative:right',
    'negative:bottom',
    'negative:left',
  ]);
  for (let sectionIndex = 0; sectionIndex < 9; sectionIndex += 1) {
    const section = fixture.sections[sectionIndex];
    assertExactKeys(section, ['section', 'points'], `fixture section ${sectionIndex}`);
    if (section.section !== sectionIndex || !Array.isArray(section.points) || section.points.length !== 9) {
      throw new Error(`Ninth Tide hit fixture section ${sectionIndex} must contain exactly nine points.`);
    }
    const shapes = new Set();
    const ids = new Set();
    for (const point of section.points) {
      assertExactKeys(
        point,
        ['id', 'kind', 'axis', 'clientX', 'clientY', 'beforeHit', 'expectedHit'],
        `fixture section ${sectionIndex} point`,
      );
      if (typeof point.id !== 'string' || point.id.length === 0 || ids.has(point.id)) {
        throw new Error(`Ninth Tide fixture section ${sectionIndex} point ids must be unique strings.`);
      }
      ids.add(point.id);
      const shape = `${point.kind}:${point.axis}`;
      if (!expectedPointShapes.has(shape) || shapes.has(shape)) {
        throw new Error(`Ninth Tide fixture section ${sectionIndex} has an invalid point shape.`);
      }
      shapes.add(shape);
      assertFiniteNumber(point.clientX, `section ${sectionIndex} clientX`);
      assertFiniteNumber(point.clientY, `section ${sectionIndex} clientY`);
      if (
        point.clientX < 0 || point.clientX > NINTH_TIDE_VIEWPORT.width
        || point.clientY < 0 || point.clientY > NINTH_TIDE_VIEWPORT.height
      ) {
        throw new Error(`Ninth Tide fixture section ${sectionIndex} point is outside the viewport.`);
      }
      if (typeof point.beforeHit !== 'boolean') {
        throw new TypeError(`Ninth Tide fixture section ${sectionIndex} beforeHit must be boolean.`);
      }
      if (typeof point.expectedHit !== 'boolean') {
        throw new TypeError(`Ninth Tide fixture section ${sectionIndex} expectedHit must be boolean.`);
      }
      const isHistoricalHorizontalMiss = sectionIndex >= 7
        && point.kind === 'edge-positive'
        && (point.axis === 'left' || point.axis === 'right');
      const historicalHit = point.kind !== 'negative' && !isHistoricalHorizontalMiss;
      if (point.beforeHit !== historicalHit) {
        throw new Error(
          `Ninth Tide fixture section ${sectionIndex} ${point.id} beforeHit must preserve the historical result ${historicalHit}.`,
        );
      }
      const expectedHit = point.kind !== 'negative';
      if (point.expectedHit !== expectedHit) {
        throw new Error(
          `Ninth Tide fixture section ${sectionIndex} ${point.id} expectedHit must be ${expectedHit}.`,
        );
      }
    }
    if (shapes.size !== expectedPointShapes.size) {
      throw new Error(`Ninth Tide fixture section ${sectionIndex} is missing a required point shape.`);
    }
  }
  return fixture;
}

export async function readHitFixture(path = NINTH_TIDE_HIT_FIXTURE_PATH) {
  let source;
  try {
    source = await readFile(path, 'utf8');
  } catch (error) {
    throw new Error(`Required committed Ninth Tide hit fixture is missing: ${path}.`, { cause: error });
  }
  let fixture;
  try {
    fixture = JSON.parse(source);
  } catch (error) {
    throw new Error(`Ninth Tide hit fixture is not valid JSON: ${path}.`, { cause: error });
  }
  return validateHitFixture(fixture);
}
