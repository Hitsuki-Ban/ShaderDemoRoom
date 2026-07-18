import { describe, expect, it } from 'vitest';
import { roomRegistry } from './registry';
import { cloneRoomSettings, createInitialSettings } from './settings';
import type {
  RoomRuntimeModule,
  ShaderRoomDefinition,
  VoxelWaterSettings,
} from './types';

function assertPresetIsDeepReadonly(
  room: ShaderRoomDefinition<VoxelWaterSettings>,
) {
  // @ts-expect-error Room defaults are immutable contract inputs.
  room.defaultPreset.wind = 3;
}
void assertPresetIsDeepReadonly;

function assertRuntimeInputIsDeepReadonly(
  settings: Parameters<
    RoomRuntimeModule<VoxelWaterSettings>['createRoomRuntime']
  >[1],
) {
  // @ts-expect-error Runtime settings are immutable contract inputs.
  settings.wind = 3;
}
void assertRuntimeInputIsDeepReadonly;

describe('room settings ownership', () => {
  it('deep-clones every default for each settings session', () => {
    const first = createInitialSettings();
    const second = createInitialSettings();

    for (const room of roomRegistry) {
      expect(first[room.id]).toEqual(room.defaultPreset);
      expect(first[room.id]).not.toBe(room.defaultPreset);
      expect(second[room.id]).not.toBe(first[room.id]);
    }
  });

  it('returns a fresh object for reset operations', () => {
    const room = roomRegistry[0];
    const reset = cloneRoomSettings(room.defaultPreset);

    expect(reset).toEqual(room.defaultPreset);
    expect(reset).not.toBe(room.defaultPreset);
  });
});
