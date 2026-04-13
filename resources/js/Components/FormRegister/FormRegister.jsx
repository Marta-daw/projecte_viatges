import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import TextInput from '../TextInput';
import styles from './FormRegister.module.scss'
import PrimaryButton from '../PrimaryButton';

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
        <form onSubmit={submit} className={styles.registerContainer}>
            <h2 className={styles.registerTitle}>Registrar-se</h2>

            {clientError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{clientError}</p>}

            <p>Nom</p>
            <TextInput
                className={styles.inputRegister}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                minLength={3}
            />
            {errors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</span>}

            <p>Email</p>
            <TextInput
                className={styles.inputRegister}
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
            />
            {errors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.email}</span>}

            <p>Contrasenya</p>
            <TextInput
                className={styles.inputRegister}
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
                minLength={8}
            />
            {errors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{errors.password}</span>}

            <p>Confirmar contrasenya</p>
            <TextInput
                className={styles.inputRegister}
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
            />

            <div>
                <PrimaryButton className={styles.buttonRegister} disabled={processing}>
                    Registra't
                </PrimaryButton>
            </div>
        </form>
    );
}