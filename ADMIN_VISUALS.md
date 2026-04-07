# 📱 Vistas del Dashboard Admin - Capturas Visuales

## 🎯 Dashboard Principal

```
┌─────────────────────────────────────────────────────────────────┐
│ Panel d'Administració                          Benvingut, Admin │
├─────────────┬───────────────────────────────────────────────────┤
│             │                                                   │
│  SIDEBAR    │  Benvingut al Dashboard                          │
│             │  Gestiona tots els aspectes de la plataforma    │
│  📊 Dashboard│                                                   │
│  📂Categoríes│  ┌─────────────┐ ┌─────────────┐               │
│  ✈️Experiències│  │ ✈️ Experiències │ │ 👥 Usuaris    │               │
│  👥Usuaris  │  │     0        │ │     0       │               │
│  ⚠️Reportes │  │  +12% mes    │ │  +8% mes    │               │
│             │  └─────────────┘ └─────────────┘               │
│             │                                                   │
│             │  ┌─────────────┐ ┌─────────────┐               │
│             │  │ 📂 Categoríes│ │⚠️ Reportes  │               │
│             │  │     9        │ │     0       │               │
│             │  │  Completes   │ │  Cap report │               │
│             │  └─────────────┘ └─────────────┘               │
│             │                                                   │
│             │  ┌──────────────────────────────┐               │
│             │  │ 🔧 Acciones Rápides          │               │
│             │  │                              │               │
│             │  │ [📂 Categoríes] [⚠️ Reportes] │               │
│             │  │ [✈️ Experiències][👥 Usuaris]│               │
│             │  └──────────────────────────────┘               │
│             │                                                   │
│             │  ┌──────────────────────────────┐               │
│             │  │ 📊 Estado del Sistema        │               │
│             │  │                              │               │
│             │  │ 🟢 Plataforma activa         │               │
│             │  │ 🟢 Moderació activa          │               │
│             │  │ 🟢 Cap reportes pendents     │               │
│             │  └──────────────────────────────┘               │
│             │                                                   │
│             │  ┌──────────────────────────────┐               │
│             │  │ 📝 Informació del Sistema    │               │
│             │  │                              │               │
│             │  │ Categoríes: 9                │               │
│             │  │ Usuaris: 0                   │               │
│             │  │ Experiències: 0              │               │
│             │  └──────────────────────────────┘               │
│             │                                                   │
└─────────────┴───────────────────────────────────────────────────┘
```

### Paleta de Colores Usada:
- **Fondo**: `bg-admin-bg` (#0a0a0b)
- **Tarjetas**: `bg-admin-surface` (#1a1d20)
- **Texto**: `text-admin-text` (#e5e7eb)
- **Iconos**: Emojis descriptivos
- **Bordes**: `border-admin-border` (#333333)

---

## ⚠️ Página de Reportes

### Estado con Reportes Pendientes

```
┌─────────────────────────────────────────────────────────────────┐
│ Panel d'Administració                          Benvingut, Admin │
├─────────────┬───────────────────────────────────────────────────┤
│             │                                                   │
│  SIDEBAR    │  Gestión de Reportes                             │
│             │  Tienes 3 experiencias reportadas               │
│  📊Dashboard│                                                   │
│  📂Categoríes│  ┌─────────────────────────────────────────────┐│
│  ✈️Experiències│  │ ID │ Título         │ Autor  │ Descripción   ││
│  👥Usuaris  │  ├─────────────────────────────────────────────┤│
│  ⚠️Reportes │  │ #1 │ Trekking Mont.. │ Juan   │ Una experiencia││
│             │  │    │                 │        │ [✓][🗑️][👁️]   ││
│             │  ├─────────────────────────────────────────────┤│
│             │  │ #2 │ Barcelona City  │ María  │ Visita guiada  ││
│             │  │    │ Tour            │        │ [✓][🗑️][👁️]   ││
│             │  ├─────────────────────────────────────────────┤│
│             │  │ #3 │ Sagrada Familia │ Pedro  │ Arquitectura   ││
│             │  │    │                 │        │ [✓][🗑️][👁️]   ││
│             │  └─────────────────────────────────────────────┘│
│             │                                                   │
└─────────────┴───────────────────────────────────────────────────┘
```

### Acciones por Fila:
- **✓ Revisado** (Verde, `bg-admin-success`) → Marca como revisado
- **🗑️ Eliminar** (Rojo, `bg-admin-danger`) → Elimina la experiencia
- **👁️ Ver** (Azul, `bg-admin-accent`) → Abre en nueva pestaña

### Estado sin Reportes

```
┌─────────────────────────────────────────────────────────────────┐
│ Panel d'Administració                          Benvingut, Admin │
├─────────────┬───────────────────────────────────────────────────┤
│             │                                                   │
│  SIDEBAR    │  Gestión de Reportes                             │
│             │  No hay experiencias reportadas                  │
│  📊Dashboard│                                                   │
│  📂Categoríes│           ┌──────────────────────┐              │
│  ✈️Experiències│           │        ✅            │              │
│  👥Usuaris  │           │     ¡Perfecto!       │              │
│  ⚠️Reportes │           │                      │              │
│             │           │  No hay experiencias │              │
│             │           │  reportadas en este  │              │
│             │           │  momento.            │              │
│             │           └──────────────────────┘              │
│             │                                                   │
└─────────────┴───────────────────────────────────────────────────┘
```

---

## 🎨 Paleta de Colores - Referencia Visual

### Colores Base

```
┌────────────────────────────────────────────────┐
│ ADMIN-BG      #0a0a0b  (Fondo Principal)      │
│ ████████████████████████████████████████████  │
│ Fondo más oscuro para toda la aplicación      │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ ADMIN-SURFACE #1a1d20  (Tarjetas/Componentes) │
│ ████████████████████████████████████████████  │
│ Fondo de tarjetas y paneles                   │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ ADMIN-BORDER  #333333  (Bordes)               │
│ ████████████████████████████████████████████  │
│ Líneas y separadores                          │
└────────────────────────────────────────────────┘
```

### Colores de Texto

```
┌────────────────────────────────────────────────┐
│ ADMIN-TEXT    #e5e7eb  (Texto Principal)      │
│ ████████████████████████████████████████████  │
│ Texto claro y legible                         │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ ADMIN-TEXT-MUTED #9ca3af (Texto Secundario)  │
│ ████████████████████████████████████████████  │
│ Descripciones y texto apagado                 │
└────────────────────────────────────────────────┘
```

### Colores de Acción

```
┌────────────────────────────────────────────────┐
│ ADMIN-ACCENT  #3b82f6  (Azul Principal)       │
│ ████████████████████████████████████████████  │
│ Botones principales, estado activo            │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ ADMIN-SUCCESS #10b981  (Verde)                │
│ ████████████████████████████████████████████  │
│ Acciones exitosas, confirmaciones             │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ ADMIN-WARNING #f59e0b  (Ámbar)                │
│ ████████████████████████████████████████████  │
│ Advertencias, información importante          │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ ADMIN-DANGER  #ef4444  (Rojo)                 │
│ ████████████████████████████████████████████  │
│ Acciones destructivas, peligro                │
└────────────────────────────────────────────────┘
```

---

## 🧩 Componentes Visuales

### StatCard (Tarjeta de Estadística)

```
┌──────────────────────────┐
│ ✈️ Experiències          │
│                          │
│ 0                        │
│                          │
│ +12% este mes            │
└──────────────────────────┘
```

- Fondo: Color distintivo (azul, verde, púrpura, rojo)
- Ícono: Emoji representativo
- Valor: Número grande
- Tendencia: Texto pequeño con información

### Botón Estándar

```
┌──────────────────┐
│ [✓ Revisado]     │  Verde (admin-success)
│ [🗑️ Eliminar]    │  Rojo (admin-danger)
│ [👁️ Ver]         │  Azul (admin-accent)
└──────────────────┘
```

- Padding: px-3 py-2
- Rounded: md (border-radius medio)
- Hover: Versión más oscura con opacity
- Transición: 200ms

### Panel de Información

```
┌──────────────────────────────────┐
│ 📝 Título del Panel              │
│ ────────────────────────────────│
│ ● Estado 1                       │
│ ● Estado 2                       │
│ ● Estado 3                       │
└──────────────────────────────────┘
```

- Fondo: admin-surface
- Borde: 1px solid admin-border
- Border-radius: lg (8px)
- Padding: 6 (1.5rem)

---

## 📊 Layout Responsivo

### Desktop (lg: > 1024px)
- Sidebar: 250px (fijo)
- Grid de estadísticas: 4 columnas
- Panel de acciones: 2 columnas (2/3 ancho)
- Panel de estado: 1 columna (1/3 ancho)

### Tablet (md: 640px - 1024px)
- Sidebar: 250px (fijo)
- Grid de estadísticas: 2 columnas
- Paneles: Full width (1 columna)

### Mobile (sm: < 640px)
- Sidebar: Colapsable a 80px
- Grid de estadísticas: 1 columna
- Paneles: Full width

---

## 🔄 Flujos de Interacción

### Flujo 1: Revisar Reportes

```
1. Usuario navega a /admin/reports
   ↓
2. Se carga tabla de experiencias reportadas
   ↓
3. Usuario selecciona acción:
   ├─ Click "Ver" → Abre nueva pestaña
   ├─ Click "Revisado" → Pregunta confirmación
   │                    → Marca como revisado
   │                    → Recarga tabla
   └─ Click "Eliminar" → Pregunta confirmación
                        → Elimina experiencia
                        → Recarga tabla
```

### Flujo 2: Dashboard

```
1. Usuario navega a /admin
   ↓
2. Se cargan estadísticas desde backend
   ↓
3. Se renderiza dashboard con:
   ├─ Tarjetas de estadísticas
   ├─ Acciones rápidas
   ├─ Estado del sistema
   └─ Información destacada
   ↓
4. Usuario puede navegar mediante:
   ├─ Botones de acciones rápidas
   ├─ Items del sidebar
   └─ Rutas directas
```

---

## 💾 Estructura de Carpetas Visualizada

```
projecte_viatges/
├── 📄 ADMIN_DASHBOARD_DOCS.md ← Documentación completa
├── 📄 ADMIN_QUICK_REFERENCE.md ← Referencia rápida
├── 📄 ADMIN_VISUALS.md ← Este archivo
│
├── tailwind.config.js ← Colores centralizados
│
├── resources/
│   └── js/
│       ├── Pages/Admin/
│       │   ├── Dashboard.jsx ← Dashboard principal
│       │   └── Reports/
│       │       └── Index.jsx ← Tabla de reportes
│       │
│       ├── Layouts/
│       │   └── AdminLayout.jsx ← Contenedor base
│       │
│       └── Components/Admin/
│           ├── AdminHeader/
│           │   ├── AdminHeader.jsx
│           │   └── AdminHeader.module.scss
│           │
│           └── AdminSidebar/
│               ├── AdminSidebar.jsx
│               └── AdminSidebar.module.scss
│
├── app/Http/Controllers/
│   └── AdminController.php ← Métodos para reportes
│
└── routes/
    └── web.php ← Nuevas rutas

```

---

**Última actualización**: 7 de Abril de 2026  
**Versión**: 1.0
