import PageWrapper from "@/app/page-wrapper";
import { banner, news } from "./news.json";
import NewsUpdateBanner from "@/components/NewsUpdateBanner";
import NewsCard from "@/components/card/NewsCard";

export default function NewsPage(request: NextRequest) {
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-semibold mb-2">Berita Terbaru</h1>
        <NewsUpdateBanner
          title={banner.title}
          image={banner.image}
          date={banner.date}
          path={banner.content.replace(".md", "")}/>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-poppins font-semibold mb-2">Berita Lainnya</h1>
        <div className="sm:gap-2 grid grid-cols-1 sm:grid-cols-2 content-center">
          {news.map((index) => (
            <NewsCard
              title={index.title}
              image={index.image}
              date={index.date}
              category={index.category}
              path={index.content.replace(".md", "")}/>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}