import { describe, expect, it } from 'vitest';
import { getRoomById, roomRegistry } from './registry';

describe('roomRegistry', () => {
  it('registers the showroom rooms with unique ids', () => {
    expect(roomRegistry.map((room) => room.id)).toEqual([
      'voxel-water',
      'glass-optics',
      'anime-liquid-orb',
      'ninth-tide-archive',
    ]);
    expect(new Set(roomRegistry.map((room) => room.id)).size).toBe(
      roomRegistry.length,
    );
  });

  it('keeps each room modular with scene, controller, presets, and i18n namespace', () => {
    for (const room of roomRegistry) {
      expect(room.titleKey).toMatch(/^rooms\.[a-zA-Z0-9]+\.title$/);
      expect(room.i18nNamespace).toMatch(/^rooms\.[a-zA-Z0-9]+$/);
      expect(room.defaultPreset).toBeDefined();
      expect(typeof room.loadControls).toBe('function');
      if (room.kind === 'shader') {
        expect(typeof room.loadScene).toBe('function');
      } else {
        expect(room.embedPath).toMatch(/^exhibits\/.+\/index\.html$/);
      }
    }
  });

  it('finds rooms by id', () => {
    expect(getRoomById('glass-optics')?.i18nNamespace).toBe(
      'rooms.glassOptics',
    );
    expect(getRoomById('anime-liquid-orb')?.kind).toBe('embedded');
    expect(getRoomById('ninth-tide-archive')?.kind).toBe('embedded');
    expect(getRoomById('missing-room')).toBeUndefined();
  });
});
