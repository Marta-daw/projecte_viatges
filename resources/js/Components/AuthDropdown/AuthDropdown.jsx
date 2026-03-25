import { useEffect, useRef, useState } from 'react';
import FormLogin from '@/Components/FormLogin/FormLogin';
import FormRegister from '@/Components/FormRegister/FormRegister';
import headerStyles from '../Header/Header.module.scss';
import styles from './AuthDropdown.module.scss';

export default function AuthDropdown() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeView, setActiveView] = useState('login');

    const toggle = (view) => {
        if (!isOpen) {
            setActiveView(view);
            setIsOpen(true);
            return;
        }

        if (activeView === view) {
            setIsOpen(false);
            return;
        }

        setActiveView(view);
    };

    const close = () => setIsOpen(false);

    return (
        <>
            <div className={styles.authDropdown}>
                <button type="button" className={headerStyles.buttonNav} onClick={() => toggle('login')}>
                    Inici sessió
                </button>
                <button type="button" className={headerStyles.buttonNav} onClick={() => toggle('register')}>
                    Registrar-se
                </button>
            </div>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className={styles.backdrop} onClick={close} aria-hidden="true" />

                    {/* Modal */}
                    <div role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3 id="auth-modal-title">
                                {activeView === 'login' ? 'Inici de sessió' : 'Registrar-se'}
                            </h3>
                            <button type="button" onClick={close} className={styles.closeButton}>
                                ✕
                            </button>
                        </div>
                        <div className={styles.modalContent}>
                            {activeView === 'login' ? <FormLogin /> : <FormRegister />}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}