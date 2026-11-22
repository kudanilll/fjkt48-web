export interface ForumCategory {
  slug: string;
  code: string;
  name: string;
  threadsCount: string;
  fansCount: number;
  description: string;
}

export interface ForumTag {
  type: "member" | "show" | "general";
  label: string;
  slug: string;
}

export interface ForumReply {
  id: string;
  author: {
    name: string;
    avatar: string;
    oshi: string;
  };
  createdAt: string;
  content: string;
  reactions: number;
  replies?: Array<{
    id: string;
    author: {
      name: string;
      avatar: string;
      oshi: string;
    };
    createdAt: string;
    content: string;
    reactions: number;
  }>;
}

export interface ForumThread {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  author: {
    name: string;
    avatar: string;
    oshi: string;
  };
  createdAt: string;
  content: string;
  tags: ForumTag[];
  reactions: number;
  repliesCount: number;
  views: string;
  isPinned?: boolean;
  replies: ForumReply[];
}

export const forumCategories: ForumCategory[] = [
  {
    slug: "theater-setlist",
    code: "BLOK A",
    name: "Theater & Setlist",
    threadsCount: "1.840",
    fansCount: 142,
    description:
      "Diskusi show harian, setlist teater, blocking koreografi, dan review unit song panggung.",
  },
  {
    slug: "member-oshi",
    code: "BLOK B",
    name: "Member & Oshi",
    threadsCount: "2.310",
    fansCount: 280,
    description:
      "Ruang apresiasi oshi, update media sosial, biodata, dan obrolan hangat per member.",
  },
  {
    slug: "live-streaming",
    code: "BLOK C",
    name: "Live Streaming",
    threadsCount: "890",
    fansCount: 98,
    description:
      "Reaksi real-time dan diskusi seputar siaran Showroom serta IDN Live para member.",
  },
  {
    slug: "event-mng-vc",
    code: "BLOK D",
    name: "Event, MnG & VC",
    threadsCount: "670",
    fansCount: 64,
    description:
      "Info tiket, jadwal antrean Meet and Greet, Video Call, 2-Shot, dan tur luar kota.",
  },
  {
    slug: "merch-collection",
    code: "BLOK E",
    name: "Merch & Koleksi",
    threadsCount: "510",
    fansCount: 45,
    description:
      "Photopack resmi, lightstick konser, kaos, pin edisi terbatas, dan barter merchandise.",
  },
  {
    slug: "general-chat",
    code: "BLOK F",
    name: "Obrolan Bebas",
    threadsCount: "1.268",
    fansCount: 110,
    description:
      "Kenalan sesama fans, karya fanart kreatif, meme santai, dan serba-serbi wota.",
  },
];

export const forumThreads: ForumThread[] = [
  {
    id: "1",
    slug: "cara-meminum-ramune-shonichi-review-unit-songs",
    title:
      "Review Shonichi Cara Meminum Ramune: blocking dan unit song baru yang bikin nagih!",
    categorySlug: "theater-setlist",
    categoryName: "Blok A · Theater",
    author: {
      name: "WotaKuningan",
      avatar: "/members/freya.jpg",
      oshi: "Freya",
    },
    createdAt: "5m yang lalu",
    content:
      "Akhirnya berkesempatan nonton shonichi setlist Cara Meminum Ramune di teater. Dari overture sampai encore energinya gila banget! Blocking unit song Cross dan Nice to Meet You bener-bener dieksekusi dengan presisi tinggi oleh member. Ekspresi Freya dan Christy di lagu pembuka dapet banget feel teatrikalnya.\n\nYang paling bikin kaget adalah aransemen live dan tata cahaya lampu panggung baru di teater. Suasana dark stage dengan spotlight fokus bikin penonton serasa diajak masuk ke dunia lagunya. Buat temen-temen yang belum nonton, wajib banget war tiket show berikutnya!",
    tags: [
      {
        type: "show",
        label: "Cara Meminum Ramune",
        slug: "cara-meminum-ramune",
      },
      { type: "member", label: "Freya", slug: "freya" },
      { type: "member", label: "Christy", slug: "christy" },
    ],
    reactions: 142,
    repliesCount: 64,
    views: "3.4k",
    isPinned: true,
    replies: [
      {
        id: "r1",
        author: {
          name: "PenlightMerah",
          avatar: "/members/marsha.jpg",
          oshi: "Marsha",
        },
        createdAt: "3m yang lalu",
        content:
          "Setuju banget! Terutama pas unit song Nice to Meet You, harmonisasi vokal mereka kelihatan naik kelas dibanding latihan evaluasi sebelumnya. Semoga setlist ini rutin dapet jadwal tiap minggu.",
        reactions: 18,
        replies: [
          {
            id: "r1-1",
            author: {
              name: "WotaKuningan",
              avatar: "/members/freya.jpg",
              oshi: "Freya",
            },
            createdAt: "1m yang lalu",
            content:
              "Bener, kabarnya minggu depan bakal ada jadwal 2 show berturut-turut di akhir pekan!",
            reactions: 7,
          },
        ],
      },
      {
        id: "r2",
        author: {
          name: "KaptenTeater",
          avatar: "/members/gita.jpg",
          oshi: "Gita",
        },
        createdAt: "12m yang lalu",
        content:
          "Yang di tribun belakang kelihatan jelas gak ya blockingnya? Soalnya kemarin pas shonichi aku dapet row hijau, suaranya jernih banget tapi sudut pandang agak ketutup tiang samping.",
        reactions: 9,
      },
      {
        id: "r3",
        author: {
          name: "TeaterHunter",
          avatar: "/members/oline.jpg",
          oshi: "Oline",
        },
        createdAt: "25m yang lalu",
        content:
          "Koreografi lagu encore-nya juga dancenya playful banget. Member kelihatan enjoy dan interaksi sama fans di row depan intens banget.",
        reactions: 14,
      },
    ],
  },
  {
    id: "2",
    slug: "freya-graduation-rumor-timeline-analysis",
    title: "Freya graduation rumor: bahasan fakta vs cocoklogi timeline sosmed",
    categorySlug: "member-oshi",
    categoryName: "Blok B · Member",
    author: {
      name: "PenlightMerah",
      avatar: "/members/freya.jpg",
      oshi: "Freya",
    },
    createdAt: "18m yang lalu",
    content:
      "Banyak bahasan di linimasa X soal rumor graduation beberapa member generasi 7. Setelah dicek dari jadwal show, komitmen project luar, dan aktivitas IDN Live, semuanya masih berjalan sangat aktif dan normal.\n\nJangan mudah termakan narasi akun anonim sebelum ada pengumuman resmi dari website jkt48.com. Yuk tetap fokus kasih support dan ramaikan panggung teater!",
    tags: [
      { type: "member", label: "Freya", slug: "freya" },
      { type: "general", label: "Opini Fans", slug: "opini-fans" },
    ],
    reactions: 128,
    repliesCount: 96,
    views: "5.2k",
    replies: [
      {
        id: "r2-1",
        author: {
          name: "SukaNontonShowroom",
          avatar: "/members/gita.jpg",
          oshi: "Gita",
        },
        createdAt: "10m yang lalu",
        content:
          "Kemarin di live IDN Freya juga sempat bilang lagi fokus latihan setlist baru. Jadi rumor itu jelas cuma cocoklogi.",
        reactions: 32,
      },
    ],
  },
  {
    id: "3",
    slug: "gita-idn-live-theater-audition-stories",
    title:
      "Gita IDN Live semalem seru banget pas cerita pengalaman audisi teater jaman dulu",
    categorySlug: "live-streaming",
    categoryName: "Blok C · Live Streaming",
    author: {
      name: "SukaNontonShowroom",
      avatar: "/members/gita.jpg",
      oshi: "Gita",
    },
    createdAt: "42m yang lalu",
    content:
      "Ada yang sempet nonton siaran Gita semalem? Seru banget waktu dia throwback cerita awal-awal audisi dan masa-masa trainee. Pembawaannya santai dan banyak insight menarik soal perjuangan di balik layar yang jarang diceritakan.",
    tags: [
      { type: "member", label: "Gita", slug: "gita" },
      { type: "general", label: "IDN Live", slug: "idn-live" },
    ],
    reactions: 35,
    repliesCount: 28,
    views: "1.1k",
    replies: [],
  },
  {
    id: "4",
    slug: "team-passion-new-original-setlist-leak",
    title:
      "Prediksi tanggal rilis setlist orisinal baru Team Passion: apa bocoran terbarunya?",
    categorySlug: "theater-setlist",
    categoryName: "Blok A · Theater",
    author: {
      name: "KaptenTeater",
      avatar: "/members/christy.jpg",
      oshi: "Christy",
    },
    createdAt: "1j yang lalu",
    content:
      "Melihat teaser di konser ulang tahun kemarin, tanda-tanda setlist orisinal semakin kuat. Menurut perkiraan temen-temen, kapan pengumuman resminya bakal rilis?",
    tags: [
      { type: "show", label: "Team Passion", slug: "team-passion" },
      { type: "general", label: "Setlist Baru", slug: "setlist-baru" },
    ],
    reactions: 56,
    repliesCount: 44,
    views: "2.1k",
    replies: [],
  },
  {
    id: "5",
    slug: "first-time-offline-2-shot-guide-and-tips",
    title:
      "Tips dan panduan ikut 2-Shot offline pertama kali: persiapan antrean dan pose",
    categorySlug: "event-mng-vc",
    categoryName: "Blok D · Event & MnG",
    author: {
      name: "TeaterHunter",
      avatar: "/members/marsha.jpg",
      oshi: "Marsha",
    },
    createdAt: "2j yang lalu",
    content:
      "Buat yang baru pertama kali punya tiket 2-Shot, ada beberapa hal penting yang perlu diperhatikan: pastikan cek sesi jadwal di tiket, siapkan pose yang sopan dan sesuai regulasi official, dan jaga waktu interaksi agar tertib.",
    tags: [
      { type: "general", label: "2-Shot", slug: "2-shot" },
      { type: "general", label: "Panduan", slug: "panduan" },
    ],
    reactions: 89,
    repliesCount: 52,
    views: "2.9k",
    replies: [],
  },
  {
    id: "6",
    slug: "merch-barter-photopack-special-anniversary",
    title:
      "Thread barter photopack edisi special anniversary 13th: cari pose A Freya",
    categorySlug: "merch-collection",
    categoryName: "Blok E · Merch",
    author: {
      name: "KolektorPp",
      avatar: "/members/delynn.jpg",
      oshi: "Delynn",
    },
    createdAt: "3j yang lalu",
    content:
      "Halo teman-teman, aku punya spare Photopack Christy dan Gita edisi anniversary kemarin. Mau barter sama pose A Freya atau Marsha. Kondisi mint in sleeve, bisa COD sekitar fX Sudirman saat show teater.",
    tags: [
      { type: "general", label: "Photopack", slug: "photopack" },
      { type: "member", label: "Freya", slug: "freya" },
    ],
    reactions: 22,
    repliesCount: 16,
    views: "740",
    replies: [],
  },
];

export const topActiveFans = [
  {
    name: "WotaKuningan",
    avatar: "/members/freya.jpg",
    oshi: "Freya",
    postsCount: 148,
    lightsticksCount: 890,
  },
  {
    name: "PenlightMerah",
    avatar: "/members/marsha.jpg",
    oshi: "Marsha",
    postsCount: 124,
    lightsticksCount: 760,
  },
  {
    name: "SukaNontonShowroom",
    avatar: "/members/gita.jpg",
    oshi: "Gita",
    postsCount: 98,
    lightsticksCount: 540,
  },
];

export const trendingTags = [
  "#CaraMeminumRamune",
  "#Freya",
  "#Sousenkyo",
  "#IDNLive",
  "#TeamPassion",
  "#AturanAntiCinta",
  "#2Shot",
  "#TeaterHariIni",
];
