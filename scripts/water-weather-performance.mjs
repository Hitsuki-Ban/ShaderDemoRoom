import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

export const BASELINE_REVISION = '328cc6384b3f83e7d4c40f2c51733a723b7ee788';
export const PAIR_COUNT = 5;
export const MINIMUM_ABSOLUTE_FPS = 13.833;
export const MINIMUM_PAIRED_SPEED_RATIO = 0.95;

const VIEWPORT = Object.freeze({ width: 1440, height: 900, deviceScaleFactor: 1 });
const WARMUP_SECONDS = 5;
const MEASUREMENT_SECONDS = 15;
const OUTPUT_FILENAMES = Object.freeze({
  raw: 'water-weather-performance-raw.json',
  report: 'water-weather-performance-report.json',
});
const CANDIDATE_TOPOLOGY = Object.freeze({
  drawCalls: 8,
  drawCallsMax: 8,
  trianglesAvg: 61_972,
  textures: 1,
  geometries: 8,
  programs: 8,
});
const BASELINE_DRAW_CALLS = 21;
const FULL_STORM_QUERY = [
  ['v', '3'],
  ['weather', 'storm'],
  ['wind', '2.1'],
  ['rain', '0.74'],
  ['waveHeight', '1.08'],
  ['cloudCover', '0.78'],
  ['swell', '0.9'],
  ['chop', '0.82'],
  ['foam', '0.78'],
  ['clarity', '0.52'],
  ['surfaceDetail', '0.86'],
  ['currentDirection', '58'],
  ['currentStrength', '0.78'],
  ['skyTime', '0.24'],
  ['colorTemperature', '-0.22'],
  ['voxelColorVariance', '0.46'],
];
export const SCENARIOS = Object.freeze([
  Object.freeze({
    id: 'weather-only-storm',
    preset: 'weather-only storm endpoint',
    query: Object.freeze([['v', '3'], ['weather', 'storm']]),
  }),
  Object.freeze({
    id: 'full-storm',
    preset: 'full Storm stress',
    query: Object.freeze(FULL_STORM_QUERY),
  }),
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function normalizeBaseUrl(value, name) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be an absolute HTTP(S) URL; received "${value}".`);
  }
  assert(
    url.protocol === 'http:' || url.protocol === 'https:',
    `${name} must be an absolute HTTP(S) URL; received protocol "${url.protocol}".`,
  );
  assert(!url.search && !url.hash, `${name} must not contain a query or hash.`);
  return url.href.replace(/\/+$/, '');
}

export function parseWeatherPerformanceConfig(environment, argumentsList) {
  const requiredEnvironment = [
    'SHOWROOM_URL',
    'TELEMETRY_BASELINE_URL',
    'TELEMETRY_SOURCE_REVISION',
    'TELEMETRY_BASELINE_REVISION',
  ];
  const missing = requiredEnvironment.filter(
    (name) => typeof environment[name] !== 'string' || environment[name].trim() === '',
  );
  assert(
    missing.length === 0,
    `Missing required environment: ${missing.join(', ')}.`,
  );
  assert(
    argumentsList.length === 1 && argumentsList[0].trim() !== '',
    'Exactly one non-empty output directory argument is required.',
  );
  assert(
    environment.TELEMETRY_BASELINE_REVISION === BASELINE_REVISION,
    `TELEMETRY_BASELINE_REVISION must be the accepted T-VW-08 main revision ${BASELINE_REVISION}.`,
  );
  assert(
    /^[0-9a-f]{40}$/i.test(environment.TELEMETRY_SOURCE_REVISION),
    'TELEMETRY_SOURCE_REVISION must be the full 40-character candidate commit SHA.',
  );
  assert(
    environment.TELEMETRY_SOURCE_REVISION !== BASELINE_REVISION,
    'TELEMETRY_SOURCE_REVISION must differ from the accepted baseline revision.',
  );
  const candidateUrl = normalizeBaseUrl(environment.SHOWROOM_URL, 'SHOWROOM_URL');
  const baselineUrl = normalizeBaseUrl(
    environment.TELEMETRY_BASELINE_URL,
    'TELEMETRY_BASELINE_URL',
  );
  assert(candidateUrl !== baselineUrl, 'Candidate and baseline URLs must be distinct.');
  return {
    baselineRevision: BASELINE_REVISION,
    baselineUrl,
    candidateRevision: environment.TELEMETRY_SOURCE_REVISION.toLowerCase(),
    candidateUrl,
    outputDirectory: argumentsList[0],
  };
}

export function median(values) {
  assert(values.length > 0, 'Cannot calculate a median from an empty collection.');
  assert(values.every(Number.isFinite), 'Median inputs must all be finite numbers.');
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function scenarioHash(scenario) {
  return `#/room/voxel-water?${new URLSearchParams(scenario.query).toString()}`;
}

function scenarioUrl(baseUrl, scenario) {
  return `${baseUrl}/${scenarioHash(scenario)}`;
}

function assertFinitePositive(value, label) {
  assert(Number.isFinite(value) && value > 0, `${label} must be a finite positive number; received ${value}.`);
}

export function assertCandidateTopology(telemetry, scenarioId) {
  for (const [field, expected] of Object.entries(CANDIDATE_TOPOLOGY)) {
    assert(
      telemetry?.[field] === expected,
      `${scenarioId} candidate ${field} ${telemetry?.[field]} did not match ${expected}.`,
    );
  }
}

function assertBaselineTopology(telemetry, scenarioId) {
  assert(
    telemetry?.drawCalls === BASELINE_DRAW_CALLS
      && telemetry?.drawCallsMax === BASELINE_DRAW_CALLS,
    `${scenarioId} baseline calls ${telemetry?.drawCalls}/${telemetry?.drawCallsMax} `
      + `did not match revision ${BASELINE_REVISION} topology ${BASELINE_DRAW_CALLS}.`,
  );
  for (const field of ['trianglesAvg', 'textures', 'geometries', 'programs']) {
    assertFinitePositive(telemetry?.[field], `${scenarioId} baseline ${field}`);
  }
}

function assertScenarioState(state, scenario) {
  assert(state.hash === scenarioHash(scenario), `${scenario.id} loaded unexpected route ${state.hash}.`);
  assert(
    state.activeWeather.length === 1 && state.activeWeather[0] === 'storm',
    `${scenario.id} did not activate exactly the Storm weather endpoint.`,
  );
  assert(
    state.rangeControlCount === 15,
    `${scenario.id} exposed ${state.rangeControlCount} numeric controls instead of 15.`,
  );
}

function assertSwiftShader(telemetry, label) {
  const renderer = telemetry?.environment?.unmaskedRenderer;
  assert(
    telemetry?.environment?.classification === 'software'
      && typeof renderer === 'string'
      && renderer.toLowerCase().includes('swiftshader'),
    `${label} did not report a SwiftShader software renderer: ${renderer}.`,
  );
  return renderer;
}

async function readRuntimeState(page) {
  return page.evaluate(() => {
    const serialized = document
      .querySelector('[data-telemetry-json]')
      ?.getAttribute('data-telemetry-json');
    if (!serialized) throw new Error('Telemetry JSON is unavailable.');
    return {
      activeWeather: [...document.querySelectorAll('[data-testid^="voxel-water-weather-"]')]
        .filter((element) => element.classList.contains('active'))
        .map((element) => element.getAttribute('data-testid')?.replace('voxel-water-weather-', '')),
      hash: window.location.hash,
      rangeControlCount: document.querySelectorAll(
        '.inspector-controls input[type="range"]',
      ).length,
      telemetry: JSON.parse(serialized),
    };
  });
}

async function measurePage(browser, baseUrl, build, scenario) {
  const page = await browser.newPage({
    viewport: { width: VIEWPORT.width, height: VIEWPORT.height },
    deviceScaleFactor: VIEWPORT.deviceScaleFactor,
  });
  const browserErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => browserErrors.push(`pageerror: ${error.message}`));
  try {
    await page.goto(scenarioUrl(baseUrl, scenario), { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('canvas[data-renderer-host="shell"]', { timeout: 15_000 });
    await page.waitForSelector('[data-telemetry-state="live"]', { timeout: 15_000 });
    await page.waitForTimeout(WARMUP_SECONDS * 1000);
    const before = await readRuntimeState(page);
    assertScenarioState(before, scenario);
    const renderer = assertSwiftShader(before.telemetry, `${scenario.id} ${build}`);
    if (build === 'candidate') assertCandidateTopology(before.telemetry, scenario.id);
    else assertBaselineTopology(before.telemetry, scenario.id);

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
    const after = await readRuntimeState(page);
    assertScenarioState(after, scenario);
    assert(assertSwiftShader(after.telemetry, `${scenario.id} ${build}`) === renderer,
      `${scenario.id} ${build} renderer changed during measurement.`);
    if (build === 'candidate') assertCandidateTopology(after.telemetry, scenario.id);
    else assertBaselineTopology(after.telemetry, scenario.id);
    assertFinitePositive(cadence.fps, `${scenario.id} ${build} FPS`);
    assert(cadence.intervals > 0, `${scenario.id} ${build} recorded no frame intervals.`);
    assert(
      browserErrors.length === 0,
      `${scenario.id} ${build} emitted browser errors:\n${browserErrors.join('\n')}`,
    );
    return {
      build,
      browserErrors,
      cadence,
      renderer,
      state: after,
      url: scenarioUrl(baseUrl, scenario),
    };
  } finally {
    await page.close();
  }
}

export function summarizeScenario(id, pairs) {
  assert(pairs.length === PAIR_COUNT, `${id} must contain exactly ${PAIR_COUNT} pairs.`);
  const ratios = pairs.map(({ speedRatio }) => speedRatio);
  const candidateFpsMedian = median(pairs.map(({ candidate }) => candidate.cadence.fps));
  const pairedSpeedRatioMedian = median(ratios);
  return {
    id,
    baselineFpsMedian: median(pairs.map(({ baseline }) => baseline.cadence.fps)),
    candidateFpsMedian,
    pairedSpeedRatioMedian,
    pairedSpeedRatioMinimum: Math.min(...ratios),
    pairedSpeedRatioMaximum: Math.max(...ratios),
    gates: {
      absoluteFps: {
        actual: candidateFpsMedian,
        minimum: MINIMUM_ABSOLUTE_FPS,
        passed: candidateFpsMedian >= MINIMUM_ABSOLUTE_FPS,
      },
      pairedSpeedRatio: {
        actual: pairedSpeedRatioMedian,
        minimum: MINIMUM_PAIRED_SPEED_RATIO,
        passed: pairedSpeedRatioMedian >= MINIMUM_PAIRED_SPEED_RATIO,
      },
    },
  };
}

export function createPerformanceReport(raw) {
  const scenarios = raw.scenarios.map(({ id, pairs }) => summarizeScenario(id, pairs));
  const candidateFpsMedian = Math.min(...scenarios.map((scenario) => scenario.candidateFpsMedian));
  const pairedSpeedRatioMedian = Math.min(
    ...scenarios.map((scenario) => scenario.pairedSpeedRatioMedian),
  );
  const gates = {
    minimumScenarioCandidateFpsMedian: {
      actual: candidateFpsMedian,
      minimum: MINIMUM_ABSOLUTE_FPS,
      passed: candidateFpsMedian >= MINIMUM_ABSOLUTE_FPS,
    },
    minimumScenarioPairedSpeedRatioMedian: {
      actual: pairedSpeedRatioMedian,
      minimum: MINIMUM_PAIRED_SPEED_RATIO,
      passed: pairedSpeedRatioMedian >= MINIMUM_PAIRED_SPEED_RATIO,
    },
  };
  return {
    schemaVersion: 1,
    recordedAt: raw.recordedAt,
    pass: Object.values(gates).every(({ passed }) => passed)
      && scenarios.every((scenario) => Object.values(scenario.gates).every(({ passed }) => passed)),
    artifacts: raw.artifacts,
    builds: raw.builds,
    method: raw.method,
    candidateTopology: raw.candidateTopology,
    scenarios,
    gates,
  };
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function execute() {
  const cliArguments = process.argv.slice(2).filter((argument) => argument !== '--');
  const config = parseWeatherPerformanceConfig(process.env, cliArguments);
  await mkdir(config.outputDirectory, { recursive: true });
  const rawPath = `${config.outputDirectory}/${OUTPUT_FILENAMES.raw}`;
  const reportPath = `${config.outputDirectory}/${OUTPUT_FILENAMES.report}`;
  const raw = {
    schemaVersion: 1,
    recordedAt: new Date().toISOString(),
    comparison: 'T-VW-08 accepted main baseline vs T-VW-02 weather identity candidate',
    artifacts: { raw: rawPath, report: reportPath },
    builds: {
      baseline: { sourceRevision: config.baselineRevision, url: config.baselineUrl },
      candidate: { sourceRevision: config.candidateRevision, url: config.candidateUrl },
    },
    method: {
      pairsPerScenario: PAIR_COUNT,
      order: 'AB/BA interleaved and alternating in one SwiftShader browser process',
      warmupSeconds: WARMUP_SECONDS,
      measurementSeconds: MEASUREMENT_SECONDS,
      viewport: VIEWPORT,
      finalGateAggregation: 'minimum of the two scenario medians',
    },
    candidateTopology: CANDIDATE_TOPOLOGY,
    baselineDrawCalls: BASELINE_DRAW_CALLS,
    scenarios: SCENARIOS.map((scenario) => ({
      id: scenario.id,
      preset: scenario.preset,
      route: scenarioHash(scenario),
      pairs: [],
    })),
    failure: null,
  };
  const persistRaw = () => writeFile(rawPath, json(raw));
  await persistRaw();

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--use-gl=angle', '--use-angle=swiftshader'],
    });
    for (let scenarioIndex = 0; scenarioIndex < SCENARIOS.length; scenarioIndex += 1) {
      const scenario = SCENARIOS[scenarioIndex];
      const rawScenario = raw.scenarios[scenarioIndex];
      for (let pair = 1; pair <= PAIR_COUNT; pair += 1) {
        const candidateFirst = pair % 2 === 0;
        const first = candidateFirst
          ? await measurePage(browser, config.candidateUrl, 'candidate', scenario)
          : await measurePage(browser, config.baselineUrl, 'baseline', scenario);
        const second = candidateFirst
          ? await measurePage(browser, config.baselineUrl, 'baseline', scenario)
          : await measurePage(browser, config.candidateUrl, 'candidate', scenario);
        const candidate = candidateFirst ? first : second;
        const baseline = candidateFirst ? second : first;
        assert(
          candidate.renderer === baseline.renderer,
          `${scenario.id} pair ${pair} renderer mismatch: `
            + `${candidate.renderer} / ${baseline.renderer}.`,
        );
        rawScenario.pairs.push({
          pair,
          order: candidateFirst ? ['candidate', 'baseline'] : ['baseline', 'candidate'],
          baseline,
          candidate,
          speedRatio: candidate.cadence.fps / baseline.cadence.fps,
        });
        await persistRaw();
      }
    }
  } catch (error) {
    raw.failure = {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : 'Error',
      stack: error instanceof Error ? error.stack : null,
    };
    await persistRaw();
    await writeFile(reportPath, json({
      schemaVersion: 1,
      recordedAt: raw.recordedAt,
      pass: false,
      artifacts: raw.artifacts,
      builds: raw.builds,
      failure: raw.failure,
    }));
    throw error;
  } finally {
    await browser?.close();
  }

  const report = createPerformanceReport(raw);
  await writeFile(reportPath, json(report));
  console.log(json(report));
  if (!report.pass) {
    const failed = Object.entries(report.gates)
      .filter(([, gate]) => !gate.passed)
      .map(([name, gate]) => `${name}=${gate.actual}`);
    throw new Error(`Weather performance gates failed: ${failed.join(', ')}.`);
  }
}

const isMain = process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) await execute();
