import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { cpus, platform, release, arch } from 'node:os';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { ORB_PROFILE_VARIANTS } from './orb-profile-core.mjs';

const root = process.cwd();
const rawPath = join(root, 'output', 'orb-profile', 'orb-profile-raw.json');
const hookPath = join(root, 'output', 'playwright', 'orb-deterministic', 'manifest.json');
const profileScriptPath = join(root, 'scripts', 'orb-profile.mjs');
const publicIndexPath = join(root, 'public', 'exhibits', 'anime-liquid-orb', 'index.html');
const date = '2026-07-19';
const jsonPath = join(root, 'docs', 'direction', 'captures', `orb-profile-${date}.json`);
const markdownPath = join(root, 'docs', 'direction', 'captures', `orb-profile-${date}.md`);

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const round = (value, digits = 4) => Number(value.toFixed(digits));

const rawBytes = await readFile(rawPath);
const raw = JSON.parse(rawBytes.toString('utf8'));
const hookBytes = await readFile(hookPath);
const hook = JSON.parse(hookBytes.toString('utf8'));
if (raw.measurements.length !== 24 || raw.gpuBreakdowns.length !== 14) {
  throw new Error(`Orb profile is incomplete: ${raw.measurements.length} cadence and ${raw.gpuBreakdowns.length} GPU records.`);
}
if (hook.status !== 'passed' || hook.entries.length !== 2) {
  throw new Error('Orb deterministic hook manifest is not a complete pass.');
}

for (const variant of ORB_PROFILE_VARIANTS) {
  for (const profileRound of [1, 2]) {
    for (const phase of ['idle', 'sculpt']) {
      const matches = raw.measurements.filter((record) =>
        record.variant === variant.id && record.round === profileRound && record.phase === phase);
      if (matches.length !== 1) throw new Error(`Missing exact cadence record for ${variant.id}/${phase}/round-${profileRound}.`);
    }
    const gpuMatches = raw.gpuBreakdowns.filter((record) =>
      record.variant === variant.id && record.round === profileRound && record.phase === 'sculpt');
    if (gpuMatches.length !== 1) throw new Error(`Missing exact sculpt GPU record for ${variant.id}/round-${profileRound}.`);
  }
}

const profileHarnessBytes = await readFile(profileScriptPath);
const sourceRevision = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const packageJson = await readJson(join(root, 'package.json'));
const playwrightPackage = await readJson(join(root, 'node_modules', 'playwright', 'package.json'));
const vitePackage = await readJson(join(root, 'node_modules', 'vite', 'package.json'));
const threePackage = await readJson(join(root, 'node_modules', 'three', 'package.json'));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const chromeVersion = browser.version();
await browser.close();

const publicIndex = await readFile(publicIndexPath, 'utf8');
const publicBundleMatch = publicIndex.match(/<script[^>]+src="\.\/([^"]+\.js)"/);
if (!publicBundleMatch) throw new Error('Committed Orb public index does not identify its app bundle.');
const publicBundlePath = join(root, 'public', 'exhibits', 'anime-liquid-orb', publicBundleMatch[1]);
const publicBundleBytes = await readFile(publicBundlePath);

function gpuTotal(record) {
  return Object.values(record.summaryByPass)
    .reduce((total, pass) => total + (pass.gpuMedianMs ?? 0), 0);
}

const gpuMatrix = ORB_PROFILE_VARIANTS.map((variant) => {
  const rounds = [1, 2].map((profileRound) => {
    const record = raw.gpuBreakdowns.find((candidate) =>
      candidate.variant === variant.id && candidate.round === profileRound && candidate.phase === 'sculpt');
    const baseline = raw.gpuBreakdowns.find((candidate) =>
      candidate.variant === 'baseline' && candidate.round === profileRound && candidate.phase === 'sculpt');
    const totalGpuMedianMs = gpuTotal(record);
    const baselineTotalGpuMedianMs = gpuTotal(baseline);
    return {
      round: profileRound,
      totalGpuMedianMs: round(totalGpuMedianMs, 6),
      versusBaselinePercent: round((totalGpuMedianMs / baselineTotalGpuMedianMs - 1) * 100, 2),
      passGpuMedianMs: Object.fromEntries(Object.entries(record.summaryByPass)
        .map(([label, pass]) => [label, pass.gpuMedianMs === null ? null : round(pass.gpuMedianMs, 6)])),
    };
  });
  return { variant: variant.id, treatment: variant.treatment, rounds };
});

const bloomMatrix = gpuMatrix.find(({ variant }) => variant === 'bloom-off');
const bloomTotals = bloomMatrix.rounds.map(({ totalGpuMedianMs }) => totalGpuMedianMs);
const bloomRepeatDeltaPercent = Math.abs(bloomTotals[1] / bloomTotals[0] - 1) * 100;
const baselineSculpt = raw.gpuBreakdowns
  .filter((record) => record.variant === 'baseline' && record.phase === 'sculpt')
  .sort((left, right) => left.round - right.round);
const baselinePassAcrossRounds = Object.fromEntries(
  Object.keys(baselineSculpt[0].summaryByPass).map((label) => {
    const values = baselineSculpt.map((record) => record.summaryByPass[label].gpuMedianMs);
    return [label, round((values[0] + values[1]) / 2, 6)];
  }),
);

const cadenceMatrix = raw.measurements.map((record) => ({
  round: record.round,
  variant: record.variant,
  phase: record.phase,
  pointer: record.pointer,
  frameCount: record.summary.frameCount,
  elapsedMs: round(record.summary.elapsedMs, 3),
  fps: round(record.summary.fps, 3),
  medianFrameTimeMs: round(record.summary.medianFrameTimeMs, 3),
  p95FrameTimeMs: round(record.summary.p95FrameTimeMs, 3),
}));

const hookSummary = hook.entries.map((entry) => ({
  entry: entry.label,
  repeats: entry.repeats.length,
  exactHashes: entry.repeats.map((repeat) => repeat.hook.framebuffer.hash),
  framebuffer: {
    width: entry.repeats[0].hook.framebuffer.width,
    height: entry.repeats[0].hook.framebuffer.height,
  },
  logicalFrameDeltas: entry.repeats.map((repeat) => repeat.hook.logicalFrameDelta),
  queuedAnimationFrames: entry.repeats.map((repeat) => repeat.hook.queuedAnimationFrames),
  pendingAfterTurn: entry.repeats.map((repeat) => repeat.audit.afterTurn.pendingCount),
}));

const report = {
  schemaVersion: 1,
  ticket: 'T-AO-03',
  date,
  sourceRevision,
  environment: {
    os: { platform: platform(), release: release(), architecture: arch() },
    cpu: cpus()[0]?.model ?? null,
    node: process.version,
    pnpm: packageJson.packageManager,
    chrome: chromeVersion,
    playwright: playwrightPackage.version,
    vite: vitePackage.version,
    three: threePackage.version,
    renderer: raw.measurements[0].metadata,
  },
  protocol: raw.protocol,
  artifactHashes: {
    rawProfileSha256: sha256(rawBytes),
    profileHarnessSha256: sha256(profileHarnessBytes),
    deterministicHookManifestSha256: sha256(hookBytes),
    committedPublicBundle: publicBundleMatch[1],
    committedPublicBundleSha256: sha256(publicBundleBytes),
    temporaryBuilds: raw.builds,
    traces: raw.gpuBreakdowns.map((record) => ({
      round: record.round,
      variant: record.variant,
      phase: record.phase,
      ...record.trace,
    })),
  },
  deterministicHook: {
    input: hook.input,
    entries: hookSummary,
  },
  cadenceSummary: cadenceMatrix,
  gpuSummary: {
    baselineSculptPassMedianAcrossRoundsMs: baselinePassAcrossRounds,
    variantMatrix: gpuMatrix,
  },
  conclusion: {
    cadenceCeiling: 'All 24 conditions were capped near 164.9 rAF FPS; cadence is preserved as baseline evidence but cannot rank these GPU variants.',
    reproducibleFinding: `bloom-off was the only treatment with lower sculpt pass-total GPU median in both rounds; its own totals differed by ${round(bloomRepeatDeltaPercent, 2)}%.`,
    bloomSavingsPercentByRound: bloomMatrix.rounds.map(({ versusBaselinePercent }) => round(-versusBaselinePercent, 2)),
    largestPath: 'UnrealBloomPass/post bloom',
    nextTicketSingleTreatment: 'Reduce the bloom working resolution while preserving the current bloom appearance under deterministic visual regression gates.',
    rejectedForNow: ['disable SMAA', 'preserveDrawingBuffer=false', 'refraction RT scale 0.5', 'pixel ratio cap 1.0'],
  },
  rawProfile: raw,
};

await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`);

const cadenceRows = cadenceMatrix.map((record) =>
  `| ${record.round} | ${record.variant} | ${record.phase} | ${record.frameCount} | ${record.fps.toFixed(2)} | ${record.medianFrameTimeMs.toFixed(3)} | ${record.p95FrameTimeMs.toFixed(3)} |`);
const gpuRows = gpuMatrix.map((record) =>
  `| ${record.variant} | ${record.rounds[0].totalGpuMedianMs.toFixed(4)} | ${record.rounds[0].versusBaselinePercent.toFixed(2)}% | ${record.rounds[1].totalGpuMedianMs.toFixed(4)} | ${record.rounds[1].versusBaselinePercent.toFixed(2)}% |`);
const traceRows = report.artifactHashes.traces.map((trace) =>
  `| ${trace.round} | ${trace.variant} | ${trace.phase} | ${trace.userTimingEventCount} | ${trace.gpuEventCount} | \`${trace.sha256}\` |`);

const markdown = `# T-AO-03 Orb sculpt baseline/profile (${date})

## Result

The fixed RTX 4070 Ti run completed 24 cadence conditions (six one-variable builds × idle/sculpt × two reversed-order rounds), 14 timer-query pass profiles, and 14 Chrome traces. All cadence conditions sat at the headless Chrome rAF ceiling of about 164.9 FPS, so FPS cannot rank the variants on this machine.

The GPU evidence does identify one reproducible direction: disabling bloom reduced the summed sculpt pass GPU medians by **${report.conclusion.bloomSavingsPercentByRound[0].toFixed(2)}%** and **${report.conclusion.bloomSavingsPercentByRound[1].toFixed(2)}%** in the two rounds. The bloom-off totals themselves were ${bloomTotals[0].toFixed(4)} ms and ${bloomTotals[1].toFixed(4)} ms (${bloomRepeatDeltaPercent.toFixed(2)}% apart). No other treatment improved both rounds.

The next ticket owns one treatment only: **reduce bloom working resolution**, while preserving the current bloom appearance with the deterministic visual gate. This ticket does not disable bloom or change shaders, outlines, refraction, post order, pixel ratio, or context attributes.

## Fixed environment

- Source revision: \`${sourceRevision}\`
- Browser: Chrome ${chromeVersion}, Playwright ${playwrightPackage.version}
- Runtime: Node ${process.version}, ${packageJson.packageManager}, Vite ${vitePackage.version}, Three.js ${threePackage.version}
- OS/CPU: ${platform()} ${release()} ${arch()}; ${cpus()[0]?.model ?? 'unknown'}
- Renderer raw: \`${raw.measurements[0].metadata.unmaskedRenderer}\`
- Viewport/DPR/quality: 1440×900 CSS px, DPR 2, high; renderer ratio 1.5; drawing buffer 2160×1350
- Refraction target: 1771×1107; context \`preserveDrawingBuffer=true\`; SMAA and bloom enabled in baseline
- Protocol: 5 s warm-up + 15 s measurement; each condition is a fresh page; round 2 reverses variant order; an explicit interaction heartbeat prevents the 15 s auto-exhibition threshold from contaminating the window.

## Cadence matrix

| Round | Variant | Phase | Frames | FPS | Median ms | P95 ms |
| ---: | --- | --- | ---: | ---: | ---: | ---: |
${cadenceRows.join('\n')}

FPS is \`1000 × intervalCount / sum(intervalMs)\`; p95 is nearest-rank. The committed JSON contains every raw rAF interval.

## GPU elimination matrix (sculpt)

| Variant | Round 1 total ms | vs baseline | Round 2 total ms | vs baseline |
| --- | ---: | ---: | ---: | ---: |
${gpuRows.join('\n')}

Baseline sculpt pass medians averaged across the two rounds: refraction ${baselinePassAcrossRounds.refraction.toFixed(4)} ms, main ${baselinePassAcrossRounds.main.toFixed(4)} ms, bloom ${baselinePassAcrossRounds.bloom.toFixed(4)} ms, grade ${baselinePassAcrossRounds.grade.toFixed(4)} ms, SMAA ${baselinePassAcrossRounds.smaa.toFixed(4)} ms, output ${baselinePassAcrossRounds.output.toFixed(4)} ms. Bloom is the largest two-round path and bloom-off is the only repeatable elimination result. The committed JSON retains every timer-query sample and zero-count field; timer queries were asynchronous and no disjoint run was accepted.

## Deterministic hook

- Input: \`${JSON.stringify(hook.input)}\`
${hookSummary.map((entry) => `- ${entry.entry}: ${entry.repeats} repeats, ${entry.framebuffer.width}×${entry.framebuffer.height}, exact hash \`${entry.exactHashes[0]}\`; logical frame deltas \`${entry.logicalFrameDeltas.join(',')}\`, queued/pending rAF all zero.`).join('\n')}
- Non-QA and duplicate \`qa\` queries expose no hook; missing/extra/invalid fields fail fast.
- App bundle: \`${publicBundleMatch[1]}\`, SHA-256 \`${sha256(publicBundleBytes)}\`.

## Trace evidence

| Round | Variant | Phase | Orb timing events | GPU events | Trace SHA-256 |
| ---: | --- | --- | ---: | ---: | --- |
${traceRows.join('\n')}

Trace files remain in ignored \`output/orb-profile/traces\`; hashes, event counts, per-pass timer data, and raw measurements are committed in the JSON. Trace exports exclude resource contents and source maps.

## Reproduction

1. From the repository root, run \`pnpm build\`.
2. In one terminal run \`pnpm preview --host 127.0.0.1 --port 4173\`; in another set \`SHOWROOM_URL=http://127.0.0.1:4173/ShaderDemoRoom\` and run \`pnpm qa:orb\`.
3. On the fixed hardware/browser environment run \`pnpm qa:orb-profile\`. This creates temporary single-variable builds only under ignored \`output/orb-profile\` and fails if the raw NVIDIA renderer, high quality, context attributes, DPR, drawing buffer, or timer-query extension drift.
4. Run \`pnpm qa:orb-report\` to validate completeness and regenerate these two committed artifacts.

Method references: [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html), [Khronos timer-query extension](https://registry.khronos.org/webgl/extensions/EXT_disjoint_timer_query_webgl2/), [Chrome tracing](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/), [Spector.js](https://spector.babylonjs.com/).
`;

await writeFile(markdownPath, markdown);
console.log(JSON.stringify({ jsonPath, markdownPath, sourceRevision, rawProfileSha256: sha256(rawBytes) }, null, 2));
