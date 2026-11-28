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

const memberCenters = [10, 30, 50, 70, 90];

export default function HeroNightTheater() {
  const [activeSpotlight, setActiveSpotlight] = useState<number>(2); // Center member (Freya) default
  const targetPosRef = useRef({ x: 50, y: 32 });
  const currentPosRef = useRef({ x: 50, y: 32 });
  const animFrameRef = useRef<number | null>(null);
  const isPointerInsideRef = useRef<boolean>(false);
  const lastInteractionTimeRef = useRef<number>(0);
  const heroRef = useRef<HTMLElement>(null);

  // Spotlight animation with lerp 0.12 and idle drift (FigCraft §738)
  useEffect(() => {
    lastInteractionTimeRef.current = Date.now();
    const startTime = Date.now();

    const loop = () => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      const timeSinceInteraction = now - lastInteractionTimeRef.current;

      // Idle drifting: smoothly wave across members when idle > 1.5s
      if (!isPointerInsideRef.current && timeSinceInteraction > 1500) {
        const idleWave = Math.sin((elapsed * 2 * Math.PI) / 12);
        targetPosRef.current = {
          x: 50 + idleWave * 32,
          y: 32 + Math.cos((elapsed * 2 * Math.PI) / 6) * 4,
        };
      }

      // Lerp 0.12 following target
      const dx = targetPosRef.current.x - currentPosRef.current.x;
      const dy = targetPosRef.current.y - currentPosRef.current.y;
      currentPosRef.current.x += dx * 0.12;
      currentPosRef.current.y += dy * 0.12;

      // Direct DOM update via CSS variables for smooth 60fps rendering without React re-renders
      if (heroRef.current) {
        heroRef.current.style.setProperty(
          "--spotlight-x",
          `${currentPosRef.current.x.toFixed(2)}%`
        );
        heroRef.current.style.setProperty(
          "--spotlight-y",
          `${currentPosRef.current.y.toFixed(2)}%`
        );
      }

      // Update lit card state only when crossing member boundaries
      const colIndex = Math.min(
        4,
        Math.max(0, Math.floor((currentPosRef.current.x / 100) * 5))
      );
      setActiveSpotlight((prev) => (prev !== colIndex ? colIndex : prev));

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    isPointerInsideRef.current = true;
    lastInteractionTimeRef.current = Date.now();

    const rect = heroRef.current.getBoundingClientRect();
    const xPct = Math.max(
      8,
      Math.min(92, ((e.clientX - rect.left) / rect.width) * 100)
    );
    const yPct = Math.max(
      22,
      Math.min(50, ((e.clientY - rect.top) / rect.height) * 100)
    );

    targetPosRef.current = { x: xPct, y: yPct };
  };

  const handlePointerLeave = () => {
    isPointerInsideRef.current = false;
    lastInteractionTimeRef.current = Date.now();
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="stage relative z-10 w-full overflow-x-clip bg-bg text-ink pt-4 sm:pt-6 pb-16 sm:pb-20 select-none"
      aria-label="Panggung Hero Night Theater"
    >
      {/* Overhead Spotlight Beam Cone (FigCraft ID: 853 - starts from ceiling above floating navbar) */}
      <div
        className="pointer-events-none absolute -top-20 sm:-top-24 w-72 sm:w-88 md:w-95 h-170 md:h-190 -translate-x-1/2 mix-blend-screen z-10 transition-opacity duration-300"
        style={{
          left: "var(--spotlight-x, 50%)",
          background:
            "linear-gradient(to bottom, rgba(255, 231, 204, 0.18) 0%, rgba(255, 231, 204, 0.05) 55%, transparent 100%)",
          clipPath: "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)",
        }}
        aria-hidden="true"
      />

      {/* Dynamic Warm Ambient Spotlight Glow (FigCraft ID: 738, radius 280px) */}
      <div
        className="pointer-events-none absolute w-110 sm:w-130 md:w-140 h-110 sm:h-130 md:h-140 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen z-10 filter blur-xl transition-opacity duration-300"
        style={{
          left: "var(--spotlight-x, 50%)",
          top: "var(--spotlight-y, 35%)",
          background:
            "radial-gradient(circle at center, rgba(255, 231, 204, 0.22) 0%, rgba(255, 231, 204, 0.06) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Dynamic Floor Light Pool (FigCraft ID: 854) */}
      <div
        className="pointer-events-none absolute top-[400px] sm:top-[480px] md:top-[540px] w-80 sm:w-96 md:w-105 h-20 -translate-x-1/2 rounded-[100%] mix-blend-screen z-10 filter blur-xs transition-opacity duration-300"
        style={{
          left: "var(--spotlight-x, 50%)",
          background:
            "radial-gradient(ellipse at center, rgba(255, 231, 204, 0.24) 0%, rgba(255, 231, 204, 0.06) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Five Member Stage Portraits (§7.4) */}
      <div className="relative z-10 w-full px-4 sm:px-12 lg:px-16 mt-2 overflow-hidden">
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-2 justify-center items-center">
          {heroMembers.map((member) => {
            const isLit = activeSpotlight === member.index;
            return (
              <div
                key={member.nickname}
                onMouseEnter={() => {
                  isPointerInsideRef.current = true;
                  lastInteractionTimeRef.current = Date.now();
                  targetPosRef.current = {
                    x: memberCenters[member.index],
                    y: 32,
                  };
                }}
                className={`relative h-95 sm:h-115 md:h-130 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
                  member.index === 0 || member.index === 4
                    ? "hidden lg:block"
                    : member.index === 1 || member.index === 3
                      ? "w-16 sm:w-24 md:w-auto shrink-0"
                      : "w-60 sm:w-75 md:w-auto shrink-0"
                } ${
                  isLit
                    ? "shadow-2xl shadow-crimson-500/20 z-10 opacity-100 scale-[1.01]"
                    : "opacity-35 grayscale contrast-125 z-0"
                }`}
              >
                {/* Member Photograph */}
                <Image
                  src={`/members/${member.nickname}.jpg`}
                  alt={member.name}
                  fill
                  priority={member.index === 2}
                  className="object-cover object-top transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                />

                {/* Spotlight Vignette matching FigCraft Node 852 */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isLit ? "opacity-100" : "opacity-80"
                  }`}
                  style={{
                    background: isLit
                      ? "radial-gradient(circle at 50% 36%, transparent 0%, rgba(11, 10, 12, 0.15) 50%, rgba(11, 10, 12, 0.85) 100%)"
                      : "rgba(11, 10, 12, 0.55)",
                  }}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floor Fade Linear Gradient to Dark Ground (FigCraft ID: 798) */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 sm:h-80 md:h-96 bg-linear-to-t from-bg via-bg/70 to-transparent z-20"
        aria-hidden="true"
      />

      {/* Poster Headline & Foreground Content */}
      <div className="relative z-30 w-full px-6 sm:px-12 lg:px-16 -mt-20 sm:-mt-28 md:-mt-36 lg:-mt-44 xl:-mt-44">
        <div className="space-y-6">
          <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-[124px] xl:text-[140px] tracking-tight leading-[0.88] uppercase text-ink">
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
                  <span className="font-sans text-[10px] font-semibold text-white tracking-wider uppercase leading-none">
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
