import { User, Mail, Phone, Globe, Briefcase, Building2, MapPin } from "lucide-react";
import styles from "@/sass/pages/my-profile/my-profile.module.scss";

const fields = [
    { label: "Full Name",     value: "Ahmed Johnson",                    icon: User,      colSpan: false },
    { label: "Email Address", value: "ahmed.johnson@example.com",        icon: Mail,      colSpan: false },
    { label: "Phone Number",  value: "+44 7700 900123",                  icon: Phone,     colSpan: false },
    { label: "Mobile Number", value: "+44 7700 900124",                  icon: Phone,     colSpan: false },
    { label: "Country",       value: "United Kingdom",                   icon: Globe,     colSpan: false },
    { label: "Job Title",     value: "Senior Marketing Manager",         icon: Briefcase, colSpan: false },
    { label: "Company Name",  value: "Digital Solutions Ltd",            icon: Building2, colSpan: false },
    { label: "Address",       value: "123 Oxford Street, London, W1D 1LA", icon: MapPin, colSpan: true  },
];

const PersonalInfo = () => {
    return (
        <div>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.fieldsGrid}>
                {fields.map((f) => {
                    const Icon = f.icon;
                    return (
                        <div
                            key={f.label}
                            className={`${styles.field} ${f.colSpan ? styles.fullWidth : ""}`}
                        >
                            <span className={styles.fieldLabel}>{f.label}</span>
                            <div className={styles.fieldValue}>
                                <Icon size={15} />
                                <span>{f.value}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PersonalInfo;
