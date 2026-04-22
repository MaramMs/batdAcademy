'use client';

import { useState, useRef, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import logo from '@/public/asstes/logo.png';
import { ChevronDown, Menu, X, Search } from 'lucide-react';
import styles from '@/sass/components/layout/main-navbar.module.scss';
import { useTranslations } from 'next-intl';
import { useLanguageSwitcher } from '@/hooks/useLanguageSwitcher';

const MainNavBar = () => {
  const t = useTranslations('Navbar');
  const { oppositeLang, toggle } = useLanguageSwitcher();

  const [trainingOpen, setTrainingOpen] = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const dropdownRef = useRef(null);

  const TRAINING_ITEMS = [
    { label: t('programs.master'), href: '/search_course?type=2' },
    { label: t('programs.diploma'), href: '/search_course?type=3' },
    { label: t('programs.trainingCourses'),  href: '/search_course?type=1' },
  ];

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTrainingOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <header className={styles.mainNavBar}>
      <div className={styles.inner}>

        <Link href="/" className={styles.logo}>
          <Image
            src={logo}
            alt="British Academy for Training & Development"
            width={106}
            height={83}
            style={{ objectFit: 'cover', height: 'auto' }}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={`${styles.navLink} ${styles.active}`}>
            {t('home')}
          </Link>

          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={styles.navLink}
              onClick={() => setTrainingOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={trainingOpen}
            >
              {t('trainingPrograms')}
              <ChevronDown
                className={`${styles.chevron} ${trainingOpen ? styles.open : ''}`}
                aria-hidden="true"
              />
            </button>

            {trainingOpen && (
              <ul className={styles.dropdownMenu} role="menu">
                {TRAINING_ITEMS.map((item) => (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      className={styles.dropdownItem}
                      role="menuitem"
                      onClick={() => setTrainingOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link href="/consulting"  className={styles.navLink}>{t('consulting')}</Link>
          <Link href="/blog"       className={styles.navLink}>{t('blog')}</Link>
          <Link href="/contact"     className={styles.navLink}>{t('contactUs')}</Link>
        </nav>

        <div className={styles.actions}>
          <Link href="/login"    className={styles.btnSignIn}>{t('signIn')}</Link>
          <Link href="/register" className={styles.btnSignUp}>{t('signUp')}</Link>
        </div>

        {/* Mobile Search, Lang Toggle & Hamburger */}
        <div className={styles.mobileActions_top}>
          <button className={styles.searchIconMobile} aria-label="Search">
            <Search size={22} />
          </button>

          {/* ✅ Mobile lang toggle — uses shared hook, different UI */}
          <button
            className={styles.langToggleMobile}
            onClick={toggle}
            aria-label={`Switch to ${oppositeLang.label}`}
          >
            {oppositeLang.code.toUpperCase()}
          </button>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/"           className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t('home')}</Link>
          <Link href="/programs"   className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t('trainingPrograms')}</Link>
          <Link href="/consulting" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t('consulting')}</Link>
          <Link href="/about"      className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t('aboutUs')}</Link>
          <Link href="/contact"    className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{t('contactUs')}</Link>
          <div className={styles.mobileActions}>
            <Link href="/login"    className={styles.btnSignIn} onClick={() => setMobileOpen(false)}>{t('signIn')}</Link>
            <Link href="/register" className={styles.btnSignUp} onClick={() => setMobileOpen(false)}>{t('signUp')}</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavBar;