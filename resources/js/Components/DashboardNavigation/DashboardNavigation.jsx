import React from 'react'
import { Link } from '@inertiajs/react';

export default function DashboardNavigation({ auth }) {
    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-gray-300 flex flex-col">

            {/* 2. LOGO / BRANDING (Cabecera del sidebar) */}
            <div className="h-16 flex items-center px-6 border-b border-gray-800 font-bold text-white text-xl">
                <span>Viatges Admin</span>
            </div>

            {/* 3. NAV: La zona de navegación escroleable */}
            <nav className="flex-1 px-4 py-6 space-y-8 overflow-y-auto">

                {/* Grupo: Gestión Principal */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Gestió Principal
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin/categories" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition">
                                {/* Aquí iría un icono de SVG */}
                                <span>Categories</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/reports" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition relative">
                                <span>Experiències Reportades</span>
                                {/* Un pequeño badge como el "12" verde de tu imagen si hay reportes pendientes */}
                                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/estadistiques" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition relative">
                                <span>Estadístiques</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Grupo: Usuaris */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Usuaris
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin/users" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition">
                                <span>Llistat i Baixes</span>
                            </Link>
                        </li>
                    </ul>
                </div>

            </nav>

            {/* 4. FOOTER DEL SIDEBAR: Usuario actual y Logout */}
            <div className="p-4 border-t border-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                    {auth.user.name.charAt(0)} {/* Inicial del admin */}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{auth.user.name}</p>
                    <p className="text-xs text-gray-500 truncate">Admin</p>
                </div>
                {/* Botón de Logout simulado (el icono con la flecha de la imagen) */}
                <Link href={route('logout')} method="post" as="button" className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </Link>
            </div>

        </aside>
    )
}
