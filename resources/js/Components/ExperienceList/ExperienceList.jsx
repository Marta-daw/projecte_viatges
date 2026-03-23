import styles from './ExperienceList.module.scss';
import CardExperience from '../CardExperience/CardExperience.jsx';

function ExperienceList({ experiences }) {
    const published = experiences.filter(e => e.status === 'publicada');
    const isCentered = published.length < 3;

    return (
        <div className={`${styles.grid} ${isCentered ? styles.centered : ''}`}>
            {published.map(exp => (
                <CardExperience key={exp.id} experience={exp} />
            ))}
        </div>
    );
}

export default ExperienceList;