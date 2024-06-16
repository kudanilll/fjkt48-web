"use client";
import ProductCard from "@/components/ui/card/product";
// Import Swiper React components & styles
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

type ShopSliderProps = {};

export default function ShopSlider(props: ShopSliderProps) {
  return (
    <Swiper
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
            image="/test/product-image.jpg"
            title="Sepatu"
            price={5000}
            status="available"
            slug="https://www.tokopedia.com/officialjkt48/jkt48-2024-calendar-flowerful?extParam=src%3Dshop%26whid%3D4003898"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
