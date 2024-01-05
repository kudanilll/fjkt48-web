"use client";
import { Metadata } from "next";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sortArrayByDate } from "@/utils/get-time";
import Image from "next/image";
import Link  from "next/link";
import PageWrapper from "@/app/page-wrapper";
import NewsCard from "@/components/card/NewsCard";
import Pagination from "@/components/pagination";

export const metadata: Metadata = {
  title: "FJKT48 | Berita",
};

export default function NewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [banner, setBanner] = useState({image: "", title: "", url: ""});
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
    fetch("/api/v1/news", {
      cache: "no-store",
      method: "GET"
    }).then((response) => response.json())
      .then((data) => {
        setNews(sortArrayByDate(data.content));
        const first = sortArrayByDate(data.content)[0];
        setBanner({
          image: first.image,
          title: first.title,
          url: `/news/${first.slug}`
        });
      });
  }, []);
  
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-semibold mb-2">Berita Terbaru</h1>
        <Link href={banner.url}>
          <Image
            className="w-full object-cover rounded-xl"
            width={500}
            height={500}
            src={banner.image}
            alt={banner.title}
            priority={true}/>
        </Link>
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