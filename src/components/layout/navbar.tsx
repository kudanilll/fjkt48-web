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
  Plus,
} from "@phosphor-icons/react";
import { useTheme } from "@/components/theme-provider";
import MenuDrawer from "@/components/layout/menu-drawer";
import LiveTicker from "@/components/home/live-ticker";
import Button from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/forum", label: "Forum" },
  { href: "/live", label: "Live", count: 2 },
  { href: "/member", label: "Member" },
  { href: "/schedule", label: "Jadwal" },
  { href: "/news", label: "Berita" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hide nav on login & register pages per handoff (§7.9)
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Live Ticker Crimson Strip above Navigation */}
      <LiveTicker />

      {/* Floating Navbar Container */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 lg:px-16 pt-2 pointer-events-none transition-all duration-300">
        <nav
          className="pointer-events-auto flex w-full items-center justify-between h-auto py-3 pl-6 pr-5 sm:px-6 lg:px-7 rounded-[14px] bg-bg shadow-lg shadow-black/20 transition-colors duration-300"
          aria-label="Navigasi utama"
        >
          {/* Brand Logo - Wordmark Only (§7.6, §237) */}
          <Link
            href="/"
            className="inline-flex items-center gap-0 group shrink-0"
            aria-label="FJKT48 Beranda"
          >
            <span className="font-display text-2xl font-black tracking-tight text-ink">
              FJKT
            </span>
            <span className="font-display text-2xl font-black tracking-tight text-crimson-500">
              48
            </span>
          </Link>

          {/* Desktop Nav Links (Hidden on Tablet & Mobile) */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-ink font-semibold"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 shrink-0" />
                    )}
                    <span>{link.label}</span>
                    {link.count !== undefined && (
                      <span className="px-1.5 py-0.5 rounded-full bg-crimson-500 text-white text-[10px] font-bold leading-none shrink-0 animate-pulse">
                        {link.count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions Group */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Search Trigger (Grey background, no border, FigCraft ID: 2556) */}
            <Link
              href="/forum"
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[var(--raised)] text-[var(--ink)] hover:brightness-125 transition-all duration-200"
              aria-label="Cari thread atau topik"
            >
              <MagnifyingGlass weight="bold" className="w-5 h-5" />
            </Link>

            {/* Notification Bell (Grey background, no border, FigCraft ID: 2559) */}
            <Link
              href="/dashboard"
              className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[var(--raised)] text-[var(--ink)] hover:brightness-125 transition-all duration-200"
              aria-label="Notifikasi"
            >
              <Bell weight="bold" className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-2 h-2 rounded-full bg-crimson-500" />
            </Link>

            {/* Theme Toggle Button (Grey background, no border, FigCraft ID: 29888) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden sm:flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-raised text-ink hover:brightness-125 transition-all duration-200 cursor-pointer"
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
                  className="w-5 h-5 transition-transform duration-200 hover:rotate-90 text-spotlight"
                />
              ) : (
                <Moon
                  weight="bold"
                  className="w-5 h-5 transition-transform duration-200 hover:-rotate-45 text-crimson-600"
                />
              )}
            </button>

            {/* CTA Bikin Thread (Hidden on Mobile, FigCraft ID: 2562) */}
            <div className="hidden sm:block">
              <Button
                href="/forum/new"
                variant="primary"
                size="md"
                className="rounded-full h-11 px-5 gap-2"
              >
                <Plus weight="bold" className="w-4 h-4" />
                <span>Bikin thread</span>
              </Button>
            </div>

            {/* Avatar / Profile Icon (FigCraft ID: 2566) */}
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-linear-to-b from-crimson-400 to-crimson-800 border border-white/20 text-white font-sans font-bold text-xs tracking-wide shadow-inner hover:scale-105 transition-transform"
              aria-label="Profil Pengguna"
            >
              PM
            </Link>

            {/* Mobile & Tablet Hamburger Drawer Trigger (Grey background, no border, FigCraft ID: 29957) */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-raised text-ink hover:brightness-125 transition-colors cursor-pointer"
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
