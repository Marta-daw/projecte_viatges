import styles from './CardExperience.module.scss';
import { Card } from "flowbite-react";
import { Link, router } from '@inertiajs/react';

function CardExperience({ experience, isAutenticated }) {
    return (
        <Card className={styles.card}>
            <Link
                href={`/experiencia/${experience.id}`}
                className={styles.cardContainer}
            >

                <img src={experience.image_url || '/images/placeholder.png'} alt="experienceIMG" className={styles.cardImage} />
                <div className={styles.textCard}>
                    <h5 className={styles.cardTitle}> {experience.title} </h5>
                    <p className={styles.cardDescription}>
                        {experience.body}
                    </p>
                </div>

            </Link >

            {/*Solo visible con session iniciada*/}
            {isAutenticated && (
                <div className={styles.cardActions}>
                    {experience?.can?.update && (
                        <Link className={styles.editDeletebtnCard} href={route('experiencia.edit', experience.id)}>Editar</Link>
                    )}

                    {experience?.can?.delete && (
                        <button
                            onClick={() => {
                                if (confirm('¿Estás seguro de que deseas eliminar esta experiencia?')) {
                                    router.delete(route('experiencia.destroy', experience.id));
                                }
                            }} className={styles.editDeletebtnCard}>
                            Eliminar
                        </button>
                    )}
                </div>
            )}
        </Card>
    );
}

export default CardExperience;