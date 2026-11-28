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
        { opacity: 0.75 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
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
      className="relative overflow-x-clip bg-bg text-ink pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-16 md:pb-10 min-h-[729px] sm:min-h-[737px] lg:min-h-[800px] flex flex-col justify-between transition-colors duration-300"
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

        {/* Full-Width FJKT48 Wordmark Aligned with Layout Grid */}
        <div
          ref={wordmarkRef}
          className="select-none pointer-events-none w-full pt-4 sm:pt-6 pb-2"
          aria-hidden="true"
        >
          <svg
            viewBox="19 -10 1308 424"
            className="w-full h-auto block select-none overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M19.88 397.6L19.88 0L191.842 0L191.842 65.604L94.43 65.604L94.43 162.519L186.872 162.519L186.872 228.123L94.43 228.123L94.43 397.6ZM284.637 402.57Q248.108 402.57 226.861 392.506Q205.614 382.442 196.171 360.449Q186.728 338.457 185.734 302.673Q185.486 290.745 185.486 275.587Q185.486 260.428 185.734 248.5L255.811 248.5Q255.563 257.446 255.439 269.995Q255.314 282.545 255.439 295.094Q255.563 307.643 255.811 316.589Q256.308 328.766 263.266 335.351Q270.224 341.936 284.637 341.936Q299.299 341.936 305.636 335.351Q311.972 328.766 311.972 316.589L311.972 0L386.522 0L386.522 302.673Q386.522 356.349 363.785 379.46Q341.047 402.57 284.637 402.57ZM416.665 397.6L416.665 0L496.185 0L495.191 96.418L481.772 185.381L495.191 185.381L519.047 96.418L554.831 0L636.339 0L570.238 163.513L639.321 397.6L563.777 397.6L520.538 246.015L492.706 306.152L492.706 397.6ZM705.22 397.6L705.22 65.604L641.355 65.604L641.355 0L843.634 0L843.634 65.604L779.77 65.604L779.77 397.6Z"
              className="fill-ink"
            />
            <path
              transform="translate(847, 0)"
              d="M136.675 397.6L136.675 297.703L14.91 297.703L14.91 235.578L109.34 0L206.752 0L206.752 232.596L248.997 232.596L248.997 297.703L206.752 297.703L206.752 397.6ZM85.981 232.596L136.675 232.596L146.615 141.148L155.064 65.604L141.148 65.604L117.789 141.148ZM373.119 402.57Q319.194 402.57 294.593 379.46Q269.991 356.349 267.755 302.673Q267.506 296.958 267.631 291.366Q267.755 285.775 268.003 280.308Q268.252 274.841 268.749 269.374Q271.482 242.039 281.795 226.135Q292.108 210.231 312.485 201.285L312.485 190.351Q298.817 185.133 288.132 173.329Q277.446 161.525 273.719 143.633Q272.476 137.669 271.607 128.226Q270.737 118.783 270.364 109.589Q269.991 100.394 270.24 94.927Q272.476 41.251 296.332 18.141Q320.188 -4.97 373.119 -4.97Q426.049 -4.97 449.781 18.141Q473.513 41.251 475.998 94.927Q476.246 100.394 475.874 109.589Q475.501 118.783 474.631 128.226Q473.761 137.669 472.519 143.633Q468.791 161.525 458.23 173.329Q447.669 185.133 433.753 190.351L433.753 201.782Q452.142 210.728 463.2 226.632Q474.258 242.536 477.489 269.374Q478.731 277.575 478.856 285.775Q478.98 293.976 478.483 302.673Q476.246 356.349 451.769 379.46Q427.292 402.57 373.119 402.57ZM373.119 341.936Q388.774 341.936 396.354 334.357Q403.933 326.778 403.933 312.613Q403.933 304.164 403.933 295.591Q403.933 287.018 403.933 278.444Q403.933 269.871 403.933 261.422Q403.933 247.258 396.354 239.678Q388.774 232.099 373.119 232.099Q357.463 232.099 349.884 239.678Q342.305 247.258 342.305 261.422Q342.305 274.096 342.305 287.018Q342.305 299.94 342.305 312.613Q342.305 326.778 349.884 334.357Q357.463 341.936 373.119 341.936ZM373.119 161.028Q388.774 161.028 396.354 153.449Q403.933 145.87 403.933 131.705Q403.933 120.026 403.933 108.222Q403.933 96.418 403.933 84.987Q403.933 70.823 396.354 63.243Q388.774 55.664 373.119 55.664Q357.463 55.664 349.884 63.243Q342.305 70.823 342.305 84.987Q342.305 90.703 342.305 96.542Q342.305 102.382 342.305 108.346Q342.305 114.31 342.305 120.15Q342.305 125.99 342.305 131.705Q342.305 145.87 349.884 153.449Q357.463 161.028 373.119 161.028Z"
              className="fill-crimson-500"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}
