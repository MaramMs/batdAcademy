import { useEffect, useMemo } from "react";
import { User, Mail, Phone, Globe, Briefcase, Building2, MapPin } from "lucide-react";
import styles from "@/sass/pages/my-profile/my-profile.module.scss";
import useCitiesStore from "@/store/useCitiesStore";

const PersonalInfo = ({ user }) => {
    const { cities, handleGetCities } = useCitiesStore();

    useEffect(() => {
        if (cities.length === 0) {
            handleGetCities();
        }
    }, [cities.length, handleGetCities]);

    const countryName = useMemo(() => {
        if (!user?.country_id) return user?.country || "Not specified";
        const found = cities.find(c => c.id === user.country_id);
        return found ? found.name : (user?.country || "Not specified");
    }, [cities, user?.country_id, user?.country]);

    const fields = [
        { label: "Full Name", value: user?.full_name, icon: User, colSpan: false },
        { label: "Email Address", value: user?.email, icon: Mail, colSpan: false },
        { label: "Phone Number", value: user?.phone, icon: Phone, colSpan: false },
        { label: "Mobile Number", value: user?.mobile_number, icon: Phone, colSpan: false },
        { label: "Country", value: countryName, icon: Globe, colSpan: false },
        { label: "Job Title", value: user?.job_title, icon: Briefcase, colSpan: false },
        { label: "Company Name", value: user?.company_name, icon: Building2, colSpan: false },
        { label: "Address", value: user?.location, icon: MapPin, colSpan: true },
    ];

    return (
        <div>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.fieldsGrid}>
                {fields?.map((f) => {
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
