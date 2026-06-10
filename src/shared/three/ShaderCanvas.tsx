import { useEffect, useRef, useState } from 'react';
import { SRGBColorSpace, Timer, WebGLRenderer } from 'three';
import type {
  AnyRoomSettings,
  RoomDefinition,
  RoomRuntime,
  RoomStats,
} from '../../rooms/types';

interface ShaderCanvasProps {
  room: RoomDefinition<AnyRoomSettings>;
  settings: AnyRoomSettings;
  onStats: (stats: RoomStats) => void;
}

function getRenderPixelRatio(roomId: string) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const maxPixelRatio = roomId === 'voxel-water' ? 0.6 : 2;

  return Math.min(devicePixelRatio, maxPixelRatio);
}

export function ShaderCanvas({ room, settings, onStats }: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const runtimeRef = useRef<RoomRuntime | null>(null);
  const frameRef = useRef<number | null>(null);
  const settingsRef = useRef(settings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsRef.current = settings;
    runtimeRef.current?.updateSettings(settings);
  }, [settings]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const renderer = new WebGLRenderer({
      canvas,
      antialias: room.id !== 'voxel-water',
      alpha: false,
      powerPreference: 'high-performance',
    });

    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setClearColor(0x070b10, 1);
    rendererRef.current = renderer;

    const resize = () => {
      const parent = canvas.parentElement;

      if (!parent) {
        return;
      }

      const rect = parent.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const pixelRatio = getRenderPixelRatio(room.id);

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      runtimeRef.current?.resize({ width, height, pixelRatio });
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement ?? canvas);

    const timer = new Timer();
    timer.connect(document);
    let frames = 0;
    let fpsElapsed = 0;

    const tick = (timestamp?: number) => {
      timer.update(timestamp);
      const rawDelta = timer.getDelta();
      const delta = Math.min(rawDelta, 0.05);
      const elapsed = timer.getElapsed();
      runtimeRef.current?.render({ elapsed, delta });

      frames += 1;
      fpsElapsed += rawDelta;

      if (fpsElapsed >= 0.5) {
        onStats({
          fps: frames / fpsElapsed,
          drawCalls: renderer.info.render.calls,
        });
        frames = 0;
        fpsElapsed = 0;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      observer.disconnect();
      runtimeRef.current?.dispose();
      runtimeRef.current = null;
      timer.dispose();
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [onStats, room.id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = rendererRef.current;
    let cancelled = false;

    if (!canvas || !renderer) {
      return undefined;
    }

    setLoading(true);
    runtimeRef.current?.dispose();
    runtimeRef.current = null;

    room.loadScene().then((module) => {
      if (cancelled) {
        return;
      }

      const runtime = module.createRoomRuntime(
        { canvas, renderer, onStats },
        settingsRef.current,
      );
      runtimeRef.current = runtime;

      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        runtime.resize({
          width: Math.max(1, Math.floor(rect.width)),
          height: Math.max(1, Math.floor(rect.height)),
          pixelRatio: getRenderPixelRatio(room.id),
        });
      }

      setLoading(false);
    });

    return () => {
      cancelled = true;
      runtimeRef.current?.dispose();
      runtimeRef.current = null;
    };
  }, [room, onStats]);

  return (
    <div className="canvas-shell">
      <canvas ref={canvasRef} className="shader-canvas" aria-label={room.id} />
      {loading ? <div className="canvas-loader">Loading {room.id}</div> : null}
    </div>
  );
}
