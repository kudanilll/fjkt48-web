import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FJKT48 | Not Found",
  description: "Halaman Tidak Ditemukan",
};

export default function NotFound() {
  return (
    <div>
      <div className="py-36 px-4 text-center justify-center items-center space-y-4">
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
    </div>
  );
}
