import { ProjectLayout } from './project-layout';
import { useLanguage } from '../../hooks/use-language';
import { projectsDetailES } from '../../translations/projects-detail-es';
import { projectsDetailEN } from '../../translations/projects-detail-en';

interface ChupseeProjectProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onProjectClick?: (projectId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function ChupseeProject({ onNavigateHome, onNavigateToProjects, onProjectClick, isDark, onToggleTheme }: ChupseeProjectProps) {
  
  const { language, t } = useLanguage();
  const projectDetail = language === 'es' ? projectsDetailES.chupsee : projectsDetailEN.chupsee;

  // Images for the empatizar section
  const empatizarImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Empatizar%20-%20Benchmark.png",
      alt: projectDetail.sections.empathize.images[0].alt,
      title: projectDetail.sections.empathize.images[0].title,
      description: projectDetail.sections.empathize.images[0].description,
      icon: "benchmark" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Empatizar%20-%20Encuestas%20y%20entrevistas.png",
      alt: projectDetail.sections.empathize.images[1].alt,
      title: projectDetail.sections.empathize.images[1].title,
      description: projectDetail.sections.empathize.images[1].description,
      icon: "interviews" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Empatizar-%20DAFO.png",
      alt: projectDetail.sections.empathize.images[2].alt,
      title: projectDetail.sections.empathize.images[2].title,
      description: projectDetail.sections.empathize.images[2].description,
      icon: "insights" as const,
      layout: "full" as const
    }
  ];

  // Images for the define section
  const definirImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Definir%20-%20Persona.png",
      alt: projectDetail.sections.define.images[0].alt,
      title: projectDetail.sections.define.images[0].title,
      description: projectDetail.sections.define.images[0].description,
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Definir%20-%20Mapa%20de%20empatia.png",
      alt: projectDetail.sections.define.images[1].alt,
      title: projectDetail.sections.define.images[1].title,
      description: projectDetail.sections.define.images[1].description,
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Definir%20-%20Journey%20Map.png",
      alt: projectDetail.sections.define.images[2].alt,
      title: projectDetail.sections.define.images[2].title,
      description: projectDetail.sections.define.images[2].description,
      icon: "journey" as const,
      layout: "full" as const
    }
  ];

  // Images for the idear section
  const idearImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Idear%20-%20Business%20Model.png",
      alt: projectDetail.sections.ideate.images[0].alt,
      title: projectDetail.sections.ideate.images[0].title,
      description: projectDetail.sections.ideate.images[0].description,
      icon: "business" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Idear%20-%20Point%20of%20View.png",
      alt: projectDetail.sections.ideate.images[1].alt,
      title: projectDetail.sections.ideate.images[1].title,
      description: projectDetail.sections.ideate.images[1].description,
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Idear%20-%20Value%20Proposition.png",
      alt: projectDetail.sections.ideate.images[2].alt,
      title: projectDetail.sections.ideate.images[2].title,
      description: projectDetail.sections.ideate.images[2].description,
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Idear%20-%20MoSKoW.png",
      alt: projectDetail.sections.ideate.images[3].alt,
      title: projectDetail.sections.ideate.images[3].title,
      description: projectDetail.sections.ideate.images[3].description,
      icon: "insights" as const,
      layout: "full" as const
    }
  ];

  // Images for the prototype section
  const prototiparImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Prototipar%20-%20Arquitectura%20de%20la%20informacion.png",
      alt: projectDetail.sections.prototype.images[0].alt,
      title: projectDetail.sections.prototype.images[0].title,
      description: projectDetail.sections.prototype.images[0].description,
      icon: "wireframes" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Prototipar%20-%20Identidad%20Corporativa.png",
      alt: projectDetail.sections.prototype.images[1].alt,
      title: projectDetail.sections.prototype.images[1].title,
      description: projectDetail.sections.prototype.images[1].description,
      icon: "branding" as const,
      layout: "full" as const
    }
  ];

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

  const sections = [
    {
      title: projectDetail.sections.empathize.title,
      bullets: projectDetail.sections.empathize.bullets,
      images: empatizarImages
    },
    {
      title: projectDetail.sections.define.title,
      bullets: projectDetail.sections.define.bullets,
      images: definirImages
    },
    {
      title: projectDetail.sections.ideate.title,
      bullets: projectDetail.sections.ideate.bullets,
      images: idearImages
    },
    {
      title: projectDetail.sections.prototype.title,
      bullets: projectDetail.sections.prototype.bullets,
      images: prototiparImages
    },
    {
      title: projectDetail.sections.result.title,
      bullets: projectDetail.sections.result.bullets,
      figmaPrototype: {
        embedUrl: "https://embed.figma.com/proto/tvHmJqFcqz4WIf7356QEmm/Xabi.Garcia---Reto-2?page-id=0%3A1&node-id=31-101&viewport=-500%2C-54%2C0.8&scaling=scale-down&content-scaling=fixed&starting-point-node-id=57%3A331&embed-host=share",
        title: t.projectCommon.prototypeTitle,
        description: projectDetail.sections.result.prototypeDescription,
        type: "mobile" as const // Mobile app prototype - uses vertical aspect ratios
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
      title={t.projects.chupsee.title}
      subtitle={t.projects.chupsee.subtitle}
      category={t.projects.chupsee.category}
      slug="chupsee"
      tags={[
        t.projects.chupsee.tags.app,
        t.projects.chupsee.tags.ecommerce,
        t.projects.chupsee.tags.aiPredictive,
        t.projects.chupsee.tags.comparator,
        t.projects.chupsee.tags.designThinking
      ]}
      description={{
        introduction: projectDetail.introduction,
        problem: projectDetail.problem,
        solution: projectDetail.solution
      }}
      behanceUrl="https://www.behance.net/gallery/226923977/Chupsee-Seguimiento-de-ofertas"
      sections={sections}
      projectDetails={projectDetails}
    />
  );
}

export default ChupseeProject;
