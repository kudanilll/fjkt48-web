"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Plus } from "@phosphor-icons/react";
import LiveTicker from "@/components/home/live-ticker";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Member } from "@/types/jkt48-types";

const allMembers = (officialData.members ?? []) as JKT48Member[];

interface NotificationItem {
  id: string;
  author: string;
  avatarColor: string;
  threadTitle: string;
  snippet: string;
  time: string;
  unread: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    author: "kopigita",
    avatarColor: "from-amber-500 to-amber-950",
    threadTitle: "MC Show Pertaruhan Cinta hari ini pecah banget",
    snippet:
      "Setuju banget! Pas bagian Gita nge-roasting Oline itu bener-bener gak ketebak, seisi teater langsung ketawa.",
    time: "5 mnt",
    unread: true,
  },
  {
    id: "notif-2",
    author: "anakfx",
    avatarColor: "from-emerald-500 to-emerald-950",
    threadTitle: "Setlist Cara Meminum Ramune vs Pertaruhan Cinta",
    snippet:
      "Kalau dari koreo sih emang Ramune lebih capek, tapi emosi di Pertaruhan Cinta lebih kerasa di encore.",
    time: "18 mnt",
    unread: true,
  },
  {
    id: "notif-3",
    author: "penlightbiru",
    avatarColor: "from-purple-500 to-purple-950",
    threadTitle: "Info rundown & seat 2-Shot Festival Vol. 5",
    snippet:
      "Tadi sempet nanya staf tiket, katanya jalur OFC mulai dibuka jam 11 siang bro.",
    time: "2 jam",
    unread: false,
  },
];

const mockUserThreads = [
  {
    id: "thread-1",
    title:
      "MC Show Pertaruhan Cinta hari ini pecah banget, interaksi Freya sama Gita dapet banget!",
    replies: 128,
    category: "Theater & Setlist",
    views: "2.410",
    time: "Kemarin, 21:40 WIB",
  },
  {
    id: "thread-2",
    title:
      "Prediksi setlist revival theater 2027: apakah Pajama Drive bakal balik lagi?",
    replies: 42,
    category: "Opini & Analisis",
    views: "1.180",
    time: "3 hari lalu",
  },
  {
    id: "thread-3",
    title:
      "Rangkuman Showroom Freya malam ini: cerita di balik latihan lagu baru",
    replies: 18,
    category: "Live Streaming",
    views: "890",
    time: "1 minggu lalu",
  },
  {
    id: "thread-4",
    title:
      "Tips buat yang pertama kali nonton show theater di baris belakang (Row K & L)",
    replies: 9,
    category: "Theater & Setlist",
    views: "640",
    time: "2 minggu lalu",
  },
];

export default function DashboardPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(mockNotifications);
  const [notifyLive, setNotifyLive] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // User state
  const [userName, setUserName] = useState("PenlightMerah");
  const [userHandle] = useState("@penlightmerah");
  const [userBio, setUserBio] = useState(
    "Wota Pajama Drive dari 2019. Kalau dapet tiket, pasti di baris depan bawa lightstick merah."
  );
  const [selectedOshiCode, setSelectedOshiCode] = useState("AFERA_THALIA");

  const oshiMember =
    allMembers.find((m) => m.code === selectedOshiCode) || allMembers[0]!;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <main className="min-h-screen bg-bg text-ink max-w-full overflow-x-hidden">
      {/* 1. Live Ticker */}
      <LiveTicker />

      {/* 2. Dashboard Head Section */}
      <section className="relative overflow-hidden pt-12 pb-12 border-b border-raised max-w-full">
        {/* Spotlight Glow */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[820px] w-[1000px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(229,19,46,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="w-full px-4 sm:px-8 lg:px-16 relative z-10 space-y-4">
          <span className="text-xs font-mono font-medium tracking-[1.5px] uppercase text-accent block">
            DASHBOARD
          </span>

          <h1 className="font-display font-black text-6xl sm:text-8xl lg:text-[96px] uppercase tracking-[-1px] text-ink leading-none">
            HALO, {userName.toUpperCase()}.
          </h1>

          <p className="text-[17px] font-sans text-muted max-w-2xl leading-[26px]">
            Ada {unreadCount} balasan baru di thread kamu, dan{" "}
            {oshiMember.nickname} belum masuk lineup show minggu ini.
          </p>
        </div>
      </section>

      {/* 3. Dashboard Body */}
      <section className="py-12 sm:py-16 max-w-full">
        <div className="w-full px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row items-start gap-10 max-w-full">
          {/* LEFT COLUMN: Profile Card & Oshi Card */}
          <div className="w-full lg:w-[420px] max-w-full flex-none space-y-8">
            {/* Card Profile */}
            <div className="rounded-[14px] bg-surface p-6 sm:p-7 space-y-6">
              {/* Header with Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-crimson-500 bg-gradient-to-br from-accent to-curtain-800 flex items-center justify-center text-white font-display font-black text-2xl flex-none">
                  PM
                </div>

                <div className="min-w-0 space-y-1">
                  <h2 className="font-display font-black text-2xl uppercase tracking-tight text-ink truncate">
                    {userName}
                  </h2>
                  <span className="text-xs font-mono text-muted block truncate">
                    {userHandle}
                  </span>
                  <div className="pt-0.5">
                    <span className="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-crimson-500/20 text-accent font-medium">
                      Oshi: {oshiMember.nickname}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[15px] font-sans text-ink leading-[23px]">
                {userBio}
              </p>

              {/* 3-column stats */}
              <div className="grid grid-cols-3 gap-0 py-4 border-y border-ink-a10 text-center">
                <div className="space-y-1">
                  <span className="font-display font-black text-3xl text-ink block leading-none">
                    14
                  </span>
                  <span className="text-[11px] font-mono uppercase text-muted tracking-[0.5px]">
                    Thread
                  </span>
                </div>
                <div className="space-y-1 border-x border-ink-a10">
                  <span className="font-display font-black text-3xl text-ink block leading-none">
                    128
                  </span>
                  <span className="text-[11px] font-mono uppercase text-muted tracking-[0.5px]">
                    Balasan
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="font-display font-black text-3xl text-ink block leading-none">
                    1.420
                  </span>
                  <span className="text-[11px] font-mono uppercase text-muted tracking-[0.5px]">
                    Lightstick
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-5 py-2.5 rounded-full border border-ink-a35 text-ink text-sm font-medium hover:bg-raised transition-colors"
                >
                  Edit profil
                </button>
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-mono text-muted hover:text-accent transition-colors"
                >
                  Keluar
                </Link>
              </div>

              {/* Editable profile dropdown when toggled */}
              {isEditingProfile && (
                <div className="p-4 rounded-xl bg-bg space-y-4 border border-border mt-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-muted uppercase">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-surface text-sm text-ink focus:outline-none focus:ring-1 focus:ring-focus"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-muted uppercase">
                      Bio
                    </label>
                    <textarea
                      rows={2}
                      value={userBio}
                      onChange={(e) => setUserBio(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-surface text-sm text-ink focus:outline-none focus:ring-1 focus:ring-focus"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-muted uppercase">
                      Ganti Oshi
                    </label>
                    <select
                      value={selectedOshiCode}
                      onChange={(e) => setSelectedOshiCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-surface text-sm text-ink focus:outline-none focus:ring-1 focus:ring-focus"
                    >
                      {allMembers.map((m) => (
                        <option key={m.code} value={m.code}>
                          {m.name} ({m.nickname})
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="w-full py-2 rounded-full bg-crimson-500 text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              )}
            </div>

            {/* Card Oshi */}
            <div className="relative rounded-[14px] bg-surface overflow-hidden min-h-[556px] p-6 sm:p-7 flex flex-col justify-between">
              {/* Photo background */}
              <div className="absolute inset-0">
                <Image
                  src={oshiMember.photo}
                  alt={oshiMember.name}
                  fill
                  sizes="420px"
                  className="object-cover object-top opacity-55"
                />
                <div className="absolute inset-0 bg-house-tint/55 mix-blend-multiply pointer-events-none" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,10,12,0.7) 0%, rgba(11,10,12,0) 30%, rgba(11,10,12,0.92) 75%, rgba(11,10,12,1) 100%)",
                  }}
                />
              </div>

              {/* Kicker top */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono font-medium tracking-[1.2px] uppercase text-accent">
                  OSHI KAMU
                </span>
                <Link
                  href={`/member/${oshiMember.nickname.toLowerCase()}`}
                  className="text-xs font-mono text-muted hover:text-ink flex items-center gap-1"
                >
                  <span>Profil</span>
                  <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 space-y-3 pt-32">
                <h3 className="font-display font-black text-6xl uppercase tracking-tight text-ink leading-none">
                  {oshiMember.nickname.toUpperCase()}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted">
                    Team Dream · Member Tetap
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-subtle">
                    <span className="w-1.5 h-1.5 rounded-full bg-subtle" />
                    Lagi tidak live
                  </span>
                </div>

                <p className="text-[15px] font-sans text-ink leading-[22px]">
                  Belum masuk lineup show minggu ini. Kami kabari begitu ada
                  jadwal.
                </p>

                {/* Toggle notification */}
                <div className="pt-3 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-mono text-muted">
                    Kabari jika live dimulai
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotifyLive(!notifyLive)}
                    className={`w-11 h-6 rounded-full p-1 transition-colors ${
                      notifyLive ? "bg-crimson-500" : "bg-border"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        notifyLive ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Notifications & User Threads */}
          <div className="w-full flex-1 min-w-0 max-w-full space-y-12">
            {/* Section 1: Balasan Buat Kamu */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                <div className="flex items-center gap-3">
                  <h2 className="font-display font-extrabold text-3xl sm:text-[44px] uppercase tracking-[-0.5px] text-ink">
                    BALASAN BUAT KAMU
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-crimson-500 text-white font-mono text-xs font-semibold">
                    {unreadCount} baru
                  </span>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-sm font-semibold text-ink underline underline-offset-4 hover:text-accent transition-colors self-start sm:self-auto"
                  >
                    Tandai sudah dibaca
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-5 rounded-[14px] bg-surface flex items-start gap-4 transition-colors hover:bg-raised"
                  >
                    {/* Unread indicator */}
                    <div className="w-2 pt-3 flex justify-center flex-none">
                      {n.unread ? (
                        <span className="w-2 h-2 rounded-full bg-crimson-500" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-transparent" />
                      )}
                    </div>

                    {/* Author Avatar */}
                    <div
                      className={`relative w-10 h-10 rounded-full overflow-hidden flex-none bg-gradient-to-br ${n.avatarColor} flex items-center justify-center text-white font-mono text-xs font-bold`}
                    >
                      {n.author.slice(0, 2).toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="font-sans font-semibold text-[15px] text-ink">
                          {n.author}
                        </span>
                        <span className="text-xs font-mono text-subtle">
                          membalas di
                        </span>
                        <span className="text-xs font-sans text-muted truncate">
                          &ldquo;{n.threadTitle}&rdquo;
                        </span>
                      </div>

                      <p className="text-[13px] font-sans text-muted line-clamp-2 leading-relaxed">
                        {n.snippet}
                      </p>
                    </div>

                    {/* Time */}
                    <span className="text-xs font-mono text-muted flex-none pt-0.5">
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Thread Saya */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                <h2 className="font-display font-extrabold text-3xl sm:text-[44px] uppercase tracking-[-0.5px] text-ink">
                  THREAD SAYA · 24
                </h2>

                <Link
                  href="/forum/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-crimson-500 text-white text-sm font-semibold hover:bg-crimson-600 transition-colors self-start sm:self-auto"
                >
                  <Plus weight="bold" className="w-4 h-4" />
                  <span>Bikin thread</span>
                </Link>
              </div>

              <div className="space-y-3">
                {mockUserThreads.map((t) => (
                  <Link
                    key={t.id}
                    href={`/forum/${t.id}`}
                    className="group block p-5 rounded-[14px] bg-surface hover:bg-raised transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Left: Replies counter + Thread info */}
                      <div className="flex items-center gap-5 min-w-0">
                        {/* Giant reply count on left */}
                        <div className="w-14 flex-none text-right">
                          <span className="font-display font-black text-4xl text-ink group-hover:text-accent transition-colors block leading-none">
                            {t.replies}
                          </span>
                          <span className="text-[10px] font-mono uppercase text-subtle">
                            balasan
                          </span>
                        </div>

                        {/* Title and meta */}
                        <div className="min-w-0 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-raised text-muted border border-ink-a10 font-medium">
                              {t.category}
                            </span>
                          </div>

                          <h3 className="font-sans font-semibold text-[17px] text-ink group-hover:text-accent transition-colors line-clamp-1">
                            {t.title}
                          </h3>

                          <div className="flex items-center gap-3 text-xs font-mono text-subtle">
                            <span>{t.time}</span>
                            <span>·</span>
                            <span>{t.views} tayangan</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Circular arrow */}
                      <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent transition-colors flex-none">
                        <ArrowUpRight weight="bold" className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
