import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { absoluteSiteUrl, SITE_URL, siteConfig } from "@/lib/siteConfig";
import { serializeStructuredData } from "@/lib/structuredData";

const pageUrl = absoluteSiteUrl("/web-development-company-in-kangra");

export const metadata: Metadata = {
  title: "Web Development Company in Kangra, Himachal Pradesh | RouR Tech",
  description:
    "RouR Tech is based in Kangra, Himachal Pradesh, and provides remote web development, UI/UX design, e-commerce, and software services to clients in India and worldwide.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Web Development Company in Kangra, Himachal Pradesh | RouR Tech",
    description:
      "Remote web development and digital services from RouR Tech, based in Kangra, Himachal Pradesh.",
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Company in Kangra, Himachal Pradesh | RouR Tech",
    description:
      "Remote web development and digital services from RouR Tech, based in Kangra, Himachal Pradesh.",
  },
};

const services = [
  {
    title: "Website & Web Application Development",
    description:
      "Responsive business websites and custom web applications built with modern web technologies.",
    href: "/services/web-development",
  },
  {
    title: "UI/UX Design & Website Design",
    description:
      "User-focused interface design, prototypes, and responsive website experiences.",
    href: "/services/ui-ux-design",
  },
  {
    title: "E-commerce Website Development",
    description:
      "Online storefronts planned around your products, customer journey, and project requirements.",
    href: "/services/ecommerce-development",
  },
  {
    title: "Technical SEO",
    description:
      "Technical reviews and improvements for crawlability, metadata, structured data, and performance.",
    href: "/services/technical-seo",
  },
  {
    title: "Custom Software",
    description:
      "Web-based tools and software shaped around the requirements agreed for your project.",
    href: "/services/custom-software",
  },
  {
    title: "Website Maintenance & Security",
    description:
      "Website maintenance, security, and support scoped to your needs.",
    href: "/services/maintenance-security",
  },
];

const faqs = [
  {
    question: "Is RouR Tech based in Kangra?",
    answer:
      "Yes. RouR Tech is based in Kangra, Himachal Pradesh. Project discussions and delivery are handled remotely.",
  },
  {
    question: "Can I work with RouR Tech from outside Kangra?",
    answer:
      "Yes. RouR Tech works remotely with clients in India and internationally.",
  },
  {
    question: "Can you guarantee that my website will rank on Google?",
    answer:
      "No. Search rankings depend on many factors and cannot be guaranteed. Technical SEO can help search engines crawl and understand a website, but it does not guarantee a particular ranking.",
  },
  {
    question: "How do I discuss a project?",
    answer:
      "Use the contact page, email, phone, or WhatsApp to share your requirements. Scope, timeline, and pricing are discussed for the project.",
  },
];

export default function KangraWebDevelopmentPage() {
  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Remote Web Development Services in Kangra",
    description: metadata.description,
    url: pageUrl,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Kangra, Himachal Pradesh" },
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Web Development Company in Kangra",
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(jsonLdService),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(jsonLdBreadcrumb),
        }}
      />

      <Header />

      <main className="flex-1">
        <nav
          aria-label="Breadcrumb"
          className="border-b border-[#E8E8E8] bg-white py-3"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-xs text-[#666666]">
              <li>
                <Link href="/" className="hover:text-[#111111]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-[#111111]">
                Web Development in Kangra
              </li>
            </ol>
          </div>
        </nav>

        <section className="border-b border-[#E8E8E8] bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#B84238]">
                Based in Kangra · Working remotely
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-[#111111] sm:text-5xl md:text-6xl">
                Web Development Company in Kangra, Himachal Pradesh
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#555555] sm:text-lg">
                RouR Tech is an independent web development company based in
                Kangra, Himachal Pradesh. We build websites and web
                applications, and provide UI/UX design, e-commerce, technical
                SEO, and custom software services. Our work is delivered
                remotely for clients in Kangra, across India, and
                internationally.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#666666]">
                We work online and do not offer in-person meetings. Project
                scope, communication, and delivery are agreed with you before
                work begins.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#B84238] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#A33830]"
                >
                  Discuss Your Project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={siteConfig.contact.whatsapp}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#E8E8E8] bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F8F8F6]"
                >
                  WhatsApp RouR Tech
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Website design and web development services in Kangra
              </h2>
              <p className="mt-4 leading-relaxed text-[#666666]">
                From professional website design and responsive web development
                to e-commerce websites, custom web applications, and technical
                SEO, explore the digital services available to businesses in
                Kangra and across Himachal Pradesh. Each project is planned
                around your goals, audience, and requirements.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.href}
                  className="border border-[#E8E8E8] bg-white p-6 shadow-sm"
                >
                  <h3 className="font-display text-lg font-bold">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#666666]">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B84238] hover:underline"
                  >
                    Explore service
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#E8E8E8] bg-white py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                A clear website design and development process
              </h2>
              <p className="mt-4 leading-relaxed text-[#666666]">
                Work with a web development team based in Kangra through a
                straightforward online process. We discuss your business goals,
                website requirements, design preferences, features, and
                timeline before development begins. Remote collaboration lets
                us work with clients across Himachal Pradesh and beyond.
              </p>
            </div>
            <ol className="space-y-5">
              {[
                ["01", "Discover", "Discuss your goals and requirements."],
                ["02", "Plan", "Agree on scope, integrations, and timeline."],
                ["03", "Design & develop", "Build the agreed digital solution."],
                ["04", "Launch & handover", "Verify the work and plan handover."],
              ].map(([number, title, description]) => (
                <li key={number} className="flex gap-4">
                  <span className="font-mono-data pt-1 text-sm text-[#B84238]">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#666666]">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-[#E8E8E8] border-y border-[#E8E8E8]">
              {faqs.map((faq) => (
                <article key={faq.question} className="py-5">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-xl border border-[#E8E8E8] bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold sm:text-2xl">
                Looking for a website developer in Kangra?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#666666]">
                Tell RouR Tech about your business website, website redesign,
                e-commerce store, or custom web application. Get in touch to
                discuss your requirements, project scope, and next steps.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#B84238] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#A33830]"
              >
                Contact RouR Tech
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
