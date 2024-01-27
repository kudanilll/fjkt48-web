"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
// Import required modules
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

type BannerContent = {
  id: string;
  image: string;
  url: string;
};

export default function Banner(props: { content: BannerContent[] }) {
  return (
    <Swiper
      loop={true}
      effect={"fade"}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, EffectFade, Pagination]}
      className="mySwiper">
      {props.content.map((banner) => (
        <SwiperSlide key={banner.id}>
          <Link target="_blank" href={banner.url}>
            <Image
              className="w-full object-cover rounded-t-2xl"
              width={500}
              height={500}
              alt={banner.image}
              src={banner.image}
              priority={true}
            />
            <div className="bg-red-600 bottom-0 py-5 rounded-b-2xl" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
