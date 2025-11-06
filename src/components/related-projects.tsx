import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectsData } from '../utils/projects-data';
import { memo, useCallback, useMemo } from 'react';

interface RelatedProjectsProps {
  currentProjectSlug: string;
  onProjectClick?: (projectId: string) => void;
}

/**
 * Componente de proyectos relacionados
 * Muestra hasta 3 proyectos diferentes al actual
 * Optimizado con memoización para prevenir re-renders innecesarios
 */
export const RelatedProjects = memo(function RelatedProjects({ currentProjectSlug, onProjectClick }: RelatedProjectsProps) {
  // Memoize filtered projects to avoid recalculation
  const relatedProjects = useMemo(() => {
    return projectsData
      .filter(p => p.slug !== currentProjectSlug)
      .slice(0, 3);
  }, [currentProjectSlug]);

  const handleClick = useCallback((slug: string) => {
    if (onProjectClick) {
      onProjectClick(slug);
    }
  }, [onProjectClick]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedProjects.map((project) => (
        <Card 
          key={project.id}
          className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border bg-card hover:scale-[1.02] overflow-hidden"
          onClick={() => handleClick(project.slug)}
        >
          {/* Project Image */}
          <div className={`relative ${project.color} overflow-hidden rounded-lg h-48 sm:h-56`}>
            <ImageWithFallback 
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
              quality="high"
              placeholder="blur"
            />
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="secondary" className="bg-background/90 text-foreground border-none shadow-sm text-sm md:text-xs px-3 py-1">
                {project.category}
              </Badge>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-4">
            <h4 className="font-semibold text-card-foreground mb-2">
              {project.title}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
});