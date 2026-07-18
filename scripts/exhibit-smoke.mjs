import { chromium } from 'playwright';

const baseUrl =
  process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const consoleErrors = [];

page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => consoleErrors.push(error.message));

const tideSections = [];
const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

for (let section = 0; section < roman.length; section += 1) {
  const url = `${baseUrl}/exhibits/ninth-tide-archive/index.html?preview=main&section=${section}`;
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator('#phaseNumber').waitFor({ state: 'visible' });
  await page.waitForFunction(
    (expected) => document.querySelector('#phaseNumber')?.textContent === expected,
    roman[section],
  );

  tideSections.push({
    section,
    phase: await page.locator('#phaseNumber').textContent(),
    canvasCount: await page.locator('canvas').count(),
  });
}

await page.goto(`${baseUrl}/exhibits/anime-liquid-orb/index.html`, {
  waitUntil: 'domcontentloaded',
});
await page.locator('#loading.is-hidden').waitFor({ state: 'attached' });

const orbModes = [];
for (let mode = 1; mode <= 4; mode += 1) {
  await page.keyboard.press(`Digit${mode}`);
  const activeButton = page.locator(`.mode-btn[data-mode="${mode - 1}"]`);
  await activeButton.waitFor({ state: 'visible' });
  await page.waitForFunction(
    (index) =>
      document
        .querySelector(`.mode-btn[data-mode="${index}"]`)
        ?.classList.contains('is-active') === true,
    mode - 1,
  );
  orbModes.push((await page.locator('#state-name').textContent())?.trim());
}

const canvas = page.locator('#scene');
const bounds = await canvas.boundingBox();
if (!bounds) throw new Error('Orb canvas has no layout box.');
const center = {
  x: bounds.x + bounds.width / 2,
  y: bounds.y + bounds.height / 2,
};

await page.mouse.dblclick(center.x, center.y);
await page.waitForFunction(
  () => document.querySelector('#matter-state')?.textContent === 'CRYSTAL',
);
await page.mouse.dblclick(center.x, center.y);
await page.waitForFunction(
  () => document.querySelector('#matter-state')?.textContent === 'LIQUID',
);

await browser.close();

if (tideSections.some(({ canvasCount }) => canvasCount !== 1)) {
  throw new Error(`Unexpected Tide canvas counts: ${JSON.stringify(tideSections)}`);
}
if (consoleErrors.length > 0) {
  throw new Error(`Exhibit console errors:\n${consoleErrors.join('\n')}`);
}

console.log(
  JSON.stringify(
    {
      baseUrl,
      tideSections,
      orbModes,
      orbFreezeCycle: ['LIQUID', 'CRYSTAL', 'LIQUID'],
      consoleErrors: consoleErrors.length,
    },
    null,
    2,
  ),
);
