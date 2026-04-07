import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import styles from './AdminSidebar.module.scss';

export default function AdminSidebar({ auth }) {
    const [isOpen, setIsOpen] = useState(true);
    const { url } = usePage();

    const menuItems = [
        { label: 'Dashboard', href: route('admin.dashboard'), icon: '📊' },
        { label: 'Categoríes', href: route('admin.categories'), icon: '📂' },
        { label: 'Experiències', href: '#', icon: '✈️' },
        { label: 'Usuaris', href: '#', icon: '👥' },
        { label: 'Reportes', href: '#', icon: '⚠️' },
    ];

    return (
        <aside className={`${styles.adminSidebar} ${isOpen ? '' : styles.collapsed}`}>
            {/* Botó para colapsar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.toggleBtn}
                title="Ocultar/Mostrar menú"
            >
                {isOpen ? '◀' : '▶'}
            </button>

            {/* Menú de navegación */}
            <nav className={styles.sidebarNav}>
                {menuItems.map((item, index) => (
                    <Link
                        key={`menu-${index}`}
                        href={item.href}
                        className={`${styles.navItem} ${url === item.href ? 'active' : ''}`}
                        title={item.label}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        {isOpen && <span className={styles.label}>{item.label}</span>}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
