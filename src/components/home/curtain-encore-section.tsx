"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CurtainEncoreSection() {
  const encoreRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !textRef.current || !encoreRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { scale: 0.92, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: encoreRef.current,
            start: "top 75%",
          },
        }
      );
    }, encoreRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={encoreRef}
      className="stage relative w-full overflow-hidden text-center py-24 sm:py-36 px-6 select-none"
      style={{
        background:
          "linear-gradient(to right, #4A0510 0%, #8E0D20 8%, #5A0713 16%, #8E0D20 25%, #5A0713 34%, #9A1024 42%, #9A1024 58%, #5A0713 66%, #8E0D20 75%, #5A0713 84%, #8E0D20 92%, #4A0510 100%)",
      }}
      aria-label="Ajakan bergabung Encore komunitas FJKT48"
    >
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Big ENCORE! Display Heading (FigCraft ID: 1331) */}
        <h2
          ref={textRef}
          className="font-display font-black text-7xl sm:text-9xl md:text-[180px] lg:text-[240px] tracking-tight uppercase leading-[0.8] text-ink drop-shadow-[0_12px_40px_rgba(11,10,12,0.8)]"
        >
          ENCORE!
        </h2>

        {/* Lede Message (FigCraft ID: 1332) */}
        <p className="font-sans text-base sm:text-xl text-ink max-w-xl mx-auto leading-relaxed">
          Belum punya akun? Daftar gratis, pilih oshi kamu, dan ikut ngobrol
          bareng ribuan fans lain setelah show selesai.
        </p>

        {/* Actions (FigCraft ID: 1333) */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-bg font-sans font-bold text-sm sm:text-base hover:bg-neutral-100 transition-all duration-200 shadow-xl shadow-black/30"
          >
            <span>Daftar gratis</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent border border-white/40 text-white font-sans font-bold text-sm sm:text-base hover:bg-white/10 transition-all duration-200"
          >
            Masuk
          </Link>
        </div>
      </div>
    </section>
  );
}
