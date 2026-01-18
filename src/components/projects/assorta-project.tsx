import { ProjectLayout } from './project-layout';

interface AssortaProjectProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onProjectClick?: (projectId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function AssortaProject({
  onNavigateHome,
  onNavigateToProjects,
  onProjectClick,
  isDark,
  onToggleTheme
}: AssortaProjectProps) {

  // ============================================
  // CONTEXTO DEL PROBLEMA
  // ============================================
  const contextCarouselImages = [
    {
      src: "https://images.unsplash.com/photo-1610650394144-a778795cf585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yZSUyMGxheW91dCUyMHBsYW5uaW5nfGVufDF8fHx8MTc2NTc5NDM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Editor visual de layouts de tienda",
      title: "Editor de layouts",
      description: "Planificación visual real de tienda",
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://images.unsplash.com/photo-1762267659914-4cbfa2605627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBwcm9kdWN0JTIwZGlzcGxheXxlbnwxfHx8fDE3NjU3OTQzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Asignación visual de producto a zonas",
      title: "Sample picking visual",
      description: "Asignación directa de producto",
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://images.unsplash.com/photo-1760287363707-851f4780b98c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcmV0YWlsJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1Nzk0Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Vista general de implantaciones de tienda",
      title: "Overview de tienda",
      description: "Visión global de implantaciones",
      icon: "layers" as const,
      layout: "full" as const
    }
  ];

  // ============================================
  // DEFINICIÓN DEL PROBLEMA
  // ============================================
  const problemCarouselImages = [
    {
      src: "https://images.unsplash.com/photo-1758543102367-da8b00ddf4da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjB3b3JrZmxvdyUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzY1Nzk0Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Roles operativos dentro del retail",
      title: "Roles operativos",
      description: "Estructura real de retail",
      icon: "interviews" as const,
      layout: "full" as const
    },
    {
      src: "https://images.unsplash.com/photo-1709313779222-afea06b15286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjB6b25lcyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjU3OTQzNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Zonas y áreas de tienda",
      title: "Zonas de tienda",
      description: "Claridad espacial operativa",
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://images.unsplash.com/photo-1762530351373-5d77b5c13d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcmV0YWlsJTIwcGxhbm5pbmd8ZW58MXx8fHwxNzY1Nzk0Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Flujo operativo de trabajo",
      title: "Flujo operativo",
      description: "Proceso claro y repetible",
      icon: "journey" as const,
      layout: "full" as const
    }
  ];

  // ============================================
  // DECISIONES DE PRODUCTO
  // ============================================
  const productDecisionsCarouselImages = [
    {
      src: "https://images.unsplash.com/photo-1570894808314-677b57f25e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY1Nzk0Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Flujo principal del producto",
      title: "Flujo del producto",
      description: "El core del sistema",
      icon: "journey" as const,
      layout: "full" as const
    },
    {
      src: "https://images.unsplash.com/photo-1705164686320-cf877bf7f338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzY1Nzk0Mzc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Detalle del editor visual",
      title: "Detalle del editor",
      description: "UX pensada para uso diario",
      icon: "wireframes" as const,
      layout: "full" as const
    },
    {
      src: "https://images.unsplash.com/photo-1761244105557-72d8e83ec4d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbWVyY2hhbmRpc2luZyUyMGRpc3BsYXl8ZW58MXx8fHwxNzY1Nzk0Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Moodboard aplicado a tienda",
      title: "Moodboard aplicado",
      description: "Del concepto a tienda",
      icon: "branding" as const,
      layout: "full" as const
    }
  ];

  // ============================================
  // CONSTRUCCIÓN DEL PRODUCTO
  // ============================================
  const buildCarouselImages = [
    {
      src: "https://images.unsplash.com/photo-1610650394144-a778795cf585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yZSUyMGxheW91dCUyMHBsYW5uaW5nfGVufDF8fHx8MTc2NTc5NDM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Aplicación web funcional",
      title: "App funcional",
      description: "Producto real en uso",
      icon: "business" as const,
      layout: "full" as const
    },
    {
      src: "https://images.unsplash.com/photo-1762267659914-4cbfa2605627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBwcm9kdWN0JTIwZGlzcGxheXxlbnwxfHx8fDE3NjU3OTQzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Editor 2D de tienda",
      title: "Editor 2D",
      description: "Espacio físico digitalizado",
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://images.unsplash.com/photo-1760287363707-851f4780b98c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcmV0YWlsJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1Nzk0Mzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Interacción drag and drop",
      title: "Drag & drop",
      description: "Interacción directa y visual",
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://images.unsplash.com/photo-1710073505347-8e892c1922e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBhbmFseXRpY3MlMjBrcGl8ZW58MXx8fHwxNzY1Nzk0Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "KPIs visuales de tienda",
      title: "KPIs de tienda",
      description: "Impacto comercial visible",
      icon: "benchmark" as const,
      layout: "full" as const
    }
  ];

  // ============================================
  // PROJECT DETAILS
  // ============================================
  const projectDetails = [
    {
      label: "Creación del proyecto",
      value: "2025 - 2026"
    },
    {
      label: "Personas participantes",
      value: "1 persona"
    },
    {
      label: "Metodología utilizada",
      value: "Product-driven development"
    },
    {
      label: "Duración del proyecto",
      value: "En desarrollo"
    }
  ];

  // ============================================
  // SECTIONS
  // ============================================
  const sections = [
    {
      title: "Contexto del problema",
      bullets: [
        "Decidí iniciar este proyecto a partir de más de 10 años de experiencia trabajando en tienda y coordinando implantaciones visuales bajo presión operativa",
        "En la mayoría de retailers medianos y grandes, el Visual Merchandising sigue apoyándose en herramientas no diseñadas para este fin: Excel, PDFs, fotografías y mensajería instantánea",
        "Esta falta de herramientas específicas provoca inconsistencias entre tiendas, errores en la implantación y una enorme carga administrativa para equipos que deberían centrarse en el trabajo creativo y comercial"
      ],
      images: contextCarouselImages
    },
    {
      title: "Definición del problema",
      bullets: [
        "No existe un producto digital donde centralizar layouts, producto, zonas de tienda y estados de implantación",
        "Identifiqué que uno de los principales cuellos de botella era la comunicación unidireccional entre headquarters y tiendas, lo que impedía adaptar las decisiones visuales al stock real disponible",
        "Las decisiones visuales no quedan registradas ni vinculadas a resultados comerciales, lo que impide aprender, iterar y optimizar futuras implantaciones",
        "El Visual Merchandising carece de herramientas que hablen su mismo lenguaje: espacio, producto, concepto y rotación"
      ],
      images: problemCarouselImages
    },
    {
      title: "Decisiones de producto",
      bullets: [
        "Se define el sample picking como núcleo del sistema, entendiendo que la asignación de producto a espacio es el punto crítico del proceso",
        "Decidí priorizar claridad visual y rapidez de uso frente a complejidad funcional, asumiendo conscientemente ciertas limitaciones, porque el producto se utiliza en contextos de alta presión operativa en tienda",
        "Todas las decisiones de diseño se basan en flujos reales de tienda: planos del espacio, seleccion de zonas para visualizar layouts, numeración de elementos, adaptación al stock, validación visual y documentación operativa",
        "Descarté conscientemente la creación de un software enterprise pesado y opté por una experiencia directa y visual, alineada con la forma real de trabajar de los equipos de Visual Merchandising"
      ],
      images: productDecisionsCarouselImages
    },
    {
      title: "Construcción del producto",
      bullets: [
        "Opté por desarrollar Assorta como una aplicación funcional en alta fidelidad utilizando Figma Make, con el objetivo de validar rápidamente el producto en uso real antes de una fase de desarrollo técnico",
        "El editor 2D permite digitalizar el espacio físico de tienda y trabajar sobre él de forma visual mediante drag & drop",
        "El sistema integra los moodboards, sample picking, layouts y planos de tienda en un único entorno, reduciendo saltos entre herramienta",
        "El producto se construye de forma iterativa, validando cada funcionalidad contra su uso real y su aportación al flujo de trabajo diario"
      ],
      images: buildCarouselImages
    },
    {
      title: "Resultado",
      bullets: [
        "Assorta es una plataforma web funcional que digitaliza un proceso clave del retail fashion históricamente manual y poco trazable",
        "El proyecto demuestra cómo la experiencia profesional puede convertirse en producto digital sin depender de research académico tradicional",
        "Supone un punto de inflexión personal, consolidando el paso de Visual Merchandising Manager a Product Designer con enfoque en herramientas B2B reales",
        "El producto queda preparado para escalar hacia integraciones con RFID, KPIs avanzados y entornos multi-tienda"
      ],
      externalLink: {
        label: "Explorar la aplicación en vivo",
        url: "https://assorta.app",
        description: "Accede a la plataforma y explora el producto en funcionamiento"
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
      title="Assorta | Retail Visual Platform"
      subtitle="SaaS B2B"
      category="Product Design"
      slug="assorta"
      tags={[
        "Retail",
        "Visual Merchandising",
        "SaaS",
        "B2B",
        "Product Design"
      ]}
      description={{
        introduction:
          "Assorta es una plataforma SaaS B2B diseñada para digitalizar el proceso de Visual Merchandising en retail de moda. Nace de experiencia profesional real y se construye como una solución funcional orientada al uso en tienda, coordinando equipos.",
        problem:
          "Los equipos de Visual Merchandising carecen de una herramienta digital que conecte planificación visual, asignación de producto y ejecución en tienda. La información se dispersa entre PDFs, hojas de cálculo y mensajes informales, impidiendo una visión clara, trazable y medible del impacto comercial.",
        solution:
          "Assorta centraliza todo el flujo de trabajo de Visual Merchandising en una plataforma visual, operativa y colaborativa. Permite planificar layouts, realizar sample picking digital y estructurar la implantación en tienda, conectando las decisiones visuales con datos reales y reduciendo la fricción operativa."
      }}
      sections={sections}
      projectDetails={projectDetails}
    />
  );
}

export default AssortaProject;