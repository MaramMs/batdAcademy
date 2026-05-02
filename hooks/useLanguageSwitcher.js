import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import useLanguageStore, { LANGUAGES } from '@/store/useLanguageStore';

/**
 * Thin bridge between next-intl and the Zustand language store.
 *
 * - Syncs next-intl's active locale → store on every render.
 * - Exposes the same API as before so existing components need no changes.
 */
export { LANGUAGES };

export const useLanguageSwitcher = () => {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();
  const setLocale = useLanguageStore((s) => s.setLocale);

  // Keep the store in sync with next-intl's locale (URL-driven).
  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  const selectedLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[1];
  const oppositeLang = LANGUAGES.find((l) => l.code !== locale) ?? LANGUAGES[0];

  const switchTo = (langCode) => {
    setLocale(langCode);                          // update store immediately
    router.replace(pathname, { locale: langCode }); // navigate
  };

  const toggle = () => switchTo(oppositeLang.code);

  return { selectedLang, oppositeLang, languages: LANGUAGES, switchTo, toggle };
};