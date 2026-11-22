"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowSquareOut, User, ChatCircle, Play } from "@phosphor-icons/react";
import { LiveBadge, PlatformBadge } from "@/components/ui/badge";
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
    viewers: "4.218",
    startedAt: "Dimulai 25m lalu",
    title: "Malam mingguan sambil ngobrol santai & spill cerita show teater",
    externalUrl: "https://www.showroom-live.com/r/JKT48_Gita",
  },
  {
    id: "stream-2",
    memberNickname: "marsha",
    memberName: "Marsha Lenathea",
    team: "Dream",
    platform: "IDN Live",
    viewers: "1.820",
    startedAt: "Dimulai 12m lalu",
    title: "QnA random bareng Marsha! Yuk merapat",
    externalUrl: "https://www.idn.app",
  },
];

export default function LiveStageSection() {
  const [selectedStreamId, setSelectedStreamId] = useState<string>("stream-1");
  const currentStream =
    activeStreams.find((s) => s.id === selectedStreamId) || activeStreams[0];

  return (
    <section
      className="stage w-full bg-[#0B0A0C] text-[#F4EFEA] py-20 sm:py-28 transition-colors duration-300"
      aria-label="Siaran langsung member JKT48 saat ini"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[#F4EFEA]/15">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-500 text-white text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>2 MEMBER LAGI LIVE</span>
              </span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-none">
              LAGI LIVE
            </h2>
            <p className="font-mono-data text-xs sm:text-sm text-[#A8A0A3] mt-2">
              Panggung streaming siaran langsung member JKT48 saat ini
            </p>
          </div>

          <Link
            href="/live"
            className="group inline-flex items-center gap-2 font-mono-data text-xs sm:text-sm font-semibold text-crimson-400 hover:text-crimson-500 transition-colors uppercase tracking-wider"
          >
            <span>Buka arsip replay live</span>
            <ArrowSquareOut weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        {/* Live Grid: Featured Player Container + Side Stream List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-start">
          {/* Featured Player Container (Spans 8 cols on desktop) */}
          <div className="lg:col-span-8 card bg-[#141215] rounded-3xl overflow-hidden p-6 sm:p-8 space-y-6 shadow-2xl shadow-black/50 border-none">
            {/* Player Viewport */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black/60 group">
              <Image
                src={`/members/${currentStream.memberNickname}.jpg`}
                alt={currentStream.memberName}
                fill
                className="object-cover object-top opacity-85 group-hover:scale-102 transition-transform duration-700"
              />

              {/* Spotlight Vignette and Floor Fade */}
              <div
                className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_40%] from-transparent via-[#0B0A0C]/40 to-[#0B0A0C]/90"
                aria-hidden="true"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <LiveBadge />
                  <PlatformBadge platform={currentStream.platform} />
                </div>
                <span className="font-mono-data text-xs bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white font-medium border border-white/10">
                  {currentStream.viewers} penonton
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <a
                href={currentStream.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center z-10"
                aria-label={`Tonton siaran langsung ${currentStream.memberName}`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-crimson-600/90 text-white flex items-center justify-center shadow-xl shadow-crimson-600/40 transition-transform duration-200 group-hover:scale-110">
                  <Play weight="fill" className="w-7 h-7 sm:w-9 sm:h-9 ml-1" />
                </div>
              </a>

              {/* Bottom Stream Title */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="font-sans text-sm sm:text-base font-semibold text-white drop-shadow-md line-clamp-1">
                  {currentStream.title}
                </p>
                <p className="font-mono-data text-xs text-[#FFE7CC] mt-0.5">
                  {currentStream.startedAt}
                </p>
              </div>
            </div>

            {/* Member Details & CTAs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F4EFEA]">
                  {currentStream.memberName}
                </h3>
                <p className="font-mono-data text-xs text-crimson-400 font-semibold tracking-wider uppercase">
                  Team {currentStream.team} · Siaran Resmi
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
                  <ArrowSquareOut weight="bold" className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Streaming Disclaimer */}
            <p className="font-mono-data text-xs text-[#8A8286] pt-3 border-t border-[#F4EFEA]/10">
              * Siaran streaming disiarkan langsung melalui platform resmi
              penyedia. Untuk berdiskusi dengan fans lain, silakan masuk ke Blok
              C Forum.
            </p>
          </div>

          {/* Side Stream List (Spans 4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono-data text-xs font-semibold uppercase tracking-wider text-[#A8A0A3] mb-2">
              PILIH SIARAN LAINNYA
            </h4>

            {activeStreams.map((stream) => {
              const isSelected = stream.id === selectedStreamId;
              return (
                <div
                  key={stream.id}
                  onClick={() => setSelectedStreamId(stream.id)}
                  className={`card cursor-pointer p-4 rounded-2xl transition-all duration-200 flex items-center gap-4 ${
                    isSelected
                      ? "bg-[#3A0710] border-none shadow-lg shadow-crimson-900/40"
                      : "bg-[#141215] hover:bg-[#1D1A1F] border-none"
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-crimson-500/40">
                    <Image
                      src={`/members/${stream.memberNickname}.jpg`}
                      alt={stream.memberName}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <PlatformBadge platform={stream.platform} />
                      {isSelected && (
                        <span className="font-mono-data text-[10px] text-[#FFE7CC] uppercase font-bold">
                          Sedang diputar
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-sm text-[#F4EFEA] truncate">
                      {stream.memberName}
                    </p>
                    <p className="font-mono-data text-xs text-[#A8A0A3]">
                      {stream.viewers} penonton
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Discussion CTA Card */}
            <div className="card p-6 rounded-2xl bg-[#141215] border-none space-y-3 mt-6">
              <div className="flex items-center gap-2 text-crimson-400">
                <ChatCircle weight="fill" className="w-5 h-5" />
                <span className="font-mono-data text-xs font-bold uppercase tracking-wider">
                  RUANG DISKUSI LIVE
                </span>
              </div>
              <h5 className="font-sans font-bold text-base text-[#F4EFEA]">
                Mau ngobrolin live ini bareng fans lain?
              </h5>
              <p className="text-xs text-[#A8A0A3] leading-relaxed">
                Gabung ke Blok C untuk saling berbagi klip menarik, momen lucu,
                dan reaksi real-time.
              </p>
              <Button
                href="/forum?block=live-streaming"
                variant="secondary"
                size="sm"
                className="w-full mt-2"
                showArrow
              >
                Buka Blok C Forum
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
