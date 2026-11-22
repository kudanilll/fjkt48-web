import Link from "next/link";
import {
  House,
  ChatCircle,
  CalendarBlank,
  ArrowLeft,
} from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main className="stage min-h-screen relative overflow-hidden bg-[#0D0103] text-[#F5F2F3] flex flex-col items-center justify-center px-6 py-20 select-none">
      {/* Overhead Spotlight Beam */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[650px] opacity-40"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, rgba(224, 18, 50, 0.45) 0deg, rgba(255, 179, 133, 0.25) 25deg, transparent 45deg, transparent 315deg, rgba(255, 179, 133, 0.25) 335deg, rgba(224, 18, 50, 0.45) 360deg)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* Stage Floor Spotlight Pool */}
      <div
        className="pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 w-[500px] h-[180px] rounded-[100%] opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(224, 18, 50, 0.5) 0%, rgba(224, 18, 50, 0.15) 50%, transparent 80%)",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />

      {/* Stage Content */}
      <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson-500/10 border border-crimson-500/20 text-crimson-400 font-mono-data text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 animate-pulse" />
          <span>404 - PANGGUNG GELAP</span>
        </div>

        {/* Big 404 Headline */}
        <h1 className="font-display font-black text-8xl sm:text-9xl tracking-tight text-white/90 drop-shadow-[0_0_35px_rgba(224,18,50,0.4)] leading-none">
          404
        </h1>

        {/* Humorous Fandom Copy */}
        <div className="space-y-3">
          <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white">
            Salah Pintu Masuk Teater
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#A89E9F] max-w-md mx-auto leading-relaxed">
            Halaman yang kamu tuju tidak ditemukan atau show sudah selesai
            encore. Mungkin kamu salah belok di lorong lantai 4 FX Sudirman.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-crimson-950/50 hover:scale-105"
          >
            <House weight="bold" className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/forum"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-colors"
          >
            <ChatCircle weight="bold" className="w-4 h-4 text-crimson-400" />
            <span>Jelajahi Forum</span>
          </Link>

          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[#A89E9F] hover:text-white font-medium text-sm transition-colors"
          >
            <CalendarBlank weight="bold" className="w-4 h-4" />
            <span>Jadwal Show</span>
          </Link>
        </div>

        {/* Breadcrumb Hint */}
        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono-data text-xs text-[#706667] hover:text-crimson-400 transition-colors"
          >
            <ArrowLeft weight="bold" className="w-3 h-3" />
            <span>Menuju pintu keluar teater</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
