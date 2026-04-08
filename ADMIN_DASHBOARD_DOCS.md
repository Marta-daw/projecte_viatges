# 📊 Documentación del Dashboard Admin - Sistema de Viajes

## 📑 Índice
1. [Introducción](#introducción)
2. [Arquitectura Visual](#arquitectura-visual)
3. [Sistema de Colores](#sistema-de-colores)
4. [Dashboard Principal](#dashboard-principal)
5. [Gestión de Reportes](#gestión-de-reportes)
6. [Componentes Reutilizables](#componentes-reutilizables)
7. [Rutas Backend](#rutas-backend)
8. [Instrucciones de Uso](#instrucciones-de-uso)
9. [Guía de Desarrollo](#guía-de-desarrollo)

---

## Introducción

El sistema de administración ha sido completamente rediseñado con una UI moderna, coherente y profesional. Utiliza una paleta de colores oscura elegante y proporciona todas las herramientas necesarias para gestionar:

- 📊 **Estadísticas en tiempo real** del sistema
- 📂 **Categorías de experiencias**
- ⚠️ **Reportes de experiencias** (moderación)
- 👥 **Usuarios** (próximamente)
- ✈️ **Experiencias** (próximamente)

---

## Arquitectura Visual

El dashboard está organizado en la siguiente estructura:

```
┌─────────────────────────────────────────────────────────┐
│                    AdminHeader                           │
│  Panel d'Administració    |    Benvingut, Admin | Logout │
├─────────────┬─────────────────────────────────────────────┤
│             │                                             │
│ AdminSidebar│                 Main Content               │
│             │            (Dashboard/Reports/etc)         │
│             │                                             │
│             │                                             │
└─────────────┴─────────────────────────────────────────────┘
```

### Componentes Principales

| Componente | Ruta | Responsabilidad |
|-----------|------|-----------------|
| **AdminLayout** | `resources/js/Layouts/AdminLayout.jsx` | Contenedor principal que organiza Header, Sidebar y contenido |
| **AdminHeader** | `resources/js/Components/Admin/AdminHeader/` | Barra superior con título y botón de logout |
| **AdminSidebar** | `resources/js/Components/Admin/AdminSidebar/` | Menú de navegación lateral con colapso |
| **Dashboard** | `resources/js/Pages/Admin/Dashboard.jsx` | Vista principal del admin con estadísticas |
| **Reports** | `resources/js/Pages/Admin/Reports/Index.jsx` | Gestión de experiencias reportadas |

---

## Sistema de Colores

Hemos centralizado la paleta de colores en **`tailwind.config.js`** para garantizar coherencia en toda la interfaz.

### Paleta Definida

```javascript
// tailwind.config.js - extend.colors
colors: {
    'admin-bg': '#0a0a0b',           // Fondo principal (muy oscuro)
    'admin-surface': '#1a1d20',      // Fondo de tarjetas y componentes
    'admin-border': '#333333',        // Bordes y separadores
    'admin-accent': '#3b82f6',       // Azul (CTA principal, activo)
    'admin-text': '#e5e7eb',         // Texto principal (claro)
    'admin-text-muted': '#9ca3af',   // Texto secundario (apagado)
    'admin-success': '#10b981',      // Verde (acciones exitosas)
    'admin-warning': '#f59e0b',      // Ámbar (advertencias)
    'admin-danger': '#ef4444',       // Rojo (eliminar, peligro)
}
```

### Uso de Colores

| Color | Uso | Ejemplo |
|-------|-----|---------|
| `bg-admin-bg` | Fondos principales del layout | Main container, page background |
| `bg-admin-surface` | Tarjetas, componentes | Cards, panels, modal backgrounds |
| `border-admin-border` | Líneas y separadores | Divisores entre elementos |
| `text-admin-text` | Texto principal | Encabezados, contenido |
| `text-admin-text-muted` | Texto secundario | Descripciones, subtítulos |
| `bg-admin-accent` | Botones principales, estados activos | CTA buttons, active nav items |
| `bg-admin-success` | Acciones exitosas | "✓ Revisado", confirmaciones |
| `bg-admin-danger` | Acciones destructivas | "🗑️ Eliminar", botones rojos |

---

## Dashboard Principal

### Ubicación
`resources/js/Pages/Admin/Dashboard.jsx`

### Funcionalidad

El dashboard muestra un resumen completo del estado de la plataforma:

#### 1️⃣ **Estadísticas en Tarjetas (StatCard)**

Cuatro tarjetas de métricas principales:
- **Experiències**: Cantidad de experiencias creadas
- **Usuaris**: Cantidad de usuarios registrados
- **Categoríes**: Categorías disponibles
- **Reportes Pendents**: Experiencias reportadas pendientes de revisión

Cada tarjeta incluye:
- Icono descriptivo
- Valor actual
- Tendencia o estado
- Color distintivo (azul, verde, púrpura, rojo)

```jsx
<StatCard
    title="Reportes Pendents"
    value={reportsCount}
    icon="⚠️"
    color={reportsCount > 0 ? "bg-admin-danger" : "bg-admin-text-muted"}
    trend={reportsCount > 0 ? "Revisió necessària" : "Cap reportes"}
/>
```

#### 2️⃣ **Acciones Rápidas**

Grid de 4 botones de acceso rápido a funcionalidades principales:
- 📂 **Gestionar Categoríes** → `route('admin.categories')`
- ⚠️ **Revisar Reportes** → `route('admin.reports')`
- ✈️ **Revisar Experiències** → Deshabilitado (próximamente)
- 👥 **Gestionar Usuaris** → Deshabilitado (próximamente)

#### 3️⃣ **Estado del Sistema**

Indicador visual de la salud de la plataforma:
- 🟢 Plataforma activa
- 🟢 Sistema de moderación activo
- 🟢/🔴 Estado de reportes pendientes

#### 4️⃣ **Información del Sistema**

Tres cajas destacadas con información clave:
- Categorías disponibles
- Usuarios registrados
- Experiencias activas

### Props Esperadas

```javascript
{
    auth: { user: { name, email, ... } },
    stats: {
        experiencesCount: number,
        usersCount: number,
        categoriesCount: number,
        reportsCount: number,
    }
}
```

### Datos en Tiempo Real

Los datos provienen de `AdminController.php`:

```php
public function index()
{
    $stats = [
        'experiencesCount' => Experiencia::count(),
        'usersCount' => User::count(),
        'categoriesCount' => Categoria::count(),
        'reportsCount' => Experiencia::where('is_reported', true)->count(),
    ];

    return Inertia::render('Admin/Dashboard', ['stats' => $stats]);
}
```

---

## Gestión de Reportes

### Ubicación
`resources/js/Pages/Admin/Reports/Index.jsx`

### Funcionalidad Completa

La sección de reportes permite a los administradores revisar y actuar sobre experiencias reportadas por usuarios.

#### 📋 **Tabla de Reportes**

Muestra todas las experiencias marcadas como reportadas con:

| Columna | Descripción |
|---------|-------------|
| **ID** | Identificador único de la experiencia |
| **Título** | Nombre de la experiencia reportada |
| **Autor** | Usuario que creó la experiencia |
| **Descripción** | Primeros 50 caracteres del contenido |
| **Fecha** | Cuándo se reportó (formato: DD/MM/YYYY) |
| **Acciones** | Botones para gestionar el reporte |

#### 🎯 **Acciones por Reporte**

Cada fila incluye tres botones de acción:

**1. ✓ Revisado** (Botón Verde)
- Marca el reporte como revisado
- Cambia `is_reported` a `false` sin eliminar la experiencia
- Ruta: `DELETE admin/reports/{experiencia}/resolve`
- Ideal cuando se revisó y no hay problema con la experiencia

**2. 🗑️ Eliminar** (Botón Rojo)
- Elimina completamente la experiencia de la base de datos
- Confirma acción con dialogo del navegador
- Ruta: `DELETE admin/reports/{experiencia}/delete`
- Para contenido inapropiado que debe ser removido

**3. 👁️ Ver** (Botón Azul)
- Abre la experiencia en una nueva pestaña
- Enlace: `route('experiencia.show', experiencia.id)`
- Permite revisar contenido completo antes de actuar

#### 📊 **Estados Visuales**

- **Tabla vacía**: Mostrada cuando no hay reportes pendientes
- **Con datos**: Tabla scrollable con hover effects
- **Confirmación**: Dialogo nativo del navegador antes de acciones destructivas

### Props Esperadas

```javascript
{
    auth: { user: { name, email, ... } },
    reports: [
        {
            id: 1,
            titulo: "Trekking en Montserrat",
            descripcion: "Una experiencia única...",
            user: { name: "Juan García" },
            created_at: "2026-04-07T10:30:00Z",
            is_reported: true,
            ...otrosAtributos
        },
        ...
    ]
}
```

### Backend - AdminController

#### **Métodos Implementados**

```php
// Obtener reportes pendientes (GET)
public function gestionarReports()
{
    $reports = Experiencia::where('is_reported', true)
        ->with('user')
        ->get();
    
    return Inertia::render('Admin/Reports/Index', ['reports' => $reports]);
}

// Marcar como revisado (DELETE)
public function resolveReport(Experiencia $experiencia)
{
    $experiencia->update(['is_reported' => false]);
    return back()->with('success', 'Reporte marcado como revisado');
}

// Eliminar experiencia (DELETE)
public function deleteReport(Experiencia $experiencia)
{
    $experiencia->delete();
    return back()->with('success', 'Experiencia eliminada correctamente');
}

// Rechazar reporte (PUT - para futuros usos)
public function rejectReport(Experiencia $experiencia)
{
    $experiencia->update(['is_reported' => false]);
    return back()->with('success', 'Reporte rechazado');
}
```

### Rutas API

```php
// GET - Listar reportes
Route::get('admin/reports', [AdminController::class, 'gestionarReports'])
    ->name('admin.reports');

// DELETE - Marcar como revisado
Route::delete('admin/reports/{experiencia}/resolve', [AdminController::class, 'resolveReport'])
    ->name('admin.reports.resolve');

// DELETE - Eliminar experiencia
Route::delete('admin/reports/{experiencia}/delete', [AdminController::class, 'deleteReport'])
    ->name('admin.reports.delete');

// PUT - Rechazar reporte (sin eliminar experiencia)
Route::put('admin/reports/{experiencia}/reject', [AdminController::class, 'rejectReport'])
    ->name('admin.reports.reject');
```

---

## Componentes Reutilizables

### AdminLayout

**Archivo**: `resources/js/Layouts/AdminLayout.jsx`

Contenedor principal que proporciona estructura base para todas las páginas admin.

```jsx
export default function AdminLayout({ user, children }) {
    return (
        <div className="flex flex-col h-screen bg-admin-bg text-admin-text">
            <header className="h-16 flex-shrink-0 border-b border-admin-border">
                <AdminHeader user={user} />
            </header>
            <div className="flex flex-1 overflow-hidden">
                <AdminSidebar auth={{ user }} />
                <main className="flex-1 overflow-y-auto bg-admin-bg p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
```

**Features**:
- Layout flex fullscreen
- Header fijo de 4rem (16px)
- Sidebar con ancho variable
- Contenido scrollable
- Colores de admin aplicados

### AdminHeader

**Archivo**: `resources/js/Components/Admin/AdminHeader/AdminHeader.jsx`

Barra superior con título y controles de usuario.

**Props**:
- `user`: Objeto usuario con propiedades `name`, `email`, etc.

**Elementos**:
- Título: "Panel d'Administració"
- Información de usuario: "Benvingut, {nombre}"
- Botón: "Tancar sessió" → `post(route('logout'))`

### AdminSidebar

**Archivo**: `resources/js/Components/Admin/AdminSidebar/AdminSidebar.jsx`

Menú de navegación lateral colapsable.

**Props**:
- `auth`: Objeto autenticación con usuario

**Features**:
- Toggle de colapso (botón ◀/▶)
- Menú Items predefinidos:
  - Dashboard
  - Categoríes
  - Experiències (pendiente)
  - Usuaris (pendiente)
  - Reportes
- Estado activo basado en URL actual
- Transiciones suaves

---

## Rutas Backend

### Rutas Definidas en `routes/web.php`

```php
// Dashboard principal
Route::get('/admin', [AdminController::class, 'index'])
    ->name('admin.dashboard');

// Categorías
Route::get('admin/categories', [AdminController::class, 'gestionarCategories'])
    ->name('admin.categories');
Route::post('admin/categories', [CategoryController::class, 'store'])
    ->name('admin.categories.store');
Route::put('admin/categories/{category}', [CategoryController::class, 'update'])
    ->name('admin.categories.update');
Route::delete('admin/categories/{category}', [CategoryController::class, 'destroy'])
    ->name('admin.categories.destroy');

// Reportes
Route::get('admin/reports', [AdminController::class, 'gestionarReports'])
    ->name('admin.reports');
Route::delete('admin/reports/{experiencia}/delete', [AdminController::class, 'deleteReport'])
    ->name('admin.reports.delete');
Route::delete('admin/reports/{experiencia}/resolve', [AdminController::class, 'resolveReport'])
    ->name('admin.reports.resolve');
Route::put('admin/reports/{experiencia}/reject', [AdminController::class, 'rejectReport'])
    ->name('admin.reports.reject');
```

### Controlador: `AdminController.php`

Localización: `app/Http/Controllers/AdminController.php`

Métodos:
- `index()` - Renderiza Dashboard con estadísticas
- `gestionarCategories()` - Lista categorías
- `gestionarReports()` - Lista reportes pendientes
- `resolveReport(Experiencia)` - Marca reporte como revisado
- `deleteReport(Experiencia)` - Elimina experiencia reportada
- `rejectReport(Experiencia)` - Rechaza reporte

---

## Instrucciones de Uso

### Acceder al Admin

1. Inicia sesión con una cuenta de administrador
2. Navega a `/admin` o usa el enlace en el menú principal
3. Se cargará el Dashboard

### Navegar por el Admin

**Usando el Sidebar**:
- Haz clic en los items del menú para navegar
- Usa el botón ◀/▶ para colapsar/expandir
- El item activo se resalta en azul

**Rutas Directas**:
- Dashboard: `/admin`
- Categorías: `/admin/categories`
- Reportes: `/admin/reports`

### Gestionar Reportes

1. Ve a `Reportes` en el sidebar
2. Verás lista de experiencias reportadas
3. Para cada reporte, puedes:
   - **Ver**: Abre en nueva pestaña para revisar contenido completo
   - **Revisado**: Marca como revisado (mantiene la experiencia)
   - **Eliminar**: Elimina definitivamente la experiencia
4. Confirma la acción en el dialogo que aparece

---

## Guía de Desarrollo

### Estructura de Carpetas

```
resources/
├── js/
│   ├── Pages/
│   │   └── Admin/
│   │       ├── Dashboard.jsx
│   │       ├── Reports/
│   │       │   └── Index.jsx
│   │       └── Categories/
│   │           └── Index.jsx
│   ├── Components/
│   │   └── Admin/
│   │       ├── AdminHeader/
│   │       │   ├── AdminHeader.jsx
│   │       │   └── AdminHeader.module.scss
│   │       └── AdminSidebar/
│   │           ├── AdminSidebar.jsx
│   │           └── AdminSidebar.module.scss
│   └── Layouts/
│       └── AdminLayout.jsx
├── css/
│   └── styles/ (colores disponibles)
└── ...
app/
├── Http/
│   ├── Controllers/
│   │   └── AdminController.php
│   └── ...
├── Models/
│   ├── Experiencia.php
│   ├── User.php
│   └── Categoria.php
└── ...
```

### Añadir Nueva Página Admin

1. Crea componente en `resources/js/Pages/Admin/{Nombre}/`
2. Importa `AdminLayout` en el componente
3. Envuelve contenido con `AdminLayout`:

```jsx
import AdminLayout from '@/Layouts/AdminLayout';

export default function NewPage({ auth, data }) {
    return (
        <>
            <Head title="Mi Nueva Página" />
            <AdminLayout user={auth.user}>
                {/* Contenido aquí */}
            </AdminLayout>
        </>
    );
}
```

4. Crea método en `AdminController.php`:

```php
public function nuevaPagina()
{
    // Obtén datos si es necesario
    $data = Model::all();
    
    return Inertia::render('Admin/NuevaPagina', [
        'data' => $data
    ]);
}
```

5. Añade ruta en `routes/web.php`:

```php
Route::get('admin/nuevapagina', [AdminController::class, 'nuevaPagina'])
    ->name('admin.nuevapagina');
```

6. Opcionalmente, añade item en sidebar (`AdminSidebar.jsx`):

```javascript
{ label: 'Nueva Página', href: route('admin.nuevapagina'), icon: '🆕' }
```

### Personalizar Estilos

#### Usar Colores Admin

En JSX:
```jsx
<div className="bg-admin-surface text-admin-text border border-admin-border">
    Contenido
</div>
```

En SCSS:
```scss
.myClass {
    background-color: #1a1d20; // admin-surface
    color: #e5e7eb; // admin-text
    border: 1px solid #333333; // admin-border
    
    &:hover {
        background-color: #222;
    }
}
```

#### Definir Nuevos Componentes

Crea archivos en `resources/js/Components/Admin/` siguiendo el patrón:

```
NuevoComponente/
├── NuevoComponente.jsx
└── NuevoComponente.module.scss
```

Usa clases Tailwind y módulos SCSS según necesidad.

### Testing

Para verificar que todo funciona:

1. **Dashboard**: Navega a `/admin` y verifica estadísticas
2. **Reportes**: Crea una experiencia reportada y verifica en `/admin/reports`
3. **Acciones**: Prueba botones de "Revisado" y "Eliminar"

---

## 📝 Notas Importantes

### Validaciones

- Los botones de eliminar requieren confirmación explícita
- Las acciones redirigen a la misma página tras completarse
- Los errores se muestran en la consola del navegador

### Limitaciones Actuales

- Páginas "Experiències" y "Usuaris" están deshabilitadas (próximamente)
- No hay paginación en reportes (idealmente se implementaría si hay >50 items)
- No hay búsqueda o filtrado en reportes

### Mejoras Futuras Sugeridas

1. **Paginación**: Implementar `paginate(20)` en `gestionarReports()`
2. **Búsqueda**: Añadir campo de búsqueda en tabla de reportes
3. **Filtros**: Filtrar por fecha, autor, estado
4. **Notificaciones**: Usar toast notifications en lugar de alerts
5. **Bulk Actions**: Seleccionar múltiples reportes y actuar en lote
6. **Historial**: Registrar quién y cuándo revisó cada reporte
7. **Estadísticas**: Gráficos de reportes en el dashboard

---

## 🚀 Resumen de Cambios

### Archivos Modificados

| Archivo | Cambios |
|---------|---------|
| `tailwind.config.js` | Añadidos colores admin en extend.colors |
| `resources/js/Pages/Admin/Dashboard.jsx` | Rediseño completo con nueva UI |
| `resources/js/Pages/Admin/Reports/Index.jsx` | Implementación de tabla de reportes |
| `resources/js/Layouts/AdminLayout.jsx` | Colores actualizados a variables admin |
| `resources/js/Components/Admin/AdminHeader/AdminHeader.jsx` | Colores actualizados |
| `resources/js/Components/Admin/AdminHeader/AdminHeader.module.scss` | Colores consistentes |
| `resources/js/Components/Admin/AdminSidebar/AdminSidebar.jsx` | Ruta de reportes corregida |
| `resources/js/Components/Admin/AdminSidebar/AdminSidebar.module.scss` | Colores consistentes |
| `app/Http/Controllers/AdminController.php` | Métodos para gestión de reportes |
| `routes/web.php` | Nuevas rutas para acciones de reportes |

### Nuevas Funcionalidades

✅ Dashboard moderno con estadísticas en tiempo real  
✅ Gestión completa de reportes (revisar, eliminar, ver)  
✅ Paleta de colores centralizada y coherente  
✅ Sidebar mejorado con navegación funcional  
✅ Componentes reutilizables y escalables  
✅ Respuestas backend funcionales para todas las acciones  

---

## 📞 Soporte

Para preguntas o problemas:
1. Revisa la sección relevante en esta documentación
2. Verifica que los archivos estén en la ubicación correcta
3. Comprueba que las rutas estén bien definidas en `routes/web.php`
4. Revisa la consola del navegador para errores JavaScript

---

**Última actualización**: 7 de Abril de 2026  
**Versión**: 1.0  
**Estado**: Completado y funcional ✅
