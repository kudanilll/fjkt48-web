"use client";

import Link from "next/link";
import TicketStub from "@/components/ui/ticket-stub";
import type { MemberDetail } from "@/data/member-details-data";
import { getUpcomingSchedules } from "@/lib/jkt48-data";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react";

interface MemberScheduleSectionProps {
  member: MemberDetail;
}

export default function MemberScheduleSection({
  member,
}: MemberScheduleSectionProps) {
  // Find schedules for this member's team or upcoming shows
  const allSchedules = getUpcomingSchedules(6);
  const relevantSchedules = allSchedules.filter(
    (s) =>
      s.jkt48_member_type?.toUpperCase().includes(member.type.toUpperCase()) ||
      s.title.toLowerCase().includes(member.nickname.toLowerCase()) ||
      s.type === "SHOW"
  );
  const displaySchedules = (
    relevantSchedules.length > 0 ? relevantSchedules : allSchedules
  ).slice(0, 3);

  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-[var(--color-stage-800)] bg-[var(--color-stage-950)]">
      <div className="mx-auto max-w-[1344px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block mb-1">
              Agenda Pertunjukan
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[var(--color-ink)]">
              Jadwal {member.nickname}
            </h2>
          </div>

          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-crimson-400)] hover:text-[var(--color-ink)] transition-colors self-start sm:self-auto"
          >
            <span>Semua Jadwal Teater</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

        {/* Tickets Grid: 3 in a row on desktop, scroll-snap on tablet, vertical on mobile */}
        {displaySchedules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displaySchedules.map((schedule, idx) => (
              <TicketStub
                key={schedule.schedule_id}
                schedule={schedule}
                isNext={idx === 0}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[var(--color-stage-900)] text-center text-[var(--color-muted)]">
            <CalendarBlank
              weight="duotone"
              className="w-10 h-10 mx-auto mb-2 text-[var(--color-stage-700)]"
            />
            <p className="text-sm">
              Belum ada jadwal pertunjukan mendatang untuk {member.nickname}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
