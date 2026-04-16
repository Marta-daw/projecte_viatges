import { useForm } from '@inertiajs/react';
import TextInput from '../TextInput';
import PrimaryButton from '../PrimaryButton';
import styles from './FormLogin.module.scss';

export default function FormLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <form onSubmit={submit} className={styles.formContainer}>
            <div className={styles.header}>
                <h3>Ja tens compte?</h3>
                <p>Inicia sessió per gestionar les teves experiències.</p>
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Correu electrònic</label>
                <TextInput
                    className={styles.input}
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Contrasenya</label>
                <TextInput
                    className={styles.input}
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.rememberMe}>
                <label>
                    <input
                        type="checkbox"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span>Recorda'm</span>
                </label>
            </div>

            <div className={styles.actions}>
                <PrimaryButton className={styles.submitBtn} disabled={processing}>
                    Entrar
                </PrimaryButton>
            </div>
        </form>
    );
}