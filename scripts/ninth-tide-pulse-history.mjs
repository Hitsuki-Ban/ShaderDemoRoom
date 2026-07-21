import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import {
  assertBundledPlaywrightVersion,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
  parseNinthTideConfig,
} from './ninth-tide-core.mjs';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;
assertBundledPlaywrightVersion(playwrightVersion);
const config = parseNinthTideConfig(process.env);
const outputDir = 'output/playwright/ninth-tide-pulses';
const DESKTOP_ZERO_PULSE_GOLDEN = '37ed1ba00f2b4c8c9315774f79b2a8da2b7309ea3dcbf29adcde53bffb98bb4d';
await mkdir(outputDir, { recursive: true });

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function scenarioUrl() {
  const url = new URL(config.buildUrl);
  url.searchParams.set('preview', 'main');
  url.searchParams.set('section', '0');
  return url.href;
}

async function openScenarioPage(context) {
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  const response = await page.goto(scenarioUrl(), { waitUntil: 'domcontentloaded', timeout: 30_000 });
  assert(response?.ok(), `Ninth Tide pulse history navigation failed with HTTP ${response?.status() ?? 'none'}.`);
  await page.waitForFunction(
    () => typeof window.__NINTH_TIDE_PULSE_SCENARIO__ === 'function',
    undefined,
    { timeout: 30_000 },
  );
  return { page, consoleErrors };
}

async function callScenario(page, request) {
  return page.evaluate((payload) => window.__NINTH_TIDE_PULSE_SCENARIO__(payload), request);
}

function assertBudget(result, expected) {
  const budget = result.uniformBudget;
  assert(budget.tier === expected.tier, `Expected ${expected.tier} pulse tier; received ${budget.tier}.`);
  assert(budget.systemSlots === expected.systemSlots, `Expected ${expected.systemSlots} system slots.`);
  assert(budget.userSlots === expected.userSlots, `Expected ${expected.userSlots} user slots.`);
  assert(budget.totalSlots === expected.systemSlots + expected.userSlots, 'Pulse slot total is inconsistent.');
  assert(budget.addedVectorsPerStage === budget.totalSlots * 2, 'Pulse uniform vector accounting is inconsistent.');
  assert(budget.remainingMinimumFragmentVectors >= 0, 'Pulse uniforms exceed the WebGL2 minimum fragment budget.');
  assert(budget.remainingMinimumVertexVectors >= 0, 'Pulse uniforms exceed the WebGL2 minimum vertex budget.');
  assert(budget.actualFragmentVectors >= budget.minimumFragmentVectors, 'Runtime fragment uniform limit is below WebGL2 minimum.');
  assert(budget.actualVertexVectors >= budget.minimumVertexVectors, 'Runtime vertex uniform limit is below WebGL2 minimum.');
}

async function runDesktop(browser) {
  const context = await browser.newContext(NINTH_TIDE_CONTEXT_OPTIONS);
  const { page, consoleErrors } = await openScenarioPage(context);
  try {
    const zeroRequest = { scenario: 'zero-pulse', section: 0, timestampMs: 0 };
    const zero = await callScenario(page, zeroRequest);
    const zeroRepeat = await callScenario(page, zeroRequest);
    assert(zero.framebuffer.hash === DESKTOP_ZERO_PULSE_GOLDEN,
      `Zero-pulse framebuffer changed from its fixed SwiftShader golden: ${zero.framebuffer.hash}.`);
    assert(zero.framebuffer.hash === zeroRepeat.framebuffer.hash, 'Zero-pulse framebuffer is not deterministic.');
    assert(zero.livePulses.length === 0, 'Zero-pulse scenario retained pulse history.');
    assert(Object.values(zero.artifacts).every((visible) => visible === false), 'Zero-pulse scenario exposed a sonar artifact.');
    assertBudget(zero, { tier: 'desktop', systemSlots: 5, userSlots: 3 });
    await page.locator('#scene canvas').screenshot({ path: join(outputDir, 'desktop-zero-pulse.png') });

    const userThenAuto = await callScenario(page, {
      scenario: 'user-then-auto', section: 0, timestampMs: 4500,
    });
    await page.locator('#scene canvas').screenshot({ path: join(outputDir, 'desktop-user-then-auto.png') });
    const userEpsilonThenAuto = await callScenario(page, {
      scenario: 'user-epsilon-then-auto', section: 0, timestampMs: 4500,
    });
    const userPulse = userThenAuto.livePulses.find((pulse) => pulse.source === 'user');
    const autoPulse = userThenAuto.livePulses.find((pulse) => pulse.source === 'auto');
    assert(userThenAuto.livePulses.length === 2, 'User/auto scenario must retain exactly two live pulses.');
    assert(userPulse?.age > 4.49 && userPulse.age < userPulse.lifetime, 'User pulse did not survive to its late-life capture.');
    assert(autoPulse?.age > 3.49 && autoPulse.startTime === 1, 'Auto pulse was not inserted one second after the user pulse.');
    assert(userPulse.originX !== autoPulse.originX || userPulse.originZ !== autoPulse.originZ, 'User and auto origins must remain distinct.');
    const epsilonUserPulse = userEpsilonThenAuto.livePulses.find((pulse) => pulse.source === 'user');
    assert(userEpsilonThenAuto.livePulses.length === 2 && epsilonUserPulse?.strength === 0.000001,
      'User epsilon control must preserve the same two-slot live-count and schedule.');
    assert(userThenAuto.framebuffer.hash !== userEpsilonThenAuto.framebuffer.hash,
      'Strong user slot produced no framebuffer delta against the same-slot epsilon control.');

    const ending = await callScenario(page, {
      scenario: 'ending-convergence', section: 8, timestampMs: 0,
    });
    await page.locator('#scene canvas').screenshot({ path: join(outputDir, 'desktop-ending-convergence.png') });
    const endingEmpty = await callScenario(page, {
      scenario: 'ending-convergence-empty', section: 8, timestampMs: 0,
    });
    assert(ending.livePulses.length > 0, 'Ending scenario must retain ordinary pulses to exercise shutdown isolation.');
    assert(ending.artifacts.convergence === true, 'Ending scenario did not show the dedicated convergence artifact.');
    assert(Object.entries(ending.artifacts).every(([name, visible]) => name === 'convergence' || visible === false),
      'Ending scenario leaked an ordinary sonar artifact.');
    assert(endingEmpty.livePulses.length === 0, 'Ending control retained ordinary pulse history.');
    assert(ending.framebuffer.hash === endingEmpty.framebuffer.hash,
      'Ordinary pulse history changed the shutdown framebuffer beside the dedicated convergence effect.');
    assert(consoleErrors.length === 0, `Desktop pulse scenarios emitted console errors: ${consoleErrors.join(' | ')}`);
    return { zero, zeroRepeat, userThenAuto, userEpsilonThenAuto, ending, endingEmpty };
  } finally {
    await context.close();
  }
}

async function runMobile(browser) {
  const context = await browser.newContext({
    ...NINTH_TIDE_CONTEXT_OPTIONS,
    viewport: { width: 390, height: 844 },
    screen: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const { page, consoleErrors } = await openScenarioPage(context);
  try {
    const zero = await callScenario(page, { scenario: 'zero-pulse', section: 0, timestampMs: 0 });
    assert(zero.livePulses.length === 0, 'Mobile zero-pulse scenario retained pulse history.');
    assertBudget(zero, { tier: 'mobile', systemSlots: 2, userSlots: 2 });
    assert(consoleErrors.length === 0, `Mobile pulse scenario emitted console errors: ${consoleErrors.join(' | ')}`);
    return { zero };
  } finally {
    await context.close();
  }
}

const manifest = {
  schemaVersion: 1,
  gate: 'qa:ninth-tide-pulses',
  status: 'running',
  buildUrl: config.buildUrl,
  environment: {
    playwrightVersion,
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    browserLaunchOptions: NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  },
};

const browser = await chromium.launch(NINTH_TIDE_BROWSER_LAUNCH_OPTIONS);
try {
  manifest.desktop = await runDesktop(browser);
  manifest.mobile = await runMobile(browser);
  manifest.status = 'passed';
} catch (error) {
  manifest.status = 'failed';
  manifest.error = { name: error.name, message: error.message, stack: error.stack };
  throw error;
} finally {
  await browser.close();
  await writeFile(join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log(`Ninth Tide pulse history QA passed: ${outputDir}`);
