import { Suspense, lazy, useState } from 'react';
import { Code, Languages, RadioTower } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getRoomById, roomRegistry } from '../rooms/registry';
import type { AnyRoomSettings, RoomId } from '../rooms/types';
import { useI18n } from '../shared/i18n/useI18n';
import { Button } from '../shared/ui/Button';
import { RoomRail } from './RoomRail';

type SettingsByRoom = Record<RoomId, AnyRoomSettings>;

const ShaderCanvas = lazy(() =>
  import('../shared/three/ShaderCanvas').then((module) => ({
    default: module.ShaderCanvas,
  })),
);

function createInitialSettings(): SettingsByRoom {
  return roomRegistry.reduce((settings, room) => {
    settings[room.id] = room.defaultPreset;
    return settings;
  }, {} as SettingsByRoom);
}

export function ShowroomPage() {
  const { roomId } = useParams();
  const { locale, setLocale, t } = useI18n();
  const [settingsByRoom, setSettingsByRoom] = useState(createInitialSettings);
  const [stats, setStats] = useState({ fps: 0, drawCalls: 0 });

  const activeRoom = getRoomById(roomId);

  if (!activeRoom) {
    return <Navigate to="/room/voxel-water" replace />;
  }

  const settings = settingsByRoom[activeRoom.id];
  const Controls = activeRoom.ControlsComponent;

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
      [activeRoom.id]: activeRoom.defaultPreset,
    }));
  };

  return (
    <main className="showroom-shell">
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
          <Suspense fallback={<div className="canvas-shell"><div className="canvas-loader">Loading renderer</div></div>}>
            <ShaderCanvas
              room={activeRoom}
              settings={settings}
              onStats={setStats}
            />
          </Suspense>
          <div className="scene-hud" aria-label={t('app.sceneStats')}>
            <span>{Math.round(stats.fps)} FPS</span>
            <span>{stats.drawCalls} calls</span>
            <span>{activeRoom.techTags.join(' / ')}</span>
          </div>
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
