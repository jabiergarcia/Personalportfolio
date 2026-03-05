import { memo, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { LanguageToggle } from '../language-toggle';
import { ProjectNavbar } from './project-navbar';
import { RelatedProjects } from '../related-projects';
import { ShareProject } from '../share-project';
import { ScrollReveal } from '../scroll-reveal';
import { MosaicGallery, MosaicItem } from '../mosaic-gallery';
import { ProjectDetails } from './project-details';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { getShareableProjectUrl } from '../../utils/projects-data';
import { useLanguage } from '../../hooks/use-language';
import { projectsDetailES } from '../../translations/projects-detail-es';
import { projectsDetailEN } from '../../translations/projects-detail-en';

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
  
  const { language, t } = useLanguage();
  const projectDetail = language === 'es' ? projectsDetailES.dsPomeranian : projectsDetailEN.dsPomeranian;

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
      label: t.projectCommon.projectCreation,
      value: projectDetail.details.creation
    },
    {
      label: t.projectCommon.participants,
      value: projectDetail.details.participants
    },
    {
      label: t.projectCommon.methodology,
      value: projectDetail.details.methodology
    },
    {
      label: t.projectCommon.duration,
      value: projectDetail.details.duration
    }
  ];

  // ============================================
  // GUÍA DE ESTILOS - Style Guide Images
  // ============================================
  
  // Atomic Design - 1 imagen
  const atomicDesignItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Atomic%20Design/Atomic%20Design.png",
      alt: projectDetail.styleGuide.atomicDesign.alt,
      title: projectDetail.styleGuide.atomicDesign.title,
      description: projectDetail.styleGuide.atomicDesign.description,
      icon: 'architecture',
      type: 'image',
      span: 'wide'
    }
  ];

  // Colores - 2 imágenes
  const colorsItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Colores/Colores%20principales.png",
      alt: projectDetail.styleGuide.colors.main.alt,
      title: projectDetail.styleGuide.colors.main.title,
      description: projectDetail.styleGuide.colors.main.description,
      icon: 'branding',
      type: 'image',
      span: 'medium'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Colores/Paleta%20de%20colores.png",
      alt: projectDetail.styleGuide.colors.extended.alt,
      title: projectDetail.styleGuide.colors.extended.title,
      description: projectDetail.styleGuide.colors.extended.description,
      icon: 'branding',
      type: 'image',
      span: 'medium'
    }
  ];

  // Tipografía - 1 imagen
  const typographyItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Tipografia/Tipografia.png",
      alt: projectDetail.styleGuide.typography.alt,
      title: projectDetail.styleGuide.typography.title,
      description: projectDetail.styleGuide.typography.description,
      icon: 'wireframes',
      type: 'image',
      span: 'tall'
    }
  ];

  // Sombras - 1 imagen
  const shadowsItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Sombras/Sombras.png",
      alt: projectDetail.styleGuide.shadows.alt,
      title: projectDetail.styleGuide.shadows.title,
      description: projectDetail.styleGuide.shadows.description,
      icon: 'layers',
      type: 'image',
      span: 'small'
    }
  ];

  // Grid - 1 imagen
  const gridItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Grid/Grid.png",
      alt: projectDetail.styleGuide.grid.alt,
      title: projectDetail.styleGuide.grid.title,
      description: projectDetail.styleGuide.grid.description,
      icon: 'architecture',
      type: 'image',
      span: 'tall'
    }
  ];

  // Espaciado - 1 imagen
  const spacingItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Numeros/Tokens%20numeros.png",
      alt: projectDetail.styleGuide.spacing.alt,
      title: projectDetail.styleGuide.spacing.title,
      description: projectDetail.styleGuide.spacing.description,
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
      alt: projectDetail.components.avatar.component.alt,
      title: projectDetail.components.avatar.component.title,
      description: projectDetail.components.avatar.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'medium'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Avatar/Propiedades%20avatar.png",
      alt: projectDetail.components.avatar.properties.alt,
      title: projectDetail.components.avatar.properties.title,
      description: projectDetail.components.avatar.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Avatar/Variables%20avatar.png",
      alt: projectDetail.components.avatar.variables.alt,
      title: projectDetail.components.avatar.variables.title,
      description: projectDetail.components.avatar.variables.description,
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Accordion - 3 imágenes
  const accordionItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Accordion/Componente%20accordion.png",
      alt: projectDetail.components.accordion.component.alt,
      title: projectDetail.components.accordion.component.title,
      description: projectDetail.components.accordion.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'wide'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Accordion/Propiedades%20accordion.png",
      alt: projectDetail.components.accordion.properties.alt,
      title: projectDetail.components.accordion.properties.title,
      description: projectDetail.components.accordion.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Accordion/Variables%20accordion.png",
      alt: projectDetail.components.accordion.variables.alt,
      title: projectDetail.components.accordion.variables.title,
      description: projectDetail.components.accordion.variables.description,
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Button - 3 imágenes
  const buttonItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Button/Componente%20button.png",
      alt: projectDetail.components.button.component.alt,
      title: projectDetail.components.button.component.title,
      description: projectDetail.components.button.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Button/Propiedades%20button.png",
      alt: projectDetail.components.button.properties.alt,
      title: projectDetail.components.button.properties.title,
      description: projectDetail.components.button.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Button/Variables%20button.png",
      alt: projectDetail.components.button.variables.alt,
      title: projectDetail.components.button.variables.title,
      description: projectDetail.components.button.variables.description,
      icon: 'wireframes',
      type: 'image',
      span: 'medium'
    }
  ];

  // Card - 3 imágenes
  const cardItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Card/Componente%20card.png",
      alt: projectDetail.components.card.component.alt,
      title: projectDetail.components.card.component.title,
      description: projectDetail.components.card.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Card/Propiedades%20card.png",
      alt: projectDetail.components.card.properties.alt,
      title: projectDetail.components.card.properties.title,
      description: projectDetail.components.card.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Card/Vaeriables%20card.png",
      alt: projectDetail.components.card.variables.alt,
      title: projectDetail.components.card.variables.title,
      description: projectDetail.components.card.variables.description,
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Carousel - 3 imágenes
  const carouselItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Carousel/Componente%20carousel.png",
      alt: projectDetail.components.carousel.component.alt,
      title: projectDetail.components.carousel.component.title,
      description: projectDetail.components.carousel.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'wide'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Carousel/Dots%20carousel.png",
      alt: projectDetail.components.carousel.dots.alt,
      title: projectDetail.components.carousel.dots.title,
      description: projectDetail.components.carousel.dots.description,
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Carousel/Propiedades%20carousel.png",
      alt: projectDetail.components.carousel.properties.alt,
      title: projectDetail.components.carousel.properties.title,
      description: projectDetail.components.carousel.properties.description,
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Checkbox - 3 imágenes
  const checkboxItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Checkbox/Componente%20checkbox.png",
      alt: projectDetail.components.checkbox.component.alt,
      title: projectDetail.components.checkbox.component.title,
      description: projectDetail.components.checkbox.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Checkbox/Propiedades%20checkbox.png",
      alt: projectDetail.components.checkbox.properties.alt,
      title: projectDetail.components.checkbox.properties.title,
      description: projectDetail.components.checkbox.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Checkbox/Variables%20checkbox.png",
      alt: projectDetail.components.checkbox.variables.alt,
      title: projectDetail.components.checkbox.variables.title,
      description: projectDetail.components.checkbox.variables.description,
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
      alt: projectDetail.components.listItem.component.alt,
      title: projectDetail.components.listItem.component.title,
      description: projectDetail.components.listItem.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/List%20Item/Propiedades%20list%20item.png",
      alt: projectDetail.components.listItem.properties.alt,
      title: projectDetail.components.listItem.properties.title,
      description: projectDetail.components.listItem.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/List%20Item/Variables%20list%20item.png",
      alt: projectDetail.components.listItem.variables.alt,
      title: projectDetail.components.listItem.variables.title,
      description: projectDetail.components.listItem.variables.description,
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Modal - 3 imágenes
  const modalItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Modal/Componente%20modal.png",
      alt: projectDetail.components.modal.component.alt,
      title: projectDetail.components.modal.component.title,
      description: projectDetail.components.modal.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'wide'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Modal/Propiedades%20modal.png",
      alt: projectDetail.components.modal.properties.alt,
      title: projectDetail.components.modal.properties.title,
      description: projectDetail.components.modal.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Modal/Variables%20modal.png",
      alt: projectDetail.components.modal.variables.alt,
      title: projectDetail.components.modal.variables.title,
      description: projectDetail.components.modal.variables.description,
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Text Area - 3 imágenes
  const textAreaItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Area/Componente%20text%20area.png",
      alt: projectDetail.components.textArea.component.alt,
      title: projectDetail.components.textArea.component.title,
      description: projectDetail.components.textArea.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Area/Propiedades%20text%20area.png",
      alt: projectDetail.components.textArea.properties.alt,
      title: projectDetail.components.textArea.properties.title,
      description: projectDetail.components.textArea.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Area/Variables%20text%20area.png",
      alt: projectDetail.components.textArea.variables.alt,
      title: projectDetail.components.textArea.variables.title,
      description: projectDetail.components.textArea.variables.description,
      icon: 'wireframes',
      type: 'image',
      span: 'medium'
    }
  ];

  // Text Input - 3 imágenes
  const textInputItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Input/Componente%20text%20input.png",
      alt: projectDetail.components.textInput.component.alt,
      title: projectDetail.components.textInput.component.title,
      description: projectDetail.components.textInput.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'medium'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Input/Propiedades%20text%20input.png",
      alt: projectDetail.components.textInput.properties.alt,
      title: projectDetail.components.textInput.properties.title,
      description: projectDetail.components.textInput.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Text%20Input/Variables%20text%20input.png",
      alt: projectDetail.components.textInput.variables.alt,
      title: projectDetail.components.textInput.variables.title,
      description: projectDetail.components.textInput.variables.description,
      icon: 'wireframes',
      type: 'image',
      span: 'small'
    }
  ];

  // Toggle - 3 imágenes
  const toggleItems: MosaicItem[] = [
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Toggle/Componente%20toggle.png",
      alt: projectDetail.components.toggle.component.alt,
      title: projectDetail.components.toggle.component.title,
      description: projectDetail.components.toggle.component.description,
      icon: 'architecture',
      type: 'image',
      span: 'small'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Toggle/Propiedades%20toggle.png",
      alt: projectDetail.components.toggle.properties.alt,
      title: projectDetail.components.toggle.properties.title,
      description: projectDetail.components.toggle.properties.description,
      icon: 'insights',
      type: 'image',
      span: 'tall'
    },
    {
      src: "https://jdylpqwurderryhujqgr.supabase.co/storage/v1/object/public/portfolio-assets/Images/DS-Pomeranian/Toggle/Variables%20toggle.png",
      alt: projectDetail.components.toggle.variables.alt,
      title: projectDetail.components.toggle.variables.title,
      description: projectDetail.components.toggle.variables.description,
      icon: 'wireframes',
      type: 'image',
      span: 'medium'
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Header Navigation - Auto Hide */}
      <ProjectNavbar 
        onNavigateToProjects={onNavigateToProjects}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />

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
                      projectTitle={projectDetail.title}
                      projectDescription={projectDetail.description}
                      projectShortDescription={projectDetail.shortDescription}
                      projectUrl={getShareableProjectUrl('ds-pomeranian')}
                      iconOnly={true}
                    />
                  </div>
                  
                  {/* Desktop: Botón completo */}
                  <div className="hidden sm:block">
                    <ShareProject 
                      projectTitle={projectDetail.title}
                      projectDescription={projectDetail.description}
                      projectShortDescription={projectDetail.shortDescription}
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
                {projectDetail.introduction}
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
                      <h3 className="text-foreground">{t.projectLayout.problem}</h3>
                    </div>
                    
                    {/* Content */}
                    <p className="text-base text-foreground/90 dark:text-foreground/95 leading-relaxed">
                      {projectDetail.problem}
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
                      <h3 className="text-foreground">{t.projectLayout.solution}</h3>
                    </div>
                    
                    {/* Content */}
                    <p className="text-base text-foreground/90 dark:text-foreground/95 leading-relaxed">
                      {projectDetail.solution}
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
              <h2 className="text-2xl font-semibold text-foreground uppercase tracking-wider no-underline">{projectDetail.sections.styleGuide.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mb-12">
              {projectDetail.sections.styleGuide.intro}
            </p>
          </div>
        </ScrollReveal>

        {/* Atomic Design */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.styleGuide.atomicDesign.title}</h3>
            <ul className="space-y-3 text-muted-foreground mb-6">
              {projectDetail.sections.styleGuide.atomicDesignBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <MosaicGallery items={atomicDesignItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Colores */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.styleGuide.colors.title}</h3>
            <ul className="space-y-3 text-muted-foreground mb-6">
              {projectDetail.sections.styleGuide.colorsBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <MosaicGallery items={colorsItems} layout="balanced" />
          </div>
        </ScrollReveal>

        {/* Tipografía */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.styleGuide.typography.title}</h3>
            <ul className="space-y-3 text-muted-foreground mb-6">
              {projectDetail.sections.styleGuide.typographyBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <MosaicGallery items={typographyItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Sombras */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.styleGuide.shadows.title}</h3>
            <ul className="space-y-3 text-muted-foreground mb-6">
              {projectDetail.sections.styleGuide.shadowsBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <MosaicGallery items={shadowsItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Grid */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.styleGuide.grid.title}</h3>
            <ul className="space-y-3 text-muted-foreground mb-6">
              {projectDetail.sections.styleGuide.gridBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <MosaicGallery items={gridItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Espaciado */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.styleGuide.spacing.title}</h3>
            <ul className="space-y-3 text-muted-foreground mb-6">
              {projectDetail.sections.styleGuide.spacingBullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 leading-relaxed">
                  <span className="text-secondary mt-1.5 flex-shrink-0">●</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <MosaicGallery items={spacingItems} layout="balanced" />
          </div>
        </ScrollReveal>

        {/* ============================================ */}
        {/* COMPONENTES SECTION */}
        {/* ============================================ */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground uppercase tracking-wider no-underline">{projectDetail.sections.components.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-4xl mb-12">
              {projectDetail.sections.components.intro}
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.accordion.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.accordionDescription}
            </p>
            <MosaicGallery items={accordionItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Avatar */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.avatar.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.avatarDescription}
            </p>
            <MosaicGallery items={avatarItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Button */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.button.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.buttonDescription}
            </p>
            <MosaicGallery items={buttonItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Card */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.card.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.cardDescription}
            </p>
            <MosaicGallery items={cardItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.carousel.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.carouselDescription}
            </p>
            <MosaicGallery items={carouselItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Checkbox */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.checkbox.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.checkboxDescription}
            </p>
            <MosaicGallery items={checkboxItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Dropdown */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.dropdown.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.dropdownDescription}
            </p>
            <MosaicGallery items={dropdownItems} layout="balanced" />
          </div>
        </ScrollReveal>

        {/* List Item */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.listItem.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.listItemDescription}
            </p>
            <MosaicGallery items={listItemItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Modal */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.modal.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.modalDescription}
            </p>
            <MosaicGallery items={modalItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Text Area */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.textArea.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.textAreaDescription}
            </p>
            <MosaicGallery items={textAreaItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Text Input */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.textInput.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.textInputDescription}
            </p>
            <MosaicGallery items={textInputItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Toggle */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{projectDetail.components.toggle.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {projectDetail.sections.components.toggleDescription}
            </p>
            <MosaicGallery items={toggleItems} layout="asymmetric" />
          </div>
        </ScrollReveal>

        {/* Related Projects */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="mt-16 pt-8 border-t-2 border-border/50">
            <h2 className="text-2xl font-semibold text-foreground mb-4 uppercase tracking-wider no-underline">{projectDetail.sections.relatedProjects.title}</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {projectDetail.sections.relatedProjects.description}
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
                  {projectDetail.sections.relatedProjects.viewAll}
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