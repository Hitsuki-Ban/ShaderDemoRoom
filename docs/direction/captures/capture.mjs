import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const outputDir = 'F:/WorkSpace/ShaderDemoRoom/docs/direction/captures';

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

const consoleErrors = [];
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});
page.on('pageerror', (e) => consoleErrors.push(e.message));

// --- 1) Ninth Tide: per-chapter captures via the documented preview hook ---
const tideShots = [];
const tideUrl = (query) =>
  `${baseUrl}/exhibits/ninth-tide-archive/index.html?${query}`;

const tideTargets = [
  { name: 'ninth-tide-opening', query: 'preview=opening' },
  ...Array.from({ length: 9 }, (_, i) => ({
    name: `ninth-tide-ch${i + 1}`,
    query: `preview=main&section=${i}`,
  })),
  { name: 'ninth-tide-ending', query: 'preview=ending' },
];

for (const t of tideTargets) {
  await page.goto(tideUrl(t.query), { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4500);
  const path = `${outputDir}/${t.name}.png`;
  await page.screenshot({ path, fullPage: false });
  tideShots.push(path);
}

// --- 2) FPS chip evidence: sample the scene HUD text for both shader rooms ---
const fpsSamples = {};
for (const room of ['voxel-water', 'glass-optics']) {
  await page.goto(`${baseUrl}/#/room/${room}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  const samples = [];
  for (let i = 0; i < 8; i++) {
    await page.waitForTimeout(1000);
    const hud = await page.evaluate(
      () => document.querySelector('.scene-hud')?.textContent ?? '(no hud)',
    );
    samples.push(hud.trim().replace(/\s+/g, ' '));
  }
  fpsSamples[room] = samples;
  await page.screenshot({ path: `${outputDir}/${room}-hud-evidence.png`, fullPage: false });
}

await browser.close();

console.log(
  JSON.stringify({ tideShots, fpsSamples, consoleErrors }, null, 2),
);
