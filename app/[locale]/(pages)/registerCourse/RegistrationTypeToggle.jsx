"use client";
import React from 'react';
import { User, Building2, CheckCircle2 } from 'lucide-react';
import styles from '@/sass/pages/register-course/registration-type-toggle.module.scss';

const RegistrationTypeToggle = ({ value, onChange }) => {
  return (
    <div className={styles.typeToggle}>
      <div 
        className={`${styles.typeCard} ${value === 'individual' ? styles.active : ''}`}
        onClick={() => onChange('individual')}
      >
        <div className={styles.iconBox}>
          <User size={24} />
        </div>
        <div className={styles.info}>
          <h3>Individual</h3>
          <p>Register as an individual learner</p>
        </div>
        {value === 'individual' && <CheckCircle2 className={styles.checkIcon} size={20} />}
      </div>

      <div 
        className={`${styles.typeCard} ${value === 'company' ? styles.active : ''}`}
        onClick={() => onChange('company')}
      >
        <div className={styles.iconBox}>
          <Building2 size={24} />
        </div>
        <div className={styles.info}>
          <h3>Company</h3>
          <p>Register on behalf of a company</p>
        </div>
        {value === 'company' && <CheckCircle2 className={styles.checkIcon} size={20} />}
      </div>
    </div>
  );
};

export default RegistrationTypeToggle;
