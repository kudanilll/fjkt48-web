"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUp } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { scrollTo } = useLenis();
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !wordmarkRef.current || !footerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 30, opacity: 0.8 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[var(--bg)] text-[var(--ink)] pt-20 border-t border-[var(--border)] transition-colors duration-300"
    >
      {/* Crimson Atmospheric Haze Gradient at the bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-crimson-600/25 via-crimson-500/10 to-transparent z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
        {/* Navigation Grid per Hand-off (§7.6, §229) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 lg:gap-8 pb-16 border-b border-[var(--line)]">
          {/* Column 1: JELAJAH */}
          <div className="space-y-4">
            <h3 className="font-mono-data text-xs font-semibold uppercase tracking-[0.04em] text-[var(--muted)]">
              JELAJAH
            </h3>
            <ul className="space-y-2.5 font-mono-data text-xs tracking-wide">
              <li>
                <Link
                  href="/"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/forum"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/live"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Live
                </Link>
              </li>
              <li>
                <Link
                  href="/member"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Member
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Jadwal
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: BLOK FORUM */}
          <div className="space-y-4">
            <h3 className="font-mono-data text-xs font-semibold uppercase tracking-[0.04em] text-[var(--muted)]">
              BLOK FORUM
            </h3>
            <ul className="space-y-2.5 font-mono-data text-xs tracking-wide text-[var(--muted)]">
              <li>
                <Link
                  href="/forum?block=a"
                  className="hover:text-[var(--ink)] transition-colors"
                >
                  Blok A · Theater
                </Link>
              </li>
              <li>
                <Link
                  href="/forum?block=b"
                  className="hover:text-[var(--ink)] transition-colors"
                >
                  Blok B · Member
                </Link>
              </li>
              <li>
                <Link
                  href="/forum?block=c"
                  className="hover:text-[var(--ink)] transition-colors"
                >
                  Blok C · Live Streaming
                </Link>
              </li>
              <li>
                <Link
                  href="/forum?block=d"
                  className="hover:text-[var(--ink)] transition-colors"
                >
                  Blok D · Event & MnG
                </Link>
              </li>
              <li>
                <Link
                  href="/forum?block=e"
                  className="hover:text-[var(--ink)] transition-colors"
                >
                  Blok E · Merch
                </Link>
              </li>
              <li>
                <Link
                  href="/forum?block=f"
                  className="hover:text-[var(--ink)] transition-colors"
                >
                  Blok F · Obrolan Bebas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: KOMUNITAS */}
          <div className="space-y-4">
            <h3 className="font-mono-data text-xs font-semibold uppercase tracking-[0.04em] text-[var(--muted)]">
              KOMUNITAS
            </h3>
            <ul className="space-y-2.5 font-mono-data text-xs tracking-wide">
              <li>
                <Link
                  href="/forum"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Aturan forum
                </Link>
              </li>
              <li>
                <Link
                  href="/forum"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Panduan fans baru
                </Link>
              </li>
              <li>
                <Link
                  href="/forum"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Kamus fandom
                </Link>
              </li>
              <li>
                <Link
                  href="/forum"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Request fitur
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/kudanilll/fjkt48-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-crimson-400 transition-colors"
                >
                  Kontak admin
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: CATATAN (Spans 2 cols on desktop) */}
          <div className="col-span-2 space-y-4">
            <h3 className="font-mono-data text-xs font-semibold uppercase tracking-[0.04em] text-[var(--muted)]">
              CATATAN
            </h3>
            <p className="font-mono-data text-xs text-[var(--muted)] leading-relaxed max-w-md">
              FJKT48 adalah proyek penggemar non-komersial dan tidak berafiliasi
              resmi dengan JKT48 Operation Team (JOT) maupun Dentsu Inter Admark
              Media Group Indonesia. Seluruh hak cipta nama, logo, dan materi
              grafis milik pemilik resminya masing-masing.
            </p>
          </div>

          {/* Column 5: KE ATAS ↑ */}
          <div className="flex md:justify-end items-start">
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="group inline-flex items-center gap-1.5 font-mono-data text-xs font-semibold tracking-wider uppercase text-[var(--ink)] hover:text-crimson-400 transition-colors cursor-pointer"
            >
              <span>Ke atas</span>
              <ArrowUp
                weight="bold"
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </div>

        {/* Legal & Copyright Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8 font-mono-data text-xs text-[var(--muted)]">
          <p>&copy; 2026 FJKT48. Dibuat oleh fans, untuk fans.</p>
          <div className="flex items-center gap-8">
            <Link
              href="/forum"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Aturan komunitas
            </Link>
            <Link
              href="/forum"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Kebijakan privasi
            </Link>
          </div>
        </div>

        {/* Giant Outlined / Solid Wordmark Rising with Scrub */}
        <div
          ref={wordmarkRef}
          className="select-none pointer-events-none overflow-hidden pt-4 pb-2 text-center"
          aria-hidden="true"
        >
          <span className="font-display font-black tracking-tighter text-[19vw] leading-[0.78] block">
            <span className="text-[var(--ink)]">FJKT</span>
            <span className="text-crimson-500">48</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
