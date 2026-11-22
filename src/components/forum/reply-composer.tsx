"use client";

import React, { useState } from "react";
import {
  PaperPlaneTilt,
  TextB,
  TextItalic,
  Link as LinkIcon,
  Quotes,
} from "@phosphor-icons/react";
import Button from "@/components/ui/button";

interface ReplyComposerProps {
  onSubmitReply?: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function ReplyComposer({
  onSubmitReply,
  placeholder = "Tulis tanggapan atau opinimu tentang topik ini...",
}: ReplyComposerProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    onSubmitReply?.(content);
    setContent("");
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-sm"
    >
      <div className="flex items-center justify-between text-xs text-[var(--muted)] font-mono-data border-b border-[var(--line)] pb-2.5">
        <span className="font-semibold uppercase text-[var(--ink)]">
          KIRIM BALASAN
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1 rounded hover:bg-[var(--raised)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            title="Tebal"
          >
            <TextB weight="bold" className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 rounded hover:bg-[var(--raised)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            title="Miring"
          >
            <TextItalic weight="bold" className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 rounded hover:bg-[var(--raised)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            title="Kutipan"
          >
            <Quotes weight="bold" className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 rounded hover:bg-[var(--raised)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            title="Tautan"
          >
            <LinkIcon weight="bold" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <textarea
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm sm:text-base text-[var(--ink)] placeholder:text-[var(--subtle)] focus:outline-none resize-y leading-relaxed"
      />

      <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
        <span className="font-mono-data text-xs text-[var(--subtle)]">
          Gunakan bahasa yang santun dan dukung member secara positif.
        </span>

        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!content.trim() || isSubmitting}
          className={!content.trim() ? "opacity-50 cursor-not-allowed" : ""}
        >
          <span>Kirim balasan</span>
          <PaperPlaneTilt weight="fill" className="w-3.5 h-3.5" />
        </Button>
      </div>
    </form>
  );
}
