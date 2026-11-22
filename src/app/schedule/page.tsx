"use client";

import { useState, useMemo } from "react";
import { CaretLeft, CaretRight, CalendarCheck } from "@phosphor-icons/react";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Schedule } from "@/types/jkt48-types";
import LiveTicker from "@/components/home/live-ticker";
import ScheduleCalendarGrid from "@/components/schedule/schedule-calendar-grid";
import ScheduleTicketRow from "@/components/schedule/schedule-ticket-row";

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
      } else if (item.date > today && item.date <= "2026-11-28") {
        thisWeekItems.push(item);
      } else if (item.date > "2026-11-28") {
        nextWeekItems.push(item);
      } else {
        // Earlier dates if selected via calendar
        todayItems.push(item);
      }
    }

    return {
      todayList: todayItems,
      thisWeekList: thisWeekItems,
      nextWeekList: nextWeekItems,
    };
  }, [filteredSchedules]);

  return (
    <main className="min-h-screen bg-[#0B0A0C] text-[#F4EFEA]">
      {/* 1. Live Ticker */}
      <LiveTicker />

      {/* 2. Jadwal Head Section */}
      <section className="relative overflow-hidden pt-12 pb-14 border-b border-[#1D1A1F]">
        {/* Spotlight Glow */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[820px] w-[1000px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(229,19,46,0.11) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="w-full px-6 sm:px-12 lg:px-16 relative z-10 space-y-10">
          {/* H1 & Lede Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h1 className="font-display font-black text-7xl sm:text-9xl lg:text-[168px] leading-none tracking-[-0.04em] text-[#F4EFEA] uppercase">
              JADWAL
            </h1>

            <div className="max-w-[468px] space-y-3">
              <p className="text-[17px] font-sans text-[#A8A0A3] leading-[26px]">
                Show theater, 2-Shot, dan event JKT48. Tiap jadwal punya ruang
                diskusinya sendiri, jadi obrolan soal satu show nggak tercecer.
              </p>
              <p className="text-xs font-mono font-medium text-[#8A8286]">
                Sumber: jkt48.com · diperbarui 06:00 WIB
              </p>
            </div>
          </div>

          {/* Controls: Month Nav + Filter Chips */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            {/* Month Nav */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Bulan sebelumnya"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-[#2B272D] text-[#F4EFEA] hover:bg-[#1D1A1F] transition-colors"
              >
                <CaretLeft weight="bold" className="w-5 h-5" />
              </button>

              <span className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[#F4EFEA] min-w-[210px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Bulan berikutnya"
                className="w-11 h-11 rounded-full flex items-center justify-center border border-[#2B272D] text-[#F4EFEA] hover:bg-[#1D1A1F] transition-colors"
              >
                <CaretRight weight="bold" className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setTypeFilter("ALL");
                  setSelectedDate(null);
                }}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  typeFilter === "ALL" && !selectedDate
                    ? "bg-[#F4EFEA] text-[#0B0A0C]"
                    : "bg-[#1D1A1F] text-[#F4EFEA] border border-[#F4EFEA]/10 hover:border-[#F4EFEA]/30"
                }`}
              >
                <span>Semua</span>
              </button>

              <button
                type="button"
                onClick={() => setTypeFilter("SHOW")}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                  typeFilter === "SHOW"
                    ? "bg-[#F4EFEA] text-[#0B0A0C] border-transparent"
                    : "bg-[#1D1A1F] text-[#F4EFEA] border-[#F4EFEA]/10 hover:border-[#F4EFEA]/30"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#FF4D5E]" />
                <span>Show theater</span>
                <span className="text-xs font-mono text-[#A8A0A3]">
                  {counts.SHOW}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTypeFilter("EVENT")}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
                  typeFilter === "EVENT"
                    ? "bg-[#F4EFEA] text-[#0B0A0C] border-transparent"
                    : "bg-[#1D1A1F] text-[#F4EFEA] border-[#F4EFEA]/10 hover:border-[#F4EFEA]/30"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#A8A0A3]" />
                <span>Event & 2-Shot</span>
                <span className="text-xs font-mono text-[#A8A0A3]">
                  {counts.EVENT}
                </span>
              </button>

              {selectedDate && (
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="text-xs font-mono text-[#FF4D5E] hover:underline ml-2"
                >
                  Reset tanggal ({selectedDate})
                </button>
              )}
            </div>
          </div>

          {/* Calendar Grid */}
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

      {/* 3. Jadwal Body Section */}
      <section className="py-14 sm:py-20">
        <div className="w-full px-6 sm:px-12 lg:px-16 space-y-16">
          {/* Group 1: HARI INI */}
          {todayList.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-baseline gap-4 pb-2">
                <h2 className="font-display font-extrabold text-4xl sm:text-[56px] uppercase tracking-[-1px] text-[#F4EFEA] leading-none">
                  HARI INI
                </h2>
                <span className="text-[13px] font-mono font-medium text-[#A8A0A3] uppercase">
                  SAB, 21 NOV · {todayList.length} EVENT
                </span>
              </div>

              <div className="space-y-4">
                {todayList.map((item, idx) => (
                  <ScheduleTicketRow
                    key={item.schedule_id || idx}
                    schedule={item}
                    isToday={true}
                    replyCount={12 + idx * 6}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Group 2: MINGGU INI */}
          {thisWeekList.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-baseline gap-4 pb-2">
                <h2 className="font-display font-extrabold text-4xl sm:text-[56px] uppercase tracking-[-1px] text-[#F4EFEA] leading-none">
                  MINGGU INI
                </h2>
                <span className="text-[13px] font-mono font-medium text-[#A8A0A3] uppercase">
                  22-28 NOV · {thisWeekList.length} SHOW
                </span>
              </div>

              <div className="space-y-4">
                {thisWeekList.map((item, idx) => (
                  <ScheduleTicketRow
                    key={item.schedule_id || idx}
                    schedule={item}
                    replyCount={38 + idx * 14}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Group 3: MINGGU DEPAN */}
          {nextWeekList.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-baseline gap-4 pb-2">
                <h2 className="font-display font-extrabold text-4xl sm:text-[56px] uppercase tracking-[-1px] text-[#F4EFEA] leading-none">
                  MINGGU DEPAN
                </h2>
                <span className="text-[13px] font-mono font-medium text-[#A8A0A3] uppercase">
                  29 NOV-05 DES
                </span>
              </div>

              <div className="space-y-4">
                {nextWeekList.map((item, idx) => (
                  <ScheduleTicketRow
                    key={item.schedule_id || idx}
                    schedule={item}
                    replyCount={20 + idx * 8}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {filteredSchedules.length === 0 && (
            <div className="p-16 rounded-[14px] bg-[#141215] text-center space-y-4">
              <CalendarCheck
                weight="duotone"
                className="w-12 h-12 mx-auto text-[#8A8286]"
              />
              <h3 className="text-xl font-bold text-[#F4EFEA]">
                Tidak ada agenda pada tanggal ini
              </h3>
              <p className="text-sm text-[#A8A0A3] max-w-md mx-auto">
                Pilih tanggal lain di kalender atau klik tombol &ldquo;Reset
                tanggal&rdquo; di atas.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
