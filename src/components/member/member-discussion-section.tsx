"use client";

import Link from "next/link";
import {
  ChatCircle,
  Flashlight,
  Eye,
  ArrowUpRight,
  PlusCircle,
} from "@phosphor-icons/react";
import type { MemberDetail } from "@/data/member-details-data";
import { forumThreads } from "@/data/forum-mock-data";

interface MemberDiscussionSectionProps {
  member: MemberDetail;
}

export default function MemberDiscussionSection({
  member,
}: MemberDiscussionSectionProps) {
  // Filter threads that tag this member or mention them, or take relevant threads
  const taggedThreads = forumThreads.filter((t) =>
    t.tags.some(
      (tag) =>
        tag.label.toLowerCase() === member.nickname.toLowerCase() ||
        tag.slug.toLowerCase().includes(member.nickname.toLowerCase())
    )
  );

  const displayThreads =
    taggedThreads.length > 0 ? taggedThreads : forumThreads.slice(0, 4);

  return (
    <section className="py-12 sm:py-16 md:py-20 border-t border-[var(--color-stage-800)] bg-[var(--color-stage-950)]">
      <div className="mx-auto max-w-[1344px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-mono font-medium tracking-widest uppercase text-[var(--color-crimson-400)] block mb-1">
              Ruang Komunitas
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[var(--color-ink)]">
              Diskusi Tentang {member.nickname}
            </h2>
          </div>

          <Link
            href="/forum"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-[var(--color-stage-800)] text-[var(--color-ink)] hover:bg-[var(--color-crimson-600)] hover:text-white transition-all self-start sm:self-auto"
          >
            <PlusCircle weight="bold" className="w-4 h-4" />
            <span>Bikin Thread Baru</span>
          </Link>
        </div>

        {/* Thread List Rows */}
        <div className="divide-y divide-[var(--color-stage-800)] rounded-2xl bg-[var(--color-stage-900)] overflow-hidden">
          {displayThreads.map((thread) => (
            <Link
              key={thread.id}
              href={`/forum/${thread.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 sm:p-6 hover:bg-[var(--color-stage-800)] transition-colors gap-4"
            >
              {/* Left Column: Category Pill + Title + Author */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-stage-800)] text-[var(--color-crimson-400)] font-semibold">
                    {thread.categoryName}
                  </span>
                  {thread.tags.map((tag) => (
                    <span
                      key={tag.slug}
                      className="text-[11px] font-mono text-[var(--color-muted)]"
                    >
                      #{tag.label}
                    </span>
                  ))}
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-crimson-400)] transition-colors line-clamp-2">
                  {thread.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-[var(--color-muted)] font-mono">
                  <span>oleh {thread.author.name}</span>
                  <span>&bull;</span>
                  <span>{thread.createdAt}</span>
                </div>
              </div>

              {/* Right Column: Stats & Arrow */}
              <div className="flex items-center gap-5 text-xs font-mono text-[var(--color-muted)] self-end md:self-center">
                <div className="flex items-center gap-1.5" title="Lightstick">
                  <Flashlight
                    weight="bold"
                    className="w-3.5 h-3.5 text-[var(--color-crimson-400)]"
                  />
                  <span>{thread.reactions}</span>
                </div>

                <div className="flex items-center gap-1.5" title="Balasan">
                  <ChatCircle weight="bold" className="w-3.5 h-3.5" />
                  <span>{thread.repliesCount}</span>
                </div>

                <div
                  className="hidden sm:flex items-center gap-1.5"
                  title="Dilihat"
                >
                  <Eye weight="bold" className="w-3.5 h-3.5" />
                  <span>{thread.views}</span>
                </div>

                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--color-stage-800)] group-hover:bg-[var(--color-crimson-500)] group-hover:text-white transition-colors ml-2">
                  <ArrowUpRight weight="bold" className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
