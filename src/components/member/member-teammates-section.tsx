"use client";

import Link from "next/link";
import Image from "next/image";
import type { MemberDetail } from "@/data/member-details-data";
import { getMembersByTeam } from "@/lib/jkt48-data";
import { ArrowRight } from "@phosphor-icons/react";

interface MemberTeammatesSectionProps {
  member: MemberDetail;
}

export default function MemberTeammatesSection({
  member,
}: MemberTeammatesSectionProps) {
  // Get members belonging to the same team, excluding this member
  const teammates = getMembersByTeam(member.type).filter(
    (m) => m.code.toUpperCase() !== member.code.toUpperCase()
  );

  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-[var(--color-stage-800)] bg-[var(--color-stage-950)]">
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block mb-1">
              Rekan Satu Tim
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[var(--color-ink)]">
              Satu Team Dengan {member.nickname}
            </h2>
          </div>

          <Link
            href="/member"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-crimson-400)] hover:text-[var(--color-ink)] transition-colors self-start sm:self-auto"
          >
            <span>Lihat Semua Member</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        {/* Teammates Horizontal Scroll / Grid */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory">
          {teammates.slice(0, 10).map((tm) => (
            <Link
              key={tm.code}
              href={`/member/${tm.code}`}
              className="group snap-start flex-none w-[180px] sm:w-[220px] rounded-2xl overflow-hidden bg-[var(--color-stage-900)] relative transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Photo with photo treatment */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-stage-800)]">
                <Image
                  src={tm.photo}
                  alt={tm.name}
                  fill
                  sizes="220px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* 1. House Tint */}
                <div className="absolute inset-0 house-tint pointer-events-none" />

                {/* 2. Spotlight Vignette */}
                <div className="absolute inset-0 spotlight-vignette pointer-events-none" />

                {/* 3. Floor Fade */}
                <div className="absolute inset-0 floor-fade pointer-events-none" />

                {/* Hover spotlight glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,231,204,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Info text at bottom */}
              <div className="p-3 sm:p-4 bg-[var(--color-stage-900)]">
                <span className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-crimson-400)] transition-colors block truncate">
                  {tm.nickname}
                </span>
                <span className="text-xs text-[var(--color-muted)] truncate block mt-0.5">
                  {tm.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
