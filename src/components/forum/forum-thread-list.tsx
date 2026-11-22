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
  PushPin,
} from "@phosphor-icons/react";
import type { ForumThread } from "@/data/forum-mock-data";

interface ForumThreadListProps {
  threads: ForumThread[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeSort: "latest" | "popular" | "unanswered";
  onSortChange: (sort: "latest" | "popular" | "unanswered") => void;
}

export default function ForumThreadList({
  threads,
  searchQuery,
  onSearchChange,
  activeSort,
  onSortChange,
}: ForumThreadListProps) {
  // Local state for lightstick reactions
  const [reactedThreadIds, setReactedThreadIds] = useState<
    Record<string, boolean>
  >({});

  const toggleReaction = (e: React.MouseEvent, threadId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setReactedThreadIds((prev) => ({
      ...prev,
      [threadId]: !prev[threadId],
    }));
  };

  // Pinned threads vs regular threads
  const pinnedThreads = threads.filter((t) => t.isPinned);
  const regularThreads = threads.filter((t) => !t.isPinned);

  return (
    <div className="w-full space-y-6">
      {/* Toolbar: Search Bar + Sort Segmented Control */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
        {/* Search Input */}
        <div className="relative flex-1">
          <MagnifyingGlass
            weight="bold"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari thread, member, atau topik..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--subtle)] focus:outline-none"
          />
        </div>

        {/* Sort Segmented Control */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--bg)] shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => onSortChange("latest")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSort === "latest"
                ? "bg-[var(--raised)] text-[var(--ink)] shadow-sm font-semibold"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Terbaru
          </button>
          <button
            type="button"
            onClick={() => onSortChange("popular")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSort === "popular"
                ? "bg-[var(--raised)] text-[var(--ink)] shadow-sm font-semibold"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Terpopuler
          </button>
          <button
            type="button"
            onClick={() => onSortChange("unanswered")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSort === "unanswered"
                ? "bg-[var(--raised)] text-[var(--ink)] shadow-sm font-semibold"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Belum Dibalas
          </button>
        </div>
      </div>

      {/* Pinned Thread Notice */}
      {pinnedThreads.map((thread) => {
        const hasReacted = reactedThreadIds[thread.id];
        const displayReactions = thread.reactions + (hasReacted ? 1 : 0);

        return (
          <div
            key={`pinned-${thread.id}`}
            className="p-5 sm:p-6 rounded-2xl bg-crimson-950/20 border border-crimson-500/30 space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-mono-data text-crimson-400">
              <PushPin weight="fill" className="w-4 h-4" />
              <span className="font-bold uppercase tracking-wider">
                PINNED THREAD
              </span>
              <span>·</span>
              <span>{thread.categoryName}</span>
            </div>

            <Link href={`/forum/${thread.slug}`} className="block group">
              <h2 className="font-sans font-semibold text-xl sm:text-2xl text-[var(--ink)] group-hover:text-crimson-400 transition-colors leading-snug">
                {thread.title}
              </h2>
            </Link>

            <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono-data pt-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[var(--ink)]">
                  {thread.author.name}
                </span>
                <span>·</span>
                <span className="text-crimson-400">
                  ❤ Oshi: {thread.author.oshi}
                </span>
                <span>·</span>
                <span>{thread.createdAt}</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={(e) => toggleReaction(e, thread.id)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                    hasReacted
                      ? "text-crimson-400 font-bold"
                      : "hover:text-crimson-400"
                  }`}
                >
                  <Flashlight weight="fill" className="w-4 h-4" />
                  <span>{displayReactions}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <ChatCircle weight="bold" className="w-4 h-4" />
                  <span>{thread.repliesCount}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Regular Thread List */}
      <div className="divide-y divide-[var(--line)]">
        {regularThreads.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="font-display text-3xl font-black text-[var(--muted)]">
              TIDAK ADA THREAD YANG COCOK
            </p>
            <p className="text-sm text-[var(--subtle)]">
              Coba kata kunci pencarian lain atau pilih blok kategori lainnya.
            </p>
          </div>
        ) : (
          regularThreads.map((thread) => {
            const hasReacted = reactedThreadIds[thread.id];
            const displayReactions = thread.reactions + (hasReacted ? 1 : 0);

            return (
              <Link
                key={thread.id}
                href={`/forum/${thread.slug}`}
                className="group block py-6 sm:py-7 transition-all duration-200 hover:bg-[var(--surface)]/50 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Tags + Title + Author info */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-crimson-500/15 text-crimson-400 font-semibold border border-crimson-500/30">
                        {thread.categoryName}
                      </span>
                      {thread.tags.map((tag) => (
                        <span
                          key={tag.slug}
                          className="px-2.5 py-0.5 rounded-full bg-[var(--surface)] text-[var(--muted)] font-medium border border-[var(--border)]"
                        >
                          #{tag.label}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-sans font-semibold text-lg sm:text-xl text-[var(--ink)] group-hover:text-crimson-400 group-hover:translate-x-1 transition-all duration-200 leading-snug">
                      {thread.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-[var(--muted)] font-mono-data flex-wrap">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden bg-neutral-800 shrink-0">
                        <Image
                          src={thread.author.avatar}
                          alt={thread.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-[var(--ink)]">
                        {thread.author.name}
                      </span>
                      <span>·</span>
                      <span className="text-crimson-400 font-semibold">
                        ❤ Oshi: {thread.author.oshi}
                      </span>
                      <span>·</span>
                      <span>{thread.createdAt}</span>
                    </div>
                  </div>

                  {/* Right: Stats Counter (Reactions, Replies, Views) + Arrow */}
                  <div className="flex items-center justify-between md:justify-end gap-5 pt-2 md:pt-0 shrink-0 font-mono-data text-xs text-[var(--muted)]">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={(e) => toggleReaction(e, thread.id)}
                        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                          hasReacted
                            ? "text-crimson-400 font-bold"
                            : "hover:text-crimson-400"
                        }`}
                        title="Nyalakan lightstick"
                      >
                        <Flashlight
                          weight="fill"
                          className="w-4 h-4 text-crimson-400"
                        />
                        <span>{displayReactions}</span>
                      </button>

                      <div
                        className="flex items-center gap-1.5 hover:text-[var(--ink)] transition-colors"
                        title="Balasan"
                      >
                        <ChatCircle weight="bold" className="w-4 h-4" />
                        <span>{thread.repliesCount}</span>
                      </div>

                      <div
                        className="hidden sm:flex items-center gap-1.5"
                        title="Views"
                      >
                        <Eye weight="bold" className="w-4 h-4 opacity-75" />
                        <span>{thread.views}</span>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:bg-crimson-500 group-hover:text-white group-hover:border-crimson-500 transition-all duration-200">
                      <ArrowUpRight weight="bold" className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Pagination / Load More */}
      {regularThreads.length > 0 && (
        <div className="pt-8 text-center">
          <button
            type="button"
            className="px-6 py-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-mono-data uppercase font-semibold text-[var(--ink)] hover:bg-[var(--raised)] hover:border-crimson-500 transition-colors cursor-pointer"
          >
            Muat thread lainnya
          </button>
        </div>
      )}
    </div>
  );
}
