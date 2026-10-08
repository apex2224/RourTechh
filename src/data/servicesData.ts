import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'web-development',
    title: 'Website & Web Application Development',
    shortDescription:
      'Custom website development and web applications built with React, Next.js and modern technologies for performance, usability and scalability.',
    fullDescription:
      'RourTech provides website development services for businesses looking to build a professional online presence. From responsive business websites and custom web applications to API integrations and content-managed platforms, we focus on maintainable code, user experience, technical SEO and reliable performance across devices.',
    iconName: 'Code2',
    deliverables: [
      'Custom website and web application development with React and Next.js',
      'Responsive layouts for desktop, tablet and mobile devices',
      'CMS integration and custom REST or GraphQL API connectivity',
      'Website deployment, staging setup and development workflows',
      'Performance optimization and Core Web Vitals improvements',
    ],
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Vercel / Cloudflare'],
    typicalTimeline: '4–8 weeks',
    outcomes: [
      'A responsive website designed for a consistent experience across devices',
      'Improved page performance through appropriate optimization techniques',
      'A maintainable web application that can evolve with business requirements',
    ],
    startingBudget: '$12,000',
    relatedCaseStudyId: 'fintech-analytics-suite',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design & Website Design',
    shortDescription:
      'User-focused UI/UX design, responsive website interfaces, interactive prototypes and reusable design systems for digital products.',
    fullDescription:
      'RourTech offers UI/UX design services that help businesses turn ideas and requirements into clear, intuitive digital experiences. From website wireframes and high-fidelity interfaces to interactive prototypes and reusable design systems, the design process focuses on usability, accessibility, visual consistency and straightforward developer handoff.',
    iconName: 'Palette',
    deliverables: [
      'Reusable UI components and design systems created in Figma',
      'Interactive website and mobile interface prototypes',
      'User journey mapping and information architecture planning',
      'Accessibility-focused interface and color contrast reviews',
      'Design specifications and documentation for developer handoff',
    ],
    techStack: ['Figma', 'Tokens Studio', 'Framer', 'Zeroheight', 'Contrast Matrix'],
    typicalTimeline: '3–6 weeks',
    outcomes: [
      'A consistent visual identity across website pages and digital products',
      'Clearer user journeys and more intuitive interface navigation',
      'Reusable design components for a more consistent design-to-development workflow',
    ],
    startingBudget: '$8,500',
    relatedCaseStudyId: 'luxe-architectural-store',
  },
  {
    id: 'seo-optimization',
    title: 'Technical SEO & Website Optimization',
    shortDescription:
      'Technical SEO audits, on-page SEO, website speed optimization, structured data and content improvements to support organic search visibility.',
    fullDescription:
      'RourTech provides website SEO optimization services focused on helping search engines discover, crawl and understand your website. We review technical SEO issues, page metadata, internal linking, indexability, structured data, XML sitemaps and Core Web Vitals. Our recommendations aim to improve website accessibility for search engines and create a stronger foundation for long-term organic visibility.',
    iconName: 'TrendingUp',
    deliverables: [
      'Technical SEO audit covering crawling, indexing, canonicals and robots directives',
      'On-page SEO improvements for titles, meta descriptions and heading structure',
      'Relevant Schema.org structured data using JSON-LD',
      'Core Web Vitals review covering LCP, INP and CLS',
      'XML sitemap checks and Google Search Console and GA4 setup support',
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'Next.js Dynamic Metatags', 'JSON-LD'],
    typicalTimeline: '2–4 weeks',
    outcomes: [
      'A clearer technical foundation for search engine crawling and indexing',
      'Improved page experience through targeted performance optimization',
      'Better alignment between website content and relevant search queries',
    ],
    startingBudget: '$6,000',
    relatedCaseStudyId: 'healthtech-clinical-portal',
  },
  {
    id: 'ecommerce-development',
    title: 'E-commerce Website Development',
    shortDescription:
      'Custom e-commerce websites, online store development, product catalog experiences and checkout integrations tailored to business needs.',
    fullDescription:
      'RourTech develops e-commerce websites that help businesses present products, manage online catalogs and create straightforward shopping experiences. Solutions can include custom storefronts, Shopify integrations, payment gateway connectivity, inventory integrations and responsive product pages. Each implementation is planned around the store’s requirements, customer journey and operational workflow.',
    iconName: 'ShoppingBag',
    deliverables: [
      'Custom online store development and Shopify storefront integration',
      'Product pages, shopping cart and checkout experience implementation',
      'Payment gateway and inventory management integrations',
      'Responsive product catalogs with search and filtering features',
      'E-commerce SEO foundations, metadata and structured product data',
    ],
    techStack: ['Shopify Plus', 'Storefront API', 'Algolia / Meilisearch', 'Stripe', 'Sanity CMS'],
    typicalTimeline: '6–10 weeks',
    outcomes: [
      'A convenient shopping experience across desktop and mobile devices',
      'A structured product catalog with relevant search and filtering options',
      'Connected e-commerce workflows based on business requirements',
    ],
    startingBudget: '$15,000',
    relatedCaseStudyId: 'luxe-architectural-store',
  },
  {
    id: 'custom-software',
    title: 'Custom Software & Web Application Solutions',
    shortDescription:
      'Custom business software, web application development, internal dashboards, customer portals and API integrations for specific operational needs.',
    fullDescription:
      'RourTech develops custom software solutions for businesses whose requirements are not fully met by off-the-shelf tools. From internal dashboards and customer portals to workflow automation and third-party API integrations, each solution is planned around business processes, security requirements, maintainability and future development needs.',
    iconName: 'Layers',
    deliverables: [
      'Custom business applications and internal management dashboards',
      'User authentication, role-based permissions and access controls',
      'REST API integrations and real-time application features',
      'Database design, data handling and cloud deployment planning',
      'Technical documentation and maintainable application architecture',
    ],
    techStack: ['Node.js', 'PostgreSQL', 'Docker', 'Redis', 'TypeScript', 'Tailwind'],
    typicalTimeline: '8–14 weeks',
    outcomes: [
      'Software features tailored to defined business workflows',
      'A more centralized way to manage relevant business information',
      'An application architecture that supports future enhancements',
    ],
    startingBudget: '$20,000',
    relatedCaseStudyId: 'fintech-analytics-suite',
  },
  {
    id: 'maintenance-support',
    title: 'Website Maintenance, Security & Support',
    shortDescription:
      'Ongoing website maintenance, software updates, security checks, bug fixes and performance monitoring to help keep your website reliable.',
    fullDescription:
      'RourTech provides website maintenance and technical support to help businesses keep their websites and web applications up to date. Depending on the agreed scope, maintenance can include dependency updates, security reviews, bug fixes, backup checks, performance monitoring and ongoing improvements. Support arrangements and response times are defined according to the selected service plan.',
    iconName: 'ShieldCheck',
    deliverables: [
      'Website availability monitoring and issue notifications',
      'Dependency updates and routine security maintenance',
      'Website speed reviews and Core Web Vitals monitoring',
      'Bug fixes, content updates and agreed feature improvements',
      'Maintenance summaries and technical recommendations',
    ],
    techStack: ['Datadog', 'Sentry', 'GitHub Actions', 'Dependabot', 'Pingdom'],
    typicalTimeline: 'Ongoing Monthly Retainer',
    outcomes: [
      'A more consistent process for website maintenance and updates',
      'Earlier visibility into selected technical issues',
      'Ongoing opportunities to improve website performance and usability',
    ],
    startingBudget: '$2,500 / month',
    relatedCaseStudyId: 'healthtech-clinical-portal',
  },
];
