"use client";
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

export default function ReleaseSlider() {
  return (
    <div className="mb-4 select-none">
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper">
        <SwiperSlide>
          <div className="bg-white row md:flex">
            <Link
              href="https://www.youtube.com/watch?v=9GiWftsHdBs"
              target="_blank"
              className="md:hidden">
              <Image
                height={640}
                width={640}
                alt="Rapsodi Album Cover"
                src="/assets/release/rapsodi.jpg"
                className="w-full"
              />
            </Link>
            <Image
              height={640}
              width={640}
              alt="Rapsodi Album Cover"
              src="/assets/release/rapsodi.jpg"
              className="hidden md:block"
            />
            <div className="md:p-16">
              <div className="p-10 md:p-0">
                <h1 className="text-xl text-red-600 mb-5 md:mb-6">Release</h1>
                <Heading fontFamily="font-semibold">JKT48 - RAPSODI</Heading>
                <Paragraph marginBottom="mb-6">
                  Rapsodi adalah single ke-21 dari grup idola JKT48 dan juga
                  menjadi single original pertama dari JKT48. Single ini
                  merupakan hasil dari Pemilihan Member Single Original JKT48
                  yang diumumkan pada 30 November 2019 dengan center dari Team
                  KIII Shani Indira Natio.
                </Paragraph>
              </div>
              <div className="hidden md:block">
                <NormalButton
                  label="watch"
                  href="https://www.youtube.com/watch?v=9GiWftsHdBs"
                  icon={<FaYoutube size={18} />}>
                  Tonton sekarang
                </NormalButton>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white row md:flex">
            <Link href="https://youtu.be/GIl0Y1W4n70" target="_blank">
              <Image
                height={640}
                width={640}
                alt="Rapsodi Album Cover"
                src="/assets/release/hightension.jpg"
                className="md:hidden w-full"
              />
            </Link>
            <div className="md:p-16">
              <div className="p-10 md:p-0">
                <h1 className="text-xl text-red-600 mb-5 md:mb-6">Release</h1>
                <Heading fontFamily="font-semibold">
                  JKT48 - HIGH TENSION
                </Heading>
                <Paragraph marginBottom="mb-6">
                  High Tension adalah single ke-20 dari Grup Idola JKT48 yang
                  dirilis di Indonesia pada tahun 2019, di bawah lisensi
                  Indonesia Musik Nusantara sejak 2022. Semua anggota Senbatsu
                  dan Under Girls (32 anggota) terpilih melalui Pemilihan Member
                  Single ke-20 JKT48.
                </Paragraph>
              </div>
              <div className="hidden md:block">
                <NormalButton
                  label="watch"
                  href="https://youtu.be/GIl0Y1W4n70"
                  icon={<FaYoutube size={18} />}>
                  Tonton sekarang
                </NormalButton>
              </div>
            </div>
            <Image
              height={640}
              width={640}
              alt="Rapsodi Album Cover"
              src="/assets/release/hightension.jpg"
              className="hidden md:block"
            />
          </div>
        </SwiperSlide>
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}
