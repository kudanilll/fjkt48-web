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

  // Anchor today to 2026-11-21
  const todayString = "2026-11-21";

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
      <div className="grid grid-cols-7 gap-2">
        {weekdays.map((w) => (
          <div
            key={w}
            className="text-left text-[11px] font-mono font-medium tracking-[0.04em] uppercase text-[#A8A0A3] px-1"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-2">
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
              className={`h-[120px] p-3 rounded-xl text-left transition-all relative flex flex-col justify-between overflow-hidden group ${
                isSelected
                  ? "bg-[#1F1B22] ring-2 ring-[#FF4D5E]"
                  : isToday
                    ? "bg-[#18141B] ring-1 ring-[#FF4D5E]/40"
                    : d.isCurrentMonth
                      ? "bg-[#141215] hover:bg-[#1C181E]"
                      : "bg-[#141215]/50 opacity-40 hover:opacity-70"
              }`}
            >
              {/* Day Head */}
              <div className="flex items-center justify-between w-full">
                <span
                  className={`font-display font-black text-2xl leading-none ${
                    isToday
                      ? "text-[#FF4D5E]"
                      : isPast
                        ? "text-[#8A8286]"
                        : d.isCurrentMonth
                          ? "text-[#F4EFEA]"
                          : "text-[#8A8286]"
                  }`}
                >
                  {d.day}
                </span>

                {isToday && (
                  <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full bg-[#E5132E]/20 text-[#FF4D5E]">
                    Hari ini
                  </span>
                )}
              </div>

              {/* Event indicators inside cell */}
              <div className="w-full space-y-1">
                {events.slice(0, 2).map((evt, eIdx) => {
                  const isShow = evt.type === "SHOW";
                  return (
                    <div
                      key={eIdx}
                      className={`w-full flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-sans truncate ${
                        isShow
                          ? "bg-[#E5132E]/15 text-[#F4EFEA]"
                          : "bg-[#FFE7CC]/15 text-[#FFE7CC]"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full flex-none ${
                          isShow ? "bg-[#FF4D5E]" : "bg-[#FFE7CC]"
                        }`}
                      />
                      <span className="truncate font-medium">{evt.title}</span>
                    </div>
                  );
                })}

                {events.length > 2 && (
                  <span className="text-[10px] font-mono text-[#8A8286] block pl-1">
                    +{events.length - 2} event lagi
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
