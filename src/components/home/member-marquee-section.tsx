"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "@phosphor-icons/react";
import { TeamBadge } from "@/components/ui/badge";
import type { JKT48Member } from "@/types/jkt48-types";

interface MemberMarqueeSectionProps {
  members: JKT48Member[];
}

export default function MemberMarqueeSection({
  members,
}: MemberMarqueeSectionProps) {
  // Use a curated set of 12 members for marquee animation
  const displayMembers = members.slice(0, 16);

  return (
    <section
      className="w-full bg-[var(--bg)] text-[var(--ink)] py-20 sm:py-28 overflow-hidden transition-colors duration-300"
      aria-label="Katalog 58 member JKT48"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 mb-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-2 text-crimson-400 font-mono-data text-xs font-semibold uppercase tracking-wider mb-2">
              <Users weight="fill" className="w-4 h-4" />
              <span>ROSTER LINEUP</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-none">
              58 MEMBER
            </h2>
            <p className="font-mono-data text-xs sm:text-sm text-[var(--muted)] mt-2">
              Semua generasi dan team, bersatu dalam satu panggung
            </p>
          </div>

          <Link
            href="/member"
            className="group inline-flex items-center gap-2 font-mono-data text-xs sm:text-sm font-semibold text-crimson-400 hover:text-crimson-500 transition-colors uppercase tracking-wider"
          >
            <span>Lihat semua member</span>
            <ArrowRight
              weight="bold"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {/* Marquee Scroller Track */}
      <div className="relative w-full overflow-x-auto scrollbar-none pb-4">
        <div className="flex gap-4 sm:gap-6 px-6 sm:px-12 w-max animate-none md:hover:pause">
          {displayMembers.map((member) => (
            <Link
              key={member.code}
              href={`/member/${member.nickname.toLowerCase()}`}
              className="card group relative w-48 sm:w-56 h-72 sm:h-80 shrink-0 rounded-2xl overflow-hidden bg-[var(--surface)] hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-black/25 border-none"
            >
              {/* Member Photo */}
              <Image
                src={`/members/${member.nickname.toLowerCase()}.jpg`}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 192px, 224px"
              />

              {/* Spotlight Vignette & Floor Fade */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0A0C] via-[#0B0A0C]/50 to-transparent"
                aria-hidden="true"
              />

              {/* Card Meta Content */}
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
                <TeamBadge team={member.type} />
                <h3 className="font-display text-2xl font-black uppercase text-white tracking-wide group-hover:text-crimson-400 transition-colors">
                  {member.nickname}
                </h3>
                <p className="font-sans text-xs text-[#A8A0A3] truncate">
                  {member.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
