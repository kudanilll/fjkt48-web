"use client";
import { useEffect, useState } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import ShimmerBanner from "@/components/shimmer/ShimmerBanner";

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
    <div className="my-8">
      {successFetch ? (
        <Carousel dotPosition="bottom" autoplay infinite>
          {banner.map((item) => (
            <Link target="_blank" href={item.url} key={item.id}>
              <Image
                className="w-full md:h-96 object-cover rounded-t-2xl"
                width={500}
                height={500}
                alt={item.image}
                src={item.image}
                quality={100}
                priority
              />
              <div className="bg-red-600 bottom-0 pb-4 rounded-b-2xl" />
            </Link>
          ))}
        </Carousel>
      ) : (
        <ShimmerBanner />
      )}
    </div>
  );
}
