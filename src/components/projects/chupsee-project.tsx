import { ProjectLayout } from './project-layout';

interface ChupseeProjectProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onProjectClick?: (projectId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function ChupseeProject({ onNavigateHome, onNavigateToProjects, onProjectClick, isDark, onToggleTheme }: ChupseeProjectProps) {
  // Images for the empatizar section
  const empatizarImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Empatizar%20-%20Benchmark.png",
      alt: "Empatizar - Benchmark",
      title: "Benchmark",
      description: "Análisis de competidores directos e indirectos del mercado",
      icon: "benchmark" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Empatizar%20-%20Encuestas%20y%20entrevistas.png",
      alt: "Empatizar - Encuestas y entrevistas",
      title: "Encuestas y entrevistas",
      description: "Investigación cualitativa para entender necesidades de usuarios",
      icon: "interviews" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Empatizar-%20DAFO.png",
      alt: "Empatizar - Análisis DAFO",
      title: "Análisis DAFO",
      description: "Evaluación de debilidades, amenazas, fortalezas y oportunidades",
      icon: "insights" as const,
      layout: "full" as const
    }
  ];

  // Images for the define section
  const definirImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Definir%20-%20Persona.png",
      alt: "Definir - Persona",
      title: "Persona",
      description: "Arquetipos de usuarios basados en investigación real",
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Definir%20-%20Mapa%20de%20empatia.png",
      alt: "Definir - Mapa de empatía",
      title: "Mapa de empatía",
      description: "Análisis profundo de pensamientos, emociones y necesidades",
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Definir%20-%20Journey%20Map.png",
      alt: "Definir - Journey Map",
      title: "Journey Map",
      description: "Recorrido del usuario identificando puntos de dolor y oportunidades",
      icon: "journey" as const,
      layout: "full" as const
    }
  ];

  // Images for the idear section
  const idearImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Idear%20-%20Business%20Model.png",
      alt: "Idear - Business Model Canvas",
      title: "Business Model Canvas",
      description: "Modelo de negocio basado en afiliación y publicidad",
      icon: "business" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Idear%20-%20Point%20of%20View.png",
      alt: "Idear - Point of View",
      title: "Point of View",
      description: "Reformulación del problema desde la perspectiva del usuario",
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Idear%20-%20Value%20Proposition.png",
      alt: "Idear - Value Proposition",
      title: "Value Proposition",
      description: "Propuesta de valor centrada en control y simplicidad para el usuario",
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Idear%20-%20MoSKoW.png",
      alt: "Idear - MoSCoW",
      title: "MoSCoW",
      description: "Priorización de funcionalidades esenciales del MVP",
      icon: "insights" as const,
      layout: "full" as const
    }
  ];

  // Images for the prototype section
  const prototiparImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Prototipar%20-%20Arquitectura%20de%20la%20informacion.png",
      alt: "Prototipar - Arquitectura de la información",
      title: "Arquitectura de la información",
      description: "Estructura y organización de contenidos para navegación clara",
      icon: "wireframes" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Prototipar%20-%20Identidad%20Corporativa.png",
      alt: "Prototipar - Identidad Corporativa",
      title: "Identidad Corporativa",
      description: "Sistema de diseño con tonos azules y violetas que transmiten tecnología y confianza",
      icon: "branding" as const,
      layout: "full" as const
    }
  ];

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
      value: "Design Thinking"
    },
    {
      label: "Duración del proyecto",
      value: "3 semanas"
    }
  ];

  const sections = [
    {
      title: "Empatizar",
      bullets: [
        "Benchmark de competidores directos (CamelCamelCamel, Keepa) e indirectos (Klarna) para identificar oportunidades",
        "Análisis DAFO revelando fortalezas del mercado de comparadores de precios",
        "Encuestas y entrevistas descubriendo necesidades clave: alertas personalizadas, wishlist propia, integración multiplataforma y experiencia intuitiva y confiable"
      ],
      images: empatizarImages
    },
    {
      title: "Definir",
      bullets: [
        "Tres perfiles (user, buyer y arquetipo) representando diferentes usuarios digitales",
        "Mapa de empatía explorando pensamientos, emociones y necesidades",
        "Journey map reflejando el recorrido completo, puntos de dolor y expectativas en el proceso de compra online"
      ],
      images: definirImages
    },
    {
      title: "Idear",
      bullets: [
        "Business Model Canvas basado en afiliación y publicidad como fuentes de ingresos",
        "Value Proposition ofreciendo app gratuita que simplifica compras, da control total y visualiza información clara",
        "Point of View reformulando el problema desde la perspectiva del usuario",
        "Priorización MoSCoW definiendo funcionalidades esenciales: comparador multitienda, alertas inteligentes y wishlist personalizada"
      ],
      images: idearImages
    },
    {
      title: "Prototipar",
      bullets: [
        "Arquitectura de información garantizando navegación clara y coherente",
        "Identidad visual en tonos azules y violetas transmitiendo tecnología y confianza",
        "MVP con seguimiento de precios, alertas configurables, wishlist inteligente y gráficas de evolución",
        "Futuribles contemplando integración con redes sociales y recomendaciones avanzadas mediante IA"
      ],
      images: prototiparImages
    },
    {
      title: "Resultado",
      bullets: [
        "Prototipo funcional desarrollado en Figma con experiencia completa navegable",
        "Propuesta sólida de diseño UX/UI centrada en el usuario",
        "Integración exitosa de investigación, estrategia e interfaz visual clara y atractiva"
      ],
      figmaPrototype: {
        embedUrl: "https://embed.figma.com/proto/tvHmJqFcqz4WIf7356QEmm/Xabi.Garcia---Reto-2?page-id=0%3A1&node-id=31-101&viewport=-500%2C-54%2C0.8&scaling=scale-down&content-scaling=fixed&starting-point-node-id=57%3A331&embed-host=share",
        title: "Prototipo Interactivo",
        description: "Explora el prototipo completo de Chupsee y descubre cómo los usuarios pueden comparar precios, gestionar su wishlist y recibir alertas inteligentes para encontrar las mejores ofertas.",
        type: "mobile" // Mobile app prototype - uses vertical aspect ratios
      }
    }
  ];

  return (
    <ProjectLayout
      onNavigateHome={onNavigateHome}
      onNavigateToProjects={onNavigateToProjects}
      onProjectClick={onProjectClick}
      isDark={isDark}
      onToggleTheme={onToggleTheme}
      title="Chupsee | App móvil B2C"
      subtitle="App móvil B2C"
      category="App Design"
      slug="chupsee"
      tags={["App", "E-commerce", "IA Predictiva", "Comparador", "Design Thinking"]}
      description={{
        introduction: "Chupsee es una aplicación digital diseñada para encontrar las mejores ofertas online mediante monitoreo de precios, alertas personalizadas y análisis predictivo con IA. Permite tomar decisiones de compra más inteligentes y aprovechar descuentos en tiempo real, orientada a compradores digitales y analistas de precios.",
        problem: "Dificultad para hacer seguimiento efectivo de precios en múltiples tiendas, pérdida frecuente de ofertas importantes y exceso de notificaciones irrelevantes. No existía una herramienta que centralizara comparadores, wishlists y alertas inteligentes en una misma aplicación.",
        solution: "Una aplicación multiplataforma que centraliza comparación de precios, wishlists personalizadas y alertas configurables con gráficas de evolución. Integra inteligencia artificial predictiva para recomendar el momento óptimo de compra y filtrar notificaciones según preferencias del usuario."
      }}
      behanceUrl="https://www.behance.net/gallery/226923977/Chupsee-Seguimiento-de-ofertas"
      sections={sections}
      projectDetails={projectDetails}
    />
  );
}

export default ChupseeProject;