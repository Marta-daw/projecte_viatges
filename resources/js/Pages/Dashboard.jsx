import Hero from '@/Components/Hero/Hero';
import ExperienceList from '@/Components/ExperienceList/ExperienceList';
import styles from './Dashboard.module.scss';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ llista = [] }) {
    const { auth } = usePage().props;
    const authUser = auth?.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inicio / Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className={styles.dashboardContainer}>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <Hero variant="auth" user={authUser} createExperienceUrl={route('experiences.create')} />
                        <ExperienceList experiences={llista} />
                        {/* <div className="p-6 text-gray-900">
                            You're logged in!
                        </div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
