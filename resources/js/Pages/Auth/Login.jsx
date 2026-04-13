import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import FormLogin from '@/Components/FormLogin/FormLogin';

export default function Login({ status }) {
    return (
        <GuestLayout>
            <Head title="Inici de sessió" />
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <FormLogin />
        </GuestLayout>
    );
}