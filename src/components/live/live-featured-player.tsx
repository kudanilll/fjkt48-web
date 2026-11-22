"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowSquareOut, Play, Radio, User } from "@phosphor-icons/react";
import type { LiveStream } from "@/data/live-mock-data";

interface LiveFeaturedPlayerProps {
  stream: LiveStream;
}

export default function LiveFeaturedPlayer({
  stream,
}: LiveFeaturedPlayerProps) {
  const isShowroom = stream.platform === "showroom";

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Featured Video Screen Area (16:9 aspect ratio) */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-[var(--color-stage-900)] shadow-2xl flex items-center justify-center group">
        {/* Stream Cover / Member Photo */}
        <Image
          src={stream.memberPhoto}
          alt={stream.memberName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 880px"
          className="object-cover object-top opacity-50 group-hover:scale-105 transition-transform duration-700"
        />

        {/* Overlays */}
        <div className="absolute inset-0 house-tint pointer-events-none" />
        <div className="absolute inset-0 spotlight-vignette pointer-events-none" />
        <div className="absolute inset-0 floor-fade pointer-events-none" />

        {/* Ambient Warm Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,231,204,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex flex-wrap items-center gap-2">
          {/* LIVE pulsing badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-crimson-500)] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[var(--color-crimson-500)]/40">
            <Radio weight="fill" className="w-3.5 h-3.5 animate-pulse" />
            <span>LIVE</span>
          </div>

          {/* Platform badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider text-white shadow-lg ${
              isShowroom ? "bg-[#333333]" : "bg-[#E5132E]"
            }`}
          >
            <span>{stream.platformTitle}</span>
          </div>

          {/* Viewers count */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-mono font-medium">
            <span>{stream.viewers.toLocaleString("id-ID")} penonton</span>
          </div>
        </div>

        {/* Center Play Button Overlay */}
        <a
          href={stream.streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka live ${stream.memberName}`}
          className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-[var(--color-crimson-500)] text-white shadow-2xl shadow-[var(--color-crimson-500)]/50 group-hover:scale-110 transition-transform duration-300"
        >
          <Play weight="fill" className="w-7 h-7 sm:w-9 sm:h-9 ml-1" />
        </a>

        {/* Bottom Title Bar on Player */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col space-y-1">
          <span className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white drop-shadow-md">
            {stream.memberName}
          </span>
          <p className="text-xs sm:text-sm text-[var(--color-ink)]/90 line-clamp-1 drop-shadow font-sans">
            {stream.title}
          </p>
        </div>
      </div>

      {/* Action Bar below player */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={stream.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-[var(--color-crimson-500)] text-white hover:bg-[var(--color-crimson-600)] transition-all shadow-md shadow-[var(--color-crimson-500)]/20"
          >
            <span>Tonton di {stream.platformTitle}</span>
            <ArrowSquareOut weight="bold" className="w-4 h-4" />
          </a>

          <Link
            href={`/member/${stream.memberCode}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold bg-[var(--color-stage-900)] text-[var(--color-ink)] hover:bg-[var(--color-stage-800)] transition-colors border border-[var(--color-stage-800)]"
          >
            <User
              weight="bold"
              className="w-4 h-4 text-[var(--color-crimson-400)]"
            />
            <span>Profil {stream.memberNickname}</span>
          </Link>
        </div>

        <span className="text-xs font-mono text-[var(--color-muted)]">
          Streaming diputar langsung dari platform penyedia resmi.
        </span>
      </div>
    </div>
  );
}
