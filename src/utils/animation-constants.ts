/**
 * EASING FUNCTIONS
 * Basado en Material Design con ajustes custom
 * 
 * NOTA: Arrays sin 'as const' para compatibilidad con Motion
 */
export const EASING = {
  // Easing estándar para la mayoría de animaciones
  // Uso: Scroll reveals, transiciones de página, elementos generales
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  
  // Para entradas (elementos que aparecen)
  // Uso: Modales, dropdowns, tooltips
  enter: [0, 0, 0.2, 1] as [number, number, number, number],
  
  // Para salidas (elementos que desaparecen)
  // Uso: Cierre de modales, hide de elementos
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
  
  // Bounce sutil para microinteracciones especiales
  // Uso: Punto verde "disponible", elementos destacados
  bounce: "backOut" as const,
} as const;

/**
 * DURATIONS (en segundos)
 * Categorizado por tipo de interacción
 */
export const DURATION = {
  // Interacciones UI instantáneas (hovers, clicks)
  instant: 0.2,
  
  // Feedback rápido (buttons, toggles)
  fast: 0.3,
  
  // Transiciones estándar (scroll reveals, items)
  normal: 0.5,
  
  // Animaciones de entrada/salida (modales, páginas)
  slow: 0.6,
  
  // Narrativas especiales (hero sequence)
  narrative: 0.8,
} as const;

/**
 * DELAYS (en segundos)
 * Sistema de incrementos consistentes
 */
export const DELAY = {
  none: 0,
  xs: 0.1,    // 100ms - Entre elementos muy relacionados
  sm: 0.2,    // 200ms - Incremento estándar
  fast: 0.3,  // 300ms - Elementos relacionados
  md: 0.4,    // 400ms - Inicio de secuencias
  lg: 0.6,    // 600ms - Elementos secundarios
  xl: 0.8,    // 800ms - CTAs finales
} as const;

/**
 * STAGGER (en segundos)
 * Para animaciones escalonadas en listas/grids
 */
export const STAGGER = {
  // Para items muy pequeños (icons, badges)
  tight: 0.05,
  
  // Para cards pequeñas (stats)
  small: 0.1,
  
  // Para cards medianas (proyectos)
  medium: 0.15,
  
  // Para cards grandes (experiencias)
  large: 0.2,
} as const;

/**
 * DISTANCES (en pixels)
 * Distancias de movimiento para animaciones
 */
export const DISTANCE = {
  // Movimiento sutil
  subtle: 10,
  
  // Movimiento estándar (más común)
  standard: 40,
  
  // Movimiento pronunciado
  large: 80,
  
  // Para slides laterales (lightbox)
  slide: 300,
} as const;

/**
 * SCROLL REVEAL OPTIONS
 * Configuraciones para Intersection Observer
 */
export const SCROLL_OPTIONS = {
  // Standard: Trigger cuando 10% del elemento es visible
  standard: {
    once: true,
    margin: "0px 0px -100px 0px",
    amount: 0.1,
  },
  
  // Early: Trigger antes de que el elemento entre
  early: {
    once: true,
    margin: "0px 0px -200px 0px",
    amount: 0.05,
  },
  
  // Late: Trigger cuando el elemento está más visible
  late: {
    once: true,
    margin: "0px 0px 0px 0px",
    amount: 0.3,
  },
  
  // Footer: Para elementos al final de la página
  footer: {
    once: true,
    margin: "0px 0px 0px 0px",
    amount: 0.01,
  },
} as const;

/**
 * HERO SECTION TIMING
 * Secuencia optimizada para carga rápida (1.2s total vs 1.6s anterior)
 */
export const HERO_TIMING = {
  container: {
    delay: DELAY.none,
    duration: DURATION.slow,
  },
  card: {
    delay: DELAY.sm,      // 0.2s
    duration: DURATION.slow,
  },
  image: {
    delay: DELAY.md,      // 0.4s (paralelo con contenido)
    duration: DURATION.fast,
  },
  content: {
    delay: DELAY.md,      // 0.4s (paralelo con imagen)
    duration: DURATION.fast,
  },
  buttons: {
    delay: DELAY.lg,      // 0.6s
    duration: DURATION.fast,
  },
  contactCard: {
    delay: DELAY.lg - 0.1, // 0.5s (empieza antes que botones)
    duration: DURATION.normal,
  },
  greenDot: {
    delay: 0.9,           // 0.9s (último elemento destacado)
    duration: DURATION.fast,
  },
} as const;

/**
 * NAVBAR ANIMATIONS
 * Animaciones de entrada progresivas para la barra de navegación
 * Cada elemento entra desde diferentes posiciones con timing escalonado
 */
export const NAVBAR_ANIMATIONS = {
  // Avatar y nombre: entra desde la izquierda con bounce
  logo: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { 
      delay: DELAY.xs,    // 0.1s
      duration: DURATION.slow, 
      ease: [0.34, 1.56, 0.64, 1] // Bounce suave
    }
  },
  // Proyectos: entra desde arriba
  projects: {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { 
      delay: DELAY.fast,  // 0.3s
      duration: DURATION.normal, 
      ease: [0.22, 1, 0.36, 1] 
    }
  },
  // Experiencia: entra desde arriba (ligeramente después)
  experiences: {
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { 
      delay: DELAY.md,    // 0.4s
      duration: DURATION.normal, 
      ease: [0.22, 1, 0.36, 1] 
    }
  },
  // Contacto: entra escalando desde el centro
  contact: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { 
      delay: DELAY.md + DELAY.xs,  // 0.5s
      duration: DURATION.fast, 
      ease: [0.34, 1.56, 0.64, 1] // Bounce suave
    }
  },
  // Toggle: entra desde la derecha con rotación
  toggle: {
    initial: { x: 30, opacity: 0, rotate: -180 },
    animate: { x: 0, opacity: 1, rotate: 0 },
    transition: { 
      delay: DELAY.lg,    // 0.6s
      duration: DURATION.normal, 
      ease: [0.34, 1.56, 0.64, 1] 
    }
  },
  // Menu hamburguesa (mobile): entra desde la derecha con escala
  hamburger: {
    initial: { x: 50, opacity: 0, scale: 0.5 },
    animate: { x: 0, opacity: 1, scale: 1 },
    transition: { 
      delay: DELAY.md,    // 0.4s
      duration: DURATION.normal, 
      ease: [0.34, 1.56, 0.64, 1] 
    }
  },
  // Barra completa: entra desde arriba
  bar: {
    initial: { y: -100 },
    animate: { y: 0 },
    transition: { 
      duration: DURATION.fast, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
} as const;

/**
 * PREFERS REDUCED MOTION
 * Duración para usuarios que prefieren menos movimiento
 */
export const REDUCED_MOTION_DURATION = 0.05;

/**
 * Helper: Detectar prefers-reduced-motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Helper: Obtener duración considerando prefers-reduced-motion
 */
export const getDuration = (duration?: number): number => {
  // Validar que duration sea un número válido
  if (typeof duration !== 'number' || duration < 0 || !isFinite(duration)) {
    return DURATION.normal; // Fallback seguro
  }
  return prefersReducedMotion() ? REDUCED_MOTION_DURATION : duration;
};

/**
 * Helper: Obtener delay considerando prefers-reduced-motion
 */
export const getDelay = (delay?: number): number => {
  // Validar que delay sea un número válido
  if (typeof delay !== 'number' || delay < 0 || !isFinite(delay)) {
    return 0; // Fallback seguro - sin delay
  }
  return prefersReducedMotion() ? 0 : delay;
};

/**
 * Helper: Obtener animación completa considerando prefers-reduced-motion
 * Útil para aplicar a objetos de animación completos
 */
export const getAnimation = (animation: any) => {
  if (!animation) return {};
  
  const reduced = prefersReducedMotion();
  
  return {
    ...animation,
    transition: {
      ...animation.transition,
      duration: reduced ? REDUCED_MOTION_DURATION : animation.transition?.duration,
      delay: reduced ? 0 : animation.transition?.delay,
    }
  };
};

/**
 * SPRING CONFIGS
 * Para animaciones con spring (Modal, etc)
 */
export const SPRING = {
  // Spring suave para modales
  modal: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 300,
  },
  
  // Spring más rápida para elementos pequeños
  quick: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 400,
  },
} as const;
