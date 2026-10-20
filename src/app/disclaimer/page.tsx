import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Disclaimer | RouR Tech",
  description: "Important information about RouR Tech website content and service results.",
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Important information about the content and claims published on this website."
      sections={[
        {
          title: "General information",
          content: (
            <p>
              The content on this website is provided for general information
              about RouR Tech, our capabilities, and our services. We try to
              keep it accurate and current, but it may not be complete or
              suitable for every situation.
            </p>
          ),
        },
        {
          title: "Results and performance",
          content: (
            <p>
              Examples, case studies, performance figures, and SEO information
              are illustrative unless a written client agreement states a
              specific target. Actual results depend on the project, content,
              market, hosting, third-party services, and other factors outside
              our control.
            </p>
          ),
        },
        {
          title: "Third-party services and links",
          content: (
            <p>
              Our website or projects may connect to third-party services and
              websites. We do not control their availability, security,
              content, or privacy practices. Their own terms and policies
              apply.
            </p>
          ),
        },
        {
          title: "Professional advice",
          content: (
            <p>
              Website content is not legal, financial, tax, security, or other
              professional advice. Obtain advice from a qualified professional
              for decisions requiring specialist guidance.
            </p>
          ),
        },
      ]}
    />
  );
}
