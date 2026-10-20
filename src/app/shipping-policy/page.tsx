import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Digital Delivery Policy | RouR Tech",
  description: "How RouR Tech delivers digital services and project deliverables.",
  alternates: { canonical: `${SITE_URL}/shipping-policy` },
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage
      title="Digital Delivery & Handover Policy"
      description="RouR Tech provides digital services and electronic project deliverables; we do not ship physical products through this website."
      sections={[
        {
          title: "Digital delivery",
          content: (
            <p>
              Deliverables may be shared through a repository, cloud storage,
              deployment, email, or another agreed digital channel. The
              applicable proposal or agreement confirms the method, scope, and
              delivery schedule.
            </p>
          ),
        },
        {
          title: "Handover and acceptance",
          content: (
            <p>
              A project is handed over when the agreed deliverables and access
              details are provided. Any review or acceptance period is governed
              by the applicable written agreement.
            </p>
          ),
        },
        {
          title: "Access and delays",
          content: (
            <p>
              Delivery may depend on timely access, content, approvals, and
              third-party services. We will communicate material delays and
              work with the client on a reasonable revised delivery plan.
            </p>
          ),
        },
        {
          title: "Questions",
          content: (
            <p>
              For delivery or handover questions, please use our{" "}
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
