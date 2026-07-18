import { describe, expect, it } from 'vitest';
import type { RendererEnvironment } from './rendererEnvironment';
import {
  FRAME_TIME_HISTORY_BUCKETS,
  FrameStatsWindow,
  type RendererFrameMetrics,
} from './frameStats';

const environment: RendererEnvironment = {
  maskedVendor: 'WebKit',
  maskedRenderer: 'WebKit WebGL',
  unmaskedVendor: null,
  unmaskedRenderer: null,
  classification: 'unknown',
  classificationReason: 'unmasked renderer unavailable',
};

function metrics(
  overrides: Partial<RendererFrameMetrics> = {},
): RendererFrameMetrics {
  return {
    calls: 3,
    triangles: 30,
    textures: 2,
    geometries: 4,
    programs: 6,
    environment,
    ...overrides,
  };
}

describe('FrameStatsWindow', () => {
  it.each([
    { cadenceSeconds: 1 / 60, expectedFps: 60 },
    { cadenceSeconds: 1 / 30, expectedFps: 30 },
    { cadenceSeconds: 1 / 4, expectedFps: 4 },
  ])(
    'keeps cadence and frame time reciprocal at $expectedFps FPS',
    ({ cadenceSeconds, expectedFps }) => {
      const window = new FrameStatsWindow();
      let latest = null;
      const frameCount = Math.ceil(2.5 / cadenceSeconds);

      for (let frame = 0; frame < frameCount; frame += 1) {
        latest = window.push(cadenceSeconds, metrics()) ?? latest;
      }

      expect(latest?.fps).toBeCloseTo(expectedFps, 8);
      expect(latest?.frameTimeMs).toBeCloseTo(1000 / expectedFps, 8);
      expect((latest?.fps ?? 0) * (latest?.frameTimeMs ?? 0)).toBeCloseTo(
        1000,
        8,
      );
    },
  );

  it('publishes no faster than 4Hz and reports one shared headline sample set', () => {
    const window = new FrameStatsWindow();

    expect(window.push(0, metrics({ calls: 99 }))).toBeNull();
    expect(window.push(0.125, metrics({ calls: 3, triangles: 30 }))).toBeNull();
    expect(window.push(0.125, metrics({ calls: 7, triangles: 50 }))).toEqual(
      expect.objectContaining({
        fps: 8,
        frameTimeMs: 125,
        frameTimeP95Ms: null,
        sampleState: 'warming',
        drawCalls: 5,
        drawCallsMax: 7,
        trianglesAvg: 40,
        textures: 2,
        geometries: 4,
        programs: 6,
        environment,
      }),
    );
  });

  it('uses nearest-rank p95 after 30 raw cadence samples', () => {
    const window = new FrameStatsWindow();
    let stats = null;

    for (let index = 0; index < 28; index += 1) {
      stats = window.push(0.01, metrics()) ?? stats;
    }
    stats = window.push(0.11, metrics()) ?? stats;
    stats = window.push(0.11, metrics()) ?? stats;

    expect(stats).toEqual(
      expect.objectContaining({
        frameTimeP95Ms: 110,
        sampleState: 'live',
      }),
    );
  });

  it('keeps a 60-bucket history and leaves empty 250ms buckets as gaps', () => {
    const window = new FrameStatsWindow();
    const first = window.push(0.25, metrics());
    const second = window.push(0.5, metrics());

    expect(first?.frameTimeHistoryMs).toHaveLength(FRAME_TIME_HISTORY_BUCKETS);
    expect(first?.frameTimeHistoryMs.at(-1)).toBe(250);
    expect(second?.frameTimeHistoryMs.slice(-3)).toEqual([250, null, 500]);
  });

  it('clears samples, publication cadence, and history on reset', () => {
    const window = new FrameStatsWindow();
    window.push(0.25, metrics());
    window.reset();

    const stats = window.push(0.25, metrics({ calls: 9 }));
    expect(stats).toEqual(
      expect.objectContaining({
        sampleState: 'warming',
        drawCalls: 9,
      }),
    );
    expect(stats?.frameTimeHistoryMs.filter((value) => value !== null)).toEqual([
      250,
    ]);
  });
});
