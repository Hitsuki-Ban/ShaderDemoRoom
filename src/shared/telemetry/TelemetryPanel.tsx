import { useMemo } from 'react';
import type { RoomStats } from '../../rooms/types';
import type { Locale, Translator } from '../i18n';
import { TelemetrySparkline } from './TelemetrySparkline';

interface TelemetryPanelProps {
  embedded: boolean;
  stats: RoomStats | null;
  locale: Locale;
  t: Translator;
}

function environmentKey(stats: RoomStats): string {
  return `app.telemetry.environment.${stats.environment.classification}`;
}

export function TelemetryPanel({ embedded, stats, locale, t }: TelemetryPanelProps) {
  const numberFormatters = useMemo(
    () => ({
      integer: new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
      oneDecimal: new Intl.NumberFormat(locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    }),
    [locale],
  );

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
    ? `${contextLabel} · ${stats.environment.unmaskedRenderer ?? stats.environment.maskedRenderer}`
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
            <strong>{stats ? numberFormatters.oneDecimal.format(stats.fps) : t('app.telemetry.measuring')}</strong>
            {stats ? <small>{t('app.telemetry.units.fps')}</small> : null}
          </span>
          {stats ? <TelemetrySparkline samples={stats.frameTimeHistoryMs} /> : null}
        </section>

        <section className="telemetry-cell telemetry-cell-graph" data-metric="frame-time">
          <span className="telemetry-label">{t('app.telemetry.frameTime')}</span>
          <span className="telemetry-value">
            <strong>{stats ? numberFormatters.oneDecimal.format(stats.frameTimeMs) : t('app.telemetry.measuring')}</strong>
            {stats ? <small>{t('app.telemetry.units.milliseconds')}</small> : null}
          </span>
          {stats ? <TelemetrySparkline samples={stats.frameTimeHistoryMs} /> : null}
          <span className="telemetry-detail">
            {stats?.frameTimeP95Ms === null || !stats
              ? t('app.telemetry.p95Warming')
              : `${t('app.telemetry.units.p95')} ${numberFormatters.oneDecimal.format(stats.frameTimeP95Ms)} ${t('app.telemetry.units.milliseconds')}`}
          </span>
        </section>

        <section className="telemetry-cell" data-metric="draw-calls">
          <span className="telemetry-label">{t('app.telemetry.drawCalls')}</span>
          <strong>{stats ? numberFormatters.oneDecimal.format(stats.drawCalls) : t('app.telemetry.measuring')}</strong>
          <span className="telemetry-detail">
            {stats
              ? `${t('app.telemetry.maximum')} ${numberFormatters.integer.format(stats.drawCallsMax)}`
              : t('app.telemetry.sameWindow')}
          </span>
        </section>

        <section className="telemetry-cell" data-metric="triangles">
          <span className="telemetry-label">{t('app.telemetry.triangles')}</span>
          <strong>{stats ? numberFormatters.integer.format(stats.trianglesAvg) : t('app.telemetry.measuring')}</strong>
          <span className="telemetry-detail">{t('app.telemetry.twoSecondAverage')}</span>
        </section>

        <section className="telemetry-cell" data-metric="resources">
          <span className="telemetry-label">{t('app.telemetry.resources')}</span>
          <strong>
            {stats
              ? `${t('app.telemetry.units.textures')} ${numberFormatters.integer.format(stats.textures)} / ${t('app.telemetry.units.geometries')} ${numberFormatters.integer.format(stats.geometries)}`
              : t('app.telemetry.measuring')}
          </strong>
          <span className="telemetry-detail">
            {stats
              ? `${stats.programs === null ? t('app.telemetry.programsUnavailable') : `${t('app.telemetry.units.programs')} ${numberFormatters.integer.format(stats.programs)}`} · ${isLive ? contextLabel : t(statusKey)}`
              : t(statusKey)}
          </span>
        </section>
      </div>
    </div>
  );
}
