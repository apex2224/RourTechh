export interface PageSeoSettings {
  h1: string;
  seoTitle: string;
  metaDescription: string;
  focusKeyword: string;
  socialTitle: string;
  socialDescription: string;
}

export interface EditablePageSeo {
  id: string;
  path: string;
  label: string;
  defaultH1: string;
}

export const editablePageSeo: EditablePageSeo[] = [
  { id: "home", path: "/", label: "Home", defaultH1: "Digital products that are clear, fast, and built to last." },
  { id: "about", path: "/about", label: "About", defaultH1: "We engineer digital products shaped around real business needs." },
  { id: "careers", path: "/careers", label: "Careers", defaultH1: "Build High-Performance Digital Products With Us" },
  { id: "contact", path: "/contact", label: "Contact", defaultH1: "Let's build something exceptional together." },
  { id: "portfolio", path: "/portfolio", label: "Portfolio", defaultH1: "Project Work" },
  { id: "faq", path: "/faq", label: "FAQs", defaultH1: "Frequently Asked Questions" },
  { id: "resources", path: "/resources", label: "Resources", defaultH1: "Technical Resources & Blueprints" },
  { id: "blog", path: "/blog", label: "Blog", defaultH1: "Engineering Notes, Technical SEO & Systems Design" },
  { id: "service-web-development", path: "/services/web-development", label: "Web Development Service", defaultH1: "Website & Web Application Development" },
  { id: "service-ui-ux-design", path: "/services/ui-ux-design", label: "UI/UX Design Service", defaultH1: "UI/UX Design & Website Design" },
  { id: "service-technical-seo", path: "/services/technical-seo", label: "Technical SEO Service", defaultH1: "Technical SEO & Website Optimization" },
  { id: "service-ecommerce-development", path: "/services/ecommerce-development", label: "E-commerce Service", defaultH1: "E-commerce Website Development" },
  { id: "service-custom-software", path: "/services/custom-software", label: "Custom Software Service", defaultH1: "Custom Software & Web Application Solutions" },
  { id: "service-maintenance-security", path: "/services/maintenance-security", label: "Maintenance & Security Service", defaultH1: "Website Maintenance, Security & Support" },
  { id: "kangra-web-development", path: "/web-development-company-in-kangra", label: "Web Development in Kangra", defaultH1: "Web Development Company in Kangra, Himachal Pradesh" },
  { id: "privacy-policy", path: "/privacy-policy", label: "Privacy Policy", defaultH1: "Privacy Policy" },
  { id: "cookie-policy", path: "/cookie-policy", label: "Cookie Policy", defaultH1: "Cookie Policy" },
  { id: "terms-and-conditions", path: "/terms-and-conditions", label: "Terms & Conditions", defaultH1: "Terms & Conditions" },
  { id: "refund-policy", path: "/refund-policy", label: "Refund & Cancellation Policy", defaultH1: "Refund & Cancellation Policy" },
  { id: "shipping-policy", path: "/shipping-policy", label: "Shipping & Delivery Policy", defaultH1: "Digital Delivery & Handover Policy" },
  { id: "data-deletion", path: "/data-deletion", label: "Data Deletion", defaultH1: "Privacy Requests & Data Deletion" },
  { id: "disclaimer", path: "/disclaimer", label: "Disclaimer", defaultH1: "Disclaimer" },
  { id: "acceptable-use-policy", path: "/acceptable-use-policy", label: "Acceptable Use Policy", defaultH1: "Acceptable Use Policy" },
];

export const emptyPageSeoSettings: PageSeoSettings = {
  h1: "",
  seoTitle: "",
  metaDescription: "",
  focusKeyword: "",
  socialTitle: "",
  socialDescription: "",
};
