"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
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
      // Offline fallback / demo sign in
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg text-ink flex flex-col lg:flex-row">
      {/* 1. Left Column: Stage Side (§7.9, FigCraft Masuk Frame) */}
      <div className="stage relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden bg-bg">
        {/* Background Photo */}
        <div className="absolute inset-0">
          <Image
            src="https://jkt48.com/api/v1/storages/media/jkt48-member/freya_jayawardana.jpg"
            alt="JKT48 Theater Stage"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top opacity-60"
          />
          {/* Overlays per §7.4 & FigCraft node 9323 */}
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

        {/* Bottom Copy: Poster Text from Frame (FigCraft ID: 9333) */}
        <div className="relative z-10 max-w-lg pt-12 lg:pt-16 space-y-4">
          <h2 className="font-display font-black text-6xl sm:text-7xl lg:text-[104px] leading-[0.88] uppercase tracking-[-2.5px] text-ink select-none">
            LAMPUNYA
            <br />
            MASIH NYALA.
          </h2>

          <div className="flex items-center gap-2 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 shadow-[0_0_6px_rgba(229,19,46,0.9)]" />
            <span className="text-sm font-sans font-medium text-muted">
              318 fans lagi ngobrolin show tadi malam
            </span>
          </div>
        </div>
      </div>

      {/* 2. Right Column: Form Side (§7.9, FigCraft Masuk Frame) */}
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
              MASUK
            </h1>
            <p className="text-[17px] font-sans text-muted leading-[26px]">
              Lanjutkan obrolan yang kamu tinggal. Thread, balasan, dan oshi
              kamu masih di tempatnya.
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-crimson-500/15 border border-crimson-500/30 text-xs font-medium text-accent font-sans">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
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

            {/* Password Field */}
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
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer ${
                  rememberMe
                    ? "bg-crimson-500 text-white"
                    : "bg-surface border border-border"
                }`}
              >
                {rememberMe && <Check weight="bold" className="w-3 h-3" />}
              </button>
              <span
                onClick={() => setRememberMe(!rememberMe)}
                className="text-xs font-sans text-muted cursor-pointer select-none"
              >
                Ingat saya di perangkat ini
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-2 px-6 rounded-full bg-crimson-500 text-white text-sm font-semibold hover:bg-crimson-600 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-crimson-500/25"
            >
              <span>{loading ? "Memproses..." : "Masuk"}</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </button>

            {/* Switch to Register */}
            <div className="pt-6 border-t border-ink-a10 flex items-center gap-1.5 text-sm font-sans">
              <span className="text-muted">Belum punya akun?</span>
              <Link
                href="/register"
                className="text-accent font-semibold underline underline-offset-2 hover:text-crimson-400"
              >
                Daftar, gratis
              </Link>
            </div>
          </form>
        </div>

        {/* Legal Text */}
        <p className="text-[13px] font-sans text-subtle text-left max-w-[420px] mx-auto leading-relaxed">
          Situs fans tidak resmi. Dengan masuk, kamu setuju dengan Aturan
          komunitas FJKT48.
        </p>
      </div>
    </main>
  );
}
