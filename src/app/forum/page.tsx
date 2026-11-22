"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ForumHeader from "@/components/forum/forum-header";
import ForumThreadList from "@/components/forum/forum-thread-list";
import ForumSidebar from "@/components/forum/forum-sidebar";
import { forumThreads } from "@/data/forum-mock-data";

function ForumContent() {
  const searchParams = useSearchParams();
  const initialBlock = searchParams.get("block") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialBlock);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSort, setActiveSort] = useState<
    "latest" | "popular" | "unanswered"
  >("latest");

  // Filter threads based on active category & search query
  const filteredThreads = useMemo(() => {
    let result = [...forumThreads];

    if (activeCategory !== "all") {
      result = result.filter((t) => t.categorySlug === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.content.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.label.toLowerCase().includes(q))
      );
    }

    if (activeSort === "popular") {
      result.sort((a, b) => b.reactions - a.reactions);
    } else if (activeSort === "unanswered") {
      result = result.filter((t) => t.repliesCount === 0);
    }

    return result;
  }, [activeCategory, searchQuery, activeSort]);

  const handleSelectTag = (tag: string) => {
    const cleanTag = tag.replace("#", "");
    setSearchQuery(cleanTag);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-6 sm:py-10 space-y-10">
      {/* Forum Header with Stats and Block Category Chips */}
      <ForumHeader
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Forum Grid: Thread List + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column (Spans 8 cols on desktop): Threads List */}
        <div className="lg:col-span-8">
          <ForumThreadList
            threads={filteredThreads}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeSort={activeSort}
            onSortChange={setActiveSort}
          />
        </div>

        {/* Right Column (Spans 4 cols on desktop): Community Sidebar */}
        <div className="lg:col-span-4">
          <ForumSidebar onSelectTag={handleSelectTag} />
        </div>
      </div>
    </div>
  );
}

export default function ForumPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors duration-300">
      <Suspense
        fallback={
          <div className="h-40 flex items-center justify-center font-mono-data text-xs text-[var(--muted)]">
            Memuat forum...
          </div>
        }
      >
        <ForumContent />
      </Suspense>
    </main>
  );
}
