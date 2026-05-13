"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import styles from "@/sass/pages/sign-In/login.module.scss";
import useAuthStore from "@/store/useAuthStore";
import useLanguageStore from "@/store/useLanguageStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { locale } = useLanguageStore();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {
        handleLogin, isLoading
    } = useAuthStore();

    const onSubmit = async (data) => {

        const result = await handleLogin(data, locale);

        if (result?.success && result?.data?.member) {
            toast.success("Login successfully!");
            setTimeout(() => {
                router.push(`/${locale}/myProfile`);
            }, 3000);
        } else {
            toast.error(result?.error || "Failed to login");
        }

    };

    return (
        <div className={styles.formCard}>
            <div className={styles.formHeader}>
                <h1>Welcome Back</h1>
                <p>Sign in to continue your learning journey</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    {errors.email && (
                        <span className={styles.error}>{errors.email.message}</span>
                    )}
                </div>

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
                    {errors.password && (
                        <span className={styles.error}>{errors.password.message}</span>
                    )}
                </div>

                <div className={styles.formOptions}>
                    <label className={styles.rememberMe}>
                        <input type="checkbox" {...register("rememberMe")} />
                        <span>Remember me</span>
                    </label>
                    <Link href="/forgot-password" className={styles.forgotLink}>
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isLoading}
                >
                    {isLoading ? "Sign In..." : "Sign In"}
                    {!isLoading && <ArrowRight size={16} />}
                </button>
            </form>

            <div className={styles.divider}>
                <span>New to British Academy?</span>
            </div>

            <Link href={`/${locale}/signUp`} className={styles.signUpBtn}>
                Sign Up
            </Link>
        </div>
    );
};

export default LoginForm;
