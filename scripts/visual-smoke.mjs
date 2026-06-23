import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const outputDir = 'output/playwright';
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
  if (room === 'anime-liquid-orb') {
    await page.waitForSelector('iframe.embedded-exhibit-frame', { timeout: 10000 });
  }

  if (room === 'ninth-tide-archive') {
    await page.waitForSelector('iframe.embedded-exhibit-frame', { timeout: 10000 });
  }
}

const screenshots = [];
let hasHorizontalOverflow = false;
let hasStageHudOverlap = false;

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
  await page.waitForTimeout(1600);
  await updateStageHudOverlap();
  const screenshotPath = `${outputDir}/${room}-desktop.png`;
  await page.screenshot({
    path: screenshotPath,
    fullPage: false,
  });
  screenshots.push(screenshotPath);
}

await page.setViewportSize({ width: 390, height: 844 });
for (const room of mobileRooms) {
  await page.goto(`${baseUrl}/#/room/${room}`, { waitUntil: 'domcontentloaded' });
  await prepareRoom(room);
  await page.waitForTimeout(1400);
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
      screenshots,
      consoleErrors: 0,
      mobileHorizontalOverflow: false,
      sceneHudViewportOverlap: false,
    },
    null,
    2,
  ),
);
