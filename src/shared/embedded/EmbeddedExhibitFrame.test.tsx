import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getRoomById } from '../../rooms/registry';
import type { EmbeddedRoomDefinition, RoomId } from '../../rooms/types';
import { EmbeddedExhibitFrame } from './EmbeddedExhibitFrame';

function getEmbeddedRoom(roomId: RoomId): EmbeddedRoomDefinition {
  const room = getRoomById(roomId);
  if (room?.kind !== 'embedded') {
    throw new Error(`Expected ${roomId} to be an embedded room.`);
  }
  return room;
}

describe('EmbeddedExhibitFrame permissions', () => {
  it.each([
    ['anime-liquid-orb', 'autoplay; microphone'],
    ['ninth-tide-archive', 'autoplay'],
  ] as const)('applies the %s registry policy to the iframe', (roomId, expectedAllow) => {
    render(
      <EmbeddedExhibitFrame
        room={getEmbeddedRoom(roomId)}
        settings={{ reloadToken: 0 }}
        title="本地化展品标题"
        onBridgeState={vi.fn()}
        onStats={vi.fn()}
      />,
    );

    const frame = screen.getByTitle('本地化展品标题');
    expect(frame).toHaveAttribute('allow', expectedAllow);
    expect(frame).toHaveAttribute('allowfullscreen');
    expect(frame).toHaveAttribute('data-bridge-state', 'waiting');
  });

  it('accepts ready and stats only from its own same-origin iframe', async () => {
    const onBridgeState = vi.fn();
    const onStats = vi.fn();
    render(
      <EmbeddedExhibitFrame
        room={getEmbeddedRoom('anime-liquid-orb')}
        settings={{ reloadToken: 0 }}
        title="MIZU//KOKORO"
        onBridgeState={onBridgeState}
        onStats={onStats}
      />,
    );
    const frame = screen.getByTitle('MIZU//KOKORO') as HTMLIFrameElement;
    const instanceId = '123e4567-e89b-42d3-a456-426614174000';

    act(() => window.dispatchEvent(new MessageEvent('message', {
      origin: window.location.origin,
      source: frame.contentWindow,
      data: {
        context: 'shader-demo-room',
        v: 1,
        instanceId,
        type: 'ready',
        payload: { capabilities: ['pause', 'stats', 'set-mode', 'set-quality'] },
      },
    })));

    await waitFor(() => expect(frame).toHaveAttribute('data-bridge-state', 'ready'));
    expect(frame).toHaveAttribute('data-bridge-instance-id', instanceId);
    expect(onBridgeState).toHaveBeenLastCalledWith('ready');

    const stats = { fps: 60, frameTimeMs: 16.7, frameCount: 300, paused: false };
    act(() => window.dispatchEvent(new MessageEvent('message', {
      origin: window.location.origin,
      source: frame.contentWindow,
      data: {
        context: 'shader-demo-room',
        v: 1,
        instanceId,
        type: 'stats',
        payload: stats,
      },
    })));
    expect(onStats).toHaveBeenCalledWith(stats);

    act(() => window.dispatchEvent(new MessageEvent('message', {
      origin: 'https://example.invalid',
      source: frame.contentWindow,
      data: { invalid: true },
    })));
    expect(frame).toHaveAttribute('data-bridge-state', 'ready');
  });
});
