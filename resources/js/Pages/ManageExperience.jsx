import CardExperience from '@/Components/CardExperience/CardExperience';
import React from 'react'
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.jsx';
import styles from './ManageExperience.module.scss';
import { usePage } from '@inertiajs/react';

export default function ManageExperience() {
    const { experiencies = [], isAuthenticated } = usePage().props;

    return (
        <section
            className="min-h-screen"
            style={{
                background: 'var(--ivory-beige)',
            }}
        >
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <section className="mt-8">
                    {experiencies.length === 0 ? (
                        <div
                            className="rounded-2xl border p-8 text-center"
                            style={{
                                borderColor: 'var(--warm-sand-darker)',
                                backgroundColor: 'rgba(237, 228, 211, 0.45)',
                            }}
                        >
                            <h2
                                className="text-xl font-semibold"
                                style={{ color: 'var(--brown-compass)' }}
                            >
                                Encara no tens cap experiència creada
                            </h2>
                            <p className="mt-2" style={{ color: 'var(--earth-grey)' }}>
                                Comença a crear les teves rutes i aventures!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {experiencies.map((exp) => (
                                <CardExperience
                                    key={exp.id}
                                    experience={exp}
                                    isAuthenticated={isAuthenticated}
                                    showActions
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </section>

    );
}

ManageExperience.layout = (page) => (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight" style={{ color: 'var(--brown-compass)' }}>
                Les meves experiències
            </h2>
        }
        children={page}
    />
);