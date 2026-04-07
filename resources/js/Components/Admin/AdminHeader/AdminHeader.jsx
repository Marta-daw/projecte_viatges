import React from 'react';
import { useForm } from '@inertiajs/react';
import styles from './AdminHeader.module.scss';

export default function AdminHeader({ user }) {
    const { post } = useForm();
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Actualizar cada minuto

        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        post(route('logout'));
    };

    const formatTime = (date) => {
        return date.toLocaleString('ca-ES', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: 'short',
        });
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className={styles.adminHeader}>
            <div className="flex justify-between items-center h-full px-8 bg-admin-surface border-b border-admin-border">
                {/* Left: Logo/Title */}
                <div className={styles.headerLeft}>
                    <h1 className="text-2xl font-bold text-admin-text">
                        ⚙️ Panel d'Administració
                    </h1>
                </div>

                {/* Center: Search (placeholder para futuro) */}
                <div className={styles.headerCenter}>
                    {/* Espacio reservado para búsqueda en el futuro */}
                </div>

                {/* Right: User Info & Actions */}
                <div className={styles.headerRight}>
                    {/* Time/Date */}
                    <div className={styles.timeInfo}>
                        <span className="text-xs text-admin-text-muted">
                            {formatTime(currentTime)}
                        </span>
                    </div>

                    {/* Separator */}
                    <div className={styles.separator}></div>

                    {/* User Avatar & Name */}
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            {getInitials(user?.name || 'A')}
                        </div>
                        <div className={styles.userDetails}>
                            <p className={styles.userName}>
                                {user?.name || 'Administrador'}
                            </p>
                            <p className={styles.userEmail}>
                                {user?.email || 'admin@example.com'}
                            </p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className={styles.logoutBtn}
                        title="Tancar sessió"
                    >
                        <span className={styles.logoutIcon}>🚪</span>
                        <span className={styles.logoutText}>Tancar sessió</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
