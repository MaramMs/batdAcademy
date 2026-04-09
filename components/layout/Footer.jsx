import styles from '@/sass/components/layout/footer.module.scss';
import Image from 'next/image';
import footerLogo from '@/public/asstes/footerlogo.png';

// ─── SVG Icons ────────────────────────────────────────────────
const IconYoutube = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.2-4.8-1.7-5-5C2 16.6 2 16.3 2 12s0-3.6.1-4.8c.2-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
  </svg>
);

const IconTwitter = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────
const NAV_COLUMNS = [
  {
    title: 'About',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Consultations', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Courses by City', href: '#' },
      { label: 'Year Plans', href: '#' },
      { label: 'Professional Path', href: '#' },
      { label: 'Work Environment', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Support Center', href: '#' },
      { label: 'Account', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Feedback', href: '#' },
    ],
  },
];

const SOCIALS = [
  { icon: <IconYoutube />, href: '#', label: 'YouTube' },
  { icon: <IconInstagram />, href: '#', label: 'Instagram' },
  { icon: <IconTwitter />, href: '#', label: 'Twitter / X' },
  { icon: <IconLinkedin />, href: '#', label: 'LinkedIn' },
  { icon: <IconFacebook />, href: '#', label: 'Facebook' },
];



// ─── Component ────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site footer">

      <div className={styles.top}>
          <Image src={footerLogo} width={150} height={107} alt='Britih Academy'/>
        <p className={styles.tagline}>
          The world's most trusted training partner for improving knowledge, 
          skills, and capabilities through innovative learning solutions.
        </p>
      </div>

      <div className={styles.main}>
        {NAV_COLUMNS.map((col) => (
          <nav key={col.title} className={styles.navColumn} aria-label={col.title}>
            <h3 className={styles.navTitle}>{col.title}</h3>
            <ul className={styles.navList}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* ── Contact block ── */}
        <div className={styles.contactColumn}>
          <div className={styles.socials} role="list" aria-label="Social media links">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={styles.socialIcon}
                aria-label={s.label}
                role="listitem"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className={styles.contactItems}>
            <a href="tel:+441234567890" className={styles.contactItem}>
              <span className={styles.contactIcon}><IconPhone /></span>
              +44 (0) 123 456 789
            </a>
            <a href="mailto:info@britacademy.org.uk" className={styles.contactItem}>
              <span className={styles.contactIcon}><IconMail /></span>
              info@britacademy.org.uk
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © 2023 British Academy. All Rights Reserved | Created by{' '}
          <a href="#" rel="noopener noreferrer">Shifflet</a>
        </p>
      </div>

    </footer>
  );
}