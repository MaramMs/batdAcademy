import { create } from 'zustand';

export const LANGUAGES = [
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'English',  dir: 'ltr' },
];

/**
 * Global language store (Zustand).
 *
 * Inside React components:
 *   const locale = useLanguageStore((s) => s.locale);
 *
 * Outside React (e.g. API utility functions, server actions):
 *   import { useLanguageStore } from '@/store/useLanguageStore';
 *   const locale = useLanguageStore.getState().locale;
 */
const useLanguageStore = create((set) => ({
  /** Active locale code – defaults to 'en' until the hook syncs it. */
  locale: 'en',

  /** Derived helpers — re-computed whenever locale changes. */
  get selectedLang() {
    return LANGUAGES.find((l) => l.code === this.locale) ?? LANGUAGES[1];
  },
  get oppositeLang() {
    return LANGUAGES.find((l) => l.code !== this.locale) ?? LANGUAGES[0];
  },

  /** Call this to update the stored locale (done inside useLanguageSwitcher). */
  setLocale: (code) => set({ locale: code }),
}));

export default useLanguageStore;
