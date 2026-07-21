import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { chromium } from 'playwright';
import {
  assertBundledPlaywrightVersion,
  canonicalRgba8Bytes,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
  parseNinthTideConfig,
  sha256Hex,
} from './ninth-tide-core.mjs';
import {
  analyzeNearBlackRgba8,
  compareNearBlackDitherMetrics,
  NINTH_TIDE_NEAR_BLACK_LIMIT,
} from './ninth-tide-dither-metrics.mjs';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;
const baselinePath = 'docs/direction/baselines/t-nt-02-before.json';
const outputDir = 'output/playwright/ninth-tide-dither';
const freshRunCount = 2;
const fixedSeed = 0;
const comparisonSeed = 137;
const minimumAdjacentPairRatioReduction = 0.1;
const minimumLongestRunReduction = 5;
const expectedPassChain = Object.freeze([
  'RenderPass',
  'UnrealBloomPass',
  'AfterimagePass',
  'VeilShaderPass',
  'DitheredOutputPass',
]);

const manifest = {
  schemaVersion: 1,
  gate: 'qa:ninth-tide-dither',
  status: 'running',
  baselinePath,
  environment: {
    playwrightVersion,
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    browserLaunchOptions: NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
    contextOptions: NINTH_TIDE_CONTEXT_OPTIONS,
  },
  seeds: { fixed: fixedSeed, comparison: comparisonSeed },
  thresholds: {
    nearBlackMaxCode: NINTH_TIDE_NEAR_BLACK_LIMIT,
    maximumMeanLumaCodeShift: 0.5,
    minimumAdjacentPairRatioReduction,
    minimumLongestRunReduction,
    maximumSeedRgbCodeDifference: 1,
    maximumAbsoluteSeedMeanRgbCodeShift: 0.5,
  },
  runs: [],
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function stateUrl(buildUrl, state) {
  const url = new URL(buildUrl);
  url.searchParams.set('preview', state.mode);
  url.searchParams.set('section', String(state.section));
  return url.href;
}

async function captureCanvas(canvas) {
  const result = await canvas.evaluate(async (element) => {
    if (!(element instanceof HTMLCanvasElement)) {
      throw new TypeError('Ninth Tide dither capture target must be a canvas.');
    }
    const blob = await new Promise((resolve, reject) => {
      element.toBlob((value) => {
        if (value) resolve(value);
        else reject(new Error('Ninth Tide dither PNG encoding failed.'));
      }, 'image/png');
    });
    const bitmap = await createImageBitmap(blob, {
      colorSpaceConversion: 'none',
      premultiplyAlpha: 'none',
    });
    const copy = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = copy.getContext('2d', {
      alpha: true,
      colorSpace: 'srgb',
      willReadFrequently: true,
    });
    if (!context) throw new Error('Ninth Tide dither capture requires a 2D decode context.');
    context.drawImage(bitmap, 0, 0);
    bitmap.close();
    const rgba = context.getImageData(0, 0, copy.width, copy.height).data;

    const encodeBase64 = (bytes) => {
      let binary = '';
      for (let offset = 0; offset < bytes.length; offset += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
      }
      return btoa(binary);
    };

    return {
      width: copy.width,
      height: copy.height,
      pngBase64: encodeBase64(new Uint8Array(await blob.arrayBuffer())),
      rgbaBase64: encodeBase64(rgba),
    };
  });
  return {
    width: result.width,
    height: result.height,
    png: Buffer.from(result.pngBase64, 'base64'),
    rgba: Buffer.from(result.rgbaBase64, 'base64'),
  };
}

function compactMetrics(metrics) {
  return {
    width: metrics.width,
    height: metrics.height,
    roi: metrics.roi,
    roiPixels: metrics.roiPixels,
    nearBlackMaxCode: metrics.nearBlackMaxCode,
    meanLumaCode: metrics.meanLumaCode,
    lumaNearBlackHistogram: metrics.lumaNearBlackHistogram,
    occupiedNonzeroBins: metrics.occupiedNonzeroBins,
    interiorEmptyBins: metrics.interiorEmptyBins,
    maxInteriorZeroRun: metrics.maxInteriorZeroRun,
    dominantNonzeroBinRatio: metrics.dominantNonzeroBinRatio,
    equalHorizontalNearPairRatio: metrics.equalHorizontalNearPairRatio,
    longestHorizontalNearRun: metrics.longestHorizontalNearRun,
    nonzeroNearPixels: metrics.nonzeroNearPixels,
  };
}

function compareSeedOutputs(fixed, comparison) {
  assert(fixed.width === comparison.width && fixed.height === comparison.height,
    'Seed comparison frames must have identical dimensions.');
  assert(fixed.rgba.length === comparison.rgba.length,
    'Seed comparison frames must have identical RGBA8 byte lengths.');
  let maxRgbCodeDifference = 0;
  let signedRgbCodeDifferenceTotal = 0;
  let alphaChangedPixels = 0;
  let changedPixels = 0;
  for (let offset = 0; offset < fixed.rgba.length; offset += 4) {
    let pixelChanged = false;
    for (let channel = 0; channel < 3; channel += 1) {
      const difference = comparison.rgba[offset + channel] - fixed.rgba[offset + channel];
      signedRgbCodeDifferenceTotal += difference;
      maxRgbCodeDifference = Math.max(maxRgbCodeDifference, Math.abs(difference));
      if (difference !== 0) pixelChanged = true;
    }
    if (comparison.rgba[offset + 3] !== fixed.rgba[offset + 3]) alphaChangedPixels += 1;
    if (pixelChanged) changedPixels += 1;
  }
  const pixelCount = fixed.width * fixed.height;
  return {
    maxRgbCodeDifference,
    meanRgbCodeShift: signedRgbCodeDifferenceTotal / (pixelCount * 3),
    alphaChangedPixels,
    changedPixels,
  };
}

async function callScenario(page, state, seed) {
  return page.evaluate((request) => {
    if (typeof window.__NINTH_TIDE_DITHER_SCENARIO__ !== 'function') {
      throw new Error('Required __NINTH_TIDE_DITHER_SCENARIO__ hook is unavailable.');
    }
    return window.__NINTH_TIDE_DITHER_SCENARIO__(request);
  }, {
    mode: state.mode,
    section: state.section,
    timestampMs: state.timestampMs,
    seed,
  });
}

async function auditScenarioSingleFlight(page, state) {
  const outcomes = await page.evaluate(async ({ request, overlappingSeed }) => {
    const first = window.__NINTH_TIDE_DITHER_SCENARIO__(request);
    const second = window.__NINTH_TIDE_DITHER_SCENARIO__({
      ...request,
      seed: overlappingSeed,
    });
    return Promise.allSettled([first, second]).then((results) => results.map((result) => (
      result.status === 'fulfilled'
        ? { status: result.status, seed: result.value.seed }
        : {
            status: result.status,
            name: result.reason instanceof Error ? result.reason.name : typeof result.reason,
            message: result.reason instanceof Error ? result.reason.message : String(result.reason),
          }
    )));
  }, {
    request: {
      mode: state.mode,
      section: state.section,
      timestampMs: state.timestampMs,
      seed: fixedSeed,
    },
    overlappingSeed: comparisonSeed,
  });
  assert(isDeepStrictEqual(outcomes, [
    { status: 'fulfilled', seed: fixedSeed },
    {
      status: 'rejected',
      name: 'Error',
      message: 'Ninth Tide dither scenario is already running.',
    },
  ]), `${state.id} dither hook did not reject an overlapping readback: ${JSON.stringify(outcomes)}.`);
  return outcomes;
}

function assertHookContract(id, fixed, repeated, comparison) {
  assert(isDeepStrictEqual(fixed, repeated), `${id} fixed-seed repeated hook result changed.`);
  for (const hook of [fixed, comparison]) {
    assert(hook.frameRenders === 1 && hook.queuedAnimationFrames === 0,
      `${id} dither hook must render exactly one frame without RAF.`);
    assert(isDeepStrictEqual(hook.passChain, expectedPassChain),
      `${id} composer pass ownership/order changed: ${JSON.stringify(hook.passChain)}.`);
    assert(hook.outputOwners === 1, `${id} must expose exactly one DitheredOutputPass owner.`);
    assert(hook.intermediatePrecision?.composerHalfFloat === true,
      `${id} composer intermediates are not half-float.`);
    assert(hook.intermediatePrecision?.afterimageHalfFloat === true,
      `${id} Afterimage feedback targets are not half-float.`);
  }
  assert(fixed.stateDigest === comparison.stateDigest,
    `${id} seed changed the deterministic scene state.`);
  assert(fixed.afterimageFeedback.hash === comparison.afterimageFeedback.hash,
    `${id} dither seed leaked into Afterimage feedback.`);
  assert(fixed.framebuffer.hash !== comparison.framebuffer.hash,
    `${id} distinct live seeds did not change final output pixels.`);
}

function assertMetricGate(id, region, before, candidate, comparison) {
  assert(candidate.occupiedNonzeroBins >= before.occupiedNonzeroBins,
    `${id}/${region} lost occupied near-black luma bins.`);
  assert(
    comparison.equalHorizontalNearPairRatioDelta <= -minimumAdjacentPairRatioReduction,
    `${id}/${region} horizontal plateau ratio reduction was ${(-comparison.equalHorizontalNearPairRatioDelta).toFixed(4)}; expected at least ${minimumAdjacentPairRatioReduction}.`,
  );
  assert(
    comparison.longestHorizontalNearRunDelta <= -minimumLongestRunReduction,
    `${id}/${region} longest plateau reduction was ${-comparison.longestHorizontalNearRunDelta}; expected at least ${minimumLongestRunReduction}.`,
  );
}

async function auditSourceOwnership() {
  const [mainSource, passSource] = await Promise.all([
    readFile('ref/archive_of_the_ninth_tide_shoreless_web/src/main.js', 'utf8'),
    readFile('ref/archive_of_the_ninth_tide_shoreless_web/src/dithered-output-pass.js', 'utf8'),
  ]);
  assert((mainSource.match(/new DitheredOutputPass\(/g) ?? []).length === 1,
    'main.js must instantiate DitheredOutputPass exactly once.');
  assert(!mainSource.includes('new OutputPass(') && !mainSource.includes('postprocessing/OutputPass.js'),
    'main.js still owns the legacy OutputPass path.');
  assert(mainSource.includes('nextComposer.addPass(nextDitheredOutputPass);'),
    'main.js does not add the generation-owned DitheredOutputPass to its composer.');
  assert(!passSource.includes('.replace('),
    'DitheredOutputPass must not rewrite a three shader string.');
  assert(passSource.includes("three/src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl.js")
    && passSource.includes("three/src/renderers/shaders/ShaderChunk/colorspace_pars_fragment.glsl.js"),
  'DitheredOutputPass must statically own its required r184 shader chunk imports.');
}

async function captureState(context, config, state, runIndex) {
  const page = await context.newPage();
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    const response = await page.goto(stateUrl(config.buildUrl, state), {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });
    assert(response?.ok(), `${state.id} navigation failed with HTTP ${response?.status() ?? 'none'}.`);
    await page.waitForFunction(
      () => typeof window.__NINTH_TIDE_DITHER_SCENARIO__ === 'function',
      undefined,
      { timeout: 30_000 },
    );
    const canvas = page.locator('#scene canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 30_000 });

    const overlapGuard = await auditScenarioSingleFlight(page, state);
    const fixedHook = await callScenario(page, state, fixedSeed);
    const repeatedHook = await callScenario(page, state, fixedSeed);
    const fixedCapture = await captureCanvas(canvas);
    const fixedCanonicalHash = sha256Hex(
      canonicalRgba8Bytes(fixedCapture.width, fixedCapture.height, fixedCapture.rgba),
    );
    assert(fixedCanonicalHash === fixedHook.framebuffer.hash,
      `${state.id} fixed-seed canvas PNG diverged from direct framebuffer readback.`);

    const comparisonHook = await callScenario(page, state, comparisonSeed);
    const comparisonCapture = await captureCanvas(canvas);
    const comparisonCanonicalHash = sha256Hex(
      canonicalRgba8Bytes(comparisonCapture.width, comparisonCapture.height, comparisonCapture.rgba),
    );
    assert(comparisonCanonicalHash === comparisonHook.framebuffer.hash,
      `${state.id} comparison-seed canvas PNG diverged from direct framebuffer readback.`);
    assertHookContract(state.id, fixedHook, repeatedHook, comparisonHook);

    const seedDelta = compareSeedOutputs(fixedCapture, comparisonCapture);
    assert(seedDelta.maxRgbCodeDifference <= 1,
      `${state.id} seed changed RGB by ${seedDelta.maxRgbCodeDifference} codes.`);
    assert(Math.abs(seedDelta.meanRgbCodeShift) <= 0.5,
      `${state.id} seed mean RGB shift exceeded 0.5 code.`);
    assert(seedDelta.alphaChangedPixels === 0, `${state.id} dither changed alpha pixels.`);
    assert(seedDelta.changedPixels > 0, `${state.id} seed did not animate any output pixel.`);

    const regions = {};
    for (const [region, before] of Object.entries(state.regions)) {
      const candidate = analyzeNearBlackRgba8({
        rgba: fixedCapture.rgba,
        width: fixedCapture.width,
        height: fixedCapture.height,
        roi: before.roi,
        nearBlackMaxCode: NINTH_TIDE_NEAR_BLACK_LIMIT,
      });
      const metricComparison = compareNearBlackDitherMetrics(before, candidate);
      assertMetricGate(state.id, region, before, candidate, metricComparison);
      regions[region] = {
        candidate: compactMetrics(candidate),
        comparison: metricComparison,
      };
    }

    assert(errors.length === 0, `${state.id} emitted console errors: ${errors.join(' | ')}`);
    if (runIndex === 1) {
      await writeFile(join(outputDir, `${state.id}.png`), fixedCapture.png);
    }
    return {
      id: state.id,
      overlapGuard,
      fixedHook,
      comparisonHook,
      fixedPngSha256: sha256Hex(fixedCapture.png),
      comparisonPngSha256: sha256Hex(comparisonCapture.png),
      seedDelta,
      regions,
    };
  } finally {
    await page.close();
  }
}

async function writeManifest() {
  await writeFile(join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}

async function runGate() {
  assertBundledPlaywrightVersion(playwrightVersion);
  await auditSourceOwnership();
  const config = parseNinthTideConfig(process.env);
  manifest.buildUrl = config.buildUrl;
  const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
  assert(baseline.schemaVersion === 1 && baseline.ticket === 'T-NT-02',
    'T-NT-02 before baseline has an unsupported schema.');
  manifest.baseline = baseline;

  const appUrl = new URL('./app.js', config.buildUrl).href;
  const appResponse = await fetch(appUrl, { signal: AbortSignal.timeout(30_000) });
  assert(appResponse.ok, `Ninth Tide app bundle returned HTTP ${appResponse.status}.`);
  manifest.build = { appUrl, appSha256: sha256Hex(Buffer.from(await appResponse.arrayBuffer())) };

  const freshBaselines = new Map();
  for (let runIndex = 1; runIndex <= freshRunCount; runIndex += 1) {
    const browser = await chromium.launch(NINTH_TIDE_BROWSER_LAUNCH_OPTIONS);
    const run = { run: runIndex, browserVersion: browser.version(), states: [] };
    manifest.runs.push(run);
    try {
      const context = await browser.newContext(NINTH_TIDE_CONTEXT_OPTIONS);
      try {
        for (const [id, state] of Object.entries(baseline.states)) {
          const record = await captureState(context, config, { id, ...state }, runIndex);
          run.states.push(record);
          const previous = freshBaselines.get(id);
          if (previous && !isDeepStrictEqual(record, previous)) {
            throw new Error(`${id} dither results changed across fresh browsers.`);
          }
          freshBaselines.set(id, record);
        }
      } finally {
        await context.close();
      }
    } finally {
      await browser.close();
    }
  }
  manifest.status = 'passed';
}

await mkdir(outputDir, { recursive: true });
try {
  await runGate();
  await writeManifest();
  console.log(`Ninth Tide dither QA passed: ${outputDir}`);
} catch (error) {
  manifest.status = 'failed';
  manifest.error = {
    name: error instanceof Error ? error.name : 'Error',
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  };
  await writeManifest();
  throw error;
}
