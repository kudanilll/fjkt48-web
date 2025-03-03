import type { Metadata } from "next";
import { getErrorMessage } from "@/lib/error-message";
import { Heading, Paragraph } from "@/components/typography";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FJKT48 | Not Found",
  description: "Halaman Tidak Ditemukan",
};

export default function NotFound() {
  const { error, desc } = getErrorMessage({ errorCode: 404 });
  return (
    <div className="grid min-h-screen place-content-center">
      <div className="text-center">
        <Image
          alt="not found"
          src="/assets/not-found.png"
          width={200}
          height={200}
          className="mx-auto"
        />
        <Heading as="h4" className="mt-4 tracking-tight">
          {error}
        </Heading>
        <Paragraph>{desc}</Paragraph>
        <Link
          href="/home"
          className="mt-4 inline-block rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 focus:outline-none">
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
