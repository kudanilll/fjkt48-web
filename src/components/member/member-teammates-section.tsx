"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { MemberDetail } from "@/data/member-details-data";

interface MemberTeammatesSectionProps {
  member: MemberDetail;
}

// Exact 5 teammates from FigCraft (ID: 5260)
const dreamTeammates = [
  {
    nickname: "gita",
    displayName: "GITA",
    fullName: "Gita Sekar Andarini · Dream",
  },
  {
    nickname: "marsha",
    displayName: "MARSHA",
    fullName: "Marsha Lenathea · Dream",
  },
  { nickname: "oline", displayName: "OLINE", fullName: "Oline Manuel · Dream" },
  {
    nickname: "ella",
    displayName: "ELLA",
    fullName: "Gabriela Abigail · Dream",
  },
  {
    nickname: "greesel",
    displayName: "GREESEL",
    fullName: "Greesella Adhalia · Dream",
  },
];

export default function MemberTeammatesSection({
  member,
}: MemberTeammatesSectionProps) {
  return (
    <section className="py-16 sm:py-20 bg-bg text-ink">
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-[var(--line)]">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-[64px] uppercase tracking-tight text-ink">
            SATU TEAM DENGAN {member.nickname}
          </h2>

          <Link
            href="/member"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-ink hover:text-crimson-400 transition-colors"
          >
            <span>Lihat Team {member.type}</span>
            <ArrowUpRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Member Cards Track (FigCraft ID: 5260) */}
        <div className="relative w-full overflow-x-auto scrollbar-none pb-4">
          <div className="flex gap-5 w-max">
            {dreamTeammates.map((tm) => (
              <Link
                key={tm.nickname}
                href={`/member/${tm.nickname}`}
                className="relative w-[264px] h-[330px] shrink-0 rounded-[14px] overflow-hidden bg-bg transition-transform duration-300 hover:-translate-y-1 group border-none shadow-xl shadow-black/40 block"
              >
                {/* Photo */}
                <Image
                  src={`/members/${tm.nickname}.jpg`}
                  alt={tm.displayName}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="264px"
                />

                {/* House tint multiply (#3A0710 with 0.55 opacity) */}
                <div
                  className="pointer-events-none absolute inset-0 bg-house-tint mix-blend-multiply opacity-55"
                  aria-hidden="true"
                />

                {/* Spotlight radial vignette */}
                <div
                  className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_36%] from-transparent via-bg/20 to-bg/95"
                  aria-hidden="true"
                />

                {/* Floor fade gradient */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-bg via-bg/90 to-transparent"
                  aria-hidden="true"
                />

                {/* Text Meta */}
                <div className="absolute bottom-5 left-5 right-5 z-10 space-y-0.5">
                  <h3 className="font-display font-black text-4xl sm:text-[48px] uppercase tracking-tight leading-none text-ink group-hover:text-crimson-400 transition-colors">
                    {tm.displayName}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] font-medium text-muted truncate">
                    {tm.fullName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
