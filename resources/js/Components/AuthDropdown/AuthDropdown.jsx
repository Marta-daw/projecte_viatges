import { useState } from 'react';
import { Link } from '@inertiajs/react';
import styles from './AuthDropdown.module.scss';

export default function AuthDropdown({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.dropdownContainer}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.dropdownButton}
            >
                {user.name}
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <Link href={route('profile.edit')} className={styles.dropdownItem}>
                        Perfil
                    </Link>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className={styles.dropdownItem}
                    >
                        Tancar sessió
                    </Link>
                </div>
            )}
        </div>
    );
}