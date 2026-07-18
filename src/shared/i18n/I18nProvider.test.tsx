import { act, cleanup, render, screen } from '@testing-library/react';
import { useLayoutEffect } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { I18nProvider } from './I18nProvider';
import { useI18n } from './useI18n';
import type { I18nContextValue } from './I18nContext';
import type { Locale } from './index';

let currentI18n: I18nContextValue | undefined;

function Probe() {
  const i18n = useI18n();

  useLayoutEffect(() => {
    currentI18n = i18n;

    return () => {
      currentI18n = undefined;
    };
  }, [i18n]);

  return (
    <div>
      <span data-testid="locale">{i18n.locale}</span>
      <span data-testid="title">{i18n.t('app.title')}</span>
    </div>
  );
}

function renderProvider() {
  return render(
    <I18nProvider>
      <Probe />
    </I18nProvider>,
  );
}

describe('I18nProvider', () => {
  beforeEach(() => {
    currentI18n = undefined;
    window.localStorage.clear();
    document.documentElement.lang = '';
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('uses English only when the locale storage entry is absent', () => {
    renderProvider();

    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(screen.getByTestId('title')).toHaveTextContent('Shader Demo Room');
    expect(document.documentElement.lang).toBe('en');
    expect(window.localStorage.getItem('sdr.locale')).toBeNull();
  });

  it('initializes from the persisted locale and synchronizes document.lang', () => {
    window.localStorage.setItem('sdr.locale', 'zh-CN');

    renderProvider();

    expect(screen.getByTestId('locale')).toHaveTextContent('zh-CN');
    expect(document.documentElement.lang).toBe('zh-CN');
  });

  it('does not read navigator language during initialization', () => {
    const languageGetter = vi
      .spyOn(navigator, 'languages', 'get')
      .mockImplementation(() => {
        throw new Error('navigator language must not be read');
      });

    renderProvider();

    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(languageGetter).not.toHaveBeenCalled();
  });

  it('persists a valid locale before publishing the state update', () => {
    renderProvider();
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    act(() => currentI18n!.setLocale('zh-CN'));

    expect(setItem).toHaveBeenCalledWith('sdr.locale', 'zh-CN');
    expect(window.localStorage.getItem('sdr.locale')).toBe('zh-CN');
    expect(screen.getByTestId('locale')).toHaveTextContent('zh-CN');
    expect(document.documentElement.lang).toBe('zh-CN');
  });

  it('rejects an invalid persisted locale', () => {
    window.localStorage.setItem('sdr.locale', 'ja');

    expect(() => renderProvider()).toThrow('Unsupported locale: "ja".');
  });

  it('rejects invalid locale updates without writing or updating state', () => {
    renderProvider();
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    expect(() => act(() => currentI18n!.setLocale('ja' as Locale))).toThrow(
      'Unsupported locale: "ja".',
    );
    expect(setItem).not.toHaveBeenCalled();
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('surfaces localStorage read failures', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('locale read failed');
    });

    expect(() => renderProvider()).toThrow('locale read failed');
  });

  it('surfaces localStorage write failures without updating state', () => {
    renderProvider();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('locale write failed');
    });

    expect(() => act(() => currentI18n!.setLocale('zh-CN'))).toThrow(
      'locale write failed',
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
