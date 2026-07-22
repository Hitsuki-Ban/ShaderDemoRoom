import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { parsePng } from './water-qa-metrics.mjs';
import {
  areaAverageResize,
  composeContactSheet,
  encodedRec709Luma,
  encodePng,
} from './water-value-metrics.mjs';
import {
  evaluateWeatherIdentitySeries,
  toRec709Grayscale,
} from './water-weather-identity-metrics.mjs';

const DEFAULT_BASE_URL = 'http://127.0.0.1:4173/ShaderDemoRoom';
const DEFAULT_OUTPUT_DIR = 'output/weather-identity';
const VIEWPORT = Object.freeze({ width: 1440, height: 900 });
const THUMBNAIL = Object.freeze({ width: 160, height: 136 });
const CLOCK_EPOCH = '2026-01-01T00:00:00.000Z';
const BOOT_TIME_MS = 12_000;
export const WEATHER_IDENTITY_PREWARM_TIMES_MS = Object.freeze([1600, 3200, 4800]);
const REQUIRED_CONSECUTIVE_RENDERABLE_PREWARM_FRAMES = 2;
export const WEATHER_IDENTITY_SAMPLE_TIMES_MS = Object.freeze([
  1600, 2400, 3200, 4000, 4800, 5600, 6400, 7200,
]);
const STATES = Object.freeze(['clear', 'rain', 'storm']);
export const RENDERABLE_CONTENT_THRESHOLDS = Object.freeze({
  maximumNearWhiteRatio: 0.9,
  maximumNearBlackRatio: 0.9,
  minimumLumaStandardDeviation: 10,
  minimumLumaDynamicRange: 35,
  minimumActiveLumaBins: 4,
});

function quantile(sorted, fraction) {
  const position = (sorted.length - 1) * fraction;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  if (lower === upper) return sorted[lower];
  return sorted[lower] * (upper - position) + sorted[upper] * (position - lower);
}

export function measureRenderableContent(frame) {
  if (frame?.width !== THUMBNAIL.width || frame?.height !== THUMBNAIL.height
    || frame?.bytesPerPixel !== 4
    || frame.pixels?.length !== THUMBNAIL.width * THUMBNAIL.height * 4) {
    throw new Error(`Renderable content validation requires a ${THUMBNAIL.width}x${THUMBNAIL.height} RGBA thumbnail.`);
  }
  const lumas = [];
  const bins = new Uint32Array(16);
  let total = 0;
  let nearWhite = 0;
  let nearBlack = 0;
  for (let pixel = 0; pixel < frame.width * frame.height; pixel += 1) {
    const offset = pixel * 4;
    const luma = encodedRec709Luma(
      frame.pixels[offset], frame.pixels[offset + 1], frame.pixels[offset + 2],
    );
    lumas.push(luma);
    total += luma;
    if (luma >= 248) nearWhite += 1;
    if (luma <= 7) nearBlack += 1;
    bins[Math.min(15, Math.floor(luma / 16))] += 1;
  }
  lumas.sort((left, right) => left - right);
  const mean = total / lumas.length;
  const variance = lumas.reduce((sum, value) => sum + (value - mean) ** 2, 0) / lumas.length;
  const p05 = quantile(lumas, 0.05);
  const p95 = quantile(lumas, 0.95);
  const minimumBinSupport = lumas.length * 0.005;
  const metrics = {
    mean,
    standardDeviation: Math.sqrt(variance),
    p05,
    p95,
    dynamicRange: p95 - p05,
    nearWhiteRatio: nearWhite / lumas.length,
    nearBlackRatio: nearBlack / lumas.length,
    activeLumaBins: [...bins].filter((count) => count >= minimumBinSupport).length,
  };
  return {
    ...metrics,
    valid: metrics.nearWhiteRatio <= RENDERABLE_CONTENT_THRESHOLDS.maximumNearWhiteRatio
      && metrics.nearBlackRatio <= RENDERABLE_CONTENT_THRESHOLDS.maximumNearBlackRatio
      && metrics.standardDeviation >= RENDERABLE_CONTENT_THRESHOLDS.minimumLumaStandardDeviation
      && metrics.dynamicRange >= RENDERABLE_CONTENT_THRESHOLDS.minimumLumaDynamicRange
      && metrics.activeLumaBins >= RENDERABLE_CONTENT_THRESHOLDS.minimumActiveLumaBins,
  };
}

export function assertRenderableContent(frame, label) {
  const result = measureRenderableContent(frame);
  if (!result.valid) {
    throw new Error(`${label} is not renderable content: ${JSON.stringify(result)}.`);
  }
  return result;
}

export function requireSourceRevision(environment) {
  const revision = environment.TELEMETRY_SOURCE_REVISION;
  if (typeof revision !== 'string' || !/^[0-9a-f]{40}$/i.test(revision)) {
    throw new Error('TELEMETRY_SOURCE_REVISION must be the required full 40-character source commit SHA.');
  }
  return revision.toLowerCase();
}

function parseArguments(argv, environment) {
  const options = {
    mode: 'gate',
    baseUrl: environment.SHOWROOM_URL ?? DEFAULT_BASE_URL,
    outputDir: DEFAULT_OUTPUT_DIR,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (index === 0 && argument === '--') continue;
    if (!['--mode', '--base-url', '--output'].includes(argument)) {
      throw new Error(`Unknown weather identity option: ${argument}`);
    }
    const value = argv[index + 1];
    if (value === undefined || value.startsWith('--')) {
      throw new Error(`${argument} requires a value.`);
    }
    index += 1;
    if (argument === '--mode') options.mode = value;
    if (argument === '--base-url') options.baseUrl = value;
    if (argument === '--output') options.outputDir = value;
  }
  if (!['baseline', 'gate'].includes(options.mode)) {
    throw new Error(`--mode must be "baseline" or "gate"; received "${options.mode}".`);
  }
  let parsedBaseUrl;
  try {
    parsedBaseUrl = new URL(options.baseUrl);
  } catch {
    throw new Error(`--base-url must be an absolute URL; received "${options.baseUrl}".`);
  }
  if (!['http:', 'https:'].includes(parsedBaseUrl.protocol)) {
    throw new Error(`--base-url must use HTTP or HTTPS; received "${parsedBaseUrl.protocol}".`);
  }
  if (options.outputDir.trim() === '') throw new Error('--output cannot be empty.');
  return options;
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

async function prepareDeterministicPage(page, baseUrl) {
  const epoch = new Date(CLOCK_EPOCH);
  await page.clock.install({ time: epoch });
  await page.clock.pauseAt(epoch);
  await page.goto(`${baseUrl}/#/room/voxel-water`, { waitUntil: 'load' });
  await page.locator('.language-select select').selectOption('en');
  await page.clock.runFor(BOOT_TIME_MS);

  const canvas = page.locator('.shader-canvas');
  await canvas.waitFor({ state: 'visible', timeout: 10_000 });
  await page.locator('.canvas-loader').waitFor({ state: 'hidden', timeout: 10_000 });
  await page.locator('[data-telemetry-state="live"]').waitFor({
    state: 'visible',
    timeout: 10_000,
  });
  return canvas;
}

async function prewarmRenderer(browser, baseUrl) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'en',
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  const browserErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => browserErrors.push(`pageerror: ${error.message}`));

  try {
    const canvas = await prepareDeterministicPage(page, baseUrl);

    let elapsedMs = 0;
    const checks = [];
    for (let index = 0; index < WEATHER_IDENTITY_PREWARM_TIMES_MS.length; index += 1) {
      const sampleTimeMs = WEATHER_IDENTITY_PREWARM_TIMES_MS[index];
      await page.clock.runFor(sampleTimeMs - elapsedMs);
      elapsedMs = sampleTimeMs;
      await page.locator('[data-telemetry-state="live"]').waitFor({
        state: 'visible',
        timeout: 10_000,
      });
      const buffer = await canvas.screenshot({ type: 'png' });
      const frame = parsePng(buffer);
      const thumbnail = areaAverageResize(frame, THUMBNAIL.width, THUMBNAIL.height);
      checks.push({
        index,
        sampleTimeMs,
        sha256: sha256(buffer),
        validation: measureRenderableContent(thumbnail),
      });
    }

    const consecutiveChecks = checks.slice(-REQUIRED_CONSECUTIVE_RENDERABLE_PREWARM_FRAMES);
    const passed = consecutiveChecks.length === REQUIRED_CONSECUTIVE_RENDERABLE_PREWARM_FRAMES
      && consecutiveChecks.every((check) => check.validation.valid);
    if (!passed) {
      throw new Error(
        'Weather identity renderer prewarm did not produce two consecutive renderable frames: '
        + `${JSON.stringify(checks)}.`,
      );
    }
    if (browserErrors.length > 0) {
      throw new Error(`Weather identity renderer prewarm browser errors:\n${browserErrors.join('\n')}`);
    }
    return {
      route: '#/room/voxel-water',
      checks,
      validation: {
        requiredConsecutiveRenderableFrames: REQUIRED_CONSECUTIVE_RENDERABLE_PREWARM_FRAMES,
        evaluatedSampleTimesMs: consecutiveChecks.map((check) => check.sampleTimeMs),
        passed,
      },
      browserErrors,
    };
  } finally {
    await context.close();
  }
}

async function captureState(browser, baseUrl, outputDir, weather) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'en',
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  const browserErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => browserErrors.push(`pageerror: ${error.message}`));

  try {
    const canvas = await prepareDeterministicPage(page, baseUrl);
    await page.getByTestId(`voxel-water-weather-${weather}`).click();
    let elapsedMs = 0;
    const frameCaptures = [];
    for (let index = 0; index < WEATHER_IDENTITY_SAMPLE_TIMES_MS.length; index += 1) {
      const sampleTimeMs = WEATHER_IDENTITY_SAMPLE_TIMES_MS[index];
      await page.clock.runFor(sampleTimeMs - elapsedMs);
      elapsedMs = sampleTimeMs;
      await page.locator('[data-telemetry-state="live"]').waitFor({
        state: 'visible',
        timeout: 10_000,
      });
      const buffer = await canvas.screenshot({ type: 'png' });
      const frame = parsePng(buffer);
      const thumbnail = areaAverageResize(frame, THUMBNAIL.width, THUMBNAIL.height);
      const validation = assertRenderableContent(
        thumbnail,
        `${weather} formal frame ${index} at ${sampleTimeMs}ms`,
      );
      const path = `${outputDir}/${weather}-frame-${String(index).padStart(2, '0')}.png`;
      await writeFile(path, buffer);
      frameCaptures.push({
        index,
        sampleTimeMs,
        buffer,
        frame,
        thumbnail,
        validation,
        evidence: { path, sha256: sha256(buffer), validation },
      });
    }

    const state = await page.evaluate((expectedWeather) => {
      const target = document.querySelector('.shader-canvas');
      const shell = document.querySelector('.canvas-shell');
      const activeWeather = [...document.querySelectorAll('[data-testid^="voxel-water-weather-"]')]
        .filter((element) => element.classList.contains('active'))
        .map((element) => element.getAttribute('data-testid')?.replace('voxel-water-weather-', ''));
      if (!(target instanceof HTMLCanvasElement) || !(shell instanceof HTMLElement)) {
        throw new Error('Voxel-water canvas and shell must both exist.');
      }
      if (activeWeather.length !== 1 || activeWeather[0] !== expectedWeather) {
        throw new Error(
          `Expected active weather ${expectedWeather}; received ${JSON.stringify(activeWeather)}.`,
        );
      }
      const rangeControls = [...document.querySelectorAll('.inspector-controls input[type="range"]')]
        .map((input) => {
          if (!(input instanceof HTMLInputElement)) throw new Error('Range control is not an input.');
          const label = input.closest('label')?.querySelector('.control-label > span')?.textContent;
          if (!label) throw new Error('Range control is missing its label.');
          return {
            label,
            value: input.value,
            min: input.min,
            max: input.max,
            step: input.step,
          };
        });
      if (rangeControls.length !== 15) {
        throw new Error(`Expected 15 voxel-water range controls; received ${rangeControls.length}.`);
      }
      const shellRect = shell.getBoundingClientRect();
      return {
        activeWeather: activeWeather[0],
        hash: window.location.hash,
        rangeControls,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        devicePixelRatio: window.devicePixelRatio,
        canvas: {
          cssWidth: shellRect.width,
          cssHeight: shellRect.height,
          backingWidth: target.width,
          backingHeight: target.height,
        },
        loaderCount: document.querySelectorAll('.canvas-loader').length,
      };
    }, weather);

    for (const capture of frameCaptures) {
      if (capture.frame.width !== Math.round(state.canvas.cssWidth)
        || capture.frame.height !== Math.round(state.canvas.cssHeight)) {
        throw new Error(
          `Canvas screenshot ${capture.index} for ${weather} is `
          + `${capture.frame.width}x${capture.frame.height}; `
          + `expected ${state.canvas.cssWidth}x${state.canvas.cssHeight}.`,
        );
      }
    }
    const pagePath = `${outputDir}/${weather}-page.png`;
    await page.screenshot({ path: pagePath, fullPage: false });
    if (browserErrors.length > 0) {
      throw new Error(`${weather} browser errors:\n${browserErrors.join('\n')}`);
    }
    return {
      weather,
      state,
      frames: frameCaptures,
      evidence: {
        page: pagePath,
        frames: frameCaptures.map((capture) => ({
          index: capture.index,
          sampleTimeMs: capture.sampleTimeMs,
          ...capture.evidence,
        })),
      },
      browserErrors,
    };
  } finally {
    await context.close();
  }
}

function assertEquivalentControls(captures) {
  const canonical = JSON.stringify(captures[0].state.rangeControls);
  for (const capture of captures) {
    const [route, rawQuery = ''] = capture.state.hash.split('?');
    if (route !== '#/room/voxel-water') {
      throw new Error(`Unexpected weather identity route for ${capture.weather}: ${route}`);
    }
    const query = new URLSearchParams(rawQuery);
    const expectedEntries = capture.weather === 'clear'
      ? []
      : [['v', '3'], ['weather', capture.weather]];
    if (JSON.stringify([...query.entries()].sort()) !== JSON.stringify(expectedEntries.sort())) {
      throw new Error(
        `Weather-only route for ${capture.weather} contains unexpected state: ${capture.state.hash}`,
      );
    }
  }
  for (const capture of captures.slice(1)) {
    const actual = JSON.stringify(capture.state.rangeControls);
    if (actual !== canonical) {
      throw new Error(
        `Weather-only protocol violated: ${capture.weather} numeric controls differ from clear.`,
      );
    }
  }
  const dimensions = JSON.stringify(captures[0].state.canvas);
  for (const capture of captures.slice(1)) {
    if (JSON.stringify(capture.state.canvas) !== dimensions) {
      throw new Error(`Canvas dimensions differ for ${capture.weather}.`);
    }
  }
}

export async function runWeatherIdentity({
  environment = process.env,
  argumentsList = process.argv.slice(2),
} = {}) {
  const sourceRevision = requireSourceRevision(environment);
  const options = parseArguments(argumentsList, environment);
  await mkdir(options.outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  let prewarm;
  let captures;
  try {
    prewarm = await prewarmRenderer(browser, options.baseUrl);
    captures = [];
    for (const weather of STATES) {
      captures.push(await captureState(browser, options.baseUrl, options.outputDir, weather));
    }
  } finally {
    await browser.close();
  }
  assertEquivalentControls(captures);

  const thumbnailSeries = Object.fromEntries(captures.map((capture) => (
    [capture.weather, capture.frames.map((frame) => frame.thumbnail)]
  )));
  const evaluation = evaluateWeatherIdentitySeries(
    thumbnailSeries,
    WEATHER_IDENTITY_SAMPLE_TIMES_MS,
  );
  const thumbnails = Object.fromEntries(captures.map((capture) => [
    capture.weather,
    capture.frames[evaluation.aggregation.medoids[capture.weather].index].thumbnail,
  ]));
  for (const capture of captures) {
    const medoid = evaluation.aggregation.medoids[capture.weather];
    const representative = capture.frames[medoid.index];
    const canvasPath = `${options.outputDir}/${capture.weather}-canvas.png`;
    await writeFile(canvasPath, representative.buffer);
    capture.evidence.canvas = canvasPath;
    capture.evidence.canvasSha256 = representative.evidence.sha256;
    capture.evidence.representativeIndex = medoid.index;
    capture.evidence.representativeSampleTimeMs = medoid.sampleTimeMs;
  }
  const sheet = composeContactSheet([
    thumbnails.clear,
    thumbnails.rain,
    thumbnails.storm,
    toRec709Grayscale(thumbnails.clear),
    toRec709Grayscale(thumbnails.rain),
    toRec709Grayscale(thumbnails.storm),
  ], 3);
  const sheetPath = `${options.outputDir}/weather-identity-sheet.png`;
  await writeFile(sheetPath, encodePng(sheet));

  const generatedAt = new Date().toISOString();
  const protocol = {
    mode: options.mode,
    baseUrl: options.baseUrl,
    viewport: VIEWPORT,
    thumbnail: THUMBNAIL,
    clockEpoch: CLOCK_EPOCH,
    bootTimeMs: BOOT_TIME_MS,
    deterministicBoot: {
      freezeAtClockEpochBeforeNavigation: true,
      advanceMethod: 'clock.runFor',
      readinessWaitsAfterBootAdvance: true,
    },
    prewarmTimesMs: WEATHER_IDENTITY_PREWARM_TIMES_MS,
    requiredConsecutiveRenderablePrewarmFrames:
      REQUIRED_CONSECUTIVE_RENDERABLE_PREWARM_FRAMES,
    prewarmPolicy: 'independent context before all weather captures; excluded from statistics',
    sampleTimesMs: WEATHER_IDENTITY_SAMPLE_TIMES_MS,
    frameCountPerState: WEATHER_IDENTITY_SAMPLE_TIMES_MS.length,
    representativePolicy: 'within-state structure medoid',
    robustGateQuantile: evaluation.aggregation.robustGateQuantile,
    minimumPassRate: evaluation.aggregation.minimumPassRate,
    renderableContentThresholds: RENDERABLE_CONTENT_THRESHOLDS,
    weatherOnly: true,
    stateOrder: STATES,
  };
  const raw = {
    generatedAt,
    sourceRevision,
    protocol,
    prewarm,
    states: Object.fromEntries(captures.map((capture) => [capture.weather, {
      state: capture.state,
      evidence: capture.evidence,
      browserErrors: capture.browserErrors,
    }])),
    metrics: evaluation,
  };
  const rawPath = `${options.outputDir}/weather-identity-raw.json`;
  await writeFile(rawPath, json(raw));

  const report = {
    generatedAt,
    sourceRevision,
    pass: evaluation.pass,
    mode: options.mode,
    prewarm,
    artifacts: {
      sheet: sheetPath,
      raw: rawPath,
      states: Object.fromEntries(captures.map((capture) => [capture.weather, capture.evidence])),
    },
    protocol,
    thresholds: evaluation.thresholds,
    aggregation: evaluation.aggregation,
    structure: evaluation.structure,
    cues: evaluation.cues,
    comparisons: evaluation.comparisons,
    gates: evaluation.gates,
  };
  const reportPath = `${options.outputDir}/weather-identity-report.json`;
  await writeFile(reportPath, json(report));
  console.log(json(report));

  if (options.mode === 'gate' && !evaluation.pass) {
    const failedGates = Object.entries(evaluation.gates)
      .filter(([, passed]) => !passed)
      .map(([name]) => name);
    throw new Error(`Weather identity gates failed: ${failedGates.join(', ')}.`);
  }
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runWeatherIdentity();
}
