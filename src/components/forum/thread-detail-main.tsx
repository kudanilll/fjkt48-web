"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  BookmarkSimple,
  ShareNetwork,
  Bell,
  CaretRight,
  Flame,
  Heart,
  Flashlight,
  ArrowRight,
} from "@phosphor-icons/react";
import type { ForumThread, ForumReply } from "@/data/forum-mock-data";

interface ThreadDetailMainProps {
  thread: ForumThread;
}

export default function ThreadDetailMain({ thread }: ThreadDetailMainProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const [hasHeart, setHasHeart] = useState(false);
  const [hasPenlight, setHasPenlight] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [replies, setReplies] = useState<ForumReply[]>(thread.replies);
  const [activeSort, setActiveSort] = useState<"oldest" | "newest">("oldest");
  const [newReplyText, setNewReplyText] = useState("");
  const composerRef = useRef<HTMLDivElement>(null);

  const flameCount = 87 + (hasLiked ? 1 : 0);
  const heartCount = 42 + (hasHeart ? 1 : 0);
  const penlightCount = 64 + (hasPenlight ? 1 : 0);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReplyText.trim()) return;

    const newReply: ForumReply = {
      id: `r-new-${Date.now()}`,
      author: {
        name: "PenlightMerah",
        avatar: "/members/freya.jpg",
        oshi: "Freya",
      },
      createdAt: "Baru saja",
      content: newReplyText.trim(),
      reactions: 0,
    };
    setReplies((prev) => [...prev, newReply]);
    setNewReplyText("");
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-mono text-[#A8A0A3]"
      >
        <Link href="/forum" className="hover:text-[#F4EFEA] transition-colors">
          Forum
        </Link>
        <CaretRight weight="bold" className="w-3.5 h-3.5 text-[#8A8286]" />
        <Link
          href={`/forum?block=${thread.categorySlug}`}
          className="text-[#FF4D5E] font-medium hover:underline"
        >
          {thread.categoryName}
        </Link>
        <CaretRight weight="bold" className="w-3.5 h-3.5 text-[#8A8286]" />
        <span className="text-[#8A8286] truncate max-w-[240px] sm:max-w-none">
          Thread #{thread.id}
        </span>
      </nav>

      {/* 2. Main Thread Card */}
      <div className="rounded-[14px] bg-[#141215] p-6 sm:p-8 space-y-6">
        {/* Category & Topic Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5132E]/20 text-[#FF4D5E] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D5E]" />
            {thread.categoryName}
          </span>
          {thread.tags.map((tag) => (
            <span
              key={tag.slug}
              className="px-3 py-1 rounded-full bg-[#1D1A1F] text-[#A8A0A3] font-mono text-xs border border-[#F4EFEA]/10"
            >
              #{tag.label}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-[#F4EFEA] leading-tight">
          {thread.title}
        </h1>

        {/* Author Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-6 border-b border-[#F4EFEA]/10">
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-[#FF4D5E] to-[#7A0B1A] flex items-center justify-center text-white font-mono text-xs font-bold flex-none">
              {thread.author.name.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#F4EFEA]">
                  {thread.author.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#7A0B1A] text-[#F4EFEA] text-[10px] font-mono font-medium">
                  Oshi: {thread.author.oshi}
                </span>
              </div>
              <p className="font-mono text-xs text-[#8A8286] mt-0.5">
                {thread.createdAt} · {thread.views} tayangan
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFollowing(!isFollowing)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all self-start sm:self-auto ${
              isFollowing
                ? "bg-[#E5132E] text-white"
                : "bg-[#1D1A1F] text-[#F4EFEA] border border-[#F4EFEA]/20 hover:border-[#F4EFEA]/40"
            }`}
          >
            <Bell
              weight={isFollowing ? "fill" : "bold"}
              className="w-3.5 h-3.5"
            />
            <span>{isFollowing ? "Mengikuti" : "Ikuti thread"}</span>
          </button>
        </div>

        {/* Post Content */}
        <div className="space-y-4 text-[16px] font-sans text-[#F4EFEA] leading-[27px] whitespace-pre-line">
          {thread.content}
        </div>

        {/* Reactions Toolbar */}
        <div className="pt-6 border-t border-[#F4EFEA]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setHasLiked(!hasLiked)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                hasLiked
                  ? "bg-[#E5132E] text-white shadow-md shadow-[#E5132E]/30"
                  : "bg-[#1D1A1F] text-[#A8A0A3] hover:text-[#F4EFEA]"
              }`}
            >
              <Flame weight="fill" className="w-4 h-4 text-[#FF4D5E]" />
              <span>{flameCount}</span>
            </button>

            <button
              type="button"
              onClick={() => setHasHeart(!hasHeart)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                hasHeart
                  ? "bg-[#E5132E] text-white shadow-md shadow-[#E5132E]/30"
                  : "bg-[#1D1A1F] text-[#A8A0A3] hover:text-[#F4EFEA]"
              }`}
            >
              <Heart weight="fill" className="w-4 h-4 text-[#FF4D5E]" />
              <span>{heartCount}</span>
            </button>

            <button
              type="button"
              onClick={() => setHasPenlight(!hasPenlight)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                hasPenlight
                  ? "bg-[#E5132E] text-white shadow-md shadow-[#E5132E]/30"
                  : "bg-[#1D1A1F] text-[#A8A0A3] hover:text-[#F4EFEA]"
              }`}
            >
              <Flashlight weight="fill" className="w-4 h-4 text-[#FFE7CC]" />
              <span>{penlightCount}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                isBookmarked
                  ? "bg-[#E5132E] text-white"
                  : "bg-[#1D1A1F] text-[#A8A0A3] hover:text-[#F4EFEA]"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-[#1D1A1F] text-[#A8A0A3] hover:text-[#F4EFEA] transition-all"
            >
              <ShareNetwork weight="bold" className="w-4 h-4" />
              <span>{copiedLink ? "Disalin!" : "Bagikan"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Replies Section */}
      <div className="space-y-6 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#F4EFEA]">
            {replies.length} BALASAN
          </h2>

          <div className="flex items-center gap-1 p-1 rounded-full bg-[#141215]">
            <button
              type="button"
              onClick={() => setActiveSort("oldest")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeSort === "oldest"
                  ? "bg-[#F4EFEA] text-[#0B0A0C]"
                  : "text-[#A8A0A3] hover:text-[#F4EFEA]"
              }`}
            >
              Terlama
            </button>
            <button
              type="button"
              onClick={() => setActiveSort("newest")}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeSort === "newest"
                  ? "bg-[#F4EFEA] text-[#0B0A0C]"
                  : "text-[#A8A0A3] hover:text-[#F4EFEA]"
              }`}
            >
              Terbaru
            </button>
          </div>
        </div>

        {/* Reply Composer Input */}
        <div
          ref={composerRef}
          className="rounded-[14px] bg-[#141215] p-5 sm:p-6 space-y-4"
        >
          <textarea
            rows={3}
            value={newReplyText}
            onChange={(e) => setNewReplyText(e.target.value)}
            placeholder="Tulis tanggapan atau analisa kamu..."
            className="w-full bg-[#0B0A0C] rounded-xl p-4 text-sm text-[#F4EFEA] placeholder-[#8A8286] focus:outline-none focus:ring-1 focus:ring-[#FF4D5E] transition-all resize-none"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8A8286]">
              Markdown didukung · Sopan dan hargai fans lain
            </span>

            <button
              type="button"
              onClick={handleAddReply}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E5132E] text-white text-sm font-semibold hover:bg-[#CC0E26] transition-colors"
            >
              <span>Kirim balasan</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Replies List */}
        <div className="space-y-4">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="p-5 sm:p-6 rounded-[14px] bg-[#141215] space-y-3 transition-colors hover:bg-[#1A181C]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#10B981] to-[#064E3B] flex items-center justify-center text-white font-mono text-xs font-bold">
                    {reply.author.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#F4EFEA]">
                        {reply.author.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1D1A1F] text-[#A8A0A3]">
                        Oshi: {reply.author.oshi}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono text-[#8A8286]">
                  {reply.createdAt}
                </span>
              </div>

              <p className="text-sm font-sans text-[#F4EFEA] leading-relaxed pl-11">
                {reply.content}
              </p>

              <div className="pl-11 pt-1 flex items-center gap-4 text-xs font-mono text-[#A8A0A3]">
                <button
                  type="button"
                  className="hover:text-[#FF4D5E] transition-colors"
                >
                  Suka ({reply.reactions})
                </button>
                <button
                  type="button"
                  className="hover:text-[#F4EFEA] transition-colors"
                >
                  Balas
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
