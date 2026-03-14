import { useEffect, useState } from 'react';
import { DESIGN_SYSTEM_URL } from '../utils/constants';

export function DesignSystemPage() {
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch del HTML y crear un Blob URL con Content-Type correcto
    fetch(DESIGN_SYSTEM_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        // Crear un Blob con el HTML y Content-Type correcto
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        setIframeUrl(url);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading Design System:', err);
        setError(err.message);
        setLoading(false);
      });

    // Cleanup: revocar el Blob URL cuando se desmonte
    return () => {
      if (iframeUrl) {
        URL.revokeObjectURL(iframeUrl);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4" />
          <h1 className="text-2xl font-bold mb-2">Cargando Design System...</h1>
          <p className="text-muted-foreground">Un momento por favor</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-destructive">Error al cargar</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={() => window.close()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
          >
            Cerrar pestaña
          </button>
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={iframeUrl}
      title="Design System"
      className="w-full h-screen border-0"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        border: 'none',
        margin: 0,
        padding: 0
      }}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
  );
}