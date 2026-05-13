"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { User, Mail, Phone, Building2, Briefcase, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import styles from "@/sass/pages/sign-up/register.module.scss";
import useLanguageStore from "@/store/useLanguageStore";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useCitiesStore from "@/store/useCitiesStore";
import { useEffect } from "react";
import { toast } from "sonner";

const RegisterForm = () => {
    const router = useRouter();
    const { locale } = useLanguageStore();
    const { handleSignup, isLoading } = useAuthStore();
    const { cities, handleGetCities } = useCitiesStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch, getValues, trigger } = useForm();

    const password = watch("password");

    const handlePasswordChange = () => {
        if (errors.password_confirmation) {
            trigger("password_confirmation");
        }
    };

    useEffect(() => {
        handleGetCities();
    }, [handleGetCities]);

    const onSubmit = async (formData) => {
        const result = await handleSignup(formData, locale);
        console.log(result, "result")

        if (result?.success && result?.member) {
            toast.success("Account created successfully!");
            setTimeout(() => {
                router.push(`/${locale}/myProfile`);
            }, 500);
        } else {
            toast.error(result?.error || "Something went wrong");
        }
    };

    return (
        <div className={styles.formCard}>
            <div className={styles.formHeader}>
                <h1>Create Your Account</h1>
                <p>Fill in your information to get started</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <p className={styles.sectionLabel}>Personal Information</p>

                {/* Full Name */}
                <div className={styles.field}>
                    <label htmlFor="fullName">
                        Full Name <span className={styles.required}>*</span>
                    </label>
                    <div className={`${styles.inputWrapper} ${errors.fullName ? styles.hasError : ""}`}>
                        <User size={16} className={styles.inputIcon} />
                        <input
                            id="fullName"
                            type="text"
                            placeholder="John"
                            {...register("full_name", { required: "Full name is required" })}
                        />
                    </div>
                    {errors.fullName && <span className={styles.error}>{errors.fullName.message}</span>}
                </div>

                {/* Email */}
                <div className={styles.field}>
                    <label htmlFor="email">
                        Email Address <span className={styles.required}>*</span>
                    </label>
                    <div className={`${styles.inputWrapper} ${errors.email ? styles.hasError : ""}`}>
                        <Mail size={16} className={styles.inputIcon} />
                        <input
                            id="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                    </div>
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>

                {/* Phone */}
                <div className={styles.field}>
                    <label htmlFor="phone">
                        Phone Number <span className={styles.required}>*</span>
                    </label>
                    <div className={`${styles.inputWrapper} ${errors.phone ? styles.hasError : ""}`}>
                        <Phone size={16} className={styles.inputIcon} />
                        <input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            {...register("phone", { required: "Phone number is required" })}
                        />
                    </div>
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                </div>

                {/* Country */}
                <div className={styles.field}>
                    <label htmlFor="country">
                        Country <span className={styles.required}>*</span>
                    </label>
                    <div className={`${styles.inputWrapper} ${styles.noIcon} ${errors.country ? styles.hasError : ""}`}>
                        <select
                            id="country_id"
                            defaultValue=""
                            {...register("country_id", { required: "Please select your country" })}
                        >
                            <option value="" disabled>Select your country</option>
                            {cities?.map((c) => (
                                <option key={c.id} value={282}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    {errors.country && <span className={styles.error}>{errors.country.message}</span>}
                </div>

                {/* Company Name */}
                <div className={styles.field}>
                    <label htmlFor="company">Company Name</label>
                    <div className={styles.inputWrapper}>
                        <Building2 size={16} className={styles.inputIcon} />
                        <input
                            id="company"
                            type="text"
                            placeholder="Your Company"
                            {...register("company")}
                        />
                    </div>
                </div>

                {/* Job Title */}
                <div className={styles.field}>
                    <label htmlFor="jobTitle">Job Title</label>
                    <div className={styles.inputWrapper}>
                        <Briefcase size={16} className={styles.inputIcon} />
                        <input
                            id="jobTitle"
                            type="text"
                            placeholder="Your Position"
                            {...register("jobTitle")}
                        />
                    </div>
                </div>

                {/* Password */}
                <div className={styles.field}>
                    <label htmlFor="password">
                        Password <span className={styles.required}>*</span>
                    </label>
                    <div className={`${styles.inputWrapper} ${errors.password ? styles.hasError : ""}`}>
                        <Lock size={16} className={styles.inputIcon} />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                onChange: handlePasswordChange
                            })}
                        />
                        <button
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                </div>

                <div className={styles.field}>
                    <label htmlFor="password_confirmation">
                        Password Confirmation <span className={styles.required}>*</span>
                    </label>
                    <div className={`${styles.inputWrapper} ${errors.password_confirmation ? styles.hasError : ""}`}>
                        <Lock size={16} className={styles.inputIcon} />
                        <input
                            id="password_confirmation"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            {...register("password_confirmation", {
                                required: "Please confirm your password",
                                validate: (value) => value === password || "The passwords do not match"
                            })}
                        />
                        <button
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password_confirmation && (
                        <span className={styles.error}>{errors.password_confirmation.message}</span>
                    )}
                </div>

                {/* Terms */}
                <label className={styles.termsBox}>
                    <input
                        type="checkbox"
                        {...register("terms", { required: true })}
                    />
                    <p>
                        I agree to the{" "}
                        <Link href="/terms" onClick={(e) => e.stopPropagation()}>
                            Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" onClick={(e) => e.stopPropagation()}>
                            Privacy Policy
                        </Link>
                    </p>
                </label>
                {errors.terms && (
                    <p className={styles.termsError}>You must agree to the terms to continue</p>
                )}



                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isLoading}
                >
                    {isLoading ? "Creating account..." : "Sign Up"}
                    {!isLoading && <ArrowRight size={16} />}
                </button>
            </form>

            <p className={styles.alreadyHave}>
                Already have an account?
                <Link href={`/${locale}/signIn`}>Sign In</Link>
            </p>
        </div>
    );
};

export default RegisterForm;
