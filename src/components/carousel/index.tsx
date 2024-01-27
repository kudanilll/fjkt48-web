"use client";
import ProductCard from "@/components/card/ProductCard";
// Import Swiper React components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type CarouselProps = {};

export default function Carousel(props: CarouselProps) {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      freeMode={true}
      className="mySwiper">
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
    </Swiper>
  );
}
