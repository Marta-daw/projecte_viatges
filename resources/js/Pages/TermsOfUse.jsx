import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';

export default function TermsOfUse() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--ivory-beige)' }}>
            <Head title="Condicions d'Ús" />
            <Header />

            <main className="flex-grow px-4 py-10 sm:px-6 lg:px-8">
                <section className="mx-auto w-full max-w-4xl rounded-2xl border p-6 sm:p-10" style={{
                    backgroundColor: 'rgba(255,255,255,0.72)',
                    borderColor: 'rgba(45,74,107,0.15)',
                    boxShadow: '0 16px 34px rgba(61, 32, 16, 0.10)'
                }}>
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                        <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: 'var(--brown-compass)' }}>
                            Condicions d'Ús
                        </h1>
                        <Link
                            href={route('HomeViatges')}
                            className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition"
                            style={{
                                color: 'var(--blue-needle)',
                                borderColor: 'rgba(45,74,107,0.25)',
                                backgroundColor: 'rgba(45,74,107,0.06)'
                            }}
                        >
                            Tornar a l'inici
                        </Link>
                    </div>

                    <p className="mb-8 leading-7" style={{ color: 'var(--earth-grey)' }}>
                        Aquest document és un text demostratiu per a la pàgina de condicions d'ús. Pots substituir-lo més endavant
                        per condicions legals reals adaptades al teu projecte.
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="mb-2 text-xl font-bold" style={{ color: 'var(--brown-compass)' }}>1. Acceptació de les condicions</h2>
                            <p className="leading-7" style={{ color: 'var(--blackt-text)' }}>
                                En accedir i utilitzar aquesta plataforma, acceptes aquestes condicions d'ús de forma íntegra. Si no hi estàs d'acord,
                                et recomanem no utilitzar el servei.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-xl font-bold" style={{ color: 'var(--brown-compass)' }}>2. Ús responsable de la comunitat</h2>
                            <p className="leading-7" style={{ color: 'var(--blackt-text)' }}>
                                Els usuaris es comprometen a publicar contingut respectuós, rellevant i no ofensiu. Es prohibeix compartir contingut
                                il·legal, violent, discriminatori o que vulneri drets de tercers.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-xl font-bold" style={{ color: 'var(--brown-compass)' }}>3. Contingut publicat pels usuaris</h2>
                            <p className="leading-7" style={{ color: 'var(--blackt-text)' }}>
                                Cada usuari és responsable del contingut que publica. La plataforma es reserva el dret d'editar, ocultar o eliminar
                                publicacions que incompleixin aquestes condicions.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-xl font-bold" style={{ color: 'var(--brown-compass)' }}>4. Limitació de responsabilitat</h2>
                            <p className="leading-7" style={{ color: 'var(--blackt-text)' }}>
                                La plataforma s'ofereix "tal com està" i no garanteix disponibilitat contínua ni absència d'errors. No ens fem responsables
                                de danys derivats de l'ús de la web o de contingut publicat per tercers.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-2 text-xl font-bold" style={{ color: 'var(--brown-compass)' }}>5. Modificacions</h2>
                            <p className="leading-7" style={{ color: 'var(--blackt-text)' }}>
                                Aquestes condicions poden actualitzar-se periòdicament. Les modificacions entraran en vigor des del moment de la seva
                                publicació en aquesta pàgina.
                            </p>
                        </section>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
