"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { JKT48Schedule } from "@/types/jkt48-types";

export interface TicketData {
  id: string;
  day: string;
  dateNum: string;
  monthYear: string;
  badge?: string;
  title: string;
  time: string;
  isFeatured?: boolean;
  lineup?: string[];
}

interface TicketStubProps {
  ticket?: TicketData;
  schedule?: JKT48Schedule;
  isToday?: boolean;
  isNext?: boolean;
}

export default function TicketStub({
  ticket,
  schedule,
  isToday = false,
}: TicketStubProps) {
  // Normalize data whether passed as ticket or schedule
  const isFeatured = ticket ? !!ticket.isFeatured : isToday;
  const day = ticket
    ? ticket.day
    : schedule
      ? new Date(schedule.date)
          .toLocaleDateString("id-ID", { weekday: "short" })
          .toUpperCase()
      : "MIN";
  const dateNum = ticket
    ? ticket.dateNum
    : schedule
      ? new Date(schedule.date).getDate().toString().padStart(2, "0")
      : "22";
  const monthYear = ticket
    ? ticket.monthYear
    : schedule
      ? `${new Date(schedule.date)
          .toLocaleDateString("id-ID", { month: "short" })
          .toUpperCase()} ${new Date(schedule.date).getFullYear()}`
      : "NOV 2026";
  const title = ticket ? ticket.title : schedule?.title || "PERTARUHAN CINTA";
  const time = ticket ? ticket.time : "19:00 WIB · JKT48 Theater, fX Sudirman";
  const badge = ticket ? ticket.badge : schedule?.type || "Show";
  const lineup = ticket?.lineup || [
    "christy",
    "fiony",
    "marsha",
    "kathrina",
    "indah",
  ];

  return (
    <div className="relative flex flex-row overflow-hidden rounded-[14px] bg-raised text-ink min-h-[184px] shadow-lg shadow-black/30 border-none group">
      {/* Date Stub Section (Left) - FigCraft ID: 1098 */}
      <div
        className={`relative w-28 sm:w-[116px] shrink-0 flex flex-col items-center justify-between py-5 px-3 z-0 ${
          isFeatured
            ? "bg-crimson-500 text-white"
            : "bg-raised text-ink"
        }`}
      >
        <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.06em] uppercase">
          {day}
        </span>
        <span className="font-display font-black text-6xl sm:text-[84px] leading-none tracking-tighter my-0.5">
          {dateNum}
        </span>
        <span className="font-sans text-xs sm:text-[13px] font-semibold tracking-[0.06em] uppercase">
          {monthYear}
        </span>

        {/* Perforation dashed line along right edge */}
        <div className="absolute top-3.5 bottom-3.5 right-0 w-0 border-r-2 border-dashed border-bg z-10" />

        {/* Notches along dividing line (FigCraft ID: 1102 & 1103) */}
        <div
          className="absolute -top-2.5 -right-2.5 w-5 h-5 rounded-full bg-bg z-20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-2.5 -right-2.5 w-5 h-5 rounded-full bg-bg z-20 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Info Section (Right) - FigCraft ID: 1104 */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-3 min-w-0">
        <div className="space-y-1.5">
          {/* Badge */}
          {badge && (
            <span className="inline-block px-2.5 py-0.5 rounded-full border border-ink-a20 text-[11px] font-sans font-medium text-ink">
              {badge}
            </span>
          )}

          {/* Show Title */}
          <h3 className="font-display font-extrabold text-2xl sm:text-[36px] uppercase leading-tight tracking-tight text-ink group-hover:text-crimson-400 transition-colors truncate">
            {title}
          </h3>

          {/* Time & Subtitle */}
          <p className="font-mono-data text-xs sm:text-[13px] text-muted truncate">
            {time}
          </p>
        </div>

        {/* Bottom Lineup & Action */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-[var(--line)]">
          {/* Lineup Avatars */}
          <div className="flex items-center -space-x-2 overflow-hidden">
            {lineup.slice(0, 4).map((nick) => (
              <div
                key={nick}
                className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-raised bg-neutral-800"
              >
                <Image
                  src={`/members/${nick}.jpg`}
                  alt={nick}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            <span className="flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-mono-data font-bold border-2 border-raised bg-border text-muted">
              +12
            </span>
          </div>

          {/* Diskusi Show Underline Link */}
          <Link
            href="/forum"
            className="font-sans text-xs sm:text-[13px] font-semibold text-ink underline hover:text-crimson-400 transition-colors shrink-0"
          >
            Diskusi show
          </Link>
        </div>
      </div>
    </div>
  );
}
