import { ReactNode, useEffect } from 'react';
import { Navigation } from './navigation';
import { AdaptiveToaster } from './adaptive-toaster';
import { ContactModal } from './contact-modal';
import { useLanguage } from '../hooks/use-language';

interface PageWrapperProps {
  children: ReactNode;
  onNavigateToHome?: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToExperiences?: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  currentPage?: string;
  showNavigation?: boolean;
  showProfileImage?: boolean;
  isContactModalOpen?: boolean;
  onOpenContact?: () => void;
  onCloseContact?: () => void;
}

export function PageWrapper({
  children,
  onNavigateToHome,
  onNavigateToProjects,
  onNavigateToExperiences,
  isDark,
  onToggleTheme,
  currentPage = 'home',
  showNavigation = true,
  showProfileImage = false,
  isContactModalOpen = false,
  onOpenContact,
  onCloseContact
}: PageWrapperProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isContactModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isContactModalOpen]);

  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t.nav.skipToContent}
      </a>

      {showNavigation && (
        <Navigation
          key="main-navigation"
          onNavigateToHome={onNavigateToHome}
          onNavigateToProjects={onNavigateToProjects}
          onNavigateToExperiences={onNavigateToExperiences}
          onOpenContact={onOpenContact}
          isDark={isDark}
          onToggleTheme={onToggleTheme}
          currentPage={currentPage}
          showProfileImage={showProfileImage}
        />
      )}

      <main id="main-content" className="flex-1 bg-gradient-to-br from-background to-background/70 pt-4 md:pt-6">
        {children}
      </main>

      {/* Contact Modal */}
      {onCloseContact && (
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={onCloseContact}
        />
      )}

      {/* Toaster for notifications */}
      <AdaptiveToaster />
    </div>
  );
}