import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright';
import { parsePng } from './water-qa-metrics.mjs';
import {
  aggregateCoverage,
  aggregateFrameMetrics,
  areaAverageResize,
  composeContactSheet,
  encodePng,
  fourBinCoverage,
  measureRegionLuma,
  measureRidgeMasks,
  measureSun,
  measureWaterMetrics,
  percentile,
  posterizeFrame,
  resizeMaskSupport,
} from './water-value-metrics.mjs';

const BASE_URL = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const OUTPUT_DIR = 'output/water-value-qa';
const VIEWPORT = Object.freeze({ width: 1440, height: 900 });
const CANVAS_CSS = Object.freeze({ width: 862, height: 735 });
const CANVAS_BACKING = Object.freeze({ width: 474, height: 404 });
const FRAME_COUNT = 16;
const WARM_UP_MS = 1200;
const PLAYWRIGHT_CLOCK_RAF_MS = 16;
const FRAME_INTERVAL_MS = 120;
const RENDER_SETTLE_MS = 1000;
const CLOCK_EPOCH = '2026-01-01T00:00:00.000Z';
const THUMBNAIL = Object.freeze({ width: 160, height: 136 });
const NOMINAL_SAMPLE_TIMES_MS = Object.freeze(Array.from(
  { length: FRAME_COUNT },
  (_, index) => WARM_UP_MS + FRAME_INTERVAL_MS * (index + 1),
));
const SAMPLE_TIMES_MS = Object.freeze(NOMINAL_SAMPLE_TIMES_MS.map(
  (time) => Math.ceil(time / PLAYWRIGHT_CLOCK_RAF_MS) * PLAYWRIGHT_CLOCK_RAF_MS,
));

const COLUMN_SIDE_ROI = Object.freeze({ x0: 0.275, y0: 0.750, x1: 0.426, y1: 0.830 });
const WATER_MID_ROI = Object.freeze({ x0: 0.650, y0: 0.422, x1: 0.835, y1: 0.531 });
const RIDGE_ROI = Object.freeze({ x0: 0.093, y0: 0.204, x1: 0.905, y1: 0.680 });
const CREST_CONTRACT = Object.freeze({ threshold: 5, area: 24, width: 12, aspect: 1.3 });
const FOAM_CONTRACT = Object.freeze({ threshold: 15, area: 12, width: 8, aspect: 1.2 });

const STATES = Object.freeze([
  Object.freeze({ id: 'default', route: '#/room/voxel-water' }),
  Object.freeze({ id: 'rain', route: '#/room/voxel-water?v=3&weather=rain' }),
  Object.freeze({
    id: 'storm',
    route: '#/room/voxel-water?v=3&weather=storm&wind=2.1&rain=0.74&waveHeight=1.08&cloudCover=0.78&swell=0.9&chop=0.82&foam=0.78&clarity=0.52&surfaceDetail=0.86&currentDirection=58&currentStrength=0.78&skyTime=0.24&colorTemperature=-0.22&voxelColorVariance=0.46',
  }),
  Object.freeze({ id: 'solar', route: '#/room/voxel-water?v=3&skyTime=0.18' }),
]);

const BEFORE_BASELINE = Object.freeze({
  fourBinCoveragePercent: Object.freeze({
    default: Object.freeze([0, 0, 94.06, 5.94]),
    calm: Object.freeze([0, 1.28, 95.98, 2.74]),
    rain: Object.freeze([0, 93.94, 6.06, 0]),
    storm: Object.freeze([0.47, 99.49, 0.03, 0]),
  }),
  waterLuma: Object.freeze({ default: 158.2, rain: 114.9, storm: 103.6 }),
});

function aggregateNullable(values, quantile) {
  return values.some((value) => value === null) ? null : percentile(values, quantile);
}

function rectangleMask(width, height, region) {
  const mask = new Uint8Array(width * height);
  const x0 = Math.floor(region.x0 * width);
  const x1 = Math.ceil(region.x1 * width);
  const y0 = Math.floor(region.y0 * height);
  const y1 = Math.ceil(region.y1 * height);
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) mask[y * width + x] = 1;
  }
  return mask;
}

function summarizeSun(measurements) {
  if (measurements.some((measurement) => measurement === null)) return null;
  const values = (field) => measurements.map((measurement) => measurement[field]);
  return {
    areaP10: percentile(values('area'), 0.1),
    widthP10: percentile(measurements.map((measurement) => measurement.bbox.width), 0.1),
    widthP90: percentile(measurements.map((measurement) => measurement.bbox.width), 0.9),
    heightP10: percentile(measurements.map((measurement) => measurement.bbox.height), 0.1),
    heightP90: percentile(measurements.map((measurement) => measurement.bbox.height), 0.9),
    aspectP10: percentile(values('aspectRatio'), 0.1),
    aspectP90: percentile(values('aspectRatio'), 0.9),
    circularityP10: percentile(values('circularity'), 0.1),
    solidityP10: percentile(values('solidity'), 0.1),
    verticalRunRatioP90: percentile(values('verticalRunRatio'), 0.9),
    frames: measurements,
  };
}

function summarizeSemantic(frameSemantic) {
  return {
    columnSideMedianP90: percentile(frameSemantic.map((entry) => entry.columnSideMedian), 0.9),
    waterMidMedianP10: percentile(frameSemantic.map((entry) => entry.waterMidMedian), 0.1),
    waterMidMedianP90: percentile(frameSemantic.map((entry) => entry.waterMidMedian), 0.9),
    crestMedianP10: aggregateNullable(frameSemantic.map((entry) => entry.crestMedian), 0.1),
    crestMedianP90: aggregateNullable(frameSemantic.map((entry) => entry.crestMedian), 0.9),
    foamMedianP10: aggregateNullable(frameSemantic.map((entry) => entry.foamMedian), 0.1),
    foamPixelCountP10: percentile(frameSemantic.map((entry) => entry.foamPixelCount), 0.1),
  };
}

async function captureState(browser, state) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'en',
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  const epoch = new Date(CLOCK_EPOCH);
  await page.clock.install({ time: epoch });
  await page.clock.pauseAt(epoch);
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));

  await page.goto(`${BASE_URL}/${state.route}`, { waitUntil: 'load' });
  const canvas = page.locator('.shader-canvas');
  await canvas.waitFor({ state: 'visible', timeout: 10_000 });
  await page.locator('.canvas-loader').waitFor({ state: 'hidden', timeout: 10_000 });
  await page.locator('.language-select select').selectOption('en');

  await page.clock.runFor(WARM_UP_MS);
  await page.locator('[data-telemetry-state="live"]').waitFor({
    state: 'visible',
    timeout: 10_000,
  });

  await page.waitForFunction(({ css, backing }) => {
    const shell = document.querySelector('.canvas-shell');
    const target = document.querySelector('.shader-canvas');
    if (!(shell instanceof HTMLElement) || !(target instanceof HTMLCanvasElement)) return false;
    const rect = shell.getBoundingClientRect();
    return rect.width === css.width && rect.height === css.height
      && target.width === backing.width && target.height === backing.height;
  }, { css: CANVAS_CSS, backing: CANVAS_BACKING }, { timeout: 10_000 });

  const dimensions = await page.evaluate(() => {
    const shell = document.querySelector('.canvas-shell');
    const target = document.querySelector('.shader-canvas');
    if (!(shell instanceof HTMLElement) || !(target instanceof HTMLCanvasElement)) {
      throw new Error('Water canvas DOM is unavailable.');
    }
    const rect = shell.getBoundingClientRect();
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      devicePixelRatio: window.devicePixelRatio,
      css: { width: rect.width, height: rect.height },
      backing: { width: target.width, height: target.height },
      loaderCount: document.querySelectorAll('.canvas-loader').length,
    };
  });

  await page.waitForTimeout(RENDER_SETTLE_MS);
  const frames = [];
  let clockTime = WARM_UP_MS;
  for (const sampleTime of SAMPLE_TIMES_MS) {
    await page.clock.runFor(sampleTime - clockTime);
    clockTime = sampleTime;
    frames.push(parsePng(await canvas.screenshot({ type: 'png' })));
  }
  await context.close();
  return { frames, dimensions, consoleErrors };
}

function analyzeState(state, capture) {
  const frameMetrics = capture.frames.map((frame) => measureWaterMetrics(frame));
  const aggregate = aggregateFrameMetrics(frameMetrics);
  const coverage = aggregateCoverage(capture.frames.map((frame) => fourBinCoverage(frame)));
  const frameSemantic = capture.frames.map((frame) => {
    const [crest, foam] = measureRidgeMasks(frame, RIDGE_ROI, [CREST_CONTRACT, FOAM_CONTRACT]);
    return {
      columnSideMedian: measureRegionLuma(frame, COLUMN_SIDE_ROI).median,
      waterMidMedian: measureRegionLuma(frame, WATER_MID_ROI).median,
      crestMedian: crest.median,
      foamMedian: foam.median,
      foamPixelCount: foam.pixelCount,
    };
  });
  const representativeIndex = frameMetrics.reduce((closest, metrics, index) => (
    Math.abs(metrics.waterLuma - aggregate.waterLuma)
      < Math.abs(frameMetrics[closest].waterLuma - aggregate.waterLuma) ? index : closest
  ), 0);
  const representative = capture.frames[representativeIndex];
  const [crest, foam] = measureRidgeMasks(
    representative,
    RIDGE_ROI,
    [CREST_CONTRACT, FOAM_CONTRACT],
  );
  const resized = areaAverageResize(representative, THUMBNAIL.width, THUMBNAIL.height);
  const thumbnail = posterizeFrame(resized);
  const semanticMaskPixels = {
    columnSide: resizeMaskSupport(
      rectangleMask(representative.width, representative.height, COLUMN_SIDE_ROI),
      representative.width, representative.height, THUMBNAIL.width, THUMBNAIL.height,
    ),
    waterMid: resizeMaskSupport(
      rectangleMask(representative.width, representative.height, WATER_MID_ROI),
      representative.width, representative.height, THUMBNAIL.width, THUMBNAIL.height,
    ),
    crest: resizeMaskSupport(
      crest.mask, representative.width, representative.height, THUMBNAIL.width, THUMBNAIL.height,
    ),
    foam: resizeMaskSupport(
      foam.mask, representative.width, representative.height, THUMBNAIL.width, THUMBNAIL.height,
    ),
  };
  return {
    id: state.id,
    representative,
    thumbnailFrame: thumbnail.frame,
    report: {
      dimensions: capture.dimensions,
      consoleErrors: capture.consoleErrors,
      framePixelHashes: capture.frames.map((frame) =>
        createHash('sha256').update(frame.pixels).digest('hex')),
      representativeFrame: representativeIndex,
      water: {
        waterLuma: aggregate.waterLuma,
        toonBandSeparation: aggregate.toonBandSeparation,
        voxelLocalContrast: aggregate.voxelLocalContrast,
      },
      fourBinCoverage: coverage,
      semantic: summarizeSemantic(frameSemantic),
      thumbnail: {
        width: THUMBNAIL.width,
        height: THUMBNAIL.height,
        fourBinCoverage: thumbnail.coverage,
        grayP05: thumbnail.grayP05,
        grayP95: thumbnail.grayP95,
        semanticMaskPixels,
      },
      sun: state.id === 'solar' ? summarizeSun(capture.frames.map((frame) => measureSun(frame))) : null,
    },
  };
}

function collectFailures(results) {
  const failures = [];
  const fail = (condition, message) => { if (!condition) failures.push(message); };
  for (const result of results) {
    const { id, report } = result;
    fail(report.consoleErrors.length === 0, `${id}: console errors: ${report.consoleErrors.join(' | ')}`);
    fail(report.dimensions.viewport.width === VIEWPORT.width
      && report.dimensions.viewport.height === VIEWPORT.height, `${id}: viewport is not 1440x900.`);
    fail(report.dimensions.devicePixelRatio === 1, `${id}: DPR is not 1.`);
    fail(report.dimensions.css.width === CANVAS_CSS.width
      && report.dimensions.css.height === CANVAS_CSS.height, `${id}: CSS canvas is not 862x735.`);
    fail(report.dimensions.backing.width === CANVAS_BACKING.width
      && report.dimensions.backing.height === CANVAS_BACKING.height, `${id}: backing store is not 474x404.`);
    fail(report.dimensions.loaderCount === 0, `${id}: loader remains mounted.`);
    report.fourBinCoverage.forEach((coverage, bin) => {
      fail(coverage >= 0.05, `${id}: full-size value bin ${bin} coverage ${coverage} is below 0.05.`);
    });
    fail(report.semantic.columnSideMedianP90 < 64, `${id}: column-side median p90 is not below 64.`);
    fail(report.semantic.waterMidMedianP10 >= 64, `${id}: water-mid median p10 is below 64.`);
    fail(report.semantic.waterMidMedianP90 <= 127, `${id}: water-mid median p90 exceeds 127.`);
    fail(report.semantic.crestMedianP10 !== null && report.semantic.crestMedianP10 >= 128,
      `${id}: crest median p10 is missing or below 128.`);
    fail(report.semantic.crestMedianP90 !== null && report.semantic.crestMedianP90 <= 191,
      `${id}: crest median p90 is missing or exceeds 191.`);
    fail(report.semantic.foamMedianP10 !== null && report.semantic.foamMedianP10 >= 192,
      `${id}: foam median p10 is missing or below 192.`);
    fail(report.semantic.foamPixelCountP10 >= 256, `${id}: foam pixels p10 is below 256.`);
    report.thumbnail.fourBinCoverage.forEach((coverage, bin) => {
      fail(coverage >= 0.03, `${id}: thumbnail value bin ${bin} coverage ${coverage} is below 0.03.`);
    });
    fail(report.thumbnail.grayP05 < 64, `${id}: thumbnail gray p05 is not below 64.`);
    fail(report.thumbnail.grayP95 >= 192, `${id}: thumbnail gray p95 is below 192.`);
    for (const [semantic, count] of Object.entries(report.thumbnail.semanticMaskPixels)) {
      fail(count >= 8, `${id}: thumbnail ${semantic} mask has fewer than 8 pixels.`);
    }
  }

  const byId = Object.fromEntries(results.map((result) => [result.id, result.report]));
  fail(byId.default.water.voxelLocalContrast >= 3, 'default: voxelLocalContrast is below 3.0.');
  fail(byId.default.water.toonBandSeparation >= 7.5, 'default: toonBandSeparation is below 7.5.');
  fail(byId.rain.water.toonBandSeparation >= 6.3, 'rain: toonBandSeparation is below 6.3.');
  fail(byId.default.water.waterLuma >= 125 && byId.default.water.waterLuma <= 155,
    'default: waterLuma is outside 125..155.');
  fail(byId.default.water.waterLuma - byId.rain.water.waterLuma >= 35,
    'default-rain waterLuma separation is below 35.');
  fail(byId.rain.water.waterLuma - byId.storm.water.waterLuma >= 30,
    'rain-storm waterLuma separation is below 30.');
  fail(byId.default.semantic.waterMidMedianP10 > byId.default.semantic.columnSideMedianP90,
    'default: water mid does not remain above the column-side anchor.');
  fail(byId.default.semantic.crestMedianP10 > byId.default.semantic.waterMidMedianP90,
    'default: crest does not remain above water mid.');

  const sun = byId.solar.sun;
  fail(sun !== null, 'solar: no sun component found in every frame.');
  if (sun !== null) {
    fail(sun.areaP10 >= 100, 'solar: sun area p10 is below 100 px.');
    fail(sun.widthP10 >= 18 && sun.widthP90 <= 80, 'solar: sun width is outside 18..80 px.');
    fail(sun.heightP10 >= 18 && sun.heightP90 <= 80, 'solar: sun height is outside 18..80 px.');
    fail(sun.aspectP10 >= 0.8 && sun.aspectP90 <= 1.25, 'solar: sun aspect is outside 0.80..1.25.');
    fail(sun.circularityP10 >= 0.75, 'solar: sun circularity p10 is below 0.75.');
    fail(sun.solidityP10 >= 0.78, 'solar: sun solidity p10 is below 0.78.');
    fail(sun.verticalRunRatioP90 <= 1.5, 'solar: vertical bright run ratio p90 exceeds 1.5.');
  }
  return failures;
}

await mkdir(OUTPUT_DIR, { recursive: true });
const browser = await chromium.launch({ headless: true });
const analyzed = [];
try {
  for (const state of STATES) {
    console.log(`Capturing water value state: ${state.id}`);
    analyzed.push(analyzeState(state, await captureState(browser, state)));
  }
} finally {
  await browser.close();
}

for (const result of analyzed) {
  const canvasPath = `${OUTPUT_DIR}/${result.id}-canvas.png`;
  const thumbnailPath = `${OUTPUT_DIR}/${result.id}-thumbnail.png`;
  await writeFile(canvasPath, encodePng(result.representative));
  await writeFile(thumbnailPath, encodePng(result.thumbnailFrame));
  result.report.artifacts = { canvas: canvasPath, thumbnail: thumbnailPath };
}
const contactSheetPath = `${OUTPUT_DIR}/water-value-contact-sheet.png`;
await writeFile(contactSheetPath, encodePng(composeContactSheet(
  analyzed.map((result) => result.thumbnailFrame),
)));
const failures = collectFailures(analyzed);
const report = {
  contract: {
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'en',
    reducedMotion: 'no-preference',
    canvasCss: CANVAS_CSS,
    canvasBacking: CANVAS_BACKING,
    frameCount: FRAME_COUNT,
    warmUpMs: WARM_UP_MS,
    playwrightClockRafMs: PLAYWRIGHT_CLOCK_RAF_MS,
    frameIntervalMs: FRAME_INTERVAL_MS,
    renderSettleMs: RENDER_SETTLE_MS,
    clockEpoch: CLOCK_EPOCH,
    nominalSampleTimesMs: NOMINAL_SAMPLE_TIMES_MS,
    sampleTimesMs: SAMPLE_TIMES_MS,
    thumbnail: THUMBNAIL,
  },
  beforeBaseline: BEFORE_BASELINE,
  states: Object.fromEntries(analyzed.map((result) => [result.id, result.report])),
  contactSheet: contactSheetPath,
  passed: failures.length === 0,
  failures,
};
const reportPath = `${OUTPUT_DIR}/water-value-report.json`;
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (failures.length > 0) {
  throw new Error(`Water value QA failed with ${failures.length} violation(s). See ${reportPath}.`);
}
