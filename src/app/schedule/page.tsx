"use client";

import { useState, useMemo } from "react";
import { Calendar, MagnifyingGlass, Sparkle } from "@phosphor-icons/react";
import SectionHeading from "@/components/shared/section-heading";
import ScheduleCard from "@/components/shared/schedule-card";
import ScrollReveal from "@/components/animation/scroll-reveal";
import { formatDateID } from "@/lib/jkt48-data";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Schedule, ScheduleType } from "@/types/jkt48-types";

interface TypeFilterOption {
  id: "ALL" | ScheduleType;
  label: string;
}

const typeFilters: TypeFilterOption[] = [
  { id: "ALL", label: "Semua Jadwal" },
  { id: "SHOW", label: "Theater Show" },
  { id: "EVENT", label: "Event Khusus" },
  { id: "EXCLUSIVE", label: "Exclusive / 2-Shot" },
  { id: "GENERAL", label: "Festival Umum" },
];

const allSchedules: JKT48Schedule[] = (officialData.schedules ??
  []) as JKT48Schedule[];

export default function JadwalPage() {
  const [selectedType, setSelectedType] = useState<"ALL" | ScheduleType>("ALL");
  const [search, setSearch] = useState<string>("");

  const counts = useMemo(() => {
    return {
      ALL: allSchedules.length,
      SHOW: allSchedules.filter((s) => s.type === "SHOW").length,
      EVENT: allSchedules.filter((s) => s.type === "EVENT").length,
      EXCLUSIVE: allSchedules.filter((s) => s.type === "EXCLUSIVE").length,
      GENERAL: allSchedules.filter((s) => s.type === "GENERAL").length,
    };
  }, []);

  const filteredSchedules = useMemo(() => {
    return allSchedules.filter((s) => {
      const matchType =
        selectedType === "ALL" || s.type.toUpperCase() === selectedType;
      const matchSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.date.includes(search) ||
        (s.jkt48_member_type?.toLowerCase().includes(search.toLowerCase()) ??
          false);
      return matchType && matchSearch;
    });
  }, [selectedType, search]);

  // Group by date
  const groupedSchedules = useMemo(() => {
    const groups: Record<string, JKT48Schedule[]> = {};
    for (const schedule of filteredSchedules) {
      if (!groups[schedule.date]) {
        groups[schedule.date] = [];
      }
      groups[schedule.date]!.push(schedule);
    }
    // Sort dates ascending
    return Object.entries(groups).sort(([dateA], [dateB]) =>
      dateA.localeCompare(dateB)
    );
  }, [filteredSchedules]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <SectionHeading
          eyebrow="Kalender Jadwal Resmi"
          title="Jadwal Teater & Kegiatan JKT48"
          description="Pantau seluruh agenda pertunjukan setlist teater fX Sudirman Lt. 4, sesi 2-shot, konser tour, hingga event perayaan ulang tahun (Seitansai)."
        />

        <div className="flex items-center gap-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 self-start sm:self-auto">
          <Calendar className="h-4 w-4 text-crimson-600" />
          <span>{filteredSchedules.length} Kegiatan Terjadwal</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl border border-neutral-200/80 bg-white/70 dark:border-neutral-800/80 dark:bg-neutral-900/60 backdrop-blur-md">
        {/* Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1">
          {typeFilters.map((t) => {
            const isSelected = selectedType === t.id;
            const count = counts[t.id];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedType(t.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-crimson-600 text-white shadow-sm shadow-crimson-600/30"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <span>{t.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80 flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus-within:border-crimson-600">
          <MagnifyingGlass className="h-4 w-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul show, tim, atau tanggal..."
            className="w-full bg-transparent text-xs focus:outline-none placeholder:text-neutral-400 text-neutral-900 dark:text-neutral-100"
          />
        </div>
      </div>

      {/* Date-Grouped Timeline List */}
      <div className="space-y-8">
        {groupedSchedules.map(([date, items]) => (
          <section key={date} className="space-y-4">
            {/* Date Header Anchor */}
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-crimson-600" />
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {formatDateID(date)}
              </h2>
              <span className="text-xs text-neutral-400 font-medium">
                ({items.length} show)
              </span>
              <div className="h-px flex-1 bg-neutral-200/80 dark:bg-neutral-800/80" />
            </div>

            {/* Grid for that date */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((schedule, idx) => (
                <ScrollReveal key={schedule.schedule_id} delay={idx * 0.05}>
                  <ScheduleCard schedule={schedule} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Empty State */}
      {filteredSchedules.length === 0 && (
        <div className="py-20 text-center space-y-3 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-crimson-50 text-crimson-600 dark:bg-crimson-950/40 dark:text-crimson-400">
            <Sparkle weight="fill" className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Jadwal Tidak Ditemukan
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            Tidak ada jadwal yang cocok dengan kata kunci &quot;{search}&quot;.
            Coba pilih filter kategori lain.
          </p>
        </div>
      )}
    </main>
  );
}
