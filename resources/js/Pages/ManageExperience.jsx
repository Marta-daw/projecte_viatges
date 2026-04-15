import CardExperience from '@/Components/CardExperience/CardExperience';
import React from 'react'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.jsx';
import styles from './ManageExperience.module.scss';
import { usePage } from '@inertiajs/react';

export default function ManageExperience() {
    const { experiencies = [], isAuthenticated } = usePage().props;

    return (
        <div className={styles.manageBody}>
            {experiencies && experiencies.map(exp => (
                <CardExperience key={exp.id} experience={exp} isAuthenticated={isAuthenticated} showActions />
            ))}
        </div>
    )
}

ManageExperience.layout = page => <AuthenticatedLayout header="Les meves experiències" children={page} />;