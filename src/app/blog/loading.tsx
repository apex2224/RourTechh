export default function BlogLoading() {
  return (
    <main
      className="min-h-screen bg-[#F8F8F6] px-4 py-16 sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading blog"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-5xl space-y-5 text-center">
          <div className="skeleton mx-auto h-4 w-40 rounded" />
          <div className="skeleton mx-auto h-12 w-full max-w-2xl rounded" />
          <div className="skeleton mx-auto h-4 w-full max-w-xl rounded" />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white"
            >
              <div className="skeleton aspect-video w-full" />
              <div className="space-y-4 p-6">
                <div className="skeleton h-3 w-1/3 rounded" />
                <div className="skeleton h-6 w-full rounded" />
                <div className="skeleton h-6 w-4/5 rounded" />
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton h-3 w-5/6 rounded" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
