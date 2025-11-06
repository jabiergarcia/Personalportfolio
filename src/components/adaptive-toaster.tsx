import { Toaster } from './ui/sonner';
import { useLightbox } from '../contexts/lightbox-context';

export const AdaptiveToaster = () => {
  const { isLightboxOpen } = useLightbox();

  return (
    <Toaster 
      position="bottom-right"
      style={{
        '--z-index': isLightboxOpen ? '60' : '100',
        '--opacity': isLightboxOpen ? '0' : '1',
        '--scale': isLightboxOpen ? '0.5' : '1',
        '--translate-y': isLightboxOpen ? '60px' : '0px',
        transform: `translateY(var(--translate-y)) scale(var(--scale))`,
        opacity: 'var(--opacity)',
        zIndex: 'var(--z-index)',
        transition: 'all 0.3s ease-in-out',
        pointerEvents: isLightboxOpen ? 'none' : 'auto',
        visibility: isLightboxOpen ? 'hidden' : 'visible',
      } as React.CSSProperties}
      toastOptions={{
        style: {
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-foreground)',
        },
        duration: isLightboxOpen ? 800 : 4000,
      }}
    />
  );
};