import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function CategoriesIndex({ auth, categories }) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null); // { id, name }

    // --- Create form ---
    const createForm = useForm({ name: '' });

    const handleCreate = (e) => {
        e.preventDefault();
        createForm.post(route('admin.categories.store'), {
            onSuccess: () => {
                createForm.reset();
                setShowCreateForm(false);
            },
        });
    };

    // --- Edit form ---
    const editForm = useForm({ name: '' });

    const startEdit = (cat) => {
        setEditingCategory(cat);
        editForm.setData('name', cat.nombre || cat.name || '');
    };

    const cancelEdit = () => {
        setEditingCategory(null);
        editForm.reset();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        editForm.put(route('admin.categories.update', editingCategory.id), {
            onSuccess: () => {
                cancelEdit();
            },
        });
    };

    // --- Delete ---
    const deleteForm = useForm();

    const handleDelete = (categoryId) => {
        if (confirm('Estàs segur que vols eliminar aquesta categoria?')) {
            deleteForm.delete(route('admin.categories.destroy', categoryId));
        }
    };

    const displayName = (cat) => cat.nombre || cat.name || '—';

    return (
        <>
            <Head title="Gestió de Categoríes" />
            <AdminLayout user={auth.user}>
                <div className="max-w-3xl mx-auto space-y-6">

                    {/* Header */}
                    <div className="pb-5" style={{ borderBottom: '2px solid #cfbfa4' }}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">📂</span>
                                <div>
                                    <h2 className="text-admin-text" style={{ fontSize: '1.7rem', fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}>
                                        Gestió de Categoríes
                                    </h2>
                                    <p className="text-admin-text-muted text-sm mt-0.5">
                                        {categories?.length ?? 0} categoria{categories?.length !== 1 ? 's' : ''} creades
                                    </p>
                                </div>
                            </div>
                            {!showCreateForm && (
                                <button
                                    onClick={() => setShowCreateForm(true)}
                                    className="flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-sm"
                                    style={{ background: 'linear-gradient(135deg, #C0634A, #8B7335)' }}
                                >
                                    ➕ Nova Categoria
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Create form */}
                    {showCreateForm && (
                        <div
                            className="rounded-xl p-6 shadow-sm"
                            style={{ background: '#FFFFFF', border: '1px solid #cfbfa4' }}
                        >
                            <h3
                                className="font-bold text-admin-text mb-4 pb-3"
                                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', borderBottom: '1px solid #EDE4D3' }}
                            >
                                ➕ Nova Categoria
                            </h3>
                            <form onSubmit={handleCreate}>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        placeholder="Nom de la categoria..."
                                        disabled={createForm.processing}
                                        autoFocus
                                        style={inputStyle}
                                        className="flex-1"
                                    />
                                    <button
                                        type="submit"
                                        disabled={createForm.processing || !createForm.data.name.trim()}
                                        className="px-5 py-2.5 text-white font-semibold rounded-xl transition-all text-sm disabled:opacity-50"
                                        style={{ background: 'linear-gradient(135deg, #C0634A, #8B7335)' }}
                                    >
                                        {createForm.processing ? '⏳ Creant...' : '✅ Crear'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowCreateForm(false); createForm.reset(); }}
                                        disabled={createForm.processing}
                                        className="px-4 py-2.5 rounded-xl font-medium text-sm transition-all"
                                        style={{ background: '#EDE4D3', color: '#3D2010' }}
                                    >
                                        Cancel·lar
                                    </button>
                                </div>
                                {createForm.errors.name && (
                                    <p className="text-sm mt-2" style={{ color: '#C0634A' }}>
                                        ⚠ {createForm.errors.name}
                                    </p>
                                )}
                            </form>
                        </div>
                    )}

                    {/* Edit form */}
                    {editingCategory && (
                        <div
                            className="rounded-xl p-6 shadow-sm"
                            style={{ background: '#FFFFFF', border: '2px solid #8B7335' }}
                        >
                            <h3
                                className="font-bold text-admin-text mb-4 pb-3"
                                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1rem', borderBottom: '1px solid #EDE4D3' }}
                            >
                                ✏️ Editar categoria: <span style={{ color: '#C0634A' }}>{displayName(editingCategory)}</span>
                            </h3>
                            <form onSubmit={handleUpdate}>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        placeholder="Nou nom..."
                                        disabled={editForm.processing}
                                        autoFocus
                                        style={inputStyle}
                                        className="flex-1"
                                    />
                                    <button
                                        type="submit"
                                        disabled={editForm.processing || !editForm.data.name.trim()}
                                        className="px-5 py-2.5 text-white font-semibold rounded-xl transition-all text-sm disabled:opacity-50"
                                        style={{ background: '#8B7335' }}
                                    >
                                        {editForm.processing ? '⏳ Guardant...' : '💾 Guardar'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        disabled={editForm.processing}
                                        className="px-4 py-2.5 rounded-xl font-medium text-sm transition-all"
                                        style={{ background: '#EDE4D3', color: '#3D2010' }}
                                    >
                                        Cancel·lar
                                    </button>
                                </div>
                                {editForm.errors.name && (
                                    <p className="text-sm mt-2" style={{ color: '#C0634A' }}>
                                        ⚠ {editForm.errors.name}
                                    </p>
                                )}
                            </form>
                        </div>
                    )}

                    {/* Categories table */}
                    <div
                        className="rounded-xl overflow-hidden shadow-sm"
                        style={{ background: '#FFFFFF', border: '1px solid #cfbfa4' }}
                    >
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: '2px solid #EDE4D3', background: '#FAF6EF' }}>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#6B3A2A', fontFamily: 'Montserrat, sans-serif' }}>ID</th>
                                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#6B3A2A', fontFamily: 'Montserrat, sans-serif' }}>Nom</th>
                                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider" style={{ color: '#6B3A2A', fontFamily: 'Montserrat, sans-serif' }}>Accions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <tr
                                            key={cat.id}
                                            style={{ borderBottom: '1px solid #F0EAE0' }}
                                            onMouseEnter={e => e.currentTarget.style.background = '#FDF9F5'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td className="px-5 py-4">
                                                <span
                                                    className="font-bold text-xs px-2 py-1 rounded-md"
                                                    style={{ background: '#EDE4D3', color: '#6B3A2A' }}
                                                >
                                                    #{cat.id}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="font-semibold text-sm" style={{ color: '#1C1C1C' }}>
                                                    {displayName(cat)}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => startEdit(cat)}
                                                        className="px-3 py-1.5 text-white rounded-lg font-semibold text-xs transition-all hover:-translate-y-0.5"
                                                        style={{ background: '#8B7335' }}
                                                        title="Editar categoria"
                                                        disabled={deleteForm.processing}
                                                    >
                                                        ✏️ Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(cat.id)}
                                                        className="px-3 py-1.5 text-white rounded-lg font-semibold text-xs transition-all hover:-translate-y-0.5"
                                                        style={{ background: '#C0634A' }}
                                                        title="Eliminar categoria"
                                                        disabled={deleteForm.processing}
                                                    >
                                                        🗑️ Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-5 py-12 text-center">
                                            <div className="text-4xl mb-3">📂</div>
                                            <p className="text-admin-text-muted text-sm">No hi ha categories creades</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </AdminLayout>
        </>
    );
}

const inputStyle = {
    padding: '0.6rem 0.875rem',
    borderRadius: '8px',
    border: '1.5px solid #cfbfa4',
    background: '#FAF6EF',
    color: '#1C1C1C',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'Open Sans, sans-serif',
};
