import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import styles from './Partials.module.scss';


export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            bio: user.bio || "",
            avatar_url: user.avatar_url || "",
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={styles.updateProfile}>
            <header className={styles.headerSection}>
                <h2 className={`text-lg font-medium text-gray-900 ${styles.titleSection}`}>
                    Informació del perfil
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Actualitza la teva informació del perfil, la direcció de correu, la biografia i la imatge per l'avatar.
                </p>
            </header>
            <form onSubmit={submit} className={`pt-6 px-6 space-y-6 ${styles.formSection}`}>
                <div>
                    <InputLabel htmlFor="name" value="Nom" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="bio" value="Bio" />

                    <textarea
                        id="bio"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        autoComplete="bio"
                    />

                    <InputError className="mt-2" message={errors.bio} />
                </div>

                <div>
                    <InputLabel htmlFor="avatar_url" value="Avatar URL" />

                    <TextInput
                        id="avatar_url"
                        type="url"
                        className="mt-1 block w-full"
                        value={data.avatar_url}
                        onChange={(e) => setData('avatar_url', e.target.value)}
                        autoComplete="avatar_url"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.avatar_url}
                    />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            El teu coorreu no està verificat.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Fes clic aquí per reenviar el correu de verificació.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                S'ha enviat un nou enllaç de verificació al teu correu.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 ">
                    <PrimaryButton className="mb-6" disabled={processing}>Guarda</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Guardat.
                        </p>
                    </Transition>
                </div>
            </form>
        </section >
    );
}
