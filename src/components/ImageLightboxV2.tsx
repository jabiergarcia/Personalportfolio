import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Info, ZoomIn, ZoomOut } from 'lucide-react';
import { useLightbox } from '../contexts/lightbox-context';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageData {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageLightboxV2Props {
  images: ImageData[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;
const PAN_THRESHOLD = 5; // pixels before activating pan
const DOUBLE_TAP_DELAY = 300; // ms

type GestureState = 'idle' | 'tapping' | 'panning' | 'pinching' | 'swiping';

const ImageLightboxV2: React.FC<ImageLightboxV2Props> = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNavigate
}) => {
  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  
  // UI state
  const [showInfo, setShowInfo] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Gesture state machine
  const [gestureState, setGestureState] = useState<GestureState>('idle');
  const gestureStartRef = useRef<{ x: number; y: number; zoom: number } | null>(null);
  const currentPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastTapTimeRef = useRef(0);
  const initialDistanceRef = useRef<number | null>(null);
  const swipeStartRef = useRef(0);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageTransformRef = useRef<HTMLDivElement>(null);
  const { setIsLightboxOpen } = useLightbox();

  // Reset zoom and pan when image changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsZoomed(false);
    setShowInfo(false);
    setGestureState('idle');
    gestureStartRef.current = null;
    currentPosRef.current = null;
  }, [currentIndex]);

  // Update lightbox context
  useEffect(() => {
    setIsLightboxOpen(isOpen);
    if (isOpen) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }
    return () => {
      document.body.classList.remove('lightbox-open');
      setIsLightboxOpen(false);
    };
  }, [isOpen, setIsLightboxOpen]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    if (!isOpen || isZoomed) return;
    
    let timer: NodeJS.Timeout;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 3000);
    };

    resetTimer();
    const events = ['mousemove', 'touchstart', 'keydown'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(timer);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [isOpen, isZoomed]);

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  }, [currentIndex, images.length, onNavigate]);

  const goToPrevious = useCallback(() => {
    if (images.length <= 1) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIndex);
  }, [currentIndex, images.length, onNavigate]);

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setZoom(prev => {
      const newZoom = Math.min(prev + ZOOM_STEP, MAX_ZOOM);
      setIsZoomed(newZoom > 1);
      return newZoom;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => {
      const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
      setIsZoomed(newZoom > 1);
      if (newZoom === 1) {
        setPan({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsZoomed(false);
  }, []);

  // Apply transform using direct DOM manipulation for better performance
  const applyTransform = useCallback((newZoom: number, newPan: { x: number; y: number }) => {
    if (imageTransformRef.current) {
      imageTransformRef.current.style.transform = `scale(${newZoom}) translate(${newPan.x / newZoom}px, ${newPan.y / newZoom}px)`;
    }
  }, []);

  // Unified touch/mouse event handlers
  const handlePointerDown = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Ignore if clicking on buttons or interactive elements
    if (target.closest('button') || target.tagName === 'BUTTON') {
      return;
    }

    // Touch events
    if ('touches' in e) {
      if (e.touches.length === 2) {
        // Pinch zoom start
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        initialDistanceRef.current = distance;
        setGestureState('pinching');
        gestureStartRef.current = { x: 0, y: 0, zoom };
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        gestureStartRef.current = { x: touch.clientX, y: touch.clientY, zoom };
        currentPosRef.current = { x: touch.clientX, y: touch.clientY };
        setGestureState('tapping');
        
        if (!isZoomed) {
          swipeStartRef.current = touch.clientX;
        }
      }
    } else {
      // Mouse events
      if (!isZoomed) return;
      
      gestureStartRef.current = { x: e.clientX, y: e.clientY, zoom };
      currentPosRef.current = { x: e.clientX, y: e.clientY };
      setGestureState('tapping');
    }
  }, [isZoomed, zoom]);

  const handlePointerMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (gestureState === 'idle') return;

    const target = e.target as HTMLElement;
    if (target.closest('button') || target.tagName === 'BUTTON') {
      return;
    }

    // Touch events
    if ('touches' in e) {
      if (e.touches.length === 2 && gestureState === 'pinching' && initialDistanceRef.current) {
        // Pinch zoom
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        const scale = distance / initialDistanceRef.current;
        const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, (gestureStartRef.current?.zoom || 1) * scale));
        
        setZoom(newZoom);
        setIsZoomed(newZoom > 1);
        applyTransform(newZoom, pan);
        
        if (newZoom === 1) {
          setPan({ x: 0, y: 0 });
        }
      } else if (e.touches.length === 1 && gestureStartRef.current && currentPosRef.current) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - gestureStartRef.current.x;
        const deltaY = touch.clientY - gestureStartRef.current.y;
        const distance = Math.hypot(deltaX, deltaY);
        
        // Increased threshold for mobile to avoid accidental swipe detection
        const mobileThreshold = 15; // Increased from 5 to 15px
        
        if (gestureState === 'tapping' && distance > mobileThreshold) {
          // Threshold exceeded - determine gesture type
          if (isZoomed) {
            setGestureState('panning');
          } else {
            // Only activate swiping if horizontal movement is significant
            const horizontalRatio = Math.abs(deltaX) / (Math.abs(deltaY) + 1);
            if (horizontalRatio > 1.5) {
              setGestureState('swiping');
            }
          }
        }
        
        if (gestureState === 'panning' && isZoomed) {
          // Pan the image
          e.preventDefault();
          const moveDeltaX = touch.clientX - currentPosRef.current.x;
          const moveDeltaY = touch.clientY - currentPosRef.current.y;
          
          setPan(prev => {
            const newPan = {
              x: prev.x + moveDeltaX,
              y: prev.y + moveDeltaY
            };
            applyTransform(zoom, newPan);
            return newPan;
          });
          
          currentPosRef.current = { x: touch.clientX, y: touch.clientY };
        } else if (gestureState === 'swiping' && !isZoomed) {
          // Allow swipe for navigation
          if (Math.abs(deltaX) > 10) {
            e.preventDefault();
          }
        }
      }
    } else {
      // Mouse events
      if (!isZoomed || !gestureStartRef.current || !currentPosRef.current) return;
      
      const deltaX = e.clientX - gestureStartRef.current.x;
      const deltaY = e.clientY - gestureStartRef.current.y;
      const distance = Math.hypot(deltaX, deltaY);
      
      if (gestureState === 'tapping' && distance > PAN_THRESHOLD) {
        setGestureState('panning');
      }
      
      if (gestureState === 'panning') {
        e.preventDefault();
        const moveDeltaX = e.clientX - currentPosRef.current.x;
        const moveDeltaY = e.clientY - currentPosRef.current.y;
        
        setPan(prev => {
          const newPan = {
            x: prev.x + moveDeltaX,
            y: prev.y + moveDeltaY
          };
          applyTransform(zoom, newPan);
          return newPan;
        });
        
        currentPosRef.current = { x: e.clientX, y: e.clientY };
      }
    }
  }, [gestureState, isZoomed, zoom, pan, applyTransform]);

  const handlePointerUp = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Ignore if clicking on buttons or interactive elements
    if (target.closest('button') || target.tagName === 'BUTTON') {
      setGestureState('idle');
      gestureStartRef.current = null;
      currentPosRef.current = null;
      initialDistanceRef.current = null;
      swipeStartRef.current = 0;
      return;
    }

    // Handle double tap for zoom toggle - check for small movement
    if ((gestureState === 'tapping' || gestureState === 'swiping') && gestureStartRef.current) {
      // Calculate total movement distance
      let totalMovement = 0;
      if ('changedTouches' in e && e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - gestureStartRef.current.x;
        const deltaY = touch.clientY - gestureStartRef.current.y;
        totalMovement = Math.hypot(deltaX, deltaY);
      } else if ('clientX' in e) {
        const deltaX = e.clientX - gestureStartRef.current.x;
        const deltaY = e.clientY - gestureStartRef.current.y;
        totalMovement = Math.hypot(deltaX, deltaY);
      }
      
      // Only detect double tap if movement was minimal (< 15px)
      if (totalMovement < 15) {
        const now = Date.now();
        const timeSinceLastTap = now - lastTapTimeRef.current;
        
        if (timeSinceLastTap < DOUBLE_TAP_DELAY && timeSinceLastTap > 0) {
          // Double tap detected - toggle zoom
          e.preventDefault();
          e.stopPropagation();
          
          if (zoom > 1) {
            handleZoomReset();
          } else {
            // Zoom to 2x at the tap location
            let tapX = 0;
            let tapY = 0;
            
            if ('changedTouches' in e && e.changedTouches.length > 0) {
              const touch = e.changedTouches[0];
              tapX = touch.clientX;
              tapY = touch.clientY;
            } else if ('clientX' in e) {
              tapX = e.clientX;
              tapY = e.clientY;
            }
            
            // Calculate pan to center the tap point
            const container = imageContainerRef.current;
            if (container) {
              const rect = container.getBoundingClientRect();
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const offsetX = tapX - rect.left - centerX;
              const offsetY = tapY - rect.top - centerY;
              
              // Pan to center the tap point at 2x zoom
              const newPan = {
                x: -offsetX * 0.5,
                y: -offsetY * 0.5
              };
              
              setPan(newPan);
              setZoom(2);
              setIsZoomed(true);
              applyTransform(2, newPan);
            } else {
              // Fallback: zoom to center
              setZoom(2);
              setIsZoomed(true);
              applyTransform(2, { x: 0, y: 0 });
            }
          }
          
          // Reset timer to prevent triple tap
          lastTapTimeRef.current = 0;
          
          // Reset gesture state immediately
          setGestureState('idle');
          gestureStartRef.current = null;
          currentPosRef.current = null;
          initialDistanceRef.current = null;
          swipeStartRef.current = 0;
          return;
        }
        
        lastTapTimeRef.current = now;
      }
    }
    
    // Handle swipe navigation - only if significant movement
    if (gestureState === 'swiping' && !isZoomed && gestureStartRef.current) {
      const currentX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
      const distance = swipeStartRef.current - currentX;
      const threshold = 50;
      
      if (Math.abs(distance) > threshold) {
        if (distance > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }
    }
    
    // Reset gesture state
    setGestureState('idle');
    gestureStartRef.current = null;
    currentPosRef.current = null;
    initialDistanceRef.current = null;
    swipeStartRef.current = 0;
  }, [gestureState, zoom, isZoomed, handleZoomReset, applyTransform, goToNext, goToPrevious]);

  // Mouse wheel zoom (desktop)
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isZoomed && zoom === 1) return;
    
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setZoom(prev => {
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta));
      setIsZoomed(newZoom > 1);
      applyTransform(newZoom, pan);
      if (newZoom === 1) {
        setPan({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, [isZoomed, zoom, pan, applyTransform]);

  useEffect(() => {
    const container = imageContainerRef.current;
    if (!container || !isOpen) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [handleWheel, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (!isZoomed) goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (!isZoomed) goToNext();
          break;
        case '+':
        case '=':
          e.preventDefault();
          handleZoomIn();
          break;
        case '-':
        case '_':
          e.preventDefault();
          handleZoomOut();
          break;
        case '0':
          e.preventDefault();
          handleZoomReset();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, onClose, goToPrevious, goToNext, handleZoomIn, handleZoomOut, handleZoomReset]);

  // Backdrop click to close
  const handleBackdropClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (e.target === e.currentTarget && !isZoomed) {
      onClose();
    }
  }, [onClose, isZoomed]);

  // Sync state to transform when zoom/pan changes via buttons
  useEffect(() => {
    applyTransform(zoom, pan);
  }, [zoom, pan, applyTransform]);

  if (!images.length) return null;

  const currentImage = images[currentIndex];
  const canZoomIn = zoom < MAX_ZOOM;
  const canZoomOut = zoom > MIN_ZOOM;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm select-none"
          onClick={handleBackdropClick}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          style={{
            touchAction: isZoomed ? 'none' : 'pan-y',
            overscrollBehavior: 'none',
            cursor: isZoomed 
              ? (gestureState === 'panning' ? 'grabbing' : 'grab') 
              : 'default'
          }}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2.5 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-colors"
            aria-label="Cerrar galería (Escape)"
          >
            <X size={24} />
          </motion.button>

          {/* Zoom controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 left-4 z-50 flex flex-col gap-2"
          >
            <button
              onClick={handleZoomIn}
              disabled={!canZoomIn}
              className="p-2.5 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Ampliar (+ o rueda del ratón)"
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={handleZoomOut}
              disabled={!canZoomOut}
              className="p-2.5 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Reducir (- o rueda del ratón)"
            >
              <ZoomOut size={20} />
            </button>
            {isZoomed && (
              <div className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white rounded-full text-xs text-center">
                {zoom.toFixed(1)}x
              </div>
            )}
          </motion.div>

          {/* Navigation buttons - Desktop */}
          {images.length > 1 && !isZoomed && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : -20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-colors hidden sm:flex items-center justify-center"
                aria-label="Imagen anterior (←)"
              >
                <ChevronLeft size={28} />
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-colors hidden sm:flex items-center justify-center"
                aria-label="Siguiente imagen (→)"
              >
                <ChevronRight size={28} />
              </motion.button>
            </>
          )}

          {/* Navigation buttons - Mobile (subtle) */}
          {images.length > 1 && !isZoomed && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: showControls ? 0.4 : 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/30 backdrop-blur-sm text-white/70 rounded-full sm:hidden active:bg-black/50 active:scale-95 transition-all"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: showControls ? 0.4 : 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-40 p-2 bg-black/30 backdrop-blur-sm text-white/70 rounded-full sm:hidden active:bg-black/50 active:scale-95 transition-all"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={18} />
              </motion.button>
            </>
          )}

          {/* Main image container */}
          <div
            ref={imageContainerRef}
            className="lightbox-image-container absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
          >
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lightbox-content-wrapper relative w-full h-full flex items-center justify-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              
              <div
                ref={imageTransformRef}
                className="relative"
                style={{
                  transformOrigin: 'center center',
                  willChange: gestureState === 'idle' ? 'auto' : 'transform',
                  transition: gestureState === 'idle' ? 'transform 0.1s ease-out' : 'none'
                }}
              >
                <ImageWithFallback
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className="w-auto h-auto object-contain rounded-lg shadow-2xl select-none pointer-events-none"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    imageRendering: 'auto'
                  }}
                  onLoad={() => setIsLoading(false)}
                  onLoadStart={() => setIsLoading(true)}
                  priority={true}
                  quality="high"
                  placeholder="empty"
                />
              </div>
            </motion.div>
          </div>

          {/* Info badge - COMPLETELY FIXED POSITION */}
          {(currentImage.title || currentImage.description) && (
            <>
              {/* Info button - isolated and fixed */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
                className="absolute bottom-24 left-4 z-40 w-12 h-12 bg-black/70 backdrop-blur-md rounded-lg shadow-xl border border-white/10 flex items-center justify-center cursor-pointer transition-colors hover:bg-black/80 pointer-events-auto"
                style={{ 
                  opacity: showControls ? 1 : 0,
                  transition: 'opacity 0.2s ease-in-out',
                  transform: 'translateZ(0)',
                  willChange: 'opacity'
                }}
                aria-label={showInfo ? 'Ocultar información' : 'Mostrar información'}
              >
                <Info size={20} className="text-white" />
              </button>
              
              {/* Info panel - completely independent positioning */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-24 left-20 z-40 bg-black/70 backdrop-blur-md rounded-lg shadow-xl border border-white/10 p-4 max-w-[280px] sm:max-w-[320px] pointer-events-auto"
                    style={{
                      transform: 'translateZ(0)',
                      willChange: 'transform, opacity'
                    }}
                  >
                    {currentImage.title && (
                      <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                        {currentImage.title}
                      </h3>
                    )}
                    {currentImage.description && (
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                        {currentImage.description}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-sm text-white rounded-full text-sm font-medium z-40 pointer-events-none"
            >
              {currentIndex + 1} / {images.length}
            </motion.div>
          )}

          {/* Navigation dots - Mobile */}
          {images.length > 1 && images.length <= 8 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 sm:hidden left-1/2 -translate-x-1/2 flex gap-2 z-40 pointer-events-auto"
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </motion.div>
          )}

          {/* Hint overlay */}
          <AnimatePresence>
            {showControls && !isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-32 sm:bottom-28 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm text-white/80 rounded-full text-xs z-30 pointer-events-none"
              >
                {images.length > 1 ? (
                  <>
                    <span className="hidden sm:inline">← Desliza o usa las flechas →</span>
                    <span className="sm:hidden">Desliza para navegar • Doble tap para ampliar</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Doble clic para ampliar</span>
                    <span className="sm:hidden">Doble tap para ampliar</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightboxV2;
