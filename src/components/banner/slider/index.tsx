"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ShimmerBanner from "@/components/shimmer/ShimmerBanner";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./pagination.css";

type BannerSliderProps = {
  id: string;
  image: string;
  url: string;
};

export default function BannerSlider(props: { endpoint: string }) {
  const [banner, setBanner] = useState<BannerSliderProps[]>([]);
  const [successFetch, setSuccessFetch] = useState<boolean>(false);

  useEffect(() => {
    fetch(props.endpoint, {
      cache: "no-store",
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setBanner(data.content);
        setSuccessFetch(true);
      });
  }, [props.endpoint]);

  return (
    <div className="mt-2">
      {successFetch ? (
        <Swiper
          slidesPerView={2}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            431: {
              slidesPerView: 2,
            },
          }}
          spaceBetween={0}
          centeredSlides={true}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper rounded-xl">
          {banner.map((item) => (
            <SwiperSlide key={item.id}>
              <Link target="_blank" href={item.url}>
                <Image
                  className="w-full object-cover md:h-96"
                  width={500}
                  height={500}
                  alt={item.image}
                  src={item.image}
                  quality={100}
                  priority
                />
              </Link>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination" />
        </Swiper>
      ) : (
        <ShimmerBanner />
      )}
    </div>
  );
}
