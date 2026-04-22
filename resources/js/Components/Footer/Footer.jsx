import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    // Any dinàmic per evitar manteniment manual del peu de pàgina.
    const currentYear = new Date().getFullYear();
    const user = usePage().props.auth?.user;

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white dark:bg-[#121210] border-t border-gray-200 dark:border-zinc-800 mt-auto transition-colors duration-300">            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <Link href="/" className="flex items-center gap-2 mb-2">
                        <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
                            Destino Incierto
                        </span>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs transition-colors">
                        Comparteix les teves aventures i descobreix nous horitzons amb la nostra comunitat de viatgers.
                    </p>
                </div>

                <div className="flex flex-col items-center text-sm font-medium text-gray-500 gap-3">
                    <span className="text-gray-900 dark:text-gray-300 font-bold uppercase tracking-wider text-xs transition-colors">Navegació</span>
                    <div className="flex gap-4">
                        <Link href={user ? route('dashboard') : '/'} className="dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Inici
                        </Link>
                        <button onClick={scrollToTop} className="dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                            Torna a dalt
                        </button>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs">
                        <Link href="/politica-privacitat" className="dark:text-gray-400 hover:text-blue-600 transition-colors">
                            Política de Privacitat
                        </Link>
                        <span className="text-gray-300 dark:text-gray-600">|</span>
                        <Link href="/condicions-us" className="dark:text-gray-400 hover:text-blue-600 transition-colors">
                            Condicions d'Ús
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-end text-sm text-gray-500 dark:text-gray-400 gap-2 transition-colors">
                    <span className="text-gray-900 dark:text-gray-300 font-bold uppercase tracking-wider text-xs">Contacte</span>
                    <a href="mailto:hola@destinoincierto.cat" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        hola@destinoincierto.cat
                    </a>
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        +34 93 123 45 67
                    </span>
                </div>

            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-zinc-800 pt-6 text-center text-xs text-gray-500 dark:text-gray-400 transition-colors">
                <p>&copy; {currentYear} Destino Incierto. Tots els drets reservats. Projecte de pràctiques.</p>
            </div>
        </div>
        </footer>
    );
}