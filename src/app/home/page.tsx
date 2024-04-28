"use client";
import { useState, useEffect } from "react";
import { getCurrentMonth, sortArrayByDate } from "@/utils/get-time";
import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/card/NewsCard";
import ScheduleCard from "@/components/card/ScheduleCard";
import ShimmerCard from "@/components/shimmer/ShimmerCard";
import PageWrapper from "@/components/wrapper/PageWrapper";
import specialLinks from "./special-links";
import ReleaseSlider from "@/components/release-slider";

export default function HomePage() {
  const [news, setNews] = useState<any[]>([]);
  const [eventSchedule, setEventSchedule] = useState<any[]>([]);

  const [successFetchNews, setSuccessFetchNews] = useState<boolean>(false);
  const [successFetchEvent, setSuccessFetchEvent] = useState<boolean>(false);

  useEffect(() => {
    function filterEventSchedule(data: any[]) {
      const result: any[] = [];
      data.map((item) => {
        if (item.id > new Date().getDate()) result.push(item);
      });
      return result.slice(0, 4);
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

    fetchNews();
    fetchSchedule();
  }, []);

  return (
    <div>
      <PageWrapper marginTop={8}>
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-poppins text-red-600 mb-2">
            Berita tentang JKT48
          </h1>
          <div className="sm:mb-6 gap-1 grid grid-cols-1 sm:grid-cols-2 content-center">
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
            <div className="bg-red-500 py-2 rounded-lg items-center">
              <p className="text-center text-white">Berita selengkapnya</p>
            </div>
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-poppins text-red-600 mb-2">
            Acara mendatang
          </h1>
          {successFetchEvent
            ? eventSchedule.map((item, index) => (
                <ScheduleCard key={index} title={item.event} date={item.date} />
              ))
            : [...Array(3)].map((_, index) => (
                <ShimmerCard key={index} style="schedule-card" />
              ))}
          <Link href="/schedule">
            <div className="bg-red-500 py-2 rounded-lg items-center">
              <p className="text-center text-white">Jadwal selengkapnya</p>
            </div>
          </Link>
        </div>
        <div className="mb-12 row md:flex">
          <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <Image
              height={650}
              width={650}
              alt="Theater JKT48"
              src="/assets/theater/1.jpg"
              className="hover:shadow-xl rounded-lg"
            />
            <Image
              height={650}
              width={650}
              alt="Theater JKT48"
              src="/assets/theater/2.jpg"
              className="hover:shadow-xl rounded-lg"
            />
            <div className="col-span-2 row-start-2">
              <Image
                height={650}
                width={650}
                alt="Theater JKT48"
                src="/assets/theater/3.jpg"
                className="hover:shadow-xl rounded-lg"
              />
            </div>
          </div>
          <div className="md:p-14">
            <h1 className="font-poppins text-red-600 text-2xl md:text-3xl mt-4 md:mt-0 mb-6">
              Apa itu JKT48 Theater ?
            </h1>
            <p className="text-md font-poppins text-default-500 mb-6 md:mb-2">
              Theater JKT48 adalah sebuah teater eksklusif untuk pertunjukan
              grup idola Indonesia JKT48 dan grup-grup saudarinya dari AKB48
              Group. Theater ini berada di lantai 4 fX Sudirman, Jakarta Pusat,
              Indonesia.
            </p>
            <p className="text-md font-poppins text-default-500 hidden md:block mb-6">
              Theater JKT48 berkapasitas sekitar 400 orang, 260 kursi untuk
              penonton duduk, dan 140 penonton berdiri, meskipun kadang-kadang
              penonton berdiri bisa melebihi jumlah itu.
            </p>
            <Link href="/theater">
              <div className="bg-red-500 py-2 rounded-lg items-center">
                <p className="text-center text-white">Lihat selengkapnya</p>
              </div>
            </Link>
          </div>
        </div>
        {/* </PageWrapper>
      <div className="bg-white mb-4 row md:flex">
        <Image
          height={640}
          width={640}
          alt="Rapsodi Album Cover"
          src="/assets/release/rapsodi.jpg"
        />
        <div className="p-10 md:p-14">
          <h1 className="text-xl font-poppins text-red-600 mb-6">Release</h1>
          <h1 className="text-3xl font-semibold font-poppins text-red-600 mb-2">
            JKT48 - RAPSODI
          </h1>
          <p className="text-md font-poppins text-default-500 mb-6">
            Rapsodi adalah single ke-21 dari grup idola JKT48 dan juga menjadi
            single original pertama dari JKT48. Single ini merupakan hasil dari
            Pemilihan Member Single Original JKT48 yang diumumkan pada 30
            November 2019 dengan center dari Team KIII Shani Indira Natio.
          </p>
          <Link
            href="https://www.youtube.com/watch?v=9GiWftsHdBs"
            target="_blank">
            <div className="bg-red-500 py-2 rounded-lg items-center">
              <p className="text-center text-white">Tonton sekarang</p>
            </div>
          </Link>
        </div>
      </div>
      <PageWrapper marginTop={0}> */}
        <div className="mb-8">
          <ReleaseSlider />
        </div>
        <div className="mb-8">
          <h1 className="text-xl md:hidden font-poppins text-center text-red-600 mb-2">
            Tautan Spesial
          </h1>
          <div className="lg:w-3/5 w-full flex items-center content-center mx-auto py-4 lg:px-0 sm:px-6 px-4 justify-between">
            <h1 className="hidden md:block text-3xl text-center font-poppins text-red-600 whitespace-nowrap mr-4">
              Tautan Spesial
            </h1>
            <div className="flex items-center space-x-4 ml-4">
              {specialLinks.map((link) => (
                <Link
                  href={link.url}
                  key={link.alt}
                  className="hover:shadow-xl">
                  <Image
                    height={200}
                    width={200}
                    alt={link.alt}
                    src={link.image}
                    className="hover:shadow-xl"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
