import { Suspense, ComponentType, lazy, LazyExoticComponent } from 'react';
import { useLanguage } from '../contexts/language-context';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Default loading component
function DefaultLoader() {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground">
          {language === 'es' ? 'Cargando...' : 'Loading...'}
        </p>
      </div>
    </div>
  );
}

/**
 * Enhanced lazy loader with timeout and error handling
 */
export function LazyLoader({ children, fallback = <DefaultLoader /> }: LazyLoaderProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

/**
 * Helper to create lazy components with timeout and error handling
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }> | Promise<T>,
  componentName: string = 'Component'
): LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      const module = await Promise.race([
        importFunc(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error(`Timeout loading ${componentName}`)), 15000)
        )
      ]);
      
      // Handle both default exports and named exports
      if ('default' in module) {
        return module as { default: T };
      }
      return { default: module as T };
    } catch (err) {
      console.error(`Failed to load ${componentName}:`, err);
      return {
        default: (() => (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="p-8 text-center space-y-2">
              <p className="text-muted-foreground">Error al cargar el componente</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-sm text-secondary hover:underline"
              >
                Recargar página
              </button>
            </div>
          </div>
        )) as T
      };
    }
  });
}