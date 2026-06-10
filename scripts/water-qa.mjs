import { mkdir, writeFile } from 'node:fs/promises';
import { inflateSync } from 'node:zlib';
import { chromium } from 'playwright';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173';
const label = process.env.QA_LABEL ?? 'water';
const outputDir = process.env.QA_OUTPUT_DIR ?? 'output/water-qa';
const frameCount = Number(process.env.QA_FRAMES ?? 8);
const frameDelayMs = Number(process.env.QA_FRAME_DELAY_MS ?? 120);
const sampleScale = Number(process.env.QA_SAMPLE_SCALE ?? 4);

function parsePng(buffer) {
  if (buffer[0] !== 137 || buffer[1] !== 80) {
    throw new Error('Expected a PNG screenshot.');
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    offset += 4;
    const type = buffer.subarray(offset, offset + 4).toString('ascii');
    offset += 4;
    const data = buffer.subarray(offset, offset + length);
    offset += length + 4;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }

  if (bitDepth !== 8 || ![2, 6].includes(colorType)) {
    throw new Error(`Unsupported PNG format ${bitDepth}/${colorType}.`);
  }

  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const stride = width * bytesPerPixel;
  const raw = inflateSync(Buffer.concat(idat));
  const pixels = Buffer.alloc(width * height * bytesPerPixel);
  let source = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = raw[source];
    source += 1;
    const row = pixels.subarray(y * stride, (y + 1) * stride);
    const previousRow = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x += 1) {
      const value = raw[source];
      source += 1;
      const left = x >= bytesPerPixel ? row[x - bytesPerPixel] : 0;
      const up = previousRow ? previousRow[x] : 0;
      const upLeft = previousRow && x >= bytesPerPixel ? previousRow[x - bytesPerPixel] : 0;
      let reconstructed = value;

      if (filter === 1) {
        reconstructed += left;
      } else if (filter === 2) {
        reconstructed += up;
      } else if (filter === 3) {
        reconstructed += Math.floor((left + up) / 2);
      } else if (filter === 4) {
        const predictor = left + up - upLeft;
        const leftDistance = Math.abs(predictor - left);
        const upDistance = Math.abs(predictor - up);
        const upLeftDistance = Math.abs(predictor - upLeft);
        reconstructed += leftDistance <= upDistance && leftDistance <= upLeftDistance
          ? left
          : upDistance <= upLeftDistance
            ? up
            : upLeft;
      } else if (filter !== 0) {
        throw new Error(`Unsupported PNG filter ${filter}.`);
      }

      row[x] = reconstructed & 255;
    }
  }

  return { width, height, bytesPerPixel, pixels };
}

function compareFrames(previous, next) {
  let total = 0;
  let strong = 0;
  let max = 0;
  let count = 0;

  for (let y = 0; y < previous.height; y += sampleScale) {
    for (let x = 0; x < previous.width; x += sampleScale) {
      const index = (y * previous.width + x) * previous.bytesPerPixel;
      const delta = (
        Math.abs(previous.pixels[index] - next.pixels[index]) +
        Math.abs(previous.pixels[index + 1] - next.pixels[index + 1]) +
        Math.abs(previous.pixels[index + 2] - next.pixels[index + 2])
      ) / 3;

      total += delta;
      if (delta > 28) {
        strong += 1;
      }
      if (delta > max) {
        max = delta;
      }
      count += 1;
    }
  }

  return {
    meanDelta: total / count,
    strongRatio: strong / count,
    maxDelta: max,
  };
}

function summarize(diffs, key) {
  return diffs.reduce((sum, diff) => sum + diff[key], 0) / diffs.length;
}

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

await page.goto(`${baseUrl}/#/room/voxel-water`, { waitUntil: 'load' });
await page.locator('.shader-canvas').waitFor({ state: 'visible', timeout: 10000 });
await page.waitForTimeout(1200);

const fullPagePath = `${outputDir}/${label}-page.png`;
await page.screenshot({ path: fullPagePath, fullPage: false });

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

await browser.close();

if (consoleErrors.length > 0) {
  throw new Error(`Console errors found:\n${consoleErrors.join('\n')}`);
}

const diffs = [];
for (let i = 1; i < frames.length; i += 1) {
  diffs.push(compareFrames(frames[i - 1], frames[i]));
}

const result = {
  baseUrl,
  label,
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
  diffs: diffs.map((diff) => ({
    meanDelta: Number(diff.meanDelta.toFixed(3)),
    strongRatio: Number(diff.strongRatio.toFixed(5)),
    maxDelta: Number(diff.maxDelta.toFixed(1)),
  })),
};

console.log(JSON.stringify(result, null, 2));
