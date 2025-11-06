import { ProjectLayout } from './project-layout';

interface PuffyKittenProjectProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onProjectClick?: (projectId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function PuffyKittenProject({ onNavigateHome, onNavigateToProjects, onProjectClick, isDark, onToggleTheme }: PuffyKittenProjectProps) {
  // Images for the empatizar section
  const contextCarouselImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Empatizar%20-%20Benchmark.png",
      alt: "Benchmark de competidores directos e indirectos de PuffyKitten",
      title: "Benchmark",
      description: "Análisis comparativo de competidores directos e indirectos",
      icon: "benchmark" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Empatizar%20-%20DAFO.png",
      alt: "Análisis DAFO de PuffyKitten con debilidades, amenazas, fortalezas y oportunidades",
      title: "DAFO",
      description: "Análisis estratégico DAFO del producto",
      icon: "dafo" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Empatizar%20-%20Insights.png",
      alt: "Insights clave obtenidos de encuestas y entrevistas a usuarios",
      title: "Insights",
      description: "Hallazgos clave de encuestas y entrevistas a usuarios",
      icon: "insights" as const,
      layout: "full" as const
    }
  ];

  // Images for the define section
  const defineCarouselImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Definir%20-%20Persona.png",
      alt: "Perfiles de usuario, comprador y arquetipo de PuffyKitten",
      title: "Perfiles de Persona",
      description: "User persona, buyer persona y arquetipo de marca",
      icon: "interviews" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Definir%20-%20Mapa%20de%20Empatia.png",
      alt: "Mapa de empatía con motivaciones, frustraciones y aspiraciones del usuario",
      title: "Mapa de Empatía",
      description: "Motivaciones, frustraciones y aspiraciones del usuario",
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Definir%20-%20Journey%20Map.png",
      alt: "Journey map del recorrido completo del usuario con PuffyKitten",
      title: "Journey Map",
      description: "Recorrido completo del usuario desde la compra hasta el uso",
      icon: "journey" as const,
      layout: "full" as const
    }
  ];

  // Images for the ideate section
  const ideateCarouselImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Idear%20-%20Business%20Model.png",
      alt: "Business Model Canvas con actividades clave, propuesta de valor y alianzas estratégicas",
      title: "Business Model Canvas",
      description: "Modelo de negocio con actividades clave y alianzas",
      icon: "business" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Idear%20-%20Value%20Proposition.png",
      alt: "Value Proposition Canvas centrada en experiencia digital, emocional y social",
      title: "Value Proposition Canvas",
      description: "Propuesta de valor basada en sostenibilidad y tecnología",
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Idear%20-%20Point%20of%20View.png",
      alt: "Point of View definiendo la perspectiva y necesidades del usuario objetivo",
      title: "Point of View",
      description: "Perspectiva y necesidades específicas del usuario",
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Idear%20(Priorizar)%20-%20MoSKoW.png",
      alt: "Matriz de priorización MoSCoW con funcionalidades must-have, should-have y could-have",
      title: "Priorización MoSCoW",
      description: "Priorización de funcionalidades según importancia",
      icon: "prioritization" as const,
      layout: "full" as const
    }
  ];

  // Images for the prototype section
  const prototypeCarouselImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Prototipar%20-%20Arquitectura%20de%20la%20informacion.png",
      alt: "Arquitectura de la información mostrando la organización del contenido y flujos de navegación",
      title: "Arquitectura de la información",
      description: "Organización jerárquica y estructura de navegación",
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Prototipar%20-%20Identidad%20Corporativa.png",
      alt: "Identidad corporativa de PuffyKitten con logo, colores, tipografía y estilo neobrutalista",
      title: "Identidad Corporativa",
      description: "Sistema de branding y elementos visuales de marca",
      icon: "branding" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Prototipar%20-%20Wireframes.png",
      alt: "Wireframes de baja fidelidad con estructura y layout de pantallas principales",
      title: "Wireframes",
      description: "Esquemas de interfaz y distribución de componentes",
      icon: "wireframes" as const,
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
      value: "4 semanas"
    }
  ];

  const sections = [
    {
      title: "Empatizar",
      bullets: [
        "Benchmark de competidores directos e indirectos (Catit, Tractive, Tiendanimal) identificando fortalezas y debilidades",
        "Análisis DAFO destacando oportunidades: crecimiento del mercado pet-tech, demanda de productos sostenibles y potencial de contenido viral",
        "Encuestas y entrevistas a dueños de gatos revelando insights clave: 81% interés en juguetes inteligentes, 75% en informes emocionales y 94% valorando packaging sostenible"
      ],
      images: contextCarouselImages
    },
    {
      title: "Definir",
      bullets: [
        "Perfiles de usuario, comprador y arquetipo para representar distintos segmentos",
        "Mapa de empatía recogiendo motivaciones, frustraciones y aspiraciones",
        "Journey map visualizando el recorrido desde la compra hasta la interacción digital",
        "Identificación de puntos de fricción: falta de información fiable sobre catnip, dificultad para encontrar productos sostenibles y escasa oferta de juguetes conectados"
      ],
      images: defineCarouselImages
    },
    {
      title: "Idear",
      bullets: [
        "Business Model Canvas con actividades clave: desarrollo de plataforma, investigación en bienestar animal y alianzas estratégicas",
        "Propuesta de valor centrada en transformar el consumo de catnip en experiencia digital, emocional y social",
        "Priorización MoSCoW estableciendo como imprescindibles: venta de catnip local sostenible, IA para análisis de vídeos e integración entre dispositivos físicos y digitales"
      ],
      images: ideateCarouselImages
    },
    {
      title: "Prototipado",
      bullets: [
        "Arquitectura de información y identidad visual bajo estilo neobrutalista transmitiendo frescura e innovación",
        "Aplicación de leyes de diseño: visibilidad de Jakob Nielsen, estética-usabilidad y simplicidad cognitiva",
        "MVP incluyendo venta de catnip, prototipo de juguete inteligente con sensores y dashboard con análisis básicos mediante IA",
        "Exploración de futuribles: algoritmos avanzados de detección emocional, integración con redes sociales y validación profesional"
      ],
      images: prototypeCarouselImages
    },
    {
      title: "Resultado",
      bullets: [
        "Propuesta sólida y diferenciadora conectando productos físicos y digitales en un ecosistema unificado",
        "Sistema que aporta bienestar a los gatos mientras genera confianza y valor para sus dueños",
        "Crecimiento personal como diseñador UX/UI integrando investigación, estrategia, diseño visual y prototipado en una experiencia coherente e innovadora"
      ],
      figmaPrototype: {
        embedUrl: "https://embed.figma.com/proto/uBRU2ppoGjgtqheUEAruxj/Xabi.Garcia---PFB---PuffyKitten?page-id=1341%3A27918&node-id=1493-25883&viewport=-1463%2C-743%2C0.13&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1493%3A25883&embed-host=share",
        title: "Prototipo Interactivo",
        description: "Explora el prototipo funcional de PuffyKitten y descubre cómo funciona la experiencia completa del usuario, desde la compra hasta el análisis de comportamiento de su gato.",
        type: "web" // Desktop web prototype - uses horizontal aspect ratios
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
      title="PuffyKitten | E-commerce B2C"
      subtitle="E-commerce B2C"
      category="Web Design"
      slug="puffykitten"
      tags={["Web + App", "Mascotas", "IoT", "IA", "Design Thinking"]}
      description={{
        introduction: "PuffyKitten es un proyecto personal de diseño UX/UI que busca mejorar el bienestar felino mediante tecnología. La plataforma integra un e-commerce de catnip orgánico, juguetes inteligentes con monitorización en tiempo real y una IA que analiza vídeos de gatos para generar informes sobre su comportamiento.",
        problem: "La falta de un ecosistema digital que uniera compra de productos, seguimiento de uso y acceso a información sobre comportamiento felino. Además, dificultad para encontrar catnip natural de origen nacional, limitando opciones para dueños preocupados por el bienestar de sus gatos.",
        solution: "Una experiencia digital completa que combina e-commerce, monitorización IoT en tiempo real y análisis con inteligencia artificial. El sistema genera recomendaciones personalizadas y reportes de comportamiento basados en el uso real de los productos."
      }}
      behanceUrl="https://www.behance.net/gallery/227094211/PuffyKitten"
      sections={sections}
      projectDetails={projectDetails}
    />
  );
}

export default PuffyKittenProject;