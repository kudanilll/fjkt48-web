"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, ArrowUpRight } from "@phosphor-icons/react";
import type { JKT48News } from "@/types/jkt48-types";

interface EditorialNewsSectionProps {
  news: JKT48News[];
}

export default function EditorialNewsSection({
  news,
}: EditorialNewsSectionProps) {
  const displayNews = news.slice(0, 3);

  return (
    <section
      className="w-full bg-[var(--bg)] text-[var(--ink)] py-20 sm:py-28 transition-colors duration-300"
      aria-label="Berita dan pengumuman resmi JKT48"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (Spans 4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-crimson-400 font-mono-data text-xs font-semibold uppercase tracking-wider">
              <Newspaper weight="fill" className="w-4 h-4" />
              <span>OFFICIAL ANNOUNCEMENTS</span>
            </div>

            <h2 className="font-display font-black text-5xl sm:text-6xl tracking-tight uppercase leading-none">
              BERITA RESMI
            </h2>

            <p className="font-sans text-sm sm:text-base text-[var(--muted)] leading-relaxed">
              Kabar resmi, pengumuman tiket, jadwal event khusus, dan regulasi
              teater bersumber langsung dari jkt48.com.
            </p>

            <div className="pt-2">
              <Link
                href="/news"
                className="group inline-flex items-center gap-2 font-mono-data text-xs sm:text-sm font-semibold text-crimson-400 hover:text-crimson-500 transition-colors uppercase tracking-wider"
              >
                <span>Lihat arsip berita</span>
                <ArrowRight
                  weight="bold"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Right Column (Spans 8 cols on desktop): List of news */}
          <div className="lg:col-span-8 divide-y divide-[var(--line)] border-t lg:border-t-0 border-[var(--line)]">
            {displayNews.map((item) => (
              <a
                key={item.news_id}
                href={item.link || "https://jkt48.com/news/list"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 transition-all duration-200 hover:bg-[var(--surface)]/50 -mx-4 px-4 rounded-xl"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 text-xs font-mono-data text-[var(--muted)]">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--surface)] text-crimson-400 font-semibold border border-[var(--border)]">
                      {item.category || "Pengumuman"}
                    </span>
                    <span>·</span>
                    <span>
                      {new Date(item.valid_date_from).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <h3 className="font-sans font-semibold text-base sm:text-lg text-[var(--ink)] group-hover:text-crimson-400 group-hover:translate-x-1 transition-all duration-200 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:bg-crimson-500 group-hover:text-white group-hover:border-crimson-500 transition-all duration-200 shrink-0">
                  <ArrowUpRight weight="bold" className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
