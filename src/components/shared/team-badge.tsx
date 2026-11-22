import type { TeamType } from "@/types/jkt48-types";

const teamStyles: Record<TeamType, string> = {
  LOVE: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800",
  DREAM:
    "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800",
  PASSION:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
  TRAINEE:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
};

const teamLabels: Record<TeamType, string> = {
  LOVE: "Love",
  DREAM: "Dream",
  PASSION: "Passion",
  TRAINEE: "Trainee",
};

interface TeamBadgeProps {
  team: TeamType;
  size?: "sm" | "md";
  className?: string;
}

export default function TeamBadge({
  team,
  size = "sm",
  className = "",
}: TeamBadgeProps) {
  const style = teamStyles[team];
  const label = teamLabels[team];

  if (!style || !label) return null;

  const sizeClasses =
    size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-bold uppercase tracking-wider ${sizeClasses} ${style} ${className}`}
    >
      {label}
    </span>
  );
}
