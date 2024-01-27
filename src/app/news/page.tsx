"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sortArrayByDate } from "@/utils/get-time";
import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/card/NewsCard";
import Pagination from "@/components/pagination";

// Shimmer Effect
import ShimmerBanner from "@/components/shimmer/ShimmerBanner";
import ShimmerCard from "@/components/shimmer/ShimmerCard";

export default function NewsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [banner, setBanner] = useState({ image: "", title: "", url: "" });
  const [successFetchBanner, setSuccessFetchBanner] = useState<boolean>(false);
  const [successFetchNews, setSuccessFetchNews] = useState<boolean>(false);
  const [news, setNews] = useState([]);

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
      cache: "no-store",
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setNews(sortArrayByDate(data.content));
        const first = sortArrayByDate(data.content)[0];
        setBanner({
          image: first.image,
          title: first.title,
          url: `/news/${first.slug}`,
        });
        setSuccessFetchBanner(true);
        setSuccessFetchNews(true);
      });
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Berita Terbaru</h1>
        {successFetchBanner ? (
          <Link href={banner.url}>
            <Image
              className="w-full object-cover rounded-xl"
              width={500}
              height={500}
              src={banner.image}
              alt={banner.title}
              priority={true}
            />
          </Link>
        ) : (
          <ShimmerBanner />
        )}
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Berita Lainnya</h1>
        <div className="sm:mb-6 sm:gap-1 grid grid-cols-1 sm:grid-cols-2 content-center">
          {successFetchNews
            ? currentItems.map((item) => (
                <NewsCard
                  key={item.id}
                  title={item.title}
                  image={item.image}
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
