import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ExperiencesIndex({ auth, experiences = [] }) {
    const [confirmDelete, setConfirmDelete] = useState(null);
    const { delete: destroy } = useForm();

    const handleDeleteExperience = (experienceId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta experiencia? Esta acción no se puede deshacer.')) {
            destroy(route('admin.experiences.delete', experienceId), {
                onSuccess: () => {
                    setConfirmDelete(null);
                },
            });
        }
    };

    const handleReportExperience = (experienceId) => {
        if (window.confirm('¿Marcar esta experiencia como reportada?')) {
            // Esta función sería similar pero con una ruta diferente
            // Por ahora usamos un endpoint que debería existir
        }
    };

    const getCategoryNames = (experience) => {
        if (!experience.categories || experience.categories.length === 0) {
            return 'Sin categoría';
        }
        return experience.categories.map(cat => cat.nombre).join(', ');
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'published': { color: 'bg-admin-success', text: '📝 Publicada' },
            'draft': { color: 'bg-admin-warning', text: '📋 Borrador' },
            'archived': { color: 'bg-admin-text-muted', text: '📁 Archivada' },
        };
        
        const statusInfo = statusMap[status] || statusMap['draft'];
        return statusInfo;
    };

    return (
        <>
            <Head title="Gestión de Experiências" />
            <AdminLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-admin-border pb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-4xl font-bold text-admin-text mb-2">Gestión de Experiências</h2>
                                <p className="text-admin-text-muted text-lg">
                                    {experiences.length > 0
                                        ? `Total: ${experiences.length} experiencia${experiences.length !== 1 ? 's' : ''}`
                                        : 'No hay experiencias creadas'}
                                </p>
                            </div>
                            <Link
                                href={route('experiences.create')}
                                className="px-6 py-3 bg-admin-accent hover:bg-admin-accent/80 text-white rounded-lg font-medium transition"
                            >
                                ➕ Nueva Experiencia
                            </Link>
                        </div>
                    </div>

                    {/* Estado vacío */}
                    {experiences.length === 0 ? (
                        <div className="bg-admin-surface rounded-lg p-12 border border-admin-border text-center">
                            <div className="text-6xl mb-4">✈️</div>
                            <h3 className="text-xl font-semibold text-admin-text mb-2">¡Sin experiencias!</h3>
                            <p className="text-admin-text-muted mb-6">No hay experiencias disponibles en este momento.</p>
                            <Link
                                href={route('experiences.create')}
                                className="inline-block px-6 py-3 bg-admin-accent hover:bg-admin-accent/80 text-white rounded-lg font-medium transition"
                            >
                                Crear Primera Experiencia
                            </Link>
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
                                                Título
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Usuario
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Categorías
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Estado
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Fecha
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {experiences.map((experience) => {
                                            const statusInfo = getStatusBadge(experience.status);
                                            return (
                                                <tr
                                                    key={experience.id}
                                                    className="border-b border-admin-border hover:bg-admin-bg transition duration-150"
                                                >
                                                    <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                        #{experience.id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className="font-medium text-admin-text">{experience.title}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                        {experience.user?.name || 'Anónimo'}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                        {getCategoryNames(experience)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm">
                                                        <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${statusInfo.color}`}>
                                                            {statusInfo.text}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                        {new Date(experience.created_at).toLocaleDateString('ca-ES')}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm space-x-2 flex">
                                                        <a
                                                            href={route('experiencia.show', experience.id)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-3 py-2 bg-admin-accent hover:bg-admin-accent/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                            title="Ver experiencia"
                                                        >
                                                            👁️ Ver
                                                        </a>
                                                        <button
                                                            onClick={() => handleDeleteExperience(experience.id)}
                                                            className="px-3 py-2 bg-admin-danger hover:bg-admin-danger/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                            title="Eliminar experiencia"
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
