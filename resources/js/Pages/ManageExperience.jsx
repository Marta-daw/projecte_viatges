import CardExperience from '@/Components/CardExperience/CardExperience';
import React from 'react'
import { usePage } from '@inertiajs/react';

export default function ManageExperience() {
    const { experiencies = [] } = usePage().props;

    return (
        <div>
            {experiencies && experiencies.map(exp => (
                <CardExperience experience={exp} />
            ))}
        </div>
    )
}
