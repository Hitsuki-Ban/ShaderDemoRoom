import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import {
  compareFrames,
  parsePng,
  summarize,
} from './water-qa-metrics.mjs';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const outputDir = 'output/motion-qa';
const frameCount = 10;
const frameDelayMs = 120;
const sampleScale = 4;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') {
    errors.push(message.text());
  }
});
page.on('pageerror', (error) => errors.push(error.message));

async function captureMotion(reducedMotion) {
  await page.emulateMedia({ reducedMotion });
  await page.waitForTimeout(600);
  const frames = [];
  const canvasShell = page.locator('.canvas-shell');
  for (let index = 0; index < frameCount; index += 1) {
    await page.waitForTimeout(frameDelayMs);
    const screenshot = await canvasShell.screenshot();
    if (index === 0) {
      await writeFile(`${outputDir}/${reducedMotion}.png`, screenshot);
    }
    frames.push(parsePng(screenshot));
  }
  const diffs = [];
  for (let index = 1; index < frames.length; index += 1) {
    diffs.push(compareFrames(frames[index - 1], frames[index], sampleScale));
  }
  return {
    meanDelta: Number(summarize(diffs, 'meanDelta').toFixed(3)),
    strongRatio: Number(summarize(diffs, 'strongRatio').toFixed(5)),
  };
}

try {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(`${baseUrl}/#/room/voxel-water`, { waitUntil: 'load' });
  await page.locator('.shader-canvas').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('.canvas-loader').waitFor({ state: 'detached', timeout: 15000 });
  await page.waitForTimeout(1200);

  const normal = await captureMotion('no-preference');
  const reduced = await captureMotion('reduce');
  const result = {
    baseUrl,
    frameCount,
    frameDelayMs,
    normal,
    reduced,
    ratios: {
      meanDelta: Number((reduced.meanDelta / normal.meanDelta).toFixed(3)),
      strongRatio: Number((reduced.strongRatio / normal.strongRatio).toFixed(3)),
    },
  };

  assert(errors.length === 0, `Browser errors:\n${errors.join('\n')}`);
  assert(
    normal.meanDelta >= 1 && normal.strongRatio >= 0.005,
    `The normal-motion baseline was too static to compare: ${JSON.stringify(result)}.`,
  );
  assert(
    reduced.meanDelta <= normal.meanDelta * 0.35,
    `Reduced-motion meanDelta exceeded 35% of normal: ${JSON.stringify(result)}.`,
  );
  assert(
    reduced.strongRatio <= normal.strongRatio * 0.25,
    `Reduced-motion strongRatio exceeded 25% of normal: ${JSON.stringify(result)}.`,
  );

  await writeFile(`${outputDir}/motion-qa.json`, `${JSON.stringify(result, null, 2)}\n`);
  console.log(JSON.stringify(result, null, 2));
} finally {
  await page.close();
  await browser.close();
}
