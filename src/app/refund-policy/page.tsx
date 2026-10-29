import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | RouR Tech",
  description: "Refund and cancellation terms for RouR Tech professional services.",
  alternates: { canonical: absoluteSiteUrl("/refund-policy") },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      description="Our approach to cancellations, project work already completed, and refunds."
      sections={[
        {
          title: "Project-specific terms",
          content: (
            <p>
              The written agreement or proposal for each project sets out its
              fees, milestones, payment dates, and cancellation terms. Please
              review that agreement before starting work.
            </p>
          ),
        },
        {
          title: "No automatic online purchase",
          content: (
            <p>
              The website presents professional services and does not provide
              an online checkout for purchasing them. A service engagement is
              formed only under the applicable written proposal or agreement;
              this policy does not replace those project-specific terms.
            </p>
          ),
        },
        {
          title: "Cancelling a project",
          content: (
            <p>
              A cancellation request should be sent through our{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>
              . On cancellation, you remain responsible for approved work
              completed and reasonable, non-cancellable costs incurred before
              the cancellation takes effect, unless the written agreement or
              applicable law says otherwise.
            </p>
          ),
        },
        {
          title: "Refunds",
          content: (
            <p>
              Any refundable amount is assessed against the applicable
              agreement, work completed, third-party costs, and applicable
              law. Approved refunds are returned using the original payment
              method where reasonably possible. Nothing in this policy removes
              a refund or cancellation right that cannot lawfully be limited.
            </p>
          ),
        },
        {
          title: "Recurring support",
          content: (
            <p>
              Recurring support or maintenance plans may have separate notice,
              billing, and cancellation terms stated in the relevant order or
              agreement.
            </p>
          ),
        },
      ]}
    />
  );
}
