import styles from './CardExperience.module.scss';
import { Card } from "flowbite-react";

function CardExperience({ experience }) {
    return (
        <>
            <div className={styles.cardExperience}>
                <div className={styles.imageContainer}>
                    <img src={experience.image_url} alt="Experience Image" className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{experience.title}</h2>
                    <p className={styles.description}>{experience.body}</p>
                </div>
            </div>

            <div className={styles.cardBody}>
                <Card
                    className={styles.card}
                    imgAlt="experienceIMG"
                    imgSrc={experience.image_url}
                >

                    <h5 className={styles.cardTitle}>
                        {experience.title}
                    </h5>
                    <p className={styles.cardDescription}>
                        {experience.body}
                    </p>
                </Card>
            </div>
        </>
    );
}

export default CardExperience;