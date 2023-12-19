import { Image } from "@nextui-org/react";

type NewsProps = {
  title: string,
  image: string,
  date: string,
  category: string
};

export default function NewsCard(props: NewsProps) {
  var background: string;
  switch(props.category) {
    case "goods": {
      background = "bg-green-600";
      break;
    }
    case "event": {
      background = "bg-blue-600";
      break;
    }
    case "other": {
      background = "bg-zinc-700";
      break;
    }
    default: {
      background = "bg-transparent";
    }
  } //switch case
  return (
    <div className="rounded-2xl backdrop-blur p-2 flex flex-row bg-neutral-700 bg-opacity-30 mb-2 sm:m-1.5">
      <div className="p-2 sm:pt-1.5 flex-col items-start">
        <span className={`${background} absolute top-0 left-0 font-poppins px-2 rounded-tl-lg rounded-br-lg mb-2 uppercase`}>{props.category}</span>
        <h4 className="font-poppins font-bold text-large mt-4">{props.title}</h4>
        <small className="absolute bottom-0 py-2 text-default-500">{props.date}</small>
      </div>
      <Image
        alt={props.title}
        className="object-cover rounded-xl"
        radius="lg"
        src={props.image}
        width={156}/>
    </div>
  );
}