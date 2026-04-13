import React from 'react';
import AdminHeader from '@/Components/Admin/AdminHeader/AdminHeader';
import AdminSidebar from '@/Components/Admin/AdminSidebar/AdminSidebar';

export default function AdminLayout({ user, children }) {
    return (
        // Contenedor principal
        <div className="flex flex-col h-screen" style={{ backgroundColor: '#EDE0CC' }}>

            {/* 1. Header superior (ancho completo) */}
            <div className="flex-shrink-0 z-20">
                <AdminHeader user={user} />
            </div>

            {/* 2. Contenedor inferior: sidebar + main */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar izquierdo */}
                <AdminSidebar auth={{ user }} />

                {/* Área de contenido principal */}
                <main
                    className="flex-1 overflow-y-auto p-8"
                    style={{ backgroundColor: '#EDE0CC' }}
                >

                    {children}
                </main>

            </div>
        </div>
    );
}
