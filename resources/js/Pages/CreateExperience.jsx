import ExperienceForm from '@/Components/Experiences/ExperienceForm';
import GuestLayout from '@/Layouts/GuestLayout';
import React from 'react';

export default function CreateExperience({ experiencies, categoria, isEdit }) {
    console.log(experiencies); // Para que puedas ver los datos en la consola del navegador
    return (
        <ExperienceForm experiencie={experiencies} categoria={categoria} isEdit={isEdit} />
    );
}

CreateExperience.layout = page => <GuestLayout children={page} />;
