"use client";

import React from "react";
import Link from "next/link";

export default function LiveTicker() {
  return (
    <aside
      aria-label="Pengumuman live streaming"
      className="relative z-30 w-full h-auto min-h-10 py-2 sm:py-2.5 bg-crimson-800 text-white px-4 sm:px-8 lg:px-16 flex items-center justify-center select-none"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center">
        {/* Glowing White Dot (FigCraft ID: 781) */}
        <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)] shrink-0" />

        {/* Text (FigCraft ID: 782) */}
        <span className="font-sans font-medium text-[#f4efea] text-xs sm:text-sm">
          2 member lagi live: Gita di Showroom, Marsha di IDN Live.
        </span>

        {/* Action Link (FigCraft ID: 783) */}
        <Link
          href="/live"
          className="font-sans font-semibold text-xs sm:text-sm text-white underline underline-offset-4 hover:text-spotlight transition-colors shrink-0"
        >
          Tonton sekarang
        </Link>
      </div>
    </aside>
  );
}
