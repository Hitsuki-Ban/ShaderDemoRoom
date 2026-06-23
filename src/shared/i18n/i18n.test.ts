import { describe, expect, it } from 'vitest';
import { createTranslator, messages } from './index';

describe('i18n translator seam', () => {
  it('translates global and room-scoped copy in English by default', () => {
    const t = createTranslator(messages, 'en');

    expect(t('app.title')).toBe('Shader Demo Room');
    expect(t('rooms.voxelWater.title')).toBe('Voxel Water');
    expect(t('rooms.voxelWater.controls.surfaceDetail')).toBe('Surface Detail');
    expect(t('rooms.voxelWater.controls.currentDirection')).toBe('Current Direction');
    expect(t('rooms.voxelWater.controls.skyTime')).toBe('Sky Time');
    expect(t('rooms.glassOptics.controls.lightPath')).toBe('Light Path');
    expect(t('rooms.animeLiquidOrb.title')).toBe('MIZU//KOKORO');
    expect(t('rooms.ninthTideArchive.controls.reload')).toBe('Reload exhibit');
  });

  it('falls back to English and then the key for missing copy', () => {
    const t = createTranslator(messages, 'ja');

    expect(t('app.rooms')).toBe('Rooms');
    expect(t('rooms.unknown.title')).toBe('rooms.unknown.title');
  });
});
