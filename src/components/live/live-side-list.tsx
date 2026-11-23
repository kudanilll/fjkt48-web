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
    <div className="space-y-6 w-full">
      {/* Eyebrow Label */}
      <span className="text-xs font-mono font-medium tracking-[1px] uppercase text-muted block">
        MEMBER YANG LAGI LIVE · {streams.length}
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
              className={`w-full text-left p-4 rounded-[14px] transition-all flex items-center gap-4 ${
                isActive
                  ? "bg-house-tint text-ink ring-1 ring-focus/40"
                  : "bg-surface hover:bg-raised text-ink"
              }`}
            >
              {/* Member Avatar */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-none bg-raised">
                <Image
                  src={stream.memberPhoto}
                  alt={stream.memberName}
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 house-tint pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-crimson-500 border-2 border-bg" />
              </div>

              {/* Stream Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-2xl uppercase tracking-tight truncate">
                    {stream.memberNickname}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      isShowroom
                        ? "bg-border text-ink"
                        : "bg-crimson-500 text-white"
                    }`}
                  >
                    {stream.platform === "showroom" ? "Showroom" : "IDN Live"}
                  </span>
                </div>

                <p className="text-xs text-muted truncate font-sans mt-0.5">
                  {stream.title}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-subtle mt-1">
                  <span className="text-accent font-medium">
                    ● {stream.viewers.toLocaleString("id-ID")} penonton
                  </span>
                  <span>·</span>
                  <span>{stream.startedAt}</span>
                </div>
              </div>

              {/* Active Indicator Tag */}
              {isActive && (
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-crimson-500 text-white font-bold flex-none">
                  Diputar
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mau ngobrolin live ini? (card-forum-link) */}
      <div className="p-6 rounded-[14px] bg-surface space-y-3.5">
        <h4 className="font-display font-extrabold text-2xl uppercase tracking-tight text-ink">
          Mau ngobrolin live ini?
        </h4>
        <p className="text-[13px] text-muted leading-relaxed font-sans">
          Komentarnya di platform aslinya. Rangkuman dan obrolan panjang
          tempatnya di Blok C, Live Streaming.
        </p>
        <Link
          href="/forum?category=live-streaming"
          className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-border text-ink text-[15px] font-semibold hover:bg-raised transition-colors"
        >
          <span>Buka Blok C</span>
          <ArrowRight weight="bold" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
