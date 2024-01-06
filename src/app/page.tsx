import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/wrapper/PageWrapper";
import Banner from "@/components/banner";
import NewsCard from "@/components/card/NewsCard";
import { getDataFromAPI } from "@/utils/get-data";
import { sortArrayByDate } from "@/utils/get-time";

export const metadata: Metadata = {
  title: "FJKT48 | Home",
  description: "Home Dashboard FJKT48"
};

export default async function HomePage() {
  const banner = await getDataFromAPI("banner");
  const news = await getDataFromAPI("news");
  const newsItems = sortArrayByDate(news.content).slice(0, 4);
  return (
    <PageWrapper>
      <div className="mb-8">
        <Banner content={banner.content}/>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Berita tentang JKT48</h1>
        <div className="sm:mb-6 sm:gap-2 grid grid-cols-1 sm:grid-cols-2 content-center">
          {newsItems.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              image={item.image}
              date={item.date}
              category={item.category}
              slug={item.slug}/>
          ))}
        </div>
        <Link href="/news">
          <div className="backdrop-blur-lg bg-red-600 py-2 rounded-2xl items-center">
            <p className="text-center text-white">Berita selengkapnya</p>
          </div>
        </Link>
      </div>
      <div className="mb-8">
        {/*<Image
          className="w-full object-cover"
          height={500}
          width={500}
          alt="JKT48 Theater Logo"
          src="/jkt48-theater-logo.png"/>*/}
      </div>
    </PageWrapper>
  );
}