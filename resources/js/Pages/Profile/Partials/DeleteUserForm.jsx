import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import styles from './Partials.module.scss';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={` ${styles.updateProfile}`}>
            <header className={styles.headerSection}>
                <h2 className={`text-lg font-medium text-gray-900 ${styles.titleSection}`}>
                    Eliminar el compte
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Un cop eliminada el teu compte, tots els recursos i dades
                    s'eliminaràn permanentment. Abans d'eliminar el teu compte,
                    descarrega qualsevol dada o informació que desitgis conservar.
                </p>
            </header>

            {/* <div className="ml-6 mb-6" style={{ marginBottom: '1rem' }}> */}
            <div className={`pt-0 px-6 space-y-6 ${styles.deleteSection}`}>
                <DangerButton onClick={confirmUserDeletion}>
                    Eliminar el compte
                </DangerButton>
            </div>
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Estàs segur que vols eliminar el teu compte?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Un cop eliminada el teu compte, tots els recursos i dades
                        s'eliminaràn permanentment. Si us plau, introdueix la teva
                        contrasenya per confirmar que vols eliminar permanentment
                        el teu compte.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Contrasenya"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Eliminar el compte
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
