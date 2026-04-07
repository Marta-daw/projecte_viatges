import React from 'react';
import { useForm } from '@inertiajs/react';
import styles from './AdminHeader.module.scss';

export default function AdminHeader({ user }) {
    const { post } = useForm();

    const handleLogout = () => {
        post(route('logout'));
    };

    return (
        <header className={styles.adminHeader}>
            <div className="flex justify-between items-center h-full px-8">
                {/* Logo/Título */}
                <div className={styles.headerTitle}>
                    <h1 className="text-2xl font-bold">Panel d'Administració</h1>
                </div>

                {/* Información del usuario y logout */}
                <div className={styles.headerUser}>
                    <span className="text-sm text-gray-400">Benvingut, <strong>{user?.name || 'Admin'}</strong></span>
                    <button
                        onClick={handleLogout}
                        className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm transition"
                    >
                        Tancar sessió
                    </button>
                </div>
            </div>
        </header>
    );
}
