'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
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
import DropdownMenuCustom from "@/components/common/DropdownMenu";
import useCoursesStore from '@/store/useCoursesStore';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), { ssr: false });


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


// --- SUB-COMPONENTS ---

/**
 * Individual Stat Card
 */
const StatItem = ({ icon: Icon, value, label }) => (
  <div className={styles['request-courses__stat-card']}>
    <Icon color='#1E2749' className={styles['request-courses__stat-icon']} />
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
  const router = useRouter();
  const { locale } = useParams();
  const { data: coursesData, handleGetCourses } = useCoursesStore();

  useEffect(() => {
    handleGetCourses();
  }, []);

  const courseOptions = useMemo(
    () =>
      (coursesData?.courses || []).map((c) => ({
        label: c.name,
        value: c.id,
      })),
    [coursesData]
  );

  const popularCourses = useMemo(
    () => courseOptions.slice(0, 4),
    [courseOptions]
  );

  const {
    register,
    control,
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
  const enableCaptcha = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleTagClick = (courseId) => {
    setValue("course", courseId, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data) => {
    const selected = courseOptions.find((o) => o.value === data.course);
    const params = new URLSearchParams({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      course_id: String(data.course ?? ""),
      course_name: selected?.label ?? "",
    });

    router.push(`/${locale}/registerInternalCourse?${params.toString()}`);
  };
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const t = useTranslations('request-course');

  return (
    <section className={styles['request-courses']}>
      <div className={containerStyles.container}>
        <Title
          title={t('title')}
          span={t('span')}
          subtitle={t('subtitle')}
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
                {popularCourses.map((c) => (
                  <CourseTag
                    key={c.value}
                    name={c.label}
                    isSelected={selectedCourse === c.value}
                    onClick={() => handleTagClick(c.value)}
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
                <Controller
                  name="course"
                  control={control}
                  rules={{ required: "Please select a course" }}
                  render={({ field }) => (
                    <DropdownMenuCustom
                      label="Select your course"
                      options={courseOptions}
                      value={field.value}
                      onChange={field.onChange}
                      triggerClassName={`
                        ${styles['request-courses__input']}
                        ${styles['request-courses__select']}
                        ${!selectedCourse ? styles.placeholder : ""}
                      `}
                      icon={<ChevronDown size={20} className={styles['request-courses__select-arrow']} />}
                    />
                  )}
                />
              </FormField>
        <div style={{ marginTop: '24px', minHeight: 78 }}>
                {enableCaptcha && (
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setRecaptchaToken(token)}
                    onExpired={() => setRecaptchaToken(null)}
                  />
                )}
                {!recaptchaToken && errors.recaptcha && (
                  <span style={{ color: '#EF4444', fontSize: '12px' }}>يرجى إتمام التحقق</span>
                )}
              </div>
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