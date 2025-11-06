import { ReactNode } from 'react';
import { PageWrapper } from './page-wrapper';
import { Footer } from './footer';
import { ErrorBoundary } from './error-boundary';
import { LazyLoader } from './lazy-loader';
import { PROFILE_IMAGE_URL } from '../utils/constants';
import type { Page } from '../hooks/use-router';

interface ProjectPageWrapperProps {
  currentPage: Page;
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onNavigateToExperiences: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isContactModalOpen: boolean;
  onOpenContact: () => void;
  onCloseContact: () => void;
  showNavigation?: boolean;
  showProfileImage?: boolean;
  showFooter?: boolean;
  children: ReactNode;
}

/**
 * Wrapper component for project pages to reduce code duplication
 * Handles common PageWrapper + ErrorBoundary + LazyLoader + Footer structure
 */
export function ProjectPageWrapper({
  currentPage,
  onNavigateHome,
  onNavigateToProjects,
  onNavigateToExperiences,
  isDark,
  onToggleTheme,
  isContactModalOpen,
  onOpenContact,
  onCloseContact,
  showNavigation = false,
  showProfileImage = true,
  showFooter = true,
  children
}: ProjectPageWrapperProps) {
  return (
    <PageWrapper
      onNavigateToHome={onNavigateHome}
      onNavigateToProjects={onNavigateToProjects}
      onNavigateToExperiences={onNavigateToExperiences}
      isDark={isDark}
      onToggleTheme={onToggleTheme}
      currentPage={currentPage}
      showNavigation={showNavigation}
      showProfileImage={showProfileImage}
      isContactModalOpen={isContactModalOpen}
      onOpenContact={onOpenContact}
      onCloseContact={onCloseContact}
    >
      <ErrorBoundary>
        <LazyLoader>
          {children}
        </LazyLoader>
      </ErrorBoundary>
      {showFooter && (
        <Footer
          onOpenContact={onOpenContact}
          profileImageUrl={PROFILE_IMAGE_URL}
        />
      )}
    </PageWrapper>
  );
}