import { Image } from "@nextui-org/image";
import Link from "next/link";

type NewsProps = {
  title: string;
  image: string;
  date: string;
  slug: string;
  category: string;
};

export default function NewsCard(props: NewsProps) {
  var path = props.slug ? "/news/" + props.slug : "";
  var backgroundCategory: string;
  switch(props.category.toLowerCase()) {
  case "theater":
    backgroundCategory = "bg-violet-600";
    break;
  case "birthday":
    backgroundCategory = "bg-lime-500";
    break;
  case "release":
    backgroundCategory = "bg-orange-600";
    break;
  case "goods":
    backgroundCategory = "bg-green-600";
    break;
  case "event":
    backgroundCategory = "bg-blue-600";
    break;
  case "other":
    backgroundCategory = "bg-zinc-700";
    break;
  default:
    backgroundCategory = "bg-transparent";
  } //switch case
  return (
    <Link href={path} className="mb-2 sm:m-1.5">
      <div className="rounded-2xl backdrop-blur p-2 flex bg-gray-300">
        <div className="p-2 sm:pt-1.5 flex-col">
          <span className={`${backgroundCategory} absolute top-0 left-0 font-poppins text-white px-2 rounded-tl-lg rounded-br-lg mb-2 uppercase`}>{props.category}</span>
          <h4 className="font-poppins font-bold text-large text-left mt-4 mr-2 sm:mt-6">{props.title}</h4>
          <small className="py-2 mt-2 sm:px-1 sm:mb-4 text-default-500">{props.date}</small>
        </div>
        <Image
          className="ml-auto object-cover rounded-xl"
          alt={props.title}
          src={props.image}
          height="100%"/>
      </div>
    </Link>
  );
}