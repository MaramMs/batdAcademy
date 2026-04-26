import React from 'react';
import { CheckCircle2, FileText, House, Download } from 'lucide-react';
import styles from '@/sass/pages/register-course/success-page.module.scss';

const SuccessPage = ({ email = "nourskhail@gmail.com" }) => {
  const details = [
    { label: 'Course', value: 'Advanced Digital Marketing Masterclass' },
    { label: 'Start Date', value: 'Oct 15, 2024' },
    { label: 'Location', value: 'Dubai' },
    { label: 'Duration', value: '8 weeks' },
    { label: 'Total Paid', value: '$599', isBold: true },
  ];

  return (
    <div className={styles.successContainer}>
      <div className={styles.successCard}>
        <div className={styles.iconWrapper}>
          <CheckCircle2 size={80} color="#00D27B" strokeWidth={1.5} />
        </div>

        <div className={styles.header}>
          <h1>Registration Successful!</h1>
          <p className={styles.subtitle}>
            Congratulations! You're enrolled in the course. We've sent a <br />
            confirmation email to <br />
            <span className={styles.email}>{email}</span>
          </p>
        </div>

        <div className={styles.detailsCard}>
          <div className={styles.detailsHeader}>
            <FileText size={18} color="#2F327D" />
            <span>Registration Details</span>
          </div>

          <div className={styles.detailsList}>
            {details.map((item, index) => (
              <div key={index} className={styles.detailItem}>
                <span className={styles.label}>{item.label}</span>
                <span className={`${styles.value} ${item.isBold ? styles.boldValue : ''}`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnBack}>
            <House size={18} /> Back to Courses
          </button>
          <button className={styles.btnDownload}>
            <Download size={18} /> Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
