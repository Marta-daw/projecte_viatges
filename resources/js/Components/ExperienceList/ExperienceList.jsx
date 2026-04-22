import styles from './ExperienceList.module.scss';
import CardExperience from '../CardExperience/CardExperience.jsx';
import { usePage } from '@inertiajs/react';

function ExperienceList({ experiences, showActions = true }) {
    // Mostrem només publicades en aquest llistat comunitari.
    const published = experiences.filter(e => e.status === 'publicada');
    const isCentered = published.length < 3;

    const { auth } = usePage().props;
    // El to del títol i accions canvia segons autenticació.
    const isAuthenticated = !!auth?.user;

    return (
        <>
            <h1 className={styles.homeViatgesH1}>
                {isAuthenticated ? 'Descobreix les experiències de la comunitat' : 'Experiències més recents'}
            </h1>
            <div className={styles.container}>
                <div className={`${styles.grid} ${isCentered ? styles.centered : ''}`}>
                    {published.map(exp => (
                        <CardExperience key={exp.id} experience={exp} isAuthenticated={isAuthenticated} showActions={showActions} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default ExperienceList;