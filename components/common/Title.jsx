import styles from '@/sass/components/common/title.module.scss';

const Title = ({ title,span ,subtitle }) => {
    return (
        <div className={styles.title}>
            <h2>{title} <span>{span} </span></h2>
            <p>{subtitle}</p>
        </div>
    );
};

export default Title;