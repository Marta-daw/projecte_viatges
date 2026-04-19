import CardExperience from '@/Components/CardExperience/CardExperience';
import React from 'react'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.jsx';
import styles from './ManageExperience.module.scss';
import { usePage } from '@inertiajs/react';

export default function ManageExperience() {
    const { experiencies = [], isAuthenticated } = usePage().props;

    return (
        <section className={styles.pageSection}>
            <div className={styles.manageContainer}>
                <div className={styles.sectionHeader}>
                    <div>
                        <h1 className={styles.sectionTitle}>Les meves experiències</h1>
                        <p className={styles.sectionSubtitle}>Gestiona, revisa i edita les teves publicacions en un sol lloc.</p>
                    </div>
                    <span className={styles.counterBadge}>
                        {experiencies.length} {experiencies.length === 1 ? 'experiència' : 'experiències'}
                    </span>
                </div>

                {experiencies.length > 0 ? (
                    <div className={styles.manageGrid}>
                        {experiencies.map(exp => (
                            <div key={exp.id} className={styles.gridItem}>
                                <CardExperience experience={exp} isAuthenticated={isAuthenticated} showActions compact />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <h2>Encara no tens experiències</h2>
                        <p>Quan en creïs una, apareixerà aquí per poder gestionar-la fàcilment.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

ManageExperience.layout = page => <AuthenticatedLayout header="Les meves experiències" children={page} />;