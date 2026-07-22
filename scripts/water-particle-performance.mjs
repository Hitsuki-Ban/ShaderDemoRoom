import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const requiredEnvironment = [
  'SHOWROOM_URL',
  'TELEMETRY_BASELINE_URL',
  'TELEMETRY_SOURCE_REVISION',
  'TELEMETRY_BASELINE_REVISION',
];
const missingEnvironment = requiredEnvironment.filter(
  (name) => typeof process.env[name] !== 'string' || process.env[name].length === 0,
);
const outputArguments = process.argv.slice(2).filter((argument) => argument !== '--');
if (missingEnvironment.length > 0 || outputArguments.length !== 1) {
  throw new Error(
    'SHOWROOM_URL, TELEMETRY_BASELINE_URL, TELEMETRY_SOURCE_REVISION, '
      + 'TELEMETRY_BASELINE_REVISION, and exactly one output path are required.',
  );
}

const candidateUrl = process.env.SHOWROOM_URL;
const baselineUrl = process.env.TELEMETRY_BASELINE_URL;
const candidateRevision = process.env.TELEMETRY_SOURCE_REVISION;
const baselineRevision = process.env.TELEMETRY_BASELINE_REVISION;
const [outputPath] = outputArguments;
const STORM_ROUTE = '#/room/voxel-water?v=3&weather=storm&wind=2.1&rain=0.74&waveHeight=1.08&cloudCover=0.78&swell=0.9&chop=0.82&foam=0.78&clarity=0.52&surfaceDetail=0.86&currentDirection=58&currentStrength=0.78&skyTime=0.24&colorTemperature=-0.22&voxelColorVariance=0.46';
const WARMUP_SECONDS = 5;
const MEASUREMENT_SECONDS = 15;
const PAIR_COUNT = 5;
const MINIMUM_PAIRED_SPEED_RATIO = 0.9;
const EXPECTED_DRAW_CALLS = 21;

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function roomUrl(baseUrl) {
  return `${baseUrl.replace(/\/+$/, '')}/${STORM_ROUTE}`;
}

async function measurePage(browser, baseUrl, label) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const browserErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  page.on('pageerror', (error) => browserErrors.push(error.message));
  try {
    await page.goto(roomUrl(baseUrl), { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('canvas[data-renderer-host="shell"]', { timeout: 15_000 });
    await page.waitForSelector('[data-telemetry-state="live"]', { timeout: 15_000 });
    await page.waitForTimeout(WARMUP_SECONDS * 1000);
    const cadence = await page.evaluate(
      (durationMs) => new Promise((resolve) => {
        const intervals = [];
        let firstTimestamp = null;
        let previousTimestamp = null;
        const tick = (timestamp) => {
          if (firstTimestamp === null) firstTimestamp = timestamp;
          if (previousTimestamp !== null) intervals.push(timestamp - previousTimestamp);
          previousTimestamp = timestamp;
          if (timestamp - firstTimestamp >= durationMs) {
            const elapsedMs = intervals.reduce((total, interval) => total + interval, 0);
            resolve({
              elapsedMs,
              fps: (1000 * intervals.length) / elapsedMs,
              frameTimeMs: elapsedMs / intervals.length,
              intervals: intervals.length,
            });
            return;
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
      MEASUREMENT_SECONDS * 1000,
    );
    const diagnostics = await page.evaluate(() => {
      const canvas = document.querySelector('canvas[data-renderer-host="shell"]');
      const context = canvas?.getContext('webgl2');
      const debugInfo = context?.getExtension('WEBGL_debug_renderer_info');
      const telemetryJson = document.querySelector('[data-telemetry-json]')
        ?.getAttribute('data-telemetry-json');
      return {
        renderer: debugInfo ? context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null,
        telemetry: telemetryJson ? JSON.parse(telemetryJson) : null,
      };
    });
    if (typeof diagnostics.renderer !== 'string'
      || !diagnostics.renderer.toLowerCase().includes('swiftshader')) {
      throw new Error(`${label} did not use SwiftShader: ${diagnostics.renderer}.`);
    }
    const drawCalls = Number(diagnostics.telemetry?.drawCalls);
    if (drawCalls !== EXPECTED_DRAW_CALLS) {
      throw new Error(
        `${label} draw calls ${drawCalls} did not match the Storm topology ${EXPECTED_DRAW_CALLS}.`,
      );
    }
    if (browserErrors.length > 0) {
      throw new Error(`${label} emitted browser errors:\n${browserErrors.join('\n')}`);
    }
    return { label, renderer: diagnostics.renderer, drawCalls, browserErrors, ...cadence };
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader'],
});

const pairs = [];
try {
  for (let pair = 1; pair <= PAIR_COUNT; pair += 1) {
    const candidateFirst = pair % 2 === 0;
    const first = candidateFirst
      ? await measurePage(browser, candidateUrl, 'candidate')
      : await measurePage(browser, baselineUrl, 'baseline');
    const second = candidateFirst
      ? await measurePage(browser, baselineUrl, 'baseline')
      : await measurePage(browser, candidateUrl, 'candidate');
    const candidate = candidateFirst ? first : second;
    const baseline = candidateFirst ? second : first;
    if (candidate.renderer !== baseline.renderer) {
      throw new Error(`Pair ${pair} renderer mismatch: ${candidate.renderer} / ${baseline.renderer}.`);
    }
    pairs.push({
      pair,
      order: candidateFirst ? ['candidate', 'baseline'] : ['baseline', 'candidate'],
      baseline,
      candidate,
      speedRatio: candidate.fps / baseline.fps,
    });
  }
} finally {
  await browser.close();
}

const speedRatios = pairs.map(({ speedRatio }) => speedRatio);
const pairedSpeedRatioMedian = median(speedRatios);
const report = {
  schemaVersion: 1,
  recordedAt: new Date().toISOString(),
  comparison: 'T-VW-01 accepted baseline vs T-VW-08 GPU particle candidate',
  room: { id: 'voxel-water', preset: 'storm', route: STORM_ROUTE },
  environment: { classification: 'software', renderer: pairs[0].baseline.renderer },
  builds: {
    baseline: { sourceRevision: baselineRevision, url: baselineUrl },
    candidate: { sourceRevision: candidateRevision, url: candidateUrl },
  },
  method: {
    pairs: PAIR_COUNT,
    order: 'AB/BA interleaved and alternating in one browser process',
    warmupSeconds: WARMUP_SECONDS,
    measurementSeconds: MEASUREMENT_SECONDS,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  },
  aggregates: {
    baselineFpsMedian: median(pairs.map(({ baseline }) => baseline.fps)),
    candidateFpsMedian: median(pairs.map(({ candidate }) => candidate.fps)),
    pairedSpeedRatioMedian,
    pairedSpeedRatioMinimum: Math.min(...speedRatios),
    pairedSpeedRatioMaximum: Math.max(...speedRatios),
  },
  gate: {
    metric: 'pairedSpeedRatioMedian',
    minimum: MINIMUM_PAIRED_SPEED_RATIO,
    passed: pairedSpeedRatioMedian >= MINIMUM_PAIRED_SPEED_RATIO,
  },
  expectedDrawCalls: { baseline: EXPECTED_DRAW_CALLS, candidate: EXPECTED_DRAW_CALLS },
  pairs,
};

await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`water particle performance: ${outputPath}`);
console.log(
  `paired speed ratio median ${pairedSpeedRatioMedian.toFixed(3)}x `
    + `(${report.aggregates.pairedSpeedRatioMinimum.toFixed(3)}x-`
    + `${report.aggregates.pairedSpeedRatioMaximum.toFixed(3)}x)`,
);
if (!report.gate.passed) {
  throw new Error(
    `Paired speed ratio ${pairedSpeedRatioMedian.toFixed(3)}x is below `
      + `${MINIMUM_PAIRED_SPEED_RATIO.toFixed(2)}x.`,
  );
}
