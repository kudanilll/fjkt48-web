"use client";

import Link from "next/link";
import { Sparkle } from "@phosphor-icons/react";

const footerLinks = [
  { href: "/", label: "Beranda" },
  { href: "/member", label: "Member" },
  { href: "/schedule", label: "Jadwal" },
  { href: "/news", label: "Berita" },
];

const externalLinks = [
  { href: "https://jkt48.com", label: "JKT48 Official" },
  { href: "https://github.com/kudanilll/fjkt48-web", label: "GitHub" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-md bg-crimson-600 text-white">
                <Sparkle weight="fill" className="w-3.5 h-3.5" />
              </span>
              <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-50">
                FJKT48
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
              Portal komunitas penggemar JKT48. Informasi jadwal teater, berita
              terkini, dan katalog member lengkap dalam satu tempat.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
              Navigasi
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
              Tautan Luar
            </h3>
            <ul className="space-y-2.5">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            &copy; {currentYear} FJKT48. Fan-made project, tidak berafiliasi
            resmi dengan JKT48.
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            Data bersumber dari{" "}
            <a
              href="https://jkt48.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors"
            >
              jkt48.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
