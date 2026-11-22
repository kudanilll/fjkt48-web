import React from "react";

export function LiveBadge({ count }: { count?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-crimson-500 text-white text-xs font-bold tracking-wider uppercase shadow-sm shadow-crimson-500/30">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
      </span>
      <span>LIVE</span>
      {count !== undefined && (
        <span className="opacity-90 font-mono">({count})</span>
      )}
    </span>
  );
}

export function PlatformBadge({
  platform,
}: {
  platform: "SHOWROOM" | "IDN" | "IDN Live" | "Showroom";
}) {
  const isShowroom = platform.toUpperCase().includes("SHOWROOM");
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
        isShowroom
          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          : "bg-red-500/15 text-red-400 border border-red-500/30"
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{isShowroom ? "Showroom" : "IDN Live"}</span>
    </span>
  );
}

export function TeamBadge({ team }: { team: string }) {
  const t = team.toUpperCase();
  let color = "bg-neutral-500/20 text-neutral-300 border-neutral-500/30";
  let label = team;

  if (t === "LOVE") {
    color = "bg-pink-500/15 text-pink-400 border-pink-500/30";
    label = "Team Love";
  } else if (t === "DREAM") {
    color = "bg-sky-500/15 text-sky-400 border-sky-500/30";
    label = "Team Dream";
  } else if (t === "PASSION") {
    color = "bg-amber-500/15 text-amber-400 border-amber-500/30";
    label = "Team Passion";
  } else if (t === "TRAINEE") {
    color = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    label = "Trainee";
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${color}`}
    >
      {label}
    </span>
  );
}

export function OshiBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7A0B1A] text-pink-200 text-xs font-semibold border border-pink-500/30">
      <span>❤</span>
      <span>Oshi: {name}</span>
    </span>
  );
}
