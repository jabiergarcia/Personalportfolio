/**
 * Datos centralizados de proyectos
 * Fuente única de verdad para evitar inconsistencias
 */

export interface Project {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  shortDescription: string; // Para el modal de compartir (máx 2 frases)
  image: string;
  color: string;
  tags: string[];
}

export const projectsData: Project[] = [
  {
    id: 9,
    slug: "assorta",
    title: "Assorta | Retail Visual Platform",
    subtitle: "SaaS B2B",
    category: "Product Design",
    description: "Plataforma SaaS B2B que digitaliza el proceso de Visual Merchandising en retail de moda mediante una solución centralizada y operativa.",
    shortDescription: "SaaS B2B que digitaliza Visual Merchandising en retail mediante gestión visual centralizada.",
    image: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Cover%20Assorta%20Final.png",
    color: "bg-gradient-to-br from-[#2d5367]/20 to-[#70b8ba]/20",
    tags: ["Retail", "Visual Merchandising", "SaaS", "B2B", "Product Design"]
  },
  {
    id: 1,
    slug: "puffykitten",
    title: "PuffyKitten | E-commerce B2C",
    subtitle: "E-commerce B2C",
    category: "Web Design",
    description: "Ecosistema digital que combina e-commerce de productos para gatos, juguetes IoT con monitorización en tiempo real y análisis de IA del comportamiento felino.",
    shortDescription: "E-commerce de productos para gatos con juguetes IoT y análisis de comportamiento con IA.",
    image: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Cover-puffikitten.png",
    color: "bg-gradient-to-br from-[#70b8ba]/20 to-[#d8f878]/20",
    tags: ["Web + App", "Mascotas", "IoT", "IA", "Design Thinking"]
  },
  {
    id: 8,
    slug: "gotapp",
    title: "GotApp | App móvil B2C",
    subtitle: "App móvil B2C",
    category: "App Design",
    description: "App para consumo responsable de agua con monitorización inteligente y gamificación. Desarrollada en Design Sprint de 5 días para generar cambio de mentalidad.",
    shortDescription: "App de consumo responsable de agua con monitorización y gamificación.",
    image: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Cover-gotaap.png",
    color: "bg-gradient-to-br from-[#ffccb6]/20 to-[#2d5367]/20",
    tags: ["App", "Sostenibilidad", "Gamificación", "Monitorización", "Design Sprint"]
  },
  {
    id: 7,
    slug: "ds-pomeranian",
    title: "Pomeranian | Design System",
    subtitle: "Design System",
    category: "Design System",
    description: "Sistema de diseño con metodología Atomic Design, tokens visuales y librería de 12 componentes reutilizables. Garantiza consistencia y eficiencia en diseño y desarrollo.",
    shortDescription: "Design System con Atomic Design y librería de componentes reutilizables.",
    image: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Cover%20Design%20System.png",
    color: "bg-gradient-to-br from-[#d8f878]/30 to-[#70b8ba]/20",
    tags: ["Atomic Design", "Estilos", "Tokens", "Componentes", "Escalabilidad"]
  },
  {
    id: 2,
    slug: "chupsee",
    title: "Chupsee | App móvil B2C",
    subtitle: "App móvil B2C",
    category: "App Design", 
    description: "App de comparación de precios multitienda con wishlists personalizadas y análisis predictivo de IA para recomendar el momento óptimo de compra.",
    shortDescription: "Comparador de precios multitienda con wishlists e IA predictiva.",
    image: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Cover%20Chupsee.png",
    color: "bg-gradient-to-br from-[#ffccb6]/30 to-[#d8f878]/20",
    tags: ["App", "E-commerce", "IA Predictiva", "Comparador", "Design Thinking"]
  }
];

/**
 * Helper function to generate the full project URL
 * Maps project slugs to their routes
 */
export function getProjectUrl(slug: string): string {
  const routeMap: Record<string, string> = {
    'puffykitten': '/proyectos/puffykitten',
    'chupsee': '/proyectos/chupsee',
    'ds-pomeranian': '/proyectos/pomeranian',
    'gotapp': '/proyectos/gotapp',
    'assorta': '/proyectos/assorta'
  };
  
  const path = routeMap[slug] || `/proyectos/${slug}`;
  
  // Check if window is available
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }
  
  // Fallback for SSR or when window is not available
  return path;
}

/**
 * Helper function to generate the shareable project URL
 * Always uses production domain (jabiergarcia.com) for sharing on social media
 */
export function getShareableProjectUrl(slug: string): string {
  const routeMap: Record<string, string> = {
    'puffykitten': '/proyectos/puffykitten',
    'chupsee': '/proyectos/chupsee',
    'ds-pomeranian': '/proyectos/pomeranian',
    'gotapp': '/proyectos/gotapp',
    'assorta': '/proyectos/assorta'
  };
  
  const path = routeMap[slug] || `/proyectos/${slug}`;
  
  // Always use production domain for sharing
  const PRODUCTION_DOMAIN = 'https://jabiergarcia.com';
  
  return `${PRODUCTION_DOMAIN}${path}`;
}