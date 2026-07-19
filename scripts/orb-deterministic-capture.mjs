import { mkdir, writeFile } from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';
import { chromium } from 'playwright';
import {
  canonicalRgba8Bytes,
  installNinthTideRafAudit,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
  sha256Hex,
} from './ninth-tide-core.mjs';

const rawShowroomUrl = process.env.SHOWROOM_URL;
if (typeof rawShowroomUrl !== 'string' || rawShowroomUrl.length === 0) {
  throw new Error('SHOWROOM_URL is required for qa:orb.');
}
const showroomUrl = new URL(rawShowroomUrl);
if (!['http:', 'https:'].includes(showroomUrl.protocol)) {
  throw new Error('SHOWROOM_URL must be an absolute HTTP(S) URL.');
}
const baseUrl = showroomUrl.href.replace(/\/+$/, '');
const standaloneUrl = `${baseUrl}/exhibits/anime-liquid-orb/index.html`;
const outputDir = 'output/playwright/orb-deterministic';
const manifest = {
  schemaVersion: 2,
  gate: 'qa:orb',
  status: 'running',
  input: { mode: 2, freezeProgress: 0.625, timestamp: 4321 },
  volumeInput: { mode: 1, freezeProgress: 0.5, freezeOrigin: [0, 0, 1], timestamp: 10_000 },
  entries: [],
};

const volumeLaterTimestamp = manifest.volumeInput.timestamp + 2_000;
const expectedVolumeTextureHash = createExpectedVolumeTextureHash();

await mkdir(outputDir, { recursive: true });

function createExpectedVolumeTextureHash() {
  const bytes = Buffer.alloc(64 * 64 * 4);
  for (let y = 0; y < 64; y += 1) {
    for (let x = 0; x < 64; x += 1) {
      const offset = (y * 64 + x) * 4;
      bytes[offset] = Math.round(255 * x / 63);
      bytes[offset + 1] = Math.round(255 * y / 63);
      bytes[offset + 2] = ((x >> 3) + (y >> 3)) % 2 === 0 ? 32 : 224;
      bytes[offset + 3] = 255;
    }
  }
  return sha256Hex(canonicalRgba8Bytes(64, 64, bytes));
}

function auditSnapshotInBrowser() {
  const audit = window.__NINTH_TIDE_QA_RAF_AUDIT__;
  if (!audit) throw new Error('Orb independent rAF audit is unavailable.');
  return {
    callbackCount: audit.callbackCount(),
    pendingCount: audit.pendingCount(),
    renderActivityCount: audit.renderActivityCount(),
  };
}

async function assertHookAbsent(frame, label) {
  const types = await frame.evaluate(() => ({
    step: typeof window.__MIZU_KOKORO_STEP__,
    volume: typeof window.__MIZU_KOKORO_CAPTURE_VOLUME__,
  }));
  if (types.step !== 'undefined' || types.volume !== 'undefined') {
    throw new Error(`${label} unexpectedly exposed an Orb QA hook: ${JSON.stringify(types)}.`);
  }
}

async function callHook(frame, input) {
  return frame.evaluate(async (request) => {
    if (typeof window.__MIZU_KOKORO_STEP__ !== 'function') {
      throw new Error('Required __MIZU_KOKORO_STEP__ hook is unavailable.');
    }
    return window.__MIZU_KOKORO_STEP__(request);
  }, input);
}

async function callVolumeHook(frame, input) {
  return frame.evaluate(async (request) => {
    if (typeof window.__MIZU_KOKORO_CAPTURE_VOLUME__ !== 'function') {
      throw new Error('Required __MIZU_KOKORO_CAPTURE_VOLUME__ hook is unavailable.');
    }
    return window.__MIZU_KOKORO_CAPTURE_VOLUME__(request);
  }, input);
}

async function expectRejected(frame, input, expectedMessage) {
  try {
    await callHook(frame, input);
  } catch (error) {
    if (error instanceof Error && error.message.includes(expectedMessage)) return;
    throw error;
  }
  throw new Error(`Orb hook accepted invalid input: ${JSON.stringify(input)}.`);
}

async function expectVolumeRejected(frame, input, expectedMessage) {
  try {
    await callVolumeHook(frame, input);
  } catch (error) {
    if (error instanceof Error && error.message.includes(expectedMessage)) return;
    throw error;
  }
  throw new Error(`Orb volume hook accepted invalid input: ${JSON.stringify(input)}.`);
}

function decodeRegion(region, label) {
  const bytes = Buffer.from(region.bytesBase64, 'base64');
  const expectedLength = region.width * region.height * 3;
  if (region.channels !== 'rgb8' || region.sampleCount !== region.width * region.height) {
    throw new Error(`${label} did not report the fixed RGB8 region contract.`);
  }
  if (bytes.length !== expectedLength) {
    throw new Error(`${label} byte length ${bytes.length} did not match ${expectedLength}.`);
  }
  if (sha256Hex(bytes) !== region.hash) throw new Error(`${label} region hash did not match its bytes.`);
  return bytes;
}

function measureRegionDifference(left, right, label) {
  if (
    left.x !== right.x || left.y !== right.y
    || left.width !== right.width || left.height !== right.height
  ) {
    throw new Error(`${label} compared mismatched regions.`);
  }
  const leftBytes = decodeRegion(left, `${label} left`);
  const rightBytes = decodeRegion(right, `${label} right`);
  const differences = new Uint8Array(leftBytes.length);
  let total = 0;
  for (let index = 0; index < differences.length; index += 1) {
    const difference = Math.abs(leftBytes[index] - rightBytes[index]);
    differences[index] = difference;
    total += difference;
  }
  differences.sort();
  const p99Index = Math.ceil(differences.length * 0.99) - 1;
  return Object.freeze({
    sampleCount: left.sampleCount,
    channelSampleCount: differences.length,
    meanBytes: total / differences.length,
    meanNormalized: total / differences.length / 255,
    p99Bytes: differences[p99Index],
    p99Normalized: differences[p99Index] / 255,
    maxBytes: differences[differences.length - 1],
  });
}

function assertStaticRegion(metrics, label) {
  if (metrics.meanBytes > 0.5 || metrics.p99Bytes > 2) {
    throw new Error(
      `${label} moved: mean ${metrics.meanBytes}/255 bytes, p99 ${metrics.p99Bytes}/255 bytes.`,
    );
  }
}

function assertMovingRegion(metrics, label) {
  if (metrics.meanBytes < 2) {
    throw new Error(`${label} mean motion ${metrics.meanBytes}/255 bytes was below 2/255.`);
  }
}

function assertVolumeMetadata(capture, label) {
  if (
    capture.capture.width !== 1440 || capture.capture.height !== 900
    || capture.capture.devicePixelRatio !== 1
    || capture.capture.freezeTime !== 1.25
    || !isDeepStrictEqual(capture.capture.cameraPosition, [8.1, 0.48, 0])
  ) {
    throw new Error(`${label} did not use the fixed isolated capture environment.`);
  }
  if (
    capture.texture.width !== 64 || capture.texture.height !== 64
    || capture.texture.format !== 'rgba8' || capture.texture.colorSpace !== 'linear-srgb'
    || capture.texture.hash !== expectedVolumeTextureHash
  ) {
    throw new Error(`${label} fixed DataTexture contract changed.`);
  }
  if (
    capture.framebuffer.width !== 1440 || capture.framebuffer.height !== 900
    || capture.framebuffer.format !== 'rgba8' || capture.stateRestored !== true
  ) {
    throw new Error(`${label} framebuffer or state-restoration contract changed.`);
  }
  for (const [name, region] of Object.entries(capture.regions)) decodeRegion(region, `${label} ${name}`);
}

async function verifyEntry(frame, label) {
  await frame.waitForFunction(
    () => typeof window.__MIZU_KOKORO_STEP__ === 'function',
    undefined,
    { timeout: 30_000 },
  );
  await expectRejected(
    frame,
    { mode: 2, freezeProgress: 0.625 },
    'must contain exactly',
  );
  await expectRejected(
    frame,
    { mode: 2, freezeProgress: 0.625, timestamp: 4321, fallback: true },
    'must contain exactly',
  );
  await expectRejected(
    frame,
    { mode: 4, freezeProgress: 0.625, timestamp: 4321 },
    'mode must be an integer',
  );

  const repeats = [];
  let signature;
  for (let repeat = 1; repeat <= 3; repeat += 1) {
    const before = await frame.evaluate(auditSnapshotInBrowser);
    const hook = await callHook(frame, manifest.input);
    const immediate = await frame.evaluate(auditSnapshotInBrowser);
    const afterTurn = await frame.evaluate(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const audit = window.__NINTH_TIDE_QA_RAF_AUDIT__;
      if (!audit) throw new Error('Orb independent rAF audit is unavailable.');
      return {
        callbackCount: audit.callbackCount(),
        pendingCount: audit.pendingCount(),
        renderActivityCount: audit.renderActivityCount(),
      };
    });

    if (hook.logicalFrameDelta !== 1 || hook.queuedAnimationFrames !== 0) {
      throw new Error(`${label} repeat ${repeat} violated the hook frame contract.`);
    }
    if (immediate.pendingCount !== 0 || afterTurn.pendingCount !== 0) {
      throw new Error(`${label} repeat ${repeat} left a queued animation frame.`);
    }
    if (immediate.renderActivityCount <= before.renderActivityCount) {
      throw new Error(`${label} repeat ${repeat} did not independently observe WebGL rendering.`);
    }
    if (
      afterTurn.callbackCount !== immediate.callbackCount
      || afterTurn.renderActivityCount !== immediate.renderActivityCount
    ) {
      throw new Error(`${label} repeat ${repeat} rendered again after the hook resolved.`);
    }

    const currentSignature = {
      input: hook.input,
      logicalFrameDelta: hook.logicalFrameDelta,
      queuedAnimationFrames: hook.queuedAnimationFrames,
      framebuffer: hook.framebuffer,
    };
    if (signature && !isDeepStrictEqual(currentSignature, signature)) {
      throw new Error(`${label} repeated same-page hook result or exact hash changed.`);
    }
    signature = currentSignature;
    repeats.push({ repeat, hook, audit: { before, immediate, afterTurn } });
  }
  return { label, repeats };
}

async function verifyVolumeEntry(frame, label) {
  await frame.waitForFunction(
    () => typeof window.__MIZU_KOKORO_CAPTURE_VOLUME__ === 'function',
    undefined,
    { timeout: 30_000 },
  );
  await expectVolumeRejected(
    frame,
    { mode: 1, freezeProgress: 0.5, freezeOrigin: [0, 0, 1] },
    'must contain exactly',
  );
  await expectVolumeRejected(
    frame,
    { ...manifest.volumeInput, fallback: true },
    'must contain exactly',
  );
  await expectVolumeRejected(
    frame,
    { ...manifest.volumeInput, freezeOrigin: [0, 0] },
    'exactly three finite numbers',
  );
  await expectVolumeRejected(
    frame,
    { ...manifest.volumeInput, freezeOrigin: [0, 0, 0] },
    'must be non-zero',
  );

  const stepAnchorInput = { mode: 1, freezeProgress: 0.5, timestamp: 10_000 };
  const stepBefore = await callHook(frame, stepAnchorInput);
  const repeats = [];
  let deterministicSignature;
  for (let repeat = 1; repeat <= 3; repeat += 1) {
    const before = await frame.evaluate(auditSnapshotInBrowser);
    const capture = await callVolumeHook(frame, manifest.volumeInput);
    const immediate = await frame.evaluate(auditSnapshotInBrowser);
    const afterTurn = await frame.evaluate(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const audit = window.__NINTH_TIDE_QA_RAF_AUDIT__;
      if (!audit) throw new Error('Orb independent rAF audit is unavailable.');
      return {
        callbackCount: audit.callbackCount(),
        pendingCount: audit.pendingCount(),
        renderActivityCount: audit.renderActivityCount(),
      };
    });
    assertVolumeMetadata(capture, `${label} repeat ${repeat}`);
    if (immediate.pendingCount !== 0 || afterTurn.pendingCount !== 0) {
      throw new Error(`${label} volume repeat ${repeat} left a queued animation frame.`);
    }
    if (immediate.renderActivityCount <= before.renderActivityCount) {
      throw new Error(`${label} volume repeat ${repeat} did not independently observe WebGL rendering.`);
    }
    if (
      afterTurn.callbackCount !== immediate.callbackCount
      || afterTurn.renderActivityCount !== immediate.renderActivityCount
    ) {
      throw new Error(`${label} volume repeat ${repeat} rendered again after the hook resolved.`);
    }
    const signature = {
      input: capture.input,
      capture: capture.capture,
      texture: capture.texture,
      framebuffer: capture.framebuffer,
      regions: capture.regions,
      stateRestored: capture.stateRestored,
    };
    if (deterministicSignature && !isDeepStrictEqual(signature, deterministicSignature)) {
      throw new Error(`${label} repeated isolated volume capture or exact hash changed.`);
    }
    deterministicSignature = signature;
    repeats.push({ repeat, capture, audit: { before, immediate, afterTurn } });
  }

  const partialLater = await callVolumeHook(frame, {
    ...manifest.volumeInput,
    timestamp: volumeLaterTimestamp,
  });
  const partialMetrics = {
    frozen: measureRegionDifference(
      repeats[0].capture.regions.frozen,
      partialLater.regions.frozen,
      `${label} partial frozen ROI`,
    ),
    unfrozen: measureRegionDifference(
      repeats[0].capture.regions.unfrozen,
      partialLater.regions.unfrozen,
      `${label} partial unfrozen ROI`,
    ),
  };
  assertStaticRegion(partialMetrics.frozen, `${label} partial frozen ROI`);
  assertMovingRegion(partialMetrics.unfrozen, `${label} partial unfrozen ROI`);

  const fullInput = { ...manifest.volumeInput, freezeProgress: 1 };
  const fullEarlier = await callVolumeHook(frame, fullInput);
  const fullLater = await callVolumeHook(frame, { ...fullInput, timestamp: volumeLaterTimestamp });
  const fullMetrics = {
    interior: measureRegionDifference(
      fullEarlier.regions.interior,
      fullLater.regions.interior,
      `${label} full freeze interior ROI`,
    ),
  };
  assertStaticRegion(fullMetrics.interior, `${label} full freeze interior ROI`);

  const zeroByMode = [];
  for (let mode = 0; mode < 4; mode += 1) {
    const capture = await callVolumeHook(frame, {
      ...manifest.volumeInput,
      mode,
      freezeProgress: 0,
    });
    assertVolumeMetadata(capture, `${label} progress-zero mode ${mode}`);
    zeroByMode.push({ mode, framebuffer: capture.framebuffer, regions: capture.regions });
  }
  if (new Set(zeroByMode.map((entry) => entry.framebuffer.hash)).size !== 4) {
    throw new Error(`${label} progress-zero mode captures were not visually distinct.`);
  }
  const zeroLater = await callVolumeHook(frame, {
    ...manifest.volumeInput,
    freezeProgress: 0,
    timestamp: volumeLaterTimestamp,
  });
  const zeroMotion = measureRegionDifference(
    zeroByMode[1].regions.unfrozen,
    zeroLater.regions.unfrozen,
    `${label} progress-zero motion ROI`,
  );
  assertMovingRegion(zeroMotion, `${label} progress-zero motion ROI`);

  await callVolumeHook(frame, fullInput);
  const meltRestart = await callVolumeHook(frame, {
    ...manifest.volumeInput,
    freezeProgress: 0,
  });
  if (!isDeepStrictEqual(meltRestart.framebuffer, zeroByMode[1].framebuffer)) {
    throw new Error(`${label} melt restart did not resume the canonical progress-zero frame.`);
  }

  const stepAfter = await callHook(frame, stepAnchorInput);
  if (!isDeepStrictEqual(stepAfter, stepBefore)) {
    throw new Error(`${label} isolated volume capture did not restore the full-scene STEP state.`);
  }

  return {
    label,
    repeats,
    partialLater,
    partialMetrics,
    full: { earlier: fullEarlier, later: fullLater, metrics: fullMetrics },
    zeroByMode,
    zeroLater,
    zeroMotion,
    meltRestart: meltRestart.framebuffer,
    stepRestoration: { before: stepBefore, after: stepAfter },
  };
}

const browser = await chromium.launch(NINTH_TIDE_BROWSER_LAUNCH_OPTIONS);
const context = await browser.newContext(NINTH_TIDE_CONTEXT_OPTIONS);
await context.addInitScript(installNinthTideRafAudit);
try {
  const normalPage = await context.newPage();
  await normalPage.goto(standaloneUrl, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await assertHookAbsent(normalPage.mainFrame(), 'standalone normal URL');
  await normalPage.goto(`${standaloneUrl}?qa=1&qa=1`, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  });
  await assertHookAbsent(normalPage.mainFrame(), 'standalone duplicate QA query');
  await normalPage.close();

  const standalonePage = await context.newPage();
  await standalonePage.goto(`${standaloneUrl}?qa=1`, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  });
  const standaloneEntry = await verifyEntry(standalonePage.mainFrame(), 'standalone');
  standaloneEntry.volume = await verifyVolumeEntry(standalonePage.mainFrame(), 'standalone');
  manifest.entries.push(standaloneEntry);
  await standalonePage.close();

  const showroomPage = await context.newPage();
  await showroomPage.goto(`${baseUrl}/#/room/anime-liquid-orb?qa=1`, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  });
  const iframe = showroomPage.locator('iframe.embedded-exhibit-frame');
  await iframe.waitFor({ state: 'visible', timeout: 30_000 });
  const iframeSrc = await iframe.getAttribute('src');
  if (!iframeSrc || new URL(iframeSrc, showroomPage.url()).searchParams.get('qa') !== '1') {
    throw new Error(`Showroom iframe did not receive the explicit QA query: ${String(iframeSrc)}.`);
  }
  const iframeHandle = await iframe.elementHandle();
  const showroomFrame = await iframeHandle?.contentFrame();
  if (!showroomFrame) throw new Error('Showroom Orb iframe is unavailable.');
  const showroomEntry = await verifyEntry(showroomFrame, 'showroom');
  showroomEntry.volume = await verifyVolumeEntry(showroomFrame, 'showroom');
  manifest.entries.push(showroomEntry);
  await showroomPage.close();

  const standaloneVolumeSignature = standaloneEntry.volume.repeats[0].capture;
  const showroomVolumeSignature = showroomEntry.volume.repeats[0].capture;
  if (!isDeepStrictEqual(standaloneVolumeSignature, showroomVolumeSignature)) {
    throw new Error('Standalone and showroom isolated volume captures diverged.');
  }

  const reducedMotionContext = await browser.newContext({
    ...NINTH_TIDE_CONTEXT_OPTIONS,
    reducedMotion: 'reduce',
  });
  await reducedMotionContext.addInitScript(installNinthTideRafAudit);
  try {
    const reducedMotionPage = await reducedMotionContext.newPage();
    await reducedMotionPage.goto(`${standaloneUrl}?qa=1`, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });
    await reducedMotionPage.waitForFunction(
      () => typeof window.__MIZU_KOKORO_CAPTURE_VOLUME__ === 'function',
      undefined,
      { timeout: 30_000 },
    );
    const reducedMotionCapture = await callVolumeHook(reducedMotionPage.mainFrame(), manifest.volumeInput);
    assertVolumeMetadata(reducedMotionCapture, 'standalone reduced-motion');
    if (!isDeepStrictEqual(reducedMotionCapture, standaloneVolumeSignature)) {
      throw new Error('Reduced-motion isolated volume capture diverged from the canonical capture.');
    }
    const reducedMotionAudit = await reducedMotionPage.evaluate(auditSnapshotInBrowser);
    if (reducedMotionAudit.pendingCount !== 0) {
      throw new Error('Reduced-motion isolated volume capture left a queued animation frame.');
    }
    manifest.reducedMotion = {
      capture: reducedMotionCapture,
      audit: reducedMotionAudit,
    };
    await reducedMotionPage.close();
  } finally {
    await reducedMotionContext.close();
  }

  manifest.status = 'passed';
  await writeFile(`${outputDir}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({
    status: manifest.status,
    hashes: manifest.entries.map((entry) => ({
      label: entry.label,
      hash: entry.repeats[0].hook.framebuffer.hash,
      volumeHash: entry.volume.repeats[0].capture.framebuffer.hash,
      frozenMeanBytes: entry.volume.partialMetrics.frozen.meanBytes,
      frozenP99Bytes: entry.volume.partialMetrics.frozen.p99Bytes,
      unfrozenMeanBytes: entry.volume.partialMetrics.unfrozen.meanBytes,
      fullMeanBytes: entry.volume.full.metrics.interior.meanBytes,
    })),
  }, null, 2));
} catch (error) {
  manifest.status = 'failed';
  manifest.error = {
    name: error instanceof Error ? error.name : 'Error',
    message: error instanceof Error ? error.message : String(error),
  };
  await writeFile(`${outputDir}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  throw error;
} finally {
  await context.close();
  await browser.close();
}
