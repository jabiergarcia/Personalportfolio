// Detailed project translations - Spanish
// This file contains all the detailed content for individual project pages

export const projectsDetailES = {
  // ===========================================
  // ASSORTA PROJECT
  // ===========================================
  assorta: {
    details: {
      creation: '2026',
      participants: '1 persona',
      methodology: 'Product-driven development',
      duration: 'En desarrollo',
    },
    introduction: 'Assorta es una plataforma SaaS B2B diseñada para digitalizar el proceso de Visual Merchandising en retail de moda. Nace de experiencia profesional real y se construye como una solución funcional orientada al uso en tienda, coordinando equipos.',
    problem: 'Los equipos de Visual Merchandising carecen de una herramienta digital que conecte planificación visual, asignación de producto y ejecución en tienda. La información se dispersa entre PDFs, hojas de cálculo y mensajes informales, impidiendo una visión clara, trazable y medible del impacto comercial.',
    solution: 'Assorta centraliza todo el flujo de trabajo de Visual Merchandising en una plataforma visual, operativa y colaborativa. Permite planificar layouts, realizar sample picking digital y estructurar la implantación en tienda, conectando las decisiones visuales con datos reales y reduciendo la fricción operativa.',
    sections: {
      context: {
        title: 'Contexto del problema',
        bullets: [
          'Decidí iniciar este proyecto a partir de más de 10 años de experiencia trabajando en tienda y coordinando implantaciones visuales bajo presión operativa',
          'En la mayoría de retailers medianos y grandes, el Visual Merchandising sigue apoyándose en herramientas no diseñadas para este fin: Excel, PDFs, fotografías y mensajería instantánea',
          'Esta falta de herramientas específicas provoca inconsistencias entre tiendas, errores en la implantación y una enorme carga administrativa para equipos que deberían centrarse en el trabajo creativo y comercial'
        ],
        images: [
          {
            title: 'Editor de layouts',
            description: 'Planificación visual real de tienda',
            alt: 'Editor visual de layouts de tienda'
          },
          {
            title: 'Sample picking visual',
            description: 'Asignación directa de producto',
            alt: 'Asignación visual de producto a zonas'
          },
          {
            title: 'Overview de tienda',
            description: 'Visión global de implantaciones',
            alt: 'Vista general de implantaciones de tienda'
          }
        ]
      },
      problem: {
        title: 'Definición del problema',
        bullets: [
          'No existe un producto digital donde centralizar layouts, producto, zonas de tienda y estados de implantación',
          'Identifiqué que uno de los principales cuellos de botella era la comunicación unidireccional entre headquarters y tiendas, lo que impedía adaptar las decisiones visuales al stock real disponible',
          'Las decisiones visuales no quedan registradas ni vinculadas a resultados comerciales, lo que impide aprender, iterar y optimizar futuras implantaciones',
          'El Visual Merchandising carece de herramientas que hablen su mismo lenguaje: espacio, producto, concepto y rotación'
        ],
        images: [
          {
            title: 'Roles operativos',
            description: 'Estructura real de retail',
            alt: 'Roles operativos dentro del retail'
          },
          {
            title: 'Zonas de tienda',
            description: 'Claridad espacial operativa',
            alt: 'Zonas y áreas de tienda'
          },
          {
            title: 'Flujo operativo',
            description: 'Proceso claro y repetible',
            alt: 'Flujo operativo de trabajo'
          }
        ]
      },
      decisions: {
        title: 'Decisiones de producto',
        bullets: [
          'Se define el sample picking como núcleo del sistema, entendiendo que la asignación de producto a espacio es el punto crítico del proceso',
          'Decidí priorizar claridad visual y rapidez de uso frente a complejidad funcional, asumiendo conscientemente ciertas limitaciones, porque el producto se utiliza en contextos de alta presión operativa en tienda',
          'Todas las decisiones de diseño se basan en flujos reales de tienda: planos del espacio, seleccion de zonas para visualizar layouts, numeración de elementos, adaptación al stock, validación visual y documentación operativa',
          'Descarté conscientemente la creación de un software enterprise pesado y opté por una experiencia directa y visual, alineada con la forma real de trabajar de los equipos de Visual Merchandising'
        ],
        images: [
          {
            title: 'Flujo del producto',
            description: 'El core del sistema',
            alt: 'Flujo principal del producto'
          },
          {
            title: 'Detalle del editor',
            description: 'UX pensada para uso diario',
            alt: 'Detalle del editor visual'
          },
          {
            title: 'Moodboard aplicado',
            description: 'Del concepto a tienda',
            alt: 'Moodboard aplicado a tienda'
          }
        ]
      },
      build: {
        title: 'Construcción del producto',
        bullets: [
          'Opté por desarrollar Assorta como una aplicación funcional en alta fidelidad utilizando Figma Make, con el objetivo de validar rápidamente el producto en uso real antes de una fase de desarrollo técnico',
          'El editor 2D permite digitalizar el espacio físico de tienda y trabajar sobre él de forma visual mediante drag & drop',
          'El sistema integra los moodboards, sample picking, layouts y planos de tienda en un único entorno, reduciendo saltos entre herramienta',
          'El producto se construye de forma iterativa, validando cada funcionalidad contra su uso real y su aportación al flujo de trabajo diario'
        ],
        images: [
          {
            title: 'Editor 2D',
            description: 'Espacio físico digitalizado',
            alt: 'Editor 2D de tienda'
          },
          {
            title: 'Drag & drop',
            description: 'Interacción directa y visual',
            alt: 'Interacción drag and drop'
          },
          {
            title: 'KPIs de tienda',
            description: 'Impacto comercial visible',
            alt: 'KPIs visuales de tienda'
          }
        ]
      },
      result: {
        title: 'Resultado',
        bullets: [
          'Assorta es una plataforma web funcional que digitaliza un proceso clave del retail fashion históricamente manual y poco trazable',
          'El proyecto demuestra cómo la experiencia profesional puede convertirse en producto digital sin depender de research académico tradicional',
          'Supone un punto de inflexión personal, consolidando el paso de Visual Merchandising Manager a Product Designer con enfoque en herramientas B2B reales',
          'El producto queda preparado para escalar hacia integraciones con RFID, KPIs avanzados y entornos multi-tienda'
        ],
        externalLink: {
          label: 'Explorar la aplicación en vivo',
          description: 'Accede a la plataforma y explora el producto en funcionamiento'
        }
      }
    }
  },

  // ===========================================
  // PUFFYKITTEN PROJECT
  // ===========================================
  puffykitten: {
    details: {
      creation: '2025',
      participants: '1 persona',
      methodology: 'Design Thinking',
      duration: '4 semanas',
    },
    introduction: 'PuffyKitten es un proyecto personal de diseño UX/UI que busca mejorar el bienestar felino mediante tecnología. La plataforma integra un e-commerce de catnip orgánico, juguetes inteligentes con monitorización en tiempo real y una IA que analiza vídeos de gatos para generar informes sobre su comportamiento.',
    problem: 'La falta de un ecosistema digital que uniera compra de productos, seguimiento de uso y acceso a información sobre comportamiento felino. Además, dificultad para encontrar catnip natural de origen nacional, limitando opciones para dueños preocupados por el bienestar de sus gatos.',
    solution: 'Una experiencia digital completa que combina e-commerce, monitorización IoT en tiempo real y análisis con inteligencia artificial. El sistema genera recomendaciones personalizadas y reportes de comportamiento basados en el uso real de los productos.',
    sections: {
      empathize: {
        title: 'Empatizar',
        bullets: [
          'Benchmark de competidores directos e indirectos (Catit, Tractive, Tiendanimal) identificando fortalezas y debilidades',
          'Análisis DAFO destacando oportunidades: crecimiento del mercado pet-tech, demanda de productos sostenibles y potencial de contenido viral',
          'Encuestas y entrevistas a dueños de gatos revelando insights clave: 81% interés en juguetes inteligentes, 75% en informes emocionales y 94% valorando packaging sostenible'
        ],
        images: [
          {
            title: 'Benchmark',
            description: 'Análisis comparativo de competidores directos e indirectos',
            alt: 'Benchmark de competidores directos e indirectos de PuffyKitten'
          },
          {
            title: 'DAFO',
            description: 'Análisis estratégico DAFO del producto',
            alt: 'Análisis DAFO de PuffyKitten con debilidades, amenazas, fortalezas y oportunidades'
          },
          {
            title: 'Insights',
            description: 'Hallazgos clave de encuestas y entrevistas a usuarios',
            alt: 'Insights clave obtenidos de encuestas y entrevistas a usuarios'
          }
        ]
      },
      define: {
        title: 'Definir',
        bullets: [
          'Perfiles de usuario, comprador y arquetipo para representar distintos segmentos',
          'Mapa de empatía recogiendo motivaciones, frustraciones y aspiraciones',
          'Journey map visualizando el recorrido desde la compra hasta la interacción digital',
          'Identificación de puntos de fricción: falta de información fiable sobre catnip, dificultad para encontrar productos sostenibles y escasa oferta de juguetes conectados'
        ],
        images: [
          {
            title: 'Perfiles de Persona',
            description: 'User persona, buyer persona y arquetipo de marca',
            alt: 'Perfiles de usuario, comprador y arquetipo de PuffyKitten'
          },
          {
            title: 'Mapa de Empatía',
            description: 'Motivaciones, frustraciones y aspiraciones del usuario',
            alt: 'Mapa de empatía con motivaciones, frustraciones y aspiraciones del usuario'
          },
          {
            title: 'Journey Map',
            description: 'Recorrido completo del usuario desde la compra hasta el uso',
            alt: 'Journey map del recorrido completo del usuario con PuffyKitten'
          }
        ]
      },
      ideate: {
        title: 'Idear',
        bullets: [
          'Business Model Canvas con actividades clave: desarrollo de plataforma, investigación en bienestar animal y alianzas estratégicas',
          'Propuesta de valor centrada en transformar el consumo de catnip en experiencia digital, emocional y social',
          'Priorización MoSCoW estableciendo como imprescindibles: venta de catnip local sostenible, IA para análisis de vídeos e integración entre dispositivos físicos y digitales'
        ],
        images: [
          {
            title: 'Business Model Canvas',
            description: 'Modelo de negocio con actividades clave y alianzas',
            alt: 'Business Model Canvas con actividades clave, propuesta de valor y alianzas estratégicas'
          },
          {
            title: 'Value Proposition Canvas',
            description: 'Propuesta de valor basada en sostenibilidad y tecnología',
            alt: 'Value Proposition Canvas centrada en experiencia digital, emocional y social'
          },
          {
            title: 'Point of View',
            description: 'Perspectiva y necesidades específicas del usuario',
            alt: 'Point of View definiendo la perspectiva y necesidades del usuario objetivo'
          },
          {
            title: 'Priorización MoSCoW',
            description: 'Priorización de funcionalidades según importancia',
            alt: 'Matriz de priorización MoSCoW con funcionalidades must-have, should-have y could-have'
          }
        ]
      },
      prototype: {
        title: 'Prototipado',
        bullets: [
          'Arquitectura de información y identidad visual bajo estilo neobrutalista transmitiendo frescura e innovación',
          'Aplicación de leyes de diseño: visibilidad de Jakob Nielsen, estética-usabilidad y simplicidad cognitiva',
          'MVP incluyendo venta de catnip, prototipo de juguete inteligente con sensores y dashboard con análisis básicos mediante IA',
          'Exploración de futuribles: algoritmos avanzados de detección emocional, integración con redes sociales y validación profesional'
        ],
        images: [
          {
            title: 'Arquitectura de la información',
            description: 'Organización jerárquica y estructura de navegación',
            alt: 'Arquitectura de la información mostrando la organización del contenido y flujos de navegación'
          },
          {
            title: 'Identidad Corporativa',
            description: 'Sistema de branding y elementos visuales de marca',
            alt: 'Identidad corporativa de PuffyKitten con logo, colores, tipografía y estilo neobrutalista'
          },
          {
            title: 'Wireframes',
            description: 'Esquemas de interfaz y distribución de componentes',
            alt: 'Wireframes de baja fidelidad con estructura y layout de pantallas principales'
          }
        ]
      },
      result: {
        title: 'Resultado',
        bullets: [
          'Propuesta sólida y diferenciadora conectando productos físicos y digitales en un ecosistema unificado',
          'Sistema que aporta bienestar a los gatos mientras genera confianza y valor para sus dueños',
          'Crecimiento personal como diseñador UX/UI integrando investigación, estrategia, diseño visual y prototipado en una experiencia coherente e innovadora'
        ],
        prototypeDescription: 'Explora el prototipo funcional de PuffyKitten y descubre cómo funciona la experiencia completa del usuario, desde la compra hasta el análisis de comportamiento de su gato.'
      }
    }
  },

  // ===========================================
  // CHUPSEE PROJECT
  // ===========================================
  chupsee: {
    details: {
      creation: '2025',
      participants: '1 persona',
      methodology: 'Design Thinking',
      duration: '3 semanas',
    },
    introduction: 'Chupsee es una aplicación digital diseñada para encontrar las mejores ofertas online mediante monitoreo de precios, alertas personalizadas y análisis predictivo con IA. Permite tomar decisiones de compra más inteligentes y aprovechar descuentos en tiempo real, orientada a compradores digitales y analistas de precios.',
    problem: 'Dificultad para hacer seguimiento efectivo de precios en múltiples tiendas, pérdida frecuente de ofertas importantes y exceso de notificaciones irrelevantes. No existía una herramienta que centralizara comparadores, wishlists y alertas inteligentes en una misma aplicación.',
    solution: 'Una aplicación multiplataforma que centraliza comparación de precios, wishlists personalizadas y alertas configurables con gráficas de evolución. Integra inteligencia artificial predictiva para recomendar el momento óptimo de compra y filtrar notificaciones según preferencias del usuario.',
    sections: {
      empathize: {
        title: 'Empatizar',
        bullets: [
          'Benchmark de competidores directos (CamelCamelCamel, Keepa) e indirectos (Klarna) para identificar oportunidades',
          'Análisis DAFO revelando fortalezas del mercado de comparadores de precios',
          'Encuestas y entrevistas descubriendo necesidades clave: alertas personalizadas, wishlist propia, integración multiplataforma y experiencia intuitiva y confiable'
        ],
        images: [
          {
            title: 'Benchmark',
            description: 'Análisis de competidores directos e indirectos del mercado',
            alt: 'Empatizar - Benchmark'
          },
          {
            title: 'Encuestas y entrevistas',
            description: 'Investigación cualitativa para entender necesidades de usuarios',
            alt: 'Empatizar - Encuestas y entrevistas'
          },
          {
            title: 'Análisis DAFO',
            description: 'Evaluación de debilidades, amenazas, fortalezas y oportunidades',
            alt: 'Empatizar - Análisis DAFO'
          }
        ]
      },
      define: {
        title: 'Definir',
        bullets: [
          'Tres perfiles (user, buyer y arquetipo) representando diferentes usuarios digitales',
          'Mapa de empatía explorando pensamientos, emociones y necesidades',
          'Journey map reflejando el recorrido completo, puntos de dolor y expectativas en el proceso de compra online'
        ],
        images: [
          {
            title: 'Persona',
            description: 'Arquetipos de usuarios basados en investigación real',
            alt: 'Definir - Persona'
          },
          {
            title: 'Mapa de empatía',
            description: 'Análisis profundo de pensamientos, emociones y necesidades',
            alt: 'Definir - Mapa de empatía'
          },
          {
            title: 'Journey Map',
            description: 'Recorrido del usuario identificando puntos de dolor y oportunidades',
            alt: 'Definir - Journey Map'
          }
        ]
      },
      ideate: {
        title: 'Idear',
        bullets: [
          'Business Model Canvas basado en afiliación y publicidad como fuentes de ingresos',
          'Value Proposition ofreciendo app gratuita que simplifica compras, da control total y visualiza información clara',
          'Point of View reformulando el problema desde la perspectiva del usuario',
          'Priorización MoSCoW definiendo funcionalidades esenciales: comparador multitienda, alertas inteligentes y wishlist personalizada'
        ],
        images: [
          {
            title: 'Business Model Canvas',
            description: 'Modelo de negocio basado en afiliación y publicidad',
            alt: 'Idear - Business Model Canvas'
          },
          {
            title: 'Point of View',
            description: 'Reformulación del problema desde la perspectiva del usuario',
            alt: 'Idear - Point of View'
          },
          {
            title: 'Value Proposition',
            description: 'Propuesta de valor centrada en control y simplicidad para el usuario',
            alt: 'Idear - Value Proposition'
          },
          {
            title: 'MoSCoW',
            description: 'Priorización de funcionalidades esenciales del MVP',
            alt: 'Idear - MoSCoW'
          }
        ]
      },
      prototype: {
        title: 'Prototipar',
        bullets: [
          'Arquitectura de información garantizando navegación clara y coherente',
          'Identidad visual en tonos azules y violetas transmitiendo tecnología y confianza',
          'MVP con seguimiento de precios, alertas configurables, wishlist inteligente y gráficas de evolución',
          'Futuribles contemplando integración con redes sociales y recomendaciones avanzadas mediante IA'
        ],
        images: [
          {
            title: 'Arquitectura de la información',
            description: 'Estructura y organización de contenidos para navegación clara',
            alt: 'Prototipar - Arquitectura de la información'
          },
          {
            title: 'Identidad Corporativa',
            description: 'Sistema de diseño con tonos azules y violetas que transmiten tecnología y confianza',
            alt: 'Prototipar - Identidad Corporativa'
          }
        ]
      },
      result: {
        title: 'Resultado',
        bullets: [
          'Prototipo funcional desarrollado en Figma con experiencia completa navegable',
          'Propuesta sólida de diseño UX/UI centrada en el usuario',
          'Integración exitosa de investigación, estrategia e interfaz visual clara y atractiva'
        ],
        prototypeDescription: 'Explora el prototipo completo de Chupsee y descubre cómo los usuarios pueden comparar precios, gestionar su wishlist y recibir alertas inteligentes para encontrar las mejores ofertas.'
      }
    }
  },

  // ===========================================
  // GOTAPP PROJECT
  // ===========================================
  gotapp: {
    details: {
      creation: '2025',
      participants: '5 personas',
      methodology: 'Design Sprint',
      duration: '5 días',
    },
    introduction: 'GotApp es una aplicación diseñada para promover el consumo responsable de agua mediante monitorización diaria, visualización de métricas claras y dinámicas de gamificación. Desarrollada con metodología Design Sprint en 5 días, permite al usuario conocer y mejorar sus hábitos de consumo de manera educativa y motivadora.',
    problem: 'Falta de conciencia real sobre el consumo de agua en actividades cotidianas y ausencia de herramientas digitales que tradujeran estos datos en información útil y comprensible. Los usuarios desconocían su impacto ambiental diario y carecían de motivación para cambiar hábitos.',
    solution: 'Una app interactiva con monitorización en tiempo real que genera métricas comprensibles y visuales. Integra dinámicas de gamificación, sistema de recompensas y recomendaciones personalizadas para fomentar hábitos sostenibles mediante educación y motivación positiva del usuario.',
    sections: {
      define: {
        title: 'Definir',
        bullets: [
          'Mapa de empatía y creación de personas identificando motivaciones, frustraciones y expectativas de usuarios',
          'How Might We reformulando insights en oportunidades de diseño',
          'Reto enmarcado claramente: hacer visible y entendible el consumo de agua para motivar cambios de comportamiento'
        ],
        images: [
          {
            title: 'How Might We',
            description: 'Reformulación de insights en oportunidades de diseño',
            alt: 'How Might We transformando insights en oportunidades de diseño'
          },
          {
            title: 'User Personas',
            description: 'Perfiles detallados de usuarios objetivo del producto',
            alt: 'User Personas con perfiles detallados de usuarios objetivo de GotApp'
          },
          {
            title: 'Journey Map',
            description: 'Mapeo completo de la experiencia del usuario',
            alt: 'Journey Map del recorrido del usuario con puntos de dolor y oportunidades'
          }
        ]
      },
      ideate: {
        title: 'Idear',
        bullets: [
          'Dinámicas de Crazy 8s y sketching generando múltiples propuestas visuales y de interacción',
          'Brainstorming estructurado y mapas de afinidad organizando y priorizando ideas alineadas con el objetivo',
          'Conjunto de conceptos explorando distintas formas de representar consumo y motivar al usuario'
        ],
        images: [
          {
            title: 'Problema y Objetivo',
            description: 'Definición clara del reto y objetivo del sprint',
            alt: 'Definición del problema a resolver y objetivo del sprint de GotApp'
          },
          {
            title: 'Idea & Crazy 8',
            description: 'Generación rápida de 8 conceptos y soluciones divergentes',
            alt: 'Ejercicio Crazy 8 con 8 soluciones rápidas a la problemática identificada'
          }
        ]
      },
      decide: {
        title: 'Decidir',
        bullets: [
          'Técnicas de Dot Voting y matriz de decisión seleccionando ideas con mayor impacto y factibilidad',
          'Propuestas elegidas: dashboard claro, retos semanales y consejos prácticos',
          'Énfasis en equilibrar usabilidad, claridad visual y valor educativo'
        ],
        images: [
          {
            title: 'Crazy 8 Final',
            description: 'Selección de la idea ganadora mediante votación',
            alt: 'Crazy 8 final con la idea ganadora seleccionada por votación del equipo'
          },
          {
            title: 'Storyboard',
            description: 'Narrativa visual del escenario de uso de la solución',
            alt: 'Storyboard narrando el escenario de uso completo de GotApp'
          }
        ]
      },
      prototype: {
        title: 'Prototipar',
        bullets: [
          'Prototipos de alta fidelidad en Figma integrando identidad visual y flujos de interacción',
          'Simulación de experiencia de navegación validando arquitectura de información y pantallas clave',
          'Paso fundamental para testear rápidamente con usuarios y recoger feedback'
        ],
        images: [
          {
            title: 'Sitemap',
            description: 'Arquitectura de información y jerarquía de pantallas',
            alt: 'Sitemap mostrando la arquitectura de información y estructura de pantallas'
          },
          {
            title: 'Wireframes',
            description: 'Estructura de pantallas y flujos de navegación',
            alt: 'Wireframes de media-alta fidelidad con estructura y navegación de GotApp'
          }
        ]
      },
      test: {
        title: 'Testeo y MVP',
        bullets: [
          'Pruebas de usabilidad con grupo reducido analizando interacción con el prototipo',
          'Entrevistas cortas y métricas cualitativas detectando mejoras en arquitectura y gamificación',
          'Feedback confirmando interés en métricas claras y retos motivacionales, señalando necesidad de simplificar navegación',
          'MVP concebido con funcionalidades básicas: registro y monitorización de consumo, dashboard con métricas y sistema de retos semanales'
        ],
        images: [
          {
            title: 'Insights del Testeo - Parte 1',
            description: 'Primeros hallazgos clave de las pruebas con usuarios',
            alt: 'Primera parte de insights del testeo con usuarios reales de GotApp'
          },
          {
            title: 'Insights del Testeo - Parte 2',
            description: 'Hallazgos complementarios y validaciones del prototipo',
            alt: 'Segunda parte de insights del testeo con validaciones y aprendizajes'
          },
          {
            title: 'MVP y Futuribles',
            description: 'Producto mínimo viable y roadmap de evolución futura',
            alt: 'MVP de GotApp con funcionalidades core y roadmap de futuribles'
          }
        ]
      },
      result: {
        title: 'Resultado',
        bullets: [
          'Prototipo navegable en Figma ofreciendo experiencia clara, práctica y motivadora',
          'Aplicación permitiendo visualizar consumo de agua, recibir consejos y participar en dinámicas interactivas',
          'Valor pedagógico reforzando sostenibilidad y generando conciencia sobre importancia del recurso'
        ],
        prototypeDescription: 'Explora el prototipo completo de GotApp y descubre cómo los usuarios pueden monitorizar su consumo de agua, recibir consejos personalizados y participar en retos sostenibles.'
      }
    }
  },

  // ===========================================
  // DS POMERANIAN PROJECT
  // ===========================================
  dsPomeranian: {
    details: {
      creation: '2025',
      participants: '1 persona',
      methodology: 'DS Foundations',
      duration: '4 semanas',
    },
    introduction: 'Pomeranian es un Design System desarrollado para dar soporte a la aplicación Chupsee, estableciendo una base visual y funcional coherente y escalable. Siguiendo metodología Atomic Design, define tokens, estilos, componentes reutilizables y patrones de diseño que garantizan consistencia en todas las pantallas y permiten al equipo de diseño y desarrollo trabajar de forma eficiente.',
    problem: 'En proyectos digitales, la falta de un sistema de diseño estructurado provoca inconsistencias visuales, duplicación de trabajo y dificultad para escalar productos. Los diseñadores crean componentes desde cero sin documentación, mientras desarrolladores interpretan diseños sin guías claras, generando fricciones, retrabajos y pérdida de cohesión en la experiencia final.',
    solution: 'Pomeranian establece un lenguaje visual compartido basado en Atomic Design que define átomos, moléculas y organismos reutilizables. Incluye una librería completa de 12 componentes documentados con variantes, estados, tokens y especificaciones de uso, permitiendo diseño y desarrollo rápidos, coherentes y escalables.',
    backToProjects: 'Volver a Proyectos',
    styleGuide: {
      title: 'Guía de Estilos',
      description: 'Fundamentos visuales y tokens del sistema de diseño',
      atomicDesign: {
        title: 'Atomic Design',
        description: 'Arquitectura modular del sistema',
        alt: 'Metodología Atomic Design aplicada al sistema Pomeranian - Átomos, Moléculas, Organismos, Templates y Páginas'
      },
      colors: {
        title: 'Colores',
        description: 'Sistema cromático completo con paleta base y tokens semánticos',
        main: {
          title: 'Colores Principales',
          description: 'Paleta base y tokens semánticos',
          alt: 'Colores principales del Design System Pomeranian con valores HEX y tokens semánticos'
        },
        extended: {
          title: 'Paleta Extendida',
          description: 'Escalas tonales y grises',
          alt: 'Paleta de colores extendida con escala de grises y variaciones tonales'
        }
      },
      typography: {
        title: 'Tipografía',
        description: 'Jerarquía, escalado y tokens',
        alt: 'Sistema tipográfico completo con jerarquía de títulos, textos y especificaciones de uso'
      },
      shadows: {
        title: 'Sombras',
        description: 'Elevación y profundidad visual',
        alt: 'Sistema de elevación con tokens de sombras para crear jerarquía y profundidad visual'
      },
      grid: {
        title: 'Grid',
        description: 'Sistema de 4 columnas optimizado para mobile',
        alt: 'Sistema de grid mobile de 4 columnas con márgenes y gutters optimizados para dispositivos móviles'
      },
      spacing: {
        title: 'Espaciado',
        description: 'Espaciado, padding y margin',
        alt: 'Sistema de espaciado con tokens numéricos para padding, margin y dimensionado'
      }
    },
    components: {
      title: 'Librería de Componentes',
      description: 'Colección de 12 componentes documentados y reutilizables',
      avatar: {
        title: 'Avatar',
        component: {
          title: 'Componente Avatar',
          description: 'Anatomía y estructura base',
          alt: 'Componente Avatar - Anatomía y estructura del componente con todos sus elementos'
        },
        properties: {
          title: 'Propiedades',
          description: 'Tamaños, estados y variantes',
          alt: 'Propiedades del Avatar - Tamaños, estados y variantes del componente'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Avatar - Tokens y valores para personalización del componente'
        }
      },
      accordion: {
        title: 'Accordion',
        component: {
          title: 'Componente Accordion',
          description: 'Anatomía y estructura base',
          alt: 'Componente Accordion - Anatomía y estructura del componente expandible'
        },
        properties: {
          title: 'Propiedades',
          description: 'Estados y variantes',
          alt: 'Propiedades del Accordion - Estados expandido/colapsado y variantes'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Accordion - Tokens para personalización y comportamiento'
        }
      },
      button: {
        title: 'Button',
        component: {
          title: 'Componente Button',
          description: 'Anatomía y estructura base',
          alt: 'Componente Button - Anatomía y estructura del componente de acción'
        },
        properties: {
          title: 'Propiedades',
          description: 'Variantes, estados y tamaños',
          alt: 'Propiedades del Button - Variantes, estados y tamaños del componente'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Button - Tokens para personalización de colores, padding y bordes'
        }
      },
      card: {
        title: 'Card',
        component: {
          title: 'Componente Card',
          description: 'Anatomía y estructura base',
          alt: 'Componente Card - Anatomía y estructura del contenedor de información'
        },
        properties: {
          title: 'Propiedades',
          description: 'Elevación, padding y contenido',
          alt: 'Propiedades del Card - Variantes de elevación, padding y organización de contenido'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Card - Tokens para bordes, sombras y espaciado interno'
        }
      },
      carousel: {
        title: 'Carousel',
        component: {
          title: 'Componente Carousel',
          description: 'Anatomía y estructura base',
          alt: 'Componente Carousel - Anatomía y estructura del componente de deslizamiento'
        },
        dots: {
          title: 'Indicadores Dots',
          description: 'Navegación y control de slides',
          alt: 'Indicadores de navegación del Carousel - Sistema de dots para control de slides'
        },
        properties: {
          title: 'Propiedades',
          description: 'Variantes y transiciones',
          alt: 'Propiedades del Carousel - Variantes, estados y configuración de transiciones'
        }
      },
      checkbox: {
        title: 'Checkbox',
        component: {
          title: 'Componente Checkbox',
          description: 'Anatomía y estructura base',
          alt: 'Componente Checkbox - Anatomía y estructura del componente de selección'
        },
        properties: {
          title: 'Propiedades',
          description: 'Estados y variantes',
          alt: 'Propiedades del Checkbox - Estados checked, unchecked, indeterminate y disabled'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Checkbox - Tokens para colores, tamaños y espaciado'
        }
      },
      dropdown: {
        title: 'Dropdown',
        component: {
          title: 'Componente Dropdown',
          description: 'Anatomía y estructura base',
          alt: 'Componente Dropdown - Anatomía y estructura del menú desplegable'
        },
        general: {
          title: 'Propiedades Generales',
          description: 'Estados y configuración',
          alt: 'Propiedades generales del Dropdown - Estados y configuración inicial'
        },
        options: {
          title: 'Propiedades Options',
          description: 'Configuración de items',
          alt: 'Propiedades de opciones del Dropdown - Configuración de items individuales'
        },
        content: {
          title: 'Content Options',
          description: 'Layout del menú',
          alt: 'Propiedades del contenido de opciones - Layout y organización del menú'
        },
        final: {
          title: 'Propiedades Finales',
          description: 'Composición completa',
          alt: 'Propiedades finales del Dropdown - Composición completa y casos de uso'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Dropdown - Tokens para colores, espaciado y comportamiento'
        }
      },
      listItem: {
        title: 'List Item',
        component: {
          title: 'Componente List Item',
          description: 'Anatomía y estructura base',
          alt: 'Componente List Item - Anatomía y estructura del elemento de lista'
        },
        properties: {
          title: 'Propiedades',
          description: 'Estados y variantes',
          alt: 'Propiedades del List Item - Estados, variantes y configuración de contenido'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del List Item - Tokens para espaciado, colores y tipografía'
        }
      },
      modal: {
        title: 'Modal',
        component: {
          title: 'Componente Modal',
          description: 'Anatomía y estructura base',
          alt: 'Componente Modal - Anatomía y estructura de la ventana modal'
        },
        properties: {
          title: 'Propiedades',
          description: 'Tamaños y comportamiento',
          alt: 'Propiedades del Modal - Tamaños, posicionamiento y comportamiento'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Modal - Tokens para overlay, dimensiones y animaciones'
        }
      },
      textArea: {
        title: 'Text Area',
        component: {
          title: 'Componente Text Area',
          description: 'Anatomía y estructura base',
          alt: 'Componente Text Area - Anatomía y estructura del campo de texto multilínea'
        },
        properties: {
          title: 'Propiedades',
          description: 'Estados y tamaños',
          alt: 'Propiedades del Text Area - Estados, tamaños y configuración de altura'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Text Area - Tokens para bordes, padding y redimensionamiento'
        }
      },
      textInput: {
        title: 'Text Input',
        component: {
          title: 'Componente Text Input',
          description: 'Anatomía y estructura base',
          alt: 'Componente Text Input - Anatomía y estructura del campo de entrada'
        },
        properties: {
          title: 'Propiedades',
          description: 'Estados y variantes',
          alt: 'Propiedades del Text Input - Estados, variantes y configuración'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Text Input - Tokens para bordes, colores y tipografía'
        }
      },
      toggle: {
        title: 'Toggle',
        component: {
          title: 'Componente Toggle',
          description: 'Anatomía y estructura base',
          alt: 'Componente Toggle - Anatomía y estructura del switch binario'
        },
        properties: {
          title: 'Propiedades',
          description: 'Estados y tamaños',
          alt: 'Propiedades del Toggle - Estados, tamaños y comportamiento'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens y personalización',
          alt: 'Variables del Toggle - Tokens para colores, dimensiones y transiciones'
        }
      }
    },
    result: {
      title: 'Resultado',
      description: 'Pomeranian cumple su objetivo como sistema de diseño funcional, escalable y documentado. Acelera el proceso de diseño y desarrollo, garantiza consistencia visual en todas las pantallas de Chupsee y sienta las bases para futuros proyectos que requieran un lenguaje visual robusto y reutilizable.'
    },
    sections: {
      styleGuide: {
        title: 'Guía de Estilos',
        intro: 'Los fundamentos visuales del sistema de diseño definen la base sobre la cual se construyen todos los componentes y experiencias de usuario. Esta guía establece las reglas de color, tipografía, espaciado y otros elementos fundamentales que garantizan consistencia visual.',
        atomicDesignBullets: [
          'Cinco niveles jerárquicos: átomos, moléculas, organismos, templates y páginas',
          'Arquitectura modular garantizando escalabilidad, reutilización y coherencia'
        ],
        colorsBullets: [
          'Tokens semánticos definiendo paleta principal y escala extendida con variaciones tonales',
          'Validación WCAG 2.1 asegurando contraste suficiente para accesibilidad',
          'Escalas de grises y variantes para estados interactivos'
        ],
        typographyBullets: [
          'Escala modular con tokens específicos para tamaño, peso y altura de línea',
          'Adaptación responsiva optimizando legibilidad en cada breakpoint',
          'Especificaciones para títulos (H1-H5), cuerpo de texto, etiquetas y elementos interactivos'
        ],
        shadowsBullets: [
          'Tokens de sombras progresivos creando profundidad y jerarquía visual',
          'Niveles desde subtle hasta elevated para diferentes necesidades de interacción',
          'Feedback visual en estados hover y focus'
        ],
        gridBullets: [
          'Sistema de 4 columnas optimizado para experiencias mobile-first',
          'Márgenes y gutters adaptados aprovechando el espacio de forma inteligente',
          'Consistencia visual y mejor usabilidad en dispositivos táctiles'
        ],
        spacingBullets: [
          'Escala consistente basada en múltiplos (4px, 8px, 16px...) para padding, margin y dimensionado',
          'Sistema modular asegurando ritmo vertical, alineación precisa y coherencia espacial',
          'Simplifica implementación manteniendo armonía visual del producto'
        ]
      },
      components: {
        title: 'Componentes',
        intro: 'Esta librería completa de componentes reutilizables documenta anatomía, propiedades y variables de cada elemento del sistema. Cada componente incluye su estructura base, estados interactivos, variantes disponibles y tokens de personalización, garantizando una implementación consistente y mantenibilidad a largo plazo.',
        accordionDescription: 'Componente expandible para organizar contenido en secciones colapsables. Incluye estados de expansión/contracción, iconografía de indicadores y soporte para acordeones individuales o en grupo. Ideal para FAQs, navegación secundaria y revelación progresiva de información.',
        avatarDescription: 'Componente para representación visual de usuarios mediante imagen circular. Soporta múltiples tamaños (XS, S, M, L, XL), badges de estado (online/offline/away), fallback con iniciales y agrupación de avatares. Optimizado para interfaces sociales y colaborativas.',
        buttonDescription: 'Componente de acción principal con variantes semánticas (primary, secondary, cancel), estados interactivos completos (default, hover, active, disabled) y tres tamaños responsivos. Incluye soporte para iconos y configuración de ancho completo.',
        cardDescription: 'Contenedor flexible para agrupar información relacionada con elevación y jerarquía visual. Configuración de padding interno y organización modular de header, body y footer. Ideal para layouts tipo dashboard, galerías y presentación de contenido estructurado.',
        carouselDescription: 'Componente de deslizamiento para presentar contenido en secuencia horizontal o vertical. Incluye controles de navegación (flechas, dots), autoplay configurable, transiciones suaves y soporte para gestos táctiles. Ideal para galerías de imágenes, testimonios y showcases de productos.',
        checkboxDescription: 'Control de selección múltiple con tres estados (checked, unchecked, indeterminate) y completa accesibilidad. Documentación incluye anatomía, estados interactivos, variantes de tamaño y sistema de tokens para personalización. Esencial para formularios, selección masiva y configuraciones.',
        dropdownDescription: 'Menú desplegable complejo documentado en profundidad. Incluye anatomía del trigger, contenedor de opciones, estados de cada item, configuración de layout y posicionamiento. Soporta búsqueda, agrupación de items, iconos, y múltiples variantes para diferentes contextos de uso.',
        listItemDescription: 'Elemento fundamental para construcción de listas interactivas. Documentación completa de anatomía (leading icon, título, descripción, trailing action), estados (default, hover, active, selected), y configuración de altura. Base para navigation items, menús y contenido estructurado.',
        modalDescription: 'Ventana modal overlay con gestión de focus trap y backdrop. Documentación de anatomía (header, content, footer), tamaños predefinidos (S, M, L), posicionamiento centrado y sistema de tokens para overlay, dimensiones y animaciones de entrada/salida.',
        textAreaDescription: 'Campo de texto multilínea para entrada de contenido extenso. Incluye estados de validación (default, error, success), configuración de altura mínima/máxima, contador de caracteres opcional y resize behavior. Tokens para bordes, padding y personalización de scrollbar.',
        textInputDescription: 'Campo de entrada de texto de línea única con soporte para iconos leading/trailing, estados de validación, placeholder styling y diferentes tipos (text, email, password, number). Sistema completo de tokens para bordes, estados de focus y personalización tipográfica.',
        toggleDescription: 'Switch binario interactivo documentado con anatomía del componente, propiedades de estado y comportamiento. La documentación abarca estados on/off, variantes de tamaño (S, M, L), estados interactivos (hover, focus, disabled) y sistema completo de variables para personalización de colores, dimensiones del track y knob, y transiciones animadas.'
      },
      relatedProjects: {
        title: 'Más proyectos',
        description: 'Explora otros casos de estudio donde aplico metodologías de diseño centrado en el usuario para crear experiencias digitales innovadoras.',
        viewAll: 'Ver Todos los Proyectos'
      }
    }
  }
};