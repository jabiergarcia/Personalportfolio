import { useLanguage } from './use-language';
import { CV_URLS } from '../utils/constants';

/**
 * Hook para obtener la URL y nombre del archivo del CV según el idioma actual
 */
export function useCV() {
  const { language } = useLanguage();
  
  const cvUrl = CV_URLS[language];
  const cvFileName = language === 'es' 
    ? 'Jabier-Garcia-Sanz-CV-ES.pdf'
    : 'Jabier-Garcia-Sanz-CV-EN.pdf';
  
  return {
    cvUrl,
    cvFileName,
    language,
  };
}
