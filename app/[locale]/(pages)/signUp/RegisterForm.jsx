"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { User, Mail, Phone, Building2, Briefcase, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import styles from "@/sass/pages/sign-up/register.module.scss";


const countries = [
    "Saudi Arabia", "United Arab Emirates", "Kuwait", "Qatar", "Bahrain", "Oman",
    "Egypt", "Jordan", "Lebanon", "Iraq", "Syria", "Libya", "Tunisia", "Morocco",
    "United Kingdom", "United States", "Canada", "Australia", "Germany", "France",
    "Turkey", "India", "Pakistan", "Other",
];

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 1200));
        console.log(data);
        setIsSubmitting(false);
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
                            {...register("fullName", { required: "Full name is required" })}
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
                            id="country"
                            defaultValue=""
                            {...register("country", { required: "Please select your country" })}
                        >
                            <option value="" disabled>Select your country</option>
                            {countries.map((c) => (
                                <option key={c} value={c}>{c}</option>
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
                                minLength: { value: 8, message: "Minimum 8 characters" },
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating account..." : "Sign Up"}
                    {!isSubmitting && <ArrowRight size={16} />}
                </button>
            </form>

            <p className={styles.alreadyHave}>
                Already have an account?
                <Link href="/login">Sign In</Link>
            </p>
        </div>
    );
};

export default RegisterForm;
