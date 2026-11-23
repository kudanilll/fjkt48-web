"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowSquareOut,
  ArrowUpRight,
  Play,
  User,
} from "@phosphor-icons/react";
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
      <div className="relative w-full aspect-video rounded-[14px] overflow-hidden bg-surface shadow-2xl flex items-center justify-center group">
        {/* Stream Cover / Member Photo */}
        <Image
          src={stream.memberPhoto}
          alt={stream.memberName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 880px"
          className="object-cover object-top opacity-60 group-hover:scale-105 transition-transform duration-700"
        />

        {/* Atmospheric Overlays */}
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crimson-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-crimson-500/40">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>{isShowroom ? "LIVE DI SHOWROOM" : "LIVE DI IDN LIVE"}</span>
          </div>

          {/* Viewers count */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg/80 backdrop-blur-md text-ink text-xs font-mono font-medium">
            <span>● {stream.viewers.toLocaleString("id-ID")} PENONTON</span>
          </div>
        </div>

        {/* Center Play Button Overlay */}
        <a
          href={stream.streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka live ${stream.memberName}`}
          className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-crimson-500 text-white shadow-2xl shadow-crimson-500/50 group-hover:scale-110 transition-transform duration-300"
        >
          <Play weight="fill" className="w-7 h-7 sm:w-9 sm:h-9 ml-1" />
        </a>

        {/* Bottom Title Bar on Player */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col space-y-1">
          <span className="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-white drop-shadow-md">
            {stream.memberName}
          </span>
          <p className="text-xs sm:text-sm text-ink/90 line-clamp-1 drop-shadow font-sans">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[15px] font-semibold bg-crimson-500 text-white hover:bg-crimson-600 transition-all shadow-md shadow-crimson-500/20"
          >
            <span>Tonton di {stream.platformTitle}</span>
            <ArrowSquareOut weight="bold" className="w-4 h-4" />
          </a>

          <Link
            href={`/member/${stream.memberCode}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[15px] font-medium bg-raised text-ink hover:bg-border transition-colors"
          >
            <User weight="bold" className="w-4 h-4 text-accent" />
            <span>Profil {stream.memberNickname}</span>
            <ArrowUpRight weight="bold" className="w-4 h-4 text-muted" />
          </Link>
        </div>

        <span className="text-xs font-mono text-subtle">
          Streaming diputar langsung dari platform penyedia resmi.
        </span>
      </div>
    </div>
  );
}
