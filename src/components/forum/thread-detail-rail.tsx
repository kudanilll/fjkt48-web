"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Ticket, ChatsCircle } from "@phosphor-icons/react";
import { TeamBadge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { forumThreads } from "@/data/forum-mock-data";

interface ThreadDetailRailProps {
  memberNickname?: string;
}

export default function ThreadDetailRail({
  memberNickname = "freya",
}: ThreadDetailRailProps) {
  // Related threads (other threads from list)
  const relatedThreads = forumThreads.slice(1, 4);

  return (
    <aside className="w-full space-y-6" aria-label="Informasi terkait thread">
      {/* 1. Tagged Show Ticket Stub */}
      <div className="card p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-crimson-400 font-mono-data text-xs font-bold uppercase tracking-wider">
            <Ticket weight="fill" className="w-4 h-4" />
            <span>SHOW TERKAIT</span>
          </div>
          <span className="font-mono-data text-[10px] px-2 py-0.5 rounded-full bg-crimson-500 text-white font-bold uppercase">
            Teater
          </span>
        </div>

        <h3 className="font-display text-2xl font-black uppercase text-[var(--ink)] leading-tight">
          Cara Meminum Ramune
        </h3>

        <div className="space-y-1 font-mono-data text-xs text-[var(--muted)]">
          <p>Sabtu, 28 Nov 2026 · 14:00 WIB</p>
          <p>JKT48 Theater · fX Sudirman Lt. 4</p>
        </div>

        <div className="pt-2 flex items-center gap-2">
          <Button
            href="https://jkt48.com/theater/schedule"
            variant="primary"
            size="sm"
            className="w-full"
          >
            <span>Beli tiket show</span>
          </Button>
        </div>
      </div>

      {/* 2. Tagged Member Card */}
      <div className="card p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-[var(--ink)] font-mono-data text-xs font-bold uppercase tracking-wider pb-3 border-b border-[var(--line)]">
          <User weight="fill" className="w-4 h-4 text-crimson-500" />
          <span>MEMBER YANG DIBAHAS</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-800 shrink-0 border border-[var(--border)]">
            <Image
              src={`/members/${memberNickname}.jpg`}
              alt={memberNickname}
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-1 min-w-0">
            <TeamBadge team="PASSION" />
            <h4 className="font-display text-2xl font-black uppercase text-[var(--ink)] truncate">
              Freya Jayawardana
            </h4>
            <p className="font-mono-data text-xs text-[var(--muted)]">
              Generasi 7 · Nickname: Freya
            </p>
          </div>
        </div>

        <p className="text-xs text-[var(--muted)] italic leading-relaxed pt-1">
          &ldquo;Gadis koleris yang suka berimajinasi, terangi harimu dengan
          senyuman karamelku. Halo, aku Freya!&rdquo;
        </p>

        <Button
          href={`/member/${memberNickname}`}
          variant="secondary"
          size="sm"
          className="w-full mt-2"
          showArrow
        >
          Lihat profil lengkap
        </Button>
      </div>

      {/* 3. Related Threads */}
      <div className="card p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-[var(--ink)] font-mono-data text-xs font-bold uppercase tracking-wider pb-3 border-b border-[var(--line)]">
          <ChatsCircle weight="fill" className="w-4 h-4 text-crimson-500" />
          <span>DISKUSI TERKAIT</span>
        </div>

        <div className="divide-y divide-[var(--line)]">
          {relatedThreads.map((related) => (
            <Link
              key={related.id}
              href={`/forum/${related.slug}`}
              className="block py-3 hover:text-crimson-400 transition-colors group"
            >
              <h5 className="font-sans font-semibold text-xs sm:text-sm text-[var(--ink)] group-hover:text-crimson-400 line-clamp-2 leading-snug">
                {related.title}
              </h5>
              <div className="flex items-center gap-2 font-mono-data text-[11px] text-[var(--muted)] mt-1.5">
                <span>{related.author.name}</span>
                <span>·</span>
                <span>{related.repliesCount} balasan</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
