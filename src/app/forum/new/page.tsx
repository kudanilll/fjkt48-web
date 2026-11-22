"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChatCircle,
  PaperPlaneTilt,
  BookmarkSimple,
  ArrowLeft,
  Eye,
  PencilSimple,
  TextB,
  TextItalic,
  Quotes,
  Code,
  ListBullets,
  Tag,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import Footer from "@/components/layout/footer";

interface CategoryBlock {
  id: string;
  code: string;
  title: string;
  desc: string;
}

const categoryBlocks: CategoryBlock[] = [
  {
    id: "blok-a",
    code: "BLOK A",
    title: "Teater & Show",
    desc: "Setlist, jadwal, tiket teater, review dan report live performance",
  },
  {
    id: "blok-b",
    code: "BLOK B",
    title: "Member & Oshi",
    desc: "Apresiasi member, jikoshokai, pencapaian, update media sosial",
  },
  {
    id: "blok-c",
    code: "BLOK C",
    title: "Live Streaming",
    desc: "Nobar dan diskusi live Showroom, IDN Live, dan live event",
  },
  {
    id: "blok-d",
    code: "BLOK D",
    title: "Event & 2-Shot",
    desc: "Meet & Greet, sesi 2-Shot, handshake, tur luar kota, dan konser",
  },
  {
    id: "blok-e",
    code: "BLOK E",
    title: "Teori & Diskusi",
    desc: "Analisis setlist, sousenkyo, formasi senbatsu, masa depan grup",
  },
  {
    id: "blok-f",
    code: "BLOK F",
    title: "Fandom & Fanart",
    desc: "Fanart, fanfic, chant teater, merchandise fanmade, dan gathering",
  },
];

const availableTags = [
  "Freya Jayawardana",
  "Angelina Christy",
  "Jessica Chandra",
  "Shani Indira",
  "Cara Meminum Ramune",
  "Tunas Dibalik Seragam",
  "Aturan Anti Cinta",
  "Sousenkyo",
  "Showroom",
  "IDN Live",
  "Report Teater",
  "Chant Guide",
  "Fan Project",
];

export default function NewThreadPage() {
  const router = useRouter();

  // Form states
  const [selectedBlock, setSelectedBlock] = useState("blok-a");
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Cara Meminum Ramune",
  ]);
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length >= 4) return;
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const insertFormatting = (prefix: string, suffix: string = "") => {
    setContent((prev) => `${prev}${prefix}teks${suffix}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Judul thread wajib diisi");
      return;
    }
    if (title.trim().length < 8) {
      setError("Judul thread minimal 8 karakter");
      return;
    }
    if (!content.trim()) {
      setError("Isi thread tidak boleh kosong");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        router.push("/forum");
      }, 1500);
    }, 800);
  };

  const currentCategory = categoryBlocks.find((b) => b.id === selectedBlock);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col justify-between transition-colors duration-300">
      <main className="w-full">
        {/* Header Breadcrumb */}
        <section className="border-b border-[var(--line)] py-8">
          <div className="w-full px-6 sm:px-12 lg:px-16 space-y-4">
            <div className="flex items-center gap-2 font-mono-data text-xs text-[var(--muted)]">
              <Link
                href="/"
                className="hover:text-[var(--ink)] transition-colors"
              >
                Beranda
              </Link>
              <span>/</span>
              <Link
                href="/forum"
                className="hover:text-[var(--ink)] transition-colors"
              >
                Forum
              </Link>
              <span>/</span>
              <span className="text-crimson-400 font-semibold">
                Bikin Thread Baru
              </span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-crimson-400 font-mono-data text-xs font-semibold uppercase tracking-widest">
                <ChatCircle weight="fill" className="w-4 h-4" />
                <span>KOMPOSER DISKUSI</span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight leading-none">
                BIKIN THREAD BARU
              </h1>
              <p className="font-sans text-sm sm:text-base text-[var(--muted)]">
                Buka percakapan santun dan bermakna bersama ribuan fans JKT48 di
                panggung FJKT48.
              </p>
            </div>
          </div>
        </section>

        {/* Composer Form Section */}
        <section className="py-10 sm:py-14">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Main Form (8 Cols) */}
              <div className="lg:col-span-8 space-y-8">
                {submitted ? (
                  <div className="p-8 rounded-2xl bg-[var(--surface)] text-center space-y-4">
                    <CheckCircle
                      weight="fill"
                      className="w-16 h-16 text-emerald-400 mx-auto animate-bounce"
                    />
                    <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-[var(--ink)]">
                      Thread Berhasil Diterbitkan!
                    </h2>
                    <p className="text-sm text-[var(--muted)]">
                      Mengarahkan kembali ke daftar forum...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                      <div className="p-4 rounded-xl bg-crimson-500/10 border border-crimson-500/30 text-crimson-400 text-xs font-semibold">
                        {error}
                      </div>
                    )}

                    {/* Step 1: Pilih Blok Kategori */}
                    <div className="space-y-3">
                      <label className="block font-mono-data text-xs text-[var(--muted)] uppercase tracking-wider">
                        1. Pilih Blok Kategori Teater
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categoryBlocks.map((block) => {
                          const isSelected = selectedBlock === block.id;
                          return (
                            <button
                              key={block.id}
                              type="button"
                              onClick={() => setSelectedBlock(block.id)}
                              className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-crimson-500/15 border border-crimson-500/50 shadow-sm"
                                  : "bg-[var(--surface)] hover:bg-[var(--surface-raised)] border border-transparent"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`font-mono-data text-xs font-bold ${
                                    isSelected
                                      ? "text-crimson-400"
                                      : "text-[var(--muted)]"
                                  }`}
                                >
                                  {block.code}
                                </span>
                                {isSelected && (
                                  <span className="w-2 h-2 rounded-full bg-crimson-500" />
                                )}
                              </div>
                              <p className="font-bold text-sm text-[var(--ink)] mt-1">
                                {block.title}
                              </p>
                              <p className="text-xs text-[var(--muted)] line-clamp-1 mt-0.5">
                                {block.desc}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Judul Thread */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="thread-title"
                          className="font-mono-data text-xs text-[var(--muted)] uppercase tracking-wider"
                        >
                          2. Judul Thread
                        </label>
                        <span className="font-mono-data text-xs text-[var(--muted)]">
                          {title.length} / 120
                        </span>
                      </div>
                      <input
                        id="thread-title"
                        type="text"
                        maxLength={120}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Contoh: Diskusi Setlist Cara Meminum Ramune: Lagu mana yang paling berkesan?"
                        className="w-full px-5 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-crimson-500 transition-colors"
                      />
                    </div>

                    {/* Step 3: Tag Member atau Show */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="font-mono-data text-xs text-[var(--muted)] uppercase tracking-wider">
                          3. Tag Terkait (Maks. 4 Tag)
                        </label>
                        <span className="font-mono-data text-xs text-crimson-400">
                          {selectedTags.length}/4 dipilih
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {availableTags.map((tag) => {
                          const isPicked = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => toggleTag(tag)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-data transition-all cursor-pointer ${
                                isPicked
                                  ? "bg-crimson-500 text-white font-semibold shadow-sm"
                                  : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)]"
                              }`}
                            >
                              <Tag
                                weight={isPicked ? "fill" : "regular"}
                                className="w-3 h-3"
                              />
                              <span>{tag}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 4: Isi Diskusi */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="font-mono-data text-xs text-[var(--muted)] uppercase tracking-wider">
                          4. Isi Thread
                        </label>
                        {/* Tabs Write / Preview */}
                        <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--surface)] border border-[var(--border)]">
                          <button
                            type="button"
                            onClick={() => setActiveTab("write")}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                              activeTab === "write"
                                ? "bg-[var(--surface-raised)] text-[var(--ink)] shadow-sm"
                                : "text-[var(--muted)] hover:text-[var(--ink)]"
                            }`}
                          >
                            <PencilSimple
                              weight="bold"
                              className="w-3.5 h-3.5"
                            />
                            <span>Tulis</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab("preview")}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                              activeTab === "preview"
                                ? "bg-[var(--surface-raised)] text-[var(--ink)] shadow-sm"
                                : "text-[var(--muted)] hover:text-[var(--ink)]"
                            }`}
                          >
                            <Eye weight="bold" className="w-3.5 h-3.5" />
                            <span>Pratinjau</span>
                          </button>
                        </div>
                      </div>

                      {activeTab === "write" ? (
                        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden focus-within:border-crimson-500 transition-colors">
                          {/* Formatting Toolbar */}
                          <div className="flex items-center gap-1 px-4 py-2 border-b border-[var(--line)] bg-[var(--surface-raised)]/40 text-[var(--muted)] text-xs">
                            <button
                              type="button"
                              onClick={() => insertFormatting("**", "**")}
                              title="Tebal"
                              className="p-1.5 hover:text-[var(--ink)] hover:bg-[var(--surface)] rounded transition-colors"
                            >
                              <TextB weight="bold" className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => insertFormatting("*", "*")}
                              title="Miring"
                              className="p-1.5 hover:text-[var(--ink)] hover:bg-[var(--surface)] rounded transition-colors"
                            >
                              <TextItalic weight="bold" className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => insertFormatting("> ")}
                              title="Kutipan"
                              className="p-1.5 hover:text-[var(--ink)] hover:bg-[var(--surface)] rounded transition-colors"
                            >
                              <Quotes weight="bold" className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => insertFormatting("`", "`")}
                              title="Kode"
                              className="p-1.5 hover:text-[var(--ink)] hover:bg-[var(--surface)] rounded transition-colors"
                            >
                              <Code weight="bold" className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => insertFormatting("- ")}
                              title="Daftar Poin"
                              className="p-1.5 hover:text-[var(--ink)] hover:bg-[var(--surface)] rounded transition-colors"
                            >
                              <ListBullets weight="bold" className="w-4 h-4" />
                            </button>
                            <span className="ml-auto font-mono-data text-[10px] text-[var(--muted)]">
                              Markdown didukung
                            </span>
                          </div>

                          <textarea
                            rows={12}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Tuliskan ulasan, pemikiran, atau pertanyaanmu di sini. Harap gunakan bahasa yang santun dan hormati privasi member."
                            className="w-full p-5 bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none resize-y leading-relaxed font-sans"
                          />
                        </div>
                      ) : (
                        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface)] space-y-4 min-h-[300px]">
                          <div className="flex items-center gap-2 font-mono-data text-xs text-crimson-400">
                            <span>{currentCategory?.code}</span>
                            <span>·</span>
                            <span>{currentCategory?.title}</span>
                          </div>
                          <h2 className="font-display font-bold text-2xl uppercase tracking-tight text-[var(--ink)]">
                            {title || "Judul thread kamu akan tampil di sini"}
                          </h2>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedTags.map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-0.5 rounded-full bg-[var(--surface-raised)] text-xs font-mono-data text-[var(--muted)]"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                          <div className="pt-4 border-t border-[var(--line)] whitespace-pre-wrap text-sm text-[var(--ink)] leading-relaxed">
                            {content ||
                              "Isi tulisan kamu akan tampil di sini..."}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--line)]">
                      <Link
                        href="/forum"
                        className="inline-flex items-center gap-2 text-xs font-mono-data text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                      >
                        <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
                        <span>Batal dan kembali</span>
                      </Link>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            alert("Draf disimpan di perangkat lokal.")
                          }
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
                        >
                          <BookmarkSimple weight="bold" className="w-4 h-4" />
                          <span>Simpan Draf</span>
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-crimson-500 hover:bg-crimson-600 disabled:opacity-50 text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md shadow-crimson-900/30 cursor-pointer"
                        >
                          <PaperPlaneTilt weight="fill" className="w-4 h-4" />
                          <span>
                            {isSubmitting
                              ? "Menerbitkan..."
                              : "Terbitkan Thread"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Sidebar: Guidelines & Etika (4 Cols) */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-2xl bg-[var(--surface)] space-y-4">
                  <div className="flex items-center gap-2 text-crimson-400 font-mono-data text-xs font-semibold uppercase tracking-wider">
                    <ShieldCheck weight="fill" className="w-4 h-4" />
                    <span>ETIKA DISKUSI FJKT48</span>
                  </div>

                  <h3 className="font-display font-bold text-lg uppercase tracking-tight text-[var(--ink)]">
                    Pedoman Komunitas
                  </h3>

                  <ul className="space-y-3 text-xs text-[var(--muted)] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-crimson-400 font-mono-data font-bold">
                        01.
                      </span>
                      <span>
                        <strong className="text-[var(--ink)]">
                          Saling Menghargai:
                        </strong>{" "}
                        Jaga suasana diskusi tetap santun dan hangat antar
                        sesama pendukung JKT48.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crimson-400 font-mono-data font-bold">
                        02.
                      </span>
                      <span>
                        <strong className="text-[var(--ink)]">
                          Privasi Member:
                        </strong>{" "}
                        Dilarang membahas informasi pribadi, gosip tidak
                        berdasar, atau melanggar aturan Golden Rules.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crimson-400 font-mono-data font-bold">
                        03.
                      </span>
                      <span>
                        <strong className="text-[var(--ink)]">
                          Bebas Hate Speech:
                        </strong>{" "}
                        Kritik konstruktif diperbolehkan, namun ujaran kebencian
                        dan pelecehan akan langsung di-ban.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-crimson-400 font-mono-data font-bold">
                        04.
                      </span>
                      <span>
                        <strong className="text-[var(--ink)]">
                          Pilih Blok yang Tepat:
                        </strong>{" "}
                        Pastikan kategori sesuai agar thread mudah ditemukan dan
                        ditanggapi fans lain.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[var(--surface-raised)]/60 space-y-2">
                  <p className="font-bold text-xs text-[var(--ink)] uppercase font-mono-data">
                    Tips Thread Ramai
                  </p>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Sertakan pertanyaan terbuka di akhir tulisan dan pilih tag
                    member atau setlist terkait agar pembaca terdorong
                    memberikan opini.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
