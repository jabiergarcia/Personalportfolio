import { Home, Search, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/language-context';
import { useEffect } from 'react';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onNavigateToExperiences: () => void;
  isDark: boolean;
}

export function NotFoundPage({ onNavigateHome, onNavigateToProjects, onNavigateToExperiences, isDark }: NotFoundPageProps) {
  const { t } = useLanguage();

  // Update meta robots to noindex for 404 page
  useEffect(() => {
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow';
      document.head.appendChild(meta);
    }

    // Clean up on unmount
    return () => {
      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors ${
      isDark ? 'bg-primary-dark' : 'bg-primary-light'
    }`}>
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 
            className="text-[120px] md:text-[180px] font-bold leading-none transition-colors"
            style={{ 
              fontFamily: 'Clash Display, sans-serif',
              color: isDark ? '#d8f878' : '#10252a', // Verde lima en dark, primario en light
            }}
          >
            404
          </h1>
        </div>

        {/* Search Icon */}
        <div className="mb-8 flex justify-center">
          <div className={`p-6 rounded-full transition-colors ${
            isDark ? 'bg-primary-light/5' : 'bg-primary-dark/5'
          }`}>
            <Search 
              className={`w-16 h-16 transition-colors ${
                isDark ? 'text-primary-light/40' : 'text-primary-dark/40'
              }`}
            />
          </div>
        </div>

        {/* Title */}
        <h2 
          className={`text-3xl md:text-4xl font-bold mb-4 transition-colors ${
            isDark ? 'text-primary-light' : 'text-primary-dark'
          }`}
          style={{ fontFamily: 'Clash Display, sans-serif' }}
        >
          {t.notFound.title}
        </h2>

        {/* Description */}
        <p 
          className={`text-lg md:text-xl mb-12 transition-colors ${
            isDark ? 'text-primary-light/70' : 'text-primary-dark/70'
          }`}
        >
          {t.notFound.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className={`
              group px-8 py-4 rounded-full font-medium text-base
              flex items-center gap-3 transition-all
              ${isDark 
                ? 'bg-primary-light/10 text-primary-light hover:bg-primary-light/20' 
                : 'bg-primary-dark/10 text-primary-dark hover:bg-primary-dark/20'
              }
            `}
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            {t.notFound.backButton}
          </button>

          {/* Home Button */}
          <button
            onClick={onNavigateHome}
            className="group px-8 py-4 rounded-full font-medium text-base flex items-center gap-3 transition-all"
            style={{ 
              backgroundColor: '#d8f878',
              color: '#10252a'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c4e566'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d8f878'}
          >
            <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
            {t.notFound.homeButton}
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-16">
          <p 
            className={`text-sm font-medium mb-4 transition-colors ${
              isDark ? 'text-primary-light/50' : 'text-primary-dark/60'
            }`}
          >
            {t.notFound.suggestions}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: t.nav.home, path: '/', onClick: onNavigateHome },
              { label: t.nav.projects, path: '/proyectos', onClick: onNavigateToProjects },
              { label: t.nav.experiences, path: '/experiencia', onClick: onNavigateToExperiences },
            ].map((link) => (
              <button
                key={link.path}
                onClick={link.onClick}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
                  ${isDark 
                    ? 'bg-primary-light/5 text-primary-light/70 hover:bg-primary-light/10 hover:text-primary-light' 
                    : 'bg-primary-dark/8 text-primary-dark/80 hover:bg-primary-dark/15 hover:text-primary-dark border border-primary-dark/10'
                  }
                `}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}