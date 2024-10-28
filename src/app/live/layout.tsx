import type { Metadata } from "next";
import PageWrapper from "@/components/wrapper/page-wrapper";

export const metadata: Metadata = {
  title: "FJKT48 | Live",
  description: "",
};

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper>{children}</PageWrapper>;
}
