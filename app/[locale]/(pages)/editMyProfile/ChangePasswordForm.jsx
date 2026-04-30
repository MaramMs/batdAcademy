"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, CheckCircle2, Circle, KeyRound } from "lucide-react";
import styles from "@/sass/pages/edit-my-profile/edit-my-profile.module.scss";

const requirements = [
    { id: "length",    label: "At least 8 characters" },
    { id: "number",    label: "At least one number" },
    { id: "case",      label: "Uppercase & lowercase" },
    { id: "special",   label: "Special character (optional)" },
];

const PasswordField = ({ id, label, placeholder, required }) => {
    const [show, setShow] = useState(false);
    return (
        <div className={`${styles.field} ${required === "full" ? styles.fullWidth : ""}`}>
            <label htmlFor={id} className={styles.fieldLabel}>
                {label}
                {required && required !== "full" && <span className={styles.required}>*</span>}
                {required === "full" && <span className={styles.required}>*</span>}
            </label>
            <div className={styles.inputWrapperPassword}>
                <span className={styles.inputIcon}>
                    <Lock size={15} />
                </span>
                <input
                    id={id}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
            </div>
        </div>
    );
};

const ChangePasswordForm = () => {
    return (
        <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
                <KeyRound size={17} />
                Change Password
            </h2>
            <p className={styles.sectionSubtitle}>
                Leave these fields blank if you don&apos;t want to change your password
            </p>

            <div className={styles.passwordGrid}>
                {/* Current password — full width */}
                <PasswordField
                    id="currentPassword"
                    label="Current Password"
                    placeholder="Enter current password"
                    required="full"
                />

                {/* New + confirm side by side */}
                <PasswordField
                    id="newPassword"
                    label="New Password"
                    placeholder="Enter new password"
                    required={true}
                />
                <PasswordField
                    id="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    required={true}
                />

                {/* Requirements */}
                <div className={styles.passwordRequirements}>
                    <p className={styles.reqTitle}>
                        <CheckCircle2 size={14} />
                        Password Requirements
                    </p>
                    <div className={styles.reqGrid}>
                        {requirements.map((r) => (
                            <div key={r.id} className={styles.reqItem}>
                                <span className={styles.reqIcon}>
                                    <Circle size={9} />
                                </span>
                                {r.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
