export function PolicyReviewNotice() {
  return (
    <aside
      role="note"
      className="max-w-6xl mx-auto mb-8 px-5 py-4 bg-[#FFF2F0] border border-[#FF5B4D]/30 rounded-xl text-sm text-[#555555]"
    >
      <strong className="text-[#111111]">Owner review required:</strong>{" "}
      Confirm the legal entity, contact details, effective date, jurisdiction,
      data practices, and commercial terms in this draft. Obtain appropriate
      legal review before relying on or publishing this policy as final.
    </aside>
  );
}
