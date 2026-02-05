import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { Badge } from './ui/badge';
import { useLanguage } from '../hooks/use-language';

interface TimelineEvent {
  id: string;
  type: 'work' | 'education' | 'achievement';
  title: string;
  company: string;
  location: string;
  period: string;
  typeLabel: string;
  description: string;
  achievements: string[];
  functions: string[];
  skills?: string[];
  color: string;
}

export function InteractiveExperienceTimeline() {
  const { t } = useLanguage();
  
  // Mapear los datos de traducción al formato TimelineEvent
  const timelineData: TimelineEvent[] = t.experienceTimeline.map((item, index) => ({
    id: item.id,
    type: 'work' as const,
    title: item.title,
    company: item.company,
    location: item.location,
    period: item.period,
    typeLabel: item.typeLabel,
    description: item.description,
    achievements: item.achievements,
    functions: item.functions,
    skills: index === 0 
      ? ['Figma', 'User Interface', 'Prototyping', 'User Research', 'Design Systems']
      : index === 1
      ? ['Visual Merchandising', 'Window & Indoor styling', 'Team Leadership', 'Store Analytics', 'Creative Direction','Trend Analysis']
      : ['Visual Merchandising', 'Window Display', 'Campaign Design', 'Creative Strategy', 'Trend Forecasting'],
    color: index === 0 ? 'bg-muted-foreground' : index === 1 ? 'bg-secondary' : 'bg-[#ffccb6]'
  }));
  
  const [activeEvent, setActiveEvent] = useState<string>(timelineData[0].id);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  const mobileCardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const desktopCardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isScrollingProgrammatically = useRef(false);
  const lastActiveEvent = useRef<string>(timelineData[0].id);

  // Detectar dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Scroll-spy MÓVIL - Mejorado con zona de activación
  useEffect(() => {
    if (!isMobile) return;

    let rafId: number;

    const updateActiveCard = () => {
      if (isScrollingProgrammatically.current) return;

      const activationZoneTop = window.innerHeight * 0.35;
      const activationZoneBottom = window.innerHeight * 0.65;
      const activationZoneCenter = window.innerHeight * 0.5;

      let bestMatch: { id: string; score: number } | null = null;

      Object.entries(mobileCardRefs.current).forEach(([id, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          let score = Math.abs(cardCenter - activationZoneCenter);

          if (rect.bottom < activationZoneTop || rect.top > activationZoneBottom) {
            score += 10000;
          }

          if (id === lastActiveEvent.current) {
            score -= 20;
          }

          if (!bestMatch || score < bestMatch.score) {
            bestMatch = { id, score };
          }
        }
      });

      if (bestMatch && bestMatch.id !== lastActiveEvent.current) {
        setActiveEvent(bestMatch.id);
        lastActiveEvent.current = bestMatch.id;
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveCard);
    };

    const initTimer = setTimeout(updateActiveCard, 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveCard);

    return () => {
      clearTimeout(initTimer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveCard);
    };
  }, [isMobile]);

  // Scroll-spy TABLET - Lógica intermedia entre mobile y desktop
  useEffect(() => {
    if (!isTablet) return;

    let rafId: number;

    const updateActiveCard = () => {
      if (isScrollingProgrammatically.current) return;

      const activationZoneTop = window.innerHeight * 0.3;
      const activationZoneBottom = window.innerHeight * 0.6;
      const activationZoneCenter = window.innerHeight * 0.45;

      let bestMatch: { id: string; score: number } | null = null;

      Object.entries(desktopCardRefs.current).forEach(([id, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          let score = Math.abs(cardCenter - activationZoneCenter);

          if (rect.bottom < activationZoneTop || rect.top > activationZoneBottom) {
            score += 10000;
          }

          if (id === lastActiveEvent.current) {
            score -= 30;
          }

          if (!bestMatch || score < bestMatch.score) {
            bestMatch = { id, score };
          }
        }
      });

      if (bestMatch && bestMatch.id !== lastActiveEvent.current) {
        setActiveEvent(bestMatch.id);
        lastActiveEvent.current = bestMatch.id;
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveCard);
    };

    const initTimer = setTimeout(updateActiveCard, 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveCard);

    return () => {
      clearTimeout(initTimer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveCard);
    };
  }, [isTablet]);

  // Scroll-spy DESKTOP - Mejorado con zona de activación
  useEffect(() => {
    if (isMobile || isTablet) return;

    let rafId: number;

    const updateActiveCard = () => {
      if (isScrollingProgrammatically.current) return;

      const activationZoneTop = window.innerHeight * 0.25;
      const activationZoneBottom = window.innerHeight * 0.55;
      const activationZoneCenter = window.innerHeight * 0.4;

      let bestMatch: { id: string; score: number } | null = null;

      Object.entries(desktopCardRefs.current).forEach(([id, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          let score = Math.abs(cardCenter - activationZoneCenter);

          if (rect.bottom < activationZoneTop || rect.top > activationZoneBottom) {
            score += 10000;
          }

          if (id === lastActiveEvent.current) {
            score -= 40;
          }

          if (!bestMatch || score < bestMatch.score) {
            bestMatch = { id, score };
          }
        }
      });

      if (bestMatch && bestMatch.id !== lastActiveEvent.current) {
        setActiveEvent(bestMatch.id);
        lastActiveEvent.current = bestMatch.id;
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveCard);
    };

    const initTimer = setTimeout(updateActiveCard, 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveCard);

    return () => {
      clearTimeout(initTimer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveCard);
    };
  }, [isMobile, isTablet]);

  // Click handler MÓVIL
  const handleClickMobile = (eventId: string) => {
    const cardElement = mobileCardRefs.current[eventId];
    if (!cardElement) return;

    isScrollingProgrammatically.current = true;

    const rect = cardElement.getBoundingClientRect();
    const currentScrollY = window.pageYOffset;
    const cardTopAbsolute = rect.top + currentScrollY;
    
    // Calcular offset para posicionar la card justo debajo del lightbox sticky
    // Header: 64px (top-16) + Lightbox: ~180px + Margen: 8px
    const headerHeight = 64;
    const lightboxHeight = 180;
    const margin = 8;
    const totalStickyHeight = headerHeight + lightboxHeight + margin;
    
    const targetScrollY = cardTopAbsolute - totalStickyHeight;

    window.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior: 'smooth'
    });

    setActiveEvent(eventId);
    lastActiveEvent.current = eventId;

    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 1000);
  };

  const getIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'work':
        return Briefcase;
      case 'education':
        return GraduationCap;
      case 'achievement':
        return Award;
      default:
        return Briefcase;
    }
  };

  const activeEventData = timelineData.find(e => e.id === activeEvent);
  const activeIndex = timelineData.findIndex(e => e.id === activeEvent);

  return (
    <motion.section 
      className="px-4 py-8 md:py-10"
      role="region"
      aria-label="Trayectoria profesional"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t.experiencesPage.professionalTitle}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {t.experiencesPage.professionalSubtitle}
          </p>
        </motion.div>

        {/* ========== VERSIÓN MÓVIL ========== */}
        <div className="lg:hidden" role="tablist" aria-label="Experiencia profesional por años">
          {/* Timeline Minimalista Mobile - Sticky */}
          <div className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50 py-5 mb-6 -mx-4 px-4">
            {/* Card flotante con info del activo */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: [0.25, 0.25, 0, 1] }}
                className="mb-4 bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl px-3 py-2.5 shadow-sm"
              >
                <h3 className="font-semibold text-foreground line-clamp-2 leading-tight mb-1">
                  {activeEventData?.title}
                </h3>
                <p className="text-muted-foreground">{activeEventData?.company}</p>
              </motion.div>
            </AnimatePresence>

            {/* Timeline horizontal minimalista */}
            <div className="relative px-1">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2" />
              
              <motion.div 
                className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-primary to-primary/40 dark:from-secondary dark:to-secondary/40 -translate-y-1/2"
                initial={false}
                animate={{ 
                  width: `${(activeIndex / (timelineData.length - 1)) * 100}%` 
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.25, 0, 1] }}
              />

              <div className="relative flex justify-between items-center">
                {timelineData.map((event, index) => {
                  const Icon = getIcon(event.type);
                  const isActive = activeEvent === event.id;
                  const isPast = index < activeIndex;
                  const isFuture = !isActive && !isPast;
                  
                  return (
                    <button
                      key={event.id}
                      onClick={() => handleClickMobile(event.id)}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`experience-panel-${event.id}`}
                      id={`experience-tab-${event.id}`}
                      className="relative group flex items-center justify-center w-12 h-12"
                      aria-label={`${event.title} en ${event.company}`}
                    >
                      <motion.div
                        className={`relative rounded-full transition-all duration-300 ${
                          isActive 
                            ? `${event.color} shadow-lg ring-2 ring-accent/60 dark:ring-accent/80` 
                            : isPast
                            ? `timeline-icon-past ${event.color}`
                            : `timeline-icon-future ${event.color} group-hover:brightness-110`
                        }`}
                        style={{ width: '48px', height: '48px' }}
                        initial={false}
                        animate={
                          isActive 
                            ? { scale: 1.1 } 
                            : isPast
                            ? { scale: 0.75 }
                            : { scale: 0.75 }
                        }
                        whileHover={!isActive ? { scale: 0.82 } : undefined}
                        transition={{ 
                          duration: 0.3,
                          ease: [0.25, 0.25, 0, 1]
                        }}
                      >
                        <div 
                          className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                            isActive || isPast
                              ? 'text-white' 
                              : 'text-foreground/60 group-hover:text-foreground/80'
                          }`}
                        >
                          <Icon size={isActive ? 22 : 18} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                      </motion.div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cards Mobile */}
          <div className="space-y-8">
            {timelineData.map((event, index) => {
              const Icon = getIcon(event.type);
              
              return (
                <motion.div
                  key={event.id}
                  ref={(el) => (mobileCardRefs.current[event.id] = el)}
                  data-event-id={event.id}
                  role="tabpanel"
                  id={`experience-panel-${event.id}`}
                  aria-labelledby={`experience-tab-${event.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.25, 0, 1] }}
                  className="bg-gradient-to-br from-card to-muted/30 border border-border rounded-2xl p-6 shadow-lg scroll-mt-[252px]"
                >
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${event.color} flex-shrink-0`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-secondary font-medium mb-2">{event.company}</p>
                        <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{event.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{event.location}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-accent text-accent-foreground rounded-full text-xs">
                            {event.typeLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-card-foreground leading-relaxed">
                      {event.description}
                    </p>

                    <div>
                      <h4 className="font-medium text-card-foreground mb-2">{t.experiencesPage.keyAchievements}:</h4>
                      <ul className="space-y-1.5">
                        {event.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground ml-4">
                            <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-card-foreground mb-2">{t.experiencesPage.keyFunctions}:</h4>
                      <ul className="space-y-1.5">
                        {event.functions.map((func, idx) => {
                          const isCategory = func.endsWith(':');
                          
                          if (isCategory) {
                            return (
                              <li key={idx} className="text-muted-foreground font-medium mt-3 first:mt-0">
                                {func}
                              </li>
                            );
                          } else {
                            return (
                              <li key={idx} className="flex items-start gap-2 text-muted-foreground ml-4">
                                <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></span>
                                <span className="leading-relaxed">{func}</span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-card-foreground mb-2">{t.experiencesPage.keySkills}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.skills?.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="border-secondary text-foreground text-sm md:text-xs px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========== VERSIÓN TABLET Y DESKTOP ========== */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          {/* Timeline Navigation - Sticky (solo visual, no interactivo) */}
          <div>
            <div className="sticky top-24 space-y-6 max-w-[280px]">
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
                
                {timelineData.map((event) => {
                  const Icon = getIcon(event.type);
                  const isActive = activeEvent === event.id;
                  
                  return (
                    <motion.div
                      key={event.id}
                      className="relative mb-8 last:mb-0"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: [0.25, 0.25, 0, 1] }}
                    >
                      <motion.div
                        className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center border-4 border-background ${event.color} transition-all duration-300 ${
                          isActive 
                            ? 'scale-125 shadow-[0_0_20px_rgba(0,0,0,0.3)] ring-4 ring-accent/50 dark:ring-accent/70' 
                            : ''
                        }`}
                        aria-current={isActive ? 'true' : 'false'}
                        animate={isActive ? { scale: [1.25, 1.3, 1.25] } : {}}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                      >
                        <Icon size={isActive ? 22 : 20} className={`text-white transition-all duration-300 ${isActive ? 'drop-shadow-lg' : ''}`} />
                      </motion.div>

                      <div
                        className="ml-16 text-left w-[calc(100%-4rem)] px-3 py-2"
                        aria-current={isActive ? 'true' : 'false'}
                      >
                        <h3 className={`font-semibold transition-colors ${isActive ? 'text-primary' : 'text-foreground'} line-clamp-2`}>
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-1">{event.company}</p>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                          <Calendar size={12} />
                          <span>{event.period}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cards Column */}
          <div className="space-y-8">
            {timelineData.map((event, index) => {
              const Icon = getIcon(event.type);
              
              return (
                <motion.div
                  key={event.id}
                  ref={(el) => (desktopCardRefs.current[event.id] = el)}
                  data-event-id={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.25, 0, 1] }}
                  className="bg-gradient-to-br from-card to-muted/30 border border-border rounded-2xl p-6 lg:p-8 shadow-lg"
                >
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${event.color} flex-shrink-0`}>
                        <Icon size={28} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <p className="text-lg text-secondary font-medium mb-3">{event.company}</p>
                        <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{event.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-accent text-accent-foreground rounded-full text-xs">
                            {event.typeLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-card-foreground leading-relaxed">
                      {event.description}
                    </p>

                    <div>
                      <h4 className="font-medium text-card-foreground mb-3">{t.experiencesPage.keyAchievements}:</h4>
                      <ul className="space-y-2">
                        {event.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground ml-4">
                            <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-card-foreground mb-3">{t.experiencesPage.keyFunctions}:</h4>
                      <ul className="space-y-2">
                        {event.functions.map((func, idx) => {
                          const isCategory = func.endsWith(':');
                          
                          if (isCategory) {
                            return (
                              <li key={idx} className="text-muted-foreground font-medium mt-4 first:mt-0">
                                {func}
                              </li>
                            );
                          } else {
                            return (
                              <li key={idx} className="flex items-start gap-2 text-muted-foreground ml-4">
                                <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                                <span className="leading-relaxed">{func}</span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-card-foreground mb-3">{t.experiencesPage.keySkills}:</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.skills?.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="border-secondary text-foreground text-sm md:text-xs px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};