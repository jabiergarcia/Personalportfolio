import { ProjectLayout } from './project-layout';

interface GotAppProjectProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onProjectClick?: (projectId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function GotAppProject({ onNavigateHome, onNavigateToProjects, onProjectClick, isDark, onToggleTheme }: GotAppProjectProps) {
  // Images for the definir section
  const definirImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Definir%20-%20How%20might%20we.png",
      alt: "How Might We transformando insights en oportunidades de diseño",
      title: "How Might We",
      description: "Reformulación de insights en oportunidades de diseño",
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Definir%20-%20Personas.png",
      alt: "User Personas con perfiles detallados de usuarios objetivo de GotApp",
      title: "User Personas",
      description: "Perfiles detallados de usuarios objetivo del producto",
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Definir%20-%20Journey%20map.png",
      alt: "Journey Map del recorrido del usuario con puntos de dolor y oportunidades",
      title: "Journey Map",
      description: "Mapeo completo de la experiencia del usuario",
      icon: "journey" as const,
      layout: "full" as const
    }
  ];

  // Images for the idear section
  const idearImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Idear%20-%20Problema%20y%20objetivo.png",
      alt: "Definición del problema a resolver y objetivo del sprint de GotApp",
      title: "Problema y Objetivo",
      description: "Definición clara del reto y objetivo del sprint",
      icon: "dafo" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Idear - Idea y Crazy 8.png",
      alt: "Ejercicio Crazy 8 con 8 soluciones rápidas a la problemática identificada",
      title: "Idea & Crazy 8",
      description: "Generación rápida de 8 conceptos y soluciones divergentes",
      icon: "insights" as const,
      layout: "full" as const
    }
  ];

  // Images for the decidir section
  const decidirImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Decidir - Crazy 8 final.png",
      alt: "Crazy 8 final con la idea ganadora seleccionada por votación del equipo",
      title: "Crazy 8 Final",
      description: "Selección de la idea ganadora mediante votación",
      icon: "prioritization" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Decidir%20-%20Storyboard.png",
      alt: "Storyboard narrando el escenario de uso completo de GotApp",
      title: "Storyboard",
      description: "Narrativa visual del escenario de uso de la solución",
      icon: "journey" as const,
      layout: "full" as const
    }
  ];

  // Images for the prototipar section
  const prototiparImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Prototipar%20-%20Sitemap.png",
      alt: "Sitemap mostrando la arquitectura de información y estructura de pantallas",
      title: "Sitemap",
      description: "Arquitectura de información y jerarquía de pantallas",
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Prototipar%20-%20Wireframes.png",
      alt: "Wireframes de media-alta fidelidad con estructura y navegación de GotApp",
      title: "Wireframes",
      description: "Estructura de pantallas y flujos de navegación",
      icon: "wireframes" as const,
      layout: "full" as const
    }
  ];

  // Images for the testeo section
  const testeoImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Testeo%20-%20Insights%201.png",
      alt: "Primera parte de insights del testeo con usuarios reales de GotApp",
      title: "Insights del Testeo - Parte 1",
      description: "Primeros hallazgos clave de las pruebas con usuarios",
      icon: "testing" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Testeo%20-%20Insights%202.png",
      alt: "Segunda parte de insights del testeo con validaciones y aprendizajes",
      title: "Insights del Testeo - Parte 2",
      description: "Hallazgos complementarios y validaciones del prototipo",
      icon: "testing" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/MPV%20y%20futuribles.png",
      alt: "MVP de GotApp con funcionalidades core y roadmap de futuribles",
      title: "MVP y Futuribles",
      description: "Producto mínimo viable y roadmap de evolución futura",
      icon: "business" as const,
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
      value: "5 personas"
    },
    {
      label: "Metodología utilizada",
      value: "Design Sprint"
    },
    {
      label: "Duración del proyecto",
      value: "5 días"
    }
  ];

  const sections = [
    {
      title: "Definir",
      bullets: [
        "Mapa de empatía y creación de personas identificando motivaciones, frustraciones y expectativas de usuarios",
        "How Might We reformulando insights en oportunidades de diseño",
        "Reto enmarcado claramente: hacer visible y entendible el consumo de agua para motivar cambios de comportamiento"
      ],
      images: definirImages
    },
    {
      title: "Idear",
      bullets: [
        "Dinámicas de Crazy 8s y sketching generando múltiples propuestas visuales y de interacción",
        "Brainstorming estructurado y mapas de afinidad organizando y priorizando ideas alineadas con el objetivo",
        "Conjunto de conceptos explorando distintas formas de representar consumo y motivar al usuario"
      ],
      images: idearImages
    },
    {
      title: "Decidir",
      bullets: [
        "Técnicas de Dot Voting y matriz de decisión seleccionando ideas con mayor impacto y factibilidad",
        "Propuestas elegidas: dashboard claro, retos semanales y consejos prácticos",
        "Énfasis en equilibrar usabilidad, claridad visual y valor educativo"
      ],
      images: decidirImages
    },
    {
      title: "Prototipar",
      bullets: [
        "Prototipos de alta fidelidad en Figma integrando identidad visual y flujos de interacción",
        "Simulación de experiencia de navegación validando arquitectura de información y pantallas clave",
        "Paso fundamental para testear rápidamente con usuarios y recoger feedback"
      ],
      images: prototiparImages
    },
    {
      title: "Testeo y MVP",
      bullets: [
        "Pruebas de usabilidad con grupo reducido analizando interacción con el prototipo",
        "Entrevistas cortas y métricas cualitativas detectando mejoras en arquitectura y gamificación",
        "Feedback confirmando interés en métricas claras y retos motivacionales, señalando necesidad de simplificar navegación",
        "MVP concebido con funcionalidades básicas: registro y monitorización de consumo, dashboard con métricas y sistema de retos semanales"
      ],
      images: testeoImages
    },
    {
      title: "Resultado",
      bullets: [
        "Prototipo navegable en Figma ofreciendo experiencia clara, práctica y motivadora",
        "Aplicación permitiendo visualizar consumo de agua, recibir consejos y participar en dinámicas interactivas",
        "Valor pedagógico reforzando sostenibilidad y generando conciencia sobre importancia del recurso"
      ],
      figmaPrototype: {
        embedUrl: "https://embed.figma.com/proto/E9KXbMQchTQAe4dDjdpLZE/%F0%9F%92%A7-Grupo-2---GotApp--Copy-?page-id=3%3A2&node-id=45-1423&viewport=912%2C2163%2C0.28&scaling=scale-down&content-scaling=fixed&starting-point-node-id=41%3A34092&embed-host=share",
        title: "Prototipo Interactivo",
        description: "Explora el prototipo completo de GotApp y descubre cómo los usuarios pueden monitorizar su consumo de agua, recibir consejos personalizados y participar en retos sostenibles.",
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
      title="GotApp | App móvil B2C"
      subtitle="App móvil B2C"
      category="App Design"
      slug="gotapp"
      tags={["App", "Sostenibilidad", "Gamificación", "Monitorización", "Design Sprint"]}
      description={{
        introduction: "GotApp es una aplicación diseñada para promover el consumo responsable de agua mediante monitorización diaria, visualización de métricas claras y dinámicas de gamificación. Desarrollada con metodología Design Sprint en 5 días, permite al usuario conocer y mejorar sus hábitos de consumo de manera educativa y motivadora.",
        problem: "Falta de conciencia real sobre el consumo de agua en actividades cotidianas y ausencia de herramientas digitales que tradujeran estos datos en información útil y comprensible. Los usuarios desconocían su impacto ambiental diario y carecían de motivación para cambiar hábitos.",
        solution: "Una app interactiva con monitorización en tiempo real que genera métricas comprensibles y visuales. Integra dinámicas de gamificación, sistema de recompensas y recomendaciones personalizadas para fomentar hábitos sostenibles mediante educación y motivación positiva del usuario."
      }}
      behanceUrl="https://www.behance.net/gallery/226941177/GotApp-Ahorro-de-agua"
      sections={sections}
      projectDetails={projectDetails}
    />
  );
}

export default GotAppProject;