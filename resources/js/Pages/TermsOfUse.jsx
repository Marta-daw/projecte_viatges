import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Header from "@/Components/Header/Header.jsx";
import Footer from "@/Components/Footer/Footer";

export default function TermsOfUse() {
    return (
        <>
            <Head title="Condicions d'Ús" />
            <section
                className="min-h-screen"
                style={{
                    background: 'var(--ivory-beige)',
                }}
            >
                <div className="max-w-5xl mx-auto px-4 py-12 text-justify" style={{ color: 'var(--brown-compass)' }}>
                    <h1 className="text-3xl font-bold mb-6 text-center">Condicions d'Ús</h1>

                    <p className="mb-4">
                        Aquestes condicions regulen l'accés i l'ús de la plataforma <span className="font-bold">Destino Incierto</span>,
                        un projecte acadèmic desenvolupat en el marc del cicle formatiu de Desenvolupament d'Aplicacions Web (DAW).
                        En utilitzar la plataforma, acceptes complir aquestes condicions.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">1. Acceptació de les condicions</h2>
                    <p className="mb-4">
                        L'accés i ús de la plataforma implica l'acceptació plena d'aquestes condicions. Si no hi estàs d'acord,
                        et recomanem no utilitzar el servei.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">2. Ús responsable de la comunitat</h2>
                    <p className="mb-4">
                        Els usuaris es comprometen a publicar contingut respectuós, rellevant i no ofensiu. Es prohibeix compartir
                        contingut il·legal, violent, discriminatori o que vulneri drets de tercers.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">3. Contingut publicat pels usuaris</h2>
                    <p className="mb-4">
                        Cada usuari és responsable del contingut que publica. La plataforma es reserva el dret d'editar, ocultar o
                        eliminar publicacions que incompleixin aquestes condicions o la normativa aplicable.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">4. Moderació i mesures sobre el compte</h2>
                    <p className="mb-4">
                        Per preservar la convivència de la comunitat, la plataforma pot revisar reports i aplicar mesures de moderació,
                        incloent-hi la despublicació de contingut o la restricció temporal/permanent del compte en casos d'incompliment greu o reiterat.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">5. Limitació de responsabilitat</h2>
                    <p className="mb-4">
                        La plataforma s'ofereix "tal com està" i no garanteix disponibilitat contínua ni absència total d'errors.
                        No ens fem responsables dels danys derivats de l'ús del servei o de contingut publicat per tercers.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">6. Propietat del contingut</h2>
                    <p className="mb-4">
                        El contingut publicat continua sent responsabilitat de l'usuari autor. En publicar-lo, autoritzes la seva
                        visualització dins la plataforma per al funcionament normal del servei i la interacció amb la comunitat.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">7. Canvis en les condicions</h2>
                    <p className="mb-4">
                        Aquestes condicions es poden actualitzar periòdicament. Les modificacions entraran en vigor des de la seva
                        publicació en aquesta mateixa pàgina.
                    </p>

                    <h2 className="text-2xl font-semibold mb-1">8. Contacte</h2>
                    <p className="mb-4">
                        Si tens dubtes sobre aquestes condicions d'ús, pots contactar-nos a:
                        <a href="mailto:hola@destinoincierto.com" className="hover:text-blue-600 flex items-center gap-2 mt-5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            hola@destinoincierto.cat
                        </a>
                    </p>

                    <p className="text-gray-600 mt-8" style={{ fontStyle: 'italic' }}>
                        Condicions revisades i actualitzades a abril de 2026.
                    </p>
                </div>
            </section>
        </>
    );
}

function TermsOfUseLayout({ page }) {
    const { auth } = usePage().props;

    const header = (
        <h2 className="text-xl font-semibold leading-tight" style={{ color: 'var(--brown-compass)' }}>
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
        <div className="min-h-screen" style={{ background: 'var(--ivory-beige)' }}>
            <Header />
            {page}
            <Footer />
        </div>
    );
}

TermsOfUse.layout = (page) => {
    return <TermsOfUseLayout page={page} />;
};
