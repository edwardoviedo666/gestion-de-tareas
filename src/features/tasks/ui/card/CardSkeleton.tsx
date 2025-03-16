import styles from "./card.module.scss";

export default function CardSkeleton() {
    return (
        <div className={`${styles["task-card"]} ${styles.skeleton}`}>
            <div className={styles["task-header"]}>
                <div className={styles.title}></div>
                <div className={styles.icon}></div>
            </div>
            <div className={styles["task-footer"]}>
                <div className={styles.comments}></div>
                <div className={styles.avatar}></div>
            </div>
        </div>
    );
}
