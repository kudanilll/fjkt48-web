import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LiveTicker from "@/components/home/live-ticker";
import ThreadDetailMain from "@/components/forum/thread-detail-main";
import ThreadDetailRail from "@/components/forum/thread-detail-rail";
import { forumThreads } from "@/data/forum-mock-data";

interface ThreadPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return forumThreads.map((thread) => ({
    slug: thread.slug,
  }));
}

export async function generateMetadata({
  params,
}: ThreadPageProps): Promise<Metadata> {
  const { slug } = await params;
  const thread = forumThreads.find(
    (t) =>
      t.slug === slug || t.id === slug || t.id === slug.replace("thread-", "")
  );

  if (!thread) {
    return {
      title: "Thread Tidak Ditemukan | FJKT48",
    };
  }

  return {
    title: `${thread.title} | FJKT48`,
    description: thread.content.slice(0, 160),
  };
}

export default async function ThreadDetailPage({ params }: ThreadPageProps) {
  const { slug } = await params;
  const thread =
    forumThreads.find(
      (t) =>
        t.slug === slug || t.id === slug || t.id === slug.replace("thread-", "")
    ) || forumThreads[0]!;

  if (!thread) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg text-ink">
      {/* 1. Live Ticker */}
      <LiveTicker />

      {/* 2. Main Thread Surface */}
      <div className="w-full px-6 sm:px-12 lg:px-16 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Reading Surface (Spans 8 cols on desktop) */}
          <div className="lg:col-span-8">
            <ThreadDetailMain thread={thread} />
          </div>

          {/* Right Rail (Spans 4 cols on desktop) */}
          <div className="lg:col-span-4">
            <ThreadDetailRail memberNickname="freya" />
          </div>
        </div>
      </div>
    </main>
  );
}
