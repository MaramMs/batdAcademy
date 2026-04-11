import styles from '@/sass/components/common/tab.module.scss'


const Tab = ({ tab, isActive, onClick,className }) => {
    return (
        <div className={`${styles.tab} ${className} ${isActive ? styles.active : ''} `}
            onClick={onClick}>
            <span className={styles.tabIcon}>
                {tab.icon}
            </span>
            <span className={styles.tabTitle}>
                {tab.title}
            </span>
        </div>
    )

}

export default Tab