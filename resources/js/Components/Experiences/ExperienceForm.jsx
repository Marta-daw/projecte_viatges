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
    const { data, setData, put, post, processing, errors, setError, clearErrors, reset, transform } = useForm({
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
            // Validar que l'arxiu no superi els 5MB (5 * 1024 * 1024 bytes)
            if (file.size > 5 * 1024 * 1024) {
                setError('imatge', 'L\'arxiu és massa gran. El tamany màxim permès és de 5MB.');
                setData('imatge', null);
                setFileName('Cap arxiu seleccionat');
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
                return;
            } else {
                clearErrors('imatge');
            }

            setData('imatge', file);
            setFileName(file.name);
        } else {
            setData('imatge', null);
            setFileName('Cap arxiu seleccionat');
            clearErrors('imatge');
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
        //<div className={styles.formWrapper}>
        <div className="max-w-2xl mx-auto my-8 mb-12 px-10 py-8 rounded-xl border shadow-sm"
            style={{ backgroundColor: 'var(--warm-sand)', borderColor: 'var(--medium-bronze)' }}>

            <h2 className="text-center font-bold mb-7 tracking-wide"
                style={{ fontFamily: 'var(--font-principal)', color: 'var(--brown-compass)', fontSize: 'var(--font-size-xxl)' }}>
                {isEdit ? "Editar Experiència" : "Nova Experiència"}
            </h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">

                {/* Títol */}
                <div className="flex flex-col gap-1 mb-5">
                    <InputLabel htmlFor="titol" value="Títol" className="text-sm font-semibold uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-principal)', color: 'var(--brown-compass)' }} />
                    <TextInput
                        id="titol"
                        className="w-full rounded-lg px-3 py-2 border outline-none transition"
                        style={{ fontFamily: 'var(--font-secundaria)', backgroundColor: 'var(--ivory-beige)', borderColor: 'var(--warm-sand-darker)' }}
                        type="text"
                        name="titol"
                        value={data.titol}
                        onChange={e => setData('titol', e.target.value)}
                        placeholder="Escriu el títol de l'experiència..."
                    />
                    {/* Utilitzar nom de base per errors genèrics retornats (title en lloc de titol) */}
                    <InputError message={errors.title || errors.titol} className="text-xs mt-1" style={{ color: 'var(--accent-color)' }} />
                </div >

                {/* Descripció */}
                < div className={styles.fieldGroup} >
                    <InputLabel htmlFor="descripcio" value="Descripció" className="text-sm font-semibold uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-principal)', color: 'var(--brown-compass)' }} />
                    <textarea
                        id="descripcio"
                        className="w-full rounded-lg px-3 py-2 border outline-none transition resize-y min-h-28"
                        style={{ fontFamily: 'var(--font-secundaria)', backgroundColor: 'var(--ivory-beige)', borderColor: 'var(--warm-sand-darker)' }}
                        name="descripcio"
                        value={data.descripcio}
                        onChange={e => setData('descripcio', e.target.value)}
                        placeholder="Descriu l'experiència..."
                    />
                    <InputError message={errors.body || errors.descripcio} className="text-xs mt-1" style={{ color: 'var(--accent-color)' }} />
                </div >

                {/* Imatge */}
                < div className="flex flex-col gap-1 mb-5" >
                    <InputLabel value="Imatge" className="text-sm font-semibold uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-principal)', color: 'var(--brown-compass)' }} />
                    <div className="flex items-center gap-3">
                        <InputLabel htmlFor="imatge" value="Triar arxiu" className={styles.fileInputLabel} />
                        <ImageInput
                            id="imatge"
                            className="hidden"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <span className="text-md italic truncate max-w-xs"
                            style={{ color: 'var(--earth-grey)' }}>{fileName}</span>
                    </div>
                    <InputError message={errors.image || errors.imatge} className="text-xs mt-1" style={{ color: 'var(--accent-color)' }} />
                </div >

                {/* Localització (MapInput) */}
                < div className="flex flex-col gap-1 mb-5" >
                    <InputLabel value="Localització" className="text-sm font-semibold uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-principal)', color: 'var(--brown-compass)' }} />
                    {/* Guardar coordenades individualment */}
                    <MapInput
                        onChange={val => {
                            if (val) {
                                setData(data => ({ ...data, latitude: val.lat, longitude: val.lng }));
                            }
                        }}
                    />
                    <InputError message={errors.latitude} className="text-xs mt-1" style={{ color: 'var(--accent-color)' }} />
                    <InputError message={errors.longitude} className="text-xs mt-1" style={{ color: 'var(--accent-color)' }} />
                </div >

                {/* Categoria */}
                < div className="flex flex-col gap-1 mb-5" >
                    <InputLabel htmlFor="categoria" value="Categoria" className="text-sm font-semibold uppercase tracking-wider"
                        style={{ fontFamily: 'var(--font-principal)', color: 'var(--brown-compass)' }} />
                    <SelectInput
                        id="categoria"
                        className="w-full rounded-lg px-3 py-3 border outline-none transition cursor-pointer appearance-none"
                        style={{ fontFamily: 'var(--font-secundaria)', backgroundColor: 'var(--ivory-beige)', borderColor: 'var(--warm-sand-darker)' }}
                        name="categoria_id"
                        value={data.categoria_id}
                        onChange={e => setData('categoria_id', e.target.value)}
                    >
                        <SelectOption value="">Selecciona una categoria...</SelectOption>
                        {categories && categories.map(cat => (
                            <SelectOption key={cat.id} value={cat.id}>{cat.name}</SelectOption>
                        ))}
                    </SelectInput>
                    <InputError message={errors.category_id} className="text-xs mt-1" style={{ color: 'var(--accent-color)' }} />
                </div >

                {/* Buttons wrapper */}
                <div className="flex flex-wrap justify-end gap-4 mt-6">
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
                        style={{ margin: 0, width: 'auto', fontFamily: 'var(--font-principal)' }}
                    >
                        {processing ? 'Desant...' : (isEdit ? 'Guardar Canvis' : 'Publicar Experiència')}
                    </PrimaryButton>
                </div>
            </form >
        </div >
    );
}
