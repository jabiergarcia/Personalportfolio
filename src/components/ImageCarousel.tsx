import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Image, Maximize, BarChart3, Target, Users, Lightbulb, Building2, Heart, Route, Settings, Palette, TestTube, Layers, Paintbrush } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLightbox } from '../contexts/lightbox-context';
import { useTouchSwipe } from '../hooks/use-touch-swipe';

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
    icon?: 'benchmark' | 'dafo' | 'interviews' | 'insights' | 'business' | 'empathy' | 'journey' | 'prioritization' | 'wireframes' | 'testing' | 'architecture' | 'branding';
    layout?: 'full' | 'half';
  }>;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openLightbox } = useLightbox();

  const getIcon = useCallback((iconType: string) => {
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
        return Image;
    }
  }, []);

  const handleOptionClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const nextOption = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevOption = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Use custom touch swipe hook for consistent gesture handling
  // MUST be defined BEFORE handleOpenLightbox to avoid "Cannot access before initialization"
  const { isDragging, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSwipe({
    swipeThreshold: 50,
    tapThreshold: 10,
    onSwipeLeft: nextOption,
    onSwipeRight: prevOption,
  });

  // Lightbox handler - only open if not dragging
  const handleOpenLightbox = useCallback((index: number) => {
    // Don't open lightbox if user was dragging
    if (isDragging) {
      return;
    }
    
    // Prepare images with complete data for lightbox
    const lightboxImages = images.map(img => ({
      src: img.src,
      alt: img.alt,
      title: img.title,
      description: img.description
    }));
    openLightbox(lightboxImages, index);
  }, [images, isDragging, openLightbox]);

  // Get current image icon
  const getCurrentIcon = useCallback(() => {
    const currentImageIcon = images[activeIndex]?.icon;
    return getIcon(currentImageIcon || 'default');
  }, [activeIndex, images, getIcon]);

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

  // Animation effect with cleanup
  useEffect(() => {
    if (!images.length) return;
    
    const timers: NodeJS.Timeout[] = [];
    
    images.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => {
          if (prev.includes(i)) return prev;
          return [...prev, i];
        });
      }, 180 * i);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [images.length]);

  // Early return if no images
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No hay imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile version - full carousel */}
      {isMobile ? (
        <div className="relative w-full max-w-sm mx-auto">

          {/* Carousel Items */}
          <div 
            ref={containerRef}
            className="relative h-[400px] sm:h-[450px] overflow-hidden rounded-lg border-2 border-foreground/60 shadow-lg"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((image, index) => {
              const isActive = index === activeIndex;
              const isAnimated = animatedOptions.includes(index);
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{
                    opacity: isAnimated ? (isActive ? 1 : 0) : 0,
                    transform: isAnimated 
                      ? (isActive ? 'translateX(0) scale(1)' : 'translateX(-100%) scale(0.95)')
                      : 'translateX(-100%) scale(0.95)',
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                >
                  <div 
                    className="w-full h-full relative overflow-hidden rounded-lg bg-muted cursor-pointer group"
                    onClick={() => {
                      // Only open on click (desktop) or tap without drag (mobile)
                      if (!isDragging) {
                        handleOpenLightbox(index);
                      }
                    }}
                  >
                    <ImageWithFallback
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                      style={{
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        imageRendering: 'auto'
                      }}
                      priority={index < 3}
                      quality="high"
                      placeholder="blur"
                    />
                    
                    {/* Zoom icon - always visible on mobile */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-full p-2.5 shadow-lg border-2 border-white/80 dark:border-slate-700/80">
                        <Maximize size={20} className="text-slate-900 dark:text-white" />
                      </div>
                    </div>
                    
                    {/* Shadow overlay - improved for better legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Semi-transparent band similar to desktop */}
                    <div 
                      className="absolute left-0 right-0 bottom-0 h-[120px] pointer-events-none transition-all duration-500"
                      style={{
                        borderRadius: '0 0 8px 8px',
                        boxShadow: 'inset 0 -120px 120px -120px rgba(0,0,0,0.9), inset 0 -120px 120px -80px rgba(0,0,0,0.7)'
                      }}
                    />
                    
                    {/* Darkening overlay for inactive images */}
                    <div 
                      className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                        isActive ? 'opacity-0' : 'opacity-40'
                      }`}
                    />
                    
                    {/* Content - positioned lower to align with semi-transparent band */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 pb-4">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="min-w-[56px] max-w-[56px] h-[56px] flex items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-[10px] border-2 border-white/90 dark:border-slate-700/90 rounded-md shadow-xl">
                          {React.createElement(getIcon(image.icon || 'benchmark'), { 
                            size: 28, 
                            className: "text-slate-900 dark:text-white" 
                          })}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                            {image.title || `Imagen ${index + 1}`}
                          </h3>
                          <p className="text-base text-white/95 drop-shadow-md">
                            {image.description || image.alt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`w-3 h-3 transition-all duration-300 rounded-sm ${
                  index === activeIndex 
                    ? 'bg-primary scale-125 shadow-lg' 
                    : 'bg-primary/40 hover:bg-primary/60'
                }`}
                aria-label={`Ir a ${images[index].title || `imagen ${index + 1}`}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop version - horizontal expandable layout */
        <div className="options flex w-full max-w-5xl h-[520px] mx-auto items-stretch relative rounded-lg overflow-hidden border-2 border-foreground/60 bg-background shadow-lg">
          {images.map((image, index) => {
            const isActive = activeIndex === index;
            const isAnimated = animatedOptions.includes(index);
            
            return (
              <div
                key={index}
                className="option relative flex flex-col justify-end overflow-hidden cursor-pointer will-change-[flex-grow] bg-muted"
                style={{
                  backfaceVisibility: 'hidden',
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? 'translateX(0)' : 'translateX(-60px)',
                  transition: isAnimated 
                    ? 'opacity 700ms ease-in-out, transform 700ms ease-in-out, flex-grow 500ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 400ms ease-out, border-color 400ms ease-out'
                    : 'none',
                  minWidth: '60px',
                  minHeight: '100px',
                  borderColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--foreground) / 0.6)',
                  boxShadow: isActive 
                    ? '0 20px 60px rgba(0,0,0,0.30)' 
                    : '0 10px 30px rgba(0,0,0,0.15)',
                  flex: isActive ? '7 1 0%' : '1 1 0%',
                  zIndex: isActive ? 2 : 1
                }}
                onClick={() => handleOptionClick(index)}
              >

                
                {/* Background Image */}
                <div 
                  className="absolute inset-0 w-full h-full group/image"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isActive) {
                      handleOpenLightbox(index, e);
                    } else {
                      handleOptionClick(index);
                    }
                  }}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: 'center',
                      transform: isActive ? 'scale(1) translateZ(0)' : 'scale(1.2) translateZ(0)',
                      transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease-out',
                      opacity: isActive ? 1 : 0.9,
                      backfaceVisibility: 'hidden',
                      imageRendering: 'auto'
                    }}
                    priority={index < 3}
                    quality="high"
                    placeholder="blur"
                  />
                  
                  {/* Hover overlay with appropriate icon */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover/image:scale-100 transition-transform duration-300 shadow-xl border-2 border-white/80 dark:border-slate-700/80">
                      {isActive ? (
                        <Maximize size={28} className="text-slate-900 dark:text-white" />
                      ) : (
                        <div className="w-7 h-7 flex items-center justify-center">
                          <div className="w-3 h-3 bg-slate-900 dark:bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Shadow effect */}
                <div 
                  className="shadow absolute left-0 right-0 pointer-events-none"
                  style={{
                    bottom: isActive ? '0' : '-40px',
                    height: '90px',
                    borderRadius: '12px 12px 0 0',
                    transition: 'bottom 500ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isActive 
                      ? 'inset 0 -90px 90px -90px rgba(0,0,0,0.8), inset 0 -90px 90px -60px rgba(0,0,0,0.6)' 
                      : 'inset 0 -90px 0px -90px rgba(0,0,0,0.8), inset 0 -90px 0px -60px rgba(0,0,0,0.6)'
                  }}
                />
                
                {/* Darkening overlay for inactive images */}
                <div 
                  className="absolute inset-0 bg-black pointer-events-none"
                  style={{
                    opacity: isActive ? 0 : 0.4,
                    transition: 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                
                {/* Label with icon and info */}
                <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-[2] pointer-events-none px-4 gap-3 w-full">
                  <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-white/90 dark:border-slate-700/90 flex-shrink-0 flex-grow-0 transition-all duration-200 rounded-md">
                    {React.createElement(getIcon(image.icon || 'benchmark'), { 
                      size: 24, 
                      className: "text-slate-900 dark:text-white" 
                    })}
                  </div>
                  <div className="info whitespace-pre relative">
                    <div 
                      className="main font-bold text-lg transition-all duration-700 ease-in-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                        color: '#ffffff',
                        textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      {image.title || `Imagen ${index + 1}`}
                    </div>
                    <div 
                      className="sub text-base transition-all duration-700 ease-in-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                        color: 'rgba(255,255,255,0.95)',
                        textShadow: '0 1px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      {image.description || 'Click para ampliar'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;