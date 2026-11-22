"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Armchair } from "@phosphor-icons/react";

interface SeatBlock {
  code: string;
  name: string;
  description: string;
  fansCount: number;
  threadsCount: string;
  slug: string;
}

const seatBlocks: SeatBlock[] = [
  {
    code: "BLOK A",
    name: "Theater & Setlist",
    description:
      "Diskusi show harian, setlist teater, blocking koreografi, dan review unit song panggung.",
    fansCount: 142,
    threadsCount: "1.840",
    slug: "theater-setlist",
  },
  {
    code: "BLOK B",
    name: "Member & Oshi",
    description:
      "Ruang apresiasi oshi, update media sosial, biodata, dan obrolan hangat per member.",
    fansCount: 280,
    threadsCount: "2.310",
    slug: "member-oshi",
  },
  {
    code: "BLOK C",
    name: "Live Streaming",
    description:
      "Reaksi real-time dan diskusi seputar siaran Showroom serta IDN Live para member.",
    fansCount: 98,
    threadsCount: "890",
    slug: "live-streaming",
  },
  {
    code: "BLOK D",
    name: "Event, MnG & VC",
    description:
      "Info tiket, jadwal antrean Meet and Greet, Video Call, 2-Shot, dan tur luar kota.",
    fansCount: 64,
    threadsCount: "670",
    slug: "event-mng-vc",
  },
  {
    code: "BLOK E",
    name: "Merch & Koleksi",
    description:
      "Photopack resmi, lightstick konser, kaos, pin edisi terbatas, dan barter merchandise.",
    fansCount: 45,
    threadsCount: "510",
    slug: "merch-collection",
  },
  {
    code: "BLOK F",
    name: "Obrolan Bebas",
    description:
      "Kenalan sesama fans, karya fanart kreatif, meme santai, dan serba-serbi wota.",
    fansCount: 110,
    threadsCount: "1.268",
    slug: "general-chat",
  },
];

export default function SeatBlocksSection() {
  return (
    <section
      className="w-full bg-[var(--bg)] text-[var(--ink)] py-20 sm:py-28 transition-colors duration-300"
      aria-label="Pilihan blok tempat duduk forum"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson-500/10 text-crimson-400 font-mono-data text-xs font-semibold uppercase tracking-wider">
            <Armchair weight="fill" className="w-3.5 h-3.5" />
            <span>DENAH THEATER FJKT48</span>
          </div>

          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-none">
            PILIH BLOK DUDUKMU
          </h2>

          <p className="font-sans text-base sm:text-lg text-[var(--muted)]">
            Enam ruang obrolan komunitas, terinspirasi dari enam blok kursi
            penonton di Theater JKT48.
          </p>
        </div>

        {/* Curved Theater Stage Indicator Bar */}
        <div className="relative mb-8 mx-auto max-w-4xl overflow-hidden rounded-t-2xl rounded-b-[120px] bg-gradient-to-r from-[#4A0510] via-[#8E0D20] to-[#4A0510] py-4 text-center shadow-lg shadow-crimson-900/30">
          <p className="font-display text-lg sm:text-xl font-black uppercase tracking-[0.25em] text-[#FFE7CC] drop-shadow-sm">
            PANGGUNG UTAMA
          </p>
        </div>

        {/* 6 Seat Blocks Grid (Desktop 3 cols, Tablet 2 cols, Mobile 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {seatBlocks.map((block) => (
            <Link
              key={block.code}
              href={`/forum?block=${block.slug}`}
              className="card group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[var(--surface)] hover:bg-[var(--raised)] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-black/10 border-none"
            >
              <div>
                {/* Block Code Header + Live Fans Dot */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-3xl tracking-tight text-crimson-500 group-hover:scale-105 transition-transform duration-200">
                    {block.code}
                  </span>

                  <span className="inline-flex items-center gap-1.5 font-mono-data text-xs text-[var(--muted)]">
                    <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
                    <span>{block.fansCount} fans duduk di sini</span>
                  </span>
                </div>

                {/* Block Name */}
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-[var(--ink)] group-hover:text-crimson-400 transition-colors">
                  {block.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
                  {block.description}
                </p>
              </div>

              {/* Bottom Meta */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[var(--line)] font-mono-data text-xs text-[var(--muted)]">
                <span>{block.threadsCount} thread aktif</span>
                <span className="inline-flex items-center gap-1 text-crimson-400 font-semibold group-hover:translate-x-1 transition-transform duration-200">
                  <span>Masuk blok</span>
                  <ArrowRight weight="bold" className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
