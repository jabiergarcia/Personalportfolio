import { Card } from './ui/card';
import { ScrollReveal } from './scroll-reveal';
import { StaggerContainer, StaggerItem, staggerItemVariants } from './stagger-container';
import { useLanguage } from '../hooks/use-language';

export function StatsSection() {
  const { t } = useLanguage();
  
  const stats = [
    {
      number: "13",
      label: t.stats.items.fashion.label,
      description: t.stats.items.fashion.description
    },
    {
      number: "5",
      label: t.stats.items.projects.label,
      description: t.stats.items.projects.description
    },
    {
      number: "100%",
      label: t.stats.items.passion.label,
      description: t.stats.items.passion.description
    },
    {
      number: "∞",
      label: t.stats.items.learning.label,
      description: t.stats.items.learning.description
    }
  ];

  return (
    <ScrollReveal direction="fade" duration={0.8}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-10 md:py-12">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="font-bold mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl">{t.stats.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t.stats.description}
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer delay={0.4} staggerDelay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StaggerItem
                key={index}
                variants={staggerItemVariants}
              >
                <Card className="p-6 text-center bg-gradient-to-br from-card to-muted/30 border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="mb-4">
                    <div className="font-bold text-secondary mb-2 text-4xl md:text-5xl" style={stat.number === '∞' ? { fontSize: '4rem', lineHeight: '0.8', marginBottom: '0.25rem' } : undefined}>{stat.number}</div>
                    <div className="font-semibold text-card-foreground text-xl">{stat.label}</div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {stat.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </ScrollReveal>
  );
}