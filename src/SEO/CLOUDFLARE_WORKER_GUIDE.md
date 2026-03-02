# 🛠️ Cloudflare Worker - Guía de Deploy

## ⚠️ CUÁNDO USAR ESTO

**Solo implementa el Worker si:**
- Han pasado más de 30 minutos desde el deploy
- El archivo `_redirects` NO funcionó
- LinkedIn Inspector sigue mostrando meta tags genéricos
- Ya purgaste la caché de Cloudflare

---

## 📋 PRE-REQUISITOS

1. ✅ Dominio `jabiergarcia.com` configurado en Cloudflare
2. ✅ Acceso al Dashboard de Cloudflare
3. ✅ Archivos HTML pre-renderizados desplegados en `/public/proyectos/`

---

## 🚀 PASOS PARA DEPLOY

### Paso 1: Acceder a Cloudflare Dashboard

1. Ve a: https://dash.cloudflare.com
2. Selecciona tu cuenta
3. Click en el dominio `jabiergarcia.com`

### Paso 2: Crear el Worker

1. En el menú lateral, ve a **Workers & Pages**
2. Click en **Create Application**
3. Selecciona **Create Worker**
4. Asigna un nombre: `seo-crawler-handler`
5. Click en **Deploy**

### Paso 3: Editar el Worker

1. Click en **Edit Code** (botón azul arriba derecha)
2. **Borra todo el código por defecto**
3. Copia y pega el código de `/cloudflare-worker.js`
4. Click en **Save and Deploy**

### Paso 4: Configurar la Ruta (Route)

1. Regresa a la página del Worker
2. Ve a **Settings** → **Triggers**
3. En la sección **Routes**, click en **Add Route**
4. Configura:
   ```
   Route: *jabiergarcia.com/*
   Zone: jabiergarcia.com
   ```
5. Click en **Save**

---

## 🧪 VERIFICAR QUE FUNCIONA

### Test 1: curl con User-Agent

```bash
curl -A "LinkedInBot/1.0" -I https://jabiergarcia.com/proyectos/assorta
```

**Busca estos headers:**
```
X-Served-By: Cloudflare-Worker
X-Crawler-Detected: true
```

Si los ves → ✅ **Worker funcionando**

### Test 2: curl del contenido

```bash
curl -A "LinkedInBot/1.0" https://jabiergarcia.com/proyectos/assorta | grep "<title>"
```

**Debería mostrar:**
```html
<title>Assorta | Retail Visual Platform - Jabier García Sanz</title>
```

### Test 3: LinkedIn Post Inspector

1. Ve a: https://www.linkedin.com/post-inspector/
2. Ingresa: `https://jabiergarcia.com/proyectos/assorta`
3. Click en **Inspect**
4. Verifica:
   - ✅ Título: "Assorta | Retail Visual Platform - Jabier García Sanz"
   - ✅ Imagen: Cover Assorta Final.png
   - ✅ Descripción: "Caso de estudio: SaaS B2B..."

---

## 📊 MONITOREO DEL WORKER

### Ver Logs en Tiempo Real

1. En el dashboard del Worker
2. Click en **Logs** (menú superior)
3. Activa **Begin log stream**

**Verás logs como:**
```
[Worker] Request: /proyectos/assorta | UserAgent: linkedinbot/1.0 | IsCrawler: true
[Worker] Serving Spanish HTML: https://jabiergarcia.com/proyectos/assorta.html
```

### Métricas

1. Ve a **Metrics** en el dashboard del Worker
2. Verifica:
   - Requests por minuto
   - Errores (debe ser 0%)
   - CPU time

---

## 🐛 TROUBLESHOOTING

### Problema: Worker no se ejecuta

**Síntoma:** curl no muestra headers `X-Served-By`

**Solución:**
1. Verifica que la ruta esté configurada correctamente
2. Confirma que el Worker está **desplegado** (no en borrador)
3. Espera 1-2 minutos para propagación

### Problema: Worker devuelve 404

**Síntoma:** curl devuelve error 404

**Solución:**
1. Verifica que los archivos HTML existan en `/public/proyectos/`
2. Confirma que Figma Make desplegó los archivos
3. Prueba acceder directamente a: `https://jabiergarcia.com/proyectos/assorta.html`

### Problema: LinkedIn sigue mostrando caché antiguo

**Síntoma:** LinkedIn Inspector muestra datos viejos

**Solución:**
1. **Purgar caché de LinkedIn**:
   - En Post Inspector, click en **Refresh**
   - Espera 5-10 minutos
2. **Añadir query string temporal**:
   - Usa `https://jabiergarcia.com/proyectos/assorta?v=2`
   - Esto fuerza a LinkedIn a re-crawlear

### Problema: Worker consume mucho CPU

**Síntoma:** Métricas muestran CPU time alto

**Solución:**
- El Worker es muy ligero (solo redirecciona)
- Si el CPU time es alto, verifica que no haya loops infinitos
- Revisa los logs para detectar errores

---

## 💰 COSTOS

**Cloudflare Workers tiene FREE TIER:**
- ✅ 100,000 requests/día GRATIS
- ✅ Suficiente para un portfolio personal
- ✅ No requiere tarjeta de crédito

**Tu tráfico estimado:**
- Crawlers: ~100-500 requests/día
- **Costo: $0/mes** ✅

---

## 🔄 ACTUALIZAR EL WORKER

Si necesitas modificar el código:

1. Ve al Worker en dashboard
2. Click en **Edit Code**
3. Modifica el código
4. **Save and Deploy**
5. Los cambios aplican **inmediatamente**

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] Worker creado y desplegado
- [ ] Ruta configurada: `*jabiergarcia.com/*`
- [ ] Test con curl muestra headers correctos
- [ ] LinkedIn Inspector muestra título correcto
- [ ] Logs del Worker muestran detección de crawlers
- [ ] Usuarios normales ven SPA React sin cambios

---

## 📞 SI NADA FUNCIONA

**Última opción:** Migrar a Vercel

Tu `vercel.json` ya está configurado perfectamente. Solo necesitas:

1. Crear cuenta en Vercel (gratis)
2. Importar proyecto desde GitHub/Figma Make
3. Configurar dominio personalizado
4. **TODO funcionará automáticamente** sin Workers

**Ventajas de Vercel:**
- ✅ Zero configuration
- ✅ `vercel.json` se respeta nativamente
- ✅ CDN global incluido
- ✅ SSL automático
- ✅ Deploy automático en cada commit

---

## 🎯 RESULTADO ESPERADO

### ANTES del Worker:
```
LinkedIn Bot → Cloudflare → Figma Make → index.html
↓
Preview: Título genérico del home
```

### DESPUÉS del Worker:
```
LinkedIn Bot → Cloudflare → Worker → /proyectos/assorta.html
↓
Preview: Título y imagen específica de Assorta ✅
```

---

**Fecha:** Febrero 28, 2026  
**Complejidad:** Media  
**Tiempo estimado:** 15-20 minutos
