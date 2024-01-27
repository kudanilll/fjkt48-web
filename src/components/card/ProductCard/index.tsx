import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  image: string;
  title: string;
  price: number;
  realPrice: number;
  status: string;
  slug: string;
};

export default function ProductCard(props: ProductCardProps) {
  return (
    <div>
      <div className="rounded-lg flex flex-col overflow-hidden bg-gray-300">
        <Image
          className="object-cover rounded-t-lg"
          src="/product-image.jpg"
          alt="product image"
          width={200}
          height={200}
        />
        <div className="p-2">
          <h5 className="text-md font-regular text-zinc-900">Sepatu</h5>
          <p>
            <span className="text-2xl font-semibold text-zinc-900">Rp5000</span>
            <span className="text-sm text-zinc-700 line-through">Rp10000</span>
          </p>
          <button className="mt-2 flex items-center justify-center rounded-md bg-zinc-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none">
            Cek Selengkapnya
          </button>
        </div>
      </div>
    </div>
  );
}
