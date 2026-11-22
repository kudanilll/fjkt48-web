"use client";

import { useState } from "react";
import {
  activeLiveStreams,
  liveReplaysList,
  type LiveStream,
} from "@/data/live-mock-data";
import LiveTicker from "@/components/home/live-ticker";
import LiveFeaturedPlayer from "@/components/live/live-featured-player";
import LiveSideList from "@/components/live/live-side-list";
import LiveEmptyStage from "@/components/live/live-empty-stage";
import LiveReplayArchive from "@/components/live/live-replay-archive";

export default function LivePage() {
  const [streams] = useState<LiveStream[]>(activeLiveStreams);
  const [selectedStream, setSelectedStream] = useState<LiveStream>(
    activeLiveStreams[0]!
  );

  const hasLive = streams.length > 0;

  return (
    <main className="min-h-screen bg-[#0B0A0C] text-[#F4EFEA]">
      {/* 1. Live Ticker */}
      <LiveTicker />

      {/* 2. Live Head Section */}
      <section className="relative overflow-hidden pt-12 pb-12 border-b border-[#1D1A1F]">
        {/* Spotlight Glow */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[820px] w-[1000px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(229,19,46,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="w-full px-6 sm:px-12 lg:px-16 relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="flex items-center gap-6 flex-wrap">
              <h1 className="font-display font-black text-7xl sm:text-9xl lg:text-[168px] leading-none tracking-[-0.04em] text-[#F4EFEA] uppercase">
                LIVE
              </h1>

              {hasLive && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5132E] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#E5132E]/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>{streams.length} LIVE SEKARANG</span>
                </div>
              )}
            </div>

            <div className="max-w-[468px] space-y-3">
              <p className="text-[17px] font-sans text-[#A8A0A3] leading-[26px]">
                Streaming Showroom dan IDN Live member JKT48. Tonton bareng fans
                lain, ngobrol di chat room, atau tonton arsip replay.
              </p>
              <p className="text-xs font-mono font-medium text-[#8A8286]">
                Auto-refresh tiap 30 detik · Sumber live API
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stage Zone */}
      <section className="py-12 sm:py-16">
        <div className="w-full px-6 sm:px-12 lg:px-16">
          {hasLive ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Featured Player Area */}
              <div className="lg:col-span-8">
                <LiveFeaturedPlayer stream={selectedStream} />
              </div>

              {/* Side List & Forum Link */}
              <div className="lg:col-span-4">
                <LiveSideList
                  streams={streams}
                  activeStreamId={selectedStream.id}
                  onSelectStream={(s) => setSelectedStream(s)}
                />
              </div>
            </div>
          ) : (
            <LiveEmptyStage />
          )}
        </div>
      </section>

      {/* 4. Replay Archive Section */}
      <LiveReplayArchive replays={liveReplaysList} />
    </main>
  );
}
