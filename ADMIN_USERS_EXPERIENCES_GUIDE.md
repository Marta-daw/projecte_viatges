# Guía Completa: Gestión de Usuarios y Experiencias en el Panel Admin

## 📑 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Arquitectura General](#arquitectura-general)
3. [Gestión de Usuarios](#gestión-de-usuarios)
4. [Gestión de Experiencias](#gestión-de-experiencias)
5. [Flujo de Datos](#flujo-de-datos)
6. [Base de Datos](#base-de-datos)
7. [Rutas (Routes)](#rutas-routes)
8. [Componentes React](#componentes-react)
9. [Métodos del Controlador](#métodos-del-controlador)
10. [Casos de Uso Comunes](#casos-de-uso-comunes)

---

## Introducción

El panel administrativo de **projecte_viatges** incluye dos módulos principales:

1. **Gestión de Usuarios** (`/admin/users`) - Permite ver, banear y eliminar usuarios
2. **Gestión de Experiencias** (`/admin/experiences`) - Permite ver, ver en detalle y eliminar experiencias

Ambos módulos utilizan **Inertia.js** como capa de comunicación entre Laravel y React, siguiendo el patrón **Server-Side Rendering (SSR)**.

---

## Arquitectura General

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                     │
│  - resources/js/Pages/Admin/Users/Index.jsx             │
│  - resources/js/Pages/Admin/Experiences/Index.jsx       │
└──────────────────────┬──────────────────────────────────┘
                       │ (HTTP POST/DELETE)
                       ↓
┌─────────────────────────────────────────────────────────┐
│              Inertia.js (Bridge Layer)                  │
│  - useForm() hook para formularios
│  - route() helper para generar URLs
│  - Link component para navegación
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│            Backend (Laravel PHP)                        │
│  - app/Http/Controllers/AdminController.php             │
│  - app/Models/User.php                                  │
│  - app/Models/Experiencia.php                           │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│              Base de Datos (MySQL/SQLite)               │
│  - Tabla: users (con columna is_banned)                 │
│  - Tabla: experiences (con columna is_reported)         │
└─────────────────────────────────────────────────────────┘
```

### Principios de Diseño

- **Separación de responsabilidades**: Las vistas (React) comunican con el controlador (Laravel)
- **Reactividad**: Los cambios en la BD se reflejan inmediatamente en la UI
- **Confirmación de acciones**: Todas las acciones destructivas piden confirmación
- **Estilos centralizados**: Usa clases Tailwind con prefijo `admin-*` definidas en `tailwind.config.js`

---

## Gestión de Usuarios

### Resumen

La página de Gestión de Usuarios permite a los administradores:
- **Ver listado** de todos los usuarios registrados con detalles
- **Banear usuario** - Impide que el usuario acceda (marca `is_banned = true`)
- **Desbanear usuario** - Restaura acceso (marca `is_banned = false`)
- **Eliminar usuario** - Borra el usuario y todas sus experiencias de forma permanente

### Ubicación

- **Frontend**: `resources/js/Pages/Admin/Users/Index.jsx`
- **Backend**: Métodos en `app/Http/Controllers/AdminController.php`
- **Modelo**: `app/Models/User.php`
- **URL**: `/admin/users`
- **Nombre de ruta**: `admin.users`

### Interfaz de Usuario

#### Tabla de Usuarios

| Columna | Descripción |
|---------|------------|
| **ID** | ID único del usuario (ej: #1) |
| **Nombre** | Nombre completo del usuario |
| **Email** | Correo electrónico |
| **Experiências** | Cantidad de experiencias creadas (badge con número) |
| **Estado** | Activo (✅ verde) o Baneado (🚫 rojo) |
| **Registro** | Fecha de creación (formato: DD/MM/YYYY en Catalán) |
| **Acciones** | Botones para interactuar |

#### Botones de Acciones

```
┌─────────────────────────────────────────┐
│  Usuario ACTIVO (is_banned = false)     │
│  [🚫 Banear] [🗑️ Eliminar]              │
├─────────────────────────────────────────┤
│  Usuario BANEADO (is_banned = true)     │
│  [✅ Desbanear] [🗑️ Eliminar]           │
│  (fila aparece con opacidad 60%)        │
└─────────────────────────────────────────┘
```

### Flujo de Acciones

#### 1. Banear Usuario

**Paso a paso:**

1. Admin hace clic en botón "🚫 Banear"
2. Aparece cuadro de confirmación: `¿Estás seguro de que quieres banear este usuario?`
3. Si confirma:
   - Se envía POST a `/admin/users/{user}/ban`
   - Backend ejecuta `AdminController::banUser()`
   - Se actualiza la columna `is_banned = true` en la BD
   - La página se recarga (preservando scroll)
   - El botón cambia a "✅ Desbanear"
   - La fila se desvanece (opacity 60%)

**Código JavaScript (Frontend):**

```javascript
const handleBanUser = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres banear este usuario?')) {
        post(route('admin.users.ban', userId), {
            preserveScroll: true,  // Mantiene la posición del scroll
        });
    }
};
```

**Código PHP (Backend):**

```php
public function banUser(User $user)
{
    $user->update(['is_banned' => true]);
    return back()->with('success', 'Usuario baneado correctamente');
}
```

#### 2. Desbanear Usuario

**Idéntico a Banear, pero:**
- Ruta: `POST /admin/users/{user}/unban`
- Actualiza: `is_banned = false`
- Método: `AdminController::unbanUser()`

**Código PHP:**

```php
public function unbanUser(User $user)
{
    $user->update(['is_banned' => false]);
    return back()->with('success', 'Usuario desbaneado correctamente');
}
```

#### 3. Eliminar Usuario

**Paso a paso:**

1. Admin hace clic en botón "🗑️ Eliminar"
2. Aparece cuadro de confirmación: `¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.`
3. Si confirma:
   - Se envía DELETE a `/admin/users/{user}`
   - Backend ejecuta `AdminController::deleteUser()`
   - **Primero elimina todas las experiencias del usuario**: `$user->experiences()->delete()`
   - **Luego elimina el usuario**: `$user->delete()`
   - La BD se actualiza
   - La página se recarga
   - El usuario desaparece de la tabla

**Código JavaScript (Frontend):**

```javascript
const handleDeleteUser = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
        destroy(route('admin.users.delete', userId), {
            onSuccess: () => {
                setConfirmDelete(null);
            },
        });
    }
};
```

**Código PHP (Backend):**

```php
public function deleteUser(User $user)
{
    // Elimina TODAS las experiencias del usuario
    $user->experiences()->delete();
    // Luego elimina el usuario
    $user->delete();
    return back()->with('success', 'Usuario eliminado correctamente');
}
```

### Estado de Usuario en UI

**Función `getStatusBadge()`:**

```javascript
const getStatusBadge = (user) => {
    const isBanned = user.is_banned || false;  // Por defecto false
    return isBanned
        ? { color: 'bg-admin-danger', text: '🚫 Baneado' }      // Rojo
        : { color: 'bg-admin-success', text: '✅ Activo' };      // Verde
};
```

### Carga de Datos

**En el backend:**

```php
public function gestionarUsers()
{
    // Carga todos los usuarios con conteo de experiencias
    $users = User::withCount('experiences')->get();
    
    return Inertia::render('Admin/Users/Index', [
        'users' => $users,
    ]);
}
```

La función `withCount('experiences')` añade automáticamente un campo `experiences_count` a cada usuario.

### Estado Vacío

Si no hay usuarios, se muestra:

```
┌─────────────────────────────┐
│           👥                │
│    ¡Sin usuarios!           │
│ No hay usuarios registrados │
│   en este momento.          │
└─────────────────────────────┘
```

---

## Gestión de Experiencias

### Resumen

La página de Gestión de Experiencias permite a los administradores:
- **Ver listado** de todas las experiencias con detalles
- **Ver experiencia** - Abre en nueva pestaña la experiencia completa
- **Eliminar experiencia** - Borra la experiencia de forma permanente

### Ubicación

- **Frontend**: `resources/js/Pages/Admin/Experiences/Index.jsx`
- **Backend**: Método en `app/Http/Controllers/AdminController.php`
- **Modelo**: `app/Models/Experiencia.php`
- **URL**: `/admin/experiences`
- **Nombre de ruta**: `admin.experiences`

### Interfaz de Usuario

#### Botón Crear Nueva Experiencia

En la esquina superior derecha hay un botón:

```
[➕ Nueva Experiencia]
```

Que enlaza a `/experiencies/create` para crear una nueva experiencia directamente.

#### Tabla de Experiencias

| Columna | Descripción |
|---------|------------|
| **ID** | ID único de la experiencia (ej: #1) |
| **Título** | Nombre/título de la experiencia |
| **Usuario** | Nombre del usuario que la creó |
| **Categorías** | Categorías asociadas (ej: "Montaña, Senderismo") |
| **Estado** | Publicada/Borrador/Archivada con emoji |
| **Fecha** | Fecha de creación (formato: DD/MM/YYYY en Catalán) |
| **Acciones** | Botones para interactuar |

#### Estado de Experiencia

```javascript
const getStatusBadge = (status) => {
    const statusMap = {
        'published': { color: 'bg-admin-success', text: '📝 Publicada' },   // Verde
        'draft': { color: 'bg-admin-warning', text: '📋 Borrador' },       // Naranja
        'archived': { color: 'bg-admin-text-muted', text: '📁 Archivada' }, // Gris
    };
    
    const statusInfo = statusMap[status] || statusMap['draft'];
    return statusInfo;
};
```

**IMPORTANTE**: En la BD el status es almacenado como `'esborrany'`, `'publicada'`, `'rebutjada'`. El componente mapea `'published'` pero debe manejar correctamente estos valores reales.

#### Botones de Acciones

```
[👁️ Ver] [🗑️ Eliminar]
```

### Flujo de Acciones

#### 1. Ver Experiencia

**Paso a paso:**

1. Admin hace clic en botón "👁️ Ver"
2. Se abre en **nueva pestaña** (`target="_blank"`)
3. Muestra la experiencia completa con todos los detalles

**Código:**

```javascript
<a
    href={route('experiencia.show', experience.id)}
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-2 bg-admin-accent hover:bg-admin-accent/80 text-white rounded-md transition duration-200 font-medium text-xs whitespace-nowrap"
    title="Ver experiencia"
>
    👁️ Ver
</a>
```

#### 2. Eliminar Experiencia

**Paso a paso:**

1. Admin hace clic en botón "🗑️ Eliminar"
2. Aparece cuadro de confirmación: `¿Estás seguro de que quieres eliminar esta experiencia? Esta acción no se puede deshacer.`
3. Si confirma:
   - Se envía DELETE a `/admin/experiences/{experiencia}`
   - Backend ejecuta `AdminController::deleteExperience()`
   - Se elimina la experiencia
   - La página se recarga
   - La experiencia desaparece de la tabla

**Código JavaScript:**

```javascript
const handleDeleteExperience = (experienceId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta experiencia? Esta acción no se puede deshacer.')) {
        destroy(route('admin.experiences.delete', experienceId), {
            onSuccess: () => {
                setConfirmDelete(null);
            },
        });
    }
};
```

**Código PHP:**

```php
public function deleteExperience(Experiencia $experiencia)
{
    $experiencia->delete();
    return back()->with('success', 'Experiencia eliminada correctamente');
}
```

### Carga de Datos

**En el backend:**

```php
public function gestionarExperiences()
{
    // Carga todas las experiencias con sus usuarios y categorías
    $experiences = Experiencia::with(['user', 'categories'])->get();
    
    return Inertia::render('Admin/Experiences/Index', [
        'experiences' => $experiences,
    ]);
}
```

El método `with(['user', 'categories'])` hace **eager loading** para evitar problemas N+1 de rendimiento.

### Extracción de Categorías

**Función `getCategoryNames()`:**

```javascript
const getCategoryNames = (experience) => {
    if (!experience.categories || experience.categories.length === 0) {
        return 'Sin categoría';  // Si no hay categorías
    }
    // Extrae el nombre de cada categoría y las une con comas
    return experience.categories.map(cat => cat.nombre).join(', ');
};
```

Ejemplo:
- Input: `categories = [{nombre: 'Montaña'}, {nombre: 'Senderismo'}]`
- Output: `"Montaña, Senderismo"`

### Estado Vacío

Si no hay experiencias, se muestra:

```
┌──────────────────────────────────┐
│             ✈️                   │
│       ¡Sin experiencias!         │
│ No hay experiencias disponibles  │
│   en este momento.               │
│                                  │
│ [Crear Primera Experiencia]      │
└──────────────────────────────────┘
```

---

## Flujo de Datos

### Flujo Completo: Banear un Usuario

```
1. FRONTEND (React)
   ↓
   handleBanUser(userId)
   ↓
   window.confirm('¿Seguro?')  ← El usuario debe confirmar
   ↓
   if (confirm) → post(route('admin.users.ban', userId))
   ↓

2. INERTIA.JS (Bridge)
   ↓
   Genera URL: /admin/users/{userId}/ban
   Envía: POST request
   ↓

3. BACKEND (Laravel)
   ↓
   Route: Route::post('admin/users/{user}/ban', ...)
   ↓
   AdminController::banUser(User $user)
   ↓
   $user->update(['is_banned' => true])  ← Actualiza BD
   ↓
   return back()->with('success', ...)
   ↓

4. BASE DE DATOS (MySQL/SQLite)
   ↓
   UPDATE users SET is_banned = true WHERE id = {userId}
   ↓

5. FRONTEND (React) - AUTOMÁTICO
   ↓
   La página se recarga automáticamente
   ↓
   Se vuelve a cargar gestionarUsers()
   ↓
   El componente se re-renderiza
   ↓
   El botón cambia a "✅ Desbanear"
   ↓
   La fila aparece más opaca (opacity-60)
```

### Flujo Completo: Eliminar una Experiencia

```
1. FRONTEND (React)
   ↓
   handleDeleteExperience(experienceId)
   ↓
   window.confirm('¿Seguro?')  ← El usuario debe confirmar
   ↓
   if (confirm) → destroy(route('admin.experiences.delete', experienceId))
   ↓

2. INERTIA.JS (Bridge)
   ↓
   Genera URL: /admin/experiences/{experienceId}
   Envía: DELETE request (simulado con POST + _method=DELETE)
   ↓

3. BACKEND (Laravel)
   ↓
   Route: Route::delete('admin/experiences/{experiencia}', ...)
   ↓
   AdminController::deleteExperience(Experiencia $experiencia)
   ↓
   $experiencia->delete()  ← Elimina de BD
   ↓
   return back()->with('success', ...)
   ↓

4. BASE DE DATOS (MySQL/SQLite)
   ↓
   DELETE FROM experiences WHERE id = {experienceId}
   ↓

5. FRONTEND (React) - AUTOMÁTICO
   ↓
   La página se recarga
   ↓
   Se vuelve a cargar gestionarExperiences()
   ↓
   El componente se re-renderiza
   ↓
   La experiencia ya no aparece en la tabla
```

---

## Base de Datos

### Tabla `users`

```sql
CREATE TABLE users (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    remember_token VARCHAR(100) NULL,
    is_banned BOOLEAN DEFAULT FALSE,  ← NUEVO CAMPO
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

**Campo `is_banned`:**
- **Tipo**: BOOLEAN (TINYINT(1))
- **Valor por defecto**: FALSE
- **Significado**: 
  - `false` (0) = Usuario activo, puede acceder
  - `true` (1) = Usuario baneado, acceso denegado
- **Migración**: `2026_04_07_170900_add_is_banned_to_users_table.php`

### Tabla `experiences`

```sql
CREATE TABLE experiences (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    body LONGTEXT NOT NULL,
    image_url VARCHAR(255) NULL,
    latitude DOUBLE NULL,
    longitude DOUBLE NULL,
    status VARCHAR(50) DEFAULT 'esborrany',
    is_reported BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Campos importantes:**
- **`status`**: Enum con valores: `'esborrany'`, `'publicada'`, `'rebutjada'`
- **`is_reported`**: Si es TRUE, aparece en la página de Reportes
- **`user_id`**: FK que apunta al usuario que creó la experiencia

### Relaciones

```
users (1)
   ↓ hasMany
   ↑ belongsTo
experiences (N)
```

Cuando se elimina un usuario:
- **Opción actual**: Se eliminan todas sus experiencias (CASCADE en FK)
- **En el código**: `$user->experiences()->delete()` antes de `$user->delete()`

---

## Rutas (Routes)

### Definición en `routes/web.php`

```php
Route::middleware('auth')->group(function () {
    // ... otras rutas ...
    
    // GET: Mostrar listados
    Route::get('admin/experiences', [AdminController::class, 'gestionarExperiences'])
        ->name('admin.experiences');
    
    Route::get('admin/users', [AdminController::class, 'gestionarUsers'])
        ->name('admin.users');
    
    // DELETE: Eliminar
    Route::delete('admin/experiences/{experiencia}', [AdminController::class, 'deleteExperience'])
        ->name('admin.experiences.delete');
    
    Route::delete('admin/users/{user}', [AdminController::class, 'deleteUser'])
        ->name('admin.users.delete');
    
    // POST: Banear/Desbanear
    Route::post('admin/users/{user}/ban', [AdminController::class, 'banUser'])
        ->name('admin.users.ban');
    
    Route::post('admin/users/{user}/unban', [AdminController::class, 'unbanUser'])
        ->name('admin.users.unban');
});
```

### Tabla de Rutas

| HTTP Method | Ruta | Nombre | Controlador | Descripción |
|------------|------|--------|------------|------------|
| GET | `/admin/users` | `admin.users` | `gestionarUsers()` | Listado de usuarios |
| GET | `/admin/experiences` | `admin.experiences` | `gestionarExperiences()` | Listado de experiencias |
| DELETE | `/admin/users/{user}` | `admin.users.delete` | `deleteUser()` | Eliminar usuario |
| DELETE | `/admin/experiences/{experiencia}` | `admin.experiences.delete` | `deleteExperience()` | Eliminar experiencia |
| POST | `/admin/users/{user}/ban` | `admin.users.ban` | `banUser()` | Banear usuario |
| POST | `/admin/users/{user}/unban` | `admin.users.unban` | `unbanUser()` | Desbanear usuario |

### Uso del Helper `route()`

En React, para generar URLs:

```javascript
// Usuarios
route('admin.users')                           // → /admin/users
route('admin.users.delete', userId)            // → /admin/users/{userId}
route('admin.users.ban', userId)               // → /admin/users/{userId}/ban
route('admin.users.unban', userId)             // → /admin/users/{userId}/unban

// Experiencias
route('admin.experiences')                     // → /admin/experiences
route('admin.experiences.delete', experienceId) // → /admin/experiences/{experienceId}
route('experiencia.show', experienceId)        // → /experiencia/{experienceId}
route('experiences.create')                    // → /experiencies/create
```

---

## Componentes React

### Structure General

Ambos componentes siguen la misma estructura:

```jsx
import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function PageName({ auth, data = [] }) {
    // 1. STATE
    const [state, setState] = useState(null);
    
    // 2. FORM HOOK
    const { delete: destroy, post } = useForm();
    
    // 3. HANDLERS
    const handleAction = (id) => {
        if (window.confirm('¿Seguro?')) {
            post(route('route.name', id), { ... });
        }
    };
    
    // 4. HELPERS
    const getStatusBadge = (item) => {
        // Lógica para determinar apariencia
    };
    
    // 5. RENDER
    return (
        <>
            <Head title="Título de la Página" />
            <AdminLayout user={auth.user}>
                {/* Contenido */}
            </AdminLayout>
        </>
    );
}
```

### `useForm()` Hook

Inertia.js proporciona el hook `useForm()` con métodos:

```javascript
const { delete: destroy, post, get, patch, put } = useForm();

// Para DELETE
destroy(url, {
    onSuccess: () => { /* callback */ },
    preserveScroll: true,  // Mantiene scroll position
});

// Para POST
post(url, {
    preserveScroll: true,
});
```

### Layout y Componentes

```
AdminLayout
├── AdminHeader (componente personalizado)
│   ├── Logo
│   ├── Reloj en vivo
│   ├── Avatar del usuario
│   └── Botón logout
├── AdminSidebar (componente personalizado)
│   ├── Dashboard
│   ├── Usuarios
│   ├── Experiencias
│   ├── Reportes
│   └── Categorías
└── Contenido Principal (cada página)
    ├── Header con título
    ├── Tabla o contenido
    └── Footer
```

---

## Métodos del Controlador

### `AdminController::gestionarUsers()`

```php
public function gestionarUsers()
{
    // Carga todos los usuarios con el conteo de experiencias
    // withCount('experiences') añade el campo 'experiences_count'
    $users = User::withCount('experiences')->get();
    
    // Envía los datos a React vía Inertia
    return Inertia::render('Admin/Users/Index', [
        'users' => $users,
    ]);
}
```

**Retorna al componente:**
```javascript
{
    auth: { user: { ... } },  // Usuario autenticado (automático)
    users: [
        {
            id: 1,
            name: 'Juan',
            email: 'juan@example.com',
            is_banned: false,
            experiences_count: 5,
            created_at: '2026-03-15T...',
            ...
        },
        // más usuarios
    ]
}
```

### `AdminController::gestionarExperiences()`

```php
public function gestionarExperiences()
{
    // Carga todas las experiencias con sus relaciones
    // with(['user', 'categories']) hace eager loading
    $experiences = Experiencia::with(['user', 'categories'])->get();
    
    return Inertia::render('Admin/Experiences/Index', [
        'experiences' => $experiences,
    ]);
}
```

**Retorna al componente:**
```javascript
{
    auth: { user: { ... } },
    experiences: [
        {
            id: 1,
            title: 'Trekking en Montserrat',
            body: '...',
            status: 'publicada',
            is_reported: false,
            user: {
                id: 1,
                name: 'Juan'
            },
            categories: [
                { id: 1, nombre: 'Montaña' },
                { id: 2, nombre: 'Senderismo' }
            ],
            created_at: '2026-03-15T...',
            ...
        },
        // más experiencias
    ]
}
```

### `AdminController::banUser(User $user)`

```php
public function banUser(User $user)
{
    // Actualiza el campo is_banned a true
    $user->update(['is_banned' => true]);
    
    // Retorna a la página anterior con mensaje de éxito
    return back()->with('success', 'Usuario baneado correctamente');
}
```

**¿Qué hace?**
- Actualiza una fila en la tabla `users`
- El modelo `User` está configurado con `is_banned` en `$fillable`
- La validación es automática por Laravel

### `AdminController::unbanUser(User $user)`

```php
public function unbanUser(User $user)
{
    $user->update(['is_banned' => false]);
    return back()->with('success', 'Usuario desbaneado correctamente');
}
```

### `AdminController::deleteUser(User $user)`

```php
public function deleteUser(User $user)
{
    // PASO 1: Eliminar todas las experiencias del usuario
    // Esto es importante para mantener la integridad referencial
    $user->experiences()->delete();
    
    // PASO 2: Eliminar el usuario
    $user->delete();
    
    // PASO 3: Retornar con mensaje
    return back()->with('success', 'Usuario eliminado correctamente');
}
```

**Relación `experiences()`:**
```php
// En el modelo User
public function experiences()
{
    return $this->hasMany(Experiencia::class);
}
```

### `AdminController::deleteExperience(Experiencia $experiencia)`

```php
public function deleteExperience(Experiencia $experiencia)
{
    // Elimina una experiencia por su ID
    $experiencia->delete();
    
    // Laravel maneja automáticamente las relaciones de la tabla pivote
    // (category_experience) gracias a las definiciones en los modelos
    
    return back()->with('success', 'Experiencia eliminada correctamente');
}
```

---

## Casos de Uso Comunes

### 1. Agregar un nuevo campo a la tabla de Usuarios

**Paso 1: Crear migración**
```bash
php artisan make:migration add_field_to_users_table
```

**Paso 2: Definir el cambio**
```php
// database/migrations/XXXX_add_field_to_users_table.php
public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('new_field')->nullable();
    });
}
```

**Paso 3: Ejecutar migración**
```bash
php artisan migrate
```

**Paso 4: Actualizar modelo**
```php
// app/Models/User.php
protected $fillable = [
    'name',
    'email',
    'password',
    'is_banned',
    'new_field',  // ← Añadir aquí
];
```

**Paso 5: Actualizar componente React**
```jsx
<td className="px-6 py-4 text-sm">
    {user.new_field}
</td>
```

### 2. Cambiar el mensaje de confirmación

**En el componente React:**

```javascript
// Antes
if (window.confirm('¿Estás seguro?')) {

// Después
if (window.confirm('⚠️ ACCIÓN IRREVERSIBLE: ¿Eliminar usuario? Perderá todas sus datos.')) {
```

### 3. Filtrar usuarios baneados

**En el backend:**

```php
// Solo usuarios activos
$users = User::where('is_banned', false)->withCount('experiences')->get();

// Solo usuarios baneados
$users = User::where('is_banned', true)->withCount('experiences')->get();

// Todos (por defecto)
$users = User::withCount('experiences')->get();
```

**En el componente React:**

```javascript
// Filtrar en frontend (no recomendado para grandes datasets)
const activeUsers = users.filter(u => !u.is_banned);
const bannedUsers = users.filter(u => u.is_banned);
```

### 4. Ordenar la tabla

**En el backend:**

```php
// Por nombre ascendente
$users = User::withCount('experiences')
    ->orderBy('name', 'asc')
    ->get();

// Por fecha de creación descendente
$users = User::withCount('experiences')
    ->orderByDesc('created_at')
    ->get();

// Usuarios baneados primero
$users = User::withCount('experiences')
    ->orderBy('is_banned', 'desc')
    ->get();
```

### 5. Agregar búsqueda

**En el backend:**

```php
public function gestionarUsers($search = null)
{
    $query = User::withCount('experiences');
    
    if ($search) {
        $query->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
    }
    
    $users = $query->get();
    
    return Inertia::render('Admin/Users/Index', [
        'users' => $users,
        'search' => $search,
    ]);
}
```

**En la ruta:**

```php
Route::get('admin/users', function (Request $request) {
    return app(AdminController::class)->gestionarUsers($request->query('search'));
})->name('admin.users');
```

**En React:**

```jsx
const [search, setSearch] = useState('');

const handleSearch = () => {
    window.location.href = route('admin.users', { search });
};

return (
    <>
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar usuario..."
        />
        <button onClick={handleSearch}>Buscar</button>
    </>
);
```

### 6. Cambiar colores de estado

**En `tailwind.config.js`:**

```javascript
extend: {
    colors: {
        'admin-success': '#10b981',  // Verde
        'admin-danger': '#ef4444',   // Rojo
        // ... más colores
    }
}
```

**En el componente React:**

```javascript
const getStatusBadge = (user) => {
    const isBanned = user.is_banned || false;
    return isBanned
        ? { color: 'bg-yellow-600', text: '🔒 Suspendido' }  // Amarillo
        : { color: 'bg-green-600', text: '✅ Activo' };      // Verde
};
```

### 7. Exportar datos a CSV

**En el backend:**

```php
public function exportUsers()
{
    $users = User::withCount('experiences')->get();
    
    $csv = "ID,Nombre,Email,Experiencias,Baneado,Registro\n";
    
    foreach ($users as $user) {
        $csv .= "{$user->id},{$user->name},{$user->email}," .
                "{$user->experiences_count}," .
                ($user->is_banned ? 'Sí' : 'No') . "," .
                $user->created_at->format('Y-m-d') . "\n";
    }
    
    return response($csv)
        ->header('Content-Type', 'text/csv')
        ->header('Content-Disposition', 'attachment; filename="usuarios.csv"');
}
```

**En la ruta:**

```php
Route::get('admin/users/export', [AdminController::class, 'exportUsers'])
    ->name('admin.users.export');
```

---

## Resumen Rápido

### Tabla de Métodos por Acción

| Acción | Método Frontend | Ruta | Método Backend |
|--------|-----------------|------|----------------|
| Ver usuarios | `gestionarUsers()` | GET /admin/users | `gestionarUsers()` |
| Banear usuario | `handleBanUser()` | POST /admin/users/{id}/ban | `banUser()` |
| Desbanear usuario | `handleUnbanUser()` | POST /admin/users/{id}/unban | `unbanUser()` |
| Eliminar usuario | `handleDeleteUser()` | DELETE /admin/users/{id} | `deleteUser()` |
| Ver experiencias | `gestionarExperiences()` | GET /admin/experiences | `gestionarExperiences()` |
| Eliminar experiencia | `handleDeleteExperience()` | DELETE /admin/experiences/{id} | `deleteExperience()` |

### Archivos Clave

```
project_root/
├── app/
│   ├── Http/Controllers/AdminController.php        ← Lógica backend
│   └── Models/
│       ├── User.php                                ← Modelo usuario
│       └── Experiencia.php                         ← Modelo experiencia
├── resources/js/
│   └── Pages/Admin/
│       ├── Users/Index.jsx                         ← Componente usuarios
│       └── Experiences/Index.jsx                   ← Componente experiencias
├── routes/
│   └── web.php                                     ← Rutas
├── database/
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 2026_03_16_153102_create_experiences_table.php
│   │   └── 2026_04_07_170900_add_is_banned_to_users_table.php
│   └── seeders/
└── tailwind.config.js                              ← Colores admin
```

---

## Preguntas Frecuentes

### P: ¿Qué pasa si elimino un usuario?
**R:** Se eliminan automáticamente:
1. El usuario de la tabla `users`
2. Todas sus experiencias de la tabla `experiences`
3. Las asociaciones en la tabla pivote `category_experience`

### P: ¿Puedo restaurar un usuario baneado?
**R:** Sí, haz clic en "✅ Desbanear". El sistema simplemente cambia `is_banned = false`.

### P: ¿Qué sucede si hay un error al eliminar?
**R:** Laravel capturará la excepción y mostrará un mensaje de error. El usuario puede reintentar.

### P: ¿Por qué la página se recarga después de cada acción?
**R:** Inertia.js está configurado para recargar automáticamente después de POST/DELETE. Puedes cambiar esto con opciones en `useForm()`.

### P: ¿Cómo cambio el idioma de las fechas?
**R:** Está configurado en `toLocaleDateString('ca-ES')` para Catalán. Cambia el código de idioma:
- `'es-ES'` = Español
- `'en-US'` = Inglés
- `'fr-FR'` = Francés

### P: ¿Puedo hacer acciones en masa?
**R:** Actualmente no. Tendrías que:
1. Agregar checkboxes a cada fila
2. Agregar un botón de "Eliminar seleccionados"
3. Enviar un array de IDs al backend

---

## Versionado

- **Versión**: 1.2
- **Última actualización**: 7 de Abril de 2026
- **Autor**: Documentación Técnica - Admin Panel
- **Estado**: ✅ Completo y funcional

---

**Fin de la documentación.**

Para preguntas o actualizaciones, revisa los métodos en `AdminController.php` y los componentes React en `resources/js/Pages/Admin/`.
