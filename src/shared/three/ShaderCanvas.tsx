import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { WebGLRenderer } from 'three';
import type {
  AnyRoomSettings,
  RoomRuntime,
  RoomStats,
  ShaderRoomDefinition,
} from '../../rooms/types';
import { useMotionScale } from './motionPreference';
import { getRenderPixelRatio } from './renderPolicy';
import { RoomAnimationLoop } from './roomAnimationLoop';
import {
  createRuntimeSession,
  disposeRuntimeSession,
  type RuntimeSession,
} from './runtimeSession';
import { useRendererHost } from './useRendererHost';

interface ShaderCanvasProps {
  room: ShaderRoomDefinition<AnyRoomSettings> | null;
  settings: AnyRoomSettings | null;
  ariaLabel: string;
  loadingLabel: string;
  onStats: (stats: RoomStats) => void;
}

interface RuntimeLoadState {
  error: Error | null;
  ready: boolean;
  room: ShaderRoomDefinition<AnyRoomSettings> | null;
}

function resizeStage(
  canvas: HTMLCanvasElement,
  renderer: WebGLRenderer,
  runtime: RoomRuntime | null,
  roomId: ShaderRoomDefinition<AnyRoomSettings>['id'],
) {
  const parent = canvas.parentElement;
  if (!parent) {
    throw new Error('The persistent renderer canvas is not mounted.');
  }

  const rect = parent.getBoundingClientRect();
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  const pixelRatio = getRenderPixelRatio(roomId, window.devicePixelRatio);

  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height, false);
  runtime?.resize({ width, height, pixelRatio });
}

export function ShaderCanvas({
  room,
  settings,
  ariaLabel,
  loadingLabel,
  onStats,
}: ShaderCanvasProps) {
  const { canvas, renderer } = useRendererHost();
  const motionScale = useMotionScale();
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const sessionRef = useRef<RuntimeSession | null>(null);
  const settingsRef = useRef(settings);
  const motionScaleRef = useRef(motionScale);
  const onStatsRef = useRef(onStats);
  const [loadState, setLoadState] = useState<RuntimeLoadState>({
    error: null,
    ready: false,
    room,
  });

  if (loadState.room !== room) {
    setLoadState({ error: null, ready: false, room });
  }
  if (loadState.room === room && loadState.error) {
    throw loadState.error;
  }
  const loading = room !== null && !(loadState.room === room && loadState.ready);

  useLayoutEffect(() => {
    const canvasHost = canvasHostRef.current;
    if (!canvasHost) {
      throw new Error('The persistent renderer mount is not available.');
    }

    canvasHost.append(canvas);
    return () => {
      if (canvas.parentElement === canvasHost) {
        canvasHost.removeChild(canvas);
      }
    };
  }, [canvas]);

  useEffect(() => {
    if (room) {
      canvas.setAttribute('aria-label', ariaLabel);
      canvas.removeAttribute('aria-hidden');
    } else {
      canvas.removeAttribute('aria-label');
      canvas.setAttribute('aria-hidden', 'true');
    }
  }, [ariaLabel, canvas, room]);

  useEffect(() => {
    settingsRef.current = settings;
    if (settings) {
      sessionRef.current?.runtime.updateSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    motionScaleRef.current = motionScale;
    sessionRef.current?.runtime.setMotionScale(motionScale);
  }, [motionScale]);

  useEffect(() => {
    onStatsRef.current = onStats;
  }, [onStats]);

  useEffect(() => {
    let cancelled = false;
    let activeSession: RuntimeSession | null = null;

    const loop = new RoomAnimationLoop({
      renderer,
      getRuntime: () => sessionRef.current?.runtime ?? null,
      onStats: (stats) => onStatsRef.current(stats),
    });

    if (!room) {
      renderer.setAnimationLoop(null);
      renderer.info.reset();
      return () => loop.dispose();
    }

    const initialSettings = settingsRef.current;
    if (!initialSettings) {
      throw new Error(`Settings are required for shader room ${room.id}.`);
    }

    const resize = () =>
      resizeStage(canvas, renderer, sessionRef.current?.runtime ?? null, room.id);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement ?? canvas);

    const updateVisibility = () => loop.setDocumentHidden(document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    updateVisibility();

    void room
      .loadScene()
      .then((module) => {
        if (cancelled) {
          return;
        }

        const session = createRuntimeSession(
          renderer,
          canvas,
          module,
          settingsRef.current ?? initialSettings,
          motionScaleRef.current,
        );
        if (cancelled) {
          disposeRuntimeSession(renderer, session);
          return;
        }

        activeSession = session;
        sessionRef.current = session;
        try {
          resizeStage(canvas, renderer, session.runtime, room.id);
          loop.prepareRuntime(session.runtime);
          loop.activate();
          setLoadState((current) =>
            current.room === room
              ? { error: null, ready: true, room }
              : current,
          );
        } catch (error) {
          activeSession = null;
          sessionRef.current = null;
          disposeRuntimeSession(renderer, session);
          throw error;
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setLoadState((current) =>
            current.room === room
              ? {
                  error: error instanceof Error ? error : new Error(String(error)),
                  ready: false,
                  room,
                }
              : current,
          );
        }
      });

    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
      try {
        loop.dispose();
      } finally {
        if (activeSession) {
          if (sessionRef.current === activeSession) {
            sessionRef.current = null;
          }
          disposeRuntimeSession(renderer, activeSession);
        }
      }
    };
  }, [canvas, renderer, room]);

  return (
    <div
      className={`canvas-shell${room ? '' : ' canvas-shell-inactive'}`}
      aria-hidden={room ? undefined : true}
    >
      <div ref={canvasHostRef} className="shader-canvas-host" />
      {room && loading ? <div className="canvas-loader">{loadingLabel}</div> : null}
    </div>
  );
}
