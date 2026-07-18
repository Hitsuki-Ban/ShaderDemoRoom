import { describe, expect, it } from 'vitest';
import { FrameStatsWindow } from './frameStats';

describe('FrameStatsWindow', () => {
  it('reports window averages, maxima, frame time, and triangles', () => {
    const window = new FrameStatsWindow(0.5);

    expect(window.push(0, { calls: 99, triangles: 999 })).toBeNull();
    expect(window.push(0.2, { calls: 3, triangles: 30 })).toBeNull();
    expect(window.push(0.3, { calls: 7, triangles: 50 })).toEqual({
      fps: 4,
      frameTimeMs: 250,
      drawCalls: 5,
      drawCallsMax: 7,
      trianglesAvg: 40,
    });
  });

  it('starts a fresh window after reporting', () => {
    const window = new FrameStatsWindow(0.1);

    expect(window.push(0.1, { calls: 8, triangles: 80 })?.drawCalls).toBe(8);
    expect(window.push(0.1, { calls: 2, triangles: 20 })?.drawCalls).toBe(2);
  });
});
