import { describe, expect, it, vi } from 'vitest';
import type { WebGLRenderer } from 'three';
import type { RoomRuntime } from '../../rooms/types';
import { RoomAnimationLoop } from './roomAnimationLoop';

function createLoopHarness(callsForFrame = (frame: number) => frame * 2) {
  let animationLoop: ((timestamp: number) => void) | null = null;
  const context = {
    VENDOR: 1,
    RENDERER: 2,
    getExtension: vi.fn(() => null),
    getParameter: vi.fn((parameter: number) =>
      parameter === 1 ? 'Masked Vendor' : 'Masked Renderer',
    ),
  };
  const info = {
    render: { calls: 0, triangles: 0 },
    memory: { textures: 2, geometries: 4 },
    programs: [{}, {}, {}],
    reset: vi.fn(() => {
      info.render.calls = 0;
      info.render.triangles = 0;
    }),
  };
  let renderCount = 0;
  const deltas: number[] = [];
  const runtime: RoomRuntime = {
    updateSettings: vi.fn(),
    setMotionScale: vi.fn(),
    resize: vi.fn(),
    render: vi.fn(({ delta }) => {
      renderCount += 1;
      info.render.calls = callsForFrame(renderCount);
      info.render.triangles = renderCount * 20;
      deltas.push(delta);
    }),
    pause: vi.fn(),
    resume: vi.fn(),
    dispose: vi.fn(),
  };
  const renderer = {
    info,
    getContext: vi.fn(() => context),
    setAnimationLoop: vi.fn((callback: ((timestamp: number) => void) | null) => {
      animationLoop = callback;
    }),
  } as unknown as WebGLRenderer;
  const onStats = vi.fn();
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
  it('reads frame and live resource counters before the owned info reset', () => {
    const harness = createLoopHarness();
    harness.loop.prepareRuntime(harness.runtime);
    harness.loop.activate();
    const tick = harness.getAnimationLoop();
    if (!tick) {
      throw new Error('Expected an active animation callback.');
    }

    tick(0);
    tick(125);
    tick(250);

    expect(harness.onStats).toHaveBeenCalledWith(
      expect.objectContaining({
        fps: 8,
        frameTimeMs: 125,
        frameTimeP95Ms: null,
        sampleState: 'warming',
        drawCalls: 5,
        drawCallsMax: 6,
        trianglesAvg: 50,
        textures: 2,
        geometries: 4,
        programs: 3,
        environment: expect.objectContaining({ classification: 'unknown' }),
      }),
    );
    expect(harness.renderer.info.reset).toHaveBeenCalledTimes(5);
  });

  it('preserves the calibrated 19-call logical-frame baseline', () => {
    const harness = createLoopHarness(() => 19);
    harness.loop.prepareRuntime(harness.runtime);
    harness.loop.activate();
    harness.getAnimationLoop()?.(0);
    harness.getAnimationLoop()?.(125);
    harness.getAnimationLoop()?.(250);

    expect(harness.onStats).toHaveBeenCalledWith(
      expect.objectContaining({ drawCalls: 19, drawCallsMax: 19 }),
    );
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
