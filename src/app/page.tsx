import PageWrapper from "./page-wrapper";
import Banner from "@/components/banner";
import NewsCard from "@/components/card/NewsCard";
import { getDataFromAPI } from "@/utils/get-data";
import { Image } from "@nextui-org/image";
import Link from "next/link";

// Test
import { news } from "@/app/news/news.json";

export default async function HomePage() {
  const banner = await getDataFromAPI("banner");
  const newsItems = news.slice(0, 4);
  return (
    <PageWrapper>
      <div className="mb-8">
        <Banner content={banner.content}/>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-poppins font-semibold mb-2">Berita tentang JKT48</h1>
        <div className="sm:mb-6 sm:gap-2 grid grid-cols-1 sm:grid-cols-2 content-center">
          {newsItems.map((item, index) => (
            <NewsCard
              key={index}
              title={item.title}
              image={item.image}
              date={item.date}
              category={item.category}
              path={item.content.replace(".md", "")}/>
          ))}
        </div>
        <Link href="/news">
          <div className="backdrop-blur-lg bg-red-700 py-2 rounded-2xl items-center">
            <p className="text-center">Berita selengkapnya</p>
          </div>
        </Link>
      </div>
      <div className="mb-8">
        <Image
          className="w-full object-cover"
          width="100%"
          alt="JKT48 Theater Logo"
          src="/jkt48-theater-logo.png"/>
      </div>
    </PageWrapper>
  );
}