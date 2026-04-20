import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function UsersIndex({ auth, users = [] }) {
    const [confirmDelete, setConfirmDelete] = useState(null);
    const { delete: destroy, post } = useForm();

    const handleDeleteUser = (userId) => {
        if (window.confirm('Estàs segur que vols eliminar aquest usuari? Aquesta acció no es pot desfer.')) {
            destroy(route('admin.users.delete', userId), {
                onSuccess: () => {
                    setConfirmDelete(null);
                },
            });
        }
    };

    const handleBanUser = (userId) => {
        if (window.confirm('Estàs segur que vols bandejar aquest usuari?')) {
            post(route('admin.users.ban', userId), {
                preserveScroll: true,
            });
        }
    };

    const handleUnbanUser = (userId) => {
        if (window.confirm('Estàs segur que vols treure el bandeig a aquest usuari?')) {
            post(route('admin.users.unban', userId), {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadge = (user) => {
        const isBanned = user.is_banned || false;
        return isBanned
            ? { color: 'bg-admin-danger', text: '🚫 Bandejat' }
            : { color: 'bg-admin-success', text: '✅ Actiu' };
    };

    return (
        <>
            <Head title="Gestió d'usuaris" />
            <AdminLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Capçalera */}
                    <div className="border-b border-admin-border pb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-4xl font-bold text-admin-text mb-2">Gestió d'usuaris</h2>
                                <p className="text-admin-text-muted text-lg">
                                    {users.length > 0
                                        ? `Total: ${users.length} usuari${users.length !== 1 ? 's' : ''}`
                                        : 'No hi ha usuaris registrats'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Estat buit */}
                    {users.length === 0 ? (
                        <div className="bg-admin-surface rounded-lg p-12 border border-admin-border text-center">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-admin-text mb-2">Cap usuari!</h3>
                            <p className="text-admin-text-muted">No hi ha usuaris registrats en aquest moment.</p>
                        </div>
                    ) : (
                        <div className="bg-admin-surface rounded-lg border border-admin-border overflow-hidden">
                            {/* Taula responsiva */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-admin-border bg-admin-bg">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                ID
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Nom
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Email
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Experiències
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Estat
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Registre
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Accions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => {
                                            const statusInfo = getStatusBadge(user);
                                            const isBanned = user.is_banned || false;
                                            return (
                                                <tr
                                                    key={user.id}
                                                    className={`border-b border-admin-border hover:bg-admin-bg transition duration-150 ${isBanned ? 'opacity-60' : ''}`}
                                                >
                                                    <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                        #{user.id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className="font-medium text-admin-text">{user.name}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className="px-3 py-1 bg-admin-border rounded-full text-admin-text text-xs font-medium">
                                                            {user.experiences_count || 0}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${statusInfo.color}`}>
                                                            {statusInfo.text}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                        {new Date(user.created_at).toLocaleDateString('ca-ES')}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm space-x-2 flex">
                                                        {!isBanned ? (
                                                            <button
                                                                onClick={() => handleBanUser(user.id)}
                                                                className="px-3 py-2 bg-admin-warning hover:bg-admin-warning/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                                title="Bandejar usuari"
                                                            >
                                                                🚫 Bandejar
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleUnbanUser(user.id)}
                                                                className="px-3 py-2 bg-admin-success hover:bg-admin-success/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                                title="Treure el bandeig a l'usuari"
                                                            >
                                                                ✅ Treure bandeig
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="px-3 py-2 bg-admin-danger hover:bg-admin-danger/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                            title="Eliminar usuari"
                                                        >
                                                            🗑️ Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </AdminLayout>
        </>
    );
}
