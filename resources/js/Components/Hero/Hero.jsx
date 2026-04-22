import styles from './Hero.module.scss';

const withCloudinaryWidth = (url, width) => {
    if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
    return url.replace('/upload/', `/upload/q_auto,f_auto,w_${width}/`);
};

const buildSrcSet = (url, widths) => {
    if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return undefined;
    return widths.map((w) => `${withCloudinaryWidth(url, w)} ${w}w`).join(', ');
};

export default function Hero({ variant = 'guest', user = null, createExperienceUrl = '#', compactOverlay = false }) {
    // Hero amb imatge optimitzada: prioritat alta perquè és contingut above-the-fold.
    const heroBaseImage = 'https://res.cloudinary.com/dadhzxpnj/image/upload/v1774030117/heroPhoto_skug90.jpg';
    const heroSrc = withCloudinaryWidth(heroBaseImage, 1200) || heroBaseImage;
    const heroSrcSet = buildSrcSet(heroBaseImage, [400, 800, 1200, 1600]);

    return (
        <div className={styles.heroContainer}>
            <img
                srcSet={heroSrcSet}
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, (max-width: 1240px) 33vw, 1200px"
                src={heroSrc}
                alt="Imatge de viatge"
                width="1200"
                height="600"
                className={styles.heroImg}
                loading="eager"
                fetchpriority="high"
                decoding="async"
            />

            <div className={[styles.heroTextContainer, (compactOverlay || variant === 'guest') ? styles.heroTextContainerCompact : ''].join(' ')}>
                {user ? (
                    <>
                        <h1 className={styles.benvingutH1} >Benvingut, {user?.name || 'viatger/a'}!</h1>
                        <p className={styles.pgfUserLog}>Comparteix la teva propera aventura amb la comunitat.</p>
                        <a href={createExperienceUrl} className={styles.ctaButton}> Crear experiencia</a>
                    </>
                ) : (
                    <>
                        <h1 className={styles.benvingutH1} >Benvingut a Destino Incierto</h1>
                        <p className={styles.heroParagraf}>Descobreix experiències úniques i viatges extraordinaris.</p>
                    </>
                )}
            </div>
        </div>

    );
}