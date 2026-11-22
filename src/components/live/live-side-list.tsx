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
      <span className="text-xs font-mono font-medium tracking-[1px] uppercase text-[#A8A0A3] block">
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
                  ? "bg-[#3A0710] text-[#F4EFEA] ring-1 ring-[#FF4D5E]/40"
                  : "bg-[#141215] hover:bg-[#1D1A1F] text-[#F4EFEA]"
              }`}
            >
              {/* Member Avatar */}
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-none bg-[#1D1A1F]">
                <Image
                  src={stream.memberPhoto}
                  alt={stream.memberName}
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 house-tint pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#E5132E] border-2 border-[#0B0A0C]" />
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
                        ? "bg-[#2B272D] text-[#F4EFEA]"
                        : "bg-[#E5132E] text-white"
                    }`}
                  >
                    {stream.platform === "showroom" ? "Showroom" : "IDN Live"}
                  </span>
                </div>

                <p className="text-xs text-[#A8A0A3] truncate font-sans mt-0.5">
                  {stream.title}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-[#8A8286] mt-1">
                  <span className="text-[#FF4D5E] font-medium">
                    ● {stream.viewers.toLocaleString("id-ID")} penonton
                  </span>
                  <span>·</span>
                  <span>{stream.startedAt}</span>
                </div>
              </div>

              {/* Active Indicator Tag */}
              {isActive && (
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#E5132E] text-white font-bold flex-none">
                  Diputar
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Ruang Ngobrol Live Box */}
      <div className="p-6 rounded-[14px] bg-[#141215] space-y-3.5">
        <span className="text-xs font-mono font-medium tracking-[1px] uppercase text-[#FF4D5E] block">
          DISKUSI REAL-TIME
        </span>
        <h4 className="font-display font-extrabold text-2xl uppercase tracking-tight text-[#F4EFEA]">
          RUANG NGOBROL LIVE
        </h4>
        <p className="text-[13px] text-[#A8A0A3] leading-relaxed font-sans">
          Thread forum khusus untuk live yang lagi tayang. Ikut ngobrol bareng
          fans lain tanpa spamming di kolom komentar streamer.
        </p>
        <Link
          href="/forum?category=live-streaming"
          className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-[#E5132E] text-white text-[15px] font-semibold hover:bg-[#CC0E26] transition-colors"
        >
          <span>Masuk ke ruang chat forum</span>
          <ArrowRight weight="bold" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
