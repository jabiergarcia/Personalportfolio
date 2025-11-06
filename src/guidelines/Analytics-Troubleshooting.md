# 🔍 Guía de Diagnóstico de Analytics

## Estado del Sistema

✅ **Sistema Implementado Correctamente**
- Hook: `/hooks/use-analytics.ts` 
- Frontend: Tracking en `App.tsx`
- Backend: API endpoints en `/supabase/functions/server/index.tsx`
- Almacenamiento: KV Store de Supabase
- Panel Admin: `/components/admin-page.tsx`

---

## 📊 ¿Por qué no veo datos en Analytics?

### **1. Verifica que los eventos se estén enviando**

Abre la **Consola del Navegador** (F12 → Console) y busca estos logs:

```
📊 [Analytics] Tracking event: page_view home
✅ [Analytics] Event tracked successfully: page_view
```

Si ves estos logs: ✅ **Los eventos se están enviando correctamente**

Si NO ves estos logs:
- ❌ El hook `useAnalytics()` no se está llamando
- ❌ Hay un error en el tracking

---

### **2. Verifica que el servidor reciba los eventos**

En la consola del servidor (Supabase Functions logs), deberías ver:

```
📊 [Server] Analytics event received: { event_type: 'page_view', page: 'home', session_id: '...' }
✅ [Server] Analytics event stored: analytics_1234567890_abc123
```

Si ves estos logs: ✅ **El servidor está recibiendo y guardando eventos**

Si NO ves estos logs:
- ❌ Problema de red / CORS
- ❌ El fetch no está llegando al servidor
- ❌ Error en la URL del endpoint

---

### **3. Verifica que el panel cargue los datos**

En la consola del navegador cuando entres al panel de admin, deberías ver:

```
📊 [Admin] Fetching analytics from server...
📊 [Server] Found 25 analytics events in database
✅ [Admin] Analytics data received: { totalEvents: 25, pageViews: 15, ... }
```

Si ves estos logs: ✅ **El panel está cargando datos correctamente**

Si NO ves estos logs:
- ❌ Error al hacer GET al endpoint
- ❌ Problema de autenticación
- ❌ Error en el procesamiento de datos

---

## 🐛 Problemas Comunes

### **Problema 1: "Veo 0 eventos pero he navegado por el portfolio"**

**Posibles causas:**
1. **Estás en el panel de admin** mientras navegas
   - ❌ Los eventos se trackean pero tú estás en `/admin`
   - ✅ **Solución:** Sal del panel, navega por el portfolio, luego vuelve al panel

2. **Acabas de resetear analytics**
   - ❌ Todos los eventos fueron eliminados
   - ✅ **Solución:** Navega por el portfolio para generar nuevos eventos

3. **La sesión de sessionStorage está corrupta**
   - ❌ Error al obtener session_id
   - ✅ **Solución:** Abre DevTools → Application → Session Storage → Borra `portfolio_session`

---

### **Problema 2: "Los eventos se envían pero no aparecen en el panel"**

**Diagnóstico:**
```javascript
// En la consola del navegador:
fetch('https://jdylpqwurderryhujqgr.supabase.co/functions/v1/make-server-df6fcedb/analytics', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
}).then(r => r.json()).then(d => console.log(d.summary))
```

Si esto devuelve datos: ✅ **El backend funciona**
- ❌ Problema: El panel no está parseando correctamente
- ✅ **Solución:** Revisa `fetchAnalytics()` en `admin-page.tsx`

Si esto NO devuelve datos:
- ❌ Problema: La base de datos está vacía o hay error en el GET
- ✅ **Solución:** Revisa los logs del servidor

---

### **Problema 3: "Error 401 Unauthorized"**

**Causa:** Token de autenticación inválido o expirado

**Solución:**
1. Verifica que `publicAnonKey` en `/utils/supabase/info.tsx` sea correcto
2. Verifica que el endpoint use `Bearer ${publicAnonKey}`
3. Verifica CORS en el servidor

---

### **Problema 4: "Los números no cambian al refrescar"**

**Causa:** El navegador está cacheando la respuesta

**Solución:**
1. Presiona el botón "Actualizar" (RefreshCw) en el panel
2. Si no funciona, haz Ctrl+Shift+R (hard refresh)
3. Verifica que los logs en consola muestren eventos nuevos

---

## ✅ Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] **Consola del navegador**: ¿Ves logs de `[Analytics]`?
- [ ] **Logs del servidor**: ¿Ves logs de `[Server]`?
- [ ] **Panel de admin**: ¿Ves el mensaje "Estado del Sistema Analytics"?
- [ ] **Session Storage**: ¿Existe `portfolio_session`?
- [ ] **Network tab**: ¿Ves requests a `/analytics` con status 200?
- [ ] **Has navegado fuera del panel**: ¿Saliste del admin antes de testear?

---

## 🔧 Comandos de Debug

### Test manual de tracking:
```javascript
// En la consola del navegador:
localStorage.clear();
sessionStorage.clear();
location.reload();
// Luego navega por el portfolio
```

### Ver todos los eventos en KV:
```javascript
// Desde el panel de admin, en consola:
fetch('https://jdylpqwurderryhujqgr.supabase.co/functions/v1/make-server-df6fcedb/analytics', {
  headers: { 'Authorization': 'Bearer eyJh...' }
})
.then(r => r.json())
.then(d => {
  console.table(d.events);
  console.log('Total events:', d.summary.totalEvents);
})
```

### Forzar un evento de prueba:
```javascript
// En la consola del navegador:
fetch('https://jdylpqwurderryhujqgr.supabase.co/functions/v1/make-server-df6fcedb/analytics', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJh...'
  },
  body: JSON.stringify({
    event_type: 'page_view',
    page: 'test',
    timestamp: new Date().toISOString(),
    user_agent: 'test',
    viewport: '1920x1080',
    session_id: 'test_session_123'
  })
})
.then(r => r.json())
.then(d => console.log('Test event:', d))
```

---

## 📈 Comportamiento Esperado

### **Al navegar por el portfolio:**
- Cada cambio de página genera un evento `page_view`
- Cada clic en un proyecto genera un evento `project_view`
- Cada apertura del modal de contacto genera un evento `contact_open`
- Cada descarga del CV genera un evento `cv_download`

### **En el panel de admin:**
- El botón "Actualizar" hace un nuevo GET para traer datos frescos
- Los números se actualizan en tiempo real al refrescar
- Los eventos recientes muestran los últimos 20 eventos
- Las páginas y proyectos populares se ordenan por número de vistas

---

## 🚀 Tips para Testing

1. **Usa Incognito/Private Mode** para tests limpios
2. **Abre dos ventanas:** una para navegar, otra para ver el panel
3. **Usa la consola** para ver logs en tiempo real
4. **Espera 2-3 segundos** después de cada acción antes de refrescar el panel
5. **No navegues dentro del admin** mientras testeas (sal primero)

---

## 📝 Logging Mejorado Implementado

Todos los componentes ahora tienen logging detallado:

- ✅ **Frontend** (`use-analytics.ts`): Logs de eventos enviados
- ✅ **Backend** (`index.tsx`): Logs de eventos recibidos y guardados
- ✅ **Admin Panel** (`admin-page.tsx`): Logs de datos cargados
- ✅ **Panel UI**: Card de debug con estado del sistema

**Para ver logs:**
- Frontend: F12 → Console
- Backend: Supabase Dashboard → Edge Functions → Logs
