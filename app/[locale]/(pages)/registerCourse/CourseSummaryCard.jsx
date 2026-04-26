"use client";
import React from 'react';
import { Clock, Award, Check, Mail, Phone } from 'lucide-react';
import styles from '@/sass/pages/register-course/register-course.module.scss';

const CourseSummaryCard = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.summaryCard}>
        <img 
          src="/asstes/course1.jpg" 
          alt="Course" 
          className={styles.courseImg}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Course+Image'; }}
        />
        <div className={styles.summaryContent}>
          <h3>Advanced Digital Marketing Masterclass</h3>
          
          <div className={styles.instructor}>
            <div className={styles.avatar}>
              <span className={styles.initials}>SJ</span>
            </div>
            <div className={styles.info}>
              <span>Instructor</span>
              <p>Dr. Sarah Johnson</p>
            </div>
          </div>

          <div className={styles.detailsRow}>
            <div className={styles.label}>
              <Clock color='#2F327D'/> Duration
            </div>
            <div className={styles.value}>8 weeks</div>
          </div>

          <div className={styles.detailsRow}>
            <div className={styles.label}>
              <Award color='#C41E3A' /> Certificate
            </div>
            <div className={styles.value}>Included</div>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceSection}>
            <div className={styles.label}>Course Price</div>
            <div className={styles.priceContainer}>
              <span className={styles.oldPrice}>$899</span>
              <span className={styles.newPrice}>$599</span>
            </div>
          </div>

          <div className={styles.whatsIncluded}>
            <h4>What's Included</h4>
            <ul>
              <li><Check color='#00A63E'/> Lifetime access to course materials</li>
              <li><Check color='#00A63E'/> Certificate of completion</li>
              <li><Check color='#00A63E'/> Live Q&A sessions</li>
              <li><Check color='#00A63E'/> Practical projects and assignments</li>
              <li><Check color='#00A63E'/> 24/7 support</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.helpCard}>
        <h3>Need Help?</h3>
        <p>Our support team is here to assist you with your registration.</p>
        <div className={styles.contactInfo}>
          <div className={styles.item}>
            <Mail size={16} /> support@britishacademy.com
          </div>
          <div className={styles.item}>
            <Phone size={16} /> +972 4 123 4567
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CourseSummaryCard;
