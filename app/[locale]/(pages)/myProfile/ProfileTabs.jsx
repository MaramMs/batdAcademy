"use client";
import { useState } from "react";
import { User, BookOpen, Award, Mail } from "lucide-react";
import PersonalInfo from "./PersonalInfo";
import MyCourses from "./MyCourses";
import Certificates from "./Certificates";
import Messages from "./Messages";
import styles from "@/sass/pages/my-profile/my-profile.module.scss";

const tabs = [
    { id: "personal",      label: "Personal Information", icon: User     },
    { id: "courses",       label: "My Courses",           icon: BookOpen },
    { id: "certificates",  label: "Certificates",         icon: Award    },
    { id: "messages",      label: "Messages",             icon: Mail     },
];

const ProfileTabs = () => {
    const [activeTab, setActiveTab] = useState("personal");

    return (
        <div>
            <nav className={styles.tabsNav}>
                {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        className={`${styles.tabBtn} ${activeTab === id ? styles.activeTab : ""}`}
                        onClick={() => setActiveTab(id)}
                    >
                        <Icon size={16} />
                        <span className={styles.tabLabel}>{label}</span>
                    </button>
                ))}
            </nav>

            <div className={styles.contentCard}>
                {activeTab === "personal"     && <PersonalInfo />}
                {activeTab === "courses"      && <MyCourses />}
                {activeTab === "certificates" && <Certificates />}
                {activeTab === "messages"     && <Messages />}
            </div>
        </div>
    );
};

export default ProfileTabs;
