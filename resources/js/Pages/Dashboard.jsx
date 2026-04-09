import { useState } from 'react';
import Hero from '@/Components/Hero/Hero';
import ExperienceList from '@/Components/ExperienceList/ExperienceList';
import styles from './Dashboard.module.scss';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import FiltreDropdown from '@/Components/Filtres/FiltreDropdown';
import FiltreBuscar from '@/Components/Filtres/FiltreBuscar';

export default function Dashboard({ llista = [], categories }) {
    const { auth } = usePage().props;
    const authUser = auth?.user;

    const [categoryId, setCategoryId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredExperiences = llista.filter(exp => {
        const matchesCategory = categoryId
            ? (exp.categories?.some(c => c.id === parseInt(categoryId)) || exp.category_id === parseInt(categoryId))
            : true;

        const matchesSearch = searchTerm
            ? (exp.title && exp.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (exp.body && exp.body.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;

        return matchesCategory && matchesSearch;
    });


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inicio / Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className={styles.dashboardContainer}>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <Hero variant="auth" user={authUser} createExperienceUrl={route('experiences.create')} />
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
                            <FiltreBuscar
                                value={searchTerm}
                                onChange={setSearchTerm}
                                onClear={() => setSearchTerm('')}
                            />
                            <FiltreDropdown
                                options={categories}
                                value={categoryId}
                                onChange={setCategoryId}
                                onClear={() => setCategoryId('')}
                            />
                        </div>
                        <ExperienceList experiences={filteredExperiences} />
                        {/* <div className="p-6 text-gray-900">
                            You're logged in!
                        </div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
