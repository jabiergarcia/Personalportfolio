import { Button } from './ui/button';
import { ScrollReveal } from './scroll-reveal';
import { StaggerContainer, StaggerItem, staggerItemVariants } from './stagger-container';
import { ProjectCard } from './project-card';
import { projectsData } from '../utils/projects-data';
import { Linkedin } from 'lucide-react';

interface WorksSectionProps {
  onProjectClick?: (projectId: string) => void;
}

export function WorksSection({ onProjectClick }: WorksSectionProps) {
  const handleProjectClick = (slug: string) => {
    if (onProjectClick) {
      onProjectClick(slug);
    }
  };

  return (
    <ScrollReveal direction="fade" duration={0.8}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-10 md:py-12">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-bold mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl">Proyectos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Una colección de proyectos que demuestran mis habilidades en experiencia de usuario y en diseño y prototipado de interfaces. 
              Cada proyecto representa un desafío único y una solución creativa.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer delay={0.4} staggerDelay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:auto-rows-fr">
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

        <ScrollReveal direction="up" delay={0.8}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">¿Quieres ver más de mi trabajo?</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-muted-foreground">Visítame:</span>
              <div className="flex flex-wrap gap-3">
                <Button 
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/jabiergarcia/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button 
                  size="lg"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md hover:shadow-lg transition-all"
                  asChild
                >
                  <a href="https://www.behance.net/jabiergarciasanz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <span className="inline-block">Be</span>
                    Behance
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
}