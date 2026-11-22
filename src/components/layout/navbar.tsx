"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MagnifyingGlass,
  Bell,
  Sun,
  Moon,
  List,
  Sparkle,
  Plus,
  User,
} from "@phosphor-icons/react";
import { useTheme } from "@/components/theme-provider";
import MenuDrawer from "@/components/layout/menu-drawer";
import Button from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/forum", label: "Forum" },
  { href: "/live", label: "Live", hasDot: true },
  { href: "/member", label: "Member" },
  { href: "/schedule", label: "Jadwal" },
  { href: "/news", label: "Berita" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hide nav on login & register pages per handoff
  if (pathname === "/login" || pathname === "/register") {
    return (
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-crimson-600 text-white">
            <Sparkle weight="fill" className="w-4 h-4" />
          </span>
          <span className="font-display text-2xl font-black tracking-tight text-[var(--ink)]">
            FJKT<span className="text-crimson-500">48</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs font-mono-data text-[var(--muted)] hover:text-[var(--ink)] hover:underline"
        >
          ← Kembali ke beranda
        </Link>
      </header>
    );
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)] transition-colors duration-300">
        <nav
          className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-8 h-18"
          aria-label="Navigasi utama"
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="FJKT48 Beranda"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-crimson-600 text-white shadow-sm shadow-crimson-600/30 transition-transform duration-200 group-hover:scale-105">
              <Sparkle weight="fill" className="w-4 h-4" />
            </span>
            <span className="font-display text-2xl font-black tracking-tight text-[var(--ink)]">
              FJKT<span className="text-crimson-500">48</span>
            </span>
          </Link>

          {/* Desktop Nav Links (Hidden on Tablet & Mobile) */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      active
                        ? "text-[var(--ink)] font-semibold"
                        : "text-[var(--muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDot && (
                      <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 animate-pulse" />
                    )}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-crimson-500" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions Group */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <Link
              href="/forum"
              className="flex items-center justify-center w-10 h-10 rounded-full text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
              aria-label="Cari thread atau topik"
            >
              <MagnifyingGlass weight="bold" className="w-4 h-4" />
            </Link>

            {/* Notification Bell */}
            <Link
              href="/dashboard"
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
              aria-label="Notifikasi"
            >
              <Bell weight="bold" className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-crimson-500" />
            </Link>

            {/* Theme Toggle Button (Hidden on Mobile, shown on Tablet & Desktop) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--surface)] transition-all duration-200 cursor-pointer"
              aria-label={
                resolvedTheme === "dark"
                  ? "Ganti ke tema terang"
                  : "Ganti ke tema gelap"
              }
              aria-pressed={resolvedTheme === "light"}
            >
              {resolvedTheme === "dark" ? (
                <Sun
                  weight="bold"
                  className="w-4 h-4 transition-transform duration-200 hover:rotate-90 text-[#FFE7CC]"
                />
              ) : (
                <Moon
                  weight="bold"
                  className="w-4 h-4 transition-transform duration-200 hover:-rotate-45 text-crimson-600"
                />
              )}
            </button>

            {/* CTA Bikin Thread (Hidden on Mobile) */}
            <div className="hidden sm:block">
              <Button href="/forum/new" variant="primary" size="sm">
                <Plus weight="bold" className="w-3.5 h-3.5" />
                <span>Bikin thread</span>
              </Button>
            </div>

            {/* Avatar / Profile Icon (Hidden on Mobile) */}
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-crimson-500 text-[var(--ink)] transition-colors"
              aria-label="Profil Pengguna"
            >
              <User weight="bold" className="w-4 h-4" />
            </Link>

            {/* Mobile & Tablet Hamburger Drawer Trigger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              <List weight="bold" className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Drawer */}
      <MenuDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
