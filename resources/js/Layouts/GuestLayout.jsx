import ApplicationLogo from '@/Components/AppLogo/AppLogo';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';

export default function GuestLayout({ children, fullWidth = false }) {
    return (
        < div className="flex flex-col min-h-screen bg-gray-100 dark:bg-[#121210] transition-colors duration-300" >
            <Header />

            <main className={fullWidth ? 'flex-grow' : 'flex-grow flex flex-col items-center pt-10 sm:pt-20'}>
                {fullWidth ? children :
                    <div className="w-full sm:max-w-md mt-6 px-6 py-8 bg-white dark:bg-[#1e1e1b] shadow-md overflow-hidden sm:rounded-lg transition-colors duration-300">
                        {children}
                    </div>
                }
            </main >

            <Footer />
        </div >
    );
}