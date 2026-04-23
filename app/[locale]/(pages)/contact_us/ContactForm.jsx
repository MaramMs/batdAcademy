'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Package, MessageSquare, Send, MessageCircle } from "lucide-react";
import styles from "@/sass/pages/contact/form.module.scss";

const subjects = [
    "Course Inquiry",
    "Training Programs",
    "Consulting Services",
    "Technical Support",
    "Other",
];

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        await new Promise((r) => setTimeout(r, 1200));
        console.log(data);
        setIsSubmitting(false);
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className={styles.formCard}>
            <div className={styles.formHeader}>
                <div className={styles.iconBox}>
                    <MessageCircle size={22} color="#fff" />
                </div>
                <div>
                    <h2>Send us a Message</h2>
                    <p>We&apos;ll respond within 24 hours</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.field}>
                    <label>Full Name <span>*</span></label>
                    <div className={`${styles.inputWrapper} ${errors.fullName ? styles.hasError : ""}`}>
                        <User size={16} className={styles.inputIcon} />
                        <input
                            type="text"
                            placeholder="John Doe"
                            {...register("fullName", { required: "Full name is required" })}
                        />
                    </div>
                    {errors.fullName && <span className={styles.error}>{errors.fullName.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Email Address <span>*</span></label>
                    <div className={`${styles.inputWrapper} ${errors.email ? styles.hasError : ""}`}>
                        <Mail size={16} className={styles.inputIcon} />
                        <input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
                            })}
                        />
                    </div>
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>

                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Phone Number</label>
                        <div className={styles.inputWrapper}>
                            <Phone size={16} className={styles.inputIcon} />
                            <input
                                type="tel"
                                placeholder="+44 123 456 7890"
                                {...register("phone")}
                            />
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label>P.O. Box</label>
                        <div className={styles.inputWrapper}>
                            <Package size={16} className={styles.inputIcon} />
                            <input
                                type="text"
                                placeholder="Optional"
                                {...register("poBox")}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Subject <span>*</span></label>
                    <div className={`${styles.inputWrapper} ${styles.selectWrapper} ${errors.subject ? styles.hasError : ""}`}>
                        <MessageSquare size={16} className={styles.inputIcon} />
                        <select {...register("subject", { required: "Please select a subject" })}>
                            <option value="">Select a subject</option>
                            {subjects.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    {errors.subject && <span className={styles.error}>{errors.subject.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Your Message <span>*</span></label>
                    <div className={`${styles.inputWrapper} ${styles.textareaWrapper} ${errors.message ? styles.hasError : ""}`}>
                        <textarea
                            rows={5}
                            placeholder="Tell us about your requirements or inquiry..."
                            {...register("message", { required: "Message is required" })}
                        />
                    </div>
                    {errors.message && <span className={styles.error}>{errors.message.message}</span>}
                </div>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                >
                    <Send size={16} />
                    {isSubmitting ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
