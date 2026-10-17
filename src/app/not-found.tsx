import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#111111] antialiased">
      <Header isArticleView={false} onOpenContact={() => { }} />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-12 rounded-2xl border border-[#E8E8E8] shadow-xs">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFF2F0] text-[#FF5B4D] mb-6">
            <Compass className="w-7 h-7" />
          </div>

          <span className="text-xs font-mono-data font-bold text-[#FF5B4D] tracking-widest uppercase block mb-2">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-display mb-3">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-8">
            The page you are looking for has been moved, renamed, or does not exist in our system.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 bg-[#FF5B4D] hover:bg-[#E84E40] text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
            <Link
              href="/#services"
              className="px-5 py-2.5 bg-[#F2F2EE] hover:bg-[#E8E8E4] text-[#111111] text-xs font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <span>Explore Services</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer onOpenContact={() => { }} onSelectService={() => { }} />
    </div>
  );
}
