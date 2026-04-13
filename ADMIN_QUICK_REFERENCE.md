# 🚀 Referencia Rápida - Dashboard Admin

## Acceso Directo

| Acción | URL |
|--------|-----|
| Dashboard | `/admin` |
| Categorías | `/admin/categories` |
| Reportes | `/admin/reports` |

## Paleta de Colores Disponibles

```html
<!-- En cualquier componente React/JSX -->
<div className="bg-admin-bg text-admin-text border border-admin-border">
  <!-- Usa estas clases en cualquier parte -->
</div>
```

### Clases Tailwind Admin

- `bg-admin-bg` — Fondo principal (#0a0a0b)
- `bg-admin-surface` — Tarjetas (#1a1d20)
- `border-admin-border` — Bordes (#333333)
- `bg-admin-accent` — Azul principal (#3b82f6)
- `text-admin-text` — Texto claro (#e5e7eb)
- `text-admin-text-muted` — Texto apagado (#9ca3af)
- `bg-admin-success` — Verde (#10b981)
- `bg-admin-warning` — Ámbar (#f59e0b)
- `bg-admin-danger` — Rojo (#ef4444)

## Gestionar Reportes

### Flujo Típico

1. **Ir a Reportes**: Sidebar → Reportes
2. **Ver experiencia**: Click en "👁️ Ver"
3. **Revisar contenido**: En nueva pestaña
4. **Volver a tabla**: Atrás en pestaña anterior
5. **Ejecutar acción**:
   - ✓ Revisado → Marca como revisado
   - 🗑️ Eliminar → Elimina experiencia

### Estado Vacío

Si no hay reportes pendientes, se muestra un mensaje con emoji ✅

## Crear Nueva Página Admin

### 1. Componente React

```jsx
// resources/js/Pages/Admin/MiPagina/Index.jsx
import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function MiPaginaIndex({ auth, data }) {
    return (
        <>
            <Head title="Mi Página" />
            <AdminLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Contenido aquí */}
                </div>
            </AdminLayout>
        </>
    );
}
```

### 2. Controlador

```php
// app/Http/Controllers/AdminController.php
public function miPagina()
{
    $data = Model::all();
    return Inertia::render('Admin/MiPagina/Index', [
        'data' => $data
    ]);
}
```

### 3. Ruta

```php
// routes/web.php
Route::get('admin/mipagina', [AdminController::class, 'miPagina'])
    ->name('admin.mipagina');
```

### 4. Sidebar (Opcional)

```jsx
// resources/js/Components/Admin/AdminSidebar/AdminSidebar.jsx
const menuItems = [
    // ... items existentes
    { label: 'Mi Página', href: route('admin.mipagina'), icon: '📝' },
];
```

## Rutas de API Disponibles

### Dashboard
```
GET /admin
```

### Categorías
```
GET /admin/categories
POST /admin/categories
PUT /admin/categories/{id}
DELETE /admin/categories/{id}
```

### Reportes
```
GET /admin/reports
DELETE /admin/reports/{experiencia}/resolve    # Marcar revisado
DELETE /admin/reports/{experiencia}/delete     # Eliminar
PUT /admin/reports/{experiencia}/reject        # Rechazar
```

## Componentes Reutilizables

### AdminLayout
```jsx
<AdminLayout user={user}>
    {/* Tu contenido aquí */}
</AdminLayout>
```

### Tamaños de Pantalla
```
- sm: < 640px
- md: 640px - 1024px
- lg: > 1024px
```

Usar en clases: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

## Estilos Comunes

### Tarjeta Estándar
```jsx
<div className="bg-admin-surface rounded-lg p-6 border border-admin-border">
    <h3 className="text-xl font-semibold text-admin-text">Título</h3>
    <p className="text-admin-text-muted mt-2">Contenido</p>
</div>
```

### Botón Principal
```jsx
<button className="px-4 py-2 bg-admin-accent hover:bg-admin-accent/80 text-white rounded-md transition font-medium">
    Acción
</button>
```

### Botón Peligroso
```jsx
<button className="px-4 py-2 bg-admin-danger hover:bg-admin-danger/80 text-white rounded-md transition font-medium">
    Eliminar
</button>
```

### Botón Éxito
```jsx
<button className="px-4 py-2 bg-admin-success hover:bg-admin-success/80 text-white rounded-md transition font-medium">
    Aceptar
</button>
```

## Build & Deploy

### Compilar
```bash
npm run build
```

### Desarrollo (watch)
```bash
npm run dev
```

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Colores no se aplican | Verifica que uses `bg-admin-*` en lugar de hex directo |
| Ruta no funciona | Comprueba que esté en `routes/web.php` dentro del middleware `auth` |
| Botón no hace nada | Usa `useForm()` de Inertia para acciones; verifica ruta existe |
| Sidebar no navega | Verifica que `href` sea resultado de `route('nombre.ruta')` |
| Errores de compilación | Ejecuta `npm run build` para ver errores completos |

## Archivo de Documentación Completa

Para información detallada, consulta: `ADMIN_DASHBOARD_DOCS.md`

---

**Última actualización**: 7 de Abril de 2026  
**Versión**: 1.0
