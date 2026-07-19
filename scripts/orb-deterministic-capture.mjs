import { mkdir, writeFile } from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';
import { chromium } from 'playwright';
import {
  installNinthTideRafAudit,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
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
  schemaVersion: 1,
  gate: 'qa:orb',
  status: 'running',
  input: { mode: 2, freezeProgress: 0.625, timestamp: 4321 },
  entries: [],
};

await mkdir(outputDir, { recursive: true });

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
  const type = await frame.evaluate(() => typeof window.__MIZU_KOKORO_STEP__);
  if (type !== 'undefined') throw new Error(`${label} unexpectedly exposed the Orb QA hook.`);
}

async function callHook(frame, input) {
  return frame.evaluate(async (request) => {
    if (typeof window.__MIZU_KOKORO_STEP__ !== 'function') {
      throw new Error('Required __MIZU_KOKORO_STEP__ hook is unavailable.');
    }
    return window.__MIZU_KOKORO_STEP__(request);
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
  manifest.entries.push(await verifyEntry(standalonePage.mainFrame(), 'standalone'));
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
  manifest.entries.push(await verifyEntry(showroomFrame, 'showroom'));
  await showroomPage.close();

  manifest.status = 'passed';
  await writeFile(`${outputDir}/manifest.json`, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({
    status: manifest.status,
    hashes: manifest.entries.map((entry) => ({
      label: entry.label,
      hash: entry.repeats[0].hook.framebuffer.hash,
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
