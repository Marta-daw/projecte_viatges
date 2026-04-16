import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <Link href="/" className="flex items-center gap-2 mb-2">
                            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                            <span className="text-xl font-bold text-gray-900">
                                Destino Incierto
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 max-w-xs">
                            Comparteix les teves aventures i descobreix nous horitzons amb la nostra comunitat de viatgers.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-sm font-medium text-gray-500 gap-3">
                        <span className="text-gray-900 font-bold uppercase tracking-wider text-xs">Navegació</span>
                        <div className="flex gap-4">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Inici</Link>
                            <a href="#" className="hover:text-blue-600 transition-colors">Experiències</a>
                        </div>
                        <div className="flex gap-4 mt-2 text-xs">
                            <a href="#" className="hover:text-blue-600 transition-colors">Política de Privacitat</a>
                            <span className="text-gray-300">|</span>
                            <a href="#" className="hover:text-blue-600 transition-colors">Condicions d'Ús</a>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end text-sm text-gray-500 gap-2">
                        <span className="text-gray-900 font-bold uppercase tracking-wider text-xs">Contacte</span>
                        <a href="mailto:hola@destinoincierto.com" className="hover:text-blue-600 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            hola@destinoincierto.cat
                        </a>
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            +34 93 123 45 67
                        </span>
                    </div>

                </div>

                <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
                    <p>&copy; {currentYear} Destino Incierto. Tots els drets reservats. Projecte de pràctiques.</p>
                </div>
            </div>
        </footer>
    );
}