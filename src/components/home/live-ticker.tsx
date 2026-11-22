"use client";

import React from "react";
import Link from "next/link";
import { Broadcast } from "@phosphor-icons/react";

export default function LiveTicker() {
  return (
    <aside
      aria-label="Pengumuman live streaming"
      className="stage w-full bg-[#7A0B1A] text-white py-2.5 px-6 sm:px-12 lg:px-16 border-b border-crimson-800/40 select-none"
    >
      <div className="w-full flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>

          <span className="font-medium text-[#F4EFEA] truncate">
            <strong className="font-semibold text-white">
              2 member lagi live:
            </strong>{" "}
            Gita di Showroom, Marsha di IDN Live.
          </span>
        </div>

        <Link
          href="/live"
          className="shrink-0 font-semibold underline underline-offset-4 hover:text-[#FFE7CC] transition-colors flex items-center gap-1"
        >
          <span>Tonton sekarang</span>
          <Broadcast weight="bold" className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
