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
        <form onSubmit={submit} className={styles.loginContainer || "form-login"}>
            <h2 className={styles.loginTitle || ""}>Inici de sessió</h2>

            <p>Correu electrònic</p>
            <TextInput
                className={styles.inputLogin}
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
            />
            {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}

            <p>Contrasenya</p>
            <TextInput
                className={styles.inputLogin}
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
            />
            {errors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</span>}

            <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span style={{ marginLeft: '8px', fontSize: '0.9rem' }}>Recorda'm</span>
                </label>
            </div>

            <div>
                <PrimaryButton className={styles.buttonLogin || ""} disabled={processing}>
                    Entrar
                </PrimaryButton>
            </div>
        </form>
    );
}