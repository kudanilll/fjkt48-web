"use client";

import { useState, useMemo } from "react";
import { CaretLeft, CaretRight, CalendarCheck } from "@phosphor-icons/react";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Schedule } from "@/types/jkt48-types";
import ScheduleCalendarGrid from "@/components/schedule/schedule-calendar-grid";
import ScheduleTicketRow from "@/components/schedule/schedule-ticket-row";
import Footer from "@/components/layout/footer";

const allSchedules = (officialData.schedules ?? []) as JKT48Schedule[];

export default function SchedulePage() {
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(10); // 10 = November
  const [typeFilter, setTypeFilter] = useState<"ALL" | "SHOW" | "EVENT">("ALL");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthNames = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

  const counts = useMemo(() => {
    return {
      ALL: allSchedules.length,
      SHOW: allSchedules.filter((s) => s.type === "SHOW").length,
      EVENT: allSchedules.filter((s) => s.type !== "SHOW").length,
    };
  }, []);

  // Filtered schedules according to active type and date
  const filteredSchedules = useMemo(() => {
    return allSchedules.filter((s) => {
      const matchType =
        typeFilter === "ALL" ||
        (typeFilter === "SHOW" && s.type === "SHOW") ||
        (typeFilter === "EVENT" && s.type !== "SHOW");
      const matchDate = selectedDate ? s.date === selectedDate : true;
      return matchType && matchDate;
    });
  }, [typeFilter, selectedDate]);

  // Group schedules: Hari Ini, Minggu Ini, Minggu Depan
  const { todayList, thisWeekList, nextWeekList } = useMemo(() => {
    const today = "2026-11-21"; // Anchored around official dataset time
    const todayItems: JKT48Schedule[] = [];
    const thisWeekItems: JKT48Schedule[] = [];
    const nextWeekItems: JKT48Schedule[] = [];

    for (const item of filteredSchedules) {
      if (item.date === today) {
        todayItems.push(item);
      } else if (item.date > today && item.date <= "2026-11-25") {
        thisWeekItems.push(item);
      } else {
        nextWeekItems.push(item);
      }
    }

    return {
      todayList: todayItems,
      thisWeekList: thisWeekItems,
      nextWeekList: nextWeekItems,
    };
  }, [filteredSchedules]);

  return (
    <main className="min-h-screen bg-[var(--color-stage-950)] text-[var(--color-ink)]">
      {/* 1. Header & Source Line */}
      <section className="pt-12 sm:pt-16 pb-8 border-b border-[var(--color-stage-800)] relative overflow-hidden">
        {/* Glow */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(229,19,46,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="mx-auto max-w-[1344px] px-4 sm:px-8 relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block mb-1">
                Kalender Kegiatan Resmi
              </span>
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[var(--color-ink)]">
                Jadwal
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-xl mt-2 font-sans">
                Agenda pertunjukan teater fX Sudirman Lt. 4, 2-shot, konser, dan
                kegiatan resmi JKT48.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1 text-xs font-mono text-[var(--color-muted)]">
              <span className="text-[var(--color-ink)] font-semibold">
                Sumber: jkt48.com
              </span>
              <span>Diperbarui 21 Nov 2026, 18:30 WIB</span>
            </div>
          </div>

          {/* Controls: Month Navigator + Type Filter Chips */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
            {/* Month Navigator */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Bulan sebelumnya"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-stage-900)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-stage-800)] transition-colors"
              >
                <CaretLeft weight="bold" className="w-4 h-4" />
              </button>

              <span className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--color-ink)] min-w-[200px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Bulan berikutnya"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-stage-900)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-stage-800)] transition-colors"
              >
                <CaretRight weight="bold" className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setTypeFilter("ALL")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  typeFilter === "ALL"
                    ? "bg-[var(--color-crimson-500)] text-white shadow-md shadow-[var(--color-crimson-500)]/20"
                    : "bg-[var(--color-stage-900)] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span>Semua</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-mono">
                  {counts.ALL}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTypeFilter("SHOW")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  typeFilter === "SHOW"
                    ? "bg-[var(--color-crimson-500)] text-white shadow-md shadow-[var(--color-crimson-500)]/20"
                    : "bg-[var(--color-stage-900)] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-crimson-400)]" />
                <span>Show Theater</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-mono">
                  {counts.SHOW}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTypeFilter("EVENT")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  typeFilter === "EVENT"
                    ? "bg-[var(--color-crimson-500)] text-white shadow-md shadow-[var(--color-crimson-500)]/20"
                    : "bg-[var(--color-stage-900)] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[var(--color-muted)]" />
                <span>Event & 2-Shot</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-mono">
                  {counts.EVENT}
                </span>
              </button>

              {selectedDate && (
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="text-xs font-mono text-[var(--color-crimson-400)] hover:underline ml-2"
                >
                  Reset tanggal
                </button>
              )}
            </div>
          </div>

          {/* 2. Month Calendar Grid */}
          <div className="pt-2">
            <ScheduleCalendarGrid
              currentYear={currentYear}
              currentMonth={currentMonth}
              schedules={allSchedules}
              selectedDate={selectedDate}
              onSelectDate={(date) =>
                setSelectedDate(date === selectedDate ? null : date)
              }
              typeFilter={typeFilter}
            />
          </div>
        </div>
      </section>

      {/* 3. Ticket Rows List */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-[1344px] px-4 sm:px-8 space-y-12">
          {/* Group 1: Hari Ini */}
          {todayList.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-crimson-500)] animate-pulse" />
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--color-ink)]">
                  Hari Ini · 21 November 2026
                </h2>
              </div>
              <div className="space-y-3">
                {todayList.map((item) => (
                  <ScheduleTicketRow
                    key={item.schedule_id}
                    schedule={item}
                    isToday={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Minggu Ini */}
          {thisWeekList.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--color-ink)]">
                Minggu Ini
              </h2>
              <div className="space-y-3">
                {thisWeekList.map((item, idx) => (
                  <ScheduleTicketRow
                    key={item.schedule_id}
                    schedule={item}
                    isNextShow={idx === 0}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Group 3: Minggu Depan / Mendatang */}
          {nextWeekList.length > 0 && (
            <div className="space-y-4">
              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--color-ink)]">
                Minggu Depan
              </h2>
              <div className="space-y-3">
                {nextWeekList.map((item) => (
                  <ScheduleTicketRow key={item.schedule_id} schedule={item} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state when filtering yields no results */}
          {filteredSchedules.length === 0 && (
            <div className="p-12 rounded-3xl bg-[var(--color-stage-900)] text-center space-y-3">
              <CalendarCheck
                weight="duotone"
                className="w-12 h-12 mx-auto text-[var(--color-stage-700)]"
              />
              <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                Tidak ada agenda pada tanggal ini
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                Pilih tanggal lain di kalender atau klik tombol &ldquo;Reset
                tanggal&rdquo; di atas.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
