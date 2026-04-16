import { Head } from '@inertiajs/react';
import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';
import CardExperience from '@/Components/CardExperience/CardExperience.jsx';

export default function Welcome({ experiences }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Head title="Inici" />

            <Header />

            <main className="flex-grow">
                <div className="relative w-full h-[400px] bg-blue-900 group overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                        alt="Hero Destino Incierto"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                        <h2 className="text-5xl font-bold mb-4 drop-shadow-lg">Benvinguts a Destino Incierto</h2>
                        <p className="text-xl drop-shadow-md max-w-2xl">
                            Descobreix racons amagats, comparteix les teves rutes i inspira't amb la nostra comunitat de viatgers.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Últimes Experiències Publicades</h3>

                    {experiences && experiences.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {experiences.map(exp => (
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