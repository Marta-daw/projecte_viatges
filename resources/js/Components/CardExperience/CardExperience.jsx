import styles from './CardExperience.module.scss';

function CardExperience({ experience }) {
        return (
            <div className={styles.cardExperience}>
                <div className={styles.imageContainer}>
                    <img src={experience.image_url} alt="Experience Image" className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{experience.title}</h2>
                    <p className={styles.description}>{experience.body}</p>
                </div>
            </div>
        );
}

export default CardExperience;