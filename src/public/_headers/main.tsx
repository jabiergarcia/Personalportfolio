# Cloudflare Pages headers configuration

# Cache control for static pre-rendered project pages
/proyectos/*.html
  Cache-Control: public, max-age=0, must-revalidate
  X-Robots-Tag: index, follow

/projects/*.html
  Cache-Control: public, max-age=0, must-revalidate
  X-Robots-Tag: index, follow

# Main SPA file - no cache for fresh updates
/index.html
  Cache-Control: public, max-age=0, must-revalidate

# Static assets can be cached longer
/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

# Sitemap and robots
/sitemap.xml
  Cache-Control: public, max-age=3600
  Content-Type: application/xml

/robots.txt
  Cache-Control: public, max-age=3600
  Content-Type: text/plain
