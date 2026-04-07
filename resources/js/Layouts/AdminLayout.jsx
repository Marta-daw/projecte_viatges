import React from 'react';
import AdminHeader from '@/Components/Admin/AdminHeader/AdminHeader';
import AdminSidebar from '@/Components/Admin/AdminSidebar/AdminSidebar';

export default function AdminLayout({ user, children }) {
    return (
        // Contenedor principal: Ocupa toda la pantalla y pone los elementos en columna (Arriba/Abajo)
        <div className="flex flex-col h-screen bg-[#111315] text-white">

            {/* 1. CAJA ROJA SUPERIOR: Cabecera (Ancho completo) */}
            <header className="h-16 flex-shrink-0 border-b border-gray-800 z-10">
                <AdminHeader user={user} />
            </header>

            {/* Contenedor inferior: Divide el espacio restante en Izquierda/Derecha */}
            <div className="flex flex-1 overflow-hidden">

                <AdminSidebar auth={{ user }} />


                {/* 3. CAJA ROJA DERECHA: El contenido principal dinámico */}
                <main className="flex-1 overflow-y-auto bg-[#0a0a0b] p-8">
                    {/* Aquí Inertia inyectará la página que toque (Categorías, Usuarios, etc.) */}
                    {children}
                </main>

            </div>
        </div>
    );
}