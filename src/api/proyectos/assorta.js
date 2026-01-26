import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  try {
    const userAgent = req.headers['user-agent'] || '';
    
    // Detectar bots con un regex MÁS amplio
    const isBot = /bot|crawler|spider|crawling|facebookexternalhit|LinkedInBot|Twitterbot|WhatsApp|TelegramBot|Slackbot|Pinterest|discordbot|preview|headless/i.test(userAgent);
    
    // SIEMPRE loggear para debugging
    console.log('================================================');
    console.log('[ASSORTA] Request received');
    console.log('[ASSORTA] User-Agent:', userAgent);
    console.log('[ASSORTA] Is Bot?:', isBot);
    console.log('[ASSORTA] Headers:', JSON.stringify(req.headers, null, 2));
    console.log('================================================');
    
    let html;
    let htmlPath;
    
    if (isBot) {
      // Para bots: servir HTML estático con meta tags específicas
      htmlPath = path.join(process.cwd(), 'public', 'proyectos', 'assorta.html');
      console.log('[ASSORTA] Attempting to read project HTML from:', htmlPath);
      
      try {
        html = await fs.readFile(htmlPath, 'utf-8');
        console.log('[ASSORTA] ✅ Successfully read project HTML, length:', html.length);
      } catch (err) {
        console.error('[ASSORTA] ❌ Failed to read project HTML:', err.message);
        throw err;
      }
    } else {
      // Para usuarios: servir index.html de la SPA
      // Intentar múltiples rutas posibles
      const possiblePaths = [
        path.join(process.cwd(), 'index.html'),
        path.join(process.cwd(), 'dist', 'index.html'),
        path.join(process.cwd(), 'public', 'index.html'),
      ];
      
      let found = false;
      for (const p of possiblePaths) {
        try {
          console.log('[ASSORTA] Trying index.html path:', p);
          html = await fs.readFile(p, 'utf-8');
          htmlPath = p;
          found = true;
          console.log('[ASSORTA] ✅ Found index.html at:', p);
          break;
        } catch (err) {
          console.log('[ASSORTA] ❌ Not found at:', p);
        }
      }
      
      if (!found) {
        console.error('[ASSORTA] ❌ Could not find index.html in any location');
        throw new Error('index.html not found');
      }
    }
    
    console.log('[ASSORTA] Serving HTML from:', htmlPath);
    console.log('[ASSORTA] HTML length:', html.length);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.status(200).send(html);
    
    console.log('[ASSORTA] ✅ Response sent successfully');
  } catch (error) {
    console.error('[ASSORTA] ❌ ERROR:', error.message);
    console.error('[ASSORTA] Stack:', error.stack);
    res.status(500).send(`Error: ${error.message}`);
  }
}
