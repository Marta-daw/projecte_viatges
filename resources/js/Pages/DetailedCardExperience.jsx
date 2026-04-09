import React, { useState } from 'react'
import { router } from '@inertiajs/react';
import styles from './DetailedCardExperience.module.scss';

export default function DetailedCardExperience({ experience, categories, votesCount, votedByUser, reported, isAutenticated }) {
    const [votes, setVotes] = useState(votesCount);
    const [userVote, setUserVote] = useState(votedByUser);
    const [votesLoading, setVotesLoading] = useState(false);

    const [positiveVotes, setPositiveVotes] = useState(experience.positiveVotes);
    const [negativeVotes, setNegativeVotes] = useState(experience.negativeVotes);

    const [reportOpen, setReportOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reportLoading, setReportLoading] = useState(false);
    const [reportSent, setReportSent] = useState(false);

    const [error, setError] = useState(null);

    // Funció per gestionar el vot
    const handleVote = (value) => {
        if (!isAutenticated) return setError('Cal iniciar sessió per votar aquesta experiència.');
        if (votesLoading) return; // Evitar múltiples clics ràpids

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

        // Determinar el valor del vot: si l'usuari ja ha votat, el toggle eliminarà el vot, sinó, el toggle registrarà un vot positiu
        router.post(`/experiencia/vote/${experience.id}`, { value }, {
            preserveScroll: true,
            onSuccess: (response) => {
                setPositiveVotes(response.props.positiveVotes);
                setNegativeVotes(response.props.negativeVotes);
                setUserVote(response.props.votedByUser);
            },
            onError: (error) => {
                setError('Error al registrar el vot. Torna-ho a intentar.');
            },
            onFinish: () => setVotesLoading(false),
        })
    }

    // Funció per gestionar el report
    const handleReport = () => {
        if (!isAutenticated) return setError('Cal iniciar sessió per reportar aquesta experiència.');
        if (reportLoading) return; // Evitar múltiples clics ràpids

        setReportLoading(true);
        setError(null);

        router.post(`/experiencia/report/${experience.id}`,
            { reason: reportReason },
            {
                preserveScroll: true,
                onSuccess: (response) => {
                    setReportSent(true);
                    setReportOpen(false);
                    setReportReason('');
                },
                onError: (error) => {
                    if (error.report) {
                        setError(error.report);
                    } else {
                        setError('Error al enviar el report. Torna-ho a intentar.');
                    }
                },
                onFinish: () => setReportLoading(false),
            }
        );
    };

    return (
        <div className={styles.cardExperience}>
            <div className={styles.imageContainer}>
                <img src={experience.image_url} alt="Experience Image" className={styles.image} />
            </div>

            {/* Metadatos */}
            <div className={styles.metadata}>
                <p className={styles.author}>Autor: {experience.user?.name ?? 'Usuari Elimiant'}</p>
                <p className={styles.data}> {new Date(experience.created_at).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}</p>
                {experience.categories?.length > 0 && (
                    <div className={styles.categories}>
                        {experience.categories.map(cat => (
                            <span key={cat.id} className={styles.category}>
                                Categoria: {cat.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Titol i descripcio */}
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{experience.title}</h2>
                <p className={styles.description}>{experience.body}</p>
            </div>

            {/* Vots  */}
            <div className={styles.voteContainer}>
                <div className={styles.positiveVote}>
                    <button className={`${styles.voteButton} ${userVote === 1 ? styles.active : ''}`}
                        onClick={() => handleVote(1)}
                        disabled={votesLoading}>
                        {userVote ? 'Has votat positiu' : 'Votar positiu'}
                    </button>
                    <span className={styles.voteCount}>{positiveVotes} {positiveVotes === 1 ? 'vot positiu' : 'vots positius'}</span>
                </div>
                <div className={styles.negativeVote}>
                    <span className={styles.voteCount}>{negativeVotes} {negativeVotes === 1 ? 'vot negatiu' : 'vots negatius'}</span>
                    <button className={`${styles.voteButtonNegative} ${userVote === -1 ? styles.active : ''}`}
                        onClick={() => handleVote(-1)}
                        disabled={votesLoading}>
                        {userVote ? 'Has votat negatiu' : 'Votar Negatiu'}
                    </button>

                </div>
            </div>

            {/* Report */}
            <div className={styles.reportContainer}>
                <button
                    className={styles.reportButton}
                    onClick={() => setReportOpen(true)}
                >
                    Reportar un abús
                </button>
                {reportOpen && (
                    <div className={styles.reportModal}>
                        <h3>Reportar aquesta experiència</h3>
                        <textarea
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="Explica el motiu del report"
                            className={styles.reportTextarea}
                            row={3}
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
                                Enviar Report
                            </button>
                        </div>
                    </div>
                )}
                {reported && <p className={styles.reportedMessage}>Has reportat aquesta experiència.</p>}
            </div>

        </div>

    )
}
