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
  CaretDown,
} from "@phosphor-icons/react";
import { authClient } from "@/lib/auth-client";
import officialData from "@/data/jkt48-official.json";
import type { JKT48Member } from "@/types/jkt48-types";

const membersList = (officialData.members ?? []) as JKT48Member[];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedOshi, setSelectedOshi] = useState<string>("FREYA_JAYAWARDANA");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("Mohon lengkapi seluruh formulir pendaftaran.");
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
    <main className="min-h-screen bg-bg text-ink flex flex-col lg:flex-row">
      {/* 1. Left Column: Stage Side */}
      <div className="stage relative lg:w-1/2 min-h-[380px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden bg-bg">
        {/* Background Photo */}
        <div className="absolute inset-0">
          <Image
            src="https://jkt48.com/api/v1/storages/media/jkt48-member/angelina_christy.jpg"
            alt="JKT48 Theater Stage"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top opacity-30"
          />
          {/* Overlays */}
          <div className="absolute inset-0 house-tint pointer-events-none" />
          <div className="absolute inset-0 spotlight-vignette pointer-events-none" />
          <div className="absolute inset-0 floor-fade pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,12,0.85) 0%, rgba(11,10,12,0.3) 40%, rgba(11,10,12,0.98) 100%)",
            }}
          />
        </div>

        {/* Red Spotlight Beam */}
        <div
          className="pointer-events-none absolute top-0 left-1/4 h-[700px] w-[360px] mix-blend-screen opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(229,19,46,0.24) 0%, rgba(229,19,46,0) 100%)",
            clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
          }}
        />

        {/* Top: FJKT48 Logo */}
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

        {/* Bottom Copy: Poster Text */}
        <div className="relative z-10 max-w-lg pt-16 space-y-4">
          <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-[72px] leading-[0.92] uppercase tracking-[-1px] text-ink select-none">
            PANGGUNG KITA,
            <br />
            SUARA KITA.
          </h2>

          <p className="text-[17px] font-sans text-muted leading-[26px]">
            Komunitas fans independen JKT48. Masuk untuk ikut ngobrol di forum
            dan dukung oshi kamu.
          </p>
        </div>
      </div>

      {/* 2. Right Column: Form Side */}
      <div className="lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-bg">
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

        {/* Main Form Container */}
        <div className="max-w-[440px] w-full mx-auto my-12 space-y-8">
          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-4xl sm:text-[56px] uppercase tracking-[-1px] text-ink leading-none">
              BUAT AKUN BARU
            </h1>
            <p className="text-sm font-sans text-muted">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-accent font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>Masuk di sini</span>
                <ArrowRight weight="bold" className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 rounded-xl bg-crimson-500/15 border border-crimson-500/30 text-xs font-medium text-accent font-sans">
              {errorMsg}
            </div>
          )}

          {/* Social Sign-in */}
          <div>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-full bg-raised text-ink font-sans text-sm font-semibold hover:bg-border transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.4 7.5 23 12 23z"
                />
              </svg>
              <span>Daftar dengan Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-raised" />
            </div>
            <span className="relative px-4 bg-bg text-xs font-mono text-subtle uppercase">
              atau daftar dengan email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Display Name */}
            <div className="space-y-1.5">
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
                placeholder="PenlightMerah"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-surface text-ink text-sm placeholder-subtle focus:outline-none focus:ring-1 focus:ring-focus transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
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
                className="w-full px-4 py-3.5 rounded-xl bg-surface text-ink text-sm placeholder-subtle focus:outline-none focus:ring-1 focus:ring-focus transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
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
                  placeholder="Minimal 8 karakter"
                  required
                  minLength={8}
                  className="w-full px-4 py-3.5 pr-11 rounded-xl bg-surface text-ink text-sm placeholder-subtle focus:outline-none focus:ring-1 focus:ring-focus transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Lihat password"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-subtle hover:text-ink transition-colors"
                >
                  {showPassword ? (
                    <EyeSlash weight="bold" className="w-4 h-4" />
                  ) : (
                    <Eye weight="bold" className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Select Oshi (Optional) */}
            <div className="space-y-1.5">
              <label
                htmlFor="oshi"
                className="text-xs font-mono font-medium tracking-[1px] uppercase text-muted block"
              >
                PILIH OSHI (OPSIONAL)
              </label>
              <div className="relative">
                <select
                  id="oshi"
                  value={selectedOshi}
                  onChange={(e) => setSelectedOshi(e.target.value)}
                  className="w-full appearance-none px-4 py-3.5 pr-11 rounded-xl bg-surface text-ink text-sm focus:outline-none focus:ring-1 focus:ring-focus transition-all"
                >
                  {membersList.map((m) => (
                    <option
                      key={m.code}
                      value={m.code}
                      className="bg-surface"
                    >
                      {m.name} ({m.nickname})
                    </option>
                  ))}
                </select>
                <CaretDown
                  weight="bold"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle pointer-events-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-crimson-500 text-white text-base font-semibold hover:bg-crimson-600 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <span>{loading ? "Mendaftar..." : "Daftar akun baru"}</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Legal Text */}
        <p className="text-xs font-mono text-subtle text-center max-w-sm mx-auto">
          Situs fans tidak resmi. Email kamu cuma dipakai buat akun forum, nggak
          dibagikan ke siapa pun.
        </p>
      </div>
    </main>
  );
}
