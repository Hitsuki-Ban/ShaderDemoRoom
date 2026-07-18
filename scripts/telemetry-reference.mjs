import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseUrl = process.env.SHOWROOM_URL;
const buildId = process.env.TELEMETRY_BUILD_ID;
const sourceRevision = process.env.TELEMETRY_SOURCE_REVISION;
const cliArgs = process.argv.slice(2).filter((argument) => argument !== '--');
const [outputPath] = cliArgs;

if (!baseUrl || !buildId || !sourceRevision || cliArgs.length !== 1 || !outputPath) {
  throw new Error(
    'SHOWROOM_URL, TELEMETRY_BUILD_ID, TELEMETRY_SOURCE_REVISION, and an output path are required.',
  );
}

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
    await page.goto(`${baseUrl}/#/room/voxel-water`, {
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

const software = await captureReference({
  expectedClassification: 'software',
  label: 'bundled-chromium-swiftshader',
  launchOptions: { headless: true },
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

const record = {
  schemaVersion: 1,
  recordedAt: new Date().toISOString(),
  buildId,
  sourceRevision,
  room: { id: 'voxel-water', preset: 'default' },
  references: [software, hardware],
};

await writeFile(outputPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(`telemetry reference: ${outputPath}`);
console.log(
  `software median ${software.aggregates.fpsMedian.toFixed(2)} FPS; hardware median ${hardware.aggregates.fpsMedian.toFixed(2)} FPS`,
);
