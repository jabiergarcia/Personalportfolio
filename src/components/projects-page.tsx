import { ScrollReveal } from './scroll-reveal';
import { StaggerContainer, StaggerItem, staggerItemVariants } from './stagger-container';
import { ProjectCard } from './project-card';
import { getProjectsData } from '../utils/projects-data';
import { useLanguage } from '../hooks/use-language';

interface ProjectsPageProps {
  onNavigateHome: () => void;
  onProjectClick: (projectId: string) => void;
}

export function ProjectsPage({ onNavigateHome, onProjectClick }: ProjectsPageProps) {
  const { t } = useLanguage();
  const projectsData = getProjectsData(t);
  
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
                  {t.projectsPage.title}
                  <div className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-secondary via-secondary/70 to-transparent rounded-full"></div>
                </h1>
              </div>
              
              {/* Description */}
              <div className="space-y-4">
                <p className="text-foreground/90 leading-relaxed text-xl md:text-2xl">
                  {t.projectsPage.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t.projectsPage.description}
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