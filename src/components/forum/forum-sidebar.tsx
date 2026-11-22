"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Flame, Tag, Ticket, ArrowRight } from "@phosphor-icons/react";
import { topActiveFans, trendingTags } from "@/data/forum-mock-data";
import Button from "@/components/ui/button";

interface ForumSidebarProps {
  onSelectTag?: (tag: string) => void;
}

export default function ForumSidebar({ onSelectTag }: ForumSidebarProps) {
  return (
    <aside className="w-full space-y-6" aria-label="Sidebar komunitas">
      {/* 1. Compose CTA Card */}
      <div className="card p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border-none shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-crimson-400 font-mono-data text-xs font-bold uppercase tracking-wider">
          <Plus weight="bold" className="w-4 h-4" />
          <span>MULAI DISKUSI BARU</span>
        </div>

        <h2 className="font-sans font-bold text-xl text-[var(--ink)]">
          Punya topik show, oshi, atau info tiket?
        </h2>

        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Tulis thread baru dan diskusikan langsung bareng ribuan fans JKT48
          lainnya di blok pilihanmu.
        </p>

        <Button
          href="/forum/new"
          variant="primary"
          size="md"
          className="w-full mt-2"
          showArrow
        >
          Bikin thread sekarang
        </Button>
      </div>

      {/* 2. Top Active Fans */}
      <div className="card p-6 rounded-2xl bg-[var(--surface)] border-none shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
          <div className="flex items-center gap-2 text-[var(--ink)] font-mono-data text-xs font-bold uppercase tracking-wider">
            <Flame weight="fill" className="w-4 h-4 text-crimson-500" />
            <span>PALING AKTIF MINGGU INI</span>
          </div>
          <span className="font-mono-data text-[11px] text-[var(--muted)]">
            Top 3
          </span>
        </div>

        <div className="space-y-3">
          {topActiveFans.map((fan, idx) => (
            <div
              key={fan.name}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--raised)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono-data text-xs font-bold text-[var(--subtle)] w-4 text-center">
                  #{idx + 1}
                </span>

                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-neutral-800 shrink-0">
                  <Image
                    src={fan.avatar}
                    alt={fan.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="font-semibold text-xs text-[var(--ink)]">
                    {fan.name}
                  </p>
                  <p className="font-mono-data text-[11px] text-crimson-400">
                    Oshi: {fan.oshi}
                  </p>
                </div>
              </div>

              <div className="text-right font-mono-data text-[11px] text-[var(--muted)]">
                <span className="block font-bold text-[var(--ink)]">
                  {fan.lightsticksCount}
                </span>
                <span>lightstick</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Trending Tags */}
      <div className="card p-6 rounded-2xl bg-[var(--surface)] border-none shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[var(--ink)] font-mono-data text-xs font-bold uppercase tracking-wider pb-3 border-b border-[var(--line)]">
          <Tag weight="fill" className="w-4 h-4 text-crimson-500" />
          <span>TAG LAGI NAIK</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectTag?.(tag)}
              className="px-3 py-1.5 rounded-full bg-[var(--raised)] hover:bg-crimson-500/15 hover:text-crimson-400 text-xs font-mono-data text-[var(--muted)] transition-colors border border-[var(--border)] cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Upcoming Show Ticket Preview */}
      <div className="card p-6 rounded-2xl bg-[var(--surface)] border-none shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-crimson-400 font-mono-data text-xs font-bold uppercase tracking-wider">
            <Ticket weight="fill" className="w-4 h-4" />
            <span>SHOW TERDEKAT</span>
          </div>
          <span className="font-mono-data text-[10px] px-2 py-0.5 rounded-full bg-crimson-500 text-white font-bold uppercase">
            Malam ini
          </span>
        </div>

        <h3 className="font-display text-2xl font-black uppercase text-[var(--ink)] leading-tight">
          Aturan Anti Cinta
        </h3>

        <p className="font-mono-data text-xs text-[var(--muted)]">
          19:00 WIB · JKT48 Theater, fX Sudirman
        </p>

        <Link
          href="/schedule"
          className="inline-flex items-center gap-1 text-xs font-semibold text-crimson-400 hover:text-crimson-500 transition-colors pt-2 group"
        >
          <span>Beli tiket resmi</span>
          <ArrowRight
            weight="bold"
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </aside>
  );
}
