"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";
import TicketStub from "@/components/ui/ticket-stub";
import type { JKT48Schedule } from "@/types/jkt48-types";

interface TheaterScheduleSectionProps {
  schedules: JKT48Schedule[];
}

export default function TheaterScheduleSection({
  schedules,
}: TheaterScheduleSectionProps) {
  // Use first 3 schedules
  const displaySchedules = schedules.slice(0, 3);

  return (
    <section
      className="w-full bg-[var(--bg)] text-[var(--ink)] py-20 sm:py-28 transition-colors duration-300"
      aria-label="Jadwal pertunjukan teater terdekat"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-2 text-crimson-400 font-mono-data text-xs font-semibold uppercase tracking-wider mb-2">
              <CalendarBlank weight="fill" className="w-4 h-4" />
              <span>THEATER TICKETS</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-none">
              JADWAL THEATER
            </h2>
            <p className="font-mono-data text-xs sm:text-sm text-[var(--muted)] mt-2">
              Show dan event resmi terdekat di JKT48 Theater, fX Sudirman
            </p>
          </div>

          <Link
            href="/schedule"
            className="group inline-flex items-center gap-2 font-mono-data text-xs sm:text-sm font-semibold text-crimson-400 hover:text-crimson-500 transition-colors uppercase tracking-wider"
          >
            <span>Buka kalender lengkap</span>
            <ArrowRight
              weight="bold"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* 3 Ticket Stubs Grid (Desktop 3 cols, Tablet 2 cols, Mobile stack) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {displaySchedules.map((schedule, idx) => (
            <TicketStub
              key={schedule.schedule_id}
              schedule={schedule}
              isToday={idx === 0}
              isNext={idx === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
