import {
  Card, CardBody, CardFooter, Image
} from "@nextui-org/react";

type MemberItemProps = {
  key: number,
  name: string,
  gen: string,
  ttl: string,
  image: string
};

export default function CardItem(props: MemberItemProps) {
  return (
    <Card className="rounded-2xl backdrop-blur bg-neutral-700 bg-opacity-30 m-1.5">
      <CardBody className="overflow-visible">
        <Image
          className="w-full object-cover rounded-t-2xl"
          radius="lg"
          width="100%"
          alt={props.name}
          src={props.image}/>
      </CardBody>
      <CardFooter className="text-small py-3 px-4 flex-col items-start">
        <h4 className="font-poppins font-bold text-xl text-white sm:w-2/3 sm:mb-8">{props.name}</h4>
        <p className="sm:absolute sm:bottom-0 sm:mb-3 sm:mt-2 py-1 font-poppins text-gray-200">{props.gen}</p>
      </CardFooter>
    </Card>
  );
}