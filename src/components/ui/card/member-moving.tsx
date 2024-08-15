import { MemberType } from "@/models/types/member.type";
import Image from "next/image";

type MemberCardProps = {
  data: MemberType;
};

export default function MemberCard(props: MemberCardProps) {
  const data = props.data;
  return (
    <div className="m-1.5 cursor-pointer rounded-xl group relative block bg-black">
      <Image
        className="rounded-xl absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-50"
        alt={data.nickname}
        src={data.image}
        width={200}
        height={200}
        priority
      />
      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
          {data.gen !== "trainee" ? `generasi ${data.gen}` : data.gen}
        </p>
        <p className="text-xl font-bold text-white sm:text-2xl">
          {data.nickname}
        </p>
      </div>
    </div>
  );
}
