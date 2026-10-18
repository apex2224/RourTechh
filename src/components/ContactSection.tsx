import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { InquiryRecord } from "../types";
import { siteConfig } from "@/lib/siteConfig";

interface ContactSectionProps {
  prefilledService?: string;
  onWhatsAppClick?: () => void;

  onInquirySubmitted?: (inquiry: InquiryRecord) => void;
}

async function sendLeadNotification(inquiry: InquiryRecord): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();
  const recipientEmails = process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (
    !serviceId ||
    !templateId ||
    !publicKey ||
    !recipientEmails?.length ||
    recipientEmails.some((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  ) {
    throw new Error(
      "EmailJS service, template, public key, or recipient configuration is missing or invalid.",
    );
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_name: "RourTech Team",
      to_email: recipientEmails.join(", "),
      from_name: inquiry.name,
      from_email: inquiry.email,
      reply_to: inquiry.email,
      subject: "New RourTech Contact Lead",
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || "Not provided",
      company: inquiry.company,
      service: inquiry.service,
      budget: inquiry.budget,
      message: inquiry.description,
      description: inquiry.description,
      submission_time: inquiry.createdAt,
      lead_id: inquiry.id,
    },
    { publicKey },
  );
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledService,
  onWhatsAppClick,

  onInquirySubmitted,
}) => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [company, setCompany] = useState("");

  const [service, setService] = useState(prefilledService || "Web Development");

  const [budget, setBudget] = useState("To be discussed");

  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submittedRecord, setSubmittedRecord] = useState<InquiryRecord | null>(
    null,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [isRetryingEmail, setIsRetryingEmail] = useState(false);
  const isRetryingEmailRef = useRef(false);
  const [submitError, setSubmitError] = useState("");
  const [emailWarning, setEmailWarning] = useState(false);

  // Sync external prefilled service if changed

  React.useEffect(() => {
    if (prefilledService) {
      setService(prefilledService);
    }
  }, [prefilledService]);

  const serviceOptions = [
    "Web Development",

    "UI/UX Design & Design Systems",

    "SEO & Website Optimization",

    "E-commerce Development",

    "Custom Software Solutions",

    "Website Maintenance & Support",

    "Custom Enterprise Scope",
  ];

  const budgetTiers = ["To be discussed", "Not sure yet", "Prefer not to say"];

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = "Full name is required";

    if (!email.trim()) {
      errs.email = "Work email is required";
    } else if (
      email.trim().length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      errs.email = "Please enter a valid work email address";
    }

    if (!company.trim())
      errs.company = "Company or organization name is required";

    if (phone.trim() && !/^[+()0-9 .-]{1,30}$/.test(phone.trim())) {
      errs.phone = "Enter a valid phone number using digits and common symbols";
    }

    if (!description.trim() || description.trim().length < 15) {
      errs.description =
        "Please provide at least a brief summary of project requirements (min 15 characters)";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current || !validate()) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError("");
    setEmailWarning(false);

    const inquiryRef = doc(collection(db, "inquiries"));
    const newRecord: InquiryRecord = {
      id: inquiryRef.id,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      ...(phone.trim() ? { phone: phone.trim() } : {}),
      company: company.trim(),
      service,
      budget,
      description: description.trim(),
      status: "new",
    };

    try {
      // Save to Firestore first. serverTimestamp() matches the current rules.
      await setDoc(inquiryRef, {
        ...newRecord,
        createdAt: serverTimestamp(),
      });

      try {
        await sendLeadNotification(newRecord);
      } catch (emailError) {
        console.error(
          "Inquiry saved, but the EmailJS lead notification failed:",
          emailError,
        );
        setEmailWarning(true);
      }

      setSubmittedRecord(newRecord);
      onInquirySubmitted?.(newRecord);
    } catch (error) {
      console.error("Failed to save inquiry to Firestore:", error);
      setSubmitError(
        "We couldn't submit your inquiry right now. Please try again.",
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleRetryEmailNotification = async () => {
    if (!submittedRecord || isRetryingEmailRef.current) return;

    isRetryingEmailRef.current = true;
    setIsRetryingEmail(true);
    try {
      await sendLeadNotification(submittedRecord);
      setEmailWarning(false);
    } catch (emailError) {
      console.error(
        "Retrying the EmailJS lead notification failed:",
        emailError,
      );
      setEmailWarning(true);
    } finally {
      isRetryingEmailRef.current = false;
      setIsRetryingEmail(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 border-b border-[#E8E8E8] bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Contact Metadata */}

          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold text-[#FF5B4D] tracking-wider uppercase mb-2">
                Initiate Project Discovery
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] font-display text-balance">
                Let&apos;s build something exceptional together.
              </h2>

              <p className="text-base text-[#555555] mt-4 leading-relaxed">
                Tell us about your goals, timeframe, and budget. Use the form to
                share the details needed for an initial project discussion.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E8E8] text-sm text-[#555555]">
              <h3 className="font-semibold text-[#111111]">
                Helpful project details
              </h3>
              <p className="mt-2 leading-relaxed">
                Include the outcome you are aiming for, any relevant links, and
                your expected timeframe. You can leave out details you are not
                ready to share.
              </p>
            </div>

            <div className="border-t border-[#E8E8E8] pt-6 space-y-3 text-sm">
              <h3 className="font-semibold text-[#111111]">CONTACT</h3>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-3 text-[#555555] hover:text-[#111111] transition-colors"
              >
                <Phone className="h-4 w-4 text-[#FF5B4D]" aria-hidden="true" />
                <span>{siteConfig.contact.displayPhone}</span>
              </a>
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  if (onWhatsAppClick) {
                    event.preventDefault();
                    onWhatsAppClick();
                  }
                }}
                className="flex items-center gap-3 text-[#555555] hover:text-[#111111] transition-colors"
              >
                <MessageCircle
                  className="h-4 w-4 text-[#FF5B4D]"
                  aria-hidden="true"
                />
                <span>Message us on WhatsApp</span>
              </a>
              <div className="flex items-center gap-3 text-[#555555]">
                <MapPin className="h-4 w-4 text-[#FF5B4D]" aria-hidden="true" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={siteConfig.socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RouR Tech on X"
                  title="RouR Tech on X"
                  className="inline-flex h-8 w-8 items-center justify-center border border-[#E8E8E8] text-[#666666] hover:border-[#111111] hover:text-[#111111] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25h6.826l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RouR Tech on Instagram"
                  title="RouR Tech on Instagram"
                  className="inline-flex h-8 w-8 items-center justify-center border border-[#E8E8E8] text-[#666666] hover:border-[#111111] hover:text-[#111111] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.65 1.5a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                  </svg>
                </a>
                <a
                  href={siteConfig.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RouR Tech on LinkedIn"
                  title="RouR Tech on LinkedIn"
                  className="inline-flex h-8 w-8 items-center justify-center border border-[#E8E8E8] text-[#666666] hover:border-[#111111] hover:text-[#111111] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9a2.2 2.2 0 0 1 0-4.4ZM3.3 9.3h3.8V21H3.3V9.3Zm6.1 0h3.6v1.6h.05c.5-.95 1.72-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.75V21h-3.8v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94V21H9.4V9.3Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Lead Capture Form */}

          <div className="lg:col-span-7">
            {submittedRecord ? (
              <div className="p-8 sm:p-10 bg-[#F8F8F6] rounded-2xl border border-[#E8E8E8] text-center space-y-6 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#111111] font-display">
                    Project Requirements Received
                  </h3>

                  <p className="text-sm text-[#555555] mt-2 max-w-md mx-auto">
                    Thank you,{" "}
                    <strong className="text-[#111111]">
                      {submittedRecord.name}
                    </strong>
                    . We have received your submission for{" "}
                    <strong className="text-[#111111]">
                      {submittedRecord.company}
                    </strong>{" "}
                    . The contact details you provided are included with your
                    enquiry.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-lg border border-[#E8E8E8] text-left text-xs space-y-1.5 max-w-md mx-auto">
                  <div className="text-[#888888]">
                    Reference ID:{" "}
                    <span className="font-mono text-[#111111]">
                      {submittedRecord.id}
                    </span>
                  </div>

                  <div className="text-[#888888]">
                    Selected Service:{" "}
                    <span className="font-semibold text-[#111111]">
                      {submittedRecord.service}
                    </span>
                  </div>

                  <div className="text-[#888888]">
                    Budget Preference:{" "}
                    <span className="font-mono text-[#111111]">
                      {submittedRecord.budget}
                    </span>
                  </div>
                </div>

                {emailWarning && (
                  <div className="space-y-3">
                    <p
                      role="status"
                      className="text-sm text-amber-700 max-w-md mx-auto"
                    >
                      Your inquiry was saved, but the email notification could
                      not be sent. You do not need to submit it again.
                    </p>
                    <button
                      type="button"
                      onClick={() => void handleRetryEmailNotification()}
                      disabled={isRetryingEmail}
                      className="px-4 py-2 text-xs font-semibold text-[#111111] bg-white border border-[#E8E8E8] hover:bg-[#F2F2EE] rounded-lg transition-colors disabled:opacity-60"
                    >
                      {isRetryingEmail
                        ? "Retrying email notification…"
                        : "Retry email notification"}
                    </button>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSubmittedRecord(null);
                    setDescription("");
                    setEmailWarning(false);
                    setSubmitError("");
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-[#111111] bg-white border border-[#E8E8E8] hover:bg-[#F2F2EE] rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-6 sm:p-9 bg-[#F8F8F6] rounded-2xl border border-[#E8E8E8] shadow-xs space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}

                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5"
                    >
                      Your Full Name <span className="text-[#FF5B4D]">*</span>
                    </label>

                    <input
                      id="inquiry-name"
                      type="text"
                      value={name}
                      maxLength={120}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] transition-colors ${
                        errors.name
                          ? "border-red-500 bg-red-50/20"
                          : "border-[#E8E8E8]"
                      }`}
                    />

                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5"
                    >
                      Work Email <span className="text-[#FF5B4D]">*</span>
                    </label>

                    <input
                      id="inquiry-email"
                      type="email"
                      value={email}
                      maxLength={254}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@company.com"
                      className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] transition-colors ${
                        errors.email
                          ? "border-red-500 bg-red-50/20"
                          : "border-[#E8E8E8]"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company */}

                <div>
                  <label
                    htmlFor="inquiry-company"
                    className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5"
                  >
                    Company / Organization{" "}
                    <span className="text-[#FF5B4D]">*</span>
                  </label>

                  <input
                    id="inquiry-company"
                    type="text"
                    value={company}
                    maxLength={160}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp or Stealth Startup"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] transition-colors ${
                      errors.company
                        ? "border-red-500 bg-red-50/20"
                        : "border-[#E8E8E8]"
                    }`}
                  />

                  {errors.company && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.company}
                    </p>
                  )}
                </div>

                {/* Optional phone */}

                <div>
                  <label
                    htmlFor="inquiry-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5"
                  >
                    Phone (Optional)
                  </label>

                  <input
                    id="inquiry-phone"
                    type="tel"
                    value={phone}
                    maxLength={30}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 010 1234"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] transition-colors ${
                      errors.phone
                        ? "border-red-500 bg-red-50/20"
                        : "border-[#E8E8E8]"
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* Service Required Dropdown */}

                <div>
                  <label
                    htmlFor="inquiry-service"
                    className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5"
                  >
                    Primary Service Needed
                  </label>

                  <select
                    id="inquiry-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E8E8E8] rounded-lg text-sm text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] cursor-pointer"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget Range Selection (Functional Button Segmented Group) */}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-2">
                    Budget Preference (Optional)
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {budgetTiers.map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setBudget(tier)}
                        className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                          budget === tier
                            ? "bg-white border-[#FF5B4D] text-[#111111] shadow-xs ring-1 ring-[#FF5B4D]"
                            : "bg-white/60 border-[#E8E8E8] text-[#555555] hover:bg-white hover:text-[#111111]"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Description */}

                <div>
                  <label
                    htmlFor="inquiry-desc"
                    className="block text-xs font-bold uppercase tracking-wider text-[#333333] mb-1.5"
                  >
                    Project Brief & Goals{" "}
                    <span className="text-[#FF5B4D]">*</span>
                  </label>

                  <textarea
                    id="inquiry-desc"
                    rows={4}
                    value={description}
                    maxLength={5000}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your current system, objectives, target launch date, and any known technical constraints..."
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-[#111111] placeholder:text-[#999999] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5B4D] transition-colors resize-y ${
                      errors.description
                        ? "border-red-500 bg-red-50/20"
                        : "border-[#E8E8E8]"
                    }`}
                  />

                  {errors.description && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.description}
                    </p>
                  )}
                </div>

                {submitError && (
                  <p role="alert" className="text-sm text-red-600">
                    {submitError}
                  </p>
                )}

                {/* Submit Action */}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#FF5B4D] hover:bg-[#E84E40] active:scale-[0.99] rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                        <span>Transmitting Specification...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>

                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#777777] mt-3">
                    Please avoid including sensitive or confidential information
                    in this form.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
