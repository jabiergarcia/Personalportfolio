import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useLanguage } from '../hooks/use-language';
import { ExternalLink, Linkedin } from 'lucide-react';
import { getProjectsData } from '../utils/projects-data';
import { ProjectCard } from './project-card';
import { staggerItemVariants } from './stagger-container';

interface WorksSectionProps {
  onProjectClick?: (projectId: string) => void;
}

export function WorksSection({ onProjectClick }: WorksSectionProps) {
  const { t } = useLanguage();
  const projectsData = getProjectsData(t);
  
  const handleProjectClick = (slug: string) => {
    if (onProjectClick) {
      onProjectClick(slug);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-10 md:py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-bold mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl">{t.works.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.works.description}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, staggerChildren: 0.15 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:auto-rows-fr">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                variants={staggerItemVariants}
              >
                <ProjectCard 
                  project={project}
                  onClick={handleProjectClick}
                  priority={index < 2}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">{t.works.cta.question}</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-muted-foreground">{t.works.cta.visitMe}</span>
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
        </motion.div>
      </div>
    </motion.div>
  );
}