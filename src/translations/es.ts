// Spanish translations
export const es = {
  // Navigation
  nav: {
    home: 'Inicio',
    projects: 'Proyectos',
    experiences: 'Experiencia',
    contact: 'Contacto',
    skipToContent: 'Saltar al contenido principal',
  },

  // Hero Section
  hero: {
    name: 'Jabier García Sanz',
    jobTitle: 'Junior UX/UI Designer',
    available: 'disponible',
    description: {
      intro: 'Soy UX/UI Designer con más de 13 años de experiencia en moda y Visual Merchandising, y formación especializada en UX/UI (Neoland).',
      middle: 'Transformo la toma de decisiones visuales en experiencias digitales claras, usables y orientadas a negocio, conectando lo físico y lo digital.',
      skills: 'Aporto visión estética, pensamiento de producto, empatía y liderazgo, trabajando con research, user flows, prototipos y Figma.',
      current: 'Actualmente busco sumarme a equipos de producto para diseñar experiencias digitales con impacto real.',
    },
    buttons: {
      viewProjects: 'Ver proyectos',
      downloadCV: 'Descargar CV',
    },
    contact: {
      cta: '¿Nos ponemos en contacto?',
      button: 'Contacto',
    },
    openDesignSystem: 'Abrir Design System', // NUEVO
  },

  // Works Section
  works: {
    title: 'Proyectos',
    description: 'Una colección de proyectos que demuestran mis habilidades en experiencia de usuario y en diseño y prototipado de interfaces. Cada proyecto representa un desafío único y una solución creativa.',
    cta: {
      question: '¿Quieres ver más de mi trabajo?',
      visitMe: 'Visítame:',
    },
  },

  // Stats Section
  stats: {
    title: 'En cifras',
    description: 'Mi trayectoria profesional reflejada en datos que demuestran experiencia, dedicación y compromiso con el crecimiento continuo en UX/UI.',
    items: {
      fashion: {
        label: 'años en moda',
        description: 'Experiencia previa que aporta una perspectiva única al diseño digital',
      },
      projects: {
        label: 'proyectos UX/UI',
        description: 'Proyectos completados durante mi transición al diseño digital',
      },
      passion: {
        label: 'pasión por UX',
        description: 'Dedicación completa a crear experiencias centradas en el usuario',
      },
      learning: {
        label: 'ganas de aprender',
        description: 'Actitud de mejora continua y curiosidad por nuevas metodologías',
      },
    },
  },

  // Experiences Section
  experiences: {
    title: 'Experiencia',
    description: 'Un recorrido que combina años de experiencia en moda con mi nueva pasión por el diseño UX/UI, creando una perspectiva única en cada proyecto.',
    present: 'Presente',
    cta: {
      question: '¿Quieres conocer más sobre mi trayectoria?',
      button: 'Ver experiencia completa',
    },
    items: {
      current: {
        title: 'Junior UX/UI Designer',
        company: 'Freelance',
        description: 'Creación de soluciones digitales intuitivas mediante procesos de investigación, ideación y prototipado, integrando usabilidad, accesibilidad y diseño visual para optimizar la experiencia del usuario.',
      },
      hm2: {
        title: 'Senior Visual Merchandiser Manager',
        company: 'Hennes & Mauritz S.L.',
        description: 'Gestión visual de tiendas flagship, desarrollo y presentación de conceptos de marca y liderazgo de equipos creativos en el sector retail de moda.',
      },
      hm1: {
        title: 'Window & Indoor Styling Manager',
        company: 'Hennes & Mauritz S.L.',
        description: 'Creación y ejecución de conceptos de escaparatismo para diferentes departamentos, desde moda hasta hogar, desarrollando narrativas visuales impactantes.',
      },
    },
  },

  // Footer
  footer: {
    tagline: 'Diseñando experiencias digitales desde Madrid',
    downloadCV: 'Descargar CV',
    copyright: 'Diseñado con Figma, React y mucho café',
    designSystem: 'Ver Design System', // NUEVO
    labels: {
      openContactForm: 'Abrir formulario de contacto',
      callPhone: 'Llamar por teléfono',
      viewLinkedIn: 'Ver perfil de LinkedIn',
      viewBehance: 'Ver portafolio en Behance',
      downloadCV: 'Descargar CV en PDF',
    },
  },

  // Contact Modal
  contact: {
    title: '¿Hablamos?',
    description: 'Cuéntame qué tienes entre manos y te responderé lo antes posible.',
    form: {
      name: {
        label: 'Tu nombre completo *',
        placeholder: '¿Cómo te llamas?',
      },
      email: {
        label: 'tu@mail.com *',
        placeholder: 'Tu correo (prometo no hacer spam)',
      },
      subject: {
        label: '¿Qué tienes en mente? *',
        placeholder: 'Dispara: ¿qué quieres diseñar?',
      },
      message: {
        label: 'Abierto a ideas y nuevos retos *',
        placeholder: 'Escríbeme y hablamos...',
      },
    },
    buttons: {
      send: 'Enviar mensaje',
      sending: 'Enviando...',
      cancel: 'Cancelar',
    },
    messages: {
      success: '¡Mensaje enviado correctamente! Te responderé lo antes posible.',
      error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
    },
    validation: {
      nameRequired: 'Por favor, introduce tu nombre',
      emailRequired: 'Por favor, introduce tu email',
      emailInvalid: 'Por favor, introduce un email válido',
      subjectRequired: 'Por favor, introduce un asunto',
      messageRequired: 'Por favor, introduce un mensaje',
    },
  },

  // Common
  common: {
    loading: 'Cargando...',
    close: 'Cerrar',
    back: 'Volver',
    viewMore: 'Ver más',
    viewLess: 'Ver menos',
    closeGallery: 'Cerrar galería (Escape)',
    showInfo: 'Mostrar información',
    hideInfo: 'Ocultar información',
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
    closeShareModal: 'Cerrar modal de compartir (Escape)',
  },

  // Error Boundary
  errorBoundary: {
    title: 'Algo salió mal',
    description: 'Ha ocurrido un error inesperado. Puedes intentar recargar la página o volver a la página principal.',
    reloadButton: 'Recargar página',
    homeButton: 'Volver al inicio',
    technicalDetails: 'Detalles técnicos',
  },

  // Not Found Page
  notFound: {
    title: 'Página no encontrada',
    description: 'La página que buscas no existe o ha sido movida. Pero no te preocupes, te ayudamos a encontrar lo que necesitas.',
    backButton: 'Volver atrás',
    homeButton: 'Ir al inicio',
    suggestions: 'También puedes visitar:',
  },

  // Projects Page
  projectsPage: {
    title: 'Proyectos',
    subtitle: 'Diseño de experiencias digitales centradas en el usuario',
    description: 'Cada proyecto refleja mi enfoque en la investigación, ideación y validación con usuarios reales. Desde e-commerce hasta aplicaciones móviles, combinando metodologías UX con soluciones creativas que generan impacto real.',
  },

  // Project Layout
  projectLayout: {
    backToProjects: 'Volver a Proyectos',
    problem: 'Problema',
    solution: 'Solución',
    viewFullscreen: 'Ver en pantalla completa',
    behanceSection: {
      title: '¿Te interesa ver más detalles?',
      description: 'Explora el proyecto completo con todas las pantallas, especificaciones técnicas y documentación detallada en mi perfil de Behance.',
      button: 'Ver Proyecto Completo en Behance',
    },
    relatedProjects: {
      title: 'Más proyectos',
      description: 'Explora otros casos de estudio donde aplico metodologías de diseño centrado en el usuario para crear experiencias digitales innovadoras.',
      button: 'Ver Todos los Proyectos',
    },
    share: {
      copyLink: 'Copiar enlace',
      linkCopied: 'Enlace copiado',
      linkCopiedFull: 'Enlace copiado al portapapeles',
      shareProject: 'Compartir proyecto',
      shareOn: 'Compartir en',
      copyLinkedInPost: 'Copiar post para LinkedIn',
      shareByEmail: 'Compartir por email',
      shareButton: 'Compartir',
      moreOptions: 'Más opciones',
      linkedInInstructions: {
        title: '¡Perfecto!',
        description: 'El texto se ha copiado al portapapeles. Ahora haz clic en el botón de abajo para abrir LinkedIn.',
        openButton: 'Abrir LinkedIn para publicar'
      },
      email: {
        subject: 'Echa un vistazo a este proyecto',
        intro: 'Hola,',
        body: 'Te comparto este proyecto de Jabier García Sanz, UX/UI Designer:',
        viewProject: 'Ver proyecto completo:',
        outro: '¡Espero que te resulte interesante!'
      },
      linkedInPost: {
        authorCredit: 'Proyecto de Jabier García Sanz, UX/UI Designer especializado en crear experiencias centradas en el usuario.',
        viewMore: 'Ver más:'
      },
      ariaLabels: {
        closeModal: 'Cerrar modal de compartir (Escape)',
        shareProject: 'Compartir'
      },
      toast: {
        textCopied: '¡Texto copiado!',
        readyToPublish: 'Listo para publicar en LinkedIn',
        errorCopying: 'Error al copiar el texto',
        emailContentCopied: 'Contenido del email copiado al portapapeles',
        openEmailManually: 'Abre tu cliente de email y pega el contenido'
      }
    },
  },

  // Experiences Page
  experiencesPage: {
    title: 'Experiencia',
    subtitle: 'Un recorrido profesional desde el retail moda hacia el diseño UX/UI',
    description: 'Explora mi trayectoria profesional fusionando visual merchandising con diseño digital',
    experienceTitle: 'Experiencia Profesional',
    experienceSubtitle: 'De H&M a proyectos de diseño digital',
    educationTitle: 'Formación Académica',
    educationSubtitle: 'Un camino de aprendizaje multidisciplinar',
    achievements: 'Logros destacados',
    keyAchievements: 'Logros principales',
    functions: 'Funciones principales',
    keyFunctions: 'Funciones principales',
    skills: 'Habilidades',
    keySkills: 'Habilidades clave',
    developedSkills: 'Habilidades desarrolladas',
  },

  // Common Project Terms
  projectCommon: {
    result: 'Resultado',
    solution: 'Solución',
    problem: 'Problema',
    process: 'Proceso',
    challenge: 'Desafío',
    projectCreation: 'Creación del proyecto',
    participants: 'Personas participantes',
    projectMode: 'Modalidad del proyecto',
    methodology: 'Metodología utilizada',
    duration: 'Duración del proyecto',
    person: 'persona',
    people: 'personas',
    weeks: 'semanas',
    inDevelopment: 'En desarrollo',
    prototypeTitle: 'Prototipo Interactivo',
    explorePrototypeMobile: 'Explora el prototipo móvil completo en Figma',
    explorePrototypeWeb: 'Explora el prototipo web completo en Figma',
    openPrototype: 'Abrir Prototipo en Figma',
    openInNewTab: 'Se abrirá en una nueva pestaña para mejor experiencia',
    exploreApp: 'Explorar la aplicación en vivo',
    accessPlatform: 'Accede a la plataforma y explora el producto en funcionamiento',
    liveApp: 'Aplicación en vivo',
    tryApp: 'Probar Assorta',
    interactWithPrototype: 'Interactúa con el prototipo a pantalla completa haciendo clic en',
  },

  // Projects Data
  projects: {
    assorta: {
      title: 'Assorta | Retail Visual Platform',
      subtitle: 'SaaS B2B',
      category: 'Product Design',
      description: 'Plataforma SaaS B2B que digitaliza el proceso de Visual Merchandising en retail de moda mediante una solución centralizada y operativa.',
      shortDescription: 'SaaS B2B que digitaliza Visual Merchandising en retail mediante gestión visual centralizada.',
      tags: {
        retail: 'Retail',
        visualMerchandising: 'Visual Merchandising',
        saas: 'SaaS',
        b2b: 'B2B',
        productDesign: 'Product Design',
      },
    },
    puffykitten: {
      title: 'PuffyKitten | E-commerce B2C',
      subtitle: 'E-commerce B2C',
      category: 'Web Design',
      description: 'Ecosistema digital que combina e-commerce de productos para gatos, juguetes IoT con monitorización en tiempo real y análisis de IA del comportamiento felino.',
      shortDescription: 'E-commerce de productos para gatos con juguetes IoT y análisis de comportamiento con IA.',
      tags: {
        webApp: 'Web + App',
        pets: 'Mascotas',
        iot: 'IoT',
        ai: 'IA',
        designThinking: 'Design Thinking',
      },
    },
    gotapp: {
      title: 'GotApp | App móvil B2C',
      subtitle: 'App móvil B2C',
      category: 'App Design',
      description: 'App para consumo responsable de agua con monitorización inteligente y gamificación. Desarrollada en Design Sprint de 5 días para generar cambio de mentalidad.',
      shortDescription: 'App de consumo responsable de agua con monitorización y gamificación.',
      tags: {
        app: 'App',
        sustainability: 'Sostenibilidad',
        gamification: 'Gamificación',
        monitoring: 'Monitorización',
        designSprint: 'Design Sprint',
      },
    },
    dsPomeranian: {
      title: 'Pomeranian | Design System',
      subtitle: 'Design System',
      category: 'Design System',
      description: 'Sistema de diseño con metodología Atomic Design, tokens visuales y librería de 12 componentes reutilizables. Garantiza consistencia y eficiencia en diseño y desarrollo.',
      shortDescription: 'Design System con Atomic Design y librería de componentes reutilizables.',
      tags: {
        atomicDesign: 'Atomic Design',
        styles: 'Estilos',
        tokens: 'Tokens',
        components: 'Componentes',
        scalability: 'Escalabilidad',
      },
    },
    chupsee: {
      title: 'Chupsee | App móvil B2C',
      subtitle: 'App móvil B2C',
      category: 'App Design',
      description: 'App de comparación de precios multitienda con wishlists personalizadas y análisis predictivo de IA para recomendar el momento óptimo de compra.',
      shortDescription: 'Comparador de precios multitienda con wishlists e IA predictiva.',
      tags: {
        app: 'App',
        ecommerce: 'E-commerce',
        aiPredictive: 'IA Predictiva',
        comparator: 'Comparador',
        designThinking: 'Design Thinking',
      },
    },
  },

  // ============================================
  // EXPERIENCE TIMELINE DATA
  // ============================================
  experienceTimeline: [
    {
      id: '1',
      title: 'Junior UX/UI Designer',
      company: 'Proyectos personales',
      location: 'Madrid, España',
      period: '2025 - Presente',
      typeLabel: 'Tiempo completo',
      description: 'Desarrollo de proyectos de diseño UX/UI basados en la formación intensiva del Bootcamp de UX/UI Design en Neoland y en proyectos personales, aplicando metodologías de diseño centrado en el usuario y herramientas como Figma para crear experiencias digitales intuitivas y coherentes.',
      achievements: [
        'Investigación de usuarios y definición de user personas fundamentadas en datos cualitativos',
        'Diseño de flujos de usuario, wireframes y prototipos de alta fidelidad para aplicaciones web y mobile',
        'Creación y documentación de sistemas de diseño escalables utilizando principios de Atomic Design',
        'Desarrollo de casos prácticos end-to-end, desde la investigación hasta la validación con pruebas de usabilidad'
      ],
      functions: [
        'Analizar y comprender las necesidades de usuarios mediante entrevistas, encuestas y benchmark competitivo',
        'Definir la arquitectura de la información y diseñar user flows que facilitan la navegación',
        'Crear interfaces visuales accesibles, consistentes y eficaces empleando Figma',
        'Prototipar interacciones y realizar user testing básico para iterar diseños según feedback'
      ],
    },
    {
      id: '2',
      title: 'Senior Visual Merchandiser Manager',
      company: 'Hennes & Mauritz S.L.',
      location: 'Madrid, España',
      period: '2018 - 2025',
      typeLabel: 'Tiempo completo',
      description: 'Gestión visual de tiendas flagship, desarrollo y presentación de conceptos de marca y liderazgo de equipos creativos en el sector retail de moda.',
      achievements: [
        'Incremento del 5% en ventas mediante estrategias visuales innovadoras',
        'Liderazgo de equipos de 15+ personas en proyectos de rebuilding',
        'Implementación de nuevos estándares visuales en varias tiendas',
        'Optimización de layouts y experiencia de usuario',
        'Colaboración directa con los diferentes equipos de tienda y service office',
        'Análisis de métricas de venta por departamento y producto',
        'Reconocimiento interno por innovación en presentación visual'
      ],
      functions: [
        'Responsable de la consecución de objetivos de ventas, equipo y rentabilidad junto con el equipo de department y store manager en tienda, reportando directamente al area visual manager.',
        'Ventas:',
        'Asegurar la consistencia de la presentación de las prendas y el estilismo con las directrices de identidad visual corporativas, en tienda y escaparate.',
        'Crear una clara línea entre el escaparate y el área principal, con sugerencias de compra comerciales.',
        'Armonizar el equilibrio de los conceptos manteniendo el layout, el material visual y mobiliario, y la navegación en la tienda.',
        'Tomar el pulso a las últimas tendencias de moda y técnicas de estilismo para anticipar las necesidades del cliente.',
        'Rentabilidad:',
        'Análisis y seguimiento diario de los KPIs de la tienda (ventas totales, tasa de conversión, piezas por ticket, ticket medio y tasa reclutamiento del programa de fidelidad de la compañía) para tomar decisiones basadas en datos que incrementen las ventas y consigan los objetivos del negocio.',
        'Planificación de los recursos de la tienda para garantizar una correcta ejecución de los cambios comerciales semanales.',
        'Equipo:',
        'Identificar potenciales visual merchandisers entre el grupo de Sales Advisors y evaluar su encaje con la cultura corporativa para comunicarlo al management.',
        'Seleccionado por el area visual manager para formar a otros visual merchandisers del país en temas clave –perfil de clientes, entender tendencias, ejecución del trabajo visual y técnicas de estilismo–.'
      ],
    },
    {
      id: '3',
      title: 'Window & Indoor Styling Manager',
      company: 'Hennes & Mauritz S.L.',
      location: 'Madrid, España',
      period: '2015 - 2018',
      typeLabel: 'Tiempo completo',
      description: 'Creación y ejecución de conceptos de escaparatismo para diferentes departamentos, desde moda hasta hogar, desarrollando narrativas visuales impactantes.',
      achievements: [
        'Diseño de más de 200 escaparates temáticos',
        'Colaboración con equipos de marketing para campañas estacionales',
        'Implementación de técnicas de iluminación y composición avanzadas',
        'Reconocimiento interno por innovación en presentación visual'
      ],
      functions: [
        'Diseño conceptual y ejecución de escaparates temáticos',
        'Selección y coordinación de productos para displays',
        'Gestión de cronogramas de instalación y cambios estacionales',
        'Colaboración con equipos de marketing y diseño gráfico'
      ],
    },
  ],

  // ============================================
  // EDUCATION TIMELINE DATA
  // ============================================
  educationTimeline: [
    {
      id: '1',
      title: 'Bootcamp UX/UI Design',
      institution: 'Neoland School',
      location: 'Madrid, España',
      period: '2025',
      description: 'Experiencia formativa clave que ha consolidado mis competencias en investigación de usuarios, análisis de la competencia, arquitectura de la información y diseño de interfaces digitales responsivas alineadas con las necesidades reales de los usuarios.',
    },
    {
      id: '2',
      title: 'Grado en Educación Social',
      institution: 'Universidad de Alcalá',
      location: 'Alcalá de Henares, España',
      period: '2011 - 2015',
      description: 'Formación para intervenir con personas y grupos en riesgo de exclusión, promoviendo su desarrollo mediante acciones socioeducativas y adquiriendo competencias en programas educativos, mediación, diversidad y compromiso social.',
    },
    {
      id: '3',
      title: 'Diseño de Moda',
      institution: 'IED (Istituto Europeo di Design)',
      location: 'Madrid, España',
      period: '2009 - 2011',
      description: 'Estudios en diseño de moda con visión sostenible, innovadora e inclusiva. Combina técnica y creatividad: desde patronaje, confección y materiales, hasta estilismo, comunicación, principios del diseño y liderazgo. Especialización en sastrería y patronaje.',
    },
  ],
};

export type TranslationKeys = typeof es;