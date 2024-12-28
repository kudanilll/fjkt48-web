"use client";

import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import NormalButton from "@/components/ui/button/normal-button";
import Heading from "@/components/typography/heading";
import Paragraph from "@/components/typography/paragraph";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./pagination.css";

type ReleaseData = {
  imageUrl: string;
  youtubeUrl: string;
  title: string;
  description: string;
};

export default function ReleaseSlider() {
  const [releaseData, setReleaseData] = useState<ReleaseData[] | null>(null);

  useEffect(() => {
    // Try to get data from localStorage
    const cachedData = localStorage.getItem("releaseData");

    if (cachedData) {
      // If data exists in cache, use it
      setReleaseData(JSON.parse(cachedData));
    } else {
      // Otherwise, set the data and cache it in localStorage
      const newReleaseData: ReleaseData[] = [
        {
          imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/release/rapsodi.png`,
          youtubeUrl: "https://www.youtube.com/watch?v=9GiWftsHdBs",
          title: "JKT48 - RAPSODI",
          description:
            "Rapsodi adalah single ke-21 dari grup idola JKT48 dan juga menjadi single original pertama dari JKT48. Single ini merupakan hasil dari Pemilihan Member Single Original JKT48 yang diumumkan pada 30 November 2019 dengan center dari Team KIII Shani Indira Natio.",
        },
        {
          imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/release/hightension.png`,
          youtubeUrl: "https://youtu.be/GIl0Y1W4n70",
          title: "JKT48 - HIGH TENSION",
          description:
            "High Tension adalah single ke-20 dari Grup Idola JKT48 yang dirilis di Indonesia pada tahun 2019, di bawah lisensi Indonesia Musik Nusantara sejak 2022. Semua anggota Senbatsu dan Under Girls (32 anggota) terpilih melalui Pemilihan Member Single ke-20 JKT48.",
        },
      ];

      // Set the state with new data
      setReleaseData(newReleaseData);

      // Cache the data in localStorage
      localStorage.setItem("releaseData", JSON.stringify(newReleaseData));
    }
  }, []);

  if (!releaseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-4 select-none">
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {releaseData.map((release, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white row md:flex">
              <Link
                href={release.youtubeUrl}
                target="_blank"
                className="md:hidden">
                <Image
                  height={640}
                  width={640}
                  alt={release.title}
                  src={release.imageUrl}
                  className="w-full"
                />
              </Link>
              <div className="md:p-16">
                <div className="p-10 md:p-0">
                  <h1 className="text-xl text-red-600 mb-5 md:mb-6">Release</h1>
                  <Heading fontFamily="font-semibold">{release.title}</Heading>
                  <Paragraph marginBottom="mb-6">
                    {release.description}
                  </Paragraph>
                </div>
                <div className="hidden md:block">
                  <NormalButton
                    label="watch"
                    href={release.youtubeUrl}
                    icon={<FaYoutube size={18} />}>
                    Tonton sekarang
                  </NormalButton>
                </div>
              </div>
              <Image
                height={640}
                width={640}
                alt={release.title}
                src={release.imageUrl}
                className="hidden md:block"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}
