"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeSlash,
  Check,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";
import { authClient } from "@/lib/auth-client";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Member } from "@/types/jkt48-types";

const allMembers = (officialData.members ?? []) as JKT48Member[];

// Suggested members for quick pick (5 for mobile/desktop, 8 for tablet)
const suggestedNicknames = [
  "freya",
  "christy",
  "gita",
  "marsha",
  "muthe",
  "fiony",
  "kathrina",
  "lulu",
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOshi, setSelectedOshi] = useState<string>("freya");
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchMemberQuery, setSearchMemberQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filter members for modal
  const filteredModalMembers = useMemo(() => {
    if (!searchMemberQuery.trim()) return allMembers;
    const q = searchMemberQuery.toLowerCase();
    return allMembers.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.nickname.toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q)
    );
  }, [searchMemberQuery]);

  // Password strength calculation (0 to 4)
  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const passwordHint = useMemo(() => {
    switch (passwordStrength) {
      case 0:
        return "Minimal 8 karakter.";
      case 1:
        return "Agak lemah. Tambah huruf besar atau angka.";
      case 2:
        return "Lumayan kuat. Tambah satu angka biar makin aman.";
      case 3:
        return "Kuat. Tambah simbol untuk proteksi maksimal.";
      case 4:
        return "Sangat kuat! Password kamu siap digunakan.";
      default:
        return "";
    }
  }, [passwordStrength]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("Mohon lengkapi seluruh formulir pendaftaran.");
      return;
    }

    if (!agreedTerms) {
      setErrorMsg("Kamu harus menyetujui Aturan komunitas FJKT48.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        setErrorMsg(
          res.error.message || "Gagal membuat akun. Silakan coba lagi."
        );
      } else {
        router.push("/dashboard");
      }
    } catch {
      // Offline fallback / demo sign up
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg text-ink flex flex-col lg:flex-row">
      {/* 1. Left Column: Stage Side (§7.9, FigCraft Daftar Frame) */}
      <div className="stage relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden bg-bg">
        {/* Background Photo */}
        <div className="absolute inset-0">
          <Image
            src="https://jkt48.com/api/v1/storages/media/jkt48-member/angelina_christy.jpg"
            alt="JKT48 Theater Stage"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top opacity-60"
          />
          {/* Overlays per §7.4 & FigCraft node 9373 */}
          <div className="absolute inset-0 house-tint opacity-60 mix-blend-multiply pointer-events-none" />
          <div className="absolute inset-0 bg-bg opacity-25 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,12,0) 0%, rgba(11,10,12,0.9) 55%, rgba(11,10,12,1) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,12,0.7) 0%, rgba(11,10,12,0) 100%)",
            }}
          />
        </div>

        {/* Red Spotlight Beam */}
        <div
          className="pointer-events-none absolute top-0 left-1/4 h-[640px] w-[320px] mix-blend-screen opacity-75"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,231,204,0.16) 0%, rgba(255,231,204,0) 100%)",
            clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
          }}
        />

        {/* Top: FJKT48 Wordmark Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-0 group">
            <span className="font-display font-black text-3xl tracking-[-0.3px] text-ink">
              FJKT
            </span>
            <span className="font-display font-black text-3xl tracking-[-0.3px] text-crimson-500">
              48
            </span>
          </Link>
        </div>

        {/* Bottom Copy: Poster Text from Frame (FigCraft ID: 9383) */}
        <div className="relative z-10 max-w-lg pt-12 lg:pt-16 space-y-4">
          <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-[104px] leading-[0.88] uppercase tracking-[-2.5px] text-ink select-none">
            AMBIL
            <br />
            KURSIMU.
          </h2>

          <div className="flex items-center gap-2 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 shadow-[0_0_6px_rgba(229,19,46,0.9)]" />
            <span className="text-sm font-sans font-medium text-muted">
              7.488 thread aktif di forum saat ini
            </span>
          </div>
        </div>
      </div>

      {/* 2. Right Column: Form Side (§7.9, FigCraft Daftar Frame) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-16 bg-bg">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft weight="bold" className="w-4 h-4" />
            <span>Kembali ke beranda</span>
          </Link>
        </div>

        {/* Main Form Container (420px on desktop, full width on tablet/mobile) */}
        <div className="w-full max-w-[420px] mx-auto my-10 lg:my-12 space-y-6">
          <div className="space-y-3">
            <h1 className="font-display font-black text-7xl sm:text-8xl lg:text-[104px] uppercase tracking-[-2.5px] text-ink leading-[0.88]">
              DAFTAR
            </h1>
            <p className="text-[17px] font-sans text-muted leading-[26px]">
              Gratis, cukup email. Pilih oshi biar beranda kamu ngikutin jadwal
              dan live-nya.
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-crimson-500/15 border border-crimson-500/30 text-xs font-medium text-accent font-sans">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Display Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-mono font-medium tracking-[1px] uppercase text-muted block"
              >
                NAMA TAMPILAN
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Penlight Merah"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-ink text-sm placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-focus transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-mono font-medium tracking-[1px] uppercase text-muted block"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@domain.com"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-ink text-sm placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-focus transition-all"
              />
            </div>

            {/* Password Field + 4-segment Strength Meter */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-mono font-medium tracking-[1px] uppercase text-muted block"
              >
                PASSWORD
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3.5 pr-11 rounded-xl bg-surface border border-border text-ink text-sm placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-focus transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Lihat password"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-subtle hover:text-ink transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeSlash weight="bold" className="w-4 h-4" />
                  ) : (
                    <Eye weight="bold" className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* 4-segment password meter (FigCraft ID: 9424) */}
              <div className="space-y-1.5 pt-1">
                <div className="grid grid-cols-4 gap-1.5 h-1 w-full">
                  {[1, 2, 3, 4].map((step) => {
                    const isFilled = passwordStrength >= step;
                    return (
                      <div
                        key={step}
                        className={`h-full rounded-full transition-colors duration-200 ${
                          isFilled
                            ? passwordStrength <= 1
                              ? "bg-curtain-800"
                              : passwordStrength === 2
                                ? "bg-amber-500"
                                : passwordStrength === 3
                                  ? "bg-emerald-500"
                                  : "bg-crimson-500"
                            : "bg-raised"
                        }`}
                      />
                    );
                  })}
                </div>
                <p className="text-[13px] font-sans text-muted leading-[18px]">
                  {passwordHint}
                </p>
              </div>
            </div>

            {/* Oshi Picker (FigCraft ID: 9431) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[15px] font-sans font-medium text-ink block">
                  Oshi kamu
                </label>
                <span className="text-[13px] font-sans text-muted">
                  opsional, bisa diganti nanti
                </span>
              </div>

              {/* Suggested Options Row */}
              <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none py-1">
                {suggestedNicknames.slice(0, 5).map((nickname) => {
                  const isSelected = selectedOshi.toLowerCase() === nickname;
                  const memberObj = allMembers.find(
                    (m) => m.nickname.toLowerCase() === nickname
                  );
                  const displayName = memberObj ? memberObj.nickname : nickname;

                  return (
                    <button
                      key={nickname}
                      type="button"
                      onClick={() => setSelectedOshi(nickname)}
                      className="flex flex-col items-center gap-1.5 group cursor-pointer shrink-0"
                    >
                      <div
                        className={`relative w-14 h-14 rounded-full overflow-hidden transition-all bg-raised ${
                          isSelected
                            ? "ring-[3px] ring-crimson-500 ring-offset-2 ring-offset-bg scale-105"
                            : "border border-border opacity-70 group-hover:opacity-100 group-hover:border-ink-a35"
                        }`}
                      >
                        <Image
                          src={`/members/${nickname}.jpg`}
                          alt={displayName}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <span
                        className={`text-xs font-sans capitalize transition-colors ${
                          isSelected
                            ? "text-accent font-semibold"
                            : "text-muted group-hover:text-ink"
                        }`}
                      >
                        {displayName}
                      </span>
                    </button>
                  );
                })}

                {/* Cari Button (FigCraft ID: 9456) */}
                <button
                  type="button"
                  onClick={() => setSearchModalOpen(true)}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer shrink-0"
                >
                  <div className="w-14 h-14 rounded-full border border-dashed border-border flex items-center justify-center text-muted group-hover:text-ink group-hover:border-ink transition-colors bg-raised/40">
                    <MagnifyingGlass weight="bold" className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-sans text-muted group-hover:text-ink font-medium">
                    Cari
                  </span>
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setAgreedTerms(!agreedTerms)}
                className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                  agreedTerms
                    ? "bg-crimson-500 text-white"
                    : "bg-surface border border-border"
                }`}
              >
                {agreedTerms && <Check weight="bold" className="w-3 h-3" />}
              </button>
              <span
                onClick={() => setAgreedTerms(!agreedTerms)}
                className="text-xs font-sans text-muted cursor-pointer select-none"
              >
                Setuju dengan Aturan komunitas FJKT48
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-2 px-6 rounded-full bg-crimson-500 text-white text-sm font-semibold hover:bg-crimson-600 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-crimson-500/25"
            >
              <span>{loading ? "Mendaftar..." : "Bikin akun"}</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </button>

            {/* Switch to Login */}
            <div className="pt-6 border-t border-ink-a10 flex items-center gap-1.5 text-sm font-sans">
              <span className="text-muted">Udah punya akun?</span>
              <Link
                href="/login"
                className="text-accent font-semibold underline underline-offset-2 hover:text-crimson-400"
              >
                Masuk
              </Link>
            </div>
          </form>
        </div>

        {/* Legal Text */}
        <p className="text-[13px] font-sans text-subtle text-left max-w-[420px] mx-auto leading-relaxed">
          Situs fans tidak resmi. Email kamu cuma dipakai buat akun forum, nggak
          dibagikan ke siapa pun.
        </p>
      </div>

      {/* Search Oshi Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-surface rounded-2xl p-6 space-y-4 shadow-2xl border border-border max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight text-ink">
                PILIH OSHI
              </h3>
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-ink cursor-pointer"
              >
                <X weight="bold" className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <MagnifyingGlass
                weight="bold"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
              />
              <input
                type="text"
                value={searchMemberQuery}
                onChange={(e) => setSearchMemberQuery(e.target.value)}
                placeholder="Cari nama atau tim member..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-ink placeholder:text-subtle focus:outline-none focus:ring-1 focus:ring-focus"
                autoFocus
              />
            </div>

            {/* Member List Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 pr-1">
              {filteredModalMembers.map((member) => {
                const isSelected =
                  selectedOshi.toLowerCase() === member.nickname.toLowerCase();

                return (
                  <button
                    key={member.code}
                    type="button"
                    onClick={() => {
                      setSelectedOshi(member.nickname.toLowerCase());
                      setSearchModalOpen(false);
                    }}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-all text-left cursor-pointer ${
                      isSelected
                        ? "bg-curtain-800 text-white"
                        : "bg-raised hover:bg-border text-ink"
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-bg">
                      <Image
                        src={`/members/${member.nickname.toLowerCase()}.jpg`}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-sans font-semibold text-xs truncate">
                        {member.nickname}
                      </p>
                      <p className="text-[10px] font-mono text-muted truncate">
                        Team {member.type}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
