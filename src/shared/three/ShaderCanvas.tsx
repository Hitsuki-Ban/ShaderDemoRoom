import { useEffect, useRef, useState } from 'react';
import { Clock, SRGBColorSpace, WebGLRenderer } from 'three';
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
      antialias: true,
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
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      runtimeRef.current?.resize({ width, height, pixelRatio });
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement ?? canvas);

    const clock = new Clock();
    let frames = 0;
    let fpsElapsed = 0;

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      runtimeRef.current?.render({ elapsed, delta });

      frames += 1;
      fpsElapsed += delta;

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
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [onStats]);

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
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
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
