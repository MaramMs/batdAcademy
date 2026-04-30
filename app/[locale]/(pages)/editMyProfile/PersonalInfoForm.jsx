"use client";

import { User, Mail, Phone, Globe, Briefcase, Building2, MapPin } from "lucide-react";
import styles from "@/sass/pages/edit-my-profile/edit-my-profile.module.scss";

const fields = [
    { id: "fullName",     label: "Full Name",     placeholder: "Ahmed Johnson",                    icon: User,      required: true,  fullWidth: false },
    { id: "email",        label: "Email Address", placeholder: "ahmedjoh@example.com",             icon: Mail,      required: true,  fullWidth: false },
    { id: "phone",        label: "Phone Number",  placeholder: "+44 7700 900123",                  icon: Phone,     required: true,  fullWidth: false },
    { id: "country",      label: "Country",       placeholder: "United Kingdom",                   icon: Globe,     required: true,  fullWidth: false },
    { id: "jobTitle",     label: "Job Title",     placeholder: "Senior Marketing Manager",         icon: Briefcase, required: false, fullWidth: false },
    { id: "companyName",  label: "Company Name",  placeholder: "Digital Solutions Ltd",            icon: Building2, required: false, fullWidth: false },
    { id: "address",      label: "Address",       placeholder: "123 Oxford Street, London, W1D 1LA", icon: MapPin, required: false, fullWidth: true  },
];

const PersonalInfoForm = () => {
    return (
        <div className={styles.card}>
            <h2 className={styles.sectionTitle}>
                <User size={17} />
                Personal Information
            </h2>

            <div className={styles.fieldsGrid}>
                {fields.map((f) => {
                    const Icon = f.icon;
                    return (
                        <div
                            key={f.id}
                            className={`${styles.field} ${f.fullWidth ? styles.fullWidth : ""}`}
                        >
                            <label htmlFor={f.id} className={styles.fieldLabel}>
                                {f.label}
                                {f.required && <span className={styles.required}>*</span>}
                            </label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>
                                    <Icon size={15} />
                                </span>
                                <input
                                    id={f.id}
                                    type="text"
                                    placeholder={f.placeholder}
                                    defaultValue={f.placeholder}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PersonalInfoForm;
