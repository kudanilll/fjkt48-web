"use client";

import Image from "next/image";
import Link from "next/link";
import { TicketIcon, ChatCircleIcon } from "@phosphor-icons/react";
import type { JKT48Schedule } from "@/types/jkt48-types";

interface TicketStubProps {
  schedule: JKT48Schedule;
  isToday?: boolean;
  isNext?: boolean;
}

export default function TicketStub({
  schedule,
  isToday = false,
  isNext = false,
}: TicketStubProps) {
  // Parse date into Day, Date, Month
  const dateObj = new Date(schedule.date);
  const dayName = dateObj
    .toLocaleDateString("id-ID", { weekday: "short" })
    .toUpperCase();
  const dayNum = dateObj.getDate().toString().padStart(2, "0");
  const monthName = dateObj
    .toLocaleDateString("id-ID", { month: "short" })
    .toUpperCase();

  return (
    <div
      className={`card relative flex flex-col md:flex-row overflow-hidden group transition-transform duration-200 hover:-translate-y-1 ${
        isToday
          ? "bg-[#FFE7CC] text-[#141215]"
          : isNext
            ? "bg-[#1E1215] text-(--ink)"
            : "bg-surface text-(--ink)"
      }`}
    >
      {/* Date Stub Section (Left on desktop, Top on mobile) */}
      <div
        className={`flex flex-col items-center justify-center p-4 md:p-6 md:w-32 shrink-0 border-b md:border-b-0 md:border-r border-dashed ${
          isToday
            ? "border-neutral-900/20 bg-[#FFE7CC]"
            : isNext
              ? "border-crimson-500/30 bg-crimson-950/40 text-crimson-300"
              : "border-border bg-(--raised) text-muted"
        }`}
      >
        <span className="font-mono-data text-xs uppercase tracking-wider font-semibold opacity-75">
          {dayName}
        </span>
        <span
          className={`font-display text-4xl font-black leading-none my-1 ${
            isToday
              ? "text-[#141215]"
              : isNext
                ? "text-crimson-400"
                : "text-(--ink)"
          }`}
        >
          {dayNum}
        </span>
        <span className="font-mono-data text-xs uppercase font-medium">
          {monthName}
        </span>
      </div>

      {/* Perforation Notches on Desktop (Top and Bottom along the dividing border) */}
      <div
        className="hidden md:block absolute top-0 left-32 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-(--bg) z-10"
        aria-hidden="true"
      />
      <div
        className="hidden md:block absolute bottom-0 left-32 -translate-x-1/2 translate-y-1/2 w-5 h-5 rounded-full bg-(--bg) z-10"
        aria-hidden="true"
      />

      {/* Info Section */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase ${
                isToday
                  ? "bg-neutral-900 text-white"
                  : isNext
                    ? "bg-crimson-500 text-white"
                    : "bg-(--raised) text-muted border border-border"
              }`}
            >
              {schedule.type}
            </span>
            {isToday && (
              <span className="px-2 py-0.5 rounded-full bg-crimson-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Hari ini
              </span>
            )}
            {isNext && !isToday && (
              <span className="px-2 py-0.5 rounded-full bg-crimson-500/20 text-crimson-400 border border-crimson-500/40 text-[10px] font-bold uppercase tracking-wider">
                Show berikutnya
              </span>
            )}
          </div>

          <h3
            className={`font-display text-2xl md:text-3xl font-extrabold leading-tight ${
              isToday ? "text-[#141215]" : "text-(--ink)"
            }`}
          >
            {schedule.title}
          </h3>

          <p
            className={`font-mono-data text-xs mt-1.5 ${
              isToday ? "text-neutral-700" : "text-muted"
            }`}
          >
            19:00 WIB · JKT48 Theater, fX Sudirman
          </p>
        </div>

        {/* Member Lineup preview & Action CTAs */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-(--line)">
          <div className="flex items-center -space-x-2 overflow-hidden">
            {["freya", "christy", "gita", "marsha"].map((nick) => (
              <div
                key={nick}
                className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-surface bg-neutral-800"
              >
                <Image
                  src={`/members/${nick}.jpg`}
                  alt={nick}
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
            ))}
            <span
              className={`flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-mono-data font-bold border-2 border-surface ${
                isToday
                  ? "bg-neutral-800 text-white"
                  : "bg-(--raised) text-muted"
              }`}
            >
              +12
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/forum?tag=show-${schedule.schedule_id}`}
              className={`p-2 rounded-full transition-colors ${
                isToday
                  ? "hover:bg-neutral-900/10 text-neutral-800"
                  : "hover:bg-(--raised) text-muted hover:text-(--ink)"
              }`}
              title="Diskusi show ini di forum"
            >
              <ChatCircleIcon weight="bold" className="w-4 h-4" />
            </Link>

            <a
              href="https://jkt48.com/theater/schedule"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                isToday
                  ? "bg-neutral-900 text-white hover:bg-neutral-800"
                  : "bg-crimson-500 text-white hover:bg-crimson-600 shadow-sm shadow-crimson-500/20"
              }`}
            >
              <TicketIcon weight="fill" className="w-3.5 h-3.5" />
              <span>Tiket</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
