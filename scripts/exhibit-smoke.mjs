import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const baseUrl =
  process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
const consoleErrors = [];
const orbFreezeCaptureDir = path.resolve('output/playwright/orb-freeze');
const orbHudCaptureDir = path.resolve('output/playwright/orb-hud');

await Promise.all([
  mkdir(orbFreezeCaptureDir, { recursive: true }),
  mkdir(orbHudCaptureDir, { recursive: true }),
]);

page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => consoleErrors.push(error.message));

const tideSections = [];
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

async function openEmbeddedRoom(roomId, expectedCapabilities) {
  await page.goto(`${baseUrl}/#/room/${roomId}`, { waitUntil: 'domcontentloaded' });
  const iframe = page.locator('iframe.embedded-exhibit-frame');
  await iframe.waitFor({ state: 'attached' });
  await page.waitForFunction(
    ({ capabilities }) => {
      const element = document.querySelector('iframe.embedded-exhibit-frame');
      return element?.dataset.bridgeState === 'ready'
        && element.dataset.bridgeCapabilities === capabilities
        && typeof element.dataset.bridgeInstanceId === 'string';
    },
    { capabilities: expectedCapabilities.join(' ') },
  );
  await page.waitForFunction(() => {
    const element = document.querySelector('[data-telemetry-source="embedded"]');
    if (!element?.getAttribute('data-telemetry-json')) return false;
    return element.querySelector('[data-telemetry-state="live"]') !== null;
  });
  return iframe;
}

async function postEmbeddedCommand(iframe, type, payload) {
  const instanceId = await iframe.getAttribute('data-bridge-instance-id');
  if (!instanceId) throw new Error(`Embedded ${type} command has no instance id.`);
  await iframe.evaluate((element, command) => {
    element.contentWindow.postMessage({
      context: 'shader-demo-room',
      v: 1,
      instanceId: command.instanceId,
      type: command.type,
      payload: command.payload,
    }, location.origin);
  }, { instanceId, type, payload });
}

async function readEmbeddedStats() {
  const rawStats = await page
    .locator('[data-telemetry-source="embedded"]')
    .getAttribute('data-telemetry-json');
  if (!rawStats) throw new Error('Embedded telemetry has no stats payload.');
  return JSON.parse(rawStats);
}

async function waitForEmbeddedStats({ paused, minimumFrameCount = 0 }) {
  await page.waitForFunction(
    ({ expectedPaused, minimum }) => {
      const rawStats = document
        .querySelector('[data-telemetry-source="embedded"]')
        ?.getAttribute('data-telemetry-json');
      if (!rawStats) return false;
      const stats = JSON.parse(rawStats);
      return stats.paused === expectedPaused && stats.frameCount >= minimum;
    },
    { expectedPaused: paused, minimum: minimumFrameCount },
  );
  return readEmbeddedStats();
}

async function readHudText(hud) {
  return (await hud.textContent())?.trim() ?? '';
}

async function pollHudText(hud, predicate, label) {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const text = await readHudText(hud);
    if (predicate(text)) return text;
    await page.waitForTimeout(20);
  }
  throw new Error(`${label} HUD did not reach the expected state; last text: ${await readHudText(hud)}.`);
}

async function resetHudHistory(hud) {
  await hud.evaluate((element) => {
    const frameWindow = element.ownerDocument.defaultView;
    frameWindow.__shaderDemoRoomHudQa?.observer.disconnect();
    const history = [element.textContent.trim()];
    const observer = new MutationObserver(() => history.push(element.textContent.trim()));
    observer.observe(element, { characterData: true, childList: true, subtree: true });
    frameWindow.__shaderDemoRoomHudQa = { history, observer };
  });
}

async function readHudHistory(hud) {
  return hud.evaluate((element) => [
    ...element.ownerDocument.defaultView.__shaderDemoRoomHudQa.history,
  ]);
}

function assertHudResumeHistory(history, label) {
  const warmUpIndex = history.indexOf('-- FPS');
  const numericIndex = history.findIndex(
    (text, index) => index > warmUpIndex && /^\d+ FPS$/.test(text),
  );
  if (history[0] !== 'PAUSED' || warmUpIndex < 1 || numericIndex < 0) {
    throw new Error(`${label} HUD resume sequence was invalid: ${JSON.stringify(history)}.`);
  }
}

async function assertPauseLifecycle(iframe, label, { hud = null, pausedCapturePath = null } = {}) {
  const running = await waitForEmbeddedStats({ paused: false, minimumFrameCount: 1 });
  const runningHud = hud
    ? await pollHudText(hud, (text) => /^\d+ FPS$/.test(text), `${label} running`)
    : null;
  await postEmbeddedCommand(iframe, 'set-paused', { paused: true });
  const paused = await waitForEmbeddedStats({
    paused: true,
    minimumFrameCount: running.frameCount,
  });
  const pausedHud = hud
    ? await pollHudText(hud, (text) => text === 'PAUSED', `${label} paused`)
    : null;
  if (pausedCapturePath) await iframe.contentFrame().locator('body').screenshot({ path: pausedCapturePath });
  await page.waitForTimeout(750);
  const stillPaused = await readEmbeddedStats();
  if (stillPaused.frameCount !== paused.frameCount) {
    throw new Error(`${label} rendered while paused: ${paused.frameCount} -> ${stillPaused.frameCount}.`);
  }
  if (hud && await readHudText(hud) !== 'PAUSED') {
    throw new Error(`${label} HUD changed while paused.`);
  }
  if (hud) await resetHudHistory(hud);
  await postEmbeddedCommand(iframe, 'set-paused', { paused: false });
  const resumed = await waitForEmbeddedStats({
    paused: false,
    minimumFrameCount: paused.frameCount + 1,
  });
  const resumedHud = hud
    ? await pollHudText(hud, (text) => /^\d+ FPS$/.test(text), `${label} resumed`)
    : null;
  const resumeHudHistory = hud ? await readHudHistory(hud) : null;
  if (resumeHudHistory) assertHudResumeHistory(resumeHudHistory, label);
  return {
    beforePause: running.frameCount,
    pausedAt: paused.frameCount,
    resumedAt: resumed.frameCount,
    ...(hud ? { runningHud, pausedHud, resumeHudHistory, resumedHud } : {}),
  };
}

async function assertPauseRace(iframe, label) {
  const running = await waitForEmbeddedStats({ paused: false, minimumFrameCount: 1 });
  await postEmbeddedCommand(iframe, 'set-paused', { paused: true });
  await postEmbeddedCommand(iframe, 'set-paused', { paused: false });
  await postEmbeddedCommand(iframe, 'set-paused', { paused: true });
  const paused = await waitForEmbeddedStats({
    paused: true,
    minimumFrameCount: running.frameCount,
  });
  await page.waitForTimeout(750);
  const stillPaused = await readEmbeddedStats();
  if (stillPaused.frameCount !== paused.frameCount) {
    throw new Error(
      `${label} pause race resumed rendering: ${paused.frameCount} -> ${stillPaused.frameCount}.`,
    );
  }
  await postEmbeddedCommand(iframe, 'set-paused', { paused: false });
  const resumed = await waitForEmbeddedStats({
    paused: false,
    minimumFrameCount: paused.frameCount + 1,
  });
  return {
    beforeRace: running.frameCount,
    pausedAt: paused.frameCount,
    resumedAt: resumed.frameCount,
  };
}

async function assertWallClockTelemetry(iframe, label) {
  await postEmbeddedCommand(iframe, 'set-paused', { paused: true });
  await waitForEmbeddedStats({ paused: true });
  await iframe.evaluate((element) => {
    const child = element.contentWindow;
    child.__shaderDemoRoomQaAnimationFrame = {
      request: child.requestAnimationFrame,
      cancel: child.cancelAnimationFrame,
    };
    child.requestAnimationFrame = (callback) => child.setTimeout(
      () => callback(child.performance.now()),
      80,
    );
    child.cancelAnimationFrame = (handle) => child.clearTimeout(handle);
  });

  let throttled;
  try {
    await postEmbeddedCommand(iframe, 'set-paused', { paused: false });
    const deadline = Date.now() + 10_000;
    while (Date.now() < deadline) {
      const stats = await readEmbeddedStats();
      if (
        !stats.paused
        && stats.fps > 0
        && stats.fps < 18
        && stats.frameTimeMs > 55
      ) {
        throttled = stats;
        break;
      }
      await page.waitForTimeout(100);
    }
    if (!throttled) {
      throw new Error(`${label} telemetry did not reflect throttled wall-clock cadence.`);
    }
  } finally {
    await postEmbeddedCommand(iframe, 'set-paused', { paused: true });
    await waitForEmbeddedStats({ paused: true });
    await iframe.evaluate((element) => {
      const child = element.contentWindow;
      const original = child.__shaderDemoRoomQaAnimationFrame;
      child.requestAnimationFrame = original.request;
      child.cancelAnimationFrame = original.cancel;
      delete child.__shaderDemoRoomQaAnimationFrame;
    });
    await postEmbeddedCommand(iframe, 'set-paused', { paused: false });
    await waitForEmbeddedStats({
      paused: false,
      minimumFrameCount: throttled?.frameCount ?? 1,
    });
  }
  return { fps: throttled.fps, frameTimeMs: throttled.frameTimeMs };
}

async function assertTideMediaStartedWhilePaused(iframe) {
  const embedded = iframe.contentFrame();
  const audio = embedded.locator('audio');
  await postEmbeddedCommand(iframe, 'set-paused', { paused: true });
  await waitForEmbeddedStats({ paused: true });
  await page.waitForTimeout(500);
  await embedded.locator('#enterBtn').click({ force: true });
  await embedded.locator('#enterBtn:not([disabled])').waitFor({ state: 'attached' });
  if (!(await audio.evaluate((element) => element.paused))) {
    throw new Error('Ninth Tide media played while the runtime was paused.');
  }

  await postEmbeddedCommand(iframe, 'set-paused', { paused: false });
  await waitForEmbeddedStats({ paused: false });
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    if (!(await audio.evaluate((element) => element.paused))) {
      return { resumed: true };
    }
    await page.waitForTimeout(100);
  }
  const diagnostic = await audio.evaluate((element) => ({
    currentSrc: element.currentSrc,
    currentTime: element.currentTime,
    duration: element.duration,
    errorCode: element.error?.code ?? null,
    networkState: element.networkState,
    paused: element.paused,
    readyState: element.readyState,
  }));
  const stats = await readEmbeddedStats();
  throw new Error(
    `Ninth Tide did not resume media started during lifecycle pause: ${JSON.stringify({ diagnostic, stats, consoleErrors })}`,
  );
}

async function pollEmbeddedStats({ paused, minimumFrameCount }, label) {
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const stats = await readEmbeddedStats();
    if (stats.paused === paused && stats.frameCount >= minimumFrameCount) return stats;
    await page.waitForTimeout(100);
  }
  throw new Error(`${label} did not publish paused=${paused} telemetry in time.`);
}

async function pollFrameVisibility(iframe, expected, label) {
  const root = iframe.contentFrame().locator('html');
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    const visibility = await root.evaluate(
      (element) => element.ownerDocument.visibilityState,
    );
    if (visibility === expected) return;
    await page.waitForTimeout(100);
  }
  throw new Error(`${label} iframe did not become ${expected}.`);
}

async function setVisibilityOverride(iframe, hidden) {
  await iframe.evaluate((element, nextHidden) => {
    for (const targetDocument of [document, element.contentDocument]) {
      Object.defineProperties(targetDocument, {
        hidden: { configurable: true, value: nextHidden },
        visibilityState: {
          configurable: true,
          value: nextHidden ? 'hidden' : 'visible',
        },
      });
      targetDocument.dispatchEvent(new Event('visibilitychange'));
    }
  }, hidden);
}

async function clearVisibilityOverride(iframe) {
  await iframe.evaluate((element) => {
    for (const targetDocument of [document, element.contentDocument]) {
      delete targetDocument.hidden;
      delete targetDocument.visibilityState;
      targetDocument.dispatchEvent(new Event('visibilitychange'));
    }
  });
}

async function assertPageVisibilityLifecycle(iframe, label, hud = null) {
  const running = await waitForEmbeddedStats({ paused: false, minimumFrameCount: 1 });
  let hidden;
  let resumed;
  try {
    await setVisibilityOverride(iframe, true);
    await pollFrameVisibility(iframe, 'hidden', label);
    hidden = await pollEmbeddedStats({
      paused: true,
      minimumFrameCount: running.frameCount,
    }, `${label} hidden tab`);
    const hiddenHud = hud
      ? await pollHudText(hud, (text) => text === 'PAUSED', `${label} hidden`)
      : null;
    await page.waitForTimeout(750);
    const stillHidden = await readEmbeddedStats();
    if (stillHidden.frameCount !== hidden.frameCount) {
      throw new Error(
        `${label} rendered in a hidden tab: ${hidden.frameCount} -> ${stillHidden.frameCount}.`,
      );
    }
    if (hud && await readHudText(hud) !== 'PAUSED') {
      throw new Error(`${label} HUD changed while the document was hidden.`);
    }

    if (hud) await resetHudHistory(hud);
    await setVisibilityOverride(iframe, false);
    await pollFrameVisibility(iframe, 'visible', label);
    resumed = await pollEmbeddedStats({
      paused: false,
      minimumFrameCount: hidden.frameCount + 1,
    }, `${label} visible tab`);
    const resumedHud = hud
      ? await pollHudText(hud, (text) => /^\d+ FPS$/.test(text), `${label} visible`)
      : null;
    const resumeHudHistory = hud ? await readHudHistory(hud) : null;
    if (resumeHudHistory) assertHudResumeHistory(resumeHudHistory, `${label} visibility`);
    if (hud) {
      return {
        beforeHidden: running.frameCount,
        hiddenAt: hidden.frameCount,
        resumedAt: resumed.frameCount,
        hiddenHud,
        resumeHudHistory,
        resumedHud,
      };
    }
  } finally {
    await clearVisibilityOverride(iframe);
  }
  return {
    beforeHidden: running.frameCount,
    hiddenAt: hidden.frameCount,
    resumedAt: resumed.frameCount,
  };
}

const embeddedOrbFrame = await openEmbeddedRoom(
  'anime-liquid-orb',
  ['pause', 'stats', 'set-mode', 'set-quality'],
);
const embeddedOrb = embeddedOrbFrame.contentFrame();
await embeddedOrb.locator('#loading.is-hidden').waitFor({ state: 'attached' });
const orbFpsHud = embeddedOrb.locator('#fps');
await embeddedOrbFrame.evaluate((element) => {
  element.contentWindow.document.documentElement.dataset.bridgeQa = 'orb-preserved';
});
for (let mode = 0; mode < 4; mode += 1) {
  await postEmbeddedCommand(embeddedOrbFrame, 'set-orb-mode', { mode });
  await embeddedOrb.locator(`.mode-btn[data-mode="${mode}"].is-active`).waitFor();
}
for (const quality of ['high', 'medium', 'low']) {
  await postEmbeddedCommand(embeddedOrbFrame, 'set-orb-quality', { quality });
  await embeddedOrb
    .locator(`.quality[data-quality="${quality}"].is-active`)
    .waitFor({ state: 'attached' });
}
const orbWallClockTelemetry = await assertWallClockTelemetry(embeddedOrbFrame, 'Orb');
await embeddedOrb.locator('#audio-toggle').click({ force: true });
await embeddedOrb.locator('#audio-toggle[aria-pressed="true"]').waitFor();
const orbRunningHud = await pollHudText(
  orbFpsHud,
  (text) => /^\d+ FPS$/.test(text),
  'Orb running capture',
);
const orbRunningHudCapturePath = path.join(orbHudCaptureDir, 'running.png');
const orbPausedHudCapturePath = path.join(orbHudCaptureDir, 'paused.png');
await embeddedOrb.locator('body').screenshot({ path: orbRunningHudCapturePath });
const orbPauseLifecycle = await assertPauseLifecycle(embeddedOrbFrame, 'Orb', {
  hud: orbFpsHud,
  pausedCapturePath: orbPausedHudCapturePath,
});
const orbPauseRace = await assertPauseRace(embeddedOrbFrame, 'Orb');
const orbVisibilityLifecycle = await assertPageVisibilityLifecycle(
  embeddedOrbFrame,
  'Orb',
  orbFpsHud,
);
const orbFramePreserved = await embeddedOrb.locator('html').getAttribute('data-bridge-qa');
if (orbFramePreserved !== 'orb-preserved') {
  throw new Error('Orb bridge commands unexpectedly reloaded the iframe.');
}
const orbAudioActive = await embeddedOrb
  .locator('#audio-toggle')
  .getAttribute('aria-pressed');
if (orbAudioActive !== 'true') throw new Error('Orb lost its active audio intent.');

const embeddedTideFrame = await openEmbeddedRoom(
  'ninth-tide-archive',
  ['pause', 'stats', 'set-preview'],
);
const embeddedTide = embeddedTideFrame.contentFrame();
await embeddedTideFrame.evaluate((element) => {
  element.contentWindow.document.documentElement.dataset.bridgeQa = 'tide-preserved';
});
const tideMediaStartedWhilePaused = await assertTideMediaStartedWhilePaused(
  embeddedTideFrame,
);
const embeddedTideSections = [];
for (let section = 0; section < roman.length; section += 1) {
  await postEmbeddedCommand(embeddedTideFrame, 'set-tide-preview', {
    mode: 'main',
    section,
  });
  await embeddedTide
    .locator('#phaseNumber')
    .filter({ hasText: new RegExp(`^${roman[section]}$`) })
    .waitFor();
  embeddedTideSections.push(await embeddedTide.locator('#phaseNumber').textContent());
}
const tidePauseLifecycle = await assertPauseLifecycle(embeddedTideFrame, 'Ninth Tide');
const tidePauseRace = await assertPauseRace(embeddedTideFrame, 'Ninth Tide');
const tideVisibilityLifecycle = await assertPageVisibilityLifecycle(
  embeddedTideFrame,
  'Ninth Tide',
);
const tideFramePreserved = await embeddedTide.locator('html').getAttribute('data-bridge-qa');
if (tideFramePreserved !== 'tide-preserved') {
  throw new Error('Ninth Tide bridge commands unexpectedly reloaded the iframe.');
}

await page.goto(`${baseUrl}/exhibits/ninth-tide-archive/index.html?preview=main`, {
  waitUntil: 'domcontentloaded',
});
await page.locator('#phaseNumber').waitFor({ state: 'visible' });
await page.waitForFunction(
  () => document.querySelector('#phaseNumber')?.textContent === 'VIII',
);
const tideDefaultPhase = await page.locator('#phaseNumber').textContent();

for (let section = 0; section < roman.length; section += 1) {
  const url = `${baseUrl}/exhibits/ninth-tide-archive/index.html?preview=main&section=${section}`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator('#phaseNumber').waitFor({ state: 'visible' });
  await page.waitForFunction(
    (expected) => document.querySelector('#phaseNumber')?.textContent === expected,
    roman[section],
  );

  tideSections.push({
    section,
    phase: await page.locator('#phaseNumber').textContent(),
    canvasCount: await page.locator('canvas').count(),
  });
}

await page.goto(`${baseUrl}/exhibits/anime-liquid-orb/index.html`, {
  waitUntil: 'domcontentloaded',
});
await page.locator('#loading.is-hidden').waitFor({ state: 'attached' });

const orbModes = [];
for (let mode = 1; mode <= 4; mode += 1) {
  await page.keyboard.press(`Digit${mode}`);
  const activeButton = page.locator(`.mode-btn[data-mode="${mode - 1}"]`);
  await activeButton.waitFor({ state: 'visible' });
  await page.waitForFunction(
    (index) =>
      document
        .querySelector(`.mode-btn[data-mode="${index}"]`)
        ?.classList.contains('is-active') === true,
    mode - 1,
  );
  orbModes.push((await page.locator('#state-name').textContent())?.trim());
}

const canvas = page.locator('#scene');
const bounds = await canvas.boundingBox();
if (!bounds) throw new Error('Orb canvas has no layout box.');
const center = {
  x: bounds.x + bounds.width / 2,
  y: bounds.y + bounds.height / 2,
};

await page.evaluate(() => {
  const matterState = document.querySelector('#matter-state');
  const scene = document.querySelector('#scene');
  const textContent = Object.getOwnPropertyDescriptor(Node.prototype, 'textContent');
  if (!matterState || !scene || !textContent?.get || !textContent.set) {
    throw new Error('Orb gesture QA could not instrument the scene state.');
  }
  const transitions = [];
  const pointerEvents = [];
  const pointerCaptureCalls = [];
  scene.setPointerCapture = (pointerId) => pointerCaptureCalls.push({ type: 'set', pointerId });
  scene.releasePointerCapture = (pointerId) => pointerCaptureCalls.push({ type: 'release', pointerId });
  Object.defineProperty(matterState, 'textContent', {
    configurable: true,
    get() {
      return textContent.get.call(this);
    },
    set(value) {
      transitions.push(String(value));
      textContent.set.call(this, value);
    },
  });
  for (const type of ['pointerdown', 'pointerup', 'pointercancel', 'dblclick']) {
    scene.addEventListener(type, (event) => {
      pointerEvents.push({
        type,
        pointerType: 'pointerType' in event ? event.pointerType : null,
        pointerId: 'pointerId' in event ? event.pointerId : null,
        isTrusted: event.isTrusted,
      });
    });
  }
  window.__orbGestureQa = { transitions, pointerEvents, pointerCaptureCalls };
});

let syntheticPointerId = 10;

async function readOrbGestureQa() {
  return page.evaluate(() => ({
    matterState: document.querySelector('#matter-state')?.textContent,
    transitions: [...window.__orbGestureQa.transitions],
    pointerEvents: [...window.__orbGestureQa.pointerEvents],
    pointerCaptureCalls: [...window.__orbGestureQa.pointerCaptureCalls],
  }));
}

async function dispatchSyntheticPointerEvents(events, synthesizeDoubleClick = false) {
  await page.evaluate(({ queuedEvents, includeDoubleClick }) => {
    const scene = document.querySelector('#scene');
    if (!scene) throw new Error('Orb scene is unavailable for synthetic pointer input.');
    for (const queuedEvent of queuedEvents) {
      scene.dispatchEvent(new PointerEvent(queuedEvent.type, {
        bubbles: true,
        cancelable: queuedEvent.type !== 'pointercancel',
        pointerId: queuedEvent.pointerId,
        pointerType: queuedEvent.pointerType,
        isPrimary: true,
        clientX: queuedEvent.x,
        clientY: queuedEvent.y,
        button: queuedEvent.type === 'pointerdown' ? 0 : -1,
        buttons: queuedEvent.type === 'pointerdown' || queuedEvent.type === 'pointermove' ? 1 : 0,
        pressure: queuedEvent.type === 'pointerup' || queuedEvent.type === 'pointercancel' ? 0 : 0.5,
      }));
    }
    if (includeDoubleClick) {
      const finalEvent = queuedEvents.at(-1);
      scene.dispatchEvent(new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: true,
        clientX: finalEvent.x,
        clientY: finalEvent.y,
      }));
    }
  }, { queuedEvents: events, includeDoubleClick: synthesizeDoubleClick });
}

function syntheticTap(pointerType, point) {
  const pointerId = syntheticPointerId;
  syntheticPointerId += 1;
  return [
    { type: 'pointerdown', pointerType, pointerId, x: point.x, y: point.y },
    { type: 'pointerup', pointerType, pointerId, x: point.x, y: point.y },
  ];
}

async function dispatchDoubleTap(pointerType, point) {
  await dispatchSyntheticPointerEvents(
    [...syntheticTap(pointerType, point), ...syntheticTap(pointerType, point)],
    pointerType === 'mouse',
  );
}

async function assertMatterTransitions(label, transitionStart, expectedTransitions, expectedState) {
  await page.waitForFunction(
    (state) => document.querySelector('#matter-state')?.textContent === state,
    expectedState,
  );
  const snapshot = await readOrbGestureQa();
  const actualTransitions = snapshot.transitions.slice(transitionStart);
  if (JSON.stringify(actualTransitions) !== JSON.stringify(expectedTransitions)) {
    throw new Error(
      `${label} produced ${JSON.stringify(actualTransitions)} instead of ${JSON.stringify(expectedTransitions)}.`,
    );
  }
  return snapshot;
}

const orbFreezeModes = [];
const freezeScenarios = [
  { mode: 1, pointerType: 'mouse', point: { x: center.x - 42, y: center.y - 24 } },
  { mode: 2, pointerType: 'touch', point: { x: center.x + 44, y: center.y - 18 } },
  { mode: 3, pointerType: 'pen', point: { x: center.x - 36, y: center.y + 34 } },
  { mode: 4, pointerType: 'mouse', point: { x: center.x + 34, y: center.y + 38 } },
];

for (const scenario of freezeScenarios) {
  await page.keyboard.press(`Digit${scenario.mode}`);
  await page.waitForFunction(
    (index) => document.querySelector(`.mode-btn[data-mode="${index}"]`)?.classList.contains('is-active'),
    scenario.mode - 1,
  );
  const before = await readOrbGestureQa();
  await dispatchDoubleTap(scenario.pointerType, scenario.point);
  const frozenSnapshot = await assertMatterTransitions(
    `Orb mode ${scenario.mode} ${scenario.pointerType} freeze`,
    before.transitions.length,
    ['CRYSTAL'],
    'CRYSTAL',
  );
  await page.waitForTimeout(320);
  const capturePath = path.join(orbFreezeCaptureDir, `mode-${scenario.mode}-${scenario.pointerType}.png`);
  await canvas.screenshot({ path: capturePath });
  await dispatchDoubleTap(scenario.pointerType, scenario.point);
  const liquidSnapshot = await assertMatterTransitions(
    `Orb mode ${scenario.mode} ${scenario.pointerType} melt`,
    frozenSnapshot.transitions.length,
    ['LIQUID'],
    'LIQUID',
  );
  const pointerUps = liquidSnapshot.pointerEvents
    .slice(before.pointerEvents.length)
    .filter((event) => event.type === 'pointerup');
  if (
    pointerUps.length !== 4
    || pointerUps.some((event) => event.pointerType !== scenario.pointerType || event.isTrusted)
  ) {
    throw new Error(
      `Orb mode ${scenario.mode} ${scenario.pointerType} emitted unexpected pointerup events: ${JSON.stringify(pointerUps)}.`,
    );
  }
  orbFreezeModes.push({
    mode: scenario.mode,
    pointerType: scenario.pointerType,
    tapPosition: scenario.point,
    transitions: liquidSnapshot.transitions.slice(before.transitions.length),
    syntheticPointerUps: pointerUps.every((event) => !event.isTrusted),
    capturePath,
  });
}

const orbInvalidGestures = [];

async function assertNoFreezeTransition(label, action) {
  const before = await readOrbGestureQa();
  await action();
  await page.waitForTimeout(20);
  const after = await readOrbGestureQa();
  const transitions = after.transitions.slice(before.transitions.length);
  if (after.matterState !== 'LIQUID' || transitions.length !== 0) {
    throw new Error(`${label} changed Orb matter state: ${JSON.stringify({ after, transitions })}.`);
  }
  orbInvalidGestures.push(label);
}

await assertNoFreezeTransition('single tap and expired pair', async () => {
  await dispatchSyntheticPointerEvents(syntheticTap('mouse', center));
  await page.waitForTimeout(320);
  await dispatchSyntheticPointerEvents(syntheticTap('mouse', center));
});
await assertNoFreezeTransition('sculpt drag release', async () => {
  const pointerId = syntheticPointerId;
  syntheticPointerId += 1;
  await dispatchSyntheticPointerEvents([
    { type: 'pointerdown', pointerType: 'mouse', pointerId, x: center.x, y: center.y },
    { type: 'pointermove', pointerType: 'mouse', pointerId, x: center.x + 32, y: center.y },
    { type: 'pointerup', pointerType: 'mouse', pointerId, x: center.x + 32, y: center.y },
  ]);
});
await assertNoFreezeTransition('pointercancel then third tap', async () => {
  await dispatchSyntheticPointerEvents(syntheticTap('touch', center));
  const cancelledId = syntheticPointerId;
  syntheticPointerId += 1;
  await dispatchSyntheticPointerEvents([
    { type: 'pointerdown', pointerType: 'touch', pointerId: cancelledId, x: center.x, y: center.y },
    { type: 'pointercancel', pointerType: 'touch', pointerId: cancelledId, x: center.x, y: center.y },
  ]);
  await dispatchSyntheticPointerEvents(syntheticTap('touch', center));
});
await page.waitForTimeout(320);
await assertNoFreezeTransition('double tap beyond distance threshold', async () => {
  await dispatchSyntheticPointerEvents([
    ...syntheticTap('mouse', { x: center.x - 36, y: center.y }),
    ...syntheticTap('mouse', { x: center.x + 36, y: center.y }),
  ]);
});
await assertNoFreezeTransition('different pointer types', async () => {
  await dispatchSyntheticPointerEvents([
    ...syntheticTap('mouse', center),
    ...syntheticTap('pen', center),
  ]);
});

const finalOrbGestureQa = await readOrbGestureQa();
const syntheticDoubleClickCount = finalOrbGestureQa.pointerEvents
  .filter((event) => event.type === 'dblclick').length;
if (finalOrbGestureQa.transitions.length !== freezeScenarios.length * 2) {
  throw new Error(`Orb freeze toggle count was ${finalOrbGestureQa.transitions.length}, expected ${freezeScenarios.length * 2}.`);
}
if (syntheticDoubleClickCount !== 4) {
  throw new Error(`Orb QA expected 4 synthetic dblclick events, observed ${syntheticDoubleClickCount}.`);
}

await browser.close();

if (tideSections.some(({ canvasCount }) => canvasCount !== 1)) {
  throw new Error(`Unexpected Tide canvas counts: ${JSON.stringify(tideSections)}`);
}
if (consoleErrors.length > 0) {
  throw new Error(`Exhibit console errors:\n${consoleErrors.join('\n')}`);
}

console.log(
  JSON.stringify(
    {
      baseUrl,
      tideDefaultPhase,
      tideSections,
      embeddedTideSections,
      orbModes,
      orbWallClockTelemetry,
      orbHudFpsLifecycle: {
        runningHud: orbRunningHud,
        runningCapturePath: orbRunningHudCapturePath,
        pausedCapturePath: orbPausedHudCapturePath,
        hostPause: orbPauseLifecycle,
        visibility: orbVisibilityLifecycle,
      },
      orbAudioActive,
      tideMediaStartedWhilePaused,
      orbPauseLifecycle,
      tidePauseLifecycle,
      orbPauseRace,
      tidePauseRace,
      orbVisibilityLifecycle,
      tideVisibilityLifecycle,
      orbFreezeModes,
      orbInvalidGestures,
      orbToggleCount: finalOrbGestureQa.transitions.length,
      syntheticDoubleClickCount,
      consoleErrors: consoleErrors.length,
    },
    null,
    2,
  ),
);
