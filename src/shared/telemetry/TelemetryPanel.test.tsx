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
      <TelemetryPanel embedded={false} stats={stats} locale="zh-CN" t={t} />,
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

  it('renders an intentional external state without fake metrics', () => {
    const { container } = render(
      <TelemetryPanel embedded stats={null} locale="zh-CN" t={t} />,
    );

    expect(screen.getByText('外部运行时')).toBeInTheDocument();
    expect(screen.getByText('遥测暂不可用')).toBeInTheDocument();
    expect(container.querySelector('[data-metric]')).not.toBeInTheDocument();
    expect(container).not.toHaveTextContent('—');
  });
});
