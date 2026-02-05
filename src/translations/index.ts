import { es } from './es';
import { en } from './en';
import { projectsDetailES } from './projects-detail-es';
import { projectsDetailEN } from './projects-detail-en';

export type Language = 'es' | 'en';

export const translations = {
  es,
  en,
  projectsDetailES,
  projectsDetailEN,
};

export type { TranslationKeys } from './es';