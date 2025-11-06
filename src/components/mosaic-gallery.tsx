import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Maximize, Play, BarChart3, Target, Users, Lightbulb, Building2, Heart, Route, Settings, Palette, TestTube, Layers, Paintbrush, Image as ImageIcon } from 'lucide-react';
import { useLightbox } from '../contexts/lightbox-context';
import { useTouchSwipe } from '../hooks/use-touch-swipe';
import { ImageWithFallback } from './figma/ImageWithFallback';

export type MosaicItem = {
  src: string;
  alt: string;
  type?: 'image' | 'video';
  span?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  icon?: 'benchmark' | 'dafo' | 'interviews' | 'insights' | 'business' | 'empathy' | 'journey' | 'prioritization' | 'wireframes' | 'testing' | 'architecture' | 'branding';
  title?: string;
  description?: string;
};

interface MosaicGalleryProps {
  items: MosaicItem[];
  layout?: 'asymmetric' | 'balanced' | 'stacked';
}

export function MosaicGallery({ items, layout = 'asymmetric' }: MosaicGalleryProps) {
  const { openLightbox } = useLightbox();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile with debounce
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    
    let timeoutId: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkIsMobile, 150);
    };
    
    window.addEventListener('resize', debouncedCheck);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedCheck);
    };
  }, []);

  // Use custom touch swipe hook for consistent gesture handling
  // MUST be defined BEFORE handleImageClick to avoid "Cannot access before initialization"
  const { isDragging, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSwipe({
    tapThreshold: 5,
    onTap: undefined, // We'll handle tap via click event
  });

  // Memoize icon getter to avoid recreation
  const getIcon = useCallback((iconType?: string) => {
    switch (iconType) {
      case 'benchmark':
        return BarChart3;
      case 'dafo':
        return Target;
      case 'interviews':
        return Users;
      case 'insights':
        return Lightbulb;
      case 'business':
        return Building2;
      case 'empathy':
        return Heart;
      case 'journey':
        return Route;
      case 'prioritization':
        return Settings;
      case 'wireframes':
        return Palette;
      case 'testing':
        return TestTube;
      case 'architecture':
        return Layers;
      case 'branding':
        return Paintbrush;
      default:
        return ImageIcon;
    }
  }, []);

  // Memoize click handler with better touch detection
  const handleImageClick = useCallback((index: number) => {
    // Don't open if user was dragging/scrolling
    if (isDragging) {
      return;
    }
    
    // Pass complete image data with title and description for lightbox bubble
    const imageItems = items
      .filter(item => item.type !== 'video')
      .map(item => ({
        src: item.src,
        alt: item.alt,
        title: item.title,
        description: item.description
      }));
    
    const imageIndex = items
      .slice(0, index + 1)
      .filter(item => item.type !== 'video')
      .length - 1;
    
    if (items[index].type !== 'video') {
      openLightbox(imageItems, imageIndex);
    }
  }, [items, openLightbox, isDragging]);

  // Memoize grid class getter
  const getGridClass = useCallback((item: MosaicItem) => {
    const span = item.span || 'medium';
    
    switch (span) {
      case 'small':
        return 'col-span-1 row-span-1';
      case 'medium':
        return 'col-span-1 row-span-1';
      case 'large':
        return 'col-span-1 sm:col-span-2 row-span-2';
      case 'wide':
        return 'col-span-1 sm:col-span-2 row-span-1';
      case 'tall':
        return 'col-span-1 row-span-2';
      default:
        return 'col-span-1 row-span-1';
    }
  }, []);

  // Memoize layout class
  const layoutClass = useMemo(() => {
    switch (layout) {
      case 'asymmetric':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px] min-h-[240px]';
      case 'balanced':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px] min-h-[220px]';
      case 'stacked':
        return 'grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[260px] min-h-[260px]';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px] min-h-[240px]';
    }
  }, [layout]);

  // Memoize grid auto rows value
  const gridAutoRows = useMemo(() => {
    return layout === 'balanced' ? '220px' : layout === 'stacked' ? '260px' : '240px';
  }, [layout]);

  return (
    <div className={layoutClass} style={{ gridAutoRows }}>
      {items.map((item, index) => {
        const IconComponent = getIcon(item.icon);
        const isHovered = hoveredIndex === index;
        // Create a stable key using index and src
        const itemKey = `${item.src}-${index}`;
        
        return (
          <div
            key={itemKey}
            className={`${getGridClass(item)} group relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/5 to-accent/5 border-2 border-foreground/60 cursor-pointer`}
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
            onClick={() => handleImageClick(index)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Media Container */}
            {item.type === 'video' ? (
              <video
                src={item.src}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${!isMobile ? 'group-hover:brightness-110' : ''}`}
                loop
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <ImageWithFallback
                src={item.src}
                alt={item.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${!isMobile ? 'group-hover:opacity-90' : ''}`}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  imageRendering: 'auto'
                }}
                priority={index < 6}
                quality="high"
                placeholder="blur"
              />
            )}

            {/* Gradient Overlay - Always visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

            {/* Mobile: Zoom icon in top-right corner - always visible */}
            {isMobile && item.type !== 'video' && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-full p-2.5 shadow-lg border-2 border-white/80 dark:border-slate-700/80">
                  <Maximize size={20} className="text-slate-900 dark:text-white" />
                </div>
              </div>
            )}

            {/* Desktop: Hover overlay with centered icon */}
            {!isMobile && (
              <div className={`absolute inset-0 bg-black/5 transition-opacity duration-300 flex items-center justify-center ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-full p-4 shadow-xl border-2 border-white/80 dark:border-slate-700/80 transition-transform duration-300 ${
                  isHovered ? 'scale-100' : 'scale-75'
                }`}>
                  {item.type === 'video' ? (
                    <Play className="w-7 h-7 text-slate-900 dark:text-white" />
                  ) : (
                    <Maximize className="w-7 h-7 text-slate-900 dark:text-white" />
                  )}
                </div>
              </div>
            )}

            {/* Semi-transparent band similar to carousel */}
            <div 
              className="absolute left-0 right-0 bottom-0 h-[100px] pointer-events-none transition-all duration-500"
              style={{
                borderRadius: '12px',
                boxShadow: 'inset 0 -100px 100px -100px rgba(0,0,0,0.9), inset 0 -100px 100px -60px rgba(0,0,0,0.7)'
              }}
            />
            
            {/* Content with Icon - Bottom - Always visible */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-20 transition-all duration-500">
              <div className="flex items-center gap-3">
                {/* Icon Badge - Always visible */}
                {item.icon && (
                  <div className="min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-[10px] border-2 border-white/90 dark:border-slate-700/90 rounded-md shadow-xl flex-shrink-0">
                    <IconComponent size={24} className="text-slate-900 dark:text-white" />
                  </div>
                )}
                
                {/* Text Content - Always visible with white color and shadow */}
                <div className="flex-1 min-w-0">
                  {item.title && (
                    <h3 className="text-lg font-bold text-white mb-1.5 line-clamp-1 drop-shadow-lg">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-sm text-white/95 line-clamp-2 leading-relaxed drop-shadow-md">
                      {item.description}
                    </p>
                  )}
                  {!item.title && !item.description && (
                    <p className="text-sm text-background/90 font-medium line-clamp-2">
                      {item.alt}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}