import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import {
  assertRenderableContent,
  measureRenderableContent,
  requireSourceRevision,
  WEATHER_IDENTITY_PREWARM_TIMES_MS,
  WEATHER_IDENTITY_SAMPLE_TIMES_MS,
} from './water-weather-identity.mjs';

function frame(color) {
  const width = 160;
  const height = 136;
  const pixels = Buffer.alloc(width * height * 4);
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    pixels.set(color, pixel * 4);
  }
  return { width, height, bytesPerPixel: 4, pixels };
}

describe('weather identity runner contracts', () => {
  it('rejects injected near-white, near-black, and low-information formal frames', () => {
    const nearWhite = frame([253, 253, 253, 255]);
    const nearBlack = frame([2, 2, 2, 255]);
    const flatMidtone = frame([128, 128, 128, 255]);
    const rendered = frame([30, 55, 75, 255]);
    const palette = [
      [30, 55, 75, 255],
      [65, 95, 110, 255],
      [105, 135, 145, 255],
      [155, 180, 175, 255],
      [210, 225, 215, 255],
    ];
    for (let y = 0; y < rendered.height; y += 1) {
      for (let x = 0; x < rendered.width; x += 1) {
        const band = (Math.floor(x / 12) + Math.floor(y / 10)) % palette.length;
        rendered.pixels.set(palette[band], (y * rendered.width + x) * 4);
      }
    }

    expect(measureRenderableContent(nearWhite).valid).toBe(false);
    expect(measureRenderableContent(nearBlack).valid).toBe(false);
    expect(measureRenderableContent(flatMidtone).valid).toBe(false);
    expect(() => assertRenderableContent(nearWhite, 'near-white injection')).toThrow(
      /not renderable content/,
    );
    expect(() => assertRenderableContent(nearBlack, 'near-black injection')).toThrow(
      /not renderable content/,
    );
    expect(assertRenderableContent(rendered, 'rendered fixture').valid).toBe(true);
  });

  it('requires and normalizes a full source revision', () => {
    expect(requireSourceRevision({
      TELEMETRY_SOURCE_REVISION: 'ABCDEF0123456789ABCDEF0123456789ABCDEF01',
    })).toBe('abcdef0123456789abcdef0123456789abcdef01');
    expect(() => requireSourceRevision({})).toThrow(/TELEMETRY_SOURCE_REVISION/);
    expect(() => requireSourceRevision({ TELEMETRY_SOURCE_REVISION: 'abc123' })).toThrow(
      /40-character/,
    );
  });

  it('keeps prewarm separate from the original formal sampling phase', () => {
    expect(WEATHER_IDENTITY_PREWARM_TIMES_MS).toEqual([1600, 3200, 4800]);
    expect(WEATHER_IDENTITY_SAMPLE_TIMES_MS).toEqual([
      1600, 2400, 3200, 4000, 4800, 5600, 6400, 7200,
    ]);
  });

  it('freezes the epoch before navigation and advances boot timers before readiness waits', async () => {
    const source = await readFile('scripts/water-weather-identity.mjs', 'utf8');
    const setupStart = source.indexOf('async function prepareDeterministicPage');
    const setupEnd = source.indexOf('\n}\n\nasync function prewarmRenderer', setupStart);
    const setup = source.slice(setupStart, setupEnd);
    const orderedSetup = [
      'await page.clock.install({ time: epoch });',
      'await page.clock.pauseAt(epoch);',
      'await page.goto(',
      "selectOption('en')",
      'await page.clock.runFor(BOOT_TIME_MS);',
      "await canvas.waitFor({ state: 'visible'",
      "await page.locator('.canvas-loader').waitFor({ state: 'hidden'",
      "await page.locator('[data-telemetry-state=\"live\"]')",
    ];
    let previous = -1;
    for (const operation of orderedSetup) {
      const position = setup.indexOf(operation);
      expect(position, `${operation} must exist after the preceding deterministic setup step`).toBeGreaterThan(
        previous,
      );
      previous = position;
    }

    const captureStart = source.indexOf('async function captureState');
    const captureEnd = source.indexOf('\n}\n\nfunction assertEquivalentControls', captureStart);
    const capture = source.slice(captureStart, captureEnd);
    const deterministicSetup = capture.indexOf('await prepareDeterministicPage(page, baseUrl)');
    const weatherClick = capture.indexOf(
      'await page.getByTestId(`voxel-water-weather-${weather}`).click()',
    );
    expect(deterministicSetup).toBeGreaterThan(-1);
    expect(weatherClick).toBeGreaterThan(deterministicSetup);
    expect(source).toContain('deterministicBoot: {');
    expect(source).toContain("advanceMethod: 'clock.runFor'");
  });
});
