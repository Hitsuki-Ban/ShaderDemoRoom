import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { chromium } from 'playwright';
import {
  assertBundledPlaywrightVersion,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
  parseNinthTideConfig,
  sha256Hex,
} from './ninth-tide-core.mjs';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;
const outputDir = 'output/playwright/ninth-tide-quality';
const sourcePath = 'ref/archive_of_the_ninth_tide_shoreless_web/src/main.js';
const viewportHeight = 900;
const staticFrameCount = 3;
const tierStressTransitions = 30;

const tierBudgets = Object.freeze({
  desktop: Object.freeze({
    antialias: true,
    pixelRatioCap: 1.6,
    bloomInitialStrength: 0.94,
    pulse: Object.freeze({ systemCapacity: 5, userCapacity: 3, maxPulses: 8 }),
    assets: Object.freeze({
      archiveCellCount: 81,
      archivePointsPerCell: 156,
      beamRadialSegments: 40,
      sonarShellWidthSegments: 64,
      sonarShellHeightSegments: 36,
      sonarCurtainRadialSegments: 96,
      sonarSpokeCount: 96,
      sonarPillarCount: 48,
      sonarLatticeSide: 13,
      helixSegments: 240,
      sonarConvergenceWidthSegments: 64,
      sonarConvergenceHeightSegments: 36,
      nullRingTubularSegments: 192,
      coreDetail: 5,
      coreRingTubularSegments: 192,
      forecastDustCount: 2600,
      energyBodyCount: 10500,
      mistCount: 3300,
      nearSnowCount: 720,
      abyssalSpineCount: 46,
      pressureStrataTubularSegments: 256,
    }),
  }),
  mobile: Object.freeze({
    antialias: false,
    pixelRatioCap: 1.15,
    bloomInitialStrength: 0.72,
    pulse: Object.freeze({ systemCapacity: 2, userCapacity: 2, maxPulses: 4 }),
    assets: Object.freeze({
      archiveCellCount: 45,
      archivePointsPerCell: 72,
      beamRadialSegments: 20,
      sonarShellWidthSegments: 36,
      sonarShellHeightSegments: 20,
      sonarCurtainRadialSegments: 48,
      sonarSpokeCount: 48,
      sonarPillarCount: 28,
      sonarLatticeSide: 9,
      helixSegments: 120,
      sonarConvergenceWidthSegments: 36,
      sonarConvergenceHeightSegments: 20,
      nullRingTubularSegments: 96,
      coreDetail: 4,
      coreRingTubularSegments: 96,
      forecastDustCount: 1200,
      energyBodyCount: 4200,
      mistCount: 1200,
      nearSnowCount: 260,
      abyssalSpineCount: 22,
      pressureStrataTubularSegments: 128,
    }),
  }),
});

const manifest = {
  schemaVersion: 1,
  ticket: 'T-NT-07',
  gate: 'qa:ninth-tide-quality',
  status: 'running',
  environment: {
    playwrightVersion,
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    browserLaunchOptions: NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
    contextOptions: NINTH_TIDE_CONTEXT_OPTIONS,
  },
  policy: {
    boundaryWidths: [819, 820],
    devicePixelRatios: [1, 2, 3],
    deviceMetricsMobile: true,
    tierStressTransitions,
    staticFrameCount,
    maximumCustomPropertyWritesPerStaticAudit: 0,
  },
  steps: [],
  consoleErrors: [],
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function expectedProfile({ width, height, dpr, tier }) {
  const budget = tierBudgets[tier];
  assert(budget, `Unknown quality tier: ${tier}.`);
  return {
    tier,
    antialias: budget.antialias,
    pixelRatioCap: budget.pixelRatioCap,
    bloomInitialStrength: budget.bloomInitialStrength,
    pulse: { ...budget.pulse },
    assets: { ...budget.assets },
    width,
    height,
    devicePixelRatio: dpr,
    coarse: false,
    effectivePixelRatio: Math.min(dpr, budget.pixelRatioCap),
  };
}

function expectedCounts(tier) {
  const assets = tierBudgets[tier].assets;
  return {
    archiveCellCount: assets.archiveCellCount,
    archivePointCount: assets.archiveCellCount * assets.archivePointsPerCell,
    beamRadialSegments: assets.beamRadialSegments,
    sonarShellWidthSegments: assets.sonarShellWidthSegments,
    sonarShellHeightSegments: assets.sonarShellHeightSegments,
    sonarCurtainRadialSegments: assets.sonarCurtainRadialSegments,
    sonarSpokeCount: assets.sonarSpokeCount,
    sonarPillarCount: assets.sonarPillarCount,
    sonarLatticePointCount: assets.sonarLatticeSide ** 3,
    helixSegments: assets.helixSegments,
    sonarConvergenceWidthSegments: assets.sonarConvergenceWidthSegments,
    sonarConvergenceHeightSegments: assets.sonarConvergenceHeightSegments,
    nullRingTubularSegments: assets.nullRingTubularSegments,
    coreDetail: assets.coreDetail,
    coreRingTubularSegments: Array.from({ length: 9 }, () => assets.coreRingTubularSegments),
    forecastDustCount: assets.forecastDustCount,
    energyBodyCount: assets.energyBodyCount,
    mistCount: assets.mistCount,
    nearSnowCount: assets.nearSnowCount,
    abyssalSpineVertices: assets.abyssalSpineCount * 10,
    pressureStrataTubularSegments: Array.from(
      { length: 7 },
      () => assets.pressureStrataTubularSegments,
    ),
  };
}

function assertSnapshot(snapshot, expectation, label) {
  const profile = expectedProfile(expectation);
  assert(isDeepStrictEqual(snapshot.profile, profile),
    `${label} profile mismatch: ${JSON.stringify(snapshot.profile)}.`);
  assert(snapshot.pulseSlots === profile.pulse.maxPulses,
    `${label} exposed ${snapshot.pulseSlots} pulse slots; expected ${profile.pulse.maxPulses}.`);
  assert(isDeepStrictEqual(snapshot.counts, expectedCounts(expectation.tier)),
    `${label} asset counts mismatch: ${JSON.stringify(snapshot.counts)}.`);
  assert(snapshot.contextAntialias === profile.antialias,
    `${label} antialias was ${snapshot.contextAntialias}; expected ${profile.antialias}.`);
  assert(snapshot.rendererPixelRatio === profile.effectivePixelRatio,
    `${label} renderer DPR was ${snapshot.rendererPixelRatio}; expected ${profile.effectivePixelRatio}.`);

  const drawingBuffer = {
    width: Math.floor(profile.width * profile.effectivePixelRatio),
    height: Math.floor(profile.height * profile.effectivePixelRatio),
  };
  const composerBuffer = {
    width: profile.width * profile.effectivePixelRatio,
    height: profile.height * profile.effectivePixelRatio,
  };
  assert(isDeepStrictEqual(snapshot.drawingBuffer, drawingBuffer),
    `${label} drawing buffer mismatch: ${JSON.stringify(snapshot.drawingBuffer)}.`);
  assert(isDeepStrictEqual(snapshot.composerReadBuffer, composerBuffer),
    `${label} composer read buffer mismatch: ${JSON.stringify(snapshot.composerReadBuffer)}.`);
  assert(isDeepStrictEqual(snapshot.composerWriteBuffer, composerBuffer),
    `${label} composer write buffer mismatch: ${JSON.stringify(snapshot.composerWriteBuffer)}.`);
  assert(snapshot.canvasCount === 1, `${label} exposed ${snapshot.canvasCount} scene canvases.`);
  assert(snapshot.sonarPillarDynamic === true,
    `${label} sonar pillar instance matrices are not dynamic.`);
  assert(Number.isInteger(snapshot.generation) && snapshot.generation >= 1,
    `${label} quality generation must be a positive integer.`);
  assert(Number.isInteger(snapshot.currentOwnedResources) && snapshot.currentOwnedResources > 0,
    `${label} must expose a positive owned-resource count.`);
  assert(snapshot.memory && Object.values(snapshot.memory).every(
    (value) => Number.isInteger(value) && value >= 0,
  ), `${label} renderer memory counters must be non-negative integers.`);
  assert(snapshot.sizingOperations && Object.values(snapshot.sizingOperations).every(
    (value) => Number.isInteger(value) && value >= 0,
  ), `${label} sizing-operation counters must be non-negative integers.`);
}

function assertGenerationTransition(before, after, label) {
  const changedTier = before.profile.tier !== after.profile.tier;
  if (!changedTier) {
    assert(after.generation === before.generation,
      `${label} same-tier reconcile changed generation ${before.generation} -> ${after.generation}.`);
    assert(isDeepStrictEqual(after.lastDisposedGeneration, before.lastDisposedGeneration),
      `${label} same-tier reconcile changed the last disposed generation.`);
    return;
  }

  assert(after.generation === before.generation + 1,
    `${label} tier reconcile changed generation ${before.generation} -> ${after.generation}.`);
  assert(isDeepStrictEqual(after.lastDisposedGeneration, {
    number: before.generation,
    resourceCount: before.currentOwnedResources,
  }), `${label} last disposed generation does not describe generation ${before.generation}.`);
}

async function fetchBuildRecord(buildUrl) {
  const appUrl = new URL('./app.js', buildUrl).href;
  const [htmlResponse, appResponse] = await Promise.all([
    fetch(buildUrl, { signal: AbortSignal.timeout(30_000) }),
    fetch(appUrl, { signal: AbortSignal.timeout(30_000) }),
  ]);
  assert(htmlResponse.ok, `Ninth Tide HTML returned HTTP ${htmlResponse.status}: ${buildUrl}.`);
  assert(appResponse.ok, `Ninth Tide app returned HTTP ${appResponse.status}: ${appUrl}.`);
  const html = Buffer.from(await htmlResponse.arrayBuffer());
  const app = Buffer.from(await appResponse.arrayBuffer());
  return {
    html: { url: buildUrl, bytes: html.length, sha256: sha256Hex(html) },
    app: { url: appUrl, bytes: app.length, sha256: sha256Hex(app) },
  };
}

async function auditUpdateCameraSource() {
  const source = await readFile(sourcePath, 'utf8');
  const start = source.indexOf('function updateCamera(');
  const end = source.indexOf('\nfunction updateSpectralComb(', start);
  assert(start >= 0 && end > start, 'Could not isolate the updateCamera function for source audit.');
  const updateCameraSource = source.slice(start, end);
  const allocationPattern = /\bnew\s+THREE\s*\.\s*Vector3\s*\(/u;
  assert(!allocationPattern.test(updateCameraSource),
    'updateCamera must not allocate THREE.Vector3 during a frame.');
  return {
    path: sourcePath,
    startLine: source.slice(0, start).split('\n').length,
    sha256: sha256Hex(Buffer.from(updateCameraSource)),
    forbiddenPattern: allocationPattern.source,
    passed: true,
  };
}

function installStylePropertyAudit() {
  const descriptor = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, 'setProperty');
  if (!descriptor || typeof descriptor.value !== 'function') {
    throw new Error('CSSStyleDeclaration.setProperty descriptor is unavailable.');
  }
  const nativeSetProperty = descriptor.value;
  const customPropertyWrites = [];
  Object.defineProperty(CSSStyleDeclaration.prototype, 'setProperty', {
    ...descriptor,
    value(propertyName, value, priority) {
      if (typeof propertyName === 'string' && propertyName.startsWith('--')) {
        customPropertyWrites.push({ propertyName, value, priority });
      }
      return nativeSetProperty.call(this, propertyName, value, priority);
    },
  });
  Object.defineProperty(window, '__NINTH_TIDE_STYLE_AUDIT__', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: Object.freeze({
      reset() {
        customPropertyWrites.length = 0;
      },
      read() {
        return Object.freeze(customPropertyWrites.map((write) => Object.freeze({ ...write })));
      },
    }),
  });
}

async function setDeviceMetrics(client, metrics) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: metrics.width,
    height: metrics.height,
    deviceScaleFactor: metrics.dpr,
    mobile: true,
    screenWidth: metrics.width,
    screenHeight: metrics.height,
  });
}

async function waitForDeviceMetrics(page, metrics) {
  await page.waitForFunction(
    ({ width, height, dpr }) => innerWidth === width
      && innerHeight === height
      && Math.abs(devicePixelRatio - dpr) < 1e-9,
    metrics,
    { timeout: 30_000 },
  );
}

async function applyDeviceMetrics(client, page, metrics) {
  await setDeviceMetrics(client, metrics);
  await waitForDeviceMetrics(page, metrics);
}

async function inspectRuntime(page) {
  return page.evaluate(() => {
    const quality = window.__NINTH_TIDE_QUALITY__;
    if (!quality || typeof quality.inspect !== 'function') {
      throw new Error('Required __NINTH_TIDE_QUALITY__.inspect hook is unavailable.');
    }
    return quality.inspect();
  });
}

async function reconcileRuntime(page) {
  return page.evaluate(() => {
    const quality = window.__NINTH_TIDE_QUALITY__;
    if (!quality || typeof quality.reconcile !== 'function') {
      throw new Error('Required __NINTH_TIDE_QUALITY__.reconcile hook is unavailable.');
    }
    return quality.reconcile();
  });
}

async function auditStaticFrames(page, label) {
  const audit = await page.evaluate((frameCount) => {
    const quality = window.__NINTH_TIDE_QUALITY__;
    const styleAudit = window.__NINTH_TIDE_STYLE_AUDIT__;
    if (!quality || typeof quality.staticFrames !== 'function' || typeof quality.inspect !== 'function') {
      throw new Error('Required Ninth Tide static-frame hooks are unavailable.');
    }
    if (!styleAudit || typeof styleAudit.reset !== 'function' || typeof styleAudit.read !== 'function') {
      throw new Error('Required Ninth Tide style-property audit is unavailable.');
    }

    const firstFrame = quality.staticFrames(1);
    const afterFirstFrame = quality.inspect();
    styleAudit.reset();
    const staticFrames = quality.staticFrames(frameCount);
    const customPropertyWrites = styleAudit.read();
    const afterStaticFrames = quality.inspect();
    return {
      firstFrame,
      staticFrames,
      memoryAfterFirstFrame: afterFirstFrame.memory,
      memoryAfterStaticFrames: afterStaticFrames.memory,
      customPropertyWrites,
    };
  }, staticFrameCount);

  assert(audit.firstFrame.rendered === 1, `${label} first-frame audit did not render exactly once.`);
  assert(audit.staticFrames.rendered === staticFrameCount,
    `${label} static-frame audit rendered ${audit.staticFrames.rendered} frames.`);
  assert(audit.firstFrame.elapsed === audit.staticFrames.elapsed,
    `${label} static-frame audit advanced elapsed time.`);
  assert(isDeepStrictEqual(audit.memoryAfterFirstFrame, audit.memoryAfterStaticFrames),
    `${label} renderer memory did not plateau after the first frame.`);
  assert(audit.customPropertyWrites.length === 0,
    `${label} static frames wrote ${audit.customPropertyWrites.length} CSS custom properties.`);
  return audit;
}

async function recordStep(page, client, definition, before) {
  await applyDeviceMetrics(client, page, definition);
  const reconcileResult = await reconcileRuntime(page);
  const snapshot = await inspectRuntime(page);
  assertSnapshot(snapshot, definition, definition.id);
  if (before) assertGenerationTransition(before, snapshot, definition.id);
  if (before && definition.noSizingChange) {
    assert(isDeepStrictEqual(snapshot.sizingOperations, before.sizingOperations),
      `${definition.id} issued renderer/composer sizing calls without an effective size change.`);
  }
  if (!before) {
    assert(snapshot.generation === 1, 'Initial quality generation must be 1.');
    assert(snapshot.lastDisposedGeneration === null,
      'Initial quality generation must not report a disposed predecessor.');
  }
  const staticAudit = await auditStaticFrames(page, definition.id);
  const record = {
    id: definition.id,
    requested: {
      width: definition.width,
      height: definition.height,
      dpr: definition.dpr,
      tier: definition.tier,
    },
    reconcileResult,
    snapshot,
    staticAudit,
  };
  manifest.steps.push(record);
  return snapshot;
}

function capturePageErrors(page, includeConsole = true) {
  if (includeConsole) {
    page.on('console', (message) => {
      if (message.type() === 'error') {
        manifest.consoleErrors.push({ source: 'console', message: message.text() });
      }
    });
  }
  page.on('pageerror', (error) => {
    manifest.consoleErrors.push({ source: 'pageerror', message: error.message });
  });
}

async function auditDeterministicReconcileConcurrency(context, buildUrl) {
  const page = await context.newPage();
  capturePageErrors(page, false);
  const client = await context.newCDPSession(page);
  const metrics = { width: 820, height: viewportHeight, dpr: 1 };
  const previewUrl = new URL(buildUrl);
  previewUrl.searchParams.set('preview', 'main');
  previewUrl.searchParams.set('section', '0');
  try {
    await setDeviceMetrics(client, metrics);
    const response = await page.goto(previewUrl.href, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    assert(response?.ok(), `Ninth Tide preview returned HTTP ${response?.status() ?? 'none'}.`);
    await page.waitForFunction(
      () => typeof window.__NINTH_TIDE_STEP__ === 'function'
        && typeof window.__NINTH_TIDE_QUALITY__?.reconcile === 'function',
      undefined,
      { timeout: 30_000 },
    );
    const audit = await page.evaluate(async () => {
      const step = window.__NINTH_TIDE_STEP__({ mode: 'main', section: 0, timestampMs: 295137.2 });
      let reconcileError = null;
      try {
        window.__NINTH_TIDE_QUALITY__.reconcile();
      } catch (error) {
        reconcileError = error instanceof Error ? error.message : String(error);
      }
      const result = await step;
      return {
        reconcileError,
        framebufferHash: result.framebuffer.hash,
        stateDigest: result.stateDigest,
      };
    });
    assert(audit.reconcileError === 'Ninth Tide quality reconcile cannot overlap deterministic capture.',
      `Deterministic reconcile overlap returned: ${String(audit.reconcileError)}.`);
    assert(typeof audit.framebufferHash === 'string' && audit.framebufferHash.length === 64,
      'Deterministic concurrency audit did not finish its framebuffer digest.');
    assert(typeof audit.stateDigest === 'string' && audit.stateDigest.length === 64,
      'Deterministic concurrency audit did not finish its state digest.');
    return audit;
  } finally {
    await page.close();
  }
}

async function runGate() {
  assertBundledPlaywrightVersion(playwrightVersion);
  const config = parseNinthTideConfig(process.env);
  manifest.build = await fetchBuildRecord(config.buildUrl);
  manifest.sourceAudit = await auditUpdateCameraSource();
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch(NINTH_TIDE_BROWSER_LAUNCH_OPTIONS);
  try {
    manifest.environment.browserVersion = browser.version();
    const context = await browser.newContext(NINTH_TIDE_CONTEXT_OPTIONS);
    await context.addInitScript(installStylePropertyAudit);
    const page = await context.newPage();
    capturePageErrors(page);
    const client = await context.newCDPSession(page);

    try {
      const initial = { id: 'initial-desktop', width: 820, height: viewportHeight, dpr: 1, tier: 'desktop' };
      await setDeviceMetrics(client, initial);
      const response = await page.goto(config.buildUrl, { waitUntil: 'domcontentloaded', timeout: 30_000 });
      assert(response?.ok(), `Ninth Tide navigation returned HTTP ${response?.status() ?? 'none'}.`);
      await waitForDeviceMetrics(page, initial);
      await page.waitForFunction(
        () => window.__NINTH_TIDE_QUALITY__
          && typeof window.__NINTH_TIDE_QUALITY__.inspect === 'function'
          && typeof window.__NINTH_TIDE_QUALITY__.reconcile === 'function'
          && typeof window.__NINTH_TIDE_QUALITY__.staticFrames === 'function',
        undefined,
        { timeout: 30_000 },
      );
      manifest.page = await page.evaluate(() => ({
        url: location.href,
        search: location.search,
        hasPreviewParameter: new URL(location.href).searchParams.has('preview'),
        hasForcedPreview: Object.prototype.hasOwnProperty.call(window, '__NINTH_TIDE_PREVIEW__'),
      }));
      assert(manifest.page.search === '' && !manifest.page.hasPreviewParameter && !manifest.page.hasForcedPreview,
        `Quality gate requires a live non-preview page: ${manifest.page.url}.`);

      let previous = await recordStep(page, client, initial, null);
      for (const definition of [
        { id: 'boundary-mobile', width: 819, height: viewportHeight, dpr: 1, tier: 'mobile' },
        { id: 'boundary-desktop', width: 820, height: viewportHeight, dpr: 1, tier: 'desktop' },
        { id: 'desktop-dpr-2', width: 820, height: viewportHeight, dpr: 2, tier: 'desktop' },
        {
          id: 'desktop-capped-dpr-3',
          width: 820,
          height: viewportHeight,
          dpr: 3,
          tier: 'desktop',
          noSizingChange: true,
        },
        { id: 'desktop-dpr-1', width: 820, height: viewportHeight, dpr: 1, tier: 'desktop' },
      ]) {
        previous = await recordStep(page, client, definition, previous);
      }

      const beforeRejectedCommit = await inspectRuntime(page);
      manifest.rejectedCommit = await page.evaluate(
        () => window.__NINTH_TIDE_QUALITY__.auditRejectedCommit(),
      );
      const afterRejectedCommit = await inspectRuntime(page);
      assert(manifest.rejectedCommit.message
        === 'Ninth Tide injected quality commit failure before live swap.',
      `Rejected-commit audit returned: ${String(manifest.rejectedCommit.message)}.`);
      assert(manifest.rejectedCommit.rejection?.resourceCount > 0
        && manifest.rejectedCommit.rejection.contextLost === true,
      `Rejected-commit cleanup was incomplete: ${JSON.stringify(manifest.rejectedCommit)}.`);
      assert(afterRejectedCommit.generation === beforeRejectedCommit.generation
        && isDeepStrictEqual(afterRejectedCommit.profile, beforeRejectedCommit.profile)
        && afterRejectedCommit.canvasCount === 1,
      'Rejected-commit audit changed the live quality generation.');

      for (let index = 1; index <= tierStressTransitions; index += 1) {
        const mobile = index % 2 === 1;
        previous = await recordStep(page, client, {
          id: `tier-stress-${String(index).padStart(2, '0')}-${mobile ? 'mobile' : 'desktop'}`,
          width: mobile ? 819 : 820,
          height: viewportHeight,
          dpr: Math.floor((index - 1) / 2) % 2 === 0 ? 2 : 1,
          tier: mobile ? 'mobile' : 'desktop',
        }, previous);
      }

      assert(manifest.steps.length === tierStressTransitions + 6,
        `Quality gate recorded ${manifest.steps.length} steps; expected ${tierStressTransitions + 6}.`);
      manifest.deterministicConcurrency = await auditDeterministicReconcileConcurrency(
        context,
        config.buildUrl,
      );
      assert(manifest.consoleErrors.length === 0,
        `Quality gate emitted console errors: ${manifest.consoleErrors.map(({ message }) => message).join(' | ')}.`);
      manifest.status = 'passed';
    } finally {
      await page.close();
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

try {
  await runGate();
} catch (error) {
  manifest.status = 'failed';
  manifest.error = {
    name: error instanceof Error ? error.name : typeof error,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  };
  throw error;
} finally {
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log(`Ninth Tide responsive quality QA passed (${manifest.steps.length} steps).`);
