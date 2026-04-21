import { Head, usePage } from '@inertiajs/react';
import CardExperience from '@/Components/CardExperience/CardExperience.jsx';
import GuestLayout from '@/Layouts/GuestLayout.jsx';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PublicUserProfile({ profileUser, experiences = [], stats = {} }) {
    // Aquesta vista s'adapta al context: layout privat si hi ha sessió, guest si no.
    const { auth } = usePage().props;
    const isAuthenticated = !!auth?.user;
    const publishedCount = stats?.published_count ?? experiences.length;

    return (
        <>
            <Head title={`Perfil de ${profileUser?.name ?? 'Usuari'}`} />

            <section
                className="min-h-screen"
                style={{
                    background:
                        'radial-gradient(circle at 10% 10%, rgba(240,194,127,0.18), transparent 35%), linear-gradient(180deg, var(--ivory-beige) 0%, #fff 70%)',
                }}
            >
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <header className="overflow-hidden rounded-2xl border shadow-lg"
                        style={{
                            borderColor: 'var(--warm-sand-darker)',
                            background: 'linear-gradient(135deg, var(--warm-sand) 0%, #fff 75%)',
                        }}
                    >
                        <div className="p-6 sm:p-8 lg:p-10">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
                                        style={{ backgroundColor: 'var(--brown-compass)' }}
                                    >
                                        {profileUser?.avatar_url ? (
                                            <img src={profileUser.avatar_url} alt="Avatar usuari" className="w-full h-full rounded-full object-cover" loading="lazy" decoding="async" />
                                        ) : (
                                            (profileUser?.name || 'U').slice(0, 1).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wider"
                                            style={{ color: 'var(--earth-grey)' }}
                                        >
                                            Perfil Public
                                        </p>
                                        <h1 className="text-3xl font-bold"
                                            style={{ color: 'var(--brown-compass)' }}
                                        >
                                            {profileUser?.name ?? 'Usuari'}
                                        </h1>
                                        <p className="mt-1 text-sm" style={{ color: 'var(--earth-grey)' }}>
                                            Membre des de {new Date(profileUser?.created_at).toLocaleDateString('ca-ES')}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl border px-4 py-3"
                                    style={{
                                        borderColor: 'var(--warm-sand-darker)',
                                        backgroundColor: 'rgba(255,255,255,0.75)',
                                    }}
                                >
                                    <p className="text-sm" style={{ color: 'var(--earth-grey)' }}>
                                        Experiencies publiques
                                    </p>
                                    <p className="text-2xl font-bold" style={{ color: 'var(--brown-compass)' }}>
                                        {publishedCount}
                                    </p>
                                </div>
                            </div>

                            {profileUser?.bio && (
                                <p className="mt-6 max-w-3xl text-base leading-relaxed" style={{ color: 'var(--blackt-text)' }}>
                                    {profileUser.bio}
                                </p>
                            )}
                        </div>
                    </header>

                    <section className="mt-8">
                        {experiences.length === 0 ? (
                            <div className="rounded-2xl border p-8 text-center"
                                style={{
                                    borderColor: 'var(--warm-sand-darker)',
                                    backgroundColor: 'rgba(237, 228, 211, 0.45)',
                                }}
                            >
                                <h2 className="text-xl font-semibold" style={{ color: 'var(--brown-compass)' }}>
                                    Aquest usuari encara no ha publicat experiencies
                                </h2>
                                <p className="mt-2" style={{ color: 'var(--earth-grey)' }}>
                                    Torna mes tard per veure noves rutes i aventures.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {experiences.map((experience) => (
                                    <CardExperience
                                        key={experience.id}
                                        experience={experience}
                                        isAuthenticated={isAuthenticated}
                                        showActions={false}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </section>
        </>
    );
}

PublicUserProfile.layout = (page) => {
    // Seleccionem layout segons context d'autenticació per reutilitzar la mateixa pàgina.
    if (page.props.auth?.user) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight" style={{ color: 'var(--brown-compass)' }}>
                        Perfil public / Usuari
                    </h2>
                }
                children={page}
            />
        );
    }

    return <GuestLayout fullWidth>{page}</GuestLayout>;
};
