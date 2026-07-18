import {
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { I18nContext, type I18nContextValue } from './I18nContext';
import { createTranslator, defaultLocale, parseLocale, type Locale } from './index';

const localeStorageKey = 'sdr.locale';

function readInitialLocale(): Locale {
  const storedLocale = window.localStorage.getItem(localeStorageKey);
  return storedLocale === null ? defaultLocale : parseLocale(storedLocale);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        const parsedLocale = parseLocale(nextLocale);
        window.localStorage.setItem(localeStorageKey, parsedLocale);
        setLocaleState(parsedLocale);
      },
      t: createTranslator(locale),
    }),
    [locale],
  );

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
