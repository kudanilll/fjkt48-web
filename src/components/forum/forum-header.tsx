"use client";

import React from "react";
import { forumCategories } from "@/data/forum-mock-data";

interface ForumHeaderProps {
  activeCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

export default function ForumHeader({
  activeCategory,
  onSelectCategory,
}: ForumHeaderProps) {
  return (
    <div className="w-full space-y-8 pt-8 pb-4">
      {/* Eyebrow & Title Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[var(--line)]">
        <div className="space-y-3">
          <p className="font-mono-data text-xs font-semibold uppercase tracking-[0.08em] text-crimson-400">
            RUANG DISKUSI KOMUNITAS
          </p>

          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[148px] tracking-tight uppercase leading-[0.85] text-[var(--ink)]">
            FORUM
          </h1>

          <p className="font-sans text-base sm:text-lg text-[var(--muted)] max-w-xl leading-relaxed">
            Tempat ngobrol setelah lampu theater padam. Pilih blok tempat
            dudukmu, pantau topik terhangat, atau mulai diskusi baru bareng
            sesama fans.
          </p>
        </div>

        {/* Stats Counters */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 font-mono-data">
          <div>
            <span className="block font-display font-black text-4xl sm:text-5xl text-[var(--ink)]">
              7.488
            </span>
            <span className="text-xs text-[var(--muted)] uppercase tracking-wider">
              Total Thread
            </span>
          </div>

          <div className="border-l border-[var(--border)] pl-8 sm:pl-12">
            <span className="flex items-center gap-2 font-display font-black text-4xl sm:text-5xl text-crimson-500">
              <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 animate-pulse" />
              1.420
            </span>
            <span className="text-xs text-[var(--muted)] uppercase tracking-wider">
              Fans Online
            </span>
          </div>
        </div>
      </div>

      {/* Seat Block Category Filter Chips */}
      <div className="relative w-full overflow-x-auto scrollbar-none pb-2">
        <div className="flex items-center gap-2.5 w-max">
          <button
            type="button"
            onClick={() => onSelectCategory("all")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
              activeCategory === "all"
                ? "bg-crimson-500 text-white border-crimson-500 font-semibold shadow-md shadow-crimson-500/20"
                : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            <span>Semua Blok</span>
            <span className="font-mono-data text-[11px] opacity-80">7.488</span>
          </button>

          {forumCategories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-crimson-500 text-white border-crimson-500 font-semibold shadow-md shadow-crimson-500/20"
                    : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                <span>
                  <strong className="font-semibold">{cat.code}:</strong>{" "}
                  {cat.name}
                </span>
                <span className="font-mono-data text-[11px] opacity-80">
                  {cat.threadsCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
