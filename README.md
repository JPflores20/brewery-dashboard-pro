# 🍺 Brewery Dashboard Pro

> **Dashboard de Autonomía** — Tablero TPM de Elaboración del Proyecto ZEUS para la planta cervecera CCZ (Cervecería Cruz Blanca Zacatecas).  
> Visualiza en tiempo real los niveles de autonomía, SKAP, multi-habilidad, rankings de equipos autónomos y reconocimientos de operadores en las áreas de Cocimientos, Bloque Frío y Mantenimiento.

---

## 📋 Tabla de Contenido

- [Vista General](#-vista-general)
- [Tech Stack](#-tech-stack)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura de Carpetas](#-estructura-de-carpetas)
- [Arquitectura de la Aplicación](#-arquitectura-de-la-aplicación)
- [Fuentes de Datos (Excel)](#-fuentes-de-datos-excel)
- [Componentes Principales](#-componentes-principales)
- [Configuración de Firebase](#-configuración-de-firebase)
- [Despliegue](#-despliegue)
- [Variables de Entorno](#-variables-de-entorno)
- [Convenciones del Proyecto](#-convenciones-del-proyecto)

---

## 🔭 Vista General

El dashboard se divide en **4 vistas** seleccionables desde la barra de navegación:

| Vista | Descripción |
|---|---|
| **General** | Resumen consolidado de toda la planta |
| **Cocimientos** | Área de Sala de Cocción (Warm Block) |
| **Bloque Frío** | Área de Fermentación y Filtración (Cold Block) |
| **Mantenimiento** | Área de Mantenimiento Cervecero (Brewing Maintenance) |

Cada vista muestra:
- **Encabezado del equipo** con tarjetas de equipos autónomos, líder y miembros.
- **Tarjeta de Excelencia** con podio de los 5 mejores operadores.
- **Ranking de Equipos** por promedio de autonomía.
- **Gauge de Autonomía** con nivel (1–4) y tendencia sparkline.
- **Promedio por Factor** (Dinámica, Liderazgo, SKAP, ATO, Seguridad, QUAS, etc.).
- **Matriz SKAP** (tablero físico) con niveles Básico / Intermedio / Avanzado, champions, ATO y pre-requisitos por operador.

---

## 🛠 Tech Stack

| Categoría | Tecnología |
|---|---|
| **Framework** | [TanStack Start](https://tanstack.com/start) (React 19 + SSR) |
| **Bundler** | [Vite 7](https://vite.dev/) |
| **Router** | [TanStack Router](https://tanstack.com/router) (file-based routing) |
| **Lenguaje** | TypeScript 5.8 |
| **Estilos** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Componentes UI** | [shadcn/ui](https://ui.shadcn.com/) (estilo New York, 46 componentes) |
| **Íconos** | [Lucide React](https://lucide.dev/) |
| **Gráficas** | [Recharts](https://recharts.org/) |
| **Animaciones** | [Framer Motion](https://www.framer.com/motion/) |
| **Datos Excel** | [SheetJS (xlsx)](https://sheetjs.com/) |
| **Formularios** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Exportación PDF** | [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) |
| **Backend/DB** | [Firebase](https://firebase.google.com/) (Firestore + Analytics + Hosting) |
| **Edge Runtime** | [Cloudflare Workers](https://workers.cloudflare.com/) (via Wrangler) |
| **Dev Tooling** | ESLint, Prettier, Lovable Vite Config |

---

## 📌 Requisitos Previos

- **Node.js** ≥ 18 (recomendado 20+)
- **npm** ≥ 9 (o **bun** si prefieres, el proyecto incluye `bun.lockb`)
- **Firebase CLI** (solo para despliegue): `npm install -g firebase-tools`

---

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/JPflores20/brewery-dashboard-pro.git
cd brewery-dashboard-pro

# 2. Instalar dependencias
npm install
# o con bun:
bun install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|---|---|---|
| **dev** | `npm run dev` | Inicia el servidor de desarrollo con HMR |
| **build** | `npm run build` | Build de producción (Vite build + SSR prerender via `postbuild.mjs`) |
| **build:dev** | `npm run build:dev` | Build en modo development (sin minificación) |
| **preview** | `npm run preview` | Preview local del build de producción |
| **lint** | `npm run lint` | Ejecuta ESLint en todo el proyecto |
| **format** | `npm run format` | Formatea el código con Prettier |

### Script de Post-Build (`scripts/postbuild.mjs`)

Después del build de producción, este script:
1. Importa el servidor SSR generado (`dist/server/index.js`).
2. Simula una petición HTTP al path `/`.
3. Genera un `index.html` pre-renderizado en `dist/client/` para servir HTML estático con SEO completo.

---

## 📁 Estructura de Carpetas

```
brewery-dashboard-pro/
│
├── 📁 public/                          # Archivos estáticos servidos directamente
│   ├── 📁 fotos/                       # Fotografías de operadores
│   ├── 📁 logos/                       # Logos (BREWMAN, etc.)
│   ├── 📊 0. BASE EQUIPOS AUTÓNOMOS CCZ (3).xlsx   # Catálogo base de operadores + champions
│   ├── 📊 BPRE.xlsx                    # Promedio por factor de autonomía por área
│   ├── 📊 DATOS.xlsx                   # Datos SKAP principales (niveles básico/intermedio/avanzado)
│   ├── 📊 DATOS V1.xlsx               # Versión anterior de datos (respaldo)
│   ├── 📊 EABF.xlsx                   # Equipos Autónomos de Bloque Frío
│   └── 📊 EAC.xlsx                    # Equipos Autónomos de Cocimientos
│
├── 📁 scripts/
│   └── 📄 postbuild.mjs               # SSR prerender post-build
│
├── 📁 src/                             # Código fuente principal
│   │
│   ├── 📁 components/
│   │   ├── 📁 ui/                      # 46 componentes shadcn/ui (Radix + Tailwind)
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx              # Wrapper para Recharts
│   │   │   ├── dialog.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ... (38 más)
│   │   │
│   │   └── 📁 zeus/                    # Componentes de negocio del dashboard
│   │       │
│   │       ├── 📄 TopNav.tsx           # Barra de navegación principal con tabs de área y reloj
│   │       ├── 📄 IPsTrackingCard.tsx  # Tarjeta de seguimiento de IPs (indicadores de proceso)
│   │       ├── 📄 StatusIcon.tsx       # Ícono de estado (ok/warn/fail)
│   │       ├── 📄 SystemBadge.tsx      # Badge de sistema (SAP, MES, ACADIA, etc.)
│   │       ├── 📄 dashboard_skeleton.tsx # Skeleton loader mientras cargan datos
│   │       ├── 📄 sparkline.tsx        # Mini gráfica de tendencia inline
│   │       │
│   │       ├── 📁 autonomy_card/       # Tarjeta de nivel de autonomía
│   │       │   ├── autonomy_card.tsx   # Componente principal con gauge + sparkline
│   │       │   ├── autonomy_gauge.tsx  # Gauge SVG circular de autonomía (0–4)
│   │       │   ├── constants.ts        # Constantes (colores de niveles)
│   │       │   ├── index.ts            # Re-export
│   │       │   └── utils.ts            # Helpers de cálculo
│   │       │
│   │       ├── 📁 excellence_card/     # Tarjeta de excelencia y podio
│   │       │   ├── excellence_card.tsx  # Card con podio + logros + chart
│   │       │   ├── podium_item.tsx     # Componente de cada posición del podio (1°–5°)
│   │       │   ├── achievement_list.tsx # Lista de logros del equipo
│   │       │   ├── team_excellence_chart.tsx # Gráfica de excelencia del equipo
│   │       │   ├── constants.ts
│   │       │   ├── index.ts
│   │       │   └── utils.ts
│   │       │
│   │       ├── 📁 physical_board/      # Tablero Físico / Matriz SKAP
│   │       │   ├── physical_board.tsx  # Contenedor de la matriz completa
│   │       │   ├── operator_row.tsx    # Fila de operador (nombre, SKAP, ATO, champions)
│   │       │   ├── operator_avatar.tsx # Avatar con iniciales del operador
│   │       │   ├── ip_mediator.tsx     # Mediador de IPs en la matriz
│   │       │   ├── ato_editor.tsx      # Editor inline del nivel ATO
│   │       │   ├── multi_skill_editor.tsx # Editor de multi-habilidades
│   │       │   ├── pre_req_editor.tsx  # Editor de pre-requisitos
│   │       │   ├── 📁 cells/           # Celdas individuales de la matriz
│   │       │   ├── constants.ts
│   │       │   ├── index.ts
│   │       │   └── utils.ts
│   │       │
│   │       ├── 📁 promedio_por_factor_card/ # Tarjeta de promedio por factor
│   │       │   ├── promedio_por_factor_card.tsx # Componente principal
│   │       │   ├── factor_item.tsx     # Item individual de factor (Dinámica, Liderazgo, etc.)
│   │       │   ├── constants.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── 📁 skill_matrix_card/   # Tarjeta de matriz de habilidades
│   │       │   ├── skill_matrix_card.tsx # Card con resumen de multi-skill
│   │       │   ├── operator_item.tsx   # Item de operador con barras de progreso
│   │       │   ├── skill_bar.tsx       # Barra de progreso de habilidad
│   │       │   ├── constants.ts
│   │       │   ├── index.ts
│   │       │   └── utils.ts
│   │       │
│   │       ├── 📁 team_header/         # Encabezado con tarjetas de equipos autónomos
│   │       │   ├── team_header.tsx     # Contenedor del header
│   │       │   ├── team_card.tsx       # Card individual de equipo con líder y miembros
│   │       │   ├── fullscreen_button.tsx # Botón de pantalla completa
│   │       │   ├── constants.ts
│   │       │   └── index.ts
│   │       │
│   │       └── 📁 team_ranking_card/   # Tarjeta de ranking de equipos
│   │           ├── team_ranking_card.tsx # Card con lista ordenada de equipos
│   │           ├── ranking_item.tsx    # Item de ranking con posición y barra
│   │           ├── leader_avatar.tsx   # Avatar del líder del equipo
│   │           ├── constants.ts
│   │           ├── index.ts
│   │           └── utils.ts
│   │
│   ├── 📁 data/
│   │   └── 📄 zeus.ts                 # Tipos (Operator, AreaData, IPRow, etc.) + datos fallback
│   │
│   ├── 📁 functions/                   # (Vacío — reservado para Cloud Functions)
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 useExcelData.ts         # Hook principal: carga y parsea todos los Excel al iniciar
│   │   └── 📄 use-mobile.tsx          # Hook para detectar viewport móvil
│   │
│   ├── 📁 interfaces/                  # (Vacío — reservado para interfaces adicionales)
│   │
│   ├── 📁 lib/
│   │   ├── 📄 firebase.ts             # Inicialización de Firebase (app, db, analytics)
│   │   ├── 📄 export.ts               # Función exportToPDF() con html2canvas + jsPDF
│   │   └── 📄 utils.ts                # cn() (clsx + twMerge) + getLeaderColor()
│   │
│   ├── 📁 routes/                      # Rutas TanStack Router (file-based)
│   │   ├── 📄 __root.tsx              # Layout raíz (HTML shell, meta tags, 404)
│   │   └── 📄 index.tsx               # Página principal del dashboard
│   │
│   ├── 📄 routeTree.gen.ts            # Árbol de rutas auto-generado (no editar manualmente)
│   ├── 📄 router.tsx                  # Configuración del router + error boundary
│   └── 📄 styles.css                  # Estilos globales (Tailwind + variables CSS de shadcn)
│
├── 📄 app.config.ts                    # Config de TanStack Start (preset: static, prerender: /)
├── 📄 vite.config.ts                   # Config de Vite (via @lovable.dev/vite-tanstack-config)
├── 📄 tsconfig.json                    # Config de TypeScript (ES2022, Bundler mode, @/* alias)
├── 📄 components.json                  # Config de shadcn/ui (style: new-york, base: slate)
├── 📄 eslint.config.js                 # Config de ESLint
├── 📄 .prettierrc                      # Config de Prettier
├── 📄 firebase.json                    # Config de Firebase Hosting (public: dist/client)
├── 📄 .firebaserc                      # Proyecto Firebase: preview-bbe71
├── 📄 firestore.rules                  # Reglas de Firestore (lectura/escritura abierta)
├── 📄 firestore.indexes.json           # Índices de Firestore
├── 📄 wrangler.jsonc                   # Config de Cloudflare Workers
├── 📄 package.json                     # Dependencias y scripts
├── 📄 bun.lockb                        # Lockfile de Bun
└── 📄 .gitignore                       # Archivos ignorados por Git
```

---

## 🏗 Arquitectura de la Aplicación

```
┌────────────────────────────────────────────────────────────────┐
│                        TopNav (tabs)                           │
│        GENERAL │ COCIMIENTOS │ BLOQUE FRÍO │ MANTENIMIENTO     │
└──────────────────────────┬─────────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │  index.tsx  │  ← Página principal
                    │  (Route /)  │
                    └──────┬──────┘
                           │
              ┌────────────▼────────────┐
              │    useExcelData()       │  ← Hook que carga 5 archivos .xlsx
              │  Retorna: general,      │     al montar el componente
              │  cocimientos, bloqueFrio,│
              │  mantenimiento, loading  │
              └────────────┬────────────┘
                           │
     ┌─────────────────────┼─────────────────────┐
     │                     │                     │
     ▼                     ▼                     ▼
┌─────────┐         ┌───────────┐        ┌──────────────┐
│ Team    │         │ Excellence│        │ Autonomy     │
│ Header  │         │ Card      │        │ Card + Gauge │
└─────────┘         │ + Ranking │        │ + Promedio   │
                    └───────────┘        └──────────────┘
                           │
                    ┌──────▼──────┐
                    │ Physical   │  ← Tablero SKAP completo
                    │ Board      │     (Matriz de operadores)
                    └─────────────┘
```

### Flujo de Datos

1. **Carga**: `useExcelData()` hace `fetch()` de los archivos `.xlsx` desde `public/`.
2. **Parseo**: Usa `xlsx` (SheetJS) para convertir hojas de Excel en arrays de objetos JS.
3. **Clasificación**: Separa operadores por área (Warm Block, Cold Block, Brewing Maintenance).
4. **Enriquecimiento**: Cruza datos con las tablas de Equipos Autónomos (EAC/EABF) y Champions.
5. **Cálculos**: Genera rankings, promedios, podios y niveles de autonomía.
6. **Render**: Los componentes reciben los datos calculados como props y renderizan la UI.

---

## 📊 Fuentes de Datos (Excel)

Los archivos Excel en `public/` son la fuente de verdad del dashboard:

| Archivo | Contenido |
|---|---|
| `DATOS.xlsx` | Datos SKAP principales: operadores con niveles Básico, Intermedio y Avanzado por pilar (Safety, Quality, Environment, etc.) |
| `0. BASE EQUIPOS AUTÓNOMOS CCZ (3).xlsx` | Catálogo base con ID Sharp de cada operador y su rol de Champion (Seguridad, Calidad, Ambiental, etc.) |
| `EAC.xlsx` | Asignación de operadores a Equipos Autónomos de **Cocimientos** (nombre del equipo + líder) |
| `EABF.xlsx` | Asignación de operadores a Equipos Autónomos de **Bloque Frío** (nombre del equipo + líder) |
| `BPRE.xlsx` | Promedios por factor de autonomía por área (Dinámica, Liderazgo, SKAP, ATO, Seguridad, QUAS, Multi-hab, VPO, Solución de Problemas, Infraestructura) |

### ¿Cómo actualizar los datos?

1. Reemplaza el archivo `.xlsx` correspondiente en la carpeta `public/`.
2. Mantén la misma estructura de columnas y nombre de hojas.
3. Recarga la aplicación — los datos se cargan dinámicamente al iniciar.

> **Nota**: Los datos incluyen un timestamp `?t=` en cada fetch para evitar el caché del navegador.

---

## 🧩 Componentes Principales

### Componentes de Negocio (`src/components/zeus/`)

| Componente | Descripción |
|---|---|
| **TopNav** | Barra superior con logo, tabs de área (General/Cocimientos/Bloque Frío/Mantenimiento) y reloj en tiempo real |
| **TeamHeader** | Grid de tarjetas de equipos autónomos con líder, miembros y promedio |
| **ExcellenceCard** | Podio Top 5, lista de logros y gráfica de excelencia del equipo |
| **TeamRankingCard** | Ranking ordenado de equipos por promedio de autonomía con barras de progreso |
| **AutonomyCard** | Gauge SVG circular (0–4) con nivel de autonomía + sparkline de tendencia |
| **PromedioPorFactorCard** | 10 factores de autonomía con valores numéricos y barras de color |
| **PhysicalBoard** | Matriz SKAP completa: filas de operadores con niveles, champions, ATO y editores inline |
| **SkillMatrixCard** | Resumen de multi-habilidades por operador |
| **DashboardSkeleton** | Skeleton loader animado durante la carga de datos |

### Componentes UI (`src/components/ui/`)

46 componentes [shadcn/ui](https://ui.shadcn.com/) con estilo **New York** y base de color **Slate**. Incluyen: `accordion`, `alert-dialog`, `avatar`, `badge`, `button`, `card`, `chart`, `dialog`, `dropdown-menu`, `form`, `input`, `select`, `sidebar`, `table`, `tabs`, `tooltip`, entre otros.

---

## 🔥 Configuración de Firebase

| Propiedad | Valor |
|---|---|
| **Proyecto** | `preview-bbe71` |
| **Hosting** | `dist/client` → Firebase Hosting con SPA rewrite |
| **Firestore** | Base de datos activa (reglas abiertas en desarrollo) |
| **Analytics** | Google Analytics habilitado |

### Archivos de configuración

- **`firebase.json`** — Hosting (public: `dist/client`, rewrite `**` → `index.html`) + Firestore rules.
- **`.firebaserc`** — Alias del proyecto (`default` → `preview-bbe71`).
- **`firestore.rules`** — Reglas actuales: lectura y escritura abierta (`allow read, write: if true`).
- **`src/lib/firebase.ts`** — Inicialización del SDK (app, db, analytics).

> ⚠️ **Importante**: Las reglas de Firestore actuales permiten acceso abierto. Para producción, restringe el acceso según autenticación.

---

## 🚢 Despliegue

### Firebase Hosting

```bash
# 1. Build de producción
npm run build

# 2. Desplegar a Firebase Hosting
firebase deploy --only hosting
```

### Cloudflare Workers (alternativa)

El proyecto incluye configuración de Cloudflare Workers (`wrangler.jsonc`):

```bash
# Desplegar a Cloudflare
npx wrangler deploy
```

---

## 🔐 Variables de Entorno

Las variables de entorno con prefijo `VITE_*` se inyectan automáticamente por el plugin de Lovable.

Actualmente las credenciales de Firebase están hardcodeadas en `src/lib/firebase.ts`. Para mayor seguridad, mueve a variables de entorno:

```bash
# .env.local (no se sube a Git)
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=preview-bbe71.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=preview-bbe71
```

---

## 📐 Convenciones del Proyecto

| Concepto | Convención |
|---|---|
| **Alias de importación** | `@/*` apunta a `src/*` |
| **Componentes Zeus** | Carpetas con `index.ts` + componente principal + `constants.ts` + `utils.ts` |
| **Componentes UI** | Archivos individuales en `src/components/ui/` (shadcn) |
| **Nombres de archivos** | `snake_case` para componentes Zeus, `kebab-case` para UI |
| **TypeScript** | Modo estricto habilitado, target ES2022 |
| **Estilos** | Tailwind CSS v4 con variables CSS de shadcn |
| **Formateo** | Prettier configurado en `.prettierrc` |
| **Linting** | ESLint con plugins de React Hooks y React Refresh |

---

## 📄 Licencia

Proyecto privado — Uso interno de Corona / Grupo Modelo.

---

<p align="center">
  Cervecería CCZ
</p>
