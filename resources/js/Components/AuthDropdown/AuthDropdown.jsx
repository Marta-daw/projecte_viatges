import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import FormLogin from '@/Components/FormLogin/FormLogin';
import FormRegister from '@/Components/FormRegister/FormRegister';
import headerStyles from '../Header/Header.module.scss';
import styles from './AuthDropdown.module.scss';

export default function AuthDropdown({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeView, setActiveView] = useState('login');
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const toggle = (view) => {
        setActiveView(view);
        setIsOpen(true);
    };

    const close = () => setIsOpen(false);

    const getInitials = (name) => {
        if (!name) return 'A';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    if (user) {
        return (
            <div className={styles.userDropdownContainer}>
                <button
                    onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                    className={styles.userButton}
                >
                    {user?.avatar_url ? (
                        <img
                            src={user.avatar_url}
                            alt="Avatar"
                            className={styles.avatarImg}
                        />
                    ) : (
                        <div className={styles.avatarFallback}>
                            {getInitials(user?.name)}
                        </div>
                    )}

                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user.name}</span>
                        {user?.role && (
                            <span className={styles.userRole}>
                                {user.role}
                            </span>
                        )}
                    </div>
                </button>

                {isAvatarMenuOpen && (
                    <div className={styles.dropdownMenu}>
                        <Link href={route('profile.edit')} className={styles.dropdownItem}>
                            Perfil
                        </Link>
                        {user?.role === "admin" && (
                            <Link href={route('admin.dashboard')} className={styles.dropdownItem}>
                                Admin Dashboard
                            </Link>
                        )}
                        <Link href={route('logout')} method="post" as="button" className={styles.dropdownItemLogout}>
                            Tancar sessió
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    return (
        <>
            <div className={styles.authButtons}>
                <button type="button" className={headerStyles.buttonNav} onClick={() => toggle('login')}>
                    Inici sessió
                </button>
                <button type="button" className={headerStyles.buttonNav} onClick={() => toggle('register')}>
                    Registrar-se
                </button>
            </div>

            {isOpen && (
                <>
                    <div className={styles.backdrop} onClick={close} aria-hidden="true" />

                    <div role="dialog" aria-modal="true" className={styles.sideDrawer}>
                        <div className={styles.drawerHeader}>
                            <h2>Accés d'usuaris</h2>
                            <button type="button" onClick={close} className={styles.closeButton}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <div className={styles.drawerTabs}>
                            <button
                                className={`${styles.tabButton} ${activeView === 'login' ? styles.activeTab : ''}`}
                                onClick={() => setActiveView('login')}
                            >
                                Inicia sessió
                            </button>
                            <button
                                className={`${styles.tabButton} ${activeView === 'register' ? styles.activeTab : ''}`}
                                onClick={() => setActiveView('register')}
                            >
                                Registrar-se
                            </button>
                        </div>

                        <div className={styles.drawerContent}>
                            {activeView === 'login' ? <FormLogin /> : <FormRegister />}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}