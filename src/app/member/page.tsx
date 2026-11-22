"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlass, Sparkle, Users } from "@phosphor-icons/react";
import SectionHeading from "@/components/shared/section-heading";
import MemberCard from "@/components/shared/member-card";
import ScrollReveal from "@/components/animation/scroll-reveal";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Member, TeamType } from "@/types/jkt48-types";

interface TeamFilterOption {
  id: "ALL" | TeamType;
  label: string;
}

const teams: TeamFilterOption[] = [
  { id: "ALL", label: "Semua Member" },
  { id: "LOVE", label: "Team Love" },
  { id: "DREAM", label: "Team Dream" },
  { id: "PASSION", label: "Team Passion" },
  { id: "TRAINEE", label: "Trainee" },
];

const allMembers: JKT48Member[] = (officialData.members ?? []) as JKT48Member[];

export default function MemberPage() {
  const [selectedTeam, setSelectedTeam] = useState<"ALL" | TeamType>("ALL");
  const [search, setSearch] = useState<string>("");

  const counts = useMemo(() => {
    return {
      ALL: allMembers.length,
      LOVE: allMembers.filter((m) => m.type === "LOVE").length,
      DREAM: allMembers.filter((m) => m.type === "DREAM").length,
      PASSION: allMembers.filter((m) => m.type === "PASSION").length,
      TRAINEE: allMembers.filter((m) => m.type === "TRAINEE").length,
    };
  }, []);

  const filteredMembers = useMemo(() => {
    return allMembers.filter((m) => {
      const matchTeam =
        selectedTeam === "ALL" || m.type.toUpperCase() === selectedTeam;
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.nickname.toLowerCase().includes(search.toLowerCase());
      return matchTeam && matchSearch;
    });
  }, [selectedTeam, search]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <SectionHeading
          eyebrow="Roster Resmi JKT48"
          title="Katalog Member & Trainee"
          description="Daftar lengkap seluruh idola aktif di JKT48. Temukan oshi-mu, dukung kegiatannya, dan ikuti perjalanan mereka."
        />

        <div className="flex items-center gap-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 self-start sm:self-auto">
          <Users className="h-4 w-4 text-crimson-600" />
          <span>
            {filteredMembers.length} dari {allMembers.length} Member
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl border border-neutral-200/80 bg-white/70 dark:border-neutral-800/80 dark:bg-neutral-900/60 backdrop-blur-md">
        {/* Team Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1">
          {teams.map((t) => {
            const isSelected = selectedTeam === t.id;
            const count = counts[t.id];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTeam(t.id)}
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
            placeholder="Cari nama atau panggilan oshi..."
            className="w-full bg-transparent text-xs focus:outline-none placeholder:text-neutral-400 text-neutral-900 dark:text-neutral-100"
          />
        </div>
      </div>

      {/* Member Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredMembers.map((member, idx) => (
          <ScrollReveal key={member.code} delay={Math.min(idx * 0.03, 0.3)}>
            <MemberCard member={member} priority={idx < 12} />
          </ScrollReveal>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="py-20 text-center space-y-3 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-crimson-50 text-crimson-600 dark:bg-crimson-950/40 dark:text-crimson-400">
            <Sparkle weight="fill" className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Member Tidak Ditemukan
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            Tidak ada member yang cocok dengan kata kunci pencarian &quot;
            {search}&quot;. Coba gunakan nama lain atau reset filter tim.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedTeam("ALL");
            }}
            className="inline-flex text-xs font-semibold text-crimson-600 hover:underline pt-2"
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </main>
  );
}
