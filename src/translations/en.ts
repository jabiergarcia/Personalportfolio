// English translations
import type { TranslationKeys } from './es';

export const en: TranslationKeys = {
  // Navigation
  nav: {
    home: 'Home',
    projects: 'Projects',
    experiences: 'Experience',
    contact: 'Contact',
    skipToContent: 'Skip to main content',
  },

  // Hero Section
  hero: {
    name: 'Jabier García Sanz',
    jobTitle: 'Junior UX/UI Designer',
    available: 'available',
    description: {
      intro: 'I\'m a UX/UI Designer with over 13 years of experience in fashion and Visual Merchandising, and specialized training in UX/UI (Neoland).',
      middle: 'I transform visual decision-making into clear, usable, business-oriented digital experiences, connecting the physical and digital worlds.',
      skills: 'I bring aesthetic vision, product thinking, empathy and leadership, working with research, user flows, prototypes and Figma.',
      current: 'Currently seeking to join product teams to design digital experiences with real impact.',
    },
    buttons: {
      viewProjects: 'View projects',
      downloadCV: 'Download CV',
    },
    contact: {
      cta: 'Let\'s get in touch?',
      button: 'Contact',
    },
    openDesignSystem: 'Open Design System', // NUEVO
  },

  // Works Section
  works: {
    title: 'Projects',
    description: 'A collection of projects that demonstrate my skills in user experience and interface design and prototyping. Each project represents a unique challenge and creative solution.',
    cta: {
      question: 'Want to see more of my work?',
      visitMe: 'Visit me:',
    },
  },

  // Stats Section
  stats: {
    title: 'By the numbers',
    description: 'My professional journey reflected in data that demonstrates experience, dedication, and commitment to continuous growth in UX/UI.',
    items: {
      fashion: {
        label: 'years in fashion',
        description: 'Experience bringing a unique perspective to digital design',
      },
      projects: {
        label: 'UX/UI projects',
        description: 'Projects completed during my transition to digital design',
      },
      passion: {
        label: 'passion for UX',
        description: 'Complete dedication to creating user-centered experiences',
      },
      learning: {
        label: 'desire to learn',
        description: 'Continuous improvement attitude and curiosity for new methodologies',
      },
    },
  },

  // Experiences Section
  experiences: {
    title: 'Experience',
    description: 'A journey that combines years of fashion experience with my new passion for UX/UI design, creating a unique perspective on each project.',
    present: 'Present',
    cta: {
      question: 'Want to know more about my career?',
      button: 'View full experience',
    },
    items: {
      harbiz: {
        title: 'Junior Product Designer',
        company: 'Harbiz',
        period: '2026 – Present',
        description: 'Designing new features and optimizing flows at Harbiz, improving user experience and product consistency across web and mobile applications.',
      },
      current: {
        title: 'Junior UX/UI Designer',
        company: 'Freelance',
        description: 'Creating intuitive digital solutions through research, ideation and prototyping processes, integrating usability, accessibility and visual design to optimize user experience.',
      },
      hm2: {
        title: 'Senior Visual Merchandiser Manager',
        company: 'Hennes & Mauritz S.L.',
        description: 'Visual management of flagship stores, development and presentation of brand concepts and leadership of creative teams in the fashion retail sector.',
      },
      hm1: {
        title: 'Window & Indoor Styling Manager',
        company: 'Hennes & Mauritz S.L.',
        description: 'Creation and execution of window display concepts for different departments, from fashion to home, developing impactful visual narratives.',
      },
    },
  },

  // Footer
  footer: {
    tagline: 'Designing digital experiences from Madrid',
    downloadCV: 'Download CV',
    copyright: 'Designed with Figma, React and lots of coffee',
    designSystem: 'View Design System', // NUEVO
    labels: {
      openContactForm: 'Open contact form',
      callPhone: 'Call phone',
      viewLinkedIn: 'View LinkedIn profile',
      viewBehance: 'View Behance portfolio',
      downloadCV: 'Download CV in PDF',
    },
  },

  // Contact Modal
  contact: {
    title: 'Let\'s talk?',
    description: 'Tell me what you have in mind and I\'ll get back to you as soon as possible.',
    form: {
      name: {
        label: 'Your full name *',
        placeholder: 'What\'s your name?',
      },
      email: {
        label: 'your@email.com *',
        placeholder: 'Your email (I promise no spam)',
      },
      subject: {
        label: 'What\'s on your mind? *',
        placeholder: 'Shoot: what do you want to design?',
      },
      message: {
        label: 'Open to ideas and new challenges *',
        placeholder: 'Write me and let\'s talk...',
      },
    },
    buttons: {
      send: 'Send message',
      sending: 'Sending...',
      cancel: 'Cancel',
    },
    messages: {
      success: 'Message sent successfully! I\'ll reply as soon as possible.',
      error: 'Error sending message. Please try again.',
    },
    validation: {
      nameRequired: 'Please enter your name',
      emailRequired: 'Please enter your email',
      emailInvalid: 'Please enter a valid email',
      subjectRequired: 'Please enter a subject',
      messageRequired: 'Please enter a message',
    },
  },

  // Common
  common: {
    loading: 'Loading...',
    close: 'Close',
    back: 'Back',
    viewMore: 'View more',
    viewLess: 'View less',
    closeGallery: 'Close gallery (Escape)',
    showInfo: 'Show information',
    hideInfo: 'Hide information',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    closeShareModal: 'Close share modal (Escape)',
  },

  // Error Boundary
  errorBoundary: {
    title: 'Something went wrong',
    description: 'An unexpected error has occurred. You can try reloading the page or return to the home page.',
    reloadButton: 'Reload page',
    homeButton: 'Back to home',
    technicalDetails: 'Technical details',
  },

  // Not Found Page
  notFound: {
    title: 'Page not found',
    description: 'The page you\'re looking for doesn\'t exist or has been moved. But don\'t worry, we\'ll help you find what you need.',
    backButton: 'Go back',
    homeButton: 'Go to home',
    suggestions: 'You can also visit:',
  },

  // Projects Page
  projectsPage: {
    title: 'Projects',
    subtitle: 'Designing user-centered digital experiences',
    description: 'Each project reflects my focus on research, ideation, and validation with real users. From e-commerce to mobile apps, combining UX methodologies with creative solutions that generate real impact.',
  },

  // Project Layout
  projectLayout: {
    backToProjects: 'Back to Projects',
    problem: 'Problem',
    solution: 'Solution',
    viewFullscreen: 'View fullscreen',
    behanceSection: {
      title: 'Interested in seeing more details?',
      description: 'Explore the complete project with all screens, technical specifications, and detailed documentation on my Behance profile.',
      button: 'View Full Project on Behance',
    },
    relatedProjects: {
      title: 'More projects',
      description: 'Explore other case studies where I apply user-centered design methodologies to create innovative digital experiences.',
      button: 'View All Projects',
    },
    share: {
      copyLink: 'Copy link',
      linkCopied: 'Link copied',
      linkCopiedFull: 'Link copied to clipboard',
      shareProject: 'Share project',
      shareOn: 'Share on',
      copyLinkedInPost: 'Copy LinkedIn post',
      shareByEmail: 'Share by email',
      shareButton: 'Share',
      moreOptions: 'More options',
      linkedInInstructions: {
        title: 'Perfect!',
        description: 'The text has been copied to your clipboard. Now click the button below to open LinkedIn.',
        openButton: 'Open LinkedIn to publish'
      },
      email: {
        subject: 'Check out this project',
        intro: 'Hello,',
        body: 'I\'m sharing this project by Jabier García Sanz, UX/UI Designer:',
        viewProject: 'View complete project:',
        outro: 'I hope you find it interesting!'
      },
      linkedInPost: {
        authorCredit: 'Project by Jabier García Sanz, UX/UI Designer specialized in creating user-centered experiences.',
        viewMore: 'Learn more:'
      },
      ariaLabels: {
        closeModal: 'Close share modal (Escape)',
        shareProject: 'Share'
      },
      toast: {
        textCopied: 'Text copied!',
        readyToPublish: 'Ready to publish on LinkedIn',
        errorCopying: 'Error copying text',
        emailContentCopied: 'Email content copied to clipboard',
        openEmailManually: 'Open your email client and paste the content'
      }
    },
  },

  // Experiences Page
  experiencesPage: {
    title: 'Experience',
    subtitle: 'A professional journey from fashion retail to UX/UI design',
    description: 'Explore my professional trajectory blending visual merchandising with digital design',
    professionalTitle: 'Professional Journey',
    professionalSubtitle: 'From fashion retail to digital product design',
    educationTitle: 'Academic Background',
    educationSubtitle: 'A multidisciplinary learning path',
    achievements: 'Notable achievements',
    keyAchievements: 'Key achievements',
    functions: 'Main functions',
    keyFunctions: 'Main functions',
    skills: 'Skills',
    keySkills: 'Key skills',
    developedSkills: 'Developed skills',
  },

  // Common Project Terms
  projectCommon: {
    result: 'Result',
    solution: 'Solution',
    problem: 'Problem',
    process: 'Process',
    challenge: 'Challenge',
    projectCreation: 'Project creation',
    participants: 'Participants',
    projectMode: 'Project mode',
    methodology: 'Methodology used',
    duration: 'Project duration',
    person: 'person',
    people: 'people',
    weeks: 'weeks',
    inDevelopment: 'In development',
    prototypeTitle: 'Interactive Prototype',
    explorePrototypeMobile: 'Explore the complete mobile prototype in Figma',
    explorePrototypeWeb: 'Explore the complete web prototype in Figma',
    openPrototype: 'Open Prototype in Figma',
    openInNewTab: 'Will open in a new tab for better experience',
    exploreApp: 'Explore the live app',
    accessPlatform: 'Access the platform and explore the product in action',
    liveApp: 'Live application',
    tryApp: 'Try Assorta',
    interactWithPrototype: 'Interact with the full-screen prototype by clicking on',
  },

  // Projects Data
  projects: {
    assorta: {
      title: 'Assorta | Retail Visual Platform',
      subtitle: 'B2B SaaS',
      category: 'Product Design',
      description: 'B2B SaaS platform that digitizes the Visual Merchandising process in fashion retail through a centralized and operational solution.',
      shortDescription: 'B2B SaaS that digitizes Visual Merchandising in retail through centralized visual management.',
      tags: {
        retail: 'Retail',
        visualMerchandising: 'Visual Merchandising',
        saas: 'SaaS',
        b2b: 'B2B',
        productDesign: 'Product Design',
      },
    },
    puffykitten: {
      title: 'PuffyKitten | B2C E-commerce',
      subtitle: 'B2C E-commerce',
      category: 'Web Design',
      description: 'Digital ecosystem combining e-commerce for cat products, IoT toys with real-time monitoring, and AI analysis of feline behavior.',
      shortDescription: 'Cat products e-commerce with IoT toys and AI behavior analysis.',
      tags: {
        webApp: 'Web + App',
        pets: 'Pets',
        iot: 'IoT',
        ai: 'AI',
        designThinking: 'Design Thinking',
      },
    },
    gotapp: {
      title: 'GotApp | B2C Mobile App',
      subtitle: 'B2C Mobile App',
      category: 'App Design',
      description: 'App for responsible water consumption with smart monitoring and gamification. Developed in a 5-day Design Sprint to generate mindset change.',
      shortDescription: 'Responsible water consumption app with monitoring and gamification.',
      tags: {
        app: 'App',
        sustainability: 'Sustainability',
        gamification: 'Gamification',
        monitoring: 'Monitoring',
        designSprint: 'Design Sprint',
      },
    },
    dsPomeranian: {
      title: 'Pomeranian | Design System',
      subtitle: 'Design System',
      category: 'Design System',
      description: 'Design system with Atomic Design methodology, visual tokens, and library of 12 reusable components. Ensures consistency and efficiency in design and development.',
      shortDescription: 'Design System with Atomic Design and reusable component library.',
      tags: {
        atomicDesign: 'Atomic Design',
        styles: 'Styles',
        tokens: 'Tokens',
        components: 'Components',
        scalability: 'Scalability',
      },
    },
    chupsee: {
      title: 'Chupsee | B2C Mobile App',
      subtitle: 'B2C Mobile App',
      category: 'App Design',
      description: 'Multi-store price comparison app with personalized wishlists and predictive AI analysis to recommend the optimal purchase moment.',
      shortDescription: 'Multi-store price comparison with wishlists and predictive AI.',
      tags: {
        app: 'App',
        ecommerce: 'E-commerce',
        aiPredictive: 'Predictive AI',
        comparator: 'Comparator',
        designThinking: 'Design Thinking',
      },
    },
  },

  // ============================================
  // EXPERIENCE TIMELINE DATA
  // ============================================
  experienceTimeline: [
    {
      id: '0',
      title: 'Junior Product Designer (UX/UI)',
      company: 'Harbiz',
      location: 'Madrid, Spain',
      period: '2026 – Present',
      typeLabel: 'Full-time',
      description: 'Product Designer within the product design team at Harbiz, a SaaS platform focused on fitness and wellness professionals. Working on the evolution of features and flows within the product, ensuring visual coherence, usability and consistency across devices (Desktop, Mobile and Tablet). Collaborating closely with designers, product managers, developers and content teams to improve user experience and strengthen the relationship between the product and its customers.',
      achievements: [
        'Design and optimization of interaction flows and features within the Harbiz platform',
        'Interface adaptation for consistent experiences across multiple devices',
        'Participation in user testing and navigation analysis to identify improvement opportunities',
        'Product benchmarking to identify best practices and innovation opportunities',
        'Design of in-product communications to improve relationships with end users'
      ],
      functions: [
        'Design new product flows and improve existing features',
        'Ensure visual coherence and quality of experience across different devices',
        'Collaborate with Product Designers, UX Writers, Researchers and Developers',
        'Analyze user behavior to identify friction points and opportunities',
        'Conduct benchmarking and market product analysis'
      ],
    },
    {
      id: '1',
      title: 'Junior UX/UI Designer',
      company: 'Personal projects',
      location: 'Madrid, Spain',
      period: '2025 - Present',
      typeLabel: 'Full-time',
      description: 'Development of UX/UI design projects based on intensive training from the UX/UI Design Bootcamp at Neoland and personal projects, applying user-centered design methodologies and tools like Figma to create intuitive and coherent digital experiences.',
      achievements: [
        'User research and definition of user personas based on qualitative data',
        'Design of user flows, wireframes and high-fidelity prototypes for web and mobile applications',
        'Creation and documentation of scalable design systems using Atomic Design principles',
        'Development of end-to-end practical cases, from research to validation with usability testing'
      ],
      functions: [
        'Analyze and understand user needs through interviews, surveys and competitive benchmarking',
        'Define information architecture and design user flows that facilitate navigation',
        'Create accessible, consistent and effective visual interfaces using Figma',
        'Prototype interactions and conduct basic user testing to iterate designs based on feedback'
      ],
    },
    {
      id: '2',
      title: 'Senior Visual Merchandiser Manager',
      company: 'Hennes & Mauritz S.L.',
      location: 'Madrid, Spain',
      period: '2018 - 2025',
      typeLabel: 'Full-time',
      description: 'Visual management of flagship stores, development and presentation of brand concepts and leadership of creative teams in the fashion retail sector.',
      achievements: [
        '5% increase in sales through innovative visual strategies',
        'Leadership of teams of 15+ people in rebuilding projects',
        'Implementation of new visual standards in multiple stores',
        'Layout and user experience optimization',
        'Direct collaboration with different store teams and service office',
        'Analysis of sales metrics by department and product',
        'Internal recognition for innovation in visual presentation'
      ],
      functions: [
        'Responsible for achieving sales, team and profitability objectives together with the department and store manager team in-store, reporting directly to the area visual manager.',
        'Sales:',
        'Ensure consistency of garment presentation and styling with corporate visual identity guidelines, in-store and window displays.',
        'Create a clear line between the window and the main area, with commercial purchase suggestions.',
        'Harmonize concept balance maintaining layout, visual material and furniture, and store navigation.',
        'Take the pulse of the latest fashion trends and styling techniques to anticipate customer needs.',
        'Profitability:',
        'Daily analysis and monitoring of store KPIs (total sales, conversion rate, pieces per ticket, average ticket and company loyalty program recruitment rate) to make data-driven decisions that increase sales and achieve business objectives.',
        'Store resource planning to ensure proper execution of weekly commercial changes.',
        'Team:',
        'Identify potential visual merchandisers among the Sales Advisors group and evaluate their fit with corporate culture to communicate to management.',
        'Selected by the area visual manager to train other visual merchandisers in the country on key topics –customer profile, understanding trends, visual work execution and styling techniques–.'
      ],
    },
    {
      id: '3',
      title: 'Window & Indoor Styling Manager',
      company: 'Hennes & Mauritz S.L.',
      location: 'Madrid, Spain',
      period: '2015 - 2018',
      typeLabel: 'Full-time',
      description: 'Creation and execution of window display concepts for different departments, from fashion to home, developing impactful visual narratives.',
      achievements: [
        'Design of over 200 thematic window displays',
        'Collaboration with marketing teams for seasonal campaigns',
        'Implementation of advanced lighting and composition techniques',
        'Internal recognition for innovation in visual presentation'
      ],
      functions: [
        'Conceptual design and execution of thematic window displays',
        'Product selection and coordination for displays',
        'Management of installation schedules and seasonal changes',
        'Collaboration with marketing and graphic design teams'
      ],
    },
  ],

  // ============================================
  // EDUCATION TIMELINE DATA
  // ============================================
  educationTimeline: [
    {
      id: '1',
      title: 'UX/UI Design Bootcamp',
      institution: 'Neoland School',
      location: 'Madrid, Spain',
      period: '2025',
      description: 'Key educational experience that has consolidated my skills in user research, competitive analysis, information architecture and design of responsive digital interfaces aligned with real user needs.',
    },
    {
      id: '2',
      title: 'Degree in Social Education',
      institution: 'University of Alcalá',
      location: 'Alcalá de Henares, Spain',
      period: '2011 - 2015',
      description: 'Training to intervene with people and groups at risk of exclusion, promoting their development through socio-educational actions and acquiring skills in educational programs, mediation, diversity and social commitment.',
    },
    {
      id: '3',
      title: 'Fashion Design',
      institution: 'IED (Istituto Europeo di Design)',
      location: 'Madrid, Spain',
      period: '2009 - 2011',
      description: 'Studies in fashion design with a sustainable, innovative and inclusive vision. Combines technique and creativity: from pattern making, sewing and materials, to styling, communication, design principles and leadership. Specialization in tailoring and pattern making.',
    },
  ],
};