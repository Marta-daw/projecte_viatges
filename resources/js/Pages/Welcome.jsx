import { Head } from '@inertiajs/react';
import Header from '../Components/Header.jsx';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Inici" />
            <Header auth={auth} />
            <main>
                <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
                    Benvinguts a Projecte Viatges
                </h1>
            </main>
        </>
    );
}