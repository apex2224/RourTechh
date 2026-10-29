import { SITE_URL, absoluteSiteUrl, siteConfig } from "@/lib/siteConfig";

const markdown = `# ${siteConfig.name}

> Digital products that are clear, fast, and built to last.

${siteConfig.name} designs and develops websites and web applications that make complex businesses easier to understand, use, and grow. The team focuses on thoughtful design, maintainable engineering, performance, accessibility, and technical SEO.

[Start a project](${absoluteSiteUrl("/contact")}) · [Explore services](${SITE_URL}/#services)

## What we do

- [Website and web application development](${absoluteSiteUrl("/services/web-development")})
- [UI/UX design and website design](${absoluteSiteUrl("/services/ui-ux-design")})
- [Technical SEO and website optimization](${absoluteSiteUrl("/services/technical-seo")})
- [E-commerce website development](${absoluteSiteUrl("/services/ecommerce-development")})
- [Custom software and web application solutions](${absoluteSiteUrl("/services/custom-software")})
- [Website maintenance, security, and support](${absoluteSiteUrl("/services/maintenance-security")})

## How projects work

1. **Discover** — Discuss business goals, users, existing systems, and technical constraints.
2. **Plan** — Define the approach, integrations, and delivery schedule.
3. **Design** — Develop visual direction, reusable patterns, responsive layouts, and prototypes as agreed.
4. **Develop** — Implement the solution using the selected technologies and testing approach.
5. **Launch and handover** — Plan deployment, verification, and support around the agreed scope.

## Get in touch

- Email: [${siteConfig.contact.email}](mailto:${siteConfig.contact.email})
- Phone: [${siteConfig.contact.displayPhone}](tel:${siteConfig.contact.phone})
- WhatsApp: [Message ${siteConfig.name}](${siteConfig.contact.whatsapp})
- Location: ${siteConfig.contact.address}

[Contact RouR Tech](${absoluteSiteUrl("/contact")})
`;

function createMarkdownResponse(includeBody: boolean): Response {
  return new Response(includeBody ? markdown : null, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}

export function GET() {
  return createMarkdownResponse(true);
}

export function HEAD() {
  return createMarkdownResponse(false);
}
