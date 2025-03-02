import type { Metadata } from "next";

export const SeoMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
  ),
  title: "FJKT48",
  icons: { icon: "/favicon.ico" },
  description: "JKT48 Fans Web",
  openGraph: {
    title: "FJKT48 - Home",
    description: "JKT48 Fans Web",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    siteName: "FJKT48",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: process.env.NEXT_PUBLIC_DOMAIN + "/opengraph-image-512.jpg",
        width: 512,
        height: 512,
      },
      {
        url: process.env.NEXT_PUBLIC_DOMAIN + "/opengraph-image-1920-1080.jpg",
        width: 3264,
        height: 1836,
      },
    ],
  },
  authors: [
    {
      name: "Achmad Daniel Syahputra",
      url: "https://github.com/achmaddaniel24",
    },
    { name: "Muhammad Ikhsan Fauzi", url: "https://dribbble.com/ipauscream" },
  ],
  keywords: ["jkt48", "idol", "jkt"],
};

export const HomeMetadata: Metadata = {
  title: "FJKT48 | Home",
  description: "Home Dashboard",
  openGraph: {
    title: "FJKT48 - Home",
    description: "JKT48 Fans Web",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    siteName: "FJKT48",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: process.env.NEXT_PUBLIC_DOMAIN + "/opengraph-image-512.jpg",
        width: 512,
        height: 512,
      },
      {
        url: process.env.NEXT_PUBLIC_DOMAIN + "/opengraph-image-1920-1080.jpg",
        width: 3264,
        height: 1836,
      },
    ],
  },
};

export const NewsMetadata: Metadata = {
  title: "FJKT48 | Berita",
  description: "Berita Seputar JKT48",
};

export const ScheduleMetadata: Metadata = {
  title: "FJKT48 | Jadwal",
  description: "Daftar Jadwal Acara & Pertunjukan JKT48",
};

export const MemberMetadata: Metadata = {
  title: "FJKT48 | Member",
  description: "Daftar Member & Trainee JKT48",
};

export const TheaterMetadata: Metadata = {
  title: "FJKT48 | Theater",
  description: "",
};

export const LiveMetadata: Metadata = {
  title: "FJKT48 | Live",
  description: "",
};

export const AboutMetadata: Metadata = {
  title: "FJKT48 | About",
  description: "",
};
