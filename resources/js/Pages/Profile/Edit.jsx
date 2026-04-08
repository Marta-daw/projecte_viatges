import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12" style={{ backgroundColor: "var(--ivory-beige)" }}>
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white pt-0 px-0 shadow sm:rounded-lg sm:pt-0 sm:px-0">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        // className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white pt-0 px-0 shadow sm:rounded-lg sm:pt-0 sm:px-0">
                        <UpdatePasswordForm //className="max-w-xl" 
                        />
                    </div>

                    <div className="bg-white pt-0 px-0 shadow sm:rounded-lg sm:pt-0 sm:px-0">
                        <DeleteUserForm //className="max-w-xl" 
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
