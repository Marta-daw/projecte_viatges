import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import styles from './AdminSidebar.module.scss';

export default function AdminSidebar({ auth }) {
    const [isOpen, setIsOpen] = useState(true);
    const { url } = usePage();

    const menuItems = [
        { label: 'Dashboard', href: route('admin.dashboard'), icon: '📊' },
        { label: 'Categoríes', href: route('admin.categories'), icon: '📂' },
        { label: 'Experiències', href: route('admin.experiences'), icon: '✈️' },
        { label: 'Usuaris', href: route('admin.users'), icon: '👥' },
        { label: 'Reportes', href: route('admin.reports'), icon: '⚠️' },
    ];

    const isActive = (href) => url === href || url.startsWith(href + '/');

    return (
        <aside className={`${styles.adminSidebar} ${isOpen ? '' : styles.collapsed}`}>
            {/* Top section: logo + toggle */}
            <div className={styles.sidebarTop}>
                {isOpen && (
                    <div className={styles.sidebarLogo}>
                        <span className={styles.logoIcon}>🧭</span>
                        <span className={styles.logoText}>Admin</span>
                    </div>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={styles.toggleBtn}
                    title={isOpen ? 'Reduir menú' : 'Expandir menú'}
                >
                    {isOpen ? '◀' : '▶'}
                </button>
            </div>

            {/* Navigation menu */}
            <nav className={styles.sidebarNav}>
                {menuItems.map((item, index) => (
                    <Link
                        key={`menu-${index}`}
                        href={item.href}
                        className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
                        title={!isOpen ? item.label : undefined}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        {isOpen && <span className={styles.label}>{item.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Footer: system status */}
            <div className={styles.sidebarFooter}>
                <div className={styles.footerDot} title="Sistema actiu"></div>
                {isOpen && <span className={styles.footerText}>Sistema actiu</span>}
            </div>
        </aside>
    );
}
