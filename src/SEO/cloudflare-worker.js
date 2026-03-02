// Cloudflare Worker para servir HTML pre-renderizado a crawlers
// Deploy este worker en Cloudflare Dashboard si _redirects no funciona

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
    
    // Detectar si es un crawler/bot
    const isCrawler = /bot|crawler|spider|crawling|linkedinbot|twitterbot|facebookexternalhit|whatsapp|slackbot|telegrambot|skypeuripreview|slack|vkshare|pinterest|redditbot/i.test(userAgent);
    
    console.log(`[Worker] Request: ${url.pathname} | UserAgent: ${userAgent} | IsCrawler: ${isCrawler}`);
    
    // Si NO es un crawler, pasar la request sin modificar
    if (!isCrawler) {
      return fetch(request);
    }
    
    // Lista de proyectos
    const projects = ['assorta', 'puffykitten', 'chupsee', 'gotapp', 'pomeranian'];
    
    // ========================================
    // RUTAS EN ESPAÑOL: /proyectos/[proyecto]
    // ========================================
    const spanishMatch = url.pathname.match(/^\/proyectos\/([\w-]+)$/);
    if (spanishMatch) {
      const projectSlug = spanishMatch[1];
      
      // Verificar si el proyecto existe
      if (projects.includes(projectSlug)) {
        const htmlUrl = `${url.origin}/proyectos/${projectSlug}.html`;
        console.log(`[Worker] Serving Spanish HTML: ${htmlUrl}`);
        
        try {
          const response = await fetch(htmlUrl);
          
          // Si el HTML existe, devolverlo
          if (response.ok) {
            // Clonar response para poder modificar headers
            const newResponse = new Response(response.body, response);
            newResponse.headers.set('X-Served-By', 'Cloudflare-Worker');
            newResponse.headers.set('X-Crawler-Detected', 'true');
            newResponse.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
            
            return newResponse;
          }
        } catch (error) {
          console.error(`[Worker] Error fetching Spanish HTML: ${error}`);
        }
      }
    }
    
    // ========================================
    // RUTAS EN INGLÉS: /projects/[proyecto]
    // ========================================
    const englishMatch = url.pathname.match(/^\/projects\/([\w-]+)$/);
    if (englishMatch) {
      const projectSlug = englishMatch[1];
      
      // Verificar si el proyecto existe
      if (projects.includes(projectSlug)) {
        const htmlUrl = `${url.origin}/projects/${projectSlug}.html`;
        console.log(`[Worker] Serving English HTML: ${htmlUrl}`);
        
        try {
          const response = await fetch(htmlUrl);
          
          // Si el HTML existe, devolverlo
          if (response.ok) {
            // Clonar response para poder modificar headers
            const newResponse = new Response(response.body, response);
            newResponse.headers.set('X-Served-By', 'Cloudflare-Worker');
            newResponse.headers.set('X-Crawler-Detected', 'true');
            newResponse.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
            
            return newResponse;
          }
        } catch (error) {
          console.error(`[Worker] Error fetching English HTML: ${error}`);
        }
      }
    }
    
    // ========================================
    // FALLBACK: Pasar request sin modificar
    // ========================================
    console.log(`[Worker] No match, passing through: ${url.pathname}`);
    return fetch(request);
  }
};
