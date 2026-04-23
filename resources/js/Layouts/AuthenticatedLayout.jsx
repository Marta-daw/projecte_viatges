import Header from '@/Components/Header/Header.jsx';
import Footer from '@/Components/Footer/Footer.jsx';
import { useFlashToast } from '@/hooks/useFlashToast';

export default function AuthenticatedLayout({ header, children }) {
    useFlashToast();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#121210] flex flex-col transition-colors duration-300">
            <Header />

            {header && (
                <header className="bg-white dark:bg-[#1e1e1b] shadow transition-colors duration-300">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-gray-800 dark:text-white">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-grow">
                <div>
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}