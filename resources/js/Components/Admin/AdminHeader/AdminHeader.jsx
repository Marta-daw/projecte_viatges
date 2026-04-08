import React, { useState, useRef, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import styles from './AdminHeader.module.scss';

export default function AdminHeader({ user }) {
    const { post } = useForm();
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
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
            {/* Left: Logo/Title */}
            <div className={styles.headerLeft}>
                <div className={styles.logo}>🧭</div>
                <h1>Panel d'Administració</h1>
            </div>

            {/* Center: empty space for future search */}
            <div className={styles.headerCenter}></div>

            {/* Right: Time + User Dropdown */}
            <div className={styles.headerRight}>
                {/* Time indicator */}
                <div className={styles.timeInfo}>
                    <span>🕐</span>
                    <span>{formatTime(currentTime)}</span>
                </div>

                <div className={styles.separator}></div>

                {/* User dropdown — like AuthenticatedLayout */}
                <div className={styles.userDropdown} ref={dropdownRef}>
                    <button
                        className={styles.dropdownTrigger}
                        onClick={() => setDropdownOpen(prev => !prev)}
                        type="button"
                    >
                        <div className={styles.avatar}>
                            {getInitials(user?.name || 'A')}
                        </div>
                        <div className={styles.userDetails}>
                            <p className={styles.userName}>{user?.name || 'Administrador'}</p>
                            <p className={styles.userRole}>Admin</p>
                        </div>
                        <svg
                            className={`${styles.chevron} ${dropdownOpen ? styles.open : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            width="14"
                            height="14"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            {/* User info header */}
                            <div className={styles.dropdownHeader}>
                                <p className={styles.dropdownName}>{user?.name || 'Administrador'}</p>
                                <p className={styles.dropdownEmail}>{user?.email || 'admin@example.com'}</p>
                            </div>

                            {/* Menu items */}
                            <Link
                                href={route('profile.edit')}
                                className={styles.dropdownItem}
                                onClick={() => setDropdownOpen(false)}
                            >
                                <span className={styles.itemIcon}>👤</span>
                                El meu perfil
                            </Link>

                            <Link
                                href={route('HomeViatges')}
                                className={styles.dropdownItem}
                                onClick={() => setDropdownOpen(false)}
                            >
                                <span className={styles.itemIcon}>🌍</span>
                                Veure lloc web
                            </Link>

                            <div className={styles.dropdownDivider}></div>

                            <button
                                onClick={handleLogout}
                                className={`${styles.dropdownItem} ${styles.danger}`}
                            >
                                <span className={styles.itemIcon}>🚪</span>
                                Tancar sessió
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
