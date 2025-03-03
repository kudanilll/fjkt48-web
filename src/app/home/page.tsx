"use client";

import { Heading, Paragraph, Text } from "@/components/typography";
import ReleaseSlider from "@/components/ui/slider/release-slider";
import LongButton from "@/components/ui/button/long-button";
import InfiniteMovingCards from "@/components/ui/infinite-moving-cards";
import PageWrapper from "@/components/wrapper/page-wrapper";
import NormalPageWrapper from "@/components/wrapper/normal-page-wrapper";
import Image from "next/image";
import Link from "next/link";
import specialLinks from "./special-links";

export default function HomePage() {
  return (
    <div>
      <PageWrapper marginTop={8}>
        <div className="relative my-10 md:my-16 row md:flex z-10">
          {/* Background Text */}
          <div className="absolute inset-0 justify-center items-center z-0 hidden md:flex">
            <h1 className="text-red-600 text-[28rem] font-thin opacity-10 pointer-events-none">
              JKT48
            </h1>
          </div>
          <div className="justify-center items-center row md:flex">
            {/* Grid Images */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 relative z-10 auto-rows-fr h-fit">
              <div className="overflow-hidden rounded-lg">
                <Image
                  style={{ width: "100%", height: "100%" }}
                  height={650}
                  width={650}
                  alt="Theater JKT48"
                  src="/assets/theater/1.jpg"
                  className="rounded-lg transition ease-in-out duration-300 hover:scale-105"
                  priority
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  style={{ width: "100%", height: "100%" }}
                  height={650}
                  width={650}
                  alt="Theater JKT48"
                  src="/assets/theater/2.jpg"
                  className="rounded-lg transition ease-in-out duration-300 hover:scale-105"
                  priority
                />
              </div>
              <div className="overflow-hidden rounded-lg col-span-2">
                <Image
                  style={{ width: "100%", height: "auto" }}
                  height={650}
                  width={1300}
                  alt="Theater JKT48"
                  src="/assets/theater/3.jpg"
                  className="rounded-lg transition ease-in-out duration-300 hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="relative md:p-14 md:my-auto z-10 md:w-1/2">
              <Heading mobileHidden className="mt-4 md:mt-0 mb-6">
                Apa itu JKT48 Theater?
              </Heading>
              <div className="p-4 md:p-0">
                <Heading className="md:hidden mt-4 md:mt-0 mb-6">
                  Apa itu JKT48 Theater?
                </Heading>
                <Paragraph>
                  Theater JKT48 adalah sebuah teater eksklusif untuk pertunjukan
                  grup idola Indonesia JKT48 dan grup-grup saudarinya dari AKB48
                  Group. Theater ini berada di lantai 4 fX Sudirman, Jakarta
                  Pusat, Indonesia.
                </Paragraph>
                <Paragraph mobileHidden className="mb-6">
                  Theater JKT48 berkapasitas sekitar 400 orang, 260 kursi untuk
                  penonton duduk, dan 140 penonton berdiri, meskipun
                  kadang-kadang penonton berdiri bisa melebihi jumlah itu.
                </Paragraph>
              </div>
              <LongButton label="theater" href="/theater">
                Lihat selengkapnya
              </LongButton>
            </div>
          </div>
        </div>
      </PageWrapper>
      <InfiniteMovingCards />
      <ReleaseSlider />
      <NormalPageWrapper marginTop={1}>
        <div className="mb-8">
          <Heading as="h4" className="md:hidden text-center mb-2">
            Tautan Spesial
          </Heading>
          <div className="lg:w-3/5 w-full flex items-center content-center mx-auto py-4 lg:px-0 sm:px-6 px-4 justify-between">
            <Heading
              as="h4"
              mobileHidden
              className="text-center whitespace-nowrap mr-4">
              Tautan Spesial
            </Heading>
            <div className="flex items-center space-x-4 ml-4">
              {specialLinks.map((link) => (
                <Link
                  href={link.url}
                  key={link.alt}
                  className="relative inline-block overflow-hidden rounded group">
                  <Image
                    height={200}
                    width={200}
                    alt={link.alt}
                    src={link.image}
                    className="transition-transform duration-300 ease-in-out"
                  />
                  {/* Overlay Animasi */}
                  <span className="w-56 h-48 rounded bg-red-600 opacity-90 absolute bottom-0 right-0 -translate-x-full translate-y-full ease-out duration-500 transition-all mb-9 mr-9 group-hover:mr-0 group-hover:mb-32 group-hover:translate-x-0"></span>

                  {/* Text */}
                  <Text
                    fontFamily="font-semibold"
                    fontColor="text-white"
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {link.alt}
                  </Text>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </NormalPageWrapper>
    </div>
  );
}
