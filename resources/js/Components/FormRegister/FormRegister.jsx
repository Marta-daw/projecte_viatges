import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import TextInput from '../TextInput';
import PrimaryButton from '../PrimaryButton';
import styles from './FormRegister.module.scss';

export default function FormRegister() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [clientError, setClientError] = useState('');

    const submit = (e) => {
        e.preventDefault();
        setClientError('');

        if (data.password !== data.password_confirmation) {
            setClientError('Les contrasenyes no coincideixen.');
            return;
        }

        post(route('register'));
    };

    return (
        <form onSubmit={submit} className={styles.formContainer}>
            <div className={styles.header}>
                <h3>Registrar-se</h3>
                <p>Uneix-te a la nostra comunitat.</p>
            </div>

            {clientError && <div className={styles.clientError}>{clientError}</div>}

            <div className={styles.inputGroup}>
                <label className={styles.label}>Nom</label>
                <TextInput
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    className={styles.input}
                    minLength={3}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <TextInput
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    className={styles.input}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Contrasenya</label>
                <TextInput
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                    className={styles.input}
                    minLength={8}
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>Confirmar contrasenya</label>
                <TextInput
                    type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.actions}>
                <PrimaryButton className={styles.submitBtn} disabled={processing}>
                    Registra't
                </PrimaryButton>
            </div>
        </form>
    );
}