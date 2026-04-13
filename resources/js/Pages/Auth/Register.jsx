import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import FormRegister from '@/Components/FormRegister/FormRegister'; // Asegúrate de que la ruta es correcta

export default function Register() {
    return (
        <GuestLayout>
            <Head title="Registre" />
            <FormRegister />
        </GuestLayout>
    );
}