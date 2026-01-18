import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { useAnalytics } from '../hooks/use-analytics';
import { MapPin, Mail, Phone } from 'lucide-react';
import { PROFILE_IMAGE_URL, CV_URL, CONTACT_INFO } from '../utils/constants';
import { EASING, HERO_TIMING, getDuration, getDelay } from '../utils/animation-constants';

interface HeroSectionProps {
  onNavigateToProjects?: () => void;
  onNavigateToExperiences?: () => void;
  onOpenContact?: () => void;
}

export function HeroSection({ onNavigateToProjects, onNavigateToExperiences, onOpenContact }: HeroSectionProps) {
  const analytics = useAnalytics();

  const handleProjectsClick = () => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    }
  };

  const handleContactClick = () => {
    analytics.trackContactOpen();
    if (onOpenContact) {
      onOpenContact();
    }
  };

  const handleCVDownload = () => {
    analytics.trackCVDownload();
  };

  return (
    <motion.div 
      className="py-4 md:py-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: getDuration(HERO_TIMING.container.duration), 
        delay: getDelay(HERO_TIMING.container.delay),
        ease: EASING.standard as any
      }}
    >

      {/* Profile Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: getDuration(HERO_TIMING.card.duration), 
          delay: getDelay(HERO_TIMING.card.delay), 
          ease: EASING.standard 
        }}
      >
        <Card className="p-6 bg-gradient-to-br from-card to-muted/30 border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="relative order-1 lg:order-1"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                duration: getDuration(HERO_TIMING.image.duration), 
                delay: getDelay(HERO_TIMING.image.delay), 
                ease: EASING.standard as any
              }}
            >
              <div className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <ImageWithFallback 
                  src={PROFILE_IMAGE_URL}
                  alt={CONTACT_INFO.name}
                  className="w-full h-full object-cover object-center"
                  priority={true}
                  quality="high"
                  placeholder="blur"
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse at center, transparent 60%, rgba(255, 251, 248, 0.25) 100%),
                      linear-gradient(45deg, rgba(255, 251, 248, 0.15) 0%, transparent 40%, transparent 60%, rgba(255, 251, 248, 0.15) 100%),
                      linear-gradient(135deg, rgba(255, 251, 248, 0.15) 0%, transparent 40%, transparent 60%, rgba(255, 251, 248, 0.15) 100%)
                    `
                  }}
                />
              </div>
              <motion.div 
                className="absolute -bottom-3 -right-3 w-8 h-8 bg-accent rounded-full border-3 border-background"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: getDuration(HERO_TIMING.greenDot.duration), 
                  delay: getDelay(HERO_TIMING.greenDot.delay), 
                  ease: EASING.bounce 
                }}
              ></motion.div>
            </motion.div>
            
            <motion.div 
              className="order-2 lg:order-2"
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                duration: getDuration(HERO_TIMING.content.duration), 
                delay: getDelay(HERO_TIMING.content.delay), 
                ease: EASING.standard as any
              }}
            >
              <h1 className="font-bold text-card-foreground mb-2 text-3xl md:text-4xl lg:text-5xl">{CONTACT_INFO.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                <p className="text-muted-foreground text-xl">Junior UX/UI Designer</p>
                <Badge variant="secondary" className="bg-accent text-accent-foreground border-none self-start sm:self-center text-sm md:text-xs px-3 py-1">disponible</Badge>
              </div>
              <p className="text-foreground mb-4 leading-relaxed">
                Soy UX/UI Designer con más de 13 años de experiencia en moda y Visual Merchandising, y formación especializada en UX/UI (Neoland).
                <br /><br />
                Transformo la toma de decisiones visuales en experiencias digitales claras, usables y orientadas a negocio, conectando lo físico y lo digital.
                <br /><br />
                Aporto visión estética, pensamiento de producto, empatía y liderazgo, trabajando con research, user flows, prototipos y Figma.
Actualmente busco sumarme a equipos de producto para diseñar experiencias digitales con impacto real.
              </p>
              <motion.div 
                className="flex gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: getDuration(HERO_TIMING.buttons.duration), 
                  delay: getDelay(HERO_TIMING.buttons.delay), 
                  ease: EASING.standard 
                }}
              >
                <Button 
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground hover:text-secondary-foreground transition-colors"
                  onClick={handleProjectsClick}
                >
                  Ver proyectos
                </Button>
                <Button 
                  variant="outline" 
                  className="border-secondary text-foreground hover:bg-secondary/10"
                  asChild
                >
                  <a 
                    href={CV_URL}
                    download="Jabier-Garcia-Sanz-CV-ES.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCVDownload}
                    className="dark:hover:text-secondary-foreground"
                  >
                    Descargar CV
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Contact Info Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: getDuration(HERO_TIMING.contactCard.duration), 
          delay: getDelay(HERO_TIMING.contactCard.delay), 
          ease: EASING.standard as any
        }}
      >
        <Card className="mt-4 p-4 bg-primary text-primary-foreground border-primary">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
              <span className="whitespace-nowrap flex items-center gap-2 justify-center sm:justify-start"><MapPin className="w-4 h-4" /> {CONTACT_INFO.location}</span>
              <span className="whitespace-nowrap flex items-center gap-2 justify-center sm:justify-start"><Mail className="w-4 h-4" /> {CONTACT_INFO.email}</span>
              <a 
                href={`tel:${CONTACT_INFO.phone}`} 
                className="whitespace-nowrap flex items-center gap-2 justify-center sm:justify-start hover:text-accent"
                aria-label="Llamar por teléfono"
              >
                <Phone className="w-4 h-4" /> {CONTACT_INFO.phoneFormatted}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-end">
              <span className="hidden md:inline text-center sm:text-right">¿Nos ponemos en contacto?</span>
              <Button 
                size="sm" 
                className="bg-accent hover:bg-accent/80 text-accent-foreground w-full sm:w-auto"
                onClick={handleContactClick}
              >
                Contacto
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}