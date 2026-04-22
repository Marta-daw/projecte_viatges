import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ExperiencesIndex({ auth, experiences = [] }) {
    const { delete: destroy } = useForm();

    const handleDeleteExperience = (experienceId) => {
        if (window.confirm('Estàs segur que vols eliminar aquesta experiència? Aquesta acció no es pot desfer.')) {
            destroy(route('admin.experiences.delete', experienceId));
        }
    };

    const getCategoryNames = (experience) => {
        if (!experience.categories || experience.categories.length === 0) {
            return <span className="text-admin-text-muted italic text-xs">Sense categoria</span>;
        }
        return experience.categories.map(cat => cat.nombre || cat.name).join(', ');
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'publicada': { bg: '#4A7C6F', text: '✅ Publicada' },
            'published': { bg: '#4A7C6F', text: '✅ Publicada' },
            'esborrany': { bg: '#8B7335', text: '📋 Esborrany' },
            'draft': { bg: '#8B7335', text: '📋 Esborrany' },
            'archived': { bg: '#7A6050', text: '📁 Arxivada' },
        };
        return statusMap[status] || statusMap['esborrany'];
    };

    return (
        <>
            <Head title="Gestió d'experiències" />
            <AdminLayout user={auth.user}>
                <div className="space-y-6">

                    {/* Capçalera */}
                    <div className="pb-5" style={{ borderBottom: '2px solid #cfbfa4' }}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">✈️</span>
                                <div>
                                    <h2 className="text-admin-text" style={{ fontSize: '1.7rem', fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}>
                                        Gestió d'experiències
                                    </h2>
                                    <p className="text-admin-text-muted text-sm mt-0.5">
                                        {experiences.length > 0
                                            ? `Total: ${experiences.length} experiència${experiences.length !== 1 ? 's' : ''}`
                                            : 'No hi ha experiències creades'}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={route('experiences.create')}
                                className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-sm"
                                style={{ background: 'linear-gradient(135deg, #C0634A, #8B7335)' }}
                            >
                                ➕ Nova experiència
                            </Link>
                        </div>
                    </div>

                    {/* Estat buit */}
                    {experiences.length === 0 ? (
                        <div
                            className="rounded-xl p-14 text-center"
                            style={{ background: '#FFFFFF', border: '1px solid #cfbfa4' }}
                        >
                            <div className="text-6xl mb-4">✈️</div>
                            <h3 className="text-xl font-bold text-admin-text mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                Sense experiències!
                            </h3>
                            <p className="text-admin-text-muted mb-6 text-sm">
                                No hi ha experiències disponibles en aquest moment.
                            </p>
                            <Link
                                href={route('experiences.create')}
                                className="inline-block px-6 py-3 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
                                style={{ background: 'linear-gradient(135deg, #C0634A, #8B7335)' }}
                            >
                                Crear primera experiència
                            </Link>
                        </div>
                    ) : (
                        <div
                            className="rounded-xl overflow-hidden shadow-sm"
                            style={{ background: '#FFFFFF', border: '1px solid #cfbfa4' }}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #EDE4D3', background: '#FAF6EF' }}>
                                            <Th>ID</Th>
                                            <Th>Títol</Th>
                                            <Th>Usuari</Th>
                                            <Th>Categoria</Th>
                                            <Th>Estat</Th>
                                            <Th>Data</Th>
                                            <Th>Accions</Th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {experiences.map((experience) => {
                                            const statusInfo = getStatusBadge(experience.status);
                                            return (
                                                <tr
                                                    key={experience.id}
                                                    className="transition duration-150"
                                                    style={{ borderBottom: '1px solid #F0EAE0' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#FDF9F5'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    <Td>
                                                        <span
                                                            className="font-bold text-xs px-2 py-1 rounded-md"
                                                            style={{ background: '#EDE4D3', color: '#6B3A2A' }}
                                                        >
                                                            #{experience.id}
                                                        </span>
                                                    </Td>
                                                    <Td>
                                                        <span
                                                            className="font-semibold text-sm"
                                                            style={{ color: '#1C1C1C', maxWidth: '200px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                                            title={experience.title}
                                                        >
                                                            {experience.title}
                                                        </span>
                                                    </Td>
                                                    <Td>
                                                        <span className="text-sm text-admin-text-muted">
                                                            {experience.user?.name || 'Anònim'}
                                                        </span>
                                                    </Td>
                                                    <Td>
                                                        <span className="text-sm">
                                                            {getCategoryNames(experience)}
                                                        </span>
                                                    </Td>
                                                    <Td>
                                                        <span
                                                            className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                                                            style={{ background: statusInfo.bg }}
                                                        >
                                                            {statusInfo.text}
                                                        </span>
                                                    </Td>
                                                    <Td>
                                                        <span className="text-sm text-admin-text-muted">
                                                            {new Date(experience.created_at).toLocaleDateString('ca-ES', {
                                                                day: '2-digit', month: 'short', year: 'numeric'
                                                            })}
                                                        </span>
                                                    </Td>
                                                    <Td>
                                                        <div className="flex items-center gap-2">
                                                            {/* Veure */}
                                                            <a
                                                                href={route('experiences.show', experience.id)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="px-3 py-1.5 text-white rounded-lg font-semibold text-xs transition-all hover:-translate-y-0.5"
                                                                style={{ background: '#2D4A6B' }}
                                                                title="Veure experiència"
                                                            >
                                                                👁️
                                                            </a>
                                                            {/* Editar */}
                                                            <Link
                                                                href={route('admin.experiences.edit', experience.id)}
                                                                className="px-3 py-1.5 text-white rounded-lg font-semibold text-xs transition-all hover:-translate-y-0.5"
                                                                style={{ background: '#8B7335' }}
                                                                title="Editar experiència"
                                                            >
                                                                ✏️
                                                            </Link>
                                                            {/* Eliminar */}
                                                            <button
                                                                onClick={() => handleDeleteExperience(experience.id)}
                                                                className="px-3 py-1.5 text-white rounded-lg font-semibold text-xs transition-all hover:-translate-y-0.5"
                                                                style={{ background: '#C0634A' }}
                                                                title="Eliminar experiència"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </Td>
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

function Th({ children }) {
    return (
        <th
            className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider"
            style={{ color: '#6B3A2A', fontFamily: 'Montserrat, sans-serif' }}
        >
            {children}
        </th>
    );
}

function Td({ children }) {
    return (
        <td className="px-5 py-4 text-sm">
            {children}
        </td>
    );
}
