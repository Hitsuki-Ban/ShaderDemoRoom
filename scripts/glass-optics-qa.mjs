import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import {
  compareFrames,
  measureRegion,
  parsePng,
} from './water-qa-metrics.mjs';
import {
  downsampleFrame,
  measureCausticsDifference,
} from './glass-optics-qa-metrics.mjs';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const outputDirectory = process.env.GLASS_QA_OUTPUT ?? 'output/glass-qa';
const allocationNamesAreReadable = process.env.GLASS_QA_ALLOCATION_NAMES === 'readable';

const states = [
  ['default', { autoRotate: 'false', v: '3' }],
  ['dispersion-0-default-ior', {
    autoRotate: 'false',
    dispersion: '0',
    v: '3',
  }],
  ['dispersion-0-high-ior', {
    autoRotate: 'false',
    dispersion: '0',
    ior: '2.4',
    v: '3',
  }],
  ['spread-0-05', { autoRotate: 'false', beamSpread: '0.05', v: '3' }],
  ['spread-0-34', { autoRotate: 'false', beamSpread: '0.34', v: '3' }],
  ['spread-0-9', { autoRotate: 'false', beamSpread: '0.9', v: '3' }],
  ['focus', {
    autoRotate: 'false',
    beamSpread: '0.18',
    lightX: '-0.28',
    lightY: '3.45',
    lightZ: '1.45',
    v: '3',
  }],
  ['crystal', {
    autoRotate: 'false',
    ior: '1.72',
    roughness: '0.01',
    thickness: '1.8',
    v: '3',
  }],
  ['extreme', {
    autoRotate: 'false',
    lightX: '-6',
    lightY: '2.61',
    lightZ: '-6',
    v: '3',
  }],
  ['ior-1', { autoRotate: 'false', ior: '1', v: '3' }],
  ['ior-1-dispersion-0', {
    autoRotate: 'false',
    dispersion: '0',
    ior: '1',
    v: '3',
  }],
  ['ior-1-48', { autoRotate: 'false', ior: '1.48', v: '3' }],
  ['ior-2-4', { autoRotate: 'false', ior: '2.4', v: '3' }],
  ['thickness-0-2', { autoRotate: 'false', thickness: '0.2', v: '3' }],
  ['thickness-2-4', { autoRotate: 'false', thickness: '2.4', v: '3' }],
  ['roughness-0-55', { autoRotate: 'false', roughness: '0.55', v: '3' }],
];

const payoffStates = [
  { axis: 'spread', value: 0.05, name: 'spread-0-05' },
  { axis: 'spread', value: 0.34, name: 'spread-0-34' },
  { axis: 'spread', value: 0.9, name: 'spread-0-9' },
  { axis: 'ior', value: 1, name: 'ior-1-dispersion-0' },
  { axis: 'ior', value: 1.48, name: 'dispersion-0-default-ior' },
  { axis: 'ior', value: 2.4, name: 'dispersion-0-high-ior' },
  { axis: 'ior-adopted', value: 1.48, name: 'ior-1-48' },
  { axis: 'ior-adopted', value: 2.4, name: 'ior-2-4' },
];

const canvasSelector = 'canvas[data-renderer-host="shell"]';
const stageRegions = {
  background: { x0: 0.03, x1: 0.7, y0: 0.03, y1: 0.24 },
  caustics: { x0: 0.28, x1: 0.5, y0: 0.48, y1: 0.68 },
  bottomReflection: { x0: 0.3, x1: 0.75, y0: 0.9, y1: 1 },
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

function isGlassDiscSample(frame, x, y) {
  const normalizedX = x / frame.width;
  const normalizedY = y / frame.height;
  const discX = (normalizedX - 0.498) / 0.17;
  const discY = (normalizedY - 0.482) / 0.198;
  const discRadius = Math.hypot(discX, discY);
  const beamDistance = Math.abs(normalizedY - (-1.41 * normalizedX + 1.225));
  return discRadius >= 0.2 && discRadius <= 0.82 && beamDistance >= 0.038;
}

function measureGlassDisc(frame, sampleScale = 2) {
  const values = [];
  let anyChannelClipped = 0;
  let brightClipped = 0;
  let blackClipped = 0;
  let contrastTotal = 0;
  let broadContrastTotal = 0;
  let chromaSpreadTotal = 0;
  let chromaPixels = 0;

  for (let y = 0; y < frame.height; y += sampleScale) {
    for (let x = 0; x < frame.width; x += sampleScale) {
      if (!isGlassDiscSample(frame, x, y)) continue;

      const index = (y * frame.width + x) * frame.bytesPerPixel;
      const red = frame.pixels[index];
      const green = frame.pixels[index + 1];
      const blue = frame.pixels[index + 2];
      values.push(red * 0.2126 + green * 0.7152 + blue * 0.0722);
      const channelMaximum = Math.max(red, green, blue);
      const channelMinimum = Math.min(red, green, blue);
      const chromaSpread = channelMaximum - channelMinimum;
      if (channelMaximum >= 250) anyChannelClipped += 1;
      if (red >= 250 && green >= 250 && blue >= 250) brightClipped += 1;
      if (red <= 1 && green <= 1 && blue <= 1) blackClipped += 1;
      chromaSpreadTotal += chromaSpread;
      if (chromaSpread >= 12 && channelMaximum >= 24) chromaPixels += 1;

      const nextX = Math.min(frame.width - 1, x + sampleScale);
      const nextY = Math.min(frame.height - 1, y + sampleScale);
      const nextIndex = (nextY * frame.width + nextX) * frame.bytesPerPixel;
      contrastTotal += (
        Math.abs(red - frame.pixels[nextIndex])
        + Math.abs(green - frame.pixels[nextIndex + 1])
        + Math.abs(blue - frame.pixels[nextIndex + 2])
      ) / 3;

      const broadNextX = Math.min(frame.width - 1, x + sampleScale * 4);
      const broadNextY = Math.min(frame.height - 1, y + sampleScale * 4);
      const broadNextIndex = (broadNextY * frame.width + broadNextX) * frame.bytesPerPixel;
      broadContrastTotal += (
        Math.abs(red - frame.pixels[broadNextIndex])
        + Math.abs(green - frame.pixels[broadNextIndex + 1])
        + Math.abs(blue - frame.pixels[broadNextIndex + 2])
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
    anyChannelClipRatio: anyChannelClipped / values.length,
    brightClipRatio: brightClipped / values.length,
    blackClipRatio: blackClipped / values.length,
    localContrast: contrastTotal / values.length,
    broadContrast: broadContrastTotal / values.length,
    chromaSpreadMean: chromaSpreadTotal / values.length,
    chromaCoverage: chromaPixels / values.length,
  };
}

function measureGlassDispersionDifference(baseline, adopted, sampleScale = 1) {
  assert(
    baseline.width === adopted.width && baseline.height === adopted.height,
    'Dispersion comparison frames have different dimensions.',
  );
  const chromaGains = [];
  let colorDeltaTotal = 0;
  let gainedOverFive = 0;

  for (let y = 0; y < baseline.height; y += sampleScale) {
    for (let x = 0; x < baseline.width; x += sampleScale) {
      if (!isGlassDiscSample(baseline, x, y)) continue;
      const index = (y * baseline.width + x) * baseline.bytesPerPixel;
      const baselineRed = baseline.pixels[index];
      const baselineGreen = baseline.pixels[index + 1];
      const baselineBlue = baseline.pixels[index + 2];
      const adoptedRed = adopted.pixels[index];
      const adoptedGreen = adopted.pixels[index + 1];
      const adoptedBlue = adopted.pixels[index + 2];
      const baselineChroma = Math.max(baselineRed, baselineGreen, baselineBlue)
        - Math.min(baselineRed, baselineGreen, baselineBlue);
      const adoptedChroma = Math.max(adoptedRed, adoptedGreen, adoptedBlue)
        - Math.min(adoptedRed, adoptedGreen, adoptedBlue);
      const chromaGain = adoptedChroma - baselineChroma;
      chromaGains.push(chromaGain);
      if (chromaGain > 5) gainedOverFive += 1;
      colorDeltaTotal += (
        Math.abs(adoptedRed - baselineRed)
        + Math.abs(adoptedGreen - baselineGreen)
        + Math.abs(adoptedBlue - baselineBlue)
      ) / 3;
    }
  }

  chromaGains.sort((left, right) => left - right);
  const percentile = (ratio) => chromaGains[Math.floor(chromaGains.length * ratio)] ?? 0;
  return {
    samples: chromaGains.length,
    meanColorDelta: colorDeltaTotal / chromaGains.length,
    meanChromaGain: chromaGains.reduce((sum, value) => sum + value, 0)
      / chromaGains.length,
    p90ChromaGain: percentile(0.9),
    gainedOverFiveRatio: gainedOverFive / chromaGains.length,
  };
}

async function captureTimedCanvas(page, path, delay) {
  await page.waitForTimeout(delay);
  return page.locator(canvasSelector).screenshot({ path });
}

async function verifyStaticPair(page, name, reducedMotion) {
  await page.emulateMedia({ reducedMotion });
  await page.goto(roomUrl({ autoRotate: 'false', v: '3' }), {
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
  const captureFrames = new Map();
  for (const [name, parameters] of states) {
    await page.goto(roomUrl(parameters), { waitUntil: 'domcontentloaded' });
    const telemetry = await waitForLiveTelemetry(page);
    assert(telemetry.drawCalls === 15, `${name} rendered ${telemetry.drawCalls} calls instead of 15.`);
    const screenshot = `${outputDirectory}/${name}.png`;
    await page.screenshot({ path: screenshot });
    const canvasScreenshot = `${outputDirectory}/${name}-canvas.png`;
    const frame = parsePng(
      await page.locator(canvasSelector).screenshot({ path: canvasScreenshot }),
    );
    captureFrames.set(name, frame);
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

  const getCapturedFrame = (name) => {
    const frame = captureFrames.get(name);
    assert(frame, `Missing comparison frame ${name}.`);
    return frame;
  };
  const compareCapturedStates = (firstName, secondName) => {
    return compareFrames(getCapturedFrame(firstName), getCapturedFrame(secondName), 1);
  };
  const roughnessMaximumCapture = captures.find(({ name }) => name === 'roughness-0-55');
  assert(roughnessMaximumCapture, 'Missing roughness maximum capture.');
  const dispersionQa = {
    adoptedDefaultIor: {
      fullFrame: compareCapturedStates('dispersion-0-default-ior', 'default'),
      glassMaterial: measureGlassDispersionDifference(
        getCapturedFrame('dispersion-0-default-ior'),
        getCapturedFrame('default'),
      ),
    },
    adoptedHighIor: {
      fullFrame: compareCapturedStates('dispersion-0-high-ior', 'ior-2-4'),
      glassMaterial: measureGlassDispersionDifference(
        getCapturedFrame('dispersion-0-high-ior'),
        getCapturedFrame('ior-2-4'),
      ),
    },
    iorOneCollapse: compareCapturedStates('ior-1-dispersion-0', 'ior-1'),
    roughnessMaximumGlassDisc: roughnessMaximumCapture.glassDiscMetrics,
    roughnessMaximumHero: roughnessMaximumCapture.stageMetrics.hero,
  };
  assert(
    // The glass-only chroma signal owns material dispersion; average color
    // distance also includes neutral transmission shifts and is less specific.
    dispersionQa.adoptedDefaultIor.glassMaterial.meanColorDelta > 1.2
      && dispersionQa.adoptedDefaultIor.glassMaterial.meanChromaGain > 1.5
      && dispersionQa.adoptedDefaultIor.glassMaterial.p90ChromaGain > 3
      && dispersionQa.adoptedDefaultIor.glassMaterial.gainedOverFiveRatio > 0.055,
    `Adopted dispersion is not visible in the default-IOR glass: ${JSON.stringify(dispersionQa.adoptedDefaultIor)}.`,
  );
  assert(
    dispersionQa.adoptedDefaultIor.fullFrame.meanDelta > 0.1
      && dispersionQa.adoptedDefaultIor.fullFrame.strongRatio > 0.0005
      && dispersionQa.adoptedDefaultIor.fullFrame.maxDelta > 50,
    `Adopted dispersion does not visibly change the default scene: ${JSON.stringify(dispersionQa.adoptedDefaultIor)}.`,
  );
  assert(
    dispersionQa.adoptedHighIor.glassMaterial.meanColorDelta > 1
      && dispersionQa.adoptedHighIor.glassMaterial.meanChromaGain > 0.85
      && dispersionQa.adoptedHighIor.glassMaterial.p90ChromaGain > 4.5
      && dispersionQa.adoptedHighIor.glassMaterial.gainedOverFiveRatio > 0.08,
    `Adopted dispersion is not visible in the high-IOR glass: ${JSON.stringify(dispersionQa.adoptedHighIor)}.`,
  );
  assert(
    dispersionQa.adoptedHighIor.fullFrame.meanDelta > 0.12
      && dispersionQa.adoptedHighIor.fullFrame.strongRatio > 0.00035
      && dispersionQa.adoptedHighIor.fullFrame.maxDelta > 40,
    `Adopted dispersion does not visibly change the high-IOR scene: ${JSON.stringify(dispersionQa.adoptedHighIor)}.`,
  );
  const defaultIorMaterialResponse = (
    dispersionQa.adoptedDefaultIor.glassMaterial.meanColorDelta
    + dispersionQa.adoptedDefaultIor.glassMaterial.meanChromaGain
  );
  const highIorMaterialResponse = (
    dispersionQa.adoptedHighIor.glassMaterial.meanColorDelta
    + dispersionQa.adoptedHighIor.glassMaterial.meanChromaGain
  );
  assert(
    // Refraction moves pattern boundaries as IOR changes, trading affected
    // coverage against per-pixel chroma. Both terms use byte-channel units;
    // their sum owns relative material response while the absolute floors
    // above keep either term from hiding absent chromatic dispersion.
    highIorMaterialResponse > defaultIorMaterialResponse,
    `Higher IOR did not strengthen material dispersion: ${JSON.stringify({ defaultIorMaterialResponse, highIorMaterialResponse, dispersionQa })}.`,
  );
  assert(
    dispersionQa.iorOneCollapse.meanDelta === 0
      && dispersionQa.iorOneCollapse.strongRatio === 0
      && dispersionQa.iorOneCollapse.maxDelta === 0,
    `IOR 1 did not collapse adopted and zero-dispersion RGB paths exactly: ${JSON.stringify(dispersionQa.iorOneCollapse)}.`,
  );
  assert(
    dispersionQa.roughnessMaximumGlassDisc.anyChannelClipRatio < 0.005
      && dispersionQa.roughnessMaximumGlassDisc.brightClipRatio < 0.001
      && dispersionQa.roughnessMaximumGlassDisc.blackClipRatio < 0.05
      && dispersionQa.roughnessMaximumGlassDisc.p95 > 60
      // T-GO-06 removes the decorative shell that previously supplied two-pixel
      // edge energy. This state now verifies the broad refracted silhouette;
      // the default 25% gate below still owns thumbnail-scale recognition.
      && dispersionQa.roughnessMaximumGlassDisc.broadContrast > 8,
    `Maximum roughness clipped or lost the glass response: ${JSON.stringify(dispersionQa.roughnessMaximumGlassDisc)}.`,
  );
  assert(
    dispersionQa.roughnessMaximumHero.brightClipRatio < 0.01
      && dispersionQa.roughnessMaximumHero.blackClipRatio < 0.08
      && dispersionQa.roughnessMaximumHero.p95 > 80
      && dispersionQa.roughnessMaximumHero.localContrast > 7,
    `Maximum roughness clipped or flattened the hero region: ${JSON.stringify(dispersionQa.roughnessMaximumHero)}.`,
  );

  const defaultMetrics = captures.find(({ name }) => name === 'default').stageMetrics;
  assert(
    defaultMetrics.background.p50 > 5
      && defaultMetrics.floor.highlightCoverage > 0.1
      && defaultMetrics.floor.highlightCoverage < 0.4,
    `Background/floor tones collapsed: ${JSON.stringify(defaultMetrics)}.`,
  );
  assert(
    defaultMetrics.floor.brightClipRatio < 0.001
      && defaultMetrics.floor.localContrast > 0.35
      && defaultMetrics.hero.brightClipRatio < 0.01
      && defaultMetrics.hero.localContrast > 7,
    `Floor or hero clipped or lost local contrast: ${JSON.stringify(defaultMetrics)}.`,
  );
  assert(
    defaultMetrics.hero.p95 > defaultMetrics.background.p95 * 2.5,
    `Glass and beams do not separate from the background: ${JSON.stringify(defaultMetrics)}.`,
  );
  assert(
    defaultMetrics.caustics.p99 > defaultMetrics.grid.p99 * 5
      && defaultMetrics.caustics.p99 > defaultMetrics.floor.p99 * 1.5
      && defaultMetrics.caustics.p99 > defaultMetrics.bottomReflection.p99 * 1.1
      && defaultMetrics.bottomReflection.brightClipRatio < 0.005,
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
        // The calibration target intentionally contains true-black cells; the
        // upper bound still rejects a collapsed disc while allowing them to be
        // refracted through the minimum-thickness material.
        && glassDisc.blackClipRatio < 0.3
        && glassDisc.p95 > 25
        && glassDisc.localContrast > 4,
      `${name} clipped or lost glass readability: ${JSON.stringify(glassDisc)}.`,
    );
  }

  const causticsPayoff = [];
  let defaultOffStatic;
  for (const payoffState of payoffStates) {
    const parameters = states.find(([name]) => name === payoffState.name)?.[1];
    assert(parameters, `Missing capture parameters for ${payoffState.name}.`);
    await page.goto(roomUrl({ ...parameters, showCaustics: 'false' }), {
      waitUntil: 'domcontentloaded',
    });
    const telemetry = await waitForLiveTelemetry(page);
    assert(
      telemetry.drawCalls === 14,
      `${payoffState.name} caustics OFF rendered ${telemetry.drawCalls} calls instead of 14.`,
    );
    const offPath = `${outputDirectory}/${payoffState.name}-caustics-off-canvas.png`;
    const offFrame = parsePng(
      await page.locator(canvasSelector).screenshot({ path: offPath }),
    );
    if (payoffState.name === 'spread-0-34') {
      const repeatPath = `${outputDirectory}/${payoffState.name}-caustics-off-repeat-canvas.png`;
      const repeatFrame = parsePng(
        await page.locator(canvasSelector).screenshot({ path: repeatPath }),
      );
      const diff = compareFrames(offFrame, repeatFrame, 1);
      assert(
        diff.meanDelta === 0 && diff.maxDelta === 0,
        `Caustics OFF control was not pixel-identical: ${JSON.stringify(diff)}.`,
      );
      defaultOffStatic = { firstPath: offPath, secondPath: repeatPath, diff };
    }
    const onFrame = captureFrames.get(payoffState.name);
    assert(onFrame, `Missing ON frame for ${payoffState.name}.`);
    const metrics = measureCausticsDifference(onFrame, offFrame);
    const thumbnailMetrics = measureCausticsDifference(
      downsampleFrame(onFrame, 4),
      downsampleFrame(offFrame, 4),
    );
    const onCapture = captures.find(({ name }) => name === payoffState.name);
    assert(onCapture, `Missing ON capture report for ${payoffState.name}.`);
    assert(
      metrics.activePixels > 100
        && metrics.peakByteP999 > 6
        && metrics.plateauRatio < 0.15
        && metrics.activeCoverage < 0.04
        && metrics.anyChannelClipRatio < 0.05
        && metrics.allChannelClipRatio < 0.01,
      `${payoffState.name} caustics focus is absent, flat, or clipped: ${JSON.stringify(metrics)}.`,
    );
    assert(
      metrics.onHalfMaxByteP999
        > Math.max(
          onCapture.stageMetrics.floor.p99,
          onCapture.stageMetrics.bottomReflection.p99,
        ) * 1.1,
      `${payoffState.name} focus is not brighter than the floor: ${JSON.stringify({ metrics, floor: onCapture.stageMetrics.floor, bottomReflection: onCapture.stageMetrics.bottomReflection })}.`,
    );
    assert(
      thumbnailMetrics.peakByteP999 > 10
        && thumbnailMetrics.activePixels > 10
        && thumbnailMetrics.halfMaxEquivalentRadius > 1.25
        && thumbnailMetrics.anyChannelClipRatio < 0.05
        && thumbnailMetrics.allChannelClipRatio < 0.01,
      `${payoffState.name} caustics vanished or clipped at 25% scale: ${JSON.stringify(thumbnailMetrics)}.`,
    );
    causticsPayoff.push({
      ...payoffState,
      onPath: onCapture.canvasScreenshot,
      offPath,
      onTelemetry: onCapture.telemetry,
      offTelemetry: telemetry,
      metrics,
      thumbnailMetrics,
    });
  }
  assert(defaultOffStatic, 'Missing deterministic caustics OFF control.');

  const spreadPayoff = causticsPayoff.filter(({ axis }) => axis === 'spread');
  assert(
    spreadPayoff[0].metrics.halfMaxEquivalentRadius
      < spreadPayoff[1].metrics.halfMaxEquivalentRadius
      && spreadPayoff[1].metrics.halfMaxEquivalentRadius
        < spreadPayoff[2].metrics.halfMaxEquivalentRadius,
    `Beam spread did not monotonically broaden the focus: ${JSON.stringify(spreadPayoff)}.`,
  );
  assert(
    spreadPayoff[0].metrics.activeCoverage
      < spreadPayoff[1].metrics.activeCoverage
      && spreadPayoff[1].metrics.activeCoverage
        < spreadPayoff[2].metrics.activeCoverage,
    `Beam spread did not monotonically expand the active footprint: ${JSON.stringify(spreadPayoff)}.`,
  );
  assert(
    spreadPayoff[2].metrics.peakByteP999
      < spreadPayoff[1].metrics.peakByteP999 * 1.6,
    `Wide spread increased peak energy instead of redistributing it: ${JSON.stringify(spreadPayoff)}.`,
  );
  const iorPayoff = causticsPayoff.filter(({ axis }) => axis === 'ior');
  // Preserve T-GO-03 under the zero-dispersion white-beam control and use the
  // same number of strongest ON/OFF pixels at every IOR. A percentile over all
  // positive pixels samples progressively more of the tail as the physical
  // focus footprint grows, so it is not a stable peak comparison.
  assert(
    iorPayoff[0].metrics.focusCoreLinearMean
      < iorPayoff[1].metrics.focusCoreLinearMean
      && iorPayoff[1].metrics.focusCoreLinearMean
        < iorPayoff[2].metrics.focusCoreLinearMean,
    `IOR did not monotonically strengthen the captured focus: ${JSON.stringify(iorPayoff)}.`,
  );
  const adoptedIorPayoff = causticsPayoff.filter(({ axis }) => axis === 'ior-adopted');
  assert(
    adoptedIorPayoff.length === 2
      && adoptedIorPayoff.every(({ metrics }) => metrics.peakLinearP999 > 0.45),
    `Adopted spectral composition weakened the caustic focus: ${JSON.stringify(adoptedIorPayoff)}.`,
  );
  const iorCentroidDeltas = [
    {
      x: iorPayoff[1].metrics.centroid.x - iorPayoff[0].metrics.centroid.x,
      y: iorPayoff[1].metrics.centroid.y - iorPayoff[0].metrics.centroid.y,
    },
    {
      x: iorPayoff[2].metrics.centroid.x - iorPayoff[1].metrics.centroid.x,
      y: iorPayoff[2].metrics.centroid.y - iorPayoff[1].metrics.centroid.y,
    },
  ];
  const iorCentroidDistances = iorCentroidDeltas.map(({ x, y }) => Math.hypot(x, y));
  assert(
    iorCentroidDistances.every((distance) => distance > 0.002)
      && iorCentroidDeltas[0].x * iorCentroidDeltas[1].x
        + iorCentroidDeltas[0].y * iorCentroidDeltas[1].y > 0,
    `IOR focus position did not move monotonically: ${JSON.stringify({ iorPayoff, iorCentroidDeltas })}.`,
  );

  const deterministicStatic = [
    await verifyStaticPair(page, 'static-normal', 'no-preference'),
    await verifyStaticPair(page, 'static-reduced', 'reduce'),
  ];
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(roomUrl({ autoRotate: 'true', v: '3' }), {
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

  await page.goto(roomUrl({ autoRotate: 'false', v: '3' }), {
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
  assert(
    dragAfter.textures === dragBefore.textures,
    `Light X drag changed texture count ${dragBefore.textures} -> ${dragAfter.textures}.`,
  );
  assert(
    dragAfter.programs === dragBefore.programs,
    `Light X drag changed program count ${dragBefore.programs} -> ${dragAfter.programs}.`,
  );
  assert(
    dragBefore.drawCalls === 15 && dragAfter.drawCalls === 15,
    `Light X drag draw calls were ${dragBefore.drawCalls} before and ${dragAfter.drawCalls} after; expected 15/15.`,
  );
  assert(
    forbiddenAllocations.length === 0,
    `Light X drag allocated forbidden Three objects:\n${JSON.stringify(forbiddenAllocations, null, 2)}`,
  );
  assert(errors.length === 0, `Browser errors:\n${errors.join('\n')}`);

  const report = {
    schemaVersion: 2,
    recordedAt: new Date().toISOString(),
    browserVersion: browser.version(),
    baseUrl,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    captures,
    causticsPayoff: {
      alphaGate: 'CAUSTICS_ENABLED_INTENSITY * CAUSTICS_ALPHA_BUDGET <= 0.9',
      defaultOffStatic,
      states: causticsPayoff,
      iorCentroidDeltas,
      iorCentroidDistances,
    },
    dispersionQa,
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
      texturesBefore: dragBefore.textures,
      texturesAfter: dragAfter.textures,
      programsBefore: dragBefore.programs,
      programsAfter: dragAfter.programs,
      sampledAllocationNodes: allocationNodes,
      forbiddenAllocations,
    },
    errors,
  };
  await writeFile(`${outputDirectory}/report.json`, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`glass optics QA: ${captures.length} states, default topology 15 calls, stable geometry`);
  console.log(`report: ${outputDirectory}/report.json`);
} finally {
  await browser.close();
}
