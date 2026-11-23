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
      const prevD = prevMonthLastDay - i;
      const prevM = currentMonth === 0 ? 12 : currentMonth;
      const prevY = currentMonth === 0 ? currentYear - 1 : currentYear;
      prevDays.push({
        day: prevD,
        dateString: `${prevY}-${String(prevM).padStart(2, "0")}-${String(prevD).padStart(2, "0")}`,
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

    // Next month trailing days to complete 5 rows (35 slots)
    const totalFilled = prevDays.length + currentDays.length;
    const targetSlots = totalFilled <= 35 ? 35 : 42;
    const nextDays = [];
    for (let d = 1; d <= targetSlots - totalFilled; d++) {
      const nextM = currentMonth + 2 > 12 ? 1 : currentMonth + 2;
      const nextY = currentMonth + 2 > 12 ? currentYear + 1 : currentYear;
      const monthStr = String(nextM).padStart(2, "0");
      const dayStr = String(d).padStart(2, "0");
      nextDays.push({
        day: d,
        dateString: `${nextY}-${monthStr}-${dayStr}`,
        isCurrentMonth: false,
      });
    }

    return [...prevDays, ...currentDays, ...nextDays];
  }, [currentYear, currentMonth]);

  // Current date in Asia/Jakarta
  const todayString = useMemo(() => {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
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
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 lg:gap-2">
        {weekdays.map((w) => (
          <div
            key={w}
            className="text-center sm:text-left text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.04em] uppercase text-muted px-1"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 lg:gap-2">
        {calendarDays.map((d, idx) => {
          const events = scheduleMap[d.dateString] ?? [];
          const isToday = d.dateString === todayString;
          const isSelected = selectedDate === d.dateString;
          const isPast = d.dateString < todayString;

          return (
            <button
              key={`${d.dateString}-${idx}`}
              type="button"
              onClick={() => onSelectDate(d.dateString)}
              className={`h-[56px] sm:h-[104px] lg:h-[120px] p-1.5 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl text-left transition-all relative flex flex-col justify-between overflow-hidden group ${
                isSelected
                  ? "bg-raised ring-2 ring-focus"
                  : isToday
                    ? "bg-crimson-500 text-white"
                    : d.isCurrentMonth
                      ? "bg-surface hover:bg-raised"
                      : "bg-surface/50 opacity-30 hover:opacity-60"
              }`}
            >
              {/* Day Head */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`font-display font-black text-lg sm:text-2xl leading-none ${
                    isToday
                      ? "text-white"
                      : isPast
                        ? "text-subtle"
                        : d.isCurrentMonth
                          ? "text-ink"
                          : "text-subtle"
                  }`}
                >
                  {d.day}
                </span>

                {isToday && (
                  <span className="hidden sm:inline-block text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full bg-white/20 text-white">
                    HARI INI
                  </span>
                )}
              </div>

              {/* Mobile event indicators: round 5px dots */}
              <div className="flex sm:hidden items-center gap-1 mt-auto">
                {events.slice(0, 3).map((evt, eIdx) => {
                  return (
                    <span
                      key={eIdx}
                      className={`w-[5px] h-[5px] rounded-full flex-none ${
                        isToday
                          ? "bg-white"
                          : evt.type === "SHOW"
                            ? "bg-crimson-500"
                            : "bg-spotlight"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Desktop & Tablet: dot + text lines */}
              <div className="hidden sm:flex flex-col space-y-1 w-full mt-auto">
                {events.slice(0, 2).map((evt, eIdx) => {
                  const isShow = evt.type === "SHOW";
                  const timeStr = evt.start_time?.slice(0, 5) ?? "19:00";
                  return (
                    <div
                      key={eIdx}
                      className={`w-full flex items-center gap-1.5 text-xs truncate ${
                        isToday ? "text-white" : "text-ink"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-none ${
                          isToday
                            ? "bg-white"
                            : isShow
                              ? "bg-accent"
                              : "bg-spotlight"
                        }`}
                      />
                      <span className="hidden lg:inline font-mono text-[11px] shrink-0">
                        {timeStr}
                      </span>
                      <span className="truncate font-medium">{evt.title}</span>
                    </div>
                  );
                })}

                {events.length > 2 && (
                  <span
                    className={`text-[10px] font-mono block pl-3 ${
                      isToday ? "text-white/80" : "text-subtle"
                    }`}
                  >
                    +{events.length - 2} lagi
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
