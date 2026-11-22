"use client";

import { useMemo } from "react";
import type { JKT48Schedule } from "@/types/jkt48-types";

interface ScheduleCalendarGridProps {
  currentYear: number;
  currentMonth: number; // 0-indexed (0 = Jan, 10 = Nov)
  schedules: JKT48Schedule[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
  typeFilter: "ALL" | "SHOW" | "EVENT";
}

export default function ScheduleCalendarGrid({
  currentYear,
  currentMonth,
  schedules,
  selectedDate,
  onSelectDate,
  typeFilter,
}: ScheduleCalendarGridProps) {
  const weekdays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  // Compute calendar days
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const startWeekday = firstDayOfMonth.getDay(); // 0 = Minggu
    const totalDays = lastDayOfMonth.getDate();

    // Previous month trailing days
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    const prevDays = [];
    for (let i = startWeekday - 1; i >= 0; i--) {
      prevDays.push({
        day: prevMonthLastDay - i,
        dateString: `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(prevMonthLastDay - i).padStart(2, "0")}`,
        isCurrentMonth: false,
      });
    }

    // Current month days
    const currentDays = [];
    for (let d = 1; d <= totalDays; d++) {
      const monthStr = String(currentMonth + 1).padStart(2, "0");
      const dayStr = String(d).padStart(2, "0");
      currentDays.push({
        day: d,
        dateString: `${currentYear}-${monthStr}-${dayStr}`,
        isCurrentMonth: true,
      });
    }

    // Next month trailing days to complete 5 or 6 weeks (35 or 42 slots)
    const totalFilled = prevDays.length + currentDays.length;
    const targetSlots = totalFilled <= 35 ? 35 : 42;
    const nextDays = [];
    for (let d = 1; d <= targetSlots - totalFilled; d++) {
      const nextMonth = currentMonth + 2;
      const monthStr = String(nextMonth > 12 ? 1 : nextMonth).padStart(2, "0");
      const dayStr = String(d).padStart(2, "0");
      nextDays.push({
        day: d,
        dateString: `${nextMonth > 12 ? currentYear + 1 : currentYear}-${monthStr}-${dayStr}`,
        isCurrentMonth: false,
      });
    }

    return [...prevDays, ...currentDays, ...nextDays];
  }, [currentYear, currentMonth]);

  // Today in YYYY-MM-DD
  const todayString = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }, []);

  // Map schedules by date
  const scheduleMap = useMemo(() => {
    const map: Record<string, JKT48Schedule[]> = {};
    for (const s of schedules) {
      if (
        typeFilter === "ALL" ||
        (typeFilter === "SHOW" && s.type === "SHOW") ||
        (typeFilter === "EVENT" && s.type !== "SHOW")
      ) {
        if (!map[s.date]) {
          map[s.date] = [];
        }
        map[s.date]!.push(s);
      }
    }
    return map;
  }, [schedules, typeFilter]);

  return (
    <div className="w-full space-y-2">
      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {weekdays.map((w) => (
          <div
            key={w}
            className="text-left py-1 text-[11px] font-mono font-medium tracking-wider uppercase text-[var(--color-muted)]"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((d, idx) => {
          const events = scheduleMap[d.dateString] ?? [];
          const isToday = d.dateString === todayString;
          const isSelected = selectedDate === d.dateString;

          return (
            <button
              key={`${d.dateString}-${idx}`}
              type="button"
              onClick={() => onSelectDate(d.dateString)}
              className={`min-h-[56px] sm:min-h-[104px] lg:min-h-[120px] p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-left transition-all relative flex flex-col justify-between ${
                isToday
                  ? "bg-[var(--color-crimson-500)] text-white shadow-lg shadow-[var(--color-crimson-500)]/30"
                  : isSelected
                    ? "bg-[var(--color-stage-800)] ring-2 ring-[var(--color-crimson-400)] text-[var(--color-ink)]"
                    : d.isCurrentMonth
                      ? "bg-[var(--color-stage-900)] hover:bg-[var(--color-stage-800)] text-[var(--color-ink)]"
                      : "bg-[var(--color-stage-900)]/40 text-[var(--color-muted)]/50 hover:bg-[var(--color-stage-900)]"
              }`}
            >
              {/* Day Head */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`font-display font-black text-lg sm:text-2xl leading-none ${
                    isToday
                      ? "text-white"
                      : d.isCurrentMonth
                        ? "text-[var(--color-ink)]"
                        : "text-[var(--color-muted)]"
                  }`}
                >
                  {d.day}
                </span>

                {isToday && (
                  <span className="hidden sm:inline-block text-[9px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-white text-[var(--color-crimson-500)]">
                    Hari Ini
                  </span>
                )}
              </div>

              {/* Desktop/Tablet Event Lines */}
              <div className="hidden sm:flex flex-col gap-1 w-full mt-1">
                {events.slice(0, 2).map((evt, eIdx) => (
                  <div
                    key={`${evt.schedule_id}-${eIdx}`}
                    className="flex items-center gap-1.5 text-[11px] font-medium truncate w-full"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-none ${
                        isToday
                          ? "bg-white"
                          : evt.type === "SHOW"
                            ? "bg-[var(--color-crimson-400)]"
                            : "bg-[var(--color-muted)]"
                      }`}
                    />
                    <span
                      className={`truncate ${
                        isToday
                          ? "text-white font-semibold"
                          : "text-[var(--color-muted)]"
                      }`}
                    >
                      {evt.start_time ? `${evt.start_time} ` : ""}
                      {evt.title}
                    </span>
                  </div>
                ))}

                {events.length > 2 && (
                  <span
                    className={`text-[10px] font-mono ${
                      isToday
                        ? "text-white/80"
                        : "text-[var(--color-crimson-400)]"
                    }`}
                  >
                    +{events.length - 2} lagi
                  </span>
                )}
              </div>

              {/* Mobile Colored Dots */}
              <div className="flex sm:hidden items-center gap-1 mt-1">
                {events.slice(0, 3).map((evt, eIdx) => (
                  <span
                    key={`${evt.schedule_id}-${eIdx}`}
                    className={`w-1.5 h-1.5 rounded-full ${
                      isToday
                        ? "bg-white"
                        : evt.type === "SHOW"
                          ? "bg-[var(--color-crimson-500)]"
                          : "bg-[var(--color-muted)]"
                    }`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
