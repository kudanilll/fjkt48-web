import { Image } from "@nextui-org/image";
import Link from "next/link";

type NewsProps = {
  title: string;
  image: string;
  date: string;
  path: string;
  category: string;
};

export default function NewsCard(props: NewsProps) {
  var path = props.path ? "/news/" + props.path : "";
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
      <div className="rounded-2xl backdrop-blur p-2 flex flex-row bg-neutral-900">
        <div className="p-2 sm:pt-1.5 flex-col items-start">
          <span className={`${backgroundCategory} absolute top-0 left-0 font-poppins px-2 rounded-tl-lg rounded-br-lg mb-2 uppercase`}>{props.category}</span>
          <h4 className="font-poppins font-bold text-large mt-4 sm:mt-6 sm:px-1">{props.title}</h4>
          <small className="absolute bottom-0 py-2 sm:px-1 sm:mb-4 text-default-500">{props.date}</small>
        </div>
        <Image
          alt={props.title}
          className="object-cover rounded-xl sm:ml-5"
          radius="lg"
          src={props.image}
          width={156}/>
      </div>
    </Link>
  );
}