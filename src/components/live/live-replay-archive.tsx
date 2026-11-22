"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Play, CaretDown } from "@phosphor-icons/react";
import type { LiveReplay } from "@/data/live-mock-data";

interface LiveReplayArchiveProps {
  replays: LiveReplay[];
}

export default function LiveReplayArchive({ replays }: LiveReplayArchiveProps) {
  const [platformFilter, setPlatformFilter] = useState<
    "ALL" | "showroom" | "idn"
  >("ALL");
  const [memberFilter, setMemberFilter] = useState<string>("ALL");
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Distinct member list for filtering
  const distinctMembers = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of replays) {
      if (!map.has(r.memberCode)) {
        map.set(r.memberCode, r.memberNickname);
      }
    }
    return Array.from(map.entries()).map(([code, nickname]) => ({
      code,
      nickname,
    }));
  }, [replays]);

  const filteredReplays = useMemo(() => {
    return replays.filter((r) => {
      const matchPlatform =
        platformFilter === "ALL" || r.platform === platformFilter;
      const matchMember =
        memberFilter === "ALL" || r.memberCode === memberFilter;
      return matchPlatform && matchMember;
    });
  }, [replays, platformFilter, memberFilter]);

  const displayReplays = filteredReplays.slice(0, visibleCount);

  return (
    <section
      id="replay-archive"
      className="py-12 sm:py-16 md:py-20 border-t border-[var(--color-stage-800)]"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block mb-1">
              Dokumentasi Streaming
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[var(--color-ink)]">
              Replay Arsip
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Member Dropdown Filter */}
            <div className="relative">
              <select
                value={memberFilter}
                onChange={(e) => setMemberFilter(e.target.value)}
                aria-label="Filter berdasarkan member"
                className="appearance-none px-4 py-2 pr-9 rounded-full bg-[var(--color-stage-900)] text-xs font-mono font-medium text-[var(--color-ink)] border border-[var(--color-stage-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-spotlight)]"
              >
                <option value="ALL">Semua Member</option>
                {distinctMembers.map((m) => (
                  <option key={m.code} value={m.code}>
                    {m.nickname}
                  </option>
                ))}
              </select>
              <CaretDown
                weight="bold"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-muted)] pointer-events-none"
              />
            </div>

            {/* Platform Segmented Chips */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[var(--color-stage-900)]">
              <button
                type="button"
                onClick={() => setPlatformFilter("ALL")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  platformFilter === "ALL"
                    ? "bg-[var(--color-crimson-500)] text-white shadow-sm"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setPlatformFilter("showroom")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  platformFilter === "showroom"
                    ? "bg-[#333333] text-white shadow-sm"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                Showroom
              </button>
              <button
                type="button"
                onClick={() => setPlatformFilter("idn")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  platformFilter === "idn"
                    ? "bg-[#E5132E] text-white shadow-sm"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                IDN Live
              </button>
            </div>
          </div>
        </div>

        {/* 4-column Grid on Desktop / 2-column on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayReplays.map((replay) => {
            const isShowroom = replay.platform === "showroom";

            return (
              <a
                key={replay.id}
                href={replay.replayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl overflow-hidden bg-[var(--color-stage-900)] hover:bg-[var(--color-stage-850)] transition-all flex flex-col"
              >
                {/* Thumbnail with overlay & duration pill */}
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-stage-800)]">
                  <Image
                    src={replay.thumbnail}
                    alt={replay.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 house-tint pointer-events-none" />
                  <div className="absolute inset-0 spotlight-vignette pointer-events-none" />

                  {/* Platform Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        isShowroom
                          ? "bg-[#333333] text-white"
                          : "bg-[#E5132E] text-white"
                      }`}
                    >
                      {replay.platform === "showroom" ? "Showroom" : "IDN Live"}
                    </span>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono font-medium text-white">
                    {replay.duration}
                  </div>

                  {/* Play icon hover circle */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-crimson-500)] text-white shadow-lg">
                      <Play weight="fill" className="w-4 h-4 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    <span className="font-display font-black text-xl uppercase tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-crimson-400)] transition-colors block truncate">
                      {replay.memberNickname}
                    </span>
                    <h3 className="text-xs sm:text-sm font-medium text-[var(--color-ink)]/90 line-clamp-2 mt-1 font-sans">
                      {replay.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)] pt-2 border-t border-[var(--color-stage-800)]/60">
                    <span>{replay.recordedDate}</span>
                    <span>{replay.views.toLocaleString("id-ID")} tontonan</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredReplays.length && (
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="px-6 py-3 rounded-full text-xs font-semibold bg-[var(--color-stage-900)] text-[var(--color-ink)] hover:bg-[var(--color-stage-800)] border border-[var(--color-stage-800)] transition-all"
            >
              Muat Replay Lainnya ({filteredReplays.length - visibleCount}{" "}
              tersisa)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
