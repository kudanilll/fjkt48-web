"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import Button from "@/components/ui/button";

interface HeroMember {
  nickname: string;
  name: string;
  team: string;
  index: number;
}

const heroMembers: HeroMember[] = [
  { nickname: "christy", name: "Angelina Christy", team: "Passion", index: 0 },
  { nickname: "marsha", name: "Marsha Lenathea", team: "Dream", index: 1 },
  { nickname: "freya", name: "Freya Jayawardana", team: "Passion", index: 2 },
  { nickname: "gita", name: "Gita Sekar", team: "Dream", index: 3 },
  { nickname: "oline", name: "Oline Manuel", team: "Trainee", index: 4 },
];

export default function HeroNightTheater() {
  const [activeSpotlight, setActiveSpotlight] = useState<number>(2); // Center member (Freya) default
  const [isPointerInside, setIsPointerInside] = useState<boolean>(false);
  const heroRef = useRef<HTMLElement>(null);
  const driftTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-drift idle animation (drifts between members every 3.5s when idle)
  useEffect(() => {
    if (isPointerInside) return;

    const interval = setInterval(() => {
      setActiveSpotlight((prev) => (prev + 1) % heroMembers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPointerInside]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    setIsPointerInside(true);

    if (driftTimerRef.current) {
      clearTimeout(driftTimerRef.current);
    }

    driftTimerRef.current = setTimeout(() => {
      setIsPointerInside(false);
    }, 3000);

    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    // Determine which column is closest (0 to 4)
    const colWidth = width / 5;
    const colIndex = Math.min(
      Math.max(0, Math.floor(x / colWidth)),
      heroMembers.length - 1
    );

    if (colIndex !== activeSpotlight) {
      setActiveSpotlight(colIndex);
    }
  };

  const handlePointerLeave = () => {
    driftTimerRef.current = setTimeout(() => {
      setIsPointerInside(false);
      setActiveSpotlight(2); // return to center
    }, 1500);
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="stage relative min-h-[820px] md:min-h-[920px] w-full overflow-hidden bg-bg text-ink pt-12 pb-20 flex flex-col justify-between select-none"
      aria-label="Panggung Hero Night Theater"
    >
      {/* House Tint Multiply Layer (§7.4) */}
      <div
        className="pointer-events-none absolute inset-0 bg-house-tint mix-blend-multiply opacity-60 z-10"
        aria-hidden="true"
      />

      {/* Dynamic Overhead Spotlight Beam */}
      <div
        className="pointer-events-none absolute top-0 w-80 md:w-96 h-[600px] transition-all duration-700 ease-out z-20"
        style={{
          left: `${(activeSpotlight / (heroMembers.length - 1)) * 80 + 10}%`,
          transform: "translateX(-50%)",
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 65deg, rgba(255, 231, 204, 0.16) 90deg, transparent 115deg)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* Dynamic Floor Light Pool */}
      <div
        className="pointer-events-none absolute top-[480px] md:top-[560px] w-96 h-28 rounded-full transition-all duration-700 ease-out z-20"
        style={{
          left: `${(activeSpotlight / (heroMembers.length - 1)) * 80 + 10}%`,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(255, 231, 204, 0.25) 0%, rgba(255, 231, 204, 0) 70%)",
          filter: "blur(12px)",
        }}
        aria-hidden="true"
      />

      {/* Five Member Stage Portraits (§7.4) */}
      <div className="relative z-0 w-full px-4 sm:px-12 lg:px-16 pt-4 overflow-hidden">
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 justify-center items-center">
          {heroMembers.map((member) => {
            const isLit = activeSpotlight === member.index;

            return (
              <div
                key={member.nickname}
                onMouseEnter={() => setActiveSpotlight(member.index)}
                className={`relative h-[380px] sm:h-[460px] md:h-[520px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
                  member.index === 0 || member.index === 4
                    ? "hidden lg:block"
                    : member.index === 1 || member.index === 3
                      ? "w-16 sm:w-24 md:w-auto shrink-0 opacity-40 grayscale contrast-125 z-0"
                      : "w-[240px] sm:w-[300px] md:w-auto shrink-0"
                } ${
                  isLit
                    ? "scale-[1.02] shadow-2xl shadow-crimson-500/20 z-10 opacity-100"
                    : "opacity-40 grayscale contrast-125 z-0"
                }`}
              >
                {/* Member Photograph */}
                <Image
                  src={`/members/${member.nickname}.jpg`}
                  alt={member.name}
                  fill
                  priority={member.index === 2}
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                />

                {/* Spotlight Vignette */}
                <div
                  className="pointer-events-none absolute inset-0 bg-radial-[circle_at_50%_36%] from-transparent via-bg/50 to-bg/90"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floor Fade Linear Gradient to Dark Ground (§7.4) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[480px] bg-gradient-to-t from-bg via-bg/90 to-transparent z-20"
        aria-hidden="true"
      />

      {/* Poster Headline & Foreground Content */}
      <div className="relative z-30 w-full px-6 sm:px-12 lg:px-16 pt-8">
        <div className="space-y-6">
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[132px] tracking-tight leading-[0.88] uppercase text-ink">
            SHOW-NYA SELESAI.
            <br />
            OBROLANNYA BELUM.
          </h1>

          {/* Row layout on desktop: lede & CTAs on left, Next Show on right */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-2">
            <div className="space-y-6 max-w-xl">
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                Forum fans JKT48 buat ngobrolin show, member, dan live. Tempat
                kumpul setelah lampu theater padam.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button href="/forum" variant="primary" size="lg" showArrow>
                  Masuk ke forum
                </Button>
                <Button href="/schedule" variant="secondary" size="lg">
                  Lihat jadwal
                </Button>
              </div>
            </div>

            {/* Next Show Floating Card (FigCraft ID: 836) */}
            <div className="shrink-0 w-full lg:w-auto">
              <Link
                href="/schedule"
                className="inline-flex items-center gap-4 p-3.5 pr-4 rounded-[14px] bg-surface/80 backdrop-blur-md hover:bg-raised transition-all duration-200 group border-none shadow-xl shadow-black/40 w-full sm:w-auto sm:min-w-[384px]"
              >
                {/* Crimson Date Box */}
                <div className="w-14 h-14 rounded-[10px] bg-crimson-500 flex flex-col items-center justify-center shrink-0">
                  <span className="font-sans text-[10px] font-semibold text-white tracking-[0.05em] uppercase leading-none">
                    MIN
                  </span>
                  <span className="font-display text-3xl font-black text-white leading-none mt-0.5">
                    22
                  </span>
                </div>

                {/* Show Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-mono-data text-xs text-crimson-400 font-medium">
                    Besok di Theater, 19:00 WIB
                  </p>
                  <p className="font-sans font-semibold text-[17px] text-ink group-hover:text-crimson-400 transition-colors truncate">
                    Pertaruhan Cinta
                  </p>
                  <p className="font-sans text-xs text-muted truncate">
                    Birthday show · 64 fans lagi bahas
                  </p>
                </div>

                {/* Arrow Icon */}
                <ArrowRight
                  weight="bold"
                  className="w-5 h-5 text-ink shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
