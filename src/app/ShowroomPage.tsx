import { Suspense, useState } from 'react';
import { Code, Languages, RadioTower } from 'lucide-react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { getRoomById, roomRegistry } from '../rooms/registry';
import {
  cloneRoomSettings,
  createInitialSettings,
} from '../rooms/settings';
import type {
  AnyRoomSettings,
  EmbeddedExhibitSettings,
  RoomId,
  RoomStats,
} from '../rooms/types';
import { EmbeddedExhibitFrame } from '../shared/embedded/EmbeddedExhibitFrame';
import { useI18n } from '../shared/i18n/useI18n';
import { TelemetryPanel } from '../shared/telemetry/TelemetryPanel';
import { ShaderCanvas } from '../shared/three/ShaderCanvas';
import { Button } from '../shared/ui/Button';
import { RoomRail } from './RoomRail';

export function ShowroomPage() {
  const { roomId } = useParams();
  const location = useLocation();
  const { locale, setLocale, t } = useI18n();
  const [settingsByRoom, setSettingsByRoom] = useState(createInitialSettings);
  const [telemetry, setTelemetry] = useState<{
    locationKey: string;
    roomId: RoomId;
    stats: RoomStats;
  } | null>(null);

  const activeRoom = getRoomById(roomId);

  if (!activeRoom) {
    return <Navigate to="/room/voxel-water" replace />;
  }

  const settings = settingsByRoom[activeRoom.id];
  const Controls = activeRoom.ControlsComponent;
  const shaderRoom = activeRoom.kind === 'shader' ? activeRoom : null;
  const activeStats =
    telemetry?.roomId === activeRoom.id && telemetry.locationKey === location.key
      ? telemetry.stats
      : null;

  const updateSettings = (nextSettings: AnyRoomSettings) => {
    setSettingsByRoom((current) => ({
      ...current,
      [activeRoom.id]: nextSettings,
    }));
  };

  const patchSettings = (patch: Partial<AnyRoomSettings>) => {
    setSettingsByRoom((current) => ({
      ...current,
      [activeRoom.id]: {
        ...current[activeRoom.id],
        ...patch,
      } as AnyRoomSettings,
    }));
  };

  const resetSettings = () => {
    setSettingsByRoom((current) => ({
      ...current,
      [activeRoom.id]: cloneRoomSettings(activeRoom.defaultPreset),
    }));
  };

  return (
    <main
      className="showroom-shell"
      data-shell-chrome={activeRoom.stageProfile.shellChrome}
    >
      <header className="topbar">
        <Link className="brand-lockup" to="/room/voxel-water" aria-label={t('app.title')}>
          <span className="brand-mark">S</span>
          <span>
            <strong>{t('app.title')}</strong>
            <small>{t('app.subtitle')}</small>
          </span>
        </Link>

        <div className="topbar-status" aria-label={t('app.status')}>
          <RadioTower size={16} aria-hidden="true" />
          <span>{t('app.staticReady')}</span>
          <span className="status-dot" />
          <span>{t(activeRoom.titleKey)}</span>
        </div>

        <div className="topbar-actions">
          <label className="language-select">
            <Languages size={16} aria-hidden="true" />
            <span>{t('app.language')}</span>
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value)}
              aria-label={t('app.language')}
            >
              <option value="en">English</option>
              <option value="zh-CN">中文</option>
            </select>
          </label>
          <Button
            as="a"
            href="https://github.com/Hitsuki-Ban/ShaderDemoRoom"
            target="_blank"
            rel="noreferrer"
            icon={<Code size={16} />}
          >
            {t('app.source')}
          </Button>
        </div>
      </header>

      <section className="workspace">
        <RoomRail activeRoomId={activeRoom.id} rooms={roomRegistry} t={t} />

        <section className="stage-column" aria-label={t('app.viewport')}>
          <div className="stage-viewport">
            <ShaderCanvas
              room={shaderRoom}
              settings={shaderRoom ? settings : null}
              onStats={(stats) =>
                setTelemetry({ locationKey: location.key, roomId: activeRoom.id, stats })
              }
            />
            {activeRoom.kind === 'embedded' ? (
              <EmbeddedExhibitFrame
                room={activeRoom}
                settings={settings as EmbeddedExhibitSettings}
              />
            ) : null}
          </div>
          <TelemetryPanel
            embedded={activeRoom.kind === 'embedded'}
            stats={activeStats}
            t={t}
          />
        </section>

        <aside className="inspector" aria-label={t('app.inspector')}>
          <div className="panel-heading">
            <span>{t(activeRoom.kickerKey)}</span>
            <h1>{t(activeRoom.titleKey)}</h1>
            <p>{t(activeRoom.descriptionKey)}</p>
          </div>

          <Suspense fallback={<div className="control-skeleton">{t('app.loadingControls')}</div>}>
            <Controls
              settings={settings}
              onChange={updateSettings}
              onPatch={patchSettings}
              onReset={resetSettings}
              t={t}
            />
          </Suspense>
        </aside>
      </section>
    </main>
  );
}
