import Image from "next/image";
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
  switch (props.category.toLowerCase()) {
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
      <div className="rounded-xl flex bg-gray-300">
        <Image
          className="w-full max-w-[1/3] object-fill rounded-s-xl"
          alt={props.title}
          src={props.image}
          width={174}
          height={124}
        />
        <div className="p-2 backdrop-blur-none">
          <span
            className={`${backgroundCategory} absolute top-0 right-0 font-poppins text-white px-4 rounded-tr-xl rounded-bl-xl uppercase`}>
            {props.category}
          </span>
          <h4 className="font-poppins font-semibold text-left py-6">
            {props.title}
          </h4>
          <small className="absolute bottom-0 right-0 p-2 text-default-500">
            {props.date}
          </small>
        </div>
      </div>
    </Link>
  );
}
