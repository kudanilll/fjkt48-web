import officialData from "@/data/jkt48-official.json";
import type {
  JKT48Member,
  JKT48News,
  JKT48Schedule,
  TeamType,
  ScheduleType,
} from "@/types/jkt48-types";

// =============================================================================
// Members
// =============================================================================

export function getAllMembers(): JKT48Member[] {
  return (officialData.members ?? []) as JKT48Member[];
}

export function getMembersByTeam(team: TeamType): JKT48Member[] {
  return getAllMembers().filter(
    (m) => m.type.toUpperCase() === team.toUpperCase()
  );
}

export function searchMembers(query: string): JKT48Member[] {
  const q = query.toLowerCase();
  return getAllMembers().filter(
    (m) =>
      m.name.toLowerCase().includes(q) || m.nickname.toLowerCase().includes(q)
  );
}

export function getMemberByCode(code: string): JKT48Member | undefined {
  return getAllMembers().find((m) => m.code === code);
}

export function getMemberCountByTeam(): Record<TeamType, number> {
  const members = getAllMembers();
  return {
    LOVE: members.filter((m) => m.type === "LOVE").length,
    DREAM: members.filter((m) => m.type === "DREAM").length,
    PASSION: members.filter((m) => m.type === "PASSION").length,
    TRAINEE: members.filter((m) => m.type === "TRAINEE").length,
  };
}

/** Get a few random members from each team for spotlight display */
export function getSpotlightMembers(perTeam: number = 3): JKT48Member[] {
  const teams: TeamType[] = ["LOVE", "DREAM", "PASSION", "TRAINEE"];
  const result: JKT48Member[] = [];

  for (const team of teams) {
    const teamMembers = getMembersByTeam(team);
    const shuffled = [...teamMembers].sort(() => 0.5 - Math.random());
    result.push(...shuffled.slice(0, perTeam));
  }

  return result;
}

// =============================================================================
// News
// =============================================================================

export function getAllNews(): JKT48News[] {
  return (officialData.news ?? []) as JKT48News[];
}

export function getLatestNews(limit: number = 6): JKT48News[] {
  return getAllNews()
    .sort(
      (a, b) =>
        new Date(b.valid_date_from).getTime() -
        new Date(a.valid_date_from).getTime()
    )
    .slice(0, limit);
}

export function getNewsByCategory(category: string): JKT48News[] {
  return getAllNews().filter(
    (n) => n.category.toLowerCase() === category.toLowerCase()
  );
}

// =============================================================================
// Schedules
// =============================================================================

export function getAllSchedules(): JKT48Schedule[] {
  return (officialData.schedules ?? []) as JKT48Schedule[];
}

export function getUpcomingSchedules(limit: number = 6): JKT48Schedule[] {
  const today = new Date().toISOString().split("T")[0]!;
  return getAllSchedules()
    .filter((s) => s.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

export function getSchedulesByType(type: ScheduleType): JKT48Schedule[] {
  return getAllSchedules().filter(
    (s) => s.type.toUpperCase() === type.toUpperCase()
  );
}

export function groupSchedulesByDate(
  schedules: JKT48Schedule[]
): Record<string, JKT48Schedule[]> {
  return schedules.reduce(
    (groups, schedule) => {
      const date = schedule.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date]!.push(schedule);
      return groups;
    },
    {} as Record<string, JKT48Schedule[]>
  );
}

// =============================================================================
// Utilities
// =============================================================================

/** Format ISO date string to Indonesian locale display */
export function formatDateID(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Format ISO date to short display (e.g., "20 Nov") */
export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

/** Format time string (HH:mm:ss) to display (HH:mm WIB) */
export function formatTime(timeStr: string | null): string {
  if (!timeStr) return "TBA";
  return timeStr.slice(0, 5) + " WIB";
}

/** Get a human-readable label for schedule type */
export function getScheduleTypeLabel(type: ScheduleType): string {
  const labels: Record<ScheduleType, string> = {
    SHOW: "Theater Show",
    EVENT: "Event",
    EXCLUSIVE: "Exclusive",
    GENERAL: "Umum",
  };
  return labels[type] ?? type;
}
