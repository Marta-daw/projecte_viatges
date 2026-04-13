import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ExperienceEdit({ auth, experience, categories = [] }) {
    const [imagePreview, setImagePreview] = useState(experience.image_url || null);

    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        title: experience.title || '',
        body: experience.body || '',
        status: experience.status || 'esborrany',
        latitude: experience.latitude || '',
        longitude: experience.longitude || '',
        category_id: experience.categories?.[0]?.id || '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.experiences.update', experience.id), {
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
    };

    return (
        <>
            <Head title={`Editar: ${experience.title}`} />
            <AdminLayout user={auth.user}>
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="pb-5" style={{ borderBottom: '2px solid #cfbfa4' }}>
                        <div className="flex items-center gap-3 mb-1">
                            <Link
                                href={route('admin.experiences')}
                                className="flex items-center justify-center w-9 h-9 rounded-lg text-lg transition-all duration-200 hover:-translate-y-0.5"
                                style={{ background: '#EDE4D3', color: '#3D2010' }}
                                title="Tornar a experiències"
                            >
                                ←
                            </Link>
                            <div>
                                <h2 className="text-admin-text" style={{ fontSize: '1.7rem', fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}>
                                    ✏️ Editar Experiència
                                </h2>
                                <p className="text-admin-text-muted text-sm mt-0.5">
                                    #{experience.id} · creada per <strong>{experience.user?.name || 'Anònim'}</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Left: main fields */}
                            <div className="lg:col-span-2 space-y-5">

                                {/* Title */}
                                <FormCard title="Informació principal">
                                    <div className="space-y-4">
                                        <FormField label="Títol *" error={errors.title}>
                                            <input
                                                type="text"
                                                value={data.title}
                                                onChange={e => setData('title', e.target.value)}
                                                className="admin-input"
                                                placeholder="Títol de l'experiència"
                                                style={inputStyle}
                                            />
                                        </FormField>

                                        <FormField label="Descripció *" error={errors.body}>
                                            <textarea
                                                value={data.body}
                                                onChange={e => setData('body', e.target.value)}
                                                rows={8}
                                                className="admin-input"
                                                placeholder="Descripció detallada de l'experiència..."
                                                style={{ ...inputStyle, resize: 'vertical' }}
                                            />
                                        </FormField>
                                    </div>
                                </FormCard>

                                {/* Location */}
                                <FormCard title="📍 Ubicació">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField label="Latitud" error={errors.latitude}>
                                            <input
                                                type="number"
                                                step="any"
                                                value={data.latitude}
                                                onChange={e => setData('latitude', e.target.value)}
                                                placeholder="41.3851"
                                                style={inputStyle}
                                            />
                                        </FormField>
                                        <FormField label="Longitud" error={errors.longitude}>
                                            <input
                                                type="number"
                                                step="any"
                                                value={data.longitude}
                                                onChange={e => setData('longitude', e.target.value)}
                                                placeholder="2.1734"
                                                style={inputStyle}
                                            />
                                        </FormField>
                                    </div>
                                </FormCard>

                            </div>

                            {/* Right: sidebar fields */}
                            <div className="space-y-5">

                                {/* Publish actions */}
                                <FormCard title="🚀 Publicació">
                                    <FormField label="Estat *" error={errors.status}>
                                        <select
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            style={inputStyle}
                                        >
                                            <option value="publicada">✅ Publicada</option>
                                            <option value="esborrany">📋 Esborrany</option>
                                        </select>
                                    </FormField>

                                    {/* Submit */}
                                    <div className="mt-5 space-y-3">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-3 font-bold text-white rounded-lg transition-all duration-200"
                                            style={{
                                                background: processing
                                                    ? '#cfbfa4'
                                                    : 'linear-gradient(135deg, #C0634A, #8B7335)',
                                                cursor: processing ? 'not-allowed' : 'pointer',
                                            }}
                                        >
                                            {processing ? '⏳ Guardant...' : '💾 Guardar canvis'}
                                        </button>

                                        <Link
                                            href={route('admin.experiences')}
                                            className="block w-full py-2.5 text-center rounded-lg font-medium transition-all duration-200 text-admin-text-muted hover:text-admin-text text-sm"
                                            style={{ background: '#EDE4D3' }}
                                        >
                                            Cancel·lar
                                        </Link>
                                    </div>
                                </FormCard>

                                {/* Category */}
                                <FormCard title="📂 Categoria">
                                    <FormField label="Categoria" error={errors.category_id}>
                                        <select
                                            value={data.category_id}
                                            onChange={e => setData('category_id', e.target.value)}
                                            style={inputStyle}
                                        >
                                            <option value="">-- Sense categoria --</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.nombre || cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </FormField>
                                </FormCard>

                                {/* Image */}
                                <FormCard title="🖼️ Imatge">
                                    {imagePreview ? (
                                        <div className="space-y-3">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-lg"
                                                style={{ border: '1px solid #cfbfa4' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="w-full py-2 text-sm rounded-lg font-medium transition-all"
                                                style={{ background: '#FAF6EF', color: '#C0634A', border: '1px solid #C0634A' }}
                                            >
                                                🗑️ Eliminar imatge
                                            </button>
                                        </div>
                                    ) : (
                                        <label
                                            className="flex flex-col items-center justify-center h-32 rounded-lg cursor-pointer transition-all hover:bg-admin-warm"
                                            style={{ border: '2px dashed #cfbfa4', background: '#FAF6EF' }}
                                        >
                                            <span className="text-2xl mb-2">📸</span>
                                            <span className="text-sm text-admin-text-muted">Fes clic per pujar imatge</span>
                                            <span className="text-xs text-admin-text-muted mt-1">JPG, PNG, WebP (màx. 5MB)</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    )}
                                    {errors.image && (
                                        <p className="text-xs mt-2" style={{ color: '#C0634A' }}>{errors.image}</p>
                                    )}
                                </FormCard>

                            </div>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}

function FormCard({ title, children }) {
    return (
        <div
            className="bg-admin-surface rounded-xl p-6 shadow-sm"
            style={{ border: '1px solid #cfbfa4' }}
        >
            {title && (
                <h3
                    className="font-bold text-admin-text mb-4 pb-3"
                    style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.95rem',
                        borderBottom: '1px solid #EDE4D3',
                    }}
                >
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}

function FormField({ label, error, children }) {
    return (
        <div>
            <label
                className="block text-sm font-semibold mb-1.5"
                style={{ color: '#3D2010', fontFamily: 'Montserrat, sans-serif' }}
            >
                {label}
            </label>
            {children}
            {error && (
                <p className="text-xs mt-1" style={{ color: '#C0634A' }}>
                    ⚠ {error}
                </p>
            )}
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '0.6rem 0.875rem',
    borderRadius: '8px',
    border: '1.5px solid #cfbfa4',
    background: '#FAF6EF',
    color: '#1C1C1C',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'Open Sans, sans-serif',
};
