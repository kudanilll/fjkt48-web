import type { Metadata } from "next";
import PageWrapper from "@/components/wrapper/PageWrapper";

export const metadata: Metadata = {
  title: "FJKT48 | Berita",
  description: "Berita Seputar JKT48",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
