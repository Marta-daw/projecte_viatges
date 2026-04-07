import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats = {} }) {
    const {
        experiencesCount = 0,
        usersCount = 0,
        categoriesCount = 9,
        reportsCount = 0,
    } = stats;

    return (
        <>
            <Head title="Panel d'Administració" />
            <AdminLayout user={auth.user}>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="border-b border-admin-border pb-6">
                        <h2 className="text-4xl font-bold text-admin-text mb-2">
                            Benvingut al Dashboard
                        </h2>
                        <p className="text-admin-text-muted text-lg">
                            Gestiona tots els aspectes de la plataforma de viatges
                        </p>
                    </div>

                    {/* Grid de estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Experiències"
                            value={experiencesCount}
                            icon="✈️"
                            color="bg-admin-accent"
                            trend="+12% este mes"
                        />
                        <StatCard
                            title="Usuaris"
                            value={usersCount}
                            icon="👥"
                            color="bg-admin-success"
                            trend="+8% este mes"
                        />
                        <StatCard
                            title="Categoríes"
                            value={categoriesCount}
                            icon="📂"
                            color="bg-purple-500"
                            trend="Completes"
                        />
                        <StatCard
                            title="Reportes Pendents"
                            value={reportsCount}
                            icon="⚠️"
                            color={reportsCount > 0 ? "bg-admin-danger" : "bg-admin-text-muted"}
                            trend={reportsCount > 0 ? "Revisió necessària" : "Cap reportes"}
                        />
                    </div>

                    {/* Secciones principales */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Accions ràpides */}
                        <div className="lg:col-span-2">
                            <div className="bg-admin-surface rounded-lg p-6 border border-admin-border">
                                <h3 className="text-xl font-semibold text-admin-text mb-4 flex items-center gap-2">
                                    <span>🔧</span>
                                    <span>Accions ràpides</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Link
                                        href={route('admin.categories')}
                                        className="block p-4 bg-admin-bg hover:bg-admin-border rounded-lg transition duration-200 text-admin-text hover:text-admin-accent font-medium border border-transparent hover:border-admin-border"
                                    >
                                        📂 Gestionar Categoríes
                                    </Link>
                                    <Link
                                        href={route('admin.reports')}
                                        className="block p-4 bg-admin-bg hover:bg-admin-border rounded-lg transition duration-200 text-admin-text hover:text-admin-danger font-medium border border-transparent hover:border-admin-border"
                                    >
                                        ⚠️ Revisar Reportes
                                    </Link>
                                    <a
                                        href="#"
                                        className="block p-4 bg-admin-bg hover:bg-admin-border rounded-lg transition duration-200 text-admin-text-muted hover:text-admin-text font-medium border border-transparent hover:border-admin-border opacity-50 cursor-not-allowed"
                                        title="Pròximamente"
                                    >
                                        ✈️ Revisar Experiències
                                    </a>
                                    <a
                                        href="#"
                                        className="block p-4 bg-admin-bg hover:bg-admin-border rounded-lg transition duration-200 text-admin-text-muted hover:text-admin-text font-medium border border-transparent hover:border-admin-border opacity-50 cursor-not-allowed"
                                        title="Pròximamente"
                                    >
                                        👥 Gestionar Usuaris
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Estado del sistema */}
                        <div className="bg-admin-surface rounded-lg p-6 border border-admin-border">
                            <h3 className="text-xl font-semibold text-admin-text mb-4 flex items-center gap-2">
                                <span>📊</span>
                                <span>Estado</span>
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-admin-success text-lg">●</span>
                                    <span className="text-admin-text text-sm">Plataforma activa</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-admin-success text-lg">●</span>
                                    <span className="text-admin-text text-sm">Sistema de moderació actiu</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={reportsCount > 0 ? "text-admin-danger text-lg" : "text-admin-success text-lg"}>●</span>
                                    <span className="text-admin-text text-sm">
                                        {reportsCount > 0 ? `${reportsCount} reportes pendents` : "Cap reportes pendents"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Últimas actividades */}
                    <div className="bg-admin-surface rounded-lg p-6 border border-admin-border">
                        <h3 className="text-xl font-semibold text-admin-text mb-4 flex items-center gap-2">
                            <span>📝</span>
                            <span>Informació del sistema</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="border-l-4 border-admin-accent pl-4">
                                <p className="text-admin-text-muted mb-1">Categoríes disponibles</p>
                                <p className="text-2xl font-bold text-admin-accent">{categoriesCount}</p>
                            </div>
                            <div className="border-l-4 border-admin-success pl-4">
                                <p className="text-admin-text-muted mb-1">Usuaris registrats</p>
                                <p className="text-2xl font-bold text-admin-success">{usersCount}</p>
                            </div>
                            <div className="border-l-4 border-purple-500 pl-4">
                                <p className="text-admin-text-muted mb-1">Experiències actives</p>
                                <p className="text-2xl font-bold text-purple-400">{experiencesCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

function StatCard({ title, value, icon, color, trend }) {
    return (
        <div className={`${color} rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition duration-200`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-white/80 text-sm font-medium">{title}</p>
                    <p className="text-4xl font-bold mt-3">{value}</p>
                </div>
                <span className="text-4xl opacity-80">{icon}</span>
            </div>
            <p className="text-white/70 text-xs font-semibold">{trend}</p>
        </div>
    );
}
