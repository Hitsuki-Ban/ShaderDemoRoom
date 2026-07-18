import { Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Code, Languages, RadioTower } from 'lucide-react';
import {
  Link,
  Navigate,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
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
import type {
  EmbeddedBridgeState,
  EmbeddedRoomStats,
} from '../shared/embedded/bridge';
import { localeManifest, parseLocale } from '../shared/i18n';
import { useI18n } from '../shared/i18n/useI18n';
import { TelemetryPanel } from '../shared/telemetry/TelemetryPanel';
import { ShaderCanvas } from '../shared/three/ShaderCanvas';
import { Button } from '../shared/ui/Button';
import {
  parseRoomUrlSettings,
  serializeRoomUrlSettings,
  URL_STATE_DEBOUNCE_MS,
} from '../shared/url-state';
import { RoomRail } from './RoomRail';

export function ShowroomPage() {
  const { roomId } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { locale, setLocale, t } = useI18n();
  const activeRoom = getRoomById(roomId);
  const searchParamsKey = searchParams.toString();
  const navigationIdentity = `${activeRoom?.id ?? 'invalid'}\u0000${location.key}\u0000${searchParamsKey}`;
  const [settingsState, setSettingsState] = useState(() => {
    const initialSettings = createInitialSettings();
    if (activeRoom) {
      initialSettings[activeRoom.id] = parseRoomUrlSettings(
        activeRoom.id,
        new URLSearchParams(searchParamsKey),
      );
    }
    return { navigationIdentity, settingsByRoom: initialSettings };
  });
  let settingsByRoom = settingsState.settingsByRoom;
  if (settingsState.navigationIdentity !== navigationIdentity) {
    settingsByRoom = { ...settingsState.settingsByRoom };
    if (activeRoom) {
      settingsByRoom[activeRoom.id] = parseRoomUrlSettings(
        activeRoom.id,
        new URLSearchParams(searchParamsKey),
      );
    }
    setSettingsState({ navigationIdentity, settingsByRoom });
  }
  const pendingUrlWrite = useRef<number | null>(null);
  const committedNavigationIdentity = useRef(navigationIdentity);
  const [shaderTelemetry, setShaderTelemetry] = useState<{
    locationKey: string;
    roomId: RoomId;
    stats: RoomStats;
  } | null>(null);
  const [embeddedTelemetry, setEmbeddedTelemetry] = useState<{
    locationKey: string;
    roomId: RoomId;
    reloadToken: number;
    bridgeState: EmbeddedBridgeState;
    stats: EmbeddedRoomStats | null;
  } | null>(null);

  useLayoutEffect(() => {
    committedNavigationIdentity.current = navigationIdentity;

    return () => {
      if (pendingUrlWrite.current !== null) {
        window.clearTimeout(pendingUrlWrite.current);
        pendingUrlWrite.current = null;
      }
    };
  }, [navigationIdentity]);

  if (!activeRoom) {
    return <Navigate to="/room/voxel-water" replace />;
  }

  const settings = settingsByRoom[activeRoom.id];
  const Controls = activeRoom.ControlsComponent;
  const shaderRoom = activeRoom.kind === 'shader' ? activeRoom : null;
  const activeStats =
    shaderTelemetry?.roomId === activeRoom.id
      && shaderTelemetry.locationKey === location.key
      ? shaderTelemetry.stats
      : null;
  const activeEmbeddedTelemetry =
    embeddedTelemetry?.roomId === activeRoom.id
      && embeddedTelemetry.locationKey === location.key
      && embeddedTelemetry.reloadToken
        === (settings as EmbeddedExhibitSettings).reloadToken
      ? embeddedTelemetry
      : null;
  const roomLabel = t(activeRoom.titleKey);

  const scheduleUrlWrite = (nextSettings: AnyRoomSettings) => {
    if (pendingUrlWrite.current !== null) {
      window.clearTimeout(pendingUrlWrite.current);
      pendingUrlWrite.current = null;
    }
    if (activeRoom.kind === 'embedded') return;

    const nextSearchParams = serializeRoomUrlSettings(activeRoom.id, nextSettings);
    if (nextSearchParams.toString() === searchParamsKey) return;

    pendingUrlWrite.current = window.setTimeout(() => {
      pendingUrlWrite.current = null;
      if (committedNavigationIdentity.current !== navigationIdentity) return;
      setSearchParams(nextSearchParams, { replace: true });
    }, URL_STATE_DEBOUNCE_MS);
  };

  const applySettings = (nextSettings: AnyRoomSettings) => {
    setSettingsState((current) => ({
      ...current,
      settingsByRoom: {
        ...current.settingsByRoom,
        [activeRoom.id]: nextSettings,
      },
    }));
    scheduleUrlWrite(nextSettings);
  };

  const updateSettings = (nextSettings: AnyRoomSettings) => {
    applySettings(nextSettings);
  };

  const patchSettings = (patch: Partial<AnyRoomSettings>) => {
    applySettings({
      ...settings,
      ...patch,
    } as AnyRoomSettings);
  };

  const resetSettings = () => {
    applySettings(cloneRoomSettings(activeRoom.defaultPreset));
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
              onChange={(event) => setLocale(parseLocale(event.currentTarget.value))}
              aria-label={t('app.language')}
            >
              {localeManifest.map(({ code, labelKey }) => (
                <option key={code} value={code}>
                  {t(labelKey)}
                </option>
              ))}
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
              ariaLabel={roomLabel}
              loadingLabel={t('app.loadingRoom', { room: roomLabel })}
              onStats={(stats) =>
                setShaderTelemetry({ locationKey: location.key, roomId: activeRoom.id, stats })
              }
            />
            {activeRoom.kind === 'embedded' ? (
              <EmbeddedExhibitFrame
                key={`${activeRoom.id}-${(settings as EmbeddedExhibitSettings).reloadToken}`}
                room={activeRoom}
                settings={settings as EmbeddedExhibitSettings}
                title={roomLabel}
                onBridgeState={(bridgeState) =>
                  setEmbeddedTelemetry({
                    locationKey: location.key,
                    roomId: activeRoom.id,
                    reloadToken: (settings as EmbeddedExhibitSettings).reloadToken,
                    bridgeState,
                    stats: null,
                  })
                }
                onStats={(stats) =>
                  setEmbeddedTelemetry({
                    locationKey: location.key,
                    roomId: activeRoom.id,
                    reloadToken: (settings as EmbeddedExhibitSettings).reloadToken,
                    bridgeState: 'ready',
                    stats,
                  })
                }
              />
            ) : null}
          </div>
          <TelemetryPanel
            source={activeRoom.kind === 'embedded'
              ? {
                  kind: 'embedded',
                  bridgeState: activeEmbeddedTelemetry?.bridgeState ?? 'waiting',
                  stats: activeEmbeddedTelemetry?.stats ?? null,
                }
              : { kind: 'shader', stats: activeStats }}
            locale={locale}
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
              locale={locale}
              t={t}
            />
          </Suspense>
        </aside>
      </section>
    </main>
  );
}
