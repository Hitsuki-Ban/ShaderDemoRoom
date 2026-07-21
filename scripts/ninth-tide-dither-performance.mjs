import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { chromium } from 'playwright';

const pairCount = 5;
const warmupSeconds = 8;
const bridgeSampleCount = 10;
const bridgeSampleIntervalSeconds = 1;
const cadenceMeasurementSeconds = 8;
const maximumRegressionPercent = 5;
const viewport = Object.freeze({ width: 1440, height: 900, deviceScaleFactor: 1 });

function required(environment, name) {
  const value = environment[name];
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`${name} is required for qa:ninth-tide-dither-performance.`);
  }
  return value;
}

function parseBaseUrl(environment, name) {
  const raw = required(environment, name);
  let url;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`${name} must be an absolute HTTP(S) URL.`);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`${name} must be an absolute HTTP(S) URL.`);
  }
  return url.href.replace(/\/+$/, '');
}

function median(values) {
  if (!Array.isArray(values) || values.length === 0 || values.some((value) => !Number.isFinite(value))) {
    throw new TypeError('median requires a non-empty array of finite numbers.');
  }
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function fetchBundle(baseUrl) {
  const url = `${baseUrl}/exhibits/ninth-tide-archive/app.js`;
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`Ninth Tide bundle returned HTTP ${response.status}: ${url}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  return { url, bytes: bytes.length, sha256: sha256(bytes) };
}

async function setSectionEightPreview(page) {
  await page.waitForFunction(() => {
    const frame = document.querySelector('iframe');
    return frame?.dataset.bridgeState === 'ready' && frame.dataset.bridgeInstanceId;
  }, undefined, { timeout: 30_000 });
  await page.evaluate(() => {
    const frame = document.querySelector('iframe');
    const instanceId = frame.dataset.bridgeInstanceId;
    frame.contentWindow.postMessage({
      context: 'shader-demo-room',
      v: 1,
      instanceId,
      type: 'set-tide-preview',
      payload: { mode: 'main', section: 8 },
    }, location.origin);
  });
}

async function readBridgeStats(page) {
  return page.evaluate(() => {
    const serialized = document
      .querySelector('[data-telemetry-source="embedded"]')
      ?.getAttribute('data-telemetry-json');
    if (!serialized) throw new Error('Ninth Tide embedded telemetry is unavailable.');
    const stats = JSON.parse(serialized);
    return {
      fps: stats.fps,
      frameTimeMs: stats.frameTimeMs,
      frameCount: stats.frameCount,
      paused: stats.paused,
    };
  });
}

async function measureCadence(page) {
  return page.evaluate((durationMs) => new Promise((resolve) => {
    let firstTimestamp = null;
    let previousTimestamp = null;
    let elapsedMs = 0;
    let intervals = 0;
    const tick = (timestamp) => {
      if (firstTimestamp === null) firstTimestamp = timestamp;
      if (previousTimestamp !== null) {
        elapsedMs += timestamp - previousTimestamp;
        intervals += 1;
      }
      previousTimestamp = timestamp;
      if (timestamp - firstTimestamp >= durationMs) {
        resolve({
          elapsedMs,
          intervals,
          frameTimeMs: elapsedMs / intervals,
          fps: intervals * 1000 / elapsedMs,
        });
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), cadenceMeasurementSeconds * 1000);
}

async function inspectRenderer(page) {
  return page.evaluate(() => {
    const frame = document.querySelector('iframe');
    const gl = frame?.contentDocument?.querySelector('canvas')?.getContext('webgl2');
    const extension = gl?.getExtension('WEBGL_debug_renderer_info');
    if (!gl || !extension) throw new Error('Ninth Tide hardware renderer audit is unavailable.');
    return gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
  });
}

async function measurePage(browser, baseUrl, label) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
  });
  try {
    const response = await page.goto(`${baseUrl}/#/room/ninth-tide-archive`, {
      waitUntil: 'domcontentloaded',
      timeout: 30_000,
    });
    if (!response?.ok()) throw new Error(`${label} navigation returned HTTP ${response?.status() ?? 'none'}.`);
    await setSectionEightPreview(page);
    await page.waitForTimeout(warmupSeconds * 1000);
    const bridgeSamples = [];
    for (let sample = 1; sample <= bridgeSampleCount; sample += 1) {
      await page.waitForTimeout(bridgeSampleIntervalSeconds * 1000);
      bridgeSamples.push({ sample, ...await readBridgeStats(page) });
    }
    if (bridgeSamples.some(({ paused, frameTimeMs }) => paused || !(frameTimeMs > 0))) {
      throw new Error(`${label} bridge returned paused or non-positive frame-time samples.`);
    }
    return {
      label,
      renderer: await inspectRenderer(page),
      bridge: {
        samples: bridgeSamples,
        frameTimeMsMedian: median(bridgeSamples.map(({ frameTimeMs }) => frameTimeMs)),
        fpsMedian: median(bridgeSamples.map(({ fps }) => fps)),
      },
      cadence: await measureCadence(page),
    };
  } finally {
    await page.close();
  }
}

const baselineUrl = parseBaseUrl(process.env, 'BASELINE_URL');
const candidateUrl = parseBaseUrl(process.env, 'CANDIDATE_URL');
if (baselineUrl === candidateUrl) throw new Error('BASELINE_URL and CANDIDATE_URL must differ.');
const baselineRevision = required(process.env, 'BASELINE_REVISION');
const candidateRevision = required(process.env, 'CANDIDATE_REVISION');
const outputPath = required(process.env, 'PERFORMANCE_OUTPUT_PATH');
await mkdir(dirname(resolve(outputPath)), { recursive: true });
const [baselineBundle, candidateBundle] = await Promise.all([
  fetchBundle(baselineUrl),
  fetchBundle(candidateUrl),
]);

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--use-angle=d3d11', '--disable-software-rasterizer'],
});
const browserVersion = browser.version();

const pairs = [];
try {
  for (let pair = 1; pair <= pairCount; pair += 1) {
    const candidateFirst = pair % 2 === 0;
    const first = await measurePage(
      browser,
      candidateFirst ? candidateUrl : baselineUrl,
      candidateFirst ? 'candidate' : 'baseline',
    );
    const second = await measurePage(
      browser,
      candidateFirst ? baselineUrl : candidateUrl,
      candidateFirst ? 'baseline' : 'candidate',
    );
    const baseline = candidateFirst ? second : first;
    const candidate = candidateFirst ? first : second;
    if (baseline.renderer !== candidate.renderer) {
      throw new Error(`Pair ${pair} renderer mismatch: ${baseline.renderer} / ${candidate.renderer}.`);
    }
    pairs.push({
      pair,
      order: candidateFirst ? ['candidate', 'baseline'] : ['baseline', 'candidate'],
      baseline,
      candidate,
      bridgeRegressionPercent:
        (candidate.bridge.frameTimeMsMedian / baseline.bridge.frameTimeMsMedian - 1) * 100,
      cadenceRegressionPercent:
        (candidate.cadence.frameTimeMs / baseline.cadence.frameTimeMs - 1) * 100,
    });
  }
} finally {
  await browser.close();
}

const bridgePairRegressions = pairs.map(({ bridgeRegressionPercent }) => bridgeRegressionPercent);
const cadencePairRegressions = pairs.map(({ cadenceRegressionPercent }) => cadenceRegressionPercent);
const bridgePairedMedianRegressionPercent = median(bridgePairRegressions);
const cadencePairedMedianRegressionPercent = median(cadencePairRegressions);
const record = {
  schemaVersion: 1,
  gate: 'qa:ninth-tide-dither-performance',
  recordedAt: new Date().toISOString(),
  builds: {
    baseline: { revision: baselineRevision, baseUrl: baselineUrl, bundle: baselineBundle },
    candidate: { revision: candidateRevision, baseUrl: candidateUrl, bundle: candidateBundle },
  },
  environment: {
    browserVersion,
    renderer: pairs[0].baseline.renderer,
  },
  method: {
    pairs: pairCount,
    order: 'AB/BA alternating in one browser process',
    warmupSeconds,
    bridgeSampleCount,
    bridgeSampleIntervalSeconds,
    cadenceMeasurementSeconds,
    viewport,
    preview: { mode: 'main', section: 8 },
  },
  aggregates: {
    bridgePairRegressions,
    bridgePairedMedianRegressionPercent,
    cadencePairRegressions,
    cadencePairedMedianRegressionPercent,
  },
  gateResult: {
    maximumRegressionPercent,
    bridgePassed: bridgePairedMedianRegressionPercent <= maximumRegressionPercent,
    cadencePassed: cadencePairedMedianRegressionPercent <= maximumRegressionPercent,
  },
  pairs,
};
record.gateResult.passed = record.gateResult.bridgePassed && record.gateResult.cadencePassed;
await writeFile(outputPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(`Ninth Tide dither performance: ${outputPath}`);
console.log(
  `bridge ${bridgePairedMedianRegressionPercent.toFixed(2)}%; cadence ${cadencePairedMedianRegressionPercent.toFixed(2)}%`,
);
if (!record.gateResult.passed) {
  throw new Error(
    `Ninth Tide dither performance exceeded ${maximumRegressionPercent}%: bridge ${bridgePairedMedianRegressionPercent.toFixed(2)}%, cadence ${cadencePairedMedianRegressionPercent.toFixed(2)}%.`,
  );
}
