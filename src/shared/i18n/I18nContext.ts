import { createContext } from 'react';
import type { Locale } from './index';

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);
