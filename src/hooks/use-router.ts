import { useState, useEffect, useCallback } from 'react';

export type Page = 'home' | 'projects' | 'experiences' | 'puffykitten' | 'chupsee' | 'ds-pomeranian' | 'gotapp' | 'assorta' | 'admin';

// Route mapping - Spanish URLs
const routeMap: Record<Page, string> = {
  home: '/',
  projects: '/proyectos',
  experiences: '/experiencia',
  puffykitten: '/proyectos/puffykitten',
  chupsee: '/proyectos/chupsee',
  'ds-pomeranian': '/proyectos/pomeranian',
  gotapp: '/proyectos/gotapp',
  assorta: '/proyectos/assorta',
  admin: '/admin'
};

// Reverse mapping for URL to page
const pathToPage: Record<string, Page> = Object.entries(routeMap).reduce((acc, [page, path]) => {
  acc[path] = page as Page;
  return acc;
}, {} as Record<string, Page>);

// Helper function to get page from pathname with fallbacks
function getPageFromPath(pathname: string): Page {
  // Direct match
  if (pathToPage[pathname]) {
    return pathToPage[pathname];
  }
  
  // Try matching project routes with and without trailing slash
  const cleanPath = pathname.replace(/\/$/, ''); // Remove trailing slash
  if (pathToPage[cleanPath]) {
    return pathToPage[cleanPath];
  }
  
  // Try matching project slugs
  if (pathname.includes('/proyectos/')) {
    const slug = pathname.split('/proyectos/')[1]?.replace(/\/$/, '');
    if (slug === 'puffykitten') return 'puffykitten';
    if (slug === 'chupsee') return 'chupsee';
    if (slug === 'pomeranian') return 'ds-pomeranian';
    if (slug === 'gotapp') return 'gotapp';
    if (slug === 'assorta') return 'assorta';
  }
  
  // Check for experiences page
  if (pathname.includes('/experiencia')) {
    return 'experiences';
  }
  
  // Check for projects page (only /proyectos, not sub-routes)
  if (pathname === '/proyectos' || (pathname.includes('/proyectos') && !pathname.includes('/proyectos/'))) {
    return 'projects';
  }
  
  // Default to home
  return 'home';
}

export function useRouter() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Initialize from URL
    const path = window.location.pathname;
    return getPageFromPath(path);
  });

  // Navigate to a page and update URL
  const navigate = useCallback((page: Page, replace = false) => {
    const path = routeMap[page] || '/';
    
    if (replace) {
      window.history.replaceState({ page }, '', path);
    } else {
      window.history.pushState({ page }, '', path);
    }
    
    setCurrentPage(page);
  }, []);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = event.state?.page || getPageFromPath(window.location.pathname);
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Set initial state if not already set
    if (!window.history.state) {
      const initialPage = getPageFromPath(window.location.pathname);
      // Keep the current URL, just add state
      window.history.replaceState({ page: initialPage }, '', window.location.pathname);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return {
    currentPage,
    navigate
  };
}