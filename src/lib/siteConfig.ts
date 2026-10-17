/**
 * RourTech Global Site Configuration
 * Central source of truth for site URLs, metadata, brand details, and contact points.
 */

const rawAppUrl = process.env.APP_URL?.trim();
const isValidAppUrl = !!rawAppUrl && URL.canParse(rawAppUrl);

export const SITE_URL =
  isValidAppUrl
    ? rawAppUrl
    : "https://RourTech.com";

export const siteConfig = {
  name: "RouR Tech",
  legalName: "RouR Tech Digital Agency",
  shortName: "RourTech",
  description:
    "RourTech engineers high-performance digital products, custom web applications, headless commerce systems, and conversion-focused websites.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/src/assets/images/hero_digital_agency_1791271576191.jpg`,
  author: "RouR Tech Engineering Team",
  creator: "@rourtech",
  email: "partnerships@vanguarddigital.agency",
  phone: "+1 (415) 890-4210",
  address: {
    street: "450 Mission Street, Suite 1400",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "US",
  },
  social: {
    twitter: "https://twitter.com/rourtech",
    github: "https://github.com/apex2224/RourTechh",
    linkedin: "https://linkedin.com/company/rourtech",
  },
  keywords: [
    "web development",
    "UI/UX design",
    "technical SEO",
    "e-commerce development",
    "custom software",
    "Next.js development",
    "React development",
    "Core Web Vitals optimization",
    "digital product engineering",
    "RourTech",
  ],
};
