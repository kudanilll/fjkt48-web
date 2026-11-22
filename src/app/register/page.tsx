"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  EnvelopeSimple,
  Lock,
  User,
  Eye,
  EyeSlash,
  Check,
} from "@phosphor-icons/react";
import { authClient } from "@/lib/auth-client";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Member } from "@/types/jkt48-types";

const suggestedMembers = ((officialData.members ?? []) as JKT48Member[]).slice(
  0,
  5
);

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOshi, setSelectedOshi] = useState<string>("FREYA_JAYAWARDANA");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Password strength calculation
  const strength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0 to 4
  }, [password]);

  const strengthLabels = [
    "Belum aman",
    "Kurang aman",
    "Cukup aman",
    "Kuat",
    "Sangat kuat",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("Mohon lengkapi seluruh formulir pendaftaran.");
      return;
    }
    if (!agreeTerms) {
      setErrorMsg("Kamu harus menyetujui aturan komunitas FJKT48.");
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
      // Offline fallback or demo sign up
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-stage-950)] text-[var(--color-ink)] flex flex-col lg:flex-row">
      {/* 1. Left Column: Stage Side */}
      <div className="stage relative lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-hidden bg-[var(--color-stage-950)]">
        {/* Stage Photo Background */}
        <div className="absolute inset-0">
          <Image
            src="https://jkt48.com/api/v1/storages/media/jkt48-member/angelina_christy.jpg"
            alt="JKT48 Theater Stage"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top opacity-35"
          />
          {/* Overlays */}
          <div className="absolute inset-0 house-tint pointer-events-none" />
          <div className="absolute inset-0 spotlight-vignette pointer-events-none" />
          <div className="absolute inset-0 floor-fade pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,12,0.8) 0%, rgba(11,10,12,0.2) 40%, rgba(11,10,12,0.95) 100%)",
            }}
          />
        </div>

        {/* Spotlight Beam */}
        <div
          className="pointer-events-none absolute top-0 left-1/3 h-[600px] w-[320px] mix-blend-screen opacity-70"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,231,204,0.16) 0%, rgba(255,231,204,0) 100%)",
            clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
          }}
        />

        {/* Top: FJKT48 Mark */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-crimson-500)] flex items-center justify-center text-white font-display font-black text-sm italic shadow-md">
              48
            </div>
            <span className="font-display font-black text-2xl tracking-tighter uppercase text-white group-hover:text-[var(--color-crimson-400)] transition-colors">
              FJKT<span className="text-[var(--color-crimson-500)]">48</span>
            </span>
          </Link>
        </div>

        {/* Bottom Copy: Poster Text */}
        <div className="relative z-10 max-w-md pt-12 space-y-3">
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-[0.88] uppercase tracking-tight text-white select-none">
            Ambil
            <br />
            Kursimu.
          </h2>

          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] pt-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-crimson-500)] animate-pulse" />
            <span>7.488 thread aktif di komunitas</span>
          </div>
        </div>
      </div>

      {/* 2. Right Column: Form Side */}
      <div className="lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-20 bg-[var(--color-stage-950)]">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
            <span>Kembali ke beranda</span>
          </Link>
        </div>

        {/* Main Form Container */}
        <div className="max-w-[420px] w-full mx-auto my-8 sm:my-10 space-y-6">
          <div>
            <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-[var(--color-ink)] leading-none">
              Daftar
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-muted)] mt-2 font-sans leading-relaxed">
              Gratis, cukup email. Pilih oshi biar beranda kamu ngikutin jadwal
              dan live-nya.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-[var(--color-crimson-500)]/15 border border-[var(--color-crimson-500)]/30 text-xs font-medium text-[var(--color-crimson-400)] font-sans">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field: Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="register-name"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]"
              >
                Nama Tampilan
              </label>
              <div className="relative">
                <User
                  weight="bold"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none"
                />
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama panggilan kamu"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-stage-900)] text-sm text-[var(--color-ink)] placeholder-[var(--color-subtle)] border border-[var(--color-stage-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-spotlight)] transition-all font-sans"
                />
              </div>
            </div>

            {/* Field: Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="register-email"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]"
              >
                Email
              </label>
              <div className="relative">
                <EnvelopeSimple
                  weight="bold"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none"
                />
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--color-stage-900)] text-sm text-[var(--color-ink)] placeholder-[var(--color-subtle)] border border-[var(--color-stage-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-spotlight)] transition-all font-sans"
                />
              </div>
            </div>

            {/* Field: Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="register-password"
                className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  weight="bold"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted)] pointer-events-none"
                />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[var(--color-stage-900)] text-sm text-[var(--color-ink)] placeholder-[var(--color-subtle)] border border-[var(--color-stage-700)] focus:outline-none focus:ring-2 focus:ring-[var(--color-spotlight)] transition-all font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Lihat password"
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                >
                  {showPassword ? (
                    <EyeSlash weight="bold" className="w-4 h-4" />
                  ) : (
                    <Eye weight="bold" className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Meter (4 bars) */}
              {password && (
                <div className="pt-1.5 space-y-1">
                  <div className="grid grid-cols-4 gap-1.5 h-1.5">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`rounded-full transition-all ${
                          strength >= step
                            ? strength <= 1
                              ? "bg-red-500"
                              : strength <= 2
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            : "bg-[var(--color-stage-700)]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-muted)]">
                    Kekuatan: {strengthLabels[strength]} (kombinasi huruf,
                    angka, dan simbol)
                  </span>
                </div>
              )}
            </div>

            {/* Oshi Picker (Optional) */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
                Pilih Oshi (Opsional)
              </label>

              {/* Suggested member avatars row */}
              <div className="flex items-center gap-2.5">
                {suggestedMembers.map((m) => {
                  const isSelected = selectedOshi === m.code;
                  return (
                    <button
                      key={m.code}
                      type="button"
                      onClick={() => setSelectedOshi(m.code)}
                      className={`relative w-12 h-12 rounded-full overflow-hidden transition-all ${
                        isSelected
                          ? "ring-2 ring-[var(--color-crimson-500)] ring-offset-2 ring-offset-[var(--color-stage-950)] scale-110"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      title={m.nickname}
                    >
                      <Image
                        src={m.photo}
                        alt={m.nickname}
                        fill
                        sizes="48px"
                        className="object-cover object-top"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <button
                type="button"
                role="checkbox"
                aria-checked={agreeTerms}
                onClick={() => setAgreeTerms(!agreeTerms)}
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-all flex-none mt-0.5 ${
                  agreeTerms
                    ? "bg-[var(--color-crimson-500)] text-white"
                    : "bg-[var(--color-stage-900)] border border-[var(--color-stage-700)]"
                }`}
              >
                {agreeTerms && <Check weight="bold" className="w-3.5 h-3.5" />}
              </button>
              <span
                onClick={() => setAgreeTerms(!agreeTerms)}
                className="text-xs text-[var(--color-muted)] cursor-pointer select-none font-sans leading-relaxed"
              >
                Saya setuju dengan aturan komunitas dan kebijakan privasi
                FJKT48.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full text-sm font-semibold bg-[var(--color-crimson-500)] text-white hover:bg-[var(--color-crimson-600)] transition-all shadow-md shadow-[var(--color-crimson-500)]/30 disabled:opacity-50"
              >
                {loading ? "Mendaftarkan akun..." : "Bikin Akun"}
              </button>
            </div>
          </form>

          {/* Switch to Login */}
          <div className="pt-4 text-center border-t border-[var(--color-stage-800)]">
            <span className="text-xs text-[var(--color-muted)] font-sans">
              Udah punya akun?{" "}
            </span>
            <Link
              href="/login"
              className="text-xs font-semibold text-[var(--color-crimson-400)] hover:underline"
            >
              Masuk
            </Link>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="max-w-[420px] w-full mx-auto text-xs text-[var(--color-subtle)] font-sans leading-relaxed">
          Situs fans tidak resmi. Email kamu cuma dipakai buat akun forum, nggak
          dibagikan ke siapa pun.
        </div>
      </div>
    </main>
  );
}
