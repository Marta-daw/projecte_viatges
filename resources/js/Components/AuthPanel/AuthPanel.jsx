import { useState } from 'react';
import FormLogin from '@/Components/FormLogin/FormLogin';
import FormRegister from '@/Components/FormRegister/FormRegister';
import styles from './AuthPanel.module.scss';

export default function AuthPanel({ onClose }) {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className={styles.panelContainer}>

            <div className={styles.header}>
                <h2 className={styles.title}>Accés d'usuaris</h2>
                <button onClick={onClose} className={styles.closeButton}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <div className={styles.tabs}>
                <button
                    onClick={() => setActiveTab('login')}
                    className={`${styles.tabButton} ${activeTab === 'login' ? styles.active : ''}`}
                >
                    Inicia sessió
                </button>
                <button
                    onClick={() => setActiveTab('register')}
                    className={`${styles.tabButton} ${activeTab === 'register' ? styles.active : ''}`}
                >
                    Registrar-se
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'login' ? <FormLogin /> : <FormRegister />}
            </div>
        </div>
    );
}