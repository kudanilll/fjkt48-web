/**
 * Type definitions matching the structure of jkt48-official.json
 * These represent data sourced from the JKT48 Official API.
 */

export type TeamType = "LOVE" | "DREAM" | "PASSION" | "TRAINEE";

export type ScheduleType = "SHOW" | "EVENT" | "EXCLUSIVE" | "GENERAL";

export type NewsCategory = "Theater" | "Event" | "Birthday" | "Other";

export interface JKT48Member {
  type: TeamType;
  code: string;
  name: string;
  nickname: string;
  photo: string;
  jkt48_member_id: number;
}

export interface JKT48News {
  total_row_count: string;
  title: string;
  category: NewsCategory;
  link: string;
  background_image: string | null;
  is_published: boolean;
  sort_order: number | null;
  valid_date_from: string;
  valid_date_to: string | null;
  status: boolean;
  news_id: number;
}

export interface JKT48Schedule {
  link: string;
  schedule_id: number;
  date: string;
  start_time: string | null;
  end_time: string | null;
  external_url: string | null;
  type: ScheduleType;
  status: boolean;
  content_body: string;
  short_description: string;
  title: string;
  jkt48_member_type: string | null;
  birthday_member: string | null;
  reference_code: string;
}

export interface JKT48OfficialData {
  members: JKT48Member[];
  news: JKT48News[];
  schedules: JKT48Schedule[];
}

/** Team metadata for UI rendering */
export interface TeamConfig {
  id: TeamType;
  label: string;
  badgeClassName: string;
  accentColor: string;
}
