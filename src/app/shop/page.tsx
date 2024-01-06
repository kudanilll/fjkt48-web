import { Metadata } from "next";
import { getDataFromAPI } from "@/utils/get-data";
import PageWrapper from "@/components/wrapper/PageWrapper";
import Carousel from "@/components/carousel";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FJKT48 | Toko",
  description: ""
};

async function getBannerImage() {
  const banner = await getDataFromAPI("shop?banner=1");
  return banner.content.image;
}

export default async function ShopPage() {
  const bannerImage = await getBannerImage();
  return (
    <PageWrapper>
      <div className="mb-6">
        <Link href="">
          <Image
            className="w-full object-cover rounded-xl"
            width={500}
            height={500}
            src={bannerImage}
            alt="banner"
            priority={true}/>
        </Link>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">T-Shirt</h1>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Accessories</h1>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Photopack</h1>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Poster & Calendar</h1>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Book & Stationary</h1>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Birthday T-Shirt PO</h1>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">CD & DVD</h1>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Botol Minum & Termos</h1>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Jacket</h1>
      </div>
      <div className="mb-8 items-center justify-center">
        <h5 className="text-center">JKT48 Official Shop</h5>
        <div className="flex flex-row p-2 justify-center">
          <Link href="https://www.tokopedia.com/officialjkt48" target="_blank">
            <Image
              className="w-full object-cover px-2 pt-2"
              width={72}
              height={72}
              src="/tokopedia.png"
              alt="tokopedia"/>
          </Link>
          <Link href="https://shopee.co.id/officialjkt48" target="_blank">
            <Image
              className="w-full object-cover px-2"
              width={70}
              height={70}
              src="/shopee.png"
              alt="shopee"/>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}