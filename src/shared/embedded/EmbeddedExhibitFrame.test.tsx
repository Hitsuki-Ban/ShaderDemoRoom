import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
      />,
    );

    const frame = screen.getByTitle(roomId);
    expect(frame).toHaveAttribute('allow', expectedAllow);
    expect(frame).toHaveAttribute('allowfullscreen');
  });
});
