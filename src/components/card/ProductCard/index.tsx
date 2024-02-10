import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  image: string;
  title: string;
  price: number;
  status: "available" | "pre-order" | "not-available";
  slug: string;
};

export default function ProductCard(props: ProductCardProps) {
  return (
    <div>
      <div className="relative w-full max-w-xs rounded-lg flex flex-col overflow-hidden bg-gray-300">
        <Image
          className="object-fill rounded-t-lg"
          src={props.image}
          alt={props.title}
          width={200}
          height={200}
        />
        <div className="p-2">
          <h5 className="text-md font-regular text-zinc-900">{props.title}</h5>
          <span className="text-2xl font-semibold text-zinc-900">{`Rp${props.price}`}</span>
          <button className="mt-2 flex mx-auto items-center justify-center rounded-md bg-zinc-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none">
            <a href={props.slug}>Cek Selengkapnya</a>
          </button>
        </div>
      </div>
    </div>
  );
}
