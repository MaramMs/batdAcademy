'use client';

import { useEffect, useRef, useState } from 'react';
import { Headphones, Phone, ChevronDown, Globe } from 'lucide-react';
import styles from '@/sass/components/layout/top-navbar.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

const LANGUAGES = [
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'en', label: 'English',  dir: 'ltr' },
];

const TopNavBar = () => {
  const t = useTranslations('TopBar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const selectedLang = LANGUAGES.find(l => l.code === locale) || LANGUAGES[1];
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLangSelect = (lang) => {
    setIsOpen(false);
    // Switch locale while keeping the current path
    router.replace(pathname, { locale: lang.code });
  };

  return (
    <nav className={styles.topNavBar}>

      <div className={styles.left}>
        <div className={styles.container}>
          <div className={styles.phone}>
            <span>
              <Phone className={styles.icon} aria-hidden="true" />
            </span>
            <p>
              <span>{t('callUs')}:</span> (406) 555-0120
            </p>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.container}>
          <span>
            <Headphones className={styles.icon} aria-hidden="true" />
          </span>

          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <Globe className={styles.icon} aria-hidden="true" />
              <span>{selectedLang.label}</span>
              <ChevronDown
                className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <ul className={styles.dropdownMenu} role="listbox">
                {LANGUAGES.map((lang) => (
                  <li
                    key={lang.code}
                    role="option"
                    aria-selected={selectedLang.code === lang.code}
                    className={`${styles.dropdownItem} ${
                      selectedLang.code === lang.code ? styles.active : ''
                    }`}
                    onClick={() => handleLangSelect(lang)}
                  >
                    {lang.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
};

export default TopNavBar;