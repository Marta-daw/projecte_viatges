import React, { useState } from 'react'
import { Link, router } from '@inertiajs/react';
import styles from './DetailedCardExperience.module.scss';
import { toast } from 'sonner';
import { FaArrowLeft } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export default function DetailedCardExperience({ experience, categories, votesCount, votedByUser, reported, isAutenticated, positiveVotes: positiveVotesProp,
    negativeVotes: negativeVotesProp, }) {

    const [votes, setVotes] = useState(votesCount);
    const [userVote, setUserVote] = useState(votedByUser);
    const [votesLoading, setVotesLoading] = useState(false);

    const [positiveVotes, setPositiveVotes] = useState(positiveVotesProp ?? 0);
    const [negativeVotes, setNegativeVotes] = useState(negativeVotesProp ?? 0);

    const [reportOpen, setReportOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reportLoading, setReportLoading] = useState(false);
    const [reportSent, setReportSent] = useState(false);

    const [error, setError] = useState(null);

    // Crear string amb el nom de les categories separades per comes
    const categoriesText = (categories ?? [])
        .map((cat) => cat?.name)
        .filter(Boolean)
        .join(', ');

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
            onError: () => {
                toast.error('Error al registrar el vot. Torna-ho a intentar.');
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
                onSuccess: () => {
                    setReportSent(true);
                    setReportOpen(false);
                    setReportReason('');
                    toast.success('Experiència reportada correctament. Gràcies per ajudar a mantenir la comunitat! 🙏');
                },
                onError: (error) => {
                    const msg = error?.report || 'Error al enviar el report. Torna-ho a intentar.';
                    setError(msg);
                    toast.error(msg);
                },
                onFinish: () => setReportLoading(false),
            }
        );
    };

    return (
        <div className={styles.cardExperience}>
            <div className="flex justify-start w-full">
                <Link href={route('dashboard')} className={`px-4 py-2 rounded ${styles.saveButton}`}>
                    <FaArrowLeft />
                </Link>
            </div>
            <div className={styles.imageContainer}>
                <img src={experience.image_url} alt="ExperiencePhoto" className={styles.image} loading="eager" decoding="async" />
            </div>

            {/* Metadatos */}
            <div className={styles.metadata}>
                <p className={styles.author}>
                    Autor:{' '}
                    {experience.user?.id ? (
                        <Link href={route('users.public.show', experience.user.id)} className={styles.authorLink}>
                            {experience.user.name}
                        </Link>
                    ) : (
                        'Usuari Elimiant'
                    )}
                </p>
                <p className={styles.data}> {new Date(experience.created_at).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}</p>
                {categoriesText && (
                    <p className={`${styles.categories} `}>
                        Categories: {categoriesText}
                    </p>
                )}
            </div>

            {/* Titol i descripcio */}
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{experience.title}</h2>
                {/* <p className={styles.description}>{experience.body}</p> */}
                <div className={styles.description}>
                    <div className="prose prose-sm max-w-none">

                        <ReactMarkdown remarkPlugins={[remarkBreaks]} >
                            {experience.body || ''}
                        </ReactMarkdown>
                    </div>

                    {/*                     <ReactMarkdown remarkPlugins={[remarkBreaks]} >
                        {experience.body || ''}
                    </ReactMarkdown> */}
                </div>
            </div>

            {/* Vots  */}
            <div className={styles.voteContainer}>
                <div className={styles.positiveVote}>
                    <button className={`${styles.voteButton} ${userVote === 1 ? styles.active : ''}`}
                        onClick={() => handleVote(1)}
                        disabled={votesLoading}>
                        {userVote == 1 ? 'Treure vot positiu' : 'Vot positiu'}
                    </button>

                    <span className={styles.voteCount}>{positiveVotes} {positiveVotes === 1 ? 'vot positiu' : 'vots positius'}</span>
                </div>

                <div className={styles.negativeVote}>
                    <span className={styles.voteCount}>{negativeVotes} {negativeVotes === 1 ? 'vot negatiu' : 'vots negatius'}</span>
                    <button className={`${styles.voteButtonNegative} ${userVote === -1 ? styles.active : ''}`}
                        onClick={() => handleVote(-1)}
                        disabled={votesLoading}>
                        {userVote == -1 ? 'Treure vot negatiu' : 'Vot Negatiu'}
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
