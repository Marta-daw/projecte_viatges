import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CategoriesIndex({ auth, categories }) {
    const [showForm, setShowForm] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const createForm = useForm({ name: '' })
    const editForm = useForm({ name: '' })
    const deleteForm = useForm();

    const handleCreate = () => {
        if (!newCategory.trim()) {
            alert('Per favor, entra un nom de categoría');
            return;
        }
        createForm.setData('name', newCategory);
        createForm.post(route('admin.categories.store'), {
            onSuccess: () => {
                createForm.reset();
                setNewCategory('');
                setShowForm(false);
            },
            onError: (errors) => {
                console.error('Error creating category:', errors);
                alert('Error al crear la categoría');
            }
        });
    };

    const handleDelete = (categoryId) => {
        if (confirm('Estàs segur?')) {
            deleteForm.delete(route('admin.categories.destroy', categoryId))
        }
    }



    return (
        <>
            <Head title="Gestió de Categoríes" />
            <AdminLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Encabezado */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white">Gestió de Categoríes</h2>
                            <p className="text-gray-400 mt-1">Crea i modifica les categoríes de les experiències</p>
                        </div>
                        <PrimaryButton onClick={() => setShowForm(true)}>
                            + Nova Categoría
                        </PrimaryButton>
                    </div>

                    {/* Formulari de nova categoria */}
                    {showForm && (
                        <div className="bg-[#1a1d20] rounded-lg p-6 border border-gray-800">
                            <h3 className="text-xl font-semibold text-white mb-4">Nova Categoría</h3>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    placeholder="Nom de la categoría..."
                                    disabled={createForm.processing}
                                    className="flex-1 px-4 py-2 bg-[#0a0a0b] border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                                />
                                <PrimaryButton onClick={handleCreate} disabled={createForm.processing}>
                                    {createForm.processing ? 'Creant...' : 'Crear'}
                                </PrimaryButton>
                                <button
                                    onClick={() => setShowForm(false)}
                                    disabled={createForm.processing}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white transition disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                            </div>
                            {createForm.errors.name && (
                                <p className="text-red-400 text-sm mt-2">{createForm.errors.name}</p>
                            )}
                        </div>
                    )}

                    {/* Taula de categorías */}
                    <div className="bg-[#1a1d20] rounded-lg overflow-hidden border border-gray-800">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800 bg-[#0a0a0b]">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Nom</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Accions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories.length > 0 ? (
                                    categories.map((cat, index) => (
                                        <tr key={cat.id} className="border-b border-gray-800 hover:bg-[#222] transition">
                                            <td className="px-6 py-4 text-sm text-gray-300">{cat.id}</td>
                                            <td className="px-6 py-4 text-sm text-white font-medium">{cat.name}</td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button onClick={() => handleDelete(cat.id)} className="text-blue-400 hover:text-blue-300 text-sm transition">
                                                    ✏️ Editar
                                                </button>
                                                <button onClick={() => handleDelete(cat.id)} className="text-red-400 hover:text-red-300 text-sm transition">
                                                    🗑️ Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                            No hi ha categoríes creades
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
