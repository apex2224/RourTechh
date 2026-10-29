import { absoluteSiteUrl } from "@/lib/siteConfig";

const content = `# RouR Tech

RouR Tech offers website development, UI/UX design, technical SEO, e-commerce development, and custom software services.

## Pages
- Home: ${absoluteSiteUrl()}
- About: ${absoluteSiteUrl("/about")}
- Portfolio: ${absoluteSiteUrl("/portfolio")}
- Case studies: ${absoluteSiteUrl("/case-studies")}
- Blog: ${absoluteSiteUrl("/blog")}
- Contact: ${absoluteSiteUrl("/contact")}

## Services
- Website and web application development: ${absoluteSiteUrl("/services/web-development")}
- UI/UX design: ${absoluteSiteUrl("/services/ui-ux-design")}
- Technical SEO: ${absoluteSiteUrl("/services/technical-seo")}
- E-commerce development: ${absoluteSiteUrl("/services/ecommerce-development")}
- Custom software: ${absoluteSiteUrl("/services/custom-software")}
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
