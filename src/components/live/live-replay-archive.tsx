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
      className="py-16 sm:py-24 border-t border-[#1D1A1F]"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-10">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-4xl sm:text-[56px] uppercase tracking-[-1px] text-[#F4EFEA] leading-none">
              REPLAY TERBARU
            </h2>
            <p className="text-base text-[#A8A0A3] font-sans">
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
                  ? "bg-[#F4EFEA] text-[#0B0A0C]"
                  : "bg-[#1D1A1F] text-[#F4EFEA] border border-[#F4EFEA]/10 hover:border-[#F4EFEA]/30"
              }`}
            >
              Semua ({counts.ALL})
            </button>
            <button
              type="button"
              onClick={() => setPlatformFilter("showroom")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                platformFilter === "showroom"
                  ? "bg-[#F4EFEA] text-[#0B0A0C] border-transparent"
                  : "bg-[#1D1A1F] text-[#F4EFEA] border-[#F4EFEA]/10 hover:border-[#F4EFEA]/30"
              }`}
            >
              Showroom ({counts.showroom})
            </button>
            <button
              type="button"
              onClick={() => setPlatformFilter("idn")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                platformFilter === "idn"
                  ? "bg-[#F4EFEA] text-[#0B0A0C] border-transparent"
                  : "bg-[#1D1A1F] text-[#F4EFEA] border-[#F4EFEA]/10 hover:border-[#F4EFEA]/30"
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
                className="group rounded-[14px] overflow-hidden bg-[#141215] hover:bg-[#1C181E] transition-all flex flex-col"
              >
                {/* Thumbnail with duration */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#1D1A1F]">
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
                          ? "bg-[#0B0A0C]/80 text-[#F4EFEA]"
                          : "bg-[#E5132E] text-white"
                      }`}
                    >
                      {isShowroom ? "Showroom" : "IDN Live"}
                    </span>
                  </div>

                  {/* Duration Badge Bottom-Right */}
                  <div className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-[#F4EFEA]">
                    {replay.duration}
                  </div>

                  {/* Hover Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-[#E5132E] text-white flex items-center justify-center shadow-lg">
                      <Play weight="fill" className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="font-sans font-semibold text-[15px] text-[#F4EFEA] block group-hover:text-[#FF4D5E] transition-colors">
                      {replay.memberNickname}
                    </span>
                    <p className="text-[13px] text-[#A8A0A3] line-clamp-2 leading-snug">
                      {replay.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#8A8286] pt-2 border-t border-[#1D1A1F]">
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
              className="px-7 py-3 rounded-full bg-[#1D1A1F] text-[#F4EFEA] font-sans text-sm font-semibold hover:bg-[#2B272D] transition-colors"
            >
              Muat 12 replay lagi
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
