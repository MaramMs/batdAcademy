"use client";

import { Camera, Upload, ShieldCheck } from "lucide-react";
import styles from "@/sass/pages/edit-my-profile/edit-my-profile.module.scss";

const mockUser = {
    name: "Ahmed Johnson",
    initials: "AJ",
    avatarUrl: null,
    memberSince: "Jan 2024",
    coursesEnrolled: "3 Courses",
    certificates: "1 Earned",
};

const ProfilePicture = () => {
    return (
        <>
            {/* ── Profile Picture Card ── */}
            <div className={styles.card}>
                <p className={styles.cardTitle}>
                    <Camera size={16} />
                    Profile Picture
                </p>

                <div className={styles.avatarArea}>
                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatar}>
                            {mockUser.avatarUrl ? (
                                <img src={mockUser.avatarUrl} alt={mockUser.name} />
                            ) : (
                                mockUser.initials
                            )}
                        </div>
                        <button className={styles.cameraBtn} aria-label="Change photo">
                            <Camera size={13} />
                        </button>
                    </div>

                    <div className={styles.avatarHint}>
                        <p>JPG, PNG or GIF. Max 2MB</p>
                        <p>Recommended 400×400px</p>
                    </div>
                </div>

                <button className={styles.uploadBtn}>
                    <Upload size={14} />
                    Upload Photo
                </button>
            </div>

            {/* ── Account Status Card ── */}
            <div className={styles.accountStatusCard}>
                <div className={styles.statusHeader}>
                    <div className={styles.statusIconWrap}>
                        <ShieldCheck size={20} />
                    </div>
                    <div className={styles.statusTitles}>
                        <h3>Account Status</h3>
                        <span>Verified Account</span>
                    </div>
                </div>

                <div className={styles.statusDivider} />

                <div className={styles.statusList}>
                    <div className={styles.statusItem}>
                        <span>Member Since</span>
                        <span>{mockUser.memberSince}</span>
                    </div>
                    <div className={styles.statusItem}>
                        <span>Courses Enrolled</span>
                        <span>{mockUser.coursesEnrolled}</span>
                    </div>
                    <div className={styles.statusItem}>
                        <span>Certificates</span>
                        <span>{mockUser.certificates}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePicture;
