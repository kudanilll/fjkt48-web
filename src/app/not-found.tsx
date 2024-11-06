import type { Metadata } from "next";
import { getErrorMessage } from "@/lib/error-message";
import NormalPageWrapper from "@/components/wrapper/normal-page-wrapper";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FJKT48 | Not Found",
  description: "Halaman Tidak Ditemukan",
};

export default function NotFound() {
  const { error, desc } = getErrorMessage({ errorCode: 404 });
  return (
    <NormalPageWrapper>
      <div className="grid h-screen place-content-center px-4">
        <div className="text-center">
          <Image
            alt="not found"
            src="/assets/not-found.png"
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {error}
          </p>
          <p className="mt-3 text-gray-500">{desc}</p>
          <Link
            href="/home"
            className="mt-3 inline-block rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 focus:outline-none">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </NormalPageWrapper>
  );
}
