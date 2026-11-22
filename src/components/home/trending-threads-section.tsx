"use client";

import Link from "next/link";
import {
  ChatCircle,
  Eye,
  Flashlight,
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react";

interface HotThread {
  id: string;
  slug: string;
  block: string;
  tag: string;
  title: string;
  author: string;
  oshi: string;
  time: string;
  reactions: number;
  replies: number;
  views: string;
}

const hotThreads: HotThread[] = [
  {
    id: "1",
    slug: "cara-meminum-ramune-shonichi-review-unit-songs",
    block: "Blok A · Theater",
    tag: "Cara Meminum Ramune",
    title:
      "Review Shonichi Cara Meminum Ramune: blocking dan unit song baru yang bikin nagih!",
    author: "WotaKuningan",
    oshi: "Freya",
    time: "5m yang lalu",
    reactions: 42,
    replies: 64,
    views: "1.4k",
  },
  {
    id: "2",
    slug: "freya-graduation-rumor-timeline-analysis",
    block: "Blok B · Member",
    tag: "Freya",
    title: "Freya graduation rumor: bahasan fakta vs cocoklogi timeline sosmed",
    author: "PenlightMerah",
    oshi: "Freya",
    time: "18m yang lalu",
    reactions: 128,
    replies: 96,
    views: "3.2k",
  },
  {
    id: "3",
    slug: "gita-idn-live-theater-audition-stories",
    block: "Blok C · Live Streaming",
    tag: "Gita",
    title:
      "Gita IDN Live semalem seru banget pas cerita pengalaman audisi teater jaman dulu",
    author: "SukaNontonShowroom",
    oshi: "Gita",
    time: "42m yang lalu",
    reactions: 35,
    replies: 28,
    views: "980",
  },
  {
    id: "4",
    slug: "team-passion-new-original-setlist-leak",
    block: "Blok A · Theater",
    tag: "Team Passion",
    title:
      "Prediksi tanggal rilis setlist orisinal baru Team Passion: apa bocoran terbarunya?",
    author: "KaptenTeater",
    oshi: "Christy",
    time: "1j yang lalu",
    reactions: 56,
    replies: 44,
    views: "1.8k",
  },
  {
    id: "5",
    slug: "first-time-offline-2-shot-guide-and-tips",
    block: "Blok D · Event & MnG",
    tag: "2-Shot",
    title:
      "Tips dan panduan ikut 2-Shot offline pertama kali: persiapan antrean dan pose",
    author: "TeaterHunter",
    oshi: "Marsha",
    time: "2j yang lalu",
    reactions: 89,
    replies: 52,
    views: "2.5k",
  },
];

export default function TrendingThreadsSection() {
  return (
    <section
      className="w-full bg-(--bg) text-(--ink) py-20 sm:py-28 transition-colors duration-300"
      aria-label="Thread forum terhangat"
    >
      <div className="mx-auto max-w-360 px-6 sm:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-(--line)">
          <div>
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-none">
              LAGI RAME
            </h2>
            <p className="font-mono-data text-xs sm:text-sm text-muted mt-2">
              Diskusi paling aktif 24 jam terakhir di seluruh blok
            </p>
          </div>

          <Link
            href="/forum"
            className="group inline-flex items-center gap-2 font-mono-data text-xs sm:text-sm font-semibold text-crimson-400 hover:text-crimson-500 transition-colors uppercase tracking-wider"
          >
            <span>Buka semua thread</span>
            <ArrowRight
              weight="bold"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Thread Rows List */}
        <div className="divide-y divide-(--line)">
          {hotThreads.map((thread) => (
            <Link
              key={thread.id}
              href={`/forum/${thread.slug}`}
              className="group block py-6 sm:py-8 transition-all duration-200 hover:bg-(--surface)/50 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Tag + Title + Author info */}
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-crimson-500/15 text-crimson-400 font-semibold border border-crimson-500/30">
                      {thread.block}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface text-muted font-medium border border-border">
                      #{thread.tag}
                    </span>
                  </div>

                  <h3 className="font-sans font-semibold text-lg sm:text-xl md:text-2xl text-(--ink) group-hover:text-crimson-400 group-hover:translate-x-1 transition-all duration-200 leading-snug">
                    {thread.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-muted font-mono-data flex-wrap">
                    <span className="font-medium text-(--ink)">
                      {thread.author}
                    </span>
                    <span>·</span>
                    <span className="text-crimson-400 font-semibold">
                      ❤ Oshi: {thread.oshi}
                    </span>
                    <span>·</span>
                    <span>{thread.time}</span>
                  </div>
                </div>

                {/* Right: Stats Counter (Reactions, Replies, Views) + Arrow */}
                <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 shrink-0 font-mono-data text-xs text-muted">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex items-center gap-1.5 hover:text-crimson-400 transition-colors"
                      title="Lightstick reactions"
                    >
                      <Flashlight
                        weight="fill"
                        className="w-4 h-4 text-crimson-400"
                      />
                      <span>{thread.reactions}</span>
                    </div>

                    <div
                      className="flex items-center gap-1.5 hover:text-(--ink) transition-colors"
                      title="Balasan"
                    >
                      <ChatCircle weight="bold" className="w-4 h-4" />
                      <span>{thread.replies}</span>
                    </div>

                    <div
                      className="hidden sm:flex items-center gap-1.5"
                      title="Views"
                    >
                      <Eye weight="bold" className="w-4 h-4 opacity-75" />
                      <span>{thread.views}</span>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted group-hover:bg-crimson-500 group-hover:text-white group-hover:border-crimson-500 transition-all duration-200">
                    <ArrowUpRight weight="bold" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
