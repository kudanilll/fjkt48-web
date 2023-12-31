"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageWrapper from "@/app/page-wrapper";
import NewsCard from "@/components/card/NewsCard";
import Banner, { BannerContent } from "@/components/banner";
import Pagination from "@/components/pagination";

export default function NewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [banner, setBanner] = useState<BannerContent>([]);
  const [news, setNews] = useState([]);
  
  const itemsPerPage = 6;
  const indexOfLastItem  = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(news.length / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/news?page=${page}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  useEffect(() => {
    const getNewsData = async () => {
      fetch("/api/v1/news", {
        cache: "no-store",
        method: "GET"
      }).then((response) => response.json())
        .then((data) => {
          setNews(data.content);
          console.log(data.content);
          const bannerContent: BannerContent = [];
          data.content.map((content) => {
            let obj = {
              id: content.id,
              image: content.image,
              url: `/news/${content.slug}`
            };
            bannerContent.push(obj);
          });
          if(bannerContent.length > 4)
            setBanner(bannerContent.slice(0, 4));
          else
            setBanner(bannerContent);
        });
    };
    getNewsData();
  }, []);
  
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-semibold mb-2">Berita Terbaru</h1>
        <Banner content={banner}/>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-poppins font-semibold mb-2">Berita Lainnya</h1>
        <div className="sm:mb-6 sm:gap-2 grid grid-cols-1 sm:grid-cols-2 content-center">
          {currentItems.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              image={item.image}
              date={item.date}
              category={item.category}
              slug={item.slug}/>
          ))}
        </div>
        <Pagination
          total={totalPages == 0 ? 1 : totalPages}
          current={currentPage}
          onPageChange={handlePageChange}/>
      </div>
    </PageWrapper>
  );
}