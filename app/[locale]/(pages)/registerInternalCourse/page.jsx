"use client";
import DateInput from '@/components/common/DateInput';
import DropdownMenuCustom from '@/components/common/DropdownMenu';
import containerStyles from '@/sass/components/common/container.module.scss';
import headerStyles from '@/sass/pages/course-details/header.module.scss';
import formStyles from '@/sass/pages/request-course/form.module.scss';
import pageStyles from '@/sass/pages/request-course/request-course.module.scss';
import { ArrowLeft, ArrowRight, ChevronDown, House, Users } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import RegistrationTypeToggle from '../registerCourse/RegistrationTypeToggle';
import InternalCourseSidebar from './InternalCourseSidebar';
import ParticipantsSection from './ParticipantsSection';
import NavgationBar from './NavgationBar';

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

        <div>
            <NavgationBar />
              <div className={pageStyles.mainContent}>
            <div className={containerStyles.container}>
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
                                <div className={pageStyles.formGrid}>
                                    <div className={formStyles.inputGroup} style={{marginBottom:'24px'}}>
                                        <label>Category <span>*</span></label>
                                        <div className={formStyles.inputWrapper}>

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
                                                        icon={<ChevronDown size={14} />}
                                                    />
                                                )}
                                            />

                                        </div>
                                        {errors.category && <span style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>This field is required</span>}
                                    </div>

                                    <div className={formStyles.special}>
                                        <div className={formStyles.inputGroup}>
                                            <label>Specialisation <span>*</span></label>
                                            <div className={formStyles.inputWrapper}>
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
                                                            icon={<ChevronDown size={14} />}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label>Course <span>*</span></label>
                                            <div className={formStyles.inputWrapper}>

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
                                                            icon={<ChevronDown size={14} />}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={formStyles.special}>
                                        <div className={formStyles.inputGroup}>
                                            <label>City <span>*</span></label>
                                            <div className={formStyles.inputWrapper}>

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
                                                            icon={<ChevronDown size={14} />}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className={formStyles.inputGroup}>
                                            <label>Language <span>*</span></label>
                                            <div className={formStyles.inputWrapper}>

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
                                                        icon={<ChevronDown size={14} />}
                                                        />
                                                    )}
                                                    />
                                        </div>
                                                    </div>
                                    </div>

                                    <div className={formStyles.inputGroup} style={{marginBottom:'24px'}}>
                                        <label>Number Of Attendees <span>*</span></label>
                                        <div className={formStyles.inputWrapper}>

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
                                                        icon={<ChevronDown size={14} />}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className={formStyles.special}>
                                        <div className={formStyles.inputGroup}>
                                            <label>Duration <span>*</span></label>
                                            <div className={formStyles.inputWrapper}>

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
                                                            icon={<ChevronDown size={14} />}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className={formStyles.inputGroup} style={{marginBottom:'24px'}}>
                                            <label>Date <span>*</span></label>
                                            <div className={formStyles.inputWrapper}>
                                                <Controller
                                                    name="date"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <DateInput
                                                            selected={field.value}
                                                            onChange={field.onChange}
                                                            placeholder="DD / MM / YYYY"
                                                            className={pageStyles.datePickerInput}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={formStyles.inputGroup} style={{ marginBottom: '24px' }}>
                                        <label>Do you have a specific Course/Program ? <span>*</span></label>
                                        <div className={formStyles.inputWrapper}>
                                            <textarea
                                                placeholder="Tell us about your specific course requirements..."
                                                {...register("requirements", { required: true })}
                                                style={{ width: '100%', minHeight: '120px', padding: '12px 16px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', resize: 'vertical', outline: 'none' }}
                                            />
                                        </div>
                                    </div>

                                    {
                                        regType === 'company' && (
                                            <ParticipantsSection control={control} register={register} errors={errors} />

                                        )
                                    }


                                    <div className={formStyles.footerActions}>
                                        <button type="submit" className={formStyles.btnContinue}>
                                            Register
                                        </button>
                                    </div>
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

        </div>
      
    );
};

export default RegisterInternalCourse;
