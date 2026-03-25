import React from 'react'
import styles from './DetailedCardExperience.module.scss';

export default function DetailedCardExperience({ experience }) {
    return (
        <>
            <div className={styles.cardExperience}>
                <div className={styles.cardExperience}>
                    <div className={styles.imageContainer}>
                        <img src={experience.image_url} alt="Experience Image" className={styles.image} />
                    </div>
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{experience.title}</h2>
                    <p className={styles.description}>{experience.body}</p>
                </div>

                <div className={styles.cardBody}>
                    <h5 className={styles.cardTitle}>
                        {experience.title}
                    </h5>
                    <p className={styles.cardDescription}>
                        {experience.body}
                    </p>
                </div>
            </div>
        </>
    )
}
