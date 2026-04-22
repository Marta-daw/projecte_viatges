import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import Header from "@/Components/Header/Header.jsx";
import Footer from "@/Components/Footer/Footer";

export default function TermsOfUse() {
    return (
        <>
            <Head title="Condicions d'Ús" />
            <main className="flex-grow px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
                <section className="mx-auto w-full max-w-5xl rounded-2xl border p-6 sm:p-10 
                                  bg-white/80 dark:bg-[#1e1e1b] 
                                  border-blue-900/10 dark:border-zinc-800 
                                  shadow-[0_16px_34px_rgba(61,32,16,0.1)] dark:shadow-none 
                                  text-justify transition-colors duration-300">

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <h1 className="text-3xl font-bold" style={{ color: 'var(--brown-compass)' }}>
                            Condicions d'Ús
                        </h1>
                        <Link
                            href={route('HomeViatges')}
                            className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition
                                     text-[#2D4A6B] dark:text-blue-400 
                                     border-[#2D4A6B]/25 dark:border-blue-500/30 
                                     bg-[#2D4A6B]/5 dark:bg-blue-500/10
                                     hover:bg-[#2D4A6B]/10 dark:hover:bg-blue-500/20"
                        >
                            Tornar a l'inici
                        </Link>
                    </div>

                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Aquestes condicions regulen l'accés i l'ús de la plataforma <span className="font-bold">Destino Incierto</span>,
                        un projecte acadèmic desenvolupat en el marc del cicle formatiu de Desenvolupament d'Aplicacions Web (DAW).
                        En utilitzar la plataforma, acceptes complir aquestes condicions.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1" style={{ color: 'var(--brown-compass)' }}>1. Acceptació de les condicions</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        L'accés i ús de la plataforma implica l'acceptació plena d'aquestes condicions. Si no hi estàs d'acord,
                        et recomanem no utilitzar el servei.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1" style={{ color: 'var(--brown-compass)' }}>2. Ús responsable de la comunitat</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Els usuaris es comprometen a publicar contingut respectuós, rellevant i no ofensiu. Es prohibeix compartir
                        contingut il·legal, violent, discriminatori o que vulneri drets de tercers.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1" style={{ color: 'var(--brown-compass)' }}>3. Contingut publicat pels usuaris</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Cada usuari és responsable del contingut que publica. La plataforma es reserva el dret d'editar, ocultar o
                        eliminar publicacions que incompleixin aquestes condicions o la normativa aplicable.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1" style={{ color: 'var(--brown-compass)' }}>4. Moderació i mesures sobre el compte</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Per preservar la convivència de la comunitat, la plataforma pot revisar reports i aplicar mesures de moderació,
                        incloent-hi la despublicació de contingut o la restricció temporal/permanent del compte en casos d'incompliment greu o reiterat.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1" style={{ color: 'var(--brown-compass)' }}>5. Limitació de responsabilitat</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        La plataforma s'ofereix "tal com està" i no garanteix disponibilitat contínua ni absència total d'errors.
                        No ens fem responsables dels danys derivats de l'ús del servei o de contingut publicat per tercers.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1" style={{ color: 'var(--brown-compass)' }}>6. Propietat del contingut</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        El contingut publicat continua sent responsabilitat de l'usuari autor. En publicar-lo, autoritzes la seva
                        visualització dins la plataforma per al funcionament normal del servei i la interacció amb la comunitat.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1" style={{ color: 'var(--brown-compass)' }}>7. Canvis en les condicions</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Aquestes condicions es poden actualitzar periòdicament. Les modificacions entraran en vigor des de la seva
                        publicació en aquesta mateixa pàgina.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1" style={{ color: 'var(--brown-compass)' }}>8. Contacte</h2>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                        Si tens dubtes sobre aquestes condicions d'ús, pots contactar-nos a:
                        <a href="mailto:hola@destinoincierto.cat" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 mt-5 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            hola@destinoincierto.cat
                        </a>
                    </p>

                    <p className="text-gray-500 dark:text-gray-500 mt-8" style={{ fontStyle: 'italic' }}>
                        Condicions revisades i actualitzades a abril de 2026.
                    </p>
                </section>
            </main>
        </>
    );
}

function TermsOfUseLayout({ page }) {
    const { auth } = usePage().props;

    const header = (
        <h2 className="text-xl font-semibold leading-tight dark:text-gray-200" style={{ color: 'var(--brown-compass)' }}>
            Condicions d'Ús
        </h2>
    );

    if (auth.user) {
        return (
            <AuthenticatedLayout
                header={header}
                children={page}
            />
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-transparent transition-colors duration-300 dark:bg-[#121210]" style={{ backgroundColor: 'var(--ivory-beige)' }}>
            <Header />
            {page}
            <Footer />
        </div>
    );
}

TermsOfUse.layout = (page) => {
    return <TermsOfUseLayout page={page} />;
};