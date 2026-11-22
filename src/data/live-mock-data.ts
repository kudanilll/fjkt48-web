export interface LiveStream {
  id: string;
  memberCode: string;
  memberName: string;
  memberNickname: string;
  memberPhoto: string;
  platform: "showroom" | "idn";
  platformTitle: string;
  title: string;
  viewers: number;
  startedAt: string;
  streamUrl: string;
  coverImage?: string;
  isLive: boolean;
}

export interface LiveReplay {
  id: string;
  memberCode: string;
  memberName: string;
  memberNickname: string;
  platform: "showroom" | "idn";
  title: string;
  duration: string;
  recordedDate: string;
  views: number;
  thumbnail: string;
  replayUrl: string;
}

export const activeLiveStreams: LiveStream[] = [
  {
    id: "live-freya-1",
    memberCode: "FREYA_JAYAWARDANA",
    memberName: "Freya Jayawardana",
    memberNickname: "Freya",
    memberPhoto:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/freya_jayawardana.jpg",
    platform: "showroom",
    platformTitle: "Showroom",
    title:
      "Ngobrol santai malam mingguan bareng Freya! Cerita latihan setlist baru",
    viewers: 14280,
    startedAt: "19:45 WIB (1j 15m lalu)",
    streamUrl: "https://www.showroom-live.com/r/JKT48_Freya",
    isLive: true,
  },
  {
    id: "live-christy-1",
    memberCode: "ANGELINA_CHRISTY",
    memberName: "Angelina Christy",
    memberNickname: "Christy",
    memberPhoto:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/angelina_christy.jpg",
    platform: "idn",
    platformTitle: "IDN Live",
    title: "Makan malam bareng Christy dan Q&A sebelum show Ramune!",
    viewers: 9840,
    startedAt: "20:10 WIB (50m lalu)",
    streamUrl: "https://www.idntimes.com",
    isLive: true,
  },
];

export const liveReplaysList: LiveReplay[] = [
  {
    id: "replay-1",
    memberCode: "FREYA_JAYAWARDANA",
    memberName: "Freya Jayawardana",
    memberNickname: "Freya",
    platform: "showroom",
    title: "Persiapan Shonichi Cara Meminum Ramune & cerita balik panggung",
    duration: "1j 24m",
    recordedDate: "20 Nov 2026",
    views: 48200,
    thumbnail:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/freya_jayawardana.jpg",
    replayUrl: "https://www.showroom-live.com/r/JKT48_Freya",
  },
  {
    id: "replay-2",
    memberCode: "SHANIA_GRACIA",
    memberName: "Shania Gracia",
    memberNickname: "Gracia",
    platform: "idn",
    title: "Kapten room: Evaluasi pertunjukan teater minggu ketiga November",
    duration: "58m",
    recordedDate: "19 Nov 2026",
    views: 62400,
    thumbnail:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/shania_gracia.jpg",
    replayUrl: "https://www.idntimes.com",
  },
  {
    id: "replay-3",
    memberCode: "ANGELINA_CHRISTY",
    memberName: "Angelina Christy",
    memberNickname: "Christy",
    platform: "showroom",
    title: "Midnight talk dan mukbang cemilan favorit bareng Christy",
    duration: "1j 45m",
    recordedDate: "18 Nov 2026",
    views: 39100,
    thumbnail:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/angelina_christy.jpg",
    replayUrl: "https://www.showroom-live.com/r/JKT48_Christy",
  },
  {
    id: "replay-4",
    memberCode: "MARSHA_LENATHEA",
    memberName: "Marsha Lenathea",
    memberNickname: "Marsha",
    platform: "idn",
    title: "Latihan gambar dan ngobrol santai seputar anime favorit",
    duration: "1j 12m",
    recordedDate: "17 Nov 2026",
    views: 31500,
    thumbnail:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/marsha_lenathea.jpg",
    replayUrl: "https://www.idntimes.com",
  },
  {
    id: "replay-5",
    memberCode: "FIONI_ALVERIA",
    memberName: "Fioni Alveria",
    memberNickname: "Fioni",
    platform: "showroom",
    title: "Belajar chord lagu baru & cerita seru member Team Love",
    duration: "1j 30m",
    recordedDate: "16 Nov 2026",
    views: 28900,
    thumbnail:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/fioni_alveria.jpg",
    replayUrl: "https://www.showroom-live.com/r/JKT48_Fioni",
  },
  {
    id: "replay-6",
    memberCode: "JESSICA_CHANDRA",
    memberName: "Jessica Chandra",
    memberNickname: "Jessi",
    platform: "idn",
    title: "Spill persiapan photoshoot merchandise edisi akhir tahun!",
    duration: "47m",
    recordedDate: "15 Nov 2026",
    views: 34200,
    thumbnail:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/jessica_chandra.jpg",
    replayUrl: "https://www.idntimes.com",
  },
  {
    id: "replay-7",
    memberCode: "FREYA_JAYAWARDANA",
    memberName: "Freya Jayawardana",
    memberNickname: "Freya",
    platform: "showroom",
    title: "Unboxing hadiah ulang tahun dari fans dan baca surat OFC",
    duration: "2j 05m",
    recordedDate: "14 Nov 2026",
    views: 74800,
    thumbnail:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/freya_jayawardana.jpg",
    replayUrl: "https://www.showroom-live.com/r/JKT48_Freya",
  },
  {
    id: "replay-8",
    memberCode: "MUTIARA_AZZAHRA",
    memberName: "Mutiara Azzahra",
    memberNickname: "Muthe",
    platform: "idn",
    title: "Cooking session santai: bikin cemilan manis sore hari",
    duration: "1j 18m",
    recordedDate: "13 Nov 2026",
    views: 26400,
    thumbnail:
      "https://jkt48.com/api/v1/storages/media/jkt48-member/mutiara_azzahra.jpg",
    replayUrl: "https://www.idntimes.com",
  },
];
