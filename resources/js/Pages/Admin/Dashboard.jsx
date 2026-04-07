import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <>
            <Head title="Panel d'Administració" />
            <AdminLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Título */}
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Benvingut al Dashboard</h2>
                        <p className="text-gray-400">Aquí pots gestionar tots els aspectes de la plataforma</p>
                    </div>

                    {/* Grid de estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Experiències"
                            value="0"
                            icon="✈️"
                            color="bg-blue-600"
                        />
                        <StatCard
                            title="Usuaris"
                            value="0"
                            icon="👥"
                            color="bg-green-600"
                        />
                        <StatCard
                            title="Categoríes"
                            value="9"
                            icon="📂"
                            color="bg-purple-600"
                        />
                        <StatCard
                            title="Reportes"
                            value="0"
                            icon="⚠️"
                            color="bg-red-600"
                        />
                    </div>

                    {/* Secciones principales */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-[#1a1d20] rounded-lg p-6 border border-gray-800">
                            <h3 className="text-xl font-semibold text-white mb-4">🔧 Accions ràpides</h3>
                            <div className="space-y-2">
                                <a href={route('admin.categories')} className="block p-3 bg-[#222] hover:bg-[#333] rounded transition text-gray-300">
                                    Gestionar Categoríes
                                </a>
                                <a href="#" className="block p-3 bg-[#222] hover:bg-[#333] rounded transition text-gray-300">
                                    Revisar Experiències
                                </a>
                                <a href="#" className="block p-3 bg-[#222] hover:bg-[#333] rounded transition text-gray-300">
                                    Gestionar Usuaris
                                </a>
                            </div>
                        </div>

                        <div className="bg-[#1a1d20] rounded-lg p-6 border border-gray-800">
                            <h3 className="text-xl font-semibold text-white mb-4">📊 Últim resum</h3>
                            <div className="text-gray-400 space-y-2">
                                <p>✓ Plataforma activa i funcionant</p>
                                <p>✓ {9} categoríes disponibles</p>
                                <p>✓ Sistema de moderació actiu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

function StatCard({ title, value, icon, color }) {
    return (
        <div className={`${color} rounded-lg p-6 text-white shadow-lg`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-white/80 text-sm">{title}</p>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                </div>
                <span className="text-3xl">{icon}</span>
            </div>
        </div>
    );
}
