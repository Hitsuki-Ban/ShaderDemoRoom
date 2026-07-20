import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import {
  compareFrames,
  measureRegion,
  parsePng,
} from './water-qa-metrics.mjs';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const outputDirectory = process.env.GLASS_QA_OUTPUT ?? 'output/glass-qa';
const allocationNamesAreReadable = process.env.GLASS_QA_ALLOCATION_NAMES === 'readable';

const states = [
  ['default', { autoRotate: 'false', v: '2' }],
  ['focus', {
    autoRotate: 'false',
    beamSpread: '0.18',
    lightX: '-0.28',
    lightY: '3.45',
    lightZ: '1.45',
    v: '2',
  }],
  ['crystal', {
    autoRotate: 'false',
    ior: '1.72',
    roughness: '0.01',
    thickness: '1.8',
    v: '2',
  }],
  ['extreme', {
    autoRotate: 'false',
    lightX: '-6',
    lightY: '2.61',
    lightZ: '-6',
    v: '2',
  }],
  ['ior-1', { autoRotate: 'false', ior: '1', v: '2' }],
  ['ior-2-4', { autoRotate: 'false', ior: '2.4', v: '2' }],
  ['thickness-0-2', { autoRotate: 'false', thickness: '0.2', v: '2' }],
  ['thickness-2-4', { autoRotate: 'false', thickness: '2.4', v: '2' }],
];

const canvasSelector = 'canvas[data-renderer-host="shell"]';
const stageRegions = {
  background: { x0: 0.03, x1: 0.7, y0: 0.03, y1: 0.24 },
  caustics: { x0: 0.16, x1: 0.38, y0: 0.48, y1: 0.66 },
  floor: { x0: 0.03, x1: 0.95, y0: 0.72, y1: 0.94 },
  grid: { x0: 0.38, x1: 0.58, y0: 0.72, y1: 0.9 },
  hero: { x0: 0.27, x1: 0.7, y0: 0.27, y1: 0.66 },
  lowerLeft: { x0: 0.03, x1: 0.28, y0: 0.55, y1: 0.91 },
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function roomUrl(parameters) {
  return `${baseUrl}/#/room/glass-optics?${new URLSearchParams(parameters)}`;
}

function measureLumaBand(frame, region, sampleScale = 2) {
  const x0 = Math.floor(region.x0 * frame.width);
  const x1 = Math.floor(region.x1 * frame.width);
  const y0 = Math.floor(region.y0 * frame.height);
  const y1 = Math.floor(region.y1 * frame.height);
  const values = [];
  let brightClipped = 0;
  let blackClipped = 0;
  let highlighted = 0;

  for (let y = y0; y < y1; y += sampleScale) {
    for (let x = x0; x < x1; x += sampleScale) {
      const index = (y * frame.width + x) * frame.bytesPerPixel;
      const red = frame.pixels[index];
      const green = frame.pixels[index + 1];
      const blue = frame.pixels[index + 2];
      const pixelLuma = red * 0.2126 + green * 0.7152 + blue * 0.0722;
      values.push(pixelLuma);
      if (pixelLuma > 20) highlighted += 1;
      if (red >= 250 && green >= 250 && blue >= 250) brightClipped += 1;
      if (red <= 1 && green <= 1 && blue <= 1) blackClipped += 1;
    }
  }

  values.sort((left, right) => left - right);
  const percentile = (ratio) => values[Math.floor(values.length * ratio)] ?? 0;
  return {
    mean: values.reduce((sum, value) => sum + value, 0) / values.length,
    p50: percentile(0.5),
    p90: percentile(0.9),
    p95: percentile(0.95),
    p99: percentile(0.99),
    max: values.at(-1) ?? 0,
    brightClipRatio: brightClipped / values.length,
    blackClipRatio: blackClipped / values.length,
    highlightCoverage: highlighted / values.length,
  };
}

function measureStage(frame, sampleScale = 2) {
  return Object.fromEntries(Object.entries(stageRegions).map(([name, region]) => [
    name,
    {
      ...measureLumaBand(frame, region, sampleScale),
      localContrast: measureRegion(frame, region, sampleScale).voxelLocalContrast,
    },
  ]));
}

function measureGlassDisc(frame, sampleScale = 2) {
  const values = [];
  let brightClipped = 0;
  let blackClipped = 0;
  let contrastTotal = 0;

  for (let y = 0; y < frame.height; y += sampleScale) {
    for (let x = 0; x < frame.width; x += sampleScale) {
      const normalizedX = x / frame.width;
      const normalizedY = y / frame.height;
      const discX = (normalizedX - 0.498) / 0.17;
      const discY = (normalizedY - 0.482) / 0.198;
      const discRadius = Math.hypot(discX, discY);
      const beamDistance = Math.abs(normalizedY - (-1.41 * normalizedX + 1.225));
      if (discRadius < 0.2 || discRadius > 0.82 || beamDistance < 0.038) continue;

      const index = (y * frame.width + x) * frame.bytesPerPixel;
      const red = frame.pixels[index];
      const green = frame.pixels[index + 1];
      const blue = frame.pixels[index + 2];
      values.push(red * 0.2126 + green * 0.7152 + blue * 0.0722);
      if (red >= 250 && green >= 250 && blue >= 250) brightClipped += 1;
      if (red <= 1 && green <= 1 && blue <= 1) blackClipped += 1;

      const nextX = Math.min(frame.width - 1, x + sampleScale);
      const nextY = Math.min(frame.height - 1, y + sampleScale);
      const nextIndex = (nextY * frame.width + nextX) * frame.bytesPerPixel;
      contrastTotal += (
        Math.abs(red - frame.pixels[nextIndex])
        + Math.abs(green - frame.pixels[nextIndex + 1])
        + Math.abs(blue - frame.pixels[nextIndex + 2])
      ) / 3;
    }
  }

  values.sort((left, right) => left - right);
  const percentile = (ratio) => values[Math.floor(values.length * ratio)] ?? 0;
  return {
    samples: values.length,
    p50: percentile(0.5),
    p90: percentile(0.9),
    p95: percentile(0.95),
    p99: percentile(0.99),
    brightClipRatio: brightClipped / values.length,
    blackClipRatio: blackClipped / values.length,
    localContrast: contrastTotal / values.length,
  };
}

function downsampleFrame(frame, scale) {
  const width = Math.floor(frame.width / scale);
  const height = Math.floor(frame.height / scale);
  const pixels = Buffer.alloc(width * height * frame.bytesPerPixel);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      for (let channel = 0; channel < frame.bytesPerPixel; channel += 1) {
        let total = 0;
        for (let offsetY = 0; offsetY < scale; offsetY += 1) {
          for (let offsetX = 0; offsetX < scale; offsetX += 1) {
            const sourceX = x * scale + offsetX;
            const sourceY = y * scale + offsetY;
            const sourceIndex = (
              sourceY * frame.width + sourceX
            ) * frame.bytesPerPixel + channel;
            total += frame.pixels[sourceIndex];
          }
        }
        pixels[(y * width + x) * frame.bytesPerPixel + channel] = Math.round(
          total / (scale * scale),
        );
      }
    }
  }

  return { width, height, bytesPerPixel: frame.bytesPerPixel, pixels };
}

async function captureTimedCanvas(page, path, delay) {
  await page.waitForTimeout(delay);
  return page.locator(canvasSelector).screenshot({ path });
}

async function verifyStaticPair(page, name, reducedMotion) {
  await page.emulateMedia({ reducedMotion });
  await page.goto(roomUrl({ autoRotate: 'false', v: '2' }), {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector(canvasSelector);
  const firstPath = `${outputDirectory}/${name}-1s.png`;
  const secondPath = `${outputDirectory}/${name}-11s.png`;
  const first = parsePng(await captureTimedCanvas(page, firstPath, 1000));
  const second = parsePng(await captureTimedCanvas(page, secondPath, 10_000));
  const diff = compareFrames(first, second, 1);
  assert(
    diff.meanDelta === 0 && diff.maxDelta === 0,
    `${name} autoRotate=false frames were not pixel-identical: ${JSON.stringify(diff)}.`,
  );
  return { reducedMotion, firstPath, secondPath, diff };
}

function collectAllocationNodes(node, output = []) {
  if (node.selfSize > 0) output.push({
    functionName: node.callFrame.functionName,
    scriptId: node.callFrame.scriptId,
    url: node.callFrame.url,
    lineNumber: node.callFrame.lineNumber,
    columnNumber: node.callFrame.columnNumber,
    selfSize: node.selfSize,
  });
  for (const child of node.children ?? []) collectAllocationNodes(child, output);
  return output;
}

async function waitForLiveTelemetry(page) {
  await page.waitForSelector('[data-telemetry-json]');
  await page.waitForFunction(() => {
    const serialized = document
      .querySelector('[data-telemetry-json]')
      ?.getAttribute('data-telemetry-json');
    return serialized && JSON.parse(serialized).sampleState === 'live';
  }, undefined, { timeout: 20_000 });
  await page.waitForTimeout(2500);
  return page.evaluate(() => JSON.parse(
    document
      .querySelector('[data-telemetry-json]')
      .getAttribute('data-telemetry-json'),
  ));
}

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader'],
});

try {
  assert(
    allocationNamesAreReadable,
    'qa:glass requires its unminified runner so allocation constructor names remain readable.',
  );
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('favicon.ico')) {
      errors.push(message.text());
    }
  });

  const captures = [];
  for (const [name, parameters] of states) {
    await page.goto(roomUrl(parameters), { waitUntil: 'domcontentloaded' });
    const telemetry = await waitForLiveTelemetry(page);
    assert(telemetry.drawCalls === 16, `${name} rendered ${telemetry.drawCalls} calls instead of 16.`);
    const screenshot = `${outputDirectory}/${name}.png`;
    await page.screenshot({ path: screenshot });
    const canvasScreenshot = `${outputDirectory}/${name}-canvas.png`;
    const frame = parsePng(
      await page.locator(canvasSelector).screenshot({ path: canvasScreenshot }),
    );
    const thumbnailFrame = downsampleFrame(frame, 4);
    const stageMetrics = measureStage(frame);
    captures.push({
      name,
      parameters,
      screenshot,
      canvasScreenshot,
      glassDiscMetrics: measureGlassDisc(frame),
      stageMetrics,
      thumbnailMetrics: {
        scale: 0.25,
        glassDisc: measureGlassDisc(thumbnailFrame, 1),
        stage: measureStage(thumbnailFrame, 1),
      },
      telemetry,
    });
  }

  const defaultMetrics = captures.find(({ name }) => name === 'default').stageMetrics;
  assert(
    defaultMetrics.background.p50 > defaultMetrics.floor.p50 * 2
      && defaultMetrics.floor.highlightCoverage > 0.1
      && defaultMetrics.floor.highlightCoverage < 0.4,
    `Background/floor tones collapsed: ${JSON.stringify(defaultMetrics)}.`,
  );
  assert(
    defaultMetrics.hero.p95 > defaultMetrics.background.p95 * 2.5,
    `Glass and beams do not separate from the background: ${JSON.stringify(defaultMetrics)}.`,
  );
  assert(
    defaultMetrics.caustics.p99 > defaultMetrics.grid.p99 * 5
      && defaultMetrics.caustics.p99 > defaultMetrics.floor.p99 * 1.5,
    `Caustics are not the brightest floor feature: ${JSON.stringify(defaultMetrics)}.`,
  );
  assert(
    defaultMetrics.lowerLeft.p99 > defaultMetrics.grid.p99 * 3
      && defaultMetrics.lowerLeft.localContrast > 0.6
      && defaultMetrics.lowerLeft.highlightCoverage > 0.1,
    `Lower-left stage remains visually empty: ${JSON.stringify(defaultMetrics.lowerLeft)}.`,
  );

  const defaultThumbnail = captures.find(({ name }) => name === 'default').thumbnailMetrics;
  assert(
    defaultThumbnail.glassDisc.p99 > defaultThumbnail.stage.background.p95 * 3
      && defaultThumbnail.glassDisc.localContrast > 4,
    `Glass is not recognizable at 25% scale: ${JSON.stringify(defaultThumbnail)}.`,
  );
  assert(
    defaultThumbnail.stage.caustics.mean > defaultThumbnail.stage.grid.mean * 1.7
      && defaultThumbnail.stage.caustics.localContrast
        > defaultThumbnail.stage.grid.localContrast * 10,
    `Caustics are not recognizable at 25% scale: ${JSON.stringify(defaultThumbnail)}.`,
  );

  for (const name of ['thickness-0-2', 'thickness-2-4']) {
    const glassDisc = captures.find((capture) => capture.name === name).glassDiscMetrics;
    assert(
      glassDisc.brightClipRatio < 0.03
        && glassDisc.blackClipRatio < 0.1
        && glassDisc.p95 > 25
        && glassDisc.localContrast > 4,
      `${name} clipped or lost glass readability: ${JSON.stringify(glassDisc)}.`,
    );
  }

  const deterministicStatic = [
    await verifyStaticPair(page, 'static-normal', 'no-preference'),
    await verifyStaticPair(page, 'static-reduced', 'reduce'),
  ];
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(roomUrl({ autoRotate: 'true', v: '2' }), {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForSelector(canvasSelector);
  const motionFirstPath = `${outputDirectory}/motion-positive-1s.png`;
  const motionSecondPath = `${outputDirectory}/motion-positive-2s.png`;
  const motionFirst = parsePng(await captureTimedCanvas(page, motionFirstPath, 1000));
  const motionSecond = parsePng(await captureTimedCanvas(page, motionSecondPath, 1000));
  const motionDiff = compareFrames(motionFirst, motionSecond, 1);
  assert(
    motionDiff.meanDelta > 0.01 && motionDiff.maxDelta > 0,
    `autoRotate=true did not produce observable motion: ${JSON.stringify(motionDiff)}.`,
  );

  await page.goto(roomUrl({ autoRotate: 'false', v: '2' }), {
    waitUntil: 'domcontentloaded',
  });
  const dragBefore = await waitForLiveTelemetry(page);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('HeapProfiler.startSampling', { samplingInterval: 128 });
  await page.evaluate(() => {
    class Vector3AllocationPositiveControl {
      constructor(index) {
        this.values = [index, index + 1, index + 2, index + 3];
      }
    }
    globalThis.__glassAllocationPositiveControl = Array.from(
      { length: 4096 },
      (_, index) => new Vector3AllocationPositiveControl(index),
    );
  });
  const { profile: positiveControlProfile } = await cdp.send('HeapProfiler.stopSampling');
  const positiveControlNodes = collectAllocationNodes(positiveControlProfile.head);
  const positiveControlMatches = positiveControlNodes.filter(({ functionName }) =>
    functionName.includes('Vector3AllocationPositiveControl')
  );
  assert(
    positiveControlMatches.length > 0,
    'Heap allocation positive control was not observed; constructor-name gate is not trustworthy.',
  );
  await page.evaluate(() => {
    delete globalThis.__glassAllocationPositiveControl;
  });

  await cdp.send('HeapProfiler.startSampling', { samplingInterval: 128 });
  const lightXSlider = page.locator('input[type="range"]').first();
  await lightXSlider.evaluate(async (input) => {
    const setValue = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value',
    ).set;
    for (let index = 0; index < 180; index += 1) {
      setValue.call(input, String(-1.5 + index / 60));
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
  });
  const { profile: allocationProfile } = await cdp.send('HeapProfiler.stopSampling');
  await page.waitForTimeout(1000);
  const dragAfter = await waitForLiveTelemetry(page);
  const allocationNodes = collectAllocationNodes(allocationProfile.head);
  const forbiddenAllocationNames = [
    'BufferAttribute',
    'Geometry',
    'Vector3',
  ];
  const forbiddenAllocations = allocationNodes.filter(({ functionName, url }) =>
    url.includes('/assets/')
    && forbiddenAllocationNames.some((name) => functionName.includes(name))
  );
  assert(
    dragAfter.geometries === dragBefore.geometries,
    `Light X drag changed geometry count ${dragBefore.geometries} -> ${dragAfter.geometries}.`,
  );
  assert(dragAfter.drawCalls === 16, `Light X drag changed draw calls to ${dragAfter.drawCalls}.`);
  assert(
    forbiddenAllocations.length === 0,
    `Light X drag allocated forbidden Three objects:\n${JSON.stringify(forbiddenAllocations, null, 2)}`,
  );
  assert(errors.length === 0, `Browser errors:\n${errors.join('\n')}`);

  const report = {
    schemaVersion: 1,
    recordedAt: new Date().toISOString(),
    browserVersion: browser.version(),
    baseUrl,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    captures,
    deterministicStatic,
    motionPositiveControl: {
      firstPath: motionFirstPath,
      secondPath: motionSecondPath,
      diff: motionDiff,
    },
    continuousLightDrag: {
      allocationGate: {
        build: 'unminified',
        forbiddenAllocationNames,
        positiveControlMatches,
      },
      durationFrames: 180,
      drawCallsBefore: dragBefore.drawCalls,
      drawCallsAfter: dragAfter.drawCalls,
      geometriesBefore: dragBefore.geometries,
      geometriesAfter: dragAfter.geometries,
      sampledAllocationNodes: allocationNodes,
      forbiddenAllocations,
    },
    errors,
  };
  await writeFile(`${outputDirectory}/report.json`, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`glass optics QA: ${captures.length} states, default topology 16 calls, stable geometry`);
  console.log(`report: ${outputDirectory}/report.json`);
} finally {
  await browser.close();
}
