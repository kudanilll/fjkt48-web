"use client";

import Link from "next/link";
import TicketStub from "@/components/ui/ticket-stub";
import type { MemberDetail } from "@/data/member-details-data";

interface MemberScheduleSectionProps {
  member: MemberDetail;
}

export default function MemberScheduleSection({
  member,
}: MemberScheduleSectionProps) {
  // Exact 3 tickets from FigCraft (ID: 5220)
  const tickets = [
    {
      id: "ticket-1",
      day: "MIN",
      dateNum: "22",
      monthYear: "NOV 2026",
      badge: "Show - Besok",
      title: "PERTARUHAN CINTA",
      time: "19:00 WIB · Birthday show",
      isFeatured: true,
      lineup: ["freya", "christy", "marsha", "gita", "fiony"],
    },
    {
      id: "ticket-2",
      day: "RAB",
      dateNum: "25",
      monthYear: "NOV 2026",
      badge: "Show",
      title: "PERTARUHAN CINTA",
      time: "19:00 WIB · JKT48",
      isFeatured: false,
      lineup: ["freya", "marsha", "gita", "christy", "oline"],
    },
    {
      id: "ticket-3",
      day: "SAB",
      dateNum: "28",
      monthYear: "NOV 2026",
      badge: "2-Shot",
      title: "MINI TOUR SLEMAN",
      time: "14:00 WIB · Sleman",
      isFeatured: false,
      lineup: ["freya", "gita", "marsha", "christy", "fiony"],
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-[var(--line)] bg-[#0B0A0C] text-[#F4EFEA]">
      <div className="w-full px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-[64px] uppercase tracking-tight text-[#F4EFEA]">
            JADWAL {member.nickname}
          </h2>

          <Link
            href="/schedule"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#2B272D] text-sm font-sans font-semibold text-[#F4EFEA] hover:bg-[#1D1A1F] hover:border-[#3A353D] transition-all self-start sm:self-auto"
          >
            Semua jadwal
          </Link>
        </div>

        {/* 3 Ticket Stubs Grid (FigCraft ID: 5220) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((t) => (
            <TicketStub key={t.id} ticket={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
