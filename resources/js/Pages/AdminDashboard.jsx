import React from 'react'
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminDashboard({ auth }) {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-white">Gestió de Categories</h1>

            <div className="bg-[#1c1f23] p-6 rounded-lg border border-gray-800">
                <p className="text-gray-300">Aquí anirà la teva taula per afegir, editar i esborrar categories...</p>
            </div>
        </>
    )
}

// Diem a Inertia quin és el seu "motlle" fix
AdminDashboard.layout = page => <AdminLayout user={page.props.auth.user} children={page} />;