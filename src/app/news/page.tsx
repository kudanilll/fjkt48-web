"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sortArrayByDate } from "@/utils/get-time";
import NewsType from "@/common/typedata/news-type";
import NewsCard from "@/components/card/NewsCard";
import Pagination from "@/components/pagination";
import ShimmerCard from "@/components/shimmer/ShimmerCard";

export default function NewsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [successFetchNews, setSuccessFetchNews] = useState<boolean>(false);
  const [news, setNews] = useState<NewsType[]>([]);

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    router.push(`/news?page=${page}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    fetch("/api/v1/news", {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["news"] },
    })
      .then((response) => response.json())
      .then((data) => {
        setNews(sortArrayByDate(data.content));
        setSuccessFetchNews(true);
      });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-poppins text-red-600 mb-2">
          Berita Terbaru
        </h1>
        <div className="sm:mb-6 gap-1 grid grid-cols-1 md:grid-cols-3 content-center">
          {successFetchNews
            ? currentItems.map((item) => (
                <NewsCard
                  key={item.id}
                  title={item.title}
                  thumbnail={item.thumbnail}
                  date={item.date}
                  category={item.category}
                  slug={item.slug}
                />
              ))
            : [...Array(6)].map((_, index) => (
                <ShimmerCard key={index} style="news-card" />
              ))}
        </div>
        <Pagination
          total={totalPages == 0 ? 1 : totalPages}
          current={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
