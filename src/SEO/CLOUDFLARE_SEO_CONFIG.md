# 🚀 Configuración de Cloudflare Pages para SEO

## ✅ Archivos creados

### 1. `/public/_redirects`
Cloudflare Pages detecta este archivo automáticamente y aplica rewrites invisibles (status 200).

**Función:**
- Cuando un crawler visita `/proyectos/assorta`, Cloudflare sirve `/proyectos/assorta.html`
- El crawler ve los meta tags correctos del HTML pre-renderizado
- La URL permanece igual (no hay redirección visible)

### 2. `/public/_headers`
Configura headers HTTP específicos para diferentes tipos de archivos.

**Función:**
- Desactiva caché para archivos HTML (siempre contenido fresco)
- Añade `X-Robots-Tag: index, follow` a páginas de proyectos
- Cachea assets estáticos (JS, CSS) por 1 año

### 3. `/vercel.json` (actualizado)
Mantiene configuración para Vercel por si migras en el futuro.

---

## 🧪 Cómo probar que funciona

### Opción 1: LinkedIn Post Inspector (RECOMENDADO)
1. Ve a: https://www.linkedin.com/post-inspector/
2. Ingresa: `https://jabiergarcia.com/proyectos/assorta`
3. Haz clic en **"Inspect"**
4. **Espera 5-10 minutos** (Cloudflare necesita propagar la configuración)
5. Si aparece el título **"Assorta | Retail Visual Platform"** ✅ FUNCIONA

### Opción 2: curl con User-Agent de crawler
```bash
curl -A "LinkedInBot/1.0" https://jabiergarcia.com/proyectos/assorta
```

**Busca en la respuesta:**
```html
<title>Assorta | Retail Visual Platform - Jabier García Sanz</title>
<meta property="og:title" content="Assorta | Retail Visual Platform - Jabier García Sanz">
```

Si ves esto → ✅ **FUNCIONA**

### Opción 3: Verificar headers HTTP
```bash
curl -I -A "LinkedInBot/1.0" https://jabiergarcia.com/proyectos/assorta.html
```

**Busca:**
```
X-Robots-Tag: index, follow
Cache-Control: public, max-age=0, must-revalidate
```

---

## ⚠️ Troubleshooting

### Si NO funciona después de 30 minutos:

**Causa probable:** Figma Make no usa Cloudflare Pages, sino otro sistema de hosting.

**Solución alternativa:**

#### Opción A: Cloudflare Worker (Requiere acceso a Cloudflare Dashboard)
1. Ve a: https://dash.cloudflare.com
2. Selecciona tu dominio `jabiergarcia.com`
3. Ve a **Workers & Pages** → **Create Worker**
4. Pega este código:

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
    
    // Detectar crawlers
    const isCrawler = /bot|crawler|spider|linkedin|facebook|twitter|whatsapp|slack/i.test(userAgent);
    
    // Si es crawler y ruta de proyecto
    if (isCrawler) {
      if (url.pathname.match(/^\/proyectos\/(assorta|puffykitten|chupsee|gotapp|pomeranian)$/)) {
        const projectName = url.pathname.split('/')[2];
        const htmlUrl = `${url.origin}/proyectos/${projectName}.html`;
        return fetch(htmlUrl);
      }
      
      if (url.pathname.match(/^\/projects\/(assorta|puffykitten|chupsee|gotapp|pomeranian)$/)) {
        const projectName = url.pathname.split('/')[2];
        const htmlUrl = `${url.origin}/projects/${projectName}.html`;
        return fetch(htmlUrl);
      }
    }
    
    // Para usuarios normales, dejar pasar
    return fetch(request);
  }
}
```

5. Guarda y despliega
6. Ve a **Workers Routes** y añade:
   - **Route:** `jabiergarcia.com/*`
   - **Worker:** El que acabas de crear

#### Opción B: Migrar a Vercel (Definitivo)
Tu `vercel.json` ya está listo. Solo necesitas:
1. Crear cuenta en Vercel
2. Importar proyecto desde Figma Make
3. Cambiar nameservers de cdmon a Vercel

---

## 📊 Cómo monitorear

### Google Search Console
1. Ve a: https://search.google.com/search-console
2. Verifica propiedad de `jabiergarcia.com`
3. Ve a **URL Inspection**
4. Prueba URLs de proyectos

### Cloudflare Analytics
1. Ve al dashboard de Cloudflare
2. **Analytics & Logs** → **Traffic**
3. Filtra por User-Agent que contenga "bot"
4. Verifica que los crawlers están accediendo a `.html`

---

## 📝 Notas importantes

1. **Caché de Cloudflare:** Puede tardar hasta 30 minutos en purgar
2. **Caché de LinkedIn:** Puede tardar 24-48h en actualizar previews antiguos
3. **Forzar actualización:** Usa el Post Inspector de LinkedIn para forzar re-crawl

---

## ✅ Checklist de verificación

- [ ] Archivos `_redirects` y `_headers` creados en `/public/`
- [ ] Desplegada nueva versión en Figma Make
- [ ] Esperado 5-10 minutos para propagación
- [ ] Probado con LinkedIn Post Inspector
- [ ] Verificado meta tags con curl
- [ ] Purged caché de Cloudflare (si tienes acceso)

---

## 🆘 Si necesitas ayuda

**LinkedIn Post Inspector no muestra título correcto:**
- Espera 30 minutos más (caché de Cloudflare)
- Usa curl para verificar que el servidor responde bien
- Considera implementar Cloudflare Worker

**Curl muestra HTML incorrecto:**
- Verifica que los archivos `.html` existen en `/public/proyectos/`
- Confirma que Figma Make ha desplegado la nueva versión
- Revisa si hay errores en la consola del navegador

---

## 🎯 Resultado esperado

### ANTES (❌):
```
URL: https://jabiergarcia.com/proyectos/assorta
LinkedIn ve: <title>Jabier García Sanz - UX/UI Designer Portfolio</title>
Preview: Imagen y texto genéricos del home
```

### DESPUÉS (✅):
```
URL: https://jabiergarcia.com/proyectos/assorta
LinkedIn ve: <title>Assorta | Retail Visual Platform - Jabier García Sanz</title>
Preview: Imagen específica de Assorta con descripción correcta
```
