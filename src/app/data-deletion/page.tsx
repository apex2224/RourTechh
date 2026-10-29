import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Requests & Data Deletion | RouR Tech",
  description:
    "How to submit a privacy, correction, consent-withdrawal, or deletion request to RouR Tech.",
  alternates: { canonical: absoluteSiteUrl("/data-deletion") },
};

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Privacy Requests & Data Deletion"
      label="Privacy & User Rights"
      description="You can ask us to review a request about personal information, subject to applicable law and verification."
      sections={[
        {
          title: "Submit an access, correction, withdrawal, or deletion request",
          content: (
            <p>
              Use our{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>{" "}
              and clearly identify the message as a privacy request. State
              whether you are asking us to review information, correct it,
              delete it, or withdraw consent you previously gave, and provide
              only enough context for us to find the relevant interaction. Do
              not send passwords or unnecessary identity documents. The
              contact form stores the request as an inquiry in Firestore and
              sends it through EmailJS. It also requires a company, service,
              and inquiry description; phone and budget are optional. See the{" "}
              <a href="/privacy-policy" className="text-[#FF5B4D] font-semibold">
                Privacy Policy
              </a>
              .
            </p>
          ),
        },
        {
          title: "Verification and response",
          content: (
            <p>
              Authorized personnel will review the request and may ask for
              proportionate information to verify your identity and protect
              against unauthorized disclosure. We will respond as soon as
              reasonably practicable and within a period required by applicable
              law, if one applies. We will explain if we cannot complete all or
              part of a request.
            </p>
          ),
        },
        {
          title: "Limits and exceptions",
          content: (
            <p>
              A request is reviewed individually; deletion is not automatic,
              and submission does not guarantee deletion or refusal. We may
              retain only information for which a continuing legal,
              accounting, security, or dispute-resolution need is justified
              and legally permitted. Where full deletion is not appropriate,
              we will consider limiting use or retaining less information.
              Provider copies may be subject to their own controls and legal
              duties.
            </p>
          ),
        },
        {
          title: "Retention and current process",
          content: (
            <p>
              The application has no configured automatic inquiry deletion
              period, and there is no dedicated privacy-request tracker in the
              reviewed implementation. Enquiries remain in Firestore until
              removed through an authorized administrative or other applicable
              process. A 24-month review point has been proposed, but is not
              adopted policy and has not been implemented. Existing records
              are not automatically deleted by submitting a request.
            </p>
          ),
        },
        {
          title: "Consent withdrawal and newsletter status",
          content: (
            <p>
              If you previously gave a specific consent, tell us which consent
              you want to withdraw. The newsletter form currently does not
              create a stored subscription or provide an unsubscribe system;
              there is no newsletter record in the reviewed form flow for us
              to remove through that interface.
            </p>
          ),
        },
        {
          title: "Confirmation",
          content: (
            <p>
              We will communicate the outcome using the contact details
              provided, where reasonably possible. A request submission is not
              itself confirmation that access, correction, or deletion has
              occurred.
            </p>
          ),
        },
      ]}
    />
  );
}
