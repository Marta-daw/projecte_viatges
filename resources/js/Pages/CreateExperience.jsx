import ExperienceForm from '@/Components/Experiences/ExperienceForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';

export default function CreateExperience({ experiencies, categoria, isEdit }) {
    console.log(experiencies); // Per a poder veure les dades a la consola del navegador
    return (
        <ExperienceForm experiencie={experiencies} categoria={categoria} isEdit={isEdit} />
    );
}

CreateExperience.layout = (page) => {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight" style={{ color: 'var(--brown-compass)' }}>
                    Nova Experiència
                </h2>
            }
        >
            <div className="py-3" style={{ backgroundColor: 'var(--ivory-beige)' }}>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {page}
                </div>
            </div>
        </AuthenticatedLayout>
    )
};
