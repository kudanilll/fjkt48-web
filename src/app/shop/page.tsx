"use client";
import ShoppingTab from "@/components/ui/tabs/shopping-tab";
import Image from "next/image";
import Link from "next/link";
import sections from "./section-item";

export default function ShopPage() {
  return (
    <div className="mt-8">
      <div className="h-[20rem] md:h-screen [perspective:1000px] relative flex flex-col mx-auto w-full mb-8">
        <ShoppingTab tabs={sections} />
        <div className="my-4 flex flex-col justify-center items-start gap-2">
          <h5 className="text-center text-gray-500">JKT48 Official Shop</h5>
          <div className="flex flex-row items-center gap-4">
            <Link
              href="https://www.tokopedia.com/officialjkt48"
              target="_blank">
              <Image
                className="w-full object-cover"
                width={72}
                height={72}
                src="/assets/shop/tokopedia.png"
                alt="tokopedia"
              />
            </Link>
            <Link href="https://shopee.co.id/officialjkt48" target="_blank">
              <Image
                className="w-full object-cover"
                width={70}
                height={70}
                src="/assets/shop/shopee.png"
                alt="shopee"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
