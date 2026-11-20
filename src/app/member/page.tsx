"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import {
  MagnifyingGlass,
  ArrowLeft,
  Heart,
  Sparkle,
  Fire,
} from "@phosphor-icons/react";
import officialData from "@/data/jkt48-official.json";

interface MemberItem {
  type: string;
  code: string;
  name: string;
  nickname: string;
  photo: string;
  jkt48_member_id: number;
}

const teams = [
  { id: "ALL", label: "Semua Member" },
  { id: "LOVE", label: "Team Love" },
  { id: "DREAM", label: "Team Dream" },
  { id: "PASSION", label: "Team Passion" },
  { id: "TRAINEE", label: "Trainee" },
];

export default function MemberPage() {
  const [selectedTeam, setSelectedTeam] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const members: MemberItem[] = officialData.members || [];

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchTeam =
        selectedTeam === "ALL" || m.type.toUpperCase() === selectedTeam;
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.nickname.toLowerCase().includes(search.toLowerCase());
      return matchTeam && matchSearch;
    });
  }, [members, selectedTeam, search]);

  const toggleFavorite = (code: string) => {
    setFavorites((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const getTeamBadgeColor = (type: string) => {
    switch (type.toUpperCase()) {
      case "LOVE":
        return "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800";
      case "DREAM":
        return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800";
      case "PASSION":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
      case "TRAINEE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center gap-2 font-bold text-base tracking-tight">
          <span className="p-1 rounded-md bg-rose-600 text-white">
            <Sparkle weight="fill" className="w-3.5 h-3.5" />
          </span>
          <span>
            FJKT48 <span className="text-rose-600 font-semibold">Members</span>
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Page Hero */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
            <Fire weight="fill" className="w-3.5 h-3.5" />
            <span>Official JKT48 Rosters</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Katalog Member & Trainee
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Temukan profil oshi dan member favoritmu dari Team Love, Team Dream,
            Team Passion, hingga generasi Trainee terbaru.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Team Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {teams.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTeam(t.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedTeam === t.id
                      ? "bg-rose-600 text-white shadow-sm shadow-rose-600/30"
                      : "bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full sm:w-72 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus-within:border-rose-600">
              <MagnifyingGlass className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Sedang mencari oshi-mu?..."
                className="w-full bg-transparent text-xs focus:outline-none placeholder:text-neutral-400 text-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMembers.map((m) => {
            const isFav = !!favorites[m.code];
            return (
              <Card
                key={m.code}
                className="group relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-rose-300 dark:hover:border-rose-900/60 transition-all duration-300 hover:shadow-lg rounded-2xl flex flex-col"
              >
                {/* Photo Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Team badge overlay */}
                  <span
                    className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getTeamBadgeColor(
                      m.type
                    )}`}
                  >
                    {m.type}
                  </span>

                  {/* Favorite button */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(m.code)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
                    aria-label={`Favorite ${m.name}`}
                  >
                    <Heart
                      weight={isFav ? "fill" : "regular"}
                      className={`w-4 h-4 ${isFav ? "text-rose-500" : "text-white"}`}
                    />
                  </button>
                </div>

                {/* Details */}
                <Card.Content className="p-3.5 flex flex-col flex-1 justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-50 truncate">
                      {m.name}
                    </h3>
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-0.5">
                      ({m.nickname})
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full text-xs font-semibold flex items-center justify-center gap-1.5 py-1.5 rounded-lg"
                  >
                    <Heart
                      weight="fill"
                      className="w-3.5 h-3.5 text-rose-600"
                    />
                    <span>Dukung</span>
                  </Button>
                </Card.Content>
              </Card>
            );
          })}
        </div>

        {filteredMembers.length === 0 && (
          <div className="py-16 text-center text-neutral-400 space-y-2">
            <p className="text-base font-semibold">
              Tidak ada member ditemukan
            </p>
            <p className="text-xs">
              Coba ubah kata kunci pencarian atau pilih kategori tim lain.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
