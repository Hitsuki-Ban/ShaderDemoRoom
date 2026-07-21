import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import {
  assertBundledPlaywrightVersion,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
  parseNinthTideConfig,
  sha256Hex,
} from './ninth-tide-core.mjs';
import { measureNearBlackContrastRgba8 } from './ninth-tide-near-black-metrics.mjs';
import { parsePng } from './water-qa-metrics.mjs';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;
const outputDir = 'output/playwright/ninth-tide-near-black';
const black = Object.freeze({ red: 0, green: 0, blue: 0 });
const states = Object.freeze([
  Object.freeze({ id: 'opening', mode: 'opening', section: 0, timestampMs: 5_750 }),
  Object.freeze({ id: 'section-8', mode: 'main', section: 8, timestampMs: 342_276.2 }),
  Object.freeze({ id: 'ending', mode: 'ending', section: 8, timestampMs: 346_000 }),
]);

const manifest = {
  schemaVersion: 1,
  ticket: 'T-NT-04',
  gate: 'qa:ninth-tide-near-black',
  status: 'running',
  environment: {
    playwrightVersion,
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    browserLaunchOptions: NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
    contextOptions: NINTH_TIDE_CONTEXT_OPTIONS,
  },
  thresholds: {
    openingMinimum4_5Pixels: 500,
    section8Minimum3Pixels: 500,
    endingPhaseP90: { minimum: 3, maximumExclusive: 4.5 },
    endingMinimum3Pixels: 500,
    endingMobileMinimum3Pixels: 100,
    endingMaximumFullFrame3Ratio: 0.0025,
    endingMinimumTrack3Pixels: 1,
    expectedEndingProgressPercent: 97.601,
    progressTolerancePercentagePoints: 0.1,
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

function integerRect(box, frameWidth, frameHeight, padding = 8) {
  if (!box) throw new Error('Required compositor target has no bounding box.');
  const x = Math.max(0, Math.floor(box.x - padding));
  const y = Math.max(0, Math.floor(box.y - padding));
  const right = Math.min(frameWidth, Math.ceil(box.x + box.width + padding));
  const bottom = Math.min(frameHeight, Math.ceil(box.y + box.height + padding));
  return { x, y, width: right - x, height: bottom - y };
}

function pngRgba(frame) {
  const rgba = new Uint8Array(frame.width * frame.height * 4);
  for (let source = 0, target = 0; source < frame.pixels.length; source += frame.bytesPerPixel, target += 4) {
    rgba[target] = frame.pixels[source];
    rgba[target + 1] = frame.pixels[source + 1];
    rgba[target + 2] = frame.pixels[source + 2];
    rgba[target + 3] = frame.bytesPerPixel === 4 ? frame.pixels[source + 3] : 255;
  }
  return rgba;
}

function measure(frame, rect) {
  return measureNearBlackContrastRgba8({
    rgba: pngRgba(frame),
    width: frame.width,
    height: frame.height,
    rect,
    background: black,
  });
}

async function callStep(page, state) {
  return page.evaluate(async (request) => {
    if (typeof window.__NINTH_TIDE_STEP__ !== 'function') {
      throw new Error('Required __NINTH_TIDE_STEP__ hook is unavailable.');
    }
    return window.__NINTH_TIDE_STEP__(request);
  }, {
    mode: state.mode,
    section: state.section,
    timestampMs: state.timestampMs,
  });
}

async function readDom(page) {
  return page.evaluate(() => {
    const snapshot = (selector) => {
      const element = document.querySelector(selector);
      if (!(element instanceof HTMLElement)) throw new Error(`Missing QA element: ${selector}.`);
      const style = getComputedStyle(element);
      return {
        selector,
        text: element.textContent?.trim() ?? '',
        ariaHidden: element.getAttribute('aria-hidden'),
        opacity: style.opacity,
        visibility: style.visibility,
        display: style.display,
        animationName: style.animationName,
        rect: element.getBoundingClientRect().toJSON(),
      };
    };
    const rootStyle = getComputedStyle(document.documentElement);
    const progressbar = document.querySelector('#archiveProgress');
    if (!(progressbar instanceof HTMLElement)) throw new Error('Missing #archiveProgress.');
    return {
      bodyClasses: [...document.body.classList],
      anchor: snapshot('#endingAnchor'),
      endingPhase: snapshot('.ending-anchor-phase'),
      endingTrack: snapshot('.ending-anchor-progress'),
      ritual: snapshot('#ritualCaption'),
      phase: snapshot('#phaseNumber'),
      hud: snapshot('.hud'),
      epilogue: snapshot('#epilogue'),
      progress: rootStyle.getPropertyValue('--progress').trim(),
      timeNow: document.querySelector('#timeNow')?.textContent ?? '',
      timeTotal: document.querySelector('#timeTotal')?.textContent ?? '',
      messageClass: document.querySelector('#message')?.className ?? '',
      accessibility: {
        statusRoles: document.querySelectorAll('[role="status"]').length,
        progressbarRoles: document.querySelectorAll('[role="progressbar"]').length,
        liveRegions: document.querySelectorAll('[aria-live]').length,
        runtimeStatus: document.querySelector('#runtimeStatus')?.textContent ?? '',
        progressNow: progressbar.getAttribute('aria-valuenow'),
        progressText: progressbar.getAttribute('aria-valuetext'),
      },
      viewport: {
        width: innerWidth,
        height: innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
      },
    };
  });
}

function assertSharedDom(record) {
  const { dom } = record;
  assert(dom.accessibility.statusRoles === 1, `${record.id} must expose exactly one status role.`);
  assert(dom.accessibility.progressbarRoles === 1, `${record.id} must expose exactly one progressbar role.`);
  assert(dom.accessibility.liveRegions === 1, `${record.id} must expose exactly one live region.`);
  assert(dom.anchor.ariaHidden === 'true', `${record.id} ending anchor must stay out of the accessibility tree.`);
  assert(dom.hud.ariaHidden === 'true', `${record.id} decorative HUD must stay out of the accessibility tree.`);
  assert(dom.endingPhase.animationName === 'none' && dom.endingTrack.animationName === 'none',
    `${record.id} ending anchor must not add CSS animation.`);
  assert(dom.viewport.width === dom.viewport.scrollWidth && dom.viewport.height === dom.viewport.scrollHeight,
    `${record.id} introduced viewport overflow.`);
}

function assertState(record) {
  assertSharedDom(record);
  const { dom, metrics } = record;
  if (record.id === 'opening') {
    assert(dom.anchor.opacity === '0' && dom.anchor.visibility === 'hidden',
      'Opening must not show the ending anchor.');
    assert(dom.ritual.opacity === '1', 'Opening ritual caption must remain visible.');
    assert(metrics.focus.atLeast4_5PixelCount >= manifest.thresholds.openingMinimum4_5Pixels,
      `Opening ritual has only ${metrics.focus.atLeast4_5PixelCount} pixels at 4.5:1.`);
    assert(dom.accessibility.runtimeStatus === '开场校准中', 'Opening status must describe calibration.');
    return;
  }
  if (record.id === 'section-8') {
    assert(dom.anchor.opacity === '0' && dom.anchor.visibility === 'hidden',
      'Section IX must not show the ending anchor.');
    assert(Number(dom.hud.opacity) >= 0.68, 'Section IX must retain the existing visible HUD.');
    assert(metrics.focus.atLeast3PixelCount >= manifest.thresholds.section8Minimum3Pixels,
      `Section IX has only ${metrics.focus.atLeast3PixelCount} pixels at 3:1.`);
    assert(dom.accessibility.runtimeStatus === '第 IX 章 · 无岸长夜', 'Section IX status is incorrect.');
    return;
  }

  const expected = manifest.thresholds.expectedEndingProgressPercent;
  const actualProgress = Number.parseFloat(dom.progress);
  const ariaProgress = Number.parseFloat(dom.accessibility.progressNow ?? 'NaN');
  assert(dom.anchor.opacity === '0.4' && dom.anchor.visibility === 'visible',
    'Ending must expose the 0.4 opacity continuity anchor.');
  assert(dom.hud.opacity === '0', 'Ending must not reveal the full HUD.');
  assert(dom.epilogue.visibility === 'hidden', 'Ending preview must remain before the epilogue.');
  assert(dom.messageClass === '', 'Ending QA must not depend on a transient message.');
  assert(metrics.focus.contrastP90 >= manifest.thresholds.endingPhaseP90.minimum,
    `Ending IX P90 ${metrics.focus.contrastP90} is below 3:1.`);
  assert(metrics.focus.contrastP90 < manifest.thresholds.endingPhaseP90.maximumExclusive,
    `Ending IX P90 ${metrics.focus.contrastP90} exceeds the near-black upper band.`);
  const minimumEndingPixels = record.variant === 'mobile'
    ? manifest.thresholds.endingMobileMinimum3Pixels
    : manifest.thresholds.endingMinimum3Pixels;
  assert(metrics.focus.atLeast3PixelCount >= minimumEndingPixels,
    `Ending IX has only ${metrics.focus.atLeast3PixelCount} pixels at 3:1.`);
  assert(metrics.fullFrame.atLeast3Ratio <= manifest.thresholds.endingMaximumFullFrame3Ratio,
    `Ending 3:1 coverage ${metrics.fullFrame.atLeast3Ratio} is too dominant.`);
  assert(metrics.track.atLeast3PixelCount >= manifest.thresholds.endingMinimumTrack3Pixels,
    'Ending playhead is not visible at 3:1.');
  assert(Math.abs(actualProgress - expected) <= manifest.thresholds.progressTolerancePercentagePoints,
    `Ending CSS progress ${actualProgress} differs from ${expected}.`);
  assert(Math.abs(ariaProgress - expected) <= manifest.thresholds.progressTolerancePercentagePoints,
    `Ending ARIA progress ${ariaProgress} differs from ${expected}.`);
  assert(dom.timeNow === '05:46' && dom.timeTotal === '05:54',
    `Ending transport is ${dom.timeNow} / ${dom.timeTotal}; expected 05:46 / 05:54.`);
  assert(dom.accessibility.progressText === '05:46 / 05:54', 'Ending progress text is incorrect.');
  assert(dom.accessibility.runtimeStatus === '终幕退潮中 · 第 IX 章', 'Ending status is incorrect.');
}

async function captureState(context, buildUrl, state, suffix = '') {
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  try {
    const response = await page.goto(stateUrl(buildUrl, state), { waitUntil: 'domcontentloaded', timeout: 30_000 });
    assert(response?.ok(), `${state.id} navigation failed with HTTP ${response?.status() ?? 'none'}.`);
    await page.waitForFunction(() => typeof window.__NINTH_TIDE_STEP__ === 'function', undefined, { timeout: 30_000 });
    const hook = await callStep(page, state);
    await page.locator('#message').evaluate((element) => element.classList.remove('show'));
    await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 0)));
    const png = await page.screenshot({ animations: 'disabled' });
    const dom = await readDom(page);
    const frame = parsePng(png);
    const viewport = page.viewportSize();
    assert(viewport && frame.width === viewport.width && frame.height === viewport.height,
    `${state.id} compositor capture has unexpected dimensions ${frame.width}x${frame.height}.`);
    const focusBox = state.id === 'opening'
      ? dom.ritual.rect
      : state.id === 'section-8'
        ? dom.phase.rect
        : dom.endingPhase.rect;
    const metrics = {
      focus: measure(frame, integerRect(focusBox, frame.width, frame.height)),
      fullFrame: measure(frame, { x: 0, y: 0, width: frame.width, height: frame.height }),
    };
    if (state.id === 'ending') {
      metrics.track = measure(frame, integerRect(dom.endingTrack.rect, frame.width, frame.height));
    }
    const fileName = `${state.id}${suffix}.png`;
    await writeFile(join(outputDir, fileName), png);
    const record = {
      id: state.id,
      variant: suffix === '-reduced-motion'
        ? 'reduced-motion'
        : suffix === '-mobile'
          ? 'mobile'
          : 'default-motion',
      request: state,
      url: page.url(),
      screenshot: { fileName, bytes: png.length, sha256: sha256Hex(png) },
      hook: {
        chapter: hook.chapter,
        frameRenders: hook.frameRenders,
        queuedAnimationFrames: hook.queuedAnimationFrames,
        framebufferHash: hook.framebuffer.hash,
      },
      dom,
      metrics,
      consoleErrors,
    };
    assert(consoleErrors.length === 0, `${state.id} emitted console errors: ${consoleErrors.join(' | ')}.`);
    assertState(record);
    return record;
  } finally {
    await page.close();
  }
}

async function auditEndingStateExit(context, buildUrl) {
  const page = await context.newPage();
  const ending = states.find((state) => state.id === 'ending');
  const main = states.find((state) => state.id === 'section-8');
  const opening = states.find((state) => state.id === 'opening');
  const readAnchor = () => page.evaluate(() => {
    const style = getComputedStyle(document.querySelector('#endingAnchor'));
    return { opacity: style.opacity, visibility: style.visibility };
  });
  const assertHidden = (snapshot, destination) => {
    assert(snapshot.opacity === '0' && snapshot.visibility === 'hidden',
      `Ending anchor leaked into ${destination}: ${JSON.stringify(snapshot)}.`);
  };
  try {
    const response = await page.goto(stateUrl(buildUrl, ending), { waitUntil: 'domcontentloaded', timeout: 30_000 });
    assert(response?.ok(), `Ending transition audit navigation failed with HTTP ${response?.status() ?? 'none'}.`);
    await page.waitForFunction(() => typeof window.__NINTH_TIDE_STEP__ === 'function', undefined, { timeout: 30_000 });

    await callStep(page, ending);
    await page.screenshot({ animations: 'disabled' });
    await callStep(page, main);
    const mainExit = await readAnchor();
    assertHidden(mainExit, 'main preview');

    await callStep(page, ending);
    await page.screenshot({ animations: 'disabled' });
    await callStep(page, opening);
    const openingExit = await readAnchor();
    assertHidden(openingExit, 'opening preview');

    await callStep(page, ending);
    await page.screenshot({ animations: 'disabled' });
    const endedExit = await page.evaluate(() => {
      document.body.classList.add('ended');
      const style = getComputedStyle(document.querySelector('#endingAnchor'));
      return { opacity: style.opacity, visibility: style.visibility };
    });
    assertHidden(endedExit, 'ended state');
    return { mainExit, openingExit, endedExit };
  } finally {
    await page.close();
  }
}

function assertReducedMotion(defaultEnding, reducedEnding) {
  for (const key of ['opacity', 'visibility', 'animationName']) {
    assert(defaultEnding.dom.anchor[key] === reducedEnding.dom.anchor[key],
      `Reduced motion changed ending anchor ${key}.`);
  }
  for (const key of ['x', 'y', 'width', 'height']) {
    assert(Math.abs(defaultEnding.dom.endingPhase.rect[key] - reducedEnding.dom.endingPhase.rect[key]) < 0.01,
      `Reduced motion changed ending phase ${key}.`);
    assert(Math.abs(defaultEnding.dom.endingTrack.rect[key] - reducedEnding.dom.endingTrack.rect[key]) < 0.01,
      `Reduced motion changed ending track ${key}.`);
  }
  assert(defaultEnding.dom.progress === reducedEnding.dom.progress,
    'Reduced motion changed ending progress.');
}

async function runGate() {
  assertBundledPlaywrightVersion(playwrightVersion);
  const config = parseNinthTideConfig(process.env);
  manifest.buildUrl = config.buildUrl;
  await mkdir(outputDir, { recursive: true });
  const browser = await chromium.launch(NINTH_TIDE_BROWSER_LAUNCH_OPTIONS);
  try {
    const context = await browser.newContext(NINTH_TIDE_CONTEXT_OPTIONS);
    for (const state of states) manifest.runs.push(await captureState(context, config.buildUrl, state));
    manifest.transitionAudit = await auditEndingStateExit(context, config.buildUrl);
    await context.close();
    const reducedContext = await browser.newContext({
      ...NINTH_TIDE_CONTEXT_OPTIONS,
      reducedMotion: 'reduce',
    });
    const ending = states.find((state) => state.id === 'ending');
    const reducedEnding = await captureState(reducedContext, config.buildUrl, ending, '-reduced-motion');
    manifest.runs.push(reducedEnding);
    await reducedContext.close();
    assertReducedMotion(
      manifest.runs.find((record) => record.id === 'ending' && record.variant === 'default-motion'),
      reducedEnding,
    );
    const mobileContext = await browser.newContext({
      ...NINTH_TIDE_CONTEXT_OPTIONS,
      viewport: { width: 390, height: 844 },
      screen: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    manifest.runs.push(await captureState(mobileContext, config.buildUrl, ending, '-mobile'));
    await mobileContext.close();
    manifest.status = 'passed';
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

console.log(`Ninth Tide near-black compositor QA passed (${manifest.runs.length} captures).`);
