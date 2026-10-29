import { absoluteSiteUrl } from "@/lib/siteConfig";

const content = `# RouR Tech

> RouR Tech designs and develops websites, web applications, e-commerce platforms, and custom software, with related UI/UX design and technical SEO services.

## Key pages
- [Home](${absoluteSiteUrl()}): Overview of RouR Tech and its services.
- [About](${absoluteSiteUrl("/about")}): Company background and approach.
- [Portfolio](${absoluteSiteUrl("/portfolio")}): Selected project examples.
- [Case studies](${absoluteSiteUrl("/case-studies")}): Project case studies.
- [Blog](${absoluteSiteUrl("/blog")}): Articles and technical insights.
- [Resources](${absoluteSiteUrl("/resources")}): Practical web development resources.
- [Contact](${absoluteSiteUrl("/contact")}): Contact RouR Tech about an inquiry.

## Services
- [Website and web application development](${absoluteSiteUrl("/services/web-development")})
- [UI/UX design](${absoluteSiteUrl("/services/ui-ux-design")})
- [Technical SEO](${absoluteSiteUrl("/services/technical-seo")})
- [E-commerce development](${absoluteSiteUrl("/services/ecommerce-development")})
- [Custom software](${absoluteSiteUrl("/services/custom-software")})
- [Website maintenance and security](${absoluteSiteUrl("/services/maintenance-security")})
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
