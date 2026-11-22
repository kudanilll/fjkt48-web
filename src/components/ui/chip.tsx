"use client";

import React from "react";
import Link from "next/link";

interface ChipProps {
  label: string;
  active?: boolean;
  count?: number | string;
  hasRedDot?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Chip({
  label,
  active = false,
  count,
  hasRedDot = false,
  href,
  onClick,
  className = "",
}: ChipProps) {
  const baseClasses = `inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer select-none ${
    active
      ? "bg-crimson-500/15 border-crimson-500/40 text-crimson-400 font-semibold"
      : "bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--muted)]/40"
  } ${className}`;

  const content = (
    <>
      {hasRedDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 shrink-0" />
      )}
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={`font-mono-data text-[11px] ${
            active ? "text-crimson-400" : "text-[var(--subtle)]"
          }`}
        >
          {count}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
