# 🌍 Viatges

> Aplicació web per gestionar i compartir experiències de viatges

---

## 👥 Integrants

| Nom |
|-----|
| *Daniel* |
| *Marta* |
| *Iván* |

---

## 🎯 Objectiu

**Viatges** és una aplicació web de tipus SPA (Single Page Application) on els usuaris poden compartir les seves experiències de viatge: rutes, allotjaments, fotografies, recomanacions i molt més. El contingut és generat pels mateixos usuaris, que poden crear, valorar i gestionar experiències.

---

## 🛠️ Tecnologies

| Capa | Tecnologia |
|------|-----------|
| Frontend | React + SCSS / Tailwind |
| Backend | Laravel (PHP) |
| Base de dades | sqlite |
| Mapes | OpenStreetMap + Leaflet |
| Imatges | Cloudinary (CDN) |
| Control de versions | GitHub |

---

## 🚀 Instal·lació

### Requisits previs

- PHP >= 8.1
- Composer
- Node.js >= 18
- Sqlite

### Passos

```bash
# 1. Clonar el repositori
git clone https://github.com/<usuari>/viatges.git
cd viatges

# 2. Instal·lar dependències del backend
composer install

# 3. Configurar variables d'entorn
cp .env.example .env
php artisan key:generate

# 4. Configurar la base de dades al fitxer .env i executar les migracions
php artisan migrate --seed

# 5. Instal·lar dependències del frontend
npm install

# 6. Compilar els assets
npm run dev
```

---

## ⚙️ Entorns

| Entorn | Descripció |
|--------|-----------|
| **Desenvolupament** | `npm run dev` + `php artisan serve` en local |
| **Preproducció** | Desplegament en servidor de proves amb `.env.staging` |
| **Producció** | Desplegament en servidor definitiu amb `.env.production` |

---

## 📁 Estructura del repositori

```
viatges/
├── app/                  # Lògica del backend (Laravel)
├── database/
│   ├── migrations/       # Migracions de la BD
│   └── seeders/          # Dades de prova
├── resources/
│   ├── js/               # Codi React (frontend SPA)
│   └── sass/             # Estils SCSS
├── routes/               # Definició de rutes API i web
├── public/               # Fitxers públics
├── docs/
│   ├── esquema.pdf       # Esbós de l'estructura
│   ├── diagrama-bd.pdf   # Diagrama relacional de la BD
│   └── logotip.*         # Fitxer del logotip
├── sql/
│   ├── creacio_base_de_dades.sql       # Script de creació de la BD
│   └── dades_prova.sql   # Script amb dades de prova
├── SEGURETAT.txt         # Aspectes de seguretat documentats
└── README.md
```

---

## 📋 Funcionalitats principals

- 🔍 Consulta d'experiències sense registre (títols)
- 📖 Visualització completa d'experiències (usuari registrat)
- ✍️ Creació i edició d'experiències pròpies
- ⭐ Sistema de votació (+1 / -1)
- 🗂️ Filtre per categoria i ordenació per data o puntuació
- 🚩 Reportar contingut inadequat
- 🗺️ Mapa integrat amb coordenades de cada experiència
- 🔧 Panell d'administració (gestió d'usuaris, categories i reportes)

---

## 📊 Estat d'avançament

### Disseny i base de dades
- [x] Esbós de l'estructura del lloc web
- [x] Definició del propòsit, tema i esquema de colors
- [x] Diagrama relacional de la base de dades
- [x] Script SQL de creació
- [x] Script SQL amb dades de prova
- [x] Logotip

### Frontend (CSS / GUI)
- [x] Maquetació de la pàgina principal
- [x] Navegació operativa (SPA)
- [x] Estètica coherent a totes les pantalles
- [x] Validació de formularis al client
- [x] Registre d'usuaris funcional

### Backend
- [x] Connexió amb la base de dades
- [x] Autenticació i sessions
- [x] CRUD d'experiències
- [x] Sistema de votació
- [x] Buscador i filtres
- [x] Secció d'administració
- [x] Reportar abusos

### Qualitat i desplegament
- [x] Responsive design
- [x] Lazy loading d'imatges
- [x] Integració amb Cloudinary
- [x] Entorns documentats
- [x] Publicació a GitHub
