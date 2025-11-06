import React, { createContext, useContext, useState, useMemo, ReactNode, useCallback } from 'react';
import ImageLightboxV2 from '../components/ImageLightboxV2';

interface ImageData {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface LightboxContextType {
  isLightboxOpen: boolean;
  setIsLightboxOpen: (isOpen: boolean) => void;
  openLightbox: (images: string[] | ImageData[], startIndex?: number) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const useLightbox = () => {
  const context = useContext(LightboxContext);
  if (context === undefined) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
};

interface LightboxProviderProps {
  children: ReactNode;
}

export const LightboxProvider: React.FC<LightboxProviderProps> = ({ children }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<ImageData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((images: string[] | ImageData[], startIndex: number = 0) => {
    // Convert strings to ImageData if needed
    const imageData: ImageData[] = images.map((img, index) => 
      typeof img === 'string' 
        ? { src: img, alt: `Imagen ${index + 1}` }
        : img
    );
    setLightboxImages(imageData);
    setCurrentIndex(startIndex);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    // Clear images after animation completes (250ms duration + 50ms buffer)
    setTimeout(() => {
      setLightboxImages([]);
      setCurrentIndex(0);
    }, 300);
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const value = useMemo(() => ({ 
    isLightboxOpen, 
    setIsLightboxOpen,
    openLightbox,
    closeLightbox
  }), [isLightboxOpen, openLightbox, closeLightbox]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <ImageLightboxV2
        images={lightboxImages}
        isOpen={isLightboxOpen}
        currentIndex={currentIndex}
        onClose={closeLightbox}
        onNavigate={handleNavigate}
      />
    </LightboxContext.Provider>
  );
};