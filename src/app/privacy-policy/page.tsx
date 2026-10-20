import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy | RouR Tech",
  description: "How RouR Tech collects, uses, and protects personal information.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains how RouR Tech handles information collected through our website and services."
      sections={[
        {
          title: "Information we collect",
          content: (
            <>
              <p>
                We may collect information you provide when you contact us or
                request a proposal, such as your name, email address, company,
                phone number, project details, and budget information. We may
                also receive basic technical information, such as IP address,
                browser type, device information, and pages visited.
              </p>
            </>
          ),
        },
        {
          title: "How we use information",
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to enquiries and provide requested information.</li>
              <li>Prepare, deliver, and support services.</li>
              <li>Maintain, secure, and improve our website and systems.</li>
              <li>Meet legal, accounting, and fraud-prevention obligations.</li>
            </ul>
          ),
        },
        {
          title: "Sharing and service providers",
          content: (
            <p>
              We do not sell personal information. We may share information
              with trusted providers that help us host the website, process
              enquiries, manage authentication, deliver email, or provide
              business services. Providers may process information only as
              needed to provide those services or comply with law.
            </p>
          ),
        },
        {
          title: "Retention and security",
          content: (
            <p>
              We retain information only for as long as reasonably necessary
              for the purposes described here, an active business relationship,
              or legal and accounting requirements. We use reasonable
              administrative and technical safeguards, but no online service
              can be guaranteed completely secure.
            </p>
          ),
        },
        {
          title: "Your choices and requests",
          content: (
            <p>
              You may ask us to access, correct, or delete personal information
              we hold about you, subject to applicable law and reasonable
              verification. Submit a request through our{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>
              . More information is available on our{" "}
              <a href="/data-deletion" className="text-[#FF5B4D] font-semibold">
                data deletion page
              </a>
              .
            </p>
          ),
        },
        {
          title: "Contact",
          content: (
            <p>
              Questions about this policy can be sent through the{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
