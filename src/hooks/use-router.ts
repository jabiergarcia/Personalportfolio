import { useState, useEffect, useCallback } from 'react';

export type Page = 'home' | 'projects' | 'experiences' | 'puffykitten' | 'chupsee' | 'ds-pomeranian' | 'gotapp' | 'assorta' | 'admin' | '404';

export type Language = 'es' | 'en';

// Route mapping - Bilingual URLs
const routeMapES: Record<Page, string> = {
  home: '/',
  projects: '/proyectos',
  experiences: '/experiencia',
  puffykitten: '/proyectos/puffykitten',
  chupsee: '/proyectos/chupsee',
  'ds-pomeranian': '/proyectos/pomeranian',
  gotapp: '/proyectos/gotapp',
  assorta: '/proyectos/assorta',
  admin: '/admin',
  '404': '/404'
};

const routeMapEN: Record<Page, string> = {
  home: '/',
  projects: '/projects',
  experiences: '/experience',
  puffykitten: '/projects/puffykitten',
  chupsee: '/projects/chupsee',
  'ds-pomeranian': '/projects/pomeranian',
  gotapp: '/projects/gotapp',
  assorta: '/projects/assorta',
  admin: '/admin',
  '404': '/404'
};

// Get route map for current language
function getRouteMap(language: Language): Record<Page, string> {
  return language === 'es' ? routeMapES : routeMapEN;
}

// Reverse mapping for URL to page (accepts both Spanish and English URLs)
const pathToPageES: Record<string, Page> = Object.entries(routeMapES).reduce((acc, [page, path]) => {
  acc[path] = page as Page;
  return acc;
}, {} as Record<string, Page>);

const pathToPageEN: Record<string, Page> = Object.entries(routeMapEN).reduce((acc, [page, path]) => {
  acc[path] = page as Page;
  return acc;
}, {} as Record<string, Page>);

// Helper function to get page from pathname with fallbacks (accepts both languages)
function getPageFromPath(pathname: string): Page {
  // Direct match in Spanish
  if (pathToPageES[pathname]) {
    return pathToPageES[pathname];
  }
  
  // Direct match in English
  if (pathToPageEN[pathname]) {
    return pathToPageEN[pathname];
  }
  
  // Try matching with and without trailing slash
  const cleanPath = pathname.replace(/\/$/, ''); // Remove trailing slash
  if (pathToPageES[cleanPath]) {
    return pathToPageES[cleanPath];
  }
  if (pathToPageEN[cleanPath]) {
    return pathToPageEN[cleanPath];
  }
  
  // Try matching project slugs in Spanish
  if (pathname.includes('/proyectos/')) {
    const slug = pathname.split('/proyectos/')[1]?.replace(/\/$/, '');
    if (slug === 'puffykitten') return 'puffykitten';
    if (slug === 'chupsee') return 'chupsee';
    if (slug === 'pomeranian') return 'ds-pomeranian';
    if (slug === 'gotapp') return 'gotapp';
    if (slug === 'assorta') return 'assorta';
  }
  
  // Try matching project slugs in English
  if (pathname.includes('/projects/')) {
    const slug = pathname.split('/projects/')[1]?.replace(/\/$/, '');
    if (slug === 'puffykitten') return 'puffykitten';
    if (slug === 'chupsee') return 'chupsee';
    if (slug === 'pomeranian') return 'ds-pomeranian';
    if (slug === 'gotapp') return 'gotapp';
    if (slug === 'assorta') return 'assorta';
  }
  
  // Check for experiences page in both languages
  if (pathname.includes('/experiencia') || pathname.includes('/experience')) {
    return 'experiences';
  }
  
  // Check for projects page (only /proyectos or /projects, not sub-routes)
  if (pathname === '/proyectos' || pathname === '/projects' || 
      (pathname.includes('/proyectos') && !pathname.includes('/proyectos/')) ||
      (pathname.includes('/projects') && !pathname.includes('/projects/'))) {
    return 'projects';
  }
  
  // Return 404 for unknown routes
  return '404';
}

// Detect language from current URL
function detectLanguageFromURL(): Language {
  const pathname = window.location.pathname;
  
  // Check for English URLs
  if (pathname.includes('/projects') || pathname.includes('/experience')) {
    return 'en';
  }
  
  // Default to Spanish
  return 'es';
}

export function useRouter() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Initialize from URL
    const path = window.location.pathname;
    return getPageFromPath(path);
  });
  
  // Detect initial language from URL
  const [urlLanguage, setUrlLanguage] = useState<Language>(() => detectLanguageFromURL());

  // Navigate to a page and update URL
  const navigate = useCallback((page: Page, replace = false, language?: Language) => {
    // Use provided language or current URL language
    const lang = language || urlLanguage;
    const routeMap = getRouteMap(lang);
    const path = routeMap[page] || '/';
    
    if (replace) {
      window.history.replaceState({ page, language: lang }, '', path);
    } else {
      window.history.pushState({ page, language: lang }, '', path);
    }
    
    setCurrentPage(page);
    setUrlLanguage(lang);
  }, [urlLanguage]);
  
  // Update URL when language changes (called from App.tsx)
  const updateURLForLanguage = useCallback((newLanguage: Language) => {
    const routeMap = getRouteMap(newLanguage);
    const newPath = routeMap[currentPage] || '/';
    
    // Replace state to update URL without adding to history
    window.history.replaceState({ page: currentPage, language: newLanguage }, '', newPath);
    setUrlLanguage(newLanguage);
    
    console.log(`🌍 [Router] Updated URL to ${newLanguage}: ${newPath}`);
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || getPageFromPath(window.location.pathname);
      const lang = event.state?.language || detectLanguageFromURL();
      setCurrentPage(page);
      setUrlLanguage(lang);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial state if not already set
    if (!window.history.state) {
      const initialPage = getPageFromPath(window.location.pathname);
      const initialLang = detectLanguageFromURL();
      // Keep the current URL, just add state
      window.history.replaceState({ page: initialPage, language: initialLang }, '', window.location.pathname);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return {
    currentPage,
    navigate,
    updateURLForLanguage,
    urlLanguage
  };
}