"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flashlight,
  ChatCircle,
  BookmarkSimple,
  ShareNetwork,
  ArrowBendDownRight,
  Check,
  Bell,
  CaretRight,
} from "@phosphor-icons/react";
import type { ForumThread, ForumReply } from "@/data/forum-mock-data";
import ReplyComposer from "@/components/forum/reply-composer";

interface ThreadDetailMainProps {
  thread: ForumThread;
}

export default function ThreadDetailMain({ thread }: ThreadDetailMainProps) {
  const [hasReacted, setHasReacted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [replies, setReplies] = useState<ForumReply[]>(thread.replies);
  const [activeReplySort, setActiveReplySort] = useState<
    "oldest" | "newest" | "top"
  >("oldest");
  const composerRef = useRef<HTMLDivElement>(null);

  const displayReactions = thread.reactions + (hasReacted ? 1 : 0);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddReply = (text: string) => {
    const newReply: ForumReply = {
      id: `r-new-${Date.now()}`,
      author: {
        name: "PenlightMerah",
        avatar: "/members/freya.jpg",
        oshi: "Freya",
      },
      createdAt: "Baru saja",
      content: text,
      reactions: 0,
    };
    setReplies((prev) => [newReply, ...prev]);
  };

  const scrollToComposer = () => {
    composerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono-data text-[var(--muted)]"
      >
        <Link
          href="/forum"
          className="hover:text-[var(--ink)] transition-colors"
        >
          Forum
        </Link>
        <CaretRight weight="bold" className="w-3 h-3 text-[var(--subtle)]" />
        <Link
          href={`/forum?block=${thread.categorySlug}`}
          className="text-crimson-400 font-semibold hover:underline"
        >
          {thread.categoryName}
        </Link>
        <CaretRight weight="bold" className="w-3 h-3 text-[var(--subtle)]" />
        <span className="text-[var(--subtle)] truncate max-w-[200px] sm:max-w-none">
          Thread #{thread.id}
        </span>
      </nav>

      {/* 2. Header & Title Section */}
      <div className="space-y-4">
        {/* Category & Topic Tags */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="px-3 py-1 rounded-full bg-crimson-500/15 text-crimson-400 font-semibold border border-crimson-500/30">
            {thread.categoryName}
          </span>
          {thread.tags.map((tag) => (
            <span
              key={tag.slug}
              className="px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--muted)] font-medium border border-[var(--border)]"
            >
              #{tag.label}
            </span>
          ))}
        </div>

        {/* Thread Title (Strict rule: user content never in display font) */}
        <h1 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight">
          {thread.title}
        </h1>

        {/* Author Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 pb-6 border-b border-[var(--line)]">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-[var(--border)]">
              <Image
                src={thread.author.avatar}
                alt={thread.author.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[var(--ink)]">
                  {thread.author.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#7A0B1A] text-pink-200 text-[10px] font-semibold border border-pink-500/30">
                  ❤ Oshi: {thread.author.oshi}
                </span>
              </div>
              <p className="font-mono-data text-xs text-[var(--muted)] mt-0.5">
                {thread.createdAt} · {thread.views} tayangan
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFollowing((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer self-start sm:self-auto ${
              isFollowing
                ? "bg-crimson-500 text-white border-crimson-500"
                : "bg-[var(--surface)] border-[var(--border)] text-[var(--ink)] hover:border-crimson-500"
            }`}
          >
            <Bell
              weight={isFollowing ? "fill" : "bold"}
              className="w-3.5 h-3.5"
            />
            <span>{isFollowing ? "Mengikuti" : "Ikuti thread"}</span>
          </button>
        </div>
      </div>

      {/* 3. Opening Post (OP) on Reading Surface (§7.3) */}
      <article className="card p-6 sm:p-10 rounded-3xl bg-[var(--raised)] border-none shadow-sm space-y-8">
        {/* Post Content Body */}
        <div className="prose prose-invert max-w-[68ch] space-y-5 text-base sm:text-lg leading-[1.8] text-[var(--ink)]">
          {thread.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Reaction & Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--line)]">
          {/* Lightstick Button */}
          <button
            type="button"
            onClick={() => setHasReacted((prev) => !prev)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
              hasReacted
                ? "bg-crimson-500 text-white shadow-lg shadow-crimson-500/30 scale-105"
                : "bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] hover:border-crimson-500 hover:text-crimson-400"
            }`}
          >
            <Flashlight
              weight="fill"
              className={`w-4 h-4 ${hasReacted ? "text-white" : "text-crimson-400"}`}
            />
            <span>Nyalakan Lightstick</span>
            <span className="font-mono-data text-xs pl-1">
              ({displayReactions})
            </span>
          </button>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollToComposer}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--bg)] transition-colors cursor-pointer"
            >
              <ChatCircle weight="bold" className="w-4 h-4" />
              <span>Balas</span>
            </button>

            <button
              type="button"
              onClick={() => setIsBookmarked((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                isBookmarked
                  ? "bg-crimson-500/15 border-crimson-500 text-crimson-400 font-bold"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--ink)] hover:bg-[var(--bg)]"
              }`}
            >
              <BookmarkSimple
                weight={isBookmarked ? "fill" : "bold"}
                className="w-4 h-4"
              />
              <span>{isBookmarked ? "Tersimpan" : "Simpan"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)] hover:bg-[var(--bg)] transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check weight="bold" className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <ShareNetwork weight="bold" className="w-4 h-4" />
                  <span>Salin link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* 4. Replies Section */}
      <div className="space-y-6 pt-4">
        {/* Replies Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--line)]">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-[var(--ink)]">
              {replies.length} BALASAN
            </h2>
            <span className="font-mono-data text-xs text-[var(--muted)]">
              Diskusi komunitas
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono-data">
            <button
              type="button"
              onClick={() => setActiveReplySort("oldest")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeReplySort === "oldest"
                  ? "text-crimson-400 font-bold"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              Terlama
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveReplySort("newest")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeReplySort === "newest"
                  ? "text-crimson-400 font-bold"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              Terbaru
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveReplySort("top")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeReplySort === "top"
                  ? "text-crimson-400 font-bold"
                  : "text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              Lightstick terbanyak
            </button>
          </div>
        </div>

        {/* Inline Reply Composer */}
        <div ref={composerRef}>
          <ReplyComposer onSubmitReply={handleAddReply} />
        </div>

        {/* Replies List */}
        <div className="space-y-6 pt-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-sm"
            >
              {/* Reply Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-neutral-800 shrink-0">
                    <Image
                      src={reply.author.avatar}
                      alt={reply.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[var(--ink)]">
                        {reply.author.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#7A0B1A] text-pink-200 text-[10px] font-semibold">
                        ❤ {reply.author.oshi}
                      </span>
                    </div>
                    <span className="font-mono-data text-xs text-[var(--muted)]">
                      {reply.createdAt}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-mono-data text-[var(--muted)] hover:text-crimson-400 transition-colors"
                >
                  <Flashlight
                    weight="fill"
                    className="w-3.5 h-3.5 text-crimson-400"
                  />
                  <span>{reply.reactions}</span>
                </button>
              </div>

              {/* Reply Body */}
              <p className="text-sm sm:text-base text-[var(--ink)] leading-relaxed">
                {reply.content}
              </p>

              {/* Nested Reply (Level 1 Indent) */}
              {reply.replies && reply.replies.length > 0 && (
                <div className="pl-4 sm:pl-6 border-l-2 border-crimson-500/40 space-y-4 pt-2 mt-4">
                  {reply.replies.map((nested) => (
                    <div key={nested.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <ArrowBendDownRight
                          weight="bold"
                          className="w-3.5 h-3.5 text-crimson-400"
                        />
                        <span className="font-semibold text-xs text-[var(--ink)]">
                          {nested.author.name}
                        </span>
                        <span className="font-mono-data text-[11px] text-[var(--muted)]">
                          · {nested.createdAt}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed pl-5">
                        {nested.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
