"use client";
import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { MemberType } from "@/models/types/member.type";
import { download } from "@/lib/supabase/service";
import ShimmerImage from "@/components/ui/shimmer/image";
import Link from "next/link";
import Image from "next/image";

type MemberCardProps = {
  data: MemberType;
};

export default function MemberCard(props: MemberCardProps) {
  const data = props.data;

  async function onDownload() {
    console.log(`downloading image: ${props.data.image}`);
    await download("", "");
  }
  return (
    <Link
      href=""
      className="group m-1.5 cursor-pointer rounded-xl hover:bg-black">
      <div className="rounded-xl relative">
        <Image
          className="rounded-xl w-full h-full object-cover opacity-100 transition-opacity group-hover:opacity-75"
          alt={data.nickname}
          src={data.image}
          width={200}
          height={200}
          priority
        />
        <div className="absolute top-4 left-4 translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm font-medium uppercase text-pink-500">
            {data.gen !== "trainee" ? `generasi ${data.gen}` : data.gen}
          </p>
          <p className="text-xl font-bold text-white sm:text-2xl">
            {data.nickname}
          </p>
        </div>
      </div>
    </Link>
  );
}
