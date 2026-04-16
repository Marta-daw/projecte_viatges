import ApplicationLogo from '@/Components/AppLogo/AppLogo';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';

export default function GuestLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <main className="flex-grow flex flex-col items-center pt-10 sm:pt-20">
                <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}