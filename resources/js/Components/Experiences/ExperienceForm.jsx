import React, { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import MapInput from '../MapInput';
import InputLabel from '../InputLabel';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import InputError from '../InputError';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import ImageInput from '../ImageInput';
import SelectOption from '../SelectOption';
import styles from './ExperienceForm.module.scss';

export default function ExperienceForm() {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('Cap arxiu seleccionat');

    // Obtenim categories de les props injectades per Inertia
    const { categories = [], experience = [], isEdit } = usePage().props;

    // Utilitzem els mateixos noms o definim el mapeig abans d'enviar per garantir
    // compatibilitat amb el backend. Es guarda un estat per separat de mapa.
    const { data, setData, put, post, processing, errors, reset, transform } = useForm({
        titol: experience?.title || '',
        descripcio: experience?.body || '',
        imatge: null,
        latitude: experience?.latitude || null,
        longitude: experience?.longitude || null,
        categoria_id: experience?.categoria_id || '',
    });

    const formAction = useRef('publicada');

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

        // Abans d'enviar, transformem els noms de les propietats 
        // per complir el model del servidor (titol -> title, descripcio -> body)
        transform((actualData) => ({
            title: actualData.titol,
            body: actualData.descripcio,
            image: actualData.imatge,
            latitude: actualData.latitude,
            longitude: actualData.longitude,
            category_id: actualData.categoria_id,
            status: formAction.current
        }));

        if (!isEdit) {
            post(route('experiences.store'), {
                forceFormData: true,
                // Neteja l'estat local sols si es publica / desa correctament
                onSuccess: () => {
                    reset();
                    setFileName('Cap arxiu seleccionat');
                    if (fileInputRef.current) {
                        fileInputRef.current.value = null; // Reiniciar l'input de fitxers natiu
                    }
                },
            });
        } else {
            put(route('experiences.update', experience.id), {
                forceFormData: true,
                onSuccess: () => {
                    // No resetejem l'estat en edició, ja que volem mantenir les dades visibles
                    // i permetre múltiples actualitzacions sense perdre la informació carregada.
                },
            });
        }

    }

    return (
        <div className={styles.formWrapper}>
            <h2>{isEdit ? "Editar Experiència" : "Nova Experiència"}</h2>

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
                    {/* Utilitzar nom de base per errors genèrics retornats (title en lloc de titol) */}
                    <InputError message={errors.title || errors.titol} className={styles.errorMsg} />
                </div >

                {/* Descripció */}
                < div className={styles.fieldGroup} >
                    <InputLabel htmlFor="descripcio" value="Descripció" className={styles.label} />
                    <textarea
                        id="descripcio"
                        className={styles.textarea}
                        name="descripcio"
                        value={data.descripcio}
                        onChange={e => setData('descripcio', e.target.value)}
                        placeholder="Descriu l'experiència..."
                    />
                    <InputError message={errors.body || errors.descripcio} className={styles.errorMsg} />
                </div >

                {/* Imatge */}
                < div className={styles.fieldGroup} >
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
                    <InputError message={errors.image || errors.imatge} className={styles.errorMsg} />
                </div >

                {/* Localització (MapInput) */}
                < div className={styles.fieldGroup} >
                    <InputLabel value="Localització" className={styles.label} />
                    {/* Guardar coordenades individualment */}
                    <MapInput
                        onChange={val => {
                            if (val) {
                                setData(data => ({ ...data, latitude: val.lat, longitude: val.lng }));
                            }
                        }}
                    />
                    <InputError message={errors.latitude} className={styles.errorMsg} />
                    <InputError message={errors.longitude} className={styles.errorMsg} />
                </div >

                {/* Categoria */}
                < div className={styles.fieldGroup} >
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
                    <InputError message={errors.category_id} className={styles.errorMsg} />
                </div >

                {/* Buttons wrapper inline direct */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                    <SecondaryButton
                        type="submit"
                        disabled={processing}
                        onClick={() => formAction.current = 'esborrany'}
                        style={{ padding: '0.75rem 1.5rem', fontFamily: 'var(--font-principal)' }}
                    >
                        Guardar Com a Esborrany
                    </SecondaryButton>

                    <PrimaryButton
                        type="submit"
                        className={styles.submitBtn}
                        disabled={processing}
                        onClick={() => formAction.current = 'publicada'}
                        style={{ margin: 0, width: 'auto' }}
                    >
                        {processing ? 'Desant...' : (isEdit ? 'Guardar Canvis' : 'Publicar Experiència')}
                    </PrimaryButton>
                </div>
            </form >
        </div >
    );
}
