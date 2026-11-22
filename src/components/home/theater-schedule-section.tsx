"use client";

import React from "react";
import Link from "next/link";
import TicketStub from "@/components/ui/ticket-stub";
import type { JKT48Schedule } from "@/types/jkt48-types";

interface TheaterScheduleSectionProps {
  schedules?: JKT48Schedule[];
}

export default function TheaterScheduleSection(
  props: TheaterScheduleSectionProps
) {
  void props;
  // 3 Exact Shows from FigCraft (ID: 1096)
  const ticketsData = [
    {
      id: "ticket-1",
      day: "MIN",
      dateNum: "22",
      monthYear: "NOV 2026",
      badge: "Show",
      title: "PERTARUHAN CINTA",
      time: "19:00 WIB · Birthday show",
      isFeatured: true,
      lineup: ["christy", "fiony", "marsha", "kathrina", "indah"],
    },
    {
      id: "ticket-2",
      day: "RAB",
      dateNum: "25",
      monthYear: "NOV 2026",
      badge: "Show",
      title: "PERTARUHAN CINTA",
      time: "19:00 WIB · JKT48 Theater",
      isFeatured: false,
      lineup: ["gita", "freya", "marsha", "christy", "oline"],
    },
    {
      id: "ticket-3",
      day: "KAM",
      dateNum: "26",
      monthYear: "NOV 2026",
      badge: "Show",
      title: "CARA MEMINUM RAMUNE",
      time: "19:00 WIB · Team KIII",
      isFeatured: false,
      lineup: ["freya", "gita", "fiony", "kathrina", "indah"],
    },
  ];

  return (
    <section
      className="w-full bg-[#0B0A0C] text-[#F4EFEA] py-20 sm:py-28 transition-colors duration-300 border-t border-[var(--line)]"
      aria-label="Jadwal pertunjukan teater terdekat"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header (FigCraft ID: 1092) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-[var(--line)]">
          <h2 className="font-display font-extrabold text-5xl sm:text-6xl md:text-[64px] tracking-tight uppercase leading-none text-[#F4EFEA]">
            MINGGU INI DI THEATER
          </h2>

          <Link
            href="/schedule"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#2B272D] text-sm font-sans font-semibold text-[#F4EFEA] hover:bg-[#1D1A1F] hover:border-[#3A353D] transition-all duration-200 self-start sm:self-auto"
          >
            Semua jadwal
          </Link>
        </div>

        {/* 3 Ticket Cards Grid (FigCraft ID: 1096) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {ticketsData.map((ticket) => (
            <TicketStub key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
}
