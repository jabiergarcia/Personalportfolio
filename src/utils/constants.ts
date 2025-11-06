/**
 * Constantes centralizadas del portfolio
 * Fuente única de verdad para URLs y configuraciones
 */

// URLs de assets desde Supabase Storage
export const PROFILE_IMAGE_URL = "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/javier-profile.png";

export const CV_URL = "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Docs/javier-garcia-sanz-CV-ES.pdf";

// Información de contacto
export const CONTACT_INFO = {
  name: "Jabier García Sanz",
  email: "garciasanz.j@gmail.com",
  phone: "+34608412974",
  phoneFormatted: "+34 608 412 974",
  location: "Madrid, España",
  jobTitle: "UX/UI Designer",
  jobTitleFull: "UX/UI Designer | Design System | UI Interface | UX Research",
} as const;

// Redes sociales
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/jabiergarcia/",
  behance: "https://www.behance.net/jabiergarciasanz",
} as const;

// Meta información del sitio
export const SITE_INFO = {
  domain: "https://jabiergarcia.com", // Dominio sin www (prioritario)
  title: "Jabier García Sanz - UX/UI Designer",
  description: "Portfolio de Jabier García Sanz, UX/UI Designer con 13 años de experiencia en moda y especialización en diseño centrado en el usuario.",
} as const;