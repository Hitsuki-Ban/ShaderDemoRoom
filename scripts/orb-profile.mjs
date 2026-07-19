import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { basename, extname, join, relative, resolve, sep } from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import {
  assertExactVariantIds,
  median,
  nearestRankPercentile,
  ORB_PROFILE_VARIANTS,
  summarizeCadence,
} from './orb-profile-core.mjs';

const root = resolve(process.cwd());
const sourceRoot = join(root, 'ref', 'mizu-kokoro-2-source');
const outputRoot = join(root, 'output', 'orb-profile');
const worktreesRoot = join(outputRoot, 'worktrees');
const buildsRoot = join(outputRoot, 'builds');
const tracesRoot = join(outputRoot, 'traces');
const resultPath = join(outputRoot, 'orb-profile-raw.json');
const expectedWorktreesRoot = resolve(root, 'output', 'orb-profile', 'worktrees');
if (resolve(worktreesRoot) !== expectedWorktreesRoot) {
  throw new Error('Orb profile temporary worktree path escaped the intended output directory.');
}

const protocol = Object.freeze({
  viewport: Object.freeze({ width: 1440, height: 900 }),
  deviceScaleFactor: 2,
  quality: 'high',
  warmupMs: 5000,
  measurementMs: 15000,
  gpuProfileWarmupMs: 5000,
  gpuProfileMeasurementMs: 5000,
  rounds: 2,
  browserChannel: 'chrome',
  angleBackend: 'd3d11',
});

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function replaceExactlyOnce(source, needle, replacement, label) {
  const first = source.indexOf(needle);
  if (first < 0 || source.indexOf(needle, first + needle.length) >= 0) {
    throw new Error(`${label} transform requires exactly one source anchor.`);
  }
  return `${source.slice(0, first)}${replacement}${source.slice(first + needle.length)}`;
}

const profilerPassInjection = `

const orbProfileGl = renderer.getContext();
const orbProfileTimerExtension = orbProfileGl.getExtension('EXT_disjoint_timer_query_webgl2');
let orbProfileActive = false;
let orbProfileFrameIndex = 0;
let orbProfileCaptureFrame = false;
let orbProfilePendingQueries = [];
let orbProfileSamples = [];

function runOrbProfileGpuSpan(label, operation) {
  if (!orbProfileActive || !orbProfileCaptureFrame) return operation();
  if (!orbProfileTimerExtension) throw new Error('EXT_disjoint_timer_query_webgl2 is required for Orb profiling');
  const query = orbProfileGl.createQuery();
  if (!query) throw new Error('WebGL2 could not create an Orb GPU timer query');
  const cpuStartedAt = performance.now();
  orbProfileGl.beginQuery(orbProfileTimerExtension.TIME_ELAPSED_EXT, query);
  try {
    return operation();
  } finally {
    orbProfileGl.endQuery(orbProfileTimerExtension.TIME_ELAPSED_EXT);
    const cpuEndedAt = performance.now();
    performance.measure(\`orb:\${label}\`, { start: cpuStartedAt, end: cpuEndedAt });
    orbProfilePendingQueries.push({ query, label, cpuSubmitMs: cpuEndedAt - cpuStartedAt });
  }
}

function beginOrbProfileLogicalFrame() {
  orbProfileFrameIndex += 1;
  orbProfileCaptureFrame = orbProfileActive && orbProfileFrameIndex % 30 === 1;
}

for (const [label, pass] of [
  ['main', renderPass],
  ['bloom', bloomPass],
  ['grade', gradePass],
  ['smaa', smaaPass],
  ['output', outputPass]
]) {
  const originalRender = pass.render.bind(pass);
  pass.render = (...args) => runOrbProfileGpuSpan(label, () => originalRender(...args));
}
`;

const profilerApiInjection = `

function orbProfileRendererMetadata() {
  const debugInfo = orbProfileGl.getExtension('WEBGL_debug_renderer_info');
  const drawingBuffer = renderer.getDrawingBufferSize(new THREE.Vector2());
  return {
    maskedVendor: orbProfileGl.getParameter(orbProfileGl.VENDOR),
    maskedRenderer: orbProfileGl.getParameter(orbProfileGl.RENDERER),
    unmaskedVendor: debugInfo ? orbProfileGl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : null,
    unmaskedRenderer: debugInfo ? orbProfileGl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : null,
    contextAttributes: orbProfileGl.getContextAttributes(),
    timerQueryAvailable: orbProfileTimerExtension !== null,
    timerQueryCounterBits: orbProfileTimerExtension
      ? orbProfileGl.getQuery(orbProfileTimerExtension.TIME_ELAPSED_EXT, orbProfileGl.QUERY_COUNTER_BITS_EXT)
      : 0,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    devicePixelRatio: window.devicePixelRatio,
    rendererPixelRatio: renderer.getPixelRatio(),
    drawingBuffer: { width: drawingBuffer.x, height: drawingBuffer.y },
    refractionTarget: { width: refractionTarget.width, height: refractionTarget.height },
    quality: settings.quality,
    passes: { bloom: bloomPass.enabled, smaa: smaaPass.enabled }
  };
}

async function stopOrbGpuProfile() {
  orbProfileActive = false;
  orbProfileCaptureFrame = false;
  orbProfileGl.finish();
  const deadline = performance.now() + 10000;
  while (orbProfilePendingQueries.length > 0) {
    if (orbProfileGl.getParameter(orbProfileTimerExtension.GPU_DISJOINT_EXT)) {
      throw new Error('Orb GPU timer query became disjoint');
    }
    const remaining = [];
    for (const record of orbProfilePendingQueries) {
      if (orbProfileGl.getQueryParameter(record.query, orbProfileGl.QUERY_RESULT_AVAILABLE)) {
        const elapsedNs = orbProfileGl.getQueryParameter(record.query, orbProfileGl.QUERY_RESULT);
        orbProfileSamples.push({
          label: record.label,
          gpuElapsedMs: elapsedNs / 1000000,
          cpuSubmitMs: record.cpuSubmitMs
        });
        orbProfileGl.deleteQuery(record.query);
      } else {
        remaining.push(record);
      }
    }
    orbProfilePendingQueries = remaining;
    if (remaining.length === 0) break;
    if (performance.now() >= deadline) throw new Error('Orb GPU timer queries did not resolve within 10 seconds');
    await new Promise((resolve) => setTimeout(resolve, 8));
  }
  return orbProfileSamples.map((sample) => ({ ...sample }));
}

const orbProfileQuery = new URLSearchParams(window.location.search).getAll('profile');
if (orbProfileQuery.length === 1 && orbProfileQuery[0] === '1') {
  window.__MIZU_KOKORO_PROFILE__ = Object.freeze({
    metadata: orbProfileRendererMetadata,
    markInteraction,
    isSculpting: () => isSculpting,
    startGpuProfile: () => {
      if (!orbProfileTimerExtension) throw new Error('EXT_disjoint_timer_query_webgl2 is required for Orb profiling');
      if (orbProfileActive || orbProfilePendingQueries.length > 0) throw new Error('Orb GPU profile is already active');
      orbProfileSamples = [];
      orbProfileFrameIndex = 0;
      orbProfileCaptureFrame = false;
      orbProfileActive = true;
    },
    stopGpuProfile: stopOrbGpuProfile
  });
}
`;

function instrumentSource(source) {
  let next = replaceExactlyOnce(
    source,
    'composer.addPass(outputPass);',
    `composer.addPass(outputPass);${profilerPassInjection}`,
    'profile pass instrumentation',
  );
  next = replaceExactlyOnce(
    next,
    `function renderRefractionBuffer() {
  const wasVisible = orbGroup.visible;
  orbGroup.visible = false;
  renderer.setRenderTarget(refractionTarget);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  orbGroup.visible = wasVisible;
}`,
    `function renderRefractionBuffer() {
  beginOrbProfileLogicalFrame();
  return runOrbProfileGpuSpan('refraction', () => {
    const wasVisible = orbGroup.visible;
    orbGroup.visible = false;
    renderer.setRenderTarget(refractionTarget);
    renderer.clear();
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    orbGroup.visible = wasVisible;
  });
}`,
    'refraction instrumentation',
  );
  return replaceExactlyOnce(
    next,
    'applyQuality(settings.quality);',
    `${profilerApiInjection}\napplyQuality(settings.quality);`,
    'profile API instrumentation',
  );
}

function applyVariant(source, variantId) {
  if (variantId === 'baseline') return source;
  if (variantId === 'smaa-off') {
    return replaceExactlyOnce(source, "smaaPass.enabled = level !== 'low';", 'smaaPass.enabled = false;', variantId);
  }
  if (variantId === 'bloom-off') {
    return replaceExactlyOnce(
      source,
      'const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), modes[0].bloom, 0.26, 0.94);',
      'const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), modes[0].bloom, 0.26, 0.94);\nbloomPass.enabled = false;',
      variantId,
    );
  }
  if (variantId === 'preserve-buffer-off') {
    return replaceExactlyOnce(source, 'preserveDrawingBuffer: true', 'preserveDrawingBuffer: false', variantId);
  }
  if (variantId === 'refraction-scale-0.5') {
    return replaceExactlyOnce(
      source,
      'const refractionScale = { high: 0.82, medium: 0.66, low: 0.5 }[settings.quality] || 0.66;',
      'const refractionScale = { high: 0.5, medium: 0.66, low: 0.5 }[settings.quality] || 0.66;',
      variantId,
    );
  }
  if (variantId === 'pixel-ratio-1.0') {
    return replaceExactlyOnce(
      source,
      'const caps = { high: 1.5, medium: 1.25, low: 1.0 };',
      'const caps = { high: 1.0, medium: 1.25, low: 1.0 };',
      variantId,
    );
  }
  throw new Error(`Unknown Orb profile variant: ${variantId}.`);
}

async function runCommand(command, args) {
  await new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit', windowsHide: true });
    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) resolvePromise();
      else reject(new Error(`${command} ${args.join(' ')} exited with ${String(code)}.`));
    });
  });
}

async function buildVariant(variant) {
  const worktree = join(worktreesRoot, variant.id);
  const dist = join(buildsRoot, variant.id);
  await cp(sourceRoot, worktree, {
    recursive: true,
    filter: (source) => !['node_modules', 'dist'].includes(basename(source)),
  });
  const mainPath = join(worktree, 'src', 'main.js');
  const original = await readFile(mainPath, 'utf8');
  const transformed = applyVariant(instrumentSource(original), variant.id);
  await writeFile(mainPath, transformed);
  const pnpmExecutable = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  await runCommand(pnpmExecutable, ['exec', 'vite', 'build', worktree, '--outDir', dist, '--emptyOutDir']);
  const html = await readFile(join(dist, 'index.html'));
  const htmlText = html.toString('utf8');
  const bundleMatch = htmlText.match(/<script[^>]+src="\.\/([^"]+\.js)"/);
  if (!bundleMatch) throw new Error(`${variant.id} build did not expose one relative app bundle.`);
  const bundle = await readFile(join(dist, bundleMatch[1]));
  return {
    ...variant,
    dist,
    htmlSha256: sha256(html),
    appBundle: bundleMatch[1],
    appSha256: sha256(bundle),
    transformedSourceSha256: sha256(Buffer.from(transformed)),
  };
}

const contentTypes = Object.freeze({
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
});

async function startBuildServer(builds) {
  const roots = new Map(builds.map((build) => [build.id, resolve(build.dist)]));
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? '/', 'http://127.0.0.1');
      const [variantId, ...segments] = decodeURIComponent(url.pathname).split('/').filter(Boolean);
      const buildRoot = roots.get(variantId);
      if (!buildRoot) {
        response.writeHead(404).end('Unknown profile build');
        return;
      }
      const relativePath = segments.length === 0 ? 'index.html' : segments.join('/');
      const filePath = resolve(buildRoot, relativePath);
      if (filePath !== buildRoot && !filePath.startsWith(`${buildRoot}${sep}`)) {
        response.writeHead(400).end('Invalid path');
        return;
      }
      const info = await stat(filePath);
      if (!info.isFile()) throw new Error('Not a file');
      response.writeHead(200, {
        'Content-Type': contentTypes[extname(filePath)] ?? 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });
  await new Promise((resolvePromise, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolvePromise);
  });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Orb profile server did not expose a TCP port.');
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolvePromise, reject) => server.close((error) => error ? reject(error) : resolvePromise())),
  };
}

async function profileApiCall(page, method) {
  return page.evaluate((methodName) => {
    const api = window.__MIZU_KOKORO_PROFILE__;
    if (!api || typeof api[methodName] !== 'function') throw new Error(`Orb profile API method ${methodName} is unavailable.`);
    return api[methodName]();
  }, method);
}

async function collectCadence(page, durationMs) {
  return page.evaluate((duration) => new Promise((resolvePromise, reject) => {
    const api = window.__MIZU_KOKORO_PROFILE__;
    if (!api) {
      reject(new Error('Orb profile API is unavailable during cadence collection.'));
      return;
    }
    const intervals = [];
    const startedAt = performance.now();
    const endsAt = startedAt + duration;
    let previousTimestamp = null;
    const keepAlive = setInterval(() => api.markInteraction(), 7000);
    api.markInteraction();
    const tick = (timestamp) => {
      if (timestamp > endsAt) {
        clearInterval(keepAlive);
        resolvePromise({ intervals, startedAt, endedAt: performance.now() });
        return;
      }
      if (timestamp >= startedAt) {
        if (previousTimestamp !== null) intervals.push(timestamp - previousTimestamp);
        previousTimestamp = timestamp;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), durationMs);
}

function summarizeGpuSamples(samples) {
  const labels = ['refraction', 'main', 'bloom', 'grade', 'smaa', 'output'];
  return Object.fromEntries(labels.map((label) => {
    const records = samples.filter((sample) => sample.label === label);
    if (records.length === 0) throw new Error(`GPU profile returned no ${label} samples.`);
    const gpu = records.map(({ gpuElapsedMs }) => gpuElapsedMs);
    const cpu = records.map(({ cpuSubmitMs }) => cpuSubmitMs);
    return [label, {
      sampleCount: records.length,
      gpuMedianMs: median(gpu),
      gpuP95Ms: nearestRankPercentile(gpu, 0.95),
      cpuSubmitMedianMs: median(cpu),
      cpuSubmitP95Ms: nearestRankPercentile(cpu, 0.95),
    }];
  }));
}

async function preparePage(context, url, variantId, phase) {
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  const response = await page.goto(`${url}/${variantId}/?profile=1`, {
    waitUntil: 'domcontentloaded',
    timeout: 30_000,
  });
  if (!response?.ok()) throw new Error(`${variantId}/${phase} navigation failed with HTTP ${response?.status() ?? 'none'}.`);
  await page.waitForFunction(() => typeof window.__MIZU_KOKORO_PROFILE__ === 'object', undefined, { timeout: 30_000 });
  const metadata = await profileApiCall(page, 'metadata');
  if (metadata.quality !== protocol.quality) throw new Error(`${variantId} quality was ${metadata.quality}.`);
  if (!metadata.timerQueryAvailable || metadata.timerQueryCounterBits <= 0) {
    throw new Error(`${variantId} requires a usable EXT_disjoint_timer_query_webgl2 extension.`);
  }
  if (!String(metadata.unmaskedRenderer).includes('NVIDIA GeForce RTX 4070 Ti')) {
    throw new Error(`${variantId} renderer is not the fixed NVIDIA GeForce RTX 4070 Ti: ${String(metadata.unmaskedRenderer)}.`);
  }
  const expectedPreserve = variantId !== 'preserve-buffer-off';
  if (metadata.contextAttributes?.preserveDrawingBuffer !== expectedPreserve) {
    throw new Error(`${variantId} preserveDrawingBuffer did not match its single-variable treatment.`);
  }
  if (phase === 'sculpt') {
    const canvas = page.locator('#scene');
    const box = await canvas.boundingBox();
    if (!box) throw new Error(`${variantId} sculpt canvas has no bounding box.`);
    const pointer = { x: box.x + box.width * 0.5, y: box.y + box.height * 0.5 };
    await page.mouse.move(pointer.x, pointer.y);
    await page.mouse.down();
    await page.waitForFunction(() => window.__MIZU_KOKORO_PROFILE__?.isSculpting() === true, undefined, { timeout: 5000 });
    return { page, metadata, consoleErrors, pointer };
  }
  return { page, metadata, consoleErrors, pointer: null };
}

async function measureCondition(context, serverUrl, variantId, phase, round) {
  const prepared = await preparePage(context, serverUrl, variantId, phase);
  try {
    await collectCadence(prepared.page, protocol.warmupMs);
    const raw = await collectCadence(prepared.page, protocol.measurementMs);
    if (phase === 'sculpt' && !(await profileApiCall(prepared.page, 'isSculpting'))) {
      throw new Error(`${variantId} stopped sculpting during round ${round}.`);
    }
    const metadataAfter = await profileApiCall(prepared.page, 'metadata');
    if (JSON.stringify(metadataAfter) !== JSON.stringify(prepared.metadata)) {
      throw new Error(`${variantId} renderer metadata drifted during round ${round} ${phase}.`);
    }
    if (prepared.consoleErrors.length > 0) {
      throw new Error(`${variantId} emitted console errors: ${prepared.consoleErrors.join(' | ')}.`);
    }
    return {
      round,
      variant: variantId,
      phase,
      pointer: prepared.pointer,
      rawIntervalsMs: raw.intervals,
      summary: summarizeCadence(raw.intervals),
      metadata: prepared.metadata,
    };
  } finally {
    if (phase === 'sculpt') await prepared.page.mouse.up().catch(() => {});
    await prepared.page.close();
  }
}

async function readTraceStream(session, streamHandle) {
  let text = '';
  while (true) {
    const chunk = await session.send('IO.read', { handle: streamHandle });
    text += chunk.data;
    if (chunk.eof) break;
  }
  await session.send('IO.close', { handle: streamHandle });
  return text;
}

async function measureGpuBreakdown(context, serverUrl, phase, round) {
  const prepared = await preparePage(context, serverUrl, 'baseline', phase);
  const session = await context.newCDPSession(prepared.page);
  try {
    await collectCadence(prepared.page, protocol.gpuProfileWarmupMs);
    await session.send('Tracing.start', {
      categories: 'devtools.timeline,blink.user_timing,gpu',
      transferMode: 'ReturnAsStream',
    });
    await profileApiCall(prepared.page, 'startGpuProfile');
    await collectCadence(prepared.page, protocol.gpuProfileMeasurementMs);
    const samples = await profileApiCall(prepared.page, 'stopGpuProfile');
    const tracingComplete = new Promise((resolvePromise) => session.once('Tracing.tracingComplete', resolvePromise));
    await session.send('Tracing.end');
    const complete = await tracingComplete;
    const traceText = await readTraceStream(session, complete.stream);
    const tracePath = join(tracesRoot, `baseline-${phase}-round-${round}.json`);
    await writeFile(tracePath, traceText);
    const trace = JSON.parse(traceText);
    const userTimingEvents = trace.traceEvents.filter((event) => String(event.name).startsWith('orb:'));
    return {
      round,
      phase,
      rawSamples: samples,
      summaryByPass: summarizeGpuSamples(samples),
      trace: {
        relativePath: relative(root, tracePath).replaceAll('\\', '/'),
        sha256: sha256(Buffer.from(traceText)),
        byteLength: Buffer.byteLength(traceText),
        userTimingEventCount: userTimingEvents.length,
        gpuEventCount: trace.traceEvents.filter((event) => event.cat?.includes('gpu')).length,
      },
    };
  } finally {
    if (phase === 'sculpt') await prepared.page.mouse.up().catch(() => {});
    await session.detach().catch(() => {});
    await prepared.page.close();
  }
}

await mkdir(outputRoot, { recursive: true });
await rm(worktreesRoot, { recursive: true, force: true });
await rm(buildsRoot, { recursive: true, force: true });
await mkdir(worktreesRoot, { recursive: true });
await mkdir(buildsRoot, { recursive: true });
await mkdir(tracesRoot, { recursive: true });

const builds = [];
for (const variant of ORB_PROFILE_VARIANTS) builds.push(await buildVariant(variant));
assertExactVariantIds(builds.map(({ id }) => ({ variant: id })));
const server = await startBuildServer(builds);
const browser = await chromium.launch({
  channel: protocol.browserChannel,
  headless: true,
  args: ['--use-gl=angle', '--use-angle=d3d11', '--disable-software-rasterizer'],
});
const context = await browser.newContext({
  viewport: protocol.viewport,
  screen: protocol.viewport,
  deviceScaleFactor: protocol.deviceScaleFactor,
  locale: 'en-US',
  timezoneId: 'UTC',
  colorScheme: 'dark',
  reducedMotion: 'no-preference',
  serviceWorkers: 'block',
});

const result = {
  schemaVersion: 1,
  ticket: 'T-AO-03',
  generatedAt: new Date().toISOString(),
  protocol,
  builds: builds.map(({ dist: _dist, ...build }) => build),
  measurements: [],
  gpuBreakdowns: [],
};

try {
  for (let round = 1; round <= protocol.rounds; round += 1) {
    const order = round === 1 ? builds : [...builds].reverse();
    for (const build of order) {
      for (const phase of ['idle', 'sculpt']) {
        const record = await measureCondition(context, server.baseUrl, build.id, phase, round);
        result.measurements.push(record);
        console.log(`${build.id} round ${round} ${phase}: ${record.summary.fps.toFixed(2)} FPS, p95 ${record.summary.p95FrameTimeMs.toFixed(3)} ms`);
      }
    }
    for (const phase of ['idle', 'sculpt']) {
      result.gpuBreakdowns.push(await measureGpuBreakdown(context, server.baseUrl, phase, round));
    }
    await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`);
  }
  await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`Orb profile raw result: ${relative(root, resultPath)}`);
} finally {
  await context.close();
  await browser.close();
  await server.close();
}
