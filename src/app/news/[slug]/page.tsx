import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Article,
  ArrowUpRight,
  ArrowLeft,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";
import officialData from "@/data/jkt48-official.json";
import type { JKT48News } from "@/types/jkt48-types";
import Footer from "@/components/layout/footer";

const allNews = (officialData.news ?? []) as JKT48News[];

export function generateStaticParams() {
  return allNews.map((item) => ({
    slug: String(item.news_id),
  }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const newsItem = allNews.find(
    (item) =>
      String(item.news_id) === slug ||
      item.title.toLowerCase().includes(slug.toLowerCase())
  );

  if (!newsItem) {
    notFound();
  }

  const relatedNews = allNews
    .filter(
      (item) =>
        item.news_id !== newsItem.news_id &&
        (item.category === newsItem.category || true)
    )
    .slice(0, 3);

  const officialExternalUrl =
    newsItem.link ||
    `https://jkt48.com/news/detail/id/${newsItem.news_id}?lang=id`;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col justify-between transition-colors duration-300">
      <main className="w-full">
        {/* Breadcrumb Bar */}
        <section className="border-b border-[var(--line)] py-6">
          <div className="mx-auto max-w-[1000px] px-6 sm:px-12 flex items-center gap-2 font-mono-data text-xs text-[var(--muted)]">
            <Link
              href="/"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Beranda
            </Link>
            <span>/</span>
            <Link
              href="/news"
              className="hover:text-[var(--ink)] transition-colors"
            >
              Berita Resmi
            </Link>
            <span>/</span>
            <span className="text-crimson-400 font-semibold truncate max-w-[200px] sm:max-w-md">
              {newsItem.title}
            </span>
          </div>
        </section>

        {/* Article Container */}
        <article className="py-12 sm:py-16">
          <div className="mx-auto max-w-[1000px] px-6 sm:px-12 space-y-8">
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson-500/10 text-crimson-400 border border-crimson-500/20 font-mono-data text-xs font-semibold uppercase tracking-wider">
                  {newsItem.category || "Pengumuman"}
                </span>

                <div className="flex items-center gap-1.5 font-mono-data text-xs text-[var(--muted)]">
                  <CalendarBlank className="w-4 h-4" />
                  <time dateTime={newsItem.valid_date_from}>
                    {new Date(newsItem.valid_date_from).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </time>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight text-[var(--ink)]">
                {newsItem.title}
              </h1>
            </div>

            {/* Reading Card Surface (Zero border) */}
            <div className="rounded-2xl bg-[var(--surface)] p-6 sm:p-10 space-y-8 shadow-sm">
              {/* Official Banner Notice */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--surface-raised)]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-crimson-500/15 text-crimson-400 shrink-0">
                    <Article weight="bold" className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[var(--ink)]">
                      Rilis Resmi Manajemen JKT48
                    </p>
                    <p className="font-mono-data text-xs text-[var(--muted)]">
                      ID Pengumuman: #{newsItem.news_id} · jkt48.com
                    </p>
                  </div>
                </div>

                <a
                  href={officialExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-crimson-500 hover:bg-crimson-600 text-white font-semibold text-xs transition-all duration-200 shadow-md shadow-crimson-900/30 shrink-0"
                >
                  <span>Buka di Situs Resmi</span>
                  <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Article Body Content */}
              <div className="prose prose-invert max-w-none text-sm sm:text-base text-[var(--ink)] leading-relaxed space-y-4">
                <p className="text-base sm:text-lg font-medium leading-relaxed">
                  Terima kasih atas dukungannya kepada JKT48.
                </p>
                <p>
                  Berikut adalah informasi resmi terbaru mengenai kegiatan,
                  pengumuman jadwal, atau regulasi yang dirilis oleh Manajemen
                  JKT48:
                </p>

                <div className="p-5 rounded-xl bg-[var(--bg)] border-l-4 border-crimson-500 my-6">
                  <p className="font-display font-bold text-lg sm:text-xl text-[var(--ink)] uppercase tracking-tight">
                    {newsItem.title}
                  </p>
                  <p className="font-mono-data text-xs text-[var(--muted)] mt-1">
                    Tanggal Rilis:{" "}
                    {new Date(newsItem.valid_date_from).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <p>
                  Untuk ketentuan syarat, tata cara pendaftaran tiket, maupun
                  pengumuman detail selengkapnya dapat diakses secara langsung
                  melalui portal resmi JKT48 Operation Team (JOT).
                </p>
              </div>

              {/* Actions & Sharing */}
              <div className="pt-6 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-xs text-[var(--muted)]">
                    Bagikan pengumuman:
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `${newsItem.title} - FJKT48`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[var(--surface-raised)] hover:bg-crimson-500/20 hover:text-crimson-400 font-mono-data text-xs transition-colors"
                  >
                    X / Twitter
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${newsItem.title} https://jkt48.com/news/detail/id/${newsItem.news_id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[var(--surface-raised)] hover:bg-emerald-500/20 hover:text-emerald-400 font-mono-data text-xs transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>

                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 font-mono-data text-xs text-crimson-400 hover:text-crimson-500 font-semibold transition-colors"
                >
                  <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
                  <span>Kembali ke semua berita</span>
                </Link>
              </div>
            </div>

            {/* Related News Section */}
            {relatedNews.length > 0 && (
              <div className="pt-10 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-[var(--ink)]">
                    Pengumuman Resmi Terkait
                  </h2>
                  <Link
                    href="/news"
                    className="font-mono-data text-xs text-crimson-400 hover:underline"
                  >
                    Lihat semua →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedNews.map((item) => (
                    <Link
                      key={item.news_id}
                      href={`/news/${item.news_id}`}
                      className="group p-5 rounded-2xl bg-[var(--surface)] hover:bg-[var(--surface-raised)] transition-all duration-200 hover:-translate-y-0.5 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-mono-data text-[var(--muted)]">
                        <span className="text-crimson-400 font-semibold">
                          {item.category}
                        </span>
                        <span>
                          {new Date(item.valid_date_from).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                            }
                          )}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-[var(--ink)] group-hover:text-crimson-400 transition-colors line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
