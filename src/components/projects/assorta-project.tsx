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
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%201%20Contexto%20Problema%20-%20Editor%20Layouts.png",
      alt: "Editor visual de layouts de tienda",
      title: "Editor de layouts",
      description: "Planificación visual real de tienda",
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%202%20Contexto%20Problema%20-%20Sample%20Picking%20Visual.png",
      alt: "Asignación visual de producto a zonas",
      title: "Sample picking visual",
      description: "Asignación directa de producto",
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%203%20Contexto%20Problema%20-%20Overview%20Tienda.png",
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
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%204%20Definicion%20Problema%20-%20Roles%20Operativos.png",
      alt: "Roles operativos dentro del retail",
      title: "Roles operativos",
      description: "Estructura real de retail",
      icon: "interviews" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%205%20Definicion%20Problema%20-%20Zonas%20Tienda.png",
      alt: "Zonas y áreas de tienda",
      title: "Zonas de tienda",
      description: "Claridad espacial operativa",
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%206%20Definicion%20Problema%20-%20Flujo%20Operativo.png",
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
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%207%20Decisiones%20Producto%20-%20Flujo%20Producto.png",
      alt: "Flujo principal del producto",
      title: "Flujo del producto",
      description: "El core del sistema",
      icon: "journey" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%208%20Decisiones%20Producto%20-%20Detalles%20Editor.png",
      alt: "Detalle del editor visual",
      title: "Detalle del editor",
      description: "UX pensada para uso diario",
      icon: "wireframes" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%209%20Decision%20Producto%20-%20Moodboard%20Aplicado.png",
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
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%2010%20Construccion%20Producto%20-%20Editor%202D.png",
      alt: "Editor 2D de tienda",
      title: "Editor 2D",
      description: "Espacio físico digitalizado",
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%2011%20Construccion%20Producto%20-%20Drag&Drop.png",
      alt: "Interacción drag and drop",
      title: "Drag & drop",
      description: "Interacción directa y visual",
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%2012%20Construccion%20Prooducto%20-%20KPIs.png",
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
      value: "2026"
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
        url: "https://assorta.figma.site/",
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