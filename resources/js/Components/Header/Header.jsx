import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '../AppLogo/AppLogo';
import AuthDropdown from '../AuthDropdown/AuthDropdown';
import styles from './Header.module.scss';

function Header() {
    const { auth } = usePage().props;

    return (
        <header className={styles.headerGeneral}>
            <div className={styles.logoNomWeb}>
                <Link href="/" className={styles.logoLink}>
                    <ApplicationLogo />
                    <h1 className={styles.nomWeb}>Destino Incierto</h1>
                </Link>
            </div>

            <nav className={styles.navHeader}>
                {auth?.user ? (
                    <AuthDropdown user={auth.user} />
                ) : (
                    <div className={styles.authLinks}>
                        <Link href={route('login')} className={styles.authLink}>
                            Inicia sessió
                        </Link>
                        <Link href={route('register')} className={styles.authLink}>
                            Registra't
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;