"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Ticket,
  User,
  ChatsCircle,
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { forumThreads } from "@/data/forum-mock-data";

interface ThreadDetailRailProps {
  memberNickname?: string;
}

export default function ThreadDetailRail({
  memberNickname = "freya",
}: ThreadDetailRailProps) {
  const relatedThreads = forumThreads.slice(1, 4);

  return (
    <aside className="w-full space-y-6" aria-label="Informasi terkait thread">
      {/* 1. Tagged Show Ticket Stub */}
      <div className="p-6 rounded-[14px] bg-[#141215] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#FF4D5E] font-mono text-xs font-bold uppercase tracking-wider">
            <Ticket weight="fill" className="w-4 h-4" />
            <span>SHOW TERKAIT</span>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#E5132E] text-white font-bold uppercase">
            Teater
          </span>
        </div>

        <h3 className="font-display text-3xl font-black uppercase text-[#F4EFEA] leading-tight">
          Pertaruhan Cinta
        </h3>

        <div className="space-y-1 font-mono text-xs text-[#A8A0A3]">
          <p>Minggu, 22 Nov 2026 · 16:00 WIB</p>
          <p>JKT48 Theater · fX Sudirman Lt. 4</p>
        </div>

        <div className="pt-2">
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-[#E5132E] text-white text-sm font-semibold hover:bg-[#CC0E26] transition-colors"
          >
            <span>Lihat jadwal show</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Tagged Member Card */}
      <div className="p-6 rounded-[14px] bg-[#141215] space-y-4">
        <div className="flex items-center gap-2 text-[#F4EFEA] font-mono text-xs font-bold uppercase tracking-wider pb-3 border-b border-[#F4EFEA]/10">
          <User weight="fill" className="w-4 h-4 text-[#FF4D5E]" />
          <span>MEMBER YANG DIBAHAS</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#1D1A1F] shrink-0 border border-[#F4EFEA]/10">
            <Image
              src={`https://jkt48.com/api/v1/storages/media/jkt48-member/${memberNickname}_jayawardana.jpg`}
              alt={memberNickname}
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E5132E]/20 text-[#FF4D5E] font-medium">
              Team Dream
            </span>
            <h4 className="font-display text-2xl font-black uppercase text-[#F4EFEA] truncate">
              Freya Jayawardana
            </h4>
            <p className="font-mono text-xs text-[#A8A0A3]">
              Generasi 7 · Member Tetap
            </p>
          </div>
        </div>

        <p className="text-xs text-[#A8A0A3] italic leading-relaxed pt-1">
          &ldquo;Gadis koleris yang suka berimajinasi, terangi harimu dengan
          senyuman karamelku. Halo, aku Freya!&rdquo;
        </p>

        <Link
          href={`/member/${memberNickname}`}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-[#1D1A1F] text-[#F4EFEA] text-sm font-medium hover:bg-[#2B272D] transition-colors"
        >
          <span>Lihat profil lengkap</span>
          <ArrowUpRight weight="bold" className="w-4 h-4" />
        </Link>
      </div>

      {/* 3. Related Threads */}
      <div className="p-6 rounded-[14px] bg-[#141215] space-y-4">
        <div className="flex items-center gap-2 text-[#F4EFEA] font-mono text-xs font-bold uppercase tracking-wider pb-3 border-b border-[#F4EFEA]/10">
          <ChatsCircle weight="fill" className="w-4 h-4 text-[#FF4D5E]" />
          <span>DISKUSI TERKAIT</span>
        </div>

        <div className="divide-y divide-[#F4EFEA]/10">
          {relatedThreads.map((related) => (
            <Link
              key={related.id}
              href={`/forum/${related.slug}`}
              className="block py-3 hover:text-[#FF4D5E] transition-colors group"
            >
              <h5 className="font-sans font-semibold text-sm text-[#F4EFEA] group-hover:text-[#FF4D5E] line-clamp-2 leading-snug">
                {related.title}
              </h5>
              <div className="flex items-center gap-2 font-mono text-xs text-[#8A8286] mt-1.5">
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
