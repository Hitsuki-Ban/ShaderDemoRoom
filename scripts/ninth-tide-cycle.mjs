import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { join } from 'node:path';

import { chromium } from 'playwright';

import {
  assertBundledPlaywrightVersion,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
  NINTH_TIDE_OUTPUT_DIR,
  parseNinthTideConfig,
} from './ninth-tide-core.mjs';

const require = createRequire(import.meta.url);
const playwrightVersion = require('playwright/package.json').version;

const IDLE_BEFORE_ENTRY_MS = 5_000;
const SILENT_CYCLE_MS = 118_000;
const CHAPTER_NINE_JUMP_MS = 110_000;
const CHAPTER_TRANSITION_STEPS = 28;
const CHAPTER_TRANSITION_STEP_MS = 50;
const JUMP_CONVERGENCE_STEPS = CHAPTER_TRANSITION_STEPS + 1;
const EPILOGUE_DWELL_MS = 700;
const SCORE_DURATION_SECONDS = 354.504;
const EXPECTED_CYCLE_EVENT_IDS = Object.freeze([
  'enter',
  'chapter-I',
  'chapter-IX',
  'shutdown-start',
  'outer-silence',
  'echo-reverses',
  'last-light',
  'finish',
  'epilogue',
]);
const EXPECTED_REPLAY_EVENT_IDS = Object.freeze([
  ...EXPECTED_CYCLE_EVENT_IDS,
  'replay',
  'chapter-I',
]);
const CYCLE_SNAPSHOT_KEYS = Object.freeze([
  'chapter',
  'clockPending',
  'ending',
  'endingCue',
  'epilogueVisible',
  'events',
  'finishCount',
  'finished',
  'round',
  'shutdown',
  'source',
  'visualScoreTime',
]);
const CYCLE_EVENT_KEYS = Object.freeze(['id', 'logicalTime', 'sequence', 'source']);

const manifest = {
  schemaVersion: 1,
  gate: 'qa:ninth-tide-cycle',
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
    idleBeforeEntryMs: IDLE_BEFORE_ENTRY_MS,
    silentCycleMs: SILENT_CYCLE_MS,
    epilogueDwellMs: EPILOGUE_DWELL_MS,
    expectedCycleEventIds: EXPECTED_CYCLE_EVENT_IDS,
  },
  silent: [],
  silentJump: null,
  audio: null,
};

function assertExactKeys(value, expectedKeys, label) {
  assert(value && typeof value === 'object' && !Array.isArray(value), `${label} must be an object.`);
  const actual = Object.keys(value).sort();
  const expected = [...expectedKeys].sort();
  assert.deepEqual(actual, expected, `${label} keys changed.`);
}

function eventIds(snapshot) {
  return snapshot.events.map(({ id }) => id);
}

function logicalStateSequence(checkpoints) {
  return Object.entries(checkpoints).map(([checkpoint, snapshot]) => ({
    checkpoint,
    source: snapshot.source,
    round: snapshot.round,
    chapter: snapshot.chapter,
    shutdown: snapshot.shutdown,
    ending: snapshot.ending,
    finished: snapshot.finished,
    epilogueVisible: snapshot.epilogueVisible,
    endingCue: snapshot.endingCue,
    finishCount: snapshot.finishCount,
    clockPending: snapshot.clockPending,
    eventIds: eventIds(snapshot),
  }));
}

function assertEventSequence(snapshot, expected, label) {
  assert.deepEqual(eventIds(snapshot), expected, `${label} logical event sequence changed.`);
  snapshot.events.forEach((event, index) => {
    assertExactKeys(event, CYCLE_EVENT_KEYS, `${label} event ${index + 1}`);
    assert.equal(event.sequence, index + 1, `${label} event sequence number changed.`);
    assert.equal(typeof event.id, 'string', `${label} event id must be a string.`);
    assert(Number.isFinite(event.logicalTime), `${label} event logical time must be finite.`);
    assert(event.logicalTime >= 0 && event.logicalTime <= SCORE_DURATION_SECONDS,
      `${label} event logical time left the visual score.`);
  });
}

function assertCycleSnapshot(snapshot, label) {
  assertExactKeys(snapshot, CYCLE_SNAPSHOT_KEYS, label);
  assert(['', 'audio', 'silent'].includes(snapshot.source), `${label} exposed an unknown source.`);
  assert(Number.isInteger(snapshot.round) && snapshot.round >= 0, `${label} round must be non-negative.`);
  assert(Number.isInteger(snapshot.chapter) && snapshot.chapter >= 1 && snapshot.chapter <= 9,
    `${label} chapter must be I through IX.`);
  assert(Number.isFinite(snapshot.visualScoreTime)
    && snapshot.visualScoreTime >= 0
    && snapshot.visualScoreTime <= SCORE_DURATION_SECONDS,
  `${label} visual score time left the score.`);
  assert(Number.isFinite(snapshot.shutdown) && snapshot.shutdown >= 0 && snapshot.shutdown <= 1,
    `${label} shutdown must be from zero to one.`);
  assert.equal(typeof snapshot.ending, 'boolean', `${label} ending flag must be boolean.`);
  assert.equal(typeof snapshot.finished, 'boolean', `${label} finished flag must be boolean.`);
  assert.equal(typeof snapshot.epilogueVisible, 'boolean', `${label} epilogue flag must be boolean.`);
  assert(Number.isInteger(snapshot.endingCue) && snapshot.endingCue >= 0 && snapshot.endingCue <= 3,
    `${label} ending cue must be zero through three.`);
  assert(Number.isInteger(snapshot.finishCount) && snapshot.finishCount >= 0,
    `${label} finish count must be non-negative.`);
  assert.equal(typeof snapshot.clockPending, 'boolean', `${label} clock pending flag must be boolean.`);
  assert(Array.isArray(snapshot.events), `${label} events must be an array.`);
  snapshot.events.forEach((event, index) => {
    assertExactKeys(event, CYCLE_EVENT_KEYS, `${label} event ${index + 1}`);
  });
}

function observePage(page) {
  const errors = [];
  const archiveAudioRequests = [];
  const archiveAudioResponses = [];

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push({ source: 'console', message: message.text() });
  });
  page.on('pageerror', (error) => {
    errors.push({ source: 'pageerror', message: error.message });
  });
  page.on('request', (request) => {
    if (new URL(request.url()).pathname.endsWith('/archive.mp3')) {
      archiveAudioRequests.push({
        method: request.method(),
        resourceType: request.resourceType(),
        url: request.url(),
      });
    }
  });
  page.on('response', (response) => {
    if (new URL(response.url()).pathname.endsWith('/archive.mp3')) {
      archiveAudioResponses.push({ status: response.status(), url: response.url() });
    }
  });

  return { errors, archiveAudioRequests, archiveAudioResponses };
}

function assertNoPageErrors(observation, label) {
  assert.deepEqual(observation.errors, [], `${label} emitted browser errors.`);
}

async function readCycleSnapshot(page, label) {
  const snapshot = await page.evaluate(() => {
    const audit = window.__NINTH_TIDE_CYCLE_AUDIT__;
    if (!audit || typeof audit.snapshot !== 'function') {
      throw new Error('Required __NINTH_TIDE_CYCLE_AUDIT__.snapshot hook is unavailable.');
    }
    return audit.snapshot();
  });
  assertCycleSnapshot(snapshot, label);
  return snapshot;
}

async function clickAndReadCycleSnapshot(page, selector, label) {
  const snapshot = await page.locator(selector).evaluate((element) => {
    if (!(element instanceof HTMLButtonElement)) {
      throw new TypeError('Ninth Tide cycle action target must be a button.');
    }
    element.click();
    const audit = window.__NINTH_TIDE_CYCLE_AUDIT__;
    if (!audit || typeof audit.snapshot !== 'function') {
      throw new Error('Required __NINTH_TIDE_CYCLE_AUDIT__.snapshot hook is unavailable.');
    }
    return audit.snapshot();
  });
  assertCycleSnapshot(snapshot, label);
  return snapshot;
}

async function navigateToCycleAudit(page, buildUrl) {
  const cycleUrl = new URL(buildUrl);
  cycleUrl.searchParams.set('qa', 'cycle');
  const response = await page.goto(cycleUrl.href, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  });
  assert(response?.ok(), `Ninth Tide cycle navigation returned HTTP ${response?.status() ?? 'none'}.`);
  await page.waitForFunction(
    () => typeof window.__NINTH_TIDE_CYCLE_AUDIT__?.snapshot === 'function',
    undefined,
    { timeout: 30_000 },
  );
  assert.equal(new URL(page.url()).search, '?qa=cycle', 'Cycle QA must use only the ?qa=cycle hook.');
}

function assertInitialSnapshot(snapshot, label) {
  assert.equal(snapshot.source, '', `${label} initial source changed.`);
  assert.equal(snapshot.round, 0, `${label} initial round changed.`);
  assert.equal(snapshot.chapter, 1, `${label} initial chapter changed.`);
  assert.equal(snapshot.visualScoreTime, 0, `${label} initial score time changed.`);
  assert.equal(snapshot.finishCount, 0, `${label} initial finish count changed.`);
  assert.deepEqual(snapshot.events, [], `${label} initial audit was not empty.`);
}

function assertFreshRoundOrigin(snapshot, label) {
  assert.equal(snapshot.visualScoreTime, 0, `${label} did not start at exact visual score zero.`);
  const chapterOneEvent = snapshot.events.at(-1);
  assert.equal(chapterOneEvent?.id, 'chapter-I', `${label} did not record chapter I at its origin.`);
  assert.equal(chapterOneEvent.logicalTime, 0, `${label} chapter I origin was not exactly zero.`);
}

async function runSilentCycle(browser, buildUrl, reducedMotion) {
  const context = await browser.newContext({
    ...NINTH_TIDE_CONTEXT_OPTIONS,
    reducedMotion,
  });
  const page = await context.newPage();
  const observation = observePage(page);
  const label = reducedMotion === 'reduce' ? 'reduced-motion silent cycle' : 'normal-motion silent cycle';

  try {
    await page.clock.install({ time: new Date('2026-07-22T00:00:00.000Z') });
    await navigateToCycleAudit(page, buildUrl);
    const initial = await readCycleSnapshot(page, `${label} initial`);
    assertInitialSnapshot(initial, label);

    await page.clock.fastForward(IDLE_BEFORE_ENTRY_MS);
    const idle = await readCycleSnapshot(page, `${label} idle`);
    assertInitialSnapshot(idle, `${label} after five-second idle`);

    const entered = await clickAndReadCycleSnapshot(page, '#silentBtn', `${label} entered`);
    assert.equal(entered.source, 'silent', `${label} did not select the silent source.`);
    assert.equal(entered.round, 1, `${label} did not start round one.`);
    assert.equal(entered.chapter, 1, `${label} did not start at chapter I.`);
    assertEventSequence(entered, EXPECTED_CYCLE_EVENT_IDS.slice(0, 2), `${label} entry`);
    assertFreshRoundOrigin(entered, `${label} entry`);

    await page.clock.fastForward(CHAPTER_NINE_JUMP_MS);
    for (let index = 0; index < CHAPTER_TRANSITION_STEPS; index += 1) {
      await page.clock.fastForward(CHAPTER_TRANSITION_STEP_MS);
    }
    const chapterNine = await readCycleSnapshot(page, `${label} chapter IX`);
    assert.equal(chapterNine.chapter, 9, `${label} did not enter chapter IX before shutdown.`);
    assert.equal(chapterNine.ending, false, `${label} entered shutdown before the chapter IX checkpoint.`);
    assertEventSequence(chapterNine, EXPECTED_CYCLE_EVENT_IDS.slice(0, 3), `${label} chapter IX`);

    const elapsedBeforeFinish = CHAPTER_NINE_JUMP_MS
      + CHAPTER_TRANSITION_STEPS * CHAPTER_TRANSITION_STEP_MS;
    await page.clock.fastForward(SILENT_CYCLE_MS - elapsedBeforeFinish);
    const finished = await readCycleSnapshot(page, `${label} finish`);
    assert.equal(finished.source, 'silent', `${label} changed source during the round.`);
    assert.equal(finished.round, 1, `${label} changed round before replay.`);
    assert.equal(finished.chapter, 9, `${label} left chapter IX during shutdown.`);
    assert.equal(finished.visualScoreTime, SCORE_DURATION_SECONDS,
      `${label} did not clamp at the exact visual score endpoint.`);
    assert.equal(finished.shutdown, 1, `${label} did not complete shutdown.`);
    assert.equal(finished.ending, true, `${label} did not enter ending state.`);
    assert.equal(finished.finished, true, `${label} did not finish.`);
    assert.equal(finished.finishCount, 1, `${label} finish was not idempotent.`);
    assert.equal(finished.epilogueVisible, false, `${label} skipped the epilogue dwell.`);
    assertEventSequence(finished, EXPECTED_CYCLE_EVENT_IDS.slice(0, -1), `${label} finish`);

    await page.clock.fastForward(EPILOGUE_DWELL_MS);
    const epilogue = await readCycleSnapshot(page, `${label} epilogue`);
    assert.equal(epilogue.finishCount, 1, `${label} finished more than once during epilogue.`);
    assert.equal(epilogue.epilogueVisible, true, `${label} did not reveal the epilogue.`);
    assertEventSequence(epilogue, EXPECTED_CYCLE_EVENT_IDS, `${label} epilogue`);

    const replay = await clickAndReadCycleSnapshot(page, '#replayBtn', `${label} replay`);
    assert.equal(replay.source, 'silent', `${label} replay changed the selected source.`);
    assert.equal(replay.round, epilogue.round + 1, `${label} replay did not increment the round.`);
    assert.equal(replay.chapter, 1, `${label} replay did not return to chapter I.`);
    assert.equal(replay.finished, false, `${label} replay remained finished.`);
    assert.equal(replay.finishCount, 0, `${label} replay retained the prior round finish count.`);
    assertEventSequence(replay, EXPECTED_REPLAY_EVENT_IDS, `${label} replay`);
    assertFreshRoundOrigin(replay, `${label} replay`);
    assert(replay.events.every(({ source }) => source === 'silent'),
      `${label} recorded a non-silent logical event.`);
    assert.deepEqual(observation.archiveAudioRequests, [],
      `${label} requested archive.mp3 during silent entry or replay.`);
    assertNoPageErrors(observation, label);

    return {
      reducedMotion,
      checkpoints: { initial, idle, entered, chapterNine, finished, epilogue, replay },
      archiveAudioRequests: observation.archiveAudioRequests,
      errors: observation.errors,
    };
  } finally {
    await page.close();
    await context.close();
  }
}

async function runSilentJumpCycle(browser, buildUrl) {
  const context = await browser.newContext(NINTH_TIDE_CONTEXT_OPTIONS);
  const page = await context.newPage();
  const observation = observePage(page);
  const label = 'single-jump silent cycle';

  try {
    await page.clock.install({ time: new Date('2026-07-22T00:00:00.000Z') });
    await navigateToCycleAudit(page, buildUrl);
    const entered = await clickAndReadCycleSnapshot(page, '#silentBtn', `${label} entered`);
    assertFreshRoundOrigin(entered, `${label} entry`);

    await page.clock.fastForward(SILENT_CYCLE_MS);
    const jumped = await readCycleSnapshot(page, `${label} endpoint jump`);
    assert.equal(jumped.visualScoreTime, SCORE_DURATION_SECONDS,
      `${label} did not clamp at the exact visual score endpoint.`);
    assert.equal(jumped.chapter, 1, `${label} committed chapter IX without its transition.`);
    assert.equal(jumped.finished, false, `${label} finished before chapter IX committed.`);
    assert.equal(jumped.finishCount, 0, `${label} counted finish before chapter IX committed.`);
    assertEventSequence(jumped, EXPECTED_CYCLE_EVENT_IDS.slice(0, 2), `${label} endpoint jump`);

    for (let index = 0; index < JUMP_CONVERGENCE_STEPS; index += 1) {
      await page.clock.fastForward(CHAPTER_TRANSITION_STEP_MS);
    }
    const finished = await readCycleSnapshot(page, `${label} converged finish`);
    assert.equal(finished.chapter, 9, `${label} did not commit chapter IX before finish.`);
    assert.equal(finished.finished, true, `${label} did not finish after chapter IX committed.`);
    assert.equal(finished.finishCount, 1, `${label} finish was not idempotent.`);
    assertEventSequence(finished, EXPECTED_CYCLE_EVENT_IDS.slice(0, -1), `${label} finish`);

    await page.clock.fastForward(EPILOGUE_DWELL_MS);
    const epilogue = await readCycleSnapshot(page, `${label} epilogue`);
    assert.equal(epilogue.epilogueVisible, true, `${label} did not reveal the epilogue.`);
    assert.equal(epilogue.finishCount, 1, `${label} finished more than once.`);
    assertEventSequence(epilogue, EXPECTED_CYCLE_EVENT_IDS, `${label} epilogue`);
    assert.deepEqual(observation.archiveAudioRequests, [], `${label} requested archive.mp3.`);
    assertNoPageErrors(observation, label);

    return {
      checkpoints: { entered, jumped, finished, epilogue },
      archiveAudioRequests: observation.archiveAudioRequests,
      errors: observation.errors,
    };
  } finally {
    await page.close();
    await context.close();
  }
}

async function waitForNativeEnded(audio) {
  return audio.evaluate(async (element) => {
    if (!(element instanceof HTMLAudioElement)) {
      throw new TypeError('Ninth Tide audio smoke target must be an HTMLAudioElement.');
    }
    if (!Number.isFinite(element.duration) || element.duration <= 0) {
      throw new Error('Ninth Tide real audio metadata has no positive duration.');
    }

    const ended = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Ninth Tide real audio did not end.')), 10_000);
      element.addEventListener('ended', () => {
        clearTimeout(timeout);
        resolve();
      }, { once: true });
      element.addEventListener('error', () => {
        clearTimeout(timeout);
        reject(new Error('Ninth Tide real audio failed before its native ended event.'));
      }, { once: true });
    });

    element.currentTime = Math.max(0, element.duration - 0.25);
    if (element.paused) await element.play();
    await ended;
    return {
      currentSrc: element.currentSrc,
      currentTime: element.currentTime,
      duration: element.duration,
      ended: element.ended,
      readyState: element.readyState,
    };
  });
}

async function runRealAudioSmoke(browser, buildUrl) {
  const audioViewport = Object.freeze({ width: 819, height: 600 });
  const context = await browser.newContext({
    ...NINTH_TIDE_CONTEXT_OPTIONS,
    viewport: audioViewport,
    screen: audioViewport,
  });
  const page = await context.newPage();
  const observation = observePage(page);
  const audio = page.locator('#audio');

  try {
    await navigateToCycleAudit(page, buildUrl);
    assert.equal(await audio.getAttribute('src'), null, 'Real audio smoke did not start source-free.');

    await page.locator('#enterBtn').click();
    await page.waitForFunction(() => {
      const element = document.querySelector('#audio');
      return element instanceof HTMLAudioElement
        && Number.isFinite(element.duration)
        && element.duration > 0
        && element.readyState >= HTMLMediaElement.HAVE_METADATA
        && !element.paused;
    }, undefined, { timeout: 30_000 });

    const metadata = await audio.evaluate((element) => ({
      currentSrc: element.currentSrc,
      duration: element.duration,
      readyState: element.readyState,
    }));
    assert(new URL(metadata.currentSrc).pathname.endsWith('/archive.mp3'),
      'Real audio metadata did not come from archive.mp3.');
    assert(Number.isFinite(metadata.duration) && metadata.duration > 0,
      'Real audio metadata duration was not positive and finite.');
    assert(metadata.readyState >= 1, 'Real audio did not reach HAVE_METADATA.');
    assert(observation.archiveAudioRequests.length > 0, 'Real audio smoke did not request archive.mp3.');
    assert(observation.archiveAudioResponses.some(({ status }) => status >= 200 && status < 300),
      'Real audio smoke received no successful archive.mp3 response.');

    const entered = await readCycleSnapshot(page, 'real audio entered');
    assert.equal(entered.source, 'audio', 'Real audio smoke did not select the audio source.');
    assert.equal(entered.round, 1, 'Real audio smoke did not start round one.');
    assert.equal(entered.clockPending, false, 'Real audio clock remained pending after metadata.');

    await audio.evaluate(async (element) => {
      const seeked = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Ninth Tide chapter IX seek timed out.')), 10_000);
        element.addEventListener('seeked', () => {
          clearTimeout(timeout);
          resolve();
        }, { once: true });
      });
      element.currentTime = element.duration * 0.94;
      await seeked;
      element.pause();
    });
    try {
      await page.waitForFunction(
        () => window.__NINTH_TIDE_CYCLE_AUDIT__
          .snapshot().events.some(({ id }) => id === 'chapter-IX'),
        undefined,
        { timeout: 30_000 },
      );
    } catch (error) {
      const [snapshot, media] = await Promise.all([
        readCycleSnapshot(page, 'real audio chapter IX timeout'),
        audio.evaluate((element) => ({
          currentTime: element.currentTime,
          duration: element.duration,
          ended: element.ended,
          paused: element.paused,
          readyState: element.readyState,
        })),
      ]);
      throw new Error(
        `Real audio did not reach chapter IX: ${JSON.stringify({ snapshot, media, errors: observation.errors })}.`,
        { cause: error },
      );
    }

    const ended = await waitForNativeEnded(audio);
    assert.equal(ended.ended, true, 'Real audio did not report its native ended state.');
    assert(Math.abs(ended.currentTime - ended.duration) < 0.05,
      'Real audio ended before its metadata duration.');
    await page.waitForFunction(
      () => window.__NINTH_TIDE_CYCLE_AUDIT__.snapshot().epilogueVisible,
      undefined,
      { timeout: 5_000 },
    );

    const epilogue = await readCycleSnapshot(page, 'real audio epilogue');
    assert.equal(epilogue.source, 'audio', 'Real audio smoke changed clock source.');
    assert.equal(epilogue.clockPending, false, 'Real audio clock returned to pending after ended.');
    assert.equal(epilogue.finished, true, 'Real audio native ended event did not finish the cycle.');
    assert.equal(epilogue.finishCount, 1, 'Real audio native ended event finished more than once.');
    assert.equal(epilogue.epilogueVisible, true, 'Real audio native ended event did not reveal epilogue.');
    assertEventSequence(epilogue, EXPECTED_CYCLE_EVENT_IDS, 'real audio epilogue');
    assertNoPageErrors(observation, 'real audio smoke');

    return {
      metadata,
      ended,
      epilogue,
      archiveAudioRequests: observation.archiveAudioRequests,
      archiveAudioResponses: observation.archiveAudioResponses,
      errors: observation.errors,
    };
  } finally {
    await page.close();
    await context.close();
  }
}

async function runGate() {
  assertBundledPlaywrightVersion(playwrightVersion);
  const config = parseNinthTideConfig(process.env);
  manifest.buildUrl = config.buildUrl;

  const browser = await chromium.launch(NINTH_TIDE_BROWSER_LAUNCH_OPTIONS);
  try {
    manifest.environment.browserVersion = browser.version();
    manifest.audio = await runRealAudioSmoke(browser, config.buildUrl);
    const normal = await runSilentCycle(browser, config.buildUrl, 'no-preference');
    manifest.silent.push(normal);
    const reduced = await runSilentCycle(browser, config.buildUrl, 'reduce');
    manifest.silent.push(reduced);
    assert.deepEqual(
      logicalStateSequence(reduced.checkpoints),
      logicalStateSequence(normal.checkpoints),
      'Reduced motion changed the silent cycle state sequence.',
    );
    manifest.silentJump = await runSilentJumpCycle(browser, config.buildUrl);
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
  await mkdir(NINTH_TIDE_OUTPUT_DIR, { recursive: true });
  await writeFile(
    join(NINTH_TIDE_OUTPUT_DIR, 'cycle-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
}

console.log('Ninth Tide cycle QA passed (normal, reduced motion, and real audio).');
