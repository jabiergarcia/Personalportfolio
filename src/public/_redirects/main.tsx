# Cloudflare Pages redirects configuration
# Format: from  to  [status]
# Status 200 = rewrite (invisible, no redirect for crawlers)

# Spanish project pages
/proyectos/assorta  /proyectos/assorta.html  200
/proyectos/puffykitten  /proyectos/puffykitten.html  200
/proyectos/chupsee  /proyectos/chupsee.html  200
/proyectos/gotapp  /proyectos/gotapp.html  200
/proyectos/pomeranian  /proyectos/pomeranian.html  200

# English project pages
/projects/assorta  /projects/assorta.html  200
/projects/puffykitten  /projects/puffykitten.html  200
/projects/chupsee  /projects/chupsee.html  200
/projects/gotapp  /projects/gotapp.html  200
/projects/pomeranian  /projects/pomeranian.html  200

# Fallback to index.html for all other routes (SPA)
/*  /index.html  200
