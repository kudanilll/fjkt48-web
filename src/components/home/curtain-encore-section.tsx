"use client";

import React, { useEffect, useRef } from "react";
import { Sparkle } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/button";

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
        { scale: 0.9, opacity: 0.7 },
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
          "linear-gradient(to right, #4A0510 0%, #8E0D20 12%, #5A0713 25%, #9A1024 38%, #5A0713 50%, #9A1024 62%, #5A0713 75%, #8E0D20 88%, #4A0510 100%)",
      }}
      aria-label="Ajakan bergabung Encore komunitas FJKT48"
    >
      {/* Dark theater lighting scrim */}
      <div
        className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-[#0B0A0C]/20 to-[#0B0A0C]/60"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-[#FFE7CC] font-mono-data text-xs font-semibold uppercase tracking-widest border border-white/10">
          <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#FFE7CC]" />
          <span>Lampu theater belum padam</span>
        </div>

        {/* Big ENCORE! Display Heading */}
        <h2
          ref={textRef}
          className="font-display font-black text-7xl sm:text-9xl md:text-[180px] lg:text-[240px] tracking-tight uppercase leading-[0.8] text-[#F4EFEA] drop-shadow-[0_12px_40px_rgba(11,10,12,0.8)]"
        >
          ENCORE!
        </h2>

        {/* Lede Message */}
        <p className="font-sans text-base sm:text-xl md:text-2xl text-[#F4EFEA] max-w-xl mx-auto leading-relaxed">
          Belum punya akun? Daftar gratis, pilih oshi kamu, dan ikut ngobrol
          bareng ribuan fans lain setelah show selesai.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button href="/register" variant="primary" size="lg" showArrow>
            Daftar sekarang
          </Button>
          <Button href="/login" variant="secondary" size="lg">
            Masuk
          </Button>
        </div>
      </div>
    </section>
  );
}
