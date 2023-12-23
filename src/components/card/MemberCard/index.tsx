import { Image } from "@nextui-org/react";
import Link from "next/link";

type MemberCardProps = {
  name: string,
  gen: string,
  image: string
};

export default function CardItem(props: MemberCardProps) {
  return (
    <Link href={"/member/" + props.name.replaceAll(" ", "-").toLowerCase()} className="m-1.5">
      <div className="rounded-2xl backdrop-blur bg-neutral-700 bg-opacity-30">
        <div className="overflow-visible">
          <Image
            className="w-full object-cover rounded-t-2xl"
            width="100%"
            alt={props.name}
            src={props.image}/>
        </div>
        <div className="text-small py-3 px-4 flex-col items-start">
          <h4 className="font-poppins font-semibold text-xl text-white sm:mb-8">{props.name}</h4>
          <p className="sm:absolute sm:bottom-0 sm:mb-3 sm:mt-2 py-1 font-poppins text-gray-200">{props.gen}</p>
        </div>
      </div>
    </Link>
  );
}