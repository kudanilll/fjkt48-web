"use client";
import { MdChevronRight } from "react-icons/md";
import { useState, useEffect } from "react";
import sections from "./section-item";
import ShopSlider from "@/components/ui/slider/shop-slider";
import Image from "next/image";
import Link from "next/link";

// Shimmer Effect
import ShimmerBanner from "@/components/ui/shimmer/banner";

export default function ShopPage() {
  const [bannerImage, setBannerImage] = useState<string>("");
  const [successFetchBanner, setSuccessFetchBanner] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/v1/shop?banner=1", {
      cache: "no-store",
      next: { tags: ["banner-shop"] },
    })
      .then((response) => response.json())
      .then((data) => {
        setBannerImage(data.content.image);
        setSuccessFetchBanner(true);
      });
  }, []);

  return (
    <div>
      <div className="mb-6">
        {successFetchBanner ? (
          <Image
            className="w-full object-cover rounded-xl md:px-24"
            width={500}
            height={500}
            src={bannerImage}
            alt={bannerImage}
            quality={100}
            priority={true}
          />
        ) : (
          <ShimmerBanner />
        )}
      </div>
      {sections.map((section, index) => (
        <div className="mb-6" id={section.id} key={index}>
          <Link className="flex flex-row items-center" href="">
            <h1 className="text-3xl font-semibold mb-1.5">{section.title}</h1>
            <MdChevronRight size={40} className="mb-1.5" />
          </Link>
          <ShopSlider />
        </div>
      ))}
      <div className="mb-8 items-center justify-center">
        <h5 className="text-center text-gray-500">JKT48 Official Shop</h5>
        <div className="flex flex-row p-2 justify-center">
          <Link href="https://www.tokopedia.com/officialjkt48" target="_blank">
            <Image
              className="w-full object-cover px-2 pt-2"
              width={72}
              height={72}
              src="/tokopedia.png"
              alt="tokopedia"
            />
          </Link>
          <Link href="https://shopee.co.id/officialjkt48" target="_blank">
            <Image
              className="w-full object-cover px-2"
              width={70}
              height={70}
              src="/shopee.png"
              alt="shopee"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
