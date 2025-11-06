# Guía del Sistema de Tema

## Funcionamiento del Sistema de Tema

El portfolio de Jabier García Sanz tiene un sistema de tema completamente integrado con la preferencia del sistema operativo/navegador.

### Características Principales

1. **Detección Automática del Sistema**
   - En la primera visita, el portfolio detecta automáticamente si el usuario tiene configurado el modo oscuro en su sistema operativo o navegador
   - Utiliza la media query `prefers-color-scheme: dark` para esta detección
   - Si el sistema está en modo oscuro, el portfolio se mostrará en modo oscuro
   - Si el sistema está en modo claro, el portfolio se mostrará en modo claro

2. **Sincronización en Tiempo Real**
   - Si el usuario cambia la preferencia de tema en su sistema operativo mientras tiene el portfolio abierto, el portfolio se actualizará automáticamente
   - Esta sincronización SOLO funciona si el usuario NO ha establecido manualmente una preferencia en el portfolio

3. **Preferencia Manual del Usuario**
   - El usuario puede hacer clic en el botón de toggle de tema para cambiar manualmente entre modo claro y oscuro
   - Cuando el usuario hace toggle manual, su preferencia se guarda en `localStorage`
   - Una vez guardada la preferencia manual, el portfolio la respetará y NO se sincronizará automáticamente con cambios del sistema
   - Para volver a la sincronización automática, el usuario tendría que limpiar el localStorage o usar la función `resetToSystemTheme()` (actualmente no expuesta en la UI)

4. **Prevención de FOUC (Flash of Unstyled Content)**
   - El tema se determina y aplica inmediatamente al cargar la página
   - No hay parpadeo o cambio visible de tema durante la carga
   - La función `getInitialTheme()` se ejecuta síncronamente antes del primer render

### Prioridades del Sistema

El sistema sigue esta jerarquía de prioridades:

1. **Preferencia guardada en localStorage** (más alta prioridad)
   - Si existe `theme: 'dark'` → modo oscuro
   - Si existe `theme: 'light'` → modo claro

2. **Preferencia del sistema**
   - Si no hay preferencia guardada, lee `prefers-color-scheme: dark`
   - Se actualiza automáticamente si el sistema cambia

3. **Fallback por defecto**
   - Si no hay soporte para `matchMedia`, usa modo claro por defecto

### Cómo Probar el Sistema

#### Test 1: Primera Visita con Sistema en Modo Oscuro
1. Configura tu sistema operativo en modo oscuro
2. Abre el portfolio en modo incógnito (para evitar localStorage previo)
3. **Resultado esperado**: El portfolio debe aparecer en modo oscuro desde el primer momento

#### Test 2: Primera Visita con Sistema en Modo Claro
1. Configura tu sistema operativo en modo claro
2. Abre el portfolio en modo incógnito
3. **Resultado esperado**: El portfolio debe aparecer en modo claro desde el primer momento

#### Test 3: Sincronización en Tiempo Real
1. Abre el portfolio en modo incógnito (sin preferencia guardada)
2. Cambia la preferencia de tema en tu sistema operativo mientras el portfolio está abierto
3. **Resultado esperado**: El portfolio debe cambiar automáticamente al nuevo tema del sistema

#### Test 4: Preferencia Manual
1. Abre el portfolio
2. Haz clic en el botón de toggle de tema
3. Recarga la página
4. **Resultado esperado**: El portfolio debe mantener el tema que seleccionaste manualmente

#### Test 5: Preferencia Manual NO se Sincroniza
1. Abre el portfolio
2. Haz clic en el botón de toggle para establecer una preferencia manual
3. Cambia el tema de tu sistema operativo
4. **Resultado esperado**: El portfolio NO debe cambiar, debe mantener tu preferencia manual

#### Test 6: Navegadores Sin Soporte de matchMedia
1. Simula un navegador antiguo deshabilitando `window.matchMedia`
2. **Resultado esperado**: El portfolio debe usar modo claro por defecto y no romper

### Compatibilidad con Navegadores

- **Chrome/Edge**: Soporte completo ✅
- **Firefox**: Soporte completo ✅
- **Safari**: Soporte completo ✅
- **Safari iOS**: Soporte completo ✅
- **Navegadores antiguos**: Fallback a modo claro ✅

### Implementación Técnica

**Hook principal**: `/hooks/use-theme.ts`

```typescript
// Funciones disponibles
const { isDark, toggleTheme, resetToSystemTheme } = useTheme();

// isDark: boolean - indica si el tema actual es oscuro
// toggleTheme: () => void - cambia entre claro y oscuro y guarda preferencia
// resetToSystemTheme: () => void - elimina preferencia guardada y vuelve a sincronizar con sistema
```

**Componente de UI**: `/components/theme-toggle.tsx`

- Botón animado con icono de sol (modo oscuro activo) o luna (modo claro activo)
- Animaciones fluidas con Motion (motion/react)
- Accesible con aria-labels en español

### Paleta de Colores

**Modo Claro**:
- Background principal: `#fffbf8`
- Foreground principal: `#10252a`
- Acentos: `#d8f878`, `#ffccb6`, `#70b8ba`, `#2d5367`

**Modo Oscuro**:
- Los colores se invierten automáticamente gracias a las CSS variables en `/styles/globals.css`
- La clase `dark` en el `<html>` activa las variables de tema oscuro

### Mejoras Recientes (Octubre 2025)

1. ✅ Corrección de importación de `motion/react` en lugar de `framer-motion`
2. ✅ Mejora del fallback cuando `matchMedia` no está disponible
3. ✅ Optimización del listener de cambios con mejor manejo de tipos
4. ✅ Añadida función `resetToSystemTheme()` para futuras mejoras de UX
5. ✅ Documentación completa del sistema

### Notas para Desarrollo Futuro

Si en el futuro se desea añadir una opción de "Usar tema del sistema" en la UI:

```typescript
// En el componente donde se muestre la opción
<button onClick={() => resetToSystemTheme()}>
  Usar tema del sistema
</button>
```

Esto eliminaría la preferencia guardada y volvería a la sincronización automática con el sistema.
