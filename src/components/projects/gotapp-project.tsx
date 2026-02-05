import { ProjectLayout } from './project-layout';
import { useLanguage } from '../../hooks/use-language';
import { projectsDetailES } from '../../translations/projects-detail-es';
import { projectsDetailEN } from '../../translations/projects-detail-en';

interface GotAppProjectProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onProjectClick?: (projectId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function GotAppProject({ onNavigateHome, onNavigateToProjects, onProjectClick, isDark, onToggleTheme }: GotAppProjectProps) {
  
  const { language, t } = useLanguage();
  const projectDetail = language === 'es' ? projectsDetailES.gotapp : projectsDetailEN.gotapp;

  // Images for the definir section
  const definirImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Definir%20-%20How%20might%20we.png",
      alt: projectDetail.sections.define.images[0].alt,
      title: projectDetail.sections.define.images[0].title,
      description: projectDetail.sections.define.images[0].description,
      icon: "insights" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Definir%20-%20Personas.png",
      alt: projectDetail.sections.define.images[1].alt,
      title: projectDetail.sections.define.images[1].title,
      description: projectDetail.sections.define.images[1].description,
      icon: "empathy" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Definir%20-%20Journey%20map.png",
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
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Idear%20-%20Problema%20y%20objetivo.png",
      alt: projectDetail.sections.ideate.images[0].alt,
      title: projectDetail.sections.ideate.images[0].title,
      description: projectDetail.sections.ideate.images[0].description,
      icon: "dafo" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Idear - Idea y Crazy 8.png",
      alt: projectDetail.sections.ideate.images[1].alt,
      title: projectDetail.sections.ideate.images[1].title,
      description: projectDetail.sections.ideate.images[1].description,
      icon: "insights" as const,
      layout: "full" as const
    }
  ];

  // Images for the decidir section
  const decidirImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Decidir - Crazy 8 final.png",
      alt: projectDetail.sections.decide.images[0].alt,
      title: projectDetail.sections.decide.images[0].title,
      description: projectDetail.sections.decide.images[0].description,
      icon: "prioritization" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Decidir%20-%20Storyboard.png",
      alt: projectDetail.sections.decide.images[1].alt,
      title: projectDetail.sections.decide.images[1].title,
      description: projectDetail.sections.decide.images[1].description,
      icon: "journey" as const,
      layout: "full" as const
    }
  ];

  // Images for the prototipar section
  const prototiparImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Prototipar%20-%20Sitemap.png",
      alt: projectDetail.sections.prototype.images[0].alt,
      title: projectDetail.sections.prototype.images[0].title,
      description: projectDetail.sections.prototype.images[0].description,
      icon: "architecture" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Prototipar%20-%20Wireframes.png",
      alt: projectDetail.sections.prototype.images[1].alt,
      title: projectDetail.sections.prototype.images[1].title,
      description: projectDetail.sections.prototype.images[1].description,
      icon: "wireframes" as const,
      layout: "full" as const
    }
  ];

  // Images for the testeo section
  const testeoImages = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Testeo%20-%20Insights%201.png",
      alt: projectDetail.sections.test.images[0].alt,
      title: projectDetail.sections.test.images[0].title,
      description: projectDetail.sections.test.images[0].description,
      icon: "testing" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Testeo%20-%20Insights%202.png",
      alt: projectDetail.sections.test.images[1].alt,
      title: projectDetail.sections.test.images[1].title,
      description: projectDetail.sections.test.images[1].description,
      icon: "testing" as const,
      layout: "full" as const
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/MPV%20y%20futuribles.png",
      alt: projectDetail.sections.test.images[2].alt,
      title: projectDetail.sections.test.images[2].title,
      description: projectDetail.sections.test.images[2].description,
      icon: "business" as const,
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
      title: projectDetail.sections.decide.title,
      bullets: projectDetail.sections.decide.bullets,
      images: decidirImages
    },
    {
      title: projectDetail.sections.prototype.title,
      bullets: projectDetail.sections.prototype.bullets,
      images: prototiparImages
    },
    {
      title: projectDetail.sections.test.title,
      bullets: projectDetail.sections.test.bullets,
      images: testeoImages
    },
    {
      title: projectDetail.sections.result.title,
      bullets: projectDetail.sections.result.bullets,
      figmaPrototype: {
        embedUrl: "https://embed.figma.com/proto/E9KXbMQchTQAe4dDjdpLZE/%F0%9F%92%A7-Grupo-2---GotApp--Copy-?page-id=3%3A2&node-id=45-1423&viewport=912%2C2163%2C0.28&scaling=scale-down&content-scaling=fixed&starting-point-node-id=41%3A34092&embed-host=share",
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
      title={t.projects.gotapp.title}
      subtitle={t.projects.gotapp.subtitle}
      category={t.projects.gotapp.category}
      slug="gotapp"
      tags={[
        t.projects.gotapp.tags.app,
        t.projects.gotapp.tags.sustainability,
        t.projects.gotapp.tags.gamification,
        t.projects.gotapp.tags.monitoring,
        t.projects.gotapp.tags.designSprint
      ]}
      description={{
        introduction: projectDetail.introduction,
        problem: projectDetail.problem,
        solution: projectDetail.solution
      }}
      behanceUrl="https://www.behance.net/gallery/226941177/GotApp-Ahorro-de-agua"
      sections={sections}
      projectDetails={projectDetails}
    />
  );
}

export default GotAppProject;
