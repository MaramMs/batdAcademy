import styles from '@/sass/components/common/tab.module.scss';
import Link from 'next/link';



const Tab = ({ tab, isActive, onClick, className, activeClassName }) => {
    console.log(tab,'tab from tab')
    return (
        <div className={`${styles.tab} ${className || ''} ${isActive ? `${styles.active} ${activeClassName || ''}` : ''}`}
            onClick={onClick}>
            {/* <span className={styles.tabIcon}>
                {tab.icon}
            </span> */}
            <Link href={`/category/${tab.id}/${tab.title}`} className={styles.tabTitle}>
                {tab.title}
            </Link>
        </div>
    )

}

export default Tab