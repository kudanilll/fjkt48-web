"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

const jelajahLinks = [
  { href: "/", label: "Beranda" },
  { href: "/forum", label: "Forum" },
  { href: "/live", label: "Live" },
  { href: "/member", label: "Member" },
  { href: "/schedule", label: "Jadwal" },
  { href: "/news", label: "Berita" },
];

const blokLinks = [
  { href: "/forum?category=theater", label: "Theater & Setlist" },
  { href: "/forum?category=member", label: "Member & Oshi" },
  { href: "/forum?category=live", label: "Live Streaming" },
  { href: "/forum?category=event", label: "Event, MnG & VC" },
  { href: "/forum?category=merch", label: "Merch & Koleksi" },
  { href: "/forum?category=general", label: "Obrolan Bebas" },
];

const komunitasLinks = [
  { href: "/about", label: "Tentang FJKT48" },
  { href: "/rules", label: "Panduan forum" },
  { href: "/report", label: "Laporkan masalah" },
  { href: "/login", label: "Masuk" },
  { href: "/register", label: "Daftar" },
];

export default function Footer() {
  const pathname = usePathname();
  const { scrollTo } = useLenis();
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !wordmarkRef.current || !footerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 35, opacity: 0.8 },
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
  }, [pathname]);

  // Hide footer on login and register pages per §7.9
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-bg text-ink pt-20 sm:pt-24 lg:pt-28 min-h-[729px] sm:min-h-[737px] lg:min-h-[800px] flex flex-col justify-between transition-colors duration-300"
    >
      {/* Crimson Atmospheric Haze Gradient at the bottom (FigCraft ID: 30194, #E5132E 0 -> 14% -> 36%) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[600px] z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(229,19,46,0) 0%, rgba(229,19,46,0.14) 50%, rgba(229,19,46,0.36) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 flex-1 flex flex-col justify-between">
        {/* Navigation Grid per Hand-off §7.6 / FigCraft Footer Frame */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-8 pb-12">
          {/* Column 1: JELAJAH (lg: col 1-2) */}
          <div className="lg:col-span-2 space-y-3 font-mono text-[13px] leading-[20px] tracking-[0.04em] uppercase">
            <h3 className="text-muted font-medium">Jelajah</h3>
            <ul className="space-y-2">
              {jelajahLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink hover:text-crimson-400 transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: BLOK FORUM (lg: col 3-4) */}
          <div className="lg:col-span-3 space-y-3 font-mono text-[13px] leading-[20px] tracking-[0.04em] uppercase">
            <h3 className="text-muted font-medium">Blok forum</h3>
            <ul className="space-y-2">
              {blokLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-ink transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: KOMUNITAS (lg: col 5-6) */}
          <div className="lg:col-span-2 space-y-3 font-mono text-[13px] leading-[20px] tracking-[0.04em] uppercase">
            <h3 className="text-muted font-medium">Komunitas</h3>
            <ul className="space-y-2">
              {komunitasLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ink hover:text-crimson-400 transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CATATAN (lg: col 7-10) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 space-y-3 font-mono text-[13px] leading-[20px] tracking-[0.04em]">
            <h3 className="text-muted font-medium uppercase">Catatan</h3>
            <p className="text-muted leading-[20px] max-w-[330px]">
              Situs fans tidak resmi. Tidak berafiliasi dengan JKT48, IDN Live,
              atau Showroom. Foto dan nama member milik JKT48.
            </p>
          </div>

          {/* Column 5: KE ATAS ↑ (lg: col 11-12) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex md:justify-end items-start pt-1">
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className="group inline-flex items-center gap-1.5 font-mono text-[13px] font-medium tracking-[0.04em] text-ink hover:text-crimson-400 transition-colors cursor-pointer"
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 font-mono text-[13px] tracking-[0.04em] text-muted border-t border-ink-a10">
          <p>© 2026 FJKT48. Dibuat oleh fans, untuk fans.</p>
          <div className="flex items-center gap-8">
            <Link href="/rules" className="hover:text-ink transition-colors">
              Aturan komunitas
            </Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Kebijakan privasi
            </Link>
          </div>
        </div>

        {/* Full-Bleed FJKT48 Wordmark Cropped ~12% by Bottom Edge (§7.6) */}
        <div
          ref={wordmarkRef}
          className="select-none pointer-events-none overflow-hidden -mb-[28px] sm:-mb-[35px] lg:-mb-[58px] text-center"
          aria-hidden="true"
        >
          <span className="font-display font-black tracking-[-0.04em] text-[133px] sm:text-[285px] lg:text-[497px] leading-[0.78] block">
            <span className="text-ink">FJKT</span>
            <span className="text-crimson-500">48</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
