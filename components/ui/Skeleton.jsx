import styles from '@/sass/components/ui/skeleton.module.scss';

const Skeleton = ({ className, style }) => {
    return (
        <div
            className={`${styles.skeleton} ${className || ''}`}
            style={style}
        />
    );
};

export default Skeleton;
