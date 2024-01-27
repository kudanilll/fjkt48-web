"use client";
import { useState, useEffect } from "react";
import { getCurrentMonth, sortArrayByDate } from "@/utils/get-time";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/components/banner";
import NewsCard from "@/components/card/NewsCard";
import ScheduleCard from "@/components/card/ScheduleCard";

// Shimmer Effect
import ShimmerBanner from "@/components/shimmer/ShimmerBanner";
import ShimmerCard from "@/components/shimmer/ShimmerCard";

import { specialLinks } from "./special-links.json";

export default function HomePage() {
  const [banner, setBanner] = useState([]);
  const [news, setNews] = useState([]);
  const [eventSchedule, setEventSchedule] = useState([]);

  const [successFetchBanner, setSuccessFetchBanner] = useState<boolean>(false);
  const [successFetchNews, setSuccessFetchNews] = useState<boolean>(false);
  const [successFetchEvent, setSuccessFetchEvent] = useState<boolean>(false);

  useEffect(() => {
    function filterEventSchedule(data) {
      const result = [];
      data.map((item) => {
        if (item.id > new Date().getDate()) result.push(item);
      });
      return result.slice(0, 4);
    }

    function fetchBanner() {
      fetch("/api/v1/banner", {
        cache: "no-store",
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setBanner(data.content);
          setSuccessFetchBanner(true);
        });
    }

    function fetchNews() {
      fetch("/api/v1/news", {
        cache: "no-store",
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setNews(sortArrayByDate(data.content).slice(0, 4));
          setSuccessFetchNews(true);
        });
    }

    function fetchSchedule() {
      fetch(
        `/api/v1/schedule?date=${new Date().getFullYear()}-${getCurrentMonth().toLowerCase()}`,
        {
          cache: "no-store",
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setEventSchedule(filterEventSchedule(data.content));
          setSuccessFetchEvent(true);
        });
    }

    fetchBanner();
    fetchNews();
    fetchSchedule();
  }, []);

  return (
    <div>
      <div className="mb-8">
        {successFetchBanner ? <Banner content={banner} /> : <ShimmerBanner />}
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Berita tentang JKT48</h1>
        <div className="sm:mb-6 sm:gap-1 grid grid-cols-1 sm:grid-cols-2 content-center">
          {successFetchNews
            ? news.map((item) => (
                <NewsCard
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  date={item.date}
                  category={item.category}
                  slug={item.slug}
                />
              ))
            : [...Array(4)].map((_, index) => (
                <ShimmerCard key={index} style="news-card" />
              ))}
        </div>
        <Link href="/news">
          <div className="bg-red-600 py-2 rounded-full items-center">
            <p className="text-center text-white">Berita selengkapnya</p>
          </div>
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Event yang akan datang</h1>
        {successFetchEvent
          ? eventSchedule.map((item, index) => (
              <ScheduleCard key={index} title={item.event} date={item.date} />
            ))
          : [...Array(3)].map((_, index) => (
              <ShimmerCard key={index} style="schedule-card" />
            ))}
        <Link href="/schedule">
          <div className="bg-red-600 py-2 rounded-full items-center">
            <p className="text-center text-white">Jadwal selengkapnya</p>
          </div>
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl text-center font-semibold mb-2">
          Special Links
        </h1>
        <div className="flex items-center py-4 lg:px-0 sm:px-6 px-4">
          <div className="lg:w-3/5 w-full flex items-center content-center justify-between space-x-4 mx-auto">
            {specialLinks.map((link) => (
              <Link href={link.url} key={link.alt}>
                <Image
                  height={500}
                  width={500}
                  alt={link.alt}
                  src={link.image}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
