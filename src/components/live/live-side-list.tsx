"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import type { LiveStream } from "@/data/live-mock-data";

interface LiveSideListProps {
  streams: LiveStream[];
  activeStreamId: string;
  onSelectStream: (stream: LiveStream) => void;
}

export default function LiveSideList({
  streams,
  activeStreamId,
  onSelectStream,
}: LiveSideListProps) {
  return (
    <div className="space-y-4 w-full">
      {/* Eyebrow Label */}
      <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block">
        LAGI LIVE SEKARANG &bull; {streams.length}
      </span>

      {/* Stream list items */}
      <div className="space-y-3">
        {streams.map((stream) => {
          const isActive = stream.id === activeStreamId;
          const isShowroom = stream.platform === "showroom";

          return (
            <button
              key={stream.id}
              type="button"
              onClick={() => onSelectStream(stream)}
              className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center gap-3.5 ${
                isActive
                  ? "bg-[#3A0710] text-[var(--color-ink)] shadow-md"
                  : "bg-[var(--color-stage-900)] hover:bg-[var(--color-stage-850)] text-[var(--color-ink)]"
              }`}
            >
              {/* Member Avatar */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-none bg-[var(--color-stage-800)]">
                <Image
                  src={stream.memberPhoto}
                  alt={stream.memberName}
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 house-tint pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[var(--color-crimson-500)] border-2 border-[var(--color-stage-950)]" />
              </div>

              {/* Stream Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-xl uppercase tracking-tight truncate">
                    {stream.memberNickname}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                      isShowroom
                        ? "bg-[#333333] text-white"
                        : "bg-[#E5132E] text-white"
                    }`}
                  >
                    {stream.platform === "showroom" ? "Showroom" : "IDN Live"}
                  </span>
                </div>

                <p className="text-xs text-[var(--color-muted)] truncate font-sans mt-0.5">
                  {stream.title}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-muted)] mt-1">
                  <span className="text-[var(--color-crimson-400)] font-semibold">
                    {stream.viewers.toLocaleString("id-ID")} penonton
                  </span>
                  <span>&bull;</span>
                  <span>{stream.startedAt}</span>
                </div>
              </div>

              {/* Active Indicator Tag */}
              {isActive && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-crimson-500)] text-white font-bold flex-none">
                  Diputar
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Card Forum Link: Pointing to Blok C */}
      <div className="p-5 rounded-2xl bg-[var(--color-stage-900)] space-y-3">
        <h4 className="font-semibold text-base text-[var(--color-ink)]">
          Mau ngobrolin live ini?
        </h4>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-sans">
          Komentarnya di platform aslinya. Rangkuman dan obrolan panjang
          tempatnya di Blok C, Live Streaming.
        </p>
        <Link
          href="/forum?category=live-streaming"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-crimson-400)] hover:text-[var(--color-ink)] transition-colors pt-1"
        >
          <span>Ke Blok C, Live Streaming</span>
          <ArrowRight weight="bold" className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
