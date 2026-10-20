export default function Loading() {
  return (
    <div
      className="min-h-screen bg-[#F8F8F6] text-[#111111]"
      role="status"
      aria-label="Loading page"
    >
      <div className="h-[72px] border-b border-[#E8E8E8] bg-white" />
      <main className="mx-auto max-w-[1440px] px-4 py-12 sm:px-8 lg:px-12 md:py-16">
        <section className="mx-auto max-w-6xl text-center">
          <div className="skeleton mx-auto mb-5 h-6 w-64 rounded-full" />
          <div className="skeleton mx-auto h-16 max-w-4xl rounded-lg" />
          <div className="skeleton mx-auto mt-3 h-16 max-w-3xl rounded-lg" />
          <div className="skeleton mx-auto mt-6 h-5 max-w-2xl rounded" />
          <div className="skeleton mx-auto mt-2 h-5 max-w-xl rounded" />
          <div className="mt-8 flex justify-center gap-3">
            <div className="skeleton h-12 w-36 rounded-lg" />
            <div className="skeleton h-12 w-40 rounded-lg" />
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {["one", "two", "three"].map((item) => (
              <div key={item} className="skeleton h-36 rounded-lg" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
