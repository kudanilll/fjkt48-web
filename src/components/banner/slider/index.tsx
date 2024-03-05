import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";

type BannerSliderProps = {
  id: string;
  image: string;
  url: string;
};

export default function BannerSlider(props: { content: BannerSliderProps[] }) {
  return (
    <Carousel dotPosition="bottom" autoplay infinite>
      {props.content.map((item) => (
        <Link target="_blank" href={item.url} key={item.id}>
          <Image
            className="w-full md:h-96 object-cover rounded-t-2xl"
            width={500}
            height={500}
            alt={item.image}
            src={item.image}
            priority={true}
            quality={100}
          />
          <div className="bg-red-600 bottom-0 pb-4 rounded-b-2xl" />
        </Link>
      ))}
    </Carousel>
  );
}
