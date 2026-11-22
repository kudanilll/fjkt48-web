"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Calendar,
  Heart,
  Sparkle,
  Users,
} from "@phosphor-icons/react";

gsap.registerPlugin(useGSAP);

interface HeroSectionProps {
  totalMembers: number;
  totalShows: number;
}

export default function HeroSection({
  totalMembers,
  totalShows,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          standard: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as {
            reduceMotion: boolean;
            standard: boolean;
          };

          if (reduceMotion) {
            gsap.set(
              [
                badgeRef.current,
                titleRef.current,
                subtitleRef.current,
                ctaRef.current,
                statsRef.current,
              ],
              { autoAlpha: 1, y: 0 }
            );
            return;
          }

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.fromTo(
            badgeRef.current,
            { autoAlpha: 0, y: -20 },
            { autoAlpha: 1, y: 0, duration: 0.6 }
          )
            .fromTo(
              titleRef.current,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.8 },
              "-=0.3"
            )
            .fromTo(
              subtitleRef.current,
              { autoAlpha: 0, y: 25 },
              { autoAlpha: 1, y: 0, duration: 0.7 },
              "-=0.5"
            )
            .fromTo(
              ctaRef.current,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              "-=0.4"
            )
            .fromTo(
              statsRef.current,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.6 },
              "-=0.4"
            );
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32"
    >
      {/* Decorative Stage Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-crimson-600/15 via-rose-500/5 to-transparent blur-3xl dark:from-crimson-600/20"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-8 text-center space-y-8">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full border border-crimson-200/80 bg-crimson-50/80 px-4 py-1.5 text-xs font-semibold text-crimson-700 backdrop-blur-md dark:border-crimson-900/60 dark:bg-crimson-950/40 dark:text-crimson-300"
        >
          <Sparkle
            weight="fill"
            className="h-3.5 w-3.5 text-crimson-600 dark:text-crimson-400"
          />
          <span>Komunitas Penggemar Idol JKT48 Terlengkap</span>
        </div>

        {/* Cinematic Main Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-[1.08]"
        >
          Satu Panggung,{" "}
          <span className="bg-gradient-to-r from-crimson-600 via-rose-600 to-amber-500 bg-clip-text text-transparent">
            Sejuta Energi
          </span>{" "}
          Idol JKT48.
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mx-auto max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
        >
          Portal independen bagi Wota dan fans JKT48. Pantau jadwal setlist
          teater fX Sudirman, kabar berita resmi, hingga biodata dan roster
          seluruh member dari Team Love, Dream, Passion, dan Trainee.
        </p>

        {/* CTA Actions */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 rounded-xl bg-crimson-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-crimson-600/25 transition-all duration-200 hover:bg-crimson-700 hover:shadow-crimson-600/35 hover:-translate-y-0.5"
          >
            <Calendar className="h-4 w-4" />
            <span>Jadwal Teater Terdekat</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/member"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300/80 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm transition-all duration-200 hover:bg-neutral-50 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            <Users className="h-4 w-4" />
            <span>Katalog Roster Member</span>
          </Link>
        </div>

        {/* Community Stats Bar */}
        <div
          ref={statsRef}
          className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 rounded-2xl border border-neutral-200/80 bg-white/70 p-6 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/60 sm:grid-cols-4"
        >
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">
              {totalMembers}
            </p>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Member Aktif
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">
              4
            </p>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Tim & Trainee
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">
              {totalShows}+
            </p>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Jadwal Teater
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-50 flex items-center justify-center gap-1">
              <span>100%</span>
              <Heart
                weight="fill"
                className="h-4 w-4 text-crimson-600 inline"
              />
            </p>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Dukungan Fans
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
