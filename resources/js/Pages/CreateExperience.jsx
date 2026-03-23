import ExperienceForm from '@/Components/Experiences/ExperienceForm';
import GuestLayout from '@/Layouts/GuestLayout';
import React from 'react';

export default function CreateExperience({ experiencies }) {
    console.log(experiencies); // Para que puedas ver los datos en la consola del navegador
    return (
        <ExperienceForm />
    );
}

CreateExperience.layout = page => <GuestLayout children={page} />;
