"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  PlayCircle,
  XLogo,
  InstagramLogo,
  TiktokLogo,
  Radio,
} from "@phosphor-icons/react";
import type { MemberDetail } from "@/data/member-details-data";
import { TeamBadge } from "@/components/ui/badge";

interface MemberHeroSectionProps {
  member: MemberDetail;
}

export default function MemberHeroSection({ member }: MemberHeroSectionProps) {
  const [isOshi, setIsOshi] = useState<boolean>(false);

  return (
    <section className="stage relative overflow-hidden bg-[var(--color-stage-950)] text-[var(--color-ink)] pt-6 pb-16 md:pb-24">
      {/* Background Spotlight Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[700px] w-[700px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,231,204,0.14) 0%, rgba(229,19,46,0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Beam light projecting onto the portrait */}
      <div
        className="pointer-events-none absolute top-0 right-12 md:right-32 h-[640px] w-[320px] mix-blend-screen opacity-70"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,231,204,0.18) 0%, rgba(255,231,204,0) 100%)",
          clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
        }}
      />

      <div className="w-full px-6 sm:px-12 lg:px-16 relative z-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] mb-6 sm:mb-8"
        >
          <Link
            href="/"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            Beranda
          </Link>
          <span className="text-[var(--color-stage-700)]">/</span>
          <Link
            href="/member"
            className="hover:text-[var(--color-ink)] transition-colors"
          >
            Member
          </Link>
          <span className="text-[var(--color-stage-700)]">/</span>
          <span className="text-[var(--color-crimson-400)]">
            {member.nickname}
          </span>
        </nav>

        {/* Main Grid: Info + Giant Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Info & Details */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 space-y-6">
            {/* Nickname Display Title */}
            <div className="relative">
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block mb-1">
                JKT48 Official Member
              </span>
              <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[180px] leading-[0.85] tracking-tight uppercase select-none text-[var(--color-ink)]">
                {member.nickname}
              </h1>
            </div>

            {/* Identity Bar: Full Name, Team Badge, Generation */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg sm:text-xl font-semibold text-[var(--color-ink)]">
                {member.name}
              </span>
              <TeamBadge team={member.type} />
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--color-stage-800)] text-[var(--color-muted)]">
                {member.generation}
              </span>
            </div>

            {/* Jikoshokai Quote */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-stage-900)] border-l-4 border-[var(--color-crimson-500)]">
              <p className="text-sm sm:text-base italic text-[var(--color-ink)] leading-relaxed font-sans">
                &ldquo;{member.jikoshokai}&rdquo;
              </p>
            </div>

            {/* Action Buttons & Socials */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOshi(!isOshi)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md ${
                  isOshi
                    ? "bg-[var(--color-crimson-500)] text-white shadow-[var(--color-crimson-500)]/30"
                    : "bg-[var(--color-stage-800)] text-[var(--color-ink)] hover:bg-[var(--color-crimson-600)] hover:text-white"
                }`}
              >
                <Heart
                  weight={isOshi ? "fill" : "bold"}
                  className="w-4 h-4 text-white"
                />
                <span>{isOshi ? "Oshi Kamu" : "Jadikan Oshi"}</span>
              </button>

              <Link
                href="/live"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[var(--color-stage-800)] text-[var(--color-ink)] hover:bg-[var(--color-stage-700)] transition-colors"
              >
                <PlayCircle
                  weight="bold"
                  className="w-4 h-4 text-[var(--color-crimson-400)]"
                />
                <span>Tonton Replay Terakhir</span>
              </Link>

              {/* Social Buttons */}
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                {member.socialLinks.twitter && (
                  <a
                    href={member.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`X/Twitter ${member.nickname}`}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-stage-800)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-stage-700)] transition-all"
                  >
                    <XLogo weight="bold" className="w-4 h-4" />
                  </a>
                )}
                {member.socialLinks.instagram && (
                  <a
                    href={member.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram ${member.nickname}`}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-stage-800)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-stage-700)] transition-all"
                  >
                    <InstagramLogo weight="bold" className="w-4 h-4" />
                  </a>
                )}
                {member.socialLinks.tiktok && (
                  <a
                    href={member.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`TikTok ${member.nickname}`}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-stage-800)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-stage-700)] transition-all"
                  >
                    <TiktokLogo weight="bold" className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Live Status Line */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] pt-1">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  member.isLive
                    ? "bg-[var(--color-crimson-500)] animate-pulse shadow-[0_0_8px_var(--color-crimson-500)]"
                    : "bg-[var(--color-stage-700)]"
                }`}
              />
              <span>{member.lastLiveText}</span>
              {member.isLive && (
                <Link
                  href="/live"
                  className="text-[var(--color-crimson-400)] underline hover:text-[var(--color-ink)] transition-colors ml-1"
                >
                  Buka streaming &rarr;
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Spotlit Member Portrait */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[var(--color-stage-900)]">
              {/* Photo with 3 overlay treatments */}
              <Image
                src={member.photo}
                alt={member.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-top"
              />

              {/* 1. House Tint */}
              <div className="absolute inset-0 house-tint pointer-events-none" />

              {/* 2. Spotlight Vignette */}
              <div className="absolute inset-0 spotlight-vignette pointer-events-none" />

              {/* 3. Floor Fade */}
              <div className="absolute inset-0 floor-fade pointer-events-none" />

              {/* Left edge shadow fade for seamless blending */}
              <div
                className="absolute inset-y-0 left-0 w-24 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(11,10,12,0.95), transparent)",
                }}
              />

              {/* Live pill overlay if member is currently live */}
              {member.isLive && (
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-crimson-500)] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                  <Radio weight="fill" className="w-3.5 h-3.5 animate-pulse" />
                  <span>Sedang Live</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-12 pt-8 border-t border-[var(--color-stage-800)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
              Lahir
            </span>
            <span className="text-sm sm:text-base font-semibold text-[var(--color-ink)] mt-0.5">
              {member.birthdate}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
              Zodiak
            </span>
            <span className="text-sm sm:text-base font-semibold text-[var(--color-ink)] mt-0.5">
              {member.horoscope}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
              Gol. Darah
            </span>
            <span className="text-sm sm:text-base font-semibold text-[var(--color-ink)] mt-0.5">
              {member.bloodType}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
              Tinggi Badan
            </span>
            <span className="text-sm sm:text-base font-semibold text-[var(--color-ink)] mt-0.5">
              {member.height}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
              Dijadikan Oshi
            </span>
            <span className="text-sm sm:text-base font-semibold text-[var(--color-crimson-400)] mt-0.5 font-mono">
              {member.fansCount.toLocaleString("id-ID")} fans
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
              Dibahas di Forum
            </span>
            <span className="text-sm sm:text-base font-semibold text-[var(--color-ink)] mt-0.5 font-mono">
              {member.threadsCount} thread
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
