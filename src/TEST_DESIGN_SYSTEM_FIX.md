# 🔧 Fix Design System Routing - Testing Guide

**Fecha**: 14 de marzo de 2026  
**Problema**: `/design-system.html` mostraba error 404  
**Causa raíz**: React Router interceptaba la navegación + Regex en vercel.json no excluía el archivo

---

## ✅ CAMBIOS IMPLEMENTADOS

### 1. **vercel.json** - Regex actualizado
```json
{
  "source": "/((?!proyectos/.*\\.html|projects/.*\\.html|design-system\\.html|test-static\\.html|sitemap\\.xml|robots\\.txt|404\\.html|.*\\..*).*)",
  "destination": "/index.html"
}
```

**Ahora excluye:**
- ✅ `design-system.html`
- ✅ `test-static.html` (archivo de test)

---

### 2. **Hero Section** - Dot verde lima
**Antes:**
```tsx
<motion.div onClick={handleOpenDesignSystem}>
```

**Después:**
```tsx
<a 
  href="/design-system.html"
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => analytics.trackDesignSystemOpened()}
>
```

**Ventajas:**
- ✅ Navegación nativa del navegador (no interceptada por React)
- ✅ Apertura en nueva pestaña
- ✅ Analytics tracking mantiene funcionalidad
- ✅ Accessibility: `aria-label` preservado

---

### 3. **Footer** - Link DS (🎨 DS)
**Antes:**
```tsx
<button onClick={() => window.location.href = '/design-system.html'}>
```

**Después:**
```tsx
<a 
  href="/design-system.html"
  target="_blank"
  rel="noopener noreferrer"
>
```

**Ventajas:**
- ✅ Navegación estándar sin JavaScript
- ✅ Funciona aunque JS falle
- ✅ SEO-friendly

---

## 🧪 TESTING

### Test 1: Archivo de prueba estático
1. **Visita**: `https://jabiergarcia.com/test-static.html`
2. **Esperado**: Ves página de test con ✅ verde
3. **Si falla**: Vercel no está sirviendo archivos estáticos correctamente

### Test 2: Click en dot verde
1. **Visita**: `https://jabiergarcia.com`
2. **Scroll**: Hasta el Hero Section (imagen perfil)
3. **Click**: Dot verde lima animado (esquina inferior derecha)
4. **Esperado**: Abre Design System en nueva pestaña

### Test 3: Click en footer DS link
1. **Scroll**: Hasta footer (bottom de cualquier página)
2. **Click**: Link "🎨 DS" (izquierda del copyright)
3. **Esperado**: Abre Design System en nueva pestaña

### Test 4: URL directa
1. **Visita**: `https://jabiergarcia.com/design-system.html`
2. **Esperado**: Carga Design System directamente (no 404)

---

## 🐛 TROUBLESHOOTING

### Problema: Sigue mostrando 404

**Posibles causas:**

1. **Vercel no ha redesplegado**
   ```bash
   # Forzar redeploy
   git add .
   git commit -m "force: redeploy for vercel.json changes"
   git push origin main
   ```

2. **Caché del navegador**
   - Presiona `Ctrl + Shift + R` (Windows/Linux)
   - Presiona `Cmd + Shift + R` (Mac)
   - O abre ventana de incógnito

3. **Vercel caché**
   - Ir a Vercel Dashboard
   - Deployments → Redeploy
   - **Importante**: Marcar "Clear Build Cache"

4. **El archivo no existe en build**
   - Verifica que `/public/design-system.html` esté en el repo
   - Vite copia automáticamente archivos de `/public/` a la raíz del build

---

## 📊 ANALYTICS

El tracking sigue funcionando:

```typescript
analytics.trackDesignSystemOpened()
```

**Eventos registrados en:**
- Supabase KV Store
- Key: `analytics:design-system-opened`

**Para verificar:**
1. Triple Shift → Admin panel
2. Ver logs de analytics

---

## 🔍 VERIFICACIÓN DE ARCHIVOS

### Archivos que DEBEN existir:
- ✅ `/public/design-system.html` (67 KB aprox)
- ✅ `/public/test-static.html` (nuevo archivo de test)
- ✅ `/vercel.json` (con regex actualizado)
- ✅ `/components/hero-section.tsx` (con `<a>` tag)
- ✅ `/components/footer.tsx` (con `<a>` tag)

### Verificar en build:
```bash
# Después de build, estos archivos deben estar en:
dist/design-system.html
dist/test-static.html
```

---

## 📝 NOTAS TÉCNICAS

### ¿Por qué `<a>` en lugar de `window.location.href`?

1. **Mejor accesibilidad**: Lectores de pantalla detectan links nativos
2. **Funciona sin JS**: Navegación HTML nativa
3. **No se intercepta**: React Router no captura clicks en `<a>` con `target="_blank"`
4. **SEO**: Crawlers pueden seguir el link

### ¿Por qué `target="_blank"`?

- **UX**: El usuario **NO pierde** el estado de la SPA
- **Contexto**: Design System es contenido auxiliar, no navegación principal
- **Comportamiento esperado**: Similar a abrir documentación externa

### ¿El regex es correcto?

**SÍ**. El regex:
```regex
/((?!proyectos/.*\.html|projects/.*\.html|design-system\.html|test-static\.html|sitemap\.xml|robots\.txt|404\.html|.*\..*).*))/
```

**Excluye** (negative lookahead `(?!...)`):
- Archivos `.html` de proyectos
- `design-system.html`
- `test-static.html`
- `sitemap.xml`, `robots.txt`, `404.html`
- Cualquier archivo con extensión (`.*\..*`)

**Captura todo lo demás** → `destination: "/index.html"` (SPA)

---

## ✨ BONUS: Micro-pulse actualizado

**Duración del pulse**: 10 segundos (ultra lento)  
**Escala**: 1.03 (muy sutil, casi imperceptible)

```css
@keyframes micro-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

.micro-pulse {
  animation: micro-pulse 10s ease-in-out infinite;
}
```

---

## 🎉 RESULTADO ESPERADO

✅ **Dot verde**: Click abre Design System en nueva pestaña  
✅ **Footer DS**: Click abre Design System en nueva pestaña  
✅ **URL directa**: `https://jabiergarcia.com/design-system.html` funciona  
✅ **Analytics**: Eventos se registran correctamente  
✅ **No 404**: Nunca más error 404 para Design System

---

**Última actualización**: 14 de marzo de 2026  
**Mantenedor**: Jabier García Sanz
