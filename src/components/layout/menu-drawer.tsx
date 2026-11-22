"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Sparkle,
  Sun,
  Moon,
  Desktop,
  ArrowRight,
  User,
} from "@phosphor-icons/react";
import { useTheme } from "@/components/theme-provider";
import { useLenis } from "@/components/smooth-scroll";
import Button from "@/components/ui/button";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/", index: "01", label: "BERANDA", meta: "Halaman utama" },
  { href: "/forum", index: "02", label: "FORUM", meta: "7.488 thread" },
  { href: "/live", index: "03", label: "LIVE", pill: "2 lagi live" },
  { href: "/member", index: "04", label: "MEMBER", meta: "58 member" },
  {
    href: "/schedule",
    index: "05",
    label: "JADWAL",
    meta: "3 show minggu ini",
  },
  { href: "/news", index: "06", label: "BERITA", meta: "dari jkt48.com" },
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
      className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)] text-[var(--ink)] overflow-y-auto animate-in fade-in duration-300"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 h-20 border-b border-[var(--border)]">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-2.5 group"
          aria-label="FJKT48 Beranda"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-crimson-600 text-white">
            <Sparkle weight="fill" className="w-4 h-4" />
          </span>
          <span className="font-display text-2xl font-black tracking-tight text-[var(--ink)]">
            FJKT<span className="text-crimson-500">48</span>
          </span>
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="flex items-center justify-center w-11 h-11 rounded-full border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
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
                className="group flex items-baseline justify-between py-3 border-b border-[var(--line)] transition-colors hover:text-crimson-400"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`font-mono-data text-sm font-semibold ${
                      isCurrent ? "text-crimson-500" : "text-[var(--subtle)]"
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson-500 text-white text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {item.pill}
                    </span>
                  ) : (
                    <span
                      className={`font-mono-data text-xs ${
                        isCurrent
                          ? "text-crimson-500 font-semibold"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {isCurrent ? "Kamu di sini" : item.meta}
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
          {/* Theme Segmented Control */}
          <div className="flex items-center justify-between gap-4 p-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <span className="font-mono-data text-xs text-[var(--muted)] pl-3">
              Tampilan
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTheme("system")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  theme === "system"
                    ? "bg-[var(--raised)] text-[var(--ink)] shadow-sm font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                <Desktop weight="bold" className="w-3.5 h-3.5" />
                <span>Sistem</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  theme === "light"
                    ? "bg-[var(--raised)] text-[var(--ink)] shadow-sm font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                <Sun weight="bold" className="w-3.5 h-3.5" />
                <span>Terang</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  theme === "dark"
                    ? "bg-[var(--raised)] text-[var(--ink)] shadow-sm font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                <Moon weight="bold" className="w-3.5 h-3.5" />
                <span>Gelap</span>
              </button>
            </div>
          </div>

          {/* Account Profile Preview / Auth Button */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-crimson-500/20 text-crimson-400">
                <User weight="bold" className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-sm">Penlight Merah</p>
                <p className="font-mono-data text-xs text-[var(--muted)]">
                  Oshi: Freya · Buka dashboard
                </p>
              </div>
            </div>
            <Link
              href="/dashboard"
              onClick={onClose}
              className="text-xs text-crimson-500 font-semibold hover:underline"
            >
              Dashboard →
            </Link>
          </div>

          {/* CTA: Bikin Thread */}
          <Button
            href="/forum/new"
            onClick={onClose}
            variant="primary"
            size="lg"
            className="w-full"
            showArrow
          >
            Bikin thread baru
          </Button>

          {/* Legal / Notes */}
          <div className="flex items-center justify-between font-mono-data text-[11px] text-[var(--subtle)] pt-2">
            <span>&copy; 2026 FJKT48</span>
            <div className="flex gap-4">
              <Link href="/forum" onClick={onClose} className="hover:underline">
                Aturan komunitas
              </Link>
              <Link href="/forum" onClick={onClose} className="hover:underline">
                Kebijakan privasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
