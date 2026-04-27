"use client";
import React, { useState} from 'react';
import { useForm,Controller } from 'react-hook-form';
import { Users,ArrowLeft, ArrowRight, House } from 'lucide-react';
import RegistrationTypeToggle from '../registerCourse/RegistrationTypeToggle';
import DropdownMenuCustom from '@/components/common/DropdownMenu';
import DateInput from '@/components/common/DateInput';
import InternalCourseSidebar from './InternalCourseSidebar';
import ParticipantsSection from './ParticipantsSection';
import pageStyles from '@/sass/pages/request-course/request-course.module.scss';
import formStyles from '@/sass/pages/register-course/steps-form.module.scss';
import containerStyles from '@/sass/components/common/container.module.scss';
import headerStyles from '@/sass/pages/course-details/header.module.scss';

const RegisterInternalCourse = () => {
    const [regType, setRegType] = useState('individual');
    
    const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            registrationType: 'individual',
            participants: [{ fullName: '', email: '', jobTitle: '', phone: '', mobile: '' }]
        }
    });

    const onSubmit = (data) => {
        console.log('Form Data:', data);
    };

    return (
        <div className={pageStyles.mainContent}>
            <div className={containerStyles.container}>
                {/* Breadcrumbs */}
                <div className={headerStyles.header} style={{ background: 'transparent', padding: '0 0 24px 0', border: 'none' }}>
                    <div className={headerStyles.wrapper} style={{ justifyContent: 'flex-start' }}>
                        <div className={headerStyles.breadcrumb}>
                            <ArrowLeft color='#2F327D' size={20} />
                            <span>Back to Courses</span>
                        </div>
                        <span style={{ margin: '0 12px', color: '#CBD5E1' }}>|</span>
                        <House color='#4A5565' size={20} />
                        <ArrowRight color='#4A5565' size={20} />
                        <span style={{ color: '#4A5565', fontSize: '14px' }}>Courses</span>
                        <ArrowRight color='#4A5565' size={20} />
                        <span style={{ color: '#1E293B', fontSize: '14px', fontWeight: 500 }}>Request a course</span>
                    </div>
                </div>

                <div className={pageStyles.content}>
                    <div className={formStyles.formContent}>
                        <div className={formStyles.formCard}>
                            <div className={formStyles.formHeader}>
                                <h2>Request a course</h2>
                                <p className={formStyles.subtitle}>Tell us about yourself to get started</p>
                            </div>

                            <div className={formStyles.registrationTypeSection}>
                                <div className={formStyles.sectionTitle}>
                                    <Users color='#C9302C' size={20} /> Registration Type *
                                </div>
                                <RegistrationTypeToggle
                                    value={regType}
                                    onChange={(val) => {
                                        setRegType(val);
                                        setValue('registrationType', val);
                                    }}
                                />
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={formStyles.formGrid}>
                                    <div className={formStyles.inputGroup}>
                                        <label>Category <span>*</span></label>
                                        <Controller
                                            name="category"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <DropdownMenuCustom
                                                    label="Select your country"
                                                    options={['Option 1', 'Option 2']}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                        {errors.category && <span style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>This field is required</span>}
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div className={formStyles.inputGroup}>
                                            <label>Specialisation <span>*</span></label>
                                            <Controller
                                                name="specialisation"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <DropdownMenuCustom
                                                        label="Please Selected from the list"
                                                        options={['Option 1', 'Option 2']}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label>Course <span>*</span></label>
                                            <Controller
                                                name="course"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <DropdownMenuCustom
                                                        label="Please Selected from the list"
                                                        options={['Option 1', 'Option 2']}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div className={formStyles.inputGroup}>
                                            <label>City <span>*</span></label>
                                            <Controller
                                                name="city"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <DropdownMenuCustom
                                                        label="Please Selected from the list"
                                                        options={['Option 1', 'Option 2']}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label>Language <span>*</span></label>
                                            <Controller
                                                name="language"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <DropdownMenuCustom
                                                        label="Please Selected from the list"
                                                        options={['Option 1', 'Option 2']}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className={formStyles.inputGroup}>
                                        <label>Number Of Attendees <span>*</span></label>
                                        <Controller
                                            name="attendees"
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <DropdownMenuCustom
                                                    label="Please Selected from the list"
                                                    options={['1-5', '6-10', '10+']}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            )}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <div className={formStyles.inputGroup}>
                                            <label>Duration <span>*</span></label>
                                            <Controller
                                                name="duration"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <DropdownMenuCustom
                                                        label="Please Selected from the list"
                                                        options={['1 Day', '2 Days', '3 Days']}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label>Date <span>*</span></label>
                                            <Controller
                                                name="date"
                                                control={control}
                                                rules={{ required: true }}
                                                render={({ field }) => (
                                                    <DateInput
                                                        selected={field.value}
                                                        onChange={field.onChange}
                                                        placeholder="DD / MM / YYYY"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className={formStyles.inputGroup}>
                                        <label>Do you have a specific Course/Program ? <span>*</span></label>
                                        <textarea
                                            placeholder="Tell us about your specific course requirements..."
                                            {...register("requirements", { required: true })}
                                            style={{ width: '100%', minHeight: '120px', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', resize: 'vertical', outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <ParticipantsSection control={control} register={register} errors={errors} />

                                <div className={formStyles.footerActions}>
                                    <button type="submit" className={formStyles.btnContinue}>
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={pageStyles.sidebar}>
                        <InternalCourseSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterInternalCourse;
