"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Eye } from "@phosphor-icons/react";
import type { MemberDetail } from "@/data/member-details-data";

interface MemberDiscussionSectionProps {
  member: MemberDetail;
}

// Exact 3 threads from FigCraft (ID: 5240)
const freyaThreads = [
  {
    id: "th-1",
    slug: "jikoshokai-freya-versi-terbaru",
    repliesCount: 31,
    category: "Member & Oshi",
    title: "Jikoshokai Freya versi terbaru, ada yang udah hafal?",
    author: "freyanation",
    oshi: "Freya",
    time: "3 jam lalu",
    reactions: 140,
    views: "1,8rb",
  },
  {
    id: "th-2",
    slug: "freya-di-unit-song-pertaruhan-cinta",
    repliesCount: 58,
    category: "Theater & Setlist",
    tag: "Pertaruhan Cinta",
    title:
      "Freya di unit song Pertaruhan Cinta kemarin, ekspresinya dapet banget",
    author: "kopifreya",
    oshi: "Freya",
    time: "1 hari lalu",
    reactions: 230,
    views: "3,1rb",
  },
  {
    id: "th-3",
    slug: "rangkuman-live-showroom-freya-kamis-malam",
    repliesCount: 22,
    category: "Live Streaming",
    title:
      "Rangkuman live Showroom Freya Kamis malam: bahas buku dan latihan dance",
    author: "catatanlive",
    oshi: "Freya",
    time: "2 hari lalu",
    reactions: 96,
    views: "1,4rb",
  },
];

export default function MemberDiscussionSection({
  member,
}: MemberDiscussionSectionProps) {
  return (
    <section className="py-16 sm:py-20 border-b border-[var(--line)] bg-[#0B0A0C] text-[#F4EFEA]">
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-[var(--line)]">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-[64px] uppercase tracking-tight text-[#F4EFEA]">
            DISKUSI TENTANG {member.nickname}
          </h2>

          <Link
            href="/forum"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#F4EFEA] hover:text-crimson-400 transition-colors"
          >
            <span>Semua 412 thread</span>
            <ArrowUpRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        {/* Thread List Rows (FigCraft ID: 5240) */}
        <div className="divide-y divide-[var(--line)]">
          {freyaThreads.map((thread) => (
            <Link
              key={thread.id}
              href={`/forum/${thread.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 px-4 -mx-4 rounded-xl transition-all duration-200 hover:bg-[#141215]/60"
            >
              {/* Left Column: Big Reply Count */}
              <div className="w-16 shrink-0 flex flex-col items-start justify-center">
                <span className="font-display font-black text-4xl text-[#F4EFEA] leading-none tracking-tight">
                  {thread.repliesCount}
                </span>
                <span className="font-sans text-xs font-medium text-[#A8A0A3] mt-0.5">
                  balasan
                </span>
              </div>

              {/* Center Column: Tags + Title + Author info */}
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="inline-flex items-center gap-1 font-mono-data text-xs text-crimson-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                    <span>{thread.category}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1D1A1F] text-[#F4EFEA] border border-[#2B272D] text-xs">
                    <span className="relative w-3.5 h-3.5 rounded-full overflow-hidden shrink-0">
                      <Image
                        src="/members/freya.jpg"
                        alt="Freya"
                        fill
                        className="object-cover"
                      />
                    </span>
                    <span>Freya</span>
                  </span>

                  {thread.tag && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1D1A1F] text-[#A8A0A3] border border-[#2B272D] text-xs">
                      {thread.tag}
                    </span>
                  )}
                </div>

                <h3 className="font-sans font-semibold text-lg text-[#F4EFEA] group-hover:text-crimson-400 transition-colors leading-snug">
                  {thread.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-[#A8A0A3] font-sans flex-wrap">
                  <span className="font-medium text-[#F4EFEA]">
                    {thread.author}
                  </span>
                  <span>·</span>
                  <span>oshi {thread.oshi}</span>
                  <span>·</span>
                  <span>{thread.time}</span>
                </div>
              </div>

              {/* Right Column: Stats & Arrow */}
              <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 font-mono-data text-xs text-[#A8A0A3]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-crimson-400 font-medium">
                    <Flame weight="fill" className="w-4 h-4 text-crimson-500" />
                    <span>{thread.reactions}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#A8A0A3]">
                    <Eye weight="bold" className="w-4 h-4" />
                    <span>{thread.views}</span>
                  </div>
                </div>

                <ArrowUpRight
                  weight="bold"
                  className="w-4 h-4 text-[#F4EFEA] group-hover:text-crimson-400 transition-colors"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
