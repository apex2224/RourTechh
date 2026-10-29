import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { absoluteSiteUrl } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy | RouR Tech",
  description:
    "What RouR Tech collects through its website, how enquiries are handled, and how to raise a privacy request.",
  alternates: { canonical: absoluteSiteUrl("/privacy-policy") },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy describes the information handled through the RouR Tech website and how to contact us about it."
      sections={[
        {
          title: "Who operates this website",
          content: (
            <p>
              The website is operated under the RouR Tech brand from Kangra,
              Himachal Pradesh, India. The legal contracting entity is not
              identified in the website configuration; refer to the applicable
              written service agreement for the contracting party. This policy
              applies to information handled through this website.
            </p>
          ),
        },
        {
          title: "Information collected and why",
          content: (
            <>
              <p>
                If you submit a contact enquiry, the form collects your name,
                work email, company, service of interest, and project
                description. Phone number and budget are optional. The form
                asks visitors not to include sensitive or confidential
                information.
              </p>
              <p>
                We use those details to receive, review, and respond to your
                enquiry and, where relevant, discuss a requested proposal or
                service. We do not use contact enquiries to subscribe you to
                promotional email. Personal information is not sold.
              </p>
              <p>
                The website source code reviewed for this policy does not
                request your IP address, device profile, or browsing history
                through the contact form or an analytics integration. Hosting
                and infrastructure providers may process technical request
                logs; the exact fields and retention configured by those
                providers have not been independently confirmed.
              </p>
            </>
          ),
        },
        {
          title: "How enquiries are processed and shared",
          content: (
            <>
              <p>
                When submitted, an enquiry is written to the Firebase
                Firestore <code>inquiries</code> database and its details are
                sent through EmailJS to notify the business. These providers
                therefore process the information needed to deliver those
                functions. Their own terms, security practices, locations, and
                retention arrangements may also apply; this website&apos;s
                source code does not establish their complete processing or
                deletion schedules.
              </p>
              <p>
                Access to stored enquiries is restricted by the application
                and database rules to authorized administrators. A provider
                may also process information to operate or secure its service,
                or as required by law. We do not claim that information is
                shared only with the named providers in every infrastructure
                context. The production hosting provider and its specific
                processing terms were not established in the source review.
              </p>
            </>
          ),
        },
        {
          title: "Security",
          content: (
            <p>
              The reviewed application restricts inquiry access through
              administrator authentication and Firestore security rules. We
              cannot guarantee that any website, transmission, or provider is
              completely secure. Do not include passwords, payment-card
              details, or sensitive or confidential information in a website
              enquiry.
            </p>
          ),
        },
        {
          title: "Newsletter",
          content: (
            <p>
              The newsletter interface is currently a demonstration only: it
              validates an email address in the browser and displays a local
              confirmation, but does not send or save the address or subscribe
              anyone to a mailing list. No newsletter provider, consent record,
              or unsubscribe service is currently connected. Do not rely on
              this form to subscribe or unsubscribe.
            </p>
          ),
        },
        {
          title: "Cookies, storage, and other technologies",
          content: (
            <p>
              The reviewed application code does not set its own cookies or
              access local or session storage for ordinary public browsing.
              Firebase Authentication is used for administrator sign-in and
              may use browser-managed persistence when an administrator signs
              in. Public blog pages request published content and images from
              Firebase without a preference prompt. No analytics or advertising
              integration was found in the reviewed source. See our{" "}
              <a href="/cookie-policy" className="text-[#FF5B4D] font-semibold">
                Cookie Policy
              </a>{" "}
              for scope and limitations of this source review.
            </p>
          ),
        },
        {
          title: "Retention",
          content: (
            <p>
              No fixed numerical retention period or automatic deletion
              schedule for contact enquiries is configured in the reviewed
              application. Enquiry records remain in Firestore until removed
              through an authorized administrative or other applicable process.
              We should retain or minimize information according to the purpose
              for which it was collected and applicable legal, accounting,
              security, and dispute-resolution needs. A 24-month review point
              has been proposed internally but is not yet an adopted retention
              commitment or an automated deletion rule.
            </p>
          ),
        },
        {
          title: "Requests and concerns",
          content: (
            <p>
              You may ask us to review a request concerning access, correction,
              deletion, or withdrawal of consent you previously gave, where
              applicable. Use our{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>{" "}
              and identify the message as a privacy request. That form follows
              the same Firestore and EmailJS processing described above; include
              only enough information for us to identify and review the
              request, and do not send passwords or unnecessary identity
              documents. The current contact form also requires a company,
              service, and enquiry description, so those fields will be
              processed when you use it; phone and budget are optional. We may
              ask for proportionate verification and may need to retain
              information where a legal or other justified need applies. More
              details are on the{" "}
              <a href="/data-deletion" className="text-[#FF5B4D] font-semibold">
                privacy request and data deletion page
              </a>
              . No dedicated privacy-request tracking system or designated
              grievance officer details were verified in the reviewed
              implementation.
            </p>
          ),
        },
        {
          title: "Applicable Indian law and commencement",
          content: (
            <>
              <p>
                As of October 29, 2026, the Digital Personal Data Protection
                Act, 2023 and the Digital Personal Data Protection Rules, 2025
                have staged commencement dates under their notifications:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Provisions specified in the notifications, including
                  institutional provisions, commenced on November 13, 2025.
                </li>
                <li>
                  DPDP Act section 6(9), section 27(1)(d), and Rule 4 are
                  scheduled for November 13, 2026.
                </li>
                <li>
                  The Act&apos;s main processing duties and data-principal
                  rights, along with most operational rules, are scheduled for
                  May 13, 2027. They are not described here as already in force
                  on this policy&apos;s update date.
                </li>
              </ul>
              <p>
                Where applicable to the information handled, the Information
                Technology Act, 2000, the SPDI Rules, 2011, and CERT-In
                directions may impose separate requirements. Ordinary contact
                details are not automatically sensitive personal data under
                the SPDI Rules. The applicability of legal requirements depends
                on the information and circumstances.
              </p>
              <p>
                We intend to review our practices as the notified
                commencement dates approach. This summary does not limit
                protections or obligations already applicable under other laws
                and is not legal advice.
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <a
                    href="https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#FF5B4D]"
                  >
                    DPDP Act commencement notification, G.S.R. 843(E)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#FF5B4D]"
                  >
                    DPDP Rules notification, G.S.R. 846(E)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.indiacode.nic.in/bitstream/123456789/1999/1/A2000-21%20%281%29.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#FF5B4D]"
                  >
                    Information Technology Act, 2000
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#FF5B4D]"
                  >
                    CERT-In Directions dated April 28, 2022
                  </a>
                </li>
              </ul>
              <p>
                Please consult qualified counsel about the business&apos;s
                specific legal identity, processing, and obligations.
              </p>
            </>
          ),
        },
        {
          title: "Contact",
          content: (
            <p>
              For privacy questions or requests, use the{" "}
              <a href="/contact" className="text-[#FF5B4D] font-semibold">
                contact page
              </a>{" "}
              and clearly mark the message as privacy-related.
            </p>
          ),
        },
      ]}
    />
  );
}
