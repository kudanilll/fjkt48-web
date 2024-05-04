import ShimmerImage from "@/components/shimmer/ShimmerImage";
import Link from "next/link";
import { Image, Card } from "antd";

const { Meta } = Card;

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
    <Link href={path}>
      <div className="m-1.5 md:hidden">
        <Card
          hoverable
          cover={
            <div>
              <Image
                preview={false}
                alt={props.title}
                src={props.image}
                width={500}
                height={500}
                placeholder={<ShimmerImage />}
              />
              <span
                className={`${backgroundCategory} absolute top-0 right-0 font-poppins text-white px-5 py-1 rounded-tr-md rounded-bl-md uppercase`}>
                {props.category}
              </span>
            </div>
          }>
          <Meta title={props.title} description={props.date} />
        </Card>
      </div>
      <div className="md:mb-2 hidden md:block">
        <Card
          hoverable
          style={{ width: 390 }}
          cover={
            <div>
              <Image
                preview={false}
                alt={props.title}
                src={props.image}
                width={390}
                placeholder={<ShimmerImage />}
              />
              <span
                className={`${backgroundCategory} absolute top-0 right-0 font-poppins text-white px-5 py-1 rounded-tr-md rounded-bl-md uppercase`}>
                {props.category}
              </span>
            </div>
          }>
          <Meta title={props.title} description={props.date} />
        </Card>
      </div>
    </Link>
  );
}
