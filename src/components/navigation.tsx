import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_IMAGE_URL, CONTACT_INFO } from '../utils/constants';
import { EASING, DURATION, getDuration, NAVBAR_ANIMATIONS } from '../utils/animation-constants';
import { useLanguage } from '../hooks/use-language';

// Global flag to track if navbar has been animated in this session
// This persists across navigations but resets on page refresh
const NAVBAR_ANIMATED_KEY = 'navbar-has-animated';

interface NavigationProps {
  onNavigateToHome?: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToExperiences?: () => void;
  onOpenContact?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  currentPage?: string;
  showProfileImage?: boolean;
}

export function Navigation({
  onNavigateToHome,
  onNavigateToProjects,
  onNavigateToExperiences,
  onOpenContact,
  isDark,
  onToggleTheme,
  currentPage = 'home',
  showProfileImage = false
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Check if navbar has already been animated in this session
  const [hasAnimated, setHasAnimated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(NAVBAR_ANIMATED_KEY) === 'true';
    }
    return false;
  });
  
  const logoRef = useRef<HTMLButtonElement>(null);

  // Mark navbar as animated after first animation completes
  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(NAVBAR_ANIMATED_KEY, 'true');
        }
      }, 1000); // Después de que termine la secuencia inicial (0.6s + 0.4s buffer)
      
      return () => clearTimeout(timer);
    }
  }, [hasAnimated]);

  const handleHomeClick = () => {
    // NO trigger pulse animation - solo navegamos
    if (onNavigateToHome) {
      onNavigateToHome();
    }
    setIsMobileMenuOpen(false);
  };

  const handleProjectsClick = () => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    }
    setIsMobileMenuOpen(false);
  };

  const handleExperiencesClick = () => {
    if (onNavigateToExperiences) {
      onNavigateToExperiences();
    }
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const { t } = useLanguage();

  return (
    <>
      {/* Fixed Navigation Bar */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/50 shadow-sm"
        initial={hasAnimated ? false : NAVBAR_ANIMATIONS.bar.initial}
        animate={hasAnimated ? false : NAVBAR_ANIMATIONS.bar.animate}
        transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.bar.transition}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-20 md:h-16">
            {/* Logo/Brand Avatar */}
            <motion.button
              ref={logoRef}
              initial={hasAnimated ? false : NAVBAR_ANIMATIONS.logo.initial}
              animate={hasAnimated ? false : NAVBAR_ANIMATIONS.logo.animate}
              transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.logo.transition}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHomeClick}
              className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              {/* Fixed container - responsive sizing */}
              <div className="w-12 h-12 rounded-2xl bg-secondary hover:bg-secondary/90 transition-colors relative overflow-hidden cursor-pointer">
                <AnimatePresence mode="wait">
                  {!showProfileImage ? (
                    /* Initials "JG" - Simple crossfade */
                    <motion.div
                      key="initials"
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: getDuration(DURATION.fast),
                        ease: EASING.standard as any
                      }}
                    >
                      <span className="text-secondary-foreground font-medium text-[18px]">
                        JG
                      </span>
                    </motion.div>
                  ) : (
                    /* Profile Image - Simple crossfade */
                    <motion.img
                      key="profile-image"
                      src={`${PROFILE_IMAGE_URL.split('?')[0]}?width=80&quality=85`}
                      alt={CONTACT_INFO.name}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: getDuration(DURATION.fast),
                        ease: EASING.standard as any
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <span className="text-lg md:text-lg font-medium text-foreground">
                {/* Mobile: Solo nombre y primer apellido */}
                <span className="md:hidden">Jabier García</span>
                {/* Desktop: Nombre completo */}
                <span className="hidden md:inline">{CONTACT_INFO.name}</span>
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-4 items-center">
              <motion.button
                initial={hasAnimated ? false : NAVBAR_ANIMATIONS.projects.initial}
                animate={hasAnimated ? false : NAVBAR_ANIMATIONS.projects.animate}
                transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.projects.transition}
                onClick={handleProjectsClick}
                className={`relative px-3 py-2 text-foreground transition-colors group ${
                  currentPage === 'projects' ? 'font-semibold' : 'font-medium'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.nav.projects}
                {/* Animated underline */}
                <motion.span
                  className={`absolute bottom-0 left-0 h-[2px] bg-secondary ${
                    currentPage === 'projects' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  initial={false}
                  animate={{
                    width: currentPage === 'projects' ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    originX: 0.5
                  }}
                />
              </motion.button>
              
              <motion.button
                initial={hasAnimated ? false : NAVBAR_ANIMATIONS.experiences.initial}
                animate={hasAnimated ? false : NAVBAR_ANIMATIONS.experiences.animate}
                transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.experiences.transition}
                onClick={handleExperiencesClick}
                className={`relative px-3 py-2 text-foreground transition-colors group ${
                  currentPage === 'experiences' ? 'font-semibold' : 'font-medium'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.nav.experiences}
                {/* Animated underline */}
                <motion.span
                  className={`absolute bottom-0 left-0 h-[2px] bg-secondary ${
                    currentPage === 'experiences' ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  initial={false}
                  animate={{
                    width: currentPage === 'experiences' ? '100%' : '0%'
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{
                    originX: 0.5
                  }}
                />
              </motion.button>
              
              <motion.div
                initial={hasAnimated ? false : NAVBAR_ANIMATIONS.contact.initial}
                animate={hasAnimated ? false : NAVBAR_ANIMATIONS.contact.animate}
                transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.contact.transition}
              >
                <Button 
                  size="sm" 
                  className="bg-accent hover:bg-accent/80 text-accent-foreground"
                  onClick={handleContactClick}
                >
                  {t.nav.contact}
                </Button>
              </motion.div>
              
              {/* Theme Toggle */}
              {isDark !== undefined && onToggleTheme && (
                <motion.div
                  initial={hasAnimated ? false : NAVBAR_ANIMATIONS.toggle.initial}
                  animate={hasAnimated ? false : NAVBAR_ANIMATIONS.toggle.animate}
                  transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.toggle.transition}
                >
                  <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
                </motion.div>
              )}
              
              {/* Language Toggle */}
              <motion.div
                initial={hasAnimated ? false : NAVBAR_ANIMATIONS.toggle.initial}
                animate={hasAnimated ? false : NAVBAR_ANIMATIONS.toggle.animate}
                transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.toggle.transition}
              >
                <LanguageToggle />
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Theme Toggle */}
              {isDark !== undefined && onToggleTheme && (
                <motion.div
                  initial={hasAnimated ? false : NAVBAR_ANIMATIONS.toggle.initial}
                  animate={hasAnimated ? false : NAVBAR_ANIMATIONS.toggle.animate}
                  transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.toggle.transition}
                >
                  <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
                </motion.div>
              )}
              
              {/* Language Toggle */}
              <motion.div
                initial={hasAnimated ? false : NAVBAR_ANIMATIONS.toggle.initial}
                animate={hasAnimated ? false : NAVBAR_ANIMATIONS.toggle.animate}
                transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.toggle.transition}
              >
                <LanguageToggle />
              </motion.div>
              <motion.button
                initial={hasAnimated ? false : NAVBAR_ANIMATIONS.hamburger.initial}
                animate={hasAnimated ? false : NAVBAR_ANIMATIONS.hamburger.animate}
                transition={hasAnimated ? undefined : NAVBAR_ANIMATIONS.hamburger.transition}
                onClick={toggleMobileMenu}
                className="relative h-12 w-12 rounded-2xl bg-[#70B8BA]/10 hover:bg-[#70B8BA]/20 flex items-center justify-center transition-colors"
                aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {/* Top line */}
                  <motion.span
                    className="absolute w-5 h-0.5 bg-foreground rounded-full"
                    style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? '-50%' : 'calc(-50% - 6px)',
                    }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  />
                  {/* Middle line */}
                  <motion.span
                    className="absolute w-5 h-0.5 bg-foreground rounded-full"
                    style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1,
                      scale: isMobileMenuOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                  {/* Bottom line */}
                  <motion.span
                    className="absolute w-5 h-0.5 bg-foreground rounded-full"
                    style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? '-50%' : 'calc(-50% + 6px)',
                    }}
                    transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            
            {/* Mobile Menu */}
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Menú de navegación móvil"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-20 right-0 w-80 z-50 md:hidden"
            >
              <div className="flex flex-col h-[calc(100vh-5rem)] p-6">
                {/* Frame 1: Navegación principal */}
                <div className="bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-3xl p-6">
                  <div className="space-y-1">
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200 ${
                        currentPage === 'home' ? 'text-foreground bg-muted/50 font-medium' : ''
                      }`}
                      onClick={handleHomeClick}
                    >
                      {t.nav.home}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200 ${
                        currentPage === 'projects' ? 'text-foreground bg-muted/50 font-medium' : ''
                      }`}
                      onClick={handleProjectsClick}
                    >
                      {t.nav.projects}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200 ${
                        currentPage === 'experiences' ? 'text-foreground bg-muted/50 font-medium' : ''
                      }`}
                      onClick={handleExperiencesClick}
                    >
                      {t.nav.experiences}
                    </Button>
                  </div>
                </div>

                {/* Separación óptima entre frames */}
                <div className="h-3"></div>

                {/* Frame 2: Botón CTA de contacto */}
                <div className="bg-card/95 backdrop-blur-md border border-border shadow-lg rounded-3xl p-6">
                  <Button 
                    className="w-full h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={handleContactClick}
                  >
                    {t.nav.contact}
                  </Button>
                </div>

                {/* Espacio flexible restante */}
                <div className="flex-1"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className="h-20 md:h-16" aria-hidden="true" />
    </>
  );
}