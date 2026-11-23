"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Play } from "@phosphor-icons/react";
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

  const memberList = useMemo(() => {
    const map = new Map<string, string>();
    replays.forEach((r) => map.set(r.memberCode, r.memberNickname));
    return Array.from(map.entries());
  }, [replays]);

  const counts = useMemo(() => {
    return {
      ALL: replays.length,
      showroom: replays.filter((r) => r.platform === "showroom").length,
      idn: replays.filter((r) => r.platform === "idn").length,
    };
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
    <section id="replay-archive" className="py-16 sm:py-24">
      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-10">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-4xl sm:text-[56px] uppercase tracking-[-1px] text-ink leading-none">
              REPLAY
            </h2>
            <p className="text-base text-muted font-sans">
              Tonton siaran yang sudah lewat dalam 30 hari terakhir.
            </p>
          </div>

          {/* Filter Chips & Member Select */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setPlatformFilter("ALL")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                platformFilter === "ALL"
                  ? "bg-ink text-bg"
                  : "bg-raised text-ink border border-ink-a10 hover:border-ink-a35"
              }`}
            >
              Semua ({counts.ALL})
            </button>
            <button
              type="button"
              onClick={() => setPlatformFilter("showroom")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                platformFilter === "showroom"
                  ? "bg-ink text-bg border-transparent"
                  : "bg-raised text-ink border-ink-a10 hover:border-ink-a35"
              }`}
            >
              Showroom ({counts.showroom})
            </button>
            <button
              type="button"
              onClick={() => setPlatformFilter("idn")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                platformFilter === "idn"
                  ? "bg-ink text-bg border-transparent"
                  : "bg-raised text-ink border-ink-a10 hover:border-ink-a35"
              }`}
            >
              IDN Live ({counts.idn})
            </button>

            {/* Member Select Dropdown */}
            <div className="relative">
              <select
                value={memberFilter}
                onChange={(e) => setMemberFilter(e.target.value)}
                aria-label="Filter berdasarkan member"
                className="appearance-none px-4 py-2 pr-8 rounded-full bg-raised text-ink border border-ink-a10 hover:border-ink-a35 text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="ALL">Semua Member</option>
                {memberList.map(([code, nickname]) => (
                  <option key={code} value={code}>
                    {nickname}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayReplays.map((replay) => {
            const isShowroom = replay.platform === "showroom";

            return (
              <a
                key={replay.id}
                href={replay.replayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[14px] overflow-hidden bg-surface hover:bg-raised transition-all flex flex-col"
              >
                {/* Thumbnail with duration */}
                <div className="relative aspect-video w-full overflow-hidden bg-raised">
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

                  {/* Platform Badge Top-Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        isShowroom
                          ? "bg-bg/80 text-ink"
                          : "bg-crimson-500 text-white"
                      }`}
                    >
                      {isShowroom ? "Showroom" : "IDN Live"}
                    </span>
                  </div>

                  {/* Duration Badge Bottom-Right */}
                  <div className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-ink">
                    {replay.duration}
                  </div>

                  {/* Hover Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-crimson-500 text-white flex items-center justify-center shadow-lg">
                      <Play weight="fill" className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Info: Member nickname & recordedDate only (no title description, no view count) */}
                <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
                  <span className="font-sans font-semibold text-[15px] text-ink block group-hover:text-accent transition-colors">
                    {replay.memberNickname}
                  </span>

                  <div className="flex items-center gap-2 text-xs font-mono text-subtle pt-2">
                    <span>{replay.recordedDate}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredReplays.length && (
          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="px-7 py-3 rounded-full bg-raised text-ink font-sans text-sm font-semibold hover:bg-border transition-colors cursor-pointer"
            >
              Muat replay lainnya
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
