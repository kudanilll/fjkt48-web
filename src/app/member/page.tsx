"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { MagnifyingGlass, Users } from "@phosphor-icons/react";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Member, TeamType } from "@/types/jkt48-types";
import { TeamBadge } from "@/components/ui/badge";
import Footer from "@/components/layout/footer";

interface TeamFilterOption {
  id: "ALL" | TeamType;
  label: string;
  dotColor?: string;
}

const teams: TeamFilterOption[] = [
  { id: "ALL", label: "Semua Member" },
  { id: "LOVE", label: "Team Love", dotColor: "#EC4899" },
  { id: "DREAM", label: "Team Dream", dotColor: "#0EA5E9" },
  { id: "PASSION", label: "Team Passion", dotColor: "#F59E0B" },
  { id: "TRAINEE", label: "Trainee", dotColor: "#10B981" },
];

const allMembers: JKT48Member[] = (officialData.members ?? []) as JKT48Member[];

export default function MemberDirectoryPage() {
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
    <main className="min-h-screen bg-[var(--color-stage-950)] text-[var(--color-ink)]">
      {/* Header & Filter Section */}
      <section className="py-12 sm:py-16 md:py-20 border-b border-[var(--color-stage-800)] relative overflow-hidden">
        {/* Ambient spotlight behind header */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(229,19,46,0.18) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="mx-auto max-w-[1344px] px-4 sm:px-8 relative z-10 space-y-8">
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block mb-1">
                Katalog Resmi Anggota
              </span>
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[var(--color-ink)]">
                {counts[selectedTeam]} Member
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-xl mt-2 font-sans">
                Daftar lengkap seluruh idola aktif di JKT48. Temukan oshi
                pilihanmu, ikuti jadwal pertunjukan panggung mereka, dan
                diskusikan di forum.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-stage-900)] text-xs font-mono text-[var(--color-muted)] self-start md:self-auto border border-[var(--color-stage-800)]">
              <Users
                weight="bold"
                className="w-4 h-4 text-[var(--color-crimson-400)]"
              />
              <span>
                {filteredMembers.length} dari {allMembers.length} Aktif
              </span>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-3 rounded-2xl bg-[var(--color-stage-900)]">
            {/* Team Filter Segmented Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {teams.map((t) => {
                const isSelected = selectedTeam === t.id;
                const count = counts[t.id];
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTeam(t.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-[var(--color-crimson-500)] text-white shadow-md shadow-[var(--color-crimson-500)]/20"
                        : "text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-stage-800)]"
                    }`}
                  >
                    {t.dotColor && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: t.dotColor }}
                      />
                    )}
                    <span>{t.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-[var(--color-stage-800)] text-[var(--color-muted)]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] max-w-md">
              <MagnifyingGlass
                weight="bold"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau nickname..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[var(--color-stage-800)] text-xs text-[var(--color-ink)] placeholder-[var(--color-subtle)] border border-[var(--color-stage-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-spotlight)] transition-all font-sans"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Member Cards Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1344px] px-4 sm:px-8">
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {filteredMembers.map((member) => (
                <Link
                  key={member.code}
                  href={`/member/${member.code}`}
                  className="group relative rounded-2xl overflow-hidden bg-[var(--color-stage-900)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col"
                >
                  {/* Portrait with the three mandatory overlays */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-stage-800)]">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* 1. House Tint */}
                    <div className="absolute inset-0 house-tint pointer-events-none" />

                    {/* 2. Spotlight Vignette */}
                    <div className="absolute inset-0 spotlight-vignette pointer-events-none" />

                    {/* 3. Floor Fade */}
                    <div className="absolute inset-0 floor-fade pointer-events-none" />

                    {/* Interactive Spotlight Glow on Hover */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,231,204,0.18),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Team Badge pill on top right */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <TeamBadge team={member.type} />
                    </div>
                  </div>

                  {/* Member Name and Nickname */}
                  <div className="p-3.5 bg-[var(--color-stage-900)] flex flex-col justify-between flex-1">
                    <div>
                      <span className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-crimson-400)] transition-colors block truncate">
                        {member.nickname}
                      </span>
                      <span className="text-xs text-[var(--color-muted)] truncate block mt-0.5">
                        {member.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-3">
              <Users
                weight="duotone"
                className="w-12 h-12 mx-auto text-[var(--color-stage-700)]"
              />
              <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                Tidak ada member yang cocok
              </h3>
              <p className="text-sm text-[var(--color-muted)]">
                Coba ubah kata kunci pencarian atau pilih kategori tim lainnya.
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
