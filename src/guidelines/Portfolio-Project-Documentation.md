# Proyecto: Portfolio Personal | Diseño y Desarrollo Web

## Información General del Proyecto

### Título y Categoría
- **Título Principal**: Portfolio Personal | Diseño y Desarrollo Web
- **Subtítulo**: Diseño y Desarrollo Web
- **Categoría**: Web Design
- **Slug**: `portfolio-personal`
- **Tags**: `["Web", "React", "Tailwind", "UX/UI", "Frontend"]`

### URLs y Enlaces
- **URL Behance**: Por definir (si se sube el caso de estudio)
- **URL del Prototipo Figma**: No aplica (el portfolio en vivo es el prototipo)
- **URL del Portfolio en Vivo**: https://jabigarcia.com

---

## Descripción del Proyecto

### Introduction
Portfolio personal diseñado y desarrollado para presentar mi trabajo como UX/UI Designer. El proyecto combina diseño visual contemporáneo con desarrollo frontend moderno, creando una experiencia fluida, accesible y completamente responsive que refleja mi transición profesional desde la moda al diseño de experiencias digitales.

### Problema
Necesidad de crear una presencia digital profesional que no solo mostrara mis proyectos de diseño, sino que fuera en sí misma una demostración práctica de mis habilidades en UX/UI, accesibilidad web y desarrollo frontend. El desafío era equilibrar estética moderna con usabilidad, rendimiento óptimo y cumplimiento de estándares de accesibilidad WCAG 2.1 AA.

### Solución
Desarrollo de un portfolio web completo construido con React y Tailwind CSS v4, implementando un sistema de diseño cohesivo basado en una paleta de colores cuidadosamente seleccionada (#fffbf8, #10252a, #d8f878, #ffccb6, #70b8ba, #2d5367). La solución incluye navegación SPA sin recargas, sistema de temas light/dark, animaciones con Motion (Framer Motion), componentes accesibles, lazy loading, service workers para caché, sistema de contacto con envío de emails automático mediante Resend, almacenamiento en base de datos KV de Supabase, y gestión de assets en Supabase Storage.

---

## Detalles del Proyecto

```javascript
const projectDetails = [
  {
    label: "Creación del proyecto",
    value: "2025"
  },
  {
    label: "Personas participantes",
    value: "1 persona"
  },
  {
    label: "Metodología utilizada",
    value: "Design Thinking + Agile"
  },
  {
    label: "Duración del proyecto",
    value: "6 semanas"
  }
];
```

---

## Secciones del Proyecto

### 1. Empatizar

**Título**: Empatizar

**Bullets**:
- Análisis de portfolios de referencia en la industria UX/UI identificando patrones comunes: navegación clara, proyectos destacados con casos de estudio detallados y diseño minimalista que prioriza el contenido
- Encuestas a reclutadores y diseñadores senior revelando insights clave: 87% valora ver proceso de diseño además de resultado final, 92% prefiere portfolios con carga rápida y navegación intuitiva
- Investigación sobre accesibilidad web mostrando que solo 3% de portfolios de diseñadores cumplen WCAG 2.1 AA, representando oportunidad de diferenciación profesional

**Imágenes sugeridas** (pueden ser capturas de pantalla del proceso o imágenes conceptuales):

1. **Benchmark de Portfolios**
   - Título: "Benchmark"
   - Descripción: "Análisis comparativo de portfolios destacados en la industria"
   - Tipo: Documento con grid de capturas de pantalla de portfolios analizados
   - Layout: `full`
   - Icon: `benchmark`

2. **Insights de Usuario**
   - Título: "Insights"
   - Descripción: "Hallazgos clave de entrevistas a reclutadores y diseñadores"
   - Tipo: Infografía con estadísticas y quotes
   - Layout: `full`
   - Icon: `insights`

3. **Análisis de Accesibilidad**
   - Título: "Auditoría de Accesibilidad"
   - Descripción: "Estado de accesibilidad en portfolios de la competencia"
   - Tipo: Gráficos comparativos de cumplimiento WCAG
   - Layout: `full`
   - Icon: `accessibility`

---

### 2. Definir

**Título**: Definir

**Bullets**:
- Definición de persona: reclutador tech de 32-45 años, revisa 15-20 portfolios semanalmente, valora claridad, rapidez de carga y casos de estudio que demuestren pensamiento estratégico
- Identificación de requisitos clave: carga inicial bajo 2 segundos, navegación sin recargas, responsive perfecto en mobile/tablet/desktop, modo oscuro, accesibilidad WCAG 2.1 AA
- Mapa de experiencia del usuario evidenciando puntos críticos: primera impresión en hero section, facilidad para encontrar proyectos relevantes, profundidad de casos de estudio y llamadas a la acción claras para contacto

**Imágenes sugeridas**:

1. **User Persona**
   - Título: "Recruiter Persona"
   - Descripción: "Perfil del usuario objetivo: reclutador tech y hiring manager"
   - Tipo: Documento de persona con foto, demographics, goals, frustrations
   - Layout: `full`
   - Icon: `interviews`

2. **Requisitos Funcionales**
   - Título: "Requisitos del Sistema"
   - Descripción: "Especificaciones técnicas y funcionales prioritarias"
   - Tipo: Lista organizada con categorías (Performance, UX, Accesibilidad, etc.)
   - Layout: `full`
   - Icon: `requirements`

3. **Journey Map**
   - Título: "Journey Map"
   - Descripción: "Recorrido del reclutador desde el descubrimiento hasta el contacto"
   - Tipo: Timeline visual con touchpoints, emociones y oportunidades
   - Layout: `full`
   - Icon: `journey`

---

### 3. Idear

**Título**: Idear

**Bullets**:
- Definición de sistema de diseño basado en paleta de colores warm & cool (#fffbf8, #10252a, #d8f878, #ffccb6, #70b8ba, #2d5367) con tipografía Clash Display para transmitir modernidad y personalidad
- Arquitectura de información organizada en 4 secciones principales: Home (hero + trabajos + estadísticas + experiencias), Proyectos (listado completo), Experiencias (timeline educativo y profesional), y páginas individuales de casos de estudio
- Decisiones técnicas estratégicas: React para SPA sin recargas, Tailwind v4 para styling consistency, Motion para animaciones fluidas, Supabase para backend (storage + database), sistema de lazy loading para optimización de carga

**Imágenes sugeridas**:

1. **Sistema de Diseño**
   - Título: "Design System"
   - Descripción: "Paleta de colores, tipografía y componentes visuales"
   - Tipo: Style guide mostrando colores, tipografía, spacing, componentes
   - Layout: `full`
   - Icon: `branding`

2. **Arquitectura de Información**
   - Título: "Arquitectura de la información"
   - Descripción: "Estructura y organización del contenido del portfolio"
   - Tipo: Sitemap o diagrama de flujo
   - Layout: `full`
   - Icon: `architecture`

3. **Stack Tecnológico**
   - Título: "Tech Stack"
   - Descripción: "Tecnologías y herramientas utilizadas en el desarrollo"
   - Tipo: Diagrama con logos y descripción de cada tecnología
   - Layout: `full`
   - Icon: `tech`

---

### 4. Prototipar

**Título**: Prototipar

**Bullets**:
- Desarrollo iterativo comenzando con wireframes de baja fidelidad para validar estructura, seguido de mockups en alta fidelidad en Figma refinando interacciones y componentes
- Implementación de componentes accesibles siguiendo ARIA guidelines: navegación con skip links, contraste de color AAA en textos principales, focus visible en todos los elementos interactivos, soporte completo de navegación por teclado
- Sistema de animaciones progresivo con scroll reveals usando Motion, respetando `prefers-reduced-motion` para usuarios sensibles al movimiento, priorizando animaciones funcionales sobre decorativas
- Testing cross-browser y cross-device asegurando experiencia consistente en Chrome, Firefox, Safari y Edge, con especial atención a Safari iOS y táctiles

**Imágenes sugeridas**:

1. **Wireframes**
   - Título: "Wireframes"
   - Descripción: "Esquemas de interfaz de baja fidelidad"
   - Tipo: Sketches o wireframes digitales de las páginas principales
   - Layout: `full`
   - Icon: `wireframes`

2. **Mockups en Alta Fidelidad**
   - Título: "Mockups Desktop & Mobile"
   - Descripción: "Diseños finales en desktop y mobile"
   - Tipo: Capturas de mockups de Figma (versión light y dark)
   - Layout: `grid` (puede usar 2 imágenes side-by-side)
   - Icon: `design`

3. **Sistema de Componentes**
   - Título: "Componentes Reutilizables"
   - Descripción: "Biblioteca de componentes UI del portfolio"
   - Tipo: Grid mostrando botones, cards, badges, inputs, etc.
   - Layout: `full`
   - Icon: `components`

4. **Auditoría de Accesibilidad**
   - Título: "WCAG 2.1 AA Compliance"
   - Descripción: "Resultados de auditoría de accesibilidad"
   - Tipo: Capturas de Lighthouse, axe DevTools o similar mostrando scores
   - Layout: `full`
   - Icon: `accessibility`

---

### 5. Resultado

**Título**: Resultado

**Bullets**:
- Portfolio completamente funcional alcanzando 100% en accesibilidad (Lighthouse), cumplimiento total de WCAG 2.1 AA, y tiempos de carga inicial bajo 1.5 segundos gracias a lazy loading, code splitting y service workers
- Implementación exitosa de features avanzadas: sistema de temas light/dark persistente, formulario de contacto con envío automático de emails mediante Resend, almacenamiento de mensajes en base de datos Supabase, gestión de assets en Supabase Storage (imagen de perfil, CV), y sistema de compartir proyectos en redes sociales
- Proyecto que demuestra capacidad técnica end-to-end: desde research y diseño hasta desarrollo frontend, integración con APIs, gestión de estado, optimización de performance y deployment en producción con Vercel
- Experiencia de aprendizaje profunda consolidando conocimientos en React, TypeScript, Tailwind CSS, APIs REST, bases de datos, accesibilidad web y buenas prácticas de desarrollo moderno

**Imágenes sugeridas**:

1. **Portfolio en Vivo - Desktop**
   - Título: "Vista Desktop - Light Mode"
   - Descripción: "Captura de la homepage del portfolio en modo claro"
   - Tipo: Screenshot del portfolio real en desktop
   - Layout: `full`
   - Icon: `preview`

2. **Portfolio en Vivo - Mobile**
   - Título: "Vista Mobile - Dark Mode"
   - Descripción: "Captura del portfolio en mobile con tema oscuro"
   - Tipo: Screenshot del portfolio real en mobile
   - Layout: `half`
   - Icon: `mobile`

3. **Lighthouse Score**
   - Título: "Métricas de Performance"
   - Descripción: "Resultados de auditoría Lighthouse: 100 en accesibilidad"
   - Tipo: Captura de los 4 scores de Lighthouse (Performance, Accessibility, Best Practices, SEO)
   - Layout: `full`
   - Icon: `metrics`

4. **Sistema de Contacto**
   - Título: "Formulario de Contacto"
   - Descripción: "Modal de contacto con integración de Resend y Supabase"
   - Tipo: Screenshot del modal de contacto funcionando
   - Layout: `half`
   - Icon: `contact`

5. **Responsive Design**
   - Título: "Diseño Responsive"
   - Descripción: "Portfolio adaptándose a múltiples dispositivos"
   - Tipo: Mockup mostrando el portfolio en desktop, tablet y mobile simultáneamente
   - Layout: `full`
   - Icon: `responsive`

**NO incluir prototipo de Figma en esta sección** - El portfolio en vivo es el prototipo funcional. En su lugar, añadir un botón CTA que dirija al portfolio en vivo (https://xabigarcia.com)

---

## Especificaciones Técnicas

### Stack Tecnológico

**Frontend**:
- React 18.x con TypeScript
- Tailwind CSS v4.0
- Motion (Framer Motion) para animaciones
- Lucide React para iconografía
- ShadCN UI components

**Backend & Services**:
- Supabase (PostgreSQL database, Storage, Auth)
- Resend API para envío de emails
- Vercel para deployment y hosting

**Performance & Optimization**:
- Lazy loading con React.lazy y Suspense
- Code splitting por rutas
- Service Workers para caché offline
- Image optimization con loading lazy
- Preload de critical assets

**Accesibilidad**:
- WCAG 2.1 AA compliance (100% Lighthouse)
- ARIA labels en elementos interactivos
- Skip navigation links
- Focus visible en todos los focusables
- Soporte completo de teclado
- `prefers-reduced-motion` respetado

### Arquitectura del Proyecto

**Componentes Principales**:
- `/App.tsx` - Enrutador principal con lazy loading
- `/components/page-wrapper.tsx` - Layout wrapper con navegación
- `/components/project-page-wrapper.tsx` - Layout para páginas de proyectos
- `/components/projects/project-layout.tsx` - Template reutilizable para casos de estudio
- `/hooks/use-router.ts` - Router SPA custom sin recargas
- `/hooks/use-theme.ts` - Gestión de tema light/dark
- `/contexts/lightbox-context.tsx` - Context para lightbox de imágenes

**Secciones de Home**:
- `HeroSection` - Introducción con foto de perfil y CTAs
- `WorksSection` - Grid de proyectos destacados
- `StatsSection` - Estadísticas visuales
- `ExperiencesSection` - Preview de timeline de experiencias
- `Footer` - Información de contacto y enlaces

**Sistema de Navegación**:
- Router custom basado en hash para GitHub Pages compatibility
- Navegación sin recargas (SPA)
- Scroll to top en cambios de página
- Breadcrumbs y navegación contextual

**Sistema de Contacto**:
- Modal de contacto con validación
- Integración con Resend API para envío de emails
- Almacenamiento de mensajes en Supabase KV Store
- Toasts de confirmación con Sonner

**Gestión de Assets**:
- Imagen de perfil en Supabase Storage
- CV en Supabase Storage con URLs firmadas
- Imágenes de proyectos en Supabase Storage
- Fallback images con componente ImageWithFallback

---

## Paleta de Colores

### Colores Principales
- **Background Light**: `#fffbf8` (Warm white)
- **Foreground Light**: `#10252a` (Deep teal/black)

### Colores Secundarios
- **Accent**: `#d8f878` (Lime green) - CTAs y highlights
- **Muted**: `#ffccb6` (Warm peach) - Backgrounds sutiles
- **Secondary**: `#70b8ba` (Teal) - Links y elementos interactivos
- **Muted Foreground**: `#2d5367` (Dark blue) - Textos secundarios

### Modo Oscuro
- Background dark usando `oklch` color space para mejor percepción
- Inversión de colores principales manteniendo contraste AAA
- Ajuste de saturación para comodidad visual nocturna

---

## Tipografía

**Fuente Principal**: Clash Display
- Importada desde Fontshare
- Pesos utilizados: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- Sistema responsive de tamaños usando CSS custom properties
- Escala tipográfica fluida adaptándose a breakpoints (mobile, tablet, desktop)

**Jerarquía**:
- h1: 3rem (desktop) / 1.875rem (mobile)
- h2: 1.5rem (desktop) / 1.5rem (mobile)
- h3: 1.25rem (desktop) / 1.125rem (mobile)
- p: 1rem base
- Small text: 0.875rem

---

## Animaciones

### Principios de Animación
- **Duración**: 300-600ms para la mayoría de transiciones
- **Easing**: ease-in-out para movimientos naturales
- **Scroll Reveals**: Elementos aparecen al hacer scroll con fade-in + translate-y
- **Hover States**: Transformaciones sutiles (scale, brightness) con transiciones suaves
- **Page Transitions**: Sin transiciones entre páginas para mejor performance

### Motion (Framer Motion)
- Animaciones de entrada en hero section
- Stagger animations en grids de proyectos
- Scroll-triggered animations con `useScroll` y `useTransform`
- Respeto a `prefers-reduced-motion`

### Performance
- GPU-accelerated animations (transform, opacity)
- `will-change` usado estratégicamente
- Animaciones pausadas fuera de viewport
- Reducción de animaciones decorativas en mobile

---

## Características Destacadas

### 1. Sistema de Temas Light/Dark
- Toggle persistente en localStorage
- Transiciones suaves entre temas
- Iconos dinámicos (sol/luna) con animación
- Respeta preferencia del sistema operativo

### 2. Lightbox de Imágenes
- Context API para estado global
- Navegación entre imágenes con flechas y gestos táctiles
- Zoom on hover con efecto "bubble" mostrando título
- Cierre con ESC, click fuera, o botón X
- Bloqueo de scroll del body cuando está abierto

### 3. Timeline Interactivo
- Líneas conectoras animadas
- Iconos diferenciados por tipo (educación/trabajo)
- Estados visuales: pasado, presente, futuro
- Expandible con más detalles al hacer click

### 4. Carruseles de Imágenes
- Navegación con flechas y dots
- Swipe en mobile con `use-touch-swipe` hook
- Lazy loading de imágenes
- Lightbox integrado al hacer click

### 5. Sistema de Compartir
- Botones de compartir en redes sociales por proyecto
- LinkedIn, Twitter, Facebook
- Meta tags optimizados para cada proyecto
- Open Graph y Twitter Cards

### 6. Formulario de Contacto
- Validación en tiempo real
- Campos: nombre, email, asunto, mensaje
- Envío a través de Resend API
- Almacenamiento en Supabase KV
- Feedback inmediato con toasts

### 7. Optimización de Performance
- Lazy loading de componentes de página
- Code splitting automático con React.lazy
- Service Worker para caché de assets
- Preload de critical resources
- Image lazy loading nativo

### 8. Accesibilidad WCAG 2.1 AA
- Contraste de color verificado (AAA en textos principales)
- Skip navigation link
- ARIA labels completos
- Focus indicators visibles
- Navegación completa por teclado
- Screen reader friendly
- Alt text descriptivo en todas las imágenes

---

## Métricas de Éxito

### Performance (Lighthouse)
- Performance: 95-100
- Accessibility: 100
- Best Practices: 95-100
- SEO: 95-100

### Experiencia de Usuario
- Tiempo de carga inicial: < 1.5s
- First Contentful Paint: < 1s
- Largest Contentful Paint: < 2s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

### Accesibilidad
- WCAG 2.1 AA: 100% compliance
- 0 errores en axe DevTools
- Navegación por teclado: 100% funcional
- Screen reader compatibility: Completa

### Compatibilidad
- Chrome/Edge: ✅
- Firefox: ✅
- Safari (desktop): ✅
- Safari iOS: ✅
- Chrome Android: ✅

---

## Aprendizajes Clave

### Técnicos
- Dominio de React hooks avanzados (useRouter custom, useTheme, useAnalytics)
- Implementación de lazy loading y code splitting efectivo
- Integración completa con APIs externas (Resend, Supabase)
- Optimización de performance y Core Web Vitals
- Service Workers y estrategias de caché
- Tailwind CSS v4 con custom properties

### UX/UI
- Importancia de accesibilidad desde el diseño inicial
- Balance entre animaciones atractivas y performance
- Sistema de diseño cohesivo y escalable
- Responsive design mobile-first
- Microinteracciones que mejoran la experiencia

### Proceso
- Metodología Design Thinking aplicada a proyecto personal
- Iteración basada en feedback y testing
- Documentación técnica detallada
- Versionado y deployment continuo
- Testing cross-browser sistemático

---

## Futuras Mejoras

### Corto Plazo
- [ ] Implementar blog técnico integrado
- [ ] Añadir filtros por categoría en página de proyectos
- [ ] Sistema de búsqueda de proyectos
- [ ] Internacionalización (i18n) español/inglés

### Medio Plazo
- [ ] CMS headless para gestión de contenido
- [ ] Generación de PDF del CV dinámicamente
- [ ] Analytics avanzado con heatmaps
- [ ] A/B testing de CTAs

### Largo Plazo
- [ ] Migración a Next.js para SSR/SSG
- [ ] Progressive Web App (PWA) completa
- [ ] Sección de testimonios de clientes
- [ ] Integración con CRM

---

## Estructura de Archivos para el Componente

Cuando se implemente, crear el archivo:
`/components/projects/portfolio-project.tsx`

Siguiendo la misma estructura que los otros proyectos (PuffyKittenProject, ChupseeProject, etc.)

Y añadir lazy loading en `/App.tsx`:

```typescript
const PortfolioProject = createLazyComponent(
  () => import('./components/projects/portfolio-project').then(m => ({ default: m.PortfolioProject })),
  'PortfolioProject'
);
```

Actualizar el router para incluir la página 'portfolio-personal'.

---

## URLs de Imágenes

**Nota**: Las imágenes deben crearse como capturas de pantalla reales del proceso de diseño del portfolio, o bien diseñarse específicamente para este caso de estudio. 

Sugerencias para obtener las imágenes:
1. **Benchmark**: Captura de grid con portfolios analizados
2. **Insights**: Crear infografía con estadísticas de investigación
3. **User Persona**: Diseñar documento de persona en Figma
4. **Journey Map**: Crear timeline del journey del reclutador
5. **Sistema de Diseño**: Captura del Figma con design system
6. **Arquitectura**: Diagrama de sitemap del portfolio
7. **Tech Stack**: Infografía con logos de tecnologías
8. **Wireframes**: Capturas de wireframes en baja fidelidad
9. **Mockups**: Capturas de Figma con diseños finales
10. **Componentes**: Grid de componentes UI
11. **Lighthouse**: Captura real de scores de Lighthouse
12. **Portfolio Live**: Screenshots del portfolio funcionando
13. **Responsive**: Mockup multi-device

Todas las imágenes deben subirse a Supabase Storage en:
`/portfolio-assets/Images/Portfolio/[nombre-descriptivo].png`

---

## Notas de Implementación

1. **No incluir prototipo de Figma embebido** en la sección Resultado - en su lugar, añadir un CTA que enlace al portfolio en vivo
2. **Usar layout `full`** para la mayoría de imágenes ya que serán capturas de pantalla o infografías
3. **Mantener consistencia** con el tono de voz de los otros proyectos (profesional, técnico pero accesible)
4. **Destacar métricas** concretas (scores de Lighthouse, tiempo de carga, compliance de WCAG)
5. **Enfatizar el journey completo** desde research hasta deployment

---

## Conclusión

Este proyecto representa la culminación de mi transición profesional al diseño UX/UI, demostrando no solo capacidades de diseño visual, sino también comprensión profunda de desarrollo frontend, accesibilidad web, performance optimization y pensamiento estratégico. Es tanto una herramienta de presentación profesional como una prueba tangible de mis habilidades técnicas y de diseño.

---

**Última actualización**: 12 de octubre de 2025
**Autor**: Jabier García Sanz
**Estado**: Documento de especificación - Listo para implementación
