import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

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
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function roomUrl(parameters) {
  return `${baseUrl}/#/room/glass-optics?${new URLSearchParams(parameters)}`;
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
    assert(telemetry.drawCalls === 15, `${name} rendered ${telemetry.drawCalls} calls instead of 15.`);
    const screenshot = `${outputDirectory}/${name}.png`;
    await page.screenshot({ path: screenshot });
    captures.push({ name, parameters, screenshot, telemetry });
  }

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
  assert(dragAfter.drawCalls === 15, `Light X drag changed draw calls to ${dragAfter.drawCalls}.`);
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
  console.log(`glass optics QA: ${captures.length} states, default topology 15 calls, stable geometry`);
  console.log(`report: ${outputDirectory}/report.json`);
} finally {
  await browser.close();
}
