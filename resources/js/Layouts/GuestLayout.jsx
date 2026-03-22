import ApplicationLogo from '@/Components/AppLogo/AppLogo';
import { Link } from '@inertiajs/react';

import Header from '@/Components/Header/Header.jsx';
import Hero from '@/Components/Hero/Hero';
export default function GuestLayout({ children }) {
    return (
        <>
            <Header />
            <Hero />

            <main>
                <div >
                    {children}
                </div>
            </main>
        </>
    );
}
