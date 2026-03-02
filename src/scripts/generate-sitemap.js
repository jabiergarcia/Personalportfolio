/**
 * Generador automático de sitemap.xml
 * Se ejecuta en cada build para mantener el sitemap actualizado
 * 
 * IMPORTANTE: Este script genera el sitemap basándose en:
 * - Rutas estáticas definidas manualmente
 * - Proyectos obtenidos de /utils/projects-data.ts
 * - Incluye hreflang tags para SEO internacional
 * - Incluye image tags para mejor indexación
 * 
 * Uso: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const BASE_URL = 'https://jabiergarcia.com';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Fecha actual en formato ISO (YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0];

// Información de proyectos (sync con /utils/projects-data.ts)
const PROJECTS = [
  {
    slug: 'assorta',
    titleES: 'Assorta | Retail Visual Platform',
    titleEN: 'Assorta | Retail Visual Platform',
    captionES: 'SaaS B2B para Visual Merchandising en retail de moda',
    captionEN: 'B2B SaaS for Visual Merchandising in fashion retail',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Cover%20Assorta%20Final.png'
  },
  {
    slug: 'puffykitten',
    titleES: 'PuffyKitten | E-commerce B2C',
    titleEN: 'PuffyKitten | B2C E-commerce',
    captionES: 'Plataforma e-commerce para productos de mascotas',
    captionEN: 'E-commerce platform for pet products',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Cover-puffykitten.png'
  },
  {
    slug: 'gotapp',
    titleES: 'GotApp | App móvil B2C',
    titleEN: 'GotApp | B2C Mobile App',
    captionES: 'App de sostenibilidad y gamificación',
    captionEN: 'Sustainability and gamification app',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Cover-gotapp.png'
  },
  {
    slug: 'chupsee',
    titleES: 'Chupsee | App móvil B2C',
    titleEN: 'Chupsee | B2C Mobile App',
    captionES: 'App de comparación de precios con IA predictiva',
    captionEN: 'Price comparison app with predictive AI',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Cover%20Chupsee.png'
  },
  {
    slug: 'pomeranian',
    titleES: 'Pomeranian | Design System',
    titleEN: 'Pomeranian | Design System',
    captionES: 'Sistema de diseño completo con Atomic Design',
    captionEN: 'Complete design system with Atomic Design',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Cover%20Design%20System.png'
  }
];

/**
 * Genera una entrada de URL con hreflang tags
 */
function generateURL(loc, esPath, enPath, options = {}) {
  const {
    lastmod = today,
    changefreq = 'monthly',
    priority = 0.8,
    includeImage = false,
    imageData = null
  } = options;

  let imageTag = '';
  if (includeImage && imageData) {
    imageTag = `
    <image:image>
      <image:loc>${imageData.loc}</image:loc>
      <image:title>${imageData.title}</image:title>
      ${imageData.caption ? `<image:caption>${imageData.caption}</image:caption>` : ''}
    </image:image>`;
  }

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}${esPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}${enPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${esPath}" />${imageTag}
  </url>`;
}

/**
 * Genera el XML del sitemap completo
 */
function generateSitemapXML() {
  const urls = [];

  // ==========================================
  // HOME
  // ==========================================
  urls.push(generateURL(
    BASE_URL,
    '',
    '',
    {
      changefreq: 'weekly',
      priority: 1.0,
      includeImage: true,
      imageData: {
        loc: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Image-linkedin.png',
        title: 'Jabier García Sanz - UX/UI Designer Portfolio',
        caption: ''
      }
    }
  ));

  // ==========================================
  // PÁGINAS PRINCIPALES - ESPAÑOL
  // ==========================================
  urls.push(generateURL(
    `${BASE_URL}/proyectos`,
    '/proyectos',
    '/projects',
    { changefreq: 'weekly', priority: 0.9 }
  ));

  urls.push(generateURL(
    `${BASE_URL}/experiencia`,
    '/experiencia',
    '/experiences',
    { changefreq: 'monthly', priority: 0.8 }
  ));

  // ==========================================
  // PÁGINAS PRINCIPALES - INGLÉS
  // ==========================================
  urls.push(generateURL(
    `${BASE_URL}/projects`,
    '/proyectos',
    '/projects',
    { changefreq: 'weekly', priority: 0.9 }
  ));

  urls.push(generateURL(
    `${BASE_URL}/experiences`,
    '/experiencia',
    '/experiences',
    { changefreq: 'monthly', priority: 0.8 }
  ));

  // ==========================================
  // PROYECTOS - ESPAÑOL
  // ==========================================
  PROJECTS.forEach(project => {
    urls.push(generateURL(
      `${BASE_URL}/proyectos/${project.slug}`,
      `/proyectos/${project.slug}`,
      `/projects/${project.slug}`,
      {
        changefreq: 'monthly',
        priority: 0.8,
        includeImage: true,
        imageData: {
          loc: project.image,
          title: project.titleES,
          caption: project.captionES
        }
      }
    ));
  });

  // ==========================================
  // PROYECTOS - INGLÉS
  // ==========================================
  PROJECTS.forEach(project => {
    urls.push(generateURL(
      `${BASE_URL}/projects/${project.slug}`,
      `/proyectos/${project.slug}`,
      `/projects/${project.slug}`,
      {
        changefreq: 'monthly',
        priority: 0.8,
        includeImage: true,
        imageData: {
          loc: project.image,
          title: project.titleEN,
          caption: project.captionEN
        }
      }
    ));
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
${urls.join('\n  \n')}
  
</urlset>`;
}

/**
 * Función principal
 */
function main() {
  try {
    console.log('🚀 Generando sitemap.xml...\n');
    
    // Generar XML
    const xml = generateSitemapXML();
    
    // Escribir archivo
    fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8');
    
    // Resumen
    console.log('✅ Sitemap generado exitosamente\n');
    console.log('📊 Resumen:');
    console.log(`   • Total URLs: ${PROJECTS.length * 2 + 4}`);
    console.log(`   • Home: 1`);
    console.log(`   • Páginas principales: 4 (ES + EN)`);
    console.log(`   • Proyectos: ${PROJECTS.length * 2} (${PROJECTS.length} ES + ${PROJECTS.length} EN)`);
    console.log(`   • Fecha: ${today}`);
    console.log(`   • Ubicación: ${OUTPUT_PATH}\n`);
    
    console.log('📁 Lista de proyectos incluidos:');
    PROJECTS.forEach(project => {
      console.log(`   ✓ /proyectos/${project.slug} (ES)`);
      console.log(`   ✓ /projects/${project.slug} (EN)`);
    });
    
  } catch (error) {
    console.error('❌ Error al generar sitemap:', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();