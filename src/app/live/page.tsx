"use client";

import { useState } from "react";
import { Radio } from "@phosphor-icons/react";
import {
  activeLiveStreams,
  liveReplaysList,
  type LiveStream,
} from "@/data/live-mock-data";
import LiveFeaturedPlayer from "@/components/live/live-featured-player";
import LiveSideList from "@/components/live/live-side-list";
import LiveEmptyStage from "@/components/live/live-empty-stage";
import LiveReplayArchive from "@/components/live/live-replay-archive";
import Footer from "@/components/layout/footer";

export default function LivePage() {
  const [streams] = useState<LiveStream[]>(activeLiveStreams);
  const [selectedStream, setSelectedStream] = useState<LiveStream>(
    activeLiveStreams[0]!
  );
  // Empty state simulation toggle (can be toggled for demo or if streams is empty)
  const [simulateEmpty, setSimulateEmpty] = useState<boolean>(false);

  const hasLive = streams.length > 0 && !simulateEmpty;

  return (
    <main className="min-h-screen bg-[var(--color-stage-950)] text-[var(--color-ink)]">
      {/* 1. Page Header */}
      <section className="pt-12 sm:pt-16 pb-8 border-b border-[var(--color-stage-800)] relative overflow-hidden">
        {/* Amber glow */}
        <div
          className="pointer-events-none absolute -top-40 right-10 h-[600px] w-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(229,19,46,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="w-full px-6 sm:px-12 lg:px-16 relative z-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)]">
                  Live Streaming Official
                </span>
                {hasLive ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-crimson-500)] text-white text-[11px] font-bold uppercase tracking-wider animate-pulse">
                    <Radio weight="fill" className="w-3 h-3" />
                    <span>{streams.length} Member Lagi Live</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-stage-900)] text-[var(--color-muted)] text-[11px] font-mono">
                    Panggung Kosong
                  </span>
                )}
              </div>

              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[var(--color-ink)]">
                Live
              </h1>

              <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-2xl mt-2 font-sans">
                Nonton langsung di platform resmi (Showroom / IDN Live). Di sini
                kamu bisa pantau siapa yang lagi live dan tonton arsip replay
                pertunjukan mereka.
              </p>
            </div>

            {/* Test toggle button for testing empty state preview */}
            <button
              type="button"
              onClick={() => setSimulateEmpty(!simulateEmpty)}
              className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-[var(--color-stage-900)] text-[var(--color-muted)] hover:text-[var(--color-ink)] self-start md:self-auto transition-colors border border-[var(--color-stage-800)]"
            >
              {simulateEmpty ? "Tampilkan Live Aktif" : "Uji Panggung Kosong"}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Stage Zone (Always forced dark mode) */}
      <section className="stage py-8 sm:py-12 md:py-16 bg-[var(--color-stage-950)] text-[var(--color-ink)]">
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

      {/* 3. Replay Archive Section */}
      <LiveReplayArchive replays={liveReplaysList} />

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}
