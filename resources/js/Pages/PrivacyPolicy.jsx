import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import Header from "@/Components/Header/Header.jsx";
import Footer from "@/Components/Footer/Footer";

export default function PrivacyPolicy() {
    return (
        <section
            className="min-h-screen"
            style={{
                background: 'var(--ivory-beige)',
            }}
        >
            <div className="max-w-5xl mx-auto px-4 py-12 text-justify" style={{ color: 'var(--brown-compass)' }}>
                <h1 className="text-3xl font-bold mb-6 text-center">Política de Privacitat</h1>
                <p className="mb-4">
                    <span className="font-bold">Destino Incierto</span> és un projecte acadèmic desenvolupat en el marc del cicle formatiu de Desenvolupament d'Aplicacions Web (DAW). A través d'aquesta política t'informem, de manera transparent, com tractem les dades personals que ens facilites en utilitzar la plataforma.
                </p>
                <h2 className="text-2xl font-semibold mb-1">1. Responsable del tractament</h2>
                <p className="mb-4">
                    El responsable del tractament de les dades és l'equip desenvolupador del projecte acadèmic Destino Incierto, realitzat com a projecte de pràctiques. Per a qualsevol consulta relacionada amb la privacitat de les teves dades, pots contactar-nos a través de la següent adreça de
                    correu electrònic:
                    <a href="mailto:hola@destinoincierto.com" className="hover:text-blue-600 flex items-center gap-2 mt-5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        hola@destinoincierto.cat
                    </a>
                </p>
                <h2 className="text-2xl font-semibold mb-1">2. Quines dades recollim?</h2>
                <p className="mb-4">
                    En registrar-te a la plataforma, recollim les dades necessàries per crear i gestionar el teu compte: nom d'usuari, adreça de correu electrònic i contrasenya. A més, quan publiques una experiència, tractem la informació que tu mateix proporcioneu voluntàriament, com el títol, la descripció, les imatges adjuntes i la localització geogràfica associada.
                </p>
                <h2 className="text-2xl font-semibold mb-1">3. Per a què les utilitzem?</h2>
                <p className="mb-4">
                    Les dades recollides s'utilitzen exclusivament per gestionar el teu compte d'usuari, permetre la publicació i visualització d'experiències a la plataforma i garantir el correcte funcionament del servei. No es realitza cap tractament amb finalitats comercials ni es cedeixen les dades a tercers en cap cas.
                </p>
                <h2 className="text-2xl font-semibold mb-1">4. Quant de temps les conservem?</h2>
                <p className="mb-4">
                    Les teves dades es conserven durant el temps en què mantens el compte actiu a la plataforma. Un cop sol·licitis la baixa o l'eliminació del compte, les dades seran suprimides en un termini raonable. Atès que es tracta d'un projecte acadèmic, les dades també podran ser eliminades en finalitzar el període lectiu corresponent.
                </p>
                <h2 className="text-2xl font-semibold mb-1">5. Els teus drets</h2>
                <p className="mb-4">
                    D'acord amb la normativa vigent en matèria de protecció de dades (RGPD i LOPDGDD), tens dret a accedir a les teves dades personals, rectificar-les si són inexactes, sol·licitar-ne la supressió i oposar-te al seu tractament. Per exercir qualsevol d'aquests drets, pots posar-te en contacte amb nosaltres a hola@destinoincierto.cat i atendrem la teva sol·licitud en el menor temps possible.
                </p>
                <h2 className="text-2xl font-semibold mb-1">6. Menors d'edat</h2>
                <p className="mb-4">
                    La plataforma no està dirigida a menors de 14 anys i no recollim de manera conscient dades personals d'aquest col·lectiu. En cas de detectar que s'han recollit dades d'un menor sense l'autorització corresponent del seu tutor legal, procedirem immediatament a la seva eliminació.
                </p>
                <h2 className="text-2xl font-semibold mb-1">7. Seguretat</h2>
                <p className="mb-4">
                    Apliquem les mesures tècniques i organitzatives adequades al caràcter acadèmic del projecte per protegir les teves dades davant d'accessos no autoritzats o pèrdues accidentals. No obstant això, et recomanem no utilitzar contrasenyes que empris en altres serveis, ja que cap sistema pot garantir una seguretat absoluta.
                </p>
                <h2 className="text-2xl font-semibold mb-1">Canvis en la Política de Privacitat</h2>
                <p className="mb-4">
                    Podem actualitzar aquesta política de privacitat de tant en tant. Et notificarem sobre qualsevol canvi publicant la nova política al nostre lloc web.
                </p>
                <p className="mb-4">
                    Si tens alguna pregunta sobre la nostra política de privacitat, no dubtis a contactar-nos a <a href="mailto:hola@destinoincierto.com" className="hover:text-blue-600 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        hola@destinoincierto.cat
                    </a>
                </p>
                <p className="text-gray-600 mt-8" style={{ fontStyle: 'italic' }}>
                    Política revisada i actualitzada a abril de 2026.
                </p>
            </div>
        </section>
    );
}

function PrivacyPolicyLayout({ page }) {
    const { auth } = usePage().props;

    const header = (
        <h2 className="text-xl font-semibold leading-tight" style={{ color: 'var(--brown-compass)' }}>
            Política de Privacitat
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

PrivacyPolicy.layout = (page) => {
    return <PrivacyPolicyLayout page={page} />;
}
