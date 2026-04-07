'use client';

import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Award, 
  BookOpen, 
  ChevronDown, 
  CircleCheck, 
  GraduationCap, 
  Mail, 
  Phone, 
  Send, 
  Sparkles, 
  User, 
  Users 
} from "lucide-react";

import Title from "@/components/common/Title";
import styles from '@/sass/pages/home/request-coures.module.scss';
import containerStyles from '@/sass/components/common/container.module.scss';

// --- CONSTANTS ---

const STATS_DATA = [
  { icon: Users, value: "15,000+", label: "Active Students" },
  { icon: Award, value: "15,000+", label: "Active Students" }, 
  { icon: GraduationCap, value: "15,000+", label: "Active Students" },
];

const BENEFITS_DATA = [
  "Industry-recognized certificates",
  "Industry-recognized certificates",
  "Industry-recognized certificates",
  "Industry-recognized certificates",
];

const POPULAR_COURSES = [
  "Web Development",
  "UI/UX Design",
  "Data Science",
  "Digital Marketing",
];

const ALL_COURSES = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
];

// --- SUB-COMPONENTS ---

/**
 * Individual Stat Card
 */
const StatItem = ({ icon: Icon, value, label }) => (
  <div className={styles['request-courses__stat-card']}>
    <Icon color='#1E2749' size={34} />
    <span>{value}</span>
    <p>{label}</p>
  </div>
);

/**
 * Individual Benefit Item
 */
const BenefitItem = ({ text }) => (
  <div className={styles['request-courses__benefit-item']}>
    <CircleCheck color='#3B82F6' size={21} />
    <p>{text}</p>
  </div>
);

/**
 * Interactive Course Tag
 */
const CourseTag = ({ name, isSelected, onClick }) => (
  <button 
    type="button"
    className={`${styles['request-courses__tag']} ${isSelected ? styles['request-courses__tag--active'] : ''}`}
    onClick={() => onClick(name)}
  >
    {name}
  </button>
);

/**
 * Specialized Form Field with Icon and Error Handling
 */
const FormField = ({ 
  icon: Icon, 
  error, 
  children, 
  className = "" 
}) => (
  <div className={`${styles['request-courses__field-group']} ${className}`}>
    <div className={`
      ${styles['request-courses__input-wrapper']} 
      ${error ? styles['request-courses__input-wrapper--error'] : ''}
    `}>
      {Icon && <Icon size={20} className={styles['request-courses__input-icon']} />}
      {children}
    </div>
    {error && <span className={styles['request-courses__error']}>{error.message}</span>}
  </div>
);

const RequestCoures = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      course: "",
    },
  });

  const selectedCourse = watch("course");

  const handleTagClick = (course) => {
    setValue("course", course, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data) => {

  };

  return (
    <section className={styles['request-courses']}>
      <div className={containerStyles.container}>
        <Title 
          title='Request A ' 
          span='Course' 
          subtitle='You can contact us for a special course' 
        />

        <div className={styles['request-courses__content']}>
          {/* LEFT: Info & Stats */}
          <div className={styles['request-courses__left']}>
            <div className={styles['request-courses__stats']}>
              {STATS_DATA.map((stat, idx) => (
                <StatItem key={idx} {...stat} />
              ))}
            </div>

            <div className={styles['request-courses__benefits']}>
              <h2>
                <Award color="#3B82F6" size={21} /> 
                What You Get
              </h2>
              <div className={styles['request-courses__benefits-list']}>
                {BENEFITS_DATA.map((benefit, idx) => (
                  <BenefitItem key={idx} text={benefit} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles['request-courses__right']}>
            <div className={styles['request-courses__header']}>
              <h2> 
                <Sparkles color='#3B82F6' size={20} /> 
                Popular choices:
              </h2>
              <div className={styles['request-courses__tags']}>
                {POPULAR_COURSES.map((course) => (
                  <CourseTag 
                    key={course} 
                    name={course} 
                    isSelected={selectedCourse === course}
                    onClick={handleTagClick}
                  />
                ))}
              </div>
            </div>

            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className={styles['request-courses__form']} 
              noValidate
            >
              <div className={styles['request-courses__field-row']}>
                <FormField error={errors.name} icon={User}>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Full Name"
                    className={styles['request-courses__input']}
                    {...register("name", {
                      required: "Full name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" },
                    })}
                  />
                </FormField>

                <FormField error={errors.email} icon={Mail}>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    className={styles['request-courses__input']}
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                </FormField>
              </div>

              <FormField error={errors.mobile} icon={Phone}>
                <input
                  id="mobile"
                  type="tel"
                  placeholder="Mobile Number"
                  className={styles['request-courses__input']}
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9+\s\-()\\.]{7,15}$/,
                      message: "Enter a valid mobile number",
                    },
                  })}
                />
              </FormField>

              <FormField error={errors.course} icon={BookOpen}>
                <select
                  id="courseSelect"
                  className={`
                    ${styles['request-courses__input']} 
                    ${styles['request-courses__select']} 
                    ${!selectedCourse ? styles.placeholder : ""}
                  `}
                  {...register("course", { required: "Please select a course" })}
                >
                  <option value="" disabled>Select your course</option>
                  {ALL_COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={20} className={styles['request-courses__select-arrow']} />
              </FormField>

              <button 
                type="submit" 
                className={styles['request-courses__submit']}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
                {!isSubmitting && <Send size={16} color="#FFFFFF" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestCoures;