import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Cookie Policy | RouR Tech",
  description: "How RouR Tech uses cookies and similar browser technologies.",
  alternates: { canonical: `${SITE_URL}/cookie-policy` },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="This policy explains the cookies and similar technologies that may be used on the RouR Tech website."
      sections={[
        {
          title: "What cookies are",
          content: (
            <p>
              Cookies are small text files stored on your device by a website.
              Similar technologies, including browser storage and session
              tokens, can help a site remember a session or understand how it
              is used.
            </p>
          ),
        },
        {
          title: "How we use them",
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Essential technologies:</strong> to provide secure
                sessions, authentication, and core website functionality.
              </li>
              <li>
                <strong>Preferences:</strong> to remember choices where the
                website offers those features.
              </li>
              <li>
                <strong>Measurement:</strong> if analytics are enabled, to
                understand website usage and improve our content.
              </li>
            </ul>
          ),
        },
        {
          title: "Third-party technologies",
          content: (
            <p>
              Service providers used for hosting, authentication, forms,
              analytics, or embedded content may set or access their own
              cookies or storage. Their use is governed by their own privacy
              policies and terms.
            </p>
          ),
        },
        {
          title: "Your controls",
          content: (
            <p>
              You can block or delete cookies through your browser settings.
              Blocking essential technologies may affect sign-in or other
              website functions. If the website presents a consent control,
              your choices can be changed there.
            </p>
          ),
        },
        {
          title: "Questions",
          content: (
            <p>
              For questions about cookies, please use our{" "}
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
