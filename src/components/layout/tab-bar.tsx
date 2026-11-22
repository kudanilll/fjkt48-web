"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ChatsCircle,
  Broadcast,
  CalendarBlank,
  User,
} from "@phosphor-icons/react";

export default function TabBar() {
  const pathname = usePathname();

  // Hide tab bar on login/register pages
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const tabs = [
    { href: "/", label: "Beranda", icon: House },
    { href: "/forum", label: "Forum", icon: ChatsCircle },
    {
      href: "/live",
      label: "Live",
      icon: Broadcast,
      hasBadge: true,
    },
    { href: "/schedule", label: "Jadwal", icon: CalendarBlank },
    { href: "/dashboard", label: "Akun", icon: User },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)]/90 backdrop-blur-xl border-t border-[var(--border)] px-2 pb-[env(safe-area-inset-bottom,0px)]"
      aria-label="Navigasi bawah"
    >
      <ul className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const IconComponent = tab.icon;

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex flex-col items-center justify-center w-full h-full py-1 text-[11px] font-medium transition-colors relative ${
                  active
                    ? "text-crimson-500 font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                <div className="relative">
                  <IconComponent
                    weight={active ? "fill" : "regular"}
                    className="w-5 h-5 mb-0.5"
                  />
                  {tab.hasBadge && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-500" />
                    </span>
                  )}
                </div>
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
