import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import {
  compareFrames,
  parsePng,
  regionMetrics,
  summarize,
} from './water-qa-metrics.mjs';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const label = process.env.QA_LABEL ?? 'water';
const outputDir = process.env.QA_OUTPUT_DIR ?? 'output/water-qa';
const frameCount = Number(process.env.QA_FRAMES ?? 8);
const frameDelayMs = Number(process.env.QA_FRAME_DELAY_MS ?? 120);
const sampleScale = Number(process.env.QA_SAMPLE_SCALE ?? 4);
const viewportWidth = Number(process.env.QA_VIEWPORT_WIDTH ?? 1440);
const viewportHeight = Number(process.env.QA_VIEWPORT_HEIGHT ?? 900);
const preset = process.env.QA_PRESET ?? 'default';
const locale = process.env.QA_LOCALE ?? 'en';
const reducedMotion = process.env.QA_REDUCED_MOTION ?? 'no-preference';

if (!['en', 'zh-CN'].includes(locale)) {
  throw new Error(`QA_LOCALE must be "en" or "zh-CN"; received "${locale}".`);
}
if (!['no-preference', 'reduce'].includes(reducedMotion)) {
  throw new Error(
    `QA_REDUCED_MOTION must be "no-preference" or "reduce"; received "${reducedMotion}".`,
  );
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: viewportWidth, height: viewportHeight },
  deviceScaleFactor: 1,
  reducedMotion,
});

const consoleErrors = [];
page.on('console', (message) => {
  if (message.type() === 'error') {
    consoleErrors.push(message.text());
  }
});
page.on('pageerror', (error) => consoleErrors.push(error.message));

await page.goto(`${baseUrl}/#/room/voxel-water`, { waitUntil: 'load' });
await page.locator('.shader-canvas').waitFor({ state: 'visible', timeout: 10000 });
await page.locator('.language-select select').selectOption(locale);
if (preset === 'storm') {
  await page.getByTestId('voxel-water-preset-storm').click();
} else if (preset === 'calm') {
  await page.getByTestId('voxel-water-preset-calm').click();
} else if (preset === 'rain') {
  await page.getByTestId('voxel-water-weather-rain').click();
}
await page.waitForTimeout(1200);

const canvasShell = page.locator('.canvas-shell');
const frames = [];
for (let i = 0; i < frameCount; i += 1) {
  await page.waitForTimeout(frameDelayMs);
  const screenshot = await canvasShell.screenshot();
  if (i === 0) {
    await writeFile(`${outputDir}/${label}-canvas.png`, screenshot);
  }
  frames.push(parsePng(screenshot));
}

const fullPagePath = `${outputDir}/${label}-page.png`;
await page.screenshot({ path: fullPagePath, fullPage: false });

await browser.close();

if (consoleErrors.length > 0) {
  throw new Error(`Console errors found:\n${consoleErrors.join('\n')}`);
}

const diffs = [];
for (let i = 1; i < frames.length; i += 1) {
  diffs.push(compareFrames(frames[i - 1], frames[i], sampleScale));
}

const regions = regionMetrics(frames[0], sampleScale);

const result = {
  baseUrl,
  label,
  preset,
  reducedMotion,
  screenshots: {
    page: fullPagePath,
    canvas: `${outputDir}/${label}-canvas.png`,
  },
  canvas: {
    width: frames[0].width,
    height: frames[0].height,
  },
  frameCount,
  frameDelayMs,
  sampleScale,
  meanDelta: Number(summarize(diffs, 'meanDelta').toFixed(3)),
  strongRatio: Number(summarize(diffs, 'strongRatio').toFixed(5)),
  maxDelta: Number(summarize(diffs, 'maxDelta').toFixed(1)),
  regionMetrics: regions,
  waterCoverage: regions.water.waterCoverage,
  waterLuma: regions.water.waterLuma,
  waterSaturationRange: regions.water.waterSaturationRange,
  toonBandSeparation: regions.water.toonBandSeparation,
  hueMean: regions.water.hueMean,
  colorSignature: regions.water.colorSignature,
  weatherSeparation: {
    preset,
    waterHue: regions.water.hueMean,
    skyHue: regions.sky.colorSignature.hueMean,
    cyanBias: regions.water.colorSignature.cyanBias,
    warmCoolBias: regions.water.colorSignature.warmCoolBias,
  },
  skyLuma: regions.sky.skyLuma,
  voxelLocalContrast: regions.water.voxelLocalContrast,
  diffs: diffs.map((diff) => ({
    meanDelta: Number(diff.meanDelta.toFixed(3)),
    strongRatio: Number(diff.strongRatio.toFixed(5)),
    maxDelta: Number(diff.maxDelta.toFixed(1)),
  })),
};

const report = `${JSON.stringify(result, null, 2)}\n`;
await writeFile(`${outputDir}/${label}-report.json`, report);
console.log(report);
