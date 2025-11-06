import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Project } from '../utils/projects-data';

interface ProjectCardProps {
  project: Project;
  onClick: (slug: string) => void;
  priority?: boolean;
}

/**
 * Card unificada de proyecto
 * Componente compartido entre WorksSection y ProjectsPage
 */
export function ProjectCard({ project, onClick, priority = false }: ProjectCardProps) {
  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border bg-card hover:scale-[1.01] overflow-hidden flex flex-col h-full"
      onClick={() => onClick(project.slug)}
      data-project-card
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Project Image */}
      <div className={`relative ${project.color} overflow-hidden rounded-lg h-64 sm:h-72 md:h-80 min-h-[256px] sm:min-h-[288px] md:min-h-[320px]`}>
        <ImageWithFallback 
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover shadow-lg md:transition-transform md:duration-500 md:group-hover:scale-105"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            imageRendering: 'auto'
          }}
          quality="high"
          placeholder="blur"
          priority={priority}
        />
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="secondary" className="bg-background/90 text-foreground border-none shadow-sm text-sm md:text-xs px-3 py-1">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Project Content */}
      <div className="px-4 pt-4 pb-4 sm:px-6 sm:pt-5 sm:pb-5 md:px-8 md:pt-6 md:pb-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground mb-3 text-xl md:text-2xl">
            {project.title}
          </h3>
          <p className="text-muted-foreground leading-snug">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map((tag, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="text-sm md:text-xs border-secondary text-foreground hover:bg-secondary/10 dark:hover:text-secondary-foreground px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}