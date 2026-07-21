import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';

import { chromium } from 'playwright';

import {
  assertBundledPlaywrightVersion,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
  NINTH_TIDE_OUTPUT_DIR,
  parseNinthTideConfig,
  readHitFixture,
  sha256Hex,
} from './ninth-tide-core.mjs';
import { NINTH_TIDE_CAPTURE_POLICY } from './ninth-tide-policy.mjs';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;
const outputDir = join(NINTH_TIDE_OUTPUT_DIR, 'hit-target');
const manifestPath = join(outputDir, 'manifest.json');
const interactionKeys = Object.freeze([
  'archiveOpenTarget',
  'coreHovered',
  'latestUserPulse',
  'userPulseCount',
]);
const pulseKeys = Object.freeze(['mode', 'originX', 'originZ', 'serial', 'source']);

const manifest = {
  schemaVersion: 1,
  gate: 'qa:ninth-tide-hit-target',
  status: 'running',
  environment: {
    playwrightVersion,
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    browserLaunchOptions: NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
    contextOptions: NINTH_TIDE_CONTEXT_OPTIONS,
  },
  fixture: null,
  qualityRoundTrips: [],
  mobileTouchSmokes: [],
  sections: [],
  archiveAudioRequests: [],
  errors: [],
};

function assertExactKeys(value, expectedKeys, label) {
  assert(value && typeof value === 'object' && !Array.isArray(value), `${label} must be an object.`);
  assert.deepEqual(Object.keys(value).sort(), [...expectedKeys].sort(), `${label} keys changed.`);
}

function installTrustedPointerAudit() {
  const events = [];
  for (const type of ['pointermove', 'pointerdown', 'pointerup']) {
    addEventListener(type, (event) => {
      events.push(Object.freeze({
        type,
        isTrusted: event.isTrusted,
        pointerType: event.pointerType,
        clientX: event.clientX,
        clientY: event.clientY,
        button: event.button,
      }));
    }, { capture: true });
  }
  Object.defineProperty(window, '__NINTH_TIDE_POINTER_EVENT_AUDIT__', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: Object.freeze({
      reset() {
        events.length = 0;
      },
      read() {
        return Object.freeze(events.map((event) => Object.freeze({ ...event })));
      },
    }),
  });
}

function captureErrors(page) {
  page.on('console', (message) => {
    if (message.type() === 'error') {
      manifest.errors.push({ source: 'console', message: message.text(), url: page.url() });
    }
  });
  page.on('pageerror', (error) => {
    manifest.errors.push({ source: 'pageerror', message: error.message, url: page.url() });
  });
}

function observeArchiveAudio(page) {
  page.on('request', (request) => {
    if (new URL(request.url()).pathname.endsWith('/archive.mp3')) {
      manifest.archiveAudioRequests.push(request.url());
    }
  });
}

async function inspectInteraction(page, label) {
  const result = await page.evaluate(() => {
    const audit = window.__NINTH_TIDE_INTERACTION_AUDIT__;
    if (!audit || typeof audit.inspect !== 'function') {
      throw new Error('Required __NINTH_TIDE_INTERACTION_AUDIT__.inspect hook is unavailable.');
    }
    return audit.inspect();
  });
  assertExactKeys(result, interactionKeys, `${label} interaction audit`);
  assert(Number.isFinite(result.archiveOpenTarget), `${label} archiveOpenTarget must be finite.`);
  assert.equal(typeof result.coreHovered, 'boolean', `${label} coreHovered must be boolean.`);
  assert(Number.isInteger(result.userPulseCount) && result.userPulseCount >= 0,
    `${label} userPulseCount must be a non-negative integer.`);
  if (result.latestUserPulse !== null) {
    assertExactKeys(result.latestUserPulse, pulseKeys, `${label} latest user pulse`);
    assert(Number.isInteger(result.latestUserPulse.serial) && result.latestUserPulse.serial >= 0,
      `${label} latest user pulse serial must be a non-negative integer.`);
    assert.equal(result.latestUserPulse.source, 'user', `${label} latest pulse was not a user pulse.`);
    assert(Number.isFinite(result.latestUserPulse.originX)
      && Number.isFinite(result.latestUserPulse.originZ),
    `${label} latest user pulse origin must be finite.`);
  }
  return result;
}

async function readUiState(page) {
  return page.evaluate(() => ({
    mode: document.querySelector('#modeState')?.textContent ?? null,
    core: document.querySelector('#coreState')?.textContent ?? null,
    cursorActive: document.querySelector('#cursor')?.classList.contains('active') ?? null,
  }));
}

async function auditCanvas(page, fixture) {
  const runtime = await page.evaluate(() => ({
    width: innerWidth,
    height: innerHeight,
    deviceScaleFactor: devicePixelRatio,
  }));
  assert.deepEqual(runtime, fixture.viewport, 'Ninth Tide runtime viewport/DPR changed.');
  const box = await page.locator('#scene canvas').boundingBox();
  assert.deepEqual(box, fixture.canvasBox, 'Ninth Tide renderer canvas no longer fills the fixed fixture box.');
}

async function settleSectionPreview(page, section) {
  const policy = NINTH_TIDE_CAPTURE_POLICY.find(
    (candidate) => candidate.mode === 'main' && candidate.section === section,
  );
  assert(policy, `Missing deterministic preview policy for section ${section + 1}.`);
  await page.evaluate(async (request) => {
    if (typeof window.__NINTH_TIDE_STEP__ !== 'function') {
      throw new Error('Required __NINTH_TIDE_STEP__ hook is unavailable.');
    }
    await window.__NINTH_TIDE_STEP__(request);
  }, {
    mode: policy.mode,
    section: policy.section,
    timestampMs: policy.timestampMs,
  });
}

async function setDeviceMetrics(client, page, metrics) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: metrics.width,
    height: metrics.height,
    deviceScaleFactor: 1,
    mobile: metrics.mobile,
    screenWidth: metrics.width,
    screenHeight: metrics.height,
  });
  await page.waitForFunction(
    ({ width, height }) => innerWidth === width
      && innerHeight === height
      && devicePixelRatio === 1,
    metrics,
    { timeout: 30_000 },
  );
}

async function inspectQuality(page) {
  return page.evaluate(() => {
    const quality = window.__NINTH_TIDE_QUALITY__;
    if (!quality || typeof quality.inspect !== 'function') {
      throw new Error('Required __NINTH_TIDE_QUALITY__.inspect hook is unavailable.');
    }
    return quality.inspect();
  });
}

async function reconcileQuality(page) {
  return page.evaluate(() => {
    const quality = window.__NINTH_TIDE_QUALITY__;
    if (!quality || typeof quality.reconcile !== 'function') {
      throw new Error('Required __NINTH_TIDE_QUALITY__.reconcile hook is unavailable.');
    }
    return quality.reconcile();
  });
}

async function runQualityRoundTrip(page, client, section) {
  const before = await inspectQuality(page);
  assert.equal(before.profile.tier, 'desktop', `Section ${section + 1} did not start in desktop quality.`);
  assert.equal(before.profile.coarse, false, `Section ${section + 1} started with a coarse pointer.`);

  await setDeviceMetrics(client, page, { width: 819, height: 900, mobile: true });
  const mobileChanged = await reconcileQuality(page);
  const mobile = await inspectQuality(page);
  assert.equal(mobileChanged, true, `Section ${section + 1} did not reconcile to mobile quality.`);
  assert.equal(mobile.profile.tier, 'mobile', `Section ${section + 1} did not enter mobile quality.`);
  assert.equal(mobile.generation, before.generation + 1,
    `Section ${section + 1} mobile reconcile did not replace the quality generation.`);

  await setDeviceMetrics(client, page, { width: 1440, height: 900, mobile: false });
  const desktopChanged = await reconcileQuality(page);
  const after = await inspectQuality(page);
  assert.equal(desktopChanged, true, `Section ${section + 1} did not reconcile back to desktop quality.`);
  assert.equal(after.profile.tier, 'desktop', `Section ${section + 1} did not return to desktop quality.`);
  assert.equal(after.profile.coarse, false, `Section ${section + 1} retained coarse pointer quality.`);
  assert.equal(after.generation, mobile.generation + 1,
    `Section ${section + 1} desktop reconcile did not replace the quality generation.`);

  const record = {
    section,
    before: { generation: before.generation, tier: before.profile.tier, coarse: before.profile.coarse },
    mobile: {
      generation: mobile.generation,
      tier: mobile.profile.tier,
      coarse: mobile.profile.coarse,
      width: mobile.profile.width,
    },
    after: { generation: after.generation, tier: after.profile.tier, coarse: after.profile.coarse },
  };
  manifest.qualityRoundTrips.push(record);
  return record;
}

async function resetPointerAudit(page) {
  await page.evaluate(() => {
    const audit = window.__NINTH_TIDE_POINTER_EVENT_AUDIT__;
    if (!audit || typeof audit.reset !== 'function') {
      throw new Error('Required trusted pointer event audit is unavailable.');
    }
    audit.reset();
  });
}

async function readPointerAudit(page) {
  return page.evaluate(() => {
    const audit = window.__NINTH_TIDE_POINTER_EVENT_AUDIT__;
    if (!audit || typeof audit.read !== 'function') {
      throw new Error('Required trusted pointer event audit is unavailable.');
    }
    return audit.read();
  });
}

function assertTrustedEvent(event, type, point, label, pointerType = 'mouse') {
  assert(event, `${label} did not emit ${type}.`);
  assert.equal(event.type, type, `${label} emitted the wrong pointer event type.`);
  assert.equal(event.isTrusted, true, `${label} ${type} was synthetic.`);
  assert.equal(event.pointerType, pointerType, `${label} ${type} used the wrong pointer type.`);
  assert.equal(event.clientX, point.clientX, `${label} ${type} clientX changed.`);
  assert.equal(event.clientY, point.clientY, `${label} ${type} clientY changed.`);
}

async function auditMobileTouch(browser, config, fixture, section) {
  const context = await browser.newContext({
    ...NINTH_TIDE_CONTEXT_OPTIONS,
    viewport: { width: 819, height: fixture.viewport.height },
    hasTouch: true,
    isMobile: true,
  });
  await context.addInitScript(installTrustedPointerAudit);
  const page = await context.newPage();
  captureErrors(page);
  observeArchiveAudio(page);
  const label = `section ${section + 1} mobile touch`;
  try {
    const previewUrl = new URL(config.buildUrl);
    previewUrl.searchParams.set('preview', 'main');
    previewUrl.searchParams.set('section', String(section));
    const response = await page.goto(previewUrl.href, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });
    assert(response?.ok(), `${label} preview returned HTTP ${response?.status() ?? 'none'}.`);
    await page.waitForFunction(
      () => typeof window.__NINTH_TIDE_HIT_TEST__ === 'function'
        && typeof window.__NINTH_TIDE_INTERACTION_AUDIT__?.inspect === 'function'
        && typeof window.__NINTH_TIDE_QUALITY__?.inspect === 'function',
      undefined,
      { timeout: 30_000 },
    );
    await settleSectionPreview(page, section);
    const quality = await inspectQuality(page);
    assert.equal(quality.profile.tier, 'mobile', `${label} did not use mobile quality.`);
    assert.equal(quality.profile.coarse, true, `${label} did not expose a coarse pointer.`);

    const canvasBox = await page.locator('#scene canvas').boundingBox();
    assert(canvasBox && canvasBox.width === 819 && canvasBox.height === fixture.canvasBox.height,
      `${label} canvas dimensions changed.`);
    const canonicalCenter = fixture.sections[section].points.find(({ kind }) => kind === 'center');
    assert(canonicalCenter, `${label} fixture center is missing.`);
    const point = {
      clientX: Math.round(canonicalCenter.clientX * canvasBox.width / fixture.canvasBox.width),
      clientY: canonicalCenter.clientY,
    };
    const hookHit = await page.evaluate(({ clientX, clientY }) => (
      window.__NINTH_TIDE_HIT_TEST__({ clientX, clientY })
    ), point);
    assert.equal(hookHit, true, `${label} scaled canonical center did not hit the proxy.`);

    const before = await inspectInteraction(page, `${label} before`);
    await resetPointerAudit(page);
    await page.touchscreen.tap(point.clientX, point.clientY);
    const after = await inspectInteraction(page, `${label} after`);
    const events = await readPointerAudit(page);
    assertTrustedEvent(events.find(({ type }) => type === 'pointerdown'), 'pointerdown', point, label, 'touch');
    assertTrustedEvent(events.find(({ type }) => type === 'pointerup'), 'pointerup', point, label, 'touch');
    assert.equal((before.archiveOpenTarget > 0.5) !== (after.archiveOpenTarget > 0.5), true,
      `${label} did not enter the core branch.`);
    assert(after.latestUserPulse !== null
      && after.latestUserPulse.serial > (before.latestUserPulse?.serial ?? -1),
    `${label} did not emit a new user pulse.`);
    assert.equal(after.latestUserPulse.originX, 0, `${label} pulse originX was not zero.`);
    assert.equal(after.latestUserPulse.originZ, 0, `${label} pulse originZ was not zero.`);
    manifest.mobileTouchSmokes.push({
      section,
      viewport: { width: 819, height: fixture.viewport.height, deviceScaleFactor: 1 },
      quality: { tier: quality.profile.tier, coarse: quality.profile.coarse },
      point,
      hookHit,
      clickEnteredCoreBranch: true,
      latestUserPulse: after.latestUserPulse,
      trustedPointerEvents: events.map(({ type, isTrusted, pointerType: typeName }) => ({
        type,
        isTrusted,
        pointerType: typeName,
      })),
    });
  } finally {
    await page.close();
    await context.close();
  }
}

async function auditPoint(page, section, point) {
  const label = `section ${section + 1} ${point.id}`;
  const hookHit = await page.evaluate(({ clientX, clientY }) => {
    if (typeof window.__NINTH_TIDE_HIT_TEST__ !== 'function') {
      throw new Error('Required __NINTH_TIDE_HIT_TEST__ hook is unavailable.');
    }
    return window.__NINTH_TIDE_HIT_TEST__({ clientX, clientY });
  }, point);
  assert.equal(hookHit, point.expectedHit, `${label} hook result changed.`);

  await page.mouse.move(2, 2);
  await resetPointerAudit(page);
  await page.mouse.move(point.clientX, point.clientY);
  const hover = await inspectInteraction(page, `${label} hover`);
  const hoverUi = await readUiState(page);
  assert.equal(hover.coreHovered, point.expectedHit, `${label} real hover branch disagreed with the hook.`);
  assert.equal(hoverUi.cursorActive, point.expectedHit, `${label} desktop hover cursor disagreed with the hook.`);

  const before = hover;
  const beforeUi = hoverUi;
  await page.mouse.down();
  await page.mouse.up();
  const after = await inspectInteraction(page, `${label} click`);
  const afterUi = await readUiState(page);
  const events = await readPointerAudit(page);
  assertTrustedEvent(events.find(({ type }) => type === 'pointermove'), 'pointermove', point, label);
  assertTrustedEvent(events.find(({ type }) => type === 'pointerdown'), 'pointerdown', point, label);
  assertTrustedEvent(events.find(({ type }) => type === 'pointerup'), 'pointerup', point, label);

  assert(after.latestUserPulse !== null, `${label} click did not emit a user pulse.`);
  assert(after.latestUserPulse.serial > (before.latestUserPulse?.serial ?? -1),
    `${label} click did not become the latest user pulse.`);
  assert.equal(after.latestUserPulse.mode, section, `${label} pulse used the wrong chapter mode.`);

  const enteredCoreBranch = (before.archiveOpenTarget > 0.5) !== (after.archiveOpenTarget > 0.5);
  assert.equal(enteredCoreBranch, point.expectedHit, `${label} real click branch disagreed with the hook.`);
  assert.equal(afterUi.cursorActive, point.expectedHit,
    `${label} cursor did not remain synchronized after pointerup.`);
  if (point.expectedHit) {
    assert.equal(after.latestUserPulse.originX, 0, `${label} core pulse originX was not zero.`);
    assert.equal(after.latestUserPulse.originZ, 0, `${label} core pulse originZ was not zero.`);
    const expectedOpen = after.archiveOpenTarget > 0.5;
    assert.deepEqual(afterUi, {
      mode: expectedOpen ? 'DECODING' : 'OBSERVATION',
      core: expectedOpen ? 'UNSEALED' : 'RESONANT',
      cursorActive: true,
    }, `${label} archive UI did not toggle with the core branch.`);
  } else {
    assert.equal(after.archiveOpenTarget, before.archiveOpenTarget,
      `${label} negative click changed archiveOpenTarget.`);
    assert.equal(afterUi.mode, beforeUi.mode, `${label} negative click changed archive mode.`);
    assert.equal(afterUi.core, beforeUi.core, `${label} negative click changed core state.`);
    assert(after.latestUserPulse.originX !== 0 || after.latestUserPulse.originZ !== 0,
      `${label} negative click emitted the core-origin pulse.`);
  }

  return {
    id: point.id,
    kind: point.kind,
    axis: point.axis,
    clientX: point.clientX,
    clientY: point.clientY,
    beforeHit: point.beforeHit,
    expectedHit: point.expectedHit,
    hookHit,
    hoverHit: hover.coreHovered,
    cursorActive: hoverUi.cursorActive,
    clickEnteredCoreBranch: enteredCoreBranch,
    archiveOpenTargetBefore: before.archiveOpenTarget,
    archiveOpenTargetAfter: after.archiveOpenTarget,
    latestUserPulse: after.latestUserPulse,
    trustedPointerEvents: events.map(({ type, isTrusted, pointerType }) => ({ type, isTrusted, pointerType })),
  };
}

async function runGate() {
  assertBundledPlaywrightVersion(playwrightVersion);
  const config = parseNinthTideConfig(process.env);
  const fixtureSource = await readFile(config.fixturePath);
  const fixture = await readHitFixture(config.fixturePath);
  manifest.fixture = {
    path: config.fixturePath,
    sha256: sha256Hex(fixtureSource),
    schemaVersion: fixture.schemaVersion,
    viewport: fixture.viewport,
    sectionCount: fixture.sections.length,
    pointCount: fixture.sections.reduce((count, section) => count + section.points.length, 0),
  };

  const browser = await chromium.launch(NINTH_TIDE_BROWSER_LAUNCH_OPTIONS);
  try {
    manifest.environment.browserVersion = browser.version();
    const context = await browser.newContext(NINTH_TIDE_CONTEXT_OPTIONS);
    await context.addInitScript(installTrustedPointerAudit);
    const page = await context.newPage();
    captureErrors(page);
    observeArchiveAudio(page);
    const client = await context.newCDPSession(page);
    try {
      for (const definition of fixture.sections) {
        const previewUrl = new URL(config.buildUrl);
        previewUrl.searchParams.set('preview', 'main');
        previewUrl.searchParams.set('section', String(definition.section));
        const response = await page.goto(previewUrl.href, {
          waitUntil: 'domcontentloaded',
          timeout: 30_000,
        });
        assert(response?.ok(),
          `Section ${definition.section + 1} preview returned HTTP ${response?.status() ?? 'none'}.`);
        await page.waitForFunction(
          () => typeof window.__NINTH_TIDE_HIT_TEST__ === 'function'
            && typeof window.__NINTH_TIDE_INTERACTION_AUDIT__?.inspect === 'function'
            && typeof window.__NINTH_TIDE_QUALITY__?.inspect === 'function'
            && typeof window.__NINTH_TIDE_QUALITY__?.reconcile === 'function',
          undefined,
          { timeout: 30_000 },
        );
        await auditCanvas(page, fixture);
        if (definition.section >= 7) {
          await runQualityRoundTrip(page, client, definition.section);
          await auditCanvas(page, fixture);
        }
        await settleSectionPreview(page, definition.section);
        const record = { section: definition.section, points: [] };
        for (const point of definition.points) {
          record.points.push(await auditPoint(page, definition.section, point));
        }
        manifest.sections.push(record);
      }
      assert.equal(manifest.archiveAudioRequests.length, 0,
        `Hit-target previews requested archive audio: ${JSON.stringify(manifest.archiveAudioRequests)}.`);
      assert.equal(manifest.errors.length, 0,
        `Hit-target QA emitted errors: ${manifest.errors.map(({ message }) => message).join(' | ')}.`);
      assert.equal(manifest.sections.length, 9, 'Hit-target QA did not cover all nine chapters.');
      assert.equal(manifest.sections.reduce((count, section) => count + section.points.length, 0), 81,
        'Hit-target QA did not cover all 81 canonical points.');
      assert.deepEqual(manifest.qualityRoundTrips.map(({ section }) => section), [7, 8],
        'Hit-target QA did not complete VIII/IX quality round trips.');
      for (const section of [7, 8]) {
        await auditMobileTouch(browser, config, fixture, section);
      }
      assert.deepEqual(manifest.mobileTouchSmokes.map(({ section }) => section), [7, 8],
        'Hit-target QA did not complete VIII/IX mobile touch smokes.');
      manifest.status = 'passed';
    } finally {
      await page.close();
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

await mkdir(outputDir, { recursive: true });
try {
  await runGate();
} catch (error) {
  manifest.status = 'failed';
  manifest.failure = {
    name: error instanceof Error ? error.name : 'Error',
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : null,
  };
} finally {
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

if (manifest.status !== 'passed') {
  throw new Error(`Ninth Tide hit-target QA failed: ${manifest.failure?.message ?? 'unknown failure'}.`);
}

console.log(`Ninth Tide hit-target QA passed (9 chapters, 81 points): ${manifestPath}`);
