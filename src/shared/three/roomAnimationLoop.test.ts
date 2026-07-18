import { describe, expect, it, vi } from 'vitest';
import type { WebGLRenderer } from 'three';
import type { RoomRuntime } from '../../rooms/types';
import { RoomAnimationLoop } from './roomAnimationLoop';

function createLoopHarness() {
  let animationLoop: ((timestamp: number) => void) | null = null;
  const info = {
    render: { calls: 0, triangles: 0 },
    reset: vi.fn(() => {
      info.render.calls = 0;
      info.render.triangles = 0;
    }),
  };
  let renderCount = 0;
  const runtime: RoomRuntime = {
    updateSettings: vi.fn(),
    setMotionScale: vi.fn(),
    resize: vi.fn(),
    render: vi.fn(({ delta }) => {
      renderCount += 1;
      info.render.calls = renderCount * 2;
      info.render.triangles = renderCount * 20;
      deltas.push(delta);
    }),
    pause: vi.fn(),
    resume: vi.fn(),
    dispose: vi.fn(),
  };
  const renderer = {
    info,
    setAnimationLoop: vi.fn((callback: ((timestamp: number) => void) | null) => {
      animationLoop = callback;
    }),
  } as unknown as WebGLRenderer;
  const onStats = vi.fn();
  const deltas: number[] = [];
  const loop = new RoomAnimationLoop({ renderer, getRuntime: () => runtime, onStats });

  return {
    deltas,
    getAnimationLoop: () => animationLoop,
    loop,
    onStats,
    renderer,
    runtime,
  };
}

describe('RoomAnimationLoop', () => {
  it('owns per-frame info reset and reports logical-frame window statistics', () => {
    const harness = createLoopHarness();
    harness.loop.prepareRuntime(harness.runtime);
    harness.loop.activate();
    const tick = harness.getAnimationLoop();
    if (!tick) {
      throw new Error('Expected an active animation callback.');
    }

    tick(0);
    tick(250);
    tick(500);

    expect(harness.onStats).toHaveBeenCalledWith({
      fps: 4,
      frameTimeMs: 250,
      drawCalls: 5,
      drawCallsMax: 6,
      trianglesAvg: 50,
    });
    expect(harness.renderer.info.reset).toHaveBeenCalledTimes(5);
  });

  it('stops for hidden and inactive reasons and discards paused wall time', () => {
    const harness = createLoopHarness();
    harness.loop.prepareRuntime(harness.runtime);
    harness.loop.activate();
    harness.getAnimationLoop()?.(100);
    harness.getAnimationLoop()?.(150);

    harness.loop.setDocumentHidden(true);
    expect(harness.getAnimationLoop()).toBeNull();
    expect(harness.runtime.pause).toHaveBeenCalledOnce();

    harness.loop.setDocumentHidden(false);
    expect(harness.runtime.resume).toHaveBeenCalledOnce();
    harness.getAnimationLoop()?.(10_000);
    harness.getAnimationLoop()?.(10_050);

    expect(harness.deltas).toEqual([0, 0.05, 0, 0.05]);

    harness.loop.setDocumentHidden(true);
    harness.loop.deactivate();
    harness.loop.setDocumentHidden(false);
    expect(harness.getAnimationLoop()).toBeNull();
    expect(harness.runtime.resume).toHaveBeenCalledOnce();
  });
});
