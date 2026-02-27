import React, { useState, useEffect, useRef } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  onLoad?: () => void;
  onLoadStart?: () => void;
  onError?: () => void;
  // Responsive image props
  srcSet?: string;
  sizes?: string;
  // Quality optimization props
  priority?: boolean; // For above-the-fold images
  quality?: 'low' | 'medium' | 'high';
  // Blur placeholder
  blurDataURL?: string;
  placeholder?: 'blur' | 'empty';
}

/**
 * Enhanced image component with:
 * - Automatic fallback on error
 * - Native lazy loading
 * - Responsive images with srcset
 * - Optimized loading strategies
 * - Better rendering quality
 */
export function ImageWithFallback({
  src,
  alt,
  fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18"%3EImagen no disponible%3C/text%3E%3C/svg%3E',
  onLoad,
  onLoadStart,
  onError,
  srcSet,
  sizes,
  priority = false,
  quality = 'high',
  blurDataURL,
  placeholder = 'blur',
  className = '',
  style,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const loadAttempts = useRef(0);

  // Update src when prop changes
  useEffect(() => {
    if (src !== imgSrc && !hasError) {
      console.log(`[ImageWithFallback] Source changed:`, { from: imgSrc, to: src, alt });
      setImgSrc(src);
      setHasError(false);
      loadAttempts.current = 0;
    }
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    console.log(`[ImageWithFallback] ✓ Image loaded successfully:`, {
      src: imgSrc,
      alt,
      priority,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      currentSrc: img.currentSrc
    });
    setHasError(false);
    onLoad?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    loadAttempts.current++;
    
    // Only log errors if it's not a Supabase storage URL (those are expected to fail without setup)
    const isSupabaseStorage = imgSrc.includes('supabase.co/storage');
    
    if (!isSupabaseStorage) {
      console.error(`[ImageWithFallback] ✗ Failed to load image (attempt ${loadAttempts.current}):`, {
        src,
        currentSrc: imgSrc,
        alt,
        error: e.type,
        priority,
        willUseFallback: imgSrc !== fallback
      });
    }
    
    // Only set fallback if we haven't already done so
    if (imgSrc !== fallback) {
      if (!isSupabaseStorage) {
        console.log(`[ImageWithFallback] → Switching to fallback for: ${alt}`);
      }
      setImgSrc(fallback);
    }
    setHasError(true);
    onError?.();
  };

  const handleLoadStart = () => {
    console.log(`[ImageWithFallback] ⟳ Loading started:`, { src: imgSrc, alt, priority });
    onLoadStart?.();
  };

  // Determine loading attribute
  const loadingAttr = priority ? 'eager' : 'lazy';
  
  // Determine fetchpriority (lowercase for React/DOM compatibility)
  const fetchPriorityAttr = priority ? 'high' : 'auto';

  // Quality class for image-rendering
  // Default to high-quality (smooth) unless explicitly set to crisp
  const qualityClass = quality === 'low' 
    ? 'image-render-crisp' 
    : quality === 'medium'
    ? 'image-render-auto'
    : ''; // Empty for high quality (default CSS handles it)

  // Combined className
  const combinedClassName = `${className} ${qualityClass} ${hasError ? 'image-error' : ''}`.trim();

  // Style - always visible, no fade transitions that could cause issues
  const combinedStyle: React.CSSProperties = {
    ...style,
  };

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loadingAttr as 'lazy' | 'eager'}
      // Use lowercase 'fetchpriority' for DOM compatibility
      {...(fetchPriorityAttr && { fetchpriority: fetchPriorityAttr })}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      onLoadStart={handleLoadStart}
      className={combinedClassName}
      style={combinedStyle}
      {...props}
    />
  );
}