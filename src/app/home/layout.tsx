import type { Metadata } from "next";
import { HomeMetadata } from "@/common/seo-metadata";
import BannerSlider from "@/components/ui/slider/banner-slider";

export const metadata: Metadata = HomeMetadata;

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
