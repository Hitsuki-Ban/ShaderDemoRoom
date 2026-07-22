import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { parsePng } from './water-qa-metrics.mjs';
import {
  areaAverageResize,
  composeContactSheet,
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
const SAMPLE_TIMES_MS = Object.freeze([1600, 2400, 3200, 4000, 4800, 5600, 6400, 7200]);
const STATES = Object.freeze(['clear', 'rain', 'storm']);

function parseArguments(argv) {
  const options = {
    mode: 'gate',
    baseUrl: process.env.SHOWROOM_URL ?? DEFAULT_BASE_URL,
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

async function captureState(browser, baseUrl, outputDir, weather) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'en',
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  const epoch = new Date(CLOCK_EPOCH);
  await page.clock.install({ time: epoch });
  const browserErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => browserErrors.push(`pageerror: ${error.message}`));

  try {
    await page.goto(`${baseUrl}/#/room/voxel-water`, { waitUntil: 'load' });
    const canvas = page.locator('.shader-canvas');
    await canvas.waitFor({ state: 'visible', timeout: 10_000 });
    await page.locator('.canvas-loader').waitFor({ state: 'hidden', timeout: 10_000 });
    await page.locator('.language-select select').selectOption('en');
    await page.clock.pauseAt(new Date(epoch.getTime() + BOOT_TIME_MS));
    await page.getByTestId(`voxel-water-weather-${weather}`).click();
    const frameCaptures = [];
    let elapsedMs = 0;
    for (let index = 0; index < SAMPLE_TIMES_MS.length; index += 1) {
      const sampleTimeMs = SAMPLE_TIMES_MS[index];
      await page.clock.runFor(sampleTimeMs - elapsedMs);
      elapsedMs = sampleTimeMs;
      await page.locator('[data-telemetry-state="live"]').waitFor({
        state: 'visible',
        timeout: 10_000,
      });
      const buffer = await canvas.screenshot({ type: 'png' });
      const frame = parsePng(buffer);
      const path = `${outputDir}/${weather}-frame-${String(index).padStart(2, '0')}.png`;
      await writeFile(path, buffer);
      frameCaptures.push({
        index,
        sampleTimeMs,
        buffer,
        frame,
        thumbnail: areaAverageResize(frame, THUMBNAIL.width, THUMBNAIL.height),
        evidence: { path, sha256: sha256(buffer) },
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

const options = parseArguments(process.argv.slice(2));
await mkdir(options.outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
let captures;
try {
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
const evaluation = evaluateWeatherIdentitySeries(thumbnailSeries, SAMPLE_TIMES_MS);
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

const raw = {
  protocol: {
    mode: options.mode,
    baseUrl: options.baseUrl,
    viewport: VIEWPORT,
    thumbnail: THUMBNAIL,
    clockEpoch: CLOCK_EPOCH,
    bootTimeMs: BOOT_TIME_MS,
    sampleTimesMs: SAMPLE_TIMES_MS,
    frameCountPerState: SAMPLE_TIMES_MS.length,
    representativePolicy: 'within-state structure medoid',
    robustGateQuantile: evaluation.aggregation.robustGateQuantile,
    minimumPassRate: evaluation.aggregation.minimumPassRate,
    weatherOnly: true,
    stateOrder: STATES,
  },
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
  pass: evaluation.pass,
  mode: options.mode,
  artifacts: {
    sheet: sheetPath,
    raw: rawPath,
    states: Object.fromEntries(captures.map((capture) => [capture.weather, capture.evidence])),
  },
  protocol: raw.protocol,
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
