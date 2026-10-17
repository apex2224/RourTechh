import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    seoTitle: 'Website & Web Application Development Services | RouR Tech',
    seoDescription:
      'Engineered React and Next.js web applications and responsive business websites. High-speed performance, clean architecture, and conversion-focused user interfaces.',
    title: 'Website & Web Application Development',
    shortDescription:
      'Custom website development and web applications built with React, Next.js and modern technologies for performance, usability and scalability.',
    fullDescription:
      'RourTech provides end-to-end website and web application development services for organizations that demand speed, stability, and scale. We engineer responsive web platforms using Next.js, React, TypeScript, and modern headless architectures. Whether you need a customer portal, an interactive business flagship, or an API-driven web application, we ensure every line of code is optimized for Core Web Vitals, maintainability, and search discoverability.',
    iconName: 'Code2',
    deliverables: [
      'Custom web applications and responsive business platforms built with Next.js & React',
      'Production-grade TypeScript architecture with component-level type safety',
      'Headless CMS integration (Sanity, Strapi, Contentful) or custom admin portals',
      'REST & GraphQL API connectivity with edge caching and data serialization',
      'Core Web Vitals optimization targeting sub-second LCP and low INP',
      'Automated CI/CD deployment pipelines on Vercel, Cloudflare, or AWS',
      'Complete developer documentation and source code repository transfer',
    ],
    techStack: [
      'Next.js 14/15',
      'React 18/19',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'PostgreSQL / Supabase',
      'Vercel / Cloudflare',
    ],
    typicalTimeline: '4–8 weeks',
    outcomes: [
      'A sub-second load time across desktop and mobile devices worldwide',
      'Full cross-browser responsiveness and WCAG AA accessibility compliance',
      'A scalable codebase engineered for ongoing feature expansion without technical debt',
    ],
    startingBudget: '$12,000',
    relatedCaseStudyId: 'fintech-analytics-suite',
    problemsSolved: [
      'Slow, bloated legacy websites losing potential customers to high bounce rates',
      'Inflexible monolithic templates that restrict custom business workflows',
      'Fragile codebases that break during traffic surges or minor updates',
      'Poor mobile experiences that fail search engine mobile-first indexing audits',
    ],
    useCases: [
      'Corporate flagship websites with dynamic content and internationalization',
      'SaaS product frontends and self-service customer dashboards',
      'High-conversion marketing websites with headless content management',
      'Interactive client portals with secure authentication and data visualization',
    ],
    benefits: [
      'Direct collaboration with senior engineers throughout the delivery cycle',
      'Zero bloated third-party plugin dependencies that degrade performance',
      'Semantic HTML5 structure engineered for organic search discovery from day one',
      'Standardized design tokens matching Figma design specifications pixel-by-pixel',
    ],
    process: [
      {
        step: '01',
        title: 'Architecture & Technical Discovery',
        description:
          'We evaluate your business requirements, define data schemas, select the optimal rendering strategy (SSG, ISR, or RSC), and plan edge routing.',
      },
      {
        step: '02',
        title: 'Component Engineering & Prototyping',
        description:
          'We construct modular, reusable UI components adhering strictly to design tokens, ensuring responsive layouts and keyboard accessibility.',
      },
      {
        step: '03',
        title: 'Backend Integration & State Management',
        description:
          'We integrate APIs, databases, authentication, and content management systems with strict type validation and resilient error handling.',
      },
      {
        step: '04',
        title: 'Performance Audits & Production Handoff',
        description:
          'We execute Lighthouse, Core Web Vitals, and cross-browser stress tests before deploying to production with continuous monitoring.',
      },
    ],
    faqs: [
      {
        question: 'Which framework do you recommend for new web development projects?',
        answer:
          'We primarily specialize in Next.js with React and TypeScript. This combination provides the best balance of server-side rendering for SEO, static edge caching for speed, and rich client interactivity for modern user experiences.',
      },
      {
        question: 'Will our team be able to update website copy and images without code changes?',
        answer:
          'Yes. We integrate modern headless Content Management Systems (such as Sanity, Strapi, or custom Firebase CMS) that give your marketing team full control over publishing and editing without risking code stability.',
      },
      {
        question: 'How do you guarantee good Core Web Vitals scores?',
        answer:
          'We enforce strict performance budgets: zero render-blocking scripts, native image dimensioning with next/image, minimal client-side JavaScript bundles, and CDN edge delivery. We benchmark before launching.',
      },
    ],
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    seoTitle: 'UI/UX Design & Website Design Services | RouR Tech',
    seoDescription:
      'Human-centered UI/UX design, interactive prototypes, design systems, and responsive website interfaces crafted in Figma for conversion and clarity.',
    title: 'UI/UX Design & Website Design',
    shortDescription:
      'User-focused UI/UX design, responsive website interfaces, interactive prototypes and reusable design systems for digital products.',
    fullDescription:
      'RourTech designs digital interfaces that combine visual elegance with functional clarity. We transform complex workflows into intuitive, engaging user experiences. From user journey mapping and low-fidelity wireframing to production-ready Figma design systems and clickable prototypes, every interface is structured to guide visitors smoothly toward conversion while upholding your distinct brand identity.',
    iconName: 'Palette',
    deliverables: [
      'Comprehensive Figma component libraries and tokenized design systems',
      'High-fidelity responsive UI designs for mobile, tablet, and desktop viewports',
      'Interactive clickable prototypes for stakeholder alignment and user testing',
      'Information architecture, wireframes, and customer journey flowcharts',
      'Accessibility evaluation ensuring WCAG 2.1 AA color contrast and readability',
      'Structured developer handoff assets with typography, spacing, and icon specs',
    ],
    techStack: [
      'Figma',
      'Tokens Studio',
      'FigJam',
      'Zeroheight',
      'Contrast Checker',
      'Tailwind Token Sync',
    ],
    typicalTimeline: '3–6 weeks',
    outcomes: [
      'A distinct, polished visual identity that builds customer credibility',
      'Clearer user paths that lower friction and increase onboarding completion',
      'A scalable design system that speeds up future feature releases by over 50%',
    ],
    startingBudget: '$8,500',
    relatedCaseStudyId: 'luxe-architectural-store',
    problemsSolved: [
      'Confusing navigation and cluttered layouts causing high user drop-off',
      'Inconsistent visual elements across different company web pages and products',
      'Disconnect between design mockups and actual front-end engineering output',
      'Inaccessible color palettes and typography failing modern compliance standards',
    ],
    useCases: [
      'Complete visual overhaul of an existing business website or web portal',
      'New digital product concept design from wireframes to high-fidelity specs',
      'Creation of a unified design system for multi-product organizations',
      'Conversion rate optimization (CRO) redesigns for checkout and signup funnels',
    ],
    benefits: [
      'Designs engineered specifically with modern web implementation constraints in mind',
      'Direct token-to-code alignment so developers build exactly what was designed',
      'Tested across small and large mobile viewports for flawless touch interactions',
      'Full intellectual property and design file ownership handed over at project completion',
    ],
    process: [
      {
        step: '01',
        title: 'User Research & Information Architecture',
        description:
          'We analyze customer behavioral patterns, map out user flowcharts, and establish an intuitive sitemap and page hierarchy.',
      },
      {
        step: '02',
        title: 'Wireframing & UX Structuring',
        description:
          'We construct low-fidelity wireframes to focus on content hierarchy, call-to-action placement, and layout ergonomics without color bias.',
      },
      {
        step: '03',
        title: 'High-Fidelity Visual Design & Tokens',
        description:
          'We apply typography, color palettes, micro-interactions, and design tokens to create stunning, polished interface screens in Figma.',
      },
      {
        step: '04',
        title: 'Interactive Prototyping & Developer Handoff',
        description:
          'We build clickable flows for review and prepare detailed component specifications, CSS variables, and asset exports for the development team.',
      },
    ],
    faqs: [
      {
        question: 'Do you provide the raw design files upon completion?',
        answer:
          'Yes, absolutely. You receive full ownership of all Figma files, component libraries, typography guides, and exportable vector assets upon final project sign-off.',
      },
      {
        question: 'How do you ensure designs can be built without unexpected development costs?',
        answer:
          'Because our designers collaborate daily with our front-end engineers, we design using real-world CSS grid, flexbox, and tokenized constraints, eliminating unrealistic mockups that cause development friction.',
      },
      {
        question: 'Can you work with our existing brand guidelines?',
        answer:
          'Yes. We can adopt your existing color palettes, logos, and brand guidelines, formalizing them into a structured digital design system suited for modern web applications.',
      },
    ],
  },
  {
    id: 'technical-seo',
    slug: 'technical-seo',
    seoTitle: 'Technical SEO & Website Optimization Services | RouR Tech',
    seoDescription:
      'Comprehensive technical SEO audits, Core Web Vitals optimization, Schema.org JSON-LD structured data, and search engine indexability improvements.',
    title: 'Technical SEO & Website Optimization',
    shortDescription:
      'Technical SEO audits, on-page SEO, website speed optimization, structured data and content improvements to support organic search visibility.',
    fullDescription:
      'RourTech delivers rigorous technical SEO engineering to ensure search engines crawl, render, index, and rank your website with zero friction. We look beyond basic keyword insertion, solving deep architectural issues such as JavaScript hydration penalties, crawl budget exhaustion, improper canonicalization, and Core Web Vitals shortcomings. Our data-backed approach creates a resilient technical foundation for lasting organic search growth.',
    iconName: 'TrendingUp',
    deliverables: [
      'Comprehensive technical SEO audit covering crawling, rendering, and indexing',
      'Core Web Vitals remediation targeting sub-2.5s LCP, low INP, and zero CLS',
      'Schema.org JSON-LD implementation (Organization, Service, FAQ, Article, Breadcrumbs)',
      'Canonical URL structure, redirect map cleanups, and 404 response auditing',
      'XML sitemap hierarchy optimization and automated robots.txt configuration',
      'Metadata strategy and heading hierarchy alignment for target search intent',
      'Google Search Console indexing issue remediation and verification support',
    ],
    techStack: [
      'Google Search Console',
      'Screaming Frog',
      'Next.js Dynamic Metadata',
      'Schema.org JSON-LD',
      'Lighthouse CI',
      'Chrome UX Report (CrUX)',
    ],
    typicalTimeline: '2–4 weeks',
    outcomes: [
      'Elimination of indexing errors, duplicate content loops, and crawl blockers',
      'Measurable improvements in real-user Core Web Vitals metrics (LCP, INP, CLS)',
      'Rich search snippets and enhanced knowledge panel visibility via structured data',
    ],
    startingBudget: '$6,000',
    relatedCaseStudyId: 'healthtech-clinical-portal',
    problemsSolved: [
      'Search crawlers failing to index dynamic client-side JavaScript content',
      'Duplicate content issues caused by improper query parameters or missing canonicals',
      'Poor mobile Core Web Vitals scores resulting in diminished organic search impressions',
      'Missing or malformed structured data preventing rich snippets in search results',
    ],
    useCases: [
      'Websites migrating to modern frameworks like Next.js that need to protect existing rankings',
      'E-commerce platforms with large product catalogs suffering from crawl budget waste',
      'Corporate websites with declining organic search visibility and unexplained crawl errors',
      'New web applications seeking strong technical discoverability prior to public launch',
    ],
    benefits: [
      'Engineered directly into your codebase rather than delivering an unexecuted audit PDF',
      'Structured data verified against Google Rich Results standards before deployment',
      'Performance enhancements that simultaneously improve conversion rates and SEO',
      'Clear, honest reporting based on actual search console and analytics metrics',
    ],
    process: [
      {
        step: '01',
        title: 'Deep Crawl & Log File Analysis',
        description:
          'We inspect every page with advanced crawlers, auditing HTTP status codes, redirect chains, canonical tags, and JavaScript execution behavior.',
      },
      {
        step: '02',
        title: 'Performance & Core Web Vitals Engineering',
        description:
          'We diagnose and eliminate render-blocking resources, uncompressed assets, and layout shifts to achieve green Core Web Vitals in CrUX.',
      },
      {
        step: '03',
        title: 'Structured Data & Schema Graph Deployment',
        description:
          'We embed validated Schema.org JSON-LD graphs linking your organization, services, breadcrumbs, and FAQs to earn rich search features.',
      },
      {
        step: '04',
        title: 'Validation & Search Console Verification',
        description:
          'We test all implementations in staging, submit updated sitemaps, and monitor Google Search Console indexing validation logs.',
      },
    ],
    faqs: [
      {
        question: 'Do you guarantee a #1 ranking on Google?',
        answer:
          'No reputable agency can guarantee specific rankings because search algorithms are governed by third parties. What we guarantee is rigorous technical excellence: eliminating crawl errors, maximizing site speed, validating structured data, and adhering strictly to search engine best practices.',
      },
      {
        question: 'How is technical SEO different from traditional SEO copywriting?',
        answer:
          'While copywriting focuses on keywords and messaging, technical SEO focuses on how search engine bots crawl, parse, and render your website. If your site is too slow, improperly rendered, or full of redirect loops, even the best content will fail to rank.',
      },
      {
        question: 'Can you implement the technical fixes directly in our codebase?',
        answer:
          'Yes. Unlike consulting firms that only provide a list of recommendations, our engineers write the code, configure Next.js metadata, build the structured data, and deploy the fixes directly.',
      },
    ],
  },
  {
    id: 'ecommerce-development',
    slug: 'ecommerce-development',
    seoTitle: 'E-commerce Website Development Services | RouR Tech',
    seoDescription:
      'High-conversion custom e-commerce websites and headless Shopify storefronts engineered for fast checkout, internationalization, and effortless catalog browsing.',
    title: 'E-commerce Website Development',
    shortDescription:
      'Custom e-commerce websites, online store development, product catalog experiences and checkout integrations tailored to business needs.',
    fullDescription:
      'RourTech engineers custom e-commerce experiences that turn visitors into loyal customers. We build fast, responsive digital storefronts using headless architectures (Shopify Storefront API, Stripe, Medusa) paired with high-performance Next.js frontends. With instant page transitions, flexible product customization, localized multi-currency checkout, and seamless inventory synchronization, our e-commerce solutions are engineered for high-volume transactions.',
    iconName: 'ShoppingBag',
    deliverables: [
      'Custom headless storefronts powered by Next.js and Shopify Storefront API',
      'Instant faceted search and product filtering (Algolia / Meilisearch integrations)',
      'Optimized cart and multi-currency checkout funnels designed for mobile conversion',
      'Payment gateway integrations with Stripe, Apple Pay, Google Pay, and PayPal',
      'Inventory, CRM, and ERP system synchronization with resilient webhook handling',
      'E-commerce structured product data (Schema.org Product & Offer) for rich snippets',
      'Customer account portals, order tracking, and automated transactional emails',
    ],
    techStack: [
      'Next.js 14/15',
      'Shopify Plus / Storefront API',
      'Stripe Elements',
      'Algolia / Meilisearch',
      'Tailwind CSS',
      'Sanity CMS',
      'Redis Caching',
    ],
    typicalTimeline: '6–10 weeks',
    outcomes: [
      'Sub-1.2s page loads on mobile 4G networks, driving higher checkout completion',
      'A flexible editorial storefront where marketing can update collections effortlessly',
      'A scalable transaction pipeline capable of handling high-volume flash sales',
    ],
    startingBudget: '$15,000',
    relatedCaseStudyId: 'luxe-architectural-store',
    problemsSolved: [
      'Slow mobile page loads on monolithic e-commerce themes causing cart abandonment',
      'Rigid checkout flows that cannot support wholesale, B2B, or international pricing',
      'Inability to create rich, storytelling brand landing pages that sell products directly',
      'Inventory sync errors between physical retail systems and online storefronts',
    ],
    useCases: [
      'Luxury and direct-to-consumer (DTC) brands seeking a bespoke digital flagship',
      'Wholesale and B2B merchants needing custom pricing tiers and quotation flows',
      'High-catalog volume retailers requiring instant search and complex filtering',
      'Multi-currency, international stores with localized tax and shipping rules',
    ],
    benefits: [
      'Bespoke user experience completely free from template constraints',
      'Decoupled frontend ensures your store stays fast even with extensive marketing tools',
      'Robust security adhering to PCI-DSS compliance standards for payment handling',
      'Structured product data for enhanced visibility in Google Shopping and organic search',
    ],
    process: [
      {
        step: '01',
        title: 'Catalog Architecture & Commerce Planning',
        description:
          'We evaluate your product hierarchy, variants, inventory management workflows, shipping models, and payment processor requirements.',
      },
      {
        step: '02',
        title: 'Storefront UX & Conversion Flow Design',
        description:
          'We design responsive product detail pages, mini-cart drawers, and streamlined checkout steps optimized for thumb-friendly mobile purchases.',
      },
      {
        step: '03',
        title: 'Headless Storefront Engineering',
        description:
          'We build the Next.js storefront, connecting Shopify Storefront APIs, Algolia search, and webhooks with edge caching for instant rendering.',
      },
      {
        step: '04',
        title: 'Payment Integration & Stress Testing',
        description:
          'We test end-to-end purchasing, discounts, refunds, automated tax calculations, and simulate high-concurrency traffic before launch.',
      },
    ],
    faqs: [
      {
        question: 'Why choose headless commerce over a standard Shopify theme?',
        answer:
          'Standard Shopify themes load numerous third-party apps and scripts that slow down mobile performance. Headless separates the frontend into a blazing-fast Next.js app, providing sub-second page loads, limitless design freedom, and higher conversion rates.',
      },
      {
        question: 'Do we still manage products and orders in the Shopify dashboard?',
        answer:
          'Yes. Your operations, product inventory, order fulfillment, and refund workflows remain conveniently managed within the standard Shopify admin interface you already know.',
      },
      {
        question: 'How do you handle security and payment processing?',
        answer:
          'Payment details never touch our application servers. We integrate PCI-DSS certified payment systems like Stripe Elements or Shopify Checkout, ensuring top-tier security for your customers.',
      },
    ],
  },
  {
    id: 'custom-software',
    slug: 'custom-software',
    seoTitle: 'Custom Software & Web Application Development | RouR Tech',
    seoDescription:
      'Custom business software, SaaS web applications, client portals, internal dashboards, and API integrations engineered for scalable operational workflows.',
    title: 'Custom Software & Web Application Solutions',
    shortDescription:
      'Custom business software, web application development, internal dashboards, customer portals and API integrations for specific operational needs.',
    fullDescription:
      'RourTech builds custom web software and cloud applications tailored precisely to your operational requirements. When commercial off-the-shelf software falls short, we engineer bespoke SaaS platforms, internal management portals, real-time analytics dashboards, and workflow automation systems. Engineered with robust TypeScript backends, secure role-based access, and scalable cloud architectures, our software eliminates manual bottlenecks and drives business growth.',
    iconName: 'Layers',
    deliverables: [
      'Full-stack custom web applications and business operational software',
      'Secure role-based authentication and granular permission management',
      'Real-time analytics dashboards with custom data visualization',
      'Custom REST and GraphQL API design with OpenAPI / Swagger documentation',
      'Database architecture, query optimization, and automated data backups',
      'Third-party cloud service integrations (Stripe, Twilio, SendGrid, AWS)',
      'Automated unit, integration, and end-to-end testing suites',
    ],
    techStack: [
      'Node.js / Express / NestJS',
      'Next.js & React',
      'TypeScript',
      'PostgreSQL / Prisma',
      'Redis',
      'Docker & AWS / GCP',
      'Firebase / Supabase',
    ],
    typicalTimeline: '8–14 weeks',
    outcomes: [
      'Elimination of repetitive manual data entry through automated backend pipelines',
      'A centralized, single source of truth for your business data and workflows',
      'An enterprise-grade software foundation engineered for multi-tenant scalability',
    ],
    startingBudget: '$20,000',
    relatedCaseStudyId: 'fintech-analytics-suite',
    problemsSolved: [
      'Disjointed operations relying on vulnerable spreadsheets and fragmented tools',
      'Off-the-shelf SaaS tools charging exorbitant per-seat fees without fitting workflows',
      'Data silos preventing real-time reporting and timely decision-making',
      'Legacy software unable to scale or integrate with modern cloud APIs',
    ],
    useCases: [
      'B2B SaaS product development from minimum viable product to enterprise scale',
      'Custom internal portals for project management, dispatch, or inventory tracking',
      'Financial, healthcare, or logistics operational dashboards with real-time updates',
      'Multi-sided marketplace platforms connecting buyers, sellers, and operators',
    ],
    benefits: [
      '100% intellectual property ownership with zero ongoing software licensing royalties',
      'Tailored exactly to your operational workflows rather than forcing you into rigid templates',
      'High-security coding practices with data encryption at rest and in transit',
      'Modular microservice or clean monolithic architecture designed for future expansion',
    ],
    process: [
      {
        step: '01',
        title: 'Requirements Engineering & System Design',
        description:
          'We conduct technical workshops, define user roles, construct entity-relationship diagrams (ERDs), and map all API endpoints and integrations.',
      },
      {
        step: '02',
        title: 'Database & API Architecture',
        description:
          'We architect relational databases, configure authentication guards, and build performant API endpoints with strict TypeScript validation.',
      },
      {
        step: '03',
        title: 'Frontend Interface & State Orchestration',
        description:
          'We craft responsive dashboards and interactive controls, integrating client-side state caching and real-time streaming sockets.',
      },
      {
        step: '04',
        title: 'Security Auditing, Testing & Staged Deployment',
        description:
          'We conduct penetration testing, vulnerability scanning, automated test runs, and containerized deployment to scalable cloud infrastructure.',
      },
    ],
    faqs: [
      {
        question: 'Who owns the intellectual property and source code?',
        answer:
          'You do. Upon full completion of the project, all source code, database architectures, documentation, and design assets are 100% transferred to your organization with no recurring license fees.',
      },
      {
        question: 'How do you ensure data security in custom web applications?',
        answer:
          'We enforce industry standards including JWT or session-based authentication, salted hashing (bcrypt/argon2), role-based access control (RBAC), TLS 1.3 encryption, SQL injection safeguards via ORMs, and secure cloud environments.',
      },
      {
        question: 'Can you integrate our custom software with our existing tools?',
        answer:
          'Yes. We regularly build integrations with CRM platforms (Salesforce, HubSpot), ERP systems, payment gateways, accounting software (QuickBooks, Xero), and custom proprietary APIs.',
      },
    ],
  },
  {
    id: 'maintenance-security',
    slug: 'maintenance-security',
    seoTitle: 'Website Maintenance, Security & Support Services | RouR Tech',
    seoDescription:
      'Proactive website maintenance, dependency updates, security hardening, 24/7 uptime monitoring, Core Web Vitals maintenance, and dedicated technical support.',
    title: 'Website Maintenance, Security & Support',
    shortDescription:
      'Ongoing website maintenance, software updates, security checks, bug fixes and performance monitoring to help keep your website reliable.',
    fullDescription:
      'RourTech provides proactive maintenance, security governance, and technical support to keep your digital products operating at peak performance. Modern web applications require consistent updates, security vulnerability patching, performance audits, and database maintenance. Our dedicated retainer support ensures zero unmonitored downtime, rapid bug resolution, continuous Core Web Vitals compliance, and ongoing enhancements.',
    iconName: 'ShieldCheck',
    deliverables: [
      'Continuous 24/7 uptime and health monitoring with automated incident alerts',
      'Proactive dependency and framework updates (Next.js, Node.js, npm packages)',
      'Security vulnerability scanning, malware defense, and firewall configuration',
      'Daily offsite database and asset backups with verified disaster recovery drills',
      'Core Web Vitals and speed regression monitoring to prevent performance degradation',
      'Dedicated monthly hours for bug fixes, design tweaks, and feature additions',
      'Detailed monthly engineering reports with actionable optimization insights',
    ],
    techStack: [
      'GitHub Actions',
      'Dependabot / Snyk',
      'Datadog / Sentry',
      'Cloudflare WAF',
      'UptimeRobot / Pingdom',
      'AWS S3 Glacier Backups',
    ],
    typicalTimeline: 'Ongoing Monthly Retainer',
    outcomes: [
      '99.95%+ website availability with rapid incident response workflows',
      'Zero neglected dependencies, keeping your site immune to known CVE vulnerabilities',
      'Guaranteed engineering availability for immediate updates and troubleshooting',
    ],
    startingBudget: '$2,500 / month',
    relatedCaseStudyId: 'healthtech-clinical-portal',
    problemsSolved: [
      'Websites crashing unexpectedly without the owner realizing for hours or days',
      'Outdated plugins or npm packages leaving critical security vulnerabilities open to exploits',
      'Performance slowly degrading over time due to unoptimized content and scripts',
      'Having no reliable technical contact when urgent bug fixes or updates are needed',
    ],
    useCases: [
      'Mission-critical e-commerce stores requiring 24/7 uptime and zero transaction loss',
      'Corporate websites needing ongoing content updates, security patches, and SEO preservation',
      'Web applications requiring continuous dependency governance and cloud maintenance',
      'Companies needing a dedicated outsourced web engineering team on retainer',
    ],
    benefits: [
      'Direct access to senior developers via dedicated Slack or email support channels',
      'Predictable monthly investment without unexpected emergency development fees',
      'Disaster recovery guarantee: verified backups ready to restore at any time',
      'Proactive improvements rather than just waiting for problems to occur',
    ],
    process: [
      {
        step: '01',
        title: 'Initial Security & Health Baseline Audit',
        description:
          'We inspect your existing repository, server infrastructure, security headers, dependencies, and error logs to establish a clean operational baseline.',
      },
      {
        step: '02',
        title: 'Telemetry & Monitoring Setup',
        description:
          'We configure real-time error logging (Sentry), automated synthetic uptime checks, and security alerts to detect issues before your users do.',
      },
      {
        step: '03',
        title: 'Scheduled Maintenance Sprints',
        description:
          'We perform bi-weekly or monthly updates on staging environments, running regression test suites before pushing changes to production.',
      },
      {
        step: '04',
        title: 'Support SLA & Continuous Evolution',
        description:
          'We provide on-demand support for feature updates, content changes, and technical assistance within our agreed response time SLA.',
      },
    ],
    faqs: [
      {
        question: 'What is your response time for emergency support?',
        answer:
          'For critical severity issues (such as total website downtime or broken checkout funnels), our retainer plans provide an initial response and active triage within 1 to 2 hours during business hours.',
      },
      {
        question: 'Can unused monthly retainer hours roll over to the next month?',
        answer:
          'To ensure dedicated capacity and predictable engineering scheduling, hours are allocated per monthly billing cycle. However, we proactively use available time to run performance optimizations and security reviews.',
      },
      {
        question: 'Do you only maintain websites that RourTech built?',
        answer:
          'While we love maintaining products we created, we also adopt websites and web applications built by other teams. We conduct a preliminary code and architecture audit before taking over maintenance.',
      },
    ],
  },
];

/**
 * Helper to retrieve service by slug with alias support
 */
export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const normalized = slug.toLowerCase().trim();
  // Handle alias redirects/fallbacks
  if (normalized === 'seo-optimization') {
    return servicesData.find((s) => s.id === 'technical-seo');
  }
  if (normalized === 'maintenance-support') {
    return servicesData.find((s) => s.id === 'maintenance-security');
  }
  return servicesData.find(
    (s) => s.slug === normalized || s.id === normalized,
  );
}

/**
 * Returns all active service items
 */
export function getAllServices(): ServiceItem[] {
  return servicesData;
}
