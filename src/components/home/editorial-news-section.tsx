"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { JKT48News } from "@/types/jkt48-types";

interface EditorialNewsSectionProps {
  news?: JKT48News[];
}

export default function EditorialNewsSection(props: EditorialNewsSectionProps) {
  void props;
  // Exact 3 announcements from FigCraft (ID: 1308)
  const officialNews = [
    {
      id: "news-1",
      date: "12 NOV",
      title: "Pengumuman Mengenai Audisi JKT48 Generasi ke-15 resmi dibuka",
      category: "Lainnya",
      link: "https://jkt48.com/news/list",
    },
    {
      id: "news-2",
      date: "11 NOV",
      title:
        "Pengumuman Mengenai Birthday 2-Shot Online bulan November dengan Chekicha",
      category: "Theater",
      link: "https://jkt48.com/news/list",
    },
    {
      id: "news-3",
      date: "06 NOV",
      title:
        "Pengumuman Mengenai AYO SENYUMLAH | JKT48 15th Anniversary Concert",
      category: "Theater",
      link: "https://jkt48.com/news/list",
    },
  ];

  return (
    <section
      className="w-full bg-bg text-ink py-20 sm:py-28 transition-colors duration-300 border-t border-[var(--line)]"
      aria-label="Berita dan pengumuman resmi JKT48"
    >
      <div className="w-full px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Intro (Spans 4 cols on desktop) - FigCraft ID: 1305 */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-display font-extrabold text-5xl sm:text-[64px] tracking-tight uppercase leading-none text-ink">
              BERITA RESMI
            </h2>

            <p className="font-sans text-base text-muted leading-relaxed max-w-sm">
              Diambil langsung dari jkt48.com. Setiap pengumuman bisa langsung
              dibahas di forum.
            </p>

            <div className="pt-2">
              <Link
                href="/news"
                className="group inline-flex items-center gap-1.5 font-mono-data text-xs sm:text-sm font-semibold text-crimson-400 hover:text-crimson-500 transition-colors uppercase tracking-wider"
              >
                <span>LIHAT ARSIP BERITA</span>
                <ArrowUpRight
                  weight="bold"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>

          {/* Right Column: List of News Rows (Spans 8 cols on desktop) - FigCraft ID: 1308 */}
          <div className="lg:col-span-8 divide-y divide-[var(--line)] border-t lg:border-t-0 border-[var(--line)]">
            {officialNews.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 px-4 -mx-4 rounded-xl transition-all duration-200 hover:bg-surface/60"
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                  {/* Date Stub */}
                  <span className="font-mono-data text-xs sm:text-[13px] text-muted shrink-0 font-medium">
                    {item.date}
                  </span>

                  {/* Title */}
                  <h3 className="font-sans font-semibold text-base sm:text-lg text-ink group-hover:text-crimson-400 transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Right Category Tag & Arrow */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto font-mono-data text-xs text-muted">
                  <span className="px-2.5 py-0.5 rounded-full bg-raised text-muted border border-border text-xs">
                    {item.category}
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    className="w-4 h-4 text-muted group-hover:text-crimson-400 transition-colors"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
