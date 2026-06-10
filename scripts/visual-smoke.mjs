import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173';
const outputDir = 'output/playwright';
const rooms = ['voxel-water', 'glass-optics'];

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

for (const room of rooms) {
  await page.goto(`${baseUrl}/#/room/${room}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: `${outputDir}/${room}-desktop.png`,
    fullPage: false,
  });
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${baseUrl}/#/room/voxel-water`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({
  path: `${outputDir}/voxel-water-mobile.png`,
  fullPage: true,
});

const hasHorizontalOverflow = await page.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
);

await browser.close();

if (consoleErrors.length > 0) {
  throw new Error(`Console errors found:\n${consoleErrors.join('\n')}`);
}

if (hasHorizontalOverflow) {
  throw new Error('Mobile viewport has horizontal overflow.');
}

console.log(
  JSON.stringify(
    {
      baseUrl,
      screenshots: [
        `${outputDir}/voxel-water-desktop.png`,
        `${outputDir}/glass-optics-desktop.png`,
        `${outputDir}/voxel-water-mobile.png`,
      ],
      consoleErrors: 0,
      mobileHorizontalOverflow: false,
    },
    null,
    2,
  ),
);
