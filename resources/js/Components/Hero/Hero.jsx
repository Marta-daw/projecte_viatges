import styles from './Hero.module.scss';

export default function Hero({ variant = 'guest', user = null, createExperienceUrl = '#' }) {
    return (
        <div className={styles.heroContainer}>
            <img srcSet="
                https://res.cloudinary.com/dadhzxpnj/image/upload/v1774030117/heroPhoto_skug90.jpg 400w,
                https://res.cloudinary.com/dadhzxpnj/image/upload/v1774030117/heroPhoto_skug90.jpg 800w,
                https://res.cloudinary.com/dadhzxpnj/image/upload/v1774030117/heroPhoto_skug90.jpg 1200w
            " sizes="
                (max-width: 600px) 100vw,
                (max-width: 1024px) 50vw,
                (max-width: 1240px) 33vw,
                400px
            " src="https://res.cloudinary.com/dadhzxpnj/image/upload/v1774030117/heroPhoto_skug90.jpg"
                alt="Imatge de viatge" width="1200" height="600" className={styles.heroImg} />


            <div className={styles.heroTextContainer}>
                {variant == 'auth' ? (
                    <>
                        <h1 className={styles.benvingutH1} >Benvingut, {user?.name || 'viatger/a'}!</h1>
                        <p className={styles.pgfUserLog}>Comparteix la teva propera aventura amb la comunitat.</p>
                        <a href={createExperienceUrl} className={styles.ctaButton}> Crear experiencia</a>
                    </>
                ) : (
                    <>
                        <h1 className={styles.benvingutH1} >Benvingut a Destino Incierto</h1>
                        <p className={styles.heroParagraf}>Descobreix experiències úniques i viatges inoblidables.</p>
                    </>
                )}
            </div>
        </div>

    );
}