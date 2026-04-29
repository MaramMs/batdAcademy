import styles from "@/sass/pages/my-profile/my-profile.module.scss";
import container from "@/sass/components/common/container.module.scss";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";

const mockUser = {
    name: "Ahmed Johnson",
    initials: "AJ",
    avatarUrl: null,
    isOnline: true,
    jobTitle: "Senior Marketing Manager",
    company: "Digital Solutions Ltd",
    country: "United Kingdom",
    stats: [
        { value: "3",   label: "Enrolled Courses"   },
        { value: "1",   label: "Completed Courses"   },
        { value: "1",   label: "Certificates"        },
        { value: "73%", label: "Average Progress"    },
    ],
};

const ProfilePage = () => {
    return (
        <section className={styles.profilePage}>
            <div className={container.container}>
                <ProfileHeader user={mockUser} />
                <ProfileTabs />
            </div>
        </section>
    );
};

export default ProfilePage;
