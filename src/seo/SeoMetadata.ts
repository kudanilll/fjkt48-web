import type { Metadata } from "next";

export const SeoMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"
  ),
  title: "FJKT48",
  icons: { icon: "/favicon.ico" },
  description: "JKT48 Fans Web",
  openGraph: {
    title: "FJKT48",
    description: "JKT48 Fans Web",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    siteName: "FJKT48",
    locale: "id_ID",
    type: "website",
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
