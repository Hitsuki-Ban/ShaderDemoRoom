import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { parseTelemetryReferenceConfig } from './telemetry-reference-config.mjs';

const cliArgs = process.argv.slice(2).filter((argument) => argument !== '--');
const {
  baseUrl,
  baselineUrl,
  buildId,
  outputPath,
  roomId,
  sourceRevision,
} = parseTelemetryReferenceConfig(process.env, cliArgs);

const warmupSeconds = 5;
const measurementSeconds = 15;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

async function captureReference({ expectedClassification, label, launchOptions }) {
  const browser = await chromium.launch(launchOptions);
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await page.goto(`${baseUrl}/#/room/${roomId}`, {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForSelector('[data-telemetry-json]', { timeout: 15_000 });
    await page.waitForTimeout(warmupSeconds * 1000);

    const samples = [];
    for (let second = 1; second <= measurementSeconds; second += 1) {
      await page.waitForTimeout(1000);
      const sample = await page.evaluate(() => {
        const serialized = document
          .querySelector('[data-telemetry-json]')
          ?.getAttribute('data-telemetry-json');
        if (!serialized) {
          throw new Error('The telemetry rail did not expose a stats record.');
        }
        const stats = JSON.parse(serialized);
        return {
          drawCalls: stats.drawCalls,
          drawCallsMax: stats.drawCallsMax,
          fps: stats.fps,
          frameTimeMs: stats.frameTimeMs,
          frameTimeP95Ms: stats.frameTimeP95Ms,
          geometries: stats.geometries,
          programs: stats.programs,
          sampleState: stats.sampleState,
          textures: stats.textures,
          trianglesAvg: stats.trianglesAvg,
        };
      });
      samples.push({ second, ...sample });
    }

    const metadata = await page.evaluate(() => {
      const serialized = document
        .querySelector('[data-telemetry-json]')
        ?.getAttribute('data-telemetry-json');
      const stats = serialized ? JSON.parse(serialized) : null;
      return {
        environment: stats?.environment ?? null,
        platform: navigator.platform,
        userAgent: navigator.userAgent,
      };
    });
    assert(metadata.environment, `${label} renderer environment is missing.`);
    assert(
      metadata.environment.classification === expectedClassification,
      `${label} classified as ${metadata.environment.classification}; expected ${expectedClassification}.`,
    );
    assert(
      samples.every(({ drawCalls }) => drawCalls === 19),
      `${label} changed the calibrated 19-call baseline.`,
    );

    return {
      label,
      browserVersion: browser.version(),
      platform: metadata.platform,
      userAgent: metadata.userAgent,
      viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
      environment: metadata.environment,
      method: { warmupSeconds, measurementSeconds, sampleIntervalSeconds: 1 },
      aggregates: {
        fpsMedian: median(samples.map(({ fps }) => fps)),
        frameTimeMsMedian: median(samples.map(({ frameTimeMs }) => frameTimeMs)),
        frameTimeP95MsMedian: median(
          samples
            .map(({ frameTimeP95Ms }) => frameTimeP95Ms)
            .filter((value) => value !== null),
        ),
        drawCallsAverageMedian: median(samples.map(({ drawCalls }) => drawCalls)),
        drawCallsMaximum: Math.max(...samples.map(({ drawCallsMax }) => drawCallsMax)),
        trianglesAverageMedian: median(samples.map(({ trianglesAvg }) => trianglesAvg)),
      },
      samples,
    };
  } finally {
    await browser.close();
  }
}

async function measurePageCadence(browser, url, label) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  try {
    await page.goto(`${url}/#/room/${roomId}`, {
      waitUntil: 'domcontentloaded',
    });
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
    return { label, renderer, ...measurement };
  } finally {
    await page.close();
  }
}

async function capturePairedOverhead() {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--use-angle=d3d11', '--disable-software-rasterizer'],
  });
  try {
    const pairs = [];
    for (let pair = 1; pair <= 5; pair += 1) {
      const candidateFirst = pair % 2 === 0;
      const first = candidateFirst
        ? await measurePageCadence(browser, baseUrl, 'candidate')
        : await measurePageCadence(browser, baselineUrl, 'baseline');
      const second = candidateFirst
        ? await measurePageCadence(browser, baselineUrl, 'baseline')
        : await measurePageCadence(browser, baseUrl, 'candidate');
      const candidate = candidateFirst ? first : second;
      const baseline = candidateFirst ? second : first;
      assert(candidate.renderer, `Pair ${pair} candidate renderer is unavailable.`);
      assert(baseline.renderer, `Pair ${pair} baseline renderer is unavailable.`);
      assert(
        candidate.renderer === baseline.renderer,
        `Pair ${pair} renderer mismatch: ${candidate.renderer} / ${baseline.renderer}.`,
      );
      pairs.push({
        pair,
        order: candidateFirst ? ['candidate', 'baseline'] : ['baseline', 'candidate'],
        baseline,
        candidate,
        regressionPercent:
          ((baseline.fps - candidate.fps) / baseline.fps) * 100,
      });
    }

    const pairedMedianRegressionPercent = median(
      pairs.map(({ regressionPercent }) => regressionPercent),
    );
    assert(
      pairedMedianRegressionPercent <= 5,
      `Telemetry cadence regression ${pairedMedianRegressionPercent.toFixed(2)}% exceeds 5%.`,
    );
    return {
      comparison: `${roomId} baseline vs candidate`,
      baselineUrl,
      candidateUrl: baseUrl,
      method: {
        pairs: 5,
        order: 'interleaved and alternating',
        warmupSeconds,
        measurementSeconds,
      },
      pairedMedianRegressionPercent,
      pairs,
    };
  } finally {
    await browser.close();
  }
}

const software = await captureReference({
  expectedClassification: 'software',
  label: 'bundled-chromium-swiftshader',
  launchOptions: {
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader'],
  },
});
const hardware = await captureReference({
  expectedClassification: 'hardware',
  label: 'system-chrome-d3d11',
  launchOptions: {
    channel: 'chrome',
    headless: true,
    args: ['--use-angle=d3d11', '--disable-software-rasterizer'],
  },
});
const overhead = await capturePairedOverhead();

const record = {
  schemaVersion: 1,
  recordedAt: new Date().toISOString(),
  buildId,
  sourceRevision,
  room: { id: roomId, preset: 'default' },
  references: [software, hardware],
  overhead,
};

await writeFile(outputPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(`telemetry reference: ${outputPath}`);
console.log(
  `software median ${software.aggregates.fpsMedian.toFixed(2)} FPS; hardware median ${hardware.aggregates.fpsMedian.toFixed(2)} FPS`,
);
console.log(
  `paired overhead regression ${overhead.pairedMedianRegressionPercent.toFixed(2)}%`,
);
