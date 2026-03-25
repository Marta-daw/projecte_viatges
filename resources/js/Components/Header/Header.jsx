import ApplicationLogo from '../AppLogo/AppLogo';
import AuthDropdown from '../AuthDropdown/AuthDropdown';
import styles from './Header.module.scss';

function Header() {
    return (
        <header className={styles.headerGeneral}>
            <div className={styles.logoNomWeb}>
                <ApplicationLogo />
                <h1 className={styles.nomWeb}>Destino Incierto</h1>
            </div>
            <nav className={styles.navHeader}>
                <AuthDropdown />
            </nav>
        </header>
    );
}

export default Header;