import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { RoomStats } from '../../rooms/types';
import { createTranslator } from '../i18n';
import { TelemetryPanel } from './TelemetryPanel';

const t = createTranslator('zh-CN');

const stats: RoomStats = {
  fps: 15.1,
  frameTimeMs: 66.2,
  frameTimeP95Ms: 72.4,
  sampleState: 'live',
  frameTimeHistoryMs: [60, null, 66, 72],
  drawCalls: 19,
  drawCallsMax: 19,
  trianglesAvg: 123456,
  textures: 8,
  geometries: 12,
  programs: 4,
  environment: {
    classification: 'software',
    classificationReason: 'matched SwiftShader',
    maskedVendor: 'WebKit',
    maskedRenderer: 'WebKit WebGL',
    unmaskedVendor: 'Google Inc.',
    unmaskedRenderer: 'ANGLE (SwiftShader)',
  },
};

describe('TelemetryPanel', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      beginPath: vi.fn(),
      clearRect: vi.fn(),
      lineTo: vi.fn(),
      moveTo: vi.fn(),
      stroke: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
  });

  it('renders measured native-room metrics with stable selectors', () => {
    const { container } = render(
      <TelemetryPanel source={{ kind: 'shader', stats }} locale="zh-CN" t={t} />,
    );

    expect(container.querySelector('[data-metric="fps"]')).toHaveTextContent('15.1');
    expect(container.querySelector('[data-metric="draw-calls"]')).toHaveTextContent('19.0');
    const rendererBadge = container.querySelector('[data-renderer-class="software"]');
    expect(rendererBadge).toHaveAttribute('title', '软件 GL · ANGLE (SwiftShader)');
    expect(rendererBadge?.getAttribute('title')).not.toContain('matched SwiftShader');
    expect(container.querySelector('[data-metric="fps"]')).toHaveTextContent('FPS');
    expect(container.querySelector('[data-metric="frame-time"]')).toHaveTextContent('毫秒');
    expect(container.querySelectorAll('canvas[aria-hidden="true"]')).toHaveLength(2);
  });

  it('renders measured embedded cadence without fake renderer counters', () => {
    const { container } = render(
      <TelemetryPanel
        source={{
          kind: 'embedded',
          bridgeState: 'ready',
          stats: {
            fps: 29.8,
            frameTimeMs: 33.6,
            frameCount: 420,
            paused: false,
          },
        }}
        locale="zh-CN"
        t={t}
      />,
    );

    expect(container.querySelector('[data-telemetry-source="embedded"]')).toBeInTheDocument();
    expect(container.querySelector('[data-metric="fps"]')).toHaveTextContent('29.8');
    expect(container.querySelector('[data-metric="fps"]')).toHaveTextContent('FPS');
    expect(container.querySelector('[data-metric="frame-time"]')).toHaveTextContent('33.6');
    expect(container.querySelector('[data-metric="frame-time"]')).toHaveTextContent('毫秒');
    expect(container.querySelectorAll('[data-metric]')).toHaveLength(2);
    expect(container).not.toHaveTextContent('绘制调用');
    expect(container).not.toHaveTextContent('—');
  });

  it('makes bridge connection failures explicit', () => {
    const { container } = render(
      <TelemetryPanel
        source={{ kind: 'embedded', bridgeState: 'error', stats: null }}
        locale="zh-CN"
        t={t}
      />,
    );

    expect(screen.getByText('展品通信桥不可用')).toBeInTheDocument();
    expect(container.querySelector('[data-telemetry-state="error"]')).toBeInTheDocument();
    expect(container.querySelector('[data-metric]')).not.toBeInTheDocument();
  });
});
