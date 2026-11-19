export type MemberStatus = "active" | "trainee" | "graduated";

export interface Member {
  id: string;
  slug: string;
  name: string;
  nickname: string;
  generation: number;
  status: MemberStatus;
  image_url: string | null;
  jikoshokai: string | null;
  birthdate: string | null;
  blood_type: string | null;
  horoscope: string | null;
  height: number | null;
  social_links: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    idn?: string;
    showroom?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  slug: string;
  title: string;
  content_markdown: string;
  category: string;
  thumbnail_url: string | null;
  published_at: string;
  created_at: string;
}

export interface Schedule {
  id: string;
  title: string;
  event_date: string;
  event_time: string | null;
  event_type: string;
  setlist: string | null;
  location: string;
  ticket_url: string | null;
  members_lineup: string[];
  created_at: string;
}

export interface Banner {
  id: string;
  title: string | null;
  image_url: string;
  target_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  target_type: "news" | "member" | "schedule";
  target_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified: boolean;
  image: string | null;
  role: "user" | "admin";
  oshi_id: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}
