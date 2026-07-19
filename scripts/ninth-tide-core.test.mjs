import { describe, expect, it } from 'vitest';
import {
  assertBundledPlaywrightVersion,
  assertCapturePolicy,
  canonicalRgba8Bytes,
  measureRgba8,
  NINTH_TIDE_BROWSER_LAUNCH_OPTIONS,
  NINTH_TIDE_CONTEXT_OPTIONS,
  parseNinthTideConfig,
  readHitFixture,
  sha256Hex,
  validateStepResult,
  validateHitFixture,
} from './ninth-tide-core.mjs';
import {
  NINTH_TIDE_CAPTURE_POLICY,
  NINTH_TIDE_VIEWPORT,
} from './ninth-tide-policy.mjs';

function makeFixture() {
  const pointDefinitions = [
    ['center', 'center'],
    ['edge-positive', 'top'],
    ['edge-positive', 'right'],
    ['edge-positive', 'bottom'],
    ['edge-positive', 'left'],
    ['negative', 'top'],
    ['negative', 'right'],
    ['negative', 'bottom'],
    ['negative', 'left'],
  ];
  return {
    schemaVersion: 1,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    canvasBox: { x: 0, y: 0, width: 1440, height: 900 },
    sections: Array.from({ length: 9 }, (_, section) => ({
      section,
      points: pointDefinitions.map(([kind, axis], index) => ({
        id: `${kind}-${axis}`,
        kind,
        axis,
        clientX: 700 + index,
        clientY: 440 + index,
        beforeHit: section >= 7 && kind === 'edge-positive' && axis === 'right'
          ? false
          : kind !== 'negative',
      })),
    })),
  };
}

describe('Ninth Tide QA configuration', () => {
  it('requires an absolute HTTP(S) SHOWROOM_URL and fixes all artifact paths', () => {
    expect(() => parseNinthTideConfig({})).toThrow(/SHOWROOM_URL is required/);
    expect(() => parseNinthTideConfig({ SHOWROOM_URL: 'preview.local' })).toThrow(/absolute HTTP/);
    expect(() => parseNinthTideConfig({ SHOWROOM_URL: 'file:///tmp/dist' })).toThrow(/absolute HTTP/);
    expect(parseNinthTideConfig({ SHOWROOM_URL: 'http://127.0.0.1:4173/base/' })).toEqual({
      baseUrl: 'http://127.0.0.1:4173/base',
      buildUrl: 'http://127.0.0.1:4173/base/exhibits/ninth-tide-archive/index.html',
      fixturePath: 'docs/direction/hit-targets-v1.json',
      outputDir: 'output/playwright/ninth-tide',
    });
  });

  it('pins bundled Playwright, SwiftShader, and deterministic context options', () => {
    expect(() => assertBundledPlaywrightVersion('1.59.0')).toThrow(/requires Playwright 1.60.0/);
    expect(() => assertBundledPlaywrightVersion('1.60.0')).not.toThrow();
    expect(NINTH_TIDE_BROWSER_LAUNCH_OPTIONS).toEqual({
      headless: true,
      args: [
        '--use-gl=angle',
        '--use-angle=swiftshader',
        '--enable-unsafe-swiftshader',
      ],
    });
    expect(NINTH_TIDE_CONTEXT_OPTIONS).toMatchObject({
      viewport: { width: 1440, height: 900 },
      screen: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      locale: 'en-US',
      timezoneId: 'UTC',
      colorScheme: 'dark',
      reducedMotion: 'no-preference',
      serviceWorkers: 'block',
    });
  });
});

describe('Ninth Tide canonical pixels and policy', () => {
  it('hashes canonical dimensions and top-left RGBA8 bytes', () => {
    const canonical = canonicalRgba8Bytes(1, 1, Uint8Array.from([1, 2, 3, 255]));
    expect(canonical.subarray(0, 6).toString('ascii')).toBe('rgba8\0');
    expect(canonical.readUInt32BE(6)).toBe(1);
    expect(canonical.readUInt32BE(10)).toBe(1);
    expect(sha256Hex(canonical))
      .toBe('a14792619b0e2d23001fc7fa81f207ce9f26e116a0f7dec7127aecc400a5829d');
    expect(() => canonicalRgba8Bytes(2, 1, Uint8Array.from([1, 2, 3, 4])))
      .toThrow(/byte length/);
  });

  it('uses integer RGBA accumulation and fixed rounding for metrics', () => {
    const metrics = measureRgba8(
      2,
      1,
      Uint8Array.from([255, 0, 0, 255, 0, 0, 255, 255]),
      { x: 0, y: 0, width: 2, height: 1 },
    );
    expect(metrics).toEqual({
      nonBlackPixels: 2,
      roiLuma: 36.312,
      roiRgbMean: { red: 127.5, green: 0, blue: 127.5 },
      warmBalance: 0,
      warmDominant: false,
    });
  });

  it('requires gold-like red separation from both green and blue for warm dominance', () => {
    const gold = measureRgba8(
      1,
      1,
      Uint8Array.from([109, 86, 19, 255]),
      { x: 0, y: 0, width: 1, height: 1 },
    );
    const warmNeutral = measureRgba8(
      1,
      1,
      Uint8Array.from([102, 100, 69, 255]),
      { x: 0, y: 0, width: 1, height: 1 },
    );
    expect(gold.warmDominant).toBe(true);
    expect(warmNeutral.warmDominant).toBe(false);
  });

  it('defines 11 fixed states and makes only chapter V warm-dominant', () => {
    expect(NINTH_TIDE_VIEWPORT).toEqual({ width: 1440, height: 900, deviceScaleFactor: 1 });
    expect(NINTH_TIDE_CAPTURE_POLICY).toHaveLength(11);
    expect(new Set(NINTH_TIDE_CAPTURE_POLICY.map(({ timestampMs }) => timestampMs)).size).toBe(11);
    expect(NINTH_TIDE_CAPTURE_POLICY.filter(({ warmDominant }) => warmDominant).map(({ id }) => id))
      .toEqual(['section-4']);
    expect(NINTH_TIDE_CAPTURE_POLICY.map(({ expectedPhase }) => expectedPhase))
      .toEqual(['I', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'IX']);
    expect(NINTH_TIDE_CAPTURE_POLICY.every(({ roiLuma }) => (
      roiLuma.min >= 0.02 && roiLuma.max <= 9 && roiLuma.min < roiLuma.max
    ))).toBe(true);
  });

  it('fails capture policy gates instead of widening calibration ranges', () => {
    const policy = NINTH_TIDE_CAPTURE_POLICY[0];
    expect(() => assertCapturePolicy({ nonBlackPixels: 0, roiLuma: 10, warmDominant: false }, policy))
      .toThrow(/entirely black/);
    expect(() => assertCapturePolicy({ nonBlackPixels: 1, roiLuma: 255, warmDominant: false }, policy))
      .toThrow(/outside/);
    expect(() => assertCapturePolicy({ nonBlackPixels: 1, roiLuma: 0.3, warmDominant: true }, policy))
      .toThrow(/warmDominant/);
  });

  it('strictly validates the hook audit and renderer diagnostics', () => {
    const policy = NINTH_TIDE_CAPTURE_POLICY[0];
    const result = {
      mode: 'opening',
      section: 0,
      timestampMs: 5_750,
      frameRenders: 1,
      queuedAnimationFrames: 0,
      stateDigest: 'b'.repeat(64),
      framebuffer: {
        hash: 'a'.repeat(64),
        width: 1440,
        height: 900,
      },
      renderer: {
        raw: 'ANGLE (Google, Vulkan 1.3 SwiftShader Device)',
        debugInfoAvailable: true,
        contextAttributes: { alpha: false, antialias: true },
      },
      chapter: { mode: 'opening', section: 0, phase: 'I' },
      chapterNumber: 1,
    };
    expect(validateStepResult(result, policy)).toBe(result);

    expect(() => validateStepResult({ ...result, frameRenders: 2 }, policy))
      .toThrow(/exactly one frame/);
    expect(() => validateStepResult({
      ...result,
      renderer: { ...result.renderer, raw: 'hardware renderer' },
    }, policy)).toThrow(/did not use SwiftShader/);
    expect(() => validateStepResult({
      ...result,
      renderer: { ...result.renderer, contextAttributes: null },
    }, policy)).toThrow(/context attributes are unavailable/);
  });
});

describe('Ninth Tide committed hit fixture', () => {
  it('accepts the exact nine-section schema including the section 7/8 misses', () => {
    const fixture = makeFixture();
    expect(validateHitFixture(fixture)).toBe(fixture);
  });

  it('fails fast on schema, viewport, and known-miss drift', () => {
    const extraKey = makeFixture();
    extraKey.unexpected = true;
    expect(() => validateHitFixture(extraKey)).toThrow(/exactly/);

    const wrongViewport = makeFixture();
    wrongViewport.viewport.width = 1280;
    expect(() => validateHitFixture(wrongViewport)).toThrow(/viewport\/DPR/);

    const missingKnownMiss = makeFixture();
    for (const point of missingKnownMiss.sections[7].points) {
      if (point.kind === 'edge-positive') point.beforeHit = true;
    }
    expect(() => validateHitFixture(missingKnownMiss)).toThrow(/horizontal edge miss/);

    const falseCenter = makeFixture();
    falseCenter.sections[0].points[0].beforeHit = false;
    expect(() => validateHitFixture(falseCenter)).toThrow(/center must hit/);

    const trueNegative = makeFixture();
    trueNegative.sections[0].points.at(-1).beforeHit = true;
    expect(() => validateHitFixture(trueNegative)).toThrow(/negative points must miss/);

    const falseEarlyEdge = makeFixture();
    falseEarlyEdge.sections[6].points[1].beforeHit = false;
    expect(() => validateHitFixture(falseEarlyEdge)).toThrow(/edge-positive points must hit/);
  });

  it('does not regenerate a missing fixture online', async () => {
    await expect(readHitFixture('docs/direction/definitely-missing-hit-targets.json'))
      .rejects.toThrow(/Required committed Ninth Tide hit fixture is missing/);
  });
});
