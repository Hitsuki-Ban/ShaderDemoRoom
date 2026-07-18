import type { RoomStats } from '../../rooms/types';

export const CURRENT_STATS_WINDOW_SECONDS = 0.5;

export interface RendererFrameMetrics {
  calls: number;
  triangles: number;
}

export class FrameStatsWindow {
  private elapsed = 0;
  private frames = 0;
  private callsTotal = 0;
  private callsMax = 0;
  private trianglesTotal = 0;

  constructor(
    private readonly windowSeconds = CURRENT_STATS_WINDOW_SECONDS,
  ) {
    if (!Number.isFinite(windowSeconds) || windowSeconds <= 0) {
      throw new Error(`Invalid stats window: ${windowSeconds}`);
    }
  }

  push(
    elapsedDelta: number,
    metrics: RendererFrameMetrics,
  ): RoomStats | null {
    if (!Number.isFinite(elapsedDelta) || elapsedDelta < 0) {
      throw new Error(`Invalid stats delta: ${elapsedDelta}`);
    }
    if (elapsedDelta === 0) {
      return null;
    }

    this.elapsed += elapsedDelta;
    this.frames += 1;
    this.callsTotal += metrics.calls;
    this.callsMax = Math.max(this.callsMax, metrics.calls);
    this.trianglesTotal += metrics.triangles;

    if (this.elapsed < this.windowSeconds) {
      return null;
    }

    const stats = {
      fps: this.frames / this.elapsed,
      frameTimeMs: (this.elapsed / this.frames) * 1000,
      drawCalls: Number((this.callsTotal / this.frames).toFixed(1)),
      drawCallsMax: this.callsMax,
      trianglesAvg: Math.round(this.trianglesTotal / this.frames),
    };
    this.reset();
    return stats;
  }

  reset(): void {
    this.elapsed = 0;
    this.frames = 0;
    this.callsTotal = 0;
    this.callsMax = 0;
    this.trianglesTotal = 0;
  }
}
