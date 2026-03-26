import styles from './CardExperience.module.scss';
import { Card } from "flowbite-react";
import { Link } from '@inertiajs/react';

function CardExperience({ experience }) {
    return (
        <Link
            href={`/experiencia/${experience.id}`}
            className={styles.cardContainer}
        >
            <div className={styles.cardBody}>
                <Card className={styles.card}>
                    <img src={experience.image_url || '/images/placeholder.png'} alt="experienceIMG" className={styles.cardImage} />
                    <div className={styles.textCard}>
                        <h5 className={styles.cardTitle}> {experience.title} </h5>
                        <p className={styles.cardDescription}>
                            {experience.body}
                        </p>
                    </div>

                </Card>
            </div>
        </Link>
    );
}

export default CardExperience;