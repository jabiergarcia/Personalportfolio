import { ScrollReveal } from './scroll-reveal';
import { StaggerContainer, StaggerItem, staggerItemVariants } from './stagger-container';
import { ProjectCard } from './project-card';
import { projectsData } from '../utils/projects-data';

interface ProjectsPageProps {
  onNavigateHome: () => void;
  onProjectClick: (projectId: string) => void;
}

export function ProjectsPage({ onNavigateHome, onProjectClick }: ProjectsPageProps) {
  const handleProjectClick = (slug: string) => {
    onProjectClick(slug);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-24">
        {/* Page Header */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-8 md:mb-10">
            <div className="max-w-4xl mx-auto">
              {/* Title with decorative underline */}
              <div className="mb-6">
                <h1 className="font-bold text-foreground mb-3 relative inline-block text-4xl md:text-5xl lg:text-6xl">
                  Proyectos
                  <div className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-secondary via-secondary/70 to-transparent rounded-full"></div>
                </h1>
              </div>
              
              {/* Description */}
              <div className="space-y-4">
                <p className="text-foreground/90 leading-relaxed text-xl md:text-2xl">
                  Diseño de experiencias digitales centradas en el usuario
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Cada proyecto refleja mi enfoque en la investigación, ideación y validación con usuarios reales. 
                  Desde e-commerce hasta aplicaciones móviles, combinando metodologías UX con soluciones creativas 
                  que generan impacto real.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <StaggerContainer delay={0.4} staggerDelay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:auto-rows-fr">
            {projectsData.map((project, index) => (
              <StaggerItem
                key={project.id}
                variants={staggerItemVariants}
              >
                <ProjectCard 
                  project={project}
                  onClick={handleProjectClick}
                  priority={index < 2}
                />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </div>
  );
}

export default ProjectsPage;