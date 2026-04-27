import React from 'react';
import { Check } from 'lucide-react';
import styles from '@/sass/pages/request-course/request-course.module.scss';

const InternalCourseSidebar = () => {
    return (
        <div className={styles.summaryCard}>
            <div className={styles.summaryContent}>
                <div className={styles.priceSection} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                    <span className={styles.label}>Course Cost</span>
                    <div className={styles.priceContainer} style={{ textAlign: 'left' }}>
                        <span className={styles.newPrice}>$599</span>
                    </div>
                </div>
                
                <p style={{ fontSize: '13px', color: '#64748B', marginTop: '12px' }}>For each member</p>
                <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>Fees + VAT Applicable from 2025</p>

                <div className={styles.divider} />

                <div className={styles.whatsIncluded}>
                    <h4>including</h4>
                    <ul>
                        <li><Check size={14} /> Daily snacks and lunches</li>
                        <li><Check size={14} /> Course materials</li>
                        <li><Check size={14} /> Certificate of completion</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default InternalCourseSidebar;
