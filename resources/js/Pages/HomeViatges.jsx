import { Head } from '@inertiajs/react';
import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';
import CardExperience from '@/Components/CardExperience/CardExperience.jsx';
import Hero from '@/Components/Hero/Hero.jsx';

export default function HomeViatges({ llista }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50" style={{ backgroundColor: 'var(--ivory-beige)' }}>
            <Head title="Inici" />

            <Header />

            <main className="flex-grow">

                <Hero />

                <div className="max-w-7xl mx-auto px-4 py-12">
                    <h3 className="text-3xl font-bold mb-8 text-center">Últimes Experiències Publicades</h3>

                    {llista && llista.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {llista.map(exp => (
                                <CardExperience
                                    key={exp.id}
                                    experience={exp}
                                    isAuthenticated={false}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">Encara no hi ha experiències publicades.</p>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}