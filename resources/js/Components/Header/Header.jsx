import { useState } from 'react';
import ApplicationLogo from '../AppLogo/AppLogo';
import styles from './Header.module.scss';

function Header() {
    return (
        <header className={styles.headerGeneral}>
            <div className={styles.logoNomWeb}>
                <ApplicationLogo />
                <h1 className={styles.nomWeb}>Destino Incierto</h1>
            </div>
            <nav className={styles.navHeader}>
                <>
                    <a href="#"> Iniciar Sessió </a>
                    <a href="#"> Registrar-se </a>
                </>
                {/* {auth?.user ? (
                    <>
                        <a href="#"> Inici </a>
                        <a href="#"> Experiencies </a>
                        <a href="#"> Viatges </a>
                        <a href="#"> Perfil </a>
                    </>

                ) : (
                    <>
                        <a href="#"> Iniciar Sessió </a>
                        <a href="#"> Registrar-se </a>
                    </>
                )} */}
            </nav>
        </header>
    );
}

export default Header;