import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Cookie Policy | RouR Tech",
  description:
    "What cookies and browser storage were found in the RouR Tech website source and what remains unverified.",
  alternates: { canonical: absoluteSiteUrl("/cookie-policy") },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="This inventory reflects a source-code review; cookies and storage used by hosting infrastructure, providers, and browsers may require separate runtime verification."
      sections={[
        {
          title: "What we found in the website source",
          content: (
            <>
              <p>
                The application code reviewed for this policy does not itself
                set cookies or read or write local or session storage for
                ordinary public browsing. No analytics or advertising script
                initialization was found. A Firebase measurement-ID setting is
                present in configuration, but no Firebase Analytics
                initialization was found in the reviewed source.
              </p>
              <p>
                This is not a guarantee that no cookie or technical storage is
                used in every environment. Hosting/CDN services, Firebase
                Authentication, the browser, or future site changes may use
                their own storage. A live browser and production configuration
                review is needed to establish exact cookie names, providers,
                and lifetimes. We do not invent those details here.
              </p>
            </>
          ),
        },
        {
          title: "Firebase and functional requests",
          content: (
            <p>
              Public blog pages request published article data and, where
              needed, article images from Firebase without a cookie-preference
              prompt. These requests support the blog functionality; the
              source review did not identify them as analytics or advertising.
              Firebase Authentication is used for administrator sign-in and
              may use browser-managed persistence after an administrator signs
              in. The exact mechanism can vary by SDK and browser.
            </p>
          ),
        },
        {
          title: "Other third-party requests",
          content: (
            <p>
              EmailJS is called when a visitor submits the contact form and
              processes the enquiry notification. Article images entered as
              external URLs may be requested from the selected image host.
              Hosting and delivery infrastructure may process technical
              requests. The reviewed source did not establish the cookies,
              storage duration, or server logs used by these providers; check
              their current notices and your browser controls for additional
              details.
            </p>
          ),
        },
        {
          title: "No preference banner or settings panel",
          content: (
            <p>
              The reviewed website does not currently implement a cookie
              consent banner, preference record, or settings panel. There is no
              in-site preference to reopen or withdraw. You can manage or clear
              cookies and browser storage through your browser settings;
              blocking provider storage or network requests may affect
              administrator sign-in or blog functionality. The absence of a
              banner should not be read as consent.
            </p>
          ),
        },
        {
          title: "Categories",
          content: (
            <p>
              No analytics or advertising cookies are identified in the
              reviewed application source. We have not verified a named
              optional cookie, its provider, or its duration, so this policy
              does not claim that such categories are present or provide
              invented cookie tables. Any future non-essential tracking should
              be inventoried and appropriately controlled before it is
              introduced.
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
