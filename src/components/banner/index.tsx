"use client";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
// Import required modules
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Image } from "@nextui-org/image";
import Link from "next/link";

type BannerProps = {
  status: number;
  message: string;
  content: any;
};

export default function Banner(props: BannerProps) {
  const swiper = useSwiper();
  return (
    <Swiper
      loop={true}
      effect={"fade"}
      pagination={{
        clickable: true
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      modules={[Autoplay, EffectFade, Pagination]}
      className="mySwiper">
      {props.content.map((banner, index) => (
        <SwiperSlide key={banner.id}>
          <Link target="_blank" href={banner.url}>
            <Image
              className="w-full object-cover rounded-t-2xl"
              width="100%"
              alt={banner.image}
              src={banner.image}/>
            <div className="backdrop-blur-lg bg-red-600 bottom-0 py-5 rounded-b-2xl">
              {/* Not Working :(
              <button
                className="absolute bottom-0 font-poppins text-sm bg-red-700 px-2.5 py-1 m-2 rounded-full"
                onClick={() => swiper.slidePrev()}>
                {"<"}
              </button>
              <button
                className="absolute bottom-0 right-0 font-poppins text-sm bg-red-700 px-2.5 py-1 m-2 rounded-full"
                onClick={() => swiper.slideNext()}>
                {">"}
              </button>
              */}
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}