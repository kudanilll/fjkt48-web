"use client";
import { BannerType } from "@/types/banner.type";
import { useFetch } from "@/hooks/use-fetch";
import ShimmerImage from "@/components/ui/shimmer/image";
import Image from "next/image";
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import "./pagination.css";

function normalize(data: any) {
  const banner: BannerType[] = [];
  for (const _id in data.content) {
    const { image, url } = data.content[_id];
    banner.push({ _id, image, url });
  }
  return banner;
}

export default function BannerSlider() {
  const [banner, successFetchBanner] = useFetch<any>(
    "/banner/home",
    (url: string) =>
      fetch(url, {
        method: "GET",
        next: { tags: ["banner-home"] },
      })
        .then((res) => res.json())
        .then((data) => normalize(data))
  );

  return (
    <div className="mt-2">
      <Swiper
        effect={"coverflow"}
        slidesPerView={2}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          481: {
            slidesPerView: 2,
          },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2.5,
          slideShadows: true,
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
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className="mySwiper">
        {successFetchBanner ? (
          <div>
            {Object.keys(banner).map((item) => (
              <SwiperSlide key={item}>
                <Link target="_blank" href={banner[item].url}>
                  <Image
                    className="object-cover md:h-96 rounded-lg"
                    style={{ width: "100", height: "auto" }}
                    width={700}
                    height={700}
                    alt={banner[item].image}
                    src={banner[item].image}
                    loading="lazy"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </div>
        ) : (
          [...Array(6)].map((_, index) => (
            <SwiperSlide key={index}>
              <ShimmerImage />
            </SwiperSlide>
          ))
        )}
        <div className="swiper-pagination" />
      </Swiper>
    </div>
  );
}
