import { useEffect, useRef } from 'react';

interface TelemetrySparklineProps {
  samples: readonly (number | null)[];
}

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 64;
const GRAPH_INSET = 4;

export function TelemetrySparkline({ samples }: TelemetrySparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Telemetry sparkline requires a 2D canvas context.');
    }

    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const values = samples.filter((sample): sample is number => sample !== null);
    if (values.length < 2) {
      return;
    }

    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const range = Math.max(maximum - minimum, 0.001);
    const slotWidth = (CANVAS_WIDTH - GRAPH_INSET * 2) / Math.max(samples.length - 1, 1);
    const stroke = getComputedStyle(canvas).color;
    if (!stroke) {
      throw new Error('Telemetry sparkline color token did not resolve.');
    }

    context.strokeStyle = stroke;
    context.lineWidth = 2;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.beginPath();

    let drawing = false;
    samples.forEach((sample, index) => {
      if (sample === null) {
        drawing = false;
        return;
      }
      const x = GRAPH_INSET + index * slotWidth;
      const y =
        CANVAS_HEIGHT -
        GRAPH_INSET -
        ((sample - minimum) / range) * (CANVAS_HEIGHT - GRAPH_INSET * 2);
      if (drawing) {
        context.lineTo(x, y);
      } else {
        context.moveTo(x, y);
        drawing = true;
      }
    });
    context.stroke();
  }, [samples]);

  return (
    <canvas
      ref={canvasRef}
      className="telemetry-sparkline"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      aria-hidden="true"
    />
  );
}
