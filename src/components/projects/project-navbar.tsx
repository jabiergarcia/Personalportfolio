import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme-toggle';
import { LanguageToggle } from '../language-toggle';
import { useLanguage } from '../../hooks/use-language';

interface ProjectNavbarProps {
  onNavigateToProjects: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

/**
 * ProjectNavbar - Navbar compartida para todas las páginas de proyectos
 * 
 * Features:
 * - Auto-hide on scroll down, show on scroll up
 * - Back to projects button
 * - Theme toggle (dark/light)
 * - Language toggle (ES/EN)
 * - Fixed position with backdrop blur
 * 
 * Usado por:
 * - ProjectLayout (Assorta, Chupsee, GotApp, PuffyKitten)
 * - ds-pomeranian-project (Design System project)
 */
export function ProjectNavbar({ onNavigateToProjects, isDark, onToggleTheme }: ProjectNavbarProps) {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    let ticking = false;
    let lastY = 0;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastY);
          
          // Only trigger if scroll difference is significant
          if (scrollDifference > 5) {
            if (currentScrollY < lastY || currentScrollY < 100) {
              setIsNavVisible(true);
            } else if (currentScrollY > 100 && currentScrollY > lastY) {
              setIsNavVisible(false);
            }
            
            lastY = currentScrollY;
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Navigation - Auto Hide */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 transition-all duration-300 ease-in-out ${
          isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 h-20 md:h-16 flex items-center justify-between">
          <Button
            onClick={onNavigateToProjects}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.projectLayout.backToProjects}
          </Button>
          <div className="flex items-center gap-4">
            {isDark !== undefined && onToggleTheme && (
              <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            )}
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Spacer para compensar la navbar fixed */}
      <div className="h-20 md:h-16"></div>
    </>
  );
}
