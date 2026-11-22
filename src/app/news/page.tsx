"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Article,
  MagnifyingGlass,
  ArrowUpRight,
  CalendarBlank,
  CaretRight,
} from "@phosphor-icons/react";
import officialData from "@/data/jkt48-official.json";
import type { JKT48News, NewsCategory } from "@/types/jkt48-types";
import Footer from "@/components/layout/footer";

interface CategoryOption {
  id: "ALL" | NewsCategory;
  label: string;
}

const categories: CategoryOption[] = [
  { id: "ALL", label: "Semua Berita" },
  { id: "Theater", label: "Teater" },
  { id: "Event", label: "Event" },
  { id: "Birthday", label: "Ulang Tahun" },
  { id: "Other", label: "Lainnya" },
];

const allNews = (officialData.news ?? []) as JKT48News[];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "ALL" | NewsCategory
  >("ALL");
  const [search, setSearch] = useState("");

  const counts = useMemo(() => {
    return {
      ALL: allNews.length,
      Theater: allNews.filter((n) => n.category === "Theater").length,
      Event: allNews.filter((n) => n.category === "Event").length,
      Birthday: allNews.filter((n) => n.category === "Birthday").length,
      Other: allNews.filter((n) => n.category === "Other").length,
    };
  }, []);

  const filteredNews = useMemo(() => {
    return allNews.filter((n) => {
      const matchCategory =
        selectedCategory === "ALL" || n.category === selectedCategory;
      const matchSearch =
        search === "" ||
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.category.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col justify-between transition-colors duration-300">
      <main className="w-full">
        {/* Header Section */}
        <section className="border-b border-[var(--line)] py-12 sm:py-16">
          <div className="w-full px-6 sm:px-12 lg:px-16 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 font-mono-data text-xs text-[var(--muted)]">
              <Link
                href="/"
                className="hover:text-[var(--ink)] transition-colors"
              >
                Beranda
              </Link>
              <span>/</span>
              <span className="text-crimson-400 font-semibold">
                Berita Resmi
              </span>
            </div>

            {/* Title & Eyebrow */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-crimson-400 font-mono-data text-xs font-semibold uppercase tracking-widest">
                  <Article weight="fill" className="w-4 h-4" />
                  <span>OFFICIAL ANNOUNCEMENTS</span>
                </div>
                <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tight leading-none">
                  BERITA RESMI JKT48
                </h1>
                <p className="font-sans text-sm sm:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
                  Arsip rilis resmi seputar show teater, regulasi event, jadwal
                  2-shot, pengumuman sousenkyo, dan ulang tahun member bersumber
                  dari jkt48.com.
                </p>
              </div>

              {/* Total counter badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] text-xs font-mono-data text-[var(--muted)] self-start lg:self-auto shrink-0">
                <span className="w-2 h-2 rounded-full bg-crimson-500" />
                <span>{filteredNews.length} pengumuman terdaftar</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Content Section */}
        <section className="py-10 sm:py-14">
          <div className="w-full px-6 sm:px-12 lg:px-16 space-y-8">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Category Segmented Chips */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((c) => {
                  const isSelected = selectedCategory === c.id;
                  const count = counts[c.id];
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCategory(c.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "bg-crimson-500 text-white font-semibold shadow-md shadow-crimson-900/30"
                          : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)]"
                      }`}
                    >
                      <span>{c.label}</span>
                      <span
                        className={`text-[11px] font-mono-data px-1.5 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-[var(--surface-raised)] text-[var(--muted)]"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--muted)]">
                  <MagnifyingGlass weight="bold" className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari judul pengumuman..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-crimson-500 transition-colors"
                />
              </div>
            </div>

            {/* News Grid */}
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((item) => (
                  <article
                    key={item.news_id}
                    className="group flex flex-col justify-between rounded-2xl bg-[var(--surface)] hover:bg-[var(--surface-raised)] p-6 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      {/* Meta top */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[var(--surface-raised)] text-crimson-400 font-mono-data text-xs font-semibold">
                          {item.category || "Pengumuman"}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono-data text-xs text-[var(--muted)]">
                          <CalendarBlank className="w-3.5 h-3.5" />
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
                      </div>

                      {/* Title */}
                      <Link
                        href={`/news/${item.news_id}`}
                        className="block font-bold text-base sm:text-lg text-[var(--ink)] group-hover:text-crimson-400 transition-colors line-clamp-3 leading-snug"
                      >
                        {item.title}
                      </Link>
                    </div>

                    {/* Action footer */}
                    <div className="pt-6 mt-6 border-t border-[var(--line)] flex items-center justify-between text-xs">
                      <Link
                        href={`/news/${item.news_id}`}
                        className="inline-flex items-center gap-1 text-crimson-400 hover:text-crimson-500 font-semibold transition-colors"
                      >
                        <span>Baca Rincian</span>
                        <CaretRight weight="bold" className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={
                          item.link ||
                          `https://jkt48.com/news/detail/id/${item.news_id}?lang=id`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[var(--muted)] hover:text-[var(--ink)] font-mono-data transition-colors"
                        title="Buka rilis resmi di situs JKT48"
                      >
                        <span>jkt48.com</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4 rounded-2xl bg-[var(--surface)] p-8">
                <Article
                  weight="thin"
                  className="w-12 h-12 text-[var(--muted)] mx-auto"
                />
                <h3 className="font-display font-bold text-xl uppercase tracking-tight text-[var(--ink)]">
                  Tidak Ada Berita Ditemukan
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[var(--muted)] max-w-sm mx-auto">
                  Tidak ada pengumuman yang sesuai dengan filter atau kata kunci
                  &ldquo;{search}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSearch("");
                  }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-crimson-500 hover:bg-crimson-600 text-white text-xs font-semibold transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
