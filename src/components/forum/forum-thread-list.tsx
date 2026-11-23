"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlass,
  ChatCircle,
  Eye,
  Flashlight,
  ArrowUpRight,
} from "@phosphor-icons/react";
import type { ForumThread } from "@/data/forum-mock-data";

interface ForumThreadListProps {
  threads: ForumThread[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeSort: "latest" | "popular" | "unanswered";
  onSortChange: (sort: "latest" | "popular" | "unanswered") => void;
}

// FigCraft Exact Threads for Forum / Desktop 1440
const figcraftPinnedThread = {
  id: "pinned-1",
  slug: "baca-dulu-aturan-tiap-blok-spoiler-setlist",
  repliesCount: 42,
  category: "Obrolan Bebas",
  title: "Baca dulu: aturan tiap blok, spoiler setlist, dan cara tag member",
  author: "admin.fjkt48",
  authorRole: "pengurus forum · disematkan",
  reactions: 512,
  views: "18,4rb",
};

const figcraftForumThreads = [
  {
    id: "f-1",
    slug: "spoiler-mc-birthday-show-besok",
    repliesCount: 12,
    category: "Theater & Setlist",
    memberNickname: "christy",
    memberName: "Christy",
    tag: "Pertaruhan Cinta",
    title: "Spoiler MC birthday show besok? Tulis tebakan kalian di sini",
    author: "anakfx",
    oshi: "Christy",
    time: "2 menit lalu",
    reactions: 31,
    views: "402",
  },
  {
    id: "f-2",
    slug: "marsha-baru-mulai-live-di-idn",
    repliesCount: 23,
    category: "Live Streaming",
    memberNickname: "marsha",
    memberName: "Marsha",
    title:
      "Marsha baru mulai live di IDN, katanya mau spill lagu favorit di setlist baru",
    author: "marshmallow48",
    oshi: "Marsha",
    time: "6 menit lalu",
    reactions: 88,
    views: "1,1rb",
  },
  {
    id: "f-3",
    slug: "kathrina-makin-jago-mc",
    repliesCount: 37,
    category: "Member & Oshi",
    memberNickname: "kathrina",
    memberName: "Kathrina",
    title: "Kathrina makin jago MC. Momen favorit kalian dari bulan ini apa?",
    author: "kathrinaholic",
    oshi: "Kathrina",
    time: "14 menit lalu",
    reactions: 120,
    views: "1,6rb",
  },
  {
    id: "f-4",
    slug: "pre-order-photobook-the-smile-collection",
    repliesCount: 19,
    category: "Merch & Koleksi",
    memberNickname: "fiony",
    memberName: "Fiony",
    tag: "The Smile Collection",
    title:
      "Pre-order photobook The Smile Collection udah dibuka. Ada yang mau patungan ongkir?",
    author: "lightstickpink",
    oshi: "Fiony",
    time: "21 menit lalu",
    reactions: 54,
    views: "760",
  },
  {
    id: "f-5",
    slug: "2-shot-mini-tour-sleman-tanggal-28",
    repliesCount: 26,
    category: "Event, MnG & VC",
    memberNickname: "gita",
    memberName: "Gita",
    tag: "Mini Tour Sleman",
    title: "2-Shot Mini Tour Sleman tanggal 28. Ada rombongan dari Jakarta?",
    author: "jalanjalan48",
    oshi: "Gita",
    time: "38 menit lalu",
    reactions: 73,
    views: "980",
  },
  {
    id: "f-6",
    slug: "lineup-pajama-drive-trainee-kemarin",
    repliesCount: 64,
    category: "Theater & Setlist",
    memberNickname: "fera",
    memberName: "Fera",
    tag: "Pajama Drive",
    title:
      "Lineup Pajama Drive trainee kemarin seger banget. Siapa yang paling bikin kaget?",
    author: "penlightmerah",
    oshi: "Fera",
    time: "1 jam lalu",
    reactions: 156,
    views: "2,2rb",
  },
  {
    id: "f-7",
    slug: "pertama-kali-nonton-theater-minggu-depan",
    repliesCount: 48,
    category: "Obrolan Bebas",
    title:
      "Pertama kali nonton theater minggu depan. Tips buat yang belum pernah?",
    author: "wotabaru",
    oshi: "belum punya oshi",
    time: "2 jam lalu",
    reactions: 97,
    views: "1,3rb",
  },
  {
    id: "f-8",
    slug: "jikoshokai-freya-versi-terbaru",
    repliesCount: 31,
    category: "Member & Oshi",
    memberNickname: "freya",
    memberName: "Freya",
    title: "Jikoshokai Freya versi terbaru, ada yang udah hafal?",
    author: "freyanation",
    oshi: "Freya",
    time: "3 jam lalu",
    reactions: 140,
    views: "1,8rb",
  },
];

export default function ForumThreadList(props: ForumThreadListProps) {
  const { searchQuery, onSearchChange, activeSort, onSortChange } = props;
  const [reactedIds, setReactedIds] = useState<Record<string, boolean>>({});

  const toggleReaction = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setReactedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full space-y-6">
      {/* Toolbar: Sort Tabs on Left, Search Input on Right (FigCraft ID: 2555) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Sort Tabs */}
        <div className="flex items-center gap-2">
          {[
            { id: "latest", label: "Terbaru" },
            { id: "popular", label: "Terpopuler" },
            { id: "unanswered", label: "Belum dibalas" },
          ].map((tab) => {
            const isActive = activeSort === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  onSortChange(tab.id as "latest" | "popular" | "unanswered")
                }
                className={`px-4 py-2 rounded-full font-sans text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-raised text-white border border-border"
                    : "bg-transparent text-muted border border-border hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Input with shortcut hint */}
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass
            weight="bold"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari thread, member, setlist"
            className="w-full h-10 pl-10 pr-8 rounded-full bg-surface border border-border text-xs text-ink placeholder:text-subtle focus:outline-none focus:border-crimson-500 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono-data text-xs text-muted/60 pointer-events-none">
            /
          </span>
        </div>
      </div>

      {/* DISEMATKAN (Pinned Section) */}
      <div className="pt-2">
        <span className="font-mono-data text-xs font-bold text-crimson-400 tracking-wider uppercase block mb-3">
          DISEMATKAN
        </span>

        <Link
          href={`/forum/${figcraftPinnedThread.slug}`}
          className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 px-4 -mx-4 rounded-xl transition-all duration-200 hover:bg-surface/60 border-b border-[var(--line)]"
        >
          {/* Big Reply Count */}
          <div className="w-16 shrink-0 flex flex-col items-start justify-center">
            <span className="font-display font-black text-4xl text-ink leading-none tracking-tight">
              {figcraftPinnedThread.repliesCount}
            </span>
            <span className="font-sans text-xs font-medium text-muted mt-0.5">
              balasan
            </span>
          </div>

          {/* Center Info */}
          <div className="space-y-2 flex-1 min-w-0">
            <span className="inline-flex items-center gap-1 font-mono-data text-xs text-crimson-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
              <span>{figcraftPinnedThread.category}</span>
            </span>

            <h3 className="font-sans font-semibold text-lg text-ink group-hover:text-crimson-400 transition-colors leading-snug">
              {figcraftPinnedThread.title}
            </h3>

            <div className="flex items-center gap-2 font-sans text-xs text-muted">
              <div className="w-5 h-5 rounded-full bg-crimson-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                A
              </div>
              <span className="font-semibold text-ink">
                {figcraftPinnedThread.author}
              </span>
              <span>{figcraftPinnedThread.authorRole}</span>
            </div>
          </div>

          {/* Right Stats */}
          <div className="flex items-center gap-5 shrink-0 font-mono-data text-xs text-muted">
            <div className="flex items-center gap-1.5 text-crimson-400">
              <Flashlight weight="fill" className="w-4 h-4 text-crimson-500" />
              <span>{figcraftPinnedThread.reactions}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye weight="bold" className="w-4 h-4" />
              <span>{figcraftPinnedThread.views}</span>
            </div>
            <ArrowUpRight weight="bold" className="w-4 h-4 text-ink" />
          </div>
        </Link>
      </div>

      {/* SEMUA BLOK · TERBARU Subheader */}
      <div className="pt-4">
        <span className="font-mono-data text-xs font-medium text-muted uppercase tracking-wider block mb-2">
          SEMUA BLOK · TERBARU
        </span>

        {/* Regular Threads List */}
        <div className="divide-y divide-raised">
          {figcraftForumThreads.map((thread) => {
            const hasReacted = reactedIds[thread.id];
            const reactionCount = thread.reactions + (hasReacted ? 1 : 0);

            return (
              <Link
                key={thread.id}
                href={`/forum/${thread.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 px-4 -mx-4 rounded-xl transition-all duration-200 hover:bg-surface/60"
              >
                {/* Big Reply Count */}
                <div className="w-16 shrink-0 flex flex-col items-start justify-center">
                  <span className="font-display font-black text-4xl text-ink leading-none tracking-tight">
                    {thread.repliesCount}
                  </span>
                  <span className="font-sans text-xs font-medium text-muted mt-0.5">
                    balasan
                  </span>
                </div>

                {/* Center: Tags + Title + Author info */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="inline-flex items-center gap-1 font-mono-data text-xs text-crimson-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                      <span>{thread.category}</span>
                    </span>

                    {thread.memberNickname && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-raised text-ink border border-border text-xs">
                        <span className="relative w-3.5 h-3.5 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={`/members/${thread.memberNickname}.jpg`}
                            alt={thread.memberName || ""}
                            fill
                            className="object-cover"
                          />
                        </span>
                        <span>{thread.memberName}</span>
                      </span>
                    )}

                    {thread.tag && (
                      <span className="px-2.5 py-0.5 rounded-full bg-raised text-muted border border-border text-xs">
                        {thread.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="font-sans font-semibold text-lg text-ink group-hover:text-crimson-400 transition-colors leading-snug">
                    {thread.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-muted font-sans flex-wrap">
                    <div className="w-4 h-4 rounded-full bg-raised border border-border flex items-center justify-center text-[9px] font-bold text-ink shrink-0">
                      {thread.author.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="font-medium text-ink">
                      {thread.author}
                    </span>
                    <span>·</span>
                    <span className="text-muted">
                      {thread.oshi.startsWith("belum")
                        ? thread.oshi
                        : `oshi ${thread.oshi}`}
                    </span>
                    <span>·</span>
                    <span>{thread.time}</span>
                  </div>
                </div>

                {/* Right: Stats Counter (Reactions, Views) + Arrow */}
                <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 font-mono-data text-xs text-muted">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={(e) => toggleReaction(e, thread.id)}
                      className="flex items-center gap-1.5 text-crimson-400 font-medium cursor-pointer"
                      title="Lightstick"
                    >
                      <Flashlight
                        weight="fill"
                        className="w-4 h-4 text-crimson-500"
                      />
                      <span>{reactionCount}</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-muted">
                      <ChatCircle weight="bold" className="w-4 h-4" />
                      <span>{thread.views}</span>
                    </div>
                  </div>

                  <ArrowUpRight
                    weight="bold"
                    className="w-4 h-4 text-ink group-hover:text-crimson-400 transition-colors"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Counter & Load More (FigCraft: 9 dari 7.488 thread, Muat 20 thread lagi) */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--line)]">
        <span className="font-mono-data text-xs text-muted">
          9 dari 7.488 thread
        </span>

        <button
          type="button"
          className="px-6 py-2.5 rounded-full border border-border bg-surface text-xs font-sans font-semibold text-ink hover:bg-raised hover:border-border transition-all cursor-pointer"
        >
          Muat 20 thread lagi
        </button>
      </div>
    </div>
  );
}
