import PrimaryButton from '../PrimaryButton';
import TextInput from '../TextInput';
import styles from './FormLogin.module.scss'

export default function FormLogin() {
    return (

        <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Iniciar Sessió</h2>
            <p>Nom o email</p>
            <TextInput className={styles.inputLogin} />
            <p>Contrasenya</p>
            <TextInput className={styles.inputLogin} />
            <div>
                <PrimaryButton className={styles.buttonLogin}>
                    Iniciar Sessió
                </PrimaryButton>
            </div>
        </div>

    );
}
