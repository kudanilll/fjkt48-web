"use client";

import React from "react";
import Link from "next/link";

interface SeatBlock {
  code: string;
  threadsCount: string;
  name: string;
  description: string;
  activeDots: number;
  onlineCount: number;
  slug: string;
}

const seatBlocks: SeatBlock[] = [
  {
    code: "BLOK A",
    threadsCount: "1.204 thread",
    name: "THEATER & SETLIST",
    description:
      "Review show, setlist, unit song, dan cerita dari kursi penonton.",
    activeDots: 9,
    onlineCount: 312,
    slug: "theater-setlist",
  },
  {
    code: "BLOK B",
    threadsCount: "2.381 thread",
    name: "MEMBER & OSHI",
    description:
      "Ngobrolin member favorit, jikoshokai, momen lucu, dan dukungan buat oshi.",
    activeDots: 14,
    onlineCount: 548,
    slug: "member-oshi",
  },
  {
    code: "BLOK C",
    threadsCount: "876 thread",
    name: "LIVE STREAMING",
    description:
      "Rekap Showroom dan IDN Live, momen seru waktu live, dan jadwal live member.",
    activeDots: 6,
    onlineCount: 196,
    slug: "live-streaming",
  },
  {
    code: "BLOK D",
    threadsCount: "642 thread",
    name: "EVENT, MNG & VC",
    description:
      "Info tiket, jadwal arrival Meet and Greet, Video Call, 2-Shot, dan tur luar kota.",
    activeDots: 4,
    onlineCount: 121,
    slug: "event-mng-vc",
  },
  {
    code: "BLOK E",
    threadsCount: "486 thread",
    name: "MERCH & KOLEKSI",
    description:
      "Photopack resmi, lightstick custom, kaos, pin edisi terbatas, dan barter merchandise.",
    activeDots: 3,
    onlineCount: 87,
    slug: "merch-collection",
  },
  {
    code: "BLOK F",
    threadsCount: "1.930 thread",
    name: "OBROLAN BEBAS",
    description: "Di luar topik tapi tetap sesama fans. Kenalan dulu di sini.",
    activeDots: 8,
    onlineCount: 264,
    slug: "general-chat",
  },
];

export default function SeatBlocksSection() {
  return (
    <section
      className="w-full bg-[#0B0A0C] text-[#F4EFEA] py-20 sm:py-28 transition-colors duration-300 border-t border-[var(--line)]"
      aria-label="Pilihan blok tempat duduk forum"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header (FigCraft ID: 1043) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-500/10 text-crimson-400 font-mono-data text-xs font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
              <span>RUANG DISKUSI TEATER</span>
            </div>

            <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[96px] tracking-tight uppercase leading-[0.88]">
              PILIH BLOK
              <br />
              DUDUKMU
            </h2>
          </div>

          <p className="font-sans text-base sm:text-[17px] text-[#A8A0A3] max-w-md leading-relaxed">
            Enam kategori forum, disusun seperti kursi theater. Titik merah
            adalah fans yang lagi online di blok itu.
          </p>
        </div>

        {/* Panggung Bar (FigCraft ID: 1046) */}
        <div className="w-full h-16 rounded-t-2xl rounded-b-[120px] bg-gradient-to-r from-[#4A0510] via-[#8E0D20] to-[#4A0510] flex items-center justify-center mb-10 shadow-lg shadow-crimson-900/30">
          <span className="font-display font-extrabold text-xl sm:text-[22px] tracking-[0.2em] text-[#F4EFEA] uppercase">
            PANGGUNG
          </span>
        </div>

        {/* 6 Seat Blocks Grid (FigCraft ID: 1048) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seatBlocks.map((block) => (
            <Link
              key={block.code}
              href={`/forum?block=${block.slug}`}
              className="card group flex flex-col justify-between p-7 rounded-[14px] bg-[#141215] hover:bg-[#1D1A1F] transition-all duration-200 border-none min-h-[248px]"
            >
              <div className="space-y-2.5">
                {/* Block Code + Thread count */}
                <p className="font-mono-data text-xs font-medium text-crimson-400">
                  {block.code} · {block.threadsCount}
                </p>

                {/* Title */}
                <h3 className="font-display font-extrabold text-3xl sm:text-[40px] text-[#F4EFEA] group-hover:text-crimson-400 transition-colors uppercase leading-tight tracking-tight">
                  {block.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-[#A8A0A3] leading-relaxed pt-1">
                  {block.description}
                </p>
              </div>

              {/* Seats Dot Row + Online Count (FigCraft ID: 1053) */}
              <div className="flex items-center justify-between gap-4 pt-6 border-t border-[var(--line)]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < block.activeDots
                          ? "bg-crimson-500 shadow-[0_0_6px_rgba(229,19,46,0.8)]"
                          : "bg-[#2B272D]"
                      }`}
                    />
                  ))}
                </div>

                <span className="font-mono-data text-xs text-[#A8A0A3] shrink-0">
                  {block.onlineCount} online
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
