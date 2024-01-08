import { Metadata } from "next";
import { getDataFromAPI } from "@/utils/get-data";
import PageWrapper from "@/components/wrapper/PageWrapper";
import Carousel from "@/components/carousel";
import Image from "next/image";
import Link from "next/link";
import chevronRightIcon from "@/assets/icons/chevron-right-dark.svg";
import { sections } from "./section-item.json";

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
        <Link href="#section-jacket">
          <Image
            className="w-full object-cover rounded-xl"
            width={500}
            height={500}
            src={bannerImage}
            alt="banner"
            priority={true}/>
        </Link>
      </div>
      {sections.map((section, index) => (
        <div className="mb-6" id={section.id} key={index}>
          <Link className="flex flex-row" href="">
            <h1 className="text-3xl font-semibold mb-1.5">{section.title}</h1>
            <Image width={40} height={40} src={chevronRightIcon} alt="see all" className="mb-1.5"/>
          </Link>
          <Carousel/>
        </div>
      ))}
      <div className="mb-8 items-center justify-center">
        <h5 className="text-center text-gray-500">JKT48 Official Shop</h5>
        <div className="flex flex-row p-2 justify-center">
          <Link href="https://www.tokopedia.com/officialjkt48" target="_blank">
            <Image className="w-full object-cover px-2 pt-2" width={72} height={72} src="/tokopedia.png" alt="tokopedia"/>
          </Link>
          <Link href="https://shopee.co.id/officialjkt48" target="_blank">
            <Image className="w-full object-cover px-2" width={70} height={70} src="/shopee.png" alt="shopee"/>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}