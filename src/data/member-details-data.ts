import officialData from "@/data/jkt48-official.json";
import type { JKT48Member, TeamType } from "@/types/jkt48-types";

export interface MemberDetail {
  code: string;
  name: string;
  nickname: string;
  type: TeamType;
  photo: string;
  jkt48_member_id: number;
  birthdate: string;
  horoscope: string;
  bloodType: string;
  height: string;
  generation: string;
  jikoshokai: string;
  fansCount: number;
  threadsCount: number;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    showroom?: string;
    idn?: string;
  };
  isLive: boolean;
  livePlatform?: "showroom" | "idn";
  lastLiveText: string;
}

const membersList = (officialData.members ?? []) as JKT48Member[];

// Specific hand-crafted data for featured members, especially Freya as designed in FigCraft
const memberOverrides: Record<string, Partial<MemberDetail>> = {
  FREYA_JAYAWARDANA: {
    birthdate: "13 Februari 2006",
    horoscope: "Aquarius",
    bloodType: "B",
    height: "154 cm",
    generation: "Generasi 7",
    jikoshokai:
      "Gadis koleris yang suka berimajinasi, terangi harimu dengan senyuman karamelku. Halo, aku Freya!",
    fansCount: 14280,
    threadsCount: 428,
    socialLinks: {
      twitter: "https://x.com/Freya_JKT48",
      instagram: "https://instagram.com/jkt48.freya",
      tiktok: "https://tiktok.com/@freyajkt48",
      showroom: "https://www.showroom-live.com/r/JKT48_Freya",
      idn: "https://www.idntimes.com",
    },
    isLive: true,
    livePlatform: "showroom",
    lastLiveText: "Sedang live sekarang di Showroom",
  },
  ANGELINA_CHRISTY: {
    birthdate: "5 Desember 2005",
    horoscope: "Sagittarius",
    bloodType: "O",
    height: "163 cm",
    generation: "Generasi 7",
    jikoshokai: "Peduli dan berbaik hati, siapakah dia? Christy!",
    fansCount: 18920,
    threadsCount: 512,
    socialLinks: {
      twitter: "https://x.com/A_ChristyJKT48",
      instagram: "https://instagram.com/jkt48.christy",
      tiktok: "https://tiktok.com/@christyjkt48",
      idn: "https://www.idntimes.com",
    },
    isLive: true,
    livePlatform: "idn",
    lastLiveText: "Sedang live sekarang di IDN Live",
  },
  SHANIA_GRACIA: {
    birthdate: "31 Agustus 1999",
    horoscope: "Virgo",
    bloodType: "A",
    height: "161 cm",
    generation: "Generasi 3 (Kapten JKT48)",
    jikoshokai:
      "Senyum semanis madu, berkilau seperti mentari pagi. Halo semua, aku Gracia!",
    fansCount: 22400,
    threadsCount: 680,
    socialLinks: {
      twitter: "https://x.com/S_GraciaJKT48",
      instagram: "https://instagram.com/jkt48gracia",
    },
    isLive: false,
    lastLiveText: "Terakhir live kemarin di Showroom",
  },
  FIONI_ALVERIA: {
    birthdate: "4 Februari 2002",
    horoscope: "Aquarius",
    bloodType: "O",
    height: "158 cm",
    generation: "Generasi 8",
    jikoshokai:
      "Seperti simfoni yang indah, akan selalu terngiang di benakmu. Halo, aku Fioni!",
    fansCount: 9840,
    threadsCount: 240,
    socialLinks: {
      twitter: "https://x.com/A_FioniJKT48",
      instagram: "https://instagram.com/jkt48.fioni",
    },
    isLive: false,
    lastLiveText: "Terakhir live 3 hari lalu",
  },
  MARSHA_LENATHEA: {
    birthdate: "9 Januari 2006",
    horoscope: "Capricorn",
    bloodType: "O",
    height: "163 cm",
    generation: "Generasi 9",
    jikoshokai:
      "Bagaikan mutiara yang berkilau di dalam lautan. Halo, aku Marsha!",
    fansCount: 16750,
    threadsCount: 395,
    socialLinks: {
      twitter: "https://x.com/L_MarshaJKT48",
      instagram: "https://instagram.com/jkt48.marsha",
    },
    isLive: false,
    lastLiveText: "Terakhir live 5 jam lalu",
  },
  JESSICA_CHANDRA: {
    birthdate: "23 September 2005",
    horoscope: "Libra",
    bloodType: "O",
    height: "164 cm",
    generation: "Generasi 7",
    jikoshokai: "Kembang api yang indah menyinari malammu. Halo, aku Jessi!",
    fansCount: 13100,
    threadsCount: 310,
    socialLinks: {
      twitter: "https://x.com/C_JessiJKT48",
      instagram: "https://instagram.com/jkt48.jessi",
    },
    isLive: false,
    lastLiveText: "Terakhir live kemarin di IDN Live",
  },
};

export function getMemberDetail(code: string): MemberDetail | undefined {
  const cleanCode = code.toUpperCase().replace(/-/g, "_");
  const member = membersList.find(
    (m) =>
      m.code.toUpperCase() === cleanCode ||
      m.nickname.toUpperCase() === code.toUpperCase() ||
      m.code.toUpperCase() === code.toUpperCase()
  );
  if (!member) return undefined;

  const override = memberOverrides[member.code.toUpperCase()] ?? {};

  // Deterministic fallback generator for members without explicit overrides
  const charCodeSum = member.code
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const heights = ["154 cm", "156 cm", "158 cm", "160 cm", "162 cm", "165 cm"];
  const bloodTypes = ["A", "B", "O", "AB"];
  const horoscopes = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];
  const gens = [
    "Generasi 7",
    "Generasi 8",
    "Generasi 9",
    "Generasi 10",
    "Generasi 11",
    "Generasi 12",
  ];

  return {
    code: member.code,
    name: member.name,
    nickname: member.nickname,
    type: member.type,
    photo: member.photo,
    jkt48_member_id: member.jkt48_member_id,
    birthdate: override.birthdate ?? "15 Juli 2005",
    horoscope:
      override.horoscope ?? horoscopes[charCodeSum % horoscopes.length]!,
    bloodType:
      override.bloodType ?? bloodTypes[charCodeSum % bloodTypes.length]!,
    height: override.height ?? heights[charCodeSum % heights.length]!,
    generation: override.generation ?? gens[charCodeSum % gens.length]!,
    jikoshokai:
      override.jikoshokai ??
      `Selalu ceria dan penuh energi untuk menerangi panggung! Halo semuanya, aku ${member.nickname}!`,
    fansCount: override.fansCount ?? 4500 + (charCodeSum % 10000),
    threadsCount: override.threadsCount ?? 80 + (charCodeSum % 350),
    socialLinks: override.socialLinks ?? {
      twitter: `https://x.com/${member.nickname}_JKT48`,
      instagram: `https://instagram.com/jkt48.${member.nickname.toLowerCase()}`,
      tiktok: `https://tiktok.com/@${member.nickname.toLowerCase()}jkt48`,
      showroom: `https://www.showroom-live.com/r/JKT48_${member.nickname}`,
      idn: "https://www.idntimes.com",
    },
    isLive: override.isLive ?? false,
    livePlatform: override.livePlatform,
    lastLiveText:
      override.lastLiveText ?? "Sedang offline · terakhir live 2 jam lalu",
  };
}

export function getAllMemberCodes(): string[] {
  const codes: string[] = [];
  for (const m of membersList) {
    codes.push(m.code);
    codes.push(m.nickname.toLowerCase());
  }
  return codes;
}
