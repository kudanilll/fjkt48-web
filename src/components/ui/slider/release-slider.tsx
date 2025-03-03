"use client";

import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { Heading, Paragraph } from "@/components/typography";
import Image from "next/image";
import Link from "next/link";
import NormalButton from "@/components/ui/button/normal-button";

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
    <div className="mb-4">
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
                  <Heading as="h5" className="uppercase">
                    Release
                  </Heading>
                  <Heading as="h3" className="mb-4 uppercase">
                    {release.title}
                  </Heading>
                  <Paragraph className="mb-6 opacity-85">
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
                className="hidden md:block object-center object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}
