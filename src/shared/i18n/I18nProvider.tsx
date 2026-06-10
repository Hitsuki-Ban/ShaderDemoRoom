import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { I18nContext, type I18nContextValue } from './I18nContext';
import { createTranslator, defaultLocale, messages, type Locale } from './index';

const supportedLocales: Locale[] = ['en', 'zh-CN'];

function normalizeLocale(locale: string): Locale {
  return supportedLocales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => setLocaleState(normalizeLocale(nextLocale)),
      t: createTranslator(messages, locale),
    }),
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
