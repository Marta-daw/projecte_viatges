import CardExperience from '@/Components/CardExperience/CardExperience';
import React from 'react'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.jsx';
import styles from './ManageExperience.module.scss';
import { usePage } from '@inertiajs/react';

export default function ManageExperience() {
    const { experiencies = [], isAuthenticated } = usePage().props;

    return (
        <div className={styles.manageBody}>
            <div className='container mx-auto px-4 py-8 flex flex-col items-center'>
                <div className="flex flex-col gap-6 mt-6">
                    {experiencies && experiencies.map(exp => (
                        <CardExperience key={exp.id} experience={exp} isAuthenticated={isAuthenticated} />
                    ))}
                </div>
            </div>
        </div>
    )
}

ManageExperience.layout = page => <AuthenticatedLayout header="Les meves experiències" children={page} />;