import type { Metadata } from "next";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = {
  title: "FJKT48 | About",
  description: "",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
