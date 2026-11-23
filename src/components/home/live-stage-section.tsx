"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, User } from "@phosphor-icons/react";
import Button from "@/components/ui/button";

interface LiveStream {
  id: string;
  memberNickname: string;
  memberName: string;
  team: string;
  platform: "SHOWROOM" | "IDN Live";
  viewers: string;
  startedAt: string;
  title: string;
  externalUrl: string;
}

const activeStreams: LiveStream[] = [
  {
    id: "stream-1",
    memberNickname: "gita",
    memberName: "Gita Sekar",
    team: "Dream",
    platform: "SHOWROOM",
    viewers: "2.418",
    startedAt: "Dimulai 38m lalu",
    title: "Malam mingguan sambil ngobrol santai & spill cerita show teater",
    externalUrl: "https://www.showroom-live.com/r/JKT48_Gita",
  },
  {
    id: "stream-2",
    memberNickname: "marsha",
    memberName: "Marsha Lenathea",
    team: "Dream",
    platform: "IDN Live",
    viewers: "3.186",
    startedAt: "Mulai 20:05 · sudah 15 menit",
    title: "Ngobrol santai weekend bareng Marsha",
    externalUrl: "https://www.idn.app",
  },
];

const replayList = [
  {
    id: "replay-1",
    memberNickname: "christy",
    title: "Christy - Showroom",
    time: "Kemarin, 21:12 · replay",
    duration: "01:23:45",
  },
  {
    id: "replay-2",
    memberNickname: "lulu",
    title: "Lulu - Showroom",
    time: "Kamis, 22:02 · replay",
    duration: "00:54:20",
  },
  {
    id: "replay-3",
    memberNickname: "oline",
    title: "Oline - IDN Live",
    time: "Kemarin, 19:30 · replay",
    duration: "01:10:15",
  },
];

export default function LiveStageSection() {
  const [selectedStreamId, setSelectedStreamId] = useState<string>("stream-1");
  const currentStream =
    activeStreams.find((s) => s.id === selectedStreamId) || activeStreams[0];

  return (
    <section
      className="stage w-full bg-bg text-ink py-20 sm:py-28 transition-colors duration-300"
      aria-label="Siaran langsung member JKT48 saat ini"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header (FigCraft ID: 1190) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10">
          <div className="space-y-3">
            <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[96px] tracking-tight uppercase leading-none flex items-center gap-4">
              <span className="w-4 h-4 rounded-full bg-crimson-500 shadow-[0_0_12px_rgba(229,19,46,0.9)]" />
              <span>LAGI LIVE</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-4 lg:gap-8 flex-1 max-w-2xl">
            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
              Showroom dan IDN Live dalam satu layar. Tanpa kolom komentar,
              tinggal nonton.
            </p>

            <Link
              href="/live"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-ink hover:text-crimson-400 transition-colors shrink-0"
            >
              <span>Semua live & replay</span>
              <ArrowUpRight weight="bold" className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Live Grid: Featured Player + Side Streams & Replay (FigCraft ID: 1200) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-start">
          {/* Main Featured Player (Spans 8 cols on desktop) - FigCraft ID: 1201 */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-[14px] overflow-hidden bg-surface shadow-2xl shadow-black/60 group">
              {/* Member Photo */}
              <Image
                src={`/members/${currentStream.memberNickname}.jpg`}
                alt={currentStream.memberName}
                fill
                className="object-cover object-top opacity-85 group-hover:scale-102 transition-transform duration-700"
              />

              {/* House tint multiply (#3A0710 at 50% opacity) */}
              <div
                className="pointer-events-none absolute inset-0 bg-house-tint mix-blend-multiply opacity-50"
                aria-hidden="true"
              />

              {/* Spotlight radial vignette and floor fade */}
              <div
                className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_40%] from-transparent via-bg/40 to-bg/90"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent"
                aria-hidden="true"
              />

              {/* Top Floating Badges */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-500 text-white font-sans text-xs font-bold tracking-wider uppercase shadow-md shadow-crimson-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>LIVE</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface/80 backdrop-blur-md text-muted font-sans text-xs font-semibold border border-white/10">
                    {currentStream.platform}
                  </span>
                </div>

                <span className="font-mono-data text-xs bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full text-white font-medium border border-white/10">
                  👥 {currentStream.viewers} penonton
                </span>
              </div>

              {/* Center Red Play Button */}
              <a
                href={currentStream.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center z-10"
                aria-label={`Tonton siaran langsung ${currentStream.memberName}`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-crimson-500 text-white flex items-center justify-center shadow-2xl shadow-crimson-500/50 transition-transform duration-200 group-hover:scale-110">
                  <Play weight="fill" className="w-7 h-7 sm:w-9 sm:h-9 ml-1" />
                </div>
              </a>

              {/* Bottom Video Overlay Info */}
              <div className="absolute bottom-5 left-5 right-5 z-10">
                <p className="font-sans text-base sm:text-lg font-semibold text-white drop-shadow-md">
                  {currentStream.title}
                </p>
                <p className="font-mono-data text-xs text-muted mt-1">
                  {currentStream.startedAt}
                </p>
              </div>
            </div>

            {/* Bottom Info Bar below Player */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-ink uppercase tracking-tight">
                  {currentStream.memberName}
                </h3>
                <p className="font-mono-data text-xs text-muted mt-0.5">
                  Team {currentStream.team} · mulai 19:42, sudah 38 menit
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  href={`/member/${currentStream.memberNickname}`}
                  variant="secondary"
                  size="md"
                >
                  <User weight="bold" className="w-4 h-4" />
                  <span>Profil</span>
                </Button>

                <a
                  href={currentStream.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-crimson-500/30"
                >
                  <span>Tonton di {currentStream.platform}</span>
                  <ArrowUpRight weight="bold" className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="font-mono-data text-xs text-subtle pt-3 border-t border-[var(--line)]">
              * Siaran streaming disiarkan langsung melalui platform resmi
              penyedia. Untuk berdiskusi dengan fans lain, silakan masuk ke Blok
              C Forum.
            </p>
          </div>

          {/* Right Column: Other Streams & Replay (Spans 4 cols on desktop) - FigCraft ID: 1222 */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-mono-data text-xs font-semibold uppercase tracking-wider text-muted">
              PILIH SIARAN LAINNYA
            </h4>

            {/* Active Stream Cards */}
            <div className="space-y-3">
              {activeStreams.map((stream) => {
                const isSelected = stream.id === selectedStreamId;
                return (
                  <div
                    key={stream.id}
                    onClick={() => setSelectedStreamId(stream.id)}
                    className={`cursor-pointer p-4 rounded-[14px] transition-all duration-200 flex items-center gap-4 border-none ${
                      isSelected
                        ? "bg-house-tint text-ink"
                        : "bg-surface hover:bg-raised text-ink"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={`/members/${stream.memberNickname}.jpg`}
                        alt={stream.memberName}
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                        <span className="font-mono-data text-[11px] font-semibold text-crimson-400 uppercase">
                          {stream.platform}
                        </span>
                      </div>
                      <p className="font-sans font-bold text-sm text-ink truncate">
                        {stream.memberName}
                      </p>
                      <p className="font-mono-data text-xs text-muted">
                        {stream.viewers} penonton
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mau ngobrolin live ini? (card-forum-link) */}
            <div className="p-6 rounded-[14px] bg-surface space-y-3 border-none">
              <h5 className="font-display font-extrabold text-2xl uppercase tracking-tight text-ink">
                Mau ngobrolin live ini?
              </h5>
              <p className="text-xs text-muted leading-relaxed">
                Komentarnya di platform aslinya. Rangkuman dan obrolan panjang
                tempatnya di Blok C, Live Streaming.
              </p>
              <Link
                href="/forum?category=live-streaming"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full border border-border text-ink text-sm font-semibold hover:bg-raised transition-colors mt-2"
              >
                <span>Buka Blok C</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" />
              </Link>
            </div>

            {/* Replay Terbaru Section (FigCraft ID: 1223) */}
            <div className="space-y-3 pt-2">
              <h5 className="font-sans font-semibold text-sm text-ink">
                Replay terbaru
              </h5>

              <div className="space-y-2.5">
                {replayList.map((rep) => (
                  <Link
                    key={rep.id}
                    href="/live"
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-surface hover:bg-raised transition-all duration-200 group"
                  >
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-neutral-900">
                      <Image
                        src={`/members/${rep.memberNickname}.jpg`}
                        alt={rep.title}
                        fill
                        className="object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1 right-1 px-1 rounded bg-black/80 font-mono-data text-[9px] text-white font-medium">
                        {rep.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-semibold text-xs text-ink group-hover:text-crimson-400 transition-colors truncate">
                        {rep.title}
                      </p>
                      <p className="font-mono-data text-[11px] text-muted truncate">
                        {rep.time}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
