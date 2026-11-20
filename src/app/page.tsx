"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Heart, Sparkle, Users } from "@phosphor-icons/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="flex items-center gap-2 mb-4 text-rose-600 font-semibold text-sm tracking-wider uppercase">
        <Sparkle weight="fill" className="w-4 h-4 text-rose-500" />
        <span>FJKT48 Community Portal</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
        FJKT48
      </h1>

      <p className="max-w-xl text-neutral-600 dark:text-neutral-400 mb-8 text-base md:text-lg">
        Portal komunitas penggemar JKT48 — informasi jadwal teater, berita
        pengumuman, katalog member, dan ruang interaksi fans.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/member">
          <Button
            variant="primary"
            className="flex items-center gap-2 font-medium bg-rose-600 hover:bg-rose-700 text-white"
          >
            <Users weight="bold" className="w-5 h-5" />
            Lihat Member
          </Button>
        </Link>

        <Link href="/member">
          <Button
            variant="secondary"
            className="flex items-center gap-2 font-medium"
          >
            <Heart weight="fill" className="w-5 h-5 text-rose-600" />
            Dukung Oshi
          </Button>
        </Link>
      </div>
    </main>
  );
}
