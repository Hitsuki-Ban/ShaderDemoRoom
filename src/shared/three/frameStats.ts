import type { RoomStats } from '../../rooms/types';
import type { RendererEnvironment } from './rendererEnvironment';

export const RAW_STATS_WINDOW_MS = 10_000;
export const HEADLINE_STATS_WINDOW_MS = 2_000;
export const STATS_PUBLISH_INTERVAL_MS = 250;
export const FRAME_TIME_HISTORY_BUCKETS = 60;
export const FRAME_TIME_HISTORY_BUCKET_MS = 250;
export const P95_MINIMUM_SAMPLE_COUNT = 30;

export interface RendererFrameMetrics {
  calls: number;
  triangles: number;
  textures: number;
  geometries: number;
  programs: number | null;
  environment: RendererEnvironment;
}

interface FrameSample {
  activeTimeMs: number;
  cadenceMs: number;
  calls: number;
  triangles: number;
}

interface HistoryBucket {
  totalMs: number;
  samples: number;
}

function nearestRankP95(values: readonly number[]): number {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.ceil(sorted.length * 0.95) - 1];
}

function assertMetric(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`Invalid renderer ${label}: ${value}`);
  }
}

export class FrameStatsWindow {
  private activeTimeMs = 0;
  private lastPublicationMs = 0;
  private samples: FrameSample[] = [];
  private readonly historyBuckets = new Map<number, HistoryBucket>();

  push(elapsedDelta: number, metrics: RendererFrameMetrics): RoomStats | null {
    if (!Number.isFinite(elapsedDelta) || elapsedDelta < 0) {
      throw new Error(`Invalid stats delta: ${elapsedDelta}`);
    }
    if (elapsedDelta === 0) {
      return null;
    }

    assertMetric(metrics.calls, 'calls');
    assertMetric(metrics.triangles, 'triangles');
    assertMetric(metrics.textures, 'textures');
    assertMetric(metrics.geometries, 'geometries');
    if (metrics.programs !== null) {
      assertMetric(metrics.programs, 'programs');
    }

    const cadenceMs = elapsedDelta * 1000;
    this.activeTimeMs += cadenceMs;
    const sample = {
      activeTimeMs: this.activeTimeMs,
      cadenceMs,
      calls: metrics.calls,
      triangles: metrics.triangles,
    };
    this.samples.push(sample);
    this.samples = this.samples.filter(
      ({ activeTimeMs }) =>
        activeTimeMs >= this.activeTimeMs - RAW_STATS_WINDOW_MS,
    );
    this.recordHistorySample(sample);

    if (
      this.activeTimeMs - this.lastPublicationMs <
      STATS_PUBLISH_INTERVAL_MS
    ) {
      return null;
    }
    this.lastPublicationMs = this.activeTimeMs;

    const headlineStart = this.activeTimeMs - HEADLINE_STATS_WINDOW_MS;
    const headlineSamples = this.samples.filter(
      ({ activeTimeMs }) => activeTimeMs >= headlineStart,
    );
    const cadenceTotalMs = headlineSamples.reduce(
      (total, current) => total + current.cadenceMs,
      0,
    );
    const rawCadence = this.samples.map(({ cadenceMs: value }) => value);
    const p95Ready = rawCadence.length >= P95_MINIMUM_SAMPLE_COUNT;

    return {
      fps: (1000 * headlineSamples.length) / cadenceTotalMs,
      frameTimeMs: cadenceTotalMs / headlineSamples.length,
      frameTimeP95Ms: p95Ready ? nearestRankP95(rawCadence) : null,
      sampleState: p95Ready ? 'live' : 'warming',
      frameTimeHistoryMs: this.createHistory(),
      drawCalls:
        headlineSamples.reduce((total, current) => total + current.calls, 0) /
        headlineSamples.length,
      drawCallsMax: Math.max(...headlineSamples.map(({ calls }) => calls)),
      trianglesAvg:
        headlineSamples.reduce(
          (total, current) => total + current.triangles,
          0,
        ) / headlineSamples.length,
      textures: metrics.textures,
      geometries: metrics.geometries,
      programs: metrics.programs,
      environment: metrics.environment,
    };
  }

  reset(): void {
    this.activeTimeMs = 0;
    this.lastPublicationMs = 0;
    this.samples = [];
    this.historyBuckets.clear();
  }

  private recordHistorySample(sample: FrameSample): void {
    const bucketIndex = Math.max(
      0,
      Math.ceil(sample.activeTimeMs / FRAME_TIME_HISTORY_BUCKET_MS) - 1,
    );
    const bucket = this.historyBuckets.get(bucketIndex) ?? {
      totalMs: 0,
      samples: 0,
    };
    bucket.totalMs += sample.cadenceMs;
    bucket.samples += 1;
    this.historyBuckets.set(bucketIndex, bucket);

    const oldestBucket = bucketIndex - FRAME_TIME_HISTORY_BUCKETS + 1;
    for (const index of this.historyBuckets.keys()) {
      if (index < oldestBucket) {
        this.historyBuckets.delete(index);
      }
    }
  }

  private createHistory(): readonly (number | null)[] {
    const currentBucket = Math.max(
      0,
      Math.ceil(this.activeTimeMs / FRAME_TIME_HISTORY_BUCKET_MS) - 1,
    );
    const firstBucket = currentBucket - FRAME_TIME_HISTORY_BUCKETS + 1;
    return Array.from({ length: FRAME_TIME_HISTORY_BUCKETS }, (_, offset) => {
      const bucket = this.historyBuckets.get(firstBucket + offset);
      return bucket ? bucket.totalMs / bucket.samples : null;
    });
  }
}
