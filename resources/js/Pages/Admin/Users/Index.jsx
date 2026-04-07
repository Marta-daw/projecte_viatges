import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function UsersIndex({ auth, users = [] }) {
    const [confirmDelete, setConfirmDelete] = useState(null);
    const { delete: destroy, post } = useForm();

    const handleDeleteUser = (userId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
            destroy(route('admin.users.delete', userId), {
                onSuccess: () => {
                    setConfirmDelete(null);
                },
            });
        }
    };

    const handleBanUser = (userId) => {
        if (window.confirm('¿Estás seguro de que quieres banear este usuario?')) {
            post(route('admin.users.ban', userId), {
                preserveScroll: true,
            });
        }
    };

    const handleUnbanUser = (userId) => {
        if (window.confirm('¿Estás seguro de que quieres desbanear este usuario?')) {
            post(route('admin.users.unban', userId), {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadge = (user) => {
        const isBanned = user.is_banned || false;
        return isBanned
            ? { color: 'bg-admin-danger', text: '🚫 Baneado' }
            : { color: 'bg-admin-success', text: '✅ Activo' };
    };

    return (
        <>
            <Head title="Gestión de Usuaris" />
            <AdminLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-admin-border pb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-4xl font-bold text-admin-text mb-2">Gestión de Usuaris</h2>
                                <p className="text-admin-text-muted text-lg">
                                    {users.length > 0
                                        ? `Total: ${users.length} usuari${users.length !== 1 ? 's' : ''}`
                                        : 'No hay usuarios registrados'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Estado vacío */}
                    {users.length === 0 ? (
                        <div className="bg-admin-surface rounded-lg p-12 border border-admin-border text-center">
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold text-admin-text mb-2">¡Sin usuarios!</h3>
                            <p className="text-admin-text-muted">No hay usuarios registrados en este momento.</p>
                        </div>
                    ) : (
                        <div className="bg-admin-surface rounded-lg border border-admin-border overflow-hidden">
                            {/* Tabla responsiva */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-admin-border bg-admin-bg">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                ID
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Email
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Experiências
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Estado
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Registro
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Acciones
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
                                                        <Link
                                                            href={route('profile.show', { user: user.id })}
                                                            className="px-3 py-2 bg-admin-accent hover:bg-admin-accent/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                            title="Ver perfil"
                                                        >
                                                            👤 Perfil
                                                        </Link>
                                                        {!isBanned ? (
                                                            <button
                                                                onClick={() => handleBanUser(user.id)}
                                                                className="px-3 py-2 bg-admin-warning hover:bg-admin-warning/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                                title="Banear usuario"
                                                            >
                                                                🚫 Banear
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleUnbanUser(user.id)}
                                                                className="px-3 py-2 bg-admin-success hover:bg-admin-success/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                                title="Desbanear usuario"
                                                            >
                                                                ✅ Desbanear
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="px-3 py-2 bg-admin-danger hover:bg-admin-danger/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                            title="Eliminar usuario"
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
