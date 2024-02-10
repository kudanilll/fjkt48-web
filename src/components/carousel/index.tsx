"use client";
import ProductCard from "@/components/card/ProductCard";
// Import Swiper React components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

type CarouselProps = {};

export default function Carousel(props: CarouselProps) {
  return (
    <Swiper
      // slidesPerView={5}
      // spaceBetween={10}
      spaceBetween={10}
      slidesPerView="auto"
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        800: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 10,
        },
      }}
      freeMode={true}
      mousewheel={true}
      modules={[FreeMode, Mousewheel]}
      className="mySwiper">
      {[...Array(10)].map((_, index) => (
        <SwiperSlide key={index}>
          <ProductCard
            image="/product-image.jpg"
            title="Sepatu"
            price={5000}
            status={"available"}
            slug={""}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
