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
            <Head title="Panell d'Administració" />
            <AdminLayout user={auth.user}>
                <div className="space-y-8">

                    {/* Capçalera de pàgina */}
                    <div className="pb-6" style={{ borderBottom: '2px solid #cfbfa4' }}>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-3xl">📊</span>
                            <h2 className="text-admin-text" style={{ fontSize: '1.9rem', fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}>
                                Benvingut al tauler
                            </h2>
                        </div>
                        <p className="text-admin-text-muted text-base mt-1 ml-12">
                            Gestiona tots els aspectes de la plataforma de viatges
                        </p>
                    </div>

                    {/* Graella d'estadístiques */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <StatCard
                            title="Experiències"
                            value={experiencesCount}
                            icon="✈️"
                            accent="#C0634A"
                            trend="+12% aquest mes"
                            href={route('admin.experiences')}
                        />
                        <StatCard
                            title="Usuaris"
                            value={usersCount}
                            icon="👥"
                            accent="#4A7C6F"
                            trend="+8% aquest mes"
                            href={route('admin.users')}
                        />
                        <StatCard
                            title="Categories"
                            value={categoriesCount}
                            icon="📂"
                            accent="#8B7335"
                            trend="Configurades"
                            href={route('admin.categories')}
                        />
                        <StatCard
                            title="Reports pendents"
                            value={reportsCount}
                            icon="⚠️"
                            accent={reportsCount > 0 ? '#C0634A' : '#7A6050'}
                            trend={reportsCount > 0 ? 'Revisió necessària' : 'Cap reports'}
                            href={route('admin.reports')}
                        />
                    </div>

                    {/* Graella de contingut principal */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Accions ràpides */}
                        <div className="lg:col-span-2">
                            <div className="bg-admin-surface rounded-xl p-6 border border-admin-border shadow-sm">
                                <h3 className="text-lg font-bold text-admin-text mb-5 flex items-center gap-2"
                                    style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    <span>⚡</span> Accions ràpides
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <QuickAction
                                        href={route('admin.categories')}
                                        icon="📂"
                                        label="Gestionar categories"
                                        description="Crear, editar i eliminar categories"
                                        color="#8B7335"
                                    />
                                    <QuickAction
                                        href={route('admin.experiences')}
                                        icon="✈️"
                                        label="Gestionar experiències"
                                        description="Moderar i editar experiències"
                                        color="#C0634A"
                                    />
                                    <QuickAction
                                        href={route('admin.reports')}
                                        icon="⚠️"
                                        label="Revisar reports"
                                        description={reportsCount > 0 ? `${reportsCount} reports pendents` : 'Cap report pendent'}
                                        color={reportsCount > 0 ? '#C0634A' : '#7A6050'}
                                    />
                                    <QuickAction
                                        href={route('admin.users')}
                                        icon="👥"
                                        label="Gestionar usuaris"
                                        description="Bandejar i eliminar usuaris"
                                        color="#4A7C6F"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Estat del sistema */}
                        <div className="bg-admin-surface rounded-xl p-6 border border-admin-border shadow-sm">
                            <h3 className="text-lg font-bold text-admin-text mb-5 flex items-center gap-2"
                                style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                <span>🟢</span> Estat del sistema
                            </h3>
                            <div className="space-y-4">
                                <StatusRow icon="🟢" label="Plataforma activa" ok />
                                <StatusRow icon="🟢" label="Moderació activa" ok />
                                <StatusRow
                                    icon={reportsCount > 0 ? '🔴' : '🟢'}
                                    label={reportsCount > 0 ? `${reportsCount} reports pendents` : 'Cap report pendent'}
                                    ok={reportsCount === 0}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Peu informatiu */}
                    <div className="bg-admin-surface rounded-xl p-6 border border-admin-border shadow-sm">
                        <h3 className="text-lg font-bold text-admin-text mb-5 flex items-center gap-2"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            <span>📈</span> Resum de la plataforma
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InfoStat
                                label="Categories disponibles"
                                value={categoriesCount}
                                color="#8B7335"
                            />
                            <InfoStat
                                label="Usuaris registrats"
                                value={usersCount}
                                color="#4A7C6F"
                            />
                            <InfoStat
                                label="Experiències actives"
                                value={experiencesCount}
                                color="#C0634A"
                            />
                        </div>
                    </div>

                </div>
            </AdminLayout>
        </>
    );
}

function StatCard({ title, value, icon, accent, trend, href }) {
    return (
        <Link
            href={href}
            className="block rounded-xl p-6 text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)` }}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-white/80 text-sm font-semibold mb-2">{title}</p>
                    <p className="text-4xl font-bold">{value}</p>
                </div>
                <span className="text-4xl opacity-85">{icon}</span>
            </div>
            <p className="text-white/70 text-xs font-medium">{trend} →</p>
        </Link>
    );
}

function QuickAction({ href, icon, label, description, color }) {
    return (
        <Link
            href={href}
            className="flex items-start gap-3 p-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            style={{
                background: `rgba(${hexToRgb(color)}, 0.06)`,
                border: `1px solid rgba(${hexToRgb(color)}, 0.18)`,
            }}
            onMouseEnter={e => {
                e.currentTarget.style.background = `rgba(${hexToRgb(color)}, 0.12)`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.background = `rgba(${hexToRgb(color)}, 0.06)`;
            }}
        >
            <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
            <div>
                <p className="font-semibold text-sm text-admin-text">{label}</p>
                <p className="text-xs text-admin-text-muted mt-0.5">{description}</p>
            </div>
        </Link>
    );
}

function StatusRow({ icon, label }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: '#EDE0CC' }}>
            <span className="text-sm">{icon}</span>
            <span className="text-sm font-medium text-admin-text">{label}</span>
        </div>
    );
}

function InfoStat({ label, value, color }) {
    return (
        <div
            className="pl-4 py-2"
            style={{ borderLeft: `4px solid ${color}` }}
        >
            <p className="text-admin-text-muted text-sm mb-1">{label}</p>
            <p className="text-3xl font-bold" style={{ color }}>{value}</p>
        </div>
    );
}

// Helper to convert hex to rgb for rgba()
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}
