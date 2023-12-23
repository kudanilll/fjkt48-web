import {
  Card, CardFooter, Image
} from "@nextui-org/react";
import Link from "next/link";

type BannerProps = {
  title: string,
  image: string,
  date: string,
  path: string
};

export default function NewsUpdateBanner(props: BannerProps) {
  var path = props.path ? "/news/" + props.path : "";
  return (
    <Link href={path}>
      <Card className="rounded-2xl backdrop-blur">
        <Image
          className="w-full object-cover rounded-t-2xl"
          width="100%"
          alt={props.title}
          src={props.image}/>
        <CardFooter className="backdrop-blur-lg bg-neutral-700 bg-opacity-30 bottom-0 justify-between px-3 py-5 pl-5 rounded-b-2xl">
          <p className="font-poppins text-xs drop-shadow-2xl">{props.title}</p>
          <p className="font-poppins text-sm bg-red-700 px-2.5 py-1 m-2 rounded-full">></p>
        </CardFooter>
      </Card>
    </Link>
  );
}