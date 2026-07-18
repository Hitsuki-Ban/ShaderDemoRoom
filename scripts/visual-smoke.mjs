import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { luma, parsePng } from './water-qa-metrics.mjs';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const outputDir = 'output/playwright';
const stageProfileMetricsPath = `${outputDir}/ninth-tide-stage-profile-luma.json`;
const settleScaleSource = process.env.QA_SETTLE_SCALE ?? '1';
if (!/^(?:[1-9]\d*(?:\.\d+)?|0\.\d*[1-9]\d*)$/.test(settleScaleSource)) {
  throw new Error(
    `QA_SETTLE_SCALE must be a positive decimal number; received "${settleScaleSource}".`,
  );
}
const settleScale = Number(settleScaleSource);
if (!Number.isFinite(settleScale)) {
  throw new Error(
    `QA_SETTLE_SCALE must be finite; received "${settleScaleSource}".`,
  );
}
const desktopRooms = [
  'voxel-water',
  'glass-optics',
  'anime-liquid-orb',
  'ninth-tide-archive',
];
const mobileRooms = ['voxel-water', 'anime-liquid-orb', 'ninth-tide-archive'];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

const consoleErrors = [];
page.on('console', (message) => {
  if (message.type() === 'error') {
    consoleErrors.push(message.text());
  }
});
page.on('pageerror', (error) => consoleErrors.push(error.message));

async function prepareRoom(room) {
  if (room === 'anime-liquid-orb' || room === 'ninth-tide-archive') {
    await page.waitForSelector(
      'iframe.embedded-exhibit-frame[data-bridge-state="ready"]',
      { timeout: 15000 },
    );
    await page.waitForSelector(
      '[data-telemetry-source="embedded"] [data-telemetry-state="live"]',
      { timeout: 15000 },
    );
  }
}

async function assertTelemetry(room, mobile) {
  const result = await page.evaluate(({ embeddedRoom, mobileViewport }) => {
    const rail = document.querySelector('.scene-hud');
    const metrics = [...document.querySelectorAll('[data-metric]')];
    const visibleMetrics = metrics.filter(
      (metric) => getComputedStyle(metric).display !== 'none',
    );
    return {
      source: rail?.getAttribute('data-telemetry-source') ?? 'shader',
      state: rail?.querySelector('[data-telemetry-state]')?.getAttribute('data-telemetry-state'),
      hasDash: rail?.textContent?.includes('—') ?? false,
      metricCount: metrics.length,
      visibleMetricCount: visibleMetrics.length,
      expectedVisible: embeddedRoom || mobileViewport ? 2 : 5,
    };
  }, {
    embeddedRoom: room === 'anime-liquid-orb' || room === 'ninth-tide-archive',
    mobileViewport: mobile,
  });

  if (result.hasDash) {
    throw new Error(`${room} telemetry contains a broken-state dash.`);
  }
  const embedded = room === 'anime-liquid-orb' || room === 'ninth-tide-archive';
  if ((embedded ? 'embedded' : 'shader') !== result.source) {
    throw new Error(`${room} telemetry source is "${result.source}".`);
  }
  if (embedded && result.state !== 'live') {
    throw new Error(`${room} embedded telemetry state is "${result.state}".`);
  }
  if (result.visibleMetricCount !== result.expectedVisible) {
    throw new Error(
      `${room} exposes ${result.visibleMetricCount} telemetry cells; expected ${result.expectedVisible}.`,
    );
  }
}

async function assertStageProfile(room) {
  const expected = room === 'ninth-tide-archive' ? 'dim' : 'default';
  const actual = await page.locator('.showroom-shell').getAttribute('data-shell-chrome');
  if (actual !== expected) {
    throw new Error(
      `${room} exposes shell chrome profile "${actual}"; expected "${expected}".`,
    );
  }
}

function meanLuma(buffer) {
  const image = parsePng(buffer);
  let total = 0;
  const pixelCount = image.width * image.height;
  for (let index = 0; index < image.pixels.length; index += image.bytesPerPixel) {
    total += luma(
      image.pixels[index],
      image.pixels[index + 1],
      image.pixels[index + 2],
    );
  }
  return total / pixelCount;
}

async function setShellChrome(profile) {
  await page.locator('.showroom-shell').evaluate(
    (element, shellChrome) => {
      element.dataset.shellChrome = shellChrome;
      return new Promise((resolve) => requestAnimationFrame(() => resolve()));
    },
    profile,
  );
}

async function captureNinthTideStageProfile() {
  const regions = [
    { name: 'topbar', selector: '.topbar' },
    { name: 'room-rail', selector: '.room-rail' },
    { name: 'inspector', selector: '.inspector' },
  ];
  const captures = new Map();

  try {
    for (const profile of ['default', 'dim']) {
      await setShellChrome(profile);
      for (const region of regions) {
        const path = `${outputDir}/ninth-tide-${region.name}-${profile}.png`;
        const buffer = await page.locator(region.selector).screenshot({
          animations: 'disabled',
          path,
        });
        screenshots.push(path);
        captures.set(`${region.name}:${profile}`, {
          path,
          meanLuma: meanLuma(buffer),
        });
      }
    }
  } finally {
    await setShellChrome('dim');
  }

  const metrics = regions.map(({ name }) => {
    const defaultCapture = captures.get(`${name}:default`);
    const dimCapture = captures.get(`${name}:dim`);
    if (!defaultCapture || !dimCapture) {
      throw new Error(`Missing paired stage profile captures for ${name}.`);
    }
    const ratio = dimCapture.meanLuma / defaultCapture.meanLuma;
    return {
      region: name,
      default: {
        path: defaultCapture.path,
        meanLuma: defaultCapture.meanLuma,
      },
      dim: {
        path: dimCapture.path,
        meanLuma: dimCapture.meanLuma,
      },
      ratio,
      maximumRatio: 0.7,
    };
  });
  await writeFile(
    stageProfileMetricsPath,
    `${JSON.stringify(metrics, null, 2)}\n`,
  );
  console.log(
    JSON.stringify({ stageProfileMetricsPath, stageProfileMetrics: metrics }, null, 2),
  );

  const failedRegion = metrics.find(({ ratio, maximumRatio }) => ratio > maximumRatio);
  if (failedRegion) {
    throw new Error(
      `${failedRegion.region} dim/default mean luma ratio ${failedRegion.ratio.toFixed(3)} exceeds 0.700.`,
    );
  }
  return metrics;
}

const screenshots = [];
let stageProfileMetrics = [];
let hasHorizontalOverflow = false;
let hasStageHudOverlap = false;
let i18nIntegrity = null;

async function updateStageHudOverlap() {
  const overlapsViewport = await page.evaluate(() => {
    const viewport = document.querySelector('.stage-viewport');
    const hud = document.querySelector('.scene-hud');

    if (!viewport || !hud) {
      return true;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const hudRect = hud.getBoundingClientRect();

    return hudRect.top < viewportRect.bottom && hudRect.bottom > viewportRect.top;
  });

  hasStageHudOverlap = hasStageHudOverlap || overlapsViewport;
}

for (const room of desktopRooms) {
  await page.goto(`${baseUrl}/#/room/${room}`, { waitUntil: 'domcontentloaded' });
  await prepareRoom(room);
  await page.waitForTimeout(Math.round(1600 * settleScale));
  await assertStageProfile(room);
  await assertTelemetry(room, false);
  await updateStageHudOverlap();
  const screenshotPath = `${outputDir}/${room}-desktop.png`;
  await page.screenshot({
    path: screenshotPath,
    fullPage: false,
  });
  screenshots.push(screenshotPath);
  if (room === 'ninth-tide-archive') {
    stageProfileMetrics = await captureNinthTideStageProfile();
  }
}

await page.setViewportSize({ width: 390, height: 844 });
for (const room of mobileRooms) {
  await page.goto(`${baseUrl}/#/room/${room}`, { waitUntil: 'domcontentloaded' });
  await prepareRoom(room);
  await page.waitForTimeout(Math.round(1400 * settleScale));
  await assertTelemetry(room, true);
  await updateStageHudOverlap();
  const screenshotPath = `${outputDir}/${room}-mobile.png`;
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });
  screenshots.push(screenshotPath);
  const roomHasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  hasHorizontalOverflow = hasHorizontalOverflow || roomHasHorizontalOverflow;
}

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${baseUrl}/#/room/voxel-water`, { waitUntil: 'domcontentloaded' });
await page.locator('.language-select select').selectOption('zh-CN');
await page.getByTestId('voxel-water-preset-storm').waitFor();
await page.waitForFunction(
  () => document.querySelector('.shader-canvas')?.getAttribute('aria-label') === '体素水体'
    && document.querySelector('[data-testid="voxel-water-preset-storm"]')?.textContent?.trim() === '风暴预设',
);
await page.reload({ waitUntil: 'domcontentloaded' });
await page.getByTestId('voxel-water-preset-storm').waitFor();

const shaderLocaleState = await page.evaluate(() => ({
  canvasLabel: document.querySelector('.shader-canvas')?.getAttribute('aria-label'),
  documentLanguage: document.documentElement.lang,
  locale: document.querySelector('.language-select select')?.value,
  stormLabel: document.querySelector('[data-testid="voxel-water-preset-storm"]')?.textContent?.trim(),
  telemetryTitle: document.querySelector('[data-renderer-class]')?.getAttribute('title'),
}));
if (
  shaderLocaleState.locale !== 'zh-CN'
  || shaderLocaleState.documentLanguage !== 'zh-CN'
  || shaderLocaleState.canvasLabel !== '体素水体'
  || shaderLocaleState.stormLabel !== '风暴预设'
) {
  throw new Error(`Persisted shader locale contract failed: ${JSON.stringify(shaderLocaleState)}`);
}
if (
  shaderLocaleState.telemetryTitle
  && /marker matched|unmasked renderer unavailable|renderer identity did not match/i.test(
    shaderLocaleState.telemetryTitle,
  )
) {
  throw new Error(`Renderer diagnostic leaked into localized UI: ${shaderLocaleState.telemetryTitle}`);
}

await page.goto(`${baseUrl}/#/room/ninth-tide-archive`, { waitUntil: 'domcontentloaded' });
const localizedFrame = page.locator('iframe.embedded-exhibit-frame');
await localizedFrame.waitFor({ timeout: 10000 });
await localizedFrame.evaluate((frame) => {
  frame.dataset.i18nInstance = 'preserved';
});
await page.locator('.language-select select').selectOption('en');
await page.waitForFunction(
  () => document.querySelector('iframe.embedded-exhibit-frame')?.getAttribute('title') === 'Ninth Tide Archive',
);
await page.locator('.language-select select').selectOption('zh-CN');
await page.waitForFunction(
  () => document.querySelector('iframe.embedded-exhibit-frame')?.getAttribute('title') === '第九潮汐档案馆',
);
const iframeTitle = await localizedFrame.getAttribute('title');
if (iframeTitle !== '第九潮汐档案馆') {
  throw new Error(`Localized iframe title is "${iframeTitle}"; expected "第九潮汐档案馆".`);
}
const iframeInstancePreserved = await localizedFrame.getAttribute('data-i18n-instance');
if (iframeInstancePreserved !== 'preserved') {
  throw new Error('Locale switching remounted the embedded exhibit iframe.');
}
const i18nScreenshotPath = `${outputDir}/voxel-water-zh-CN-persisted.png`;
await page.goto(`${baseUrl}/#/room/voxel-water`, { waitUntil: 'domcontentloaded' });
await page.getByTestId('voxel-water-preset-storm').waitFor();
await page.screenshot({ path: i18nScreenshotPath, fullPage: false });
screenshots.push(i18nScreenshotPath);
i18nIntegrity = {
  locale: shaderLocaleState.locale,
  documentLanguage: shaderLocaleState.documentLanguage,
  canvasLabel: shaderLocaleState.canvasLabel,
  stormLabel: shaderLocaleState.stormLabel,
  iframeTitle,
  iframeInstancePreserved: true,
  persistedAcrossReload: true,
};

await browser.close();

if (consoleErrors.length > 0) {
  throw new Error(`Console errors found:\n${consoleErrors.join('\n')}`);
}

if (hasHorizontalOverflow) {
  throw new Error('Mobile viewport has horizontal overflow.');
}

if (hasStageHudOverlap) {
  throw new Error('Scene HUD overlaps the rendered exhibit viewport.');
}

console.log(
  JSON.stringify(
    {
      baseUrl,
      settleScale,
      screenshots,
      stageProfileMetricsPath,
      stageProfileMetrics,
      i18nIntegrity,
      consoleErrors: 0,
      mobileHorizontalOverflow: false,
      sceneHudViewportOverlap: false,
    },
    null,
    2,
  ),
);
