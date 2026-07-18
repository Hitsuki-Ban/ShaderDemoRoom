import type { RoomStats } from '../../rooms/types';
import { TelemetrySparkline } from './TelemetrySparkline';

interface TelemetryPanelProps {
  embedded: boolean;
  stats: RoomStats | null;
  t: (key: string) => string;
}

function formatCount(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

function environmentKey(stats: RoomStats): string {
  return `app.telemetry.environment.${stats.environment.classification}`;
}

export function TelemetryPanel({ embedded, stats, t }: TelemetryPanelProps) {
  if (embedded) {
    return (
      <div className="scene-hud telemetry-rail telemetry-rail-external" aria-label={t('app.sceneStats')}>
        <div className="telemetry-external" data-telemetry-state="external">
          <span className="telemetry-kicker">{t('app.telemetry.externalRuntime')}</span>
          <strong>{t('app.telemetry.unavailable')}</strong>
        </div>
      </div>
    );
  }

  const isLive = stats?.sampleState === 'live';
  const statusKey = stats ? `app.telemetry.${stats.sampleState}` : 'app.telemetry.measuring';
  const contextLabel = stats ? t(environmentKey(stats)) : t('app.telemetry.environment.unknown');
  const environmentTitle = stats
    ? `${stats.environment.unmaskedRenderer ?? stats.environment.maskedRenderer} · ${stats.environment.classificationReason}`
    : contextLabel;

  return (
    <div
      className="scene-hud telemetry-rail"
      aria-label={t('app.sceneStats')}
      data-telemetry-json={stats ? JSON.stringify(stats) : undefined}
    >
      <div className="telemetry-rail-header">
        <span className="telemetry-kicker">{t('app.telemetry.liveTelemetry')}</span>
        <span
          className={`telemetry-environment telemetry-environment-${stats?.environment.classification ?? 'unknown'}`}
          data-renderer-class={stats?.environment.classification ?? 'unknown'}
          title={environmentTitle}
        >
          {contextLabel}
        </span>
        <span className="telemetry-status">{t(statusKey)}</span>
      </div>

      <div className="telemetry-grid" data-telemetry-state={stats?.sampleState ?? 'measuring'}>
        <section className="telemetry-cell telemetry-cell-graph" data-metric="fps">
          <span className="telemetry-label">{t('app.telemetry.cadence')}</span>
          <span className="telemetry-value">
            <strong>{stats ? stats.fps.toFixed(1) : t('app.telemetry.measuring')}</strong>
            {stats ? <small>FPS</small> : null}
          </span>
          {stats ? <TelemetrySparkline samples={stats.frameTimeHistoryMs} /> : null}
        </section>

        <section className="telemetry-cell telemetry-cell-graph" data-metric="frame-time">
          <span className="telemetry-label">{t('app.telemetry.frameTime')}</span>
          <span className="telemetry-value">
            <strong>{stats ? stats.frameTimeMs.toFixed(1) : t('app.telemetry.measuring')}</strong>
            {stats ? <small>MS</small> : null}
          </span>
          {stats ? <TelemetrySparkline samples={stats.frameTimeHistoryMs} /> : null}
          <span className="telemetry-detail">
            {stats?.frameTimeP95Ms === null || !stats
              ? t('app.telemetry.p95Warming')
              : `P95 ${stats.frameTimeP95Ms.toFixed(1)} MS`}
          </span>
        </section>

        <section className="telemetry-cell" data-metric="draw-calls">
          <span className="telemetry-label">{t('app.telemetry.drawCalls')}</span>
          <strong>{stats ? stats.drawCalls.toFixed(1) : t('app.telemetry.measuring')}</strong>
          <span className="telemetry-detail">
            {stats ? `${t('app.telemetry.maximum')} ${stats.drawCallsMax}` : t('app.telemetry.sameWindow')}
          </span>
        </section>

        <section className="telemetry-cell" data-metric="triangles">
          <span className="telemetry-label">{t('app.telemetry.triangles')}</span>
          <strong>{stats ? formatCount(stats.trianglesAvg) : t('app.telemetry.measuring')}</strong>
          <span className="telemetry-detail">{t('app.telemetry.twoSecondAverage')}</span>
        </section>

        <section className="telemetry-cell" data-metric="resources">
          <span className="telemetry-label">{t('app.telemetry.resources')}</span>
          <strong>
            {stats
              ? `TX ${stats.textures} / GEO ${stats.geometries}`
              : t('app.telemetry.measuring')}
          </strong>
          <span className="telemetry-detail">
            {stats
              ? `${stats.programs === null ? t('app.telemetry.programsUnavailable') : `PGM ${stats.programs}`} · ${isLive ? contextLabel : t(statusKey)}`
              : t(statusKey)}
          </span>
        </section>
      </div>
    </div>
  );
}
