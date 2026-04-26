import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '@/sass/pages/register-course/register-course.module.scss';

const MobileCourseHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.mobileHeader}>
      <div className={styles.headerTrigger} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.courseMiniInfo}>
          <img 
            src="/asstes/course1.jpg" 
            alt="Course" 
            onError={(e) => { e.target.src = 'https://via.placeholder.com/40px?text=C'; }}
          />
          <h3>Advanced Digital Marketing Masterclass</h3>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div className={styles.mobileDetails}>
          <div className={styles.instructor}>
            <p>Instructor: <strong>Dr. Sarah Johnson</strong></p>
          </div>
          <div className={styles.stats}>
            <span>Duration: <strong>8 weeks</strong></span>
            <span>Price: <strong>$599</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCourseHeader;
