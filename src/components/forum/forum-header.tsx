"use client";

import React from "react";

interface ForumHeaderProps {
  activeCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

const categories = [
  { slug: "all", name: "Semua", count: "" },
  { slug: "theater-setlist", name: "Theater & Setlist", count: "1.204" },
  { slug: "member-oshi", name: "Member & Oshi", count: "2.381" },
  { slug: "live-streaming", name: "Live Streaming", count: "876" },
  { slug: "event-mng-vc", name: "Event, MnG & VC", count: "642" },
  { slug: "merch-collection", name: "Merch & Koleksi", count: "455" },
  { slug: "general-chat", name: "Obrolan Bebas", count: "1.930" },
];

export default function ForumHeader({
  activeCategory,
  onSelectCategory,
}: ForumHeaderProps) {
  return (
    <div className="w-full space-y-8 pt-8 pb-4">
      {/* Eyebrow & Title Row (FigCraft ID: 2533) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-raised">
        <div className="space-y-3">
          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[148px] tracking-tight uppercase leading-[0.85] text-ink">
            FORUM
          </h1>

          <p className="font-sans text-base sm:text-lg text-muted max-w-xl leading-relaxed">
            Tempat ngobrol setelah lampu theater padam. Pilih blok tempat
            dudukmu, pantau topik terhangat, atau mulai obrolan baru.
          </p>
        </div>

        {/* Stats Counters (FigCraft: 7.488 thread di 6 blok, 318 fans lagi online) */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 font-mono-data">
          <div>
            <span className="block font-display font-black text-4xl sm:text-5xl text-ink">
              7.488
            </span>
            <span className="text-xs text-muted">thread di 6 blok</span>
          </div>

          <div className="border-l border-raised pl-8 sm:pl-12">
            <span className="flex items-center gap-2 font-display font-black text-4xl sm:text-5xl text-ink">
              <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 shadow-[0_0_8px_rgba(229,19,46,0.9)]" />
              318
            </span>
            <span className="text-xs text-muted">fans lagi online</span>
          </div>
        </div>
      </div>

      {/* Seat Block Category Filter Chips (FigCraft ID: 2548) */}
      <div className="relative w-full overflow-x-auto scrollbar-none pb-2">
        <div className="flex items-center gap-2.5 w-max">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-bg font-bold shadow-md shadow-white/10"
                    : "bg-surface border border-border text-muted hover:text-white hover:border-border"
                }`}
              >
                {!isActive && cat.slug !== "all" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                )}
                <span>{cat.name}</span>
                {cat.count && (
                  <span className="font-mono-data text-[11px] opacity-75">
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
