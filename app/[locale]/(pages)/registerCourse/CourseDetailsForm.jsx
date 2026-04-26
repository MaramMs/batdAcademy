import React from 'react';
import { Calendar, Clock, MapPin, Globe, ArrowLeft, ArrowRight, CircleCheck } from 'lucide-react';
import styles from '@/sass/pages/register-course/course-details-form.module.scss';
import Image from 'next/image';

const CourseDetailsForm = ({ register, errors, handleBack, onSubmit, handleSubmit }) => {
  const availableDates = [
    { date: 'May 17, 2024', duration: '8 weeks duration' },
    { date: 'Jun 28, 2024', duration: '8 weeks duration' },
    { date: 'Sep 11, 2024', duration: '8 weeks duration' },
    { date: 'Oct 15, 2024', duration: '8 weeks duration' },
  ];

  const durations = [
    { title: '2 Weeks - Intensive', price: '$599' },
    { title: '4 Weeks - Standard', price: '$799' },
    { title: '8 Weeks - Comprehensive', price: '$999' },
    { title: '12 Weeks - Extended', price: '$1299' },
  ];

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>Choose Your Training Schedule</h2>
        <p className={styles.subtitle}>Select your preferred date and location</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Available Dates */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Calendar size={18} color="#1E293B" />
            <span>Available Dates *</span>
          </div>
          <div className={styles.dateGrid}>
            {availableDates.map((item, index) => (
              <label key={index} className={styles.dateCard}>
                <input type="radio" name="selectedDate" value={item.date} {...register("selectedDate", { required: true })} />
                <div className={styles.cardContent}>
                  <div className={styles.iconBox}>
                    <Calendar size={20} />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.dateText}>{item.date}</span>
                    <span className={styles.durationText}>{item.duration}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Custom Date */}
        <div className={styles.customDateSection}>
          <div className={styles.customDateHeader}>
            <Calendar size={16} color="#C9302C" />
            <span>Or Choose Your Own Date</span>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="DD / MM / YYYY"
              {...register("customDate")}
            />
            <Calendar className={styles.inputIcon} size={18} />
          </div>
          <p className={styles.helperText}>✨ Select a custom start date that works best for you</p>
        </div>

        {/* Course Duration */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Clock size={18} color="#1E293B" />
            <span>Course Duration *</span>
          </div>
          <div className={styles.durationGrid}>
            {durations.map((item, index) => (
              <label key={index} className={styles.durationCard}>
                <input type="radio" name="duration" value={item.title} {...register("duration", { required: true })} />
                <div className={styles.cardContent}>
                  <div className={styles.iconBox}>
                    <Clock size={20} />
                  </div>
                  <div className={styles.info}>
                    <span className={styles.titleText}>{item.title}</span>
                    <span className={styles.priceText}>{item.price}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Training Location */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <MapPin size={18} color="#1E293B" />
            <span>Training Location *</span>
          </div>
          <div className={styles.selectWrapper}>
            <select {...register("location", { required: true })}>
              <option value="">Select training location...</option>
              <option value="online">Online</option>
              <option value="riyadh">Riyadh, Saudi Arabia</option>
              <option value="dubai">Dubai, UAE</option>
            </select>
          </div>
        </div>

        {/* Course Language */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <Globe size={18} color="#1E293B" />
            <span>Course Language *</span>
          </div>
          <div className={styles.languageToggle}>
            <label className={styles.langOption}>
              <input type="radio" name="language" value="english" {...register("language")} defaultChecked />
              <div className={styles.langContent}>
                <Image src="/asstes/en.png" alt="English" width={30} height={30} />

                <span>English</span>
              </div>
            </label>
            <label className={styles.langOption}>
              <input type="radio" name="language" value="arabic" {...register("language")} />
              <div className={styles.langContent}>
                <Image src="/asstes/ar.png" alt="Arabic" width={30} height={30} />
                <span>العربية</span>
              </div>
            </label>
          </div>
        </div>

        <div className={styles.dataConfirmed}>
          <div className={styles.title} >
            <CircleCheck color='#00A63E' size={20} />
            <h3>Your Selection Confirmed</h3>

          </div>
          <div className={styles.confirmedData}>
            <div className={styles.item}>
              <span className={styles.icon}><Calendar size={18} color="#1E293B" /></span>
              <div className={styles.info}>
                <span className={styles.label}>Start Date</span>
                <span className={styles.value}>May 17, 2024</span>

              </div>

            </div>

            <div className={styles.item}>
              <span className={styles.icon}><Clock size={18} color="#1E293B" /></span>
              <div className={styles.info}>
                <span className={styles.label}>Duration</span>
                <span className={styles.value}>8 weeks</span>

              </div>

            </div>



            <div className={styles.item}>
              <span className={styles.icon}><MapPin size={18} color="#1E293B" /></span>
              <div className={styles.info}>
                <span className={styles.label}>Location</span>
                <span className={styles.value}>Dubai, UAE</span>

              </div>

            </div>


            <div className={styles.item}>
              <span className={styles.icon}><Globe size={18} color="#1E293B" /></span>
              <div className={styles.info}>
                <span className={styles.label}>Language</span>
                <span className={styles.value}>English</span>

              </div>

            </div>
          </div>

        </div>


        {/* Actions */}
        <div className={styles.footerActions}>
          <button type="button" onClick={handleBack} className={styles.btnBack}>
            <ArrowLeft size={18} /> Previous Step
          </button>
          <button type="submit" className={styles.btnContinue}>
            Continue <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseDetailsForm;
