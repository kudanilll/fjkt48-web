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
    avatarColor: "from-[#F59E0B] to-[#78350F]",
    threadTitle: "MC Show Pertaruhan Cinta hari ini pecah banget",
    snippet:
      "Setuju banget! Pas bagian Gita nge-roasting Oline itu bener-bener gak ketebak, seisi teater langsung ketawa.",
    time: "5 mnt",
    unread: true,
  },
  {
    id: "notif-2",
    author: "anakfx",
    avatarColor: "from-[#10B981] to-[#064E3B]",
    threadTitle: "Setlist Cara Meminum Ramune vs Pertaruhan Cinta",
    snippet:
      "Kalau dari koreo sih emang Ramune lebih capek, tapi emosi di Pertaruhan Cinta lebih kerasa di encore.",
    time: "18 mnt",
    unread: true,
  },
  {
    id: "notif-3",
    author: "penlightbiru",
    avatarColor: "from-[#8B5CF6] to-[#4C1D95]",
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
  const [selectedOshiCode, setSelectedOshiCode] = useState("FREYA_JAYAWARDANA");

  const oshiMember =
    allMembers.find((m) => m.code === selectedOshiCode) || allMembers[0]!;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <main className="min-h-screen bg-[#0B0A0C] text-[#F4EFEA]">
      {/* 1. Live Ticker */}
      <LiveTicker />

      {/* 2. Dashboard Head Section */}
      <section className="relative overflow-hidden pt-12 pb-12 border-b border-[#1D1A1F]">
        {/* Spotlight Glow */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[820px] w-[1000px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(229,19,46,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="w-full px-6 sm:px-12 lg:px-16 relative z-10 space-y-4">
          <span className="text-xs font-mono font-medium tracking-[1.5px] uppercase text-[#FF4D5E] block">
            DASHBOARD
          </span>

          <h1 className="font-display font-black text-6xl sm:text-8xl lg:text-[96px] uppercase tracking-[-1px] text-[#F4EFEA] leading-none">
            HALO, {userName.toUpperCase()}.
          </h1>

          <p className="text-[17px] font-sans text-[#A8A0A3] max-w-2xl leading-[26px]">
            Ada {unreadCount} balasan baru di thread kamu, dan{" "}
            {oshiMember.nickname} belum masuk lineup show minggu ini.
          </p>
        </div>
      </section>

      {/* 3. Dashboard Body */}
      <section className="py-12 sm:py-16">
        <div className="w-full px-6 sm:px-12 lg:px-16 flex flex-col lg:flex-row items-start gap-10">
          {/* LEFT COLUMN: Profile Card & Oshi Card */}
          <div className="w-full lg:w-[420px] flex-none space-y-8">
            {/* Card Profile */}
            <div className="rounded-[14px] bg-[#141215] p-6 sm:p-7 space-y-6">
              {/* Header with Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#E5132E] bg-gradient-to-br from-[#FF4D5E] to-[#7A0B1A] flex items-center justify-center text-white font-display font-black text-2xl flex-none">
                  PM
                </div>

                <div className="min-w-0 space-y-1">
                  <h2 className="font-display font-black text-2xl uppercase tracking-tight text-[#F4EFEA] truncate">
                    {userName}
                  </h2>
                  <span className="text-xs font-mono text-[#A8A0A3] block truncate">
                    {userHandle}
                  </span>
                  <div className="pt-0.5">
                    <span className="inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#E5132E]/20 text-[#FF4D5E] font-medium">
                      Oshi: {oshiMember.nickname}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[15px] font-sans text-[#F4EFEA] leading-[23px]">
                {userBio}
              </p>

              {/* 3-column stats */}
              <div className="grid grid-cols-3 gap-0 py-4 border-y border-[#F4EFEA]/10 text-center">
                <div className="space-y-1">
                  <span className="font-display font-black text-3xl text-[#F4EFEA] block leading-none">
                    14
                  </span>
                  <span className="text-[11px] font-mono uppercase text-[#A8A0A3] tracking-[0.5px]">
                    Thread
                  </span>
                </div>
                <div className="space-y-1 border-x border-[#F4EFEA]/10">
                  <span className="font-display font-black text-3xl text-[#F4EFEA] block leading-none">
                    128
                  </span>
                  <span className="text-[11px] font-mono uppercase text-[#A8A0A3] tracking-[0.5px]">
                    Balasan
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="font-display font-black text-3xl text-[#F4EFEA] block leading-none">
                    1.420
                  </span>
                  <span className="text-[11px] font-mono uppercase text-[#A8A0A3] tracking-[0.5px]">
                    Poin Oshi
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-5 py-2.5 rounded-full border border-[#F4EFEA]/35 text-[#F4EFEA] text-sm font-medium hover:bg-[#1D1A1F] transition-colors"
                >
                  Edit profil
                </button>
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-mono text-[#A8A0A3] hover:text-[#FF4D5E] transition-colors"
                >
                  Keluar
                </Link>
              </div>

              {/* Editable profile dropdown when toggled */}
              {isEditingProfile && (
                <div className="p-4 rounded-xl bg-[#0B0A0C] space-y-4 border border-[#2B272D] mt-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A8A0A3] uppercase">
                      Nama
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#141215] text-sm text-[#F4EFEA] focus:outline-none focus:ring-1 focus:ring-[#FF4D5E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A8A0A3] uppercase">
                      Bio
                    </label>
                    <textarea
                      rows={2}
                      value={userBio}
                      onChange={(e) => setUserBio(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#141215] text-sm text-[#F4EFEA] focus:outline-none focus:ring-1 focus:ring-[#FF4D5E]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#A8A0A3] uppercase">
                      Ganti Oshi
                    </label>
                    <select
                      value={selectedOshiCode}
                      onChange={(e) => setSelectedOshiCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#141215] text-sm text-[#F4EFEA] focus:outline-none focus:ring-1 focus:ring-[#FF4D5E]"
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
                    className="w-full py-2 rounded-full bg-[#E5132E] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              )}
            </div>

            {/* Card Oshi */}
            <div className="relative rounded-[14px] bg-[#141215] overflow-hidden min-h-[556px] p-6 sm:p-7 flex flex-col justify-between">
              {/* Photo background */}
              <div className="absolute inset-0">
                <Image
                  src={oshiMember.photo}
                  alt={oshiMember.name}
                  fill
                  sizes="420px"
                  className="object-cover object-top opacity-55"
                />
                <div className="absolute inset-0 bg-[#3A0710]/55 mix-blend-multiply pointer-events-none" />
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
                <span className="text-xs font-mono font-medium tracking-[1.2px] uppercase text-[#FF4D5E]">
                  OSHI KAMU
                </span>
                <Link
                  href={`/member/${oshiMember.nickname.toLowerCase()}`}
                  className="text-xs font-mono text-[#A8A0A3] hover:text-[#F4EFEA] flex items-center gap-1"
                >
                  <span>Profil</span>
                  <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 space-y-3 pt-32">
                <h3 className="font-display font-black text-6xl uppercase tracking-tight text-[#F4EFEA] leading-none">
                  {oshiMember.nickname.toUpperCase()}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#A8A0A3]">
                    Team Dream · Member Tetap
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8A8286]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A8286]" />
                    Lagi tidak live
                  </span>
                </div>

                <p className="text-[15px] font-sans text-[#F4EFEA] leading-[22px]">
                  Belum masuk lineup show minggu ini. Kami kabari begitu ada
                  jadwal.
                </p>

                {/* Toggle notification */}
                <div className="pt-3 border-t border-[#F4EFEA]/12 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#A8A0A3]">
                    Kabari jika live dimulai
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotifyLive(!notifyLive)}
                    className={`w-11 h-6 rounded-full p-1 transition-colors ${
                      notifyLive ? "bg-[#E5132E]" : "bg-[#2B272D]"
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
          <div className="flex-1 min-w-0 space-y-12">
            {/* Section 1: Balasan Terbaru */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-3">
                  <h2 className="font-display font-extrabold text-3xl sm:text-[44px] uppercase tracking-[-0.5px] text-[#F4EFEA]">
                    BALASAN TERBARU · {notifications.length}
                  </h2>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-sm font-semibold text-[#F4EFEA] underline underline-offset-4 hover:text-[#FF4D5E] transition-colors"
                  >
                    Tandai sudah dibaca
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-5 rounded-[14px] bg-[#141215] flex items-start gap-4 transition-colors hover:bg-[#1A181C]"
                  >
                    {/* Unread indicator */}
                    <div className="w-2 pt-3 flex justify-center flex-none">
                      {n.unread ? (
                        <span className="w-2 h-2 rounded-full bg-[#E5132E]" />
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
                        <span className="font-sans font-semibold text-[15px] text-[#F4EFEA]">
                          {n.author}
                        </span>
                        <span className="text-xs font-mono text-[#8A8286]">
                          membalas di
                        </span>
                        <span className="text-xs font-sans text-[#A8A0A3] truncate">
                          &ldquo;{n.threadTitle}&rdquo;
                        </span>
                      </div>

                      <p className="text-[13px] font-sans text-[#A8A0A3] line-clamp-2 leading-relaxed">
                        {n.snippet}
                      </p>
                    </div>

                    {/* Time */}
                    <span className="text-xs font-mono text-[#A8A0A3] flex-none pt-0.5">
                      {n.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Thread Saya */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h2 className="font-display font-extrabold text-3xl sm:text-[44px] uppercase tracking-[-0.5px] text-[#F4EFEA]">
                  THREAD SAYA · 24
                </h2>

                <Link
                  href="/forum/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E5132E] text-white text-sm font-semibold hover:bg-[#CC0E26] transition-colors"
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
                    className="group block p-5 rounded-[14px] bg-[#141215] hover:bg-[#1A181C] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Left: Replies counter + Thread info */}
                      <div className="flex items-center gap-5 min-w-0">
                        {/* Giant reply count on left */}
                        <div className="w-14 flex-none text-right">
                          <span className="font-display font-black text-4xl text-[#F4EFEA] group-hover:text-[#FF4D5E] transition-colors block leading-none">
                            {t.replies}
                          </span>
                          <span className="text-[10px] font-mono uppercase text-[#8A8286]">
                            balasan
                          </span>
                        </div>

                        {/* Title and meta */}
                        <div className="min-w-0 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#1D1A1F] text-[#A8A0A3] border border-[#F4EFEA]/10 font-medium">
                              {t.category}
                            </span>
                          </div>

                          <h3 className="font-sans font-semibold text-[17px] text-[#F4EFEA] group-hover:text-[#FF4D5E] transition-colors line-clamp-1">
                            {t.title}
                          </h3>

                          <div className="flex items-center gap-3 text-xs font-mono text-[#8A8286]">
                            <span>{t.time}</span>
                            <span>·</span>
                            <span>{t.views} tayangan</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Circular arrow */}
                      <div className="w-10 h-10 rounded-full border border-[#2B272D] flex items-center justify-center text-[#A8A0A3] group-hover:border-[#FF4D5E] group-hover:text-[#FF4D5E] transition-colors flex-none">
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
