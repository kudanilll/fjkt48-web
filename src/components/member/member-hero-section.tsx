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
    <section className="stage relative overflow-hidden bg-bg text-ink pt-6 pb-16 md:pb-24">
      {/* Background Spotlight Beam & Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-10 h-[800px] w-[800px] rounded-full opacity-60 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,231,204,0.18) 0%, rgba(229,19,46,0.08) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Desktop / Tablet Full-Bleed Spotlit Portrait (Right side behind giant name) */}
      <div className="hidden md:block pointer-events-none absolute right-0 top-0 w-[55%] lg:w-[800px] h-full z-0 overflow-hidden">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          priority
          sizes="(max-width: 1024px) 50vw, 800px"
          className="object-cover object-top opacity-90"
        />

        {/* House Tint Multiply */}
        <div className="absolute inset-0 bg-[#3A0710]/55 mix-blend-multiply" />

        {/* Left Fade to Background */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-bg to-transparent" />

        {/* Top Fade */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-bg/80 to-transparent" />

        {/* Floor Fade to Background */}
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-bg via-bg/90 to-transparent" />
      </div>

      <div className="w-full px-6 sm:px-12 lg:px-16 relative z-10">
        {/* Mobile Full-Bleed Banner Portrait (shows on mobile < md) */}
        <div className="md:hidden relative w-full h-[320px] rounded-2xl overflow-hidden mb-6 bg-surface">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-[#3A0710]/50 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        </div>

        {/* Breadcrumb (Member / Team {team}) */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-6"
        >
          <Link href="/member" className="hover:text-ink transition-colors">
            Member
          </Link>
          <span className="text-border">/</span>
          <span className="text-ink">Team {member.type}</span>
        </nav>

        {/* Giant Overlapping Name (320 / 200 / 136 px) */}
        <div className="relative z-10 -ml-1 sm:-ml-2 select-none">
          <h1 className="font-display font-black text-[136px] md:text-[200px] lg:text-[320px] leading-[0.82] tracking-tight uppercase text-ink">
            {member.nickname}
          </h1>
        </div>

        {/* Main Content Area */}
        <div className="max-w-2xl space-y-6 pt-4 relative z-10">
          {/* Identity Bar: Full Name, Team Badge, Generation */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-lg sm:text-2xl font-bold text-ink">
              {member.name}
            </span>
            <span className="px-3 py-1 rounded-full bg-raised text-xs font-mono font-medium text-crimson-400 border border-border">
              Team {member.type}
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-raised text-muted border border-border">
              {member.generation}
            </span>
          </div>

          {/* Jikoshokai Quote (FigCraft ID: 5187) */}
          <div className="space-y-1.5">
            <span className="font-mono-data text-xs font-bold text-crimson-400 tracking-wider uppercase block">
              JIKOSHOKAI
            </span>
            <p className="font-sans text-base sm:text-lg text-ink italic leading-relaxed">
              &ldquo;Halo semuanya! Aku {member.nickname}, yang selalu siap jadi
              cahaya di panggung. Salam kenal!&rdquo;
            </p>
          </div>

          {/* CTAs & Social Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsOshi(!isOshi)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer shadow-lg ${
                isOshi
                  ? "bg-raised text-crimson-400 border border-crimson-500/50"
                  : "bg-crimson-500 hover:bg-crimson-600 text-white shadow-crimson-500/30"
              }`}
            >
              <span>{isOshi ? "Oshi kamu ❤️" : "Jadikan oshi"}</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </button>

            <Link
              href="/live"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-border text-ink hover:bg-raised hover:border-border transition-all"
            >
              <span>Tonton replay terakhir</span>
            </Link>

            {/* Social icons */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href={member.socialLinks.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-ink hover:border-border transition-colors"
                aria-label="Instagram"
              >
                <InstagramLogo weight="bold" className="w-4 h-4" />
              </a>
              <a
                href={member.socialLinks.twitter || "https://x.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-ink hover:border-border transition-colors"
                aria-label="X (Twitter)"
              >
                <XLogo weight="bold" className="w-4 h-4" />
              </a>
              <a
                href={member.socialLinks.tiktok || "https://tiktok.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-ink hover:border-border transition-colors"
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
                className="px-3 py-2 rounded-full border border-border text-xs font-mono-data text-muted hover:text-ink hover:border-border transition-colors"
              >
                Showroom
              </a>
              <a
                href={member.socialLinks.idn || "https://idn.app"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-full border border-border text-xs font-mono-data text-muted hover:text-ink hover:border-border transition-colors"
              >
                IDN Live
              </a>
            </div>
          </div>

          {/* Live Indicator Status */}
          <div className="flex items-center gap-2 text-xs font-mono-data text-muted pt-2">
            <span className="w-2 h-2 rounded-full bg-crimson-500 shadow-[0_0_6px_rgba(229,19,46,0.8)]" />
            <span>Lagi nggak live. Terakhir live 2 hari lalu di Showroom.</span>
          </div>
        </div>

        {/* Stats Strip (FigCraft ID: 5210) */}
        <div className="mt-16 pt-8 border-t border-raised grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted block">
              LAHIR
            </span>
            <span className="font-display font-extrabold text-2xl text-ink uppercase mt-1 block">
              13 FEB 2006
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted block">
              ZODIAK
            </span>
            <span className="font-display font-extrabold text-2xl text-ink uppercase mt-1 block">
              AQUARIUS
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted block">
              GOL. DARAH
            </span>
            <span className="font-display font-extrabold text-2xl text-ink uppercase mt-1 block">
              O
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted block">
              TINGGI
            </span>
            <span className="font-display font-extrabold text-2xl text-ink uppercase mt-1 block">
              162 CM
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted block">
              DIJADIKAN OSHI
            </span>
            <span className="font-display font-extrabold text-2xl text-crimson-400 uppercase mt-1 block">
              1.284 FANS
            </span>
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted block">
              DIBAHAS DI
            </span>
            <span className="font-display font-extrabold text-2xl text-ink uppercase mt-1 block">
              412 THREAD
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
