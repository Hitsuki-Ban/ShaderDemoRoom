import { describe, expect, it } from 'vitest';
import { animeLiquidOrbDefaults } from '../rooms/anime-liquid-orb/state';
import { glassOpticsDefaults } from '../rooms/glass-optics/state';
import type {
  EmbeddedExhibitSettings,
  GlassOpticsSettings,
  VoxelWaterSettings,
} from '../rooms/types';
import {
  voxelWaterDefaults,
  voxelWaterStormPreset,
} from '../rooms/voxel-water/state';
import {
  parseRoomUrlSettings,
  serializeRoomUrlSettings,
  URL_STATE_RESERVED_KEYS,
} from './url-state';

describe('room URL settings', () => {
  it('serializes default shader settings to empty parameters', () => {
    expect(serializeRoomUrlSettings('voxel-water', { ...voxelWaterDefaults }).toString()).toBe('');
    expect(serializeRoomUrlSettings('glass-optics', { ...glassOpticsDefaults }).toString()).toBe('');
  });

  it('serializes a single difference with the schema version', () => {
    const settings: VoxelWaterSettings = {
      ...voxelWaterDefaults,
      rain: 0.5,
    };

    expect(serializeRoomUrlSettings('voxel-water', settings).toString()).toBe('rain=0.5&v=1');
    expect(parseRoomUrlSettings('voxel-water', new URLSearchParams('rain=0.5&v=1')))
      .toEqual(settings);
  });

  it('round-trips the full voxel storm preset', () => {
    const serialized = serializeRoomUrlSettings('voxel-water', { ...voxelWaterStormPreset });

    expect(parseRoomUrlSettings('voxel-water', serialized)).toEqual(voxelWaterStormPreset);
  });

  it('round-trips glass boolean differences', () => {
    const settings: GlassOpticsSettings = {
      ...glassOpticsDefaults,
      autoRotate: false,
      showCaustics: false,
    };
    const serialized = serializeRoomUrlSettings('glass-optics', settings);

    expect(serialized.toString()).toBe('autoRotate=false&showCaustics=false&v=1');
    expect(parseRoomUrlSettings('glass-optics', serialized)).toEqual(settings);
  });

  it.each([
    'rain=0.5',
    'rain=0.5&v=2',
    'rain=0.5&v=1&v=1',
  ])('rejects the complete settings group for missing or invalid versions: %s', (query) => {
    expect(parseRoomUrlSettings('voxel-water', new URLSearchParams(query)))
      .toEqual(voxelWaterDefaults);
  });

  it('ignores unknown keys without requiring a version', () => {
    expect(parseRoomUrlSettings('voxel-water', new URLSearchParams('futureField=12')))
      .toEqual(voxelWaterDefaults);
  });

  it('falls back duplicate and empty fields independently', () => {
    const parsed = parseRoomUrlSettings(
      'voxel-water',
      new URLSearchParams('v=1&rain=0.5&rain=0.6&wind=1.2&waveHeight='),
    );

    expect(parsed.rain).toBe(voxelWaterDefaults.rain);
    expect(parsed.waveHeight).toBe(voxelWaterDefaults.waveHeight);
    expect(parsed.wind).toBe(1.2);
  });

  it('rejects invalid enum, boolean, and non-strict decimal values per field', () => {
    const voxel = parseRoomUrlSettings(
      'voxel-water',
      new URLSearchParams('v=1&weather=snow&wind=1e0&rain=0.5'),
    );
    const glass = parseRoomUrlSettings(
      'glass-optics',
      new URLSearchParams('v=1&autoRotate=1&showCaustics=false'),
    );

    expect(voxel.weather).toBe(voxelWaterDefaults.weather);
    expect(voxel.wind).toBe(voxelWaterDefaults.wind);
    expect(voxel.rain).toBe(0.5);
    expect(glass.autoRotate).toBe(glassOpticsDefaults.autoRotate);
    expect(glass.showCaustics).toBe(false);
  });

  it('rejects out-of-range and off-step numbers without clamping', () => {
    const parsed = parseRoomUrlSettings(
      'voxel-water',
      new URLSearchParams('v=1&wind=3.1&waveHeight=0.485&rain=0.5'),
    );

    expect(parsed.wind).toBe(voxelWaterDefaults.wind);
    expect(parsed.waveHeight).toBe(voxelWaterDefaults.waveHeight);
    expect(parsed.rain).toBe(0.5);
  });

  it('sorts serialized parameters into canonical key order', () => {
    const settings: VoxelWaterSettings = {
      ...voxelWaterDefaults,
      waveHeight: 1.2,
      rain: 0.5,
    };

    expect(serializeRoomUrlSettings('voxel-water', settings).toString())
      .toBe('rain=0.5&v=1&waveHeight=1.2');
  });

  it('keeps embedded reload tokens transient', () => {
    const settings: EmbeddedExhibitSettings = { reloadToken: 12 };

    expect(serializeRoomUrlSettings('anime-liquid-orb', settings).toString()).toBe('');
    expect(parseRoomUrlSettings(
      'anime-liquid-orb',
      new URLSearchParams('reloadToken=12&v=1'),
    )).toEqual(animeLiquidOrbDefaults);
    expect(URL_STATE_RESERVED_KEYS).toContain('qaTime');
  });

  it('returns fresh settings without mutating room defaults', () => {
    const first = parseRoomUrlSettings('voxel-water', new URLSearchParams());
    const second = parseRoomUrlSettings('voxel-water', new URLSearchParams());

    expect(first).not.toBe(second);
    first.rain = 0.99;
    expect(second.rain).toBe(voxelWaterDefaults.rain);
    expect(voxelWaterDefaults.rain).toBe(0.12);
  });
});
