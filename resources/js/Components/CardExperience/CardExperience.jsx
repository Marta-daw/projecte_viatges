import styles from './CardExperience.module.scss';
import { Card } from "flowbite-react";

function CardExperience({ experience, isAutenticated }) {
    return (
        <div className={styles.cardBody}>
            <Card className={styles.card}>
                <img src={experience.image_url} alt="experienceIMG" className={styles.cardImage} />
                <div className={styles.textCard}>
                    <h5 className={styles.cardTitle}> {experience.title} </h5>
                    <p className={styles.cardDescription}>
                        {experience.body}
                    </p>
                </div>

                {/*Solo visible con session iniciada*/}
                {isAutenticated && (
                    <div className={styles.cardActions}>
                        <button onClick={() => console.log('editar')}>✏️ Editar</button>
                        <button onClick={() => console.log('eliminar')}>🗑️ Eliminar</button>
                        <button onClick={() => console.log('favorito')}>❤️ Favorito</button>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default CardExperience;