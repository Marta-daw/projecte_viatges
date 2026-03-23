import React, { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import MapInput from '../MapInput';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import InputError from '../InputError';
import PrimaryButton from '../PrimaryButton';
import ImageInput from '../ImageInput';
import SelectOption from '../SelectOption';
import styles from './ExperienceForm.module.scss';

export default function ExperienceForm() {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('Cap arxiu seleccionat');
    
    // Obtenim categories de les props injectades per Inertia
    const { categories = [] } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        titol: '',
        descripcio: '',
        imatge: null,
        localitzacio: '',
        categoria_id: '',
    });

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData('imatge', file);
            setFileName(file.name);
        } else {
            setData('imatge', null);
            setFileName('Cap arxiu seleccionat');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route('experiencies.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    }

    return (
        <div className={styles.formWrapper}>
            <h2>Nova Experiència</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">

                {/* Títol */}
                <div className={styles.fieldGroup}>
                    <InputLabel htmlFor="titol" value="Títol" className={styles.label} />
                    <TextInput
                        id="titol"
                        className={styles.input}
                        type="text"
                        name="titol"
                        value={data.titol}
                        onChange={e => setData('titol', e.target.value)}
                        placeholder="Escriu el títol de l'experiència..."
                    />
                    <InputError message={errors.titol} className={styles.errorMsg} />
                </div>

                {/* Descripció */}
                <div className={styles.fieldGroup}>
                    <InputLabel htmlFor="descripcio" value="Descripció" className={styles.label} />
                    <textarea
                        id="descripcio"
                        className={styles.textarea}
                        name="descripcio"
                        value={data.descripcio}
                        onChange={e => setData('descripcio', e.target.value)}
                        placeholder="Descriu l'experiència..."
                    />
                    <InputError message={errors.descripcio} className={styles.errorMsg} />
                </div>

                {/* Imatge */}
                <div className={styles.fieldGroup}>
                    <InputLabel value="Imatge" className={styles.label} />
                    <div className={styles.fileInputWrapper}>
                        <InputLabel htmlFor="imatge" value="Triar arxiu" className={styles.fileInputLabel} />
                        <ImageInput
                            id="imatge"
                            className={styles.fileInput}
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <span className={styles.fileName}>{fileName}</span>
                    </div>
                    <InputError message={errors.imatge} className={styles.errorMsg} />
                </div>

                {/* Localització (MapInput) */}
                <div className={styles.fieldGroup}>
                    <InputLabel value="Localització" className={styles.label} />
                    <MapInput
                        value={data.localitzacio}
                        onChange={val => setData('localitzacio', val)}
                    />
                    <InputError message={errors.localitzacio} className={styles.errorMsg} />
                </div>

                {/* Categoria */}
                <div className={styles.fieldGroup}>
                    <InputLabel htmlFor="categoria" value="Categoria" className={styles.label} />
                    <SelectInput
                        id="categoria"
                        className={styles.select}
                        name="categoria_id"
                        value={data.categoria_id}
                        onChange={e => setData('categoria_id', e.target.value)}
                    >
                        <SelectOption value="">Selecciona una categoria...</SelectOption>
                        {categories && categories.map(cat => (
                            <SelectOption key={cat.id} value={cat.id}>{cat.name}</SelectOption>
                        ))}
                    </SelectInput>
                    <InputError message={errors.categoria_id} className={styles.errorMsg} />
                </div>

                <PrimaryButton className={styles.submitBtn} disabled={processing}>
                    {processing ? 'Guardant...' : 'Crear Experiència'}
                </PrimaryButton>
            </form>
        </div>
    );
}
