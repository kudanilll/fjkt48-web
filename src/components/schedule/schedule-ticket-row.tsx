"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowSquareOut, ChatCircle } from "@phosphor-icons/react";
import type { JKT48Schedule } from "@/types/jkt48-types";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Member } from "@/types/jkt48-types";

interface ScheduleTicketRowProps {
  schedule: JKT48Schedule;
  isToday?: boolean;
  isNextShow?: boolean;
}

const allMembers = (officialData.members ?? []) as JKT48Member[];

export default function ScheduleTicketRow({
  schedule,
  isToday = false,
  isNextShow = false,
}: ScheduleTicketRowProps) {
  // Parse date
  const dateObj = new Date(schedule.date);
  const dayNames = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MEI",
    "JUN",
    "JUL",
    "AGU",
    "SEP",
    "OKT",
    "NOV",
    "DES",
  ];
  const dayName = isNaN(dateObj.getTime())
    ? "HARI"
    : dayNames[dateObj.getDay()]!;
  const dayNum = isNaN(dateObj.getTime())
    ? schedule.date.slice(-2)
    : String(dateObj.getDate());
  const monthName = isNaN(dateObj.getTime())
    ? "BLN"
    : monthNames[dateObj.getMonth()]!;

  const isShow = schedule.type === "SHOW";

  // Pick representative lineup avatars (3-5 members for shows)
  const lineupAvatars = isShow ? allMembers.slice(0, 4) : [];

  return (
    <div className="relative group rounded-2xl bg-[var(--color-stage-900)] overflow-hidden transition-all hover:bg-[var(--color-stage-850)] flex flex-col md:flex-row items-stretch md:items-center">
      {/* 1. Date Stub */}
      <div
        className={`w-full md:w-36 py-4 md:py-0 md:min-h-[148px] flex flex-row md:flex-col items-center justify-center gap-1.5 md:gap-0.5 relative flex-none transition-colors ${
          isToday
            ? "bg-[var(--color-spotlight)] text-[var(--color-stage-950)]"
            : isNextShow
              ? "bg-[var(--color-crimson-500)] text-white"
              : "bg-[var(--color-stage-800)] text-[var(--color-ink)]"
        }`}
      >
        <span
          className={`text-xs font-mono font-bold tracking-widest ${
            isToday
              ? "text-[var(--color-stage-950)]/70"
              : isNextShow
                ? "text-white/80"
                : "text-[var(--color-muted)]"
          }`}
        >
          {dayName}
        </span>
        <span className="font-display font-black text-3xl md:text-5xl leading-none">
          {dayNum}
        </span>
        <span
          className={`text-[11px] font-mono font-semibold ${
            isToday
              ? "text-[var(--color-stage-950)]/70"
              : isNextShow
                ? "text-white/80"
                : "text-[var(--color-muted)]"
          }`}
        >
          {monthName}
        </span>
      </div>

      {/* Perforation Notches on Desktop (hidden on mobile) */}
      <div className="hidden md:block absolute left-[134px] -top-2.5 w-5 h-5 rounded-full bg-[var(--color-stage-950)] z-20 pointer-events-none" />
      <div className="hidden md:block absolute left-[134px] -bottom-2.5 w-5 h-5 rounded-full bg-[var(--color-stage-950)] z-20 pointer-events-none" />

      {/* 2. Main Ticket Info */}
      <div className="flex-1 p-5 md:px-8 md:py-6 space-y-2">
        {/* Type chip + Subtitle Tag */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-semibold ${
              isShow
                ? "bg-[var(--color-crimson-500)]/20 text-[var(--color-crimson-400)]"
                : "bg-[var(--color-stage-700)] text-[var(--color-muted)]"
            }`}
          >
            {isShow ? "Show Theater" : "Event Khusus"}
          </span>

          {schedule.jkt48_member_type && (
            <span className="text-xs font-mono text-[var(--color-muted)]">
              {schedule.jkt48_member_type}
            </span>
          )}

          {isToday && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-crimson-500)] text-white font-bold animate-pulse">
              HARI INI
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-crimson-400)] transition-colors">
          {schedule.title}
        </h3>

        {/* Time and Venue in Mono */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--color-muted)]">
          <span>{schedule.start_time ?? "19:00 WIB"}</span>
          <span>&bull;</span>
          <span>fX Sudirman Lt. 4, Jakarta</span>
        </div>
      </div>

      {/* 3. Lineup Avatars (Desktop only) */}
      <div className="hidden lg:flex flex-col items-start px-6 py-4 flex-none border-l border-[var(--color-stage-800)]/60">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
          {isShow ? "Sebagian Lineup" : "Informasi"}
        </span>
        {isShow && lineupAvatars.length > 0 ? (
          <div className="flex items-center -space-x-2">
            {lineupAvatars.map((m) => (
              <div
                key={m.code}
                className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--color-stage-900)] bg-[var(--color-stage-800)]"
                title={m.nickname}
              >
                <Image
                  src={m.photo}
                  alt={m.nickname}
                  fill
                  sizes="32px"
                  className="object-cover object-top"
                />
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-[var(--color-stage-800)] border-2 border-[var(--color-stage-900)] flex items-center justify-center text-[10px] font-mono font-semibold text-[var(--color-muted)]">
              +12
            </div>
          </div>
        ) : (
          <span className="text-xs font-mono text-[var(--color-subtle)] italic">
            Lineup resmi via JKT48
          </span>
        )}
      </div>

      {/* 4. Action Buttons */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between p-5 md:px-6 md:py-5 flex-none gap-3 border-t md:border-t-0 md:border-l border-[var(--color-stage-800)]/60 bg-[var(--color-stage-900)]/80">
        <a
          href={schedule.link || "https://jkt48.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[var(--color-crimson-500)] text-white hover:bg-[var(--color-crimson-600)] transition-all shadow-md shadow-[var(--color-crimson-500)]/20"
        >
          <span>{isShow ? "Beli Tiket" : "Info Resmi"}</span>
          <ArrowSquareOut weight="bold" className="w-3.5 h-3.5" />
        </a>

        <Link
          href={`/forum?tag=${encodeURIComponent(schedule.title.toLowerCase())}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          <ChatCircle
            weight="bold"
            className="w-3.5 h-3.5 text-[var(--color-crimson-400)]"
          />
          <span>Diskusi show</span>
        </Link>
      </div>
    </div>
  );
}
