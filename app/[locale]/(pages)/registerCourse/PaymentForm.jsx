import React from 'react';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import styles from '@/sass/pages/register-course/payment-form.module.scss';

const PaymentForm = ({ register, errors, handleBack, onSubmit, handleSubmit }) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>Payment Information</h2>
        <p className={styles.subtitle}>Your payment is secure and encrypted</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGrid}>
          {/* Card Number */}
          <div className={styles.inputGroup}>
            <label>Card Number <span>*</span></label>
            <div className={styles.inputWrapper}>
              <CreditCard className={styles.inputIcon} size={18} />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                {...register("cardNumber", { required: true })}
              />
            </div>
            {errors.cardNumber && <span className={styles.errorText}>This field is required</span>}
          </div>

          {/* Cardholder Name */}
          <div className={styles.inputGroup}>
            <label>Cardholder Name <span>*</span></label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Name as shown on card"
                {...register("cardHolderName", { required: true })}
              />
            </div>
            {errors.cardHolderName && <span className={styles.errorText}>This field is required</span>}
          </div>

          {/* Expiry and CVV */}
          <div className={styles.flexRow}>
            <div className={styles.inputGroup}>
              <label>Expiry Date <span>*</span></label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  {...register("expiryDate", { required: true })}
                />
              </div>
              {errors.expiryDate && <span className={styles.errorText}>Required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>CVV <span>*</span></label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="123"
                  {...register("cvv", { required: true })}
                />
              </div>
              {errors.cvv && <span className={styles.errorText}>Required</span>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.footerActions}>
          <button type="button" onClick={handleBack} className={styles.btnBack}>
            <ArrowLeft size={18} /> Previous Step
          </button>
          <button type="submit" className={styles.btnPay}>
            <Lock size={18} /> Complete Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
