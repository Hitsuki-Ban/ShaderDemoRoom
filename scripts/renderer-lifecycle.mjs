import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const baseUrl = process.env.SHOWROOM_URL ?? 'http://127.0.0.1:4173/ShaderDemoRoom';
const outputPath = 'output/renderer-lifecycle.json';
const shaderRooms = new Set(['voxel-water', 'glass-optics']);
const switchSequence = [
  'glass-optics',
  'anime-liquid-orb',
  'voxel-water',
  'ninth-tide-archive',
  'glass-optics',
  'voxel-water',
  'anime-liquid-orb',
  'glass-optics',
  'ninth-tide-archive',
  'voxel-water',
  'glass-optics',
  'anime-liquid-orb',
  'voxel-water',
  'ninth-tide-archive',
  'glass-optics',
  'voxel-water',
  'anime-liquid-orb',
  'glass-optics',
  'ninth-tide-archive',
  'anime-liquid-orb',
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

await context.addInitScript(() => {
  const nativeGetContext = HTMLCanvasElement.prototype.getContext;
  const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window);
  const records = [];
  const creationErrors = [];
  let nextCanvasId = 1;

  Object.defineProperty(window, '__shellRendererAudit', {
    value: {
      records,
      creationErrors,
      animationCallbacks: 0,
    },
  });

  window.requestAnimationFrame = (callback) =>
    nativeRequestAnimationFrame((timestamp) => {
      window.__shellRendererAudit.animationCallbacks += 1;
      callback(timestamp);
    });

  HTMLCanvasElement.prototype.getContext = function getContext(type, attributes) {
    if (this.dataset.rendererHost !== 'shell') {
      return nativeGetContext.apply(this, arguments);
    }

    if (!this.dataset.rendererAuditId) {
      this.dataset.rendererAuditId = String(nextCanvasId);
      nextCanvasId += 1;
      this.addEventListener('webglcontextcreationerror', (event) => {
        creationErrors.push(event.statusMessage ?? 'unknown context creation error');
      });
    }

    const contextResult = nativeGetContext.apply(this, arguments);
    if (
      contextResult &&
      (type === 'webgl2' || type === 'webgl' || type === 'experimental-webgl') &&
      !records.some((record) => record.context === contextResult)
    ) {
      const record = {
        canvas: this,
        canvasId: this.dataset.rendererAuditId,
        context: contextResult,
        type,
        requested: attributes ? { ...attributes } : {},
        actual: contextResult.getContextAttributes(),
        lost: contextResult.isContextLost(),
      };
      records.push(record);
      this.addEventListener('webglcontextlost', () => {
        record.lost = true;
      });
      this.addEventListener('webglcontextrestored', () => {
        record.lost = false;
      });
    }
    return contextResult;
  };
});

async function readAudit(page) {
  return page.mainFrame().evaluate(() => {
    const audit = window.__shellRendererAudit;
    const canvas = document.querySelector('canvas[data-renderer-host="shell"]');
    return {
      animationCallbacks: audit.animationCallbacks,
      canvasCount: document.querySelectorAll('canvas[data-renderer-host="shell"]').length,
      canvasId: canvas?.dataset.rendererAuditId ?? null,
      canvasConnected: canvas?.isConnected ?? false,
      creationErrors: [...audit.creationErrors],
      contexts: audit.records.map((record) => ({
        actual: record.actual,
        canvasId: record.canvasId,
        connected: record.canvas.isConnected,
        lost: record.lost,
        requested: record.requested,
        type: record.type,
      })),
    };
  });
}

async function openRoom(page, room) {
  await page.evaluate((nextRoom) => {
    window.location.hash = `/room/${nextRoom}`;
  }, room);
  await page.waitForFunction(
    (nextRoom) => {
      const activeRoom = document.querySelector('.room-link.active');
      return (
        window.location.hash === `#/room/${nextRoom}` &&
        activeRoom?.getAttribute('href')?.endsWith(`/room/${nextRoom}`)
      );
    },
    room,
  );

  if (shaderRooms.has(room)) {
    await page.waitForFunction(
      () => {
        const canvas = document.querySelector('canvas[data-renderer-host="shell"]');
        return canvas && canvas.getBoundingClientRect().width > 0 && !document.querySelector('.canvas-loader');
      },
      undefined,
      { timeout: 15000 },
    );
  } else {
    await page.waitForSelector('iframe.embedded-exhibit-frame', { timeout: 15000 });
  }
  await page.waitForTimeout(350);
}

async function assertAnimationState(page, active) {
  await page.waitForTimeout(100);
  const before = (await readAudit(page)).animationCallbacks;
  await page.waitForTimeout(250);
  const after = (await readAudit(page)).animationCallbacks;
  if (active) {
    assert(after > before, 'The shell animation loop did not run in a shader room.');
  } else {
    assert(after === before, 'The shell animation loop continued in an embedded room.');
  }
}

async function readPixelRatio(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector('canvas[data-renderer-host="shell"]');
    if (!canvas) {
      return null;
    }
    const width = Math.floor(canvas.parentElement?.getBoundingClientRect().width ?? 0);
    return width > 0 ? canvas.width / width : null;
  });
}

async function readTransmissionResolutionScale(page) {
  return page.evaluate(() => {
    const serialized = document.querySelector(
      'canvas[data-renderer-host="shell"]',
    )?.dataset.rendererTransmissionResolutionScale;
    return serialized === undefined ? null : Number(serialized);
  });
}

async function sampleTelemetry(page, room) {
  await openRoom(page, room);
  await page.waitForTimeout(2500);
  const samples = [];
  for (let index = 0; index < 8; index += 1) {
    await page.waitForTimeout(1000);
    const telemetry = await page.evaluate(() => {
      const serialized = document.querySelector('[data-telemetry-json]')?.getAttribute('data-telemetry-json');
      return serialized ? JSON.parse(serialized) : null;
    });
    assert(telemetry, `Could not read the ${room} telemetry record.`);
    const fps = Number(telemetry.fps);
    const calls = Number(telemetry.drawCalls);
    assert(Number.isFinite(fps), `Could not read the ${room} FPS value: ${telemetry.fps}.`);
    assert(Number.isFinite(calls), `Could not read the ${room} calls value: ${telemetry.drawCalls}.`);
    assert(
      ['software', 'hardware', 'unknown'].includes(telemetry.environment.classification),
      `Invalid ${room} renderer classification: ${telemetry.environment.classification}.`,
    );
    samples.push({
      calls,
      environment: telemetry.environment.classification,
      fps,
      state: telemetry.sampleState,
    });
  }
  return samples;
}

async function runScenario(firstRoom) {
  const page = await context.newPage();
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(`${baseUrl}/#/room/${firstRoom}`, { waitUntil: 'domcontentloaded' });
  await openRoom(page, firstRoom);
  await assertAnimationState(page, true);

  const initialAudit = await readAudit(page);
  const initialTransmissionResolutionScale = await readTransmissionResolutionScale(page);
  assert(initialAudit.canvasCount === 1, 'Expected exactly one connected shell canvas.');
  assert(initialAudit.contexts.length === 1, 'Expected exactly one shell WebGL context.');
  assert(initialAudit.contexts[0].type === 'webgl2', 'The shell did not create a WebGL2 context.');
  assert(initialAudit.contexts[0].actual?.antialias === true, 'The shell context is not antialiased.');
  assert(initialAudit.creationErrors.length === 0, 'The shell reported context creation errors.');
  assert(
    initialTransmissionResolutionScale === (firstRoom === 'glass-optics' ? 0.5 : 1),
    `Initial renderer profile was not applied in ${firstRoom}: ${initialTransmissionResolutionScale}.`,
  );

  const telemetrySamples = firstRoom === 'voxel-water'
    ? {
        'voxel-water': await sampleTelemetry(page, 'voxel-water'),
        'glass-optics': await sampleTelemetry(page, 'glass-optics'),
      }
    : null;
  if (telemetrySamples) {
    const voxelMean =
      telemetrySamples['voxel-water'].reduce((total, sample) => total + sample.fps, 0) /
      telemetrySamples['voxel-water'].length;
    const glassCalls = telemetrySamples['glass-optics'].map((sample) => sample.calls);
    console.log(
      `voxel telemetry: ${telemetrySamples['voxel-water'].map(({ calls, fps }) => `${fps} FPS/${calls} calls`).join(', ')} (FPS mean ${voxelMean})`,
    );
    console.log(
      `glass telemetry: ${telemetrySamples['glass-optics'].map(({ calls, fps }) => `${fps} FPS/${calls} calls`).join(', ')}`,
    );
    assert(voxelMean >= 14.9, `Voxel FPS regressed below the 10% budget: ${voxelMean}.`);
    assert(
      glassCalls.every((calls) => calls === 16),
      `Glass logical-frame calls changed from the calibrated 16-call topology: ${glassCalls.join(', ')}.`,
    );
  }

  const pixelRatios = {};
  for (const room of ['voxel-water', 'glass-optics']) {
    await openRoom(page, room);
    pixelRatios[room] = await readPixelRatio(page);
  }
  assert(
    Math.abs(pixelRatios['voxel-water'] - 0.55) < 0.02,
    `Voxel pixel ratio changed: ${pixelRatios['voxel-water']}.`,
  );
  assert(
    Math.abs(pixelRatios['glass-optics'] - 1) < 0.02,
    `Glass pixel ratio changed: ${pixelRatios['glass-optics']}.`,
  );

  const rendererProfileScales = [];
  for (const room of switchSequence) {
    await openRoom(page, room);
    await assertAnimationState(page, shaderRooms.has(room));
    const transmissionResolutionScale = await readTransmissionResolutionScale(page);
    const expectedTransmissionResolutionScale = room === 'glass-optics' ? 0.5 : 1;
    assert(
      transmissionResolutionScale === expectedTransmissionResolutionScale,
      `Renderer profile leaked in ${room}: ${transmissionResolutionScale}.`,
    );
    rendererProfileScales.push({ room, transmissionResolutionScale });
    const audit = await readAudit(page);
    assert(audit.canvasCount === 1, `Shell canvas count changed in ${room}.`);
    assert(audit.canvasId === initialAudit.canvasId, `Shell canvas identity changed in ${room}.`);
    assert(audit.contexts.length === 1, `Shell context count changed in ${room}.`);
    assert(
      !audit.contexts[0].lost,
      `Shell context was lost in ${room}. Browser errors:\n${errors.join('\n')}`,
    );
  }

  await assertAnimationState(page, false);
  const finalAudit = await readAudit(page);
  assert(errors.length === 0, `Browser errors:\n${errors.join('\n')}`);
  await page.close();

  return {
    errors,
    finalAudit,
    firstRoom,
    telemetrySamples,
    pixelRatios,
    rendererProfileScales,
    switches: switchSequence.length,
  };
}

try {
  const scenarios = [];
  for (const firstRoom of ['voxel-water', 'glass-optics']) {
    scenarios.push(await runScenario(firstRoom));
  }
  await mkdir('output', { recursive: true });
  await writeFile(outputPath, `${JSON.stringify({ scenarios }, null, 2)}\n`);
  console.log(`renderer lifecycle: 2 visit orders × ${switchSequence.length} switches pass`);
  console.log(`report: ${outputPath}`);
} finally {
  await context.close();
  await browser.close();
}
