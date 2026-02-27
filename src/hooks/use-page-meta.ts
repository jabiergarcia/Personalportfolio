import { useEffect } from 'react';
import { SITE_INFO } from '../utils/constants';

interface PageMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const pageMeta: Record<string, PageMeta> = {
  home: {
    title: 'Jabier García Sanz - UX/UI Designer Portfolio',
    description: 'Portfolio de UX/UI Designer especializado en Design Systems y experiencias digitales. 13 años en moda + bootcamp en Neoland. Proyectos: PuffyKitten, Chupsee, GotApp y Pomeranian Design System.',
    path: '/',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  },
  projects: {
    title: 'Proyectos - Jabier García Sanz',
    description: 'Explora mis proyectos de UX/UI Design: PuffyKitten | E-commerce B2C, Chupsee | App móvil B2C, GotApp | App móvil B2C y Pomeranian | Design System.',
    path: '/proyectos',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  },
  experiences: {
    title: 'Experiencia - Jabier García Sanz',
    description: 'Mi trayectoria profesional: de 13 años en moda a UX/UI Designer tras bootcamp en Neoland.',
    path: '/experiencia',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  },
  puffykitten: {
    title: 'PuffyKitten | E-commerce B2C - Jabier García Sanz',
    description: 'Caso de estudio: Plataforma e-commerce para productos de mascotas con metodología Design Thinking.',
    path: '/proyectos/puffykitten',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Cover-puffykitten.png'
  },
  assorta: {
    title: 'Assorta | Retail Visual Platform - Jabier García Sanz',
    description: 'Caso de estudio: SaaS B2B que digitaliza Visual Merchandising en retail de moda mediante Product-driven development.',
    path: '/proyectos/assorta',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Cover%20Assorta%20Final.png'
  },
  chupsee: {
    title: 'Chupsee | App móvil B2C - Jabier García Sanz',
    description: 'Caso de estudio: App móvil con IA para identificación de plantas con metodología Design Sprint.',
    path: '/proyectos/chupsee',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Cover%20Chupsee.png'
  },
  'ds-pomeranian': {
    title: 'Pomeranian | Design System - Jabier García Sanz',
    description: 'Sistema de diseño completo con Atomic Design, tokens y componentes reutilizables.',
    path: '/proyectos/pomeranian',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Cover%20Design%20System.png'
  },
  gotapp: {
    title: 'GotApp | App móvil B2C - Jabier García Sanz',
    description: 'Caso de estudio: App de sostenibilidad y gamificación con metodología Design Sprint.',
    path: '/proyectos/gotapp',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Cover-gotapp.png'
  },
  admin: {
    title: 'Panel de Administración - Jabier García Sanz',
    description: 'Panel administrativo para gestión de contenido del portfolio.',
    path: '/admin',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  },
  '404': {
    title: 'Página no encontrada - Jabier García Sanz',
    description: 'La página que buscas no existe. Descubre mi portfolio de UX/UI Designer.',
    path: '/404',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  }
};

export const usePageMeta = (currentPage: string) => {
  useEffect(() => {
    try {
      const meta = pageMeta[currentPage] || pageMeta.home;

      document.title = meta.title;

      requestAnimationFrame(() => {

        // Helper: crea o actualiza un <meta> evitando duplicados en el DOM
        const upsertMeta = (selector: string, attr: string, value: string) => {
          let el = document.querySelector(selector);
          if (!el) {
            el = document.createElement('meta');
            const [attrName, attrValue] = attr.split('=');
            el.setAttribute(attrName, attrValue.replace(/"/g, ''));
            document.head.appendChild(el);
          }
          el.setAttribute('content', value);
        };

        // Helper: crea o actualiza un <link> evitando duplicados en el DOM
        const upsertLink = (rel: string, attr: string, value: string) => {
          let el = document.querySelector(`link[rel="${rel}"]`);
          if (!el) {
            el = document.createElement('link');
            el.setAttribute('rel', rel);
            document.head.appendChild(el);
          }
          el.setAttribute(attr, value);
        };

        // SEO básico
        upsertMeta('meta[name="description"]', 'name=description', meta.description);
        upsertMeta('meta[name="author"]', 'name=author', 'Jabier García Sanz');

        // Canonical URL
        if (SITE_INFO.domain) {
          upsertLink('canonical', 'href', `${SITE_INFO.domain}${meta.path}`);
        }

        // Open Graph
        upsertMeta('meta[property="og:title"]', 'property=og:title', meta.title);
        upsertMeta('meta[property="og:description"]', 'property=og:description', meta.description);
        upsertMeta('meta[property="og:type"]', 'property=og:type', 'website');

        if (SITE_INFO.domain) {
          upsertMeta('meta[property="og:url"]', 'property=og:url', `${SITE_INFO.domain}${meta.path}`);
        }

        if (meta.ogImage) {
          upsertMeta('meta[property="og:image"]', 'property=og:image', meta.ogImage);
          upsertMeta('meta[property="og:image:secure_url"]', 'property=og:image:secure_url', meta.ogImage);
          upsertMeta('meta[property="og:image:width"]', 'property=og:image:width', '1200');
          upsertMeta('meta[property="og:image:height"]', 'property=og:image:height', '630');
          upsertMeta('meta[property="og:image:type"]', 'property=og:image:type', 'image/png');
        }

        upsertMeta('meta[property="og:locale"]', 'property=og:locale', 'es_ES');
        upsertMeta('meta[property="og:site_name"]', 'property=og:site_name', 'Jabier García Portfolio');

        // Twitter / X
        upsertMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image');
        upsertMeta('meta[name="twitter:title"]', 'name=twitter:title', meta.title);
        upsertMeta('meta[name="twitter:description"]', 'name=twitter:description', meta.description);

        if (meta.ogImage) {
          upsertMeta('meta[name="twitter:image"]', 'name=twitter:image', meta.ogImage);
        }

        if (SITE_INFO.domain) {
          upsertMeta('meta[name="twitter:url"]', 'name=twitter:url', `${SITE_INFO.domain}${meta.path}`);
        }
      });
    } catch (error) {
      // Error silencioso — no debe romper la app
    }
  }, [currentPage]);
};