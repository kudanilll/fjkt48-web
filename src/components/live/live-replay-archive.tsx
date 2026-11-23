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
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const counts = useMemo(() => {
    return {
      ALL: replays.length,
      showroom: replays.filter((r) => r.platform === "showroom").length,
      idn: replays.filter((r) => r.platform === "idn").length,
    };
  }, [replays]);

  const filteredReplays = useMemo(() => {
    return replays.filter((r) => {
      if (platformFilter === "ALL") return true;
      return r.platform === platformFilter;
    });
  }, [replays, platformFilter]);

  const displayReplays = filteredReplays.slice(0, visibleCount);

  return (
    <section
      id="replay-archive"
      className="py-16 sm:py-24 border-t border-raised"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-10">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-4xl sm:text-[56px] uppercase tracking-[-1px] text-ink leading-none">
              REPLAY TERBARU
            </h2>
            <p className="text-base text-muted font-sans">
              Tonton siaran yang sudah lewat dalam 30 hari terakhir.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
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

                {/* Card Info */}
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="font-sans font-semibold text-[15px] text-ink block group-hover:text-accent transition-colors">
                      {replay.memberNickname}
                    </span>
                    <p className="text-[13px] text-muted line-clamp-2 leading-snug">
                      {replay.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-subtle pt-2 border-t border-raised">
                    <span>{replay.recordedDate}</span>
                    <span>·</span>
                    <span>{replay.views.toLocaleString("id-ID")} ditonton</span>
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
              className="px-7 py-3 rounded-full bg-raised text-ink font-sans text-sm font-semibold hover:bg-border transition-colors"
            >
              Muat 12 replay lagi
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
