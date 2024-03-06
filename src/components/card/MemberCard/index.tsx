import { Card } from "antd";
import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

type MemberCardProps = {
  name: string;
  gen?: string;
  image: string;
  jikoshoukai?: string;
};

export default function MemberCard(props: MemberCardProps) {
  return (
    <Card
      className="m-1.5 cursor-pointer"
      style={{ width: 300 }}
      cover={
        <div className="relative">
          <Image
            width={500}
            height={500}
            alt={props.name}
            src={props.image}
            priority
          />
          {props.jikoshoukai && (
            <div className="opacity-0 hover:opacity-100 bg-current rounded-md duration-300 absolute inset-0 z-10 flex justify-center items-center p-2">
              <h5 className="text-white font-medium p-2">
                {props.jikoshoukai}
              </h5>
            </div>
          )}
        </div>
      }
      actions={[
        <Link href="" key="instagram">
          <FaInstagram size={24} className="ml-10" />
        </Link>,
        <Link href="" key="tiktok">
          <FaTiktok size={24} className="ml-10" />
        </Link>,
        <Link href="" key="x">
          <FaXTwitter size={24} className="ml-9" />
        </Link>,
      ]}
      hoverable>
      <div className="flex-col items-start">
        <h4 className="font-poppins font-semibold text-2xl">{props.name}</h4>
        <p className="py-1 text-xl">{props.gen}</p>
      </div>
    </Card>
  );
}
