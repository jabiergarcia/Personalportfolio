import { useLanguage } from '../hooks/use-language';

/**
 * Simple loading component with translation support
 * Must be used within LanguageProvider
 */
export function PageLoader() {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground">{t.common.loading}</p>
      </div>
    </div>
  );
}
