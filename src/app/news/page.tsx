"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sortArrayByDate } from "@/utils/get-time";
import NewsType from "@/common/typedata/news-type";
import NewsCard from "@/components/ui/card/news";
import Pagination from "@/components/ui/pagination";
import ShimmerCard from "@/components/ui/shimmer/card";

export default function NewsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [successFetchNews, setSuccessFetchNews] = useState<boolean>(false);
  const [news, setNews] = useState<NewsType[]>([]);

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    router.push(`/news?page=${page}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
      method: "GET",
      next: { tags: ["news"] },
    })
      .then((response) => response.json())
      .then((data) => {
        setNews(sortArrayByDate(data.content));
        setSuccessFetchNews(true);
        setTotalPages(Math.ceil(data.content.length / itemsPerPage));
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
          total={totalPages}
          current={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
