import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import styles from "@/sass/pages/edit-my-profile/edit-my-profile.module.scss";
import container from "@/sass/components/common/container.module.scss";
import ProfilePicture from "./ProfilePicture";
import PersonalInfoForm from "./PersonalInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";

const EditProfilePage = () => {
    return (
        <section className={styles.editProfilePage}>
            <div className={container.container}>

                {/* ── Page Header ── */}
                <div className={styles.pageHeader}>
                    <Link href="/myProfile" className={styles.backLink}>
                        <ArrowLeft size={14} />
                        Back to Profile
                    </Link>

                    <div className={styles.headerTop}>
                        <div className={styles.headerTitles}>
                            <h1>Edit Profile</h1>
                            <p>Update your personal information and account settings</p>
                        </div>

                        <div className={styles.headerActions}>
                            <button className={styles.btnCancel}>
                                <X size={14} />
                                Cancel
                            </button>
                            <button className={styles.btnSave}>
                                <Check size={14} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Two-column layout ── */}
                <div className={styles.editLayout}>

                    {/* Left panel */}
                    <div className={styles.leftPanel}>
                        <ProfilePicture />
                    </div>

                    {/* Right panel */}
                    <div className={styles.rightPanel}>
                        <PersonalInfoForm />
                        <ChangePasswordForm />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EditProfilePage;
