import { useEffect, useRef, useState } from 'react';
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
    // Usuari autenticat per personalitzar el Hero i accions del dashboard.
    const { auth } = usePage().props;
    const authUser = auth?.user;

    const [categoryId, setCategoryId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    // Nous estats i ref per a quès es faci el Lazy loading
    const INITIAL_VISIBLE = 6;
    const STEP_VISIBLE = 6;
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const loadMoreRef = useRef(null);
    const isLoadingRef = useRef(false); // Evita disparaments múltiples ràpids

    const filteredExperiences = llista.filter(exp => {
        // Filtre combinat: categoria + text lliure.
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
        // Ordenació client-side per resposta immediata de la UI.
        if (!sortOption) return 0;

        switch (sortOption) {
            case 'mes_nou':
                return new Date(b.created_at) - new Date(a.created_at);
            case 'mes_antic':
                return new Date(a.created_at) - new Date(b.created_at);
            case 'millor_valoracio':
                //return (b.rating || 0) - (a.rating || 0);

                // Adaptació del filtre per adaptar-lo als vots actuals
                const scoreA = (a.positive_votes_count ?? 0) - (a.negative_votes_count ?? 0);
                const scoreB = (b.positive_votes_count ?? 0) - (b.negative_votes_count ?? 0);
                // Desempat: mes recent primer
                if (scoreB !== scoreA) return scoreB - scoreA;
                return new Date(b.created_at) - new Date(a.created_at);
            case 'a_z':
                return (a.title || '').localeCompare(b.title || '');
            case 'z_a':
                return (b.title || '').localeCompare(a.title || '');
            default:
                return 0;
        }
    });

    // Derivats de llista per a fer el Lazy Loading
    // Mostrem trams de resultats per millorar rendiment i percepció de fluïdesa.
    const visibleExperiences = sortedExperiences.slice(0, visibleCount);
    const canLoadMore = visibleCount < sortedExperiences.length;

    // Reset quan canvien filtres o cerca, i setup de l'observer per al Lazy Loading
    useEffect(() => {
        setVisibleCount(INITIAL_VISIBLE);
    }, [categoryId, searchTerm, sortOption]);

    // Intersection Observer pel lazy load automàtic
    useEffect(() => {
        if (!canLoadMore) return;
        const target = loadMoreRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting && !isLoadingRef.current) {
                    isLoadingRef.current = true;
                    setVisibleCount(prev => {
                        isLoadingRef.current = false;
                        return prev + STEP_VISIBLE;
                    });
                }
            },
            {
                root: null,
                rootMargin: '180px 0px',
                threshold: 0,
            }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [canLoadMore, sortedExperiences.length]); // <-- afegit sortedExperiences.length

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inicio / Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <Hero user={authUser} createExperienceUrl={route('experiencies.create')} />
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
                        <ExperienceList experiences={visibleExperiences} showActions={false} />
                        {canLoadMore && (
                            <div className="flex justify-center py-6 gap-4 items-center">
                                {/* Sentinel invisible: dispara el lazy loading automàtic */}
                                <div
                                    ref={loadMoreRef}
                                    aria-hidden="true"
                                    className="h-6 w-6 animate-pulse rounded-full bg-stone-300"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
