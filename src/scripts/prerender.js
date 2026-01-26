/**
 * Script de pre-rendering para generar HTML estático de cada proyecto
 * Esto permite que los crawlers de redes sociales lean las meta tags correctas
 * 
 * USO:
 * 1. Instalar Node.js (si no está instalado)
 * 2. Ejecutar: node scripts/prerender.js
 * 3. Los archivos HTML se generarán automáticamente en /dist/proyectos/
 * 4. Copiarlos manualmente a /public/proyectos/ si es necesario
 * 
 * NOTA: Actualmente los archivos HTML ya están creados manualmente en /public/proyectos/
 *       Este script está disponible para regenerarlos o crear nuevos en el futuro.
 */

const fs = require('fs');
const path = require('path');

// Metadata de proyectos
const projects = {
  'assorta': {
    title: 'Assorta | Retail Visual Platform - Jabier García Sanz',
    description: 'Caso de estudio: SaaS B2B que digitaliza Visual Merchandising en retail de moda mediante Product-driven development.',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Assorta/Cover%20Assorta%20Final.png',
    tags: ['Retail', 'Visual Merchandising', 'SaaS B2B', 'Product Design', 'Product-driven development']
  },
  'puffykitten': {
    title: 'PuffyKitten | E-commerce B2C - Jabier García Sanz',
    description: 'Caso de estudio: Plataforma e-commerce para productos de mascotas con metodología Design Thinking.',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/PuffyKitten/Cover-puffikitten.png',
    tags: ['Web + App', 'Mascotas', 'IoT', 'IA', 'Design Thinking']
  },
  'chupsee': {
    title: 'Chupsee | App móvil B2C - Jabier García Sanz',
    description: 'Caso de estudio: App de comparación de precios con IA predictiva y metodología Design Thinking.',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/Chupsee/Cover%20Chupsee.png',
    tags: ['App', 'E-commerce', 'IA Predictiva', 'Comparador', 'Design Thinking']
  },
  'gotapp': {
    title: 'GotApp | App móvil B2C - Jabier García Sanz',
    description: 'Caso de estudio: App de sostenibilidad y gamificación con metodología Design Sprint.',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/GotApp/Cover-gotaap.png',
    tags: ['App', 'Sostenibilidad', 'Gamificación', 'Monitorización', 'Design Sprint']
  },
  'pomeranian': {
    title: 'Pomeranian | Design System - Jabier García Sanz',
    description: 'Sistema de diseño completo con Atomic Design, tokens y componentes reutilizables.',
    image: 'https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Cover%20Design%20System.png',
    tags: ['Atomic Design', 'Estilos', 'Tokens', 'Componentes', 'Escalabilidad']
  }
};

// Generar HTML para cada proyecto
function generateHTML(slug, meta) {
  const url = `https://jabiergarcia.com/proyectos/${slug}`;
  const badgesHTML = meta.tags.map(tag => `<span class="badge">${tag}</span>`).join('\n        ');
  
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    
    <!-- Primary Meta Tags -->
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    <meta name="author" content="Jabier García Sanz" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${meta.image}" />
    <meta property="og:image:secure_url" content="${meta.image}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${meta.title}" />
    <meta property="og:site_name" content="Jabier García Sanz" />
    <meta property="og:locale" content="es_ES" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="${meta.image}" />
    <meta name="twitter:image:alt" content="${meta.title}" />
    
    <!-- LinkedIn Specific -->
    <meta property="og:see_also" content="https://www.linkedin.com/in/jabiergarcia/" />
    
    <!-- Canonical URL -->
    <link rel="canonical" content="${url}" />
    
    <!-- Auto-redirect script for browsers -->
    <script>
      // Redirect to SPA only for browsers with JavaScript
      if (typeof window !== 'undefined') {
        window.location.replace('${url}');
      }
    </script>
    <meta http-equiv="refresh" content="0;url=${url}">
    
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #fffbf8;
        color: #10252a;
        line-height: 1.6;
        padding: 20px;
      }
      .container { max-width: 900px; margin: 40px auto; text-align: center; }
      h1 { font-size: 2.5em; margin-bottom: 20px; font-weight: 700; }
      .badges { margin: 25px 0; }
      .badge {
        display: inline-block;
        padding: 8px 16px;
        background: #ffccb6;
        color: #2d5367;
        border-radius: 8px;
        margin: 5px;
        font-weight: 500;
      }
      p { color: #2d5367; margin: 25px auto; font-size: 1.15em; max-width: 700px; }
      img {
        max-width: 100%;
        margin: 35px 0;
        border-radius: 16px;
        box-shadow: 0 8px 30px rgba(16, 37, 42, 0.15);
      }
      a {
        display: inline-block;
        color: #10252a;
        text-decoration: none;
        font-weight: 600;
        padding: 14px 32px;
        background: #d8f878;
        border-radius: 10px;
        margin-top: 25px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>${meta.title.split(' - ')[0]}</h1>
      <div class="badges">
        ${badgesHTML}
      </div>
      <p>${meta.description}</p>
      <img src="${meta.image}" alt="${meta.title}" />
      <a href="${url}">Ver caso de estudio completo →</a>
      <noscript><p>Redirigiendo... <a href="${url}">Haz clic aquí si no se redirige automáticamente</a></p></noscript>
    </div>
  </body>
</html>`;
}

// Crear directorio dist/proyectos si no existe
const distDir = path.join(__dirname, '..', 'dist', 'proyectos');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Generar archivos HTML para cada proyecto
Object.entries(projects).forEach(([slug, meta]) => {
  const html = generateHTML(slug, meta);
  const filePath = path.join(distDir, `${slug}.html`);
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✅ Generated: ${slug}.html`);
});

console.log('\n🎉 Pre-rendering completed successfully!');
console.log(`📁 Generated ${Object.keys(projects).length} static HTML files`);