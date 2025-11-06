import { Button } from './ui/button';
import { ScrollReveal } from './scroll-reveal';
import { StaggerContainer, StaggerItem, staggerItemVariants } from './stagger-container';

interface ExperiencesSectionProps {
  onNavigateToExperiences?: () => void;
}

export function ExperiencesSection({ onNavigateToExperiences }: ExperiencesSectionProps) {
  const experiences = [
    {
      period: "2025 - Presente",
      title: "Junior UX/UI Designer",
      company: "Freelance",
      description: "Creación de soluciones digitales intuitivas mediante procesos de investigación, ideación y prototipado, integrando usabilidad, accesibilidad y diseño visual para optimizar la experiencia del usuario.",
      skills: ["Figma", "Design Thinking", "User Research", "Prototyping"],
      type: "actual"
    },
    {
      period: "2018 - 2025",
      title: "Senior Visual Merchandiser Manager",
      company: "Hennes & Mauritz S.L.",
      description: "Gestión visual de tiendas flagship, desarrollo y presentación de conceptos de marca y liderazgo de equipos creativos en el sector retail de moda.",
      skills: ["Visual Merchandising", "Team Leadership", "Store Analytics", "Creative Direction"],
      type: "anterior"
    },
    {
      period: "2015 - 2018",
      title: "Window & Indoor Styling Manager",
      company: "Hennes & Mauritz S.L.",
      description: "Creación y ejecución de conceptos de escaparatismo para diferentes departamentos, desde moda hasta hogar, desarrollando narrativas visuales impactantes.",
      skills: ["Window Display", "Visual Composition", "Lighting Design", "Conceptual Styling"],
      type: "anterior"
    }
  ];

  return (
    <ScrollReveal direction="fade" duration={0.8}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 md:py-10">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-bold mb-4 text-foreground text-3xl md:text-4xl lg:text-5xl">Experiencia</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Un recorrido que combina años de experiencia en moda con mi nueva pasión por el diseño UX/UI, 
              creando una perspectiva única en cada proyecto.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer delay={0.4} staggerDelay={0.2}>
          <div className="space-y-4 sm:space-y-6">
            {experiences.map((exp, index) => (
              <StaggerItem
                key={index}
                variants={staggerItemVariants}
              >
                <div className="p-4 sm:p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 w-full">
                  <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start">
                    <div className="w-full md:w-1/4 shrink-0">
                      <span className="mb-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm inline-block">
                        {exp.period}
                      </span>
                      <h3 className="font-semibold text-card-foreground text-xl">{exp.title}</h3>
                      <p className="text-secondary font-medium">{exp.company}</p>
                    </div>
                    
                    <div className="w-full md:w-3/4">
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="px-2 py-1 text-xs border border-secondary text-foreground rounded-lg hover:bg-secondary/10 dark:hover:text-secondary-foreground transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <ScrollReveal direction="up" delay={0.8}>
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-muted-foreground mb-4">¿Quieres conocer más sobre mi trayectoria?</p>
            <Button 
              onClick={onNavigateToExperiences}
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground w-full sm:w-auto"
            >
              Ver experiencia completa
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </ScrollReveal>
  );
}