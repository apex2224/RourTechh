import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Acceptable Use Policy | RouR Tech",
  description: "Rules for safe and lawful use of RouR Tech websites and services.",
  alternates: { canonical: absoluteSiteUrl("/acceptable-use-policy") },
};

export default function AcceptableUsePolicyPage() {
  return (
    <LegalPage
      title="Acceptable Use Policy"
      description="Please use RouR Tech websites, forms, and services responsibly, lawfully, and respectfully."
      sections={[
        {
          title: "Prohibited activity",
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Break the law or infringe another person&apos;s rights.</li>
              <li>
                Attempt unauthorised access, scanning, probing, or security
                testing.
              </li>
              <li>Disrupt, overload, or interfere with our systems.</li>
              <li>Upload malware, harmful code, spam, or misleading content.</li>
              <li>Impersonate another person or misrepresent an affiliation.</li>
              <li>Collect or misuse personal information without permission.</li>
            </ul>
          ),
        },
        {
          title: "Reports and enforcement",
          content: (
            <p>
              We may investigate suspected misuse and restrict or end access
              where reasonably necessary to protect people, systems, or our
              business. To report a concern, please use our{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>
              .
            </p>
          ),
        },
        {
          title: "Good-faith security reports",
          content: (
            <p>
              If you discover a suspected vulnerability, do not access, copy,
              alter, or disclose other people&apos;s data or disrupt a service.
              Stop testing and report the issue through our{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>{" "}
              with a concise description and steps to reproduce, avoiding
              sensitive personal information. Testing is not authorized unless
              we have expressly agreed to its scope in writing.
            </p>
          ),
        },
      ]}
    />
  );
}
