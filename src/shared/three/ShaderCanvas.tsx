import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Timer, type WebGLRenderer } from 'three';
import type {
  AnyRoomSettings,
  RoomRuntime,
  RoomStats,
  ShaderRoomDefinition,
} from '../../rooms/types';
import { getFrameTiming, getRenderPixelRatio } from './renderPolicy';
import { useRendererHost } from './useRendererHost';

interface ShaderCanvasProps {
  room: ShaderRoomDefinition<AnyRoomSettings> | null;
  settings: AnyRoomSettings | null;
  onStats: (stats: RoomStats) => void;
}

interface RuntimeLoadState {
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

export function ShaderCanvas({ room, settings, onStats }: ShaderCanvasProps) {
  const { canvas, renderer } = useRendererHost();
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const runtimeRef = useRef<RoomRuntime | null>(null);
  const settingsRef = useRef(settings);
  const onStatsRef = useRef(onStats);
  const [loadState, setLoadState] = useState<RuntimeLoadState>({
    ready: false,
    room,
  });

  if (loadState.room !== room) {
    setLoadState({ ready: false, room });
  }
  const loading = room !== null && !loadState.ready;

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
      canvas.setAttribute('aria-label', room.id);
      canvas.removeAttribute('aria-hidden');
    } else {
      canvas.removeAttribute('aria-label');
      canvas.setAttribute('aria-hidden', 'true');
    }
  }, [canvas, room]);

  useEffect(() => {
    settingsRef.current = settings;
    if (settings) {
      runtimeRef.current?.updateSettings(settings);
    }
  }, [settings]);

  useEffect(() => {
    onStatsRef.current = onStats;
  }, [onStats]);

  useEffect(() => {
    if (!room) {
      return undefined;
    }

    const resize = () => resizeStage(canvas, renderer, runtimeRef.current, room.id);
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement ?? canvas);
    return () => observer.disconnect();
  }, [canvas, renderer, room]);

  useEffect(() => {
    let cancelled = false;

    runtimeRef.current?.dispose();
    runtimeRef.current = null;

    if (!room) {
      return undefined;
    }

    const initialSettings = settingsRef.current;
    if (!initialSettings) {
      throw new Error(`Settings are required for shader room ${room.id}.`);
    }

    void room.loadScene().then((module) => {
      if (cancelled) {
        return;
      }

      const runtime = module.createRoomRuntime(
        { canvas, renderer, onStats: (stats) => onStatsRef.current(stats) },
        settingsRef.current ?? initialSettings,
      );
      runtimeRef.current = runtime;
      resizeStage(canvas, renderer, runtime, room.id);
      setLoadState((current) =>
        current.room === room ? { ready: true, room } : current,
      );
    });

    return () => {
      cancelled = true;
      runtimeRef.current?.dispose();
      runtimeRef.current = null;
    };
  }, [canvas, renderer, room]);

  useEffect(() => {
    if (!room) {
      return undefined;
    }

    const timer = new Timer();
    timer.connect(document);
    let frames = 0;
    let fpsElapsed = 0;

    const tick = (timestamp?: number) => {
      timer.update(timestamp);
      const rawDelta = timer.getDelta();
      const { simulationDelta: delta, statsDelta } = getFrameTiming(rawDelta);
      const elapsed = timer.getElapsed();
      runtimeRef.current?.render({ elapsed, delta });

      frames += 1;
      fpsElapsed += statsDelta;
      if (fpsElapsed >= 0.5) {
        onStatsRef.current({
          fps: frames / fpsElapsed,
          drawCalls: renderer.info.render.calls,
        });
        frames = 0;
        fpsElapsed = 0;
      }

    };

    renderer.setAnimationLoop(tick);
    return () => {
      renderer.setAnimationLoop(null);
      timer.dispose();
    };
  }, [renderer, room]);

  return (
    <div
      className={`canvas-shell${room ? '' : ' canvas-shell-inactive'}`}
      aria-hidden={room ? undefined : true}
    >
      <div ref={canvasHostRef} className="shader-canvas-host" />
      {room && loading ? <div className="canvas-loader">Loading {room.id}</div> : null}
    </div>
  );
}
