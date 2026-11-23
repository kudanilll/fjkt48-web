"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flashlight, Eye } from "@phosphor-icons/react";

interface HotThread {
  id: string;
  slug: string;
  repliesCount: number;
  category: string;
  categoryColor: string;
  memberNickname?: string;
  memberName?: string;
  tag?: string;
  title: string;
  author: string;
  oshi: string;
  time: string;
  reactions: number;
  views: string;
}

const hotThreads: HotThread[] = [
  {
    id: "1",
    slug: "encore-pajama-drive-semalam-pecah-banget",
    repliesCount: 128,
    category: "Teater & Setlist",
    categoryColor: "#FF4D5E",
    memberNickname: "fera",
    memberName: "Fera",
    tag: "Pajama Drive",
    title:
      "Encore Pajama Drive semalam pecah banget. Lagu apa yang bikin kalian merinding?",
    author: "pentightmerah",
    oshi: "Fera",
    time: "12 menit lalu",
    reactions: 342,
    views: "4.1rb",
  },
  {
    id: "2",
    slug: "baru-pulang-2-shot-mini-tour-lombok",
    repliesCount: 96,
    category: "Event, MnG & VC",
    categoryColor: "#FF4D5E",
    memberNickname: "kathrina",
    memberName: "Kathrina",
    tag: "Mini Tour Lombok",
    title:
      "Baru pulang 2-Shot Mini Tour Lombok. Tips biar nggak nge-blank pas giliran kita?",
    author: "senyumnyambok",
    oshi: "Kathrina",
    time: "34 menit lalu",
    reactions: 211,
    views: "2.7rb",
  },
  {
    id: "3",
    slug: "gita-lagi-live-bahas-photobook-the-smile-collection",
    repliesCount: 87,
    category: "Live Streaming",
    categoryColor: "#FF4D5E",
    memberNickname: "gita",
    memberName: "Gita",
    title:
      "Gita lagi live bahas photobook The Smile Collection. Ada yang udah pre-order?",
    author: "kaprigita",
    oshi: "Gita",
    time: "5 menit lalu",
    reactions: 190,
    views: "1.9rb",
  },
  {
    id: "4",
    slug: "besok-birthday-show-pertaruhan-cinta",
    repliesCount: 64,
    category: "Teater & Setlist",
    categoryColor: "#FF4D5E",
    memberNickname: "christy",
    memberName: "Christy",
    tag: "Pertaruhan Cinta",
    title:
      "Besok birthday show Pertaruhan Cinta. Yang dapet tiket, kumpul sini buat rencana chant",
    author: "anakfx",
    oshi: "Christy",
    time: "1 jam lalu",
    reactions: 158,
    views: "1.2rb",
  },
  {
    id: "5",
    slug: "audisi-generasi-ke-15-dibuka-saran-apa",
    repliesCount: 51,
    category: "Obrolan Bebas",
    categoryColor: "#A8A0A3",
    title:
      "Audisi Generasi ke-15 dibuka. Saran apa buat teman yang mau daftar?",
    author: "wotabaru",
    oshi: "belum punya oshi",
    time: "2 jam lalu",
    reactions: 98,
    views: "850",
  },
];

export default function TrendingThreadsSection() {
  const [activeFilter, setActiveFilter] = useState("24 jam");

  return (
    <section
      className="w-full bg-bg text-ink py-20 sm:py-28 transition-colors duration-300"
      aria-label="Thread forum terhangat"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header (FigCraft ID: 856) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
          <div>
            <h2 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[96px] tracking-tight uppercase leading-none">
              LAGI RAME
            </h2>
            <p className="font-sans text-base text-muted mt-2">
              Thread yang paling banyak dibalas 24 jam terakhir.
            </p>
          </div>

          {/* Filter Chips & Link (FigCraft ID: 860) */}
          <div className="flex flex-wrap items-center gap-3">
            {["24 jam", "Minggu ini", "Belum dibalas"].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full font-sans text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-raised text-white border border-border"
                      : "bg-transparent text-muted border border-border hover:text-white hover:border-border"
                  }`}
                >
                  {filter}
                </button>
              );
            })}

            <Link
              href="/forum"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-sm font-semibold text-ink hover:text-crimson-400 transition-colors ml-2"
            >
              <span>Semua thread</span>
              <ArrowUpRight weight="bold" className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Thread Rows List (FigCraft ID: 871) */}
        <div className="divide-y divide-raised">
          {hotThreads.map((thread) => (
            <Link
              key={thread.id}
              href={`/forum/${thread.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-7 px-4 -mx-4 rounded-xl transition-all duration-200 hover:bg-surface/60"
            >
              {/* Left Column: Big Reply Count (FigCraft ID: 527) */}
              <div className="w-20 shrink-0 flex flex-col items-start justify-center">
                <span className="font-display font-black text-4xl sm:text-5xl text-ink leading-none tracking-tight">
                  {thread.repliesCount}
                </span>
                <span className="font-sans text-xs font-medium text-muted mt-0.5">
                  balasan
                </span>
              </div>

              {/* Center Column: Tags + Title + Author info (FigCraft ID: 530) */}
              <div className="space-y-2.5 flex-1 min-w-0">
                {/* Badges / Tags row */}
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  {/* Category Pill */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-crimson-500/15 text-crimson-400 font-mono-data text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                    <span>{thread.category}</span>
                  </span>

                  {/* Member Tag (if applicable) */}
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

                  {/* Topic tag (if applicable) */}
                  {thread.tag && (
                    <span className="px-2.5 py-0.5 rounded-full bg-raised text-muted border border-border text-xs">
                      {thread.tag}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-sans font-semibold text-lg sm:text-[21px] text-ink group-hover:text-crimson-400 transition-colors leading-snug">
                  {thread.title}
                </h3>

                {/* Author & Meta */}
                <div className="flex items-center gap-2 text-xs text-muted font-sans flex-wrap">
                  <span className="font-medium text-ink">{thread.author}</span>
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

              {/* Right Column: Stats (Lightstick, Views) + Circle Go Button (FigCraft ID: 549) */}
              <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 font-mono-data text-xs text-muted">
                <div className="flex items-center gap-5">
                  <div
                    className="flex items-center gap-1.5 text-crimson-400 font-medium"
                    title="Lightstick"
                  >
                    <Flashlight
                      weight="fill"
                      className="w-4 h-4 text-crimson-500"
                    />
                    <span>{thread.reactions}</span>
                  </div>

                  <div
                    className="flex items-center gap-1.5 text-muted"
                    title="Tayangan"
                  >
                    <Eye weight="bold" className="w-4 h-4" />
                    <span>{thread.views}</span>
                  </div>
                </div>

                {/* Circular Arrow Button (44x44, radius 999) */}
                <div className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-ink group-hover:bg-crimson-500 group-hover:text-white group-hover:border-crimson-500 transition-all duration-200">
                  <ArrowUpRight weight="bold" className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
