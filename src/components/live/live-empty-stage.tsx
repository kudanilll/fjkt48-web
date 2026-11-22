"use client";

import Link from "next/link";
import { Calendar, PlayCircle } from "@phosphor-icons/react";

export default function LiveEmptyStage() {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[var(--color-stage-900)] p-8 sm:p-16 md:p-24 text-center flex flex-col items-center justify-center min-h-[460px]">
      {/* Spotlight Beam */}
      <div
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 h-[500px] w-[320px] mix-blend-screen opacity-70"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,231,204,0.18) 0%, rgba(255,231,204,0) 100%)",
          clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
        }}
      />

      {/* Spotlight Floor Pool */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 h-20 w-80 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(255,231,204,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Copy & Actions */}
      <div className="relative z-10 max-w-lg space-y-4">
        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[var(--color-ink)]">
          Panggungnya Lagi Kosong
        </h2>

        <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-sans">
          Belum ada member yang live. Terakhir: Freya di Showroom, selesai 2 jam
          lalu. Sambil nunggu, tonton replay-nya dulu.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <a
            href="#replay-archive"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[var(--color-crimson-500)] text-white hover:bg-[var(--color-crimson-600)] transition-all shadow-md shadow-[var(--color-crimson-500)]/20"
          >
            <PlayCircle weight="bold" className="w-4 h-4" />
            <span>Tonton Replay Terakhir</span>
          </a>

          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[var(--color-stage-800)] text-[var(--color-ink)] hover:bg-[var(--color-stage-700)] transition-colors"
          >
            <Calendar
              weight="bold"
              className="w-4 h-4 text-[var(--color-crimson-400)]"
            />
            <span>Lihat Jadwal Theater</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
