import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ReportsIndex({ auth, reports = [] }) {
    const [confirmDelete, setConfirmDelete] = useState(null);
    const { delete: destroy } = useForm();

    const handleResolveReport = (experienciaId) => {
        // Marcar como revisado (cambiar is_reported a false)
        if (window.confirm('¿Estás seguro de que quieres marcar este reporte como revisado?')) {
            destroy(route('admin.reports.resolve', experienciaId), {
                onSuccess: () => {
                    setConfirmDelete(null);
                },
            });
        }
    };

    const handleDeleteExperience = (experienciaId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta experiencia? Esta acción no se puede deshacer.')) {
            destroy(route('admin.reports.delete', experienciaId), {
                onSuccess: () => {
                    setConfirmDelete(null);
                },
            });
        }
    };

    return (
        <>
            <Head title="Gestión de Reportes" />
            <AdminLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-admin-border pb-6">
                        <h2 className="text-4xl font-bold text-admin-text mb-2">Gestión de Reportes</h2>
                        <p className="text-admin-text-muted text-lg">
                            {reports.length > 0
                                ? `Tienes ${reports.length} experiencia${reports.length !== 1 ? 's' : ''} reportada${reports.length !== 1 ? 's' : ''}`
                                : 'No hay experiencias reportadas'}
                        </p>
                    </div>

                    {/* Estado vacío */}
                    {reports.length === 0 ? (
                        <div className="bg-admin-surface rounded-lg p-12 border border-admin-border text-center">
                            <div className="text-6xl mb-4">✅</div>
                            <h3 className="text-xl font-semibold text-admin-text mb-2">¡Perfecto!</h3>
                            <p className="text-admin-text-muted">No hay experiencias reportadas en este momento.</p>
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
                                                Autor
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Descripción
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
                                        {reports.map((report) => (
                                            <tr
                                                key={report.id}
                                                className="border-b border-admin-border hover:bg-admin-bg transition duration-150"
                                            >
                                                <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                    #{report.id}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <span className="font-medium text-admin-text">{report.titulo}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                    {report.user?.name || 'Anónimo'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-admin-text-muted max-w-xs truncate">
                                                    {report.descripcion?.substring(0, 50) || 'N/A'}...
                                                </td>
                                                <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                    {new Date(report.created_at).toLocaleDateString('ca-ES')}
                                                </td>
                                                <td className="px-6 py-4 text-sm space-x-2 flex">
                                                    <button
                                                        onClick={() => handleResolveReport(report.id)}
                                                        className="px-3 py-2 bg-admin-success hover:bg-admin-success/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                        title="Marcar como revisado"
                                                    >
                                                        ✓ Revisado
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteExperience(report.id)}
                                                        className="px-3 py-2 bg-admin-danger hover:bg-admin-danger/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                        title="Eliminar experiencia"
                                                    >
                                                        🗑️ Eliminar
                                                    </button>
                                                    <a
                                                        href={route('experiences.show', report.id)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-2 bg-admin-accent hover:bg-admin-accent/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                        title="Ver experiencia completa"
                                                    >
                                                        👁️ Ver
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
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
