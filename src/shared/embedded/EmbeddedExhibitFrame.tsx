import { useMemo } from 'react';
import type {
  EmbeddedExhibitSettings,
  EmbeddedRoomDefinition,
} from '../../rooms/types';
import { getEmbeddedSrc } from './url';

interface EmbeddedExhibitFrameProps {
  room: EmbeddedRoomDefinition;
  settings: EmbeddedExhibitSettings;
  title: string;
}

export function EmbeddedExhibitFrame({ room, settings, title }: EmbeddedExhibitFrameProps) {
  const src = useMemo(
    () => getEmbeddedSrc(room.embedPath, settings.reloadToken),
    [room.embedPath, settings.reloadToken],
  );

  return (
    <div className="canvas-shell embedded-shell">
      <iframe
        key={`${room.id}-${settings.reloadToken}`}
        className="embedded-exhibit-frame"
        src={src}
        title={title}
        allow={room.permissions.join('; ')}
        allowFullScreen
      />
    </div>
  );
}
