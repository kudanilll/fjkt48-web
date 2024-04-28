"use client";
// import { Image } from "antd";
import Image from "next/image";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./slider.css";

export default function ReleaseSlider() {
  return (
    <div className="mb-4">
      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper rounded-xl">
        <SwiperSlide>
          <div className="bg-white row md:flex">
            <Image
              height={640}
              width={640}
              alt="Rapsodi Album Cover"
              src="/assets/release/rapsodi.jpg"
            />
            <div className="p-10 md:p-16">
              <h1 className="text-xl font-poppins text-red-600 mb-6">
                Release
              </h1>
              <h1 className="text-3xl font-semibold font-poppins text-red-600 mb-2">
                JKT48 - RAPSODI
              </h1>
              <p className="text-md font-poppins text-default-500 mb-6">
                Rapsodi adalah single ke-21 dari grup idola JKT48 dan juga
                menjadi single original pertama dari JKT48. Single ini merupakan
                hasil dari Pemilihan Member Single Original JKT48 yang diumumkan
                pada 30 November 2019 dengan center dari Team KIII Shani Indira
                Natio.
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
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-white row md:flex">
            <div className="p-10 md:p-16">
              <h1 className="text-xl font-poppins text-red-600 mb-6">
                Release
              </h1>
              <h1 className="text-3xl font-semibold font-poppins text-red-600 mb-2">
                JKT48 - HIGH TENSION
              </h1>
              <p className="text-md font-poppins text-default-500 mb-6">
                High Tension adalah singel ke-20 dari Grup Idola JKT48 yang
                dirilis di Indonesia pada tahun 2019 oleh Hits Records dan
                dentsuXentertainment, yang sekarang berada di bawah lisensi
                Indonesia Musik Nusantara sejak 2022.
              </p>
              <Link href="https://youtu.be/GIl0Y1W4n70" target="_blank">
                <div className="bg-red-500 py-2 rounded-lg items-center">
                  <p className="text-center text-white">Tonton sekarang</p>
                </div>
              </Link>
            </div>
            <Image
              height={640}
              width={640}
              alt="Rapsodi Album Cover"
              src="/assets/release/hightension.jpg"
            />
          </div>
        </SwiperSlide>
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}
