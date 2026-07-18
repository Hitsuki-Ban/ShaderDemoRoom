import { describe, expect, it } from 'vitest';
import { roomAccentTokens } from '../styles/designTokens';
import { getRoomById, roomRegistry } from './registry';

const supportedEmbeddedPermissions = new Set(['autoplay', 'microphone']);

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

  it('assigns every room a unique governed accent token', () => {
    const accents = roomRegistry.map((room) => room.accent);

    expect(accents).toEqual([
      roomAccentTokens.cyan,
      roomAccentTokens.amber,
      roomAccentTokens.magenta,
      roomAccentTokens.mint,
    ]);
    expect(new Set(accents).size).toBe(accents.length);
    expect(accents.every((accent) => Object.values(roomAccentTokens).includes(accent))).toBe(
      true,
    );
  });

  it('declares the governed shell chrome stage profile for every room', () => {
    expect(
      Object.fromEntries(
        roomRegistry.map((room) => [room.id, room.stageProfile.shellChrome]),
      ),
    ).toEqual({
      'voxel-water': 'default',
      'glass-optics': 'default',
      'anime-liquid-orb': 'default',
      'ninth-tide-archive': 'dim',
    });
  });

  it('keeps each room modular with scene, controller, presets, and i18n namespace', () => {
    for (const room of roomRegistry) {
      expect(room.titleKey).toMatch(/^rooms\.[a-zA-Z0-9]+\.title$/);
      expect(room.i18nNamespace).toMatch(/^rooms\.[a-zA-Z0-9]+$/);
      expect(room.defaultPreset).toBeDefined();
      expect(['default', 'dim']).toContain(room.stageProfile.shellChrome);
      expect(typeof room.loadControls).toBe('function');
      if (room.kind === 'shader') {
        expect(typeof room.loadScene).toBe('function');
      } else {
        expect(room.embedPath).toMatch(/^exhibits\/.+\/index\.html$/);
        expect(new Set(room.permissions).size).toBe(room.permissions.length);
        for (const permission of room.permissions) {
          expect(supportedEmbeddedPermissions.has(permission)).toBe(true);
        }
      }
    }
  });

  it('declares the least privileges required by each embedded exhibit', () => {
    const embeddedPermissions = Object.fromEntries(
      roomRegistry
        .filter((room) => room.kind === 'embedded')
        .map((room) => [room.id, room.permissions]),
    );

    expect(embeddedPermissions).toEqual({
      'anime-liquid-orb': ['autoplay', 'microphone'],
      'ninth-tide-archive': ['autoplay'],
    });
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
