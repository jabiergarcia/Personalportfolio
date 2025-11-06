import { useEffect, useState } from 'react';
import { SITE_INFO } from '../utils/constants';

/**
 * Componente invisible que verifica si el dominio configurado
 * coincide con el dominio real del deployment.
 * Muestra una advertencia en consola si hay discrepancia EN PRODUCCIÓN.
 */
export function DomainChecker() {
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (hasChecked) return;
    
    const currentOrigin = window.location.origin;
    const configuredDomain = SITE_INFO.domain;
    
    // Lista de ambientes de desarrollo/preview que no deben mostrar advertencias
    const isDevelopmentEnvironment = 
      currentOrigin.includes('localhost') ||
      currentOrigin.includes('127.0.0.1') ||
      currentOrigin.includes('figmaiframepreview.figma.site') || // Figma Make preview
      currentOrigin.includes('figma.com') || // Cualquier iframe de Figma
      currentOrigin.includes('.vercel.app') && currentOrigin.includes('preview') || // Vercel preview
      currentOrigin.includes('netlify.app') && currentOrigin.includes('preview'); // Netlify preview
    
    // Solo verificar en producción real
    if (isDevelopmentEnvironment) {
      console.log(
        '%c🔧 Modo Preview/Desarrollo',
        'background: #cfe2ff; color: #004085; font-size: 11px; padding: 4px 8px; border-radius: 4px;'
      );
      console.log(
        `%cDominio actual: ${currentOrigin}`,
        'color: #6c757d; font-size: 10px;'
      );
      setHasChecked(true);
      return;
    }
    
    // Comparar dominios (ignorar trailing slash)
    const normalizedCurrent = currentOrigin.replace(/\/$/, '');
    const normalizedConfigured = configuredDomain.replace(/\/$/, '');
    
    if (normalizedCurrent !== normalizedConfigured) {
      console.warn(
        '%c⚠️ ADVERTENCIA: Discrepancia de Dominio',
        'background: #ffc107; color: #000; font-size: 14px; font-weight: bold; padding: 8px; border-radius: 4px;'
      );
      console.warn(
        `%cDominio Real: ${normalizedCurrent}\nDominio Configurado: ${normalizedConfigured}`,
        'background: #fff3cd; color: #856404; font-size: 12px; padding: 6px; border-radius: 4px; margin-top: 4px;'
      );
      console.warn(
        '%c📝 Acción Requerida:\n' +
        '1. Actualiza SITE_INFO.domain en /utils/constants.ts\n' +
        '2. Actualiza og:url en /index.html\n' +
        '3. Actualiza canonical URL en /index.html\n' +
        '4. Vuelve a desplegar\n' +
        '5. Usa LinkedIn Post Inspector con el dominio correcto',
        'background: #d1f4dd; color: #155724; font-size: 12px; padding: 6px; border-radius: 4px; margin-top: 4px;'
      );
      console.warn(
        `%c🔗 LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/\n` +
        `Usa esta URL: ${normalizedCurrent}`,
        'background: #cfe2ff; color: #004085; font-size: 12px; padding: 6px; border-radius: 4px; margin-top: 4px;'
      );
    } else {
      console.log(
        '%c✅ Dominio Configurado Correctamente',
        'background: #28a745; color: #fff; font-size: 12px; font-weight: bold; padding: 6px; border-radius: 4px;'
      );
      console.log(
        `%cDominio: ${normalizedCurrent}`,
        'color: #28a745; font-size: 11px;'
      );
    }
    
    setHasChecked(true);
  }, [hasChecked]);

  // Componente invisible
  return null;
}