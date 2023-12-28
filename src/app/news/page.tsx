"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageWrapper from "@/app/page-wrapper";
import NewsCard from "@/components/card/NewsCard";
import NewsBanner from "@/components/banner/NewsBanner";
import Pagination from "@/components/pagination";
import { news } from "./news.json";

export default function NewsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [banner, setBanner] = useState([]);
  
  const itemsPerPage = 6;
  const indexOfLastItem  = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(news.length / itemsPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`/news?page=${page}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  useEffect(() => {
    fetch("/api/v1/banner", {
      cache: "no-store",
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => setBanner(data.content))
  }, []);
  
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-semibold mb-2">Berita Terbaru</h1>
        <NewsBanner content={banner}/>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-poppins font-semibold mb-2">Berita Lainnya</h1>
        <div className="sm:gap-2 grid grid-cols-1 sm:grid-cols-2 content-center">
          {currentItems.map((item) => (
            <NewsCard
              title={item.title}
              image={item.image}
              date={item.date}
              category={item.category}
              path={item.content.replace(".md", "")}/>
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