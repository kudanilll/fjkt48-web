"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SignOut,
  PencilSimple,
  Bell,
  BookmarkSimple,
  ChatCircle,
  Eye,
  Flashlight,
  CheckCircle,
  Radio,
  ArrowRight,
} from "@phosphor-icons/react";
import {
  mockCurrentUser,
  mockNotifications,
  mockSavedThreads,
  type UserNotification,
} from "@/data/user-mock-data";
import { forumThreads } from "@/data/forum-mock-data";
import { TeamBadge } from "@/components/ui/badge";
import Footer from "@/components/layout/footer";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Member } from "@/types/jkt48-types";

const allMembers = (officialData.members ?? []) as JKT48Member[];

export default function DashboardPage() {
  const [user, setUser] = useState(mockCurrentUser);
  const [notifications, setNotifications] =
    useState<UserNotification[]>(mockNotifications);
  const [notifyOshiLive, setNotifyOshiLive] = useState(true);

  // Edit profile state
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);
  const [editOshiCode, setEditOshiCode] = useState(user.oshiCode);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const chosenOshi = allMembers.find((m) => m.code === editOshiCode);
    setUser((prev) => ({
      ...prev,
      name: editName,
      bio: editBio,
      oshiCode: editOshiCode,
      oshiName: chosenOshi ? chosenOshi.name : prev.oshiName,
      oshiNickname: chosenOshi ? chosenOshi.nickname : prev.oshiNickname,
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // User's own threads
  const myThreads = forumThreads.slice(0, 3);

  return (
    <main className="min-h-screen bg-[var(--color-stage-950)] text-[var(--color-ink)]">
      {/* 1. Dashboard Header */}
      <section className="pt-12 sm:pt-16 pb-8 border-b border-[var(--color-stage-800)] relative overflow-hidden">
        {/* Glow */}
        <div
          className="pointer-events-none absolute -top-40 -left-20 h-[600px] w-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(229,19,46,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="mx-auto max-w-[1344px] px-4 sm:px-8 relative z-10 space-y-4">
          <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block">
            DASHBOARD
          </span>

          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[var(--color-ink)] leading-none">
            Halo, {user.username}.
          </h1>

          <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-2xl font-sans">
            Ada {unreadCount} balasan baru di thread kamu, dan{" "}
            {user.oshiNickname} belum masuk lineup show minggu ini.
          </p>
        </div>
      </section>

      {/* 2. Main Dashboard Body: Left & Right Columns */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-[1344px] px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (lg:col-span-4): Profile Card + Oshi Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-stage-900)] space-y-6 relative overflow-hidden">
              <div className="flex items-center gap-4">
                {/* Avatar with spotlight ring */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[var(--color-spotlight)] ring-offset-2 ring-offset-[var(--color-stage-900)] flex-none">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="font-display font-black text-2xl uppercase tracking-tight text-[var(--color-ink)] truncate">
                    {user.name}
                  </h2>
                  <span className="text-xs font-mono text-[var(--color-muted)] block truncate">
                    @{user.username}
                  </span>
                  <div className="mt-1">
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-crimson-500)]/20 text-[var(--color-crimson-400)] font-semibold">
                      Oshi: {user.oshiNickname}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-[var(--color-muted)] font-sans leading-relaxed">
                {user.bio}
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--color-stage-800)] text-center">
                <div className="p-2 rounded-xl bg-[var(--color-stage-800)]">
                  <span className="font-display font-black text-2xl text-[var(--color-ink)] block">
                    {user.stats.threadsCount}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[var(--color-muted)]">
                    Thread
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[var(--color-stage-800)]">
                  <span className="font-display font-black text-2xl text-[var(--color-ink)] block">
                    {user.stats.repliesCount}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[var(--color-muted)]">
                    Balasan
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-[var(--color-stage-800)]">
                  <span className="font-display font-black text-2xl text-[var(--color-crimson-400)] block">
                    {user.stats.reactionsCount}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-[var(--color-muted)]">
                    Lightstick
                  </span>
                </div>
              </div>

              {/* Actions: Edit Profile & Sign Out */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#edit-profile"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold bg-[var(--color-stage-800)] text-[var(--color-ink)] hover:bg-[var(--color-stage-700)] transition-colors"
                >
                  <PencilSimple weight="bold" className="w-3.5 h-3.5" />
                  <span>Edit Profil</span>
                </a>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-[var(--color-stage-800)] text-[var(--color-muted)] hover:text-[var(--color-crimson-400)] hover:bg-[var(--color-stage-700)] transition-colors"
                  title="Keluar akun"
                >
                  <SignOut weight="bold" className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Oshi Card */}
            <div className="rounded-3xl bg-[var(--color-stage-900)] overflow-hidden shadow-xl">
              {/* Oshi Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-stage-800)]">
                <Image
                  src="https://jkt48.com/api/v1/storages/media/jkt48-member/freya_jayawardana.jpg"
                  alt={user.oshiName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 house-tint pointer-events-none" />
                <div className="absolute inset-0 spotlight-vignette pointer-events-none" />
                <div className="absolute inset-0 floor-fade pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-crimson-400)] block">
                      Oshi Kamu
                    </span>
                    <span className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                      {user.oshiName}
                    </span>
                  </div>
                  <TeamBadge team="LOVE" />
                </div>
              </div>

              {/* Oshi Info & Live Notification Toggle */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[var(--color-muted)]">
                    <Radio
                      weight="bold"
                      className="w-4 h-4 text-[var(--color-crimson-400)]"
                    />
                    <span>Terakhir live 2 hari lalu di Showroom</span>
                  </div>
                  <div className="text-[var(--color-subtle)] pl-6">
                    Belum ada lineup show teater minggu ini.
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--color-stage-800)] flex items-center justify-between">
                  <span className="text-xs text-[var(--color-ink)] font-medium font-sans">
                    Kabari aku kalau {user.oshiNickname} live
                  </span>
                  <button
                    type="button"
                    onClick={() => setNotifyOshiLive(!notifyOshiLive)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                      notifyOshiLive
                        ? "bg-[var(--color-crimson-500)]"
                        : "bg-[var(--color-stage-700)]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        notifyOshiLive ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (lg:col-span-8): Notifications, My Threads, Saved */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1: Balasan Buat Kamu (Notifications) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Bell
                    weight="bold"
                    className="w-5 h-5 text-[var(--color-crimson-400)]"
                  />
                  <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--color-ink)]">
                    Balasan Buat Kamu
                  </h2>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-crimson-500)] text-white font-bold">
                      {unreadCount} baru
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="text-xs font-mono text-[var(--color-crimson-400)] hover:underline"
                  >
                    Tandai sudah dibaca
                  </button>
                )}
              </div>

              {/* Notification Rows */}
              <div className="divide-y divide-[var(--color-stage-800)] rounded-2xl bg-[var(--color-stage-900)] overflow-hidden">
                {notifications.map((notif) => (
                  <Link
                    key={notif.id}
                    href={`/forum/${notif.threadSlug}`}
                    className={`p-4 sm:p-5 flex items-start gap-4 transition-colors hover:bg-[var(--color-stage-800)] ${
                      notif.isUnread ? "bg-[var(--color-stage-850)]" : ""
                    }`}
                  >
                    {/* Unread indicator */}
                    <div className="pt-2 flex-none">
                      <span
                        className={`w-2 h-2 rounded-full block ${
                          notif.isUnread
                            ? "bg-[var(--color-crimson-500)]"
                            : "bg-transparent"
                        }`}
                      />
                    </div>

                    {/* Actor Avatar */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none bg-[var(--color-stage-800)]">
                      <Image
                        src={notif.actorAvatar}
                        alt={notif.actorName}
                        fill
                        sizes="40px"
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs sm:text-sm text-[var(--color-ink)] font-sans leading-relaxed">
                        <span className="font-semibold">{notif.actorName}</span>{" "}
                        {notif.type === "reaction" ? (
                          <span className="text-[var(--color-crimson-400)]">
                            {notif.content}
                          </span>
                        ) : (
                          <span>&ldquo;{notif.content}&rdquo;</span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
                        <span className="truncate">
                          di: {notif.threadTitle}
                        </span>
                        <span>&bull;</span>
                        <span className="flex-none">{notif.timeAgo}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 2: Thread Saya */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ChatCircle
                    weight="bold"
                    className="w-5 h-5 text-[var(--color-crimson-400)]"
                  />
                  <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--color-ink)]">
                    Thread Saya
                  </h2>
                </div>

                <Link
                  href="/forum"
                  className="text-xs font-mono text-[var(--color-crimson-400)] hover:underline"
                >
                  Bikin thread baru &rarr;
                </Link>
              </div>

              {/* Thread List */}
              <div className="divide-y divide-[var(--color-stage-800)] rounded-2xl bg-[var(--color-stage-900)] overflow-hidden">
                {myThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    href={`/forum/${thread.slug}`}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--color-stage-800)] transition-colors"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-stage-800)] text-[var(--color-crimson-400)] font-semibold">
                        {thread.categoryName}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-[var(--color-ink)] truncate font-sans">
                        {thread.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-[var(--color-muted)] self-end sm:self-center">
                      <span className="flex items-center gap-1">
                        <Flashlight
                          weight="bold"
                          className="w-3.5 h-3.5 text-[var(--color-crimson-400)]"
                        />
                        {thread.reactions}
                      </span>
                      <span className="flex items-center gap-1">
                        <ChatCircle weight="bold" className="w-3.5 h-3.5" />
                        {thread.repliesCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye weight="bold" className="w-3.5 h-3.5" />
                        {thread.views}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Section 3: Disimpan (Bookmarks) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <BookmarkSimple
                  weight="fill"
                  className="w-5 h-5 text-[var(--color-crimson-400)]"
                />
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--color-ink)]">
                  Disimpan
                </h2>
              </div>

              <div className="divide-y divide-[var(--color-stage-800)] rounded-2xl bg-[var(--color-stage-900)] overflow-hidden">
                {mockSavedThreads.map((saved) => (
                  <Link
                    key={saved.id}
                    href={`/forum/${saved.slug}`}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--color-stage-800)] transition-colors"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-stage-800)] text-[var(--color-muted)]">
                        {saved.categoryName}
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-[var(--color-ink)] truncate font-sans">
                        {saved.title}
                      </h3>
                      <span className="text-xs font-mono text-[var(--color-muted)] block">
                        {saved.savedDate} &bull; oleh @{saved.authorName}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] self-end sm:self-center">
                      <ChatCircle weight="bold" className="w-3.5 h-3.5" />
                      <span>{saved.repliesCount} balasan</span>
                      <ArrowRight
                        weight="bold"
                        className="w-3.5 h-3.5 ml-2 text-[var(--color-crimson-400)]"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Section: Edit Profil Panel */}
      <section
        id="edit-profile"
        className="py-12 sm:py-16 border-t border-[var(--color-stage-800)] bg-[var(--color-stage-900)]/40"
      >
        <div className="mx-auto max-w-[1344px] px-4 sm:px-8">
          <div className="max-w-2xl space-y-6">
            <div>
              <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block mb-1">
                Pengaturan Akun
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-[var(--color-ink)]">
                Edit Profil
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 font-sans">
                Perbarui nama tampilan, bio singkat komunitas, dan member oshi
                pilihanmu.
              </p>
            </div>

            {saveSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-medium text-emerald-400 flex items-center gap-2">
                <CheckCircle weight="bold" className="w-4 h-4" />
                <span>Perubahan profil berhasil disimpan!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Nama Tampilan */}
              <div className="space-y-1.5">
                <label
                  htmlFor="edit-name"
                  className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]"
                >
                  Nama Tampilan
                </label>
                <input
                  id="edit-name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-stage-900)] text-sm text-[var(--color-ink)] border border-[var(--color-stage-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-spotlight)] font-sans"
                />
              </div>

              {/* Bio dengan counter 160 karakter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="edit-bio"
                    className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]"
                  >
                    Bio Komunitas
                  </label>
                  <span className="text-[10px] font-mono text-[var(--color-muted)]">
                    {editBio.length} / 160
                  </span>
                </div>
                <textarea
                  id="edit-bio"
                  rows={3}
                  maxLength={160}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-4 rounded-xl bg-[var(--color-stage-900)] text-sm text-[var(--color-ink)] border border-[var(--color-stage-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-spotlight)] font-sans leading-relaxed resize-none"
                />
              </div>

              {/* Pilih Oshi */}
              <div className="space-y-1.5">
                <label
                  htmlFor="edit-oshi"
                  className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]"
                >
                  Oshi Utama
                </label>
                <select
                  id="edit-oshi"
                  value={editOshiCode}
                  onChange={(e) => setEditOshiCode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--color-stage-900)] text-sm text-[var(--color-ink)] border border-[var(--color-stage-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-spotlight)] font-sans"
                >
                  {allMembers.map((m) => (
                    <option key={m.code} value={m.code}>
                      {m.name} ({m.nickname}) &bull; Team {m.type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[var(--color-crimson-500)] text-white hover:bg-[var(--color-crimson-600)] transition-all shadow-md shadow-[var(--color-crimson-500)]/20"
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditName(user.name);
                    setEditBio(user.bio);
                    setEditOshiCode(user.oshiCode);
                  }}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[var(--color-stage-800)] text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
