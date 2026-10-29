/**
 * RouR Tech global site configuration
 * Central source of truth for site URLs, metadata, brand details, and contact points.
 */

const rawAppUrl = process.env.APP_URL?.trim();
const isValidAppUrl = !!rawAppUrl && URL.canParse(rawAppUrl);

export const SITE_URL =
  isValidAppUrl
    ? new URL(rawAppUrl).origin
    : "https://rourtech.com";

export function absoluteSiteUrl(path = "/"): string {
  const pathWithoutTrailingSlash = `/${path.replace(/^\/+|\/+$/g, "")}`;
  const normalizedPath =
    path === "/"
      ? "/"
      : /\.[a-z0-9]{2,5}$/i.test(pathWithoutTrailingSlash)
        ? pathWithoutTrailingSlash
        : `${pathWithoutTrailingSlash}/`;
  return new URL(normalizedPath, `${SITE_URL}/`).toString();
}

export const siteConfig = {
  name: "RouR Tech",
  legalName: "Legal business name to be confirmed by owner",
  shortName: "RouR Tech",
  description:
    "RouR Tech offers website development, UI/UX design, technical SEO, e-commerce development, and custom software services.",
  url: SITE_URL,
  socialLinks: {
    x: "https://x.com/rourtech",
    instagram: "https://www.instagram.com/rourtech.in/",
    linkedin: "https://www.linkedin.com/company/rourtech/",
  },
  contact: {
    email: "contact@rourtech.com",
    phone: "+918091011912",
    displayPhone: "+91 80910 11912",
    whatsapp: "https://wa.me/918091011912",
    address: "Kangra, Himachal Pradesh, India",
  },
  ogImage: `${SITE_URL}/src/assets/images/hero_digital_agency_1791271576191-optimized.webp`,
  author: "RouR Tech Engineering Team",
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
    "RouR Tech",
  ],
};
