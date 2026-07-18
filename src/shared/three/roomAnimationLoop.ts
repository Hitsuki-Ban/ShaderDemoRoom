import type { WebGLRenderer } from 'three';
import type { RoomRuntime, RoomStats } from '../../rooms/types';
import { getFrameTiming } from './renderPolicy';
import { FrameStatsWindow, type RendererFrameMetrics } from './frameStats';
import {
  getRendererEnvironment,
  type RendererEnvironment,
} from './rendererEnvironment';

export type RuntimePauseReason = 'hidden' | 'inactive';

interface RoomAnimationLoopOptions {
  renderer: WebGLRenderer;
  getRuntime: () => RoomRuntime | null;
  onStats: (stats: RoomStats) => void;
}

class ActiveFrameClock {
  private elapsed = 0;
  private lastTimestamp: number | null = null;

  next(timestamp: number) {
    const rawDelta =
      this.lastTimestamp === null ? 0 : (timestamp - this.lastTimestamp) / 1000;
    this.lastTimestamp = timestamp;
    const timing = getFrameTiming(rawDelta);
    this.elapsed += timing.simulationDelta;
    return { ...timing, elapsed: this.elapsed };
  }

  discardPausedTime(): void {
    this.lastTimestamp = null;
  }

  resetSession(): void {
    this.elapsed = 0;
    this.lastTimestamp = null;
  }
}

export class RoomAnimationLoop {
  private readonly pausedReasons = new Set<RuntimePauseReason>(['inactive']);
  private readonly clock = new ActiveFrameClock();
  private readonly stats = new FrameStatsWindow();
  private readonly environment: RendererEnvironment;
  private runtimePrepared = false;
  private runtimePaused = false;

  constructor(private readonly options: RoomAnimationLoopOptions) {
    this.environment = getRendererEnvironment(options.renderer);
  }

  activate(): void {
    this.setPaused('inactive', false);
  }

  deactivate(): void {
    this.setPaused('inactive', true);
  }

  setDocumentHidden(hidden: boolean): void {
    this.setPaused('hidden', hidden);
  }

  prepareRuntime(runtime: RoomRuntime): void {
    this.clock.resetSession();
    this.stats.reset();
    this.options.renderer.info.reset();
    this.runtimePrepared = true;
    this.runtimePaused = false;
    if (this.pausedReasons.has('hidden')) {
      runtime.pause?.();
      this.runtimePaused = true;
    }
  }

  dispose(): void {
    this.deactivate();
    this.runtimePrepared = false;
    this.runtimePaused = false;
  }

  private readonly tick = (timestamp: number) => {
    const runtime = this.options.getRuntime();
    if (!runtime) {
      this.clock.discardPausedTime();
      this.options.renderer.info.reset();
      return;
    }

    const { elapsed, simulationDelta: delta, statsDelta } =
      this.clock.next(timestamp);
    let metrics: RendererFrameMetrics;
    try {
      runtime.render({ elapsed, delta });
      metrics = {
        calls: this.options.renderer.info.render.calls,
        triangles: this.options.renderer.info.render.triangles,
        textures: this.options.renderer.info.memory.textures,
        geometries: this.options.renderer.info.memory.geometries,
        programs: this.options.renderer.info.programs?.length ?? null,
        environment: this.environment,
      };
    } finally {
      this.options.renderer.info.reset();
    }

    const stats = this.stats.push(statsDelta, metrics);
    if (stats) {
      this.options.onStats(stats);
    }
  };

  private setPaused(reason: RuntimePauseReason, paused: boolean): void {
    const wasPaused = this.pausedReasons.size > 0;
    if (paused) {
      this.pausedReasons.add(reason);
    } else {
      this.pausedReasons.delete(reason);
    }
    const isPaused = this.pausedReasons.size > 0;

    if (wasPaused === isPaused) {
      return;
    }

    this.clock.discardPausedTime();
    this.stats.reset();
    this.options.renderer.info.reset();
    const runtime = this.options.getRuntime();

    if (isPaused) {
      this.options.renderer.setAnimationLoop(null);
      if (this.runtimePrepared && !this.runtimePaused) {
        runtime?.pause?.();
        this.runtimePaused = true;
      }
      return;
    }

    if (this.runtimePrepared && this.runtimePaused) {
      runtime?.resume?.();
      this.runtimePaused = false;
    }
    this.options.renderer.setAnimationLoop(this.tick);
  }
}
