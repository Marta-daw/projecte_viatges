import TextInput from '../TextInput';
import styles from './FormRegister.module.scss'
import PrimaryButton from '../PrimaryButton';

export default function FormRegister() {
    return (

        <div className={styles.registerContainer}>
            <h2 className={styles.registerTitle}>Registrar-se</h2>
            <p>Nom</p>
            <TextInput className={styles.inputLogin} />
            <p>Email</p>
            <TextInput className={styles.inputLogin} />
            <p>contrasenya</p>
            <TextInput className={styles.inputLogin} />
            <div>
                <PrimaryButton className={styles.buttonRegister}>
                    Registra't
                </PrimaryButton>
            </div>
        </div>

    );
}