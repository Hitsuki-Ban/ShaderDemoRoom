import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { chromium } from 'playwright';
import {
  analyzePngInBrowser,
  assertBundledPlaywrightVersion,
  assertCapturePolicy,
  installNinthTideRafAudit,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
  NINTH_TIDE_OUTPUT_DIR,
  parseNinthTideConfig,
  readHitFixture,
  sha256Hex,
  validateStepResult,
} from './ninth-tide-core.mjs';
import {
  NINTH_TIDE_CAPTURE_POLICY,
  NINTH_TIDE_REPEAT_COUNT,
  NINTH_TIDE_WARM_DOMINANCE,
} from './ninth-tide-policy.mjs';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;
const manifest = {
  schemaVersion: 1,
  gate: 'qa:ninth-tide',
  status: 'running',
  environment: {
    playwrightVersion,
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    browserLaunchOptions: NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
    contextOptions: NINTH_TIDE_CONTEXT_OPTIONS,
  },
  policy: NINTH_TIDE_CAPTURE_POLICY,
  runs: [],
};

await mkdir(NINTH_TIDE_OUTPUT_DIR, { recursive: true });

function reportMarkdown(record) {
  const lines = [
    '# Ninth Tide deterministic capture QA',
    '',
    `- Status: ${record.status}`,
    `- Playwright: ${record.environment.playwrightVersion}`,
    `- Runs completed: ${record.runs.length}/${NINTH_TIDE_REPEAT_COUNT}`,
  ];
  if (record.buildUrl) lines.push(`- Build URL: ${record.buildUrl}`);
  if (record.build) {
    lines.push(`- Build HTML SHA-256: ${record.build.htmlSha256}`);
    lines.push(`- App bundle SHA-256: ${record.build.appSha256}`);
  }
  if (record.error) lines.push(`- Error: ${record.error.message}`);
  lines.push('', '## States', '');
  for (const run of record.runs) {
    for (const state of run.states) {
      const first = state.repeats[0];
      lines.push(
        `- Run ${run.run} / ${state.id}: ${first?.captureHash ?? 'not captured'} `
        + `(framebuffer ${first?.framebufferHash ?? 'not captured'})`,
      );
    }
  }
  return `${lines.join('\n')}\n`;
}

async function writeReports() {
  await Promise.all([
    writeFile(
      join(NINTH_TIDE_OUTPUT_DIR, 'manifest.json'),
      `${JSON.stringify(manifest, null, 2)}\n`,
    ),
    writeFile(join(NINTH_TIDE_OUTPUT_DIR, 'report.md'), reportMarkdown(manifest)),
  ]);
}

function stateUrl(buildUrl, policy) {
  const url = new URL(buildUrl);
  url.searchParams.set('preview', policy.mode);
  url.searchParams.set('section', String(policy.section));
  return url.href;
}

function auditSnapshotInBrowser() {
  const audit = window.__NINTH_TIDE_QA_RAF_AUDIT__;
  if (!audit) throw new Error('Ninth Tide independent rAF audit is unavailable.');
  return {
    callbackCount: audit.callbackCount(),
    pendingCount: audit.pendingCount(),
    renderActivityCount: audit.renderActivityCount(),
  };
}

async function callStep(page, policy) {
  return page.evaluate(async (request) => {
    if (typeof window.__NINTH_TIDE_STEP__ !== 'function') {
      throw new Error('Required __NINTH_TIDE_STEP__ hook is unavailable.');
    }
    return window.__NINTH_TIDE_STEP__(request);
  }, {
    mode: policy.mode,
    section: policy.section,
    timestampMs: policy.timestampMs,
  });
}

async function captureCanvasPng(canvas) {
  const base64 = await canvas.evaluate(async (element) => {
    if (!(element instanceof HTMLCanvasElement)) {
      throw new TypeError('Ninth Tide capture target must be a canvas element.');
    }
    const blob = await new Promise((resolve, reject) => {
      element.toBlob((value) => {
        if (value) resolve(value); else reject(new Error('Ninth Tide canvas PNG encoding failed.'));
      }, 'image/png');
    });
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = '';
    const chunkSize = 0x8000;
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
    }
    return btoa(binary);
  });
  return Buffer.from(base64, 'base64');
}

async function verifyHits(page, fixtureSection) {
  const results = [];
  for (const point of fixtureSection.points) {
    const actual = await page.evaluate(async ({ clientX, clientY }) => {
      if (typeof window.__NINTH_TIDE_HIT_TEST__ !== 'function') {
        throw new Error('Required __NINTH_TIDE_HIT_TEST__ hook is unavailable.');
      }
      return window.__NINTH_TIDE_HIT_TEST__({ clientX, clientY });
    }, point);
    if (typeof actual !== 'boolean') {
      throw new TypeError(`Ninth Tide hit hook must return boolean for ${point.id}.`);
    }
    if (actual !== point.beforeHit) {
      throw new Error(
        `Ninth Tide section ${fixtureSection.section} hit ${point.id} was ${actual}; expected ${point.beforeHit}.`,
      );
    }
    results.push({ id: point.id, beforeHit: point.beforeHit, actual });
  }
  return results;
}

async function captureState(context, config, fixture, policy, runIndex, stateRecord) {
  const page = await context.newPage();
  const archiveAudioRequests = [];
  page.on('request', (request) => {
    if (new URL(request.url()).pathname.endsWith('/archive.mp3')) {
      archiveAudioRequests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType(),
      });
    }
  });
  page.on('console', (message) => {
    if (message.type() === 'error') stateRecord.consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => stateRecord.consoleErrors.push(error.message));

  try {
    const response = await page.goto(stateUrl(config.buildUrl, policy), {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });
    if (!response || !response.ok()) {
      throw new Error(`${policy.id} build navigation failed with HTTP ${response?.status() ?? 'none'}.`);
    }
    await page.waitForFunction(
      () => typeof window.__NINTH_TIDE_STEP__ === 'function'
        && typeof window.__NINTH_TIDE_HIT_TEST__ === 'function',
      undefined,
      { timeout: 30_000 },
    );
    const canvas = page.locator('#scene canvas').first();
    await canvas.waitFor({ state: 'visible', timeout: 30_000 });
    const canvasBox = await canvas.boundingBox();
    if (!canvasBox || !isDeepStrictEqual(canvasBox, fixture.canvasBox)) {
      throw new Error(
        `${policy.id} canvas box ${JSON.stringify(canvasBox)} does not match committed fixture ${JSON.stringify(fixture.canvasBox)}.`,
      );
    }

    let samePageSignature;
    for (let repeat = 1; repeat <= NINTH_TIDE_REPEAT_COUNT; repeat += 1) {
      const hookResult = validateStepResult(await callStep(page, policy), policy);
      const auditImmediate = await page.evaluate(auditSnapshotInBrowser);
      if (auditImmediate.pendingCount !== 0) {
        throw new Error(`${policy.id} left ${auditImmediate.pendingCount} independently observed rAF handles.`);
      }
      const auditAfterTurn = await page.evaluate(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        const audit = window.__NINTH_TIDE_QA_RAF_AUDIT__;
        if (!audit) throw new Error('Ninth Tide independent rAF audit is unavailable.');
        return {
          callbackCount: audit.callbackCount(),
          pendingCount: audit.pendingCount(),
          renderActivityCount: audit.renderActivityCount(),
        };
      });
      if (auditAfterTurn.pendingCount !== 0) {
        throw new Error(`${policy.id} queued rAF after an event-loop turn.`);
      }
      if (auditAfterTurn.callbackCount !== auditImmediate.callbackCount) {
        throw new Error(`${policy.id} animation frame counter advanced after the hook resolved.`);
      }
      if (auditAfterTurn.renderActivityCount !== auditImmediate.renderActivityCount) {
        throw new Error(`${policy.id} WebGL render activity advanced after the hook resolved.`);
      }

      const phase = (await page.locator('#phaseNumber').textContent())?.trim();
      if (phase !== policy.expectedPhase) {
        throw new Error(`${policy.id} DOM phase was ${String(phase)}; expected ${policy.expectedPhase}.`);
      }
      const screenshot = await captureCanvasPng(canvas);
      const decoded = await page.evaluate(analyzePngInBrowser, {
        base64: screenshot.toString('base64'),
        roi: policy.roi,
        warmDominance: NINTH_TIDE_WARM_DOMINANCE,
      });
      if (decoded.width !== fixture.canvasBox.width || decoded.height !== fixture.canvasBox.height) {
        throw new Error(`${policy.id} decoded PNG dimensions do not match the committed canvas box.`);
      }
      if (decoded.captureHash !== hookResult.framebuffer.hash) {
        throw new Error(
          `${policy.id} encoded canvas pixels diverged from the direct framebuffer readback.`,
        );
      }
      const hits = policy.mode === 'main'
        ? await verifyHits(page, fixture.sections[policy.section])
        : [];
      const repeatRecord = {
        repeat,
        captureHash: decoded.captureHash,
        framebufferHash: hookResult.framebuffer.hash,
        pngSha256: sha256Hex(screenshot),
        metrics: decoded.metrics,
        hook: hookResult,
        rafAudit: { immediate: auditImmediate, afterTurn: auditAfterTurn },
        hits,
      };
      stateRecord.repeats.push(repeatRecord);
      assertCapturePolicy(decoded.metrics, policy);

      const signature = {
        captureHash: repeatRecord.captureHash,
        framebufferHash: repeatRecord.framebufferHash,
        metrics: repeatRecord.metrics,
        hook: repeatRecord.hook,
        hits: repeatRecord.hits,
      };
      if (samePageSignature && !isDeepStrictEqual(signature, samePageSignature)) {
        throw new Error(`${policy.id} repeated same-page hash/metrics/hook results changed.`);
      }
      samePageSignature = signature;

      if (runIndex === 1 && repeat === 1) {
        await writeFile(join(config.outputDir, policy.fileName), screenshot);
      }
    }
    if (stateRecord.consoleErrors.length !== 0) {
      throw new Error(
        `${policy.id} emitted console errors: ${stateRecord.consoleErrors.join(' | ')}`,
      );
    }
    stateRecord.archiveAudioRequests = archiveAudioRequests;
    if (archiveAudioRequests.length !== 0) {
      throw new Error(
        `${policy.id} preview requested archive.mp3: ${JSON.stringify(archiveAudioRequests)}.`,
      );
    }
    return stateRecord;
  } finally {
    await page.close();
  }
}

async function runGate() {
  assertBundledPlaywrightVersion(playwrightVersion);
  const config = parseNinthTideConfig(process.env);
  manifest.buildUrl = config.buildUrl;
  manifest.fixturePath = config.fixturePath;

  const buildResponse = await fetch(config.buildUrl, { signal: AbortSignal.timeout(30_000) });
  if (!buildResponse.ok) {
    throw new Error(`Ninth Tide build URL is not accessible: HTTP ${buildResponse.status}.`);
  }
  const buildHtml = Buffer.from(await buildResponse.arrayBuffer());
  const appUrl = new URL('./app.js', config.buildUrl).href;
  const appResponse = await fetch(appUrl, { signal: AbortSignal.timeout(30_000) });
  if (!appResponse.ok) {
    throw new Error(`Ninth Tide app bundle is not accessible: HTTP ${appResponse.status}.`);
  }
  const appBundle = Buffer.from(await appResponse.arrayBuffer());
  manifest.build = {
    htmlSha256: sha256Hex(buildHtml),
    appUrl,
    appSha256: sha256Hex(appBundle),
  };
  const fixture = await readHitFixture(config.fixturePath);
  const freshRunBaselines = new Map();

  for (let runIndex = 1; runIndex <= NINTH_TIDE_REPEAT_COUNT; runIndex += 1) {
    const browser = await chromium.launch(NINTH_TIDE_BROWSER_LAUNCH_OPTIONS);
    const runRecord = { run: runIndex, browserVersion: browser.version(), states: [] };
    manifest.runs.push(runRecord);
    try {
      const context = await browser.newContext(NINTH_TIDE_CONTEXT_OPTIONS);
      await context.addInitScript(installNinthTideRafAudit);
      try {
        for (const policy of NINTH_TIDE_CAPTURE_POLICY) {
          const stateRecord = { id: policy.id, repeats: [], consoleErrors: [] };
          runRecord.states.push(stateRecord);
          await captureState(context, config, fixture, policy, runIndex, stateRecord);
          const signature = {
            captureHash: stateRecord.repeats[0].captureHash,
            framebufferHash: stateRecord.repeats[0].framebufferHash,
            metrics: stateRecord.repeats[0].metrics,
            hook: stateRecord.repeats[0].hook,
            hits: stateRecord.repeats[0].hits,
          };
          const baseline = freshRunBaselines.get(policy.id);
          if (baseline && !isDeepStrictEqual(signature, baseline)) {
            throw new Error(`${policy.id} fresh-run hash/metrics/hook results changed.`);
          }
          freshRunBaselines.set(policy.id, signature);
        }
      } finally {
        await context.close();
      }
    } finally {
      await browser.close();
    }
  }

  manifest.status = 'passed';
  await writeReports();
}

try {
  await runGate();
  console.log(`Ninth Tide deterministic QA passed: ${NINTH_TIDE_OUTPUT_DIR}`);
} catch (error) {
  manifest.status = 'failed';
  manifest.error = {
    name: error instanceof Error ? error.name : 'Error',
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  };
  await writeReports();
  throw error;
}
