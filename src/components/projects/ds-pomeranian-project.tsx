import { memo, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '../scroll-reveal';
import { MosaicGallery, MosaicItem } from '../mosaic-gallery';
import { ThemeToggle } from '../theme-toggle';
import { RelatedProjects } from '../related-projects';
import { ShareProject } from '../share-project';
import { ProjectDetails } from './project-details';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { getShareableProjectUrl } from '../../utils/projects-data';

interface PomeranianProjectProps {
  onNavigateHome: () => void;
  onNavigateToProjects: () => void;
  onProjectClick?: (projectId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

// Memoized section component to prevent unnecessary re-renders
const GallerySection = memo(({ title, description, items, layout = 'asymmetric' }: {
  title: string;
  description: string;
  items: MosaicItem[];
  layout?: 'asymmetric' | 'balanced' | 'stacked';
}) => (
  <div className="mb-16">
    <h3 className="text-2xl font-semibold text-foreground mb-4">{title}</h3>
    <p className="text-muted-foreground mb-6 leading-relaxed">
      {description}
    </p>
    <MosaicGallery items={items} layout={layout} />
  </div>
));

GallerySection.displayName = 'GallerySection';

export function PomeranianProject({ onNavigateHome, onNavigateToProjects, onProjectClick, isDark, onToggleTheme }: PomeranianProjectProps) {
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    let ticking = false;
    let lastY = 0;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastY);
          
          // Only trigger if scroll difference is significant
          if (scrollDifference > 5) {
            if (currentScrollY < lastY || currentScrollY < 100) {
              setIsNavVisible(true);
            } else if (currentScrollY > 100 && currentScrollY > lastY) {
              setIsNavVisible(false);
            }
            
            lastY = currentScrollY;
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projectDetails = [
    {
      label: "Creación del proyecto",
      value: "2025"
    },
    {
      label: "Personas participantes",
      value: "1 persona"
    },
    {
      label: "Modalidad del proyecto",
      value: "DS Foundations"
    },
    {
      label: "Duración del proyecto",
      value: "4 semanas"
    }
  ];

  // ============================================
  // GUÍA DE ESTILOS - Style Guide Images
  // ============================================
  
  // Atomic Design - 1 imagen
  const atomicDesignItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Atomic%20Design/Atomic%20Design.png",
      alt: "Metodología Atomic Design aplicada al sistema Pomeranian - Átomos, Moléculas, Organismos, Templates y Páginas",
      title: "Atomic Design",
      description: "Arquitectura modular del sistema",
      icon: 'architecture',
      type: 'image',
      span: 'wide'
    }
  ];

  // Colores - 2 imágenes
  const colorsItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Colores/Colores%20principales.png",
      alt: "Colores principales del Design System Pomeranian con valores HEX y tokens semánticos",
      title: "Colores Principales",
      description: "Paleta base y tokens semánticos",
      icon: 'branding',
      type: 'image',
      span: 'medium'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Colores/Paleta%20de%20colores.png",
      alt: "Paleta de colores extendida con escala de grises y variaciones tonales",
      title: "Paleta Extendida",
      description: "Escalas tonales y grises",
      icon: 'branding',
      type: 'image',
      span: 'medium'
    }
  ];

  // Tipografía - 1 imagen
  const typographyItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Tipografia/Tipografia.png",
      alt: "Sistema tipográfico completo con jerarquía de títulos, textos y especificaciones de uso",
      title: "Sistema Tipográfico",
      description: "Jerarquía, escalado y tokens",
      icon: 'wireframes',
      type: 'image',
      span: 'tall'
    }
  ];

  // Sombras - 1 imagen
  const shadowsItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Sombras/Sombras.png",
      alt: "Sistema de elevación con tokens de sombras para crear jerarquía y profundidad visual",
      title: "Sistema de Sombras",
      description: "Elevación y profundidad visual",
      icon: 'layers',
      type: 'image',
      span: 'small'
    }
  ];

  // Grid - 1 imagen
  const gridItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Grid/Grid.png",
      alt: "Sistema de grid mobile de 4 columnas con márgenes y gutters optimizados para dispositivos móviles",
      title: "Grid Mobile",
      description: "Sistema de 4 columnas optimizado para mobile",
      icon: 'architecture',
      type: 'image',
      span: 'tall'
    }
  ];

  // Espaciado - 1 imagen
  const spacingItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Numeros/Tokens%20numeros.png",
      alt: "Sistema de espaciado con tokens numéricos para padding, margin y dimensionado",
      title: "Tokens Numéricos",
      description: "Espaciado, padding y margin",
      icon: 'benchmark',
      type: 'image',
      span: 'medium'
    }
  ];

  // ============================================
  // COMPONENTES - Components Images (solo 3 componentes de ejemplo)
  // ============================================

  // Avatar - 3 imágenes
  const avatarItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Avatar/Componente%20avatar.png",
      alt: "Componente Avatar - Anatomía y estructura del componente con todos sus elementos",
      title: "Componente Avatar",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'medium'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Avatar/Propiedades%20avatar.png",
      alt: "Propiedades del Avatar - Tamaños, estados y variantes del componente",
      title: "Propiedades",
      description: "Tamaños, estados y variantes",
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Avatar/Variables%20avatar.png",
      alt: "Variables del Avatar - Tokens y valores para personalización del componente",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Accordion - 3 imágenes
  const accordionItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Accordion/Componente%20accordion.png",
      alt: "Componente Accordion - Anatomía y estructura del componente expandible",
      title: "Componente Accordion",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'wide'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Accordion/Propiedades%20accordion.png",
      alt: "Propiedades del Accordion - Estados expandido/colapsado y variantes",
      title: "Propiedades",
      description: "Estados y variantes",
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Accordion/Variables%20accordion.png",
      alt: "Variables del Accordion - Tokens para personalización y comportamiento",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Button - 3 imágenes
  const buttonItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Button/Componente%20button.png",
      alt: "Componente Button - Anatomía y estructura del componente de acción",
      title: "Componente Button",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Button/Propiedades%20button.png",
      alt: "Propiedades del Button - Variantes, estados y tamaños del componente",
      title: "Propiedades",
      description: "Variantes, estados y tamaños",
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Button/Variables%20button.png",
      alt: "Variables del Button - Tokens para personalización de colores, padding y bordes",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'medium'
    }
  ];

  // Card - 3 imágenes
  const cardItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Card/Componente%20card.png",
      alt: "Componente Card - Anatomía y estructura del contenedor de información",
      title: "Componente Card",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Card/Propiedades%20card.png",
      alt: "Propiedades del Card - Variantes de elevación, padding y organización de contenido",
      title: "Propiedades",
      description: "Elevación, padding y contenido",
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Card/Vaeriables%20card.png",
      alt: "Variables del Card - Tokens para bordes, sombras y espaciado interno",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Carousel - 3 imágenes
  const carouselItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Carousel/Componente%20carousel.png",
      alt: "Componente Carousel - Anatomía y estructura del componente de deslizamiento",
      title: "Componente Carousel",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'wide'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Carousel/Dots%20carousel.png",
      alt: "Indicadores de navegación del Carousel - Sistema de dots para control de slides",
      title: "Indicadores Dots",
      description: "Navegación y control de slides",
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Carousel/Propiedades%20carousel.png",
      alt: "Propiedades del Carousel - Variantes, estados y configuración de transiciones",
      title: "Propiedades",
      description: "Variantes y transiciones",
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Checkbox - 3 imágenes
  const checkboxItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Checkbox/Componente%20checkbox.png",
      alt: "Componente Checkbox - Anatomía y estructura del componente de selección",
      title: "Componente Checkbox",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Checkbox/Propiedades%20checkbox.png",
      alt: "Propiedades del Checkbox - Estados checked, unchecked, indeterminate y disabled",
      title: "Propiedades",
      description: "Estados y variantes",
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Checkbox/Variables%20checkbox.png",
      alt: "Variables del Checkbox - Tokens para colores, tamaños y espaciado",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'medium'
    }
  ];

  // Dropdown - 6 imágenes
  const dropdownItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Dropdown/Componente%20dropdown.png",
      alt: "Componente Dropdown - Anatomía y estructura del menú desplegable",
      title: "Componente Dropdown",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'medium'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Dropdown/Propiedades%20dropdown.png",
      alt: "Propiedades generales del Dropdown - Estados y configuración inicial",
      title: "Propiedades Generales",
      description: "Estados y configuración",
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Dropdown/Propiedades%20dropdown-options.png",
      alt: "Propiedades de opciones del Dropdown - Configuración de items individuales",
      title: "Propiedades Options",
      description: "Configuración de items",
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Dropdown/Propiedades%20dropdown-content-options.png",
      alt: "Propiedades del contenido de opciones - Layout y organización del menú",
      title: "Content Options",
      description: "Layout del menú",
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Dropdown/Propiedades%20dropdown-final.png",
      alt: "Propiedades finales del Dropdown - Composición completa y casos de uso",
      title: "Propiedades Finales",
      description: "Composición completa",
      icon: 'insights',
      type: 'image',
      span: 'medium'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Dropdown/Variables%20dropdown.png",
      alt: "Variables del Dropdown - Tokens para colores, espaciado y comportamiento",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // List Item - 3 imágenes
  const listItemItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/List%20Item/Componente%20list%20item.png",
      alt: "Componente List Item - Anatomía y estructura del elemento de lista",
      title: "Componente List Item",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/List%20Item/Propiedades%20list%20item.png",
      alt: "Propiedades del List Item - Estados, variantes y configuración de contenido",
      title: "Propiedades",
      description: "Estados y variantes",
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/List%20Item/Variables%20list%20item.png",
      alt: "Variables del List Item - Tokens para espaciado, colores y tipografía",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Modal - 3 imágenes
  const modalItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Modal/Componente%20modal.png",
      alt: "Componente Modal - Anatomía y estructura de la ventana modal",
      title: "Componente Modal",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'wide'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Modal/Propiedades%20modal.png",
      alt: "Propiedades del Modal - Tamaños, posicionamiento y comportamiento",
      title: "Propiedades",
      description: "Tamaños y comportamiento",
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Modal/Variables%20modal.png",
      alt: "Variables del Modal - Tokens para overlay, dimensiones y animaciones",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Text Area - 3 imágenes
  const textAreaItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Area/Componente%20text%20area.png",
      alt: "Componente Text Area - Anatomía y estructura del campo de texto multilínea",
      title: "Componente Text Area",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Area/Propiedades%20text%20area.png",
      alt: "Propiedades del Text Area - Estados, tamaños y configuración de altura",
      title: "Propiedades",
      description: "Estados y tamaños",
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Area/Variables%20text%20area.png",
      alt: "Variables del Text Area - Tokens para bordes, padding y redimensionamiento",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'medium'
    }
  ];

  // Text Input - 3 imágenes
  const textInputItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Input/Componente%20text%20input.png",
      alt: "Componente Text Input - Anatomía y estructura del campo de entrada",
      title: "Componente Text Input",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'medium'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Input/Propiedades%20text%20input.png",
      alt: "Propiedades del Text Input - Estados, variantes y configuración",
      title: "Propiedades",
      description: "Estados y variantes",
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Input/Variables%20text%20input.png",
      alt: "Variables del Text Input - Tokens para bordes, colores y tipografía",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Toggle - 3 imágenes
  const toggleItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Toggle/Componente%20toggle.png",
      alt: "Componente Toggle - Anatomía y estructura del switch binario",
      title: "Componente Toggle",
      description: "Anatomía y estructura base",
      icon: 'architecture',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Toggle/Propiedades%20toggle.png",
      alt: "Propiedades del Toggle - Estados, tamaños y comportamiento",
      title: "Propiedades",
      description: "Estados y tamaños",
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Toggle/Variables%20toggle.png",
      alt: "Variables del Toggle - Tokens para colores, dimensiones y transiciones",
      title: "Variables",
      description: "Tokens y personalización",
      icon: 'wireframes',
      type: 'image',
      span: 'medium'
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Header Navigation - Auto Hide */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 transition-all duration-300 ease-in-out ${
          isNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onNavigateToProjects}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Proyectos
          </Button>
          {isDark !== undefined && onToggleTheme && (
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          )}
        </div>
      </div>

      {/* Spacer para compensar la navbar fixed */}
      <div className="h-[60px]"></div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6 md:py-8 lg:py-10">
        {/* Project Header */}
        <div className="mb-10 md:mb-12 lg:mb-16">
          {/* Hero Header - Limpio y directo */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-6 md:mb-8">
              <div className="space-y-3 mb-4 md:mb-5">
                {/* Fila de Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-accent text-accent-foreground border-none text-sm md:text-xs px-3 py-1">
                    Atomic Design
                  </Badge>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground border-none text-sm md:text-xs px-3 py-1">
                    Estilos
                  </Badge>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground border-none text-sm md:text-xs px-3 py-1">
                    Tokens
                  </Badge>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground border-none text-sm md:text-xs px-3 py-1">
                    Componentes
                  </Badge>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground border-none text-sm md:text-xs px-3 py-1">
                    Escalabilidad
                  </Badge>
                </div>
                
                {/* Fila de Botón Compartir - Solo icono en mobile, completo en desktop */}
                <div className="flex justify-end">
                  {/* Mobile: Solo icono */}
                  <div className="sm:hidden">
                    <ShareProject 
                      projectTitle="Pomeranian | Design System"
                      projectDescription="Sistema de diseño con metodología Atomic Design, tokens visuales y librería de 12 componentes reutilizables. Garantiza consistencia y eficiencia en diseño y desarrollo."
                      projectShortDescription="Design System con Atomic Design y librería de componentes reutilizables."
                      projectUrl={getShareableProjectUrl('ds-pomeranian')}
                      iconOnly={true}
                    />
                  </div>
                  {/* Desktop: Botón completo */}
                  <div className="hidden sm:block">
                    <ShareProject 
                      projectTitle="Pomeranian | Design System"
                      projectDescription="Sistema de diseño con metodología Atomic Design, tokens visuales y librería de 12 componentes reutilizables. Garantiza consistencia y eficiencia en diseño y desarrollo."
                      projectShortDescription="Design System con Atomic Design y librería de componentes reutilizables."
                      projectUrl={getShareableProjectUrl('ds-pomeranian')}
                      iconOnly={false}
                    />
                  </div>
                </div>
              </div>
              
              <h1 className="font-bold text-foreground mb-5 md:mb-6 text-3xl md:text-4xl lg:text-5xl">
                Pomeranian | Design System
              </h1>
            </div>
          </ScrollReveal>

          {/* Description Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="space-y-6 md:space-y-8">
              {/* Introduction limpia */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pomeranian es un Design System desarrollado para dar soporte a la aplicación Chupsee, estableciendo una base sólida de reglas visuales, tokens y componentes reutilizables. Su propósito fue crear un sistema escalable que garantizara consistencia en diseño y desarrollo, facilitando interfaces accesibles y alineadas con la identidad de marca.
              </p>
              
              {/* Problem and Solution - Cards limpias con iconos neutros */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
                {/* Problem Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-destructive/5 via-destructive/10 to-destructive/5 dark:from-destructive/10 dark:via-destructive/20 dark:to-destructive/10 border-2 border-destructive/20 dark:border-destructive/30 hover:border-destructive/40 dark:hover:border-destructive/50 transition-all duration-300">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/10 dark:bg-destructive/20 rounded-bl-full blur-2xl" />
                  
                  <div className="relative p-5 md:p-6">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-destructive/20 dark:bg-destructive/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✕</span>
                      </div>
                      <h3 className="text-foreground">Problema</h3>
                    </div>
                    
                    {/* Content */}
                    <p className="text-base text-foreground/90 dark:text-foreground/95 leading-relaxed">
                      Chupsee requería la creación de un sistema de diseño completo desde cero antes de iniciar el desarrollo. El desafío principal era establecer fundamentos visuales sólidos y una librería de componentes reutilizables que evitaran futuros problemas de consistencia, escalabilidad y eficiencia en el flujo de trabajo.
                    </p>
                  </div>
                </div>
                
                {/* Solution Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/5 via-secondary/15 to-accent/10 dark:from-secondary/10 dark:via-secondary/25 dark:to-secondary/15 border-2 border-secondary/30 dark:border-secondary/40 hover:border-secondary/50 dark:hover:border-secondary/60 transition-all duration-300">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 dark:bg-accent/30 rounded-bl-full blur-2xl" />
                  
                  <div className="relative p-5 md:p-6">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-secondary/30 dark:bg-secondary/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">✓</span>
                      </div>
                      <h3 className="text-foreground">Solución</h3>
                    </div>
                    
                    {/* Content */}
                    <p className="text-base text-foreground/90 dark:text-foreground/95 leading-relaxed">
                      Design System completo basado en metodología Atomic Design con fundamentos visuales: colores, tipografía, espaciado, sombras y grid. Incluye librería de 12 componentes reutilizables completamente documentados que proporcionan a Chupsee una base sólida para crecer de manera consistente y escalable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Project Details */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mb-12 md:mb-16 lg:mb-20">
            <ProjectDetails details={projectDetails} />
          </div>
        </ScrollReveal>

        {/* ============================================ */}
        {/* GUÍA DE ESTILOS SECTION */}
        {/* ============================================ */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground uppercase tracking-wider no-underline">Guía de Estilos</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mb-12">
              Los fundamentos visuales del sistema de diseño definen la base sobre la cual se construyen 
              todos los componentes y experiencias de usuario. Esta guía establece las reglas de color, 
              tipografía, espaciado y otros elementos fundamentales que garantizan consistencia visual.
            </p>

            {/* Atomic Design */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Atomic Design</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Cinco niveles jerárquicos: tomos, moléculas, organismos, templates y páginas</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Arquitectura modular garantizando escalabilidad, reutilización y coherencia</span>
                </li>
              </ul>
              <MosaicGallery items={atomicDesignItems} layout="asymmetric" />
            </div>

            {/* Colores */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Colores</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Tokens semánticos definiendo paleta principal y escala extendida con variaciones tonales</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Validación WCAG 2.1 asegurando contraste suficiente para accesibilidad</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Escalas de grises y variantes para estados interactivos</span>
                </li>
              </ul>
              <MosaicGallery items={colorsItems} layout="balanced" />
            </div>

            {/* Tipografía */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Tipografía</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Escala modular con tokens específicos para tamaño, peso y altura de línea</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Adaptación responsiva optimizando legibilidad en cada breakpoint</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Especificaciones para títulos (H1-H5), cuerpo de texto, etiquetas y elementos interactivos</span>
                </li>
              </ul>
              <MosaicGallery items={typographyItems} layout="asymmetric" />
            </div>

            {/* Sombras */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Sombras</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Tokens de sombras progresivos creando profundidad y jerarquía visual</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Niveles desde subtle hasta elevated para diferentes necesidades de interacción</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Feedback visual en estados hover y focus</span>
                </li>
              </ul>
              <MosaicGallery items={shadowsItems} layout="asymmetric" />
            </div>

            {/* Grid */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Grid</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Sistema de 4 columnas optimizado para experiencias mobile-first</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Márgenes y gutters adaptados aprovechando el espacio de forma inteligente</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Consistencia visual y mejor usabilidad en dispositivos táctiles</span>
                </li>
              </ul>
              <MosaicGallery items={gridItems} layout="asymmetric" />
            </div>

            {/* Espaciado */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Espaciado</h3>
              <ul className="space-y-3 text-muted-foreground mb-6">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Escala consistente basada en múltiplos (4px, 8px, 16px...) para padding, margin y dimensionado</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Sistema modular asegurando ritmo vertical, alineación precisa y coherencia espacial</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>Simplifica implementación manteniendo armonía visual del producto</span>
                </li>
              </ul>
              <MosaicGallery items={spacingItems} layout="balanced" />
            </div>
          </div>
        </ScrollReveal>

        {/* ============================================ */}
        {/* COMPONENTES SECTION */}
        {/* ============================================ */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground uppercase tracking-wider no-underline">Componentes</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-4xl mb-12">
            Esta librería completa de componentes reutilizables documenta anatomía, propiedades y variables 
            de cada elemento del sistema. Cada componente incluye su estructura base, estados interactivos, 
            variantes disponibles y tokens de personalización, garantizando una implementación consistente 
            y mantenibilidad a largo plazo.
          </p>

          {/* Accordion */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Accordion</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Componente expandible para organizar contenido en secciones colapsables. Incluye estados de 
              expansión/contracción, iconografía de indicadores y soporte para acordeones individuales o en grupo. 
              Ideal para FAQs, navegación secundaria y revelación progresiva de información.
            </p>
            <MosaicGallery items={accordionItems} layout="asymmetric" />
          </div>

          {/* Avatar */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Avatar</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Componente para representación visual de usuarios mediante imagen circular. Soporta múltiples 
              tamaños (XS, S, M, L, XL), badges de estado (online/offline/away), fallback con iniciales y 
              agrupación de avatares. Optimizado para interfaces sociales y colaborativas.
            </p>
            <MosaicGallery items={avatarItems} layout="asymmetric" />
          </div>

          {/* Button */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Button</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Componente de acción principal con variantes semánticas (primary, secondary, cancel), 
              estados interactivos completos (default, hover, active, disabled) y tres tamaños 
              responsivos. Incluye soporte para iconos y configuración de ancho completo.
            </p>
            <MosaicGallery items={buttonItems} layout="asymmetric" />
          </div>

          {/* Card */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Card</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Contenedor flexible para agrupar información relacionada con elevación y jerarquía visual. 
              Configuración de padding interno y organización modular de header, body y footer. Ideal para 
              layouts tipo dashboard, galerías y presentación de contenido estructurado.
            </p>
            <MosaicGallery items={cardItems} layout="asymmetric" />
          </div>

          {/* Carousel */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Carousel</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Componente de deslizamiento para presentar contenido en secuencia horizontal o vertical. 
              Incluye controles de navegación (flechas, dots), autoplay configurable, transiciones suaves 
              y soporte para gestos táctiles. Ideal para galerías de imágenes, testimonios y showcases de productos.
            </p>
            <MosaicGallery items={carouselItems} layout="asymmetric" />
          </div>

          {/* Checkbox */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Checkbox</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Control de selección múltiple con tres estados (checked, unchecked, indeterminate) y completa 
              accesibilidad. Documentación incluye anatomía, estados interactivos, variantes de tamaño y 
              sistema de tokens para personalización. Esencial para formularios, selección masiva y configuraciones.
            </p>
            <MosaicGallery items={checkboxItems} layout="asymmetric" />
          </div>

          {/* Dropdown */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Dropdown</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Menú desplegable complejo documentado en profundidad. Incluye anatomía del trigger, contenedor 
              de opciones, estados de cada item, configuración de layout y posicionamiento. Soporta búsqueda, 
              agrupación de items, iconos, y múltiples variantes para diferentes contextos de uso.
            </p>
            <MosaicGallery items={dropdownItems} layout="balanced" />
          </div>

          {/* List Item */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">List Item</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Elemento fundamental para construcción de listas interactivas. Documentación completa de anatomía 
              (leading icon, título, descripción, trailing action), estados (default, hover, active, selected), 
              y configuración de altura. Base para navigation items, menús y contenido estructurado.
            </p>
            <MosaicGallery items={listItemItems} layout="asymmetric" />
          </div>

          {/* Modal */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Modal</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Ventana modal overlay con gestión de focus trap y backdrop. Documentación de anatomía (header, 
              content, footer), tamaños predefinidos (S, M, L), posicionamiento centrado y sistema de tokens 
              para overlay, dimensiones y animaciones de entrada/salida.
            </p>
            <MosaicGallery items={modalItems} layout="asymmetric" />
          </div>

          {/* Text Area */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Text Area</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Campo de texto multilínea para entrada de contenido extenso. Incluye estados de validación 
              (default, error, success), configuración de altura mínima/máxima, contador de caracteres opcional 
              y resize behavior. Tokens para bordes, padding y personalización de scrollbar.
            </p>
            <MosaicGallery items={textAreaItems} layout="asymmetric" />
          </div>

          {/* Text Input */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Text Input</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Campo de entrada de texto de línea única con soporte para iconos leading/trailing, estados de 
              validación, placeholder styling y diferentes tipos (text, email, password, number). Sistema 
              completo de tokens para bordes, estados de focus y personalización tipográfica.
            </p>
            <MosaicGallery items={textInputItems} layout="asymmetric" />
          </div>

          {/* Toggle */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Toggle</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Switch binario interactivo documentado con anatomía del componente, propiedades de estado 
              y comportamiento. La documentación abarca estados on/off, variantes de tamaño (S, M, L), 
              estados interactivos (hover, focus, disabled) y sistema completo de variables para 
              personalización de colores, dimensiones del track y knob, y transiciones animadas.
            </p>
            <MosaicGallery items={toggleItems} layout="asymmetric" />
          </div>

        </div>

        {/* Related Projects */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-16 pt-8 border-t-2 border-border/50">
            <h2 className="text-2xl font-semibold text-foreground mb-4 uppercase tracking-wider no-underline">Más proyectos</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Explora otros casos de estudio donde aplico metodologías de diseño centrado en el usuario para crear experiencias digitales innovadoras.
            </p>
            
            <div className="mb-12">
              <RelatedProjects 
                currentProjectSlug="ds-pomeranian" 
                onProjectClick={onProjectClick} 
              />
            </div>
            
            {/* Ver Todos los Proyectos Button */}
            <ScrollReveal direction="up" delay={0.6}>
              <div className="text-center">
                <Button
                  onClick={onNavigateToProjects}
                  variant="outline"
                  className="border-2 border-secondary text-foreground hover:bg-secondary hover:text-secondary-foreground hover:scale-105 transition-all duration-300"
                >
                  Ver Todos los Proyectos
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default PomeranianProject;