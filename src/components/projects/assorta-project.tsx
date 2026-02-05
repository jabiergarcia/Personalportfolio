import { ProjectLayout } from './project-layout';
import { useLanguage } from '../../hooks/use-language';
import { projectsDetailES } from '../../translations/projects-detail-es';
import { projectsDetailEN } from '../../translations/projects-detail-en';

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

  const { language, t } = useLanguage();
  const projectDetail = language === 'es' ? projectsDetailES.assorta : projectsDetailEN.assorta;

  // ============================================
  // CONTEXTO DEL PROBLEMA
  // ============================================
  const contextCarouselImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%201%20Contexto%20Problema%20-%20Editor%20Layouts.png",
      alt: projectDetail.sections.context.images[0].alt,
      title: projectDetail.sections.context.images[0].title,
      description: projectDetail.sections.context.images[0].description,
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%202%20Contexto%20Problema%20-%20Sample%20Picking%20Visual.png",
      alt: projectDetail.sections.context.images[1].alt,
      title: projectDetail.sections.context.images[1].title,
      description: projectDetail.sections.context.images[1].description,
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%203%20Contexto%20Problema%20-%20Overview%20Tienda.png",
      alt: projectDetail.sections.context.images[2].alt,
      title: projectDetail.sections.context.images[2].title,
      description: projectDetail.sections.context.images[2].description,
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
      alt: projectDetail.sections.problem.images[0].alt,
      title: projectDetail.sections.problem.images[0].title,
      description: projectDetail.sections.problem.images[0].description,
      icon: "interviews" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%205%20Definicion%20Problema%20-%20Zonas%20Tienda.png",
      alt: projectDetail.sections.problem.images[1].alt,
      title: projectDetail.sections.problem.images[1].title,
      description: projectDetail.sections.problem.images[1].description,
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%206%20Definicion%20Problema%20-%20Flujo%20Operativo.png",
      alt: projectDetail.sections.problem.images[2].alt,
      title: projectDetail.sections.problem.images[2].title,
      description: projectDetail.sections.problem.images[2].description,
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
      alt: projectDetail.sections.decisions.images[0].alt,
      title: projectDetail.sections.decisions.images[0].title,
      description: projectDetail.sections.decisions.images[0].description,
      icon: "journey" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%208%20Decisiones%20Producto%20-%20Detalles%20Editor.png",
      alt: projectDetail.sections.decisions.images[1].alt,
      title: projectDetail.sections.decisions.images[1].title,
      description: projectDetail.sections.decisions.images[1].description,
      icon: "wireframes" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%209%20Decision%20Producto%20-%20Moodboard%20Aplicado.png",
      alt: projectDetail.sections.decisions.images[2].alt,
      title: projectDetail.sections.decisions.images[2].title,
      description: projectDetail.sections.decisions.images[2].description,
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
      alt: projectDetail.sections.build.images[0].alt,
      title: projectDetail.sections.build.images[0].title,
      description: projectDetail.sections.build.images[0].description,
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%2011%20Construccion%20Producto%20-%20Drag&Drop.png",
      alt: projectDetail.sections.build.images[1].alt,
      title: projectDetail.sections.build.images[1].title,
      description: projectDetail.sections.build.images[1].description,
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Img%2012%20Construccion%20Prooducto%20-%20KPIs.png",
      alt: projectDetail.sections.build.images[2].alt,
      title: projectDetail.sections.build.images[2].title,
      description: projectDetail.sections.build.images[2].description,
      icon: "benchmark" as const,
      layout: "full" as const
    }
  ];

  // ============================================
  // PROJECT DETAILS
  // ============================================
  const projectDetails = [
    {
      label: t.projectCommon.projectCreation,
      value: projectDetail.details.creation
    },
    {
      label: t.projectCommon.participants,
      value: projectDetail.details.participants
    },
    {
      label: t.projectCommon.methodology,
      value: projectDetail.details.methodology
    },
    {
      label: t.projectCommon.duration,
      value: projectDetail.details.duration
    }
  ];

  // ============================================
  // SECTIONS
  // ============================================
  const sections = [
    {
      title: projectDetail.sections.context.title,
      bullets: projectDetail.sections.context.bullets,
      images: contextCarouselImages
    },
    {
      title: projectDetail.sections.problem.title,
      bullets: projectDetail.sections.problem.bullets,
      images: problemCarouselImages
    },
    {
      title: projectDetail.sections.decisions.title,
      bullets: projectDetail.sections.decisions.bullets,
      images: productDecisionsCarouselImages
    },
    {
      title: projectDetail.sections.build.title,
      bullets: projectDetail.sections.build.bullets,
      images: buildCarouselImages
    },
    {
      title: projectDetail.sections.result.title,
      bullets: projectDetail.sections.result.bullets,
      externalLink: {
        label: projectDetail.sections.result.externalLink.label,
        url: "https://assorta.figma.site/",
        description: projectDetail.sections.result.externalLink.description
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
      title={t.projects.assorta.title}
      subtitle={t.projects.assorta.subtitle}
      category={t.projects.assorta.category}
      slug="assorta"
      tags={[
        t.projects.assorta.tags.retail,
        t.projects.assorta.tags.visualMerchandising,
        t.projects.assorta.tags.saas,
        t.projects.assorta.tags.b2b,
        t.projects.assorta.tags.productDesign
      ]}
      description={{
        introduction: projectDetail.introduction,
        problem: projectDetail.problem,
        solution: projectDetail.solution
      }}
      sections={sections}
      projectDetails={projectDetails}
    />
  );
}

export default AssortaProject;
