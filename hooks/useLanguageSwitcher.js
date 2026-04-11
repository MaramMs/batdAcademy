import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export const LANGUAGES = [
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'English',  dir: 'ltr' },
];

export const useLanguageSwitcher = () => {
  const locale    = useLocale();
  const router    = useRouter();
  const pathname  = usePathname();

  const selectedLang  = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[1];
  const oppositeLang  = LANGUAGES.find(l => l.code !== locale) ?? LANGUAGES[0];

  const switchTo = (langCode) => {
    router.replace(pathname, { locale: langCode });
  };

  const toggle = () => switchTo(oppositeLang.code);

  return { selectedLang, oppositeLang, languages: LANGUAGES, switchTo, toggle };
};