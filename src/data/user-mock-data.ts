export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  oshiCode: string;
  oshiName: string;
  oshiNickname: string;
  stats: {
    threadsCount: number;
    repliesCount: number;
    reactionsCount: number;
  };
}

export interface UserNotification {
  id: string;
  type: "reply" | "reaction" | "mention";
  actorName: string;
  actorAvatar: string;
  threadTitle: string;
  threadSlug: string;
  content: string;
  timeAgo: string;
  isUnread: boolean;
}

export interface SavedThread {
  id: string;
  title: string;
  slug: string;
  categoryName: string;
  authorName: string;
  savedDate: string;
  repliesCount: number;
}

export const mockCurrentUser: UserProfile = {
  id: "user-penlightmerah",
  name: "Penlight Merah",
  username: "penlightmerah",
  email: "penlightmerah@example.com",
  avatar:
    "https://jkt48.com/api/v1/storages/media/jkt48-member/freya_jayawardana.jpg",
  bio: "Dukung JKT48 sejak era Kaze wa Fuiteiru. Oshi setia Fera (Afera Thalia) dan penikmat setlist Cara Meminum Ramune.",
  joinedDate: "Bergabung September 2024",
  oshiCode: "AFERA_THALIA",
  oshiName: "Afera Thalia",
  oshiNickname: "Fera",
  stats: {
    threadsCount: 3,
    repliesCount: 14,
    reactionsCount: 48,
  },
};

export const mockNotifications: UserNotification[] = [
  {
    id: "notif-1",
    type: "reply",
    actorName: "WotaKuningan",
    actorAvatar:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/shania_gracia.jpg",
    threadTitle:
      "Cara Meminum Ramune Shonichi: Review Komplit Unit Song & Blocking Baru",
    threadSlug: "cara-meminum-ramune-shonichi-review-unit-songs",
    content:
      "Setuju banget sama poin tentang cross-step di chorus kedua! Kemarin pas nonton langsung energinya kerasa beda.",
    timeAgo: "15 menit lalu",
    isUnread: true,
  },
  {
    id: "notif-2",
    type: "reaction",
    actorName: "FreyaFansClub",
    actorAvatar:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/freya_jayawardana.jpg",
    threadTitle:
      "Cara Meminum Ramune Shonichi: Review Komplit Unit Song & Blocking Baru",
    threadSlug: "cara-meminum-ramune-shonichi-review-unit-songs",
    content: "menyalakan lightstick pada thread kamu.",
    timeAgo: "1 jam lalu",
    isUnread: true,
  },
  {
    id: "notif-3",
    type: "reply",
    actorName: "SudirmanVibes",
    actorAvatar:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/angelina_christy.jpg",
    threadTitle:
      "Rekomendasi spot fX Sudirman buat ngopi santai sebelum bingo theater",
    threadSlug: "spot-fx-sudirman-ngopi-santai-sebelum-bingo",
    content:
      "Lantai 3 dekat eskalator juga tenang banget kalau mau ngecas lightstick bro.",
    timeAgo: "3 jam lalu",
    isUnread: true,
  },
  {
    id: "notif-4",
    type: "mention",
    actorName: "TeaterHunter",
    actorAvatar:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/marsha_lenathea.jpg",
    threadTitle:
      "Prediksi Senbatsu Single ke-26: Siapa New Era yang Layak Masuk?",
    threadSlug: "prediksi-senbatsu-single-26-new-era",
    content: "disebut oleh TeaterHunter dalam obrolan prediksi senbatsu.",
    timeAgo: "Kemarin, 21:14 WIB",
    isUnread: false,
  },
];

export const mockSavedThreads: SavedThread[] = [
  {
    id: "saved-1",
    title:
      "Cara Meminum Ramune Shonichi: Review Komplit Unit Song & Blocking Baru",
    slug: "cara-meminum-ramune-shonichi-review-unit-songs",
    categoryName: "Theater & Setlist",
    authorName: "penlightmerah",
    savedDate: "Disimpan 20 Nov 2026",
    repliesCount: 64,
  },
  {
    id: "saved-2",
    title:
      "Gita di IDN Live Cerita Pengalaman Audisi Generasi Awal: Banyak Air Mata",
    slug: "gita-idn-live-theater-audition-stories",
    categoryName: "Live Streaming",
    authorName: "OFC_Jaksel",
    savedDate: "Disimpan 18 Nov 2026",
    repliesCount: 42,
  },
  {
    id: "saved-3",
    title:
      "Guide Lengkap Sesi 2-Shot & MnG Luar Kota: Etika, Barang Bawaan, dan Rundown",
    slug: "guide-lengkap-sesi-2-shot-mng-luar-kota",
    categoryName: "Event, MnG & VC",
    authorName: "WotaKuningan",
    savedDate: "Disimpan 15 Nov 2026",
    repliesCount: 38,
  },
];
