import styles from './CardExperience.module.scss';
import { Card } from "flowbite-react";
import { Link, router } from '@inertiajs/react';
import { FaRegThumbsUp } from 'react-icons/fa'; // versió outline/light
import { FaRegThumbsDown } from 'react-icons/fa';

function CardExperience({ experience, isAuthenticated }) {
    return (
        <Card className={styles.card}>
            <Link
                href={`/experiencia/${experience.id}`}
                className={styles.cardContainer}
            >

                <img src={experience.image_url || '/images/placeholder.png'} alt="experienceIMG" className={styles.cardImage} />
                {isAuthenticated && (
                    <p className="text-sm mt-3 mb-0 text-gray-600">
                        Autor: {experience.user?.name ?? 'Desconocido'}
                    </p>
                )}

                <div className={styles.textCard}>
                    <h5 className={styles.cardTitle}> {experience.title} </h5>
                    <p className={styles.cardDescription}>
                        {experience.body}
                    </p>

                    <div className="mt-2 flex flex-row items-center gap-4 text-md">
                        <span className="inline-flex items-center gap-1 text-green-800"><FaRegThumbsUp /> {experience.positive_votes_count ?? 0}</span>
                        <span className="inline-flex items-center gap-1 text-red-600"><FaRegThumbsDown />{experience.negative_votes_count ?? 0}</span>
                    </div>
                </div>

            </Link >

            {/*Solo visible con session iniciada*/}
            {isAuthenticated && (
                <div className={styles.cardActions}>
                    {experience?.can?.update && (
                        <Link className={styles.editDeletebtnCard} href={route('experiences.edit', experience.id)}>Editar</Link>
                    )}
                    {experience?.can?.delete && (
                        <button
                            onClick={() => {
                                if (confirm('¿Estás seguro de que deseas eliminar esta experiencia?')) {
                                    router.delete(route('experiences.destroy', experience.id));
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