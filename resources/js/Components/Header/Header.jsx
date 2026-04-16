import { usePage } from '@inertiajs/react';
import ApplicationLogo from '../AppLogo/AppLogo';
import AuthDropdown from '../AuthDropdown/AuthDropdown';
import styles from './Header.module.scss';

function Header() {
    const { auth } = usePage().props;

    return (
        <header className={styles.headerGeneral}>
            <div className={styles.logoNomWeb}>
                <ApplicationLogo />
                <h1 className={styles.nomWeb}>Destino Incierto</h1>
            </div>
            <nav className={styles.navHeader}>
                <AuthDropdown user={auth?.user} />
            </nav>
        </header>
    );
}

export default Header;