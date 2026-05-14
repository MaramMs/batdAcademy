"use client";
import DateInput from '@/components/common/DateInput';
import DropdownMenuCustom from '@/components/common/DropdownMenu';
import containerStyles from '@/sass/components/common/container.module.scss';
import headerStyles from '@/sass/pages/course-details/header.module.scss';
import formStyles from '@/sass/pages/request-course/form.module.scss';
import pageStyles from '@/sass/pages/request-course/request-course.module.scss';
import { ArrowLeft, ArrowRight, ChevronDown, House, Users } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import RegistrationTypeToggle from '../registerCourse/RegistrationTypeToggle';
import InternalCourseSidebar from './InternalCourseSidebar';
import ParticipantsSection from './ParticipantsSection';
import NavgationBar from './NavgationBar';
import useRegisterCourseStore from '@/store/useRegisterCourseStore';
import { toast } from 'sonner';

const RegisterInternalCourse = () => {
    const searchParams = useSearchParams();
    const [regType, setRegType] = useState('individual');
    const { handlePostRegisterCourse, isLoading, handleGetRegisterData, registerData } = useRegisterCourseStore();
    console.log(registerData , 'reg data')
    const lang =[
        {
            lable:'English',
            value:1
        },
        {
            lable:'Arabic',
            value:0
        }
    ]


    const { register, handleSubmit, control, formState: { errors }, watch, setValue, reset } = useForm({
        defaultValues: {
            registrationType: 'individual',
            fullName: '',
            email: '',
            phone: '',
            participants: [{ fullName: '', email: '', jobTitle: '', phone: '', mobile: '' }]
        }
    });

    // Handle pre-filling from search params
    useEffect(() => {
        const name = searchParams.get('name');
        const email = searchParams.get('email');
        const mobile = searchParams.get('mobile');
        const courseName = searchParams.get('course');

        if (name) setValue('full_name', name);
        if (email) setValue('email', email);
        if (mobile) setValue('phone', mobile);

        if (courseName && registerData?.courses) {
            const matchedCourse = registerData.courses.find(c => 
                c.name.toLowerCase() === courseName.toLowerCase()
            );
            if (matchedCourse) {
                setValue('course_id', matchedCourse.value);
            } else {
                setValue('specific_course', courseName);
            }
        }
    }, [searchParams, registerData, setValue]);

    const onSubmit = async (data) => {
        try {

            const payload = {
                is_company: regType === 'company' ? 1 : 0,
                full_name: data.fullName,
                email: data.email,
                phone: data.phone,
                country_id: data.country || 282,
                course_id: data.course_id,
                category_id: data.category_id,
                specialisation_id: data.specialisation_id,
                lang: data.lang || 1,
                course_date: data.date instanceof Date
                    ? data.date.toISOString().split('T')[0]
                    : data.date,
                duration_id: data.duration_id || 2,
                city_id: data.city_id || 65,
                attendees: data.attendees,
                specific_course: data.specific_course
            };

            if (regType === 'company') {
                payload.company_name = data.fullName;
                payload.participants = data.participants?.map(p => ({
                    full_name: p.fullName,
                    email: p.email,
                    job_title: p.jobTitle,
                    phone: p.phone,
                    mobile: p.mobile
                }));
            }

            const res = await handlePostRegisterCourse(payload);
            if (res?.success) {
                toast.success(res?.message || 'Registration successful!');
                setTimeout(() => setCurrentStep(4), 2000);
            } else {
                toast.error(res?.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || 'Something went wrong!');
        }
    };

    useEffect(() => {
        handleGetRegisterData()
    }, [])
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
                                    {/* <div className={formStyles.sectionTitle}>
                                        <Users color='#C9302C' size={20} /> Contact Information *
                                    </div>
                                    <div className={pageStyles.formGrid} style={{ marginBottom: '20px' }}>
                                        <div className={formStyles.inputGroup}>
                                            <label>Full Name <span>*</span></label>
                                            <div className={formStyles.inputWrapper}>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    {...register("fullName", { required: "Full name is required" })}
                                                />
                                            </div>
                                            {errors.fullName && <span style={{ color: '#EF4444', fontSize: '12px' }}>{errors.fullName.message}</span>}
                                        </div>

                                        <div className={formStyles.special}>
                                            <div className={formStyles.inputGroup}>
                                                <label>Email Address <span>*</span></label>
                                                <div className={formStyles.inputWrapper}>
                                                    <input
                                                        type="email"
                                                        placeholder="email@example.com"
                                                        {...register("email", { 
                                                            required: "Email is required",
                                                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
                                                        })}
                                                    />
                                                </div>
                                                {errors.email && <span style={{ color: '#EF4444', fontSize: '12px' }}>{errors.email.message}</span>}
                                            </div>
                                            <div className={formStyles.inputGroup}>
                                                <label>Phone Number <span>*</span></label>
                                                <div className={formStyles.inputWrapper}>
                                                    <input
                                                        type="tel"
                                                        placeholder="Enter your phone number"
                                                        {...register("phone", { required: "Phone number is required" })}
                                                    />
                                                </div>
                                                {errors.phone && <span style={{ color: '#EF4444', fontSize: '12px' }}>{errors.phone.message}</span>}
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* <div className={formStyles.sectionTitle} style={{ marginTop: '20px' }}>
                                        <Users color='#C9302C' size={20} /> Course Details *
                                    </div> */}
                                    <div className={pageStyles.formGrid}>
                                        <div className={formStyles.inputGroup} style={{ marginBottom: '24px' }}>
                                            <label>Category <span>*</span></label>
                                            <div className={formStyles.inputWrapper}>

                                                <Controller
                                                    name="category_id"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    render={({ field }) => (
                                                        <DropdownMenuCustom
                                                            label="Select your category"
                                                            options={registerData?.categories?.map((item) => ({

                                                                label: item.name,
                                                                value: item.id,

                                                            }))}
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
                                                        name="specialisation_id"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <DropdownMenuCustom
                                                                label="Please Selected from the list"
                                                                options={registerData?.specialisation?.map((item) => ({
                                                                    value: item.id,
                                                                    lable: item.name
                                                                }))}
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
                                                        name="course_id"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <DropdownMenuCustom
                                                                label="Please Selected from the list"
                                                                options={registerData?.courses?.map((item) => (
                                                                    {
                                                                        lable: item.name,
                                                                        value: item.value
                                                                    }
                                                                ))}
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
                                                        name="city_id"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <DropdownMenuCustom
                                                                label="Please Selected from the list"
                                                                options={registerData?.cities?.map((item) => (
                                                                    {
                                                                        lable: item.name,
                                                                        value: item.value
                                                                    }
                                                                ))}
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
                                                        name="lang"
                                                        control={control}
                                                        rules={{ required: true }}
                                                        render={({ field }) => (
                                                            <DropdownMenuCustom
                                                                label="Please Selected from the list"
                                                                options={lang?.map((item) => (
                                                                    {
                                                                        lable: item.name,
                                                                        value: item.value
                                                                    }
                                                                ))}
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                icon={<ChevronDown size={14} />}
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className={formStyles.inputGroup} style={{ marginBottom: '24px' }}>
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
                                                        name="duration_id"
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
                                            <div className={formStyles.inputGroup} style={{ marginBottom: '24px' }}>
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
                                                    {...register("specific_course", { required: true })}
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
                                                {
                                                    isLoading ? 'loading ...' : 'register'
                                                }
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
