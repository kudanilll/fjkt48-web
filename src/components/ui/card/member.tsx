"use client";
import { MemberType } from "@/models/types/member.type";
import { download } from "@/lib/supabase/service";
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
    <div className="group m-1.5 cursor-pointer rounded-xl hover:bg-black">
      <div className="rounded-xl relative">
        <Image
          className="rounded-xl w-full h-full object-cover opacity-100 transition-opacity group-hover:opacity-60"
          alt={data.nickname}
          src={data.image}
          width={200}
          height={200}
          quality={100}
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-between opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="translate-y-8 transform transition-all duration-300 group-hover:translate-y-0">
            <p className="text-sm font-semibold uppercase text-red-500">
              {data.gen !== "trainee" ? `generasi ${data.gen}` : data.gen}
            </p>
            <p className="text-xl font-bold text-white sm:text-2xl">
              {data.nickname}
            </p>
          </div>
          <Link
            href={`/member/${data._id}`}
            className="translate-y-8 transform transition-all duration-300 group-hover:translate-y-0">
            <button className="hidden md:flex justify-center w-full bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg backdrop-blur-sm transition-all duration-300">
              Lihat Selengkapnya
            </button>
            <button className="md:hidden w-full bg-white/20 text-sm hover:bg-white/30 text-white p-2 rounded-lg backdrop-blur-sm transition-all duration-300">
              Selengkapnya
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
