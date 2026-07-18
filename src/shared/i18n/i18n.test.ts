import { describe, expect, it } from 'vitest';
import {
  createTranslator,
  defaultLocale,
  localeManifest,
  parseLocale,
  type Locale,
} from './index';

describe('i18n catalog', () => {
  it('declares one manifest for every supported locale', () => {
    expect(defaultLocale).toBe('en');
    expect(localeManifest).toEqual([
      { code: 'en', labelKey: 'app.locales.english' },
      { code: 'zh-CN', labelKey: 'app.locales.simplifiedChinese' },
    ]);

    for (const { code, labelKey } of localeManifest) {
      expect(createTranslator(code)(labelKey)).not.toBe('');
    }
  });

  it('parses only manifest locales', () => {
    expect(parseLocale('en')).toBe('en');
    expect(parseLocale('zh-CN')).toBe('zh-CN');
    expect(() => parseLocale('ja')).toThrow('Unsupported locale: "ja".');
    expect(() => parseLocale('')).toThrow('Unsupported locale: "".');
  });

  it.each<Locale>(['en', 'zh-CN'])('resolves required copy in %s', (locale) => {
    const t = createTranslator(locale);

    expect(t('app.title')).toBe('Shader Demo Room');
    expect(t('rooms.voxelWater.controls.surfaceDetail')).not.toBe('');
    expect(t('rooms.glassOptics.controls.focusBeam')).not.toBe('');
    expect(t('app.telemetry.units.milliseconds')).not.toBe('');
    expect(t('app.units.degrees')).toBe('°');
  });

  it('interpolates all declared parameters', () => {
    expect(createTranslator('en')('app.loadingRoom', { room: 'Voxel Water' })).toBe(
      'Loading Voxel Water…',
    );
    expect(createTranslator('zh-CN')('app.loadingRoom', { room: '体素水体' })).toBe(
      '正在加载 体素水体…',
    );
  });

  it('throws for missing keys, non-leaf keys, and invalid runtime locales', () => {
    const t = createTranslator('en');

    expect(() => t('rooms.unknown.title')).toThrow(
      'Missing translation key: "rooms.unknown.title".',
    );
    expect(() => t('rooms.voxelWater.controls')).toThrow(
      'Translation key does not resolve to text: "rooms.voxelWater.controls".',
    );
    expect(() => createTranslator('ja' as Locale)).toThrow('Unsupported locale: "ja".');
  });

  it('throws for missing or unexpected interpolation parameters', () => {
    const t = createTranslator('en');

    expect(() => t('app.loadingRoom')).toThrow(
      'Missing translation params for "app.loadingRoom": room.',
    );
    expect(() => t('app.loadingRoom', { room: 'Voxel Water', extra: 1 })).toThrow(
      'Unexpected translation params for "app.loadingRoom": extra.',
    );
    expect(() => t('app.title', { room: 'Voxel Water' })).toThrow(
      'Unexpected translation params for "app.title": room.',
    );
  });
});
