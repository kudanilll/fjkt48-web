"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  InstagramLogo,
  TiktokLogo,
  XLogo,
} from "@phosphor-icons/react";
import type { MemberDetail } from "@/data/member-details-data";

interface MemberHeroSectionProps {
  member: MemberDetail;
}

export default function MemberHeroSection({ member }: MemberHeroSectionProps) {
  const [isOshi, setIsOshi] = useState<boolean>(false);

  return (
    <section className="stage relative overflow-hidden bg-[#0B0A0C] text-[#F4EFEA] pt-6 pb-16 md:pb-24 border-b border-[var(--line)]">
      {/* Background Spotlight Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[700px] w-[700px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,231,204,0.14) 0%, rgba(229,19,46,0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="w-full px-6 sm:px-12 lg:px-16 relative z-10">
        {/* Breadcrumb (FigCraft: Member / Team Dream) */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A8A0A3] mb-8"
        >
          <Link
            href="/member"
            className="hover:text-[#F4EFEA] transition-colors"
          >
            Member
          </Link>
          <span className="text-[#2B272D]">/</span>
          <span className="text-[#F4EFEA]">Team {member.type}</span>
        </nav>

        {/* Main Grid: Info + Giant Portrait (FigCraft ID: 5176) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Info & Details */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 space-y-6">
            {/* Nickname Display Title */}
            <div>
              <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[180px] leading-[0.85] tracking-tight uppercase select-none text-[#F4EFEA]">
                {member.nickname}
              </h1>
            </div>

            {/* Identity Bar: Full Name, Team Badge, Generation */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg sm:text-xl font-semibold text-[#F4EFEA]">
                {member.name}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1D1A1F] text-xs font-mono font-medium text-crimson-400 border border-[#2B272D]">
                Team {member.type}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#1D1A1F] text-[#A8A0A3] border border-[#2B272D]">
                {member.generation}
              </span>
            </div>

            {/* Jikoshokai Quote (FigCraft ID: 5187) */}
            <div className="space-y-1.5">
              <span className="font-mono-data text-xs font-bold text-crimson-400 tracking-wider uppercase block">
                JIKOSHOKAI
              </span>
              <p className="font-sans text-base sm:text-lg text-[#F4EFEA] italic leading-relaxed max-w-xl">
                &ldquo;Halo semuanya! Aku {member.nickname}, yang selalu siap
                jadi cahaya di panggung. Salam kenal!&rdquo;
              </p>
            </div>

            {/* CTAs & Social Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOshi(!isOshi)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer shadow-lg ${
                  isOshi
                    ? "bg-[#1D1A1F] text-crimson-400 border border-crimson-500/50"
                    : "bg-crimson-500 hover:bg-crimson-600 text-white shadow-crimson-500/30"
                }`}
              >
                <span>{isOshi ? "Oshi kamu ❤️" : "Jadikan oshi"}</span>
                <ArrowRight weight="bold" className="w-4 h-4" />
              </button>

              <Link
                href="/live"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-[#2B272D] text-[#F4EFEA] hover:bg-[#1D1A1F] hover:border-[#3A353D] transition-all"
              >
                <span>Tonton replay terakhir</span>
              </Link>

              {/* Social icons */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href={member.socialLinks.instagram || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#2B272D] flex items-center justify-center text-[#A8A0A3] hover:text-[#F4EFEA] hover:border-[#3A353D] transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramLogo weight="bold" className="w-4 h-4" />
                </a>
                <a
                  href={member.socialLinks.twitter || "https://x.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#2B272D] flex items-center justify-center text-[#A8A0A3] hover:text-[#F4EFEA] hover:border-[#3A353D] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <XLogo weight="bold" className="w-4 h-4" />
                </a>
                <a
                  href={member.socialLinks.tiktok || "https://tiktok.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#2B272D] flex items-center justify-center text-[#A8A0A3] hover:text-[#F4EFEA] hover:border-[#3A353D] transition-colors"
                  aria-label="TikTok"
                >
                  <TiktokLogo weight="bold" className="w-4 h-4" />
                </a>
                <a
                  href={
                    member.socialLinks.showroom || "https://showroom-live.com"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-full border border-[#2B272D] text-xs font-mono-data text-[#A8A0A3] hover:text-[#F4EFEA] hover:border-[#3A353D] transition-colors"
                >
                  Showroom
                </a>
                <a
                  href={member.socialLinks.idn || "https://idn.app"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-full border border-[#2B272D] text-xs font-mono-data text-[#A8A0A3] hover:text-[#F4EFEA] hover:border-[#3A353D] transition-colors"
                >
                  IDN Live
                </a>
              </div>
            </div>

            {/* Live Indicator Status */}
            <div className="flex items-center gap-2 text-xs font-mono-data text-[#A8A0A3] pt-2">
              <span className="w-2 h-2 rounded-full bg-crimson-500 shadow-[0_0_6px_rgba(229,19,46,0.8)]" />
              <span>
                Lagi nggak live. Terakhir live 2 hari lalu di Showroom.
              </span>
            </div>
          </div>

          {/* Right Column: Spotlit Member Portrait (FigCraft ID: 5202) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[14px] overflow-hidden bg-[#141215] shadow-2xl shadow-black/80">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-top"
              />

              {/* House Tint */}
              <div
                className="pointer-events-none absolute inset-0 bg-[#3A0710] mix-blend-multiply opacity-50"
                aria-hidden="true"
              />

              {/* Spotlight Vignette */}
              <div
                className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_36%] from-transparent via-[#0B0A0C]/20 to-[#0B0A0C]/95"
                aria-hidden="true"
              />

              {/* Floor Fade */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0B0A0C] via-[#0B0A0C]/90 to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Stats Strip (FigCraft ID: 5210) */}
        <div className="mt-12 pt-8 border-t border-[var(--line)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8A0A3] block">
              LAHIR
            </span>
            <span className="font-display font-extrabold text-2xl text-[#F4EFEA] uppercase mt-1 block">
              13 FEB 2006
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8A0A3] block">
              ZODIAK
            </span>
            <span className="font-display font-extrabold text-2xl text-[#F4EFEA] uppercase mt-1 block">
              AQUARIUS
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8A0A3] block">
              GOL. DARAH
            </span>
            <span className="font-display font-extrabold text-2xl text-[#F4EFEA] uppercase mt-1 block">
              O
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8A0A3] block">
              TINGGI
            </span>
            <span className="font-display font-extrabold text-2xl text-[#F4EFEA] uppercase mt-1 block">
              162 CM
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8A0A3] block">
              DIJADIKAN OSHI
            </span>
            <span className="font-display font-extrabold text-2xl text-crimson-400 uppercase mt-1 block">
              1.284 FANS
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8A0A3] block">
              DIBAHAS DI
            </span>
            <span className="font-display font-extrabold text-2xl text-[#F4EFEA] uppercase mt-1 block">
              412 THREAD
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
