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
      'RouR Tech offers website and web application development using technologies such as Next.js, React, and TypeScript. The architecture, performance goals, maintenance needs, and search requirements are assessed for each project.',
    iconName: 'Code2',
    deliverables: [
      'Custom web applications and responsive business platforms built with Next.js & React',
      'Production-grade TypeScript architecture with component-level type safety',
      'Headless CMS integration (Sanity, Strapi, Contentful) or custom admin portals',
      'REST & GraphQL API connectivity with edge caching and data serialization',
      'Performance review and Core Web Vitals improvements scoped to agreed goals',
      'Automated CI/CD deployment pipelines on Vercel, Cloudflare, or AWS',
      'Developer documentation and repository handover as agreed for the project',
    ],
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'PostgreSQL / Supabase',
      'Vercel / Cloudflare',
    ],
    typicalTimeline: 'Agreed after project scoping',
    outcomes: [
      'Performance evaluated against agreed devices, networks, and use cases',
      'Responsive behavior and accessibility needs reviewed during implementation',
      'A documented codebase designed to support future maintenance',
    ],
    startingBudget: 'Discussed after project scoping',
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
      'Project communication and collaboration cadence agreed at the start of work',
      'Review of third-party dependencies for fit, maintenance, and performance impact',
      'Semantic HTML5 structure engineered for organic search discovery from day one',
      'Design tokens and implementation aligned with supplied design specifications',
    ],
    process: [
      {
        step: '01',
        title: 'Architecture & Technical Discovery',
        description:
          'We review business requirements, define relevant data schemas, and select a rendering and routing approach suited to the project.',
      },
      {
        step: '02',
        title: 'Component Engineering & Prototyping',
        description:
          'We build reusable UI components that follow the agreed design system and include responsive and keyboard-accessible behavior in scope.',
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
          'Testing, performance checks, deployment, and any ongoing monitoring are selected and documented for the project scope.',
      },
    ],
    faqs: [
      {
        question: 'Which framework do you recommend for new web development projects?',
        answer:
          'We work with Next.js, React, and TypeScript. The framework and rendering approach should be selected based on your requirements, team, integrations, and maintenance needs.',
      },
      {
        question: 'Will our team be able to update website copy and images without code changes?',
        answer:
          'A CMS can be included when it fits the project. The publishing workflow, editor permissions, and content types are agreed during scoping.',
      },
      {
        question: 'How do you approach Core Web Vitals?',
        answer:
          'We can review LCP, INP, and CLS, identify likely bottlenecks, and prioritize changes for the agreed devices and network conditions. Scores depend on the application, hosting, content, and third-party services, so they cannot be guaranteed.',
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
      'RouR Tech offers digital interface design, including user-flow review, wireframes, interface specifications, design systems, and clickable prototypes as agreed for each project.',
    iconName: 'Palette',
    deliverables: [
      'Comprehensive Figma component libraries and tokenized design systems',
      'High-fidelity responsive UI designs for mobile, tablet, and desktop viewports',
      'Interactive clickable prototypes for stakeholder alignment and user testing',
      'Information architecture, wireframes, and customer journey flowcharts',
      'Accessibility review against agreed criteria, including relevant WCAG guidance',
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
    typicalTimeline: 'Agreed after project scoping',
    outcomes: [
      'A distinct, polished visual identity that builds customer credibility',
      'User flows designed to make key tasks easier to understand and complete',
      'Reusable design patterns intended to support consistent future changes',
    ],
    startingBudget: 'Discussed after project scoping',
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
      'Handoff details that help developers implement the agreed design intent',
      'Responsive design review across viewport sizes selected for the project',
      'Design file access and ownership terms documented in the project agreement',
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
          'The agreement should specify which design files and assets are delivered and what access or ownership rights apply.',
      },
      {
        question: 'How do you ensure designs can be built without unexpected development costs?',
        answer:
          'Design and engineering can be coordinated during the engagement. Handoff detail and implementation review should be agreed as part of the project scope.',
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
      'RouR Tech offers technical SEO reviews and implementation support for crawling, rendering, indexability, metadata, structured data, and site performance. Work is prioritized against the site’s current architecture and agreed objectives. Search rankings depend on many factors outside a single technical engagement.',
    iconName: 'TrendingUp',
    deliverables: [
      'Comprehensive technical SEO audit covering crawling, rendering, and indexing',
      'Review of LCP, INP, and CLS with prioritized, context-specific recommendations',
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
    typicalTimeline: 'Agreed after project scoping',
    outcomes: [
      'A prioritized record of crawl, indexability, and duplicate-content issues',
      'Before-and-after performance measurements for agreed pages and test conditions',
      'Structured data implemented and checked against supported schema requirements',
    ],
    startingBudget: 'Discussed after project scoping',
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
      'Performance changes measured separately from business and search outcomes, which depend on many factors',
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
          'We review rendering, assets, and layout behavior, then prioritize changes based on the measured results and agreed objectives.',
      },
      {
        step: '03',
        title: 'Structured Data & Schema Graph Deployment',
        description:
          'We can add structured data that is validated against the relevant schema requirements; search engines decide whether eligible features appear.',
      },
      {
        step: '04',
        title: 'Validation & Search Console Verification',
        description:
          'Where access is available and included in scope, we can validate changes and review Search Console reporting. Indexing and feature display remain controlled by search engines.',
      },
    ],
    faqs: [
      {
        question: 'Can you guarantee a #1 ranking on Google?',
        answer:
          'No. Search rankings depend on competition, content, links, technical health, and search engine systems. Technical SEO work can address crawlability and implementation issues, but it cannot guarantee a specific position or traffic level.',
      },
      {
        question: 'How is technical SEO different from traditional SEO copywriting?',
        answer:
          'Technical SEO reviews how search engines can crawl, render, and interpret a site. It is one part of search visibility; content, competition, links, and search engine systems also matter.',
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
      'RouR Tech can scope custom e-commerce storefronts and integrations using platforms such as Shopify and modern web technologies. Architecture, checkout, catalog features, localization, inventory connections, and performance requirements depend on the selected providers and project scope.',
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
      'Next.js',
      'Shopify Plus / Storefront API',
      'Stripe Elements',
      'Algolia / Meilisearch',
      'Tailwind CSS',
      'Sanity CMS',
      'Redis Caching',
    ],
    typicalTimeline: 'Agreed after project scoping',
    outcomes: [
      'Performance measured against agreed pages, devices, networks, and test conditions',
      'A content and catalog workflow designed around the selected commerce platform',
      'Capacity and reliability requirements documented and tested where included in scope',
    ],
    startingBudget: 'Discussed after project scoping',
    problemsSolved: [
      'Slow mobile page loads on monolithic e-commerce themes causing cart abandonment',
      'Rigid checkout flows that cannot support wholesale, B2B, or international pricing',
      'Inability to create rich, storytelling brand landing pages that sell products directly',
      'Inventory sync errors between physical retail systems and online storefronts',
    ],
    useCases: [
      'Luxury and direct-to-consumer (DTC) brands seeking a bespoke digital flagship',
      'Wholesale and B2B merchants needing custom pricing tiers and quotation flows',
      'Retailers with large catalogs requiring search and product filtering',
      'Multi-currency, international stores with localized tax and shipping rules',
    ],
    benefits: [
      'Bespoke user experience completely free from template constraints',
      'A decoupled frontend can provide implementation flexibility but adds integration and maintenance considerations',
      'Payment provider integration and PCI responsibilities reviewed for the chosen checkout architecture',
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
          'When selected and included in scope, we connect the storefront to the commerce platform, search provider, and required webhooks, then test the agreed flows.',
      },
      {
        step: '04',
        title: 'Payment Integration & Stress Testing',
        description:
          'Checkout, discounts, refunds, tax handling, and load testing are addressed according to the selected providers and agreed test scope.',
      },
    ],
    faqs: [
      {
        question: 'Why choose headless commerce over a standard Shopify theme?',
        answer:
          'Headless commerce separates the storefront from commerce services and can provide more frontend control. It also introduces additional integration and maintenance work, so the right approach depends on your products, workflows, team, and budget.',
      },
      {
        question: 'Do we still manage products and orders in the Shopify dashboard?',
        answer:
          'If Shopify is selected, the agreement should describe which catalog, order, fulfillment, and refund workflows remain in Shopify and which are handled elsewhere.',
      },
      {
        question: 'How do you handle security and payment processing?',
        answer:
          'Payment handling depends on the chosen provider and integration. The architecture and each party’s PCI responsibilities should be confirmed with the payment provider and documented before launch.',
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
      'RouR Tech offers custom web software and application development for operational requirements. Potential project components include SaaS platforms, internal portals, dashboards, and workflow automation. Architecture, security controls, and integrations are scoped for each engagement.',
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
    typicalTimeline: 'Agreed after project scoping',
    outcomes: [
      'Automation opportunities identified for repetitive data-entry workflows',
      'Data structures and access patterns designed for the agreed workflows',
      'Architecture and scaling requirements documented for expected use cases',
    ],
    startingBudget: 'Discussed after project scoping',
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
      'Ownership and licensing for custom work and third-party components documented in the project agreement',
      'Tailored exactly to your operational workflows rather than forcing you into rigid templates',
      'Security requirements and data-protection controls scoped to the application and selected providers',
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
          'Security testing, vulnerability reviews, automated tests, and deployment targets are selected and documented for the engagement.',
      },
    ],
    faqs: [
      {
        question: 'Who owns the intellectual property and source code?',
        answer:
          'The written agreement should specify ownership, licenses, payment conditions, and which source code, documentation, and design assets are delivered.',
      },
      {
        question: 'How do you ensure data security in custom web applications?',
        answer:
          'Security measures depend on the application and threat model. Authentication, access control, encryption, data handling, and provider configuration should be assessed and agreed for each project.',
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
      'Website maintenance, dependency updates, security reviews, bug fixes, performance checks, and support scoped to the application.',
    title: 'Website Maintenance, Security & Support',
    shortDescription:
      'Ongoing website maintenance, software updates, security checks, bug fixes and performance monitoring to help keep your website reliable.',
    fullDescription:
      'Maintenance and support can be scoped to cover selected dependency updates, security reviews, performance checks, incident handling, and application changes. Availability, response targets, monitoring, and recovery practices must be agreed for each engagement.',
    iconName: 'ShieldCheck',
    deliverables: [
      'Monitoring and incident alerting configured according to the agreed support scope',
      'Proactive dependency and framework updates (Next.js, Node.js, npm packages)',
      'Security vulnerability scanning, malware defense, and firewall configuration',
      'Backup and recovery arrangements, if required, defined for the selected infrastructure and support scope',
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
    typicalTimeline: 'Agreed support schedule',
    outcomes: [
      'A documented maintenance plan for updates, checks, and issue handling',
      'Dependency changes reviewed and prioritized based on project needs',
      'Support hours, channels, and response expectations agreed in writing',
    ],
    startingBudget: 'Discussed after project scoping',
    problemsSolved: [
      'Websites crashing unexpectedly without the owner realizing for hours or days',
      'Outdated plugins or npm packages leaving critical security vulnerabilities open to exploits',
      'Performance slowly degrading over time due to unoptimized content and scripts',
      'Having no reliable technical contact when urgent bug fixes or updates are needed',
    ],
    useCases: [
      'E-commerce stores where availability and order integrity are important',
      'Corporate websites needing ongoing content updates, security patches, and SEO preservation',
      'Web applications requiring continuous dependency governance and cloud maintenance',
      'Companies needing a dedicated outsourced web engineering team on retainer',
    ],
    benefits: [
      'Support channels, included work, and availability agreed in writing',
      'Fees and any out-of-scope or emergency work documented before support begins',
      'Backup and recovery planning based on the application and agreed scope',
      'Proactive improvements rather than just waiting for problems to occur',
    ],
    process: [
      {
        step: '01',
        title: 'Initial Security & Health Baseline Audit',
        description:
          'Where access and scope permit, we review the repository, hosting, security settings, dependencies, and available diagnostics to document a baseline.',
      },
      {
        step: '02',
        title: 'Telemetry & Monitoring Setup',
        description:
          'Monitoring and alerting tools can be configured when selected, supported by the infrastructure, and included in the agreed scope.',
      },
      {
        step: '03',
        title: 'Scheduled Maintenance Sprints',
        description:
          'Maintenance cadence, staging access, and regression testing are agreed based on the application and support arrangement.',
      },
      {
        step: '04',
        title: 'Support SLA & Continuous Evolution',
        description:
          'Support availability, response targets, and included changes are set out in the applicable support agreement.',
      },
    ],
    faqs: [
      {
        question: 'What is your response time for emergency support?',
        answer:
          'Response targets depend on the support agreement. Confirm coverage hours, escalation channels, severity definitions, and response commitments in writing before relying on a service level.',
      },
      {
        question: 'Can unused monthly retainer hours roll over to the next month?',
        answer:
          'Any monthly allocation, rollover, or use of unused hours depends on the terms of the support agreement.',
      },
      {
        question: 'Do you only maintain websites that RouR Tech built?',
        answer:
          'Maintenance for an existing application depends on its condition, access, and support requirements. Any preliminary assessment should be agreed before work begins.',
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
