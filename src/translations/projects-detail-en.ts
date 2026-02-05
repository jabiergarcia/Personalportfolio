// Detailed project translations - English
// This file contains all the detailed content for individual project pages

export const projectsDetailEN = {
  // ===========================================
  // ASSORTA PROJECT
  // ===========================================
  assorta: {
    details: {
      creation: '2026',
      participants: '1 person',
      methodology: 'Product-driven development',
      duration: 'In development',
    },
    introduction: 'Assorta is a B2B SaaS platform designed to digitize the Visual Merchandising process in fashion retail. Born from real professional experience, it is built as a functional solution oriented to in-store use, coordinating teams.',
    problem: 'Visual Merchandising teams lack a digital tool that connects visual planning, product allocation and in-store execution. Information is scattered across PDFs, spreadsheets and informal messages, preventing a clear, traceable and measurable view of commercial impact.',
    solution: 'Assorta centralizes the entire Visual Merchandising workflow in a visual, operational and collaborative platform. It allows planning layouts, performing digital sample picking and structuring in-store implementation, connecting visual decisions with real data and reducing operational friction.',
    sections: {
      context: {
        title: 'Problem Context',
        bullets: [
          'I decided to start this project based on over 10 years of experience working in-store and coordinating visual implementations under operational pressure',
          'In most medium and large retailers, Visual Merchandising still relies on tools not designed for this purpose: Excel, PDFs, photographs and instant messaging',
          'This lack of specific tools causes inconsistencies between stores, implementation errors and a huge administrative burden for teams that should focus on creative and commercial work'
        ],
        images: [
          {
            title: 'Layout Editor',
            description: 'Real visual store planning',
            alt: 'Visual layout editor for store planning'
          },
          {
            title: 'Visual Sample Picking',
            description: 'Direct product allocation',
            alt: 'Visual product allocation to zones'
          },
          {
            title: 'Store Overview',
            description: 'Global implementation vision',
            alt: 'Overview of store implementations'
          }
        ]
      },
      problem: {
        title: 'Problem Definition',
        bullets: [
          'There is no digital product where layouts, products, store zones and implementation states can be centralized',
          'I identified that one of the main bottlenecks was unidirectional communication between headquarters and stores, which prevented adapting visual decisions to available stock',
          'Visual decisions are not recorded or linked to commercial results, preventing learning, iteration and optimization of future implementations',
          'Visual Merchandising lacks tools that speak its same language: space, product, concept and rotation'
        ],
        images: [
          {
            title: 'Operational Roles',
            description: 'Real retail structure',
            alt: 'Operational roles within retail'
          },
          {
            title: 'Store Zones',
            description: 'Operational spatial clarity',
            alt: 'Store zones and areas'
          },
          {
            title: 'Operational Flow',
            description: 'Clear and repeatable process',
            alt: 'Operational workflow'
          }
        ]
      },
      decisions: {
        title: 'Product Decisions',
        bullets: [
          'Sample picking is defined as the core of the system, understanding that product-to-space allocation is the critical point of the process',
          'I decided to prioritize visual clarity and speed of use over functional complexity, consciously assuming certain limitations, because the product is used in high operational pressure contexts in-store',
          'All design decisions are based on real store flows: space plans, zone selection to visualize layouts, element numbering, stock adaptation, visual validation and operational documentation',
          'I consciously ruled out creating heavy enterprise software and opted for a direct and visual experience, aligned with the real way Visual Merchandising teams work'
        ],
        images: [
          {
            title: 'Product Flow',
            description: 'The system core',
            alt: 'Main product flow'
          },
          {
            title: 'Editor Detail',
            description: 'UX designed for daily use',
            alt: 'Visual editor detail'
          },
          {
            title: 'Applied Moodboard',
            description: 'From concept to store',
            alt: 'Moodboard applied to store'
          }
        ]
      },
      build: {
        title: 'Product Build',
        bullets: [
          'I chose to develop Assorta as a high-fidelity functional application using Figma Make, with the goal of quickly validating the product in real use before a technical development phase',
          'The 2D editor allows digitizing the physical store space and working on it visually through drag & drop',
          'The system integrates moodboards, sample picking, layouts and store plans in a single environment, reducing tool switching',
          'The product is built iteratively, validating each functionality against its real use and contribution to daily workflow'
        ],
        images: [
          {
            title: '2D Editor',
            description: 'Digitized physical space',
            alt: 'Store 2D editor'
          },
          {
            title: 'Drag & Drop',
            description: 'Direct and visual interaction',
            alt: 'Drag and drop interaction'
          },
          {
            title: 'Store KPIs',
            description: 'Visible commercial impact',
            alt: 'Visual store KPIs'
          }
        ]
      },
      result: {
        title: 'Result',
        bullets: [
          'Assorta is a functional web platform that digitizes a key fashion retail process historically manual and poorly traceable',
          'The project demonstrates how professional experience can become a digital product without depending on traditional academic research',
          'It represents a personal turning point, consolidating the transition from Visual Merchandising Manager to Product Designer with focus on real B2B tools',
          'The product is ready to scale towards integrations with RFID, advanced KPIs and multi-store environments'
        ],
        externalLink: {
          label: 'Explore the live application',
          description: 'Access the platform and explore the product in action'
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
      participants: '1 person',
      methodology: 'Design Thinking',
      duration: '4 weeks',
    },
    introduction: 'PuffyKitten is a personal UX/UI design project that seeks to improve feline wellbeing through technology. The platform integrates an organic catnip e-commerce, smart toys with real-time monitoring and an AI that analyzes cat videos to generate behavioral reports.',
    problem: 'The lack of a digital ecosystem that united product purchase, usage tracking and access to information about feline behavior. Also, difficulty finding natural catnip of national origin, limiting options for owners concerned about their cats\' wellbeing.',
    solution: 'A complete digital experience that combines e-commerce, real-time IoT monitoring and artificial intelligence analysis. The system generates personalized recommendations and behavior reports based on actual product usage.',
    sections: {
      empathize: {
        title: 'Empathize',
        bullets: [
          'Benchmark of direct and indirect competitors (Catit, Tractive, Tiendanimal) identifying strengths and weaknesses',
          'SWOT analysis highlighting opportunities: pet-tech market growth, demand for sustainable products and viral content potential',
          'Surveys and interviews with cat owners revealing key insights: 81% interest in smart toys, 75% in emotional reports and 94% valuing sustainable packaging'
        ],
        images: [
          {
            title: 'Benchmark',
            description: 'Comparative analysis of direct and indirect competitors',
            alt: 'Benchmark of PuffyKitten direct and indirect competitors'
          },
          {
            title: 'SWOT',
            description: 'Strategic SWOT analysis of the product',
            alt: 'PuffyKitten SWOT analysis with weaknesses, threats, strengths and opportunities'
          },
          {
            title: 'Insights',
            description: 'Key findings from surveys and user interviews',
            alt: 'Key insights obtained from surveys and user interviews'
          }
        ]
      },
      define: {
        title: 'Define',
        bullets: [
          'User, buyer and archetype profiles to represent different segments',
          'Empathy map collecting motivations, frustrations and aspirations',
          'Journey map visualizing the journey from purchase to digital interaction',
          'Identification of friction points: lack of reliable catnip information, difficulty finding sustainable products and scarce connected toy offerings'
        ],
        images: [
          {
            title: 'Persona Profiles',
            description: 'User persona, buyer persona and brand archetype',
            alt: 'PuffyKitten user, buyer and archetype profiles'
          },
          {
            title: 'Empathy Map',
            description: 'User motivations, frustrations and aspirations',
            alt: 'Empathy map with user motivations, frustrations and aspirations'
          },
          {
            title: 'Journey Map',
            description: 'Complete user journey from purchase to use',
            alt: 'Journey map of complete user journey with PuffyKitten'
          }
        ]
      },
      ideate: {
        title: 'Ideate',
        bullets: [
          'Business Model Canvas with key activities: platform development, animal welfare research and strategic alliances',
          'Value proposition focused on transforming catnip consumption into a digital, emotional and social experience',
          'MoSCoW prioritization establishing as essential: sustainable local catnip sale, AI for video analysis and integration between physical and digital devices'
        ],
        images: [
          {
            title: 'Business Model Canvas',
            description: 'Business model with key activities and alliances',
            alt: 'Business Model Canvas with key activities, value proposition and strategic alliances'
          },
          {
            title: 'Value Proposition Canvas',
            description: 'Value proposition based on sustainability and technology',
            alt: 'Value Proposition Canvas focused on digital, emotional and social experience'
          },
          {
            title: 'Point of View',
            description: 'User-specific perspective and needs',
            alt: 'Point of View defining target user perspective and needs'
          },
          {
            title: 'MoSCoW Prioritization',
            description: 'Feature prioritization by importance',
            alt: 'MoSCoW prioritization matrix with must-have, should-have and could-have features'
          }
        ]
      },
      prototype: {
        title: 'Prototype',
        bullets: [
          'Information architecture and visual identity under neobrutalist style conveying freshness and innovation',
          'Application of design laws: Jakob Nielsen\'s visibility, aesthetics-usability and cognitive simplicity',
          'MVP including catnip sale, smart toy prototype with sensors and dashboard with basic AI analysis',
          'Exploration of future possibilities: advanced emotional detection algorithms, social media integration and professional validation'
        ],
        images: [
          {
            title: 'Information Architecture',
            description: 'Hierarchical organization and navigation structure',
            alt: 'Information architecture showing content organization and navigation flows'
          },
          {
            title: 'Corporate Identity',
            description: 'Branding system and brand visual elements',
            alt: 'PuffyKitten corporate identity with logo, colors, typography and neobrutalist style'
          },
          {
            title: 'Wireframes',
            description: 'Interface schematics and component layout',
            alt: 'Low-fidelity wireframes with structure and layout of main screens'
          }
        ]
      },
      result: {
        title: 'Result',
        bullets: [
          'Solid and differentiating proposal connecting physical and digital products in a unified ecosystem',
          'System that provides wellbeing to cats while generating trust and value for their owners',
          'Personal growth as UX/UI designer integrating research, strategy, visual design and prototyping in a coherent and innovative experience'
        ],
        prototypeDescription: 'Explore the PuffyKitten functional prototype and discover how the complete user experience works, from purchase to analyzing their cat\'s behavior.'
      }
    }
  },

  // ===========================================
  // CHUPSEE PROJECT
  // ===========================================
  chupsee: {
    details: {
      creation: '2025',
      participants: '1 person',
      methodology: 'Design Thinking',
      duration: '3 weeks',
    },
    introduction: 'Chupsee is a digital application designed to find the best online deals through price monitoring, personalized alerts and predictive AI analysis. It allows making smarter purchase decisions and taking advantage of real-time discounts, oriented to digital shoppers and price analysts.',
    problem: 'Difficulty making effective price tracking across multiple stores, frequent loss of important offers and excess irrelevant notifications. There was no tool that centralized comparators, wishlists and smart alerts in the same application.',
    solution: 'A cross-platform application that centralizes price comparison, personalized wishlists and configurable alerts with evolution charts. It integrates predictive artificial intelligence to recommend the optimal purchase moment and filter notifications according to user preferences.',
    sections: {
      empathize: {
        title: 'Empathize',
        bullets: [
          'Benchmark of direct competitors (CamelCamelCamel, Keepa) and indirect (Klarna) to identify opportunities',
          'SWOT analysis revealing strengths in the price comparator market',
          'Surveys and interviews discovering key needs: personalized alerts, own wishlist, cross-platform integration and intuitive and reliable experience'
        ],
        images: [
          {
            title: 'Benchmark',
            description: 'Analysis of direct and indirect market competitors',
            alt: 'Empathize - Benchmark'
          },
          {
            title: 'Surveys and Interviews',
            description: 'Qualitative research to understand user needs',
            alt: 'Empathize - Surveys and interviews'
          },
          {
            title: 'SWOT Analysis',
            description: 'Evaluation of weaknesses, threats, strengths and opportunities',
            alt: 'Empathize - SWOT Analysis'
          }
        ]
      },
      define: {
        title: 'Define',
        bullets: [
          'Three profiles (user, buyer and archetype) representing different digital users',
          'Empathy map exploring thoughts, emotions and needs',
          'Journey map reflecting the complete journey, pain points and expectations in the online purchase process'
        ],
        images: [
          {
            title: 'Persona',
            description: 'User archetypes based on real research',
            alt: 'Define - Persona'
          },
          {
            title: 'Empathy Map',
            description: 'Deep analysis of thoughts, emotions and needs',
            alt: 'Define - Empathy map'
          },
          {
            title: 'Journey Map',
            description: 'User journey identifying pain points and opportunities',
            alt: 'Define - Journey Map'
          }
        ]
      },
      ideate: {
        title: 'Ideate',
        bullets: [
          'Business Model Canvas based on affiliation and advertising as revenue sources',
          'Value Proposition offering free app that simplifies shopping, gives total control and visualizes clear information',
          'Point of View reformulating the problem from user perspective',
          'MoSCoW prioritization defining essential features: multi-store comparator, smart alerts and personalized wishlist'
        ],
        images: [
          {
            title: 'Business Model Canvas',
            description: 'Business model based on affiliation and advertising',
            alt: 'Ideate - Business Model Canvas'
          },
          {
            title: 'Point of View',
            description: 'Problem reformulation from user perspective',
            alt: 'Ideate - Point of View'
          },
          {
            title: 'Value Proposition',
            description: 'Value proposition focused on control and simplicity for user',
            alt: 'Ideate - Value Proposition'
          },
          {
            title: 'MoSCoW',
            description: 'Prioritization of essential MVP features',
            alt: 'Ideate - MoSCoW'
          }
        ]
      },
      prototype: {
        title: 'Prototype',
        bullets: [
          'Information architecture ensuring clear and coherent navigation',
          'Visual identity in blue and violet tones conveying technology and trust',
          'MVP with price tracking, configurable alerts, smart wishlist and evolution charts',
          'Future possibilities contemplating social media integration and advanced AI recommendations'
        ],
        images: [
          {
            title: 'Information Architecture',
            description: 'Content structure and organization for clear navigation',
            alt: 'Prototype - Information Architecture'
          },
          {
            title: 'Corporate Identity',
            description: 'Design system with blue and violet tones conveying technology and trust',
            alt: 'Prototype - Corporate Identity'
          }
        ]
      },
      result: {
        title: 'Result',
        bullets: [
          'Functional prototype developed in Figma with complete navigable experience',
          'Solid user-centered UX/UI design proposal',
          'Successful integration of research, strategy and clear and attractive visual interface'
        ],
        prototypeDescription: 'Explore the complete Chupsee prototype and discover how users can compare prices, manage their wishlist and receive smart alerts to find the best deals.'
      }
    }
  },

  // ===========================================
  // GOTAPP PROJECT
  // ===========================================
  gotapp: {
    details: {
      creation: '2025',
      participants: '5 people',
      methodology: 'Design Sprint',
      duration: '5 days',
    },
    introduction: 'GotApp is an application designed to promote responsible water consumption through daily monitoring, clear metrics visualization and gamification dynamics. Developed with Design Sprint methodology in 5 days, it allows users to know and improve their consumption habits in an educational and motivating way.',
    problem: 'Lack of real awareness about water consumption in daily activities and absence of digital tools that translated this data into useful and understandable information. Users were unaware of their daily environmental impact and lacked motivation to change habits.',
    solution: 'An interactive app with real-time monitoring that generates understandable and visual metrics. It integrates gamification dynamics, reward system and personalized recommendations to encourage sustainable habits through education and positive user motivation.',
    sections: {
      define: {
        title: 'Define',
        bullets: [
          'Empathy map and persona creation identifying user motivations, frustrations and expectations',
          'How Might We reformulating insights into design opportunities',
          'Challenge clearly framed: make water consumption visible and understandable to motivate behavior changes'
        ],
        images: [
          {
            title: 'How Might We',
            description: 'Reformulation of insights into design opportunities',
            alt: 'How Might We transforming insights into design opportunities'
          },
          {
            title: 'User Personas',
            description: 'Detailed profiles of product target users',
            alt: 'User Personas with detailed profiles of GotApp target users'
          },
          {
            title: 'Journey Map',
            description: 'Complete mapping of user experience',
            alt: 'Journey Map of user journey with pain points and opportunities'
          }
        ]
      },
      ideate: {
        title: 'Ideate',
        bullets: [
          'Crazy 8s and sketching dynamics generating multiple visual and interaction proposals',
          'Structured brainstorming and affinity maps organizing and prioritizing ideas aligned with the objective',
          'Set of concepts exploring different ways to represent consumption and motivate the user'
        ],
        images: [
          {
            title: 'Problem and Objective',
            description: 'Clear definition of challenge and sprint objective',
            alt: 'Definition of problem to solve and GotApp sprint objective'
          },
          {
            title: 'Idea & Crazy 8',
            description: 'Rapid generation of 8 concepts and divergent solutions',
            alt: 'Crazy 8 exercise with 8 quick solutions to identified problem'
          }
        ]
      },
      decide: {
        title: 'Decide',
        bullets: [
          'Dot Voting and decision matrix techniques selecting ideas with greatest impact and feasibility',
          'Chosen proposals: clear dashboard, weekly challenges and practical tips',
          'Emphasis on balancing usability, visual clarity and educational value'
        ],
        images: [
          {
            title: 'Final Crazy 8',
            description: 'Selection of winning idea through voting',
            alt: 'Final Crazy 8 with winning idea selected by team voting'
          },
          {
            title: 'Storyboard',
            description: 'Visual narrative of solution usage scenario',
            alt: 'Storyboard narrating complete GotApp usage scenario'
          }
        ]
      },
      prototype: {
        title: 'Prototype',
        bullets: [
          'High-fidelity prototypes in Figma integrating visual identity and interaction flows',
          'Navigation experience simulation validating information architecture and key screens',
          'Fundamental step to quickly test with users and collect feedback'
        ],
        images: [
          {
            title: 'Sitemap',
            description: 'Information architecture and screen hierarchy',
            alt: 'Sitemap showing information architecture and screen structure'
          },
          {
            title: 'Wireframes',
            description: 'Screen structure and navigation flows',
            alt: 'Medium-high fidelity wireframes with GotApp structure and navigation'
          }
        ]
      },
      test: {
        title: 'Testing and MVP',
        bullets: [
          'Usability testing with small group analyzing interaction with prototype',
          'Short interviews and qualitative metrics detecting improvements in architecture and gamification',
          'Feedback confirming interest in clear metrics and motivational challenges, pointing out need to simplify navigation',
          'MVP conceived with basic functionalities: consumption registration and monitoring, dashboard with metrics and weekly challenge system'
        ],
        images: [
          {
            title: 'Testing Insights - Part 1',
            description: 'First key findings from user testing',
            alt: 'First part of testing insights with real GotApp users'
          },
          {
            title: 'Testing Insights - Part 2',
            description: 'Complementary findings and prototype validations',
            alt: 'Second part of testing insights with validations and learnings'
          },
          {
            title: 'MVP and Future',
            description: 'Minimum viable product and future evolution roadmap',
            alt: 'GotApp MVP with core features and future roadmap'
          }
        ]
      },
      result: {
        title: 'Result',
        bullets: [
          'Navigable Figma prototype offering clear, practical and motivating experience',
          'Application allowing water consumption visualization, receiving tips and participating in interactive dynamics',
          'Pedagogical value reinforcing sustainability and generating awareness about resource importance'
        ],
        prototypeDescription: 'Explore the complete GotApp prototype and discover how users can monitor their water consumption, receive personalized tips and participate in sustainable challenges.'
      }
    }
  },

  // ===========================================
  // DS POMERANIAN PROJECT
  // ===========================================
  dsPomeranian: {
    details: {
      creation: '2025',
      participants: '1 person',
      methodology: 'DS Foundations',
      duration: '4 weeks',
    },
    introduction: 'Pomeranian is a Design System developed to support the Chupsee application, establishing a coherent and scalable visual and functional foundation. Following Atomic Design methodology, it defines tokens, styles, reusable components and design patterns that ensure consistency across all screens and allow the design and development team to work efficiently.',
    problem: 'In digital projects, the lack of a structured design system causes visual inconsistencies, work duplication and difficulty scaling products. Designers create components from scratch without documentation, while developers interpret designs without clear guidelines, generating friction, rework and loss of cohesion in the final experience.',
    solution: 'Pomeranian establishes a shared visual language based on Atomic Design that defines reusable atoms, molecules and organisms. It includes a complete library of 12 documented components with variants, states, tokens and usage specifications, enabling rapid, coherent and scalable design and development.',
    backToProjects: 'Back to Projects',
    styleGuide: {
      title: 'Style Guide',
      description: 'Visual foundations and design system tokens',
      atomicDesign: {
        title: 'Atomic Design',
        description: 'Modular system architecture',
        alt: 'Atomic Design methodology applied to Pomeranian system - Atoms, Molecules, Organisms, Templates and Pages'
      },
      colors: {
        title: 'Colors',
        description: 'Complete color system with base palette and semantic tokens',
        main: {
          title: 'Main Colors',
          description: 'Base palette and semantic tokens',
          alt: 'Pomeranian Design System main colors with HEX values and semantic tokens'
        },
        extended: {
          title: 'Extended Palette',
          description: 'Tonal scales and grays',
          alt: 'Extended color palette with grayscale and tonal variations'
        }
      },
      typography: {
        title: 'Typography',
        description: 'Hierarchy, scaling and tokens',
        alt: 'Complete typographic system with heading hierarchy, texts and usage specifications'
      },
      shadows: {
        title: 'Shadows',
        description: 'Elevation and visual depth',
        alt: 'Elevation system with shadow tokens to create visual hierarchy and depth'
      },
      grid: {
        title: 'Grid',
        description: '4-column system optimized for mobile',
        alt: 'Mobile grid system with 4 columns with margins and gutters optimized for mobile devices'
      },
      spacing: {
        title: 'Spacing',
        description: 'Spacing, padding and margin',
        alt: 'Spacing system with numeric tokens for padding, margin and sizing'
      }
    },
    components: {
      title: 'Component Library',
      description: 'Collection of 12 documented and reusable components',
      avatar: {
        title: 'Avatar',
        component: {
          title: 'Avatar Component',
          description: 'Anatomy and base structure',
          alt: 'Avatar Component - Anatomy and structure of the component with all its elements'
        },
        properties: {
          title: 'Properties',
          description: 'Sizes, states and variants',
          alt: 'Avatar Properties - Sizes, states and variants of the component'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Avatar Variables - Tokens and values for component customization'
        }
      },
      accordion: {
        title: 'Accordion',
        component: {
          title: 'Accordion Component',
          description: 'Anatomy and base structure',
          alt: 'Accordion Component - Anatomy and structure of the expandable component'
        },
        properties: {
          title: 'Properties',
          description: 'States and variants',
          alt: 'Accordion Properties - Expanded/collapsed states and variants'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Accordion Variables - Tokens for customization and behavior'
        }
      },
      button: {
        title: 'Button',
        component: {
          title: 'Button Component',
          description: 'Anatomy and base structure',
          alt: 'Button Component - Anatomy and structure of the action component'
        },
        properties: {
          title: 'Properties',
          description: 'Variants, states and sizes',
          alt: 'Button Properties - Variants, states and sizes of the component'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Button Variables - Tokens for customization of colors, padding and borders'
        }
      },
      card: {
        title: 'Card',
        component: {
          title: 'Card Component',
          description: 'Anatomy and base structure',
          alt: 'Card Component - Anatomy and structure of the information container'
        },
        properties: {
          title: 'Properties',
          description: 'Elevation, padding and content',
          alt: 'Card Properties - Elevation variants, padding and content organization'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Card Variables - Tokens for borders, shadows and internal spacing'
        }
      },
      carousel: {
        title: 'Carousel',
        component: {
          title: 'Carousel Component',
          description: 'Anatomy and base structure',
          alt: 'Carousel Component - Anatomy and structure of the sliding component'
        },
        dots: {
          title: 'Dots Indicators',
          description: 'Navigation and slide control',
          alt: 'Carousel navigation indicators - Dots system for slide control'
        },
        properties: {
          title: 'Properties',
          description: 'Variants and transitions',
          alt: 'Carousel Properties - Variants, states and transition configuration'
        }
      },
      checkbox: {
        title: 'Checkbox',
        component: {
          title: 'Checkbox Component',
          description: 'Anatomy and base structure',
          alt: 'Checkbox Component - Anatomy and structure of the selection component'
        },
        properties: {
          title: 'Properties',
          description: 'States and variants',
          alt: 'Checkbox Properties - States, variants and configuration'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Checkbox Variables - Tokens for borders, colors and states'
        }
      },
      dropdown: {
        title: 'Dropdown',
        component: {
          title: 'Dropdown Component',
          description: 'Anatomy and base structure',
          alt: 'Dropdown Component - Anatomy and structure of the dropdown menu'
        },
        properties: {
          title: 'Properties',
          description: 'States and variants',
          alt: 'Dropdown Properties - States, variants and configuration'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Dropdown Variables - Tokens for colors, spacing and behavior'
        }
      },
      listItem: {
        title: 'List Item',
        component: {
          title: 'List Item Component',
          description: 'Anatomy and base structure',
          alt: 'List Item Component - Anatomy and structure of the list element'
        },
        properties: {
          title: 'Properties',
          description: 'States and configuration',
          alt: 'List Item Properties - States, height and configuration'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'List Item Variables - Tokens for spacing, colors and typography'
        }
      },
      modal: {
        title: 'Modal',
        component: {
          title: 'Modal Component',
          description: 'Anatomy and base structure',
          alt: 'Modal Component - Anatomy and structure of the modal window'
        },
        properties: {
          title: 'Properties',
          description: 'Sizes and behavior',
          alt: 'Modal Properties - Sizes, positioning and behavior'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Modal Variables - Tokens for overlay, dimensions and animations'
        }
      },
      textArea: {
        title: 'Text Area',
        component: {
          title: 'Text Area Component',
          description: 'Anatomy and base structure',
          alt: 'Text Area Component - Anatomy and structure of the multi-line text field'
        },
        properties: {
          title: 'Properties',
          description: 'States and sizes',
          alt: 'Text Area Properties - States, sizes and height configuration'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Text Area Variables - Tokens for borders, padding and resizing'
        }
      },
      textInput: {
        title: 'Text Input',
        component: {
          title: 'Text Input Component',
          description: 'Anatomy and base structure',
          alt: 'Text Input Component - Anatomy and structure of the input field'
        },
        properties: {
          title: 'Properties',
          description: 'States and variants',
          alt: 'Text Input Properties - States, variants and configuration'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Text Input Variables - Tokens for borders, colors and typography'
        }
      },
      toggle: {
        title: 'Toggle',
        component: {
          title: 'Toggle Component',
          description: 'Anatomy and base structure',
          alt: 'Toggle Component - Anatomy and structure of the binary switch'
        },
        properties: {
          title: 'Properties',
          description: 'States and sizes',
          alt: 'Toggle Properties - States, sizes and behavior'
        },
        variables: {
          title: 'Variables',
          description: 'Tokens and customization',
          alt: 'Toggle Variables - Tokens for colors, dimensions and transitions'
        }
      }
    },
    result: {
      title: 'Result',
      description: 'Pomeranian fulfills its objective as a functional, scalable and documented design system. It accelerates the design and development process, ensures visual consistency across all Chupsee screens and lays the foundation for future projects requiring a robust and reusable visual language.'
    },
    sections: {
      styleGuide: {
        title: 'Style Guide',
        intro: 'The visual foundations of the design system define the base upon which all components and user experiences are built. This guide establishes the rules for color, typography, spacing and other fundamental elements that ensure visual consistency.',
        atomicDesignBullets: [
          'Five hierarchical levels: atoms, molecules, organisms, templates and pages',
          'Modular architecture ensuring scalability, reusability and coherence'
        ],
        colorsBullets: [
          'Semantic tokens defining main palette and extended scale with tonal variations',
          'WCAG 2.1 validation ensuring sufficient contrast for accessibility',
          'Grayscale and variants for interactive states'
        ],
        typographyBullets: [
          'Modular scale with specific tokens for size, weight and line height',
          'Responsive adaptation optimizing readability at each breakpoint',
          'Specifications for headings (H1-H5), body text, labels and interactive elements'
        ],
        shadowsBullets: [
          'Progressive shadow tokens creating depth and visual hierarchy',
          'Levels from subtle to elevated for different interaction needs',
          'Visual feedback on hover and focus states'
        ],
        gridBullets: [
          '4-column system optimized for mobile-first experiences',
          'Adapted margins and gutters making intelligent use of space',
          'Visual consistency and better usability on touch devices'
        ],
        spacingBullets: [
          'Consistent scale based on multiples (4px, 8px, 16px...) for padding, margin and sizing',
          'Modular system ensuring vertical rhythm, precise alignment and spatial coherence',
          'Simplifies implementation while maintaining visual harmony of the product'
        ]
      },
      components: {
        title: 'Components',
        intro: 'This complete library of reusable components documents anatomy, properties and variables of each system element. Each component includes its base structure, interactive states, available variants and customization tokens, ensuring consistent implementation and long-term maintainability.',
        accordionDescription: 'Expandable component to organize content in collapsible sections. Includes expansion/contraction states, indicator iconography and support for individual or group accordions. Ideal for FAQs, secondary navigation and progressive information disclosure.',
        avatarDescription: 'Component for visual user representation via circular image. Supports multiple sizes (XS, S, M, L, XL), status badges (online/offline/away), fallback with initials and avatar grouping. Optimized for social and collaborative interfaces.',
        buttonDescription: 'Primary action component with semantic variants (primary, secondary, cancel), complete interactive states (default, hover, active, disabled) and three responsive sizes. Includes icon support and full-width configuration.',
        cardDescription: 'Flexible container to group related information with elevation and visual hierarchy. Internal padding configuration and modular organization of header, body and footer. Ideal for dashboard layouts, galleries and structured content presentation.',
        carouselDescription: 'Sliding component to present content in horizontal or vertical sequence. Includes navigation controls (arrows, dots), configurable autoplay, smooth transitions and touch gesture support. Ideal for image galleries, testimonials and product showcases.',
        checkboxDescription: 'Multiple selection control with three states (checked, unchecked, indeterminate) and complete accessibility. Documentation includes anatomy, interactive states, size variants and token system for customization. Essential for forms, bulk selection and settings.',
        dropdownDescription: 'Complex dropdown menu documented in depth. Includes trigger anatomy, options container, each item states, layout configuration and positioning. Supports search, item grouping, icons, and multiple variants for different use contexts.',
        listItemDescription: 'Fundamental element for building interactive lists. Complete anatomy documentation (leading icon, title, description, trailing action), states (default, hover, active, selected), and height configuration. Base for navigation items, menus and structured content.',
        modalDescription: 'Modal overlay window with focus trap and backdrop management. Anatomy documentation (header, content, footer), predefined sizes (S, M, L), centered positioning and token system for overlay, dimensions and entry/exit animations.',
        textAreaDescription: 'Multi-line text field for extensive content input. Includes validation states (default, error, success), min/max height configuration, optional character counter and resize behavior. Tokens for borders, padding and scrollbar customization.',
        textInputDescription: 'Single-line text input field with leading/trailing icon support, validation states, placeholder styling and different types (text, email, password, number). Complete token system for borders, focus states and typographic customization.',
        toggleDescription: 'Interactive binary switch documented with component anatomy, state properties and behavior. Documentation covers on/off states, size variants (S, M, L), interactive states (hover, focus, disabled) and complete variable system for customization of colors, track and knob dimensions, and animated transitions.'
      },
      relatedProjects: {
        title: 'More projects',
        description: 'Explore other case studies where I apply user-centered design methodologies to create innovative digital experiences.',
        viewAll: 'View All Projects'
      }
    }
  }
};