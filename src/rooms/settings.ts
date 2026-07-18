import { roomRegistry } from './registry';
import type { AnyRoomSettings, DeepReadonly, RoomId } from './types';

export type SettingsByRoom = Record<RoomId, AnyRoomSettings>;

export function cloneRoomSettings<TSettings extends AnyRoomSettings>(
  settings: DeepReadonly<TSettings>,
): TSettings {
  return structuredClone(settings) as TSettings;
}

export function createInitialSettings(): SettingsByRoom {
  return roomRegistry.reduce((settings, room) => {
    settings[room.id] = cloneRoomSettings(room.defaultPreset);
    return settings;
  }, {} as SettingsByRoom);
}
