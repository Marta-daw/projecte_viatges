import React, { useState } from 'react'
import { Link, router } from '@inertiajs/react';
import styles from './DetailedCardExperience.module.scss';
import { toast } from 'sonner';
import { FaArrowLeft } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export default function DetailedCardExperience({
    experience,
    categories,
    votesCount: _votesCount,
    votedByUser,
    reported,
    isAutenticated,
    positiveVotes: positiveVotesProp,
    negativeVotes: negativeVotesProp,
    relatedExperiences = [],
}) {
    const [userVote, setUserVote] = useState(votedByUser);
    const [votesLoading, setVotesLoading] = useState(false);

    const [positiveVotes, setPositiveVotes] = useState(positiveVotesProp ?? 0);
    const [negativeVotes, setNegativeVotes] = useState(negativeVotesProp ?? 0);

    const [reportOpen, setReportOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reportLoading, setReportLoading] = useState(false);
    const [reportSent, setReportSent] = useState(false);

    const [error, setError] = useState(null);

    const categoriesText = (categories ?? [])
        .map((cat) => cat?.name)
        .filter(Boolean)
        .join(', ');

    const handleVote = (value) => {
        if (!isAutenticated) return setError('Cal iniciar sessió per votar aquesta experiència.');
        if (votesLoading) return;

        setVotesLoading(true);
        setError(null);

        const isSameVote = userVote === value;

        if (isSameVote) {
            router.delete(`/experiencia/vote/${experience.id}`, {
                preserveScroll: true,
                onSuccess: (response) => {
                    setPositiveVotes(response.props.positiveVotes);
                    setNegativeVotes(response.props.negativeVotes);
                    setUserVote(response.props.votedByUser);
                },
                onError: () => {
                    setError('Error al retirar el vot. Torna-ho a intentar.');
                },
                onFinish: () => setVotesLoading(false),
            });
            return;
        }

        router.post(`/experiencia/vote/${experience.id}`, { value }, {
            preserveScroll: true,
            onSuccess: (response) => {
                setPositiveVotes(response.props.positiveVotes);
                setNegativeVotes(response.props.negativeVotes);
                setUserVote(response.props.votedByUser);
            },
            onError: () => {
                toast.error('Error al registrar el vot. Torna-ho a intentar.');
                setError('Error al registrar el vot. Torna-ho a intentar.');
            },
            onFinish: () => setVotesLoading(false),
        })
    }

    const handleReport = () => {
        if (!isAutenticated) return setError('Cal iniciar sessió per reportar aquesta experiència.');
        if (reportLoading) return;

        setReportLoading(true);
        setError(null);

        router.post(`/experiencia/report/${experience.id}`,
            { reason: reportReason },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setReportSent(true);
                    setReportOpen(false);
                    setReportReason('');
                    toast.success('Experiència reportada correctament. Gràcies per ajudar a mantenir la comunitat! 🙏');
                },
                onError: (err) => {
                    const msg = err?.report || 'Error al enviar el report. Torna-ho a intentar.';
                    setError(msg);
                    toast.error(msg);
                },
                onFinish: () => setReportLoading(false),
            }
        );
    };

    return (
        <div className={styles.pageWrapper}>
            <article className={styles.cardExperience}>
                <div className={styles.topBar}>
                    <Link href={route('dashboard')} className={styles.saveButton} aria-label="Tornar al dashboard">
                        <FaArrowLeft />
                        <span>Tornar</span>
                    </Link>
                </div>

                <div className={styles.imageContainer}>
                    <img src={experience.image_url} alt="Imatge de l'experiència" className={styles.image} />
                </div>

                <div className={styles.contentBody}>
                    <div className={styles.metadata}>
                        <p className={styles.metaChip}>
                            <span className={styles.metaLabel}>Autor</span>
                            {experience.user?.id ? (
                                <Link href={route('users.public.show', experience.user.id)} className={styles.authorLink}>
                                    {experience.user.name}
                                </Link>
                            ) : (
                                'Usuari eliminat'
                            )}
                        </p>

                        <p className={styles.metaChip}>
                            <span className={styles.metaLabel}>Data</span>
                            {new Date(experience.created_at).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </p>

                        {categoriesText && (
                            <p className={styles.metaChip}>
                                <span className={styles.metaLabel}>Categories</span>
                                {categoriesText}
                            </p>
                        )}
                    </div>

                    <div className={styles.textContainer}>
                        <h2 className={styles.title}>{experience.title}</h2>
                        <div className={styles.description}>
                            <div className="prose prose-sm max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                                    {experience.body || ''}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <div className={styles.voteContainer}>
                        <div className={styles.votePanel}>
                            <span className={styles.voteLabel}>Valoració positiva</span>
                            <span className={styles.voteCount}>{positiveVotes} {positiveVotes === 1 ? 'vot positiu' : 'vots positius'}</span>
                            <button
                                className={`${styles.voteButton} ${userVote === 1 ? styles.active : ''}`}
                                onClick={() => handleVote(1)}
                                disabled={votesLoading}
                            >
                                {userVote == 1 ? 'Treure vot positiu' : 'Votar positiu'}
                            </button>
                        </div>

                        <div className={styles.votePanel}>
                            <span className={styles.voteLabel}>Valoració negativa</span>
                            <span className={styles.voteCount}>{negativeVotes} {negativeVotes === 1 ? 'vot negatiu' : 'vots negatius'}</span>
                            <button
                                className={`${styles.voteButtonNegative} ${userVote === -1 ? styles.active : ''}`}
                                onClick={() => handleVote(-1)}
                                disabled={votesLoading}
                            >
                                {userVote == -1 ? 'Treure vot negatiu' : 'Votar negatiu'}
                            </button>
                        </div>
                    </div>

                    <div className={styles.reportContainer}>
                        <button
                            className={styles.reportButton}
                            onClick={() => setReportOpen(true)}
                            disabled={reported || reportSent}
                        >
                            {reported || reportSent ? 'Report enviat' : 'Reportar un abús'}
                        </button>
                        {(reported || reportSent) && (
                            <p className={styles.reportedMessage}>Has reportat aquesta experiència.</p>
                        )}
                    </div>
                </div>
            </article>

            {relatedExperiences.length > 0 && (
                <section className={styles.relatedSection}>
                    <div className={styles.relatedHeader}>
                        <h3>Experiències relacionades</h3>
                        <p>Descobreix altres experiències similars recents.</p>
                    </div>

                    <div className={styles.relatedGrid}>
                        {relatedExperiences.map((related) => {
                            const relatedCategories = (related.categories ?? [])
                                .map((cat) => cat?.name)
                                .filter(Boolean)
                                .slice(0, 2)
                                .join(' · ');

                            return (
                                <Link
                                    key={related.id}
                                    href={route('experiences.show', related.id)}
                                    className={styles.relatedCard}
                                >
                                    <img
                                        src={related.image_url || '/images/placeholder.png'}
                                        alt={related.title}
                                        className={styles.relatedImage}
                                        loading="lazy"
                                    />
                                    <div className={styles.relatedContent}>
                                        <h4>{related.title}</h4>
                                        <p>{related.body?.slice(0, 115)}{related.body?.length > 115 ? '...' : ''}</p>
                                        <div className={styles.relatedMeta}>
                                            <span>{related.user?.name || 'Usuari anònim'}</span>
                                            {relatedCategories && <span>{relatedCategories}</span>}
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}

            {reportOpen && (
                <div className={styles.reportOverlay} onClick={() => !reportLoading && setReportOpen(false)}>
                    <div className={styles.reportModal} onClick={(e) => e.stopPropagation()}>
                        <h3>Reportar aquesta experiència</h3>
                        <textarea
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="Explica el motiu del report"
                            className={styles.reportTextarea}
                            rows={4}
                            maxLength={500}
                        />
                        <div className={styles.reportButtons}>
                            <button
                                className={styles.cancelButton}
                                onClick={() => setReportOpen(false)}
                                disabled={reportLoading}
                            >
                                Cancel·lar
                            </button>
                            <button
                                className={styles.submitButton}
                                onClick={handleReport}
                                disabled={reportLoading || reportReason.trim() === ''}
                            >
                                {reportLoading ? 'Enviant...' : 'Enviar report'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
