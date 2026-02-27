import { useState, useEffect, startTransition } from 'react';
import { LazyLoader, createLazyComponent } from './components/lazy-loader';
import { ErrorBoundary } from './components/error-boundary';
import { ProjectPageWrapper } from './components/project-page-wrapper';
import { PageWrapper } from './components/page-wrapper';
import { PageLoader } from './components/page-loader';
import { HeroSection } from './components/hero-section';
import { WorksSection } from './components/works-section';
import { StatsSection } from './components/stats-section';
import { ExperiencesSection } from './components/experiences-section';
import { Footer } from './components/footer';
import { NotFoundPage } from './components/not-found-page';
import { LightboxProvider } from './contexts/lightbox-context';
import { LanguageProvider, useLanguage } from './contexts/language-context';
import { DomainChecker } from './components/domain-checker';
import { useRouter, type Page } from './hooks/use-router';
import { useTheme } from './hooks/use-theme';
import { usePageMeta } from './hooks/use-page-meta';
import { useServiceWorker } from './hooks/use-service-worker';
import { useAnalytics } from './hooks/use-analytics';
import { useClarity } from './hooks/use-clarity';
import { PROFILE_IMAGE_URL } from './utils/constants';

// Build ID: meta-fix-final-20250109-2345-CRITICAL-DEPLOY
// CRITICAL: vercel.json changed to explicit rewrites - NO catch-all
// This fixes /linkedin.html serving index.html instead of static file

// Lazy load page components with enhanced error handling and timeout
const ProjectsPage = createLazyComponent(
  () => import('./components/projects-page').then(m => ({ default: m.ProjectsPage })),
  'ProjectsPage'
);

const ExperiencesPage = createLazyComponent(
  () => import('./components/experiences-page').then(m => ({ default: m.ExperiencesPage })),
  'ExperiencesPage'
);

const PuffyKittenProject = createLazyComponent(
  () => import('./components/projects/puffykitten-project').then(m => ({ default: m.PuffyKittenProject })),
  'PuffyKittenProject'
);

const ChupseeProject = createLazyComponent(
  () => import('./components/projects/chupsee-project').then(m => ({ default: m.ChupseeProject })),
  'ChupseeProject'
);

const PomeranianProject = createLazyComponent(
  () => import('./components/projects/ds-pomeranian-project').then(m => ({ default: m.PomeranianProject })),
  'PomeranianProject'
);

const GotAppProject = createLazyComponent(
  () => import('./components/projects/gotapp-project').then(m => ({ default: m.GotAppProject })),
  'GotAppProject'
);

const AssortaProject = createLazyComponent(
  () => import('./components/projects/assorta-project').then(m => ({ default: m.AssortaProject })),
  'AssortaProject'
);

const AdminPage = createLazyComponent(
  () => import('./components/admin-page').then(m => ({ default: m.AdminPage })),
  'AdminPage'
);

// Inner component that has access to Language context
function AppContent() {
  const { currentPage, navigate, updateURLForLanguage, urlLanguage } = useRouter();
  const { language } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  // Sync URL language with app language
  useEffect(() => {
    if (language !== urlLanguage) {
      updateURLForLanguage(language);
    }
  }, [language, urlLanguage, updateURLForLanguage]);
  
  // Update page metadata
  usePageMeta(currentPage);
  
  // Register service worker for caching
  useServiceWorker();
  
  // Microsoft Clarity Analytics
  useClarity('utnwnczfi2');
  
  // Analytics tracking
  const analytics = useAnalytics();
  
  // Track page views - with error handling and debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (analytics?.trackPageView) {
        try {
          analytics.trackPageView(currentPage);
        } catch (error) {
          console.error('Analytics error:', error);
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentPage, analytics]);

  // Secret key combination to access admin panel
  // Triple Shift: press Shift 3 times quickly
  useEffect(() => {
    let shiftPressCount = 0;
    let shiftTimer: NodeJS.Timeout;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Triple Shift to open admin panel
      if (event.key === 'Shift') {
        shiftPressCount++;
        
        // Clear existing timer
        if (shiftTimer) clearTimeout(shiftTimer);
        
        // If shifted 3 times within 1 second, open admin panel
        if (shiftPressCount >= 3) {
          navigate('admin');
          shiftPressCount = 0;
          return;
        }
        
        // Reset counter after 1 second of no shift presses
        shiftTimer = setTimeout(() => {
          shiftPressCount = 0;
        }, 1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (shiftTimer) clearTimeout(shiftTimer);
    };
  }, [navigate]);

  // Scroll to top when page changes - simplified
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' } as ScrollToOptions);
    } catch (error) {
      window.scrollTo(0, 0); // Fallback
    }
  }, [currentPage]);

  const navigateToProject = (projectId: string) => {
    startTransition(() => {
      if (analytics?.trackProjectView) {
        try {
          analytics.trackProjectView(projectId);
        } catch (error) {
          console.error('Analytics error:', error);
        }
      }
      navigate(projectId as Page);
    });
  };

  const navigateToHome = () => {
    startTransition(() => {
      navigate('home');
    });
  };

  const navigateToProjects = () => {
    startTransition(() => {
      navigate('projects');
    });
  };

  const navigateToExperiences = () => {
    startTransition(() => {
      navigate('experiences');
    });
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  // Wrap all page renders in ErrorBoundary and Suspense
  const renderPage = () => {
    // Standard pages (Projects, Experiences)
    if (currentPage === 'projects') {
      return (
        <ErrorBoundary>
          <ProjectPageWrapper
            currentPage="projects"
            onNavigateHome={navigateToHome}
            onNavigateToProjects={navigateToProjects}
            onNavigateToExperiences={navigateToExperiences}
            isDark={isDark}
            onToggleTheme={toggleTheme}
            isContactModalOpen={isContactModalOpen}
            onOpenContact={openContactModal}
            onCloseContact={closeContactModal}
            showNavigation={true}
            showProfileImage={true}
          >
            <LazyLoader fallback={<PageLoader />}>
              <ProjectsPage onNavigateHome={navigateToHome} onProjectClick={navigateToProject} />
            </LazyLoader>
          </ProjectPageWrapper>
        </ErrorBoundary>
      );
    }

    if (currentPage === 'experiences') {
      return (
        <ErrorBoundary>
          <ProjectPageWrapper
            currentPage="experiences"
            onNavigateHome={navigateToHome}
            onNavigateToProjects={navigateToProjects}
            onNavigateToExperiences={navigateToExperiences}
            isDark={isDark}
            onToggleTheme={toggleTheme}
            isContactModalOpen={isContactModalOpen}
            onOpenContact={openContactModal}
            onCloseContact={closeContactModal}
            showNavigation={true}
            showProfileImage={true}
          >
            <LazyLoader fallback={<PageLoader />}>
              <ExperiencesPage onNavigateHome={navigateToHome} />
            </LazyLoader>
          </ProjectPageWrapper>
        </ErrorBoundary>
      );
    }

    // Project detail pages (PuffyKitten, Chupsee, Pomeranian, GotApp)
    const projectPages: Record<string, { component: JSX.Element; page: Page }> = {
      puffykitten: {
        component: (
          <LazyLoader fallback={<PageLoader />}>
            <PuffyKittenProject 
              onNavigateHome={navigateToHome} 
              onNavigateToProjects={navigateToProjects} 
              onProjectClick={navigateToProject}
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          </LazyLoader>
        ),
        page: 'puffykitten'
      },
      chupsee: {
        component: (
          <LazyLoader fallback={<PageLoader />}>
            <ChupseeProject 
              onNavigateHome={navigateToHome} 
              onNavigateToProjects={navigateToProjects} 
              onProjectClick={navigateToProject}
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          </LazyLoader>
        ),
        page: 'chupsee'
      },
      'ds-pomeranian': {
        component: (
          <LazyLoader fallback={<PageLoader />}>
            <PomeranianProject 
              onNavigateHome={navigateToHome} 
              onNavigateToProjects={navigateToProjects} 
              onProjectClick={navigateToProject}
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          </LazyLoader>
        ),
        page: 'ds-pomeranian'
      },
      gotapp: {
        component: (
          <LazyLoader fallback={<PageLoader />}>
            <GotAppProject 
              onNavigateHome={navigateToHome} 
              onNavigateToProjects={navigateToProjects} 
              onProjectClick={navigateToProject}
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          </LazyLoader>
        ),
        page: 'gotapp'
      },
      assorta: {
        component: (
          <LazyLoader fallback={<PageLoader />}>
            <AssortaProject 
              onNavigateHome={navigateToHome} 
              onNavigateToProjects={navigateToProjects} 
              onProjectClick={navigateToProject}
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          </LazyLoader>
        ),
        page: 'assorta'
      }
    };

    // Render project page if it matches
    if (projectPages[currentPage]) {
      const { component, page } = projectPages[currentPage];
      return (
        <ErrorBoundary>
          <ProjectPageWrapper
            currentPage={page}
            onNavigateHome={navigateToHome}
            onNavigateToProjects={navigateToProjects}
            onNavigateToExperiences={navigateToExperiences}
            isDark={isDark}
            onToggleTheme={toggleTheme}
            isContactModalOpen={isContactModalOpen}
            onOpenContact={openContactModal}
            onCloseContact={closeContactModal}
            showNavigation={false}
          >
            {component}
          </ProjectPageWrapper>
        </ErrorBoundary>
      );
    }

    // Admin page
    if (currentPage === 'admin') {
      return (
        <ErrorBoundary>
          <ProjectPageWrapper
            currentPage="admin"
            onNavigateHome={navigateToHome}
            onNavigateToProjects={navigateToProjects}
            onNavigateToExperiences={navigateToExperiences}
            isDark={isDark}
            onToggleTheme={toggleTheme}
            isContactModalOpen={isContactModalOpen}
            onOpenContact={openContactModal}
            onCloseContact={closeContactModal}
            showProfileImage={true}
            showFooter={false}
          >
            <LazyLoader fallback={<PageLoader />}>
              <AdminPage onNavigateHome={navigateToHome} />
            </LazyLoader>
          </ProjectPageWrapper>
        </ErrorBoundary>
      );
    }

    // 404 Page - Not Found
    if (currentPage === '404') {
      return (
        <ErrorBoundary>
          <NotFoundPage 
            onNavigateHome={navigateToHome} 
            onNavigateToProjects={navigateToProjects}
            onNavigateToExperiences={navigateToExperiences}
            isDark={isDark} 
          />
        </ErrorBoundary>
      );
    }

    // Home page (default)
    return (
      <PageWrapper
        onNavigateToHome={navigateToHome}
        onNavigateToProjects={navigateToProjects}
        onNavigateToExperiences={navigateToExperiences}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        currentPage="home"
        showProfileImage={false}
        isContactModalOpen={isContactModalOpen}
        onOpenContact={openContactModal}
        onCloseContact={closeContactModal}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pb-0">
          <div className="space-y-4 md:space-y-6 mb-0">
            <HeroSection 
              onNavigateToProjects={navigateToProjects} 
              onNavigateToExperiences={navigateToExperiences}
              onOpenContact={openContactModal}
            />
            <WorksSection onProjectClick={navigateToProject} />
            <StatsSection />
            <ExperiencesSection onNavigateToExperiences={navigateToExperiences} />
          </div>
        </div>
        <Footer 
          onOpenContact={openContactModal}
          profileImageUrl={PROFILE_IMAGE_URL}
        />
      </PageWrapper>
    );
  }

  return (
    <LightboxProvider>
      <DomainChecker />
      {renderPage()}
    </LightboxProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}