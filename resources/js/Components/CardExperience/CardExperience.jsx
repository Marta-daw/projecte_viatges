import styles from './CardExperience.module.scss';
import { Link, router } from '@inertiajs/react';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
const withCloudinaryWidth = (url, width) => {
    // Si la imatge és de Cloudinary, injectem transformacions de qualitat/format/mida.
    if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
    return url.replace('/upload/', `/upload/q_auto,f_auto,w_${width}/`);
};

const buildSrcSet = (url, widths) => {
    // Construïm variants responsives perquè el navegador triï la mida òptima.
    if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return undefined;
    return widths.map((w) => `${withCloudinaryWidth(url, w)} ${w}w`).join(', ');
};

function CardExperience({ experience, isAuthenticated, showActions = true, compact = false }) {
    // Fallback visual si falta imatge; mantenim la targeta robusta.
    const baseImage = experience.image_url || '/images/placeholder.png';
    const imageSrc = withCloudinaryWidth(baseImage, 760) || baseImage;
    const imageSrcSet = buildSrcSet(baseImage, [360, 560, 760]);

    return (
        <div className={`${styles.card} ${compact ? styles.compact : ''}`}>
            <Link href={`/experiencia/${experience.id}`}>
                <img
                    src={imageSrc}
                    srcSet={imageSrcSet}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
                    alt="experienceIMG"
                    width="760"
                    height="428"
                    className={`w-full h-48 object-cover rounded-t-lg ${styles.image}`}
                    loading="lazy"
                    decoding="async"
                />
            </Link>

            <div className="p-4 flex flex-col gap-2">
                <div className={styles.cardMeta}>
                    <span className="text-sm text-gray-500">Autor: </span>
                    {experience?.user?.id ? (
                        <Link href={route('users.public.show', experience.user.id)} className={styles.authorLink}>
                            {experience.user.name}
                        </Link>
                    ) : (
                        <span className="text-sm text-gray-500 italic">Usuari eliminat</span>
                    )}
                </div>

                <Link href={`/experiencia/${experience.id}`} className="block hover:no-underline">
                    <div className={styles.textCard}>
                        <h5 className={styles.cardTitle}> {experience.title} </h5>
                        <div className={styles.cardDescription}>
                            <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                {experience.body || ''}
                            </ReactMarkdown>
                        </div>
                    </div>
                </Link>

                <div className="mt-2 flex flex-row items-center gap-4 text-md ml-5">
                    <span className="inline-flex items-center gap-1 text-green-800">
                        <FaRegThumbsUp /> {experience.positive_votes_count ?? 0}
                    </span>
                    <span className="inline-flex items-center gap-1 text-red-600">
                        <FaRegThumbsDown /> {experience.negative_votes_count ?? 0}
                    </span>
                </div>
            </div>

            {isAuthenticated && showActions && (
                <div className={`mt-auto ${styles.cardActions}`}>
                    {experience?.can?.update && (
                        <Link className={styles.editDeletebtnCard} href={route('experiences.edit', experience.id)}>Editar</Link>
                    )}
                    {experience?.can?.delete && (
                        <button
                            onClick={() => {
                                if (confirm('Estàs segur que vols eliminar aquesta experiència? Aquesta acció no es pot desfer.')) {
                                    router.delete(route('experiences.destroy', experience.id));
                                }
                            }} className={styles.editDeletebtnCard}>
                            Eliminar
                        </button>
                    )}
                </div>
            )
            }
        </div >
    );
}

CardExperience.propTypes = {
    experience: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        image_url: PropTypes.string,
        user: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        positive_votes_count: PropTypes.number,
        negative_votes_count: PropTypes.number,
        can: PropTypes.shape({
            update: PropTypes.bool,
            delete: PropTypes.bool,
        }),
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    compact: PropTypes.bool,
};

export default CardExperience;