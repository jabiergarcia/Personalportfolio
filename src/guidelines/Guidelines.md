# 📘 Portfolio - Documentación Técnica

> **Última actualización**: 2 de marzo de 2026  
> **Versión**: 2.0  
> **Mantenedor**: Jabier García Sanz

---

## Índice

1. [Visión General del Proyecto](#1-visión-general-del-proyecto)
2. [Arquitectura del Proyecto](#2-arquitectura-del-proyecto)
3. [Sistema de Diseño](#3-sistema-de-diseño)
4. [Componentes](#4-componentes)
5. [Patrones de Interacción](#5-patrones-de-interacción)
6. [Accesibilidad](#6-accesibilidad)
7. [Performance](#7-performance)
8. [SEO y Metaestructura](#8-seo-y-metaestructura)
9. [Gestión de Estado y Datos](#9-gestión-de-estado-y-datos)
10. [Convenciones y Buenas Prácticas](#10-convenciones-y-buenas-prácticas)
11. [Roadmap Técnico](#11-roadmap-técnico)

---

## 1. Visión General del Proyecto

### 1.1 Propósito

Portfolio personal de Jabier García Sanz, diseñador UX/UI, creado para mostrar proyectos profesionales y facilitar conexiones laborales. El portfolio actúa como una demostración práctica de habilidades en diseño, desarrollo y accesibilidad web.

### 1.2 Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **React** | 18+ | Framework principal |
| **TypeScript** | 5+ | Tipado estático |
| **Tailwind CSS** | v4.0 | Framework de estilos |
| **Motion (Framer Motion)** | Latest | Sistema de animaciones |
| **Vite** | Latest | Build tool & dev server |
| **Supabase** | - | Backend (Storage, KV database, Auth) |
| **Cloudflare** | - | Hosting & CDN |

**Librerías adicionales:**
- `lucide-react` - Iconografía
- `sonner` - Sistema de notificaciones toast
- `react-slick` - Carouseles de imágenes
- `react-router` - Enrutamiento SPA

### 1.3 Tipo de Renderizado

**SPA (Single Page Application)** con:
- Cliente-side routing (react-router)
- Pre-renderizado selectivo para SEO (archivos HTML estáticos para crawlers)
- Lazy loading de páginas y componentes pesados
- Service Worker para caché offline

### 1.4 Arquitectura General

**Basada en componentes modulares** con separación clara de responsabilidades:

```
├── Presentación → Componentes UI puros
├── Lógica → Custom hooks
├── Estado → Context API (no Redux)
├── Datos → Supabase + constantes centralizadas
└── Estilos → Tailwind CSS + CSS Variables
```

**Principios:**
- Component-driven development
- Separation of concerns
- DRY (Don't Repeat Yourself)
- Mobile-first responsive design
- Progressive enhancement

### 1.5 Convenciones Generales

- **Naming**: PascalCase para componentes, camelCase para funciones/variables
- **Estructura de archivos**: Un componente por archivo
- **Imports**: Absolute paths desde `/` (configurado en Vite)
- **Comentarios**: JSDoc para funciones complejas, inline para lógica específica
- **Git**: Conventional commits (feat, fix, docs, style, refactor, test, chore)

---

## 2. Arquitectura del Proyecto

### 2.1 Estructura de Carpetas

```
/
├── components/                 # Componentes React
│   ├── ui/                    # Componentes base reutilizables (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ... (40+ componentes)
│   ├── projects/              # Componentes específicos de proyectos
│   │   ├── assorta-project.tsx
│   │   ├── puffykitten-project.tsx
│   │   ├── project-layout.tsx
│   │   └── project-details.tsx
│   ├── figma/                 # Componentes de sistema (protegidos)
│   │   └── ImageWithFallback.tsx
│   ├── navigation.tsx         # Navegación principal
│   ├── footer.tsx            # Footer global
│   ├── hero-section.tsx      # Sección hero home
│   └── ... (30+ componentes)
│
├── contexts/                  # React Context para estado global
│   ├── language-context.tsx  # i18n system
│   └── lightbox-context.tsx  # Modal de imágenes
│
├── hooks/                     # Custom React Hooks
│   ├── use-theme.ts          # Dark/light mode
│   ├── use-language.ts       # Idioma ES/EN
│   ├── use-router.ts         # SPA routing
│   ├── use-analytics.ts      # Tracking de eventos
│   ├── use-clarity.ts        # Microsoft Clarity
│   └── ... (10 hooks)
│
├── translations/              # Sistema i18n
│   ├── es.ts                 # Español
│   ├── en.ts                 # Inglés
│   ├── projects-detail-es.ts
│   └── projects-detail-en.ts
│
├── utils/                     # Utilidades y constantes
│   ├── constants.ts          # URLs, contacto, meta info
│   ├── projects-data.ts      # Datos de proyectos
│   ├── animation-constants.ts # Configuración de animaciones
│   └── supabase/
│       └── info.tsx          # Config Supabase
│
├── styles/
│   └── globals.css           # Estilos globales + Design tokens
│
├── public/                    # Assets estáticos
│   ├── proyectos/*.html      # Pre-rendered para SEO (ES)
│   ├── projects/*.html       # Pre-rendered para SEO (EN)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sw.js                 # Service worker
│
├── scripts/                   # Build scripts
│   ├── prerender.js          # Generador de HTML estático
│   └── verify-cloudflare-seo.sh
│
├── supabase/functions/server/ # Backend
│   ├── index.tsx             # API Hono server
│   └── kv_store.tsx          # Key-value DB (protegido)
│
├── SEO/                       # Documentación SEO
│   ├── CLOUDFLARE_WORKER_GUIDE.md
│   ├── README_SEO.md
│   └── SOCIAL_SHARING.md
│
├── guidelines/                # Documentación técnica
│   ├── Guidelines.md         # Este archivo
│   └── Portfolio-Project-Documentation.md
│
├── App.tsx                    # Root component
├── index.html                # HTML entry point
└── vercel.json               # Deploy config
```

### 2.2 Separación de Responsabilidades

| Capa | Responsabilidad | Ubicación |
|------|----------------|-----------|
| **Presentación** | Componentes visuales puros | `/components/` |
| **Lógica de negocio** | Hooks reutilizables | `/hooks/` |
| **Estado global** | Context API | `/contexts/` |
| **Datos estáticos** | Constantes centralizadas | `/utils/` |
| **Estilos** | Tokens CSS + Tailwind | `/styles/globals.css` |
| **Backend** | API REST + DB | `/supabase/functions/` |
| **Assets** | Imágenes y HTML estático | `/public/` + Supabase Storage |

### 2.3 Gestión de Componentes

**Convenciones de naming:**
- Componentes: `PascalCase` (ej: `HeroSection.tsx`)
- Archivos UI base: `kebab-case.tsx` (ej: `button.tsx`)
- Hooks: `use-*.ts` (ej: `use-theme.ts`)
- Contexts: `*-context.tsx` (ej: `language-context.tsx`)

**Reutilización:**
- **UI Components** (`/components/ui/`): Componentes base compartidos (>40 componentes shadcn/ui)
- **Layout Components**: Wrappers reutilizables (PageWrapper, ProjectPageWrapper)
- **Specific Components**: Componentes únicos para páginas específicas

⚠️ **Problema detectado**: Algunos componentes específicos de proyecto tienen lógica duplicada que podría abstraerse a un hook compartido.

### 2.4 Dependencias Críticas

**Core:**
- `react` + `react-dom` - Framework base
- `motion` (Framer Motion) - Animaciones
- `tailwindcss` - Estilos
- `react-router` - Routing

**UI:**
- `lucide-react` - Iconos SVG optimizados
- `sonner` - Toast notifications
- `react-slick` - Carouseles

**Backend:**
- `hono` - Web server (Supabase Edge Function)
- Supabase client libraries

**Build:**
- `vite` - Dev server + bundler
- `typescript` - Type checking

---

## 3. Sistema de Diseño

### 3.1 Tipografía

**Familia principal:** Clash Display (Google Fonts via Fontshare)

```css
font-family: 'Clash Display', sans-serif;
```

**Pesos disponibles:**
- 400 (Normal)
- 500 (Medium) ← Más usado
- 600 (Semi-bold)
- 700 (Bold)

**Jerarquía tipográfica (responsive):**

| Elemento | Mobile | Tablet (768px+) | Desktop (1024px+) | Peso | Line-height |
|----------|--------|----------------|-------------------|------|-------------|
| H1 | 30px | 32px | 30px | 500 | 1.4 |
| H2 | 24px | 26px | 24px | 500 | 1.4 |
| H3 | 20px | 22px | 20px | 500 | 1.5 |
| H4 | 16px | 16px | 16px | 500 | 1.5 |
| Body | 16px | 16px | 16px | 400 | 1.6 |
| Small | 14px | 14px | 14px | 400 | 1.5 |
| XSmall | 12px | 12px | 12px | 400 | 1.5 |

**CSS Variables (responsive):**

```css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
}
```

### 3.2 Sistema de Color

**Paleta primaria (Light mode):**

```css
--background: #fffbf8       /* Crema cálido */
--foreground: #10252a       /* Azul oscuro casi negro */
--primary: #10252a          /* Azul oscuro */
--primary-foreground: #fffbf8
```

**Paleta secundaria:**

```css
--secondary: #70b8ba        /* Teal/Turquesa */
--accent: #d8f878           /* Lima/Verde limón */
--muted: #ffccb6            /* Melocotón */
--border: rgba(16, 37, 42, 0.1)  /* Azul con opacidad */
```

**Colores adicionales:**

| Variable | Light | Dark (OKLCH) | Uso |
|----------|-------|--------------|-----|
| `--destructive` | #d4183d | oklch(0.396 0.141 25.723) | Errores |
| `--muted-foreground` | #2d5367 | oklch(0.85 0 0) | Texto secundario |
| `--input-background` | rgba(255, 204, 182, 0.15) | oklch(0.25 0 0) | Fondos input |

**Dark mode (OKLCH):**
- Usa OKLCH para mejor interpolación de colores
- Ajuste automático de contraste
- Tokens específicos en `.dark` class

**Estados de color:**

| Estado | Clase | Color base |
|--------|-------|------------|
| Hover (links) | `hover:opacity-90` | Reduce opacidad 10% |
| Active | `active:scale-95` | Scale down |
| Focus | `focus:ring-2 ring-secondary` | Ring turquesa |
| Disabled | `opacity-50 cursor-not-allowed` | 50% opacidad |

### 3.3 Sistema de Espaciado

**Escala base:** 4px (sistema de 8px con half-steps)

**Tailwind scale:**

```
0.5 → 2px    (0.125rem)
1   → 4px    (0.25rem)
1.5 → 6px    (0.375rem)
2   → 8px    (0.5rem)
3   → 12px   (0.75rem)
4   → 16px   (1rem)
6   → 24px   (1.5rem)
8   → 32px   (2rem)
12  → 48px   (3rem)
16  → 64px   (4rem)
```

**Margins/Paddings globales:**
- Contenedor principal: `max-w-6xl mx-auto px-3 sm:px-4 lg:px-6`
- Secciones: `space-y-4 md:space-y-6`
- Cards: `p-4 md:p-6`
- Botones: `px-4 py-2 md:px-6 md:py-3`

### 3.4 Grid y Layout

**Sistema responsive:**

| Breakpoint | Ancho | Uso |
|------------|-------|-----|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

**Contenedor principal:**

```tsx
<div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
```

- Max-width: 1152px (6xl)
- Padding horizontal responsive
- Centrado automático

**Grid de proyectos:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
```

- Mobile: 1 columna
- Desktop: 2 columnas
- Gap adaptativo

### 3.5 Sombras y Elevaciones

**Sistema de elevación:**

```css
/* Sutil */
shadow-sm → box-shadow: 0 1px 2px rgba(0,0,0,0.05)

/* Estándar */
shadow → box-shadow: 0 1px 3px rgba(0,0,0,0.1)

/* Pronunciada */
shadow-lg → box-shadow: 0 10px 15px rgba(0,0,0,0.1)

/* XL (modales) */
shadow-xl → box-shadow: 0 20px 25px rgba(0,0,0,0.15)
```

**Uso común:**
- Cards: `shadow-sm hover:shadow-md`
- Modales: `shadow-xl`
- Navigation: `shadow-sm`
- Hover states: Incrementar un nivel

### 3.6 Border Radius

**Sistema unificado:**

```css
--radius: 1.5rem;  /* 24px base */

/* Variantes */
rounded-sm → calc(var(--radius) - 4px)   /* 20px */
rounded-md → calc(var(--radius) - 2px)   /* 22px */
rounded-lg → var(--radius)               /* 24px */
rounded-xl → calc(var(--radius) + 4px)   /* 28px */
```

**Uso específico:**
- Botones: `rounded-lg` (24px)
- Cards grandes: `rounded-3xl` (48px)
- Inputs: `rounded-lg`
- Imágenes hero: `rounded-3xl md:rounded-[40px]`

### 3.7 Estilo General

**Principios visuales:**
- **Minimalismo**: Interfaz limpia sin ruido visual
- **Espaciado generoso**: Breathing room entre elementos
- **Colores cálidos**: Paleta acogedora (crema + melocotón)
- **Esquinas suaves**: Border radius prominente
- **Sombras sutiles**: Elevación delicada

**Microdetalles:**
- Transiciones: `transition-all duration-200`
- Hover effects: Sutiles cambios de opacidad/escala
- Focus states: Ring secundario visible
- Glassmorphism: `backdrop-blur-md` en navegación

---

## 4. Componentes

### 4.1 Layout Components

#### **PageWrapper**
- **Ubicación**: `/components/page-wrapper.tsx`
- **Propósito**: Wrapper principal para la página home
- **Props**:
  - `onNavigateToHome`: Función navegación
  - `onNavigateToProjects`: Función navegación
  - `onNavigateToExperiences`: Función navegación
  - `isDark`: Estado dark mode
  - `onToggleTheme`: Toggle tema
  - `currentPage`: Página activa
  - `showProfileImage`: Mostrar avatar en nav
  - `isContactModalOpen`: Estado modal
  - `onOpenContact`: Abrir modal
  - `onCloseContact`: Cerrar modal
  - `children`: Contenido

- **Responsabilidad**: Incluye Navigation + ContactModal + children
- **Uso**:
```tsx
<PageWrapper {...props}>
  <div>Contenido home</div>
</PageWrapper>
```

#### **ProjectPageWrapper**
- **Ubicación**: `/components/project-page-wrapper.tsx`
- **Propósito**: Wrapper para páginas de proyecto y secundarias
- **Diferencias con PageWrapper**:
  - Opción `showNavigation` para ocultar nav
  - Opción `showFooter` para controlar footer
  - Padding ajustado para contenido largo

#### **ProjectLayout**
- **Ubicación**: `/components/projects/project-layout.tsx`
- **Propósito**: Layout estándar para páginas de detalle de proyecto
- **Secciones incluidas**:
  - Hero con imagen cover
  - Breadcrumbs
  - Título y descripción
  - Project details (fecha, equipo, metodología)
  - Secciones de contenido
  - Botón compartir
  - Related projects
  - Footer

### 4.2 Navigation Components

#### **Navigation**
- **Ubicación**: `/components/navigation.tsx`
- **Características**:
  - Fixed top navigation con backdrop blur
  - Responsive (hamburger en mobile)
  - Animación de entrada progresiva
  - Avatar JG/imagen según contexto
  - Underline animado en items activos
  - ThemeToggle + LanguageToggle integrados

**Estados:**
- Default: Transparente con blur
- Scrolled: Mismo estilo (siempre fixed)
- Mobile menu: Slide desde derecha

**Animación de entrada:**
```typescript
// Solo anima la primera vez por sesión
NAVBAR_ANIMATIONS = {
  logo: { x: -50, opacity: 0 },
  projects: { y: -30, opacity: 0 },
  experiences: { y: -30, opacity: 0 },
  contact: { scale: 0.8, opacity: 0 },
  toggle: { x: 30, opacity: 0, rotate: -180 }
}
```

#### **ThemeToggle**
- **Ubicación**: `/components/theme-toggle.tsx`
- **Función**: Switch dark/light mode
- **Animación**: Rotación de icono sol/luna

#### **LanguageToggle**
- **Ubicación**: `/components/language-toggle.tsx`
- **Función**: Toggle ES/EN
- **Animación**: Fade entre banderas

### 4.3 Home Components

#### **HeroSection**
- **Ubicación**: `/components/hero-section.tsx`
- **Estructura**:
  ```
  ┌─────────────────────────────────────┐
  │  [Imagen]      Hola 👋             │
  │                Soy Jabier...        │
  │                [Botones CTA]        │
  │                                     │
  │  [Tarjeta contacto con punto verde] │
  └─────────────────────────────────────┘
  ```

**Animación secuencial:**
1. Container fade in (0s)
2. Card background (0.2s)
3. Image + Content (0.4s en paralelo)
4. Buttons (0.6s)
5. Contact card (0.5s)
6. Green dot bounce (0.9s)

**Responsive:**
- Mobile: Stack vertical
- Desktop: Grid 2 columnas (imagen izq, contenido der)

#### **WorksSection**
- **Ubicación**: `/components/works-section.tsx`
- **Función**: Grid de ProjectCards
- **Layout**: 1 columna mobile, 2 columnas desktop

#### **StatsSection**
- **Ubicación**: `/components/stats-section.tsx`
- **Función**: Métricas clave (años experiencia, proyectos, etc.)
- **Animación**: Stagger de cards con scroll reveal

#### **ExperiencesSection**
- **Ubicación**: `/components/experiences-section.tsx`
- **Función**: Preview de experiencia laboral
- **CTA**: Botón "Ver mi trayectoria completa"

#### **Footer**
- **Ubicación**: `/components/footer.tsx`
- **Contenido**: Links sociales, copyright, contact CTA
- **Variante**: Adaptativo según página

### 4.4 Project Components

#### **ProjectCard**
- **Ubicación**: `/components/project-card.tsx`
- **Props**: `project`, `onClick`
- **Características**:
  - Imagen cover
  - Overlay con gradient
  - Tags
  - Hover: Scale + shadow
  - Click: Navigate to detail

**Estados:**
- Default: `scale(1)`
- Hover: `scale(1.02)` + shadow-lg
- Mobile: Sin hover effect

#### **ProjectDetails**
- **Ubicación**: `/components/projects/project-details.tsx`
- **Función**: Tabla de datos del proyecto
- **Campos**: Fecha, equipo, metodología, duración

#### **AssortaProject, PuffyKittenProject, etc.**
- **Ubicación**: `/components/projects/*-project.tsx`
- **Patrón común**:
  - Usa ProjectLayout
  - Define secciones específicas
  - Importa imágenes de Supabase Storage
  - Integra ImageCarousel y MosaicGallery

⚠️ **Mejora sugerida**: Refactorizar componentes de proyecto para reducir duplicación. Crear un sistema de "sections" reutilizable.

### 4.5 Media Components

#### **ImageWithFallback**
- **Ubicación**: `/components/figma/ImageWithFallback.tsx`
- **⚠️ PROTEGIDO - NO MODIFICAR**
- **Función**: Carga de imágenes con fallback y error handling
- **Props**: Igual que `<img>` nativo
- **Características**:
  - Loading state
  - Error fallback
  - Lazy loading
  - Logging detallado

#### **ImageCarousel**
- **Ubicación**: `/components/ImageCarousel.tsx`
- **Librería**: react-slick
- **Función**: Carousel de imágenes con navegación
- **Props**:
  - `images`: Array de URLs
  - `autoplay`: Boolean
  - `interval`: Number (ms)

**Características:**
- Arrows navigation
- Dots pagination
- Touch/swipe support
- Infinite loop
- Lazy loading

#### **ImageLightboxV2**
- **Ubicación**: `/components/ImageLightboxV2.tsx`
- **Función**: Modal full-screen para imágenes
- **Características**:
  - Swipe navigation (mobile)
  - Keyboard navigation (desktop)
  - Zoom controls
  - Close on backdrop click
  - Counter (imagen X de Y)

**Problema conocido**: En iOS Safari el scroll body no se bloquea completamente en algunos casos.

#### **MosaicGallery**
- **Ubicación**: `/components/mosaic-gallery.tsx`
- **Función**: Grid masonry responsive
- **Props**: `images`, `columns`
- **Librería**: react-responsive-masonry
- **Click**: Abre ImageLightboxV2

### 4.6 Timeline Components

#### **InteractiveExperienceTimeline**
- **Ubicación**: `/components/interactive-experience-timeline.tsx`
- **Función**: Timeline vertical de experiencia laboral
- **Características**:
  - Línea vertical animada
  - Iconos circular con colores
  - Expandible en mobile
  - Scroll reveal animations

**Estados de iconos:**
- Past: Opacidad reducida
- Current: Color completo + pulse
- Future: Opacidad mínima

#### **InteractiveEducationTimeline**
- **Ubicación**: `/components/interactive-education-timeline.tsx`
- **Similar a ExperienceTimeline** pero para formación académica

### 4.7 UI Components (shadcn/ui)

**Librería completa de componentes base** en `/components/ui/`:

| Componente | Archivo | Uso principal |
|------------|---------|---------------|
| Button | `button.tsx` | CTAs, acciones |
| Card | `card.tsx` | Contenedores de contenido |
| Dialog | `dialog.tsx` | Modales |
| Sheet | `sheet.tsx` | Drawer lateral (mobile menu) |
| Toast | `sonner.tsx` | Notificaciones |
| Input | `input.tsx` | Formularios |
| Textarea | `textarea.tsx` | Formularios |
| Badge | `badge.tsx` | Tags de proyecto |
| Avatar | `avatar.tsx` | Perfil usuario |
| Accordion | `accordion.tsx` | Contenido expandible |
| Tabs | `tabs.tsx` | Navegación por pestañas |
| Separator | `separator.tsx` | Divisores |

**Variantes de Button:**
```tsx
<Button variant="default" />     // Solid primary
<Button variant="secondary" />   // Teal
<Button variant="outline" />     // Border only
<Button variant="ghost" />       // Transparent
<Button variant="destructive" /> // Red
```

**Tamaños:**
```tsx
<Button size="sm" />   // Pequeño
<Button size="default" /> // Normal
<Button size="lg" />   // Grande
```

### 4.8 Form Components

#### **ContactModal**
- **Ubicación**: `/components/contact-modal.tsx`
- **Función**: Formulario de contacto en modal
- **Campos**: Nombre, Email, Asunto, Mensaje
- **Validación**: Cliente-side básica
- **Envío**: POST a `/supabase/functions/server/contact`
- **Feedback**: Toast notifications

**Estados:**
- Idle
- Submitting (disabled + loading)
- Success (toast verde)
- Error (toast rojo)

**Backend:**
- Almacena en KV store de Supabase
- Envía email via Resend API

### 4.9 Utility Components

#### **ErrorBoundary**
- **Ubicación**: `/components/error-boundary.tsx`
- **Función**: Catch de errores React
- **Fallback**: Pantalla de error amigable
- **Uso**: Wrapper de páginas

#### **LazyLoader**
- **Ubicación**: `/components/lazy-loader.tsx`
- **Función**: Suspense wrapper con timeout
- **Helper**: `createLazyComponent()`
- **Fallback**: PageLoader component

#### **PageLoader**
- **Ubicación**: `/components/page-loader.tsx`
- **Función**: Loading spinner global
- **Diseño**: Spinner centrado con logo

#### **ScrollReveal**
- **Ubicación**: `/components/scroll-reveal.tsx`
- **Función**: Wrapper para animaciones al scroll
- **Props**: `children`, `delay`, `direction`
- **Librería**: Intersection Observer + Motion

#### **StaggerContainer**
- **Ubicación**: `/components/stagger-container.tsx`
- **Función**: Animar hijos con stagger
- **Props**: `children`, `staggerDelay`

#### **DomainChecker**
- **Ubicación**: `/components/domain-checker.tsx`
- **Función**: Detecta si estás en preview/dev mode
- **Banner**: Solo en preview (no en producción)

#### **ShareProject**
- **Ubicación**: `/components/share-project.tsx`
- **Función**: Botón + modal de compartir proyecto
- **Opciones**: LinkedIn, Facebook, Twitter, WhatsApp, Email, Copiar link

### 4.10 Admin Components

#### **AdminPage**
- **Ubicación**: `/components/admin-page.tsx`
- **⚠️ Acceso**: Triple Shift (Easter egg)
- **Función**: Panel de administración
- **Características**:
  - Ver mensajes de contacto
  - Analytics básicas
  - Gestión de contenido

**Seguridad**: Sin autenticación real (solo Easter egg), no expuesto públicamente.

---

## 5. Patrones de Interacción

### 5.1 Sistema de Animaciones

**Librería**: Motion (Framer Motion)

**Archivo de configuración**: `/utils/animation-constants.ts`

#### **Easings**
```typescript
EASING = {
  standard: [0.4, 0, 0.2, 1],  // Uso general
  enter: [0, 0, 0.2, 1],       // Entradas
  exit: [0.4, 0, 1, 1],        // Salidas
  bounce: "backOut"            // Microinteracciones
}
```

#### **Duraciones**
```typescript
DURATION = {
  instant: 0.2,    // Hovers
  fast: 0.3,       // Botones
  normal: 0.5,     // Scroll reveals
  slow: 0.6,       // Modales
  narrative: 0.8   // Hero sequence
}
```

#### **Delays**
```typescript
DELAY = {
  none: 0,
  xs: 0.1,
  sm: 0.2,
  fast: 0.3,
  md: 0.4,
  lg: 0.6,
  xl: 0.8
}
```

#### **Stagger**
```typescript
STAGGER = {
  tight: 0.05,   // Icons
  small: 0.1,    // Stats
  medium: 0.15,  // Project cards
  large: 0.2     // Experience cards
}
```

### 5.2 Animaciones de Entrada (Hero)

**Secuencia hero section** (1.2s total):

```typescript
HERO_TIMING = {
  container: { delay: 0, duration: 0.6 },
  card: { delay: 0.2, duration: 0.6 },
  image: { delay: 0.4, duration: 0.3 },    // Paralelo
  content: { delay: 0.4, duration: 0.3 },  // Paralelo
  buttons: { delay: 0.6, duration: 0.3 },
  contactCard: { delay: 0.5, duration: 0.5 },
  greenDot: { delay: 0.9, duration: 0.3 }
}
```

**Optimización**: Elementos se cargan en paralelo (imagen + contenido) para reducir tiempo total.

### 5.3 Animaciones de Scroll

**Scroll reveals**:
```tsx
<ScrollReveal delay={0.2}>
  <Card>...</Card>
</ScrollReveal>
```

**Configuración Intersection Observer**:
```typescript
SCROLL_OPTIONS = {
  standard: { once: true, margin: "-100px", amount: 0.1 },
  early: { once: true, margin: "-200px", amount: 0.05 },
  late: { once: true, margin: "0px", amount: 0.3 }
}
```

**Patrón común**:
1. Elemento inicia invisible (`opacity: 0, y: 40`)
2. Al entrar en viewport, fade in + slide up
3. Animación solo ocurre una vez (`once: true`)

### 5.4 Hover States

**Botones:**
```tsx
<Button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```

**Project Cards:**
```tsx
<motion.div
  whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
  transition={{ duration: 0.3 }}
/>
```

**Links:**
```css
.link {
  transition: opacity 0.2s;
}
.link:hover {
  opacity: 0.8;
}
```

### 5.5 Loading States

**Skeleton loaders**: Componente `Skeleton` de shadcn/ui

**Spinner global**: `PageLoader` con animación spin

**Lazy loading**: Componentes pesados con `React.lazy()` + `Suspense`

### 5.6 Transiciones de Página

**Sin transiciones visibles** entre páginas:
- Scroll to top instantáneo
- Contenido se monta inmediatamente
- Lazy loader muestra spinner si tarda >300ms

**Razón**: SPA debe sentirse fluida, transiciones de página ralentizan UX.

### 5.7 Modal Animations

**Dialog/Sheet** (shadcn):
- Enter: Fade in + scale from center
- Exit: Fade out + scale to center
- Backdrop: Fade in/out

**Lightbox**:
- Enter: Fade in + slide from side
- Exit: Fade out
- Swipe: Follow touch gesture

### 5.8 Microinteracciones

**Toggle (theme/language)**:
- Rotate: 180° on switch
- Duration: 0.3s
- Ease: backOut (bounce sutil)

**Green dot "Disponible"**:
- Entrada con bounce
- Delay: 0.9s (último elemento)
- Ease: backOut

**Navbar underline**:
- Width animado: 0% → 100%
- Duration: 0.3s
- Origin: center

### 5.9 Prefers Reduced Motion

**Respeto a preferencias de accesibilidad**:

```typescript
if (prefersReducedMotion()) {
  return REDUCED_MOTION_DURATION; // 0.05s
}
```

**Comportamiento:**
- Duraciones → 0.05s
- Delays → 0
- Animaciones decorativas → deshabilitadas
- Animaciones funcionales → mantienen pero instant

**Implementación CSS**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.05s !important;
    transition-duration: 0.05s !important;
  }
}
```

### 5.10 Performance de Animaciones

**Optimizaciones aplicadas:**
- Uso de `transform` y `opacity` (GPU-accelerated)
- Evitar animación de `width`, `height`, `top`, `left`
- `will-change` para elementos que van a animar
- `contain: layout` en mobile cards
- Deshabilitar hover effects en mobile

**Problema conocido**: En algunos dispositivos mobile antiguos, las animaciones de scroll reveal pueden causar jank. Considerar detectar performance y deshabilitar en low-end devices.

---

## 6. Accesibilidad

### 6.1 Nivel de Conformidad

**Target**: WCAG 2.1 AA

**Estado actual**: Parcialmente conforme (~85%)

### 6.2 Semantic HTML

**Estructura correcta:**
- `<header>` para navegación
- `<nav>` para menús
- `<main>` para contenido principal
- `<section>` para secciones lógicas
- `<article>` para proyectos
- `<footer>` para pie de página
- `<button>` vs `<a>` usado correctamente

**Headings hierarchy:**
- H1: Título principal de página (uno por página)
- H2: Secciones principales
- H3: Subsecciones
- Nunca se salta niveles

### 6.3 ARIA

**Roles aplicados:**
- `role="navigation"` en nav móvil
- `aria-label` en botones de iconos
- `aria-expanded` en acordeones
- `aria-current="page"` en navegación activa
- `aria-hidden="true"` en decoraciones

**Estados dinámicos:**
```tsx
<button
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label="Abrir menú"
>
```

**⚠️ Mejora pendiente**: Añadir `aria-live` regions para notificaciones dinámicas.

### 6.4 Navegación por Teclado

**Implementado:**
- Tab order lógico
- Focus visible en todos los interactivos
- Escape cierra modales
- Enter/Space activa botones
- Arrow keys en carouseles

**Focus states:**
```css
*:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

**⚠️ Problema conocido**: Algunos elementos personalizados (ImageCarousel) no tienen navegación por teclado completa.

### 6.5 Contraste de Color

**Ratios testeados:**

| Combinación | Ratio | Cumple AA |
|-------------|-------|-----------|
| Foreground/Background | 12.5:1 | ✅ AAA |
| Secondary/Background | 4.8:1 | ✅ AA |
| Muted text/Background | 4.2:1 | ✅ AA |
| Accent/Background | 6.3:1 | ✅ AAA |

**Dark mode**: También cumple AA en todos los casos.

**⚠️ Mejora pendiente**: Algunos badges con colores custom pueden no cumplir AA, revisar caso por caso.

### 6.6 Texto Alternativo

**Imágenes:**
- Todas las imágenes decorativas: `alt=""`
- Imágenes de contenido: `alt` descriptivo
- Imágenes de proyecto: `alt="{Título del proyecto}"`
- Avatar: `alt="{Nombre completo}"`

**SVGs:**
- Iconos decorativos: `aria-hidden="true"`
- Iconos significativos: `<title>` interno

### 6.7 Forms

**Labels asociados:**
```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

**Errores:**
- Mostrados debajo del campo
- Color rojo + icono
- `aria-describedby` conecta error con input

**Validación:**
- HTML5 validation
- Feedback inmediato en blur
- Mensajes claros y específicos

### 6.8 Modales y Dialogs

**Gestión de foco:**
- Focus trap dentro del modal
- Return focus al trigger al cerrar
- Escape key cierra modal
- Backdrop click cierra (opcional)

**Scroll lock:**
```css
body.modal-open {
  overflow: hidden;
  touch-action: none;
}
```

### 6.9 Idioma

**HTML lang attribute:**
```html
<html lang="es">  <!-- o "en" -->
```

**Cambio dinámico:**
```typescript
document.documentElement.lang = language;
```

### 6.10 Puntos de Mejora

⚠️ **Áreas que necesitan atención:**

1. **Skip to main content**: Falta un link de salto para usuarios de teclado
2. **ARIA live regions**: Notificaciones no se anuncian a lectores de pantalla
3. **Keyboard navigation**: Carousel y Lightbox necesitan mejor soporte
4. **Focus management**: Algunos modales no restauran focus correctamente
5. **Screen reader testing**: Pendiente testing exhaustivo con NVDA/JAWS
6. **Alt text**: Revisar que todas las imágenes tienen alt significativo
7. **Color blindness**: Testing con simuladores de daltonismo

---

## 7. Performance

### 7.1 Estrategias de Optimización

**Code splitting:**
- Lazy loading de páginas (Projects, Experiences, Admin)
- Lazy loading de componentes pesados (ProjectDetail)
- Dynamic imports con `React.lazy()`

**Bundle size:**
- Tailwind CSS tree-shaking automático
- Solo importar lo necesario de librerías
- No duplicar código (usar hooks compartidos)

**Render optimization:**
- `React.memo()` en componentes puros
- `useCallback` / `useMemo` para prevenir re-renders
- Virtualización pendiente para listas largas (no necesario actualmente)

### 7.2 Imágenes

**Optimización aplicada:**

1. **Supabase Storage transformation**:
   ```typescript
   const url = `${imageUrl}?width=800&quality=85`;
   ```

2. **Lazy loading nativo**:
   ```tsx
   <img loading="lazy" />
   ```

3. **ImageWithFallback**:
   - Loading states
   - Error handling
   - Dimensiones explícitas (prevenir CLS)

4. **Image rendering**:
   ```css
   img {
     image-rendering: auto;
     image-rendering: -webkit-optimize-contrast;
   }
   ```

**Formatos:**
- PNG para imágenes con transparencia
- JPG para fotos (calidad 85%)
- SVG para iconos (via lucide-react)

**⚠️ Mejora sugerida**: Implementar WebP con fallback a PNG/JPG.

### 7.3 Fonts

**Carga optimizada:**

```html
<link rel="preconnect" href="https://api.fontshare.com" crossorigin>
<link rel="dns-prefetch" href="https://api.fontshare.com">
```

**Font-display:**
```css
@import url('...&display=swap');
```
- Usa `font-display: swap` para evitar FOIT (Flash of Invisible Text)

**Subset**: Solo carga pesos necesarios (400, 500, 600, 700)

### 7.4 JavaScript

**Tree-shaking**: Vite automáticamente elimina código no usado

**Minification**: Build de producción minifica automáticamente

**Chunk splitting**:
```
vendor.js      // React, Motion, etc
main.js        // App code
[route].js     // Lazy routes
```

**No webpack**: Vite usa esbuild (mucho más rápido)

### 7.5 CSS

**Tailwind purge**: Solo incluye clases usadas en build

**Critical CSS**: Inline styles para above-the-fold no implementado (no necesario en SPA)

**No CSS-in-JS runtime**: Tailwind compila a CSS estático

### 7.6 Caching

**Service Worker:**
- Cachea assets estáticos (JS, CSS, fonts)
- Estrategia: Cache First con Network Fallback
- Ubicación: `/public/sw.js`

**HTTP caching:**
```
/_headers:
/static/*
  Cache-Control: public, max-age=31536000, immutable
```

**LocalStorage:**
- Theme preference
- Language preference
- Navbar animation state (sessionStorage)

### 7.7 Lazy Loading

**Páginas:**
```typescript
const ProjectsPage = createLazyComponent(
  () => import('./components/projects-page'),
  'ProjectsPage'
);
```

**Timeout**: Si tarda >10s, muestra error

**Fallback**: `<PageLoader />` con spinner

### 7.8 Analytics

**Microsoft Clarity**: Cargado async via hook

**Custom analytics**: Lightweight tracking en `/hooks/use-analytics.ts`

**No bloquea render**: Scripts cargados al final

### 7.9 Métricas

**Target metrics** (no medidas actualmente):

| Métrica | Target | Actual |
|---------|--------|--------|
| FCP (First Contentful Paint) | <1.8s | ❓ |
| LCP (Largest Contentful Paint) | <2.5s | ❓ |
| TTI (Time to Interactive) | <3.8s | ❓ |
| CLS (Cumulative Layout Shift) | <0.1 | ❓ |
| FID (First Input Delay) | <100ms | ❓ |

**⚠️ Acción requerida**: Implementar Lighthouse CI en el pipeline de deploy.

### 7.10 Problemas Conocidos

⚠️ **Áreas de mejora:**

1. **Bundle size**: Main bundle ~300KB (gzipped). Podría reducirse extrayendo vendor chunks más agresivamente.

2. **Imágenes**: Sin WebP ni AVIF. Implementar picture element con fallbacks.

3. **Fonts**: Un solo font (Clash Display) pero múltiples pesos. Considerar variable fonts.

4. **Service Worker**: Estrategia básica. Implementar workbox para mejor control.

5. **Preloading**: No hay preload de recursos críticos. Añadir `<link rel="preload">` para hero image.

6. **Render blocking**: Fontshare CSS bloquea render. Considerar self-hosting.

7. **JavaScript hydration**: No hay SSR, todo es CSR. Considerar Next.js para mejor FCP.

---

## 8. SEO y Metaestructura

### 8.1 Meta Tags

**Home (`/index.html`)**:

```html
<title>Jabier García Sanz - UX/UI Designer Portfolio</title>
<meta name="description" content="Portfolio de UX/UI Designer..." />
<meta name="keywords" content="UX designer, UI designer..." />
```

**Dynamic meta tags** (vía `usePageMeta`):
- Actualiza title y description al cambiar de página
- Open Graph tags
- Twitter Cards
- Canonical URL

### 8.2 Open Graph

**Todas las páginas incluyen:**

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://jabiergarcia.com/..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

**Imágenes OG:**
- Tamaño: 1200x630px (estándar LinkedIn/Facebook)
- Formato: PNG
- Específicas por proyecto

### 8.3 Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

### 8.4 Pre-rendering para Crawlers

**Problema**: SPAs no son crawleables nativamente.

**Solución implementada**: HTML estático pre-renderizado

**Arquitectura:**

```
Crawler (LinkedInBot) visita:
  /proyectos/assorta
    ↓
Cloudflare Worker detecta crawler
    ↓
Sirve: /proyectos/assorta.html (HTML estático)
    ↓
Crawler lee meta tags correctos ✅
```

**Archivos generados:**
- `/public/proyectos/*.html` (español)
- `/public/projects/*.html` (inglés)

**Script de generación:**
- `/scripts/prerender.js`
- Ejecutar manualmente cuando hay cambios en proyectos

**Configuración Cloudflare:**
- Archivo: `/SEO/cloudflare-worker.js`
- Deploy manual en Cloudflare Dashboard
- Detecta user-agent de bots
- Ver documentación completa en `/SEO/`

### 8.5 Structured Data

**Schema.org JSON-LD** en `index.html`:

```json
{
  "@context": "https://schema.org/",
  "@type": "Person",
  "name": "Jabier García Sanz",
  "alternateName": ["Javier García Sanz", "Xavi García Sanz"],
  "url": "https://jabiergarcia.com",
  "jobTitle": "UX/UI Designer | Design System | UI Interface",
  "email": "garciasanz.j@gmail.com",
  "sameAs": [
    "https://www.linkedin.com/in/jabiergarcia/",
    "https://www.behance.net/jabiergarciasanz"
  ]
}
```

**⚠️ Mejora pendiente**: Añadir structured data para cada proyecto individual (type: CreativeWork).

### 8.6 Sitemap

**Ubicación**: `/public/sitemap.xml`

**Páginas incluidas:**
- Home: `/`
- Projects: `/proyectos`, `/projects`
- Experiences: `/experiencia`, `/experiences`
- Project details: `/proyectos/assorta`, etc.

**Frecuencia de actualización**: Manual (actualizar al añadir proyectos)

**⚠️ Mejora**: Generar automáticamente en build time.

### 8.7 Robots.txt

**Ubicación**: `/public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://jabiergarcia.com/sitemap.xml
```

**Disallow pendiente**: Considerar bloquear `/admin` y archivos de testing.

### 8.8 Canonical URLs

**Implementado** via `usePageMeta`:

```html
<link rel="canonical" href="https://jabiergarcia.com/..." />
```

**Previene**: Duplicate content issues

### 8.9 Hreflang

**Idiomas soportados**: ES, EN

```html
<link rel="alternate" hreflang="es" href="https://jabiergarcia.com" />
<link rel="alternate" hreflang="en" href="https://jabiergarcia.com" />
<link rel="alternate" hreflang="x-default" href="https://jabiergarcia.com" />
```

**⚠️ Problema**: Hreflang apunta a la misma URL para ambos idiomas. Debería ser:
- ES: `https://jabiergarcia.com/es/`
- EN: `https://jabiergarcia.com/en/`

**Razón actual**: Sistema de routing no separa por idioma en URL.

### 8.10 Jerarquía Semántica

**Estructura HTML correcta:**

```html
<html>
  <head>
    <title>...</title>
    <meta>...</meta>
  </head>
  <body>
    <header>
      <nav>...</nav>
    </header>
    <main>
      <section>
        <h1>Título principal</h1>
        <h2>Subsección</h2>
      </section>
    </main>
    <footer>...</footer>
  </body>
</html>
```

**Headings:**
- Nunca más de un H1 por página
- Orden lógico (no se salta de H2 a H4)
- H1 siempre es el título principal de la página

### 8.11 Problemas SEO Conocidos

⚠️ **Limitaciones críticas:**

1. **Cloudflare Worker no desplegado**: Los crawlers aún ven HTML genérico
   - **Solución**: Seguir `/SEO/CLOUDFLARE_WORKER_GUIDE.md`

2. **URLs no cambian por idioma**: `/proyectos/assorta` es igual para ES y EN
   - **Impacto**: Hreflang inválido, puede confundir a Google
   - **Solución**: Implementar `/es/proyectos/` y `/en/projects/`

3. **No hay SSR**: Todo es client-side rendering
   - **Impacto**: Crawlers sin JS execution no ven contenido
   - **Solución implementada**: Pre-rendering manual

4. **Meta tags dinámicas tardan**: Se actualizan después de render inicial
   - **Impacto**: Bots rápidos pueden capturar meta tags incorrectos
   - **Solución**: Usar SSR o pre-rendering (ya implementado parcialmente)

5. **Sitemap manual**: Puede quedar desactualizado
   - **Solución**: Script automático en build

---

## 9. Gestión de Estado y Datos

### 9.1 Arquitectura de Estado

**No usa Redux ni Zustand**. Estado gestionado con:

1. **React Context API**: Estado global compartido
2. **Custom Hooks**: Lógica reutilizable con estado local
3. **Props drilling**: Para componentes cercanos
4. **LocalStorage**: Persistencia del lado del cliente

**Filosofía**: Solo Context para estado verdaderamente global. Evitar over-engineering.

### 9.2 Contexts Implementados

#### **LanguageContext**
- **Ubicación**: `/contexts/language-context.tsx`
- **Estado**: `language` (ES | EN)
- **Funciones**: `setLanguage(lang)`
- **Persistencia**: LocalStorage (`language`)
- **Detección**: Browser language en first load

**Uso:**
```typescript
const { language, setLanguage, t } = useLanguage();
```

**Traducciones:**
- Archivos: `/translations/es.ts`, `/translations/en.ts`
- Tipado: TypeScript types from `es.ts`
- Estructura: Nested object con dot notation

#### **LightboxContext**
- **Ubicación**: `/contexts/lightbox-context.tsx`
- **Estado**: `images`, `currentIndex`, `isOpen`
- **Funciones**: `openLightbox(images, index)`, `closeLightbox()`

**Uso:**
```typescript
const { openLightbox } = useLightbox();
openLightbox(imageUrls, 0);
```

### 9.3 Custom Hooks

#### **useTheme**
- **Ubicación**: `/hooks/use-theme.ts`
- **Estado**: `isDark` (boolean)
- **Funciones**: `toggleTheme()`, `resetToSystemTheme()`
- **Persistencia**: LocalStorage (`theme`)
- **Detección**: System preference (`prefers-color-scheme`)
- **Side effect**: Aplica class `dark` a `<html>`

**Evita FOUC (Flash of Unstyled Content)**:
```html
<script>
  // Runs before React mounts
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
</script>
```

#### **useRouter**
- **Ubicación**: `/hooks/use-router.ts`
- **Propósito**: Client-side routing SIN react-router
- **Estado**: `currentPage` (Page enum)
- **Funciones**: `navigate(page)`, `updateURLForLanguage(lang)`

**Pages:**
```typescript
type Page = 
  | 'home' 
  | 'projects' 
  | 'experiences'
  | 'puffykitten' 
  | 'chupsee'
  | 'gotapp'
  | 'assorta'
  | 'ds-pomeranian'
  | 'admin'
  | '404';
```

**Sincronización con URL:**
- Usa History API: `window.history.pushState()`
- Listener en `popstate` para back/forward
- Actualiza URL sin reload

**Mapeo URL → Idioma:**
```typescript
/proyectos/assorta → currentPage: 'assorta', language: 'es'
/projects/assorta → currentPage: 'assorta', language: 'en'
```

#### **usePageMeta**
- **Ubicación**: `/hooks/use-page-meta.ts`
- **Propósito**: Actualizar meta tags dinámicamente
- **Funciones**: Auto-ejecuta al cambiar página

**Actualiza:**
- `<title>`
- `<meta name="description">`
- `<meta property="og:*">`
- `<meta name="twitter:*">`
- `<link rel="canonical">`

#### **useAnalytics**
- **Ubicación**: `/hooks/use-analytics.ts`
- **Funciones**:
  - `trackPageView(page)`
  - `trackProjectView(projectId)`
  - `trackEvent(eventName, data)`

**Backend**: POST a `/supabase/functions/server/analytics`

**Storage**: Supabase KV store

#### **useClarity**
- **Ubicación**: `/hooks/use-clarity.ts`
- **Propósito**: Cargar Microsoft Clarity async
- **Params**: `projectId` (string)

**Implementación:**
```typescript
useClarity('utnwnczfi2');
```

#### **useServiceWorker**
- **Ubicación**: `/hooks/use-service-worker.ts`
- **Propósito**: Registrar SW en mount
- **Ubicación SW**: `/public/sw.js`

#### **useScrollAnimation**
- **Ubicación**: `/hooks/use-scroll-animation.ts`
- **Propósito**: Detectar scroll para animaciones
- **Retorna**: `isVisible` (boolean)

#### **useTouchSwipe**
- **Ubicación**: `/hooks/use-touch-swipe.ts`
- **Propósito**: Detectar swipe gestures (mobile)
- **Uso**: Lightbox navigation

#### **useCv**
- **Ubicación**: `/hooks/use-cv.ts`
- **Propósito**: Descargar CV según idioma
- **Función**: `downloadCv()`
- **URLs**: `/utils/constants.ts` → `CV_URLS`

### 9.4 Flujo de Datos

**Top-down data flow:**

```
App.tsx
  ├─ LanguageProvider (Context)
  │    └─ AppContent
  │         ├─ useRouter (Hook)
  │         ├─ useTheme (Hook)
  │         ├─ useAnalytics (Hook)
  │         └─ LightboxProvider (Context)
  │              └─ PageWrapper
  │                   └─ Components (reciben props)
```

**Props drilling:**
- Navigation props: `onNavigateToHome`, `onNavigateToProjects`, etc.
- Theme props: `isDark`, `onToggleTheme`
- Modal props: `isContactModalOpen`, `onOpenContact`, `onCloseContact`

**⚠️ Problema de escalabilidad**: Muchas props pasan por múltiples niveles. Considerar Context adicional para navigation/routing.

### 9.5 Fetch de Datos

**Estrategia actual**: Datos estáticos en código

**Ubicación**:
- `/utils/constants.ts` - Información de contacto, URLs
- `/utils/projects-data.ts` - Lista de proyectos
- `/translations/*.ts` - Contenido traducible

**No hay fetch en runtime** (excepto formulario de contacto)

**Razón**: Portfolio estático, contenido cambia raramente

**⚠️ Limitación**: Para añadir proyecto nuevo, hay que:
1. Editar `/utils/projects-data.ts`
2. Crear componente en `/components/projects/`
3. Añadir route en `App.tsx`
4. Regenerar pre-rendered HTML (`node scripts/prerender.js`)
5. Actualizar sitemap
6. Deploy

**Mejora futura**: Considerar CMS headless (Strapi, Contentful) para gestión de contenido sin código.

### 9.6 Server State (Backend)

**Supabase Backend:**

| Función | Endpoint | Método | Propósito |
|---------|----------|--------|-----------|
| Contact form | `/make-server-df6fcedb/contact` | POST | Guardar mensaje |
| Analytics | `/make-server-df6fcedb/analytics` | POST | Track event |
| Admin data | `/make-server-df6fcedb/admin/messages` | GET | Listar mensajes |

**KV Store:**
- Key-value database
- Acceso via `/supabase/functions/server/kv_store.tsx`
- Funciones: `get`, `set`, `del`, `mget`, `mset`, `getByPrefix`

**Supabase Storage:**
- Imágenes y assets en bucket público
- CVs en bucket público
- URL base: `https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/`

**⚠️ Seguridad**: El admin endpoint no tiene autenticación real, solo Easter egg (Triple Shift).

### 9.7 Error Handling

**ErrorBoundary**:
- Wrapper de React.ErrorBoundary
- Catch de errores en componentes hijos
- Fallback UI amigable

**Try-catch en async operations:**
```typescript
try {
  await fetch('/api/contact', { ... });
} catch (error) {
  console.error('Error:', error);
  toast.error('Algo salió mal');
}
```

**Toast notifications:**
```typescript
import { toast } from 'sonner';
toast.success('Mensaje enviado');
toast.error('Error al enviar');
```

**Console logging:**
- Mensajes informativos con prefijo: `🌍 [Language]`, `📊 [Analytics]`
- Errores con contexto detallado

---

## 10. Convenciones y Buenas Prácticas

### 10.1 Naming Conventions

**Archivos:**
- Componentes: `PascalCase.tsx` (ej: `HeroSection.tsx`)
- UI base: `kebab-case.tsx` (ej: `button.tsx`)
- Hooks: `use-*.ts` (ej: `use-theme.ts`)
- Utils: `kebab-case.ts` (ej: `animation-constants.ts`)
- Contexts: `*-context.tsx` (ej: `language-context.tsx`)

**Variables y funciones:**
- camelCase: `currentPage`, `navigateToHome`, `projectsData`
- Boolean: Prefijo `is`, `has`, `should`: `isDark`, `hasError`, `shouldAnimate`
- Event handlers: Prefijo `on`, `handle`: `onClick`, `handleSubmit`

**Constantes:**
- UPPER_SNAKE_CASE: `PROFILE_IMAGE_URL`, `EASING`, `DURATION`

**CSS classes:**
- kebab-case: `hero-section`, `project-card`
- BEM no se usa (Tailwind utility-first)

**Types/Interfaces:**
- PascalCase: `Project`, `NavigationProps`, `Page`
- Interface vs Type: Preferir `interface` para objetos, `type` para unions

### 10.2 Organización del Código

**Imports order:**
1. React y librerías externas
2. Componentes internos
3. Hooks
4. Utils y constantes
5. Tipos
6. Estilos (si los hay)

**Ejemplo:**
```typescript
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useTheme } from '../hooks/use-theme';
import { DURATION, EASING } from '../utils/animation-constants';
import type { Project } from '../utils/projects-data';
```

**Estructura de componente:**
```typescript
// 1. Imports
import { ... } from '...';

// 2. Types/Interfaces
interface ComponentProps {
  ...
}

// 3. Constants (si son específicos del componente)
const LOCAL_CONSTANT = '...';

// 4. Component
export function Component({ prop1, prop2 }: ComponentProps) {
  // 4.1. Hooks
  const [state, setState] = useState();
  const customValue = useCustomHook();
  
  // 4.2. Handlers
  const handleClick = () => { ... };
  
  // 4.3. Effects
  useEffect(() => { ... }, []);
  
  // 4.4. Render
  return (
    <div>...</div>
  );
}
```

### 10.3 Patrones Reutilizados

**Wrapper pattern:**
```typescript
// Componente de alto nivel que envuelve contenido
function PageWrapper({ children, ...props }) {
  return (
    <>
      <Navigation {...props} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

**Render props pattern:**
```typescript
// No usado actualmente, pero útil para lógica compartida
function DataFetcher({ render }) {
  const data = useFetch();
  return render(data);
}
```

**Compound components:**
```typescript
// Card.Root, Card.Header, Card.Content
// Usado en shadcn components
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent>Contenido</CardContent>
</Card>
```

**Custom hooks pattern:**
```typescript
// Encapsular lógica reutilizable
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || defaultValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);
  
  return [value, setValue];
}
```

### 10.4 Decisiones Arquitectónicas Clave

**1. SPA sin SSR**
- **Razón**: Portfolio estático, no necesita SEO en tiempo real
- **Trade-off**: Peor FCP, solucionado con pre-rendering manual

**2. Context API en lugar de Redux**
- **Razón**: Estado global mínimo, no justifica complejidad de Redux
- **Trade-off**: Props drilling en algunos casos

**3. Tailwind en lugar de CSS Modules**
- **Razón**: Velocidad de desarrollo, consistencia de design system
- **Trade-off**: HTML más verboso, curva de aprendizaje

**4. Motion en lugar de CSS animations**
- **Razón**: Animaciones complejas, gestures, scroll-based
- **Trade-off**: Bundle size mayor (~50KB)

**5. Supabase en lugar de Firebase**
- **Razón**: Postgres más flexible, pricing mejor, SQL familiar
- **Trade-off**: Menos documentación/comunidad

**6. Client-side routing custom**
- **Razón**: Control total, no necesita features avanzadas de react-router
- **Trade-off**: Reinventando la rueda, posibles bugs

**7. Pre-rendering manual**
- **Razón**: Flexibilidad, no depende de servicios externos (Prerender.io)
- **Trade-off**: Proceso manual, puede olvidarse

**8. Cloudflare en lugar de Vercel**
- **Razón**: Hosting incluido con Figma Make, CDN global
- **Trade-off**: Configuración menos straightforward

### 10.5 Principios Seguidos

**DRY (Don't Repeat Yourself):**
- ✅ Constantes centralizadas (`/utils/constants.ts`)
- ✅ Componentes UI reutilizables (`/components/ui/`)
- ✅ Hooks para lógica compartida
- ⚠️ Algunos componentes de proyecto duplican lógica (mejora pendiente)

**KISS (Keep It Simple, Stupid):**
- ✅ Arquitectura simple sin over-engineering
- ✅ No usa state management complejo
- ✅ Componentes pequeños y enfocados
- ⚠️ Algunos componentes grandes (>400 líneas) que podrían dividirse

**YAGNI (You Aren't Gonna Need It):**
- ✅ No hay features "por si acaso"
- ✅ Solo se implementa lo necesario
- ✅ No hay abstracciones prematuras

**Single Responsibility:**
- ✅ Cada hook tiene una responsabilidad
- ✅ Componentes UI son presentacionales
- ⚠️ Algunos componentes mezclan lógica + presentación

**Separation of Concerns:**
- ✅ Lógica separada en hooks
- ✅ Estilos en Tailwind (no inline JS)
- ✅ Datos en archivos separados
- ⚠️ Algunos componentes grandes violan este principio

### 10.6 Code Review Checklist

Al añadir nuevo código, verificar:

- [ ] **Naming**: Sigue convenciones del proyecto
- [ ] **Types**: Todo está tipado (no usar `any`)
- [ ] **Imports**: Orden correcto, no imports no usados
- [ ] **Console logs**: Eliminados o con prefijo informativo
- [ ] **Comentarios**: Solo donde añaden valor
- [ ] **Accessibility**: Roles ARIA, alt text, keyboard navigation
- [ ] **Responsive**: Funciona en mobile/tablet/desktop
- [ ] **Dark mode**: Se ve bien en ambos temas
- [ ] **i18n**: Textos traducibles usan `t.key`
- [ ] **Performance**: No causa re-renders innecesarios
- [ ] **Animations**: Respeta `prefers-reduced-motion`
- [ ] **Error handling**: Try-catch en operaciones async
- [ ] **Testing**: Probado manualmente en distintos navegadores

### 10.7 Git Workflow

**Commits:**
- Usar Conventional Commits: `type: description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Ejemplos:**
```
feat: add language toggle to navigation
fix: prevent modal scroll on iOS Safari
docs: update architecture documentation
style: improve button hover animation
refactor: extract project card logic to hook
```

**Branches:**
- `main`: Producción
- `develop`: Desarrollo activo
- `feature/*`: Nuevas features
- `fix/*`: Bugfixes

---

## 11. Roadmap Técnico

### 11.1 Prioridad Alta 🔴

**P1: Deploy Cloudflare Worker para SEO**
- **Problema**: Crawlers no ven HTML pre-renderizado
- **Impacto**: LinkedIn/Facebook/Twitter no muestran previews correctos
- **Solución**: Seguir `/SEO/CLOUDFLARE_WORKER_GUIDE.md`
- **Esfuerzo**: 1-2 horas
- **Bloqueador**: Acceso a Cloudflare Dashboard

**P2: Skip to main content link**
- **Problema**: Navegación por teclado ineficiente
- **Impacto**: Accesibilidad WCAG AA incompleta
- **Solución**: Añadir link oculto que aparece en focus
- **Esfuerzo**: 30 minutos

**P3: Implementar Lighthouse CI**
- **Problema**: No hay métricas de performance
- **Impacto**: No sabemos si hay regresiones
- **Solución**: GitHub Action que corre Lighthouse en cada PR
- **Esfuerzo**: 2-3 horas

**P4: WebP para imágenes**
- **Problema**: PNG/JPG pesan más que WebP
- **Impacto**: LCP más lento
- **Solución**: Generar WebP en build + picture element con fallback
- **Esfuerzo**: 4-5 horas

### 11.2 Prioridad Media 🟡

**M1: Refactor project components**
- **Problema**: Código duplicado en componentes de proyecto
- **Solución**: Crear sistema de "sections" reutilizable
- **Esfuerzo**: 1 semana

**M2: CMS headless (Strapi/Contentful)**
- **Problema**: Añadir proyecto requiere código + deploy
- **Solución**: Backend para gestionar contenido sin código
- **Esfuerzo**: 2-3 semanas

**M3: Implementar testing**
- **Problema**: No hay tests
- **Solución**: Unit tests (Vitest) + E2E tests (Playwright)
- **Esfuerzo**: 2 semanas

**M4: Structured data por proyecto**
- **Problema**: Solo hay schema.org de Person, no de proyectos
- **Solución**: Añadir schema type CreativeWork para cada proyecto
- **Esfuerzo**: 1 día

**M5: Admin panel con auth real**
- **Problema**: Easter egg no es seguro
- **Solución**: Implementar Supabase Auth + protected routes
- **Esfuerzo**: 2-3 días

### 11.3 Prioridad Baja 🟢

**L1: Next.js migration**
- **Problema**: Sin SSR, SEO subóptimo
- **Solución**: Migrar a Next.js App Router
- **Esfuerzo**: 3-4 semanas
- **Trade-off**: Mayor complejidad

**L2: Variable fonts**
- **Problema**: Múltiples archivos de font (4 pesos)
- **Solución**: Un solo archivo variable font
- **Esfuerzo**: 1 día

**L3: Storybook**
- **Problema**: No hay documentación visual de componentes
- **Solución**: Implementar Storybook para design system
- **Esfuerzo**: 1 semana

**L4: Internacionalización en URLs**
- **Problema**: `/proyectos/assorta` igual para ES y EN
- **Solución**: `/es/proyectos/assorta` y `/en/projects/assorta`
- **Esfuerzo**: 1 semana

**L5: Blog section**
- **Problema**: No hay contenido actualizable frecuentemente
- **Solución**: Añadir blog con MDX
- **Esfuerzo**: 2-3 semanas

### 11.4 Mejoras de Escalabilidad

**Arquitectura:**
- Considerar migrar a monorepo (Turborepo) si crece
- Extraer design system a package separado
- Implementar micro-frontends si se añaden múltiples apps

**Performance:**
- Implementar edge caching para API responses
- Considerar ISR (Incremental Static Regeneration)
- Lazy load más agresivo (routes por chunks)

**Developer Experience:**
- Implementar Husky para pre-commit hooks
- Añadir ESLint + Prettier configurados
- Implementar CI/CD completo (no solo deploy)

### 11.5 Refactorizaciones Técnicas

**Estado:**
- Considerar Zustand para estado global más complejo
- Implementar React Query para server state
- Añadir optimistic updates en formularios

**Componentes:**
- Dividir componentes >300 líneas
- Extraer lógica compleja a hooks
- Crear más compound components (Card, Modal, etc.)

**Código:**
- Eliminar comentarios obsoletos
- Revisar TODOs en código
- Actualizar dependencias (audit de seguridad)

### 11.6 Deuda Técnica Identificada

⚠️ **Areas que requieren atención:**

1. **Props drilling excesivo**: Navegación pasa por 3+ niveles
2. **Componentes grandes**: Algunos componentes >400 líneas
3. **Lógica duplicada**: Project components repiten código
4. **Testing inexistente**: No hay tests unitarios ni E2E
5. **SEO parcial**: Workers no desplegados, sitemap manual
6. **Accesibilidad incompleta**: Falta testing con screen readers
7. **Performance no medida**: No hay benchmarks ni monitoring
8. **Documentación de componentes**: Falta Storybook o similar
9. **Error handling inconsistente**: Algunos lugares no manejan errores
10. **Build optimization**: Bundle size podría mejorarse

---

## 📝 Notas Finales

### Mantenimiento de este Documento

**Este documento debe actualizarse cuando:**
- ✅ Se añade un nuevo componente
- ✅ Se modifica la arquitectura
- ✅ Se cambia el sistema de diseño
- ✅ Se implementa una nueva feature
- ✅ Se detecta un bug crítico
- ✅ Se añade una nueva dependencia
- ✅ Se modifica el flujo de datos

### Próximos Pasos Inmediatos

1. **Deploy Cloudflare Worker** (SEO crítico)
2. **Implementar skip link** (A11y)
3. **Generar sitemap automático** (SEO)
4. **Añadir Lighthouse CI** (Performance)
5. **Refactor project components** (Mantenibilidad)

### Recursos Adicionales

- **Diseño Figma**: [Link pendiente]
- **Documentación SEO**: `/SEO/README_SEO.md`
- **Guía Worker**: `/SEO/CLOUDFLARE_WORKER_GUIDE.md`
- **Caso de estudio**: `/guidelines/Portfolio-Project-Documentation.md`

---

**Documento generado**: 2 de marzo de 2026  
**Por**: Análisis exhaustivo del código del proyecto  
**Contacto**: garciasanz.j@gmail.com
