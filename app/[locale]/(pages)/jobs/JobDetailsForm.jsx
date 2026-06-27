"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight,
  Award,
  Bookmark,
  Briefcase,
  DollarSign,
  Heart,
  MapPin,
  Palmtree,
  X,
} from "lucide-react";
import styles from "@/sass/pages/jobs/job-details-modal.module.scss";
import { useTranslations } from "next-intl";

const BENEFIT_ICONS = {
  salary: DollarSign,
  health: Heart,
  remote: Palmtree,
  growth: Briefcase,
};

const JobDetailsForm = ({ job, onApplyNow }) => {
  const t = useTranslations('Jobs');
  const benefits = job.benefits.map((benefit) => {
    const Icon = BENEFIT_ICONS[benefit.iconKey] ?? Briefcase;
    return { ...benefit, Icon };
  });

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerMain}>
          <span className={styles.logo} aria-hidden>
            {job.logoLetter}
          </span>
          <div className={styles.headerText}>
            <Dialog.Title className={styles.title}>{job.title}</Dialog.Title>
            <Dialog.Description className={styles.company}>
              {job.company}
            </Dialog.Description>
            <div className={styles.tags}>
              {job.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Dialog.Close asChild>
          <button
            type="button"
            className={styles.closeBtn}
            aria-label="Close job details"
          >
            <X size={18} />
          </button>
        </Dialog.Close>
      </header>

      <div className={styles.quickInfo}>
        <div className={styles.quickInfoItem}>
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className={styles.quickInfoItem}>
          <DollarSign size={16} />
          <span>{job.salary}</span>
        </div>
        <div className={styles.quickInfoItem}>
          <Award size={16} />
          <span>{job.experience}</span>
        </div>
      </div>

      <div className={styles.body}>
        <section>
          <h3 className={styles.sectionTitle}>{t('jobDescription')}</h3>
          <p className={styles.description}>{job.description}</p>
        </section>

        <section>
          <h3 className={styles.sectionTitle}>{t('requirements')}</h3>
          <ul className={styles.requirements}>
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className={styles.sectionTitle}>{t('benefits')}</h3>
          <div className={styles.benefitsGrid}>
            {benefits.map(({ label, Icon }) => (
              <div key={label} className={styles.benefitItem}>
                <Icon size={18} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <button type="button" className={styles.bookmarkBtn}>
          <Bookmark size={18} />
          {t('bookmark')}
        </button>
        <button type="button" className={styles.applyBtn} onClick={onApplyNow}>
          {t('applyNow')}
          <ArrowRight size={18} />
        </button>
      </footer>
    </>
  );
};

export default JobDetailsForm;
