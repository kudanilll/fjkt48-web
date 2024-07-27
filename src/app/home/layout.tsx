import type { Metadata } from "next";
import BannerSlider from "@/components/ui/slider/banner-slider";

export const metadata: Metadata = {
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

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="bg-red-100 pt-10 px-5 md:pt-16 md:px-16 pb-2 md:pb-8">
        <BannerSlider />
      </div>
      {children}
    </div>
  );
}
