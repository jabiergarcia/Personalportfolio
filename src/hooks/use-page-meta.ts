import { useEffect } from 'react';
import { SITE_INFO, PROFILE_IMAGE_URL } from '../utils/constants';

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
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  },
  chupsee: {
    title: 'Chupsee | App móvil B2C - Jabier García Sanz',
    description: 'Caso de estudio: App móvil con IA para identificación de plantas con metodología Design Sprint.',
    path: '/proyectos/chupsee',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  },
  'ds-pomeranian': {
    title: 'Pomeranian | Design System - Jabier García Sanz',
    description: 'Sistema de diseño completo con Atomic Design, tokens y componentes reutilizables.',
    path: '/proyectos/pomeranian',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  },
  gotapp: {
    title: 'GotApp | App móvil B2C - Jabier García Sanz',
    description: 'Caso de estudio: App de sostenibilidad y gamificación con metodología Design Sprint.',
    path: '/proyectos/gotapp',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  },
  admin: {
    title: 'Panel de Administración - Jabier García Sanz',
    description: 'Panel administrativo para gestión de contenido del portfolio.',
    path: '/admin',
    ogImage: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png'
  }
};

export const usePageMeta = (currentPage: string) => {
  useEffect(() => {
    try {
      const meta = pageMeta[currentPage] || pageMeta.home;
      
      // Update document title
      document.title = meta.title;
      
      // Batch DOM updates using requestAnimationFrame
      requestAnimationFrame(() => {
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', meta.description);
        
        // Update meta author
        let metaAuthor = document.querySelector('meta[name="author"]');
        if (!metaAuthor) {
          metaAuthor = document.createElement('meta');
          metaAuthor.setAttribute('name', 'author');
          document.head.appendChild(metaAuthor);
        }
        metaAuthor.setAttribute('content', 'Jabier García Sanz');
        
        // Update canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          document.head.appendChild(canonical);
        }
        // Use path from meta instead of page name
        if (SITE_INFO.domain) {
          canonical.setAttribute('href', `${SITE_INFO.domain}${meta.path}`);
        }
        
        // Update Open Graph meta tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
          ogTitle = document.createElement('meta');
          ogTitle.setAttribute('property', 'og:title');
          document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute('content', meta.title);
        
        let ogDescription = document.querySelector('meta[property="og:description"]');
        if (!ogDescription) {
          ogDescription = document.createElement('meta');
          ogDescription.setAttribute('property', 'og:description');
          document.head.appendChild(ogDescription);
        }
        ogDescription.setAttribute('content', meta.description);
        
        // Update og:url with proper path
        let ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl && SITE_INFO.domain) {
          ogUrl.setAttribute('content', `${SITE_INFO.domain}${meta.path}`);
        }
        
        // Update og:image
        if (meta.ogImage) {
          let ogImage = document.querySelector('meta[property="og:image"]');
          if (!ogImage) {
            ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            document.head.appendChild(ogImage);
          }
          ogImage.setAttribute('content', meta.ogImage);
          
          // Update og:image:secure_url
          let ogImageSecure = document.querySelector('meta[property="og:image:secure_url"]');
          if (!ogImageSecure) {
            ogImageSecure = document.createElement('meta');
            ogImageSecure.setAttribute('property', 'og:image:secure_url');
            document.head.appendChild(ogImageSecure);
          }
          ogImageSecure.setAttribute('content', meta.ogImage);
        }
        
        // Update Twitter Card meta tags
        let twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (!twitterTitle) {
          twitterTitle = document.createElement('meta');
          twitterTitle.setAttribute('name', 'twitter:title');
          document.head.appendChild(twitterTitle);
        }
        twitterTitle.setAttribute('content', meta.title);
        
        let twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (!twitterDescription) {
          twitterDescription = document.createElement('meta');
          twitterDescription.setAttribute('name', 'twitter:description');
          document.head.appendChild(twitterDescription);
        }
        twitterDescription.setAttribute('content', meta.description);
        
        // Update twitter:image
        if (meta.ogImage) {
          let twitterImage = document.querySelector('meta[name="twitter:image"]');
          if (!twitterImage) {
            twitterImage = document.createElement('meta');
            twitterImage.setAttribute('name', 'twitter:image');
            document.head.appendChild(twitterImage);
          }
          twitterImage.setAttribute('content', meta.ogImage);
        }
      });
    } catch (error) {
      // Error silencioso - no debe romper la app
    }
  }, [currentPage]);
};