"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { JKT48Member } from "@/types/jkt48-types";

interface MemberMarqueeSectionProps {
  members?: JKT48Member[];
}

export default function MemberMarqueeSection(props: MemberMarqueeSectionProps) {
  void props;
  // FigCraft featured sequence: Christy, Fiony, Marsha, Kathrina, Indah + more
  const featuredMembers = [
    {
      nickname: "christy",
      displayName: "CHRISTY",
      fullName: "Angelina Christy",
      team: "Passion",
    },
    {
      nickname: "fiony",
      displayName: "FIONY",
      fullName: "Fiony Alveria",
      team: "Love",
    },
    {
      nickname: "marsha",
      displayName: "MARSHA",
      fullName: "Marsha Lenathea",
      team: "Dream",
    },
    {
      nickname: "kathrina",
      displayName: "KATHRINA",
      fullName: "Kathrina Irene",
      team: "Passion",
    },
    {
      nickname: "indah",
      displayName: "INDAH",
      fullName: "Indah Cahya",
      team: "Love",
    },
    {
      nickname: "freya",
      displayName: "FREYA",
      fullName: "Freya Jayawardana",
      team: "Passion",
    },
    {
      nickname: "gita",
      displayName: "GITA",
      fullName: "Gita Sekar",
      team: "Dream",
    },
    {
      nickname: "muthe",
      displayName: "MUTHE",
      fullName: "Muthia Vandeca",
      team: "Dream",
    },
    {
      nickname: "gracia",
      displayName: "GRACIA",
      fullName: "Shania Gracia",
      team: "Love",
    },
    {
      nickname: "eli",
      displayName: "ELI",
      fullName: "Helisma Mauludnia",
      team: "Love",
    },
    {
      nickname: "lulu",
      displayName: "LULU",
      fullName: "Lulu Salsabila",
      team: "Passion",
    },
    {
      nickname: "oline",
      displayName: "OLINE",
      fullName: "Oline Manuel",
      team: "Trainee",
    },
  ];

  return (
    <section
      className="w-full bg-bg text-ink py-20 sm:py-28 overflow-hidden transition-colors duration-300 border-t border-[var(--line)]"
      aria-label="Katalog 58 member JKT48"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 mb-12">
        {/* Section Header (FigCraft ID: 1255) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
          <div>
            <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[120px] tracking-tight uppercase leading-[0.88] text-ink">
              58 MEMBER,
              <br />
              SATU PANGGUNG.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-6 flex-1 max-w-xl">
            <p className="font-sans text-base sm:text-[17px] text-muted leading-relaxed">
              Team Love, Dream, Passion, dan Trainee. Setiap profil punya ruang
              diskusinya sendiri.
            </p>

            <Link
              href="/member"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-border text-sm font-sans font-semibold text-ink hover:bg-raised hover:border-border transition-all duration-200 shrink-0 self-start sm:self-auto"
            >
              Semua member
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee Track (FigCraft ID: 1261) */}
      <div className="relative w-full overflow-x-auto scrollbar-none pb-4">
        <div className="flex gap-5 px-6 sm:px-12 lg:px-16 w-max">
          {featuredMembers.map((m) => (
            <Link
              key={m.nickname}
              href={`/member/${m.nickname}`}
              className="relative w-[264px] h-[330px] shrink-0 rounded-[14px] overflow-hidden bg-bg transition-transform duration-300 hover:-translate-y-1 group border-none shadow-xl shadow-black/40 block"
            >
              {/* Member Photo (FigCraft ID: 1263) */}
              <Image
                src={`/members/${m.nickname}.jpg`}
                alt={m.fullName}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="264px"
              />

              {/* House tint multiply (#3A0710 with 0.55 opacity) - FigCraft ID: 1264 */}
              <div
                className="pointer-events-none absolute inset-0 bg-house-tint mix-blend-multiply opacity-55"
                aria-hidden="true"
              />

              {/* Spotlight radial vignette - FigCraft ID: 1265 */}
              <div
                className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_36%] from-transparent via-bg/20 to-bg/95"
                aria-hidden="true"
              />

              {/* Floor fade gradient - FigCraft ID: 1266 */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-bg via-bg/90 to-transparent"
                aria-hidden="true"
              />

              {/* Text Meta (FigCraft ID: 1267 & 1268) */}
              <div className="absolute bottom-5 left-5 right-5 z-10 space-y-0.5">
                <h3 className="font-display font-black text-4xl sm:text-[48px] uppercase tracking-tight leading-none text-ink group-hover:text-crimson-400 transition-colors">
                  {m.displayName}
                </h3>
                <p className="font-sans text-xs sm:text-[13px] font-medium text-muted truncate">
                  {m.fullName} · {m.team}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
