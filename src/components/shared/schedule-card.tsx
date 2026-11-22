"use client";

import {
  CalendarBlank,
  Clock,
  MapPin,
  Sparkle,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import TeamBadge from "@/components/shared/team-badge";
import {
  formatDateID,
  formatTime,
  getScheduleTypeLabel,
} from "@/lib/jkt48-data";
import type { JKT48Schedule, TeamType } from "@/types/jkt48-types";

interface ScheduleCardProps {
  schedule: JKT48Schedule;
}

export default function ScheduleCard({ schedule }: ScheduleCardProps) {
  const isTheater = schedule.type === "SHOW";
  const isBirthday = Boolean(schedule.birthday_member);

  const teamType = schedule.jkt48_member_type as TeamType | null;
  const officialUrl =
    schedule.external_url || `https://jkt48.com/calendar/list?lang=id`;

  return (
    <article className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-white p-5 dark:border-neutral-800/80 dark:bg-neutral-900/70 transition-all duration-300 hover:border-crimson-300 dark:hover:border-crimson-900/60 hover:shadow-lg">
      <div className="space-y-3">
        {/* Badges Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              isTheater
                ? "bg-crimson-50 text-crimson-700 border border-crimson-200 dark:bg-crimson-950/50 dark:text-crimson-300 dark:border-crimson-800"
                : "bg-neutral-100 text-neutral-700 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700"
            }`}
          >
            {getScheduleTypeLabel(schedule.type)}
          </span>

          {teamType &&
            ["LOVE", "DREAM", "PASSION", "TRAINEE"].includes(teamType) && (
              <TeamBadge team={teamType} size="sm" />
            )}

          {isBirthday && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
              <Sparkle weight="fill" className="h-3 w-3" />
              Seitansai
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors line-clamp-2">
          {schedule.title}
        </h3>

        {/* Metadata */}
        <div className="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <CalendarBlank className="h-4 w-4 shrink-0 text-neutral-400" />
            <span>{formatDateID(schedule.date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-neutral-400" />
            <span>{formatTime(schedule.start_time)}</span>
            {schedule.end_time && (
              <span>- {formatTime(schedule.end_time)}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-neutral-400" />
            <span className="truncate">JKT48 Theater, fX Sudirman Lt. 4</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
        <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
          {schedule.reference_code || "OFFICIAL"}
        </span>

        <a
          href={officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-crimson-600 hover:text-crimson-700 dark:text-crimson-400 dark:hover:text-crimson-300 hover:bg-crimson-50 dark:hover:bg-crimson-950/50 transition-colors"
        >
          <span>Tiket & Info</span>
          <ArrowSquareOut className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
