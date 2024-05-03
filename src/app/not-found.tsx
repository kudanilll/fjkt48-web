import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FJKT48 | Not Found",
  description: "Halaman Tidak Ditemukan",
};

export default function NotFound() {
  return (
    <div className="text-center flex flex-col justify-center items-center content-center space-y-4">
      <Image
        alt="not found :("
        src="/assets/not-found.png"
        width={200}
        height={200}
        className="mt-20"
      />
      <h1 className="text-2xl font-semibold">
        404 - Halaman Tidak Ditemukan :(
      </h1>
      <p>Halaman yang anda cari tidak ada</p>
      <Link
        className="underline text-blue-600 hover:text-red-500 duration-300"
        href="/">
        Kembali ke beranda
      </Link>
    </div>
  );
}
