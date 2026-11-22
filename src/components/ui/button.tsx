"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  href?: string;
  showArrow?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  showArrow = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer group";

  const sizeClasses = {
    sm: "h-9 px-4 text-xs rounded-full gap-1.5",
    md: "h-11 px-6 text-sm rounded-full gap-2",
    lg: "h-13 px-8 text-base rounded-full gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-crimson-500 hover:bg-crimson-600 text-white font-semibold shadow-md shadow-crimson-500/20",
    secondary:
      "bg-transparent hover:bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)]",
    ghost:
      "bg-transparent hover:bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--ink)]",
    icon: "w-11 h-11 p-0 rounded-full bg-transparent hover:bg-[var(--surface)] text-[var(--ink)] border border-[var(--border)]/60",
  }[variant];

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          weight="bold"
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variant === "icon" ? "w-11 h-11 rounded-full p-0" : sizeClasses} ${variantClasses} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseClasses} ${variant === "icon" ? "w-11 h-11 rounded-full p-0" : sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
