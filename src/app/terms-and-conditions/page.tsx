import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Terms & Conditions | RouR Tech",
  description: "Terms for using the RouR Tech website and engaging our services.",
  alternates: { canonical: absoluteSiteUrl("/terms-and-conditions") },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="These terms apply to your use of the RouR Tech website and our professional services."
      sections={[
        {
          title: "Using this website",
          content: (
            <p>
              You may use this website for lawful purposes and in accordance
              with these terms. Content is provided for general information
              about RouR Tech and does not by itself create a client
              relationship or guarantee a project outcome.
            </p>
          ),
        },
        {
          title: "Website content and resources",
          content: (
            <p>
              Articles, guides, examples, and other published resources are
              provided for general information. You may read and share links to
              them. Unless a page or applicable licence says otherwise, you
              must not republish substantial content, remove attribution,
              represent it as your own, or use RouR Tech branding without
              permission. Quotation, criticism, and other uses permitted by
              applicable law are not restricted by this paragraph.
            </p>
          ),
        },
        {
          title: "Our services",
          content: (
            <p>
              Project scope, deliverables, timelines, fees, payment schedules,
              support, ownership, and acceptance criteria are governed by the
              written agreement for each engagement. If an engagement agreement
              conflicts with these website terms, the engagement agreement
              controls for that project.
            </p>
          ),
        },
        {
          title: "Intellectual property",
          content: (
            <p>
              Website content, branding, designs, code, and other materials
              belong to RouR Tech or their respective owners unless stated
              otherwise. Client ownership or licence rights for project
              deliverables are determined by the applicable written agreement.
              Third-party software remains subject to its own licence.
            </p>
          ),
        },
        {
          title: "Acceptable use",
          content: (
            <p>
              You must not misuse the website, interfere with its operation,
              submit malicious or unlawful material, attempt unauthorised
              access, or infringe another person&apos;s rights. Further rules
              are set out in our{" "}
              <a
                href="/acceptable-use-policy"
                className="text-[#FF5B4D] font-semibold"
              >
                Acceptable Use Policy
              </a>
              .
            </p>
          ),
        },
        {
          title: "External links and third-party services",
          content: (
            <p>
              Links to external websites and references to third-party services
              are provided for convenience or context. They are operated by
              their respective providers; we do not control or adopt their
              content, availability, terms, or privacy practices. Your use of
              those services is subject to their own terms.
            </p>
          ),
        },
        {
          title: "Disclaimers and liability",
          content: (
            <p>
              We work to keep the website accurate and available, but it is
              provided on an &quot;as is&quot; and &quot;as available&quot;
              basis. To the extent permitted by law, RouR Tech is not
              responsible for indirect or consequential loss arising from
              website use. Nothing in these terms excludes liability that
              cannot legally be excluded.
            </p>
          ),
        },
        {
          title: "Changes and contact",
          content: (
            <p>
              We may update these website terms by publishing a revised version
              with an updated date. Changes to a separate client engagement
              remain governed by the applicable written agreement and any
              legally required notice or acceptance. Questions or concerns
              should be sent through our{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>
              .
            </p>
          ),
        },
        {
          title: "Applicable rights",
          content: (
            <p>
              These terms do not exclude or limit any consumer or other
              statutory right, remedy, or liability that cannot lawfully be
              excluded or limited. If a provision cannot be enforced, the
              remaining provisions continue only to the extent permitted by
              applicable law.
            </p>
          ),
        },
      ]}
    />
  );
}
