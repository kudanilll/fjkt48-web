import type { Metadata } from "next";
import NormalPageWrapper from "@/components/wrapper/normal-page-wrapper";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FJKT48 | Not Found",
  description: "Halaman Tidak Ditemukan",
};

export default function NotFound() {
  return (
    <NormalPageWrapper>
      <div className="text-center flex flex-col justify-center items-center content-center space-y-4">
        <Image
          alt="not found :("
          src="/assets/not-found.png"
          width={200}
          height={200}
          className="mt-20"
        />
        <h1 className="hidden md:block text-2xl font-semibold">
          404 - Halaman Tidak Ditemukan :(
        </h1>
        <div className="md:hidden">
          <h1 className="text-3xl font-semibold">404</h1>
          <h1 className="text-2xl font-semibold">Halaman Tidak Ditemukan :(</h1>
        </div>
        <p>Halaman yang anda cari tidak ada</p>
        <div className="px-4 py-2 cursor-pointer bg-red-400 md:bg-transparent md:hover:bg-red-400 rounded-full md:hover:text-white duration-300">
          <Link
            className="text-white md:text-gray-800 md:hover:text-white duration-300"
            href="/">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </NormalPageWrapper>
  );
}
