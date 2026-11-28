"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Sun,
  Moon,
  Desktop,
  Plus,
  CaretRight,
  ArrowRight,
} from "@phosphor-icons/react";
import { useTheme } from "@/components/theme-provider";
import { useLenis } from "@/components/smooth-scroll";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/", index: "01", label: "BERANDA", meta: "HALAMAN UTAMA" },
  { href: "/forum", index: "02", label: "FORUM", meta: "7.488 THREAD" },
  { href: "/live", index: "03", label: "LIVE", pill: "2 LAGI LIVE" },
  { href: "/member", index: "04", label: "MEMBER", meta: "58 MEMBER" },
  {
    href: "/schedule",
    index: "05",
    label: "JADWAL",
    meta: "3 SHOW MINGGU INI",
  },
  { href: "/news", index: "06", label: "BERITA", meta: "DARI JKT48.COM" },
];

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { stop, start } = useLenis();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      stop();
      closeButtonRef.current?.focus();
    } else {
      start();
    }

    return () => {
      start();
    };
  }, [isOpen, stop, start]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
      className="fixed inset-0 z-50 flex flex-col bg-bg text-ink overflow-y-auto animate-in fade-in duration-300"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 h-20 border-b border-border">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2.5 group"
          aria-label="FJKT48 Beranda"
        >
          <span className="font-display text-3xl font-black tracking-tight text-ink">
            FJKT<span className="text-crimson-500">48</span>
          </span>
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-raised text-ink hover:brightness-125 transition-colors cursor-pointer"
          aria-label="Tutup menu"
        >
          <X weight="bold" className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 px-6 sm:px-10 py-8 flex flex-col justify-between max-w-4xl mx-auto w-full">
        <nav className="space-y-4">
          {navItems.map((item) => {
            const isCurrent =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline justify-between py-2.5 transition-colors hover:text-crimson-400"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`font-mono text-sm font-semibold ${
                      isCurrent ? "text-crimson-500" : "text-subtle"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span className="font-display text-4xl sm:text-6xl font-black tracking-tight group-hover:translate-x-2 transition-transform duration-200">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.pill ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-500 text-white text-xs font-semibold font-mono uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {item.pill}
                    </span>
                  ) : (
                    <span
                      className={`font-mono text-xs uppercase tracking-wider ${
                        isCurrent
                          ? "text-crimson-500 font-semibold"
                          : "text-muted"
                      }`}
                    >
                      {isCurrent ? "KAMU DI SINI" : item.meta}
                    </span>
                  )}
                  <ArrowRight
                    weight="bold"
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Drawer Bottom Actions */}
        <div className="pt-8 space-y-6">
          {/* Theme Segmented Control: Label above full-width 44px control */}
          <div className="space-y-2">
            <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted block pl-1">
              TAMPILAN
            </span>
            <div className="w-full p-1 rounded-full bg-surface border border-border flex items-center">
              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`flex-1 h-11 rounded-full flex items-center justify-center gap-2 text-xs font-medium transition-all ${
                  theme === "system"
                    ? "bg-raised text-ink font-semibold shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Desktop weight="bold" className="w-4 h-4" />
                <span>Sistem</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex-1 h-11 rounded-full flex items-center justify-center gap-2 text-xs font-medium transition-all ${
                  theme === "light"
                    ? "bg-raised text-ink font-semibold shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Sun weight="bold" className="w-4 h-4" />
                <span>Terang</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex-1 h-11 rounded-full flex items-center justify-center gap-2 text-xs font-medium transition-all ${
                  theme === "dark"
                    ? "bg-raised text-ink font-semibold shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Moon weight="bold" className="w-4 h-4" />
                <span>Gelap</span>
              </button>
            </div>
          </div>

          {/* Account Profile Row (Plain row, no bordered card, no separate Dashboard button) */}
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center justify-between py-2 group hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-crimson-500/20 text-crimson-400 font-display font-black text-sm flex-none">
                PM
              </div>
              <div>
                <p className="font-semibold text-sm sm:text-base text-ink">
                  Penlight Merah
                </p>
                <p className="font-mono text-xs text-muted">
                  Oshi: Fera · Buka dashboard
                </p>
              </div>
            </div>
            <CaretRight
              weight="bold"
              className="w-5 h-5 text-muted group-hover:text-ink transition-colors flex-none"
            />
          </Link>

          {/* CTA: Bikin Thread */}
          <Link
            href="/forum/new"
            onClick={onClose}
            className="w-full h-13 rounded-full bg-crimson-500 hover:bg-crimson-600 text-white text-base font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-crimson-950/40"
          >
            <Plus weight="bold" className="w-5 h-5" />
            <span>Bikin thread</span>
          </Link>

          {/* Legal / Notes */}
          <div className="flex items-center justify-between font-mono text-xs text-subtle pt-2">
            <span>&copy; 2026 FJKT48</span>
            <div className="flex gap-4">
              <Link
                href="/forum"
                onClick={onClose}
                className="hover:underline hover:text-ink"
              >
                Aturan komunitas
              </Link>
              <Link
                href="/forum"
                onClick={onClose}
                className="hover:underline hover:text-ink"
              >
                Kebijakan privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
