import { useEffect } from 'react';

export const useServiceWorker = () => {
  useEffect(() => {
    // Solo registrar en navegadores que soporten service workers
    if ('serviceWorker' in navigator) {
      // Verificar si estamos en producción de forma segura
      const isProduction = typeof import.meta !== 'undefined' && 
                          import.meta.env && 
                          import.meta.env.MODE === 'production';
      
      // Solo registrar en producción, de forma asíncrona
      if (isProduction) {
        // Registrar después de que la página se cargue completamente
        const registerSW = () => {
          setTimeout(() => {
            navigator.serviceWorker.register('/sw.js')
              .then(() => {
                // Registro exitoso - silencioso
              })
              .catch(() => {
                // Error silencioso
              });
          }, 1000); // Retrasar 1 segundo para no interferir con el render inicial
        };

        if (document.readyState === 'complete') {
          registerSW();
        } else {
          window.addEventListener('load', registerSW, { once: true });
        }
      }
    }
  }, []);
};