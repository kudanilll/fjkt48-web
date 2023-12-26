import PageWrapper from "./page-wrapper";
import HomeBanner  from "@/components/banner/HomeBanner";
import NewsCard from "@/components/card/NewsCard";
import { getDataFromAPI } from "@/utils/get-data";
import Link from "next/link";

export default async function HomePage() {
  const banner = await getDataFromAPI("banner");
  return (
    <PageWrapper>
      <div className="mb-8">
        <HomeBanner content={banner.content}/>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-poppins font-semibold mb-2">Berita</h1>
        <div className="sm:gap-2 grid grid-cols-1 sm:grid-cols-2 content-center">
          {}
        </div>
        <Link href="/news">
          <div className="backdrop-blur-lg bg-red-700 py-2 rounded-2xl items-center">
            <p className="text-center">Berita selengkapnya</p>
          </div>
        </Link>
      </div>
    </PageWrapper>
  );
}