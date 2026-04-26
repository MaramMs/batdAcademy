"use client";
import React from 'react';
import { User, Calendar, CreditCard, Check } from 'lucide-react';
import styles from '@/sass/components/common/stepper.module.scss';

const steps = [
  { id: 1, label: 'Step 1', title: 'Personal Info', icon: User },
  { id: 2, label: 'Step 2', title: 'Course Details', icon: Calendar },
  { id: 3, label: 'Step 3', title: 'Payment', icon: CreditCard },
];

const Stepper = ({ currentStep = 1 }) => {
  return (
    <div className={styles.stepperContainer}>
      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className={styles.step}>
            <div 
              className={`${styles.iconWrapper} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
            >
              {isCompleted ? <Check size={24} /> : <Icon size={24} />}
            </div>
            <div className={styles.stepLabel}>
              <span>{step.label}</span>
              <p>{step.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
