import { MapPin, Pencil } from "lucide-react";
import styles from "@/sass/pages/my-profile/my-profile.module.scss";

const ProfileHeader = ({ user }) => {
    return (
        <div className={styles.headerCard}>
            <div className={styles.banner} />

            <div className={styles.profileInfoRow}>
                <div className={styles.avatarWrapper}>
                    <div className={styles.avatar}>
                        {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt={user.name} />
                        ) : (
                            user.initials
                        )}
                    </div>
                    {user.isOnline && <span className={styles.onlineIndicator} />}
                </div>

                <div className={styles.userInfo}>
                    <h2>{user.name}</h2>
                    <p className={styles.jobText}>
                        {user.jobTitle} at {user.company}
                    </p>
                    <span className={styles.locationText}>
                        <MapPin size={12} />
                        {user.country}
                    </span>
                </div>

                <button className={styles.editBtn}>
                    <Pencil size={14} />
                    Edit Profile
                </button>
            </div>

            <div className={styles.statsDivider} />

            <div className={styles.statsRow}>
                {user.stats.map((stat) => (
                    <div key={stat.label} className={styles.statItem}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileHeader;
