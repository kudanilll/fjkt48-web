"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  EnvelopeSimple,
  Lock,
  Eye,
  EyeSlash,
  Check,
} from "@phosphor-icons/react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Mohon masukkan email dan password kamu.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        setErrorMsg(
          res.error.message || "Email atau password yang kamu masukkan salah."
        );
      } else {
        router.push("/dashboard");
      }
    } catch {
      // Offline fallback or demo sign in
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-stage-950)] text-[var(--color-ink)] flex flex-col lg:flex-row">
      {/* 1. Left Column: Cinematic Stage Side (Always Dark) */}
      <div className="stage relative lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-hidden bg-[var(--color-stage-950)]">
        {/* Stage Photo Background */}
        <div className="absolute inset-0">
          <Image
            src="https://jkt48.com/api/v1/storages/media/jkt48-member/freya_jayawardana.jpg"
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
          className="pointer-events-none absolute top-0 left-1/4 h-[600px] w-[320px] mix-blend-screen opacity-70"
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
            Lampunya
            <br />
            Masih Nyala.
          </h2>

          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] pt-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-crimson-500)] animate-pulse" />
            <span>280 fans online malam ini</span>
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
        <div className="max-w-[420px] w-full mx-auto my-8 sm:my-12 space-y-6">
          <div>
            <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-[var(--color-ink)] leading-none">
              Masuk
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-muted)] mt-2 font-sans leading-relaxed">
              Lanjutkan obrolan yang kamu tinggal. Thread, balasan, dan oshi
              kamu masih di tempatnya.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-[var(--color-crimson-500)]/15 border border-[var(--color-crimson-500)]/30 text-xs font-medium text-[var(--color-crimson-400)] font-sans">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field: Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
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
                  id="login-email"
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
                htmlFor="login-password"
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
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password akun kamu"
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
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                role="checkbox"
                aria-checked={rememberMe}
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                  rememberMe
                    ? "bg-[var(--color-crimson-500)] text-white"
                    : "bg-[var(--color-stage-900)] border border-[var(--color-stage-700)]"
                }`}
              >
                {rememberMe && <Check weight="bold" className="w-3.5 h-3.5" />}
              </button>
              <span
                onClick={() => setRememberMe(!rememberMe)}
                className="text-xs text-[var(--color-muted)] cursor-pointer select-none font-sans"
              >
                Ingat saya di perangkat ini
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full text-sm font-semibold bg-[var(--color-crimson-500)] text-white hover:bg-[var(--color-crimson-600)] transition-all shadow-md shadow-[var(--color-crimson-500)]/30 disabled:opacity-50"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </form>

          {/* Switch to Register */}
          <div className="pt-4 text-center border-t border-[var(--color-stage-800)]">
            <span className="text-xs text-[var(--color-muted)] font-sans">
              Belum punya akun?{" "}
            </span>
            <Link
              href="/register"
              className="text-xs font-semibold text-[var(--color-crimson-400)] hover:underline"
            >
              Daftar, gratis
            </Link>
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="max-w-[420px] w-full mx-auto text-xs text-[var(--color-subtle)] font-sans leading-relaxed">
          Situs fans tidak resmi. Dengan masuk, kamu setuju dengan Aturan
          komunitas FJKT48.
        </div>
      </div>
    </main>
  );
}
