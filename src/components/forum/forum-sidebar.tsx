"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";

interface ForumSidebarProps {
  onSelectTag?: (tag: string) => void;
}

const topFans = [
  { rank: 1, name: "penlightmerah", oshi: "Fera", replies: 86 },
  { rank: 2, name: "kopigita", oshi: "Gita", replies: 71 },
  { rank: 3, name: "anakfx", oshi: "Christy", replies: 58 },
];

const tags = [
  "#PertaruhanCinta",
  "#MiniTourSleman",
  "#TheSmileCollection",
  "#Audisi15",
  "#ZAPFEST2026",
  "#PajamaDrive",
];

export default function ForumSidebar({ onSelectTag }: ForumSidebarProps) {
  return (
    <aside className="w-full space-y-6" aria-label="Sidebar komunitas">
      {/* 1. Compose CTA Card (FigCraft ID: 2568) */}
      <div className="p-6 rounded-[14px] bg-gradient-to-br from-curtain-900/80 via-raised to-surface border border-crimson-900/30 space-y-4">
        <span className="font-mono-data text-xs font-bold text-crimson-400 tracking-wider uppercase block">
          BIKIN THREAD
        </span>

        <h2 className="font-display font-black text-2xl uppercase text-ink leading-tight">
          PUNYA CERITA DARI THEATER?
        </h2>

        <p className="font-sans text-xs text-muted leading-relaxed">
          Tag member dan show-nya biar fans lain gampang nemu obrolanmu.
        </p>

        <Link
          href="/forum/new"
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-crimson-500 hover:bg-crimson-600 text-white font-sans font-bold text-sm transition-all duration-200 shadow-lg shadow-crimson-500/30"
        >
          <span>Bikin thread</span>
          <ArrowRight weight="bold" className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. Top Active Fans (FigCraft ID: 2580) */}
      <div className="p-6 rounded-[14px] bg-surface space-y-4">
        <h3 className="font-sans font-semibold text-sm text-ink">
          Paling aktif minggu ini
        </h3>

        <div className="space-y-3.5 pt-1">
          {topFans.map((fan) => (
            <div
              key={fan.name}
              className="flex items-center gap-3 text-xs font-sans"
            >
              <span className="font-display font-black text-lg text-muted w-3 text-center">
                {fan.rank}
              </span>

              <div className="w-8 h-8 rounded-full bg-raised border border-border flex items-center justify-center font-mono text-xs font-bold text-ink shrink-0">
                {fan.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-ink truncate">{fan.name}</p>
                <p className="text-[11px] text-muted">
                  oshi {fan.oshi} · {fan.replies} balasan
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Trending Tags (FigCraft ID: 2595) */}
      <div className="p-6 rounded-[14px] bg-surface space-y-3">
        <h3 className="font-sans font-semibold text-sm text-ink">
          Tag lagi naik
        </h3>

        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectTag?.(tag)}
              className="px-3 py-1.5 rounded-full bg-raised text-xs font-mono-data text-muted hover:text-ink border border-border transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Upcoming Show Ticket Preview (FigCraft ID: 2608) */}
      <div className="p-6 rounded-[14px] bg-surface space-y-3">
        <span className="font-mono-data text-xs font-semibold text-crimson-400 uppercase tracking-wider block">
          SHOW TERDEKAT
        </span>

        <h3 className="font-display font-black text-2xl uppercase text-ink leading-tight">
          PERTARUHAN CINTA
        </h3>

        <p className="font-mono-data text-xs text-muted">
          MIN, 22 NOV · 19:00 WIB · Birthday show
        </p>

        <Link
          href="/forum"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-ink hover:text-crimson-400 transition-colors pt-2 group"
        >
          <span>Diskusi show</span>
          <ArrowUpRight
            weight="bold"
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </aside>
  );
}
