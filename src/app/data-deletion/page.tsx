import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Data Deletion Request | RouR Tech",
  description: "How to request access, correction, or deletion of personal information.",
  alternates: { canonical: `${SITE_URL}/data-deletion` },
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Data Deletion Request"
      label="Privacy & User Rights"
      description="You can ask RouR Tech to delete personal information we hold about you, subject to applicable law."
      sections={[
        {
          title: "Submit a request",
          content: (
            <p>
              Use our{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>{" "}
              and include your name, contact details, and a description of the
              information or interaction concerned. Do not send passwords or
              unnecessary identity documents.
            </p>
          ),
        },
        {
          title: "Verification and response",
          content: (
            <p>
              We may ask for reasonable information to verify your request and
              protect against unauthorised access. We will respond within the
              time required by applicable law and explain if a request cannot
              be completed in full.
            </p>
          ),
        },
        {
          title: "Limits and exceptions",
          content: (
            <p>
              Some information may be retained where required for legal,
              accounting, security, dispute-resolution, or legitimate business
              purposes. Information held by independent service providers may
              also be subject to their own policies and legal obligations.
            </p>
          ),
        },
        {
          title: "Confirmation",
          content: (
            <p>
              We will confirm the outcome of a completed request through an
              appropriate contact method. Submitting a request does not itself
              confirm that deletion has occurred.
            </p>
          ),
        },
      ]}
    />
  );
}
