import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ReportsIndex({ auth, reports = [] }) {
    const [confirmDelete, setConfirmDelete] = useState(null);
    const { delete: destroy } = useForm();

    const handleResolveReport = (experienciaId) => {
        // Marcar com a revisat (canviar is_reported a false)
        if (window.confirm('Estàs segur que vols marcar aquest report com a revisat?')) {
            destroy(route('admin.reports.resolve', experienciaId), {
                onSuccess: () => {
                    setConfirmDelete(null);
                },
            });
        }
    };

    const handleDeleteExperience = (experienciaId) => {
        if (window.confirm('Estàs segur que vols eliminar aquesta experiència? Aquesta acció no es pot desfer.')) {
            destroy(route('admin.reports.delete', experienciaId), {
                onSuccess: () => {
                    setConfirmDelete(null);
                },
            });
        }
    };

    return (
        <>
            <Head title="Gestió de reports" />
            <AdminLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Capçalera */}
                    <div className="border-b border-admin-border pb-6">
                        <h2 className="text-4xl font-bold text-admin-text mb-2">Gestió de reports</h2>
                        <p className="text-admin-text-muted text-lg">
                            {reports.length > 0
                                ? `Tens ${reports.length} experiència${reports.length !== 1 ? 's' : ''} reportada${reports.length !== 1 ? 'es' : ''}`
                                : 'No hi ha experiències reportades'}
                        </p>
                    </div>

                    {/* Estat buit */}
                    {reports.length === 0 ? (
                        <div className="bg-admin-surface rounded-lg p-12 border border-admin-border text-center">
                            <div className="text-6xl mb-4">✅</div>
                            <h3 className="text-xl font-semibold text-admin-text mb-2">Perfecte!</h3>
                            <p className="text-admin-text-muted">No hi ha experiències reportades en aquest moment.</p>
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
                                                Títol
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Autor
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Descripció
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Data
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-admin-text">
                                                Accions
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
                                                    {report.user?.name || 'Anònim'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-admin-text-muted max-w-xs truncate">
                                                    {report.descripcion?.substring(0, 50) || 'N/D'}...
                                                </td>
                                                <td className="px-6 py-4 text-sm text-admin-text-muted">
                                                    {new Date(report.created_at).toLocaleDateString('ca-ES')}
                                                </td>
                                                <td className="px-6 py-4 text-sm space-x-2 flex">
                                                    <button
                                                        onClick={() => handleResolveReport(report.id)}
                                                        className="px-3 py-2 bg-admin-success hover:bg-admin-success/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                        title="Marcar com a revisat"
                                                    >
                                                        ✓ Revisat
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteExperience(report.id)}
                                                        className="px-3 py-2 bg-admin-danger hover:bg-admin-danger/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                        title="Eliminar experiència"
                                                    >
                                                        🗑️ Eliminar
                                                    </button>
                                                    <a
                                                        href={route('experiences.show', report.id)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-3 py-2 bg-admin-accent hover:bg-admin-accent/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
                                                        title="Veure experiència completa"
                                                    >
                                                        👁️ Veure
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
