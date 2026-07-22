import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { chromium } from 'playwright';
import { parsePng } from './water-qa-metrics.mjs';
import {
  areaAverageResize,
  composeContactSheet,
  encodePng,
  encodedRec709Luma,
  posterizeFrame,
} from './water-value-metrics.mjs';

const CANDIDATES = Object.freeze(['sheltered', 'balanced', 'monumental']);
const STATES = Object.freeze([
  Object.freeze({ id: 'clear', route: '#/room/voxel-water' }),
  Object.freeze({ id: 'rain', route: '#/room/voxel-water?v=3&weather=rain' }),
  Object.freeze({
    id: 'storm',
    route: '#/room/voxel-water?v=3&weather=storm&wind=2.1&rain=0.74&waveHeight=1.08&cloudCover=0.78&swell=0.9&chop=0.82&foam=0.78&clarity=0.52&surfaceDetail=0.86&currentDirection=58&currentStrength=0.78&skyTime=0.24&colorTemperature=-0.22&voxelColorVariance=0.46',
  }),
]);
const BASE_URL = process.env.SHOWROOM_URL;
const OUTPUT_ROOT = 'output/water-landmark-study';
const EVIDENCE_ROOT = 'docs/direction/captures';
const EVIDENCE_SHEET = `${EVIDENCE_ROOT}/t-vw-01-gate-a-contact-sheet.png`;
const EVIDENCE_REPORT = `${EVIDENCE_ROOT}/t-vw-01-gate-a-study.json`;
const SOURCE_PATH = 'src/rooms/voxel-water/landmarkModel.ts';
const VIEWPORT = Object.freeze({ width: 1440, height: 900 });
const TILE = Object.freeze({ width: 240, height: 204 });
const THUMBNAIL = Object.freeze({ width: 160, height: 136 });
const CLOCK_EPOCH = '2026-01-01T00:00:00.000Z';
const WARM_UP_MS = 1200;
const SETTLE_MS = 1000;
const execFileAsync = promisify(execFile);

function fail(message) {
  throw new Error(message);
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function grayscaleFrame(frame) {
  const pixels = Buffer.alloc(frame.width * frame.height * 4);
  for (let pixel = 0; pixel < frame.width * frame.height; pixel += 1) {
    const source = pixel * frame.bytesPerPixel;
    const target = pixel * 4;
    const gray = Math.round(encodedRec709Luma(
      frame.pixels[source],
      frame.pixels[source + 1],
      frame.pixels[source + 2],
    ));
    pixels[target] = gray;
    pixels[target + 1] = gray;
    pixels[target + 2] = gray;
    pixels[target + 3] = 255;
  }
  return { width: frame.width, height: frame.height, bytesPerPixel: 4, pixels };
}

function nearestResize(frame, targetWidth, targetHeight) {
  const pixels = Buffer.alloc(targetWidth * targetHeight * 4);
  for (let y = 0; y < targetHeight; y += 1) {
    const sourceY = Math.min(frame.height - 1, Math.floor(y * frame.height / targetHeight));
    for (let x = 0; x < targetWidth; x += 1) {
      const sourceX = Math.min(frame.width - 1, Math.floor(x * frame.width / targetWidth));
      const source = (sourceY * frame.width + sourceX) * frame.bytesPerPixel;
      const target = (y * targetWidth + x) * 4;
      pixels[target] = frame.pixels[source];
      pixels[target + 1] = frame.pixels[source + 1];
      pixels[target + 2] = frame.pixels[source + 2];
      pixels[target + 3] = frame.bytesPerPixel === 4 ? frame.pixels[source + 3] : 255;
    }
  }
  return { width: targetWidth, height: targetHeight, bytesPerPixel: 4, pixels };
}

function stackVertically(frames) {
  if (frames.length === 0) fail('Combined landmark study requires candidate sheets.');
  const width = frames[0].width;
  const height = frames.reduce((total, frame) => {
    if (frame.width !== width) fail('Candidate contact sheets must have the same width.');
    return total + frame.height;
  }, 0);
  const pixels = Buffer.alloc(width * height * 4);
  let targetY = 0;
  for (const frame of frames) {
    for (let y = 0; y < frame.height; y += 1) {
      const sourceStart = y * frame.width * frame.bytesPerPixel;
      const targetStart = (targetY + y) * width * 4;
      for (let x = 0; x < frame.width; x += 1) {
        const source = sourceStart + x * frame.bytesPerPixel;
        const target = targetStart + x * 4;
        pixels[target] = frame.pixels[source];
        pixels[target + 1] = frame.pixels[source + 1];
        pixels[target + 2] = frame.pixels[source + 2];
        pixels[target + 3] = frame.bytesPerPixel === 4 ? frame.pixels[source + 3] : 255;
      }
    }
    targetY += frame.height;
  }
  return { width, height, bytesPerPixel: 4, pixels };
}

async function verifyActiveCandidate(candidateId) {
  const source = await readFile(SOURCE_PATH, 'utf8');
  const match = source.match(/ACTIVE_LANDMARK_CANDIDATE_ID\s*=\s*'([^']+)'/);
  if (!match) fail(`Cannot read active landmark candidate from ${SOURCE_PATH}.`);
  if (match[1] !== candidateId) {
    fail(`Requested candidate "${candidateId}" but source selects "${match[1]}".`);
  }
  return sha256(source);
}

async function listFilesRecursively(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await listFilesRecursively(path));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

async function computeStudyRevision() {
  const paths = [
    'package.json',
    'pnpm-lock.yaml',
    'vite.config.ts',
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.node.json',
    'scripts/water-landmark-study.mjs',
    ...await listFilesRecursively('src'),
  ].sort();
  const hash = createHash('sha256');
  for (const path of paths) {
    let source = await readFile(path);
    if (path === SOURCE_PATH) {
      source = Buffer.from(source.toString('utf8').replace(
        /ACTIVE_LANDMARK_CANDIDATE_ID\s*=\s*'[^']+'/,
        "ACTIVE_LANDMARK_CANDIDATE_ID = '__candidate__'",
      ));
    }
    hash.update(path);
    hash.update('\0');
    hash.update(source);
    hash.update('\0');
  }
  return hash.digest('hex');
}

async function buildCurrentSource() {
  const isWindows = process.platform === 'win32';
  const command = isWindows ? (process.env.ComSpec ?? 'C:\\Windows\\System32\\cmd.exe') : 'pnpm';
  const argumentsList = isWindows ? ['/d', '/s', '/c', 'pnpm.cmd build'] : ['build'];
  try {
    await execFileAsync(command, argumentsList, {
      cwd: process.cwd(),
      maxBuffer: 32 * 1024 * 1024,
      windowsHide: true,
    });
  } catch (error) {
    const diagnostics = [error?.message, error?.stdout, error?.stderr].filter(Boolean).join('\n');
    fail(`Landmark study build failed.${diagnostics ? `\n${diagnostics}` : ''}`);
  }
}

async function verifyBuiltCandidate(candidateId) {
  const assetNames = (await readdir('dist/assets')).filter((name) => name.endsWith('.js'));
  const matches = [];
  const assetHashes = {};
  for (const assetName of assetNames) {
    const buffer = await readFile(`dist/assets/${assetName}`);
    const source = buffer.toString('utf8');
    for (const match of source.matchAll(/\(`(sheltered|balanced|monumental)`\)/g)) {
      matches.push({ candidateId: match[1], assetName });
      assetHashes[assetName] = sha256(buffer);
    }
  }
  if (matches.length !== 1 || matches[0].candidateId !== candidateId) {
    fail(`Built landmark candidate does not uniquely match "${candidateId}": ${JSON.stringify(matches)}.`);
  }
  const localIndex = await readFile('dist/index.html');
  const response = await fetch(`${BASE_URL.replace(/\/$/, '')}/`);
  if (!response.ok) fail(`Preview index request failed with HTTP ${response.status}.`);
  const servedIndex = Buffer.from(await response.arrayBuffer());
  if (!servedIndex.equals(localIndex)) {
    fail('SHOWROOM_URL is not serving the current local dist/index.html.');
  }
  return {
    distIndexSha256: sha256(localIndex),
    candidateAsset: matches[0].assetName,
    candidateAssetSha256: assetHashes[matches[0].assetName],
  };
}

async function captureState(browser, state) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'en',
    reducedMotion: 'no-preference',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  const epoch = new Date(CLOCK_EPOCH);
  await page.clock.install({ time: epoch });
  await page.clock.pauseAt(epoch);
  await page.goto(`${BASE_URL}/${state.route}`, { waitUntil: 'load' });
  const canvas = page.locator('.shader-canvas');
  await canvas.waitFor({ state: 'visible', timeout: 10_000 });
  await page.locator('.canvas-loader').waitFor({ state: 'hidden', timeout: 10_000 });
  await page.clock.runFor(WARM_UP_MS);
  await page.locator('[data-telemetry-state="live"]').waitFor({ state: 'visible', timeout: 10_000 });
  await page.clock.runFor(SETTLE_MS);
  const png = await canvas.screenshot({ type: 'png' });
  await context.close();
  if (errors.length > 0) fail(`${state.id} emitted console errors: ${errors.join(' | ')}`);
  const frame = parsePng(png);
  let lumaTotal = 0;
  let pixelsAbove32 = 0;
  let minimumLuma = 255;
  let maximumLuma = 0;
  for (let pixel = 0; pixel < frame.width * frame.height; pixel += 1) {
    const offset = pixel * frame.bytesPerPixel;
    const luma = encodedRec709Luma(
      frame.pixels[offset],
      frame.pixels[offset + 1],
      frame.pixels[offset + 2],
    );
    lumaTotal += luma;
    if (luma > 32) pixelsAbove32 += 1;
    minimumLuma = Math.min(minimumLuma, luma);
    maximumLuma = Math.max(maximumLuma, luma);
  }
  const pixelCount = frame.width * frame.height;
  const frameStats = {
    meanLuma: lumaTotal / pixelCount,
    pixelsAbove32Ratio: pixelsAbove32 / pixelCount,
    lumaRange: maximumLuma - minimumLuma,
  };
  if (frameStats.meanLuma < 20
    || frameStats.pixelsAbove32Ratio < 0.1
    || frameStats.lumaRange < 20) {
    fail(`${state.id} capture is blank or near-black.`);
  }
  return { frame, frameStats };
}

const candidateId = process.argv[2];
if (!CANDIDATES.includes(candidateId)) {
  fail(`Candidate argument must be one of: ${CANDIDATES.join(', ')}.`);
}
if (!BASE_URL) fail('SHOWROOM_URL is required; the study never guesses a preview server.');

const sourceHash = await verifyActiveCandidate(candidateId);
await buildCurrentSource();
const studyRevisionSha256 = await computeStudyRevision();
const buildEvidence = await verifyBuiltCandidate(candidateId);
const studyOutput = `${OUTPUT_ROOT}/${studyRevisionSha256}`;
const candidateOutput = `${studyOutput}/${candidateId}`;
await mkdir(candidateOutput, { recursive: true });
const browser = await chromium.launch({ headless: true });
const records = [];
const contactTiles = [];
try {
  for (const state of STATES) {
    console.log(`Capturing landmark ${candidateId}: ${state.id}`);
    const capture = await captureState(browser, state);
    const tile = areaAverageResize(capture.frame, TILE.width, TILE.height);
    const grayscale = grayscaleFrame(tile);
    const posterized = posterizeFrame(tile).frame;
    const thumbnail = areaAverageResize(capture.frame, THUMBNAIL.width, THUMBNAIL.height);
    const thumbnailPresentation = nearestResize(thumbnail, TILE.width, TILE.height);
    const artifacts = {
      original: `${candidateOutput}/${state.id}-original.png`,
      grayscale: `${candidateOutput}/${state.id}-grayscale.png`,
      posterized: `${candidateOutput}/${state.id}-four-value.png`,
      thumbnail: `${candidateOutput}/${state.id}-thumbnail-160.png`,
    };
    const artifactBuffers = {
      original: encodePng(capture.frame),
      grayscale: encodePng(grayscale),
      posterized: encodePng(posterized),
      thumbnail: encodePng(thumbnail),
    };
    await Promise.all([
      writeFile(artifacts.original, artifactBuffers.original),
      writeFile(artifacts.grayscale, artifactBuffers.grayscale),
      writeFile(artifacts.posterized, artifactBuffers.posterized),
      writeFile(artifacts.thumbnail, artifactBuffers.thumbnail),
    ]);
    contactTiles.push(tile, grayscale, posterized, thumbnailPresentation);
    records.push({
      id: state.id,
      frameStats: capture.frameStats,
      artifacts,
      artifactSha256: Object.fromEntries(Object.entries(artifactBuffers).map(
        ([name, buffer]) => [name, sha256(buffer)],
      )),
    });
  }
} finally {
  await browser.close();
}

const contactSheet = composeContactSheet(contactTiles, 4);
const contactSheetPath = `${candidateOutput}/contact-sheet.png`;
await writeFile(contactSheetPath, encodePng(contactSheet));
const candidateReport = {
  candidateId,
  sourcePath: SOURCE_PATH,
  sourceSha256: sourceHash,
  studyRevisionSha256,
  build: buildEvidence,
  baseUrl: BASE_URL,
  contract: {
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'en',
    reducedMotion: 'no-preference',
    clockEpoch: CLOCK_EPOCH,
    warmUpMs: WARM_UP_MS,
    settleMs: SETTLE_MS,
    rowOrder: STATES.map((state) => state.id),
    columnOrder: ['original', 'grayscale', 'four-value', '160px-thumbnail'],
  },
  states: records,
  contactSheet: contactSheetPath,
};
await writeFile(
  `${candidateOutput}/report.json`,
  `${JSON.stringify(candidateReport, null, 2)}\n`,
);

const candidateSheets = [];
const candidateEvidence = [];
for (const id of CANDIDATES) {
  try {
    const sheetBuffer = await readFile(`${studyOutput}/${id}/contact-sheet.png`);
    const reportBuffer = await readFile(`${studyOutput}/${id}/report.json`);
    const report = JSON.parse(reportBuffer);
    if (report.candidateId !== id
      || report.studyRevisionSha256 !== studyRevisionSha256
      || report.sourcePath !== SOURCE_PATH
      || !report.build?.candidateAssetSha256
      || JSON.stringify(report.contract?.rowOrder) !== JSON.stringify(STATES.map((state) => state.id))
      || JSON.stringify(report.contract?.columnOrder)
        !== JSON.stringify(['original', 'grayscale', 'four-value', '160px-thumbnail'])) {
      fail(`Candidate evidence schema or revision mismatch for "${id}".`);
    }
    candidateSheets.push(parsePng(sheetBuffer));
    candidateEvidence.push({
      candidateId: id,
      sourceSha256: report.sourceSha256,
      studyRevisionSha256: report.studyRevisionSha256,
      build: report.build,
    });
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}
if (candidateSheets.length === CANDIDATES.length) {
  const combinedPath = `${studyOutput}/gate-a-contact-sheet.png`;
  const combinedPng = encodePng(stackVertically(candidateSheets));
  const evidence = {
    candidateOrder: CANDIDATES,
    rowOrderWithinCandidate: STATES.map((state) => state.id),
    columnOrder: ['original', 'grayscale', 'four-value', '160px-thumbnail'],
    contactSheet: combinedPath,
    contactSheetSha256: sha256(combinedPng),
    studyRevisionSha256,
    candidates: candidateEvidence,
  };
  await mkdir(EVIDENCE_ROOT, { recursive: true });
  await Promise.all([
    writeFile(combinedPath, combinedPng),
    writeFile(EVIDENCE_SHEET, combinedPng),
    writeFile(`${studyOutput}/gate-a-order.json`, `${JSON.stringify(evidence, null, 2)}\n`),
    writeFile(EVIDENCE_REPORT, `${JSON.stringify({
      ...evidence,
      contactSheet: EVIDENCE_SHEET,
    }, null, 2)}\n`),
  ]);
}
console.log(`Landmark study captured ${candidateId}: ${contactSheetPath}`);
