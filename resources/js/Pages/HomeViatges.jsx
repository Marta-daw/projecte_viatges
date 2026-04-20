import { Head } from '@inertiajs/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';
import CardExperience from '@/Components/CardExperience/CardExperience.jsx';
import Hero from '@/Components/Hero/Hero.jsx';

export default function HomeViatges({ llista = [], pagination = {} }) {
    const [experiences, setExperiences] = useState(llista);
    const [currentPage, setCurrentPage] = useState(pagination?.current_page ?? 1);
    const [hasMore, setHasMore] = useState(Boolean(pagination?.has_more_pages));
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);

    const perPage = useMemo(() => pagination?.per_page ?? 6, [pagination?.per_page]);

    useEffect(() => {
        setExperiences(llista ?? []);
        setCurrentPage(pagination?.current_page ?? 1);
        setHasMore(Boolean(pagination?.has_more_pages));
    }, [llista, pagination?.current_page, pagination?.has_more_pages]);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;

        const nextPage = currentPage + 1;
        setIsLoading(true);

        try {
            const url = `${route('experiences.loadMore')}?page=${nextPage}&per_page=${perPage}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (!response.ok) throw new Error('Error carregant més experiències');

            const data = await response.json();
            const incoming = data?.data ?? [];

            setExperiences((prev) => {
                const existingIds = new Set(prev.map((item) => item.id));
                const uniqueIncoming = incoming.filter((item) => !existingIds.has(item.id));
                return [...prev, ...uniqueIncoming];
            });

            setCurrentPage(data?.current_page ?? nextPage);
            setHasMore(Boolean(data?.has_more_pages));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, hasMore, isLoading, perPage]);

    useEffect(() => {
        if (!loaderRef.current || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry?.isIntersecting) {
                    loadMore();
                }
            },
            {
                root: null,
                rootMargin: '280px',
                threshold: 0,
            },
        );

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loadMore, hasMore]);

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--ivory-beige)' }}>
            <Head title="Inici" />

            <Header />

            <main className="flex-grow">
                <Hero />

                <div className="max-w-7xl mx-auto px-4 py-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Últimes Experiències Publicades</h3>

                    {experiences.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {experiences.map((exp) => (
                                    <CardExperience
                                        key={exp.id}
                                        experience={exp}
                                        isAuthenticated={false}
                                    />
                                ))}
                            </div>

                            <div ref={loaderRef} className="mt-8 flex justify-center min-h-10">
                                {isLoading && (
                                    <p className="text-sm" style={{ color: 'var(--earth-grey)' }}>
                                        Carregant més experiències...
                                    </p>
                                )}
                                {!hasMore && !isLoading && (
                                    <p className="text-xs" style={{ color: 'var(--earth-grey)' }}>
                                        Ja has arribat al final.
                                    </p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Encara no hi ha experiències publicades.</p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
