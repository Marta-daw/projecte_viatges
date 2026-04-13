import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import styles from './Profile.module.scss';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Perfil" />

            <div className={styles.profileContainer}>
                <h2 className={styles.titleSection}>El meu Perfil</h2>

                <div className={styles.formSection}>
                    <div className={styles.headerSection}>
                        <h2>Informació del perfil</h2>
                        <p>Actualitza la teva informació del perfil, la direcció de correu...</p>
                    </div>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className={styles.formSection}>
                    <div className={styles.headerSection}>
                        <h2>Actualitza la contrasenya</h2>
                        <p>Asseguris que el seu compte utilitza una contrasenya llarga i aleatòria...</p>
                    </div>
                    <UpdatePasswordForm />
                </div>

                <div className={styles.formSection}>
                    <div className={styles.headerSection}>
                        <h2>Eliminar el compte</h2>
                        <p>Un cop eliminada el teu compte, tots els recursos i dades s'eliminaran permanentment...</p>
                    </div>
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}