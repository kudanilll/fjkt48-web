"use client";

import { ArrowUpRight, CalendarBlank } from "@phosphor-icons/react";
import { formatDateID } from "@/lib/jkt48-data";
import type { JKT48News } from "@/types/jkt48-types";

interface NewsCardProps {
  news: JKT48News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const officialDetailUrl = `https://jkt48.com/news/detail/id/${news.news_id}?lang=id`;

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 dark:border-neutral-800/80 dark:bg-neutral-900/70 transition-all duration-300 hover:-translate-y-1 hover:border-crimson-300 dark:hover:border-crimson-900/60 hover:shadow-lg">
      <div className="space-y-3">
        {/* Category & Date */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
            {news.category}
          </span>

          <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
            <CalendarBlank className="h-3.5 w-3.5" />
            <time dateTime={news.valid_date_from}>
              {formatDateID(news.valid_date_from)}
            </time>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base sm:text-lg leading-snug tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-crimson-600 dark:group-hover:text-crimson-400 transition-colors line-clamp-3">
          {news.title}
        </h3>
      </div>

      {/* Action link */}
      <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
          Official Announcement
        </span>

        <a
          href={officialDetailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-crimson-600 hover:text-crimson-700 dark:text-crimson-400 transition-colors"
        >
          <span>Baca Selengkapnya</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}
