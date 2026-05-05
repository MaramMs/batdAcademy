"use client";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import styles from "@/sass/pages/contact/offices.module.scss";
import useContactStore from "@/store/useContactStore";
import { useEffect } from "react";
import Skeleton from "@/components/ui/Skeleton";

const iconMap = {
  phone: Phone,
  mail: Mail,
  email: Mail,
  building: MapPin,
  address: MapPin,
};

const workingHours = {
  type: "working_hours",
  title: "Working Hours",
  icon: "clock",
  items: [
    { label: "Monday - Friday", value: "9:00 AM – 6:00 PM" },
    { label: "Saturday", value: "10:00 AM – 4:00 PM" },
    { label: "Sunday", value: "Closed" },
  ],
};

const OurOffices = () => {
  const { contactInfo, isLoading, handleGetContactInfo } = useContactStore();

  useEffect(() => {
    handleGetContactInfo();
  }, [handleGetContactInfo]);

  const allSections = [...contactInfo, workingHours];

  return (
    <div className={styles.officesCard}>
      <div className={styles.officesHeader}>
        <div className={styles.iconBox}>
          <Building2 size={22} color="#fff" />
        </div>
        <h2>Our Offices</h2>
      </div>

      <div className={styles.list}>
        {isLoading ? (
          <>
            <Skeleton style={{ height: "70px", borderRadius: "8px" }} />
            <Skeleton style={{ height: "70px", borderRadius: "8px" }} />
            <Skeleton style={{ height: "70px", borderRadius: "8px" }} />
            <Skeleton style={{ height: "70px", borderRadius: "8px" }} />
          </>
        ) : (
          allSections.map((section, i) => {
            const Icon = iconMap[section.icon] || Clock;
            return (
              <div key={i} className={styles.item}>
                <div className={styles.itemIcon}>
                  <Icon size={18} />
                </div>
                <div className={styles.itemContent}>
                  <h3>{section.title}</h3>
                  {section.items.map((item, j) => (
                    <p key={j}>
                      {item.label ? (
                        <>
                          <strong>{item.label}:</strong> {item.value}
                        </>
                      ) : (
                        item.value
                      )}
                    </p>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OurOffices;
