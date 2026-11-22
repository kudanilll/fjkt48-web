import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import SectionHeading from "@/components/shared/section-heading";
import NewsCard from "@/components/shared/news-card";
import ScrollReveal from "@/components/animation/scroll-reveal";
import type { JKT48News } from "@/types/jkt48-types";

interface NewsSectionProps {
  news: JKT48News[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="w-full px-6 sm:px-12 lg:px-16 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            eyebrow="Pengumuman Resmi"
            title="Kabar & Berita Terkini"
            description="Update penting mengenai audisi, konser, anniversary, dan informasi resmi manajemen JKT48."
          />

          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson-600 hover:text-crimson-700 dark:text-crimson-400 dark:hover:text-crimson-300 transition-colors"
          >
            <span>Semua Pengumuman</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {news.map((item, idx) => (
            <ScrollReveal key={item.news_id} delay={idx * 0.08}>
              <NewsCard news={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
