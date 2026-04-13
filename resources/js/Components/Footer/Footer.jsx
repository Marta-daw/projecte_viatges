import { Link } from '@inertiajs/react';
import styles from './Footer.module.scss';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3>Navegació</h3>
                    <nav>
                        <Link href={route('home')}>Inici</Link>
                        <Link href={route('experiences.index')}>Experiències</Link>
                    </nav>
                </div>

                <div className={styles.footerSection}>
                    <h3>Contacte</h3>
                    <p>Correu: info@destinoincierto.com</p>
                    <p>Telèfon: +34 600 000 000</p>
                    <p>Adreça: Mataró, Catalunya</p>
                </div>

                <div className={styles.footerSection}>
                    <h3>Legal</h3>
                    <Link href="#">Avís Legal</Link>
                    <Link href="#">Política de Privacitat</Link>
                    <Link href="#">Condicions d'ús</Link>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; {currentYear} Destino Incierto. Tots els drets reservats.</p>
            </div>
        </footer>
    );
}