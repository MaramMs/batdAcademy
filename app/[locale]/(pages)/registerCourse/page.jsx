"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Stepper from '@/components/common/Stepper';
import CourseSummaryCard from './CourseSummaryCard';
import StepsForm from './StepsForm';
import CourseDetailsForm from './CourseDetailsForm';
import PaymentForm from './PaymentForm';
import SuccessPage from './SuccessPage';
import NavigationBar from '@/components/common/NavigationBar';
import MobileCourseHeader from './MobileCourseHeader';
import styles from '@/sass/pages/register-course/register-course.module.scss';
import stylesContainer from '@/sass/components/common/container.module.scss';

const RegisterCoursePage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [regType, setRegType] = useState('individual');
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        if (currentStep === 1) {
            console.log('Step 1 data:', { ...data, registrationType: regType });
            setCurrentStep(2);
        } else if (currentStep === 2) {
            console.log('Step 2 data:', data);
            setCurrentStep(3);
        } else if (currentStep === 3) {
            console.log('Step 3 data (Payment):', data);
            setCurrentStep(4);
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(1, prev - 1));
    };

    return (
        <div className={styles.registerPage}>
            <NavigationBar currentStep={currentStep > 3 ? 3 : currentStep} />
            <div className={styles.mainContent}>
                <div className={stylesContainer.container}>
                    {currentStep <= 3 && <MobileCourseHeader />}
                    <div className={`${styles.content} ${currentStep === 4 ? styles.successLayout : ''}`}>
                        <div className={styles.formContent}>
                            {currentStep <= 3 && <Stepper currentStep={currentStep} />}

                            {currentStep === 1 ? (
                                <StepsForm
                                    handleSubmit={handleSubmit}
                                    onSubmit={onSubmit}
                                    errors={errors}
                                    register={register}
                                    control={control}
                                    setRegType={setRegType}
                                    regType={regType}
                                />
                            ) : currentStep === 2 ? (
                                <CourseDetailsForm
                                    handleSubmit={handleSubmit}
                                    onSubmit={onSubmit}
                                    register={register}
                                    errors={errors}
                                    handleBack={handleBack}
                                />
                            ) : currentStep === 3 ? (
                                <PaymentForm
                                    handleSubmit={handleSubmit}
                                    onSubmit={onSubmit}
                                    register={register}
                                    errors={errors}
                                    handleBack={handleBack}
                                />
                            ) : (
                                <SuccessPage />
                            )}
                        </div>
                        {currentStep <= 3 && <CourseSummaryCard />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCoursePage;



