import { Archive, Droplets, FlaskConical, Waves } from 'lucide-react';
import type { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import type { RoomDefinition, RoomId } from '../rooms/types';

interface RoomRailProps {
  activeRoomId: RoomId;
  rooms: readonly RoomDefinition[];
  t: (key: string) => string;
}

const roomIcons = {
  'voxel-water': Waves,
  'glass-optics': FlaskConical,
  'anime-liquid-orb': Droplets,
  'ninth-tide-archive': Archive,
} satisfies Record<RoomId, typeof Waves>;

export function RoomRail({ activeRoomId, rooms, t }: RoomRailProps) {
  return (
    <nav className="room-rail" aria-label={t('app.rooms')}>
      <div className="rail-title">
        <span>{t('app.rooms')}</span>
        <strong>{rooms.length.toString().padStart(2, '0')}</strong>
      </div>
      <div className="room-list">
        {rooms.map((room) => {
          const Icon = roomIcons[room.id];
          return (
            <NavLink
              key={room.id}
              to={`/room/${room.id}`}
              className={({ isActive }) =>
                `room-link ${isActive || activeRoomId === room.id ? 'active' : ''}`
              }
              style={{ '--room-accent': room.accent } as CSSProperties}
            >
              <Icon size={19} aria-hidden="true" />
              <span>
                <strong>{t(room.titleKey)}</strong>
                <small>{t(room.shortDescriptionKey)}</small>
              </span>
            </NavLink>
          );
        })}
      </div>
      <div className="rail-note">
        <span>{t('app.navigationHint')}</span>
      </div>
    </nav>
  );
}
