import { useState } from 'react';
import Hero from '@/Components/Hero/Hero';
import ExperienceList from '@/Components/ExperienceList/ExperienceList';
import styles from './Dashboard.module.scss';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import FiltreDropdown from '@/Components/Filtres/FiltreDropdown';
import FiltreBuscar from '@/Components/Filtres/FiltreBuscar';

const opcionsOrdenar = [
    { id: 'mes_nou', name: 'Més nou' },
    { id: 'mes_antic', name: 'Més antic' },
    { id: 'millor_valoracio', name: 'Millor valoració' },
    { id: 'a_z', name: 'A - Z ↓' },
    { id: 'z_a', name: 'Z - A ↑' },
];

export default function Dashboard({ llista, categories }) {
    const { auth } = usePage().props;
    const authUser = auth?.user;

    const [categoryId, setCategoryId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    const filteredExperiences = llista.filter(exp => {
        const matchesCategory = categoryId
            ? (
                // Comparem com a string per evitar mismatch de tipus
                exp.categories?.some(c => String(c.id) === String(categoryId)) ||
                String(exp.category_id) === String(categoryId)
            )
            : true;

        const matchesSearch = searchTerm
            ? (exp.title && exp.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (exp.body && exp.body.toLowerCase().includes(searchTerm.toLowerCase()))
            : true;

        return matchesCategory && matchesSearch;
    });

    const sortedExperiences = [...filteredExperiences].sort((a, b) => {
        if (!sortOption) return 0;

        switch (sortOption) {
            case 'mes_nou':
                return new Date(b.created_at) - new Date(a.created_at);
            case 'mes_antic':
                return new Date(a.created_at) - new Date(b.created_at);
            case 'millor_valoracio':
                return (b.rating || 0) - (a.rating || 0);
            case 'a_z':
                return (a.title || '').localeCompare(b.title || '');
            case 'z_a':
                return (b.title || '').localeCompare(a.title || '');
            default:
                return 0;
        }
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
            <Hero variant="auth" user={authUser} createExperienceUrl={route('experiences.create')} />
            <div className={styles.dashboardContainer}>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">

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
                                label="Categories"
                            />
                            <FiltreDropdown
                                options={opcionsOrdenar}
                                value={sortOption}
                                onChange={setSortOption}
                                onClear={() => setSortOption('')}
                                label="Ordenar per"
                            />
                        </div>
                        <ExperienceList experiences={sortedExperiences} />
                        {/* <div className="p-6 text-gray-900">
                            You're logged in!
                        </div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
