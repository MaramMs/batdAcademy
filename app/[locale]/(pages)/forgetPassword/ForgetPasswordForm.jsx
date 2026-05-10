"use client";
import { useForm } from "react-hook-form";
import { Mail, ArrowRight } from "lucide-react";
import styles from "@/sass/pages/sign-In/login.module.scss";
import useAuthStore from "@/store/useAuthStore";
import useLanguageStore from "@/store/useLanguageStore";
import { toast } from "sonner";

const ForgetPasswordForm = () => {
    const { locale } = useLanguageStore();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {
        forgetPassword, isLoading
    } = useAuthStore();

    const onSubmit = async (data) => {

        const result = await forgetPassword(data, locale);

        console.log(result, "result from forget password")

        if (result?.success) {
            toast.success(result?.data?.message);
        } else {
            toast.error(result?.error || "Failed to send reset email");
        }

    };

    return (
        <div className={styles.formCard}>
            <div className={styles.formHeader}>
                <h1>Forget Password</h1>
                <p>Enter your email address and we'll send you a link to reset your password.</p>
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



                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isLoading}
                >
                    {isLoading ? "Forgot Password..." : "Forgot Password"}
                    {!isLoading && <ArrowRight size={16} />}
                </button>
            </form>

        </div>
    );
};

export default ForgetPasswordForm;
