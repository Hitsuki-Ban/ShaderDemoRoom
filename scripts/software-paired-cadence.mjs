import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { parseSoftwarePairedCadenceConfig } from './software-paired-cadence-config.mjs';

const cliArgs = process.argv.slice(2).filter((argument) => argument !== '--');
const {
  baselineRevision,
  baselineUrl,
  candidateRevision,
  candidateUrl,
  outputPath,
  roomId,
} = parseSoftwarePairedCadenceConfig(process.env, cliArgs);

const warmupSeconds = 5;
const measurementSeconds = 15;
const pairCount = 5;
const minimumPairedSpeedup = 1.7;

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function roomUrl(baseUrl) {
  return `${baseUrl.replace(/\/+$/, '')}/#/room/${roomId}`;
}

async function measurePageCadence(browser, baseUrl, label) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  try {
    await page.goto(roomUrl(baseUrl), { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('canvas[data-renderer-host="shell"]', {
      timeout: 15_000,
    });
    await page.waitForTimeout(warmupSeconds * 1000);
    const measurement = await page.evaluate(
      (durationMs) =>
        new Promise((resolve) => {
          const intervals = [];
          let firstTimestamp = null;
          let previousTimestamp = null;
          const tick = (timestamp) => {
            if (firstTimestamp === null) {
              firstTimestamp = timestamp;
            }
            if (previousTimestamp !== null) {
              intervals.push(timestamp - previousTimestamp);
            }
            previousTimestamp = timestamp;
            if (timestamp - firstTimestamp >= durationMs) {
              const elapsedMs = intervals.reduce(
                (total, interval) => total + interval,
                0,
              );
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
      measurementSeconds * 1000,
    );
    const renderer = await page.evaluate(() => {
      const canvas = document.querySelector('canvas[data-renderer-host="shell"]');
      const context = canvas?.getContext('webgl2');
      const debugInfo = context?.getExtension('WEBGL_debug_renderer_info');
      return debugInfo
        ? context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : null;
    });
    if (typeof renderer !== 'string' || !renderer.toLowerCase().includes('swiftshader')) {
      throw new Error(`${label} did not use SwiftShader: ${renderer}.`);
    }
    return { label, renderer, ...measurement };
  } finally {
    await page.close();
  }
}

const browser = await chromium.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader'],
});

let pairs;
try {
  pairs = [];
  for (let pair = 1; pair <= pairCount; pair += 1) {
    const candidateFirst = pair % 2 === 0;
    const first = candidateFirst
      ? await measurePageCadence(browser, candidateUrl, 'candidate')
      : await measurePageCadence(browser, baselineUrl, 'baseline');
    const second = candidateFirst
      ? await measurePageCadence(browser, baselineUrl, 'baseline')
      : await measurePageCadence(browser, candidateUrl, 'candidate');
    const candidate = candidateFirst ? first : second;
    const baseline = candidateFirst ? second : first;
    if (candidate.renderer !== baseline.renderer) {
      throw new Error(
        `Pair ${pair} renderer mismatch: ${candidate.renderer} / ${baseline.renderer}.`,
      );
    }
    pairs.push({
      pair,
      order: candidateFirst ? ['candidate', 'baseline'] : ['baseline', 'candidate'],
      baseline,
      candidate,
      speedup: candidate.fps / baseline.fps,
    });
  }
} finally {
  await browser.close();
}

const speedups = pairs.map(({ speedup }) => speedup);
const pairedSpeedupMedian = median(speedups);
const record = {
  schemaVersion: 1,
  recordedAt: new Date().toISOString(),
  comparison: 'software cadence baseline vs candidate',
  room: { id: roomId, preset: 'default' },
  environment: {
    classification: 'software',
    renderer: pairs[0].baseline.renderer,
  },
  builds: {
    baseline: { sourceRevision: baselineRevision, url: baselineUrl },
    candidate: { sourceRevision: candidateRevision, url: candidateUrl },
  },
  method: {
    pairs: pairCount,
    order: 'interleaved and alternating',
    warmupSeconds,
    measurementSeconds,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  },
  aggregates: {
    baselineFpsMedian: median(pairs.map(({ baseline }) => baseline.fps)),
    candidateFpsMedian: median(pairs.map(({ candidate }) => candidate.fps)),
    pairedSpeedupMedian,
    pairedSpeedupMinimum: Math.min(...speedups),
    pairedSpeedupMaximum: Math.max(...speedups),
  },
  gate: {
    metric: 'pairedSpeedupMedian',
    minimum: minimumPairedSpeedup,
    passed: pairedSpeedupMedian >= minimumPairedSpeedup,
  },
  pairs,
};

await writeFile(outputPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(`software paired cadence: ${outputPath}`);
console.log(
  `paired speedup median ${pairedSpeedupMedian.toFixed(3)}x (${record.aggregates.pairedSpeedupMinimum.toFixed(3)}x-${record.aggregates.pairedSpeedupMaximum.toFixed(3)}x)`,
);

if (!record.gate.passed) {
  throw new Error(
    `Paired software speedup ${pairedSpeedupMedian.toFixed(3)}x is below ${minimumPairedSpeedup.toFixed(1)}x.`,
  );
}
