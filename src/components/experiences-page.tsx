import { InteractiveExperienceTimeline } from './interactive-experience-timeline';
import { InteractiveEducationTimeline } from './interactive-education-timeline';
import { ScrollReveal } from './scroll-reveal';
import { motion } from 'motion/react';
import { useLanguage } from '../hooks/use-language';

interface ExperiencesPageProps {
  onNavigateHome: () => void;
}

export function ExperiencesPage({ onNavigateHome }: ExperiencesPageProps) {
  const { t } = useLanguage();

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-background to-background/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
    >
      {/* Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 space-y-10 md:space-y-14 pt-8 md:pt-12 lg:pt-16 pb-16 md:pb-24">
        {/* Header Section */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-8 md:mb-10">
            <div className="max-w-4xl mx-auto">
              {/* Title with decorative underline */}
              <div className="mb-6">
                <h1 className="font-bold text-foreground mb-3 relative inline-block text-4xl md:text-5xl lg:text-6xl">
                  {t.experiencesPage.title}
                  <div className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-secondary via-secondary/70 to-transparent rounded-full"></div>
                </h1>
              </div>
              
              {/* Description */}
              <div className="space-y-4">
                <p className="text-foreground/90 leading-relaxed text-xl md:text-2xl">
                  {t.experiencesPage.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {t.experiencesPage.description}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Experience Timeline */}
        <InteractiveExperienceTimeline />

        {/* Interactive Education Timeline */}
        <InteractiveEducationTimeline />
      </div>
    </motion.div>
  );
}

export default ExperiencesPage;