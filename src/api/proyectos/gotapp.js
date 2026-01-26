import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  try {
    const userAgent = req.headers['user-agent'] || '';
    const isBot = /bot|crawler|spider|crawling|facebookexternalhit|LinkedInBot|Twitterbot|WhatsApp|TelegramBot|Slackbot|Pinterest|discordbot|preview|headless/i.test(userAgent);
    
    console.log('[GOTAPP] Request | Bot:', isBot, '| UA:', userAgent.substring(0, 100));
    
    let html;
    
    if (isBot) {
      const htmlPath = path.join(process.cwd(), 'public', 'proyectos', 'gotapp.html');
      html = await fs.readFile(htmlPath, 'utf-8');
      console.log('[GOTAPP] ✅ Serving project HTML');
    } else {
      const possiblePaths = [
        path.join(process.cwd(), 'index.html'),
        path.join(process.cwd(), 'dist', 'index.html'),
      ];
      
      for (const p of possiblePaths) {
        try {
          html = await fs.readFile(p, 'utf-8');
          console.log('[GOTAPP] ✅ Serving index.html from:', p);
          break;
        } catch {}
      }
    }
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.status(200).send(html);
  } catch (error) {
    console.error('[GOTAPP] ❌ ERROR:', error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
}
