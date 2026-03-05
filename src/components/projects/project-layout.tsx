import { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb, AlertCircle, ExternalLink, Maximize2, X, Monitor, Smartphone, Share2, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ProjectDetails } from './project-details';
import { ProjectNavbar } from './project-navbar';
import { ScrollReveal } from '../scroll-reveal';
import { ShareProject } from '../share-project';
import ImageCarousel from '../ImageCarousel';
import { RelatedProjects } from '../related-projects';
import { getProjectsData, getShareableProjectUrl } from '../../utils/projects-data';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card } from '../ui/card';
import { useLanguage } from '../../hooks/use-language';

interface ProjectLayoutProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onProjectClick?: (projectId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  title: string;
  subtitle?: string;
  category: string;
  slug?: string;
  tags?: string[];
  description?: {
    introduction: string;
    problem: string;
    solution: string;
  } | string;
  behanceUrl?: string;
  projectDetails?: {
    label: string;
    value: string;
    color?: string;
  }[];
  sections: {
    title: string;
    content?: string;
    bullets?: string[];
    images?: {
      src: string;
      alt: string;
      layout?: 'full' | 'half' | 'grid';
    }[];
    carousel?: {
      src: string;
      alt: string;
    }[];
    figmaPrototype?: {
      embedUrl: string;
      title?: string;
      description?: string;
      type?: 'mobile' | 'web'; // New: Specify prototype type for responsive aspect ratios
      previewImage?: string; // Optional: Custom preview image for the prototype card
    };
    externalLink?: {
      label: string;
      url: string;
      description: string;
    };
  }[];
  relatedProjects?: {
    title: string;
    category: string;
    image: string;
    id: string;
  }[];
}

export function ProjectLayout({
  onNavigateHome,
  onNavigateToProjects,
  onProjectClick,
  isDark,
  onToggleTheme,
  title,
  subtitle,
  category,
  slug,
  tags,
  description,
  behanceUrl,
  projectDetails,
  sections,
  relatedProjects
}: ProjectLayoutProps) {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [pendingExternalUrl, setPendingExternalUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { t } = useLanguage();

  // Detect if user is on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle external link click
  const handleExternalLinkClick = (url: string) => {
    if (isMobile) {
      setPendingExternalUrl(url);
      setShowMobileWarning(true);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Handle share link
  const handleShareLink = async () => {
    if (!pendingExternalUrl) return;

    // Try Web Share API first (native mobile sharing)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Assorta - Retail Visual Platform',
          text: 'Prueba Assorta desde tu ordenador para la mejor experiencia',
          url: pendingExternalUrl
        });
        setShowMobileWarning(false);
        return;
      } catch (err) {
        // User cancelled or error - fallback to clipboard
        console.log('Share cancelled or failed, falling back to clipboard');
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(pendingExternalUrl);
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
        setShowMobileWarning(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Handle open anyway
  const handleOpenAnyway = () => {
    if (pendingExternalUrl) {
      window.open(pendingExternalUrl, '_blank', 'noopener,noreferrer');
      setShowMobileWarning(false);
      setPendingExternalUrl(null);
    }
  };

  // Native fullscreen handler for Figma prototypes
  const handleFullscreen = (containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Fullscreen container not found:', containerId);
      return;
    }

    try {
      // Request fullscreen on the CONTAINER (not the iframe itself)
      // This is the key - we put the container in fullscreen, which includes the iframe
      if (container.requestFullscreen) {
        container.requestFullscreen().catch((err) => {
          console.warn('Fullscreen request failed:', err);
          // Fallback: open in new window if fullscreen is blocked
          const iframe = container.querySelector('iframe');
          if (iframe?.src) {
            window.open(iframe.src, '_blank', 'noopener,noreferrer');
          }
        });
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      } else if ((container as any).mozRequestFullScreen) {
        (container as any).mozRequestFullScreen();
      } else if ((container as any).msRequestFullscreen) {
        (container as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('Error attempting to enable fullscreen:', error);
      // Fallback: open in new window
      const iframe = container.querySelector('iframe');
      if (iframe?.src) {
        window.open(iframe.src, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // Exit fullscreen handler
  const handleExitFullscreen = () => {
    try {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Error attempting to exit fullscreen:', error);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    // Handle ESC key to exit fullscreen
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleExitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);
          
          // Only trigger if scroll difference is significant (reduces jitter)
          if (scrollDifference > 5) {
            // Show navbar when scrolling up or at top
            if (currentScrollY < lastScrollY || currentScrollY < 100) {
              setIsNavVisible(true);
            } 
            // Hide navbar when scrolling down (after 100px with minimum scroll delta)
            else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
              setIsNavVisible(false);
            }
            
            setLastScrollY(currentScrollY);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Header Navigation - Auto Hide */}
      <ProjectNavbar 
        onNavigateToProjects={onNavigateToProjects}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6 md:py-8 lg:py-10">
        {/* Project Header */}
        <div className="mb-10 md:mb-12 lg:mb-16">
          {/* Hero Header - Limpio y directo */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-6 md:mb-8">
              <div className="mb-4 md:mb-5 space-y-3">
                {/* Fila de Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags && tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-accent text-accent-foreground border-none text-sm md:text-xs px-3 py-1">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground border-none text-sm md:text-xs px-3 py-1">
                        {category}
                      </Badge>
                      {(category === "Web Design" || category === "App Design") && (
                        <Badge variant="secondary" className="bg-accent text-accent-foreground border-none text-sm md:text-xs px-3 py-1">
                          UX/UI
                        </Badge>
                      )}
                    </>
                  )}
                </div>
                
                {/* Fila de Botón Compartir - Solo icono en mobile, completo en desktop */}
                <div className="flex justify-end">
                  {/* Mobile: Solo icono */}
                  <div className="sm:hidden">
                    <ShareProject 
                      projectTitle={title}
                      projectDescription={typeof description === 'string' ? description : description?.introduction || `Proyecto ${title} | ${category}`}
                      projectShortDescription={slug ? getProjectsData(t).find(p => p.slug === slug)?.shortDescription : undefined}
                      projectUrl={slug ? getShareableProjectUrl(slug) : undefined}
                      iconOnly={true}
                    />
                  </div>

                  {/* Desktop: Botón completo */}
                  <div className="hidden sm:block">
                    <ShareProject 
                      projectTitle={title}
                      projectDescription={typeof description === 'string' ? description : description?.introduction || `Proyecto ${title} | ${category}`}
                      projectShortDescription={slug ? getProjectsData(t).find(p => p.slug === slug)?.shortDescription : undefined}
                      projectUrl={slug ? getShareableProjectUrl(slug) : undefined}
                      iconOnly={false}
                    />
                  </div>
                </div>
              </div>
              
              <h1 className="font-bold text-foreground mb-5 md:mb-6 text-3xl md:text-4xl lg:text-5xl">
                {title}
              </h1>
            </div>
          </ScrollReveal>

          {/* Description Section */}
          <ScrollReveal direction="up" delay={0.2}>
            {typeof description === 'string' ? (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            ) : description ? (
              <div className="space-y-6 md:space-y-8">
                {/* Introduction limpia */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {description.introduction}
                </p>
                
                {/* Problem and Solution - Cards limpias con iconos neutros */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
                  {/* Problem Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-destructive/5 via-destructive/10 to-destructive/5 dark:from-destructive/10 dark:via-destructive/20 dark:to-destructive/10 border-2 border-destructive/20 dark:border-destructive/30 hover:border-destructive/40 dark:hover:border-destructive/50 transition-all duration-300">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/10 dark:bg-destructive/20 rounded-bl-full blur-2xl" />
                    
                    <div className="relative p-5 md:p-6">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-destructive/20 dark:bg-destructive/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">✕</span>
                        </div>
                        <h3 className="text-foreground">{t.projectLayout.problem}</h3>
                      </div>
                      
                      {/* Content */}
                      <p className="text-base text-foreground/90 dark:text-foreground/95 leading-relaxed">
                        {description.problem}
                      </p>
                    </div>
                  </div>
                  
                  {/* Solution Card */}
                  <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/5 via-secondary/15 to-accent/10 dark:from-secondary/10 dark:via-secondary/25 dark:to-secondary/15 border-2 border-secondary/30 dark:border-secondary/40 hover:border-secondary/50 dark:hover:border-secondary/60 transition-all duration-300">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 dark:bg-accent/30 rounded-bl-full blur-2xl" />
                    
                    <div className="relative p-5 md:p-6">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-secondary/30 dark:bg-secondary/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">✓</span>
                        </div>
                        <h3 className="text-foreground">{t.projectLayout.solution}</h3>
                      </div>
                      
                      {/* Content */}
                      <p className="text-base text-foreground/90 dark:text-foreground/95 leading-relaxed">
                        {description.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </ScrollReveal>
        </div>

        {/* Project Details */}
        {projectDetails && (
          <ScrollReveal direction="up" delay={0.4}>
            <div className="mb-12 md:mb-16 lg:mb-20">
              <ProjectDetails details={projectDetails} />
            </div>
          </ScrollReveal>
        )}

        {/* Project Sections */}
        <div className="space-y-16">
          {sections.map((section, sectionIndex) => (
            <ScrollReveal key={sectionIndex} direction="up" delay={0.1 * Math.min(sectionIndex + 1, 3)}>
              <div className="space-y-8">
                {/* Section Content */}
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4 uppercase tracking-wider no-underline">
                    {section.title}
                  </h2>
                  {section.bullets ? (
                    <ul className="space-y-3 text-muted-foreground">
                      {section.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex items-start gap-3 leading-relaxed">
                          <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : section.content ? (
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  ) : null}
                </div>

                {/* Section Images */}
                {section.images && section.images.length > 0 && (
                  <div className="w-full">
                    <ImageCarousel images={section.images} />
                  </div>
                )}

                {/* Section Carousel */}
                {section.carousel && section.carousel.length > 0 && (
                  <div className="w-full">
                    <ImageCarousel images={section.carousel} />
                  </div>
                )}

                {/* Section Figma Prototype */}
                {section.figmaPrototype && (
                  <div className="w-full space-y-4">
                    {/* Title and Description */}
                    {(section.figmaPrototype.title || section.figmaPrototype.description) && (
                      <div className="space-y-2">
                        {section.figmaPrototype.title && (
                          <h3 className="text-xl font-semibold text-foreground">
                            {section.figmaPrototype.title}
                          </h3>
                        )}
                        {section.figmaPrototype.description && (
                          <p className="text-muted-foreground">
                            {section.figmaPrototype.description}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {/* MOBILE: Prototype Preview Card with CTA (< md breakpoint) */}
                    <div className="md:hidden">
                      <div className="relative w-full h-[380px] rounded-xl overflow-hidden border-2 border-border/50 bg-gradient-to-br from-accent/5 to-secondary/5 shadow-lg group hover:border-secondary/50 transition-all duration-300">
                        {/* Gradient Background - no preview image needed */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-background/60"></div>
                        
                        {/* Content Overlay */}
                        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center space-y-5">
                          {/* Figma Icon */}
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                              <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                              <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                              <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                              <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                              <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                            </svg>
                          </div>
                          
                          {/* Title */}
                          <div className="space-y-2">
                            <h4 className="text-2xl font-semibold text-foreground">
                              {t.projectCommon.prototypeTitle}
                            </h4>
                            <p className="text-base text-muted-foreground max-w-md mx-auto">
                              {section.figmaPrototype.type === 'mobile' 
                                ? t.projectCommon.explorePrototypeMobile 
                                : t.projectCommon.explorePrototypeWeb}
                            </p>
                          </div>
                          
                          {/* CTA Button */}
                          <Button
                            size="lg"
                            onClick={() => window.open(section.figmaPrototype!.embedUrl, '_blank', 'noopener,noreferrer')}
                            className="group/button bg-gradient-to-r from-secondary to-accent text-foreground hover:from-secondary/90 hover:to-accent/90 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            {t.projectCommon.openPrototype}
                          </Button>
                          
                          {/* Hint */}
                          <p className="text-xs text-muted-foreground/70 italic text-center">
                            <Lightbulb className="inline w-3 h-3 mr-1 -mt-0.5" />
                            {t.projectCommon.openInNewTab}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* TABLET & DESKTOP: Interactive Iframe (≥ md breakpoint) */}
                    <div className="hidden md:block">
                      {/* Fullscreen Container - IMPORTANT: ID is required for fullscreen API */}
                      <div 
                        id={`figma-prototype-container-${sectionIndex}`}
                        className={`relative w-full rounded-xl overflow-hidden border border-border/50 bg-muted/10 shadow-lg ${
                          section.figmaPrototype.type === 'mobile' 
                            ? 'h-[600px] lg:h-[650px]' // Taller for mobile prototypes
                            : 'h-[500px] lg:h-[600px]' // Standard for web prototypes
                        }`}
                        style={{ 
                          /* Ensure container can go fullscreen */
                          isolation: 'isolate'
                        }}
                      >
                        <iframe
                          src={section.figmaPrototype.embedUrl}
                          className="absolute inset-0 w-full h-full"
                          style={{ border: 'none' }}
                          allow="fullscreen"
                          allowFullScreen
                          title={section.figmaPrototype.title || "Prototipo de Figma"}
                          loading="lazy"
                        />
                        
                        {/* Fullscreen Toggle Button - Shows X when in fullscreen, Maximize when not */}
                        {isFullscreen ? (
                          <button
                            onClick={handleExitFullscreen}
                            className="absolute top-4 right-4 p-3 bg-black/80 hover:bg-black/95 backdrop-blur-sm text-white rounded-lg shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 z-50"
                            aria-label="Salir de pantalla completa (ESC)"
                            title="Salir de pantalla completa (ESC)"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFullscreen(`figma-prototype-container-${sectionIndex}`)}
                            className="absolute top-3 right-3 p-2.5 bg-background/95 hover:bg-background backdrop-blur-sm rounded-lg shadow-lg border border-border/50 hover:border-secondary/50 transition-all duration-300 hover:scale-110 group z-10"
                            aria-label={t.projectLayout.viewFullscreen}
                            title={t.projectLayout.viewFullscreen}
                          >
                            <Maximize2 className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors duration-300" />
                          </button>
                        )}
                      </div>
                      
                      {/* Hint text for interaction */}
                      <p className="text-xs text-muted-foreground text-center italic mt-3 flex items-center justify-center gap-1">
                        <Lightbulb className="inline w-3.5 h-3.5" />
                        {t.projectCommon.interactWithPrototype}
                        <Maximize2 className="inline w-3.5 h-3.5 mx-0.5" />
                      </p>
                    </div>
                  </div>
                )}

                {/* Section External Link */}
                {section.externalLink && section.externalLink.url && (
                  <div className="w-full">
                    {/* Minimalista Clean CTA Card */}
                    <Card className="relative overflow-hidden border-2 border-border/30 bg-muted/20 hover:border-secondary/50 transition-all duration-300">
                      <div className="p-8 md:p-12 lg:p-16 text-center space-y-6">
                        {/* Status Badge */}
                        <div className="flex items-center justify-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                          </span>
                          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {t.projectCommon.liveApp}
                          </span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-3">
                          <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
                            {section.externalLink.label}
                          </h3>
                          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            {section.externalLink.description}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-2">
                          <Button
                            size="lg"
                            onClick={() => handleExternalLinkClick(section.externalLink!.url)}
                            className="bg-gradient-to-r from-secondary to-accent text-foreground hover:from-secondary/90 hover:to-accent/90 px-10 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            {section.externalLink.label}
                            <ExternalLink className="w-5 h-5 ml-2" />
                          </Button>
                        </div>

                        {/* URL Display */}
                        <div className="pt-4 border-t border-border/30">
                          <p className="text-sm text-muted-foreground/70">
                            {section.externalLink.url}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Behance CTA Section */}
        {behanceUrl && (
          <ScrollReveal direction="up" delay={0.3}>
            <div className="mt-16 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t.projectLayout.behanceSection.title}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t.projectLayout.behanceSection.description}
              </p>
              <Button
                onClick={() => behanceUrl && window.open(behanceUrl, '_blank')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
                disabled={!behanceUrl}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t.projectLayout.behanceSection.button}
              </Button>
            </div>
          </ScrollReveal>
        )}

        {/* More Projects Section */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mt-24 pt-12 border-t-2 border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t.projectLayout.relatedProjects.title}
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t.projectLayout.relatedProjects.description}
            </p>

            <div className="mb-12">
              {slug ? (
                <RelatedProjects 
                  currentProjectSlug={slug} 
                  onProjectClick={onProjectClick} 
                />
              ) : relatedProjects && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="group relative cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
                      onClick={() => onProjectClick?.(project.id)}
                    >
                      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/20">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          quality="high"
                          placeholder="blur"
                        />
                      </div>
                      <div className="p-6">
                        <Badge variant="secondary" className="mb-2 text-sm md:text-xs px-3 py-1">{project.category}</Badge>
                        <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                      </div>
                      {/* Icono de navegación en esquina inferior derecha de la card */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                        <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="text-center">
                <Button
                  onClick={onNavigateToProjects}
                  variant="outline"
                  className="border-2 border-secondary text-foreground hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300"
                >
                  {t.projectLayout.relatedProjects.button}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>

      {/* Mobile Warning Modal */}
      {showMobileWarning && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowMobileWarning(false)}
        >
          <div 
            className="bg-background border-2 border-border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Icon */}
            <div className="bg-gradient-to-br from-secondary/10 to-accent/10 p-8 text-center border-b border-border/50">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Mejor en desktop
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Assorta está diseñado para pantallas grandes
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Main CTA Button - Share/Copy */}
              <Button
                onClick={handleShareLink}
                className="w-full bg-gradient-to-r from-secondary to-accent text-foreground hover:from-secondary/90 hover:to-accent/90 shadow-lg transition-all duration-300 py-7"
                size="lg"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    {t.projectLayout.share.linkCopied}
                  </>
                ) : (
                  <>
                    {navigator.share ? (
                      <>
                        <Share2 className="w-5 h-5 mr-2" />
                        Compartir enlace
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        {t.projectLayout.share.copyLink}
                      </>
                    )}
                  </>
                )}
              </Button>

              {/* Helper text */}
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Guárdalo y ábrelo más tarde desde tu ordenador
              </p>

              {/* Cancel Button */}
              <Button
                onClick={() => {
                  setShowMobileWarning(false);
                  setPendingExternalUrl(null);
                }}
                variant="ghost"
                className="w-full hover:bg-muted transition-all duration-300"
                size="lg"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Link Copied Snackbar */}
      {linkCopied && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-4 bg-accent/90 text-accent-foreground p-4 md:p-5 rounded-lg shadow-lg z-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5" />
            <p className="text-sm md:text-base leading-relaxed">
              {t.projectLayout.share.linkCopiedFull}
            </p>
          </div>
          <Button
            onClick={() => setLinkCopied(false)}
            className="bg-accent/10 text-accent-foreground hover:bg-accent/20 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}