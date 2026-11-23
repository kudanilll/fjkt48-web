"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import type { JKT48Schedule } from "@/types/jkt48-types";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Member } from "@/types/jkt48-types";

interface ScheduleTicketRowProps {
  schedule: JKT48Schedule;
  isToday?: boolean;
  isNext?: boolean;
  replyCount?: number;
}

const allMembers = (officialData.members ?? []) as JKT48Member[];

export default function ScheduleTicketRow({
  schedule,
  isToday = false,
  isNext = false,
  replyCount = 64,
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
    ? "NOV"
    : monthNames[dateObj.getMonth()]!;
  const yearNum = isNaN(dateObj.getTime())
    ? "2026"
    : String(dateObj.getFullYear());

  const isShow = schedule.type === "SHOW";

  // Select representative lineup members for theater shows
  const lineupAvatars = isShow ? allMembers.slice(0, 6) : [];

  const formattedTime = schedule.start_time
    ? `${schedule.start_time.slice(0, 5)} WIB`
    : "19:00 WIB";

  return (
    <div className="relative rounded-[14px] bg-surface overflow-hidden flex flex-col lg:flex-row items-stretch lg:items-center min-h-[150px] transition-colors hover:bg-raised">
      {/* 1. Date Stub */}
      <div
        className={`w-full lg:w-[136px] min-h-[90px] lg:min-h-[150px] flex flex-row lg:flex-col items-center justify-center gap-2 lg:gap-0.5 relative flex-none ${
          isToday
            ? "bg-spotlight text-bg"
            : isNext
              ? "bg-crimson-500 text-white"
              : "bg-border text-ink"
        }`}
      >
        <span
          className={`text-[13px] font-mono font-medium tracking-[1px] uppercase ${
            isToday
              ? "text-bg/80"
              : isNext
                ? "text-white/80"
                : "text-muted"
          }`}
        >
          {dayName}
        </span>
        <span
          className={`font-display font-black text-4xl lg:text-[64px] leading-none ${
            isToday ? "text-bg" : isNext ? "text-white" : "text-ink"
          }`}
        >
          {dayNum}
        </span>
        <span
          className={`text-xs font-mono font-medium uppercase ${
            isToday
              ? "text-bg/80"
              : isNext
                ? "text-white/80"
                : "text-muted"
          }`}
        >
          {monthName} {yearNum}
        </span>
      </div>

      {/* Perforation Notches on Desktop */}
      <div className="hidden lg:block absolute left-[126px] -top-2.5 w-5 h-5 rounded-full bg-bg z-20 pointer-events-none" />
      <div className="hidden lg:block absolute left-[126px] -bottom-2.5 w-5 h-5 rounded-full bg-bg z-20 pointer-events-none" />
      <div className="hidden lg:block absolute left-[136px] top-3 bottom-3 border-r border-dashed border-border/60 pointer-events-none" />

      {/* 2. Info Container */}
      <div className="flex-1 px-6 lg:px-9 py-5 lg:py-6 flex flex-col justify-center space-y-1.5">
        {/* Type Badges */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
              isShow
                ? "bg-crimson-500/15 text-accent"
                : "bg-spotlight/15 text-spotlight"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isShow ? "bg-accent" : "bg-spotlight"
              }`}
            />
            {isShow ? "SHOW THEATER" : "EVENT KHUSUS"}
          </span>

          {schedule.jkt48_member_type && (
            <span className="text-[11px] font-mono text-muted">
              {schedule.jkt48_member_type}
            </span>
          )}

          {isToday && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-crimson-500 text-white">
              HARI INI
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-extrabold text-3xl lg:text-[44px] uppercase tracking-tight text-ink leading-tight">
          {schedule.title}
        </h3>

        {/* Meta */}
        <p className="text-[13px] font-mono text-muted leading-snug">
          {isShow
            ? `${formattedTime} · Teater JKT48, fX Sudirman Lt. 4`
            : schedule.start_time
              ? `${formattedTime} · Info resmi di jkt48.com`
              : "Jam tampil menyusul · info resmi di jkt48.com"}
        </p>
      </div>

      {/* 3. Lineup Column */}
      <div className="px-6 lg:px-8 py-3 lg:py-6 flex flex-col justify-center flex-none min-w-[240px]">
        {isShow && lineupAvatars.length > 0 ? (
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium tracking-[1px] uppercase text-muted block">
              LINEUP · 16 MEMBER
            </span>
            <div className="flex items-center -space-x-2.5">
              {lineupAvatars.map((m) => (
                <div
                  key={m.code}
                  className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-surface bg-raised flex-none"
                  title={m.nickname}
                >
                  <Image
                    src={m.photo}
                    alt={m.nickname}
                    fill
                    sizes="40px"
                    className="object-cover object-top"
                  />
                </div>
              ))}
              <div className="relative w-10 h-10 rounded-full border-2 border-surface bg-raised flex items-center justify-center text-[11px] font-mono text-muted flex-none">
                +10
              </div>
            </div>
          </div>
        ) : (
          <span className="text-xs font-mono font-medium tracking-[1px] uppercase text-subtle">
            LINEUP BELUM DIUMUMKAN
          </span>
        )}
      </div>

      {/* 4. Actions Column */}
      <div className="px-6 lg:px-7 py-4 lg:py-6 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 flex-none min-w-[180px]">
        <Link
          href={schedule.external_url || schedule.link || "https://jkt48.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-crimson-500 text-white font-sans text-[15px] font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Info resmi</span>
          <ArrowRight weight="bold" className="w-4 h-4" />
        </Link>

        <Link
          href={`/forum?tag=${encodeURIComponent(schedule.title)}`}
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink underline decoration-current underline-offset-4 hover:text-accent transition-colors"
        >
          <span>
            {isShow
              ? `Diskusi show (${replyCount})`
              : `Diskusi event (${replyCount})`}
          </span>
          <ArrowUpRight weight="bold" className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
