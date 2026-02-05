import { ProjectLayout } from './project-layout';
import { useLanguage } from '../../hooks/use-language';
import { projectsDetailES } from '../../translations/projects-detail-es';
import { projectsDetailEN } from '../../translations/projects-detail-en';

interface PuffyKittenProjectProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onProjectClick?: (projectId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function PuffyKittenProject({ onNavigateHome, onNavigateToProjects, onProjectClick, isDark, onToggleTheme }: PuffyKittenProjectProps) {
  
  const { language, t } = useLanguage();
  const projectDetail = language === 'es' ? projectsDetailES.puffykitten : projectsDetailEN.puffykitten;

  // Images for the empatizar section
  const contextCarouselImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Empatizar%20-%20Benchmark.png",
      alt: projectDetail.sections.empathize.images[0].alt,
      title: projectDetail.sections.empathize.images[0].title,
      description: projectDetail.sections.empathize.images[0].description,
      icon: "benchmark" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Empatizar%20-%20DAFO.png",
      alt: projectDetail.sections.empathize.images[1].alt,
      title: projectDetail.sections.empathize.images[1].title,
      description: projectDetail.sections.empathize.images[1].description,
      icon: "dafo" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Empatizar%20-%20Insights.png",
      alt: projectDetail.sections.empathize.images[2].alt,
      title: projectDetail.sections.empathize.images[2].title,
      description: projectDetail.sections.empathize.images[2].description,
      icon: "insights" as const,
      layout: "full" as const
    }
  ];

  // Images for the define section
  const defineCarouselImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Definir%20-%20Persona.png",
      alt: projectDetail.sections.define.images[0].alt,
      title: projectDetail.sections.define.images[0].title,
      description: projectDetail.sections.define.images[0].description,
      icon: "interviews" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Definir%20-%20Mapa%20de%20Empatia.png",
      alt: projectDetail.sections.define.images[1].alt,
      title: projectDetail.sections.define.images[1].title,
      description: projectDetail.sections.define.images[1].description,
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Definir%20-%20Journey%20Map.png",
      alt: projectDetail.sections.define.images[2].alt,
      title: projectDetail.sections.define.images[2].title,
      description: projectDetail.sections.define.images[2].description,
      icon: "journey" as const,
      layout: "full" as const
    }
  ];

  // Images for the ideate section
  const ideateCarouselImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Idear%20-%20Business%20Model.png",
      alt: projectDetail.sections.ideate.images[0].alt,
      title: projectDetail.sections.ideate.images[0].title,
      description: projectDetail.sections.ideate.images[0].description,
      icon: "business" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Idear%20-%20Value%20Proposition.png",
      alt: projectDetail.sections.ideate.images[1].alt,
      title: projectDetail.sections.ideate.images[1].title,
      description: projectDetail.sections.ideate.images[1].description,
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Idear%20-%20Point%20of%20View.png",
      alt: projectDetail.sections.ideate.images[2].alt,
      title: projectDetail.sections.ideate.images[2].title,
      description: projectDetail.sections.ideate.images[2].description,
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Idear%20(Priorizar)%20-%20MoSKoW.png",
      alt: projectDetail.sections.ideate.images[3].alt,
      title: projectDetail.sections.ideate.images[3].title,
      description: projectDetail.sections.ideate.images[3].description,
      icon: "prioritization" as const,
      layout: "full" as const
    }
  ];

  // Images for the prototype section
  const prototypeCarouselImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Prototipar%20-%20Arquitectura%20de%20la%20informacion.png",
      alt: projectDetail.sections.prototype.images[0].alt,
      title: projectDetail.sections.prototype.images[0].title,
      description: projectDetail.sections.prototype.images[0].description,
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Prototipar%20-%20Identidad%20Corporativa.png",
      alt: projectDetail.sections.prototype.images[1].alt,
      title: projectDetail.sections.prototype.images[1].title,
      description: projectDetail.sections.prototype.images[1].description,
      icon: "branding" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Prototipar%20-%20Wireframes.png",
      alt: projectDetail.sections.prototype.images[2].alt,
      title: projectDetail.sections.prototype.images[2].title,
      description: projectDetail.sections.prototype.images[2].description,
      icon: "wireframes" as const,
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
      images: contextCarouselImages
    },
    {
      title: projectDetail.sections.define.title,
      bullets: projectDetail.sections.define.bullets,
      images: defineCarouselImages
    },
    {
      title: projectDetail.sections.ideate.title,
      bullets: projectDetail.sections.ideate.bullets,
      images: ideateCarouselImages
    },
    {
      title: projectDetail.sections.prototype.title,
      bullets: projectDetail.sections.prototype.bullets,
      images: prototypeCarouselImages
    },
    {
      title: projectDetail.sections.result.title,
      bullets: projectDetail.sections.result.bullets,
      figmaPrototype: {
        embedUrl: "https://embed.figma.com/proto/uBRU2ppoGjgtqheUEAruxj/Xabi.Garcia---PFB---PuffyKitten?page-id=1341%3A27918&node-id=1493-25883&viewport=-1463%2C-743%2C0.13&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1493%3A25883&embed-host=share",
        title: t.projectCommon.prototypeTitle,
        description: projectDetail.sections.result.prototypeDescription,
        type: "web" as const // Desktop web prototype - uses horizontal aspect ratios
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
      title={t.projects.puffykitten.title}
      subtitle={t.projects.puffykitten.subtitle}
      category={t.projects.puffykitten.category}
      slug="puffykitten"
      tags={[
        t.projects.puffykitten.tags.webApp,
        t.projects.puffykitten.tags.pets,
        t.projects.puffykitten.tags.iot,
        t.projects.puffykitten.tags.ai,
        t.projects.puffykitten.tags.designThinking
      ]}
      description={{
        introduction: projectDetail.introduction,
        problem: projectDetail.problem,
        solution: projectDetail.solution
      }}
      behanceUrl="https://www.behance.net/gallery/227094211/PuffyKitten"
      sections={sections}
      projectDetails={projectDetails}
    />
  );
}

export default PuffyKittenProject;
