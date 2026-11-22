"use client";

import { useState, useMemo } from "react";
import { Article, MagnifyingGlass, Sparkle } from "@phosphor-icons/react";
import SectionHeading from "@/components/shared/section-heading";
import NewsCard from "@/components/shared/news-card";
import ScrollReveal from "@/components/animation/scroll-reveal";
import officialData from "@/data/jkt48-official.json";
import type { JKT48News, NewsCategory } from "@/types/jkt48-types";

interface CategoryOption {
  id: "ALL" | NewsCategory;
  label: string;
}

const categories: CategoryOption[] = [
  { id: "ALL", label: "Semua Berita" },
  { id: "Theater", label: "Theater" },
  { id: "Event", label: "Event" },
  { id: "Birthday", label: "Birthday" },
  { id: "Other", label: "Lainnya" },
];

const allNews: JKT48News[] = (officialData.news ?? []) as JKT48News[];

export default function BeritaPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "ALL" | NewsCategory
  >("ALL");
  const [search, setSearch] = useState<string>("");

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
      const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <SectionHeading
          eyebrow="Pusat Informasi & Pengumuman"
          title="Berita Resmi JKT48"
          description="Arsip dan rilis informasi resmi seputar kegiatan, penjualan tiket, pengumuman regulasi konser, hingga audisi generasi baru."
        />

        <div className="flex items-center gap-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 self-start sm:self-auto">
          <Article className="h-4 w-4 text-crimson-600" />
          <span>{filteredNews.length} Berita Dirilis</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl border border-neutral-200/80 bg-white/70 dark:border-neutral-800/80 dark:bg-neutral-900/60 backdrop-blur-md">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1">
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            const count = counts[c.id];
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-crimson-600 text-white shadow-sm shadow-crimson-600/30"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80 flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus-within:border-crimson-600">
          <MagnifyingGlass className="h-4 w-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul pengumuman..."
            className="w-full bg-transparent text-xs focus:outline-none placeholder:text-neutral-400 text-neutral-900 dark:text-neutral-100"
          />
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item, idx) => (
          <ScrollReveal key={item.news_id} delay={Math.min(idx * 0.05, 0.3)}>
            <NewsCard news={item} />
          </ScrollReveal>
        ))}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <div className="py-20 text-center space-y-3 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-crimson-50 text-crimson-600 dark:bg-crimson-950/40 dark:text-crimson-400">
            <Sparkle weight="fill" className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Pengumuman Tidak Ditemukan
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
            Tidak ada pengumuman yang cocok dengan kata kunci &quot;{search}
            &quot;.
          </p>
        </div>
      )}
    </main>
  );
}
