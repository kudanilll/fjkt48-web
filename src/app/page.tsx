"use client";
import { useState, useEffect } from "react";
import { getDataFromAPI } from "@/utils/get-data";
import { sortArrayByDate } from "@/utils/get-time";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/wrapper/PageWrapper";
import Banner from "@/components/banner";
import NewsCard from "@/components/card/NewsCard";

// Shimmer Effect
import ShimmerBanner from "@/components/shimmer/ShimmerBanner";
import ShimmerCard from "@/components/shimmer/ShimmerCard";

export default function HomePage() {
  const [banner, setBanner] = useState([]);
  const [news, setNews] = useState([]);
  const [successFetchBanner, setSuccessFetchBanner] = useState(false);
  const [successFetchNews, setSuccessFetchNews] = useState(false);
  
  useEffect(() => {
    function fetchBanner() {
      fetch("/api/v1/banner", {
        cache: "no-store",
        method: "GET"
      }).then((response) => response.json())
        .then((data) => {
          setBanner(data.content);
          setSuccessFetchBanner(true);
        });
    }
    
    function fetchNews() {
      fetch("/api/v1/news", {
        cache: "no-store",
        method: "GET"
      }).then((response) => response.json())
        .then((data) => {
          setNews(sortArrayByDate(data.content).slice(0, 4));
          setSuccessFetchNews(true);
        });
    }
    
    fetchBanner();
    fetchNews();
  }, []);
  
  return (
    <PageWrapper>
      <div className="mb-8">
        {successFetchBanner ? (<Banner content={banner}/>) : (<ShimmerBanner/>)}
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Berita tentang JKT48</h1>
        <div className="sm:mb-6 sm:gap-1 grid grid-cols-1 sm:grid-cols-2 content-center">
          {successFetchNews ? (
            news.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              image={item.image}
              date={item.date}
              category={item.category}
              slug={item.slug}/>
            ))) : ([...Array(6)].map((_, index) => (
              <ShimmerCard key={index} style="news-card"/>
          )))}
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