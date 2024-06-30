"use client";
import { useFetch } from "@/hooks/use-fetch";
import { getCurrentMonth, sortArrayByDate } from "@/utils/get-time";
import NewsCard from "@/components/ui/card/news";
import ScheduleCard from "@/components/ui/card/schedule";
import ShimmerCard from "@/components/ui/shimmer/card";
import ReleaseSlider from "@/components/ui/slider/release-slider";
import LongButton from "@/components/ui/button/long-button";
import PageWrapper from "@/components/wrapper/page-wrapper";
import NormalPageWrapper from "@/components/wrapper/normal-page-wrapper";
import Heading from "@/components/typography/heading";
import Paragraph from "@/components/typography/paragraph";
import Image from "next/image";
import Link from "next/link";
import specialLinks from "./special-links";

function filterEventSchedule(data: any[]) {
  const result: any[] = [];
  data.map((item) => {
    if (item.id > new Date().getDate()) result.push(item);
  });
  return result.slice(0, 4);
}

export default function HomePage() {
  // const [news, successFetchNews] = useFetch<any[]>("/news", (url: string) =>
  //   fetch(url, {
  //     method: "GET",
  //     next: { tags: ["news"] },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => sortArrayByDate(data.content).slice(0, 6))
  // );
  // const [eventSchedule, successFetchEvent] = useFetch<any[]>(
  //   `/schedule?date=${new Date().getFullYear()}-${getCurrentMonth().toLowerCase()}`,
  //   (url: string) =>
  //     fetch(url, {
  //       method: "GET",
  //       next: { tags: ["schedule"] },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => filterEventSchedule(data.content))
  // );
  return (
    <div>
      <PageWrapper marginTop={8}>
        <div className="my-8">
          <Heading>Berita tentang JKT48</Heading>
          <div className="mb-4 gap-1 grid grid-cols-1 md:grid-cols-3 content-center">
            {/* {successFetchNews
              ? news.map((item) => (
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
                ))} */}
          </div>
          <LongButton href="/news">Berita selengkapnya</LongButton>
        </div>
        <div className="mb-8">
          <Heading>Acara mendatang</Heading>
          <div className="mb-4">
            {/* {successFetchEvent
              ? eventSchedule.map((item, index) => (
                  <ScheduleCard
                    key={index}
                    title={item.event}
                    date={item.date}
                  />
                ))
              : [...Array(3)].map((_, index) => (
                  <ShimmerCard key={index} style="schedule-card" />
                ))} */}
          </div>
          <LongButton href="/schedule">Jadwal selengkapnya</LongButton>
        </div>
        <div className="mb-12 row md:flex">
          <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <div className="overflow-hidden rounded-lg">
              <Image
                style={{ width: "100", height: "auto" }}
                height={650}
                width={650}
                alt="Theater JKT48"
                src="/assets/theater/1.jpg"
                className="rounded-lg transition ease-in-out duration-300 hover:scale-150"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image
                style={{ width: "100", height: "auto" }}
                height={650}
                width={650}
                alt="Theater JKT48"
                src="/assets/theater/2.jpg"
                className="rounded-lg transition ease-in-out duration-300 hover:scale-150"
              />
            </div>
            <div className="col-span-2 row-start-2">
              <div className="overflow-hidden rounded-lg">
                <Image
                  style={{ width: "100", height: "auto" }}
                  height={650}
                  width={650}
                  alt="Theater JKT48"
                  src="/assets/theater/3.jpg"
                  className="rounded-lg transition ease-in-out duration-300 hover:scale-150"
                />
              </div>
            </div>
          </div>
          <div className="md:p-14 select-none">
            <h1 className="hidden md:block text-red-600 text-2xl md:text-3xl mt-4 md:mt-0 mb-6">
              Apa itu JKT48 Theater ?
            </h1>
            <div className="p-4 md:p-0">
              <h1 className="md:hidden text-red-600 text-2xl md:text-3xl mt-4 md:mt-0 mb-6">
                Apa itu JKT48 Theater ?
              </h1>
              <Paragraph>
                Theater JKT48 adalah sebuah teater eksklusif untuk pertunjukan
                grup idola Indonesia JKT48 dan grup-grup saudarinya dari AKB48
                Group. Theater ini berada di lantai 4 fX Sudirman, Jakarta
                Pusat, Indonesia.
              </Paragraph>
              <Paragraph mobileHidden>
                Theater JKT48 berkapasitas sekitar 400 orang, 260 kursi untuk
                penonton duduk, dan 140 penonton berdiri, meskipun kadang-kadang
                penonton berdiri bisa melebihi jumlah itu.
              </Paragraph>
            </div>
            <LongButton href="/theater">Lihat selengkapnya</LongButton>
          </div>
        </div>
      </PageWrapper>
      <ReleaseSlider />
      <NormalPageWrapper marginTop={1}>
        <div className="mb-8 select-none">
          <h1 className="text-xl md:hidden text-center text-red-600 mb-2">
            Tautan Spesial
          </h1>
          <div className="lg:w-3/5 w-full flex items-center content-center mx-auto py-4 lg:px-0 sm:px-6 px-4 justify-between">
            <h1 className="hidden md:block text-3xl text-center text-red-600 whitespace-nowrap mr-4">
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
      </NormalPageWrapper>
    </div>
  );
}
